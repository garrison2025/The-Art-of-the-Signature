import React from 'react';

const HowToUse: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "1. Choose Your Mode",
      desc: "Select 'Type' for a polished font look, or 'Draw' to sketch your own unique mark using our digital ink pad."
    },
    {
      num: "02",
      title: "2. Customize Style",
      desc: "Adjust settings like color, and browse through curated categories like CEO Scribble, Handwriting, or Elegant."
    },
    {
      num: "03",
      title: "3. Download & Use",
      desc: "Save as a transparent PNG. Use it to sign documents securely or add a professional touch to your email footer."
    }
  ];

  return (
    <section id="howto" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-2 block">Easy Process</span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white transition-colors">How to Use</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="group p-8 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-gray-200 dark:hover:border-slate-700 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all duration-300">
              <span className="block text-5xl font-serif text-gray-100 dark:text-slate-800 font-bold mb-6 group-hover:text-slate-50 dark:group-hover:text-slate-700 transition-colors">
                {step.num}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 transition-colors">{step.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;