import { ParticleManager } from './core/ParticleManager';
import { CanvasRenderer } from './renderer/CanvasRenderer';
import { UIController } from './ui/UIController';
import { PhysicsWorld } from './physics/PhysicsWorld';
import { CollisionHandler } from './physics/CollisionHandler';

class App {
    private particleManager: ParticleManager;
    private canvasRenderer: CanvasRenderer;
    private uiController: UIController;
    private physicsWorld: PhysicsWorld;
    private collisionHandler: CollisionHandler;

    private lastTime: number;
    private isRunning: boolean;

    constructor() {
        // Initialize systems
        this.particleManager = new ParticleManager(10000);
        
        const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Canvas element not found');
        }
        this.canvasRenderer = new CanvasRenderer(canvas);

        this.physicsWorld = new PhysicsWorld();
        this.collisionHandler = new CollisionHandler(this.physicsWorld);

        this.uiController = new UIController(this.particleManager);

        this.lastTime = performance.now();
        this.isRunning = true;

        // Create initial emitter
        const initialEmitter = this.particleManager.createEmitter('Default Emitter');
        this.uiController.selectEmitter(initialEmitter);

        // Start render loop
        this.render();
    }

    private render = (): void => {
        if (!this.isRunning) return;

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;

        // Cap delta time to prevent large jumps
        const clampedDelta = Math.min(deltaTime, 0.1);

        // Update systems
        this.update(clampedDelta);

        // Render
        this.draw();

        // Continue loop
        requestAnimationFrame(this.render);
    };

    private update(deltaTime: number): void {
        // Update particle manager
        this.particleManager.update(deltaTime);

        // Update physics
        this.physicsWorld.update(deltaTime);

        // Handle collisions
        const emitters = this.particleManager.getAllEmitters();
        for (const emitter of emitters) {
            const pool = (emitter as any).pool;
            if (pool) {
                const particles = pool.getAllParticles();
                this.collisionHandler.checkParticleCollisions(
                    particles,
                    emitter.config.bounce,
                    emitter.config.friction,
                    emitter.config.killOnCollision,
                    this.canvasRenderer.getWidth(),
                    this.canvasRenderer.getHeight(),
                    emitter.config.enableBounds
                );
            }
        }

        // Update animation baker if recording
        const baker = this.uiController.getAnimationBaker();
        if (baker.isRecording()) {
            const allParticles: any[] = [];
            for (const emitter of emitters) {
                const pool = (emitter as any).pool;
                if (pool) {
                    allParticles.push(...pool.getAllParticles());
                }
            }
            baker.update(deltaTime, allParticles);
        }

        // Update UI
        const totalParticles = this.particleManager.getTotalParticleCount();
        this.uiController.updateParticleCount(totalParticles);
    }

    private draw(): void {
        // Clear canvas
        this.canvasRenderer.clear();

        // Draw grid
        this.canvasRenderer.renderGrid();

        // Draw particles from all emitters
        const emitters = this.particleManager.getAllEmitters();
        for (const emitter of emitters) {
            const pool = (emitter as any).pool;
            if (pool) {
                const particles = pool.getAllParticles();
                this.canvasRenderer.renderParticles(particles);
            }
        }
    }

    stop(): void {
        this.isRunning = false;
    }
}

// Initialize app when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    console.log('Spine Particle Studio initialized');
});
