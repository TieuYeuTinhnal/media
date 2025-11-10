# Build and Distribution Guide

## Prerequisites

```bash
npm install
```

This will install all dependencies including:
- Electron 33.2.0 (upgraded from 28.0.0 for security)
- electron-builder for packaging
- TypeScript compiler
- Matter.js physics engine

## Development

### Run in Development Mode

```bash
npm run build    # Compile TypeScript
npm start        # Start Electron app
```

### Watch Mode (Auto-rebuild)

```bash
npm run watch    # Terminal 1: Watch TypeScript files
npm start        # Terminal 2: Run Electron
```

## Building Distributables

### Build for Current Platform

```bash
npm run dist
```

This creates installers in the `release/` directory.

### Platform-Specific Builds

**Windows:**
```bash
npm run dist:win
```
Outputs:
- `release/spine-particle-studio-1.0.0-setup.exe` (NSIS installer)
- `release/spine-particle-studio-1.0.0.exe` (Portable)

**macOS:**
```bash
npm run dist:mac
```
Outputs:
- `release/Spine Particle Studio-1.0.0.dmg`
- `release/Spine Particle Studio-1.0.0-mac.zip`

**Linux:**
```bash
npm run dist:linux
```
Outputs:
- `release/spine-particle-studio-1.0.0.AppImage`
- `release/spine-particle-studio_1.0.0_amd64.deb`

### Test Build Without Creating Installer

```bash
npm run pack
```

This creates an unpacked directory for testing without full packaging.

## Application Icons

To add custom icons, place them in the `build/` directory:

```
build/
├── icon.png       # Linux (512x512 or 1024x1024)
├── icon.ico       # Windows (256x256 with multiple sizes)
└── icon.icns      # macOS (512x512 or 1024x1024)
```

**Icon Requirements:**
- **PNG**: 512x512 or 1024x1024 pixels
- **ICO**: Multiple sizes (16, 32, 48, 64, 128, 256)
- **ICNS**: Multiple sizes for macOS

### Generate Icons from PNG

You can use online tools or:

**For ICO (Windows):**
```bash
# Using ImageMagick
convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico
```

**For ICNS (macOS):**
```bash
# Using iconutil (macOS only)
mkdir icon.iconset
sips -z 16 16 icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32 icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32 icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64 icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128 icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256 icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256 icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512 icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512 icon.png --out icon.iconset/icon_512x512.png
iconutil -c icns icon.iconset
```

## Code Signing (Optional)

### Windows

Set environment variables:
```bash
export CSC_LINK=/path/to/certificate.pfx
export CSC_KEY_PASSWORD=your_password
```

### macOS

```bash
export CSC_LINK=/path/to/certificate.p12
export CSC_KEY_PASSWORD=your_password
export APPLE_ID=your@email.com
export APPLE_ID_PASSWORD=app-specific-password
```

Then run the build command.

## Continuous Integration

### GitHub Actions Example

```yaml
name: Build

on: [push, pull_request]

jobs:
  build:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - run: npm install
      - run: npm run build
      - run: npm run dist
      
      - uses: actions/upload-artifact@v3
        with:
          name: ${{ matrix.os }}-build
          path: release/*
```

## Troubleshooting

### Build Fails on Windows

Ensure you have Windows Build Tools:
```bash
npm install --global windows-build-tools
```

### Build Fails on Linux

Install required dependencies:
```bash
sudo apt-get install -y libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
```

### "Cannot find module" Error

Rebuild dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Icons Not Appearing

1. Ensure icon files are in `build/` directory
2. Icons must meet size requirements
3. Rebuild after adding icons: `npm run dist`

## Distribution

### Windows

- Upload `.exe` installer to your website or GitHub releases
- NSIS installer handles installation and Start Menu shortcuts
- Portable `.exe` requires no installation

### macOS

- Upload `.dmg` for disk image installation
- Consider notarization for macOS 10.15+
- `.zip` is for automated installations

### Linux

- AppImage is universal and runs on most distros
- `.deb` for Debian/Ubuntu users
- Consider Snap/Flatpak for wider distribution

## File Size Optimization

Current build size: ~200-300 MB (includes Electron runtime)

To reduce size:
- Remove unused dependencies
- Use `asar` compression (enabled by default)
- Remove development dependencies from production build

## Updates

Consider implementing auto-updates:

```bash
npm install electron-updater
```

See electron-builder documentation for update configuration.

## Support

For build issues, check:
- electron-builder documentation
- GitHub Issues
- Stack Overflow

---

**Version:** 1.0.0  
**Last Updated:** November 2024
