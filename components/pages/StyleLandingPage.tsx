import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import SignatureGenerator from '../SignatureGenerator';
import Features from '../Features';
import HowToUse from '../HowToUse';
import FAQ from '../FAQ';
import SEO from '../SEO';
import Breadcrumbs from '../Breadcrumbs';
import { SignatureStyle } from '../../types';

interface StyleConfig {
    title: string;
    description: string;
    h1: string;
    intro: string;
    defaultCategory: SignatureStyle;
}

const STYLE_MAP: Record<string, StyleConfig> = {
    'handwriting-signature-generator': {
        title: 'Free Handwriting Signature Generator',
        description: 'Create a natural-looking handwritten signature online. Our generator mimics real pen pressure and ink flow.',
        h1: 'Handwriting Signature Generator',
        intro: 'Generate an authentic, handwritten-style signature for your documents or email footer.',
        defaultCategory: 'Handwriting'
    },
    'cursive-signature-generator': {
        title: 'Cursive Signature Generator',
        description: 'Professional cursive signature maker. Choose from elegant scripts and casual cursive fonts.',
        h1: 'Cursive Signature Generator',
        intro: 'Add a touch of class with a perfectly flowing cursive signature.',
        defaultCategory: 'Casual'
    },
    'calligraphy-signature-generator': {
        title: 'Calligraphy Signature Generator',
        description: 'Create beautiful calligraphy signatures for free. Perfect for wedding invitations, photography watermarks, and formal documents.',
        h1: 'Calligraphy Signature Maker',
        intro: 'Design an elegant, high-end calligraphy mark that stands out.',
        defaultCategory: 'Elegant'
    },
    'wet-ink-signature-generator': {
        title: 'Wet Ink Signature Generator',
        description: 'Simulate the look of a wet ink signature digitally. Perfect for signing PDFs legally.',
        h1: 'Wet Ink Signature Creator',
        intro: 'Get the look of a real pen-on-paper signature without the scanner.',
        defaultCategory: 'CEO Scribble'
    },
    'autograph-maker': {
        title: 'Free Online Autograph Maker',
        description: 'Design your own personal autograph. Fast, free, and downloadable as PNG.',
        h1: 'Online Autograph Maker',
        intro: 'Create a unique, stylized autograph for your personal brand.',
        defaultCategory: 'Casual'
    }
};

const StyleLandingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const config = slug ? STYLE_MAP[slug] : null;

  if (!config) {
      return <Navigate to="/404" replace />;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": config.title,
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
  };

  return (
    <>
      <SEO 
        title={config.title} 
        description={config.description}
        schema={schema}
        canonicalUrl={`https://handwrittensignaturegenerator.org/style/${slug}`}
      />
      
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: config.h1, path: `/style/${slug}` }]} />
      </div>

      {/* Hero Section */}
      <div className="relative pt-12 pb-24 px-6 text-center animate-fade-in transition-colors duration-300">
        <div className="inline-flex items-center gap-1.5 bg-blue-50/80 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 px-4 py-1.5 rounded-full mb-8 shadow-sm backdrop-blur-sm transition-colors">
          <Star size={14} className="text-blue-500 fill-blue-500" />
          <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 tracking-wide uppercase">Specialized Tool</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">
          {config.h1}
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8 transition-colors">
          {config.intro}
        </p>
      </div>

      {/* Generator Tool - Pre-configured */}
      <SignatureGenerator initialCategory={config.defaultCategory} />

      {/* Informational Sections (Reused) */}
      <div className="mt-20">
          <Features />
          <HowToUse />
          <FAQ />
      </div>
    </>
  );
};

export default StyleLandingPage;