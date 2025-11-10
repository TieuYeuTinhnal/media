import { Particle } from '../core/Particle';

/**
 * Interface for particle affectors that modify particle behavior
 */
export interface ParticleAffector {
  /**
   * Applies the affector's effect to a particle
   * @param particle - The particle to affect
   * @param deltaTime - Time elapsed since last update in seconds
   */
  affect(particle: Particle, deltaTime: number): void;

  /**
   * Whether the affector is enabled
   */
  enabled: boolean;
}
