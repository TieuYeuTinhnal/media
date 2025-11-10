# Spine2D Integration Guide

Complete guide for integrating the particle system with Spine2D animations.

## Overview

The particle system integrates with Spine2D through:
1. **Bone Attachments** - Particles follow skeleton bones
2. **Animation Events** - Particles triggered by animation events
3. **World Position Tracking** - Automatic position synchronization

## Prerequisites

```bash
npm install @esotericsoftware/spine-core
npm install spine2d-particle-tool
```

## Basic Integration

### 1. Setup

```typescript
import * as spine from '@esotericsoftware/spine-core';
import { 
  SpineParticleEventHandler,
  ParticleEmitter,
  ParticlePresets 
} from 'spine2d-particle-tool';

// Your Spine skeleton and animation state
const skeleton: spine.Skeleton = /* ... */;
const animationState: spine.AnimationState = /* ... */;

// Create event handler
const eventHandler = new SpineParticleEventHandler();
```

### 2. Bone Attachments

Attach particles to skeleton bones:

```typescript
import { BoneAttachment } from 'spine2d-particle-tool';

// Create emitter
const trailEmitter = new ParticleEmitter(ParticlePresets.sparkle());
trailEmitter.start();

// Get bone from skeleton
const handBone = skeleton.findBone('hand');

// Create update function
const updateAttachment = BoneAttachment.attach(trailEmitter, handBone);

// In your update loop
function update(deltaTime: number) {
  skeleton.update(deltaTime);
  updateAttachment(); // Updates particle position from bone
  trailEmitter.update(deltaTime);
}
```

### 3. Animation Events

Trigger particles from Spine animation events:

```typescript
// Setup event listener
animationState.addListener({
  event: (entry, event) => {
    eventHandler.onEvent({
      name: event.data.name,
      intValue: event.intValue,
      floatValue: event.floatValue,
      stringValue: event.stringValue
    });
  }
});

// Register emitters for events
const attackEmitter = new ParticleEmitter(ParticlePresets.fire());
const handBone = skeleton.findBone('hand');

eventHandler.registerEventEmitter({
  eventName: 'attack',
  emitter: attackEmitter,
  bone: handBone,
  burst: true,
  burstCount: 30
});

// Update in game loop
function update(deltaTime: number) {
  animationState.update(deltaTime);
  animationState.apply(skeleton);
  skeleton.updateWorldTransform();
  
  eventHandler.update(deltaTime);
}
```

## Complete Example

```typescript
import * as spine from '@esotericsoftware/spine-core';
import {
  SpineParticleEventHandler,
  BoneAttachment,
  ParticleEmitter,
  ParticleEmitterAdvanced,
  ParticlePresets,
  AdvancedParticlePresets,
  GravityAffector,
  ParticleRenderer
} from 'spine2d-particle-tool';

class CharacterParticles {
  private skeleton: spine.Skeleton;
  private animationState: spine.AnimationState;
  private eventHandler: SpineParticleEventHandler;
  private renderer: ParticleRenderer;
  private boneAttachments: Array<() => void> = [];

  constructor(
    skeleton: spine.Skeleton,
    animationState: spine.AnimationState,
    canvas: HTMLCanvasElement
  ) {
    this.skeleton = skeleton;
    this.animationState = animationState;
    this.renderer = new ParticleRenderer(canvas);
    this.eventHandler = new SpineParticleEventHandler();

    this.setupEventListeners();
    this.setupParticleEffects();
  }

  private setupEventListeners(): void {
    this.animationState.addListener({
      event: (entry, event) => {
        this.eventHandler.onEvent({
          name: event.data.name,
          intValue: event.intValue,
          floatValue: event.floatValue,
          stringValue: event.stringValue
        });
      }
    });
  }

  private setupParticleEffects(): void {
    // Attack effect from hand
    const attackEmitter = new ParticleEmitter(ParticlePresets.fire());
    const handBone = this.skeleton.findBone('hand');
    
    this.eventHandler.registerEventEmitter({
      eventName: 'attack',
      emitter: attackEmitter,
      bone: handBone,
      burst: true,
      burstCount: 30
    });

    // Land effect from feet
    const landEmitter = new ParticleEmitterAdvanced(
      AdvancedParticlePresets.dustCloud()
    );
    const footBone = this.skeleton.findBone('foot');
    
    this.eventHandler.registerEventEmitter({
      eventName: 'land',
      emitter: landEmitter,
      bone: footBone,
      burst: true,
      burstCount: 50
    });

    // Continuous trail from weapon
    const trailEmitter = new ParticleEmitter(ParticlePresets.sparkle());
    const weaponBone = this.skeleton.findBone('weapon');
    trailEmitter.start();
    
    const updateTrail = BoneAttachment.attach(trailEmitter, weaponBone);
    this.boneAttachments.push(updateTrail);

    // Power-up aura around character
    const auraEmitter = new ParticleEmitterAdvanced(
      AdvancedParticlePresets.healingAura()
    );
    const rootBone = this.skeleton.getRootBone();
    
    this.eventHandler.registerEventEmitter({
      eventName: 'powerup',
      emitter: auraEmitter,
      bone: rootBone,
      burst: false
    });
  }

  update(deltaTime: number): void {
    // Update Spine
    this.animationState.update(deltaTime);
    this.animationState.apply(this.skeleton);
    this.skeleton.updateWorldTransform();

    // Update bone attachments
    for (const update of this.boneAttachments) {
      update();
    }

    // Update particles
    this.eventHandler.update(deltaTime);
  }

  render(): void {
    // Render Spine skeleton first
    // ... your Spine rendering code ...

    // Render particles on top
    const emitters = this.eventHandler.getAllEmitters();
    this.renderer.renderMultiple(emitters);
  }

  destroy(): void {
    this.eventHandler.stopAll();
    this.eventHandler.clear();
  }
}

// Usage
const character = new CharacterParticles(skeleton, animationState, canvas);

function gameLoop() {
  const deltaTime = /* calculate delta */;
  
  character.update(deltaTime);
  character.render();
  
  requestAnimationFrame(gameLoop);
}
```

