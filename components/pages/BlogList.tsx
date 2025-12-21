import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../data/blogPosts';
import SEO from '../SEO';

const BlogList: React.FC = () => {
  return (
    <>
      <SEO 
        title="Blog & Guides" 
        description="Expert advice on personal branding, digital security, and the art of professional signatures."
      />
      <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in transition-colors duration-300">
        <div className="text-center mb-20">
          <span className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-2 block">Our Journal</span>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6 transition-colors">Insights & Guides</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto transition-colors">
            Expert advice on personal branding, digital security, and the art of the signature in the modern world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link 
              to={`/blog/${post.slug}`}
              key={post.id} 
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                      src={post.coverImage} 
                      alt={post.title}
                      width="600"
                      height="340"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                  </h2>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                  </p>

                  <div className="flex items-center text-sm font-bold text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight size={16} className="ml-2 text-blue-600 dark:text-blue-400" />
                  </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogList;