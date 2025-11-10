import { Particle } from './Particle';
import { ParticlePool } from './ParticlePool';
import { ParticleConfig } from '../config/ParticleConfig';
import { Vector2D } from '../utils/Vector2D';
import { MathUtils } from '../utils/MathUtils';

/**
 * Particle emitter for creating and managing particles
 */
export class ParticleEmitter {
  /** The particle pool */
  protected pool: ParticlePool;
  
  /** The configuration */
  protected config: ParticleConfig;
  
  /** Position of the emitter */
  public position: Vector2D;
  
  /** Whether the emitter is active */
  protected active: boolean;
  
  /** Time accumulator for emission */
  protected emissionTimer: number;
  
  /** Total time the emitter has been running */
  protected totalTime: number;
  
  /** Whether the emitter has completed its duration */
  protected completed: boolean;

  /**
   * Creates a new particle emitter
   * @param config - The particle configuration
   */
  constructor(config: ParticleConfig) {
    this.config = config;
    this.pool = new ParticlePool(config.maxParticles);
    this.position = new Vector2D(0, 0);
    this.active = false;
    this.emissionTimer = 0;
    this.totalTime = 0;
    this.completed = false;
  }

  /**
   * Starts the emitter
   */
  start(): void {
    this.active = true;
    this.completed = false;
    this.totalTime = 0;
    this.emissionTimer = 0;

    // If burst mode, emit all particles immediately
    if (this.config.burstCount > 0) {
      for (let i = 0; i < this.config.burstCount; i++) {
        this.emitParticle();
      }
    }
  }

  /**
   * Stops the emitter
   */
  stop(): void {
    this.active = false;
  }

  /**
   * Updates the emitter and all its particles
   * @param deltaTime - Time elapsed since last update in seconds
   */
  update(deltaTime: number): void {
    if (!this.active && this.pool.getActiveCount() === 0) {
      return;
    }

    // Update total time
    if (this.active) {
      this.totalTime += deltaTime;

      // Check if duration has elapsed
      if (this.config.duration > 0 && this.totalTime >= this.config.duration) {
        if (this.config.loop) {
          this.totalTime = 0;
        } else {
          this.active = false;
          this.completed = true;
        }
      }

      // Emit particles for continuous emission
      if (this.config.burstCount === 0 && this.config.emissionRate > 0) {
        this.emissionTimer += deltaTime;
        const emissionInterval = 1.0 / this.config.emissionRate;

        while (this.emissionTimer >= emissionInterval) {
          this.emitParticle();
          this.emissionTimer -= emissionInterval;
        }
      }
    }

    // Update all particles
    const particles = this.pool.getAll();
    for (const particle of particles) {
      if (particle.active) {
        particle.update(deltaTime);
      }
    }
  }

  /**
   * Emits a single particle
   * @returns The emitted particle or null if pool is full
   */
  protected emitParticle(): Particle | null {
    const particle = this.pool.acquire();
    if (!particle) return null;

    // Initialize particle properties based on config
    this.initializeParticle(particle);

    return particle;
  }

  /**
   * Initializes a particle with random values from config
   * @param particle - The particle to initialize
   */
  protected initializeParticle(particle: Particle): void {
    const config = this.config;

    // Set position with spawn radius
    if (config.spawnRadius > 0) {
      const spawnPoint = MathUtils.randomInCircle(config.spawnRadius);
      particle.position.set(
        this.position.x + spawnPoint.x,
        this.position.y + spawnPoint.y
      );
    } else {
      particle.position.copy(this.position);
    }

    // Set lifetime
    particle.lifetime = this.randomValue(config.lifetimeMin, config.lifetimeMax);
    particle.age = 0;

    // Set velocity
    const speed = this.randomValue(config.speedMin, config.speedMax);
    const direction = config.direction + this.randomValue(
      -config.directionVariance,
      config.directionVariance
    );
    particle.velocity.set(
      Math.cos(direction) * speed,
      Math.sin(direction) * speed
    );

    // Set acceleration
    particle.acceleration.set(config.accelerationX, config.accelerationY);

    // Set rotation
    particle.rotation = this.randomValue(config.rotationMin, config.rotationMax);
    particle.angularVelocity = this.randomValue(
      config.angularVelocityMin,
      config.angularVelocityMax
    );

    // Set scale
    particle.startScale = this.randomValue(config.startScaleMin, config.startScaleMax);
    particle.endScale = this.randomValue(config.endScaleMin, config.endScaleMax);
    particle.scale = particle.startScale;

    // Set color
    particle.startColor = { ...config.startColor };
    particle.endColor = { ...config.endColor };
    particle.color = { ...config.startColor };

    // Set alpha
    particle.startAlpha = config.startAlpha;
    particle.endAlpha = config.endAlpha;
    particle.alpha = config.startAlpha;

    // Activate particle
    particle.active = true;
  }

  /**
   * Generates a random value between min and max
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Random value
   */
  protected randomValue(min: number, max: number): number {
    if (this.config.useGaussian) {
      const mean = (min + max) / 2;
      const stdDev = (max - min) / 6; // 99.7% of values within range
      return MathUtils.clamp(MathUtils.randomGaussian(mean, stdDev), min, max);
    }
    return MathUtils.randomRange(min, max);
  }

  /**
   * Gets all active particles
   * @returns Array of active particles
   */
  getParticles(): Particle[] {
    return this.pool.getActive();
  }

  /**
   * Gets the total number of particles (active and inactive)
   * @returns Total particle count
   */
  getTotalParticleCount(): number {
    return this.pool.getTotalCount();
  }

  /**
   * Gets the number of active particles
   * @returns Active particle count
   */
  getActiveParticleCount(): number {
    return this.pool.getActiveCount();
  }

  /**
   * Checks if the emitter is active
   * @returns True if active
   */
  isActive(): boolean {
    return this.active;
  }

  /**
   * Checks if the emitter has completed
   * @returns True if completed
   */
  isCompleted(): boolean {
    return this.completed;
  }

  /**
   * Gets the configuration
   * @returns The particle configuration
   */
  getConfig(): ParticleConfig {
    return this.config;
  }

  /**
   * Sets a new configuration
   * @param config - The new configuration
   */
  setConfig(config: ParticleConfig): void {
    this.config = config;
    this.pool.setMaxSize(config.maxParticles);
  }

  /**
   * Clears all particles
   */
  clear(): void {
    this.pool.clear();
    this.active = false;
    this.emissionTimer = 0;
    this.totalTime = 0;
  }

  /**
   * Emits a burst of particles
   * @param count - Number of particles to emit
   */
  burst(count: number): void {
    for (let i = 0; i < count; i++) {
      this.emitParticle();
    }
  }
}
