import { ParticleConfig } from '../config/ParticleConfig';
import { ParticleEmitter } from '../core/ParticleEmitter';

/**
 * Simple particle editor for tweaking configurations
 * This is a basic implementation that can be extended with a full UI
 */
export class ParticleEditor {
  private config: ParticleConfig;
  private emitter: ParticleEmitter;
  private container: HTMLElement;

  /**
   * Creates a particle editor
   * @param config - The configuration to edit
   * @param emitter - The emitter to preview changes
   * @param container - HTML element to render controls in
   */
  constructor(config: ParticleConfig, emitter: ParticleEmitter, container: HTMLElement) {
    this.config = config;
    this.emitter = emitter;
    this.container = container;
    
    this.buildUI();
  }

  /**
   * Builds the UI controls
   */
  private buildUI(): void {
    this.container.innerHTML = '';
    
    const style = document.createElement('style');
    style.textContent = `
      .particle-editor {
        font-family: Arial, sans-serif;
        padding: 20px;
        background: #f5f5f5;
        border-radius: 8px;
        max-width: 400px;
      }
      .editor-group {
        margin-bottom: 20px;
        padding: 15px;
        background: white;
        border-radius: 4px;
      }
      .editor-group h3 {
        margin: 0 0 10px 0;
        font-size: 16px;
        color: #333;
      }
      .editor-control {
        margin-bottom: 10px;
      }
      .editor-control label {
        display: block;
        font-size: 12px;
        color: #666;
        margin-bottom: 4px;
      }
      .editor-control input[type="range"] {
        width: 100%;
      }
      .editor-control input[type="color"] {
        width: 50px;
        height: 30px;
      }
      .editor-control-value {
        display: inline-block;
        margin-left: 10px;
        font-size: 12px;
        color: #333;
        min-width: 50px;
      }
      .editor-button {
        padding: 8px 16px;
        margin: 5px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .editor-button:hover {
        background: #0056b3;
      }
    `;
    document.head.appendChild(style);

    const editorDiv = document.createElement('div');
    editorDiv.className = 'particle-editor';

    // Emission controls
    editorDiv.appendChild(this.createGroup('Emission', [
      this.createSlider('emissionRate', 'Emission Rate', 0, 200, 1),
      this.createSlider('maxParticles', 'Max Particles', 0, 2000, 10),
      this.createSlider('burstCount', 'Burst Count', 0, 200, 1)
    ]));

    // Lifetime controls
    editorDiv.appendChild(this.createGroup('Lifetime', [
      this.createSlider('lifetimeMin', 'Min Lifetime', 0.1, 10, 0.1),
      this.createSlider('lifetimeMax', 'Max Lifetime', 0.1, 10, 0.1)
    ]));

    // Velocity controls
    editorDiv.appendChild(this.createGroup('Velocity', [
      this.createSlider('speedMin', 'Min Speed', 0, 500, 5),
      this.createSlider('speedMax', 'Max Speed', 0, 500, 5),
      this.createSlider('direction', 'Direction', -Math.PI, Math.PI, 0.1),
      this.createSlider('directionVariance', 'Direction Variance', 0, Math.PI * 2, 0.1)
    ]));

    // Scale controls
    editorDiv.appendChild(this.createGroup('Scale', [
      this.createSlider('startScaleMin', 'Start Min', 0.1, 3, 0.1),
      this.createSlider('startScaleMax', 'Start Max', 0.1, 3, 0.1),
      this.createSlider('endScaleMin', 'End Min', 0, 3, 0.1),
      this.createSlider('endScaleMax', 'End Max', 0, 3, 0.1)
    ]));

    // Color controls
    const colorGroup = this.createGroup('Colors', [
      this.createColorPicker('startColor', 'Start Color'),
      this.createColorPicker('endColor', 'End Color'),
      this.createSlider('startAlpha', 'Start Alpha', 0, 1, 0.01),
      this.createSlider('endAlpha', 'End Alpha', 0, 1, 0.01)
    ]);
    editorDiv.appendChild(colorGroup);

    // Action buttons
    const buttonGroup = document.createElement('div');
    buttonGroup.style.marginTop = '20px';

    const startButton = document.createElement('button');
    startButton.className = 'editor-button';
    startButton.textContent = 'Start';
    startButton.onclick = () => this.emitter.start();
    buttonGroup.appendChild(startButton);

    const stopButton = document.createElement('button');
    stopButton.className = 'editor-button';
    stopButton.textContent = 'Stop';
    stopButton.onclick = () => this.emitter.stop();
    buttonGroup.appendChild(stopButton);

    const burstButton = document.createElement('button');
    burstButton.className = 'editor-button';
    burstButton.textContent = 'Burst';
    burstButton.onclick = () => this.emitter.burst(this.config.burstCount || 50);
    buttonGroup.appendChild(burstButton);

    const exportButton = document.createElement('button');
    exportButton.className = 'editor-button';
    exportButton.textContent = 'Export';
    exportButton.onclick = () => this.exportConfig();
    buttonGroup.appendChild(exportButton);

    editorDiv.appendChild(buttonGroup);

    this.container.appendChild(editorDiv);
  }

