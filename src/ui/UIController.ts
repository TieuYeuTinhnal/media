import { ParticleManager } from '../core/ParticleManager';
import { ParticleEmitter } from '../core/ParticleEmitter';
import { ParticleConfig } from '../config/ParticleConfig';
import { ParticlePresets } from '../presets/ParticlePresets';
import { SpineExporter } from '../export/SpineExporter';
import { AnimationBaker } from '../export/AnimationBaker';

const { ipcRenderer } = require('electron');

export class UIController {
    private particleManager: ParticleManager;
    private selectedEmitter: ParticleEmitter | null;
    private animationBaker: AnimationBaker;
    private spineExporter: SpineExporter;

    constructor(particleManager: ParticleManager) {
        this.particleManager = particleManager;
        this.selectedEmitter = null;
        this.animationBaker = new AnimationBaker(60);
        this.spineExporter = new SpineExporter();

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // Tree panel
        document.getElementById('newEmitterBtn')?.addEventListener('click', () => this.createNewEmitter());

        // Control bar
        document.getElementById('simulateBtn')?.addEventListener('click', () => this.toggleSimulation());
        document.getElementById('recordBtn')?.addEventListener('click', () => this.toggleRecording());
        document.getElementById('loopCheckbox')?.addEventListener('change', (e) => {
            if (this.selectedEmitter) {
                this.selectedEmitter.loop = (e.target as HTMLInputElement).checked;
            }
        });

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = (e.target as HTMLElement).dataset.tab;
                this.switchTab(tab!);
            });
        });

        // Init tab inputs
        this.setupInputListener('init-delay', 'delay');
        this.setupInputListener('init-duration', 'duration');
        this.setupInputListener('init-timeScale', 'timeScale');
        this.setupInputListener('init-radius', 'emissionRadius');
        this.setupInputListener('init-count', 'particleCount');
        this.setupInputListener('init-rate', 'emissionRate');
        this.setupInputListener('init-variety', 'variety');
        this.setupInputListener('init-lifeMin', 'lifeMin');
        this.setupInputListener('init-lifeMax', 'lifeMax');
        this.setupInputListener('init-speedMin', 'speedMin');
        this.setupInputListener('init-speedMax', 'speedMax');
        this.setupInputListener('init-angle', 'angle');
        this.setupInputListener('init-spread', 'spread');
        this.setupInputListener('init-scaleMin', 'scaleMin');
        this.setupInputListener('init-scaleMax', 'scaleMax');
        this.setupInputListener('init-rotationMin', 'rotationMin');
        this.setupInputListener('init-rotationMax', 'rotationMax');
        this.setupInputListener('init-rotationSpeed', 'rotationSpeed');
        this.setupInputListener('init-massMin', 'massMin');
        this.setupInputListener('init-massMax', 'massMax');
        this.setupInputListener('init-color', 'color');
        this.setupInputListener('init-shape', 'shape');

        // Update tab inputs
        this.setupInputListener('update-gravityX', 'gravityX');
        this.setupInputListener('update-gravityY', 'gravityY');
        this.setupInputListener('update-windX', 'windX');
        this.setupInputListener('update-windY', 'windY');
        this.setupInputListener('update-drag', 'drag');
        this.setupInputListener('update-scaleStart', 'scaleStart');
        this.setupInputListener('update-scaleEnd', 'scaleEnd');
        this.setupInputListener('update-alphaStart', 'alphaStart');
        this.setupInputListener('update-alphaEnd', 'alphaEnd');
        this.setupInputListener('update-colorStart', 'colorStart');
        this.setupInputListener('update-colorEnd', 'colorEnd');

        // Physics tab inputs
        this.setupInputListener('physics-radius', 'physicsRadius');
        this.setupInputListener('physics-bounce', 'bounce');
        this.setupInputListener('physics-friction', 'friction');
        this.setupInputListener('physics-killOnCollision', 'killOnCollision');
        this.setupInputListener('physics-layer', 'collisionLayer');
        this.setupInputListener('physics-bounds', 'enableBounds');
        this.setupInputListener('physics-killOffscreen', 'killOffscreen');

        // Settings tab
        document.getElementById('saveProjectBtn')?.addEventListener('click', () => this.saveProject());
        document.getElementById('loadProjectBtn')?.addEventListener('click', () => this.loadProject());
        document.getElementById('exportSpineBtn')?.addEventListener('click', () => this.exportSpine());
        document.getElementById('loadPresetBtn')?.addEventListener('click', () => this.loadPreset());

        document.getElementById('perf-maxParticles')?.addEventListener('input', (e) => {
            const value = parseInt((e.target as HTMLInputElement).value);
            this.particleManager.setMaxParticles(value);
        });
    }

    private setupInputListener(elementId: string, configKey: keyof ParticleConfig): void {
        const element = document.getElementById(elementId);
        if (!element) return;

        element.addEventListener('input', (e) => {
            if (!this.selectedEmitter) return;

            const target = e.target as HTMLInputElement;
            let value: any = target.value;

            if (target.type === 'number') {
                value = parseFloat(value);
            } else if (target.type === 'checkbox') {
                value = target.checked;
            }

            (this.selectedEmitter.config as any)[configKey] = value;
        });
    }

    private switchTab(tabName: string): void {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
        document.getElementById(`${tabName}-tab`)?.classList.add('active');
    }

    private createNewEmitter(): void {
        const emitter = this.particleManager.createEmitter();
        this.addEmitterToTree(emitter);
        this.selectEmitter(emitter);
    }

    private addEmitterToTree(emitter: ParticleEmitter): void {
        const treeContent = document.getElementById('treeContent');
        if (!treeContent) return;

        const item = document.createElement('div');
        item.className = 'tree-item';
        item.textContent = emitter.name;
        item.dataset.emitterId = emitter.id;

        item.addEventListener('click', () => {
            this.selectEmitter(emitter);
        });

        treeContent.appendChild(item);
    }

    selectEmitter(emitter: ParticleEmitter): void {
        this.selectedEmitter = emitter;

        // Update tree selection
        document.querySelectorAll('.tree-item').forEach(item => item.classList.remove('selected'));
        const item = document.querySelector(`[data-emitter-id="${emitter.id}"]`);
        item?.classList.add('selected');

        // Update all inputs with emitter config
        this.updateInputsFromConfig(emitter.config);
    }

    private updateInputsFromConfig(config: ParticleConfig): void {
        this.setInputValue('init-delay', config.delay);
        this.setInputValue('init-duration', config.duration);
        this.setInputValue('init-timeScale', config.timeScale);
        this.setInputValue('init-radius', config.emissionRadius);
        this.setInputValue('init-count', config.particleCount);
        this.setInputValue('init-rate', config.emissionRate);
        this.setInputValue('init-variety', config.variety);
        this.setInputValue('init-lifeMin', config.lifeMin);
        this.setInputValue('init-lifeMax', config.lifeMax);
        this.setInputValue('init-speedMin', config.speedMin);
        this.setInputValue('init-speedMax', config.speedMax);
        this.setInputValue('init-angle', config.angle);
        this.setInputValue('init-spread', config.spread);
        this.setInputValue('init-scaleMin', config.scaleMin);
        this.setInputValue('init-scaleMax', config.scaleMax);
        this.setInputValue('init-rotationMin', config.rotationMin);
        this.setInputValue('init-rotationMax', config.rotationMax);
        this.setInputValue('init-rotationSpeed', config.rotationSpeed);
        this.setInputValue('init-massMin', config.massMin);
        this.setInputValue('init-massMax', config.massMax);
        this.setInputValue('init-color', config.color);
        this.setInputValue('init-shape', config.shape);

        this.setInputValue('update-gravityX', config.gravityX);
        this.setInputValue('update-gravityY', config.gravityY);
        this.setInputValue('update-windX', config.windX);
        this.setInputValue('update-windY', config.windY);
        this.setInputValue('update-drag', config.drag);
        this.setInputValue('update-scaleStart', config.scaleStart);
        this.setInputValue('update-scaleEnd', config.scaleEnd);
        this.setInputValue('update-alphaStart', config.alphaStart);
        this.setInputValue('update-alphaEnd', config.alphaEnd);
        this.setInputValue('update-colorStart', config.colorStart);
        this.setInputValue('update-colorEnd', config.colorEnd);

        this.setInputValue('physics-radius', config.physicsRadius);
        this.setInputValue('physics-bounce', config.bounce);
        this.setInputValue('physics-friction', config.friction);
        this.setInputValue('physics-killOnCollision', config.killOnCollision);
        this.setInputValue('physics-layer', config.collisionLayer);
        this.setInputValue('physics-bounds', config.enableBounds);
        this.setInputValue('physics-killOffscreen', config.killOffscreen);
    }

    private setInputValue(elementId: string, value: any): void {
        const element = document.getElementById(elementId) as HTMLInputElement;
        if (!element) return;

        if (element.type === 'checkbox') {
            element.checked = value;
        } else {
            element.value = value;
        }
    }

    private toggleSimulation(): void {
        const btn = document.getElementById('simulateBtn');
        if (!this.selectedEmitter) return;

        if (this.selectedEmitter.active) {
            this.selectedEmitter.stop();
            btn?.classList.remove('active');
        } else {
            this.selectedEmitter.start();
            btn?.classList.add('active');
        }
    }

    private toggleRecording(): void {
        const btn = document.getElementById('recordBtn');

        if (this.animationBaker.isRecording()) {
            this.animationBaker.stopRecording();
            btn?.classList.remove('active');
            alert(`Recording stopped. Captured ${this.animationBaker.getFrameCount()} frames.`);
        } else {
            this.animationBaker.startRecording();
            btn?.classList.add('active');
        }
    }

    private async saveProject(): Promise<void> {
        const projectData = {
            emitters: this.particleManager.getAllEmitters().map(e => ({
                id: e.id,
                name: e.name,
                config: e.config,
                position: e.position,
            })),
        };

        const result = await ipcRenderer.invoke('save-project', projectData);
        if (result.success) {
            alert('Project saved successfully!');
        } else if (!result.canceled) {
            alert('Failed to save project: ' + result.error);
        }
    }

    private async loadProject(): Promise<void> {
        const result = await ipcRenderer.invoke('load-project');
        if (result.success) {
            this.particleManager.clear();
            const treeContent = document.getElementById('treeContent');
            if (treeContent) treeContent.innerHTML = '';

            for (const emitterData of result.data.emitters) {
                const emitter = this.particleManager.createEmitter(emitterData.name, emitterData.config);
                emitter.position = emitterData.position;
                this.addEmitterToTree(emitter);
            }

            alert('Project loaded successfully!');
        } else if (!result.canceled) {
            alert('Failed to load project: ' + result.error);
        }
    }

    private async exportSpine(): Promise<void> {
        if (this.animationBaker.getFrameCount() === 0) {
            alert('No animation recorded. Please record an animation first.');
            return;
        }

        const fps = parseInt((document.getElementById('export-fps') as HTMLInputElement)?.value || '60');
        const frames = this.animationBaker.getFrames();
        const spineData = this.spineExporter.exportAnimation(frames, fps);

        const result = await ipcRenderer.invoke('export-spine', spineData);
        if (result.success) {
            alert('Spine animation exported successfully!');
        } else if (!result.canceled) {
            alert('Failed to export: ' + result.error);
        }
    }

    private loadPreset(): void {
        const select = document.getElementById('presetsDropdown') as HTMLSelectElement;
        const presetName = select.value;

        if (!presetName || !this.selectedEmitter) {
            alert('Please select a preset and an emitter.');
            return;
        }

        const preset = ParticlePresets.getPreset(presetName);
        if (preset) {
            this.selectedEmitter.config = preset;
            this.updateInputsFromConfig(preset);
            alert(`Preset "${presetName}" loaded!`);
        }
    }

    updateParticleCount(count: number): void {
        const element = document.getElementById('particleCount');
        if (element) {
            element.textContent = count.toString();
        }
    }

    getAnimationBaker(): AnimationBaker {
        return this.animationBaker;
    }
}
