import React from 'react';
import { PenTool } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <div className="bg-slate-900 text-white p-1 rounded-md">
                <PenTool size={16} />
              </div>
              <span className="font-serif font-bold text-slate-900">SignCraft</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              The professional standard for digital identity. Create secure, beautiful signatures in seconds.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif font-bold text-slate-900 mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-slate-900">Signature Generator</a></li>
              <li><a href="#" className="hover:text-slate-900">Email Signatures</a></li>
              <li><a href="#" className="hover:text-slate-900">Blog</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif font-bold text-slate-900 mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-slate-900">About Us</a></li>
              <li><a href="#" className="hover:text-slate-900">Contact</a></li>
              <li><a href="#" className="hover:text-slate-900">Press</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif font-bold text-slate-900 mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-900">Terms & Conditions</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400">
          <p>© 2025 handwrittensignaturegenerator.org. All rights reserved.</p>
          <div className="flex gap-4">
             {/* Supported styles listing mostly for SEO visual match */}
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