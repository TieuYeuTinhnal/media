import { ParticleEmitter } from './ParticleEmitter';
import { ParticleConfig } from '../config/ParticleConfig';
import { ParticleAffector } from '../affectors/ParticleAffector';

/**
 * Advanced particle emitter with support for affectors
 */
export class ParticleEmitterAdvanced extends ParticleEmitter {
  private affectors: ParticleAffector[];

  /**
   * Creates an advanced particle emitter
   * @param config - The particle configuration
   */
  constructor(config: ParticleConfig) {
    super(config);
    this.affectors = [];
  }

  /**
   * Updates the emitter and applies affectors to particles
   * @param deltaTime - Time elapsed since last update in seconds
   */
  override update(deltaTime: number): void {
    // Call parent update to handle emission and basic particle updates
    super.update(deltaTime);

    // Apply affectors to all active particles
    if (this.affectors.length > 0) {
      const particles = this.pool.getActive();
      for (const particle of particles) {
        // Reset acceleration for this frame (affectors will set it)
        particle.acceleration.set(this.config.accelerationX, this.config.accelerationY);

        // Apply each affector
        for (const affector of this.affectors) {
          if (affector.enabled) {
            affector.affect(particle, deltaTime);
          }
        }
      }
    }
  }

  /**
   * Adds an affector to the emitter
   * @param affector - The affector to add
   */
  addAffector(affector: ParticleAffector): void {
    this.affectors.push(affector);
  }

  /**
   * Removes an affector from the emitter
   * @param affector - The affector to remove
   */
  removeAffector(affector: ParticleAffector): void {
    const index = this.affectors.indexOf(affector);
    if (index !== -1) {
      this.affectors.splice(index, 1);
    }
  }

  /**
   * Gets all affectors
   * @returns Array of affectors
   */
  getAffectors(): ParticleAffector[] {
    return this.affectors;
  }

  /**
   * Clears all affectors
   */
  clearAffectors(): void {
    this.affectors = [];
  }

  /**
   * Gets the number of affectors
   * @returns Count of affectors
   */
  getAffectorCount(): number {
    return this.affectors.length;
  }
}
