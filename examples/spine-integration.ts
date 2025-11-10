/**
 * Spine integration example
 * 
 * This example demonstrates:
 * - Attaching particle emitters to Spine bones
 * - Triggering particles from Spine animation events
 * - Synchronizing particles with character animations
 * 
 * Note: This is a conceptual example. In a real project, you would use
 * the actual Spine runtime from @esotericsoftware/spine-core
 */

import {
  SpineParticleEventHandler,
  BoneAttachment,
  ParticleEmitter,
  ParticlePresets,
  AdvancedParticlePresets,
  ParticleRenderer
} from '../src/index';

// Setup canvas
const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 600;

// Create renderer
const renderer = new ParticleRenderer(canvas);

// Create event handler
const eventHandler = new SpineParticleEventHandler();

// Mock Spine bone (in real project, this would come from Spine runtime)
const mockHandBone = {
  worldX: 400,
  worldY: 300
};

const mockFootBone = {
  worldX: 350,
  worldY: 550
};

// Create particle emitters for different events
const fireballEmitter = new ParticleEmitter(ParticlePresets.fire());
const dustEmitter = new ParticleEmitter(AdvancedParticlePresets.dustCloud());
const magicEmitter = new ParticleEmitter(AdvancedParticlePresets.magicPortal());

// Register event handlers
// "attack" event triggers fireball from hand
eventHandler.registerEventEmitter({
  eventName: 'attack',
  emitter: fireballEmitter,
  bone: mockHandBone,
  burst: true,
  burstCount: 30
});

// "land" event triggers dust cloud at feet
eventHandler.registerEventEmitter({
  eventName: 'land',
  emitter: dustEmitter,
  bone: mockFootBone,
  burst: true,
  burstCount: 50
});

// "cast-spell" event starts continuous magic effect
eventHandler.registerEventEmitter({
  eventName: 'cast-spell',
  emitter: magicEmitter,
  bone: mockHandBone,
  burst: false
});

// Example: Simulate Spine animation events
function simulateSpineEvents() {
  // Simulate "attack" event at 1 second
  setTimeout(() => {
    console.log('Triggering attack event');
    eventHandler.onEvent({ name: 'attack' });
  }, 1000);

  // Simulate "land" event at 2 seconds
  setTimeout(() => {
    console.log('Triggering land event');
    eventHandler.onEvent({ name: 'land' });
  }, 2000);

  // Simulate "cast-spell" start at 3 seconds
  setTimeout(() => {
    console.log('Triggering cast-spell event');
    eventHandler.onEvent({ name: 'cast-spell' });
  }, 3000);

  // Stop magic spell at 5 seconds
  setTimeout(() => {
    console.log('Stopping magic spell');
    magicEmitter.stop();
  }, 5000);
}

// Example: Attach emitter to moving bone
const trailEmitter = new ParticleEmitter(ParticlePresets.sparkle());
trailEmitter.start();

// Create update function for bone tracking
const updateBoneAttachment = BoneAttachment.attach(trailEmitter, mockHandBone);

// Simulate bone movement
let angle = 0;
function simulateBoneMovement() {
  angle += 0.05;
  mockHandBone.worldX = 400 + Math.cos(angle) * 150;
  mockHandBone.worldY = 300 + Math.sin(angle) * 100;
}

// Animation loop
let lastTime = performance.now();

function animate() {
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Simulate bone movement
  simulateBoneMovement();

  // Update bone attachments
  updateBoneAttachment();

  // Update event handler (updates all registered emitters)
  eventHandler.update(deltaTime);

  // Update trail emitter
  trailEmitter.update(deltaTime);

  // Render
  renderer.clear();
  renderer.render(fireballEmitter);
  renderer.render(dustEmitter);
  renderer.render(magicEmitter);
  renderer.render(trailEmitter);

  requestAnimationFrame(animate);
}

// Start animation and simulate events
animate();
simulateSpineEvents();

// Example: Multiple bone attachments
const healingEmitter1 = new ParticleEmitter(AdvancedParticlePresets.healingAura());
const healingEmitter2 = new ParticleEmitter(AdvancedParticlePresets.healingAura());

const mockLeftHand = { worldX: 350, worldY: 300 };
const mockRightHand = { worldX: 450, worldY: 300 };

healingEmitter1.start();
healingEmitter2.start();

const updateMultipleAttachments = BoneAttachment.attachMultiple([
  [healingEmitter1, mockLeftHand],
  [healingEmitter2, mockRightHand]
]);

// Real-world integration example (pseudocode):
/*
// In a real Spine project:

import * as spine from '@esotericsoftware/spine-core';

class SpineParticleIntegration {
  private skeleton: spine.Skeleton;
  private eventHandler: SpineParticleEventHandler;
  
  constructor(skeleton: spine.Skeleton) {
    this.skeleton = skeleton;
    this.eventHandler = new SpineParticleEventHandler();
    this.setupEvents();
  }
  
  setupEvents() {
    const attackEmitter = new ParticleEmitter(ParticlePresets.fire());
    const handBone = this.skeleton.findBone('hand');
    
    this.eventHandler.registerEventEmitter({
      eventName: 'attack',
      emitter: attackEmitter,
      bone: handBone,
      burst: true
    });
  }
  
  update(deltaTime: number) {
    // Update skeleton
    this.skeleton.update(deltaTime);
    
    // Update particles
    this.eventHandler.update(deltaTime);
  }
  
  onAnimationEvent(event: spine.Event) {
    this.eventHandler.onEvent({
      name: event.data.name,
      intValue: event.intValue,
      floatValue: event.floatValue,
      stringValue: event.stringValue
    });
  }
}
*/

console.log('Spine integration example running');
console.log('In a real project, integrate with Spine AnimationStateListener');
