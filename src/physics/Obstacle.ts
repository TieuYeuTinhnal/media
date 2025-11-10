import * as Matter from 'matter-js';

export type ObstacleShape = 'circle' | 'rectangle' | 'polygon';

export class Obstacle {
    public body: Matter.Body;
    public shape: ObstacleShape;

    constructor(
        x: number,
        y: number,
        shape: ObstacleShape,
        options: { width?: number; height?: number; radius?: number; sides?: number }
    ) {
        this.shape = shape;

        switch (shape) {
            case 'circle':
                this.body = Matter.Bodies.circle(x, y, options.radius || 50, {
                    isStatic: true,
                });
                break;

            case 'rectangle':
                this.body = Matter.Bodies.rectangle(
                    x,
                    y,
                    options.width || 100,
                    options.height || 100,
                    { isStatic: true }
                );
                break;

            case 'polygon':
                this.body = Matter.Bodies.polygon(x, y, options.sides || 6, options.radius || 50, {
                    isStatic: true,
                });
                break;
        }
    }

    setPosition(x: number, y: number): void {
        Matter.Body.setPosition(this.body, { x, y });
    }

    setAngle(angle: number): void {
        Matter.Body.setAngle(this.body, angle);
    }

    getBounds(): { min: { x: number; y: number }; max: { x: number; y: number } } {
        return this.body.bounds;
    }
}
