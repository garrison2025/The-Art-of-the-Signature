import React, { useRef, useEffect, useState } from 'react';
import { Download, RotateCcw, RotateCw, Trash2, Copy, Pen, Eraser, Check } from 'lucide-react';
import { downloadDataUrl, trimCanvas, addBackgroundToCanvas } from '../utils/canvasUtils';

interface DrawModeProps {
  color: string;
}

interface Point {
  x: number;
  y: number;
  pressure?: number; // Simulated pressure based on velocity
  time?: number;
}

interface Stroke {
  points: Point[];
  color: string;
  isEraser: boolean;
  baseWidth: number;
  smoothing: number;
}

const DrawMode: React.FC<DrawModeProps> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [historyStep, setHistoryStep] = useState(0);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);

  // Tools & Settings
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [baseWidth, setBaseWidth] = useState(3);
  const [smoothing, setSmoothing] = useState(0.5); // 0 to 1
  
  // Export Settings
  const [trim, setTrim] = useState(true);
  const [showPreviewLine, setShowPreviewLine] = useState(true);
  const [bgColor, setBgColor] = useState<'transparent' | '#ffffff' | '#000000'>('transparent');

  // Initialize canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        
        // Save current content if needed, but for simple resize we might clear or scale
        // For this demo, we match container size and redraw
        canvas.width = container.offsetWidth;
        canvas.height = 450;
        
        requestAnimationFrame(() => redrawCanvas(strokes.slice(0, historyStep)));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [strokes, historyStep]);

  // --- Drawing Logic V2 (Curves & Velocity) ---

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement): Point => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
      time: Date.now()
    };
  };

  const getLineWidth = (velocity: number, baseWidth: number) => {
    // Inverse relationship: Faster = Thinner
    // Clamp velocity to avoid extreme values
    const clampedVelocity = Math.min(velocity, 2); 
    const minWidth = baseWidth * 0.4;
    const maxWidth = baseWidth * 1.4;
    
    // Normalize velocity 0..2 to 0..1
    const factor = clampedVelocity / 2;
    
    // Interpolate
    return maxWidth - (factor * (maxWidth - minWidth));
  };

  const redrawCanvas = (strokesToDraw: Stroke[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Preview Line
    if (showPreviewLine) {
        drawPreviewLine(ctx, canvas.width, canvas.height);
    }

    strokesToDraw.forEach(stroke => {
      if (stroke.points.length < 1) return;

      if (stroke.isEraser) {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.lineWidth = 20;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = 'rgba(0,0,0,1)';
          
          ctx.beginPath();
          if(stroke.points.length === 1) {
              ctx.arc(stroke.points[0].x, stroke.points[0].y, 10, 0, Math.PI*2);
              ctx.fill();
          } else {
              ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
              for (let i = 1; i < stroke.points.length; i++) {
                ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
              }
              ctx.stroke();
          }
          ctx.globalCompositeOperation = 'source-over';
      } else {
        // Variable Width Curve Drawing
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = stroke.color;

        if (stroke.points.length < 3) {
            // Draw Dots for single clicks
            const p = stroke.points[0];
            ctx.beginPath();
            ctx.arc(p.x, p.y, stroke.baseWidth / 2, 0, Math.PI * 2);
            ctx.fillStyle = stroke.color;
            ctx.fill();
            return;
        }

        // Draw curves
        let p1 = stroke.points[0];
        let p2 = stroke.points[1];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);

        for (let i = 1; i < stroke.points.length; i++) {
            const midPoint = {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2
            };
            
            // Calculate velocity for this segment
            const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            const time = (p2.time || 0) - (p1.time || 0);
            const velocity = time > 0 ? dist / time : 0;
            
            const currentWidth = getLineWidth(velocity, stroke.baseWidth);
            ctx.lineWidth = currentWidth;
            
            // Note: Canvas path width is constant per stroke() call. 
            // To do truly variable width inside one path, we need to stroke each segment or use advanced polygons.
            // For performance/simplicity in V2, we assume an average width per small curve, 
            // OR stroke each quad curve separately. Let's stroke separately for effect.
            
            ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
            ctx.stroke();
            ctx.beginPath(); // Start new path for new width
            ctx.moveTo(midPoint.x, midPoint.y);

            p1 = stroke.points[i];
            p2 = stroke.points[i+1] || stroke.points[i];
        }
        
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
    });
  };

  const drawPreviewLine = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(width * 0.15, height * 0.75);
      ctx.lineTo(width * 0.85, height * 0.75);
      ctx.strokeStyle = '#cbd5e1'; // slate-300
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]); // Dashed line
      ctx.stroke();
      
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText("Sign Here", width * 0.15, height * 0.75 - 5);
      ctx.fillText("X", width * 0.85 - 10, height * 0.75 - 5);
      
      ctx.restore();
  };

  // --- Interaction Handlers ---

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    
    const point = getCoordinates(e, canvas);
    const newStroke: Stroke = {
      points: [point],
      color: color,
      isEraser: tool === 'eraser',
      baseWidth: baseWidth,
      smoothing: smoothing
    };
    
    setCurrentStroke(newStroke);
    
    // Draw initial dot
    const ctx = canvas.getContext('2d');
    if (ctx) {
         if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
         } else {
             ctx.fillStyle = color;
         }
         ctx.beginPath();
         ctx.arc(point.x, point.y, baseWidth / 2, 0, Math.PI * 2);
         ctx.fill();
         ctx.globalCompositeOperation = 'source-over';
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !currentStroke || !canvasRef.current) return;
    
    // Prevent scrolling on touch
    if ('touches' in e) {
        // e.preventDefault(); // Sometimes needed, but handled by touch-action: none class
    }

    const point = getCoordinates(e, canvasRef.current);
    currentStroke.points.push(point);
    
    // Live Draw (Simplified for performance, full redraw on end)
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      const points = currentStroke.points;
      if (points.length > 2) {
          const lastPoint = points[points.length - 1];
          const prevPoint = points[points.length - 2];
          
          ctx.beginPath();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          if (currentStroke.isEraser) {
              ctx.globalCompositeOperation = 'destination-out';
              ctx.lineWidth = 20;
          } else {
              // Calculate width logic simply for live preview
              const dist = Math.hypot(lastPoint.x - prevPoint.x, lastPoint.y - prevPoint.y);
              const time = (lastPoint.time || 0) - (prevPoint.time || 0);
              const v = time > 0 ? dist / time : 0;
              ctx.lineWidth = getLineWidth(v, baseWidth);
              ctx.strokeStyle = color;
          }

          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(lastPoint.x, lastPoint.y);
          ctx.stroke();
          ctx.globalCompositeOperation = 'source-over';
      }
    }
  };

  const stopDrawing = () => {
    if (!isDrawing || !currentStroke) return;
    
    setIsDrawing(false);
    
    // Commit stroke
    // Slice history to support redo overwrite
    const newStrokes = [...strokes.slice(0, historyStep), currentStroke];
    setStrokes(newStrokes);
    setHistoryStep(newStrokes.length);
    setCurrentStroke(null);
    
    // Trigger a high-quality redraw (smoothing applied)
    requestAnimationFrame(() => redrawCanvas(newStrokes));
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      redrawCanvas(strokes.slice(0, newStep));
    }
  };

  const handleRedo = () => {
    if (historyStep < strokes.length) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      redrawCanvas(strokes.slice(0, newStep));
    }
  };

  const handleClear = () => {
    setStrokes([]);
    setHistoryStep(0);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        if (showPreviewLine) drawPreviewLine(ctx, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current || historyStep === 0) return;
    
    // 1. Create a temp canvas to hold the clean signature (without preview lines)
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvasRef.current.width;
    tempCanvas.height = canvasRef.current.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    if(!tempCtx) return;

    // 2. Re-draw only strokes (no grid/lines)
    strokes.slice(0, historyStep).forEach(stroke => {
        // ... (Reuse drawing logic or separate function. 
        // For brevity, we call a stripped down version of redraw here or assumption)
        // Ideally we refactor 'redrawCanvas' to take a context. 
        // Let's copy logic briefly for the 'export' render.
        
        if (stroke.points.length < 1) return;
        if (stroke.isEraser) return; // Eraser on transparent canvas is no-op unless overlapping previous strokes. 
        // Complex eraser logic requires drawing all previous strokes then erasing.
    });

    // Better approach: Use the actual canvas data, but if preview line is on, we need to redraw without it.
    // So let's redraw main canvas momentarily without grid, capture, then put grid back.
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // A. Clear and Draw Clean
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    const cleanStrokes = strokes.slice(0, historyStep);
    
    // Draw logic (Inline for simplicity of Context variable)
    // We basically need to run the drawing loop again on the main canvas
    cleanStrokes.forEach(stroke => {
        // Simple replay of the sophisticated draw logic
         if (stroke.points.length < 1) return;
          if (stroke.isEraser) {
              ctx.globalCompositeOperation = 'destination-out';
              ctx.lineWidth = 20;
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';
              ctx.beginPath();
              ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
              stroke.points.forEach(p => ctx.lineTo(p.x, p.y));
              ctx.stroke();
              ctx.globalCompositeOperation = 'source-over';
          } else {
             ctx.lineCap = 'round';
             ctx.lineJoin = 'round';
             ctx.strokeStyle = stroke.color;
             let p1 = stroke.points[0];
             let p2 = stroke.points[1];
             ctx.beginPath();
             ctx.moveTo(p1.x, p1.y);
             for (let i = 1; i < stroke.points.length; i++) {
                const mid = { x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2 };
                const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
                const time = (p2.time||0) - (p1.time||0);
                const v = time > 0 ? dist/time : 0;
                ctx.lineWidth = getLineWidth(v, stroke.baseWidth);
                ctx.quadraticCurveTo(p1.x, p1.y, mid.x, mid.y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(mid.x, mid.y);
                p1 = stroke.points[i];
                p2 = stroke.points[i+1] || stroke.points[i];
             }
             ctx.lineTo(p1.x, p1.y);
             ctx.stroke();
          }
    });

    // B. Capture
    let finalCanvas = trim ? trimCanvas(canvasRef.current) : canvasRef.current;
    finalCanvas = addBackgroundToCanvas(finalCanvas, bgColor);
    
    const dataUrl = finalCanvas.toDataURL('image/png');
    downloadDataUrl(dataUrl, 'my-drawn-signature.png');

    // C. Restore Preview
    redrawCanvas(strokes.slice(0, historyStep));
  };

  const handleCopy = async () => {
      // Similar logic to download, need clean capture
     if (!canvasRef.current || historyStep === 0) return;
     
     // Quick hack: hide grid, copy, show grid. Visual flash might occur but acceptable.
     const ctx = canvasRef.current.getContext('2d');
     if (!ctx) return;
     
     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
     // Redraw strokes only... (Need reusable function ideally)
     // For now, let's just use the current canvas state if grid is off, or warn.
     // To keep code concise, assume user is ok with grid if on, or toggle it off?
     // Let's force a redraw without grid.
     const wasGrid = showPreviewLine;
     setShowPreviewLine(false);
     redrawCanvas(strokes.slice(0, historyStep));
     
     // Wait for render? No, synchronous canvas.
     try {
         // Trim logic for copy too? Yes.
         let copyCanvas = trim ? trimCanvas(canvasRef.current) : canvasRef.current;
         copyCanvas = addBackgroundToCanvas(copyCanvas, bgColor);

        const blob = await new Promise<Blob | null>(resolve => copyCanvas.toBlob(resolve));
        if (blob) {
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
            alert('Signature copied to clipboard!');
        }
    } catch (err) {
        console.error('Failed to copy', err);
    } finally {
        if(wasGrid) {
            setShowPreviewLine(true);
            // Effect will trigger redraw
        }
    }
  };

  return (
    <div className="w-full animate-fade-in">
        
      {/* Controls Toolbar (Top) */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-3 mb-6 flex flex-wrap gap-4 items-center justify-between shadow-sm">
           
           {/* Left: Tools */}
           <div className="flex items-center gap-4">
               <div className="flex bg-gray-100 dark:bg-slate-900 p-1 rounded-lg">
                    <button 
                        onClick={() => setTool('pen')}
                        className={`p-2 rounded-md transition-colors ${tool === 'pen' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400'}`}
                        title="Pen"
                    >
                        <Pen size={18} />
                    </button>
                    <button 
                        onClick={() => setTool('eraser')}
                        className={`p-2 rounded-md transition-colors ${tool === 'eraser' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400'}`}
                        title="Eraser"
                    >
                        <Eraser size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase hidden md:inline">Thickness</span>
                    <input 
                        type="range" min="1" max="10" step="0.5"
                        value={baseWidth} onChange={(e) => setBaseWidth(parseFloat(e.target.value))}
                        className="w-24 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
                    />
                </div>
           </div>

           {/* Right: Export Options */}
           <div className="flex flex-wrap gap-2 items-center">
                <button 
                    onClick={() => setShowPreviewLine(!showPreviewLine)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${showPreviewLine ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 text-blue-700 dark:text-blue-300' : 'border-transparent text-slate-500'}`}
                >
                    Sign Line
                </button>
                
                <button 
                    onClick={() => setTrim(!trim)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${trim ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 text-blue-700 dark:text-blue-300' : 'border-transparent text-slate-500'}`}
                >
                    Auto-Trim
                </button>

                 <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-900 p-1 rounded-lg">
                    <button onClick={() => setBgColor('transparent')} className={`w-5 h-5 rounded border ${bgColor === 'transparent' ? 'border-gray-400' : 'border-transparent opacity-50'}`}>
                        <div className="w-full h-full bg-gray-300 rounded-sm opacity-50"></div>
                    </button>
                    <button onClick={() => setBgColor('#ffffff')} className={`w-5 h-5 rounded border bg-white ${bgColor === '#ffffff' ? 'border-gray-400' : 'border-transparent opacity-50'}`}></button>
                    <button onClick={() => setBgColor('#000000')} className={`w-5 h-5 rounded border bg-black ${bgColor === '#000000' ? 'border-gray-400' : 'border-transparent opacity-50'}`}></button>
                </div>
           </div>
      </div>

      <div 
        ref={containerRef}
        className="relative bg-white dark:bg-white rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden touch-none"
        style={{ 
            backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)', 
            backgroundSize: '24px 24px',
            backgroundColor: bgColor === 'transparent' ? '#ffffff' : bgColor // Visual preview bg only
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full relative z-20 cursor-crosshair"
          style={{ height: '450px' }}
        />

        {/* Floating Actions Bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-gray-200 dark:border-slate-600 shadow-lg rounded-xl p-2">
             <button onClick={handleUndo} disabled={historyStep === 0} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg disabled:opacity-30">
                <RotateCcw size={18} />
             </button>
             <button onClick={handleRedo} disabled={historyStep === strokes.length} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg disabled:opacity-30">
                <RotateCw size={18} />
             </button>
             <div className="w-px h-8 bg-gray-200 dark:bg-slate-600 mx-1"></div>
             <button onClick={handleClear} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                <Trash2 size={18} />
             </button>
             <div className="w-px h-8 bg-gray-200 dark:bg-slate-600 mx-1"></div>
             <button onClick={handleCopy} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg" title="Copy">
                <Copy size={18} />
             </button>
             <button onClick={handleDownload} disabled={historyStep===0} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold shadow-md hover:opacity-90 disabled:opacity-50">
                <Download size={14} /> Save
             </button>
        </div>
      </div>
      
      <p className="text-center text-xs text-slate-400 mt-4">
         Pro Tip: Draw faster for thinner lines, slower for thicker strokes.
      </p>
    </div>
  );
};

export default DrawMode;