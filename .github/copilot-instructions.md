# ElectroDemo - AI Coding Agent Instructions

## Project Overview
ElectroDemo is a minimal Electron desktop application demonstrating basic Electron setup with electron-builder for cross-platform packaging (macOS `.dmg` and Windows `.nsis` installers).

## Architecture & Key Files

### Entry Point
- **[main.js](../../main.js)**: Electron main process. Creates a 800x600 BrowserWindow on app ready, loads `index.html`. Uses `nodeIntegration: true` for backward compatibility.
- **[index.html](../../index.html)**: Renderer process UI. Simple static HTML file loaded into the window.

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

3. **No additional features present**: This is a bare-bones template. Any new functionality (menus, windows, IPC) should follow standard Electron patterns.

## When Modifying

- **Adding features**: Keep main.js minimal; use preload + IPC for renderer-main communication.
- **UI changes**: Edit index.html or add CSS/JS assets (note: nothing currently exists).
- **Packaging**: Modify `build` config in package.json for new platforms/signing.
- **Security**: Never enable `nodeIntegration` in production; use context isolation + preload scripts.
