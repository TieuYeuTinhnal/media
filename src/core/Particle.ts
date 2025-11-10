import { Vector2D } from '../utils/Vector2D';
import { RGBA } from '../utils/ColorUtils';

/**
 * Represents a single particle in the particle system
 */
export class Particle {
  /** Current position */
  position: Vector2D;
  
  /** Current velocity */
  velocity: Vector2D;
  
  /** Current acceleration */
  acceleration: Vector2D;
  
  /** Current scale */
  scale: number;
  
  /** Start scale */
  startScale: number;
  
  /** End scale */
  endScale: number;
  
  /** Current rotation in radians */
  rotation: number;
  
  /** Angular velocity in radians per second */
  angularVelocity: number;
  
  /** Current color */
  color: RGBA;
  
  /** Start color */
  startColor: RGBA;
  
  /** End color */
  endColor: RGBA;
  
  /** Current alpha (0-1) */
  alpha: number;
  
  /** Start alpha (0-1) */
  startAlpha: number;
  
  /** End alpha (0-1) */
  endAlpha: number;
  
  /** Total lifetime in seconds */
  lifetime: number;
  
  /** Time alive in seconds */
  age: number;
  
  /** Whether the particle is currently active */
  active: boolean;

  constructor() {
    this.position = new Vector2D();
    this.velocity = new Vector2D();
    this.acceleration = new Vector2D();
    this.scale = 1;
    this.startScale = 1;
    this.endScale = 1;
    this.rotation = 0;
    this.angularVelocity = 0;
    this.color = { r: 255, g: 255, b: 255, a: 1 };
    this.startColor = { r: 255, g: 255, b: 255, a: 1 };
    this.endColor = { r: 255, g: 255, b: 255, a: 1 };
    this.alpha = 1;
    this.startAlpha = 1;
    this.endAlpha = 0;
    this.lifetime = 1;
    this.age = 0;
    this.active = false;
  }

  /**
   * Updates the particle state
   * @param deltaTime - Time elapsed since last update in seconds
   */
  update(deltaTime: number): void {
    if (!this.active) return;

    // Update age
    this.age += deltaTime;

    // Check if particle should be deactivated
    if (this.age >= this.lifetime) {
      this.active = false;
      return;
    }

    // Calculate normalized lifetime (0 to 1)
    const t = this.age / this.lifetime;

    // Update velocity with acceleration
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += this.acceleration.y * deltaTime;

    // Update position with velocity
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    // Update rotation
    this.rotation += this.angularVelocity * deltaTime;

    // Interpolate scale
    this.scale = this.startScale + (this.endScale - this.startScale) * t;

    // Interpolate color
    this.color.r = this.startColor.r + (this.endColor.r - this.startColor.r) * t;
    this.color.g = this.startColor.g + (this.endColor.g - this.startColor.g) * t;
    this.color.b = this.startColor.b + (this.endColor.b - this.startColor.b) * t;

    // Interpolate alpha
    this.alpha = this.startAlpha + (this.endAlpha - this.startAlpha) * t;
    this.color.a = this.alpha;
  }

  /**
   * Resets the particle to inactive state
   */
  reset(): void {
    this.active = false;
    this.age = 0;
    this.position.zero();
    this.velocity.zero();
    this.acceleration.zero();
    this.rotation = 0;
    this.angularVelocity = 0;
    this.scale = 1;
    this.alpha = 1;
  }

  /**
   * Gets the normalized lifetime (0 to 1)
   * @returns Normalized lifetime value
   */
  getNormalizedAge(): number {
    return this.lifetime > 0 ? this.age / this.lifetime : 0;
  }

  /**
   * Checks if the particle is alive
   * @returns True if the particle is active and within its lifetime
   */
  isAlive(): boolean {
    return this.active && this.age < this.lifetime;
  }
}
