import { ParticleConfig, BlendMode, createDefaultConfig } from '../config/ParticleConfig';

/**
 * Collection of common particle effect presets
 */
export class ParticlePresets {
  /**
   * Fire effect - rising flames with heat distortion
   * @returns Fire particle configuration
   */
  static fire(): ParticleConfig {
    return {
      ...createDefaultConfig(),
      
      // Emission
      emissionRate: 50,
      burstCount: 0,
      maxParticles: 500,

      // Lifetime
      lifetimeMin: 0.5,
      lifetimeMax: 1.5,

      // Position
      spawnRadius: 10,
      spawnAngle: 0,
      spawnAngleVariance: Math.PI * 2,

      // Velocity - upward motion
      speedMin: 80,
      speedMax: 150,
      direction: -Math.PI / 2, // Up
      directionVariance: Math.PI / 6,

      // Acceleration - slight gravity
      accelerationX: 0,
      accelerationY: -20,

      // Rotation
      rotationMin: 0,
      rotationMax: Math.PI * 2,
      angularVelocityMin: -Math.PI,
      angularVelocityMax: Math.PI,

      // Scale - shrink over time
      startScaleMin: 0.8,
      startScaleMax: 1.2,
      endScaleMin: 0.1,
      endScaleMax: 0.3,

      // Color - yellow/orange to red
      startColor: { r: 255, g: 200, b: 50, a: 1 },
      endColor: { r: 255, g: 50, b: 0, a: 1 },
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
   * Smoke effect - billowing smoke clouds
   * @returns Smoke particle configuration
   */
  static smoke(): ParticleConfig {
    return {
      ...createDefaultConfig(),
      
      // Emission
      emissionRate: 20,
      burstCount: 0,
      maxParticles: 300,

      // Lifetime
      lifetimeMin: 2.0,
      lifetimeMax: 4.0,

      // Position
      spawnRadius: 5,
      spawnAngle: 0,
      spawnAngleVariance: Math.PI * 2,

      // Velocity - slow upward drift
      speedMin: 20,
      speedMax: 40,
      direction: -Math.PI / 2,
      directionVariance: Math.PI / 4,

      // Acceleration
      accelerationX: 0,
      accelerationY: -5,

      // Rotation
      rotationMin: 0,
      rotationMax: Math.PI * 2,
      angularVelocityMin: -0.5,
      angularVelocityMax: 0.5,

      // Scale - grow over time
      startScaleMin: 0.5,
      startScaleMax: 0.8,
      endScaleMin: 1.5,
      endScaleMax: 2.0,

      // Color - gray smoke
      startColor: { r: 100, g: 100, b: 100, a: 1 },
      endColor: { r: 60, g: 60, b: 60, a: 1 },
      startAlpha: 0.6,
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
   * Explosion effect - burst of particles
   * @returns Explosion particle configuration
   */
  static explosion(): ParticleConfig {
    return {
      ...createDefaultConfig(),
      
      // Emission - burst mode
      emissionRate: 0,
      burstCount: 100,
      maxParticles: 200,

      // Lifetime
      lifetimeMin: 0.5,
      lifetimeMax: 1.5,

      // Position
      spawnRadius: 5,
      spawnAngle: 0,
      spawnAngleVariance: Math.PI * 2,

      // Velocity - radial outward
      speedMin: 100,
      speedMax: 300,
      direction: 0,
      directionVariance: Math.PI * 2, // All directions

      // Acceleration - gravity
      accelerationX: 0,
      accelerationY: 200,

      // Rotation
      rotationMin: 0,
      rotationMax: Math.PI * 2,
      angularVelocityMin: -Math.PI * 4,
      angularVelocityMax: Math.PI * 4,

      // Scale
      startScaleMin: 0.8,
      startScaleMax: 1.2,
      endScaleMin: 0.2,
      endScaleMax: 0.5,

      // Color - orange to dark
      startColor: { r: 255, g: 150, b: 50, a: 1 },
      endColor: { r: 100, g: 30, b: 10, a: 1 },
      startAlpha: 1.0,
      endAlpha: 0.0,

      // Rendering
      blendMode: BlendMode.ADD,
      
      // Duration - one-shot
      duration: 0.1,
      loop: false,
      useGaussian: false
    };
  }

  /**
   * Sparkle effect - twinkling particles
   * @returns Sparkle particle configuration
   */
  static sparkle(): ParticleConfig {
    return {
      ...createDefaultConfig(),
      
      // Emission
      emissionRate: 40,
      burstCount: 0,
      maxParticles: 400,

      // Lifetime
      lifetimeMin: 0.3,
      lifetimeMax: 1.0,

      // Position
      spawnRadius: 20,
      spawnAngle: 0,
      spawnAngleVariance: Math.PI * 2,

      // Velocity - gentle movement
      speedMin: 20,
      speedMax: 50,
      direction: 0,
      directionVariance: Math.PI * 2,

      // Acceleration
      accelerationX: 0,
      accelerationY: 0,

      // Rotation
      rotationMin: 0,
      rotationMax: Math.PI * 2,
      angularVelocityMin: -Math.PI * 2,
      angularVelocityMax: Math.PI * 2,

      // Scale - pulse effect
      startScaleMin: 0.3,
      startScaleMax: 0.6,
      endScaleMin: 0.1,
      endScaleMax: 0.2,

      // Color - bright white/yellow
      startColor: { r: 255, g: 255, b: 200, a: 1 },
      endColor: { r: 255, g: 255, b: 255, a: 1 },
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
   * Rain effect - falling droplets
   * @returns Rain particle configuration
   */
  static rain(): ParticleConfig {
    return {
      ...createDefaultConfig(),
      
      // Emission
      emissionRate: 100,
      burstCount: 0,
      maxParticles: 1000,

      // Lifetime
      lifetimeMin: 1.0,
      lifetimeMax: 2.0,

      // Position
      spawnRadius: 200,
      spawnAngle: 0,
      spawnAngleVariance: 0.1,

      // Velocity - downward
      speedMin: 300,
      speedMax: 400,
      direction: Math.PI / 2, // Down
      directionVariance: 0.1,

      // Acceleration - slight wind
      accelerationX: 20,
      accelerationY: 100,

      // Rotation
      rotationMin: Math.PI / 2,
      rotationMax: Math.PI / 2,
      angularVelocityMin: 0,
      angularVelocityMax: 0,

      // Scale - streaks
      startScaleMin: 0.2,
      startScaleMax: 0.3,
      endScaleMin: 0.2,
      endScaleMax: 0.3,

      // Color - blue/white
      startColor: { r: 150, g: 200, b: 255, a: 1 },
      endColor: { r: 150, g: 200, b: 255, a: 1 },
      startAlpha: 0.7,
      endAlpha: 0.7,

      // Rendering
      blendMode: BlendMode.NORMAL,
      
      // Duration
      duration: 0,
      loop: false,
      useGaussian: false
    };
  }
}