## Common Patterns

### Hit Effect

```typescript
// In Spine editor: Add event "hit" at frame of impact
eventHandler.registerEventEmitter({
  eventName: 'hit',
  emitter: new ParticleEmitter(ParticlePresets.explosion()),
  bone: skeleton.findBone('target-point'),
  burst: true,
  burstCount: 50
});
```

### Weapon Trail

```typescript
const weaponBone = skeleton.findBone('sword-tip');
const trailEmitter = new ParticleEmitter(ParticlePresets.sparkle());

// Modify for sword trail
const config = trailEmitter.getConfig();
config.emissionRate = 80;
config.lifetimeMin = 0.2;
config.lifetimeMax = 0.5;
config.speedMin = 10;
config.speedMax = 30;
trailEmitter.setConfig(config);

trailEmitter.start();
const updateTrail = BoneAttachment.attach(trailEmitter, weaponBone);
```

### Charge-up Effect

```typescript
let chargeEmitter: ParticleEmitter | null = null;

animationState.addListener({
  event: (entry, event) => {
    if (event.data.name === 'charge-start') {
      chargeEmitter = new ParticleEmitterAdvanced(
        AdvancedParticlePresets.magicPortal()
      );
      chargeEmitter.addAffector(
        new VortexAffector(handBone.worldX, handBone.worldY, 100, 50)
      );
      chargeEmitter.start();
    }
    
    if (event.data.name === 'charge-release' && chargeEmitter) {
      chargeEmitter.stop();
      
      // Trigger release burst
      const burstEmitter = new ParticleEmitter(ParticlePresets.explosion());
      burstEmitter.position.set(handBone.worldX, handBone.worldY);
      burstEmitter.start();
    }
  }
});
```

### Footstep Particles

```typescript
let lastFoot = 'left';

animationState.addListener({
  event: (entry, event) => {
    if (event.data.name === 'footstep') {
      const bone = skeleton.findBone(
        lastFoot === 'left' ? 'foot-left' : 'foot-right'
      );
      
      const dustEmitter = new ParticleEmitter(
        AdvancedParticlePresets.dustCloud()
      );
      dustEmitter.position.set(bone.worldX, bone.worldY);
      dustEmitter.burst(20);
      
      lastFoot = lastFoot === 'left' ? 'right' : 'left';
    }
  }
});
```

## Multi-Bone Effects

### Dual-Hand Magic

