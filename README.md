# ElectroDemo

A minimal Electron desktop app created for learning purposes. This project shows a tiny but complete setup you can run and package on macOS and Windows, written in TypeScript for type safety.

## Overview
- Main process creates a single window and loads a static HTML page.
- Renderer shows a counter UI with increment/decrement/reset and a light/dark toggle.
- Uses electron-builder to generate installers (`.dmg` on macOS, NSIS on Windows).
- Written in TypeScript for the main process, providing better type safety and IDE support.
- Kept intentionally simple so you can focus on Electron basics.

## Features
- Counter with +/-/reset actions.
- Light/dark theme toggle with persistence between launches.
- Keyboard shortcuts: ↑ or + to increment, ↓ or - to decrement, R to reset.
- Application menu with File, Edit, View, and Help menus (File → Quit Electro Demo, Help → About).
- Window state persistence (size, position, maximized state).
- TypeScript main process for type safety.
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

# Build TypeScript files
npm run build

# Run the app in development (builds automatically)
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
- [scripts/main.ts](scripts/main.ts): Electron main process (TypeScript). Creates a BrowserWindow, loads [index.html](index.html), initializes the app menu, and manages window state persistence. Compiles to `dist/scripts/main.js`.
- [scripts/menu.ts](scripts/menu.ts): Builds and sets the application menu (File, Edit, View, Help with platform-specific behavior). Compiles to `dist/scripts/menu.js`.
- [tsconfig.json](tsconfig.json): TypeScript configuration (ES2022, CommonJS, strict mode).
- [index.html](index.html): Renderer content with counter UI and theme toggle.
- [style.css](style.css): Styling for counter and themes.
- [scripts/counter.js](scripts/counter.js): Renderer logic (counter, keyboard shortcuts, theme persistence, IPC listeners).
- [package.json](package.json): Scripts and electron-builder config (see `build` section). `main` points to `dist/scripts/main.js` (compiled output).

## Notes
- **TypeScript**: Main process code is written in TypeScript (`scripts/*.ts`) and compiles to JavaScript in `dist/`. The renderer (`counter.js`) remains JavaScript for simplicity.
- **Security**: This demo uses `nodeIntegration: true` for simplicity. For real apps, prefer a `preload.js` + IPC with `contextIsolation` enabled.
- **Cross-platform**: electron-builder targets are configured for macOS (`dmg`) and Windows (`nsis`). Adjust as needed in `package.json`.

## Changelog

### 1.0.1
- Migrated main process to TypeScript for type safety
- Added application menu with custom "About Electro Demo" and "Quit Electro Demo" labels
- Menu actions for Increment, Decrement, Reset Counter, and Toggle Theme (with accelerators)
- Theme preference persisted across launches
- Window position/size/maximized state persisted between launches
- Moved main/renderer logic under `scripts/` folder

## Next Steps (Ideas to Learn)
- Migrate renderer code (`counter.js`) to TypeScript
- Introduce a `preload.ts` and migrate to contextIsolation + IPC for improved security
- Save/load a file via the main process (Node.js `fs`)
- Add automatic updates using electron-updater
