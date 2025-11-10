/**
 * Spine AnimationStateListener implementation for particle event handling
 * Note: This is a simplified implementation. In a real project, you would import
 * the actual Spine runtime types from @esotericsoftware/spine-core
 */

import { ParticleEmitter } from '../core/ParticleEmitter';

/**
 * Event data from Spine animation
 */
export interface SpineEventData {
  name: string;
  intValue?: number;
  floatValue?: number;
  stringValue?: string;
}

/**
 * Spine bone for position tracking
 */
export interface SpineBone {
  worldX: number;
  worldY: number;
}

/**
 * Configuration for mapping Spine events to particle emissions
 */
export interface EventEmitterConfig {
  /** The event name to listen for */
  eventName: string;
  
  /** The emitter to trigger */
  emitter: ParticleEmitter;
  
  /** Optional bone to attach emitter to */
  bone?: SpineBone;
  
  /** Whether to emit as burst or start continuous */
  burst: boolean;
  
  /** Number of particles for burst (uses config if not specified) */
  burstCount?: number;
}

/**
 * Handles Spine animation events and triggers particle emissions
 */
export class SpineParticleEventHandler {
  private eventConfigs: Map<string, EventEmitterConfig[]> = new Map();

  /**
   * Registers an emitter to trigger on a specific event
   * @param config - The event-emitter configuration
   */
  registerEventEmitter(config: EventEmitterConfig): void {
    const configs = this.eventConfigs.get(config.eventName) || [];
    configs.push(config);
    this.eventConfigs.set(config.eventName, configs);
  }

  /**
   * Unregisters an emitter from an event
   * @param eventName - The event name
   * @param emitter - The emitter to unregister
   */
  unregisterEventEmitter(eventName: string, emitter: ParticleEmitter): void {
    const configs = this.eventConfigs.get(eventName);
    if (configs) {
      const filtered = configs.filter(c => c.emitter !== emitter);
      if (filtered.length > 0) {
        this.eventConfigs.set(eventName, filtered);
      } else {
        this.eventConfigs.delete(eventName);
      }
    }
  }

  /**
   * Handles a Spine animation event
   * This would typically be called from a Spine AnimationStateListener
   * @param eventData - The event data from Spine
   */
  onEvent(eventData: SpineEventData): void {
    const configs = this.eventConfigs.get(eventData.name);
    if (!configs) return;

    for (const config of configs) {
      // Update emitter position from bone if specified
      if (config.bone) {
        config.emitter.position.set(config.bone.worldX, config.bone.worldY);
      }

      // Trigger emission
      if (config.burst) {
        const count = config.burstCount || config.emitter.getConfig().burstCount;
        config.emitter.burst(count > 0 ? count : 10);
      } else {
        config.emitter.start();
      }
    }
  }

  /**
   * Updates all registered emitters
   * @param deltaTime - Time elapsed since last update
   */
  update(deltaTime: number): void {
    for (const configs of this.eventConfigs.values()) {
      for (const config of configs) {
        // Update emitter position from bone if specified
        if (config.bone) {
          config.emitter.position.set(config.bone.worldX, config.bone.worldY);
        }

        // Update emitter
        config.emitter.update(deltaTime);
      }
    }
  }

  /**
   * Gets all registered emitters
   * @returns Array of all emitters
   */
  getAllEmitters(): ParticleEmitter[] {
    const emitters: ParticleEmitter[] = [];
    for (const configs of this.eventConfigs.values()) {
      for (const config of configs) {
        if (!emitters.includes(config.emitter)) {
          emitters.push(config.emitter);
        }
      }
    }
    return emitters;
  }

  /**
   * Clears all event registrations
   */
  clear(): void {
    this.eventConfigs.clear();
  }

  /**
   * Stops all emitters
   */
  stopAll(): void {
    for (const configs of this.eventConfigs.values()) {
      for (const config of configs) {
        config.emitter.stop();
      }
    }
  }
}

/**
 * Helper class for attaching emitters to Spine bones
 */
export class BoneAttachment {
  /**
   * Attaches an emitter to a bone's world position
   * @param emitter - The emitter to attach
   * @param bone - The bone to attach to
   * @returns Update function to call each frame
   */
  static attach(emitter: ParticleEmitter, bone: SpineBone): () => void {
    return () => {
      emitter.position.set(bone.worldX, bone.worldY);
    };
  }

  /**
   * Creates a tracking update function for multiple emitters
   * @param attachments - Array of [emitter, bone] pairs
   * @returns Update function to call each frame
   */
  static attachMultiple(attachments: [ParticleEmitter, SpineBone][]): () => void {
    return () => {
      for (const [emitter, bone] of attachments) {
        emitter.position.set(bone.worldX, bone.worldY);
      }
    };
  }
}
