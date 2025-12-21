import React from 'react';
import SEO from '../SEO';
import Breadcrumbs from '../Breadcrumbs';

const Privacy: React.FC = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy" 
        description="Read our privacy policy. SignCraft operates with a privacy-first, client-side approach to secure your signatures."
        type="article"
      />
      <div className="max-w-3xl mx-auto px-6 py-20 animate-fade-in text-slate-600 dark:text-slate-400 transition-colors duration-300">
        <Breadcrumbs items={[{ label: 'Privacy Policy', path: '/privacy' }]} />
        
        <h1 className="text-4xl font-serif text-slate-900 dark:text-white mb-2 transition-colors">Privacy Policy</h1>
        <p className="text-sm text-slate-400 dark:text-slate-500 mb-10 transition-colors">Last Updated: December 5, 2025</p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="mb-6">
            At <strong>Handwritten Signature Generator (SignCraft)</strong>, accessible from https://handwrittensignaturegenerator.org, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.
          </p>

          <h2 className="text-2xl font-serif text-slate-900 dark:text-white mt-8 mb-4 transition-colors">1. Client-Side Processing</h2>
          <p className="mb-6">
            We take a privacy-first approach. All signature generation, whether typed or drawn, occurs entirely within your browser (Client-Side). 
            <strong> We do not upload, store, or save your signatures on our servers.</strong> Once you close the tab or clear the canvas, the data is gone. You retain full ownership and control of your generated assets.
          </p>

          <h2 className="text-2xl font-serif text-slate-900 dark:text-white mt-8 mb-4 transition-colors">2. Log Files</h2>
          <p className="mb-6">
            SignCraft follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2 className="text-2xl font-serif text-slate-900 dark:text-white mt-8 mb-4 transition-colors">3. Cookies and Web Beacons</h2>
          <p className="mb-6">
            Like any other website, SignCraft uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2 className="text-2xl font-serif text-slate-900 dark:text-white mt-8 mb-4 transition-colors">4. Third Party Privacy Policies</h2>
          <p className="mb-6">
            SignCraft's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <h2 className="text-2xl font-serif text-slate-900 dark:text-white mt-8 mb-4 transition-colors">5. Contact Information</h2>
          <p className="mb-6">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:info@handwrittensignaturegenerator.org" className="text-blue-600 dark:text-blue-400 hover:underline">info@handwrittensignaturegenerator.org</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default Privacy;