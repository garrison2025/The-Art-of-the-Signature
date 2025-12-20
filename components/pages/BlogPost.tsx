import React, { useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, Facebook, Linkedin, Link as LinkIcon, PenTool } from 'lucide-react';
import { BlogPost as BlogPostType, PageView } from '../../types';

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
  onNavigate: (page: PageView) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack, onNavigate }) => {
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href
      }).catch(console.error);
    } else {
        // Fallback or copy link
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard');
    }
  };

  return (
    <article className="animate-fade-in bg-[#f8f9fa] dark:bg-slate-950 min-h-screen">
      
      {/* Progress Bar (Optional simple implementation) */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
          <div className="h-full bg-blue-600 w-0" id="scroll-progress"></div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Nav Back */}
        <button 
            onClick={onBack}
            className="group flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors"
        >
            <div className="bg-white dark:bg-slate-800 p-2 rounded-full mr-3 shadow-sm group-hover:-translate-x-1 transition-transform border border-gray-100 dark:border-slate-700">
                <ArrowLeft size={16} />
            </div>
            Back to Blog
        </button>

        {/* Header */}
        <header className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                Guide
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-800 pb-8">
                <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                </div>
            </div>
        </header>

        {/* Cover Image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg mb-12">
            <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover"
            />
        </div>

        {/* Content Body */}
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none 
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
            prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-8
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 dark:prose-strong:text-white
            prose-li:text-slate-600 dark:prose-li:text-slate-300
            prose-img:rounded-xl prose-img:shadow-md
        ">
            {post.content}
        </div>

        {/* Footer / Share */}
        <div className="border-t border-gray-200 dark:border-slate-800 mt-16 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Share this article</h3>
                    <p className="text-sm text-slate-500">Help others create their mark.</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleShare} className="p-3 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all shadow-sm border border-gray-100 dark:border-slate-700">
                        <Facebook size={20} />
                    </button>
                    <button onClick={handleShare} className="p-3 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-500 hover:scale-110 transition-all shadow-sm border border-gray-100 dark:border-slate-700">
                        <Linkedin size={20} />
                    </button>
                    <button onClick={handleShare} className="p-3 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:scale-110 transition-all shadow-sm border border-gray-100 dark:border-slate-700">
                        <LinkIcon size={20} />
                    </button>
                </div>
            </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-slate-900 dark:bg-blue-600 rounded-2xl p-8 md:p-12 text-center shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10">
                <PenTool size={48} className="mx-auto text-white/80 mb-6 group-hover:rotate-12 transition-transform duration-500" />
                <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to create your signature?</h2>
                <p className="text-slate-300 dark:text-blue-100 mb-8 max-w-lg mx-auto">
                    Put this knowledge into practice. Use our free tool to generate a professional handwritten signature in seconds.
                </p>
                <button 
                    onClick={() => onNavigate('home')}
                    className="bg-white text-slate-900 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg"
                >
                    Launch Generator
                </button>
            </div>
        </div>

      </div>
    </article>
  );
};

export default BlogPost;