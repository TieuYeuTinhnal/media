import { Particle } from '../core/Particle';
import { ParticleAffector } from './ParticleAffector';

/**
 * Applies drag/air resistance to particles
 */
export class DragAffector implements ParticleAffector {
  enabled: boolean = true;

  /**
   * Creates a drag affector
   * @param drag - Drag coefficient (0-1, higher = more drag)
   */
  constructor(public drag: number = 0.01) {}

  affect(particle: Particle, deltaTime: number): void {
    if (!this.enabled) return;

    // Apply drag force opposite to velocity
    const dragForce = 1 - (this.drag * deltaTime);
    particle.velocity.multiply(Math.max(0, dragForce));
  }
}
