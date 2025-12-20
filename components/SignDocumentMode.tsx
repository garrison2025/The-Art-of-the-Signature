import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Download, ChevronLeft, ChevronRight, Move, AlertCircle, RefreshCw } from 'lucide-react';
import { renderPdfPageToImage, embedSignatureInPdf, downloadPdfBytes } from '../utils/pdfUtils';

interface SignDocumentModeProps {
    signatureDataUrl: string | null;
}

const SignDocumentMode: React.FC<SignDocumentModeProps> = ({ signatureDataUrl }) => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [previewDimensions, setPreviewDimensions] = useState({ width: 0, height: 0 });

    // Dragging State
    const [sigPos, setSigPos] = useState({ x: 50, y: 50 }); // Percentage 0-100 relative to container
    const [sigSize, setSigSize] = useState(150); // Width in pixels (visual)
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load PDF page when file or page number changes
    useEffect(() => {
        if (!pdfFile) return;

        const loadPage = async () => {
            setIsLoading(true);
            try {
                const { dataUrl, width, height, numPages } = await renderPdfPageToImage(pdfFile, currentPage);
                setPreviewImage(dataUrl);
                setPreviewDimensions({ width, height });
                setNumPages(numPages);
            } catch (err) {
                console.error("Failed to render PDF", err);
                alert("Could not render this PDF. Please try a standard non-encrypted PDF.");
            } finally {
                setIsLoading(false);
            }
        };

        loadPage();
    }, [pdfFile, currentPage]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setPdfFile(e.target.files[0]);
            setCurrentPage(1);
            setSigPos({ x: 50, y: 50 }); // Reset position to center
        }
    };

    // --- Drag Logic ---
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate position as percentage to be responsive
        let x = ((e.clientX - rect.left) / rect.width) * 100;
        let y = ((e.clientY - rect.top) / rect.height) * 100;
        
        // Clamp
        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));

        setSigPos({ x, y });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
         if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        let x = ((touch.clientX - rect.left) / rect.width) * 100;
        let y = ((touch.clientY - rect.top) / rect.height) * 100;
        setSigPos({ x, y });
    };

    // --- Save Logic ---
    const handleDownloadSignedPdf = async () => {
        if (!pdfFile || !signatureDataUrl || !containerRef.current) return;
        setIsLoading(true);

        try {
            // 1. Calculate actual coordinates for PDF (PDF coords are Bottom-Left based points)
            // We need to map visual percentage to PDF point dimensions.
            // Note: The previewImage is likely scaled (e.g. 1.5x). 
            // We need the *original* PDF page dimensions, but pdf-lib will handle the page size.
            // We can approximate by assuming the aspect ratio is correct.
            
            // For precise placement, we need to know the visual container's aspect ratio vs PDF page
            // The container sets the image as 'contain' or specific width.
            
            // Let's assume the previewImage dimensions (from renderPdfPageToImage) represent the 'scale' we are viewing.
            // But pdf-lib uses 72 DPI points usually. 
            // The simplest way: use ratio.
            
            // Visual X (from left) = sigPos.x %
            // Visual Y (from top) = sigPos.y %
            
            // In PDF-Lib:
            // x = page_width * (sigPos.x / 100)
            // y = page_height - (page_height * (sigPos.y / 100))  <-- Flip Y because PDF is bottom-left origin
            
            // We also need to scale the signature size.
            // visual_sig_width_percent = sigSize / containerRef.width
            
            // We'll let `embedSignatureInPdf` handle the low level, but we need to pass 'relative' coords or calculate here.
            // Let's modify the utils to take absolute units, so we calculate here using `pdf-lib` page getter if needed, 
            // OR we rely on the fact that we can get the page size inside `embedSignatureInPdf`.
            // Wait, we can't easily get page size here without loading the doc twice.
            
            // Refined Strategy: Pass percentages to a specialized function, or load doc here.
            // Let's load doc here to calculate exact coordinates.
            const { PDFDocument } = await import('pdf-lib');
            const arrayBuffer = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const page = pdfDoc.getPages()[currentPage - 1];
            const { width: pageWidth, height: pageHeight } = page.getSize();
            
            // Calculate Position
            // The signature is centered on the mouse, so sigPos is the center.
            // We need bottom-left of the image for pdf-lib.
            
            // Container dimensions (visual)
            const containerRect = containerRef.current.getBoundingClientRect();
            
            // Signature Visual Width relative to container width
            const sigVisualRatio = sigSize / containerRect.width;
            const pdfSigWidth = pageWidth * sigVisualRatio;
            const pdfSigHeight = pdfSigWidth * (150/300); // approx aspect ratio of signature canvas (height/width is usually 0.5)
            // Actually, let's look at signatureDataUrl aspect ratio? usually 2:1 from canvasUtils (800x400)
            
            const centerX = pageWidth * (sigPos.x / 100);
            const centerY = pageHeight - (pageHeight * (sigPos.y / 100)); // Top-down to Bottom-up
            
            const finalX = centerX - (pdfSigWidth / 2);
            const finalY = centerY - (pdfSigHeight / 2);

            const pdfBytes = await embedSignatureInPdf(
                pdfFile, 
                signatureDataUrl, 
                currentPage - 1,
                finalX, 
                finalY,
                pdfSigWidth,
                pdfSigHeight
            );

            downloadPdfBytes(pdfBytes, `signed-${pdfFile.name}`);

        } catch (e) {
            console.error(e);
            alert("Failed to save PDF.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!signatureDataUrl) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800 animate-fade-in">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Signature Required</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
                    Please create a signature in the <strong>Type</strong>, <strong>Draw</strong>, or <strong>Scan</strong> tab first. We need a signature to place on your document!
                </p>
            </div>
        );
    }

    return (
        <div className="w-full animate-fade-in">
            {!pdfFile ? (
                // Upload State
                <div 
                    className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl p-12 text-center bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                    id="pdf-upload-area"
                >
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="application/pdf" 
                        className="hidden" 
                        onChange={handleFileChange}
                    />
                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload PDF Document</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                        Select a PDF file from your computer. We'll render it securely in your browser so you can place your signature.
                    </p>
                    <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-lg font-bold hover:opacity-90 transition-opacity">
                        Select PDF
                    </button>
                </div>
            ) : (
                // Editor State
                <div className="flex flex-col gap-6">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setPdfFile(null)} 
                                className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white uppercase tracking-wider"
                            >
                                Change File
                            </button>
                            <span className="text-slate-300">|</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[150px]">{pdfFile.name}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-900 rounded-lg p-1">
                                <button 
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1 || isLoading}
                                    className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded disabled:opacity-30 transition-colors text-slate-600 dark:text-slate-300"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="text-xs font-mono w-16 text-center text-slate-600 dark:text-slate-300">
                                    {currentPage} / {numPages}
                                </span>
                                <button 
                                    onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
                                    disabled={currentPage === numPages || isLoading}
                                    className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded disabled:opacity-30 transition-colors text-slate-600 dark:text-slate-300"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={handleDownloadSignedPdf}
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-colors disabled:opacity-50"
                            id="sign-pdf-download-btn"
                        >
                            {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <Download size={16} />}
                            Sign & Download
                        </button>
                    </div>

                    {/* Canvas Area */}
                    <div className="relative w-full bg-gray-100 dark:bg-slate-900/50 rounded-xl overflow-hidden min-h-[500px] flex justify-center items-center border border-gray-200 dark:border-slate-800 p-4">
                        {isLoading ? (
                             <div className="flex flex-col items-center gap-3 text-slate-400 animate-pulse">
                                <FileText size={48} />
                                <span className="text-sm font-medium">Rendering PDF Page...</span>
                             </div>
                        ) : (
                            <div 
                                ref={containerRef}
                                className="relative shadow-2xl"
                                style={{ 
                                    maxWidth: '100%', 
                                    touchAction: 'none'
                                }}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                onTouchMove={handleTouchMove}
                            >
                                <img 
                                    src={previewImage || ''} 
                                    alt="PDF Page" 
                                    className="block max-w-full h-auto"
                                    draggable={false}
                                />

                                {/* Draggable Signature Overlay */}
                                <div 
                                    className="absolute cursor-move group"
                                    style={{
                                        left: `${sigPos.x}%`,
                                        top: `${sigPos.y}%`,
                                        width: `${sigSize}px`,
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 10
                                    }}
                                    onMouseDown={handleMouseDown}
                                    onTouchStart={() => setIsDragging(true)}
                                >
                                    <div className="relative border-2 border-indigo-500/0 group-hover:border-indigo-500/50 hover:border-indigo-500 rounded-lg transition-colors p-1">
                                        <img 
                                            src={signatureDataUrl} 
                                            alt="Your Signature" 
                                            className="w-full h-auto pointer-events-none drop-shadow-sm"
                                        />
                                        
                                        {/* Resize Handle (Simple visual, functionality via buttons for robustness) */}
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1 bg-slate-800 text-white rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <button onClick={(e) => { e.stopPropagation(); setSigSize(s => Math.max(50, s - 10)) }} className="px-1 hover:text-indigo-300">-</button>
                                             <Move size={12} />
                                             <button onClick={(e) => { e.stopPropagation(); setSigSize(s => Math.min(400, s + 10)) }} className="px-1 hover:text-indigo-300">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                     <p className="text-center text-xs text-slate-400">
                        Drag the signature to position it. Use the +/- controls on hover to resize.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SignDocumentMode;