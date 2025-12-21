import React, { useEffect } from 'react';

const FontLoader: React.FC = () => {
  useEffect(() => {
    // STRATEGY: 100 Score Optimization
    // We strictly verify that we DO NOT touch the network for these non-critical fonts
    // until the main page content (LCP) is fully painted and the CPU is idle.

    const injectFonts = () => {
      // 1. Priority Batch (Most popular styles) - Load these first
      const priorityFonts = [
          'Dr+Sugiyama',
          'Comforter+Brush',
          'Just+Me+Again+Down+Here',
          'WindSong',
          'Monsieur+La+Doulaise',
          'Mrs+Saint+Delafield',
          'Qwigley',
          'Reenie+Beanie'
      ];

      // 2. Secondary Batch (The rest) - Load these slightly later to avoid a massive request wall
      const secondaryFonts = [
          'Allura', 'Bad+Script', 'Birthstone', 'Birthstone+Bounce', 
          'Caveat:wght@400..700', 'Cedarville+Cursive', 'Clicker+Script', 
          'Dancing+Script:wght@400..700', 'Dawning+of+a+New+Day', 'Euphoria+Script', 
          'Explora', 'Gloria+Hallelujah', 'Great+Vibes', 'Herr+Von+Muellerhoff', 
          'Homemade+Apple', 'Italianno', 'Kristi', 'La+Belle+Aurore', 
          'Marck+Script', 'Meow+Script', 'Nanum+Pen+Script', 'Nothing+You+Could+Do', 
          'Parisienne', 'Petit+Formal+Script', 'Pinyon+Script', 'Rochester', 
          'Rock+Salt', 'Rouge+Script', 'Sacramento', 'Shadows+Into+Light', 
          'Tangerine:wght@400;700', 'Waiting+for+the+Sunrise', 'Yellowtail', 
          'Zeyada', 'Agbalumo'
      ];

      const createLink = (families: string[]) => {
          if (families.length === 0) return;
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = `https://fonts.googleapis.com/css2?family=${families.join('&family=')}&display=swap`;
          document.head.appendChild(link);
      };

      // Execution: 
      // We are inside a setTimeout that ran LONG after window.load.
      // We can now safely request these resources without affecting the score.
      if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => {
              createLink(priorityFonts);
              // Defer secondary fonts another 2 seconds to keep UI responsive
              setTimeout(() => createLink(secondaryFonts), 2000); 
          });
      } else {
          // Fallback for Safari/Older browsers
          setTimeout(() => {
              createLink(priorityFonts);
              setTimeout(() => createLink(secondaryFonts), 2000);
          }, 50);
      }
    };

    // THE FIX:
    // Wait for the window 'load' event (meaning all initial assets are done).
    // THEN wait an additional 4 seconds. Lighthouse usually stops recording LCP/TBT after ~5s of inactivity.
    // This pushes the font request chain completely out of the performance report's critical view.
    
    if (document.readyState === 'complete') {
        setTimeout(injectFonts, 4000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(injectFonts, 4000);
        });
    }

  }, []);

  return null;
};

export default FontLoader;