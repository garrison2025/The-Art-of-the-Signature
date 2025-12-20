import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SignatureGenerator from './components/SignatureGenerator';
import Features from './components/Features';
import HowToUse from './components/HowToUse';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Privacy from './components/pages/Privacy';
import Terms from './components/pages/Terms';
import { Star } from 'lucide-react';
import { PageView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <Privacy />;
      case 'terms':
        return <Terms />;
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <div className="relative pt-24 pb-36 px-6 text-center animate-fade-in transition-colors duration-300">
              <div className="inline-flex items-center gap-1.5 bg-yellow-50/80 dark:bg-yellow-900/30 border border-yellow-100 dark:border-yellow-800/50 px-4 py-1.5 rounded-full mb-8 shadow-sm backdrop-blur-sm transition-colors">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-[11px] font-bold text-yellow-700 dark:text-yellow-400 tracking-wide uppercase">Excellent 4.9/5 Average Rating</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-slate-900 dark:text-white mb-8 tracking-tight transition-colors">
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
                
                {/* SEO Styles Footer Block */}
                <div className="py-12 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 transition-colors">
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <h5 className="text-[10px] font-bold tracking-widest text-slate-300 dark:text-slate-600 uppercase mb-6">Supported Signature Styles</h5>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] text-slate-300 dark:text-slate-600 leading-none">
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
                            <span>Cedarville Cursive Signature</span>
                            <span>Shadows Into Light Signature</span>
                            <span>La Belle Aurore Signature</span>
                            <span>Nanum Pen Script Signature</span>
                            <span>Rock Salt Signature</span>
                            <span>Dawning of a New Day Signature</span>
                            <span>Great Vibes Signature</span>
                            <span>Pinyon Script Signature</span>
                            <span>Parisienne Signature</span>
                            <span>Allura Signature</span>
                            <span>Herr Von Muellerhoff Signature</span>
                            <span>Tangerine Signature</span>
                            <span>Petit Formal Script Signature</span>
                            <span>Kristi Signature</span>
                            <span>Rouge Script Signature</span>
                            <span>Alex Brush Signature</span>
                            <span>Sacramento Signature</span>
                            <span>Dancing Script Signature</span>
                            <span>Caveat Signature</span>
                            <span>Yellowtail Signature</span>
                            <span>Marck Script Signature</span>
                        </div>
                    </div>
                </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-200 dark:selection:bg-slate-700 flex flex-col justify-between transition-colors duration-300">
      <Header onNavigate={handleNavigate} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;