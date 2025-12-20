import React, { useRef, useEffect, useState } from 'react';
import { Download, RotateCcw, RotateCw, Trash2, Copy, Pen, Eraser, Play } from 'lucide-react';
import { downloadDataUrl } from '../utils/canvasUtils';

interface DrawModeProps {
  color: string;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
  isEraser: boolean;
}

const DrawMode: React.FC<DrawModeProps> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(2.5);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [historyStep, setHistoryStep] = useState(0); // For undo/redo
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);

  // Initialize canvas size
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        
        // Match container size
        canvas.width = container.offsetWidth;
        canvas.height = 450;
        
        // Redraw content
        redrawCanvas(strokes.slice(0, historyStep));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [strokes, historyStep]); // Re-bind if history changes, though redraw uses refs usually

  // Redraw function
  const redrawCanvas = (strokesToDraw: Stroke[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokesToDraw.forEach(stroke => {
      if (stroke.points.length < 1) return;
      
      ctx.beginPath();
      ctx.lineWidth = stroke.width;
      ctx.strokeStyle = stroke.color;
      
      if (stroke.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    });

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
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
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    
    // If we were in the middle of history and draw new, we lose the "redo" future
    const newHistory = strokes.slice(0, historyStep);
    
    const { x, y } = getCoordinates(e, canvas);
    const newStroke: Stroke = {
      points: [{ x, y }],
      color: color,
      width: tool === 'eraser' ? 20 : lineWidth,
      isEraser: tool === 'eraser'
    };
    
    setCurrentStroke(newStroke);
    setStrokes([...newHistory]); // Just update the base strokes for now, we'll add the new one on end
    
    // Initial draw dot
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.beginPath();
        ctx.arc(x, y, (tool === 'eraser' ? 20 : lineWidth) / 2, 0, Math.PI * 2);
        ctx.fillStyle = tool === 'eraser' ? '#ffffff' : color;
        if (tool === 'eraser') ctx.globalCompositeOperation = 'destination-out';
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !currentStroke || !canvasRef.current) return;
    
    const { x, y } = getCoordinates(e, canvasRef.current);
    
    // Update current stroke data
    currentStroke.points.push({ x, y });
    
    // Draw live (optimization: don't redraw everything, just the new segment)
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.lineWidth = currentStroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = currentStroke.color;
      
      if (currentStroke.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      const points = currentStroke.points;
      if (points.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
    }
  };

  const stopDrawing = () => {
    if (!isDrawing || !currentStroke) return;
    
    setIsDrawing(false);
    
    // Commit stroke
    const newStrokes = [...strokes.slice(0, historyStep), currentStroke];
    setStrokes(newStrokes);
    setHistoryStep(newStrokes.length);
    setCurrentStroke(null);
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
    const newStrokes = [...strokes.slice(0, historyStep), { points: [], color, width: 0, isEraser: false }]; // Effectively we just want to clear, but to support undo, we might need a "clear" action or just reset.
    // Simpler: Just reset strokes but keep logic if we want true undo of clear. 
    // For this UI, let's just wipe.
    setStrokes([]);
    setHistoryStep(0);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };

  const handleDownload = () => {
    if (!canvasRef.current || historyStep === 0) return;
    downloadDataUrl(canvasRef.current.toDataURL('image/png'), 'my-signature.png');
  };

  const handleCopy = async () => {
    if (!canvasRef.current || historyStep === 0) return;
    try {
        const blob = await new Promise<Blob | null>(resolve => canvasRef.current!.toBlob(resolve));
        if (blob) {
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
            alert('Copied to clipboard!');
        }
    } catch (err) {
        console.error('Failed to copy', err);
    }
  };

  // Re-render when color changes for NEW strokes, but doesn't change old strokes
  
  return (
    <div className="w-full">
      <div 
        ref={containerRef}
        className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden touch-none"
        style={{ 
            backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)', 
            backgroundSize: '24px 24px' 
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-10 z-10"></div> {/* Spacer */}

        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full cursor-crosshair relative z-20"
          style={{ height: '450px' }}
        />

        {/* Placeholder Text */}
        {historyStep === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 select-none z-0">
            <span className="text-4xl md:text-5xl font-serif italic text-slate-400">Sign within the space</span>
          </div>
        )}

        {/* Floating Toolbar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 w-[90%] md:w-auto">
            
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-2xl p-2 flex items-center gap-2 md:gap-4 px-4 md:px-6">
                
                {/* Tools */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setTool('pen')}
                        className={`p-2 rounded-md transition-colors ${tool === 'pen' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Pen"
                    >
                        <Pen size={18} />
                    </button>
                    <button 
                        onClick={() => setTool('eraser')}
                        className={`p-2 rounded-md transition-colors ${tool === 'eraser' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Eraser"
                    >
                        <Eraser size={18} />
                    </button>
                </div>

                <div className="w-px h-8 bg-gray-200 mx-1"></div>

                {/* Size Slider */}
                <div className="flex items-center gap-3 px-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Size</span>
                    <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        step="0.5"
                        value={lineWidth} 
                        onChange={(e) => setLineWidth(parseFloat(e.target.value))}
                        className="w-20 md:w-32 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                    />
                </div>

                <div className="w-px h-8 bg-gray-200 mx-1 hidden sm:block"></div>

                {/* Play / Preview (Placeholder functionality for now) */}
                <button 
                    onClick={() => redrawCanvas(strokes.slice(0, historyStep))}
                    className="p-2 text-slate-400 hover:text-slate-600 hidden sm:block"
                    title="Replay Stroke"
                >
                    <Play size={18} />
                </button>

            </div>

            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-2xl p-2 flex items-center justify-between gap-4 px-4 md:px-6 w-full md:w-auto">
                
                {/* Actions */}
                <div className="flex items-center gap-1 md:gap-2">
                    <button 
                        onClick={handleUndo}
                        disabled={historyStep === 0}
                        className={`p-2 rounded-lg transition-colors ${historyStep > 0 ? 'text-slate-600 hover:bg-slate-50' : 'text-slate-300 cursor-not-allowed'}`}
                        title="Undo"
                    >
                        <RotateCcw size={18} />
                    </button>
                    <button 
                        onClick={handleRedo}
                        disabled={historyStep === strokes.length}
                        className={`p-2 rounded-lg transition-colors ${historyStep < strokes.length ? 'text-slate-600 hover:bg-slate-50' : 'text-slate-300 cursor-not-allowed'}`}
                        title="Redo"
                    >
                        <RotateCw size={18} />
                    </button>
                    <button 
                        onClick={handleClear}
                        className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-red-500 transition-colors"
                        title="Clear"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                <div className="w-px h-6 bg-gray-200 mx-1"></div>

                <div className="flex items-center gap-2">
                    <button 
                         onClick={handleCopy}
                         className="p-2 text-slate-500 hover:text-slate-900 hidden sm:block"
                         title="Copy to Clipboard"
                    >
                        <Copy size={18} />
                    </button>

                    <button 
                        onClick={handleCopy}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <Copy size={14} />
                        Copy
                    </button>

                    <button 
                        onClick={handleDownload}
                        disabled={historyStep === 0}
                        className={`flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-lg text-white transition-all shadow-sm
                            ${historyStep > 0 ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-300 cursor-not-allowed'}`}
                    >
                        <Download size={14} />
                        Save
                    </button>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default DrawMode;