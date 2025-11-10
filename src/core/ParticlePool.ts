import { Particle } from './Particle';

/**
 * Object pool for particle management
 * Reduces garbage collection pressure by reusing particle objects
 */
export class ParticlePool {
  private particles: Particle[];
  private maxSize: number;

  /**
   * Creates a new particle pool
   * @param maxSize - Maximum number of particles in the pool
   */
  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize;
    this.particles = [];
    
    // Pre-allocate some particles
    const initialSize = Math.min(100, maxSize);
    for (let i = 0; i < initialSize; i++) {
      this.particles.push(new Particle());
    }
  }

  /**
   * Gets an inactive particle from the pool
   * @returns A particle or null if pool is at capacity
   */
  acquire(): Particle | null {
    // Try to find an inactive particle
    for (const particle of this.particles) {
      if (!particle.active) {
        particle.reset();
        return particle;
      }
    }

    // If all particles are active and we haven't reached max size, create a new one
    if (this.particles.length < this.maxSize) {
      const particle = new Particle();
      this.particles.push(particle);
      return particle;
    }

    // Pool is at capacity
    return null;
  }

  /**
   * Releases a particle back to the pool
   * @param particle - The particle to release
   */
  release(particle: Particle): void {
    particle.reset();
  }

  /**
   * Releases all active particles
   */
  releaseAll(): void {
    for (const particle of this.particles) {
      particle.reset();
    }
  }

  /**
   * Gets all particles in the pool
   * @returns Array of all particles
   */
  getAll(): Particle[] {
    return this.particles;
  }

  /**
   * Gets only active particles
   * @returns Array of active particles
   */
  getActive(): Particle[] {
    return this.particles.filter(p => p.active);
  }

  /**
   * Gets the number of active particles
   * @returns Count of active particles
   */
  getActiveCount(): number {
    return this.particles.filter(p => p.active).length;
  }

  /**
   * Gets the total number of particles in the pool
   * @returns Total particle count
   */
  getTotalCount(): number {
    return this.particles.length;
  }

  /**
   * Gets the maximum pool size
   * @returns Maximum size
   */
  getMaxSize(): number {
    return this.maxSize;
  }

  /**
   * Sets the maximum pool size
   * @param size - New maximum size
   */
  setMaxSize(size: number): void {
    this.maxSize = size;
    
    // If new size is smaller, remove excess inactive particles
    if (this.particles.length > size) {
      const activeParticles = this.getActive();
      if (activeParticles.length <= size) {
        // Keep active particles and fill remaining slots with inactive ones
        const inactiveParticles = this.particles.filter(p => !p.active);
        this.particles = [
          ...activeParticles,
          ...inactiveParticles.slice(0, size - activeParticles.length)
        ];
      } else {
        // Too many active particles, just keep the first 'size' particles
        this.particles = this.particles.slice(0, size);
      }
    }
  }

  /**
   * Clears the pool and releases all particles
   */
  clear(): void {
    this.releaseAll();
  }
}
