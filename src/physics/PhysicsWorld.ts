import * as Matter from 'matter-js';

export class PhysicsWorld {
    private engine: Matter.Engine;
    private world: Matter.World;
    private obstacles: Matter.Body[];

    constructor() {
        this.engine = Matter.Engine.create({
            gravity: { x: 0, y: 0, scale: 0.001 }
        });
        this.world = this.engine.world;
        this.obstacles = [];
    }

    update(deltaTime: number): void {
        // Update physics (deltaTime in seconds, Matter expects ms)
        Matter.Engine.update(this.engine, deltaTime * 1000);
    }

    addObstacle(body: Matter.Body): void {
        Matter.World.add(this.world, body);
        this.obstacles.push(body);
    }

    removeObstacle(body: Matter.Body): void {
        Matter.World.remove(this.world, body);
        const index = this.obstacles.indexOf(body);
        if (index > -1) {
            this.obstacles.splice(index, 1);
        }
    }

    clearObstacles(): void {
        for (const obstacle of this.obstacles) {
            Matter.World.remove(this.world, obstacle);
        }
        this.obstacles = [];
    }

    getObstacles(): Matter.Body[] {
        return this.obstacles;
    }

    checkCollision(x: number, y: number, radius: number): boolean {
        for (const obstacle of this.obstacles) {
            const bounds = obstacle.bounds;
            if (
                x + radius > bounds.min.x &&
                x - radius < bounds.max.x &&
                y + radius > bounds.min.y &&
                y - radius < bounds.max.y
            ) {
                return true;
            }
        }
        return false;
    }
}
