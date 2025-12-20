import React from 'react';
import { Clock, Download, Trash2 } from 'lucide-react';
import { SignatureHistoryItem } from '../types';
import { downloadDataUrl } from '../utils/canvasUtils';

interface SignatureHistoryProps {
    history: SignatureHistoryItem[];
    onClear: () => void;
}

const SignatureHistory: React.FC<SignatureHistoryProps> = ({ history, onClear }) => {
    if (history.length === 0) return null;

    return (
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Recent History</span>
                </div>
                <button 
                    onClick={onClear}
                    className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"
                >
                    <Trash2 size={12} /> Clear
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {history.map((item) => (
                    <div key={item.id} className="flex-shrink-0 group relative bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 w-48 h-28 flex items-center justify-center p-2">
                        <img src={item.dataUrl} alt="Signature" className="max-w-full max-h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="absolute top-2 left-2">
                            <span className="text-[9px] uppercase font-bold text-slate-300 bg-slate-100 dark:bg-slate-700 dark:text-slate-500 px-1.5 py-0.5 rounded">
                                {item.type}
                            </span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
                            <button 
                                onClick={() => downloadDataUrl(item.dataUrl, `history-${item.id}.png`)}
                                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                                title="Download"
                            >
                                <Download size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SignatureHistory;
