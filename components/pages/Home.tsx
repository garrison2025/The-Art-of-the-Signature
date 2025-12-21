import React from 'react';
import { Star, ArrowRight, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
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

  const styles = [
      { name: 'Handwriting', path: '/style/handwriting-signature-generator', desc: 'Natural pen-on-paper look' },
      { name: 'Cursive', path: '/style/cursive-signature-generator', desc: 'Flowing & professional' },
      { name: 'Calligraphy', path: '/style/calligraphy-signature-generator', desc: 'Elegant & formal' },
      { name: 'Wet Ink', path: '/style/wet-ink-signature-generator', desc: 'Realistic texture' },
      { name: 'Autograph', path: '/style/autograph-maker', desc: 'Unique personal mark' },
  ];

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

      {/* Internal Linking / Style Explorer Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-10">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">Explore Signature Styles</h2>
                  <p className="text-slate-500 text-sm">Find the perfect aesthetic for your digital identity.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {styles.map((style) => (
                      <Link 
                        key={style.path} 
                        to={style.path}
                        className="group p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-md transition-all text-center"
                      >
                          <div className="w-10 h-10 mx-auto bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                              <PenTool size={18} />
                          </div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{style.name}</h3>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{style.desc}</p>
                      </Link>
                  ))}
              </div>
          </div>
      </section>

      {/* Informational Sections */}
      <div className="">
          <Features />
          <HowToUse />
          <FAQ />
          
          {/* SEO Styles Footer Block */}
          <div className="py-12 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 transition-colors">
              <div className="max-w-4xl mx-auto text-center px-6">
                  <h5 className="text-[10px] font-bold tracking-widest text-slate-300 dark:text-slate-600 uppercase mb-6">Supported Fonts & Styles</h5>
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