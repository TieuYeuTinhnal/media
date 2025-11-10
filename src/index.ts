/**
 * Spine2D Particle System Tool
 * A complete and professional particle system for Spine2D animations
 */

// Core classes
export { Particle } from './core/Particle';
export { ParticlePool } from './core/ParticlePool';
export { ParticleEmitter } from './core/ParticleEmitter';
export { ParticleEmitterAdvanced } from './core/ParticleEmitterAdvanced';
export { ParticleSystemManager } from './core/ParticleSystemManager';

// Configuration
export { 
  ParticleConfig, 
  BlendMode, 
  createDefaultConfig 
} from './config/ParticleConfig';

// Affectors
export { ParticleAffector } from './affectors/ParticleAffector';
export { GravityAffector } from './affectors/GravityAffector';
export { DragAffector } from './affectors/DragAffector';
export { VortexAffector } from './affectors/VortexAffector';
export { AttractorAffector } from './affectors/AttractorAffector';
export { TurbulenceAffector } from './affectors/TurbulenceAffector';
export { 
  ColorOverLifetimeAffector, 
  ColorGradientStop 
} from './affectors/ColorOverLifetimeAffector';
export { 
  SizeOverLifetimeAffector, 
  SizeCurve 
} from './affectors/SizeOverLifetimeAffector';

// Renderers
export { ParticleRenderer } from './renderer/ParticleRenderer';
export { WebGLParticleRenderer } from './renderer/WebGLParticleRenderer';

// Spine Integration
export { 
  SpineParticleEventHandler,
  BoneAttachment,
  SpineEventData,
  SpineBone,
  EventEmitterConfig
} from './integration/SpineEventHandler';

// Utilities
export { Vector2D } from './utils/Vector2D';
export { MathUtils } from './utils/MathUtils';
export { 
  ColorUtils, 
  RGB, 
  RGBA, 
  HSL 
} from './utils/ColorUtils';
export { ParticleProfiler } from './utils/ParticleProfiler';
export { ConfigSerializer } from './utils/ConfigSerializer';

// Presets
export { ParticlePresets } from './presets/ParticlePresets';
export { AdvancedParticlePresets } from './presets/AdvancedParticlePresets';

// Editor
export { ParticleEditor } from './editor/ParticleEditor';
