/**
 * Basic usage example for Spine2D Particle System
 * 
 * This example demonstrates:
 * - Creating a simple particle emitter
 * - Using preset configurations
 * - Basic rendering with Canvas 2D
 */

import { 
  ParticleEmitter, 
  ParticleRenderer, 
  ParticlePresets 
} from '../src/index';

// Get canvas element
const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
if (!canvas) {
  throw new Error('Canvas element not found');
}

canvas.width = 800;
canvas.height = 600;

// Create a fire effect emitter using preset
const fireConfig = ParticlePresets.fire();
const fireEmitter = new ParticleEmitter(fireConfig);

// Position the emitter at the bottom center
fireEmitter.position.set(canvas.width / 2, canvas.height - 100);

// Create renderer
const renderer = new ParticleRenderer(canvas);

// Start the emitter
fireEmitter.start();

// Animation loop
let lastTime = performance.now();

function animate() {
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
  lastTime = currentTime;

  // Update emitter
  fireEmitter.update(deltaTime);

  // Clear and render
  renderer.clear();
  renderer.render(fireEmitter);

  requestAnimationFrame(animate);
}

// Start animation
animate();

// Example: Stop emitter after 5 seconds
setTimeout(() => {
  fireEmitter.stop();
  console.log('Fire emitter stopped');
}, 5000);

// Example: Switch to explosion effect
setTimeout(() => {
  const explosionConfig = ParticlePresets.explosion();
  fireEmitter.setConfig(explosionConfig);
  fireEmitter.position.set(canvas.width / 2, canvas.height / 2);
  fireEmitter.start();
  console.log('Switched to explosion effect');
}, 7000);
