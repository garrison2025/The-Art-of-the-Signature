import React, { useEffect } from 'react';

const FontLoader: React.FC = () => {
  useEffect(() => {
    // We delay the loading of non-critical fonts to ensure the LCP (Largest Contentful Paint)
    // is triggered as fast as possible.
    const loadFonts = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      // Added Dr+Sugiyama to the deferred list
      link.href = 'https://fonts.googleapis.com/css2?family=Dr+Sugiyama&family=Allura&family=Bad+Script&family=Birthstone&family=Birthstone+Bounce&family=Caveat:wght@400..700&family=Cedarville+Cursive&family=Clicker+Script&family=Comforter+Brush&family=Dancing+Script:wght@400..700&family=Dawning+of+a+New+Day&family=Euphoria+Script&family=Explora&family=Gloria+Hallelujah&family=Great+Vibes&family=Herr+Von+Muellerhoff&family=Homemade+Apple&family=Italianno&family=Just+Me+Again+Down+Here&family=Kristi&family=La+Belle+Aurore&family=Marck+Script&family=Meow+Script&family=Monsieur+La+Doulaise&family=Mrs+Saint+Delafield&family=Nanum+Pen+Script&family=Nothing+You+Could+Do&family=Parisienne&family=Petit+Formal+Script&family=Pinyon+Script&family=Qwigley&family=Reenie+Beanie&family=Rochester&family=Rock+Salt&family=Rouge+Script&family=Sacramento&family=Shadows+Into+Light&family=Tangerine:wght@400;700&family=Waiting+for+the+Sunrise&family=WindSong:wght@400;500&family=Yellowtail&family=Zeyada&family=Agbalumo&display=swap';
      document.head.appendChild(link);
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    // This pushes the network request to when the browser is truly idle.
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadFonts, { timeout: 3000 });
    } else {
      setTimeout(loadFonts, 2000);
    }
  }, []);

  return null;
};

export default FontLoader;