  /**
   * Creates a control group
   */
  private createGroup(title: string, controls: HTMLElement[]): HTMLElement {
    const group = document.createElement('div');
    group.className = 'editor-group';

    const heading = document.createElement('h3');
    heading.textContent = title;
    group.appendChild(heading);

    for (const control of controls) {
      group.appendChild(control);
    }

    return group;
  }

  /**
   * Creates a slider control
   */
  private createSlider(property: keyof ParticleConfig, label: string, min: number, max: number, step: number): HTMLElement {
    const control = document.createElement('div');
    control.className = 'editor-control';

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    control.appendChild(labelEl);

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min.toString();
    slider.max = max.toString();
    slider.step = step.toString();
    slider.value = (this.config[property] as number).toString();

    const valueDisplay = document.createElement('span');
    valueDisplay.className = 'editor-control-value';
    valueDisplay.textContent = slider.value;

    slider.oninput = () => {
      const value = parseFloat(slider.value);
      (this.config as any)[property] = value;
      valueDisplay.textContent = value.toFixed(2);
      this.emitter.setConfig(this.config);
    };

    control.appendChild(slider);
    control.appendChild(valueDisplay);

    return control;
  }

  /**
   * Creates a color picker control
   */
  private createColorPicker(property: 'startColor' | 'endColor', label: string): HTMLElement {
    const control = document.createElement('div');
    control.className = 'editor-control';

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    control.appendChild(labelEl);

    const color = this.config[property];
    const hexColor = `#${this.toHex(color.r)}${this.toHex(color.g)}${this.toHex(color.b)}`;

    const picker = document.createElement('input');
    picker.type = 'color';
    picker.value = hexColor;

    picker.oninput = () => {
      const hex = picker.value;
      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5, 7), 16);
      
      this.config[property].r = r;
      this.config[property].g = g;
      this.config[property].b = b;
      
      this.emitter.setConfig(this.config);
    };

    control.appendChild(picker);

    return control;
  }

  /**
   * Converts a number to hex string
   */
  private toHex(n: number): string {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  /**
   * Exports the current configuration
   */
  private exportConfig(): void {
    const json = JSON.stringify(this.config, null, 2);
    console.log('Exported Configuration:', json);
    
    // Create a download link
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'particle-config.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Gets the current configuration
   * @returns Current configuration
   */
  getConfig(): ParticleConfig {
    return this.config;
  }

  /**
   * Sets a new configuration
   * @param config - New configuration
   */
  setConfig(config: ParticleConfig): void {
    this.config = config;
    this.emitter.setConfig(config);
    this.buildUI();
  }
}
