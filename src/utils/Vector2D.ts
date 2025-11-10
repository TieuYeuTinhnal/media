/**
 * 2D Vector class for particle system calculations
 */
export class Vector2D {
  /**
   * Creates a new Vector2D
   * @param x - The x component
   * @param y - The y component
   */
  constructor(public x: number = 0, public y: number = 0) {}

  /**
   * Adds another vector to this vector
   * @param v - The vector to add
   * @returns This vector for chaining
   */
  add(v: Vector2D): Vector2D {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /**
   * Subtracts another vector from this vector
   * @param v - The vector to subtract
   * @returns This vector for chaining
   */
  subtract(v: Vector2D): Vector2D {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /**
   * Multiplies this vector by a scalar
   * @param scalar - The scalar to multiply by
   * @returns This vector for chaining
   */
  multiply(scalar: number): Vector2D {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   * Divides this vector by a scalar
   * @param scalar - The scalar to divide by
   * @returns This vector for chaining
   */
  divide(scalar: number): Vector2D {
    if (scalar !== 0) {
      this.x /= scalar;
      this.y /= scalar;
    }
    return this;
  }

  /**
   * Calculates the length (magnitude) of this vector
   * @returns The length of the vector
   */
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Calculates the squared length of this vector (faster than length)
   * @returns The squared length
   */
  lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Normalizes this vector to unit length
   * @returns This vector for chaining
   */
  normalize(): Vector2D {
    const len = this.length();
    if (len > 0) {
      this.divide(len);
    }
    return this;
  }

  /**
   * Calculates the distance to another vector
   * @param v - The other vector
   * @returns The distance
   */
  distance(v: Vector2D): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculates the squared distance to another vector (faster than distance)
   * @param v - The other vector
   * @returns The squared distance
   */
  distanceSquared(v: Vector2D): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  /**
   * Calculates the dot product with another vector
   * @param v - The other vector
   * @returns The dot product
   */
  dot(v: Vector2D): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Rotates this vector by an angle in radians
   * @param angle - The angle in radians
   * @returns This vector for chaining
   */
  rotate(angle: number): Vector2D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const newX = this.x * cos - this.y * sin;
    const newY = this.x * sin + this.y * cos;
    this.x = newX;
    this.y = newY;
    return this;
  }

  /**
   * Calculates the angle of this vector in radians
   * @returns The angle in radians
   */
  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Sets the components of this vector
   * @param x - The x component
   * @param y - The y component
   * @returns This vector for chaining
   */
  set(x: number, y: number): Vector2D {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Copies the components from another vector
   * @param v - The vector to copy from
   * @returns This vector for chaining
   */
  copy(v: Vector2D): Vector2D {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /**
   * Creates a copy of this vector
   * @returns A new vector with the same components
   */
  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  /**
   * Resets this vector to zero
   * @returns This vector for chaining
   */
  zero(): Vector2D {
    this.x = 0;
    this.y = 0;
    return this;
  }

  /**
   * Creates a vector from an angle
   * @param angle - The angle in radians
   * @param length - The length of the vector (default: 1)
   * @returns A new vector
   */
  static fromAngle(angle: number, length: number = 1): Vector2D {
    return new Vector2D(Math.cos(angle) * length, Math.sin(angle) * length);
  }

  /**
   * Linearly interpolates between two vectors
   * @param a - The start vector
   * @param b - The end vector
   * @param t - The interpolation factor (0-1)
   * @returns A new interpolated vector
   */
  static lerp(a: Vector2D, b: Vector2D, t: number): Vector2D {
    return new Vector2D(
      a.x + (b.x - a.x) * t,
      a.y + (b.y - a.y) * t
    );
  }
}
