import { Particle } from '../core/Particle';
import { ParticleAffector } from './ParticleAffector';
import { Vector2D } from '../utils/Vector2D';

/**
 * Creates a vortex effect that pulls particles in a spiral
 */
export class VortexAffector implements ParticleAffector {
  enabled: boolean = true;

  /**
   * Creates a vortex affector
   * @param centerX - X position of vortex center
   * @param centerY - Y position of vortex center
   * @param strength - Strength of the vortex (tangential force)
   * @param pull - Inward pull strength (radial force)
   */
  constructor(
    public centerX: number = 0,
    public centerY: number = 0,
    public strength: number = 100,
    public pull: number = 0
  ) {}

  affect(particle: Particle, deltaTime: number): void {
    if (!this.enabled) return;

    // Calculate vector from particle to vortex center
    const dx = this.centerX - particle.position.x;
    const dy = this.centerY - particle.position.y;
    const distanceSquared = dx * dx + dy * dy;

    if (distanceSquared < 0.001) return; // Too close to center

    const distance = Math.sqrt(distanceSquared);

    // Calculate tangential force (perpendicular to radial direction)
    const tangentialX = -dy / distance;
    const tangentialY = dx / distance;

    // Apply tangential force (creates spiral motion)
    const tangentialForce = this.strength / distance;
    particle.velocity.x += tangentialX * tangentialForce * deltaTime;
    particle.velocity.y += tangentialY * tangentialForce * deltaTime;

    // Apply radial pull (inward force)
    if (this.pull !== 0) {
      const radialForce = this.pull / distance;
      particle.velocity.x += (dx / distance) * radialForce * deltaTime;
      particle.velocity.y += (dy / distance) * radialForce * deltaTime;
    }
  }

  /**
   * Sets the vortex center position
   * @param x - X position
   * @param y - Y position
   */
  setCenter(x: number, y: number): void {
    this.centerX = x;
    this.centerY = y;
  }
}
