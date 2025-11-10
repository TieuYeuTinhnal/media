# Particle Presets Library

Complete guide to all built-in particle effect presets.

## Basic Presets

### Fire

Rising flames with heat distortion effect.

```typescript
import { ParticlePresets } from 'spine2d-particle-tool';

const config = ParticlePresets.fire();
```

**Characteristics:**
- Emission Rate: 50 particles/second
- Lifetime: 0.5-1.5 seconds
- Direction: Upward with variance
- Color: Yellow/orange to red
- Blend Mode: Additive
- Use Case: Torches, campfires, burning effects

**Customization Tips:**
```typescript
const config = ParticlePresets.fire();
config.emissionRate = 80; // More intense fire
config.startColor = { r: 100, g: 200, b: 255, a: 1 }; // Blue fire
```

### Smoke

Billowing smoke clouds that rise and dissipate.

```typescript
const config = ParticlePresets.smoke();
```

**Characteristics:**
- Emission Rate: 20 particles/second
- Lifetime: 2-4 seconds
- Scale: Grows over time (0.5 → 2.0)
- Color: Dark to light gray
- Blend Mode: Normal
- Use Case: Steam, industrial smoke, fog

### Explosion

Burst of particles expanding radially.

```typescript
const config = ParticlePresets.explosion();
```

**Characteristics:**
- Burst Mode: 100 particles instantly
- Lifetime: 0.5-1.5 seconds
- Velocity: Radial outward (100-300 speed)
- Affected by gravity
- Color: Orange to dark
- Blend Mode: Additive
- Use Case: Impact effects, bomb blasts, collisions

**Usage:**
```typescript
const emitter = new ParticleEmitter(ParticlePresets.explosion());
emitter.position.set(x, y);
emitter.start(); // Triggers burst
```

### Sparkle

Twinkling particles with gentle movement.

```typescript
const config = ParticlePresets.sparkle();
```

**Characteristics:**
- Emission Rate: 40 particles/second
- Lifetime: 0.3-1.0 seconds
- Color: Bright white/yellow
- Scale: Pulse effect
- Blend Mode: Additive
- Use Case: Magic effects, treasure glints, stars

### Rain

Falling water droplets.

```typescript
const config = ParticlePresets.rain();
```

**Characteristics:**
- Emission Rate: 100 particles/second
- High velocity downward (300-400)
- Long spawn area (radius 200)
- Color: Blue/white
- Use Case: Weather effects, waterfalls

**Tips:**
```typescript
const config = ParticlePresets.rain();
config.spawnRadius = 500; // Wider rain area
config.accelerationX = 50; // Wind effect
```

## Advanced Presets

### Magic Portal

Swirling magical energy effect.

```typescript
import { AdvancedParticlePresets } from 'spine2d-particle-tool';

const config = AdvancedParticlePresets.magicPortal();
```

**Characteristics:**
- Emission Rate: 80 particles/second
- Circular spawn pattern
- Color: Purple/blue gradient
- Blend Mode: Additive
- Best with: VortexAffector, TurbulenceAffector

**Recommended Setup:**
```typescript
const emitter = new ParticleEmitterAdvanced(AdvancedParticlePresets.magicPortal());
emitter.addAffector(new VortexAffector(centerX, centerY, 150, 50));
emitter.addAffector(new TurbulenceAffector(30, 2));
```

### Blood Splatter

Violent burst effect for damage indication.

```typescript
const config = AdvancedParticlePresets.bloodSplatter();
```

**Characteristics:**
- Burst Mode: 50 particles
- Short lifetime (0.3-0.8s)
- High velocity radial burst
- Color: Dark red
- Affected by gravity
- Use Case: Combat effects, damage indicators

### Healing Aura

Gentle glowing particles for healing effects.

```typescript
const config = AdvancedParticlePresets.healingAura();
```

**Characteristics:**
- Emission Rate: 30 particles/second
- Gentle upward float
- Color: Soft green to yellow
- Semi-transparent
- Blend Mode: Additive
- Use Case: Health regeneration, buffs, power-ups

**Enhanced Version:**
```typescript
const emitter = new ParticleEmitterAdvanced(AdvancedParticlePresets.healingAura());
emitter.addAffector(new GravityAffector(0, -30)); // Float upward
const colorAffector = new ColorOverLifetimeAffector([
  { time: 0, color: { r: 150, g: 255, b: 150, a: 1 } },
  { time: 0.5, color: { r: 255, g: 255, b: 200, a: 0.8 } },
  { time: 1, color: { r: 100, g: 200, b: 100, a: 0 } }
]);
emitter.addAffector(colorAffector);
```

### Electric Shock

Lightning particles for electricity effects.

```typescript
const config = AdvancedParticlePresets.electricShock();
```

**Characteristics:**
- Emission Rate: 100 particles/second
- Very short lifetime (0.1-0.3s)
- Chaotic motion
- Color: Bright cyan/white
- Blend Mode: Additive
- Best with: TurbulenceAffector

**Usage:**
```typescript
const emitter = new ParticleEmitterAdvanced(AdvancedParticlePresets.electricShock());
emitter.addAffector(new TurbulenceAffector(100, 5)); // Erratic motion
```

### Snow

Gently falling snowflakes.

```typescript
const config = AdvancedParticlePresets.snow();
```

