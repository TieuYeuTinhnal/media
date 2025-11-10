import { BakedFrame } from './AnimationBaker';

interface SpineBone {
    name: string;
    parent?: string;
}

interface SpineSlot {
    name: string;
    bone: string;
    attachment: string;
}

interface SpineKeyframe {
    time: number;
    x?: number;
    y?: number;
    scaleX?: number;
    scaleY?: number;
    rotation?: number;
}

interface SpineAnimation {
    bones: {
        [boneName: string]: {
            translate?: SpineKeyframe[];
            scale?: SpineKeyframe[];
            rotate?: SpineKeyframe[];
        };
    };
    slots?: {
        [slotName: string]: {
            color?: Array<{ time: number; color: string }>;
        };
    };
}

export interface SpineData {
    skeleton: {
        hash: string;
        spine: string;
        width: number;
        height: number;
        fps: number;
    };
    bones: SpineBone[];
    slots: SpineSlot[];
    skins: {
        default: {
            [slotName: string]: {
                [attachmentName: string]: {
                    type: string;
                    width: number;
                    height: number;
                };
            };
        };
    };
    animations: {
        [animationName: string]: SpineAnimation;
    };
}

export class SpineExporter {
    exportAnimation(frames: BakedFrame[], fps: number, animationName: string = 'particle_animation'): SpineData {
        const bones: SpineBone[] = [{ name: 'root' }];
        const slots: SpineSlot[] = [];
        const skinData: any = {};

        // Find max particle count across all frames
        let maxParticles = 0;
        for (const frame of frames) {
            maxParticles = Math.max(maxParticles, frame.particles.length);
        }

        // Create bones and slots for each particle
        for (let i = 0; i < maxParticles; i++) {
            const boneName = `particle_${i}`;
            const slotName = `slot_${i}`;
            const attachmentName = `particle`;

            bones.push({
                name: boneName,
                parent: 'root',
            });

            slots.push({
                name: slotName,
                bone: boneName,
                attachment: attachmentName,
            });

            skinData[slotName] = {
                [attachmentName]: {
                    type: 'region',
                    width: 10,
                    height: 10,
                },
            };
        }

        // Build animation keyframes
        const animation: SpineAnimation = {
            bones: {},
        };

        // Organize data by particle index
        const particleTimelines: Array<{
            translate: SpineKeyframe[];
            scale: SpineKeyframe[];
            rotate: SpineKeyframe[];
        }> = [];

        for (let i = 0; i < maxParticles; i++) {
            particleTimelines.push({
                translate: [],
                scale: [],
                rotate: [],
            });
        }

        // Extract keyframes from baked frames
        for (const frame of frames) {
            for (let i = 0; i < frame.particles.length; i++) {
                const particle = frame.particles[i];

                particleTimelines[i].translate.push({
                    time: frame.time,
                    x: particle.x,
                    y: particle.y,
                });

                particleTimelines[i].scale.push({
                    time: frame.time,
                    scaleX: particle.scaleX,
                    scaleY: particle.scaleY,
                });

                particleTimelines[i].rotate.push({
                    time: frame.time,
                    rotation: particle.rotation * (180 / Math.PI), // Convert to degrees
                });
            }
        }

        // Add timelines to animation
        for (let i = 0; i < maxParticles; i++) {
            const boneName = `particle_${i}`;
            animation.bones[boneName] = {
                translate: particleTimelines[i].translate,
                scale: particleTimelines[i].scale,
                rotate: particleTimelines[i].rotate,
            };
        }

        const spineData: SpineData = {
            skeleton: {
                hash: 'particle_export_' + Date.now(),
                spine: '4.1.00',
                width: 1024,
                height: 1024,
                fps: fps,
            },
            bones: bones,
            slots: slots,
            skins: {
                default: skinData,
            },
            animations: {
                [animationName]: animation,
            },
        };

        return spineData;
    }
}
