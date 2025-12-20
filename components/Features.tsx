import React from 'react';
import { ShieldCheck, Zap, PenTool } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Why Use a Handwritten Signature Generator?</h2>
            <p className="text-slate-600 leading-relaxed max-w-2xl">
                In the digital age, a professional online signature is essential for branding. 
                SignCraft offers a free, secure, and artistically refined solution.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="flex gap-5 items-start">
            <div className="flex-shrink-0 bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-slate-900">
                <ShieldCheck size={24} strokeWidth={1.5} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Secure & Private</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                    Operates entirely in your browser (Client-Side), ensuring zero data leaks. Your signature is never uploaded to a server.
                </p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="flex-shrink-0 bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-slate-900">
                <Zap size={24} strokeWidth={1.5} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Instant Vector Export</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                    Download high-resolution PNGs directly for professional printing, signing PDFs, or email signatures.
                </p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="flex-shrink-0 bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-slate-900">
                <PenTool size={24} strokeWidth={1.5} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Natural Ink Technology</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
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