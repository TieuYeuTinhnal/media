import { ParticlePool } from '../src/core/ParticlePool';

describe('ParticlePool', () => {
  test('creates pool with correct size', () => {
    const pool = new ParticlePool(100);
    expect(pool.getMaxSize()).toBe(100);
  });

  test('acquire returns particle', () => {
    const pool = new ParticlePool(10);
    const particle = pool.acquire();
    expect(particle).not.toBeNull();
    expect(particle?.active).toBe(false);
  });

  test('acquire activates and tracks particles', () => {
    const pool = new ParticlePool(10);
    const particle = pool.acquire();
    
    if (particle) {
      particle.active = true;
      expect(pool.getActiveCount()).toBe(1);
    }
  });

  test('release deactivates particle', () => {
    const pool = new ParticlePool(10);
    const particle = pool.acquire();
    
    if (particle) {
      particle.active = true;
      pool.release(particle);
      expect(particle.active).toBe(false);
    }
  });

  test('reuses released particles', () => {
    const pool = new ParticlePool(2);
    const p1 = pool.acquire();
    const p2 = pool.acquire();
    
    if (p1 && p2) {
      p1.active = true;
      p2.active = true;
      
      pool.release(p1);
      const p3 = pool.acquire();
      
      expect(p3).toBe(p1); // Should reuse p1
    }
  });

  test('returns null when pool is full', () => {
    const pool = new ParticlePool(2);
    const p1 = pool.acquire();
    const p2 = pool.acquire();
    
    if (p1 && p2) {
      p1.active = true;
      p2.active = true;
      
      const p3 = pool.acquire();
      expect(p3).toBeNull();
    }
  });

  test('releaseAll deactivates all particles', () => {
    const pool = new ParticlePool(10);
    
    for (let i = 0; i < 5; i++) {
      const p = pool.acquire();
      if (p) p.active = true;
    }
    
    expect(pool.getActiveCount()).toBe(5);
    pool.releaseAll();
    expect(pool.getActiveCount()).toBe(0);
  });

  test('getActive returns only active particles', () => {
    const pool = new ParticlePool(10);
    
    const p1 = pool.acquire();
    const p2 = pool.acquire();
    
    if (p1 && p2) {
      p1.active = true;
      p2.active = false;
      
      const active = pool.getActive();
      expect(active.length).toBe(1);
      expect(active[0]).toBe(p1);
    }
  });

  test('setMaxSize reduces pool size', () => {
    const pool = new ParticlePool(100);
    pool.setMaxSize(50);
    expect(pool.getMaxSize()).toBe(50);
  });
});
