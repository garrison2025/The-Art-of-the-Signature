import React, { useState, useRef, useEffect } from 'react';
import { X, Move, Maximize2 } from 'lucide-react';

interface ContextPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    signatureDataUrl: string;
}

const ContextPreviewModal: React.FC<ContextPreviewModalProps> = ({ isOpen, onClose, signatureDataUrl }) => {
    const [bgType, setBgType] = useState<'document' | 'email' | 'photo'>('document');
    const [position, setPosition] = useState({ x: 50, y: 50 }); // percentage
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);

    // Reset position on open
    useEffect(() => {
        if (isOpen) {
            setPosition({ x: 50, y: 70 });
            setScale(1);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setPosition({ x, y });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Background Styles
    const getBackgroundStyle = () => {
        switch(bgType) {
            case 'document':
                return {
                    background: `
                        linear-gradient(#f1f5f9 1px, transparent 1px),
                        linear-gradient(90deg, #f1f5f9 1px, transparent 1px),
                        white
                    `,
                    backgroundSize: '40px 40px',
                    boxShadow: '0 0 50px rgba(0,0,0,0.1) inset'
                };
            case 'email':
                return {
                    backgroundColor: '#ffffff',
                    borderLeft: '4px solid #3b82f6'
                };
            case 'photo':
                return {
                    backgroundColor: '#333',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                };
            default: return {};
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-slate-700">
                
                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Real-time Simulator</h3>
                        <p className="text-xs text-slate-500">Drag to position. Scroll to resize.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg mr-4">
                            {(['document', 'email', 'photo'] as const).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setBgType(t)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${bgType === t ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <X size={20} className="text-slate-500" />
                        </button>
                    </div>
                </div>

                {/* Preview Canvas */}
                <div 
                    className="flex-1 relative overflow-hidden bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-8 select-none"
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    <div 
                        ref={containerRef}
                        className="w-full h-full relative shadow-lg transition-all duration-300"
                        style={getBackgroundStyle()}
                    >
                         {/* Fake Content for context */}
                        {bgType === 'document' && (
                             <div className="absolute bottom-20 left-20 right-20 border-t border-slate-300 pt-2 flex justify-between">
                                 <span className="text-xs text-slate-400 font-serif italic">Authorized Signature</span>
                                 <span className="text-xs text-slate-400 font-serif italic">Date: {new Date().toLocaleDateString()}</span>
                             </div>
                        )}
                        {bgType === 'email' && (
                             <div className="absolute top-10 left-10 text-slate-700 p-8 font-sans">
                                 <p className="mb-4">Best regards,</p>
                                 <div className="h-16"></div> {/* Space for sig */}
                                 <p className="font-bold text-slate-900">John Doe</p>
                                 <p className="text-sm text-slate-500">Chief Executive Officer</p>
                             </div>
                        )}

                        {/* The Signature */}
                        <div 
                            className="absolute cursor-move group"
                            style={{ 
                                left: `${position.x}%`, 
                                top: `${position.y}%`, 
                                transform: `translate(-50%, -50%) scale(${scale})`,
                                touchAction: 'none'
                            }}
                            onMouseDown={handleMouseDown}
                        >
                            <img 
                                src={signatureDataUrl} 
                                alt="Signature Preview" 
                                className="max-w-[300px] pointer-events-none"
                            />
                            {/* Controls Overlay */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex gap-1 bg-slate-900/80 text-white rounded px-2 py-1">
                                <button onClick={(e) => { e.stopPropagation(); setScale(Math.max(0.5, scale - 0.1)); }}>-</button>
                                <span className="text-xs mx-1">{Math.round(scale * 100)}%</span>
                                <button onClick={(e) => { e.stopPropagation(); setScale(Math.min(2, scale + 0.1)); }}>+</button>
                            </div>
                            <div className="absolute inset-0 border border-blue-400 opacity-0 group-hover:opacity-100 rounded-lg pointer-events-none"></div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 text-center">
                    <p className="text-xs text-slate-400">
                        This is just a visualizer. Download the signature to use it in your real documents.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContextPreviewModal;
