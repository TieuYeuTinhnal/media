import { Particle } from '../core/Particle';
import { ParticleAffector } from './ParticleAffector';

/**
 * Applies gravitational force to particles
 */
export class GravityAffector implements ParticleAffector {
  enabled: boolean = true;

  /**
   * Creates a gravity affector
   * @param gravityX - Gravity force in X direction (pixels per second squared)
   * @param gravityY - Gravity force in Y direction (pixels per second squared)
   */
  constructor(
    public gravityX: number = 0,
    public gravityY: number = 98
  ) {}

  affect(particle: Particle, deltaTime: number): void {
    if (!this.enabled) return;

    particle.acceleration.x += this.gravityX;
    particle.acceleration.y += this.gravityY;
  }
}
