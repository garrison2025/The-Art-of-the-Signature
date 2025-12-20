import React from 'react';
import { PenTool, Moon } from 'lucide-react';
import { PageView } from '../types';

interface HeaderProps {
  onNavigate: (page: PageView) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-slate-900 text-white p-1.5 rounded-lg">
            <PenTool size={20} />
          </div>
          <span className="font-serif text-xl font-bold text-slate-900 tracking-tight">SignCraft</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors">Generator</button>
          <button onClick={() => onNavigate('about')} className="hover:text-slate-900 transition-colors">About Us</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-slate-900 transition-colors">Contact</button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
            <Moon size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;