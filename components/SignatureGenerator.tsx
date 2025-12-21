import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Type, PenTool as DrawIcon, RefreshCw, Plus, ScanLine, FileSignature, Loader2 } from 'lucide-react';
import TypeMode from './TypeMode';
import DrawMode from './DrawMode';
import ContextPreviewModal from './ContextPreviewModal';
import EmailSignatureModal from './EmailSignatureModal';
import SignatureHistory from './SignatureHistory';
import { TabMode, SignatureHistoryItem, SignatureStyle } from '../types';
import { SIGNATURE_COLORS } from '../constants';

// Lazy load heavy components to split bundle size
const ScanMode = React.lazy(() => import('./ScanMode'));
const SignDocumentMode = React.lazy(() => import('./SignDocumentMode'));

interface SignatureGeneratorProps {
    initialCategory?: SignatureStyle | 'All';
    initialTab?: TabMode;
}

const SignatureGenerator: React.FC<SignatureGeneratorProps> = ({ initialCategory = 'All', initialTab = 'type' }) => {
  const [activeTab, setActiveTab] = useState<TabMode>(initialTab);
  const [inputText, setInputText] = useState('');
  const [selectedColor, setSelectedColor] = useState(SIGNATURE_COLORS[0].hex);
  const colorInputRef = useRef<HTMLInputElement>(null);

  // History State
  const [history, setHistory] = useState<SignatureHistoryItem[]>([]);
  
  // Preview States
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState('');

  // Track the "current" generated signature for PDF signing
  const [currentGeneratedSignature, setCurrentGeneratedSignature] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
      const saved = localStorage.getItem('signatureHistory');
      if (saved) {
          try {
              const parsed = JSON.parse(saved);
              setHistory(parsed);
              // Auto-select most recent as current if available
              if (parsed.length > 0) {
                  setCurrentGeneratedSignature(parsed[0].dataUrl);
              }
          } catch (e) {
              console.error("Failed to load history");
          }
      }
  }, []);

  const saveHistory = (newItem: SignatureHistoryItem) => {
      const newHistory = [newItem, ...history].slice(0, 10); // Keep last 10
      setHistory(newHistory);
      localStorage.setItem('signatureHistory', JSON.stringify(newHistory));
      
      // Update current signature for PDF signing
      setCurrentGeneratedSignature(newItem.dataUrl);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleCustomColorClick = () => {
    colorInputRef.current?.click();
  };

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const handlePreview = (dataUrl: string) => {
      setPreviewDataUrl(dataUrl);
      setIsPreviewOpen(true);
  };

  const handleOpenEmailBuilder = (dataUrl: string) => {
      setPreviewDataUrl(dataUrl);
      setIsEmailModalOpen(true);
  };

  const handleSaveToHistory = (dataUrl: string) => {
      saveHistory({
          id: Date.now().toString(),
          type: activeTab,
          dataUrl,
          timestamp: Date.now(),
          label: activeTab === 'type' ? (inputText || 'Typed') : (activeTab === 'scan' ? 'Scanned' : 'Drawn')
      });
  };

  const handleClearHistory = () => {
      setHistory([]);
      localStorage.removeItem('signatureHistory');
      setCurrentGeneratedSignature(null);
  };

  const isCustomColor = !SIGNATURE_COLORS.some(c => c.hex === selectedColor);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-10 z-10 mb-20">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        
        {/* Tabs */}
        <div id="generator-tabs" className="flex border-b border-gray-100 dark:border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('type')}
            className={`flex-1 min-w-[100px] py-6 text-sm font-bold flex items-center justify-center gap-2 transition-all relative
              ${activeTab === 'type' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
            aria-label="Switch to Type Mode"
            aria-selected={activeTab === 'type'}
            role="tab"
          >
            <Type size={18} aria-hidden="true" />
            Type
            {activeTab === 'type' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('draw')}
            className={`flex-1 min-w-[100px] py-6 text-sm font-bold flex items-center justify-center gap-2 transition-all relative
              ${activeTab === 'draw' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
            aria-label="Switch to Draw Mode"
            aria-selected={activeTab === 'draw'}
            role="tab"
          >
            <DrawIcon size={18} aria-hidden="true" />
            Draw
            {activeTab === 'draw' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex-1 min-w-[100px] py-6 text-sm font-bold flex items-center justify-center gap-2 transition-all relative
              ${activeTab === 'scan' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
            aria-label="Switch to Scan Mode"
            aria-selected={activeTab === 'scan'}
            role="tab"
          >
            <ScanLine size={18} aria-hidden="true" />
            Scan
            {activeTab === 'scan' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('sign-pdf')}
            className={`flex-1 min-w-[100px] py-6 text-sm font-bold flex items-center justify-center gap-2 transition-all relative bg-indigo-50/50 dark:bg-indigo-900/10
              ${activeTab === 'sign-pdf' ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-300'}`}
            aria-label="Switch to PDF Signing Mode"
            aria-selected={activeTab === 'sign-pdf'}
            role="tab"
          >
            <FileSignature size={18} aria-hidden="true" />
            Sign PDF
            {activeTab === 'sign-pdf' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
            )}
          </button>
        </div>

        {/* Controls Area */}
        {activeTab !== 'sign-pdf' && (
        <div className="p-10 pb-2 bg-white dark:bg-slate-900 transition-colors duration-300">
          
          {/* Color Picker */}
          {activeTab !== 'scan' && (
            <div className="flex justify-center mb-10" id="color-picker">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-1.5 rounded-full shadow-sm transition-colors">
                    {SIGNATURE_COLORS.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.hex)}
                        className={`w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 dark:ring-offset-slate-800
                        ${selectedColor === color.hex ? 'ring-slate-900 dark:ring-white scale-105' : 'ring-transparent hover:ring-gray-200 dark:hover:ring-slate-600'}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select ${color.name} color`}
                    />
                    ))}
                    
                    <div className="relative">
                        <input 
                            ref={colorInputRef}
                            type="color" 
                            className="absolute inset-0 opacity-0 w-0 h-0"
                            onChange={handleColorInputChange}
                            value={selectedColor}
                            aria-label="Choose a custom color"
                        />
                        <button 
                            onClick={handleCustomColorClick}
                            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:opacity-90 transition-all focus:outline-none ring-2 ring-offset-2 dark:ring-offset-slate-800
                            ${isCustomColor ? 'ring-slate-900 dark:ring-white scale-105' : 'ring-transparent hover:ring-gray-200 dark:hover:ring-slate-600 bg-gradient-to-br from-rose-400 to-orange-400'}`}
                            style={isCustomColor ? { backgroundColor: selectedColor } : {}}
                            title="Custom Color"
                            aria-label="Open custom color picker"
                        >
                            {isCustomColor ? null : <Plus size={16} className="text-white" aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>
          )}

          {/* Type Input Area */}
          {activeTab === 'type' && (
            <div className="max-w-2xl mx-auto mb-12" id="input-area">
              <div className="relative group">
                <label htmlFor="signature-text-input" className="sr-only">Type your name</label>
                <input
                  id="signature-text-input"
                  type="text"
                  value={inputText}
                  onChange={handleTextChange}
                  placeholder="Type your name..."
                  className="w-full text-center text-5xl md:text-6xl font-serif text-slate-800 dark:text-white py-6 focus:outline-none bg-transparent placeholder-gray-200 dark:placeholder-slate-700 transition-colors font-medium"
                  autoFocus
                />
                <div className="h-px w-full bg-gray-100 dark:bg-slate-800 mt-2"></div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition-opacity cursor-pointer">
                    <button 
                        onClick={() => setInputText('')} 
                        aria-label="Clear text" 
                        className="text-slate-400 dark:text-slate-500"
                    >
                        <RefreshCw size={20} aria-hidden="true" />
                    </button>
                </div>
              </div>
            </div>
          )}
        </div>
        )}

        {/* Content Area */}
        <div id="style-controls" className={`p-8 min-h-[400px] transition-colors duration-300 ${activeTab === 'type' ? 'bg-slate-50/50 dark:bg-slate-900' : 'bg-white dark:bg-slate-900'}`}>
          <Suspense fallback={
              <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                  <Loader2 className="animate-spin mb-4" size={32} />
                  <p>Loading tools...</p>
              </div>
          }>
            {activeTab === 'type' && (
                <TypeMode 
                    text={inputText} 
                    color={selectedColor} 
                    onPreview={handlePreview}
                    onSaveToHistory={handleSaveToHistory}
                    onOpenEmailBuilder={handleOpenEmailBuilder}
                    initialCategory={initialCategory}
                />
            )}
            {activeTab === 'draw' && (
                <DrawMode 
                    color={selectedColor} 
                    onPreview={handlePreview}
                    onSaveToHistory={handleSaveToHistory}
                    onOpenEmailBuilder={handleOpenEmailBuilder}
                />
            )}
            {activeTab === 'scan' && (
                <ScanMode 
                    onPreview={handlePreview}
                    onSaveToHistory={handleSaveToHistory}
                    onOpenEmailBuilder={handleOpenEmailBuilder}
                />
            )}
            {activeTab === 'sign-pdf' && (
                <SignDocumentMode 
                    signatureDataUrl={currentGeneratedSignature}
                />
            )}
           </Suspense>

          <div id="history-section">
             <SignatureHistory history={history} onClear={handleClearHistory} />
          </div>
        </div>

      </div>

      <ContextPreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        signatureDataUrl={previewDataUrl}
      />
      
      <EmailSignatureModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        signatureDataUrl={previewDataUrl}
      />
    </div>
  );
};

export default SignatureGenerator;