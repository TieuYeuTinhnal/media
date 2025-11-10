# Architecture Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Electron App                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────┐              ┌──────────────────────┐       │
│  │  Main Process │◄────IPC─────►│  Renderer Process    │       │
│  │   (main.js)   │              │   (renderer.ts)      │       │
│  └───────────────┘              └──────────────────────┘       │
│         │                                   │                   │
│         │ File Dialogs                      │                   │
│         │ Save/Load                         │                   │
│         └───────────────────────────────────┘                   │
│                                             │                   │
└─────────────────────────────────────────────┼───────────────────┘
                                              │
                 ┌────────────────────────────┴────────────────────────┐
                 │                                                     │
        ┌────────▼─────────┐                            ┌─────────────▼──────┐
        │ ParticleManager  │                            │   UIController      │
        │                  │                            │                     │
        │ - Creates        │                            │ - Binds inputs     │
        │ - Updates        │◄──────Settings────────────│ - Handles events   │
        │ - Manages        │                            │ - Updates UI       │
        └────────┬─────────┘                            └─────────────────────┘
                 │                                               │
                 │ 1..N                                         │
        ┌────────▼─────────┐                            ┌───────▼──────────┐
        │ ParticleEmitter  │                            │  TreePanel       │
        │                  │                            │  SettingsPanel   │
        │ - Position       │                            │  ControlBar      │
        │ - Config         │                            └──────────────────┘
        │ - Active state   │
        └────────┬─────────┘
                 │
                 │ Uses
        ┌────────▼─────────┐
        │  ParticlePool    │
        │                  │
        │ - Obtains        │
        │ - Releases       │
        │ - Manages        │
        └────────┬─────────┘
                 │
                 │ Contains
        ┌────────▼─────────┐
        │    Particle      │◄───────────────┐
        │                  │                 │
        │ - Position       │                 │
        │ - Velocity       │        Renders  │
        │ - Visual props   │                 │
        └────────┬─────────┘                 │
                 │                   ┌────────┴────────┐
                 │                   │ CanvasRenderer  │
                 │                   │                 │
                 │ Updates           │ - Clear         │
        ┌────────▼─────────┐         │ - Grid          │
        │ CollisionHandler │         │ - Particles     │
        │                  │         └─────────────────┘
        │ - Boundaries     │
        │ - Obstacles      │
        └────────┬─────────┘
                 │
                 │ Uses
        ┌────────▼─────────┐
        │  PhysicsWorld    │
        │                  │
        │ - Matter.js      │
        │ - Obstacles      │
        └──────────────────┘

        ┌──────────────────┐         ┌──────────────────┐
        │ AnimationBaker   │────────►│  SpineExporter   │
        │                  │ Frames  │                  │
        │ - Records        │         │ - Bones          │
        │ - Keyframes      │         │ - Slots          │
        └──────────────────┘         │ - Animations     │
                                     └──────────────────┘
```

## Data Flow

### Initialization Flow
```
1. Electron launches main.js
2. Main process creates BrowserWindow
3. Loads index.html
4. HTML loads renderer.js (compiled from renderer.ts)
5. App class initializes:
   - ParticleManager
   - CanvasRenderer
   - PhysicsWorld
   - UIController
6. UIController sets up event listeners
7. Creates default emitter
8. Starts render loop
```

### Simulation Flow
```
User clicks "Simulate"
     │
     ▼
UIController.toggleSimulation()
     │
     ▼
ParticleEmitter.start()
     │
     ▼
App.update(deltaTime)
     │
     ├─► ParticleManager.update()
     │        │
     │        └─► ParticleEmitter.update()
     │                 │
     │                 ├─► emitParticle() → ParticlePool.obtain()
     │                 │
     │                 └─► Particle.update() (for each particle)
     │
     ├─► PhysicsWorld.update()
     │
     ├─► CollisionHandler.checkParticleCollisions()
     │
     └─► AnimationBaker.update() (if recording)
```

### Rendering Flow
```
requestAnimationFrame()
     │
     ▼
App.render()
     │
     ├─► Calculate deltaTime
     │
     ├─► App.update(deltaTime)
     │
     └─► App.draw()
          │
          ├─► CanvasRenderer.clear()
          │
          ├─► CanvasRenderer.renderGrid()
          │
          └─► CanvasRenderer.renderParticles()
                   │
                   └─► For each particle:
                        - Transform
                        - Rotate
                        - Scale
                        - Draw shape
```

### Export Flow
```
User clicks "Record"
     │
     ▼
AnimationBaker.startRecording()
     │
     ▼
... simulation runs ...
     │
     ├─► AnimationBaker.update() captures frames
     │
     └─► Stores particle positions, rotations, scales
     │
     ▼
User clicks "Export to Spine"
     │
     ▼
SpineExporter.exportAnimation(frames, fps)
     │
     ├─► Create bones for each particle
     │
     ├─► Create slots for each bone
     │
     ├─► Generate keyframes from recorded data
     │
     └─► Build Spine JSON structure
     │
     ▼
IPC: invoke('export-spine', spineData)
     │
     ▼
Main process: showSaveDialog()
     │
     ▼
