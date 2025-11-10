import { ParticleEmitter } from './ParticleEmitter';
import { ParticlePool } from './ParticlePool';
import { ParticleConfig, createDefaultConfig } from '../config/ParticleConfig';

export class ParticleManager {
    private emitters: Map<string, ParticleEmitter>;
    private globalPool: ParticlePool;
    private nextId: number;

    constructor(maxParticles: number = 10000) {
        this.emitters = new Map();
        this.globalPool = new ParticlePool(maxParticles);
        this.nextId = 1;
    }

    createEmitter(name?: string, config?: ParticleConfig): ParticleEmitter {
        const id = `emitter_${this.nextId++}`;
        const emitterName = name || `Emitter ${this.nextId - 1}`;
        const emitterConfig = config || createDefaultConfig();

        const emitter = new ParticleEmitter(id, emitterName, emitterConfig, this.globalPool);
        this.emitters.set(id, emitter);

        return emitter;
    }

    removeEmitter(id: string): void {
        const emitter = this.emitters.get(id);
        if (emitter) {
            emitter.stop();
            emitter.reset();
            this.emitters.delete(id);
        }
    }

    getEmitter(id: string): ParticleEmitter | undefined {
        return this.emitters.get(id);
    }

    getAllEmitters(): ParticleEmitter[] {
        return Array.from(this.emitters.values());
    }

    update(deltaTime: number): void {
        for (const emitter of this.emitters.values()) {
            emitter.update(deltaTime);
        }
    }

    reset(): void {
        for (const emitter of this.emitters.values()) {
            emitter.reset();
        }
        this.globalPool.freeAll();
    }

    getTotalParticleCount(): number {
        return this.globalPool.getActiveCount();
    }

    setMaxParticles(max: number): void {
        this.globalPool.resize(max);
    }

    clear(): void {
        this.emitters.clear();
        this.globalPool.freeAll();
        this.nextId = 1;
    }
}
