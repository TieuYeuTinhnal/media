import { Particle } from '../core/Particle';
import { PhysicsWorld } from './PhysicsWorld';

export class CollisionHandler {
    private world: PhysicsWorld;

    constructor(world: PhysicsWorld) {
        this.world = world;
    }

    checkParticleCollisions(
        particles: Particle[],
        bounce: number,
        friction: number,
        killOnCollision: boolean,
        canvasWidth: number,
        canvasHeight: number,
        enableBounds: boolean
    ): void {
        for (const particle of particles) {
            if (!particle.active) continue;

            // Check canvas boundaries
            if (enableBounds) {
                const halfWidth = canvasWidth / 2;
                const halfHeight = canvasHeight / 2;

                // Left boundary
                if (particle.position.x < -halfWidth) {
                    particle.position.x = -halfWidth;
                    particle.velocity.x *= -bounce;
                    particle.velocity.y *= 1 - friction;
                }
                // Right boundary
                if (particle.position.x > halfWidth) {
                    particle.position.x = halfWidth;
                    particle.velocity.x *= -bounce;
                    particle.velocity.y *= 1 - friction;
                }
                // Top boundary
                if (particle.position.y < -halfHeight) {
                    particle.position.y = -halfHeight;
                    particle.velocity.y *= -bounce;
                    particle.velocity.x *= 1 - friction;
                }
                // Bottom boundary
                if (particle.position.y > halfHeight) {
                    particle.position.y = halfHeight;
                    particle.velocity.y *= -bounce;
                    particle.velocity.x *= 1 - friction;
                }
            }

            // Check obstacle collisions
            // For simplicity, we'll do basic circle-obstacle collision
            // A full implementation would use Matter.js collision detection
        }
    }
}
