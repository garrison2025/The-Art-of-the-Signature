import React, { useState } from 'react';
import { Type, PenTool as DrawIcon, RefreshCw } from 'lucide-react';
import TypeMode from './TypeMode';
import DrawMode from './DrawMode';
import { TabMode } from '../types';
import { SIGNATURE_COLORS } from '../constants';

const SignatureGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabMode>('type');
  const [inputText, setInputText] = useState('');
  const [selectedColor, setSelectedColor] = useState(SIGNATURE_COLORS[0].hex);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-10 z-10 mb-20">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('type')}
            className={`flex-1 py-6 text-sm font-bold flex items-center justify-center gap-2 transition-all relative
              ${activeTab === 'type' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Type size={18} />
            Type
            {activeTab === 'type' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('draw')}
            className={`flex-1 py-6 text-sm font-bold flex items-center justify-center gap-2 transition-all relative
              ${activeTab === 'draw' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <DrawIcon size={18} />
            Draw
            {activeTab === 'draw' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900"></span>
            )}
          </button>
        </div>

        {/* Controls Area */}
        <div className="p-10 pb-2 bg-white">
          
          {/* Color Picker */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-2 bg-white border border-gray-100 p-1.5 rounded-full shadow-sm">
                {SIGNATURE_COLORS.map((color) => (
                <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2
                    ${selectedColor === color.hex ? 'ring-slate-900 scale-105' : 'ring-transparent hover:ring-gray-200'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                />
                ))}
                {/* Add button placeholder from screenshot */}
                <button className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 text-white flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity">
                    <span className="text-sm font-bold">+</span>
                </button>
            </div>
          </div>

          {/* Type Input Area */}
          {activeTab === 'type' && (
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative group">
                <input
                  type="text"
                  value={inputText}
                  onChange={handleTextChange}
                  placeholder="Type your name..."
                  className="w-full text-center text-5xl md:text-6xl font-serif text-slate-800 py-6 focus:outline-none bg-transparent placeholder-gray-200 transition-colors font-medium"
                  autoFocus
                />
                {/* Underline */}
                <div className="h-px w-full bg-gray-100 mt-2"></div>
                
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition-opacity cursor-pointer">
                    <RefreshCw size={20} className="text-slate-400" onClick={() => setInputText('')} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Area (Grid or Canvas) */}
        <div className={`p-8 min-h-[400px] ${activeTab === 'type' ? 'bg-slate-50/50' : 'bg-white'}`}>
          {activeTab === 'type' ? (
            <TypeMode text={inputText} color={selectedColor} />
          ) : (
            <DrawMode color={selectedColor} />
          )}
        </div>

      </div>
    </div>
  );
};

export default SignatureGenerator;