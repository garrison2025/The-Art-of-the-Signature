import React from 'react';
import { Download } from 'lucide-react';
import { FONT_OPTIONS } from '../constants';
import { generateSignatureImage, downloadDataUrl } from '../utils/canvasUtils';

interface TypeModeProps {
  text: string;
  color: string;
}

const TypeMode: React.FC<TypeModeProps> = ({ text, color }) => {
  const displayText = text.trim() || "Your Name";

  const handleDownload = (fontIndex: number) => {
    const font = FONT_OPTIONS[fontIndex];
    const dataUrl = generateSignatureImage(displayText, font, color);
    downloadDataUrl(dataUrl, `signature-${font.name.replace(/\s+/g, '-').toLowerCase()}.png`);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FONT_OPTIONS.map((font, index) => (
          <div 
            key={font.name} 
            className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Tag */}
            <div className="absolute top-4 right-4 z-10">
              <span className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded uppercase
                ${font.styleTag === 'CEO Scribble' ? 'text-rose-500 bg-rose-50' : 
                  font.styleTag === 'Handwriting' ? 'text-emerald-500 bg-emerald-50' : 
                  'text-indigo-500 bg-indigo-50'}`}>
                {font.styleTag}
              </span>
            </div>

            {/* Signature Area */}
            <div className="h-48 flex items-center justify-center p-6 bg-white">
              <p 
                style={{ 
                  fontFamily: font.fontFamily, 
                  color: color,
                  fontSize: `${2.5 * font.fontSizeAdjust}rem`
                }}
                className="text-center break-all leading-tight transition-colors duration-300"
              >
                {displayText}
              </p>
            </div>

            {/* Footer / Overlay */}
            <div className="px-6 py-3 border-t border-gray-50 flex items-center justify-between bg-gray-50/50">
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{font.name}</span>
              
              <button 
                onClick={() => handleDownload(index)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeMode;