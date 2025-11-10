/**
 * Complete example showing advanced features
 * 
 * This example demonstrates:
 * - Using ParticleEmitterAdvanced with affectors
 * - Multiple emitters with ParticleSystemManager
 * - Performance profiling
 * - Configuration serialization
 * - WebGL rendering
 */

import {
  ParticleSystemManager,
  ParticleEmitterAdvanced,
  ParticlePresets,
  AdvancedParticlePresets,
  WebGLParticleRenderer,
  GravityAffector,
  VortexAffector,
  TurbulenceAffector,
  ColorOverLifetimeAffector,
  ParticleProfiler,
  ConfigSerializer
} from '../src/index';

// Setup canvas
const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
if (!canvas) {
  throw new Error('Canvas element not found');
}

canvas.width = 1024;
canvas.height = 768;

// Create system manager
const manager = new ParticleSystemManager();

// Register presets
manager.registerConfig('fire', ParticlePresets.fire());
manager.registerConfig('magic-portal', AdvancedParticlePresets.magicPortal());
manager.registerConfig('healing', AdvancedParticlePresets.healingAura());

// Create advanced emitters with affectors
const portalEmitter = manager.createEmitter(
  'portal', 
  AdvancedParticlePresets.magicPortal(), 
  true
) as ParticleEmitterAdvanced;

// Add vortex effect to portal
const vortex = new VortexAffector(
  canvas.width / 2, 
  canvas.height / 2, 
  150, // strength
  50   // pull
);
portalEmitter.addAffector(vortex);

// Add turbulence for chaotic motion
const turbulence = new TurbulenceAffector(30, 2);
portalEmitter.addAffector(turbulence);

// Position and start portal
portalEmitter.position.set(canvas.width / 2, canvas.height / 2);
portalEmitter.start();

// Create healing aura emitter
const healingEmitter = manager.createEmitter(
  'healing',
  AdvancedParticlePresets.healingAura(),
  true
) as ParticleEmitterAdvanced;

// Add gravity to healing particles
const gravity = new GravityAffector(0, -30);
healingEmitter.addAffector(gravity);

// Add color animation
const colorAffector = new ColorOverLifetimeAffector([
  { time: 0, color: { r: 150, g: 255, b: 150, a: 1 } },
  { time: 0.5, color: { r: 255, g: 255, b: 200, a: 0.8 } },
  { time: 1, color: { r: 100, g: 200, b: 100, a: 0 } }
]);
healingEmitter.addAffector(colorAffector);

healingEmitter.position.set(canvas.width / 4, canvas.height - 100);
healingEmitter.start();

// Create WebGL renderer for better performance
const renderer = new WebGLParticleRenderer(canvas, 5000);

// Create profiler
const profiler = new ParticleProfiler(60);

// Animation loop
let lastTime = performance.now();

function animate() {
  const currentTime = performance.now();
  const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1); // Cap at 100ms
  lastTime = currentTime;

  // Profile update
  const updateStart = profiler.beginUpdate();
  manager.update(deltaTime);
  profiler.endUpdate(updateStart);

  // Profile render
  const renderStart = profiler.beginRender();
  renderer.clear();
  renderer.render(portalEmitter);
  renderer.render(healingEmitter);
  profiler.endRender(renderStart);

  // Update profiler
  profiler.updateFps();
  profiler.setParticleCount(manager.getTotalParticleCount());

  requestAnimationFrame(animate);
}

// Start animation
animate();

// Print stats every 2 seconds
setInterval(() => {
  profiler.printStats();
}, 2000);

// Export configuration example
setTimeout(() => {
  const configJson = ConfigSerializer.toJson(portalEmitter.getConfig());
  console.log('Portal configuration:', configJson);
  
  // Save all configs
  const allConfigs = manager.exportConfigs();
  console.log('All configurations exported');
}, 5000);

// Add interactive controls
document.addEventListener('click', (e) => {
  // Create explosion at click position
  const explosionEmitter = manager.createEmitter(
    `explosion-${Date.now()}`,
    ParticlePresets.explosion(),
    false
  );
  
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  explosionEmitter.position.set(x, y);
  explosionEmitter.start();
  
  // Remove emitter after completion
  setTimeout(() => {
    manager.removeEmitter(`explosion-${Date.now()}`);
  }, 2000);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  renderer.dispose();
  manager.stopAll();
  manager.clear();
});
