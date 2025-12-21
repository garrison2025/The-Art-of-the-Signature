import React, { useEffect } from 'react';

const FontLoader: React.FC = () => {
  useEffect(() => {
    // BATCH 1: High Priority - The first 8 fonts visible in the default "All" grid.
    // Loading only these initially drastically reduces the "Network Request Chain" length and LCP delay.
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

    // BATCH 2: Low Priority - All other fonts. Loaded with a significant delay.
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

    const loadFontBatch = (families: string[]) => {
      if (families.length === 0) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${families.join('&family=')}&display=swap`;
      document.head.appendChild(link);
    };

    // Load Batch 1 immediately (but non-blocking via setTimeout 0)
    setTimeout(() => {
        loadFontBatch(priorityFonts);
    }, 0);

    // Load Batch 2 after 3 seconds (when user is likely scrolling or reading)
    // This moves the heavy network requests out of the initial load performance window.
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => loadFontBatch(secondaryFonts), { timeout: 4000 });
    } else {
      setTimeout(() => loadFontBatch(secondaryFonts), 3500);
    }
  }, []);

  return null;
};

export default FontLoader;