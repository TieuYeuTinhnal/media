import { Particle } from '../core/Particle';
import { ParticleAffector } from './ParticleAffector';
import { RGBA } from '../utils/ColorUtils';

/**
 * Gradient stop for color animation
 */
export interface ColorGradientStop {
  /** Time in particle lifetime (0-1) */
  time: number;
  /** Color at this time */
  color: RGBA;
}

/**
 * Animates particle color over its lifetime using a gradient
 */
export class ColorOverLifetimeAffector implements ParticleAffector {
  enabled: boolean = true;

  /**
   * Creates a color over lifetime affector
   * @param gradient - Array of color gradient stops (must be sorted by time)
   */
  constructor(public gradient: ColorGradientStop[]) {
    // Ensure gradient is sorted by time
    this.gradient.sort((a, b) => a.time - b.time);
  }

  affect(particle: Particle, _deltaTime: number): void {
    if (!this.enabled || this.gradient.length === 0) return;

    const t = particle.getNormalizedAge();

    // Find the two gradient stops to interpolate between
    let startStop = this.gradient[0];
    let endStop = this.gradient[this.gradient.length - 1];

    for (let i = 0; i < this.gradient.length - 1; i++) {
      if (t >= this.gradient[i].time && t <= this.gradient[i + 1].time) {
        startStop = this.gradient[i];
        endStop = this.gradient[i + 1];
        break;
      }
    }

    // Calculate interpolation factor between the two stops
    const range = endStop.time - startStop.time;
    const localT = range > 0 ? (t - startStop.time) / range : 0;

    // Interpolate color
    particle.color.r = startStop.color.r + (endStop.color.r - startStop.color.r) * localT;
    particle.color.g = startStop.color.g + (endStop.color.g - startStop.color.g) * localT;
    particle.color.b = startStop.color.b + (endStop.color.b - startStop.color.b) * localT;
    particle.color.a = startStop.color.a + (endStop.color.a - startStop.color.a) * localT;
    particle.alpha = particle.color.a;
  }

  /**
   * Adds a color stop to the gradient
   * @param time - Time in particle lifetime (0-1)
   * @param color - Color at this time
   */
  addColorStop(time: number, color: RGBA): void {
    this.gradient.push({ time, color });
    this.gradient.sort((a, b) => a.time - b.time);
  }

  /**
   * Clears all gradient stops
   */
  clearGradient(): void {
    this.gradient = [];
  }
}
