# API Reference

Complete API documentation for Spine2D Particle System Tool.

## Core Classes

### Particle

Represents a single particle in the system.

```typescript
class Particle {
  position: Vector2D;
  velocity: Vector2D;
  acceleration: Vector2D;
  scale: number;
  rotation: number;
  angularVelocity: number;
  color: RGBA;
  alpha: number;
  lifetime: number;
  age: number;
  active: boolean;
  
  update(deltaTime: number): void;
  reset(): void;
  getNormalizedAge(): number;
  isAlive(): boolean;
}
```

### ParticlePool

Object pool for efficient particle management.

```typescript
class ParticlePool {
  constructor(maxSize: number);
  
  acquire(): Particle | null;
  release(particle: Particle): void;
  releaseAll(): void;
  getAll(): Particle[];
  getActive(): Particle[];
  getActiveCount(): number;
  getTotalCount(): number;
  getMaxSize(): number;
  setMaxSize(size: number): void;
  clear(): void;
}
```

### ParticleEmitter

Basic particle emitter with continuous and burst emission.

```typescript
class ParticleEmitter {
  position: Vector2D;
  
  constructor(config: ParticleConfig);
  
  start(): void;
  stop(): void;
  update(deltaTime: number): void;
  getParticles(): Particle[];
  getTotalParticleCount(): number;
  getActiveParticleCount(): number;
  isActive(): boolean;
  isCompleted(): boolean;
  getConfig(): ParticleConfig;
  setConfig(config: ParticleConfig): void;
  clear(): void;
  burst(count: number): void;
}
```

### ParticleEmitterAdvanced

Extended emitter with affector support.

```typescript
class ParticleEmitterAdvanced extends ParticleEmitter {
  constructor(config: ParticleConfig);
  
  addAffector(affector: ParticleAffector): void;
  removeAffector(affector: ParticleAffector): void;
  getAffectors(): ParticleAffector[];
  clearAffectors(): void;
  getAffectorCount(): number;
}
```

### ParticleSystemManager

Manages multiple particle emitters.

```typescript
class ParticleSystemManager {
  registerConfig(name: string, config: ParticleConfig): void;
  getConfig(name: string): ParticleConfig | undefined;
  createEmitter(id: string, config: ParticleConfig, advanced?: boolean): ParticleEmitter;
  createEmitterFromConfig(id: string, configName: string, advanced?: boolean): ParticleEmitter | null;
  addEmitter(id: string, emitter: ParticleEmitter): void;
  getEmitter(id: string): ParticleEmitter | undefined;
  removeEmitter(id: string): boolean;
  update(deltaTime: number): void;
  startEmitter(id: string): boolean;
  stopEmitter(id: string): boolean;
  stopAll(): void;
  clearAll(): void;
  getAllEmitters(): ParticleEmitter[];
  getTotalParticleCount(): number;
  getEmitterCount(): number;
  clear(): void;
  exportConfigs(): string;
  importConfigs(json: string): void;
}
```

## Configuration

### ParticleConfig

Complete configuration interface.

```typescript
interface ParticleConfig {
  // Emission
  emissionRate: number;
  burstCount: number;
  maxParticles: number;
  
  // Lifetime
  lifetimeMin: number;
  lifetimeMax: number;
  
  // Position
  spawnRadius: number;
  spawnAngle: number;
  spawnAngleVariance: number;
  
  // Velocity
  speedMin: number;
  speedMax: number;
  direction: number;
  directionVariance: number;
  
  // Acceleration
  accelerationX: number;
  accelerationY: number;
  
  // Rotation
  rotationMin: number;
  rotationMax: number;
  angularVelocityMin: number;
  angularVelocityMax: number;
  
  // Scale
  startScaleMin: number;
  startScaleMax: number;
  endScaleMin: number;
  endScaleMax: number;
  
  // Color
  startColor: RGBA;
  endColor: RGBA;
  startAlpha: number;
  endAlpha: number;
  
  // Rendering
  blendMode: BlendMode;
  texture?: string;
  
  // Duration
  duration: number;
  loop: boolean;
  
  // Advanced
  useGaussian: boolean;
}
```

### BlendMode

```typescript
enum BlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen'
}
```

## Affectors

### ParticleAffector (Interface)

```typescript
interface ParticleAffector {
  enabled: boolean;
  affect(particle: Particle, deltaTime: number): void;
}
```

### GravityAffector

```typescript
class GravityAffector implements ParticleAffector {
  enabled: boolean;
  gravityX: number;
  gravityY: number;
  
  constructor(gravityX?: number, gravityY?: number);
  affect(particle: Particle, deltaTime: number): void;
}
```

