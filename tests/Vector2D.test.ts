import { Vector2D } from '../src/utils/Vector2D';

describe('Vector2D', () => {
  test('constructor initializes with correct values', () => {
    const v = new Vector2D(10, 20);
    expect(v.x).toBe(10);
    expect(v.y).toBe(20);
  });

  test('add adds vectors correctly', () => {
    const v1 = new Vector2D(10, 20);
    const v2 = new Vector2D(5, 15);
    v1.add(v2);
    expect(v1.x).toBe(15);
    expect(v1.y).toBe(35);
  });

  test('subtract subtracts vectors correctly', () => {
    const v1 = new Vector2D(10, 20);
    const v2 = new Vector2D(5, 15);
    v1.subtract(v2);
    expect(v1.x).toBe(5);
    expect(v1.y).toBe(5);
  });

  test('multiply scales vector correctly', () => {
    const v = new Vector2D(10, 20);
    v.multiply(2);
    expect(v.x).toBe(20);
    expect(v.y).toBe(40);
  });

  test('length calculates magnitude correctly', () => {
    const v = new Vector2D(3, 4);
    expect(v.length()).toBe(5);
  });

  test('normalize creates unit vector', () => {
    const v = new Vector2D(3, 4);
    v.normalize();
    expect(v.length()).toBeCloseTo(1);
  });

  test('distance calculates distance between vectors', () => {
    const v1 = new Vector2D(0, 0);
    const v2 = new Vector2D(3, 4);
    expect(v1.distance(v2)).toBe(5);
  });

  test('dot calculates dot product correctly', () => {
    const v1 = new Vector2D(2, 3);
    const v2 = new Vector2D(4, 5);
    expect(v1.dot(v2)).toBe(23); // 2*4 + 3*5
  });

  test('rotate rotates vector correctly', () => {
    const v = new Vector2D(1, 0);
    v.rotate(Math.PI / 2); // 90 degrees
    expect(v.x).toBeCloseTo(0);
    expect(v.y).toBeCloseTo(1);
  });

  test('clone creates independent copy', () => {
    const v1 = new Vector2D(10, 20);
    const v2 = v1.clone();
    v2.x = 30;
    expect(v1.x).toBe(10);
    expect(v2.x).toBe(30);
  });
});
