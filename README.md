# ElectroDemo

A minimal Electron desktop app created for learning purposes. This project shows a tiny but complete setup you can run and package on macOS and Windows.

## Overview
- Main process creates a single window and loads a static HTML page.
- Uses electron-builder to generate installers (`.dmg` on macOS, NSIS on Windows).
- Kept intentionally simple so you can focus on Electron basics.

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
- [main.js](main.js): Electron main process. Creates an `800x600` `BrowserWindow` and loads `index.html`.
- [index.html](index.html): Renderer content (static HTML) shown in the window.
- [package.json](package.json): Scripts and electron-builder config (see `build` section).

## Notes
- Security: this demo uses `nodeIntegration: true` for simplicity. For real apps, prefer a `preload.js` + IPC with `contextIsolation` enabled.
- Cross-platform: electron-builder targets are configured for macOS (`dmg`) and Windows (`nsis`). Adjust as needed in `package.json`.

## Next Steps (Ideas to Learn)
- Add a simple counter UI in `index.html`.
- Create a custom menu in the main process.
- Introduce a `preload.js` and migrate to IPC for main/renderer communication.
- Save/load a file via the main process (Node.js `fs`).