### DragAffector

```typescript
class DragAffector implements ParticleAffector {
  enabled: boolean;
  drag: number;
  
  constructor(drag?: number);
  affect(particle: Particle, deltaTime: number): void;
}
```

### VortexAffector

```typescript
class VortexAffector implements ParticleAffector {
  enabled: boolean;
  centerX: number;
  centerY: number;
  strength: number;
  pull: number;
  
  constructor(centerX?: number, centerY?: number, strength?: number, pull?: number);
  setCenter(x: number, y: number): void;
  affect(particle: Particle, deltaTime: number): void;
}
```

### AttractorAffector

```typescript
class AttractorAffector implements ParticleAffector {
  enabled: boolean;
  x: number;
  y: number;
  strength: number;
  radius: number;
  
  constructor(x?: number, y?: number, strength?: number, radius?: number);
  setPosition(x: number, y: number): void;
  affect(particle: Particle, deltaTime: number): void;
}
```

### TurbulenceAffector

```typescript
class TurbulenceAffector implements ParticleAffector {
  enabled: boolean;
  strength: number;
  frequency: number;
  
  constructor(strength?: number, frequency?: number);
  affect(particle: Particle, deltaTime: number): void;
}
```

### ColorOverLifetimeAffector

```typescript
interface ColorGradientStop {
  time: number;
  color: RGBA;
}

class ColorOverLifetimeAffector implements ParticleAffector {
  enabled: boolean;
  gradient: ColorGradientStop[];
  
  constructor(gradient: ColorGradientStop[]);
  addColorStop(time: number, color: RGBA): void;
  clearGradient(): void;
  affect(particle: Particle, deltaTime: number): void;
}
```

### SizeOverLifetimeAffector

```typescript
enum SizeCurve {
  LINEAR = 'linear',
  EASE_IN = 'easeIn',
  EASE_OUT = 'easeOut',
  EASE_IN_OUT = 'easeInOut',
  CONSTANT = 'constant'
}

class SizeOverLifetimeAffector implements ParticleAffector {
  enabled: boolean;
  startSize: number;
  endSize: number;
  curve: SizeCurve;
  
  constructor(startSize?: number, endSize?: number, curve?: SizeCurve);
  setCurve(curve: SizeCurve): void;
  setSizes(start: number, end: number): void;
  affect(particle: Particle, deltaTime: number): void;
}
```

## Renderers

### ParticleRenderer

Canvas 2D renderer.

```typescript
class ParticleRenderer {
  constructor(canvas: HTMLCanvasElement);
  
  render(emitter: ParticleEmitter): void;
  renderMultiple(emitters: ParticleEmitter[]): void;
  renderParticleWithTexture(particle: Particle, image: HTMLImageElement | HTMLCanvasElement): void;
  clear(): void;
  getContext(): CanvasRenderingContext2D;
}
```

### WebGLParticleRenderer

WebGL renderer for high performance.

```typescript
class WebGLParticleRenderer {
  constructor(canvas: HTMLCanvasElement, maxParticles?: number);
  
  setTexture(image: HTMLImageElement | HTMLCanvasElement): void;
  render(emitter: ParticleEmitter): void;
  clear(): void;
  dispose(): void;
}
```

## Spine Integration

### SpineParticleEventHandler

```typescript
interface SpineEventData {
  name: string;
  intValue?: number;
  floatValue?: number;
  stringValue?: string;
}

interface EventEmitterConfig {
  eventName: string;
  emitter: ParticleEmitter;
  bone?: SpineBone;
  burst: boolean;
  burstCount?: number;
}

class SpineParticleEventHandler {
  registerEventEmitter(config: EventEmitterConfig): void;
  unregisterEventEmitter(eventName: string, emitter: ParticleEmitter): void;
  onEvent(eventData: SpineEventData): void;
  update(deltaTime: number): void;
  getAllEmitters(): ParticleEmitter[];
  clear(): void;
  stopAll(): void;
}
```

### BoneAttachment

```typescript
class BoneAttachment {
  static attach(emitter: ParticleEmitter, bone: SpineBone): () => void;
  static attachMultiple(attachments: [ParticleEmitter, SpineBone][]): () => void;
}
```

## Utilities

### Vector2D

