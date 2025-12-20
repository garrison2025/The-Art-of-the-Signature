import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Download, ChevronLeft, ChevronRight, Move, AlertCircle, RefreshCw, Calendar, CheckSquare, X, Plus } from 'lucide-react';
import { renderPdfPageToImage, embedSignatureInPdf, downloadPdfBytes } from '../utils/pdfUtils';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface SignDocumentModeProps {
    signatureDataUrl: string | null;
}

type PdfElement = 
    | { type: 'signature', id: string, x: number, y: number, width: number, dataUrl: string }
    | { type: 'text', id: string, x: number, y: number, text: string, fontSize: number }
    | { type: 'check', id: string, x: number, y: number, size: number };

const SignDocumentMode: React.FC<SignDocumentModeProps> = ({ signatureDataUrl }) => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    
    // Elements on the current page
    const [elements, setElements] = useState<PdfElement[]>([]);
    
    // Selection / Dragging
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load PDF page
    useEffect(() => {
        if (!pdfFile) return;

        const loadPage = async () => {
            setIsLoading(true);
            try {
                const { dataUrl, numPages } = await renderPdfPageToImage(pdfFile, currentPage);
                setPreviewImage(dataUrl);
                setNumPages(numPages);
                // In a real app, we would store elements PER page. 
                // For this version, elements clear on page change or we could persist them.
                // Let's clear for simplicity to avoid ghost elements on wrong pages.
                setElements([]);
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
            setElements([]);
        }
    };

    // --- Adding Elements ---
    const addSignature = () => {
        if (!signatureDataUrl) return;
        const newEl: PdfElement = {
            type: 'signature',
            id: Date.now().toString(),
            x: 50, y: 50, // Center
            width: 150,
            dataUrl: signatureDataUrl
        };
        setElements([...elements, newEl]);
        setSelectedId(newEl.id);
    };

    const addText = (initialText: string = "Text") => {
        const newEl: PdfElement = {
            type: 'text',
            id: Date.now().toString(),
            x: 50, y: 50,
            text: initialText,
            fontSize: 16
        };
        setElements([...elements, newEl]);
        setSelectedId(newEl.id);
    };

    const addDate = () => {
        const dateStr = new Date().toLocaleDateString();
        addText(dateStr);
    };

    const addCheck = () => {
        const newEl: PdfElement = {
            type: 'check',
            id: Date.now().toString(),
            x: 50, y: 50,
            size: 24
        };
        setElements([...elements, newEl]);
        setSelectedId(newEl.id);
    };

    const removeElement = (id: string) => {
        setElements(elements.filter(e => e.id !== id));
        setSelectedId(null);
    };

    // --- Drag Logic ---
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: string) => {
        e.stopPropagation();
        setSelectedId(id);
        setIsDragging(true);
    };

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || !selectedId || !containerRef.current) return;
        
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const rect = containerRef.current.getBoundingClientRect();
        let x = ((clientX - rect.left) / rect.width) * 100;
        let y = ((clientY - rect.top) / rect.height) * 100;
        
        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));

        setElements(els => els.map(el => el.id === selectedId ? { ...el, x, y } : el));
    };

    const handleUp = () => {
        setIsDragging(false);
    };

    // --- Interaction Logic (Resize / Edit) ---
    const updateElement = (id: string, updates: Partial<PdfElement>) => {
        setElements(els => els.map(el => el.id === id ? { ...el, ...updates } as PdfElement : el));
    };

    // --- Saving Logic ---
    const handleDownloadSignedPdf = async () => {
        if (!pdfFile || elements.length === 0) return;
        setIsLoading(true);

        try {
            const arrayBuffer = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const page = pdfDoc.getPages()[currentPage - 1];
            const { width: pageWidth, height: pageHeight } = page.getSize();
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

            // Container visual dimensions
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (!containerRect) return;

            // Process all elements
            for (const el of elements) {
                // Calculate PDF coordinates (Bottom-Left origin)
                const pdfX = pageWidth * (el.x / 100);
                const pdfY = pageHeight - (pageHeight * (el.y / 100));

                if (el.type === 'signature') {
                    const pngImage = await pdfDoc.embedPng(el.dataUrl);
                    // Calculate relative width
                    const sigVisualRatio = el.width / containerRect.width;
                    const pdfSigWidth = pageWidth * sigVisualRatio;
                    const pdfSigHeight = pdfSigWidth * (pngImage.height / pngImage.width);
                    
                    page.drawImage(pngImage, {
                        x: pdfX - (pdfSigWidth / 2),
                        y: pdfY - (pdfSigHeight / 2),
                        width: pdfSigWidth,
                        height: pdfSigHeight,
                    });
                } else if (el.type === 'text') {
                    const textWidth = font.widthOfTextAtSize(el.text, el.fontSize);
                    page.drawText(el.text, {
                        x: pdfX - (textWidth / 2),
                        y: pdfY - (el.fontSize / 2), // Rough centering vertically
                        size: el.fontSize,
                        font: font,
                        color: rgb(0, 0, 0),
                    });
                } else if (el.type === 'check') {
                    // Draw a simple checkmark using lines or text
                    page.drawText('✓', {
                        x: pdfX - (el.size / 2),
                        y: pdfY - (el.size / 2),
                        size: el.size,
                        font: font,
                        color: rgb(0, 0, 0),
                    });
                }
            }

            const pdfBytes = await pdfDoc.save();
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
                    <div className="flex flex-col gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                        
                        {/* Top Row: File Info & Nav */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-700 pb-4">
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

                        {/* Bottom Row: Tools */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                                <button onClick={addSignature} className="flex items-center gap-2 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                                    <Plus size={16} /> Signature
                                </button>
                                <button onClick={() => addText()} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                    <FileText size={16} /> Text
                                </button>
                                <button onClick={addDate} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                    <Calendar size={16} /> Date
                                </button>
                                <button onClick={addCheck} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                    <CheckSquare size={16} /> Check
                                </button>
                            </div>

                            <button 
                                onClick={handleDownloadSignedPdf}
                                disabled={isLoading || elements.length === 0}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-colors disabled:opacity-50"
                            >
                                {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <Download size={16} />}
                                Download PDF
                            </button>
                        </div>
                    </div>

                    {/* Canvas Area */}
                    <div className="relative w-full bg-gray-100 dark:bg-slate-900/50 rounded-xl overflow-hidden min-h-[500px] flex justify-center items-center border border-gray-200 dark:border-slate-800 p-4 select-none">
                        {isLoading ? (
                             <div className="flex flex-col items-center gap-3 text-slate-400 animate-pulse">
                                <FileText size={48} />
                                <span className="text-sm font-medium">Rendering PDF Page...</span>
                             </div>
                        ) : (
                            <div 
                                ref={containerRef}
                                className="relative shadow-2xl"
                                style={{ maxWidth: '100%', touchAction: 'none' }}
                                onMouseMove={handleMove}
                                onMouseUp={handleUp}
                                onMouseLeave={handleUp}
                                onTouchMove={handleMove}
                            >
                                <img 
                                    src={previewImage || ''} 
                                    alt="PDF Page" 
                                    className="block max-w-full h-auto"
                                    draggable={false}
                                />

                                {/* Render Elements */}
                                {elements.map(el => (
                                    <div 
                                        key={el.id}
                                        className={`absolute cursor-move group flex items-center justify-center
                                            ${selectedId === el.id ? 'z-20 ring-2 ring-indigo-500 ring-offset-2' : 'z-10'}
                                        `}
                                        style={{
                                            left: `${el.x}%`,
                                            top: `${el.y}%`,
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                        onMouseDown={(e) => handleDragStart(e, el.id)}
                                        onTouchStart={(e) => handleDragStart(e, el.id)}
                                    >
                                        {/* Content */}
                                        {el.type === 'signature' && (
                                            <div style={{ width: `${el.width}px` }} className="relative">
                                                 <img src={el.dataUrl} className="w-full h-auto pointer-events-none" />
                                                 {selectedId === el.id && (
                                                     <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1 bg-slate-800 text-white rounded px-2 py-0.5">
                                                         <button onClick={(e) => { e.stopPropagation(); updateElement(el.id, {width: Math.max(50, el.width - 10)}) }} className="px-1 hover:text-indigo-300">-</button>
                                                         <Move size={12} />
                                                         <button onClick={(e) => { e.stopPropagation(); updateElement(el.id, {width: Math.min(400, el.width + 10)}) }} className="px-1 hover:text-indigo-300">+</button>
                                                     </div>
                                                 )}
                                            </div>
                                        )}

                                        {el.type === 'text' && (
                                            <div className="relative group">
                                                <input 
                                                    value={el.text}
                                                    onChange={(e) => updateElement(el.id, { text: e.target.value })}
                                                    className="bg-transparent border-none outline-none text-center font-sans font-medium text-slate-900 min-w-[50px]"
                                                    style={{ fontSize: `${el.fontSize}px` }}
                                                    autoFocus={selectedId === el.id}
                                                />
                                                 {selectedId === el.id && (
                                                     <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1 bg-slate-800 text-white rounded px-2 py-0.5 whitespace-nowrap z-30">
                                                         <button onClick={(e) => { e.stopPropagation(); updateElement(el.id, {fontSize: Math.max(10, el.fontSize - 2)}) }} className="px-1 hover:text-indigo-300">-</button>
                                                         <span className="text-[10px]">A</span>
                                                         <button onClick={(e) => { e.stopPropagation(); updateElement(el.id, {fontSize: Math.min(72, el.fontSize + 2)}) }} className="px-1 hover:text-indigo-300">+</button>
                                                     </div>
                                                 )}
                                            </div>
                                        )}

                                        {el.type === 'check' && (
                                            <div className="text-slate-900 pointer-events-none" style={{ fontSize: `${el.size}px` }}>✓</div>
                                        )}

                                        {/* Delete Button (Only on selected) */}
                                        {selectedId === el.id && (
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); removeElement(el.id) }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow-sm z-30"
                                            >
                                                <X size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignDocumentMode;