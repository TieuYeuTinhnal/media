import { Particle } from './Particle';

export class ParticlePool {
    private pool: Particle[];
    private maxSize: number;

    constructor(maxSize: number = 10000) {
        this.maxSize = maxSize;
        this.pool = [];

        // Pre-allocate some particles
        for (let i = 0; i < Math.min(1000, maxSize); i++) {
            this.pool.push(new Particle());
        }
    }

    obtain(): Particle | null {
        // Try to get an inactive particle from the pool
        for (let i = 0; i < this.pool.length; i++) {
            if (!this.pool[i].active) {
                return this.pool[i];
            }
        }

        // Create a new particle if under max size
        if (this.pool.length < this.maxSize) {
            const particle = new Particle();
            this.pool.push(particle);
            return particle;
        }

        // Pool is full and all particles are active
        return null;
    }

    free(particle: Particle): void {
        particle.reset();
    }

    freeAll(): void {
        for (const particle of this.pool) {
            particle.reset();
        }
    }

    getActiveCount(): number {
        return this.pool.filter(p => p.active).length;
    }

    getTotalCount(): number {
        return this.pool.length;
    }

    getAllParticles(): Particle[] {
        return this.pool;
    }

    resize(newSize: number): void {
        this.maxSize = newSize;
        // Remove excess particles if new size is smaller
        if (this.pool.length > newSize) {
            this.pool.length = newSize;
        }
    }
}
