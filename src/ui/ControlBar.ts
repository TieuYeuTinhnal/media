export class ControlBar {
    private particleCountElement: HTMLElement | null;
    private loopCheckbox: HTMLInputElement | null;
    private simulateBtn: HTMLElement | null;
    private recordBtn: HTMLElement | null;

    private onSimulateToggle?: () => void;
    private onRecordToggle?: () => void;
    private onLoopChange?: (loop: boolean) => void;

    constructor() {
        this.particleCountElement = document.getElementById('particleCount');
        this.loopCheckbox = document.getElementById('loopCheckbox') as HTMLInputElement;
        this.simulateBtn = document.getElementById('simulateBtn');
        this.recordBtn = document.getElementById('recordBtn');

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.simulateBtn?.addEventListener('click', () => {
            if (this.onSimulateToggle) {
                this.onSimulateToggle();
            }
        });

        this.recordBtn?.addEventListener('click', () => {
            if (this.onRecordToggle) {
                this.onRecordToggle();
            }
        });

        this.loopCheckbox?.addEventListener('change', () => {
            if (this.onLoopChange && this.loopCheckbox) {
                this.onLoopChange(this.loopCheckbox.checked);
            }
        });
    }

    updateParticleCount(count: number): void {
        if (this.particleCountElement) {
            this.particleCountElement.textContent = count.toString();
        }
    }

    setSimulateActive(active: boolean): void {
        if (this.simulateBtn) {
            if (active) {
                this.simulateBtn.classList.add('active');
            } else {
                this.simulateBtn.classList.remove('active');
            }
        }
    }

    setRecordActive(active: boolean): void {
        if (this.recordBtn) {
            if (active) {
                this.recordBtn.classList.add('active');
            } else {
                this.recordBtn.classList.remove('active');
            }
        }
    }

    getLoopEnabled(): boolean {
        return this.loopCheckbox?.checked || false;
    }

    setOnSimulateToggle(callback: () => void): void {
        this.onSimulateToggle = callback;
    }

    setOnRecordToggle(callback: () => void): void {
        this.onRecordToggle = callback;
    }

    setOnLoopChange(callback: (loop: boolean) => void): void {
        this.onLoopChange = callback;
    }
}
