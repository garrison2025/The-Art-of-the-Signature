import React from 'react';
import { ShieldCheck, Zap, PenTool } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4 transition-colors">Why Use a Handwritten Signature Generator?</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl transition-colors">
                In the digital age, a professional online signature is essential for branding. 
                SignCraft offers a free, secure, and artistically refined solution.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="flex gap-5 items-start">
            <div className="flex-shrink-0 bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm text-slate-900 dark:text-white transition-colors">
                <ShieldCheck size={24} strokeWidth={1.5} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 transition-colors">Secure & Private</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                    Operates entirely in your browser (Client-Side), ensuring zero data leaks. Your signature is never uploaded to a server.
                </p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="flex-shrink-0 bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm text-slate-900 dark:text-white transition-colors">
                <Zap size={24} strokeWidth={1.5} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 transition-colors">Instant Vector Export</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                    Download high-resolution PNGs directly for professional printing, signing PDFs, or email signatures.
                </p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="flex-shrink-0 bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm text-slate-900 dark:text-white transition-colors">
                <PenTool size={24} strokeWidth={1.5} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 transition-colors">Natural Ink Technology</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                    Our font engine simulates real ink velocity and pressure for an authentic feel, distinguishing it from generic text.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;