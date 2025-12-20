import { FontOption, TypeSignatureConfig, Stroke } from '../types';

/**
 * Generates an SVG string for Type Mode
 * Note: This embeds the font family. For the SVG to work perfectly offline, 
 * the user needs the font installed, or we rely on the @import rule working if they have internet.
 */
export const generateTypeSVG = (font: FontOption, config: TypeSignatureConfig): string => {
    const width = 800;
    const height = 400;
    const fontSize = 80 * font.fontSizeAdjust;
    
    // Slant transform
    const skewDeg = -config.slant; // SVG skewX is opposite direction visually usually
    const transform = `skewX(${skewDeg})`;

    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=${font.name.replace(/\s+/g, '+')}&display=swap');
    </style>
  </defs>
  <text 
    x="50%" 
    y="50%" 
    dominant-baseline="middle" 
    text-anchor="middle" 
    fill="${config.color}" 
    font-family="${font.fontFamily.replace(/"/g, "'")}" 
    font-size="${fontSize}px" 
    font-weight="${config.weight}"
    letter-spacing="${config.spacing}px"
    transform="${transform}"
    transform-origin="center"
  >
    ${config.text}
  </text>
</svg>`.trim();

    return svgContent;
};

/**
 * Generates an SVG string for Draw Mode (converting strokes to paths)
 */
export const generateDrawSVG = (strokes: Stroke[], width: number, height: number): string => {
    let paths = '';

    strokes.forEach(stroke => {
        if (stroke.points.length < 2) return;
        if (stroke.isEraser) return; // Eraser not supported in simple SVG export yet

        const d = stroke.points.reduce((acc, point, i, a) => {
            if (i === 0) return `M ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
            
            // Simple line connection for now, or we can do quadratic if we stored control points
            // Re-implementing the quadratic logic from canvas:
            // Since we don't store the exact calculated curves, we approximate with lineTo for SVG 
            // OR we calculate the midpoints again. Let's do quadratic for smoothness.
            
            if (i < a.length - 1) {
                const p1 = point;
                const p2 = a[i+1];
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;
                return `${acc} Q ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} ${midX.toFixed(2)} ${midY.toFixed(2)}`;
            } else {
                 return `${acc} L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
            }
        }, '');

        // Average width of the stroke for SVG (SVG 1.1 doesn't support variable width paths easily)
        // We use the baseWidth. 
        paths += `<path d="${d}" stroke="${stroke.color}" stroke-width="${stroke.baseWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round" />`;
    });

    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${paths}
</svg>`.trim();
};

export const downloadSVG = (svgString: string, filename: string) => {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
