import { FontOption, TypeSignatureConfig, Stroke } from '../types';

/**
 * Generates an SVG string for Type Mode
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
        if (stroke.isEraser) return; 

        const d = stroke.points.reduce((acc, point, i, a) => {
            if (i === 0) return `M ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
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

        paths += `<path d="${d}" stroke="${stroke.color}" stroke-width="${stroke.baseWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round" />`;
    });

    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${paths}
</svg>`.trim();
};

/**
 * Generates an ANIMATED SVG string for Draw Mode
 * Uses CSS animation on stroke-dasharray
 */
export const generateAnimatedSVG = (strokes: Stroke[], width: number, height: number): string => {
    let paths = '';
    let totalDelay = 0;
    const animationSpeed = 2; // Higher is slower

    strokes.forEach((stroke, index) => {
        if (stroke.points.length < 2) return;
        if (stroke.isEraser) return; 

        // Calculate approximate path length to set stroke-dasharray
        let pathLength = 0;
        for(let i=0; i < stroke.points.length - 1; i++) {
            const p1 = stroke.points[i];
            const p2 = stroke.points[i+1];
            pathLength += Math.hypot(p2.x - p1.x, p2.y - p1.y);
        }
        
        // Add buffer to length to ensure it hides fully
        pathLength = Math.ceil(pathLength + 10);
        
        // Calculate duration based on length (uniform speed)
        const duration = Math.max(0.3, pathLength / 200 * animationSpeed); 

        const d = stroke.points.reduce((acc, point, i, a) => {
            if (i === 0) return `M ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
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

        paths += `
        <path 
            d="${d}" 
            stroke="${stroke.color}" 
            stroke-width="${stroke.baseWidth}" 
            fill="none" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            class="path-anim"
            style="--length: ${pathLength}; --delay: ${totalDelay}s; --duration: ${duration}s;"
        />`;

        totalDelay += duration;
    });

    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <style>
    .path-anim {
      stroke-dasharray: var(--length);
      stroke-dashoffset: var(--length);
      animation: dash var(--duration) linear forwards;
      animation-delay: var(--delay);
    }
    @keyframes dash {
      to {
        stroke-dashoffset: 0;
      }
    }
  </style>
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
