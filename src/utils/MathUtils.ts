/**
 * Mathematical utility functions for particle system
 */
export class MathUtils {
  /**
   * Clamps a value between min and max
   * @param value - The value to clamp
   * @param min - The minimum value
   * @param max - The maximum value
   * @returns The clamped value
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Linear interpolation between two values
   * @param a - Start value
   * @param b - End value
   * @param t - Interpolation factor (0-1)
   * @returns The interpolated value
   */
  static lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  /**
   * Smooth interpolation with ease-in and ease-out
   * @param t - Input value (0-1)
   * @returns Smoothed value (0-1)
   */
  static smoothstep(t: number): number {
    t = this.clamp(t, 0, 1);
    return t * t * (3 - 2 * t);
  }

  /**
   * Returns a random value between min and max
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Random value
   */
  static randomRange(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  /**
   * Returns a random value with Gaussian distribution
   * Uses Box-Muller transform
   * @param mean - The mean value
   * @param stdDev - The standard deviation
   * @returns Random value with Gaussian distribution
   */
  static randomGaussian(mean: number = 0, stdDev: number = 1): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
  }

  /**
   * Converts degrees to radians
   * @param degrees - Angle in degrees
   * @returns Angle in radians
   */
  static degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Converts radians to degrees
   * @param radians - Angle in radians
   * @returns Angle in degrees
   */
  static radToDeg(radians: number): number {
    return radians * (180 / Math.PI);
  }

  /**
   * Quadratic easing in
   * @param t - Input value (0-1)
   * @returns Eased value (0-1)
   */
  static easeInQuad(t: number): number {
    return t * t;
  }

  /**
   * Quadratic easing out
   * @param t - Input value (0-1)
   * @returns Eased value (0-1)
   */
  static easeOutQuad(t: number): number {
    return t * (2 - t);
  }

  /**
   * Quadratic easing in and out
   * @param t - Input value (0-1)
   * @returns Eased value (0-1)
   */
  static easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  /**
   * Cubic easing in
   * @param t - Input value (0-1)
   * @returns Eased value (0-1)
   */
  static easeInCubic(t: number): number {
    return t * t * t;
  }

  /**
   * Cubic easing out
   * @param t - Input value (0-1)
   * @returns Eased value (0-1)
   */
  static easeOutCubic(t: number): number {
    return (--t) * t * t + 1;
  }

  /**
   * Cubic easing in and out
   * @param t - Input value (0-1)
   * @returns Eased value (0-1)
   */
  static easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  /**
   * Returns a random point within a circle
   * @param radius - The radius of the circle
   * @returns Object with x and y coordinates
   */
  static randomInCircle(radius: number): { x: number; y: number } {
    const angle = Math.random() * 2 * Math.PI;
    const r = Math.sqrt(Math.random()) * radius;
    return {
      x: r * Math.cos(angle),
      y: r * Math.sin(angle)
    };
  }

  /**
   * Maps a value from one range to another
   * @param value - The value to map
   * @param inMin - Input range minimum
   * @param inMax - Input range maximum
   * @param outMin - Output range minimum
   * @param outMax - Output range maximum
   * @returns The mapped value
   */
  static map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
  }

  /**
   * Checks if a value is within a range
   * @param value - The value to check
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns True if value is within range
   */
  static inRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }
}
