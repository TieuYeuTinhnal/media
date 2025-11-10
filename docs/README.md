# Spine Particle Studio

A powerful Electron-based desktop application for creating particle effects and exporting them to Spine2D format.

## Features

- **Real-time Particle Simulation**: 60 FPS rendering with up to 10,000 particles
- **Advanced Physics**: Collision detection, gravity, wind, and drag forces
- **Professional UI**: Dark-themed interface with intuitive controls
- **Spine2D Export**: Bake animations to Spine-compatible JSON format
- **10 Built-in Presets**: Fire, Smoke, Explosion, Sparkles, Rain, Snow, Magic Portal, Blood Splatter, Dust Cloud, Electric Shock
- **Object Pooling**: Efficient memory management for smooth performance
- **Save/Load Projects**: Preserve your particle configurations
- **Customizable Parameters**: 30+ parameters for complete control

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build TypeScript files:
```bash
npm run build
```

3. Run the application:
```bash
npm start
```

## Development

### Watch Mode
Run TypeScript compiler in watch mode:
```bash
npm run watch
```

In another terminal, start Electron:
```bash
npm start
```

### Project Structure

```
spine-particle-studio/
├── main.js                 # Electron main process
├── index.html              # UI layout
├── styles.css              # Styling
├── src/
│   ├── core/              # Core particle system
│   │   ├── Particle.ts
│   │   ├── ParticlePool.ts
│   │   ├── ParticleEmitter.ts
│   │   └── ParticleManager.ts
│   ├── config/            # Configuration
│   │   └── ParticleConfig.ts
│   ├── physics/           # Physics system
│   │   ├── PhysicsWorld.ts
│   │   ├── Obstacle.ts
│   │   └── CollisionHandler.ts
│   ├── renderer/          # Rendering
│   │   ├── CanvasRenderer.ts
│   │   └── GridRenderer.ts
│   ├── ui/                # UI controller
│   │   └── UIController.ts
│   ├── export/            # Export system
│   │   ├── SpineExporter.ts
│   │   └── AnimationBaker.ts
│   ├── utils/             # Utilities
│   │   ├── Vector2D.ts
│   │   ├── MathUtils.ts
│   │   └── ColorUtils.ts
│   ├── presets/           # Particle presets
│   │   └── ParticlePresets.ts
│   ├── renderer.ts        # Renderer entry point
│   └── index.ts           # Main exports
└── docs/
    └── README.md
```

## Usage

### Creating a New Emitter

1. Click the "New" button in the left panel
2. The new emitter will be added to the tree view
3. Click on the emitter to select it

### Configuring Particles

#### Init Tab
- **Timing**: Delay, duration, time scale
- **Emission**: Radius, count, rate, variety
- **Life**: Minimum and maximum lifetime
- **Speed**: Speed range, angle, and spread
- **Scale**: Size range and scale over time
- **Rotation**: Initial rotation and rotation speed
- **Mass**: Mass range for physics
- **Appearance**: Color, shape, and texture

#### Update Tab
- **Forces**: Gravity X/Y, wind X/Y, drag
- **Scale Over Time**: Start and end scale
- **Alpha Over Time**: Start and end opacity
- **Color Over Time**: Start and end colors

#### Physics Tab
- **Collision**: Radius, bounce, friction
- **Kill on Collision**: Remove particles on impact
- **Layer**: Collision layer selection
- **Boundaries**: Enable bounds and offscreen killing

#### Settings Tab
- **Project**: Save and load projects
- **Export**: Export to Spine JSON format
- **Performance**: Max particles, object pooling
- **Presets**: Load built-in presets

### Simulating Particles

1. Select an emitter
2. Click the "Simulate" button (green)
3. Particles will start emitting from the center of the canvas
4. Click again to stop

### Recording and Exporting

1. Start simulation
2. Click the "Record" button (red)
3. Let the animation play
4. Click "Record" again to stop
5. Go to Settings tab
6. Click "Export to Spine"
7. Choose a file location
8. The animation will be saved as Spine-compatible JSON

### Loading Presets

1. Select an emitter
2. Go to Settings tab
3. Choose a preset from the dropdown
4. Click "Load Preset"
5. The emitter will be configured with preset values

## Keyboard Shortcuts

- **Space**: Toggle simulation
- **R**: Toggle recording
- **S**: Save project
- **L**: Load project

## Particle Parameters

### Timing
- **Delay**: Time before emission starts (ms)
- **Duration**: How long to emit (ms, 0 = infinite)
- **Time Scale**: Speed multiplier for simulation

### Emission
- **Radius**: Spawn area radius
- **Count**: Total particles to emit
- **Rate**: Particles per second
- **Variety**: Random variation percentage

### Life
- **Min/Max**: Particle lifetime range (seconds)

### Speed
- **Min/Max**: Initial speed range
- **Angle**: Base direction (degrees, 0 = right, 90 = down, 270 = up)
- **Spread**: Angular spread (degrees)

### Scale
- **Min/Max**: Initial size range
- **Start/End**: Size at birth and death

### Rotation
- **Min/Max**: Initial rotation range (degrees)
- **Speed**: Rotation speed (degrees/second)

### Mass
- **Min/Max**: Mass range (affects forces)

### Forces
- **Gravity X/Y**: Constant acceleration
- **Wind X/Y**: Constant force
- **Drag**: Velocity dampening

### Alpha
- **Start/End**: Opacity at birth and death (0-1)

### Color Over Time
- **Start/End**: Color interpolation from birth to death

### Physics
- **Radius**: Collision radius
- **Bounce**: Restitution coefficient (0-1)
- **Friction**: Surface friction (0-1)
- **Kill on Collision**: Destroy particle on impact
- **Layer**: Collision layer (0-3)
- **Bounds**: Constrain to canvas
- **Kill Offscreen**: Remove particles outside canvas

## Spine Export Format

The exporter creates a Spine JSON file with:
- One root bone
- One bone per particle
- One slot per particle
- Keyframes for position, rotation, and scale
- Compatible with Spine 4.1+

Each particle becomes a bone with full transform data baked at the specified FPS.

## Performance Tips

1. Use object pooling (enabled by default)
2. Limit max particles (default 10,000)
3. Use kill offscreen for continuous effects
4. Lower emission rate for better performance
5. Reduce particle count for complex effects
6. Use appropriate FPS for export (30-60)

## Troubleshooting

### Particles not appearing
- Check that simulation is running
- Verify particle count > 0
- Ensure life is > 0
- Check speed is > 0

### Poor performance
- Reduce max particles
- Lower emission rate
- Enable kill offscreen
- Use shorter particle lifetimes

### Export issues
- Record animation before exporting
- Check that particles were active during recording
- Verify FPS setting

## Technical Details

- Built with Electron 28
- TypeScript 5.3 with strict mode
- Matter.js for physics
- HTML5 Canvas for rendering
- 60 FPS target frame rate
- Object pooling for memory efficiency

## License

MIT

## Credits

Developed with ❤️ for particle effect artists and game developers.
