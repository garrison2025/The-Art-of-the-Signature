import React, { Suspense } from 'react';
import { Star, PenTool, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Features from '../Features';
import HowToUse from '../HowToUse';
import FAQ from '../FAQ';
import SEO from '../SEO';

// Lazy load the heavy interactive component
const SignatureGenerator = React.lazy(() => import('../SignatureGenerator'));

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
        title="Free Handwritten Signature Generator | Create Digital Signatures" 
        description="Use the #1 rated handwritten signature generator to create professional digital signatures. Free, secure, and customizable styles for PDFs and emails."
        schema={schema}
      />
      
      {/* Hero Section - This is LCP (Largest Contentful Paint). 
          It contains NO heavy JS, ensuring it paints instantly. */}
      <div className="relative pt-24 pb-36 px-6 text-center animate-fade-in transition-colors duration-300">
        <div className="inline-flex items-center gap-1.5 bg-yellow-50/80 dark:bg-yellow-900/30 border border-yellow-100 dark:border-yellow-800/50 px-4 py-1.5 rounded-full mb-8 shadow-sm backdrop-blur-sm transition-colors">
          <Star size={14} className="text-yellow-500 fill-yellow-500" aria-hidden="true" />
          {/* UPDATED CONTRAST: text-yellow-800 for better accessibility against light background */}
          <span className="text-[11px] font-bold text-yellow-800 dark:text-yellow-400 tracking-wide uppercase">Excellent 4.9/5 Average Rating</span>
        </div>
        
        {/* SEO Optimized H1 */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-slate-900 dark:text-white mb-8 tracking-tight transition-colors">
          <span className="sr-only">Free Handwritten Signature Generator: </span>
          The Art of the <span className="italic text-slate-600 dark:text-slate-400 font-light" style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>Signature</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8 transition-colors">
          Create a professional digital mark with the most realistic <strong className="text-slate-700 dark:text-slate-200 font-medium">handwritten signature generator</strong>. 
          <span className="hidden md:inline"> Customize fonts, slant, and ink texture to design a signature that is uniquely yours.</span>
        </p>
      </div>

      {/* Generator Tool - Lazy Loaded */}
      <div className="min-h-[600px]">
        <Suspense fallback={
          <div className="max-w-6xl mx-auto px-4 h-[500px] flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
             <Loader2 className="animate-spin text-slate-300 mb-4" size={32} />
             <p className="text-slate-400 text-sm">Loading generator tools...</p>
          </div>
        }>
          <SignatureGenerator />
        </Suspense>
      </div>

      {/* SEO Content Block: High Keyword Density Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-gray-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6">Why Choose Our Handwritten Signature Generator?</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    In a digital-first world, typing your name isn't enough. Our <strong>handwritten signature generator</strong> bridges the gap between traditional penmanship and modern digital security.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="prose prose-slate dark:prose-invert">
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Authentic Digital Identity</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                        Unlike basic tools, this <strong>handwritten signature generator</strong> uses advanced vector algorithms to simulate the pressure, velocity, and flow of real ink. Whether you need a cursive autograph or a bold executive scrawl, our tool creates a unique identity asset.
                    </p>
                    <ul className="space-y-2">
                        {['Vector-quality PNG output', 'Transparent backgrounds', 'Real ink texture simulation'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <CheckCircle2 size={14} className="text-blue-500" aria-hidden="true" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="prose prose-slate dark:prose-invert">
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Secure & Client-Side</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                        Most online tools upload your data. Our <strong>handwritten signature generator</strong> is different—it runs 100% in your browser. Your personal signature never leaves your device, making it the safest choice for signing contracts, NDAs, and legal documents.
                    </p>
                     <ul className="space-y-2">
                        {['No server storage', 'Instant download', 'GDPR & CCPA compliant design'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <CheckCircle2 size={14} className="text-green-500" aria-hidden="true" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* Internal Linking / Style Explorer Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-10">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">Explore Styles in our Handwritten Signature Generator</h2>
                  <p className="text-slate-500 text-sm">Find the perfect aesthetic for your digital identity.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {styles.map((style) => (
                      <Link 
                        key={style.path} 
                        to={style.path}
                        className="group p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-md transition-all text-center"
                        aria-label={`Explore ${style.name} Style`}
                      >
                          <div className="w-10 h-10 mx-auto bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                              <PenTool size={18} aria-hidden="true" />
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
                  {/* UPDATED HIERARCHY: Changed h5 to h3 to allow for correct heading structure (h1 -> h2 -> h3) */}
                  <h3 className="text-[10px] font-bold tracking-widest text-slate-300 dark:text-slate-600 uppercase mb-6">Supported Fonts in this Handwritten Signature Generator</h3>
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