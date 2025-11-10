import { Particle } from '../core/Particle';
import { ParticleAffector } from './ParticleAffector';

/**
 * Attracts or repels particles from a point
 */
export class AttractorAffector implements ParticleAffector {
  enabled: boolean = true;

  /**
   * Creates an attractor affector
   * @param x - X position of attractor
   * @param y - Y position of attractor
   * @param strength - Strength of attraction (negative for repulsion)
   * @param radius - Effective radius (0 for infinite)
   */
  constructor(
    public x: number = 0,
    public y: number = 0,
    public strength: number = 100,
    public radius: number = 0
  ) {}

  affect(particle: Particle, deltaTime: number): void {
    if (!this.enabled) return;

    // Calculate vector from particle to attractor
    const dx = this.x - particle.position.x;
    const dy = this.y - particle.position.y;
    const distanceSquared = dx * dx + dy * dy;

    if (distanceSquared < 0.001) return; // Too close

    const distance = Math.sqrt(distanceSquared);

    // Check if within effective radius
    if (this.radius > 0 && distance > this.radius) return;

    // Calculate force (inverse square law)
    let force = this.strength / distanceSquared;

    // Apply force towards attractor
    const dirX = dx / distance;
    const dirY = dy / distance;

    particle.velocity.x += dirX * force * deltaTime;
    particle.velocity.y += dirY * force * deltaTime;
  }

  /**
   * Sets the attractor position
   * @param x - X position
   * @param y - Y position
   */
  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
