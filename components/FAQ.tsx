import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HelpCircle } from 'lucide-react';

const faqData = [
    {
        question: "Is this signature generator free?",
        answer: "Yes, SignCraft is 100% free to use for generating typed and drawn signatures. You can download unlimited high-resolution PNGs without creating an account."
    },
    {
        question: "Is it secure? Where is my signature stored?",
        answer: "Security is our priority. SignCraft operates entirely in your browser (Client-Side). Your signature data is never uploaded to our servers, ensuring complete privacy."
    },
    {
        question: "Are these signatures legally binding?",
        answer: "In many jurisdictions (including the US under the ESIGN Act and EU under eIDAS), electronic signatures are legally binding for most business transactions. However, specific documents like wills may still require wet ink."
    },
    {
        question: "Can I use this for my email signature?",
        answer: "Absolutely. We provide an optimized 'Email Signature Builder' that generates HTML code compatible with Gmail, Outlook, and Apple Mail."
    }
];

const FAQ: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section className="py-20 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 transition-colors">
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-12">
                     <span className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl mb-4">
                        <HelpCircle size={24} />
                     </span>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-slate-500 dark:text-slate-400">Common questions about electronic signatures and our tool.</p>
                </div>

                <div className="space-y-6">
                    {faqData.map((item, index) => (
                        <div key={index} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.question}</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;