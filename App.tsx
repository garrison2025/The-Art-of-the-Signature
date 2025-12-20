import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SignatureGenerator from './components/SignatureGenerator';
import Features from './components/Features';
import HowToUse from './components/HowToUse';
import { Star } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans selection:bg-slate-200">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative pt-24 pb-36 px-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-yellow-50/80 border border-yellow-100 px-4 py-1.5 rounded-full mb-8 shadow-sm backdrop-blur-sm">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[11px] font-bold text-yellow-700 tracking-wide uppercase">Excellent 4.9/5 Average Rating</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-slate-900 mb-8 tracking-tight">
            The Art of the <span className="italic text-slate-600 font-light" style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>Signature</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed mb-8">
            Experience the most realistic <strong className="text-slate-700 font-medium">handwritten signature generator</strong> online.<br className="hidden md:block"/>
            Create a professional, secure digital mark in seconds.
          </p>
        </div>

        {/* Generator Tool */}
        <SignatureGenerator />

        {/* Informational Sections */}
        <div className="mt-20">
             <Features />
             <HowToUse />
             
             {/* SEO Styles Footer Block */}
             <div className="py-12 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h5 className="text-[10px] font-bold tracking-widest text-slate-300 uppercase mb-6">Supported Signature Styles</h5>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] text-slate-300 leading-none">
                        <span>Dr Sugiyama Signature</span>
                        <span>Comforter Brush Signature</span>
                        <span>WindSong Signature</span>
                        <span>Monsieur La Doulaise Signature</span>
                        <span>Mrs Saint Delafield Signature</span>
                        <span>Qwigley Signature</span>
                        <span>Reenie Beanie Signature</span>
                        <span>Waiting for the Sunrise Signature</span>
                        <span>Nothing You Could Do Signature</span>
                        <span>Zeyada Signature</span>
                        <span>Homemade Apple Signature</span>
                        <span>Covered By Your Grace Signature</span>
                        <span>Just Me Again Down Here Signature</span>
                        <span>La Belle Aurore Signature</span>
                        <span>Meddon Signature</span>
                        <span>Great Vibes Signature</span>
                        <span>Pinyon Script Signature</span>
                        <span>Parisienne Signature</span>
                        <span>Allura Signature</span>
                        <span>Herr Von Muellerhoff Signature</span>
                        <span>Alex Brush Signature</span>
                        <span>Sacramento Signature</span>
                        <span>Dancing Script Signature</span>
                        <span>Caveat Signature</span>
                        <span>Gloria Hallelujah Signature</span>
                    </div>
                </div>
             </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;