# Spine Particle Studio

A powerful Electron-based desktop application for creating particle effects and exporting them to Spine2D format.

![Spine Particle Studio](https://img.shields.io/badge/electron-28.0.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.3.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

✨ **Real-time Particle Simulation** - 60 FPS rendering with up to 10,000 particles
🎨 **Professional UI** - Dark-themed interface matching professional tools
🔧 **30+ Parameters** - Complete control over particle behavior
🎮 **Physics Engine** - Collision detection, gravity, wind, and forces
💾 **Save/Load Projects** - Preserve your work
📤 **Spine2D Export** - Bake animations to Spine-compatible JSON
🎁 **10 Built-in Presets** - Ready-to-use particle effects

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Build TypeScript files
npm run build

# Run the application
npm start
```

### Development

```bash
# Watch mode for TypeScript compilation
npm run watch

# In another terminal, start Electron
npm start
```

## Built-in Presets

1. 🔥 **Fire** - Flickering flames with upward motion
2. 💨 **Smoke** - Rising smoke clouds
3. 💥 **Explosion** - Burst particle effect
4. ✨ **Sparkles** - Twinkling star particles
5. 🌧️ **Rain** - Falling rain droplets
6. ❄️ **Snow** - Gentle snowfall
7. 🌀 **Magic Portal** - Swirling magical effect
8. 🩸 **Blood Splatter** - Impact splatter effect
9. 🌫️ **Dust Cloud** - Expanding dust particles
10. ⚡ **Electric Shock** - Lightning bolt effect

## Usage

### Creating Particles

1. Click **"New"** in the left panel to create an emitter
2. Adjust parameters in the right panel (Init, Update, Physics, Settings tabs)
3. Click **"Simulate"** (green button) to start the effect
4. Adjust parameters in real-time to see changes

### Recording & Exporting

1. Click **"Record"** (red button) to start recording
2. Let the animation play
3. Click **"Record"** again to stop
4. Go to **Settings** tab → **"Export to Spine"**
5. Save the Spine JSON file

### Loading Presets

1. Select an emitter in the tree
2. Go to **Settings** tab
3. Choose a preset from dropdown
4. Click **"Load Preset"**

## UI Layout

```
┌─────────────┬──────────────────────┬─────────────┐
│             │                      │             │
│    Tree     │       Canvas         │  Settings   │
│   (Left)    │      (Center)        │   (Right)   │
│             │                      │             │
│  Emitters   │   Particle Preview   │  Init Tab   │
│    List     │    with Grid         │  Update Tab │
│             │                      │  Physics    │
│   [New]     │  [Controls Below]    │  Settings   │
└─────────────┴──────────────────────┴─────────────┘
```

## Project Structure

```
spine-particle-studio/
├── main.js                 # Electron main process
├── index.html              # UI layout
├── styles.css              # Dark theme styling
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── src/
│   ├── core/              # Particle system
│   ├── config/            # Configuration types
│   ├── physics/           # Physics simulation
│   ├── renderer/          # Canvas rendering
│   ├── ui/                # UI controllers
│   ├── export/            # Spine export
│   ├── utils/             # Helper utilities
│   ├── presets/           # Built-in effects
│   ├── renderer.ts        # Main entry point
│   └── index.ts           # Library exports
└── docs/
    └── README.md          # Detailed documentation
```

## Key Parameters

### Init Tab
- **Timing**: Delay, duration, time scale
- **Emission**: Radius, count, rate, variety
- **Life**: Min/max lifetime
- **Speed**: Speed range, angle, spread
- **Scale**: Size range and scaling
- **Rotation**: Initial rotation and spin
- **Mass**: Physics mass
- **Appearance**: Color, shape, texture

### Update Tab
- **Forces**: Gravity, wind, drag
- **Scale Over Time**: Birth to death scaling
- **Alpha Over Time**: Opacity fade
- **Color Over Time**: Color interpolation

### Physics Tab
- **Collision**: Radius, bounce, friction
- **Boundaries**: Canvas bounds, offscreen killing
- **Layers**: Collision layer system

### Settings Tab
- **Project**: Save/load functionality
- **Export**: Spine JSON export with FPS control
- **Performance**: Max particles, pooling
- **Presets**: Load built-in effects

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Toggle simulation |
| R | Toggle recording |
| S | Save project |
| L | Load project |

## Technical Details

- **Electron**: 28.0.0 (cross-platform desktop)
- **TypeScript**: 5.3.3 (strict mode)
- **Matter.js**: 0.19.0 (physics engine)
- **Rendering**: HTML5 Canvas (60 FPS target)
- **Architecture**: Object pooling for memory efficiency

## Performance Tips

1. ✅ Use object pooling (enabled by default)
2. ✅ Limit max particles appropriately
3. ✅ Enable "Kill Offscreen" for continuous effects
4. ✅ Use lower emission rates for complex scenes
5. ✅ Adjust FPS for export (30-60 recommended)

## Spine Export Format

The exporter creates Spine 4.1+ compatible JSON:
- One root bone
- One bone per particle
- Full transform keyframes (position, rotation, scale)
- Configurable FPS (30-120)
- Compatible with Spine runtime

## Troubleshooting

**Particles not appearing?**
- Check simulation is running (green button active)
- Verify particle count > 0
- Ensure life > 0 and speed > 0

**Poor performance?**
- Reduce max particles in Settings
- Lower emission rate
- Enable "Kill Offscreen"
- Use shorter lifetimes

**Export not working?**
- Record animation first (red button)
- Ensure particles were visible during recording
- Check FPS setting in Settings tab

## Documentation

Full documentation available in [docs/README.md](docs/README.md)

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## Support

For questions and support, please open an issue on GitHub.

---

Made with ❤️ for particle effect artists and game developers
