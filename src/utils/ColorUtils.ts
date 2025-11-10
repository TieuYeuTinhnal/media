/**
 * Color utility functions for particle system
 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * Color utilities for particle effects
 */
export class ColorUtils {
  /**
   * Interpolates between two colors
   * @param color1 - Start color (RGBA)
   * @param color2 - End color (RGBA)
   * @param t - Interpolation factor (0-1)
   * @returns Interpolated color
   */
  static lerp(color1: RGBA, color2: RGBA, t: number): RGBA {
    return {
      r: color1.r + (color2.r - color1.r) * t,
      g: color1.g + (color2.g - color1.g) * t,
      b: color1.b + (color2.b - color1.b) * t,
      a: color1.a + (color2.a - color1.a) * t
    };
  }

  /**
   * Converts a hex color string to RGB
   * @param hex - Hex color string (e.g., "#FF0000" or "FF0000")
   * @returns RGB object
   */
  static hexToRgb(hex: string): RGB {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return { r, g, b };
  }

  /**
   * Converts RGB to hex color string
   * @param rgb - RGB object
   * @returns Hex color string
   */
  static rgbToHex(rgb: RGB): string {
    const toHex = (n: number) => {
      const hex = Math.round(n).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
  }

  /**
   * Converts RGB to HSL
   * @param rgb - RGB object (values 0-255)
   * @returns HSL object (h: 0-360, s: 0-100, l: 0-100)
   */
  static rgbToHsl(rgb: RGB): HSL {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: h * 360,
      s: s * 100,
      l: l * 100
    };
  }

  /**
   * Converts HSL to RGB
   * @param hsl - HSL object (h: 0-360, s: 0-100, l: 0-100)
   * @returns RGB object (values 0-255)
   */
  static hslToRgb(hsl: HSL): RGB {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

  /**
   * Creates an RGBA string for CSS/Canvas
   * @param rgba - RGBA object (values 0-255 for rgb, 0-1 for alpha)
   * @returns RGBA string
   */
  static toRgbaString(rgba: RGBA): string {
    return `rgba(${Math.round(rgba.r)}, ${Math.round(rgba.g)}, ${Math.round(rgba.b)}, ${rgba.a})`;
  }

  /**
   * Creates an RGB string for CSS/Canvas
   * @param rgb - RGB object (values 0-255)
   * @returns RGB string
   */
  static toRgbString(rgb: RGB): string {
    return `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`;
  }

  /**
   * Parses an RGBA string to RGBA object
   * @param rgbaString - RGBA string (e.g., "rgba(255, 0, 0, 0.5)")
   * @returns RGBA object or null if invalid
   */
  static parseRgbaString(rgbaString: string): RGBA | null {
    const match = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return null;

    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
      a: match[4] ? parseFloat(match[4]) : 1
    };
  }

  /**
   * Creates a random color
   * @param alpha - Alpha value (0-1)
   * @returns Random RGBA color
   */
  static random(alpha: number = 1): RGBA {
    return {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
      a: alpha
    };
  }
}
