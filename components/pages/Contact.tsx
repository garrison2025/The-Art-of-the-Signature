import React from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
      <div className="text-center mb-16">
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">Get in Touch</span>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">Contact Us</h1>
        <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Have a question, suggestion, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-serif">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-2 rounded-lg text-slate-600">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Email Us</p>
                  <a href="mailto:info@handwrittensignaturegenerator.org" className="text-slate-500 hover:text-slate-900 transition-colors">
                    info@handwrittensignaturegenerator.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-2 rounded-lg text-slate-600">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Support</p>
                  <p className="text-slate-500 text-sm">
                    Mon-Fri, 9am - 5pm EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (Visual Only) */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6 font-serif">Send a Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-transparent" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-transparent" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-transparent" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-slate-900 text-white font-medium py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;