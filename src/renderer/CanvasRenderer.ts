import { Particle } from '../core/Particle';
import { ColorUtils } from '../utils/ColorUtils';
import { GridRenderer } from './GridRenderer';

export class CanvasRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gridRenderer: GridRenderer;
    private width: number;
    private height: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Failed to get 2D context');
        }
        this.ctx = context;
        this.gridRenderer = new GridRenderer();
        this.width = canvas.width;
        this.height = canvas.height;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    private resize(): void {
        const rect = this.canvas.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    clear(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    renderGrid(): void {
        this.gridRenderer.render(this.ctx, this.width, this.height);
    }

    renderParticles(particles: Particle[]): void {
        for (const particle of particles) {
            if (particle.active) {
                this.renderParticle(particle);
            }
        }
    }

    private renderParticle(particle: Particle): void {
        this.ctx.save();

        // Translate to particle position (centered canvas)
        this.ctx.translate(
            this.width / 2 + particle.position.x,
            this.height / 2 + particle.position.y
        );

        // Rotate
        this.ctx.rotate(particle.rotation);

        // Scale
        this.ctx.scale(particle.scale, particle.scale);

        // Set color and alpha
        this.ctx.fillStyle = ColorUtils.rgbaString(
            particle.r,
            particle.g,
            particle.b,
            particle.alpha
        );

        // Draw particle (circle for now)
        const size = 10;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    renderShape(
        x: number,
        y: number,
        shape: 'circle' | 'square' | 'triangle' | 'star',
        size: number,
        color: string
    ): void {
        this.ctx.save();
        this.ctx.translate(this.width / 2 + x, this.height / 2 + y);
        this.ctx.fillStyle = color;

        switch (shape) {
            case 'circle':
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size, 0, Math.PI * 2);
                this.ctx.fill();
                break;

            case 'square':
                this.ctx.fillRect(-size, -size, size * 2, size * 2);
                break;

            case 'triangle':
                this.ctx.beginPath();
                this.ctx.moveTo(0, -size);
                this.ctx.lineTo(size, size);
                this.ctx.lineTo(-size, size);
                this.ctx.closePath();
                this.ctx.fill();
                break;

            case 'star':
                this.drawStar(0, 0, 5, size, size / 2);
                this.ctx.fill();
                break;
        }

        this.ctx.restore();
    }

    private drawStar(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number): void {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.ctx.lineTo(x, y);
            rot += step;
        }

        this.ctx.lineTo(cx, cy - outerRadius);
        this.ctx.closePath();
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getCenter(): { x: number; y: number } {
        return { x: this.width / 2, y: this.height / 2 };
    }
}
