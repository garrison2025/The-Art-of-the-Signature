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
    <section id="howto" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">Easy Process</span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900">How to Use</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg transition-all duration-300">
              <span className="block text-5xl font-serif text-gray-100 font-bold mb-6 group-hover:text-slate-50 transition-colors">
                {step.num}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
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