```typescript
const leftHandBone = skeleton.findBone('hand-left');
const rightHandBone = skeleton.findBone('hand-right');

const leftEmitter = new ParticleEmitter(AdvancedParticlePresets.magicPortal());
const rightEmitter = new ParticleEmitter(AdvancedParticlePresets.magicPortal());

leftEmitter.start();
rightEmitter.start();

const updateBones = BoneAttachment.attachMultiple([
  [leftEmitter, leftHandBone],
  [rightEmitter, rightHandBone]
]);

// In update loop
updateBones();
```

### Body Aura

```typescript
// Attach particles to multiple body parts
const bodyBones = [
  'head', 'chest', 'hand-left', 'hand-right', 'foot-left', 'foot-right'
];

const auraEmitters = bodyBones.map(boneName => {
  const emitter = new ParticleEmitter(AdvancedParticlePresets.healingAura());
  const bone = skeleton.findBone(boneName);
  
  emitter.start();
  return {
    emitter,
    update: BoneAttachment.attach(emitter, bone)
  };
});

// Update all
auraEmitters.forEach(({ update }) => update());
```

## Event Data Usage

Use Spine event data to customize particles:

```typescript
animationState.addListener({
  event: (entry, event) => {
    if (event.data.name === 'particle-burst') {
      const emitter = new ParticleEmitter(ParticlePresets.explosion());
      const bone = skeleton.findBone(event.stringValue || 'hand');
      
      emitter.position.set(bone.worldX, bone.worldY);
      emitter.burst(event.intValue || 30); // Use event int for count
    }
  }
});
```

## Performance Tips

1. **Reuse Emitters**
   ```typescript
   // Instead of creating new emitters for each event
   const hitEmitter = new ParticleEmitter(ParticlePresets.explosion());
   
   animationState.addListener({
     event: (entry, event) => {
       if (event.data.name === 'hit') {
         hitEmitter.position.set(bone.worldX, bone.worldY);
         hitEmitter.burst(50);
       }
     }
   });
   ```

2. **Use ParticleSystemManager**
   ```typescript
   const manager = new ParticleSystemManager();
   manager.registerConfig('hit', ParticlePresets.explosion());
   
   // Create instances as needed
   manager.createEmitterFromConfig('hit1', 'hit');
   manager.update(deltaTime);
   ```

3. **Limit Active Particles**
   ```typescript
   const config = ParticlePresets.fire();
   config.maxParticles = 200; // Limit for performance
   ```

## Rendering Order

Render particles in the correct order:

```typescript
function render() {
  // 1. Render background
  
  // 2. Render particles behind character
  renderer.render(backgroundParticles);
  
  // 3. Render Spine skeleton
  skeletonRenderer.draw(skeleton);
  
  // 4. Render particles in front of character
  renderer.render(foregroundParticles);
  
  // 5. Render UI
}
```

## Debugging

Enable visual debugging:

```typescript
// Log all events
animationState.addListener({
  event: (entry, event) => {
    console.log('Spine Event:', event.data.name, {
      int: event.intValue,
      float: event.floatValue,
      string: event.stringValue
    });
  }
});

// Show bone positions
function debugDrawBones(context: CanvasRenderingContext2D) {
  const bones = skeleton.bones;
  for (const bone of bones) {
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(bone.worldX, bone.worldY, 5, 0, Math.PI * 2);
    context.fill();
    
    context.fillStyle = 'white';
    context.fillText(bone.data.name, bone.worldX + 10, bone.worldY);
  }
}
```

## Best Practices

1. **Event Naming** - Use descriptive event names: `attack-start`, `attack-hit`, `attack-end`
2. **Bone Structure** - Create specific bones for particle spawn points
3. **Cleanup** - Stop and clear emitters when animations end
4. **Testing** - Test with different animation speeds
5. **Performance** - Profile with ParticleProfiler

## Troubleshooting

### Particles not following bone

```typescript
// Make sure to update world transform
skeleton.updateWorldTransform();

// Then update bone attachments
updateBoneAttachment();
```

### Events not triggering

```typescript
// Ensure listener is added before playing animation
animationState.addListener(listener);
animationState.setAnimation(0, 'attack', false);
```

### Particles at wrong position

```typescript
// Check bone exists
const bone = skeleton.findBone('hand');
if (!bone) {
  console.error('Bone "hand" not found!');
}

// Check coordinate system matches
console.log('Bone position:', bone.worldX, bone.worldY);
```
