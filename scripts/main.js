
const { app, BrowserWindow } = require('electron');
const { buildMenu } = require('./menu');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('index.html');
  buildMenu(win);
}

app.whenReady().then(createWindow);
