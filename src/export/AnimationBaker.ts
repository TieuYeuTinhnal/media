import { Particle } from '../core/Particle';

export interface BakedFrame {
    time: number;
    particles: Array<{
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        alpha: number;
    }>;
}

export class AnimationBaker {
    private frames: BakedFrame[];
    private fps: number;
    private recording: boolean;
    private currentTime: number;
    private frameTime: number;

    constructor(fps: number = 60) {
        this.fps = fps;
        this.frameTime = 1 / fps;
        this.frames = [];
        this.recording = false;
        this.currentTime = 0;
    }

    startRecording(): void {
        this.recording = true;
        this.frames = [];
        this.currentTime = 0;
    }

    stopRecording(): void {
        this.recording = false;
    }

    isRecording(): boolean {
        return this.recording;
    }

    update(deltaTime: number, particles: Particle[]): void {
        if (!this.recording) return;

        this.currentTime += deltaTime;

        // Record a frame at the appropriate interval
        if (this.currentTime >= this.frameTime) {
            this.recordFrame(particles);
            this.currentTime = 0;
        }
    }

    private recordFrame(particles: Particle[]): void {
        const frame: BakedFrame = {
            time: this.frames.length * this.frameTime,
            particles: [],
        };

        for (const particle of particles) {
            if (particle.active) {
                frame.particles.push({
                    x: particle.position.x,
                    y: particle.position.y,
                    rotation: particle.rotation,
                    scaleX: particle.scale,
                    scaleY: particle.scale,
                    alpha: particle.alpha,
                });
            }
        }

        this.frames.push(frame);
    }

    getFrames(): BakedFrame[] {
        return this.frames;
    }

    getDuration(): number {
        return this.frames.length * this.frameTime;
    }

    getFrameCount(): number {
        return this.frames.length;
    }

    clear(): void {
        this.frames = [];
        this.currentTime = 0;
        this.recording = false;
    }
}
