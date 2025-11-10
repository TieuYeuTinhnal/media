# Application Icons

This directory should contain application icons for distribution packages.

## Required Files

Place your application icons here:

- **icon.png** - For Linux builds (512x512 or 1024x1024 pixels)
- **icon.ico** - For Windows builds (256x256 with multiple sizes embedded)
- **icon.icns** - For macOS builds (512x512 or 1024x1024 pixels)

## Creating Icons

### From a Source PNG

If you have a high-resolution PNG (1024x1024), you can generate the required formats:

**Windows ICO:**
Use online tools like:
- https://www.icoconverter.com/
- https://convertio.co/png-ico/

Or use ImageMagick:
```bash
convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico
```

**macOS ICNS:**
Use online tools or macOS built-in tools:
```bash
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
rm -rf icon.iconset
```

## Default Behavior

If no icons are provided, electron-builder will use Electron's default icon.

To add your custom icons:
1. Create or obtain icons in the required formats
2. Place them in this directory
3. Rebuild the application: `npm run dist`

## Icon Design Tips

- Use a square design that works well at small sizes
- Avoid fine details that won't be visible at 16x16
- Use high contrast colors
- Test at multiple sizes
- Consider the application's purpose and branding

## Example Icon Themes

For a particle effects tool, consider:
- Sparkles or particle burst
- Colorful dots/circles pattern
- Abstract energy effect
- Simplified atom/molecule
- Geometric pattern with motion blur

---

**Note:** This is a placeholder directory. Add your actual icon files before building distribution packages.
