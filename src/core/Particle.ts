import { Vector2D } from '../utils/Vector2D';

export class Particle {
    // Position and velocity
    public position: Vector2D;
    public velocity: Vector2D;
    public acceleration: Vector2D;

    // Visual properties
    public scale: number;
    public rotation: number;
    public r: number;
    public g: number;
    public b: number;
    public alpha: number;

    // Lifecycle
    public life: number;
    public maxLife: number;
    public age: number;
    public active: boolean;

    // Physics
    public mass: number;
    public angularVelocity: number;

    // Initial values for reset
    private initialValues: {
        scale: number;
        rotation: number;
        r: number;
        g: number;
        b: number;
        alpha: number;
    };

    constructor() {
        this.position = new Vector2D();
        this.velocity = new Vector2D();
        this.acceleration = new Vector2D();

        this.scale = 1;
        this.rotation = 0;
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.alpha = 1;

        this.life = 1;
        this.maxLife = 1;
        this.age = 0;
        this.active = false;

        this.mass = 1;
        this.angularVelocity = 0;

        this.initialValues = {
            scale: this.scale,
            rotation: this.rotation,
            r: this.r,
            g: this.g,
            b: this.b,
            alpha: this.alpha,
        };
    }

    init(
        x: number,
        y: number,
        vx: number,
        vy: number,
        life: number,
        scale: number,
        rotation: number,
        r: number,
        g: number,
        b: number,
        alpha: number,
        mass: number,
        angularVelocity: number
    ): void {
        this.position.set(x, y);
        this.velocity.set(vx, vy);
        this.acceleration.set(0, 0);

        this.scale = scale;
        this.rotation = rotation;
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = alpha;

        this.life = life;
        this.maxLife = life;
        this.age = 0;
        this.active = true;

        this.mass = mass;
        this.angularVelocity = angularVelocity;

        this.initialValues = {
            scale: this.scale,
            rotation: this.rotation,
            r: this.r,
            g: this.g,
            b: this.b,
            alpha: this.alpha,
        };
    }

    update(deltaTime: number): void {
        if (!this.active) return;

        // Update age
        this.age += deltaTime;

        // Check if particle should die
        if (this.age >= this.life) {
            this.active = false;
            return;
        }

        // Update velocity with acceleration
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;

        // Update position
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;

        // Update rotation
        this.rotation += this.angularVelocity * deltaTime;

        // Reset acceleration
        this.acceleration.set(0, 0);
    }

    applyForce(fx: number, fy: number): void {
        this.acceleration.x += fx / this.mass;
        this.acceleration.y += fy / this.mass;
    }

    reset(): void {
        this.active = false;
        this.age = 0;
        this.position.set(0, 0);
        this.velocity.set(0, 0);
        this.acceleration.set(0, 0);
        this.scale = this.initialValues.scale;
        this.rotation = this.initialValues.rotation;
        this.r = this.initialValues.r;
        this.g = this.initialValues.g;
        this.b = this.initialValues.b;
        this.alpha = this.initialValues.alpha;
    }

    getLifePercent(): number {
        return this.life > 0 ? this.age / this.life : 1;
    }
}
