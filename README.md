# Spine2D Particle System Tool

A complete and professional particle system for Spine2D animations with TypeScript support.

## Features

✨ **Core Features**
- Full TypeScript support with strict mode
- Object pooling for optimal performance
- Configurable particle parameters (30+ settings)
- Continuous and burst emission modes
- Advanced physics simulation

🎨 **Visual Effects**
- Color gradients over lifetime
- Scale animation with easing curves
- Rotation and angular velocity
- Multiple blend modes (Normal, Add, Multiply, Screen)
- Alpha fade in/out

🔧 **Advanced Systems**
- 8 built-in affectors for complex behaviors
- Gravity, drag, vortex, and attractor forces
- Turbulence for chaotic motion
- Color and size over lifetime affectors
- Extensible affector interface

🎮 **Spine Integration**
- Bone attachment system
- Animation event triggering
- World position tracking
- Seamless integration with Spine runtime

🎭 **Rendering**
- Canvas 2D renderer
- WebGL renderer for high performance
- Batch rendering support
- Texture support

📦 **11 Built-in Presets**
- Fire, Smoke, Explosion
- Sparkles, Rain
- Magic Portal, Blood Splatter
- Healing Aura, Electric Shock
- Snow, Dust Cloud

🛠️ **Tools & Utilities**
- Performance profiler
- Configuration serializer (JSON/Binary)
- System manager for multiple emitters
- Live particle editor with UI

## Installation

```bash
npm install spine2d-particle-tool
```

## Quick Start

### Basic Usage

```typescript
import { ParticleEmitter, ParticleRenderer, ParticlePresets } from 'spine2d-particle-tool';

// Get canvas
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

// Create emitter with fire preset
const emitter = new ParticleEmitter(ParticlePresets.fire());
emitter.position.set(400, 300);
emitter.start();

// Create renderer
const renderer = new ParticleRenderer(canvas);

// Animation loop
function animate() {
  const deltaTime = 1/60; // or calculate from timestamps
  
  emitter.update(deltaTime);
  
  renderer.clear();
  renderer.render(emitter);
  
  requestAnimationFrame(animate);
}

animate();
```

### Using Affectors

```typescript
import { 
  ParticleEmitterAdvanced, 
  GravityAffector, 
  VortexAffector 
} from 'spine2d-particle-tool';

const emitter = new ParticleEmitterAdvanced(ParticlePresets.magicPortal());

// Add gravity
emitter.addAffector(new GravityAffector(0, 98));

// Add vortex effect
const vortex = new VortexAffector(400, 300, 150, 50);
emitter.addAffector(vortex);

emitter.start();
```

### Spine Integration

```typescript
import { SpineParticleEventHandler } from 'spine2d-particle-tool';

const eventHandler = new SpineParticleEventHandler();

// Register event
eventHandler.registerEventEmitter({
  eventName: 'attack',
  emitter: fireballEmitter,
  bone: handBone,
  burst: true,
  burstCount: 30
});

// In your animation state listener
animationState.addListener({
  event: (trackEntry, event) => {
    eventHandler.onEvent({
      name: event.data.name,
      intValue: event.intValue,
      floatValue: event.floatValue,
      stringValue: event.stringValue
    });
  }
});

// Update in game loop
eventHandler.update(deltaTime);
```

## System Architecture

### Core Components

```
ParticleEmitter
  └── ParticlePool
       └── Particle[]
       
ParticleEmitterAdvanced extends ParticleEmitter
  └── ParticleAffector[]
```

### Configuration

Create custom particle effects:

```typescript
import { ParticleConfig, BlendMode, createDefaultConfig } from 'spine2d-particle-tool';

const customConfig: ParticleConfig = {
  ...createDefaultConfig(),
  
  emissionRate: 50,
  maxParticles: 500,
  lifetimeMin: 1.0,
  lifetimeMax: 2.0,
  speedMin: 100,
  speedMax: 200,
  startColor: { r: 255, g: 0, b: 0, a: 1 },
  endColor: { r: 255, g: 255, b: 0, a: 0 },
  blendMode: BlendMode.ADD
};
```

