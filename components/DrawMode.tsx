import React, { useRef, useEffect, useState } from 'react';
import { Download, RotateCcw, RotateCw, Trash2, Pen, Eraser, FileJson, Mail, Play, Fingerprint } from 'lucide-react';
import { downloadDataUrl, trimCanvas, addBackgroundToCanvas } from '../utils/canvasUtils';
import { generateDrawSVG, generateAnimatedSVG, downloadSVG } from '../utils/exportUtils';
import { Stroke, Point } from '../types';

interface DrawModeProps {
  color: string;
  onPreview: (dataUrl: string) => void;
  onSaveToHistory: (dataUrl: string) => void;
  onOpenEmailBuilder: (dataUrl: string) => void;
}

const DrawMode: React.FC<DrawModeProps> = ({ color, onPreview, onSaveToHistory, onOpenEmailBuilder }) => {
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
        
        // Prevent clearing if resizing slightly (mobile URL bar)
        if (canvas.width !== container.offsetWidth) {
            canvas.width = container.offsetWidth;
            canvas.height = 450;
            requestAnimationFrame(() => redrawCanvas(strokes.slice(0, historyStep)));
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [strokes, historyStep]);

  // --- Drawing Logic (Pressure & Velocity) ---

  const getCoordinates = (e: React.PointerEvent, canvas: HTMLCanvasElement): Point => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: e.pressure !== 0.5 ? e.pressure : 0.5, // 0.5 is often default for mouse
      time: Date.now()
    };
  };

  const getLineWidth = (velocity: number, pressure: number, baseWidth: number) => {
    // Velocity factor (faster = thinner)
    const clampedVelocity = Math.min(velocity, 2); 
    const velocityFactor = 1 - (clampedVelocity / 4); // 0.5 to 1.0

    // Pressure factor (harder = thicker)
    // If pressure is 0 (mouse sometimes), treat as 0.5
    const p = pressure <= 0 ? 0.5 : pressure;
    const pressureFactor = 0.5 + p; // 0.5 to 1.5

    return baseWidth * velocityFactor * pressureFactor;
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
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = stroke.color;

        if (stroke.points.length < 3) {
            const p = stroke.points[0];
            ctx.beginPath();
            ctx.arc(p.x, p.y, (stroke.baseWidth * (p.pressure || 0.5)), 0, Math.PI * 2);
            ctx.fillStyle = stroke.color;
            ctx.fill();
            return;
        }

        let p1 = stroke.points[0];
        let p2 = stroke.points[1];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);

        for (let i = 1; i < stroke.points.length; i++) {
            const midPoint = {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2
            };
            const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            const time = (p2.time || 0) - (p1.time || 0);
            const velocity = time > 0 ? dist / time : 0;
            
            // Average pressure
            const avgPressure = ((p1.pressure || 0.5) + (p2.pressure || 0.5)) / 2;
            
            const currentWidth = getLineWidth(velocity, avgPressure, stroke.baseWidth);
            ctx.lineWidth = currentWidth;
            
            ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
            ctx.stroke();
            ctx.beginPath(); 
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

  // --- Interaction Handlers (Pointer Events) ---

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    
    const point = getCoordinates(e, canvas);
    const newStroke: Stroke = {
      points: [point],
      color: color,
      isEraser: tool === 'eraser',
      baseWidth: baseWidth,
      smoothing: 0.5
    };
    
    setCurrentStroke(newStroke);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
         if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
         } else {
             ctx.fillStyle = color;
         }
         ctx.beginPath();
         // Draw a dot on start
         ctx.arc(point.x, point.y, (baseWidth * (point.pressure || 0.5)) / 2, 0, Math.PI * 2);
         ctx.fill();
         ctx.globalCompositeOperation = 'source-over';
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || !currentStroke || !canvasRef.current) return;
    
    // If it's a pen, we trust the pressure more. If mouse, pressure is static.
    const point = getCoordinates(e, canvasRef.current);
    currentStroke.points.push(point);
    
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
              const dist = Math.hypot(lastPoint.x - prevPoint.x, lastPoint.y - prevPoint.y);
              const time = (lastPoint.time || 0) - (prevPoint.time || 0);
              const v = time > 0 ? dist / time : 0;
              
              // Smooth pressure transition
              const pressure = lastPoint.pressure || 0.5;
              
              ctx.lineWidth = getLineWidth(v, pressure, baseWidth);
              ctx.strokeStyle = color;
          }
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(lastPoint.x, lastPoint.y);
          ctx.stroke();
          ctx.globalCompositeOperation = 'source-over';
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (!isDrawing || !currentStroke) return;
    setIsDrawing(false);
    const newStrokes = [...strokes.slice(0, historyStep), currentStroke];
    setStrokes(newStrokes);
    setHistoryStep(newStrokes.length);
    setCurrentStroke(null);
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

  const getHighFidelityCanvas = () => {
      if (!canvasRef.current) return null;
      // We essentially just redraw everything to a clean canvas
      // For improved export, we could technically re-render at 2x scale here
      return canvasRef.current;
  };

  const handleDownload = () => {
    if (!canvasRef.current || historyStep === 0) return;
    const canvas = getHighFidelityCanvas();
    if (!canvas) return;
    let finalCanvas = trim ? trimCanvas(canvas) : canvas;
    finalCanvas = addBackgroundToCanvas(finalCanvas, bgColor);
    const dataUrl = finalCanvas.toDataURL('image/png');
    onSaveToHistory(dataUrl);
    downloadDataUrl(dataUrl, 'my-drawn-signature.png');
    // Force redraw to bring back guidelines if they were trimmed out (though trim creates new canvas)
    redrawCanvas(strokes.slice(0, historyStep));
  };

  const handleDownloadSVG = () => {
      if (!canvasRef.current || historyStep === 0) return;
      const cleanStrokes = strokes.slice(0, historyStep);
      const svgString = generateDrawSVG(cleanStrokes, canvasRef.current.width, canvasRef.current.height);
      downloadSVG(svgString, 'my-drawn-signature.svg');
  };

  const handleAnimatedSVG = () => {
      if (!canvasRef.current || historyStep === 0) return;
      const cleanStrokes = strokes.slice(0, historyStep);
      const svgString = generateAnimatedSVG(cleanStrokes, canvasRef.current.width, canvasRef.current.height);
      downloadSVG(svgString, 'animated-signature.svg');
  };

  const handleEmailSig = () => {
      if (!canvasRef.current || historyStep === 0) return;
      const canvas = getHighFidelityCanvas();
      if (!canvas) return;
      let finalCanvas = trim ? trimCanvas(canvas) : canvas;
      finalCanvas = addBackgroundToCanvas(finalCanvas, bgColor);
      const dataUrl = finalCanvas.toDataURL('image/png');
      onSaveToHistory(dataUrl);
      onOpenEmailBuilder(dataUrl);
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-3 mb-6 flex flex-wrap gap-4 items-center justify-between shadow-sm">
           <div className="flex items-center gap-4">
               <div className="flex bg-gray-100 dark:bg-slate-900 p-1 rounded-lg">
                    <button onClick={() => setTool('pen')} aria-label="Use Pen Tool" className={`p-2 rounded-md transition-colors ${tool === 'pen' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400'}`} title="Pen"><Pen size={18} aria-hidden="true" /></button>
                    <button onClick={() => setTool('eraser')} aria-label="Use Eraser Tool" className={`p-2 rounded-md transition-colors ${tool === 'eraser' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400'}`} title="Eraser"><Eraser size={18} aria-hidden="true" /></button>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="thickness-slider" className="text-[10px] font-bold text-slate-400 uppercase hidden md:inline">Thickness</label>
                    <input id="thickness-slider" type="range" min="1" max="10" step="0.5" value={baseWidth} onChange={(e) => setBaseWidth(parseFloat(e.target.value))} aria-label="Adjust pen thickness" className="w-24 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white" />
                </div>
           </div>
           <div className="flex flex-wrap gap-2 items-center">
                <button onClick={() => setShowPreviewLine(!showPreviewLine)} className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${showPreviewLine ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 text-blue-700 dark:text-blue-300' : 'border-transparent text-slate-500'}`}>Sign Line</button>
                <button onClick={() => setTrim(!trim)} className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${trim ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 text-blue-700 dark:text-blue-300' : 'border-transparent text-slate-500'}`}>Auto-Trim</button>
                 <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-900 p-1 rounded-lg">
                    <button onClick={() => setBgColor('transparent')} aria-label="Transparent background" className={`w-5 h-5 rounded border ${bgColor === 'transparent' ? 'border-gray-400' : 'border-transparent opacity-50'}`}><div className="w-full h-full bg-gray-300 rounded-sm opacity-50"></div></button>
                    <button onClick={() => setBgColor('#ffffff')} aria-label="White background" className={`w-5 h-5 rounded border bg-white ${bgColor === '#ffffff' ? 'border-gray-400' : 'border-transparent opacity-50'}`}></button>
                    <button onClick={() => setBgColor('#000000')} aria-label="Black background" className={`w-5 h-5 rounded border bg-black ${bgColor === '#000000' ? 'border-gray-400' : 'border-transparent opacity-50'}`}></button>
                </div>
           </div>
      </div>

      <div ref={containerRef} className="relative bg-white dark:bg-white rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden touch-none" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)', backgroundSize: '24px 24px', backgroundColor: bgColor === 'transparent' ? '#ffffff' : bgColor }}>
        <canvas 
            ref={canvasRef} 
            role="img"
            aria-label="Drawing canvas for custom signature. Use touch or mouse to draw."
            onPointerDown={handlePointerDown} 
            onPointerMove={handlePointerMove} 
            onPointerUp={handlePointerUp} 
            onPointerLeave={handlePointerUp}
            className="w-full relative z-20 cursor-crosshair" 
            style={{ height: '450px' }} 
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-gray-200 dark:border-slate-600 shadow-lg rounded-xl p-2 items-center">
             <button onClick={handleUndo} disabled={historyStep === 0} aria-label="Undo" className="p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg disabled:opacity-30"><RotateCcw size={18} aria-hidden="true" /></button>
             <button onClick={handleRedo} disabled={historyStep === strokes.length} aria-label="Redo" className="p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg disabled:opacity-30"><RotateCw size={18} aria-hidden="true" /></button>
             <div className="w-px h-8 bg-gray-200 dark:bg-slate-600 mx-1"></div>
             <button onClick={handleClear} aria-label="Clear Canvas" className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 size={18} aria-hidden="true" /></button>
             <div className="w-px h-8 bg-gray-200 dark:bg-slate-600 mx-1"></div>
             
             <div className="hidden sm:flex items-center">
                <button onClick={handleEmailSig} disabled={historyStep===0} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg disabled:opacity-30" title="Email Signature" aria-label="Create email signature"><Mail size={18} aria-hidden="true" /></button>
                <button onClick={handleAnimatedSVG} disabled={historyStep===0} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg disabled:opacity-30" title="Download Animated SVG" aria-label="Download animated SVG"><Play size={18} aria-hidden="true" /></button>
                <button onClick={handleDownloadSVG} disabled={historyStep===0} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg disabled:opacity-30" title="Download SVG" aria-label="Download SVG"><FileJson size={18} aria-hidden="true" /></button>
             </div>
             <button onClick={handleDownload} disabled={historyStep===0} aria-label="Download PNG" className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold shadow-md hover:opacity-90 disabled:opacity-50"><Download size={14} aria-hidden="true" /> PNG</button>
        </div>
      </div>
      <div className="mt-2 text-center">
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <Fingerprint size={12} aria-hidden="true" /> Pressure Sensitivity Enabled (Supported Devices)
          </p>
      </div>
    </div>
  );
};

export default DrawMode;