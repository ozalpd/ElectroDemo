# ElectroDemo - AI Coding Agent Instructions

## Project Overview
ElectroDemo is a minimal Electron desktop application demonstrating basic Electron setup with electron-builder for cross-platform packaging (macOS `.dmg` and Windows `.nsis` installers). Written in TypeScript for type safety.

## Architecture & Key Files

### Entry Point
- [scripts/main.ts](../../scripts/main.ts): Electron main process TypeScript source. Compiles to `dist/scripts/main.js` (set via `package.json#main`). Creates a BrowserWindow on app ready, loads [index.html](../../index.html), and initializes menu via [scripts/menu.ts](../../scripts/menu.ts). Uses nodeIntegration: true for backward compatibility (migrate to preload + IPC for production).
- [scripts/menu.ts](../../scripts/menu.ts): Builds application menu (File, Edit, View, Help) with platform-specific behavior. Exports `buildMenu(win)` function; called from main.ts after window creation.
- [tsconfig.json](../../tsconfig.json): TypeScript configuration targeting ES2022, CommonJS modules, strict mode enabled. Compiles `scripts/**/*.ts` to `dist/`.
- [index.html](../../index.html): Renderer UI with counter (increment/decrement/reset) and light/dark toggle; pulls styles from [style.css](../../style.css).
- [style.css](../../style.css): Theming via CSS variables; supports light/dark modes.
- [scripts/counter.js](../../scripts/counter.js): Renderer logic for counter, keyboard shortcuts, theme persistence, and IPC listeners for menu actions.

## Developer Workflows

### Running & Development
```bash
npm run build      # Compiles TypeScript (scripts/*.ts → dist/scripts/*.js)
npm start          # Builds TypeScript and launches app in development mode
npm run dist       # Builds TypeScript and creates distributable packages (dmg for macOS, nsis for Windows)
```

### Build Configuration
See [package.json](../../package.json) `build` section:
- **Mac**: Generates `.dmg` file
- **Windows**: Generates NSIS installer
- **App ID**: `com.donduren.electrodemo`
- **Main entry**: `dist/scripts/main.js` (compiled from TypeScript)

## Critical Implementation Notes

1. **TypeScript**: Main process code is in TypeScript (`scripts/*.ts`). Run `npm run build` to compile to `dist/`. The `npm start` command builds automatically. Renderer logic (`counter.js`) remains JavaScript for now.

2. **No preload yet**: Current setup uses `nodeIntegration: true` directly. IPC is used for menu-to-renderer communication. For production, migrate to preload scripts + contextIsolation for security.

3. **Dependencies**:
   - `electron`: Desktop framework runtime
   - `electron-builder`: Packaging tool (dev only)
   - `typescript`: TypeScript compiler (dev only)
   - `@types/node`: Node.js type definitions (dev only)

4. **UI and menu features present**: Counter UI, theme toggle, and application menu live in the project. Menu pattern: modular `buildMenu(win)` in [scripts/menu.ts](../../scripts/menu.ts), called from [scripts/main.ts](../../scripts/main.ts). IPC is used for menu-to-renderer actions via `webContents.send()`.

5. **Window state persistence**: Window size/position/maximized state are saved to `app.getPath('userData')/window-state.json` and restored on launch (see [scripts/main.ts](../../scripts/main.ts#L60-L113)).

## When Modifying

- **TypeScript files**: Edit `.ts` files in `scripts/`, then run `npm run build` (or use `npm start` which builds automatically). Compiled output goes to `dist/scripts/`.
- **Adding features**: Keep main.ts minimal; use preload + IPC for renderer-main communication when adding main/renderer interactions.
- **Menu changes**: Edit [scripts/menu.ts](../../scripts/menu.ts) template; custom menu items can invoke `app.quit()`, `shell.openExternal()`, or use `webContents.send()` to notify the renderer.
- **UI changes**: Edit [index.html](../../index.html) and [style.css](../../style.css); renderer logic lives in [scripts/counter.js](../../scripts/counter.js).
- **Packaging**: Modify build config in [package.json](../../package.json) for new platforms/signing.
- **Security**: Never enable nodeIntegration in production; use context isolation + preload scripts.
