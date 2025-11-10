/**
 * Performance profiler for particle systems
 */
export class ParticleProfiler {
  private updateTimes: number[] = [];
  private renderTimes: number[] = [];
  private frameCount: number = 0;
  private lastFpsTime: number = 0;
  private fps: number = 0;
  private peakParticleCount: number = 0;
  private currentParticleCount: number = 0;
  private maxSamples: number = 60;

  /**
   * Creates a particle profiler
   * @param maxSamples - Maximum number of samples to keep for averaging
   */
  constructor(maxSamples: number = 60) {
    this.maxSamples = maxSamples;
    this.lastFpsTime = performance.now();
  }

  /**
   * Begins timing an update
   * @returns Start timestamp
   */
  beginUpdate(): number {
    return performance.now();
  }

  /**
   * Ends timing an update
   * @param startTime - Start timestamp from beginUpdate
   */
  endUpdate(startTime: number): void {
    const elapsed = performance.now() - startTime;
    this.updateTimes.push(elapsed);
    
    if (this.updateTimes.length > this.maxSamples) {
      this.updateTimes.shift();
    }
  }

  /**
   * Begins timing a render
   * @returns Start timestamp
   */
  beginRender(): number {
    return performance.now();
  }

  /**
   * Ends timing a render
   * @param startTime - Start timestamp from beginRender
   */
  endRender(startTime: number): void {
    const elapsed = performance.now() - startTime;
    this.renderTimes.push(elapsed);
    
    if (this.renderTimes.length > this.maxSamples) {
      this.renderTimes.shift();
    }
  }

  /**
   * Updates FPS calculation
   */
  updateFps(): void {
    this.frameCount++;
    const now = performance.now();
    const elapsed = now - this.lastFpsTime;

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.frameCount = 0;
      this.lastFpsTime = now;
    }
  }

  /**
   * Sets the current particle count
   * @param count - Current active particle count
   */
  setParticleCount(count: number): void {
    this.currentParticleCount = count;
    if (count > this.peakParticleCount) {
      this.peakParticleCount = count;
    }
  }

  /**
   * Gets the average update time
   * @returns Average update time in milliseconds
   */
  getAverageUpdateTime(): number {
    if (this.updateTimes.length === 0) return 0;
    const sum = this.updateTimes.reduce((a, b) => a + b, 0);
    return sum / this.updateTimes.length;
  }

  /**
   * Gets the average render time
   * @returns Average render time in milliseconds
   */
  getAverageRenderTime(): number {
    if (this.renderTimes.length === 0) return 0;
    const sum = this.renderTimes.reduce((a, b) => a + b, 0);
    return sum / this.renderTimes.length;
  }

  /**
   * Gets the current FPS
   * @returns Current FPS
   */
  getFps(): number {
    return this.fps;
  }

  /**
   * Gets the peak particle count
   * @returns Peak particle count
   */
  getPeakParticleCount(): number {
    return this.peakParticleCount;
  }

  /**
   * Gets the current particle count
   * @returns Current particle count
   */
  getCurrentParticleCount(): number {
    return this.currentParticleCount;
  }

  /**
   * Gets the total frame time (update + render)
   * @returns Total frame time in milliseconds
   */
  getAverageTotalTime(): number {
    return this.getAverageUpdateTime() + this.getAverageRenderTime();
  }

  /**
   * Resets all statistics
   */
  reset(): void {
    this.updateTimes = [];
    this.renderTimes = [];
    this.frameCount = 0;
    this.fps = 0;
    this.peakParticleCount = 0;
    this.currentParticleCount = 0;
    this.lastFpsTime = performance.now();
  }

  /**
   * Resets peak particle count
   */
  resetPeakParticleCount(): void {
    this.peakParticleCount = this.currentParticleCount;
  }

  /**
   * Prints statistics to console
   */
  printStats(): void {
    console.log('=== Particle System Performance ===');
    console.log(`FPS: ${this.fps}`);
    console.log(`Average Update Time: ${this.getAverageUpdateTime().toFixed(2)}ms`);
    console.log(`Average Render Time: ${this.getAverageRenderTime().toFixed(2)}ms`);
    console.log(`Average Total Time: ${this.getAverageTotalTime().toFixed(2)}ms`);
    console.log(`Current Particles: ${this.currentParticleCount}`);
    console.log(`Peak Particles: ${this.peakParticleCount}`);
    console.log('===================================');
  }

  /**
   * Gets all statistics as an object
   * @returns Statistics object
   */
  getStats(): {
    fps: number;
    averageUpdateTime: number;
    averageRenderTime: number;
    averageTotalTime: number;
    currentParticles: number;
    peakParticles: number;
  } {
    return {
      fps: this.fps,
      averageUpdateTime: this.getAverageUpdateTime(),
      averageRenderTime: this.getAverageRenderTime(),
      averageTotalTime: this.getAverageTotalTime(),
      currentParticles: this.currentParticleCount,
      peakParticles: this.peakParticleCount
    };
  }
}
