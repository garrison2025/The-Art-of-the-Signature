import React from 'react';
import { PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link 
              to="/" 
              className="flex items-center gap-2 mb-4 cursor-pointer group"
            >
               <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-1 rounded-md transition-colors">
                <PenTool size={16} />
              </div>
              <span className="font-serif font-bold text-slate-900 dark:text-white transition-colors">SignCraft</span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The professional standard for digital identity. Create secure, beautiful signatures in seconds.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif font-bold text-slate-900 dark:text-white mb-4 text-sm transition-colors">Product</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><Link to="/" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Signature Generator</Link></li>
              <li><Link to="/blog" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Blog & Guides</Link></li>
              <li><Link to="/" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Email Signatures</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif font-bold text-slate-900 dark:text-white mb-4 text-sm transition-colors">Company</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif font-bold text-slate-900 dark:text-white mb-4 text-sm transition-colors">Legal</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><Link to="/privacy" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 dark:text-slate-600 transition-colors">
          <p>© 2025 handwrittensignaturegenerator.org. All rights reserved.</p>
          <div className="flex gap-4">
             {/* Supported styles listing for SEO */}
             <span>Dr Sugiyama</span>
             <span className="hidden md:inline">·</span>
             <span>Dancing Script</span>
             <span className="hidden md:inline">·</span>
             <span>WindSong</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;