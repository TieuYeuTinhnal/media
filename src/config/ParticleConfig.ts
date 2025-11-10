export interface ParticleConfig {
    // Timing
    delay: number;
    duration: number;
    timeScale: number;

    // Emission
    emissionRadius: number;
    particleCount: number;
    emissionRate: number;
    variety: number;

    // Life
    lifeMin: number;
    lifeMax: number;

    // Speed and direction
    speedMin: number;
    speedMax: number;
    angle: number;
    spread: number;

    // Scale
    scaleMin: number;
    scaleMax: number;
    scaleStart: number;
    scaleEnd: number;

    // Rotation
    rotationMin: number;
    rotationMax: number;
    rotationSpeed: number;

    // Mass
    massMin: number;
    massMax: number;

    // Appearance
    color: string;
    shape: 'circle' | 'square' | 'triangle' | 'star';
    texture: string | null;

    // Forces
    gravityX: number;
    gravityY: number;
    windX: number;
    windY: number;
    drag: number;

    // Alpha over time
    alphaStart: number;
    alphaEnd: number;

    // Color over time
    colorStart: string;
    colorEnd: string;

    // Physics
    physicsRadius: number;
    bounce: number;
    friction: number;
    killOnCollision: boolean;
    collisionLayer: number;
    enableBounds: boolean;
    killOffscreen: boolean;
}

export function createDefaultConfig(): ParticleConfig {
    return {
        // Timing
        delay: 0,
        duration: 2000,
        timeScale: 1,

        // Emission
        emissionRadius: 10,
        particleCount: 100,
        emissionRate: 50,
        variety: 20,

        // Life
        lifeMin: 1,
        lifeMax: 2,

        // Speed
        speedMin: 50,
        speedMax: 150,
        angle: 270,
        spread: 30,

        // Scale
        scaleMin: 0.5,
        scaleMax: 1.5,
        scaleStart: 1,
        scaleEnd: 0,

        // Rotation
        rotationMin: 0,
        rotationMax: 360,
        rotationSpeed: 0,

        // Mass
        massMin: 1,
        massMax: 2,

        // Appearance
        color: '#ffffff',
        shape: 'circle',
        texture: null,

        // Forces
        gravityX: 0,
        gravityY: 100,
        windX: 0,
        windY: 0,
        drag: 0.01,

        // Alpha
        alphaStart: 1,
        alphaEnd: 0,

        // Color over time
        colorStart: '#ffffff',
        colorEnd: '#000000',

        // Physics
        physicsRadius: 5,
        bounce: 0.5,
        friction: 0.1,
        killOnCollision: false,
        collisionLayer: 0,
        enableBounds: true,
        killOffscreen: false,
    };
}