Write JSON to file
```

## Component Responsibilities

### Core Layer
| Component | Responsibility |
|-----------|---------------|
| **Particle** | Individual particle state and behavior |
| **ParticlePool** | Memory management and object reuse |
| **ParticleEmitter** | Emission logic and particle initialization |
| **ParticleManager** | Orchestrates multiple emitters |

### Configuration Layer
| Component | Responsibility |
|-----------|---------------|
| **ParticleConfig** | Type-safe configuration interface |
| **ParticlePresets** | Pre-built particle effect configurations |

### Physics Layer
| Component | Responsibility |
|-----------|---------------|
| **PhysicsWorld** | Matter.js integration and world management |
| **Obstacle** | Static collision shapes |
| **CollisionHandler** | Particle collision detection and response |

### Rendering Layer
| Component | Responsibility |
|-----------|---------------|
| **CanvasRenderer** | Particle and shape rendering |
| **GridRenderer** | Background grid visualization |

### UI Layer
| Component | Responsibility |
|-----------|---------------|
| **UIController** | Main UI orchestration and event handling |
| **TreePanel** | Emitter list management |
| **SettingsPanel** | Tab navigation |
| **ControlBar** | Bottom controls and status display |

### Export Layer
| Component | Responsibility |
|-----------|---------------|
| **AnimationBaker** | Records animation frames |
| **SpineExporter** | Converts frames to Spine JSON |

### Utility Layer
| Component | Responsibility |
|-----------|---------------|
| **Vector2D** | 2D vector mathematics |
| **MathUtils** | Mathematical utilities |
| **ColorUtils** | Color conversion and interpolation |

## Design Patterns

### Object Pool Pattern
```typescript
// ParticlePool manages reusable Particle objects
class ParticlePool {
    obtain(): Particle | null {
        // Reuse inactive particle or create new
    }
    free(particle: Particle): void {
        // Mark particle as inactive for reuse
    }
}
```
**Benefits**: Eliminates GC pressure, consistent performance

### Manager Pattern
```typescript
// ParticleManager coordinates multiple emitters
class ParticleManager {
    private emitters: Map<string, ParticleEmitter>;
    update(deltaTime: number): void {
        // Update all emitters
    }
}
```
**Benefits**: Centralized control, easy iteration

### Strategy Pattern
```typescript
// Different emitter behaviors via configuration
interface ParticleConfig {
    // 30+ configurable parameters
}
```
**Benefits**: Flexible behavior without code changes

### Observer Pattern
```typescript
// UI responds to particle system events
class UIController {
    updateParticleCount(count: number): void {
        // Update display
    }
}
```
**Benefits**: Loose coupling between systems

## Performance Optimizations

### 1. Object Pooling
- Pre-allocate 1,000 particles
- Grow pool on demand up to max size
- Reuse inactive particles
- Zero allocations during simulation

### 2. Efficient Rendering
- Single canvas context
- Batch transforms
- Skip inactive particles
- Minimize state changes

### 3. Update Optimizations
- Fixed timestep for physics
- Capped deltaTime to prevent spiral of death
- Early exit for inactive emitters
- Boundary checks before full collision detection

### 4. Memory Management
- Type arrays for particle data (future)
- Clear references when removing emitters
- Limit recording frame buffer

## Extension Points

### Adding New Shapes
```typescript
// In CanvasRenderer.renderShape()
case 'custom':
    this.drawCustomShape();
    break;
```

### Adding New Forces
```typescript
// In ParticleEmitter.updateParticle()
if (config.enableVortex) {
    particle.applyForce(vortexX, vortexY);
}
```

### Adding New Presets
```typescript
// In ParticlePresets
static customEffect(): ParticleConfig {
    return { /* configuration */ };
}
```

### Custom Export Formats
```typescript
// New exporter class
class UnityExporter {
    export(frames: BakedFrame[]): UnityAnimationData {
        // Convert to Unity format
    }
}
```

## Thread Safety

### Main Process (Node.js)
- File system operations (async)
- IPC message handling
- Dialog management

### Renderer Process (Chromium)
- Particle simulation (single-threaded)
- Canvas rendering (main thread)
- UI event handling (main thread)

**Note**: All particle updates happen synchronously on the main thread. For very high particle counts, consider Web Workers for physics calculations (future enhancement).

## Error Handling

### Graceful Degradation
```typescript
// Pool exhaustion
if (!particle) {
    console.warn('Particle pool exhausted');
    return; // Skip emission
}
```

### Validation
```typescript
// Configuration bounds
value = MathUtils.clamp(value, min, max);
```

### User Feedback
```typescript
// Export failures
if (!result.success) {
    alert('Failed to export: ' + result.error);
}
```

## Testing Strategy

### Unit Tests (Recommended)
- Particle lifecycle
- Pool management
- Math utilities
- Color utilities
- Configuration validation

### Integration Tests (Recommended)
- Emitter creation
- Particle emission
- Collision detection
- Export generation

### Manual Testing
- UI interactions
- Real-time parameter changes
- Save/load functionality
- Export verification

## Deployment

### Development Build
```bash
npm run build
npm start
```

### Production Build (Future)
```bash
npm run build:prod
npm run package
```

### Platform-specific Packaging
- **Windows**: electron-builder with NSIS
- **macOS**: electron-builder with DMG
- **Linux**: electron-builder with AppImage

---

This architecture provides a solid foundation for a professional particle effects tool with clear separation of concerns and room for future enhancements.
