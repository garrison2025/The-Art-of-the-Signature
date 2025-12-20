import React from 'react';
import { PenTool, Moon, Sun } from 'lucide-react';
import { PageView } from '../types';

interface HeaderProps {
  onNavigate: (page: PageView) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isDarkMode, toggleTheme }) => {
  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-1.5 rounded-lg transition-colors">
            <PenTool size={20} />
          </div>
          <span className="font-serif text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:opacity-90 transition-opacity">SignCraft</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Generator</button>
          <button onClick={() => onNavigate('blog')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog</button>
          <button onClick={() => onNavigate('about')} className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-yellow-300 transition-colors rounded-full hover:bg-slate-50 dark:hover:bg-slate-800"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;