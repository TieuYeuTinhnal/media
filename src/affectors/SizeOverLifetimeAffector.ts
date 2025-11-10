import { Particle } from '../core/Particle';
import { ParticleAffector } from './ParticleAffector';
import { MathUtils } from '../utils/MathUtils';

/**
 * Curve types for size animation
 */
export enum SizeCurve {
  LINEAR = 'linear',
  EASE_IN = 'easeIn',
  EASE_OUT = 'easeOut',
  EASE_IN_OUT = 'easeInOut',
  CONSTANT = 'constant'
}

/**
 * Animates particle size over its lifetime with various curve options
 */
export class SizeOverLifetimeAffector implements ParticleAffector {
  enabled: boolean = true;

  /**
   * Creates a size over lifetime affector
   * @param startSize - Size at birth (multiplier)
   * @param endSize - Size at death (multiplier)
   * @param curve - Interpolation curve type
   */
  constructor(
    public startSize: number = 1,
    public endSize: number = 0,
    public curve: SizeCurve = SizeCurve.LINEAR
  ) {}

  affect(particle: Particle, deltaTime: number): void {
    if (!this.enabled) return;

    const t = particle.getNormalizedAge();
    let interpolatedT = t;

    // Apply curve
    switch (this.curve) {
      case SizeCurve.LINEAR:
        interpolatedT = t;
        break;
      case SizeCurve.EASE_IN:
        interpolatedT = MathUtils.easeInQuad(t);
        break;
      case SizeCurve.EASE_OUT:
        interpolatedT = MathUtils.easeOutQuad(t);
        break;
      case SizeCurve.EASE_IN_OUT:
        interpolatedT = MathUtils.easeInOutQuad(t);
        break;
      case SizeCurve.CONSTANT:
        interpolatedT = 0;
        break;
    }

    // Calculate size
    const size = this.startSize + (this.endSize - this.startSize) * interpolatedT;
    particle.scale = size * particle.startScale;
  }

  /**
   * Sets the size curve
   * @param curve - The curve type
   */
  setCurve(curve: SizeCurve): void {
    this.curve = curve;
  }

  /**
   * Sets the start and end sizes
   * @param start - Start size multiplier
   * @param end - End size multiplier
   */
  setSizes(start: number, end: number): void {
    this.startSize = start;
    this.endSize = end;
  }
}