```typescript
class Vector2D {
  x: number;
  y: number;
  
  constructor(x?: number, y?: number);
  
  add(v: Vector2D): Vector2D;
  subtract(v: Vector2D): Vector2D;
  multiply(scalar: number): Vector2D;
  divide(scalar: number): Vector2D;
  length(): number;
  lengthSquared(): number;
  normalize(): Vector2D;
  distance(v: Vector2D): number;
  distanceSquared(v: Vector2D): number;
  dot(v: Vector2D): number;
  rotate(angle: number): Vector2D;
  angle(): number;
  set(x: number, y: number): Vector2D;
  copy(v: Vector2D): Vector2D;
  clone(): Vector2D;
  zero(): Vector2D;
  
  static fromAngle(angle: number, length?: number): Vector2D;
  static lerp(a: Vector2D, b: Vector2D, t: number): Vector2D;
}
```

### MathUtils

```typescript
class MathUtils {
  static clamp(value: number, min: number, max: number): number;
  static lerp(a: number, b: number, t: number): number;
  static smoothstep(t: number): number;
  static randomRange(min: number, max: number): number;
  static randomGaussian(mean?: number, stdDev?: number): number;
  static degToRad(degrees: number): number;
  static radToDeg(radians: number): number;
  static easeInQuad(t: number): number;
  static easeOutQuad(t: number): number;
  static easeInOutQuad(t: number): number;
  static easeInCubic(t: number): number;
  static easeOutCubic(t: number): number;
  static easeInOutCubic(t: number): number;
  static randomInCircle(radius: number): { x: number; y: number };
  static map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
  static inRange(value: number, min: number, max: number): boolean;
}
```

### ColorUtils

```typescript
interface RGB {
  r: number;
  g: number;
  b: number;
}

interface RGBA extends RGB {
  a: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

class ColorUtils {
  static lerp(color1: RGBA, color2: RGBA, t: number): RGBA;
  static hexToRgb(hex: string): RGB;
  static rgbToHex(rgb: RGB): string;
  static rgbToHsl(rgb: RGB): HSL;
  static hslToRgb(hsl: HSL): RGB;
  static toRgbaString(rgba: RGBA): string;
  static toRgbString(rgb: RGB): string;
  static parseRgbaString(rgbaString: string): RGBA | null;
  static random(alpha?: number): RGBA;
}
```

### ParticleProfiler

```typescript
class ParticleProfiler {
  constructor(maxSamples?: number);
  
  beginUpdate(): number;
  endUpdate(startTime: number): void;
  beginRender(): number;
  endRender(startTime: number): void;
  updateFps(): void;
  setParticleCount(count: number): void;
  getAverageUpdateTime(): number;
  getAverageRenderTime(): number;
  getFps(): number;
  getPeakParticleCount(): number;
  getCurrentParticleCount(): number;
  getAverageTotalTime(): number;
  reset(): void;
  resetPeakParticleCount(): void;
  printStats(): void;
  getStats(): {
    fps: number;
    averageUpdateTime: number;
    averageRenderTime: number;
    averageTotalTime: number;
    currentParticles: number;
    peakParticles: number;
  };
}
```

### ConfigSerializer

```typescript
class ConfigSerializer {
  static toJson(config: ParticleConfig, pretty?: boolean): string;
  static fromJson(json: string): ParticleConfig;
  static toJsonMultiple(configs: Map<string, ParticleConfig>, pretty?: boolean): string;
  static fromJsonMultiple(json: string): Map<string, ParticleConfig>;
  static toBinary(config: ParticleConfig): ArrayBuffer;
  static fromBinary(buffer: ArrayBuffer): ParticleConfig;
  static saveToLocalStorage(key: string, config: ParticleConfig): void;
  static loadFromLocalStorage(key: string): ParticleConfig | null;
}
```

## Presets

### ParticlePresets

```typescript
class ParticlePresets {
  static fire(): ParticleConfig;
  static smoke(): ParticleConfig;
  static explosion(): ParticleConfig;
  static sparkle(): ParticleConfig;
  static rain(): ParticleConfig;
}
```

### AdvancedParticlePresets

```typescript
class AdvancedParticlePresets {
  static magicPortal(): ParticleConfig;
  static bloodSplatter(): ParticleConfig;
  static healingAura(): ParticleConfig;
  static electricShock(): ParticleConfig;
  static snow(): ParticleConfig;
  static dustCloud(): ParticleConfig;
}
```

## Editor

### ParticleEditor

```typescript
class ParticleEditor {
  constructor(config: ParticleConfig, emitter: ParticleEmitter, container: HTMLElement);
  
  getConfig(): ParticleConfig;
  setConfig(config: ParticleConfig): void;
}
```
