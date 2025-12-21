import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FontLoader from './components/FontLoader';
import { Loader2 } from 'lucide-react';
import Home from './components/pages/Home'; // Imported directly to prevent LCP flash

// Lazy Load Secondary Pages to reduce initial bundle size
const About = React.lazy(() => import('./components/pages/About'));
const Contact = React.lazy(() => import('./components/pages/Contact'));
const Privacy = React.lazy(() => import('./components/pages/Privacy'));
const Terms = React.lazy(() => import('./components/pages/Terms'));
const BlogList = React.lazy(() => import('./components/pages/BlogList'));
const BlogPost = React.lazy(() => import('./components/pages/BlogPost'));
const NotFound = React.lazy(() => import('./components/pages/NotFound'));
const StyleLandingPage = React.lazy(() => import('./components/pages/StyleLandingPage'));

// Lazy load non-critical UI components
const OnboardingTour = React.lazy(() => import('./components/OnboardingTour'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Loader2 className="animate-spin text-slate-300" size={32} />
  </div>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-200 dark:selection:bg-slate-700 flex flex-col justify-between transition-colors duration-300">
      <FontLoader />
      
      {/* Defer loading of tour logic */}
      <Suspense fallback={null}>
        <OnboardingTour />
      </Suspense>

      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/style/:slug" element={<StyleLandingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;