import React, { useState } from 'react';
import { Download, Sliders, MoveHorizontal, Bold, Italic, Maximize, Check, Eye, FileJson, Mail } from 'lucide-react';
import { FONT_OPTIONS } from '../constants';
import { generateSignatureImage, downloadDataUrl } from '../utils/canvasUtils';
import { generateTypeSVG, downloadSVG } from '../utils/exportUtils';
import { TypeSignatureConfig, SignatureStyle } from '../types';

interface TypeModeProps {
  text: string;
  color: string;
  onPreview: (dataUrl: string) => void;
  onSaveToHistory: (dataUrl: string) => void;
  onOpenEmailBuilder: (dataUrl: string) => void;
}

const TypeMode: React.FC<TypeModeProps> = ({ text, color, onPreview, onSaveToHistory, onOpenEmailBuilder }) => {
  const displayText = text.trim() || "Your Name";
  
  // Customization State
  const [slant, setSlant] = useState(0); // -20 to 20
  const [spacing, setSpacing] = useState(0); // -2 to 10
  const [weight, setWeight] = useState(400); // 400 to 900
  
  // Export/Preview State
  const [trim, setTrim] = useState(true);
  const [texture, setTexture] = useState(false); // New: Ink Realism
  const [showPreviewLine, setShowPreviewLine] = useState(false);
  const [bgColor, setBgColor] = useState<'transparent' | '#ffffff' | '#000000'>('transparent');
  
  // Filtering
  const [activeCategory, setActiveCategory] = useState<SignatureStyle | 'All'>('All');

  const getConfig = (): TypeSignatureConfig => ({
        text: displayText,
        color,
        slant,
        spacing,
        weight,
        trim,
        texture,
        backgroundColor: bgColor
  });

  const handleDownload = (fontIndex: number) => {
    const font = FONT_OPTIONS[fontIndex];
    const config = getConfig();
    const dataUrl = generateSignatureImage(font, config);
    onSaveToHistory(dataUrl);
    downloadDataUrl(dataUrl, `signature-${font.name.replace(/\s+/g, '-').toLowerCase()}.png`);
  };

  const handleDownloadSVG = (fontIndex: number) => {
      const font = FONT_OPTIONS[fontIndex];
      const config = getConfig();
      const svgString = generateTypeSVG(font, config);
      downloadSVG(svgString, `signature-${font.name.replace(/\s+/g, '-').toLowerCase()}.svg`);
  };

  const handleEmailSig = (fontIndex: number) => {
      const font = FONT_OPTIONS[fontIndex];
      const config = getConfig();
      const dataUrl = generateSignatureImage(font, config);
      onSaveToHistory(dataUrl);
      onOpenEmailBuilder(dataUrl);
  };

  const handlePreviewClick = (fontIndex: number) => {
      const font = FONT_OPTIONS[fontIndex];
      const config = getConfig();
      const dataUrl = generateSignatureImage(font, config);
      onPreview(dataUrl);
  };

  const filteredFonts = activeCategory === 'All' 
    ? FONT_OPTIONS 
    : FONT_OPTIONS.filter(f => f.styleTag === activeCategory);

  const categories: (SignatureStyle | 'All')[] = ['All', 'Handwriting', 'CEO Scribble', 'Elegant', 'Casual'];

  return (
    <div className="w-full animate-fade-in">
      
      {/* Customization Toolbar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-4 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            {/* Sliders Group */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {/* Slant */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                        <span className="flex items-center gap-1"><Italic size={12} /> Slant</span>
                        <span>{slant}°</span>
                    </div>
                    <input type="range" min="-15" max="15" step="1" value={slant} onChange={(e) => setSlant(Number(e.target.value))} className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white" />
                </div>
                {/* Spacing */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                        <span className="flex items-center gap-1"><MoveHorizontal size={12} /> Spacing</span>
                        <span>{spacing}px</span>
                    </div>
                    <input type="range" min="-2" max="5" step="0.5" value={spacing} onChange={(e) => setSpacing(Number(e.target.value))} className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white" />
                </div>
                {/* Weight */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                        <span className="flex items-center gap-1"><Bold size={12} /> Weight</span>
                        <span>{weight}</span>
                    </div>
                    <input type="range" min="300" max="900" step="100" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white" />
                </div>
            </div>

            <div className="w-px h-10 bg-gray-100 dark:bg-slate-700 hidden md:block"></div>

            {/* Toggles Group */}
            <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-600 dark:text-slate-300">
                <button onClick={() => setTexture(!texture)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${texture ? 'bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-white' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`} title="Add realistic ink imperfections">
                   {texture ? <Check size={14} /> : <div className="w-3.5 h-3.5" />} Ink Texture
                </button>
                <button onClick={() => setShowPreviewLine(!showPreviewLine)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${showPreviewLine ? 'bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-white' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                   {showPreviewLine ? <Check size={14} /> : <div className="w-3.5 h-3.5" />} Sign Line
                </button>
                <button onClick={() => setTrim(!trim)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${trim ? 'bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-white' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                   {trim ? <Check size={14} /> : <div className="w-3.5 h-3.5" />} Auto-Trim
                </button>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-900 p-1 rounded-lg">
                    <button onClick={() => setBgColor('transparent')} className={`w-6 h-6 rounded flex items-center justify-center border ${bgColor === 'transparent' ? 'bg-white shadow-sm border-gray-200' : 'border-transparent opacity-50'}`}><div className="w-3 h-3 bg-gray-300 rounded-full" style={{backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)', backgroundSize: '4px 4px'}}></div></button>
                    <button onClick={() => setBgColor('#ffffff')} className={`w-6 h-6 rounded border bg-white ${bgColor === '#ffffff' ? 'shadow-sm border-gray-300 ring-1 ring-slate-200' : 'border-transparent opacity-50'}`}></button>
                    <button onClick={() => setBgColor('#000000')} className={`w-6 h-6 rounded border bg-black ${bgColor === '#000000' ? 'shadow-sm border-gray-600 ring-1 ring-slate-700' : 'border-transparent opacity-50'}`}></button>
                </div>
            </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all
                ${activeCategory === cat 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' 
                    : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 border border-gray-100 dark:border-slate-700'}`}
              >
                  {cat}
              </button>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFonts.map((font, index) => {
            // Find original index in full list for handlers
            const realIndex = FONT_OPTIONS.indexOf(font);
            return (
          <div 
            key={font.name} 
            className="group relative bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 overflow-hidden"
          >
            {/* Tag */}
            <div className="absolute top-4 right-4 z-10">
              <span className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded uppercase
                ${font.styleTag === 'CEO Scribble' ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 
                  font.styleTag === 'Handwriting' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 
                  'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'}`}>
                {font.styleTag}
              </span>
            </div>

            {/* Signature Area */}
            <div 
                className="h-48 flex items-center justify-center p-6 bg-white dark:bg-slate-800 relative cursor-pointer"
                onClick={() => handlePreviewClick(realIndex)}
            >
              {showPreviewLine && (
                  <div className="absolute w-2/3 bottom-12 border-b-2 border-slate-100 dark:border-slate-700 flex justify-between items-end pb-1">
                      <span className="text-[10px] text-slate-300 uppercase font-bold tracking-widest">Sign Here</span>
                      <span className="text-[10px] text-slate-200 text-xl leading-none">x</span>
                  </div>
              )}

              <p 
                style={{ 
                  fontFamily: font.fontFamily, 
                  color: color,
                  fontSize: `${2.5 * font.fontSizeAdjust}rem`,
                  transform: `skewX(-${slant}deg)`,
                  letterSpacing: `${spacing}px`,
                  fontWeight: weight,
                  opacity: texture ? 0.9 : 1
                }}
                className={`text-center break-all leading-tight transition-all duration-200 relative z-10 ${texture ? 'mix-blend-multiply dark:mix-blend-normal' : ''}`}
              >
                {displayText}
              </p>

              <div className="absolute inset-0 bg-slate-900/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                      <Eye size={12} /> Test Drive
                  </div>
              </div>
            </div>

            {/* Footer / Overlay */}
            <div className="px-4 py-3 border-t border-gray-50 dark:border-slate-700 flex items-center justify-between bg-gray-50/50 dark:bg-slate-900/30">
              <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 tracking-widest uppercase truncate max-w-[100px]">{font.name}</span>
              
              <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); handleEmailSig(realIndex); }} className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-800 border border-transparent transition-all" title="Create Email Signature"><Mail size={14} /></button>
                  <button onClick={(e) => { e.stopPropagation(); handleDownloadSVG(realIndex); }} className="flex items-center gap-1 text-[10px] font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white px-2 py-1.5 rounded hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-gray-200 dark:hover:border-slate-600 transition-all" title="Download Vector SVG"><FileJson size={12} /> SVG</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDownload(realIndex); }} className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 px-3 py-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 transition-all"><Download size={14} /> PNG</button>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default TypeMode;