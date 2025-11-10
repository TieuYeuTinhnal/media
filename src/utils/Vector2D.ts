export class Vector2D {
    constructor(public x: number = 0, public y: number = 0) {}

    set(x: number, y: number): Vector2D {
        this.x = x;
        this.y = y;
        return this;
    }

    add(v: Vector2D): Vector2D {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    subtract(v: Vector2D): Vector2D {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    multiply(scalar: number): Vector2D {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    divide(scalar: number): Vector2D {
        if (scalar !== 0) {
            this.x /= scalar;
            this.y /= scalar;
        }
        return this;
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector2D {
        const mag = this.magnitude();
        if (mag > 0) {
            this.divide(mag);
        }
        return this;
    }

    distance(v: Vector2D): number {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    dot(v: Vector2D): number {
        return this.x * v.x + this.y * v.y;
    }

    clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

    static fromAngle(angle: number, magnitude: number = 1): Vector2D {
        return new Vector2D(
            Math.cos(angle) * magnitude,
            Math.sin(angle) * magnitude
        );
    }
}
