import { ParticleConfig, BlendMode, createDefaultConfig } from '../config/ParticleConfig';

/**
 * Collection of advanced particle effect presets
 */
export class AdvancedParticlePresets {
  /**
   * Magic portal effect - swirling magical energy
   * @returns Magic portal particle configuration
   */
  static magicPortal(): ParticleConfig {
    return {
      ...createDefaultConfig(),
      
      // Emission
      emissionRate: 80,
      burstCount: 0,
      maxParticles: 800,

      // Lifetime
      lifetimeMin: 1.5,
      lifetimeMax: 3.0,

      // Position - circular spawn
      spawnRadius: 50,
      spawnAngle: 0,
      spawnAngleVariance: Math.PI * 2,

      // Velocity - inward spiral
      speedMin: 30,
      speedMax: 60,
      direction: 0,
      directionVariance: Math.PI * 2,

      // Acceleration - toward center (use with VortexAffector)
      accelerationX: 0,
      accelerationY: 0,

      // Rotation
      rotationMin: 0,
      rotationMax: Math.PI * 2,
      angularVelocityMin: Math.PI,
      angularVelocityMax: Math.PI * 2,

      // Scale
      startScaleMin: 0.5,
      startScaleMax: 1.0,
      endScaleMin: 0.1,
      endScaleMax: 0.3,

      // Color - purple/blue magical
      startColor: { r: 150, g: 50, b: 255, a: 1 },
      endColor: { r: 50, g: 150, b: 255, a: 1 },
      startAlpha: 1.0,
      endAlpha: 0.0,

      // Rendering
      blendMode: BlendMode.ADD,
      
      // Duration
      duration: 0,
      loop: false,
      useGaussian: true
    };
  }

  /**
   * Blood splatter effect - violent burst
   * @returns Blood splatter particle configuration
   */
  static bloodSplatter(): ParticleConfig {
    return {
      ...createDefaultConfig(),
      
      // Emission - burst
      emissionRate: 0,
      burstCount: 50,
      maxParticles: 100,

      // Lifetime
      lifetimeMin: 0.3,
      lifetimeMax: 0.8,

      // Position
      spawnRadius: 2,
      spawnAngle: 0,
      spawnAngleVariance: Math.PI * 2,

      // Velocity - radial burst
      speedMin: 150,
      speedMax: 300,
      direction: 0,
      directionVariance: Math.PI * 2,

      // Acceleration - gravity and drag
      accelerationX: 0,
      accelerationY: 500,

      // Rotation
      rotationMin: 0,
      rotationMax: Math.PI * 2,
      angularVelocityMin: -Math.PI * 3,
      angularVelocityMax: Math.PI * 3,

      // Scale
      startScaleMin: 0.5,
      startScaleMax: 1.0,
      endScaleMin: 0.3,
      endScaleMax: 0.6,

      // Color - dark red
      startColor: { r: 180, g: 0, b: 0, a: 1 },
      endColor: { r: 100, g: 0, b: 0, a: 1 },
      startAlpha: 1.0,
      endAlpha: 0.8,

      // Rendering
      blendMode: BlendMode.NORMAL,
      
      // Duration
      duration: 0.1,
      loop: false,
      useGaussian: false
    };
  }

  /**
   * Healing aura effect - gentle glowing particles
   * @returns Healing aura particle configuration
   */
  static healingAura(): ParticleConfig {
    return {
      ...createDefaultConfig(),
      
      // Emission
      emissionRate: 30,
      burstCount: 0,
      maxParticles: 300,

      // Lifetime
      lifetimeMin: 2.0,
      lifetimeMax: 3.5,

      // Position
      spawnRadius: 30,
      spawnAngle: 0,
      spawnAngleVariance: Math.PI * 2,

      // Velocity - gentle upward float
      speedMin: 20,
      speedMax: 40,
      direction: -Math.PI / 2,
      directionVariance: Math.PI / 3,

      // Acceleration
      accelerationX: 0,
      accelerationY: -10,

      // Rotation
      rotationMin: 0,
      rotationMax: Math.PI * 2,
      angularVelocityMin: -0.5,
      angularVelocityMax: 0.5,

      // Scale - pulse
      startScaleMin: 0.4,
      startScaleMax: 0.7,
      endScaleMin: 0.2,
      endScaleMax: 0.4,

      // Color - soft green/yellow
      startColor: { r: 150, g: 255, b: 150, a: 1 },
      endColor: { r: 255, g: 255, b: 200, a: 1 },
      startAlpha: 0.8,
      endAlpha: 0.0,

      // Rendering
      blendMode: BlendMode.ADD,
      
      // Duration
      duration: 0,
      loop: false,
      useGaussian: true
    };
  }

