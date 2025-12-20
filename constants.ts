import { FontOption, SignatureColor } from './types';

export const SIGNATURE_COLORS: SignatureColor[] = [
  { name: 'Midnight', hex: '#1e293b' }, // Dark Blue/Black
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Green', hex: '#16a34a' },
  { name: 'Purple', hex: '#7c3aed' },
  { name: 'Orange', hex: '#ea580c' },
];

export const FONT_OPTIONS: FontOption[] = [
  // CEO / Scribble Styles
  { name: 'Dr Sugiyama', fontFamily: '"Dr Sugiyama", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.8 },
  { name: 'Comforter Brush', fontFamily: '"Comforter Brush", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.4 },
  { name: 'WindSong', fontFamily: '"WindSong", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.3 },
  { name: 'Monsieur La Doulaise', fontFamily: '"Monsieur La Doulaise", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.6 },
  { name: 'Mrs Saint Delafield', fontFamily: '"Mrs Saint Delafield", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.5 },
  { name: 'Qwigley', fontFamily: '"Qwigley", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.5 },
  { name: 'Reenie Beanie', fontFamily: '"Reenie Beanie", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.4 },
  { name: 'Rock Salt', fontFamily: '"Rock Salt", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.1 }, // New
  { name: 'Dawning of a New Day', fontFamily: '"Dawning of a New Day", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.4 }, // New
  
  // Handwriting / Authentic Styles
  { name: 'Waiting for the Sunrise', fontFamily: '"Waiting for the Sunrise", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.2 },
  { name: 'Nothing You Could Do', fontFamily: '"Nothing You Could Do", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.3 },
  { name: 'Zeyada', fontFamily: '"Zeyada", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.4 },
  { name: 'La Belle Aurore', fontFamily: '"La Belle Aurore", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.4 }, // New
  { name: 'Cedarville Cursive', fontFamily: '"Cedarville Cursive", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.2 }, // New
  { name: 'Nanum Pen Script', fontFamily: '"Nanum Pen Script", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.5 }, // New
  { name: 'Shadows Into Light', fontFamily: '"Shadows Into Light", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.3 }, // New
  
  // Elegant / Calligraphy Styles
  { name: 'Great Vibes', fontFamily: '"Great Vibes", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.4 },
  { name: 'Allura', fontFamily: '"Allura", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.5 },
  { name: 'Sacramento', fontFamily: '"Sacramento", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.4 },
  { name: 'Pinyon Script', fontFamily: '"Pinyon Script", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.5 }, // Was missing
  { name: 'Herr Von Muellerhoff', fontFamily: '"Herr Von Muellerhoff", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.6 }, // Was missing
  { name: 'Parisienne', fontFamily: '"Parisienne", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.3 }, // New
  { name: 'Petit Formal Script', fontFamily: '"Petit Formal Script", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.2 }, // New
  { name: 'Rouge Script', fontFamily: '"Rouge Script", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.4 }, // New
  { name: 'Tangerine', fontFamily: '"Tangerine", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.8 }, // New
  { name: 'Kristi', fontFamily: '"Kristi", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.8 }, // New

  // Casual / Fun Styles
  { name: 'Dancing Script', fontFamily: '"Dancing Script", cursive', styleTag: 'Casual', fontSizeAdjust: 1.3 },
  { name: 'Caveat', fontFamily: '"Caveat", cursive', styleTag: 'Casual', fontSizeAdjust: 1.4 },
  { name: 'Homemade Apple', fontFamily: '"Homemade Apple", cursive', styleTag: 'Casual', fontSizeAdjust: 1.1 },
  { name: 'Yellowtail', fontFamily: '"Yellowtail", cursive', styleTag: 'Casual', fontSizeAdjust: 1.4 }, // New
  { name: 'Marck Script', fontFamily: '"Marck Script", cursive', styleTag: 'Casual', fontSizeAdjust: 1.4 }, // New
  { name: 'Meow Script', fontFamily: '"Meow Script", cursive', styleTag: 'Casual', fontSizeAdjust: 1.5 }, // New
];