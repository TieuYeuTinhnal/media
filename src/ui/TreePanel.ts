import { ParticleEmitter } from '../core/ParticleEmitter';

export class TreePanel {
    private container: HTMLElement;
    private onEmitterSelected?: (emitter: ParticleEmitter) => void;

    constructor(containerId: string) {
        const element = document.getElementById(containerId);
        if (!element) {
            throw new Error(`Tree panel container ${containerId} not found`);
        }
        this.container = element;
    }

    addEmitter(emitter: ParticleEmitter): void {
        const item = document.createElement('div');
        item.className = 'tree-item';
        item.textContent = emitter.name;
        item.dataset.emitterId = emitter.id;

        item.addEventListener('click', () => {
            this.selectEmitter(emitter);
        });

        this.container.appendChild(item);
    }

    selectEmitter(emitter: ParticleEmitter): void {
        // Update visual selection
        this.container.querySelectorAll('.tree-item').forEach(item => {
            item.classList.remove('selected');
        });

        const item = this.container.querySelector(`[data-emitter-id="${emitter.id}"]`);
        if (item) {
            item.classList.add('selected');
        }

        // Notify listener
        if (this.onEmitterSelected) {
            this.onEmitterSelected(emitter);
        }
    }

    removeEmitter(emitterId: string): void {
        const item = this.container.querySelector(`[data-emitter-id="${emitterId}"]`);
        if (item) {
            item.remove();
        }
    }

    clear(): void {
        this.container.innerHTML = '';
    }

    setOnEmitterSelected(callback: (emitter: ParticleEmitter) => void): void {
        this.onEmitterSelected = callback;
    }
}
