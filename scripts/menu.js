const { Menu, shell, app, dialog } = require('electron');

function buildMenu(win) {
  const isMac = process.platform === 'darwin';

  const template = [
    ...(isMac
      ? [
          {
            label: 'Electro Demo',
            submenu: [
              {
                label: 'About Electro Demo',
                click: () =>
                  dialog.showMessageBox(win, {
                    type: 'info',
                    title: 'About Electro Demo',
                    message: 'ElectroDemo',
                    detail: `A minimal Electron demo app\nVersion: ${app.getVersion()}`,
                    buttons: ['OK'],
                  }),
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
            ],
          },
        ]
      : []),
    {
      label: 'File',
      submenu: [
        ...(isMac ? [{ role: 'close' }] : []),
        ...(!isMac
          ? [
              {
                label: 'Quit Electro Demo',
                accelerator: 'Alt+F4',
                click: () => app.quit(),
              },
            ]
          : []),
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [{ role: 'pasteAndMatchStyle' }, { role: 'selectAll' }]
          : [{ role: 'delete' }, { role: 'selectAll' }]),
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click: () => shell.openExternal('https://www.electronjs.org/'),
        },
        ...(!isMac
          ? [
              {
                label: 'About Electro Demo',
                click: () =>
                  dialog.showMessageBox(win, {
                    type: 'info',
                    title: 'About Electro Demo',
                    message: 'ElectroDemo',
                    detail: `A minimal Electron demo app\nVersion: ${app.getVersion()}`,
                    buttons: ['OK'],
                  }),
              },
            ]
          : []),
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = { buildMenu };
