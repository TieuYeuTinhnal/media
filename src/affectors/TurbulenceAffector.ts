import { Particle } from '../core/Particle';
import { ParticleAffector } from './ParticleAffector';

/**
 * Applies noise-based turbulence to particles
 */
export class TurbulenceAffector implements ParticleAffector {
  enabled: boolean = true;
  private time: number = 0;

  /**
   * Creates a turbulence affector
   * @param strength - Strength of turbulence
   * @param frequency - Frequency of turbulence changes
   */
  constructor(
    public strength: number = 50,
    public frequency: number = 1
  ) {}

  affect(particle: Particle, deltaTime: number): void {
    if (!this.enabled) return;

    // Update time for noise variation
    this.time += deltaTime * this.frequency;

    // Generate pseudo-random noise based on particle position and time
    // This is a simple noise function - in production, use Perlin or Simplex noise
    const noiseX = this.noise(particle.position.x * 0.01 + this.time);
    const noiseY = this.noise(particle.position.y * 0.01 + this.time + 100);

    // Apply turbulence force
    particle.velocity.x += (noiseX - 0.5) * this.strength * deltaTime;
    particle.velocity.y += (noiseY - 0.5) * this.strength * deltaTime;
  }

  /**
   * Simple noise function (can be replaced with better noise like Perlin)
   * @param x - Input value
   * @returns Pseudo-random value between 0 and 1
   */
  private noise(x: number): number {
    const i = Math.floor(x);
    const f = x - i;
    const u = f * f * (3.0 - 2.0 * f);
    
    // Simple hash function
    const a = this.hash(i);
    const b = this.hash(i + 1);
    
    return a + u * (b - a);
  }

  /**
   * Hash function for noise generation
   * @param n - Input number
   * @returns Pseudo-random value between 0 and 1
   */
  private hash(n: number): number {
    n = Math.sin(n) * 43758.5453123;
    return n - Math.floor(n);
  }
}
