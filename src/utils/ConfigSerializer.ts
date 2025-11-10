import { ParticleConfig } from '../config/ParticleConfig';

/**
 * Serializes and deserializes particle configurations
 */
export class ConfigSerializer {
  /**
   * Exports a configuration to JSON string
   * @param config - The configuration to export
   * @param pretty - Whether to format with indentation
   * @returns JSON string
   */
  static toJson(config: ParticleConfig, pretty: boolean = true): string {
    return JSON.stringify(config, null, pretty ? 2 : 0);
  }

  /**
   * Imports a configuration from JSON string
   * @param json - The JSON string
   * @returns Parsed configuration
   */
  static fromJson(json: string): ParticleConfig {
    return JSON.parse(json);
  }

  /**
   * Exports multiple configurations to JSON
   * @param configs - Map of configuration name to config
   * @param pretty - Whether to format with indentation
   * @returns JSON string
   */
  static toJsonMultiple(configs: Map<string, ParticleConfig>, pretty: boolean = true): string {
    const obj: { [key: string]: ParticleConfig } = {};
    for (const [name, config] of configs.entries()) {
      obj[name] = config;
    }
    return JSON.stringify(obj, null, pretty ? 2 : 0);
  }

  /**
   * Imports multiple configurations from JSON
   * @param json - The JSON string
   * @returns Map of configuration name to config
   */
  static fromJsonMultiple(json: string): Map<string, ParticleConfig> {
    const obj = JSON.parse(json);
    const configs = new Map<string, ParticleConfig>();
    for (const [name, config] of Object.entries(obj)) {
      configs.set(name, config as ParticleConfig);
    }
    return configs;
  }

  /**
   * Exports a configuration to binary format (more compact)
   * @param config - The configuration to export
   * @returns ArrayBuffer with binary data
   */
  static toBinary(config: ParticleConfig): ArrayBuffer {
    // Create a buffer large enough for all data
    const buffer = new ArrayBuffer(1024);
    const view = new DataView(buffer);
    let offset = 0;

    // Write version number
    view.setUint8(offset++, 1);

    // Write emission settings
    view.setFloat32(offset, config.emissionRate); offset += 4;
    view.setUint16(offset, config.burstCount); offset += 2;
    view.setUint16(offset, config.maxParticles); offset += 2;

    // Write lifetime settings
    view.setFloat32(offset, config.lifetimeMin); offset += 4;
    view.setFloat32(offset, config.lifetimeMax); offset += 4;

    // Write position settings
    view.setFloat32(offset, config.spawnRadius); offset += 4;
    view.setFloat32(offset, config.spawnAngle); offset += 4;
    view.setFloat32(offset, config.spawnAngleVariance); offset += 4;

    // Write velocity settings
    view.setFloat32(offset, config.speedMin); offset += 4;
    view.setFloat32(offset, config.speedMax); offset += 4;
    view.setFloat32(offset, config.direction); offset += 4;
    view.setFloat32(offset, config.directionVariance); offset += 4;

    // Write acceleration settings
    view.setFloat32(offset, config.accelerationX); offset += 4;
    view.setFloat32(offset, config.accelerationY); offset += 4;

    // Write rotation settings
    view.setFloat32(offset, config.rotationMin); offset += 4;
    view.setFloat32(offset, config.rotationMax); offset += 4;
    view.setFloat32(offset, config.angularVelocityMin); offset += 4;
    view.setFloat32(offset, config.angularVelocityMax); offset += 4;

    // Write scale settings
    view.setFloat32(offset, config.startScaleMin); offset += 4;
    view.setFloat32(offset, config.startScaleMax); offset += 4;
    view.setFloat32(offset, config.endScaleMin); offset += 4;
    view.setFloat32(offset, config.endScaleMax); offset += 4;

    // Write color settings (RGBA as uint8)
    view.setUint8(offset++, config.startColor.r);
    view.setUint8(offset++, config.startColor.g);
    view.setUint8(offset++, config.startColor.b);
    view.setUint8(offset++, Math.round(config.startColor.a * 255));
    
    view.setUint8(offset++, config.endColor.r);
    view.setUint8(offset++, config.endColor.g);
    view.setUint8(offset++, config.endColor.b);
    view.setUint8(offset++, Math.round(config.endColor.a * 255));

    // Write alpha settings
    view.setFloat32(offset, config.startAlpha); offset += 4;
    view.setFloat32(offset, config.endAlpha); offset += 4;

    // Write duration settings
    view.setFloat32(offset, config.duration); offset += 4;
    view.setUint8(offset++, config.loop ? 1 : 0);
    view.setUint8(offset++, config.useGaussian ? 1 : 0);

    // Return only the used portion of the buffer
    return buffer.slice(0, offset);
  }

