# ElectroDemo - AI Coding Agent Instructions

## Project Overview
ElectroDemo is a minimal Electron desktop application demonstrating basic Electron setup with electron-builder for cross-platform packaging (macOS `.dmg` and Windows `.nsis` installers).

## Architecture & Key Files

### Entry Point
- [scripts/main.js](../../scripts/main.js): Electron main process (set via `package.json#main`). Creates an 800x600 BrowserWindow on app ready, loads [index.html](../../index.html), and initializes menu via [scripts/menu.js](../../scripts/menu.js). Uses nodeIntegration: true for backward compatibility (migrate to preload + IPC for production).
- [scripts/menu.js](../../scripts/menu.js): Builds application menu (File, Edit, View, Help) with platform-specific behavior. Export `buildMenu(win)` function; called from main.js after window creation.
- [index.html](../../index.html): Renderer UI with counter (increment/decrement/reset) and light/dark toggle; pulls styles from [style.css](../../style.css).
- [style.css](../../style.css): Theming via CSS variables; supports light/dark modes.
- [scripts/counter.js](../../scripts/counter.js): Renderer logic for counter, keyboard shortcuts, and theme persistence.
 - [scripts/counter.js](../../scripts/counter.js): Renderer logic for counter, keyboard shortcuts, theme persistence, and IPC listeners for menu actions.

## Developer Workflows

### Running & Development
```bash
npm start          # Launches app in development mode
npm run dist       # Builds distributable packages (dmg for macOS, nsis for Windows)
```

### Build Configuration
See [package.json](../../package.json) `build` section:
- **Mac**: Generates `.dmg` file
- **Windows**: Generates NSIS installer
- **App ID**: `com.donduren.electrodemo`

## Critical Implementation Notes

1. **No IPC or preload yet**: Current setup uses `nodeIntegration: true` directly. For production, migrate to preload scripts + IPC for security.

2. **Dependencies**:
   - `electron`: Desktop framework runtime
   - `electron-builder`: Packaging tool (dev only)

3. **UI and menu features present**: Counter UI, theme toggle, and application menu live in the project. Menu pattern: modular `buildMenu(win)` in `scripts/menu.js`, called from `main.js`. IPC is used for menu-to-renderer actions; no preload yet.
4. **Window state persistence**: Window size/position/maximized state are saved to `app.getPath('userData')/window-state.json` and restored on launch (see scripts/main.js).

## When Modifying

- **Adding features**: Keep main.js minimal; use preload + IPC for renderer-main communication when adding main/renderer interactions.
- **Menu changes**: Edit scripts/menu.js template; custom menu items can invoke app.quit(), shell.openExternal(), or use webContents.send() to notify the renderer.
- **UI changes**: Edit index.html and style.css; renderer logic lives in scripts/counter.js.
- **Packaging**: Modify build config in package.json for new platforms/signing.
- **Security**: Never enable nodeIntegration in production; use context isolation + preload scripts.
