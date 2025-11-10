import { ParticleEmitter } from './ParticleEmitter';
import { ParticleEmitterAdvanced } from './ParticleEmitterAdvanced';
import { ParticleConfig } from '../config/ParticleConfig';

/**
 * Manages multiple particle emitters
 */
export class ParticleSystemManager {
  private emitters: Map<string, ParticleEmitter> = new Map();
  private configs: Map<string, ParticleConfig> = new Map();

  /**
   * Registers a particle configuration
   * @param name - Configuration name
   * @param config - The configuration
   */
  registerConfig(name: string, config: ParticleConfig): void {
    this.configs.set(name, config);
  }

  /**
   * Gets a registered configuration
   * @param name - Configuration name
   * @returns The configuration or undefined
   */
  getConfig(name: string): ParticleConfig | undefined {
    return this.configs.get(name);
  }

  /**
   * Creates and adds an emitter
   * @param id - Unique identifier for the emitter
   * @param config - Particle configuration
   * @param advanced - Whether to create an advanced emitter
   * @returns The created emitter
   */
  createEmitter(id: string, config: ParticleConfig, advanced: boolean = false): ParticleEmitter {
    const emitter = advanced 
      ? new ParticleEmitterAdvanced(config)
      : new ParticleEmitter(config);
    
    this.emitters.set(id, emitter);
    return emitter;
  }

  /**
   * Creates an emitter from a registered configuration
   * @param id - Unique identifier for the emitter
   * @param configName - Name of registered configuration
   * @param advanced - Whether to create an advanced emitter
   * @returns The created emitter or null if config not found
   */
  createEmitterFromConfig(id: string, configName: string, advanced: boolean = false): ParticleEmitter | null {
    const config = this.configs.get(configName);
    if (!config) return null;

    return this.createEmitter(id, config, advanced);
  }

  /**
   * Adds an existing emitter
   * @param id - Unique identifier for the emitter
   * @param emitter - The emitter to add
   */
  addEmitter(id: string, emitter: ParticleEmitter): void {
    this.emitters.set(id, emitter);
  }

  /**
   * Gets an emitter by ID
   * @param id - The emitter ID
   * @returns The emitter or undefined
   */
  getEmitter(id: string): ParticleEmitter | undefined {
    return this.emitters.get(id);
  }

  /**
   * Removes an emitter
   * @param id - The emitter ID
   * @returns True if removed, false if not found
   */
  removeEmitter(id: string): boolean {
    const emitter = this.emitters.get(id);
    if (emitter) {
      emitter.stop();
      emitter.clear();
      this.emitters.delete(id);
      return true;
    }
    return false;
  }

  /**
   * Updates all emitters
   * @param deltaTime - Time elapsed since last update
   */
  update(deltaTime: number): void {
    for (const emitter of this.emitters.values()) {
      emitter.update(deltaTime);
    }
  }

  /**
   * Starts an emitter
   * @param id - The emitter ID
   * @returns True if started, false if not found
   */
  startEmitter(id: string): boolean {
    const emitter = this.emitters.get(id);
    if (emitter) {
      emitter.start();
      return true;
    }
    return false;
  }

  /**
   * Stops an emitter
   * @param id - The emitter ID
   * @returns True if stopped, false if not found
   */
  stopEmitter(id: string): boolean {
    const emitter = this.emitters.get(id);
    if (emitter) {
      emitter.stop();
      return true;
    }
    return false;
  }

  /**
   * Stops all emitters
   */
  stopAll(): void {
    for (const emitter of this.emitters.values()) {
      emitter.stop();
    }
  }

  /**
   * Clears all particles from all emitters
   */
  clearAll(): void {
    for (const emitter of this.emitters.values()) {
      emitter.clear();
    }
  }

  /**
   * Gets all emitters
   * @returns Array of all emitters
   */
  getAllEmitters(): ParticleEmitter[] {
    return Array.from(this.emitters.values());
  }

  /**
   * Gets total particle count across all emitters
   * @returns Total particle count
   */
  getTotalParticleCount(): number {
    let count = 0;
    for (const emitter of this.emitters.values()) {
      count += emitter.getActiveParticleCount();
    }
    return count;
  }

  /**
   * Gets the number of emitters
   * @returns Emitter count
   */
  getEmitterCount(): number {
    return this.emitters.size;
  }

  /**
   * Clears all emitters and configurations
   */
  clear(): void {
    this.stopAll();
    this.clearAll();
    this.emitters.clear();
    this.configs.clear();
  }

  /**
   * Exports all configurations to JSON
   * @returns JSON string of all configurations
   */
  exportConfigs(): string {
    const configsObj: { [key: string]: ParticleConfig } = {};
    for (const [name, config] of this.configs.entries()) {
      configsObj[name] = config;
    }
    return JSON.stringify(configsObj, null, 2);
  }

  /**
   * Imports configurations from JSON
   * @param json - JSON string of configurations
   */
  importConfigs(json: string): void {
    const configsObj = JSON.parse(json);
    for (const [name, config] of Object.entries(configsObj)) {
      this.configs.set(name, config as ParticleConfig);
    }
  }
}
