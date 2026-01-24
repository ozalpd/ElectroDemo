import { Menu, shell, app, dialog, BrowserWindow } from 'electron';
import type { MenuItemConstructorOptions } from 'electron';

export function buildMenu(win: BrowserWindow): void {
  const isMac = process.platform === 'darwin';

  const template: MenuItemConstructorOptions[] = [];

  if (isMac) {
    const aboutSubmenu: MenuItemConstructorOptions[] = [
      {
        label: 'About Electro Demo',
        click: () => {
          dialog.showMessageBox(win, {
            type: 'info',
            title: 'About Electro Demo',
            message: 'ElectroDemo',
            detail: `A minimal Electron demo app\nVersion: ${app.getVersion()}`,
            buttons: ['OK'],
          });
        },
      },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      {
        label: 'Quit Electro Demo',
        accelerator: 'CmdOrCtrl+Q',
        click: () => app.quit(),
      },
    ];

    template.push({ label: 'Electro Demo', submenu: aboutSubmenu });
  }

  const fileSubmenu: MenuItemConstructorOptions[] = [];
  if (isMac) {
    fileSubmenu.push({ role: 'close' });
  } else {
    fileSubmenu.push({
      label: 'Quit Electro Demo',
      accelerator: 'Alt+F4',
      click: () => app.quit(),
    });
  }
  template.push({ label: 'File', submenu: fileSubmenu });

  const editSubmenu: MenuItemConstructorOptions[] = [
    { role: 'undo' },
    { role: 'redo' },
    { type: 'separator' },
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    ...(isMac
      ? ([{ role: 'pasteAndMatchStyle' }, { role: 'selectAll' }] as MenuItemConstructorOptions[])
      : ([{ role: 'delete' }, { role: 'selectAll' }] as MenuItemConstructorOptions[])),
    { type: 'separator' },
    {
      label: 'Increment Counter',
      accelerator: 'CmdOrCtrl+Shift+I',
      click: () => win.webContents.send('increment-counter'),
    },
    {
      label: 'Decrement Counter',
      accelerator: 'CmdOrCtrl+Shift+D',
      click: () => win.webContents.send('decrement-counter'),
    },
    {
      label: 'Reset Counter',
      accelerator: 'CmdOrCtrl+Shift+R',
      click: () => win.webContents.send('reset-counter'),
    },
    {
      label: 'Toggle Theme',
      accelerator: 'CmdOrCtrl+Shift+T',
      click: () => win.webContents.send('toggle-theme'),
    },
  ];
  template.push({ label: 'Edit', submenu: editSubmenu });

  const viewSubmenu: MenuItemConstructorOptions[] = [
    { role: 'reload' },
    { role: 'toggleDevTools' },
    { type: 'separator' },
    { role: 'resetZoom' },
    { role: 'zoomIn' },
    { role: 'zoomOut' },
    { type: 'separator' },
    { role: 'togglefullscreen' },
  ];
  template.push({ label: 'View', submenu: viewSubmenu });

  const helpSubmenu: MenuItemConstructorOptions[] = [
    {
      label: 'Learn More',
      click: () => shell.openExternal('https://www.electronjs.org/'),
    },
  ];
  if (!isMac) {
    helpSubmenu.push({
      label: 'About Electro Demo',
      click: () => {
        dialog.showMessageBox(win, {
          type: 'info',
          title: 'About Electro Demo',
          message: 'ElectroDemo',
          detail: `A minimal Electron demo app\nVersion: ${app.getVersion()}`,
          buttons: ['OK'],
        });
      },
    });
  }
  template.push({ label: 'Help', submenu: helpSubmenu });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
