# ElectroDemo

A minimal Electron desktop app created for learning purposes. This project shows a tiny but complete setup you can run and package on macOS and Windows.

## Overview
- Main process creates a single window and loads a static HTML page.
- Renderer shows a counter UI with increment/decrement/reset and a light/dark toggle.
- Uses electron-builder to generate installers (`.dmg` on macOS, NSIS on Windows).
- Kept intentionally simple so you can focus on Electron basics.

## Features
- Counter with +/-/reset actions.
- Light/dark theme toggle with persistence between launches.
- Keyboard shortcuts: ↑ or + to increment, ↓ or - to decrement, R to reset.
- Application menu with File, Edit, View, and Help menus (File → Quit Electro Demo, Help → About).
- Styles split into [style.css](style.css) for easy tweaking.

## Usage
- Run: `npm start`
- Increment: Click "+1" or press ↑ or +
- Decrement: Click "-1" or press ↓ or -
- Reset: Click "Reset" or press R
- Toggle theme: Click the Light/Dark button; preference persists across launches
- Tip: Ensure the app window is focused for keyboard shortcuts to work

## Quick Start
```bash
# Install dependencies
npm install

# Run the app in development
npm start
```

## Build / Package
```bash
# Create platform-specific installers
npm run dist
```
- On macOS: outputs a `.dmg` inside `dist/`
- On Windows: outputs an NSIS installer inside `dist/`

## App Structure
- [scripts/main.js](scripts/main.js): Electron main process. Creates an `800x600` `BrowserWindow` and loads [index.html](index.html); initializes the app menu.
- [scripts/menu.js](scripts/menu.js): Builds and sets the application menu (File, Edit, View, Help with platform-specific behavior).
- [index.html](index.html): Renderer content with counter UI and theme toggle.
- [style.css](style.css): Styling for counter and themes.
- [scripts/counter.js](scripts/counter.js): Renderer logic (counter, keyboard shortcuts, theme persistence).
- [package.json](package.json): Scripts and electron-builder config (see `build` section). `main` points to `scripts/main.js`.

## Notes
- Security: this demo uses `nodeIntegration: true` for simplicity. For real apps, prefer a `preload.js` + IPC with `contextIsolation` enabled.
- Cross-platform: electron-builder targets are configured for macOS (`dmg`) and Windows (`nsis`). Adjust as needed in `package.json`.

## Next Steps (Ideas to Learn)
- Add custom menu items that send events to the renderer (e.g., "Reset Counter" via IPC).
- Introduce a `preload.js` and migrate to IPC for main/renderer communication.
- Save/load a file via the main process (Node.js `fs`).
- Add app window state persistence (position, size).
