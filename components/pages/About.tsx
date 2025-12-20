import React from 'react';
import { PenTool, ShieldCheck, Heart } from 'lucide-react';
import SEO from '../SEO';

const About: React.FC = () => {
  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn about SignCraft, our mission to bring elegant, secure, and privacy-first handwritten signatures to the digital world."
      />
      <div className="max-w-4xl mx-auto px-6 py-20 animate-fade-in transition-colors duration-300">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6 transition-colors">About SignCraft</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto transition-colors">
            We are dedicated to bringing the elegance of handwritten calligraphy to the digital world, providing secure and professional signatures for everyone.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-slate-800 mb-12 transition-colors">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4 transition-colors">Our Story</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 transition-colors">
            Launched in 2025, <strong>Handwritten Signature Generator (SignCraft)</strong> began with a simple observation: in an increasingly digital world, the personal touch of a wet-ink signature was fading. Electronic signatures were becoming standard, but they often lacked character and style.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
            We built SignCraft to bridge this gap. Our tool combines advanced vector rendering technology with the artistry of classic penmanship. Whether you are a CEO needing a quick, authoritative scribble or an artist looking for an elegant watermark, our platform empowers you to create a unique digital identity in seconds.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
              <PenTool size={24} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 transition-colors">Artistry First</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">We obsess over font curves and ink flow simulation to ensure your signature looks authentic.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 transition-colors">Privacy Centric</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">Your signature is personal. We process everything locally in your browser—nothing is stored on our servers.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
              <Heart size={24} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 transition-colors">Forever Free</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">We believe professional branding should be accessible. Our core tools remain free for everyone.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;