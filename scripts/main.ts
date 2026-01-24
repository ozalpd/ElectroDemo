import { app, BrowserWindow, screen } from 'electron';
import fs from 'fs';
import path from 'path';
import { buildMenu } from './menu';

type WindowState = {
  width: number;
  height: number;
  x: number;
  y: number;
  isMaximized: boolean;
};

const minWidth = 420;
const minHeight = 512;
const stateFilePath = path.join(app.getPath('userData'), 'window-state.json');

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

function defaultPosition(screenWidth: number, screenHeight: number): WindowState {
  const width = Math.floor(minWidth * 1.25);
  return {
    width,
    height: minHeight,
    x: Math.floor((screenWidth - width) / 2),
    y: Math.floor((screenHeight - minHeight) / 2),
    isMaximized: false,
  };
}

function parsePosition(data: string, screenWidth: number, screenHeight: number): WindowState {
  const saved = JSON.parse(data) as Partial<WindowState>;
  const width = clamp(typeof saved.width === 'number' ? saved.width : minWidth, minWidth, screenWidth);
  const height = clamp(typeof saved.height === 'number' ? saved.height : minHeight, minHeight, screenHeight);

  let x = typeof saved.x === 'number' ? saved.x : 0;
  let y = typeof saved.y === 'number' ? saved.y : 0;

  if (width + x > screenWidth) {
    x = screenWidth - width;
  }
  if (height + y > screenHeight) {
    y = screenHeight - height;
  }

  x = clamp(x, 0, screenWidth);
  y = clamp(y, 0, screenHeight);

  return {
    width,
    height,
    x,
    y,
    isMaximized: Boolean(saved.isMaximized),
  };
}

function loadWindowState(): WindowState {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  try {
    const data = fs.readFileSync(stateFilePath, 'utf-8');
    return parsePosition(data, screenWidth, screenHeight);
  } catch (error) {
    return defaultPosition(screenWidth, screenHeight);
  }
}

function saveWindowState(win: BrowserWindow): void {
  const bounds = win.getBounds();
  const state: WindowState = {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    isMaximized: win.isMaximized(),
  };
  fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2));
}

function createWindow(): void {
  const windowState = loadWindowState();

  const win = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (windowState.isMaximized) {
    win.maximize();
  }

  win.loadFile('index.html');
  buildMenu(win);

  win.on('close', () => saveWindowState(win));

  let saveTimeout: NodeJS.Timeout | undefined;
  const debouncedSave = () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    saveTimeout = setTimeout(() => saveWindowState(win), 500);
  };

  win.on('resize', debouncedSave);
  win.on('move', debouncedSave);
}

app.whenReady().then(createWindow);
