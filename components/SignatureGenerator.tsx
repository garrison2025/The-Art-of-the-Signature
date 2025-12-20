import React, { useState, useRef } from 'react';
import { Type, PenTool as DrawIcon, RefreshCw, Plus } from 'lucide-react';
import TypeMode from './TypeMode';
import DrawMode from './DrawMode';
import { TabMode } from '../types';
import { SIGNATURE_COLORS } from '../constants';

const SignatureGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabMode>('type');
  const [inputText, setInputText] = useState('');
  const [selectedColor, setSelectedColor] = useState(SIGNATURE_COLORS[0].hex);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleCustomColorClick = () => {
    colorInputRef.current?.click();
  };

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  // Check if the currently selected color is one of the presets
  const isCustomColor = !SIGNATURE_COLORS.some(c => c.hex === selectedColor);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-10 z-10 mb-20">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('type')}
            className={`flex-1 py-6 text-sm font-bold flex items-center justify-center gap-2 transition-all relative
              ${activeTab === 'type' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            <Type size={18} />
            Type
            {activeTab === 'type' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('draw')}
            className={`flex-1 py-6 text-sm font-bold flex items-center justify-center gap-2 transition-all relative
              ${activeTab === 'draw' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            <DrawIcon size={18} />
            Draw
            {activeTab === 'draw' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white"></span>
            )}
          </button>
        </div>

        {/* Controls Area */}
        <div className="p-10 pb-2 bg-white dark:bg-slate-900 transition-colors duration-300">
          
          {/* Color Picker */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-1.5 rounded-full shadow-sm transition-colors">
                {SIGNATURE_COLORS.map((color) => (
                <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 dark:ring-offset-slate-800
                    ${selectedColor === color.hex ? 'ring-slate-900 dark:ring-white scale-105' : 'ring-transparent hover:ring-gray-200 dark:hover:ring-slate-600'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                />
                ))}
                
                {/* Custom Color Button */}
                <div className="relative">
                    <input 
                        ref={colorInputRef}
                        type="color" 
                        className="absolute inset-0 opacity-0 w-0 h-0"
                        onChange={handleColorInputChange}
                        value={selectedColor}
                    />
                    <button 
                        onClick={handleCustomColorClick}
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:opacity-90 transition-all focus:outline-none ring-2 ring-offset-2 dark:ring-offset-slate-800
                        ${isCustomColor ? 'ring-slate-900 dark:ring-white scale-105' : 'ring-transparent hover:ring-gray-200 dark:hover:ring-slate-600 bg-gradient-to-br from-rose-400 to-orange-400'}`}
                        style={isCustomColor ? { backgroundColor: selectedColor } : {}}
                        title="Custom Color"
                    >
                        {isCustomColor ? null : <Plus size={16} className="text-white" />}
                    </button>
                </div>
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
                  className="w-full text-center text-5xl md:text-6xl font-serif text-slate-800 dark:text-white py-6 focus:outline-none bg-transparent placeholder-gray-200 dark:placeholder-slate-700 transition-colors font-medium"
                  autoFocus
                />
                {/* Underline */}
                <div className="h-px w-full bg-gray-100 dark:bg-slate-800 mt-2"></div>
                
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition-opacity cursor-pointer">
                    <RefreshCw size={20} className="text-slate-400 dark:text-slate-500" onClick={() => setInputText('')} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Area (Grid or Canvas) */}
        <div className={`p-8 min-h-[400px] transition-colors duration-300 ${activeTab === 'type' ? 'bg-slate-50/50 dark:bg-slate-950' : 'bg-white dark:bg-slate-900'}`}>
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