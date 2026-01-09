
const { app, BrowserWindow } = require('electron');
const { buildMenu } = require('./menu');
const path = require('path');
const fs = require('fs');

// Window state management
const stateFilePath = path.join(app.getPath('userData'), 'window-state.json');

function loadWindowState() {
  try {
    const data = fs.readFileSync(stateFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    // Return default state if file doesn't exist or is invalid
    return {
      width: 800,
      height: 600,
      x: undefined,
      y: undefined,
      isMaximized: false
    };
  }
}

function saveWindowState(win) {
  const bounds = win.getBounds();
  const state = {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    isMaximized: win.isMaximized()
  };
  fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2));
}

function createWindow() {
  const windowState = loadWindowState();

  const win = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (windowState.isMaximized) {
    win.maximize();
  }

  win.loadFile('index.html');
  buildMenu(win);

  // Save state on close
  win.on('close', () => {
    saveWindowState(win);
  });

  // Optionally save on resize/move (debounced)
  let saveTimeout;
  const debouncedSave = () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => saveWindowState(win), 500);
  };

  win.on('resize', debouncedSave);
  win.on('move', debouncedSave);
}

app.whenReady().then(createWindow);
