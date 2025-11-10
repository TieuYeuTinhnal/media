import { ParticleEmitter } from '../src/core/ParticleEmitter';
import { createDefaultConfig } from '../src/config/ParticleConfig';

describe('ParticleEmitter', () => {
  test('creates emitter with config', () => {
    const config = createDefaultConfig();
    const emitter = new ParticleEmitter(config);
    expect(emitter).toBeDefined();
    expect(emitter.getConfig()).toBe(config);
  });

  test('starts and stops emitter', () => {
    const config = createDefaultConfig();
    const emitter = new ParticleEmitter(config);
    
    emitter.start();
    expect(emitter.isActive()).toBe(true);
    
    emitter.stop();
    expect(emitter.isActive()).toBe(false);
  });

  test('emits particles on update', () => {
    const config = createDefaultConfig();
    config.emissionRate = 60; // 60 particles per second
    const emitter = new ParticleEmitter(config);
    
    emitter.start();
    emitter.update(1); // 1 second
    
    expect(emitter.getActiveParticleCount()).toBeGreaterThan(0);
  });

  test('burst emits all particles at once', () => {
    const config = createDefaultConfig();
    config.burstCount = 50;
    const emitter = new ParticleEmitter(config);
    
    emitter.start();
    
    expect(emitter.getActiveParticleCount()).toBe(50);
  });

  test('respects max particles limit', () => {
    const config = createDefaultConfig();
    config.maxParticles = 10;
    config.emissionRate = 100;
    const emitter = new ParticleEmitter(config);
    
    emitter.start();
    emitter.update(1);
    
    expect(emitter.getActiveParticleCount()).toBeLessThanOrEqual(10);
  });

  test('clear removes all particles', () => {
    const config = createDefaultConfig();
    config.burstCount = 50;
    const emitter = new ParticleEmitter(config);
    
    emitter.start();
    expect(emitter.getActiveParticleCount()).toBe(50);
    
    emitter.clear();
    expect(emitter.getActiveParticleCount()).toBe(0);
  });

  test('duration stops emission after time', () => {
    const config = createDefaultConfig();
    config.duration = 1; // 1 second
    config.loop = false;
    config.emissionRate = 30;
    const emitter = new ParticleEmitter(config);
    
    emitter.start();
    emitter.update(0.5);
    expect(emitter.isActive()).toBe(true);
    
    emitter.update(0.6);
    expect(emitter.isActive()).toBe(false);
    expect(emitter.isCompleted()).toBe(true);
  });

  test('loop restarts emission', () => {
    const config = createDefaultConfig();
    config.duration = 1;
    config.loop = true;
    config.emissionRate = 30;
    const emitter = new ParticleEmitter(config);
    
    emitter.start();
    emitter.update(1.5);
    expect(emitter.isActive()).toBe(true);
  });

  test('position affects particle spawn', () => {
    const config = createDefaultConfig();
    config.burstCount = 1;
    const emitter = new ParticleEmitter(config);
    
    emitter.position.set(100, 200);
    emitter.start();
    
    const particles = emitter.getParticles();
    expect(particles[0].position.x).toBeCloseTo(100, 0);
    expect(particles[0].position.y).toBeCloseTo(200, 0);
  });
});
