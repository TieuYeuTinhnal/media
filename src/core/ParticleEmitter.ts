import { Particle } from './Particle';
import { ParticlePool } from './ParticlePool';
import { ParticleConfig } from '../config/ParticleConfig';
import { MathUtils } from '../utils/MathUtils';
import { ColorUtils } from '../utils/ColorUtils';

export class ParticleEmitter {
    public id: string;
    public name: string;
    public config: ParticleConfig;
    public position: { x: number; y: number };
    public active: boolean;
    public loop: boolean;

    private pool: ParticlePool;
    private emissionTimer: number;
    private durationTimer: number;
    private delayTimer: number;
    private started: boolean;

    constructor(id: string, name: string, config: ParticleConfig, pool: ParticlePool) {
        this.id = id;
        this.name = name;
        this.config = config;
        this.pool = pool;
        this.position = { x: 0, y: 0 };
        this.active = false;
        this.loop = true;
        this.emissionTimer = 0;
        this.durationTimer = 0;
        this.delayTimer = 0;
        this.started = false;
    }

    start(): void {
        this.started = true;
        this.active = true;
        this.emissionTimer = 0;
        this.durationTimer = 0;
        this.delayTimer = 0;
    }

    stop(): void {
        this.active = false;
        this.started = false;
    }

    reset(): void {
        this.pool.freeAll();
        this.emissionTimer = 0;
        this.durationTimer = 0;
        this.delayTimer = 0;
        this.started = false;
        this.active = false;
    }

    update(deltaTime: number): void {
        if (!this.started) return;

        const dt = deltaTime * this.config.timeScale;

        // Handle delay
        if (this.delayTimer < this.config.delay / 1000) {
            this.delayTimer += dt;
            return;
        }

        // Handle duration
        if (this.config.duration > 0) {
            this.durationTimer += dt;
            if (this.durationTimer >= this.config.duration / 1000) {
                if (this.loop) {
                    this.durationTimer = 0;
                    this.delayTimer = 0;
                } else {
                    this.active = false;
                    return;
                }
            }
        }

        // Emit particles
        if (this.active) {
            const emissionInterval = 1 / this.config.emissionRate;
            this.emissionTimer += dt;

            while (this.emissionTimer >= emissionInterval) {
                this.emitParticle();
                this.emissionTimer -= emissionInterval;
            }
        }

        // Update all active particles
        const particles = this.pool.getAllParticles();
        for (const particle of particles) {
            if (particle.active) {
                this.updateParticle(particle, dt);
                particle.update(dt);
            }
        }
    }

    private emitParticle(): void {
        const particle = this.pool.obtain();
        if (!particle) return;

        // Calculate spawn position with radius
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * this.config.emissionRadius;
        const x = this.position.x + Math.cos(angle) * radius;
        const y = this.position.y + Math.sin(angle) * radius;

        // Calculate velocity
        const speed = MathUtils.randomRange(this.config.speedMin, this.config.speedMax);
        const angleRad = MathUtils.degToRad(this.config.angle);
        const spreadRad = MathUtils.degToRad(this.config.spread);
        const velocityAngle = angleRad + MathUtils.randomRange(-spreadRad / 2, spreadRad / 2);
        const vx = Math.cos(velocityAngle) * speed;
        const vy = Math.sin(velocityAngle) * speed;

        // Get initial values
        const life = MathUtils.randomRange(this.config.lifeMin, this.config.lifeMax);
        const scale = MathUtils.randomRange(this.config.scaleMin, this.config.scaleMax);
        const rotation = MathUtils.degToRad(
            MathUtils.randomRange(this.config.rotationMin, this.config.rotationMax)
        );
        const mass = MathUtils.randomRange(this.config.massMin, this.config.massMax);
        const angularVelocity = MathUtils.degToRad(this.config.rotationSpeed);

        // Get color
        const rgb = ColorUtils.hexToRgb(this.config.color);
        const variety = this.config.variety / 100;
        const r = MathUtils.clamp(rgb.r + MathUtils.randomRange(-variety * 50, variety * 50), 0, 255);
        const g = MathUtils.clamp(rgb.g + MathUtils.randomRange(-variety * 50, variety * 50), 0, 255);
        const b = MathUtils.clamp(rgb.b + MathUtils.randomRange(-variety * 50, variety * 50), 0, 255);

        particle.init(x, y, vx, vy, life, scale, rotation, r, g, b, 1, mass, angularVelocity);
    }

    private updateParticle(particle: Particle, deltaTime: number): void {
        // Apply forces
        particle.applyForce(this.config.gravityX, this.config.gravityY);
        particle.applyForce(this.config.windX, this.config.windY);

        // Apply drag
        const drag = this.config.drag;
        particle.velocity.x *= 1 - drag;
        particle.velocity.y *= 1 - drag;

        // Update scale over time
        const t = particle.getLifePercent();
        particle.scale = MathUtils.lerp(this.config.scaleStart, this.config.scaleEnd, t);

        // Update alpha over time
        particle.alpha = MathUtils.lerp(this.config.alphaStart, this.config.alphaEnd, t);

        // Update color over time
        const startColor = ColorUtils.hexToRgb(this.config.colorStart);
        const endColor = ColorUtils.hexToRgb(this.config.colorEnd);
        const currentColor = ColorUtils.lerpColor(startColor, endColor, t);
        particle.r = currentColor.r;
        particle.g = currentColor.g;
        particle.b = currentColor.b;

        // Kill offscreen particles
        if (this.config.killOffscreen) {
            // This will be checked by the renderer
        }
    }

    getActiveParticleCount(): number {
        return this.pool.getActiveCount();
    }
}
