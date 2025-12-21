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
            <h4 className="font-serif font-bold text-slate-900 dark:text-white mb-4 text-sm transition-colors">Popular Styles</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><Link to="/style/handwriting-signature-generator" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Handwriting Generator</Link></li>
              <li><Link to="/style/cursive-signature-generator" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Cursive Signature</Link></li>
              <li><Link to="/style/calligraphy-signature-generator" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Calligraphy Maker</Link></li>
              <li><Link to="/style/wet-ink-signature-generator" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Wet Ink Style</Link></li>
              <li><Link to="/style/autograph-maker" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Autograph Maker</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif font-bold text-slate-900 dark:text-white mb-4 text-sm transition-colors">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><Link to="/blog" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Blog & Guides</Link></li>
              <li><Link to="/about" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif font-bold text-slate-900 dark:text-white mb-4 text-sm transition-colors">Company</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
               SignCraft is a privacy-first, client-side signature tool. We do not store your data.
            </p>
            <div className="text-xs text-slate-400">
                &copy; {new Date().getFullYear()} SignCraft.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;