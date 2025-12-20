import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 animate-fade-in text-slate-600 dark:text-slate-400 transition-colors duration-300">
      <h1 className="text-4xl font-serif text-slate-900 dark:text-white mb-2 transition-colors">Terms & Conditions</h1>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-10 transition-colors">Effective Date: December 5, 2025</p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2 className="text-2xl font-serif text-slate-900 dark:text-white mt-8 mb-4 transition-colors">1. Agreement to Terms</h2>
        <p className="mb-6">
          By accessing this website at https://handwrittensignaturegenerator.org, you agree to be bound by these website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
        </p>

        <h2 className="text-2xl font-serif text-slate-900 dark:text-white mt-8 mb-4 transition-colors">2. Use License</h2>
        <p className="mb-6">
          The signatures generated using our "Type" (Font-based) or "Draw" features are free for you to use for personal and commercial purposes (e.g., signing documents, email footers).
        </p>
        <p className="mb-6">
          However, you may not:
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Attempt to reverse engineer any software contained on the SignCraft website.</li>
            <li>Use the website to generate harmful, offensive, or illegal content.</li>
            <li>Systematically scrape or harvest data from the site without written consent.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-serif text-slate-900 dark:text-white mt-8 mb-4 transition-colors">3. Disclaimer</h2>
        <p className="mb-6">
          The materials on SignCraft's website are provided on an 'as is' basis. SignCraft makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        <p className="mb-6">
          SignCraft does not verify the legal validity of the signatures generated. The legal binding nature of an electronic signature depends on your local laws and regulations.
        </p>

        <h2 className="text-2xl font-serif text-slate-900 dark:text-white mt-8 mb-4 transition-colors">4. Limitations</h2>
        <p className="mb-6">
          In no event shall SignCraft or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SignCraft's website.
        </p>

        <h2 className="text-2xl font-serif text-slate-900 dark:text-white mt-8 mb-4 transition-colors">5. Modifications</h2>
        <p className="mb-6">
          SignCraft may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
        </p>

        <h2 className="text-2xl font-serif text-slate-900 dark:text-white mt-8 mb-4 transition-colors">6. Governing Law</h2>
        <p className="mb-6">
          These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>
        
        <p className="mt-8 border-t border-gray-100 dark:border-slate-800 pt-8 transition-colors">
            Contact: <a href="mailto:info@handwrittensignaturegenerator.org" className="text-blue-600 dark:text-blue-400 hover:underline">info@handwrittensignaturegenerator.org</a>
        </p>
      </div>
    </div>
  );
};

export default Terms;