import React, { useState, useRef } from 'react';
import { Upload, Sliders, Download, Trash2, RefreshCw, Mail } from 'lucide-react';
import { processScannedImage, downloadDataUrl } from '../utils/canvasUtils';

interface ScanModeProps {
    onPreview: (dataUrl: string) => void;
    onSaveToHistory: (dataUrl: string) => void;
    onOpenEmailBuilder: (dataUrl: string) => void;
}

const ScanMode: React.FC<ScanModeProps> = ({ onPreview, onSaveToHistory, onOpenEmailBuilder }) => {
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [threshold, setThreshold] = useState(160);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            await runProcessing(selectedFile, threshold);
        }
    };

    const runProcessing = async (imgFile: File, thresh: number) => {
        setIsProcessing(true);
        try {
            const dataUrl = await processScannedImage(imgFile, thresh);
            setProcessedImage(dataUrl);
        } catch (err) {
            console.error(err);
            alert("Error processing image.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleThresholdChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setThreshold(val);
        if (file) {
            await runProcessing(file, val);
        }
    };

    const handleDownload = () => {
        if (processedImage) {
            onSaveToHistory(processedImage);
            downloadDataUrl(processedImage, 'scanned-signature.png');
        }
    };

    const handleEmail = () => {
        if (processedImage) {
            onOpenEmailBuilder(processedImage);
        }
    };

    const handleClear = () => {
        setFile(null);
        setProcessedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className="w-full animate-fade-in">
            {!processedImage ? (
                // Upload State
                <div 
                    role="button"
                    tabIndex={0}
                    aria-label="Upload a photo of your handwritten signature"
                    onKeyDown={handleKeyDown}
                    className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl p-12 text-center bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                    />
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Upload size={32} />
                    </div>
                    {/* Fixed: Changed h3 to div to avoid invalid ARIA structure inside role="button" */}
                    <div className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload your signature</div>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                        Take a photo of your signature on white paper. We'll extract it, remove the background, and digitize it instantly.
                    </p>
                    <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-lg font-bold hover:opacity-90 transition-opacity inline-block">
                        Choose Image
                    </span>
                </div>
            ) : (
                // Edit/Preview State
                <div className="flex flex-col gap-6">
                     {/* Toolbar */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <label htmlFor="contrast-slider" className="flex items-center gap-2 text-slate-500">
                                <Sliders size={18} />
                                <span className="text-xs font-bold uppercase">Contrast / Threshold</span>
                            </label>
                            <input 
                                id="contrast-slider"
                                type="range" 
                                min="50" 
                                max="230" 
                                value={threshold} 
                                aria-label="Adjust contrast threshold"
                                onChange={handleThresholdChange}
                                className="flex-1 md:w-48 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                             <button onClick={handleClear} className="p-2 text-slate-400 hover:text-rose-500 transition-colors" title="Remove" aria-label="Remove image and start over">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="relative bg-white dark:bg-white rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden min-h-[300px] flex items-center justify-center"
                        style={{ 
                            backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)', 
                            backgroundSize: '24px 24px'
                        }}
                    >
                        {isProcessing ? (
                            <div className="flex flex-col items-center gap-2 text-slate-400">
                                <RefreshCw className="animate-spin" size={32} />
                                <span className="text-sm">Processing...</span>
                            </div>
                        ) : (
                            <img src={processedImage} alt="Processed Digital Signature with Background Removed" className="max-w-full max-h-[400px]" />
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                            onClick={handleEmail}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            <Mail size={18} /> Create Email Signature
                        </button>
                        <button 
                            onClick={handleDownload}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg"
                        >
                            <Download size={18} /> Download Digitized PNG
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScanMode;