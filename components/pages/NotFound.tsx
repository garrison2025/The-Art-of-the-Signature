import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import SEO from '../SEO';

const NotFound: React.FC = () => {
  return (
    <>
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for does not exist." 
      />
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-serif font-bold text-slate-200 dark:text-slate-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Page Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
            to="/" 
            className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
            <Home size={18} /> Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;