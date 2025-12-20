import { FontOption } from '../types';

/**
 * Generates a PNG data URL from text using a specific font.
 * This ensures what is downloaded matches the visual, but as a transparent PNG.
 */
export const generateSignatureImage = (
  text: string,
  font: FontOption,
  color: string
): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  // High resolution for crisp download
  const scale = 2;
  const width = 600;
  const height = 300;
  
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);

  // Clear background (transparent)
  ctx.clearRect(0, 0, width, height);

  // Configure text
  const fontSize = 80 * font.fontSizeAdjust; // Base size adjusted
  ctx.font = `${fontSize}px ${font.fontFamily.replace(/"/g, '')}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw
  // Add a slight vertical offset if needed based on font metrics
  const yOffset = font.offsetY || 0;
  ctx.fillText(text, width / 2, height / 2 + yOffset);

  return canvas.toDataURL('image/png');
};

export const downloadDataUrl = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};