  /**
   * Imports a configuration from binary format
   * @param buffer - ArrayBuffer with binary data
   * @returns Parsed configuration
   */
  static fromBinary(buffer: ArrayBuffer): ParticleConfig {
    const view = new DataView(buffer);
    let offset = 0;

    // Read version
    const version = view.getUint8(offset++);
    if (version !== 1) {
      throw new Error(`Unsupported binary format version: ${version}`);
    }

    const config: ParticleConfig = {
      // Emission
      emissionRate: view.getFloat32(offset), 
      burstCount: view.getUint16(offset + 4),
      maxParticles: view.getUint16(offset + 6),

      // Lifetime
      lifetimeMin: view.getFloat32(offset + 8),
      lifetimeMax: view.getFloat32(offset + 12),

      // Position
      spawnRadius: view.getFloat32(offset + 16),
      spawnAngle: view.getFloat32(offset + 20),
      spawnAngleVariance: view.getFloat32(offset + 24),

      // Velocity
      speedMin: view.getFloat32(offset + 28),
      speedMax: view.getFloat32(offset + 32),
      direction: view.getFloat32(offset + 36),
      directionVariance: view.getFloat32(offset + 40),

      // Acceleration
      accelerationX: view.getFloat32(offset + 44),
      accelerationY: view.getFloat32(offset + 48),

      // Rotation
      rotationMin: view.getFloat32(offset + 52),
      rotationMax: view.getFloat32(offset + 56),
      angularVelocityMin: view.getFloat32(offset + 60),
      angularVelocityMax: view.getFloat32(offset + 64),

      // Scale
      startScaleMin: view.getFloat32(offset + 68),
      startScaleMax: view.getFloat32(offset + 72),
      endScaleMin: view.getFloat32(offset + 76),
      endScaleMax: view.getFloat32(offset + 80),

      // Colors
      startColor: {
        r: view.getUint8(offset + 84),
        g: view.getUint8(offset + 85),
        b: view.getUint8(offset + 86),
        a: view.getUint8(offset + 87) / 255
      },
      endColor: {
        r: view.getUint8(offset + 88),
        g: view.getUint8(offset + 89),
        b: view.getUint8(offset + 90),
        a: view.getUint8(offset + 91) / 255
      },

      // Alpha
      startAlpha: view.getFloat32(offset + 92),
      endAlpha: view.getFloat32(offset + 96),

      // Duration
      duration: view.getFloat32(offset + 100),
      loop: view.getUint8(offset + 104) === 1,
      useGaussian: view.getUint8(offset + 105) === 1,

      // Rendering (defaults)
      blendMode: 0 as any,
      texture: undefined
    };

    return config;
  }

  /**
   * Saves configuration to local storage
   * @param key - Storage key
   * @param config - Configuration to save
   */
  static saveToLocalStorage(key: string, config: ParticleConfig): void {
    const json = this.toJson(config);
    localStorage.setItem(key, json);
  }

  /**
   * Loads configuration from local storage
   * @param key - Storage key
   * @returns Configuration or null if not found
   */
  static loadFromLocalStorage(key: string): ParticleConfig | null {
    const json = localStorage.getItem(key);
    if (!json) return null;
    return this.fromJson(json);
  }
}
