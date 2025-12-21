import React from 'react';
import { Star } from 'lucide-react';
import SignatureGenerator from '../SignatureGenerator';
import Features from '../Features';
import HowToUse from '../HowToUse';
import FAQ from '../FAQ';
import SEO from '../SEO';

const Home: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SignCraft Handwritten Signature Generator",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1250"
    }
  };

  return (
    <>
      <SEO 
        title="Free Handwritten Signature Generator" 
        description="Create a professional handwritten signature online. Free, secure, and no sign-up required. Download as PNG or sign PDFs directly."
        schema={schema}
      />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-36 px-6 text-center animate-fade-in transition-colors duration-300">
        <div className="inline-flex items-center gap-1.5 bg-yellow-50/80 dark:bg-yellow-900/30 border border-yellow-100 dark:border-yellow-800/50 px-4 py-1.5 rounded-full mb-8 shadow-sm backdrop-blur-sm transition-colors">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-[11px] font-bold text-yellow-700 dark:text-yellow-400 tracking-wide uppercase">Excellent 4.9/5 Average Rating</span>
        </div>
        
        {/* SEO Optimized H1: Visually keeps the artistic design, but reads as a keyword-rich H1 to screen readers/bots */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-slate-900 dark:text-white mb-8 tracking-tight transition-colors">
          <span className="sr-only">Free Handwritten Signature Generator: </span>
          The Art of the <span className="italic text-slate-600 dark:text-slate-400 font-light" style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>Signature</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8 transition-colors">
          Experience the most realistic <strong className="text-slate-700 dark:text-slate-200 font-medium">handwritten signature generator</strong> online.<br className="hidden md:block"/>
          Create a professional, secure digital mark in seconds.
        </p>
      </div>

      {/* Generator Tool */}
      <SignatureGenerator />

      {/* Informational Sections */}
      <div className="mt-20">
          <Features />
          <HowToUse />
          <FAQ />
          
          {/* SEO Styles Footer Block */}
          <div className="py-12 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 transition-colors">
              <div className="max-w-4xl mx-auto text-center px-6">
                  <h5 className="text-[10px] font-bold tracking-widest text-slate-300 dark:text-slate-600 uppercase mb-6">Supported Signature Styles</h5>
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] text-slate-300 dark:text-slate-600 leading-none">
                      <span>Dr Sugiyama</span>
                      <span>Birthstone Signature</span>
                      <span>Just Me Again Down Here</span>
                      <span>Comforter Brush</span>
                      <span>WindSong</span>
                      <span>Monsieur La Doulaise</span>
                      <span>Mrs Saint Delafield</span>
                      <span>Qwigley</span>
                      <span>Reenie Beanie</span>
                      <span>Waiting for the Sunrise</span>
                      <span>Nothing You Could Do</span>
                      <span>Zeyada</span>
                      <span>Homemade Apple</span>
                      <span>Cedarville Cursive</span>
                      <span>Shadows Into Light</span>
                      <span>La Belle Aurore</span>
                      <span>Nanum Pen Script</span>
                      <span>Rock Salt</span>
                      <span>Gloria Hallelujah</span>
                      <span>Dawning of a New Day</span>
                      <span>Great Vibes</span>
                      <span>Pinyon Script</span>
                      <span>Parisienne</span>
                      <span>Explora Signature</span>
                      <span>Allura</span>
                      <span>Herr Von Muellerhoff</span>
                      <span>Tangerine</span>
                      <span>Petit Formal Script</span>
                      <span>Kristi</span>
                      <span>Italianno</span>
                      <span>Rouge Script</span>
                      <span>Rochester</span>
                      <span>Sacramento</span>
                      <span>Dancing Script</span>
                      <span>Caveat</span>
                      <span>Clicker Script</span>
                      <span>Yellowtail</span>
                      <span>Marck Script</span>
                      <span>Euphoria Script</span>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default Home;