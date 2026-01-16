import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import SignatureGenerator from '../SignatureGenerator';
import Features from '../Features';
import HowToUse from '../HowToUse';
import FAQ, { FAQItem } from '../FAQ';
import SEO from '../SEO';
import Breadcrumbs from '../Breadcrumbs';
import { SignatureStyle } from '../../types';

interface StyleConfig {
    title: string;
    description: string;
    h1: string;
    intro: string;
    defaultCategory: SignatureStyle;
    faqs: FAQItem[];
}

const STYLE_MAP: Record<string, StyleConfig> = {
    'handwriting-signature-generator': {
        title: 'Free Handwriting Signature Generator',
        description: 'Create a natural-looking handwritten signature online. Our generator mimics real pen pressure and ink flow.',
        h1: 'Handwriting Signature Generator',
        intro: 'Generate an authentic, handwritten-style signature for your documents or email footer.',
        defaultCategory: 'Handwriting',
        faqs: [
            {
                question: "How do I create a handwritten signature without a scanner?",
                answer: "You can use our **Handwriting Signature Generator** in 'Type' mode to select from over 30 handwritten fonts, or use 'Draw' mode to sign directly on your touchscreen or trackpad."
            },
            {
                question: "Can I use this handwritten signature for legal documents?",
                answer: "Yes, generally. Electronic signatures created with our tool demonstrate intent and are widely accepted for business contracts, though specific high-security documents (like wills) may require wet ink."
            },
            {
                question: "How do I remove the background from my signature?",
                answer: "Our tool automatically creates a **transparent background** PNG. You don't need Photoshop—just download and place it directly into Word or Google Docs."
            }
        ]
    },
    'cursive-signature-generator': {
        title: 'Cursive Signature Generator',
        description: 'Professional cursive signature maker. Choose from elegant scripts and casual cursive fonts.',
        h1: 'Cursive Signature Generator',
        intro: 'Add a touch of class with a perfectly flowing cursive signature.',
        defaultCategory: 'Casual',
        faqs: [
            {
                question: "Is a cursive signature legally required?",
                answer: "No, a signature does not technically have to be cursive to be legal. However, a **cursive signature** is harder to forge and looks more professional on contracts than printed text."
            },
            {
                question: "Which cursive font looks most like real handwriting?",
                answer: "We recommend fonts like **Caveat**, **Cedarville Cursive**, or **Homemade Apple** in our generator for a casual, authentic look. For formal needs, try **Great Vibes**."
            },
            {
                question: "Can I change the slant of the cursive text?",
                answer: "Yes! Use the 'Slant' slider in our **Cursive Signature Generator** to tilt your signature forward or backward, adding personal flair."
            }
        ]
    },
    'calligraphy-signature-generator': {
        title: 'Calligraphy Signature Generator',
        description: 'Create beautiful calligraphy signatures for free. Perfect for wedding invitations, photography watermarks, and formal documents.',
        h1: 'Calligraphy Signature Maker',
        intro: 'Design an elegant, high-end calligraphy mark that stands out.',
        defaultCategory: 'Elegant',
        faqs: [
            {
                question: "What is the best font for a calligraphy signature?",
                answer: "For high-end elegance, fonts like **Great Vibes**, **Allura**, and **Pinyon Script** are top choices in our library. They feature widely looped ascenders perfect for formal use."
            },
            {
                question: "Can I use this as a watermark for photography?",
                answer: "Absolutely. Generate your **calligraphy signature**, download the transparent PNG, and overlay it on your photos using any editor. It works perfectly as a watermark."
            },
            {
                question: "Is this tool free for wedding invitations?",
                answer: "Yes, you can generate unlimited **calligraphy signatures** for free to use on wedding invites, save-the-dates, or thank you cards."
            }
        ]
    },
    'wet-ink-signature-generator': {
        title: 'Wet Ink Signature Generator',
        description: 'Simulate the look of a wet ink signature digitally. Perfect for signing PDFs legally.',
        h1: 'Wet Ink Signature Creator',
        intro: 'Get the look of a real pen-on-paper signature without the scanner.',
        defaultCategory: 'CEO Scribble',
        faqs: [
            {
                question: "What is a 'Wet Ink' style signature?",
                answer: "A **Wet Ink** style mimics the imperfections, pressure variations, and slight bleeding of a real pen on paper, making digital documents look like they were physically signed and scanned."
            },
            {
                question: "How do I make my digital signature look realistic?",
                answer: "Enable the **'Ink Texture'** toggle in our generator. This adds subtle noise and roughness to the lines, removing the 'perfect' digital look."
            },
            {
                question: "Is it better to use Blue or Black ink?",
                answer: "We recommend using **Navy Blue** (#1e293b). In the legal world, blue ink is often used to distinguish an original 'wet' signature from a black-and-white photocopy."
            }
        ]
    },
    'autograph-maker': {
        title: 'Free Online Autograph Maker',
        description: 'Design your own personal autograph. Fast, free, and downloadable as PNG.',
        h1: 'Online Autograph Maker',
        intro: 'Create a unique, stylized autograph for your personal brand.',
        defaultCategory: 'Casual',
        faqs: [
            {
                question: "What is the difference between a signature and an autograph?",
                answer: "A signature is primarily for legal identification, while an **autograph** is a stylized, often artistic representation of a name, typically used by celebrities or for personal branding."
            },
            {
                question: "Can I use this autograph for my merchandise?",
                answer: "Yes. You own the PNG image you generate. It's perfect for t-shirts, business cards, or email footers to build your personal brand."
            },
            {
                question: "How do I create a unique autograph?",
                answer: "Try using our 'Draw' mode to experiment with fast, sweeping strokes, or pick a stylized font like **Dr Sugiyama** for a fast, celebrity-style look."
            }
        ]
    }
};

const StyleLandingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const config = slug ? STYLE_MAP[slug] : null;

  if (!config) {
      return <Navigate to="/404" replace />;
  }

  // Dynamic Schema Construction with HowTo
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": config.title,
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web Browser",
        "url": `https://handwrittensignaturegenerator.org/style/${slug}`,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
      },
      {
        "@type": "HowTo",
        "name": `How to Generate a ${config.h1.replace('Generator', 'Signature').replace('Maker', 'Signature')}`,
        "description": `A simple guide to creating a ${config.defaultCategory.toLowerCase()} style signature using our free tool.`,
        "step": [
          {
            "@type": "HowToStep",
            "name": "Enter Name",
            "text": `Type your name into the input field to see it rendered in various ${config.defaultCategory.toLowerCase()} fonts.`,
            "url": `https://handwrittensignaturegenerator.org/style/${slug}`
          },
          {
            "@type": "HowToStep",
            "name": "Select Style",
            "text": `Browse the ${config.defaultCategory} category and pick the font that best matches your personal brand.`,
            "url": `https://handwrittensignaturegenerator.org/style/${slug}`
          },
          {
            "@type": "HowToStep",
            "name": "Customize & Download",
            "text": "Adjust color and size, then click 'PNG' to download your transparent signature asset.",
            "url": `https://handwrittensignaturegenerator.org/style/${slug}`
          }
        ]
      }
    ]
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
          {/* Inject Custom FAQs for SEO Relevance */}
          <FAQ customItems={config.faqs} title={`FAQ: ${config.h1}`} />
      </div>
    </>
  );
};

export default StyleLandingPage;