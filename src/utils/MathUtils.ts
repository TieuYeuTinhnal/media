export class MathUtils {
    static clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    static lerp(start: number, end: number, t: number): number {
        return start + (end - start) * t;
    }

    static map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    static randomRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    static randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static degToRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    static radToDeg(radians: number): number {
        return radians * (180 / Math.PI);
    }

    static ease(t: number, type: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' = 'linear'): number {
        switch (type) {
            case 'easeIn':
                return t * t;
            case 'easeOut':
                return t * (2 - t);
            case 'easeInOut':
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            default:
                return t;
        }
    }
}
