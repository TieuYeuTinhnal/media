import { ParticleConfig } from '../config/ParticleConfig';

export class SettingsPanel {
    private activeTab: string = 'init';

    constructor() {
        this.setupTabSwitching();
    }

    private setupTabSwitching(): void {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = (e.target as HTMLElement).dataset.tab;
                if (tab) {
                    this.switchTab(tab);
                }
            });
        });
    }

    switchTab(tabName: string): void {
        this.activeTab = tabName;

        // Update button states
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');

        // Update content visibility
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`)?.classList.add('active');
    }

    getActiveTab(): string {
        return this.activeTab;
    }

    loadConfig(config: ParticleConfig): void {
        // This would be called to populate all inputs with config values
        // Implementation handled by UIController
    }
}