## Performance

### Object Pooling
The particle system uses object pooling to minimize garbage collection:

```typescript
const pool = new ParticlePool(1000); // Pre-allocate 1000 particles
const particle = pool.acquire(); // Get from pool
pool.release(particle); // Return to pool
```

### WebGL Rendering
For high particle counts, use WebGL renderer:

```typescript
import { WebGLParticleRenderer } from 'spine2d-particle-tool';

const renderer = new WebGLParticleRenderer(canvas, 10000); // Support 10k particles
renderer.render(emitter);
```

### Profiling

```typescript
import { ParticleProfiler } from 'spine2d-particle-tool';

const profiler = new ParticleProfiler();

// In update loop
const updateStart = profiler.beginUpdate();
emitter.update(deltaTime);
profiler.endUpdate(updateStart);

// Print stats
profiler.printStats();
// => FPS: 60
// => Average Update Time: 2.5ms
// => Current Particles: 450
```

## Configuration Management

### Export/Import

```typescript
import { ConfigSerializer } from 'spine2d-particle-tool';

// Export to JSON
const json = ConfigSerializer.toJson(config, true);

// Import from JSON
const loadedConfig = ConfigSerializer.fromJson(json);

// Binary format (more compact)
const binary = ConfigSerializer.toBinary(config);
const loadedBinary = ConfigSerializer.fromBinary(binary);

// Local storage
ConfigSerializer.saveToLocalStorage('fire-effect', config);
const loaded = ConfigSerializer.loadFromLocalStorage('fire-effect');
```

### System Manager

```typescript
import { ParticleSystemManager } from 'spine2d-particle-tool';

const manager = new ParticleSystemManager();

// Register configurations
manager.registerConfig('fire', ParticlePresets.fire());
manager.registerConfig('smoke', ParticlePresets.smoke());

// Create emitters
manager.createEmitterFromConfig('fire1', 'fire');
manager.createEmitterFromConfig('fire2', 'fire');

// Update all
manager.update(deltaTime);

// Get stats
console.log(`Total particles: ${manager.getTotalParticleCount()}`);
console.log(`Active emitters: ${manager.getEmitterCount()}`);
```

## Affectors

### Available Affectors

- **GravityAffector** - Applies gravitational force
- **DragAffector** - Air resistance/damping
- **VortexAffector** - Spiral motion
- **AttractorAffector** - Attraction/repulsion to a point
- **TurbulenceAffector** - Noise-based chaos
- **ColorOverLifetimeAffector** - Multi-stop color gradients
- **SizeOverLifetimeAffector** - Size animation with curves

### Custom Affectors

```typescript
import { ParticleAffector, Particle } from 'spine2d-particle-tool';

class CustomAffector implements ParticleAffector {
  enabled = true;
  
  affect(particle: Particle, deltaTime: number): void {
    // Your custom behavior
    particle.velocity.x += Math.sin(particle.age) * deltaTime;
  }
}

emitter.addAffector(new CustomAffector());
```

## API Documentation

See [docs/API.md](docs/API.md) for complete API reference.

## Preset Library

See [docs/PRESETS.md](docs/PRESETS.md) for all built-in presets and how to create custom ones.

## Integration Guide

See [docs/INTEGRATION.md](docs/INTEGRATION.md) for detailed Spine2D integration instructions.

## Examples

Check the `examples/` directory for complete working examples:
- `basic-usage.ts` - Simple particle effects
- `complete-example.ts` - Advanced features showcase
- `spine-integration.ts` - Spine2D integration

## Browser Support

- Modern browsers with Canvas 2D support
- WebGL 1.0+ for WebGL renderer
- ES2020+ JavaScript features

## TypeScript

This library is written in TypeScript with strict mode enabled. All public APIs are fully typed.

```typescript
import type { ParticleConfig, Particle, ParticleAffector } from 'spine2d-particle-tool';
```

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please ensure:
- TypeScript strict mode compliance
- JSDoc comments for all public APIs
- Unit tests for new features
- Examples for major features

## Credits

Created for use with Spine2D animation runtime by Esoteric Software.
