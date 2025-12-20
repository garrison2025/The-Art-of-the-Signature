import { FontOption, TypeSignatureConfig } from '../types';

/**
 * Trims whitespace/transparent pixels from a canvas
 */
export const trimCanvas = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const width = canvas.width;
    const height = canvas.height;
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    let minX = width, minY = height, maxX = 0, maxY = 0;
    let found = false;

    // Scan for non-transparent pixels
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const alpha = data[(y * width + x) * 4 + 3];
            if (alpha > 0) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
                found = true;
            }
        }
    }

    // If empty, return original
    if (!found) return canvas;

    // Add a little padding
    const padding = 20;
    const trimWidth = Math.max(1, (maxX - minX) + padding * 2);
    const trimHeight = Math.max(1, (maxY - minY) + padding * 2);

    const trimmedCanvas = document.createElement('canvas');
    trimmedCanvas.width = trimWidth;
    trimmedCanvas.height = trimHeight;
    const trimCtx = trimmedCanvas.getContext('2d');
    
    if (trimCtx) {
        trimCtx.drawImage(
            canvas, 
            minX - padding, minY - padding, 
            trimWidth, trimHeight, 
            0, 0, 
            trimWidth, trimHeight
        );
    }

    return trimmedCanvas;
};

/**
 * Adds background color to a canvas (handles composition)
 */
export const addBackgroundToCanvas = (sourceCanvas: HTMLCanvasElement, color: string): HTMLCanvasElement => {
    if (color === 'transparent') return sourceCanvas;

    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = sourceCanvas.width;
    bgCanvas.height = sourceCanvas.height;
    const ctx = bgCanvas.getContext('2d');
    
    if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        ctx.drawImage(sourceCanvas, 0, 0);
    }
    
    return bgCanvas;
};

/**
 * Generates a PNG data URL from text using a specific font and configs.
 */
export const generateSignatureImage = (
  font: FontOption,
  config: TypeSignatureConfig
): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  // High resolution for crisp download
  const scale = 2;
  const width = 800; // Wider canvas for spacing
  const height = 400;
  
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);

  // Clear background
  ctx.clearRect(0, 0, width, height);

  // Configure Text Styles
  const baseSize = 80;
  const fontSize = baseSize * font.fontSizeAdjust; 
  
  // Font String Construction
  // Note: font-weight works, letter-spacing needs explicit handling or modern API
  ctx.font = `${config.weight} ${fontSize}px ${font.fontFamily.replace(/"/g, '')}`;
  ctx.fillStyle = config.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Apply Slant using transform
  // skewX in radians. 1 degree = PI / 180
  const skewRadians = (config.slant * Math.PI) / 180;
  ctx.setTransform(scale, 0, skewRadians * scale, scale, 0, 0); // Apply skew + scale

  // Modern browsers support ctx.letterSpacing. 
  // Fallback: If not supported, we accept standard spacing (complex to polyfill perfectly for joined scripts)
  if ('letterSpacing' in ctx) {
      (ctx as any).letterSpacing = `${config.spacing}px`;
  }

  // Draw
  // We need to compensate center position for skew
  // Calculate center relative to skew
  const x = (width / 2) - (Math.tan(skewRadians) * (height/2)); 
  const yOffset = font.offsetY || 0;
  
  ctx.fillText(config.text, x, (height / 2) + yOffset);

  // Reset Transform for trimming logic (which expects standard coords)
  ctx.setTransform(1, 0, 0, 1, 0, 0); 
  
  // 1. Process Trimming
  let finalCanvas = config.trim ? trimCanvas(canvas) : canvas;

  // 2. Process Background
  finalCanvas = addBackgroundToCanvas(finalCanvas, config.backgroundColor);

  return finalCanvas.toDataURL('image/png');
};

export const downloadDataUrl = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};