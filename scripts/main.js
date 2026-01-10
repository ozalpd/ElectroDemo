
const { app, BrowserWindow } = require('electron');
const { buildMenu } = require('./menu');
const path = require('path');
const fs = require('fs');

// Window state management
const stateFilePath = path.join(app.getPath('userData'), 'window-state.json');

function loadWindowState() {
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
  const minWidth = 420;
  const minHeight = 512;
  try {
    const data = fs.readFileSync(stateFilePath, 'utf-8');
    return parsePosition(data);
  } catch (err) {
    return defaultPosition();
  }
  function parsePosition(data) {
    let savedPosition = JSON.parse(data);

    savedPosition.width = savedPosition.width > screenWidth ? screenWidth : savedPosition.width;
    savedPosition.width = savedPosition.width < minWidth ? minWidth : savedPosition.width;
    if (savedPosition.width + savedPosition.x > screenWidth) {
      savedPosition.x = screenWidth - savedPosition.width;
    }

    savedPosition.height = savedPosition.height > screenHeight ? screenHeight : savedPosition.height;
    savedPosition.height = savedPosition.height < minHeight ? minHeight : savedPosition.height;
    if (savedPosition.height + savedPosition.y > screenHeight) {
      savedPosition.y = screenHeight - savedPosition.height;
    }

    savedPosition.x = savedPosition.x < 0 || savedPosition.x > screenWidth ? 0 : savedPosition.x;
    savedPosition.y = savedPosition.y < 0 || savedPosition.y > screenHeight ? 0 : savedPosition.y;

    return savedPosition;
  }
  function defaultPosition() {
    let defWidth = Math.floor(minWidth * 1.25);
    return {
      width: defWidth,
      height: minHeight,
      x: Math.floor((screenWidth - defWidth) / 2),
      y: Math.floor((screenHeight - minHeight) / 2),
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