  /**
   * Electric shock effect - lightning particles
   * @returns Electric shock particle configuration
   */
  static electricShock(): ParticleConfig {
    return {
      ...createDefaultConfig(),
      
      // Emission - rapid bursts
      emissionRate: 100,
      burstCount: 0,
      maxParticles: 500,

      // Lifetime - very short
      lifetimeMin: 0.1,
      lifetimeMax: 0.3,

      // Position
      spawnRadius: 15,
      spawnAngle: 0,
      spawnAngleVariance: Math.PI * 2,

      // Velocity - chaotic
      speedMin: 50,
      speedMax: 150,
      direction: 0,
      directionVariance: Math.PI * 2,

      // Acceleration - erratic (use with TurbulenceAffector)
      accelerationX: 0,
      accelerationY: 0,

      // Rotation
      rotationMin: 0,
      rotationMax: Math.PI * 2,
      angularVelocityMin: -Math.PI * 10,
      angularVelocityMax: Math.PI * 10,

      // Scale
      startScaleMin: 0.5,
      startScaleMax: 1.0,
      endScaleMin: 0.1,
      endScaleMax: 0.3,

      // Color - bright cyan/white
      startColor: { r: 200, g: 255, b: 255, a: 1 },
      endColor: { r: 100, g: 200, b: 255, a: 1 },
      startAlpha: 1.0,
      endAlpha: 0.0,

      // Rendering
      blendMode: BlendMode.ADD,
      
      // Duration
      duration: 0,
      loop: false,
      useGaussian: false
    };
  }

  /**
   * Snow effect - gently falling snowflakes
   * @returns Snow particle configuration
   */
  static snow(): ParticleConfig {
    return {
      ...createDefaultConfig(),
      
      // Emission
      emissionRate: 50,
      burstCount: 0,
      maxParticles: 500,

      // Lifetime
      lifetimeMin: 3.0,
      lifetimeMax: 6.0,

      // Position
      spawnRadius: 300,
      spawnAngle: 0,
      spawnAngleVariance: 0.1,

      // Velocity - slow fall with drift
      speedMin: 30,
      speedMax: 60,
      direction: Math.PI / 2,
      directionVariance: 0.2,

      // Acceleration - wind effect
      accelerationX: 10,
      accelerationY: 5,

      // Rotation - gentle spin
      rotationMin: 0,
      rotationMax: Math.PI * 2,
      angularVelocityMin: -0.5,
      angularVelocityMax: 0.5,

      // Scale
      startScaleMin: 0.3,
      startScaleMax: 0.8,
      endScaleMin: 0.3,
      endScaleMax: 0.8,

      // Color - white
      startColor: { r: 255, g: 255, b: 255, a: 1 },
      endColor: { r: 255, g: 255, b: 255, a: 1 },
      startAlpha: 0.9,
      endAlpha: 0.0,

      // Rendering
      blendMode: BlendMode.NORMAL,
      
      // Duration
      duration: 0,
      loop: false,
      useGaussian: true
    };
  }

  /**
   * Dust cloud effect - expanding dust particles
   * @returns Dust cloud particle configuration
   */
  static dustCloud(): ParticleConfig {
    return {
      ...createDefaultConfig(),
      
      // Emission - burst
      emissionRate: 0,
      burstCount: 80,
      maxParticles: 150,

      // Lifetime
      lifetimeMin: 1.0,
      lifetimeMax: 2.5,

      // Position
      spawnRadius: 10,
      spawnAngle: 0,
      spawnAngleVariance: Math.PI * 2,

      // Velocity - radial expansion
      speedMin: 30,
      speedMax: 80,
      direction: 0,
      directionVariance: Math.PI * 2,

      // Acceleration - settle down
      accelerationX: 0,
      accelerationY: 30,

      // Rotation
      rotationMin: 0,
      rotationMax: Math.PI * 2,
      angularVelocityMin: -Math.PI,
      angularVelocityMax: Math.PI,

      // Scale - expand
      startScaleMin: 0.3,
      startScaleMax: 0.6,
      endScaleMin: 1.0,
      endScaleMax: 1.5,

      // Color - brown/tan
      startColor: { r: 150, g: 120, b: 80, a: 1 },
      endColor: { r: 120, g: 100, b: 70, a: 1 },
      startAlpha: 0.7,
      endAlpha: 0.0,

      // Rendering
      blendMode: BlendMode.NORMAL,
      
      // Duration
      duration: 0.1,
      loop: false,
      useGaussian: false
    };
  }
}
