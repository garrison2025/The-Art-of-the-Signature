import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import SEO from '../SEO';

const Contact: React.FC = () => {
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with the SignCraft team for support, feature requests, or general inquiries about our signature generator."
      />
      <div className="max-w-4xl mx-auto px-6 py-20 animate-fade-in transition-colors duration-300">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-2 block">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6 transition-colors">Contact Us</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto transition-colors">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-serif transition-colors">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-300 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">Email Us</p>
                    <a href="mailto:info@handwrittensignaturegenerator.org" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                      info@handwrittensignaturegenerator.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-300 transition-colors">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">Support</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors">
                      Mon-Fri, 9am - 5pm EST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Visual Only) */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-serif transition-colors">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Name</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 focus:border-transparent transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Email</label>
                <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 focus:border-transparent transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 focus:border-transparent transition-colors" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium py-2.5 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;