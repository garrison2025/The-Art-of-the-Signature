import React, { useEffect, useState, useRef } from 'react';
import { Clock, Calendar, Facebook, Linkedin, Link as LinkIcon, PenTool, List, ArrowRight } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../../data/blogPosts';
import SEO from '../SEO';
import Breadcrumbs from '../Breadcrumbs';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  // ToC State
  const [toc, setToc] = useState<{id: string, text: string, level: number}[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll Progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Scroll Progress Handler
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate ToC & IDs
  useEffect(() => {
    if (contentRef.current) {
        const headings = contentRef.current.querySelectorAll('h2, h3');
        const items: {id: string, text: string, level: number}[] = [];
        
        headings.forEach((heading, index) => {
            const text = heading.textContent || '';
            // Create a slug from text, or fallback to index if empty
            const id = text
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-') || `heading-${index}`;
            
            heading.id = id; // Assign ID to DOM element for anchoring
            
            // Add scroll-margin-top to handle sticky header offset
            (heading as HTMLElement).style.scrollMarginTop = '100px';

            items.push({
                id,
                text,
                level: heading.tagName === 'H2' ? 2 : 3
            });
        });
        
        setToc(items);
    }
  }, [slug, post]); // Re-run when post changes

  // Scroll Spy (Active ToC Item)
  useEffect(() => {
      const observer = new IntersectionObserver(
          (entries) => {
              entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                      setActiveId(entry.target.id);
                  }
              });
          },
          { rootMargin: '-100px 0px -60% 0px' }
      );

      const headings = contentRef.current?.querySelectorAll('h2, h3');
      headings?.forEach((h) => observer.observe(h));

      return () => observer.disconnect();
  }, [toc]);

  if (!post) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] dark:bg-slate-950">
              <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Article Not Found</h2>
                  <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
              </div>
          </div>
      );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href
      }).catch(console.error);
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard');
    }
  };

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Update active ID immediately for better UX
          setActiveId(id);
      }
  };

  // Logic for Related Posts (Show 3 most recent that are not the current one)
  const relatedPosts = BLOG_POSTS
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.coverImage],
    "datePublished": post.date, 
    "author": [{
        "@type": "Organization",
        "name": "SignCraft Team",
        "url": "https://handwrittensignaturegenerator.org"
    }]
  };

  return (
    <article className="animate-fade-in bg-[#f8f9fa] dark:bg-slate-950 min-h-screen">
      <SEO 
        title={post.title}
        description={post.excerpt}
        type="article"
        image={post.coverImage}
        schema={articleSchema}
      />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[60] bg-transparent">
          <div 
            className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-150 ease-out" 
            style={{ width: `${scrollProgress * 100}%` }}
          ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
            { label: 'Blog', path: '/blog' },
            { label: post.title, path: `/blog/${post.slug}` }
        ]} />

        {/* Header Block */}
        <header className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                Guide
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-800 pb-8">
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
        <div className="max-w-5xl mx-auto relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl mb-16 bg-slate-100 dark:bg-slate-800">
            <img 
                src={post.coverImage} 
                alt={post.title}
                width="1200"
                height="675"
                className="w-full h-full object-cover"
                loading="eager"
            />
        </div>

        {/* Grid Layout: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
            
            {/* Sidebar (Desktop ToC) - Spans 3 cols */}
            <aside className="hidden lg:block lg:col-span-3 lg:col-start-1">
                <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin">
                    <div className="mb-4 flex items-center gap-2 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                        <List size={16} /> Table of Contents
                    </div>
                    <nav className="border-l-2 border-gray-100 dark:border-slate-800">
                        {toc.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => handleTocClick(e, item.id)}
                                className={`block pl-4 py-2 text-sm transition-all duration-200 border-l-2 -ml-0.5
                                ${activeId === item.id 
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium' 
                                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                }
                                ${item.level === 3 ? 'ml-2 text-xs opacity-90' : ''}
                                `}
                            >
                                {item.text}
                            </a>
                        ))}
                    </nav>

                    {/* Quick Share in Sidebar */}
                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-3">Share</p>
                        <div className="flex gap-2">
                            <button onClick={handleShare} className="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-white border border-gray-200 dark:border-slate-700 transition-colors" aria-label="Share">
                                <LinkIcon size={16} />
                            </button>
                            <button onClick={handleShare} className="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-white border border-gray-200 dark:border-slate-700 transition-colors" aria-label="Share on Facebook">
                                <Facebook size={16} />
                            </button>
                            <button onClick={handleShare} className="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-white border border-gray-200 dark:border-slate-700 transition-colors" aria-label="Share on LinkedIn">
                                <Linkedin size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content - Spans 8 cols (Centered relative to 12) */}
            <div className="lg:col-span-8 lg:col-start-4">
                
                {/* Mobile ToC (Collapsible or Block) */}
                <div className="lg:hidden bg-slate-50 dark:bg-slate-900 rounded-xl p-6 mb-8 border border-gray-200 dark:border-slate-800">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <List size={18} /> In this article
                    </h3>
                    <nav className="space-y-2">
                        {toc.map((item) => (
                            <a 
                                key={item.id} 
                                href={`#${item.id}`}
                                onClick={(e) => handleTocClick(e, item.id)}
                                className={`block text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 ${item.level === 3 ? 'pl-4' : ''}`}
                            >
                                {item.text}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Article Prose */}
                <div 
                    ref={contentRef}
                    className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                    prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:scroll-mt-24
                    prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-8
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-slate-900 dark:prose-strong:text-white
                    prose-li:text-slate-600 dark:prose-li:text-slate-300
                    prose-img:rounded-xl prose-img:shadow-md"
                >
                    {post.content}
                </div>

                {/* Footer / CTA Block */}
                <div className="mt-16 bg-slate-900 dark:bg-blue-600 rounded-2xl p-8 md:p-12 text-center shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10">
                        <PenTool size={48} className="mx-auto text-white/80 mb-6 group-hover:rotate-12 transition-transform duration-500" />
                        <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to create your signature?</h2>
                        <p className="text-slate-300 dark:text-blue-100 mb-8 max-w-lg mx-auto">
                            Put this knowledge into practice. Use our free tool to generate a professional handwritten signature in seconds.
                        </p>
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-white text-slate-900 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg"
                        >
                            Launch Generator
                        </button>
                    </div>
                </div>

                {/* Related Posts Module - New Addition */}
                <div className="mt-20 border-t border-gray-200 dark:border-slate-800 pt-16">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-8">Read Next</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {relatedPosts.map((related) => (
                            <Link 
                                to={`/blog/${related.slug}`} 
                                key={related.id} 
                                className="group flex gap-4 items-start"
                            >
                                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800">
                                    <img 
                                        src={related.coverImage} 
                                        alt={related.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                                        {related.title}
                                    </h4>
                                    <div className="flex items-center text-xs text-slate-500 font-medium">
                                        Read Article <ArrowRight size={12} className="ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;