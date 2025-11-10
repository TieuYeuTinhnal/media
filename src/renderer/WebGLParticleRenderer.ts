import { Particle } from '../core/Particle';
import { ParticleEmitter } from '../core/ParticleEmitter';
import { BlendMode } from '../config/ParticleConfig';

/**
 * WebGL renderer for high-performance particle rendering
 */
export class WebGLParticleRenderer {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram | null = null;
  private vertexBuffer: WebGLBuffer | null = null;
  private texture: WebGLTexture | null = null;

  // Shader attribute/uniform locations
  private positionLocation: number = -1;
  private texCoordLocation: number = -1;
  private colorLocation: number = -1;
  private matrixLocation: WebGLUniformLocation | null = null;
  private textureLocation: WebGLUniformLocation | null = null;

  /**
   * Creates a WebGL particle renderer
   * @param canvas - The canvas element
   * @param _maxParticles - Maximum number of particles to support (reserved for future use)
   */
  constructor(canvas: HTMLCanvasElement, _maxParticles: number = 10000) {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      throw new Error('WebGL not supported');
    }
    this.gl = gl as WebGLRenderingContext;

    this.initializeShaders();
    this.initializeBuffers();
  }

  /**
   * Initializes WebGL shaders
   */
  private initializeShaders(): void {
    const gl = this.gl;

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      attribute vec4 a_color;
      
      uniform mat3 u_matrix;
      
      varying vec2 v_texCoord;
      varying vec4 v_color;
      
      void main() {
        vec2 position = (u_matrix * vec3(a_position, 1.0)).xy;
        gl_Position = vec4(position, 0.0, 1.0);
        v_texCoord = a_texCoord;
        v_color = a_color;
      }
    `;

    // Fragment shader
    const fragmentShaderSource = `
      precision mediump float;
      
      uniform sampler2D u_texture;
      
      varying vec2 v_texCoord;
      varying vec4 v_color;
      
      void main() {
        vec4 texColor = texture2D(u_texture, v_texCoord);
        gl_FragColor = texColor * v_color;
      }
    `;

    // Compile shaders
    const vertexShader = this.compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = this.compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      throw new Error('Failed to compile shaders');
    }

    // Create and link program
    const program = gl.createProgram();
    if (!program) {
      throw new Error('Failed to create WebGL program');
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      throw new Error('Failed to link program: ' + info);
    }

    this.program = program;

    // Get attribute and uniform locations
    this.positionLocation = gl.getAttribLocation(program, 'a_position');
    this.texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    this.colorLocation = gl.getAttribLocation(program, 'a_color');
    this.matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    this.textureLocation = gl.getUniformLocation(program, 'u_texture');
  }

  /**
   * Compiles a shader
   * @param source - Shader source code
   * @param type - Shader type
   * @returns Compiled shader or null
   */
  private compileShader(source: string, type: number): WebGLShader | null {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      console.error('Shader compile error:', info);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  /**
   * Initializes WebGL buffers
   */
  private initializeBuffers(): void {
    const gl = this.gl;

    // Create vertex buffer
    this.vertexBuffer = gl.createBuffer();

    // Create a default white texture
    this.createDefaultTexture();
  }

  /**
   * Creates a default white texture
   */
  private createDefaultTexture(): void {
    const gl = this.gl;
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    // Create a 1x1 white pixel
    const pixel = new Uint8Array([255, 255, 255, 255]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  }

  /**
   * Sets a texture from an image
   * @param image - The image to use as texture
   */
  setTexture(image: HTMLImageElement | HTMLCanvasElement): void {
    const gl = this.gl;
    
    if (!this.texture) {
      this.texture = gl.createTexture();
    }

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  }

  /**
   * Renders particles from an emitter
   * @param emitter - The emitter to render
   */
  render(emitter: ParticleEmitter): void {
    const gl = this.gl;
    const particles = emitter.getParticles();
    const config = emitter.getConfig();

    if (particles.length === 0 || !this.program) return;

    // Use shader program
    gl.useProgram(this.program);

    // Set up projection matrix
    const matrix = this.createProjectionMatrix();
    gl.uniformMatrix3fv(this.matrixLocation, false, matrix);

    // Bind texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(this.textureLocation, 0);

    // Set blend mode
    this.setBlendMode(config.blendMode);

    // Build vertex data for all particles
    const vertexData = this.buildVertexData(particles);

    // Upload to GPU
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.DYNAMIC_DRAW);

    // Set up attributes
    const stride = 8 * Float32Array.BYTES_PER_ELEMENT; // 2 pos + 2 tex + 4 color
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, stride, 0);
    
    gl.enableVertexAttribArray(this.texCoordLocation);
    gl.vertexAttribPointer(this.texCoordLocation, 2, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT);
    
    gl.enableVertexAttribArray(this.colorLocation);
    gl.vertexAttribPointer(this.colorLocation, 4, gl.FLOAT, false, stride, 4 * Float32Array.BYTES_PER_ELEMENT);

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, particles.length * 6);
  }

  /**
   * Builds vertex data for particles
   * @param particles - Array of particles
   * @returns Float32Array with vertex data
   */
  private buildVertexData(particles: Particle[]): Float32Array {
    const vertexData = new Float32Array(particles.length * 6 * 8); // 6 vertices per particle, 8 floats per vertex
    let offset = 0;

    for (const particle of particles) {
      if (!particle.active) continue;

      const x = particle.position.x;
      const y = particle.position.y;
      const size = particle.scale * 10; // Base size
      const cos = Math.cos(particle.rotation);
      const sin = Math.sin(particle.rotation);

      const r = particle.color.r / 255;
      const g = particle.color.g / 255;
      const b = particle.color.b / 255;
      const a = particle.alpha;

      // Calculate rotated corners
      const corners = [
        [-size, -size], [size, -size], [size, size],
        [-size, -size], [size, size], [-size, size]
      ];

      const texCoords = [
        [0, 0], [1, 0], [1, 1],
        [0, 0], [1, 1], [0, 1]
      ];

      for (let i = 0; i < 6; i++) {
        const [cx, cy] = corners[i];
        const rx = cx * cos - cy * sin;
        const ry = cx * sin + cy * cos;

        vertexData[offset++] = x + rx;
        vertexData[offset++] = y + ry;
        vertexData[offset++] = texCoords[i][0];
        vertexData[offset++] = texCoords[i][1];
        vertexData[offset++] = r;
        vertexData[offset++] = g;
        vertexData[offset++] = b;
        vertexData[offset++] = a;
      }
    }

    return vertexData;
  }

  /**
   * Creates a projection matrix for canvas coordinates
   * @returns Projection matrix
   */
  private createProjectionMatrix(): Float32Array {
    const gl = this.gl;
    const width = gl.canvas.width;
    const height = gl.canvas.height;

    // Convert from pixel coordinates to clip space (-1 to 1)
    return new Float32Array([
      2 / width, 0, 0,
      0, -2 / height, 0,
      -1, 1, 1
    ]);
  }

  /**
   * Sets the WebGL blend mode
   * @param blendMode - The blend mode to use
   */
  private setBlendMode(blendMode: BlendMode): void {
    const gl = this.gl;
    gl.enable(gl.BLEND);

    switch (blendMode) {
      case BlendMode.NORMAL:
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        break;
      case BlendMode.ADD:
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        break;
      case BlendMode.MULTIPLY:
        gl.blendFunc(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA);
        break;
      case BlendMode.SCREEN:
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
        break;
    }
  }

  /**
   * Clears the canvas
   */
  clear(): void {
    const gl = this.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  /**
   * Disposes of WebGL resources
   */
  dispose(): void {
    const gl = this.gl;
    
    if (this.program) {
      gl.deleteProgram(this.program);
    }
    if (this.vertexBuffer) {
      gl.deleteBuffer(this.vertexBuffer);
    }
    if (this.texture) {
      gl.deleteTexture(this.texture);
    }
  }
}