**Characteristics:**
- Emission Rate: 50 particles/second
- Long lifetime (3-6s)
- Gentle fall with drift
- Color: Pure white
- Use Case: Winter scenes, weather effects

**Wind Effect:**
```typescript
const emitter = new ParticleEmitterAdvanced(AdvancedParticlePresets.snow());
emitter.addAffector(new AttractorAffector(
  screenWidth + 100, // Off-screen right
  0,
  20, // Gentle pull
  0 // Infinite range
));
```

### Dust Cloud

Expanding dust particle burst.

```typescript
const config = AdvancedParticlePresets.dustCloud();
```

**Characteristics:**
- Burst Mode: 80 particles
- Expands then settles
- Color: Brown/tan
- Scale grows over time
- Use Case: Impact on ground, player landing

## Creating Custom Presets

### Template

```typescript
import { ParticleConfig, BlendMode, createDefaultConfig } from 'spine2d-particle-tool';

export function myCustomPreset(): ParticleConfig {
  return {
    ...createDefaultConfig(),
    
    // Emission
    emissionRate: 30,
    burstCount: 0,
    maxParticles: 300,
    
    // Lifetime
    lifetimeMin: 1.0,
    lifetimeMax: 2.0,
    
    // Position
    spawnRadius: 10,
    
    // Velocity
    speedMin: 50,
    speedMax: 100,
    direction: -Math.PI / 2, // Up
    directionVariance: Math.PI / 4,
    
    // Acceleration
    accelerationX: 0,
    accelerationY: 0,
    
    // Rotation
    rotationMin: 0,
    rotationMax: Math.PI * 2,
    angularVelocityMin: -Math.PI,
    angularVelocityMax: Math.PI,
    
    // Scale
    startScaleMin: 0.5,
    startScaleMax: 1.0,
    endScaleMin: 0.1,
    endScaleMax: 0.3,
    
    // Color
    startColor: { r: 255, g: 255, b: 255, a: 1 },
    endColor: { r: 255, g: 255, b: 255, a: 0 },
    startAlpha: 1.0,
    endAlpha: 0.0,
    
    // Rendering
    blendMode: BlendMode.NORMAL,
    
    // Duration
    duration: 0,
    loop: false,
    useGaussian: true
  };
}
```

## Preset Combinations

### Campfire (Fire + Smoke)

```typescript
const fireEmitter = new ParticleEmitter(ParticlePresets.fire());
fireEmitter.position.set(x, y + 20);

const smokeEmitter = new ParticleEmitter(ParticlePresets.smoke());
smokeEmitter.position.set(x, y);

// Update both
fireEmitter.update(deltaTime);
smokeEmitter.update(deltaTime);
```

### Magic Spell (Portal + Sparkles)

```typescript
const portalEmitter = new ParticleEmitterAdvanced(
  AdvancedParticlePresets.magicPortal()
);
portalEmitter.addAffector(new VortexAffector(x, y, 100, 30));

const sparkleEmitter = new ParticleEmitter(ParticlePresets.sparkle());
sparkleEmitter.position.set(x, y);
```

### Impact Effect (Explosion + Dust)

```typescript
function createImpact(x: number, y: number) {
  const explosion = new ParticleEmitter(ParticlePresets.explosion());
  explosion.position.set(x, y);
  explosion.start();
  
  setTimeout(() => {
    const dust = new ParticleEmitter(AdvancedParticlePresets.dustCloud());
    dust.position.set(x, y);
    dust.start();
  }, 100);
}
```

## Preset Modification Patterns

### Adjust Intensity

```typescript
const config = ParticlePresets.fire();
config.emissionRate *= 2; // Double intensity
config.maxParticles *= 2; // Support more particles
```

### Change Colors

```typescript
const config = ParticlePresets.fire();
config.startColor = { r: 100, g: 200, b: 255, a: 1 }; // Blue
config.endColor = { r: 255, g: 255, b: 255, a: 1 }; // White
```

### Scale Effect

```typescript
const config = ParticlePresets.explosion();
// Make everything 2x larger
config.startScaleMin *= 2;
config.startScaleMax *= 2;
config.endScaleMin *= 2;
config.endScaleMax *= 2;
config.speedMin *= 2;
config.speedMax *= 2;
```

### Slow Motion

```typescript
const config = ParticlePresets.fire();
config.speedMin *= 0.5;
config.speedMax *= 0.5;
config.accelerationY *= 0.5;
config.lifetimeMin *= 1.5;
config.lifetimeMax *= 1.5;
```

## Tips for Best Results

1. **Blend Modes**
   - Use `ADD` for light-emitting effects (fire, magic, electricity)
   - Use `NORMAL` for solid particles (smoke, dust, blood)
   - Use `MULTIPLY` for darkening effects (shadows, soot)

2. **Performance**
   - Keep `maxParticles` reasonable (< 1000 for mobile)
   - Use burst mode for one-shot effects
   - Combine with object pooling

3. **Visual Appeal**
   - Layer multiple effects (fire + smoke)
   - Use affectors for dynamic motion
   - Vary particle sizes with min/max ranges
   - Use Gaussian distribution for natural variation

4. **Timing**
   - Short lifetime (< 1s) for impact effects
   - Long lifetime (2-5s) for ambient effects
   - Burst for instant effects
   - Continuous for sustained effects
