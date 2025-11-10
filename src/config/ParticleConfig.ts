import { RGBA } from '../utils/ColorUtils';

/**
 * Blend modes for particle rendering
 */
export enum BlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen'
}

/**
 * Configuration for particle emission
 */
export interface ParticleConfig {
  // Emission settings
  /** Number of particles to emit per second (continuous emission) */
  emissionRate: number;
  
  /** Number of particles to emit in a burst (0 for continuous) */
  burstCount: number;
  
  /** Maximum number of particles */
  maxParticles: number;

  // Lifetime settings
  /** Minimum particle lifetime in seconds */
  lifetimeMin: number;
  
  /** Maximum particle lifetime in seconds */
  lifetimeMax: number;

  // Position settings
  /** Spawn radius for particles */
  spawnRadius: number;
  
  /** Spawn angle in radians (for directional emission) */
  spawnAngle: number;
  
  /** Spawn angle variance in radians */
  spawnAngleVariance: number;

  // Velocity settings
  /** Minimum initial speed */
  speedMin: number;
  
  /** Maximum initial speed */
  speedMax: number;
  
  /** Direction angle in radians */
  direction: number;
  
  /** Direction variance in radians */
  directionVariance: number;

  // Acceleration settings
  /** Acceleration in x direction */
  accelerationX: number;
  
  /** Acceleration in y direction */
  accelerationY: number;

  // Rotation settings
  /** Minimum initial rotation in radians */
  rotationMin: number;
  
  /** Maximum initial rotation in radians */
  rotationMax: number;
  
  /** Minimum angular velocity in radians per second */
  angularVelocityMin: number;
  
  /** Maximum angular velocity in radians per second */
  angularVelocityMax: number;

  // Scale settings
  /** Minimum start scale */
  startScaleMin: number;
  
  /** Maximum start scale */
  startScaleMax: number;
  
  /** Minimum end scale */
  endScaleMin: number;
  
  /** Maximum end scale */
  endScaleMax: number;

  // Color settings
  /** Start color */
  startColor: RGBA;
  
  /** End color */
  endColor: RGBA;
  
  /** Start alpha (0-1) */
  startAlpha: number;
  
  /** End alpha (0-1) */
  endAlpha: number;

  // Rendering settings
  /** Blend mode for rendering */
  blendMode: BlendMode;
  
  /** Texture name or path (optional) */
  texture?: string;

  // Duration settings
  /** Duration of emission in seconds (0 for infinite) */
  duration: number;
  
  /** Whether to loop emission */
  loop: boolean;

  // Advanced settings
  /** Use Gaussian distribution for random values */
  useGaussian: boolean;
}

/**
 * Creates a default particle configuration
 * @returns Default ParticleConfig
 */
export function createDefaultConfig(): ParticleConfig {
  return {
    // Emission
    emissionRate: 30,
    burstCount: 0,
    maxParticles: 1000,

    // Lifetime
    lifetimeMin: 1.0,
    lifetimeMax: 2.0,

    // Position
    spawnRadius: 0,
    spawnAngle: 0,
    spawnAngleVariance: Math.PI * 2,

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
    endColor: { r: 255, g: 255, b: 255, a: 1 },
    startAlpha: 1.0,
    endAlpha: 0.0,

    // Rendering
    blendMode: BlendMode.NORMAL,
    texture: undefined,

    // Duration
    duration: 0,
    loop: false,

    // Advanced
    useGaussian: false
  };
}
