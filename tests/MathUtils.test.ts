import { MathUtils } from '../src/utils/MathUtils';

describe('MathUtils', () => {
  test('clamp constrains value within range', () => {
    expect(MathUtils.clamp(5, 0, 10)).toBe(5);
    expect(MathUtils.clamp(-5, 0, 10)).toBe(0);
    expect(MathUtils.clamp(15, 0, 10)).toBe(10);
  });

  test('lerp interpolates between values', () => {
    expect(MathUtils.lerp(0, 10, 0)).toBe(0);
    expect(MathUtils.lerp(0, 10, 1)).toBe(10);
    expect(MathUtils.lerp(0, 10, 0.5)).toBe(5);
  });

  test('smoothstep provides smooth interpolation', () => {
    expect(MathUtils.smoothstep(0)).toBe(0);
    expect(MathUtils.smoothstep(1)).toBe(1);
    expect(MathUtils.smoothstep(0.5)).toBeGreaterThan(0);
    expect(MathUtils.smoothstep(0.5)).toBeLessThan(1);
  });

  test('randomRange returns value within range', () => {
    for (let i = 0; i < 100; i++) {
      const value = MathUtils.randomRange(5, 10);
      expect(value).toBeGreaterThanOrEqual(5);
      expect(value).toBeLessThanOrEqual(10);
    }
  });

  test('degToRad converts correctly', () => {
    expect(MathUtils.degToRad(0)).toBe(0);
    expect(MathUtils.degToRad(180)).toBeCloseTo(Math.PI);
    expect(MathUtils.degToRad(90)).toBeCloseTo(Math.PI / 2);
  });

  test('radToDeg converts correctly', () => {
    expect(MathUtils.radToDeg(0)).toBe(0);
    expect(MathUtils.radToDeg(Math.PI)).toBeCloseTo(180);
    expect(MathUtils.radToDeg(Math.PI / 2)).toBeCloseTo(90);
  });

  test('easeInQuad provides quadratic ease in', () => {
    expect(MathUtils.easeInQuad(0)).toBe(0);
    expect(MathUtils.easeInQuad(1)).toBe(1);
    expect(MathUtils.easeInQuad(0.5)).toBe(0.25);
  });

  test('randomInCircle returns point within radius', () => {
    const radius = 10;
    for (let i = 0; i < 100; i++) {
      const point = MathUtils.randomInCircle(radius);
      const distance = Math.sqrt(point.x * point.x + point.y * point.y);
      expect(distance).toBeLessThanOrEqual(radius);
    }
  });

  test('map remaps value between ranges', () => {
    expect(MathUtils.map(5, 0, 10, 0, 100)).toBe(50);
    expect(MathUtils.map(0, 0, 10, 0, 100)).toBe(0);
    expect(MathUtils.map(10, 0, 10, 0, 100)).toBe(100);
  });

  test('inRange checks if value is within range', () => {
    expect(MathUtils.inRange(5, 0, 10)).toBe(true);
    expect(MathUtils.inRange(-1, 0, 10)).toBe(false);
    expect(MathUtils.inRange(11, 0, 10)).toBe(false);
  });
});
