import { Particle } from '../core/Particle';
import { ParticleEmitter } from '../core/ParticleEmitter';
import { ColorUtils } from '../utils/ColorUtils';
import { BlendMode } from '../config/ParticleConfig';

/**
 * Canvas 2D renderer for particles
 */
export class ParticleRenderer {
  private context: CanvasRenderingContext2D;

  /**
   * Creates a particle renderer
   * @param canvas - The canvas element to render to
   */
  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D rendering context');
    }
    this.context = ctx;
  }

  /**
   * Renders all particles from an emitter
   * @param emitter - The particle emitter to render
   */
  render(emitter: ParticleEmitter): void {
    const particles = emitter.getParticles();
    const config = emitter.getConfig();

    // Set blend mode
    this.setBlendMode(config.blendMode);

    for (const particle of particles) {
      if (particle.active) {
        this.renderParticle(particle);
      }
    }

    // Reset blend mode
    this.context.globalCompositeOperation = 'source-over';
  }

  /**
   * Renders multiple emitters
   * @param emitters - Array of emitters to render
   */
  renderMultiple(emitters: ParticleEmitter[]): void {
    for (const emitter of emitters) {
      this.render(emitter);
    }
  }

  /**
   * Renders a single particle
   * @param particle - The particle to render
   */
  private renderParticle(particle: Particle): void {
    const ctx = this.context;

    ctx.save();

    // Apply transformations
    ctx.translate(particle.position.x, particle.position.y);
    ctx.rotate(particle.rotation);
    ctx.scale(particle.scale, particle.scale);

    // Set alpha
    ctx.globalAlpha = particle.alpha;

    // Set color
    const color = ColorUtils.toRgbaString(particle.color);
    ctx.fillStyle = color;

    // Draw particle as a circle (default shape)
    // In a real implementation, you would support textures here
    const radius = 5; // Default particle radius
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Sets the canvas blend mode
   * @param blendMode - The blend mode to use
   */
  private setBlendMode(blendMode: BlendMode): void {
    switch (blendMode) {
      case BlendMode.NORMAL:
        this.context.globalCompositeOperation = 'source-over';
        break;
      case BlendMode.ADD:
        this.context.globalCompositeOperation = 'lighter';
        break;
      case BlendMode.MULTIPLY:
        this.context.globalCompositeOperation = 'multiply';
        break;
      case BlendMode.SCREEN:
        this.context.globalCompositeOperation = 'screen';
        break;
    }
  }

  /**
   * Clears the canvas
   */
  clear(): void {
    const canvas = this.context.canvas;
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Gets the rendering context
   * @returns The 2D rendering context
   */
  getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  /**
   * Renders a particle with a custom texture
   * @param particle - The particle to render
   * @param image - The image to use as texture
   */
  renderParticleWithTexture(particle: Particle, image: HTMLImageElement | HTMLCanvasElement): void {
    const ctx = this.context;

    ctx.save();

    // Apply transformations
    ctx.translate(particle.position.x, particle.position.y);
    ctx.rotate(particle.rotation);
    ctx.scale(particle.scale, particle.scale);

    // Set alpha
    ctx.globalAlpha = particle.alpha;

    // Tint the image with particle color
    // This is a simplified approach - for better color tinting, use a temporary canvas
    const width = image.width || 32;
    const height = image.height || 32;
    ctx.drawImage(image, -width / 2, -height / 2, width, height);

    ctx.restore();
  }
}
