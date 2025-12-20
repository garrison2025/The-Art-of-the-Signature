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
  // CEO / Scribble Styles (Illegible, fast, authoritative)
  { name: 'Dr Sugiyama', fontFamily: '"Dr Sugiyama", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.8 },
  { name: 'Comforter Brush', fontFamily: '"Comforter Brush", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.4 },
  { name: 'Just Me Again Down Here', fontFamily: '"Just Me Again Down Here", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.4 }, // New: Tall & messy
  { name: 'WindSong', fontFamily: '"WindSong", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.3 },
  { name: 'Monsieur La Doulaise', fontFamily: '"Monsieur La Doulaise", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.6 },
  { name: 'Mrs Saint Delafield', fontFamily: '"Mrs Saint Delafield", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.5 },
  { name: 'Qwigley', fontFamily: '"Qwigley", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.5 },
  { name: 'Reenie Beanie', fontFamily: '"Reenie Beanie", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.4 },
  { name: 'Rock Salt', fontFamily: '"Rock Salt", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.1 },
  { name: 'Dawning of a New Day', fontFamily: '"Dawning of a New Day", cursive', styleTag: 'CEO Scribble', fontSizeAdjust: 1.4 },
  
  // Handwriting / Authentic Styles (Looks like real pen on paper)
  { name: 'Waiting for the Sunrise', fontFamily: '"Waiting for the Sunrise", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.2 },
  { name: 'Bad Script', fontFamily: '"Bad Script", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.3 }, // New: Very natural
  { name: 'Nothing You Could Do', fontFamily: '"Nothing You Could Do", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.3 },
  { name: 'Zeyada', fontFamily: '"Zeyada", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.4 },
  { name: 'La Belle Aurore', fontFamily: '"La Belle Aurore", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.4 },
  { name: 'Cedarville Cursive', fontFamily: '"Cedarville Cursive", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.2 },
  { name: 'Nanum Pen Script', fontFamily: '"Nanum Pen Script", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.5 },
  { name: 'Shadows Into Light', fontFamily: '"Shadows Into Light", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.3 },
  { name: 'Gloria Hallelujah', fontFamily: '"Gloria Hallelujah", cursive', styleTag: 'Handwriting', fontSizeAdjust: 1.1 }, // New: Sharpie/Marker style
  
  // Elegant / Calligraphy Styles (Wedding, Formal, Historic)
  { name: 'Birthstone', fontFamily: '"Birthstone", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.6 }, // New: Modern Calligraphy
  { name: 'Birthstone Bounce', fontFamily: '"Birthstone Bounce", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.6 }, // New: Bouncy variant
  { name: 'Explora', fontFamily: '"Explora", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.5 }, // New: Wide loops
  { name: 'Italianno', fontFamily: '"Italianno", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.5 }, // New: Classic italic
  { name: 'Great Vibes', fontFamily: '"Great Vibes", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.4 },
  { name: 'Allura', fontFamily: '"Allura", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.5 },
  { name: 'Sacramento', fontFamily: '"Sacramento", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.4 },
  { name: 'Pinyon Script', fontFamily: '"Pinyon Script", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.5 },
  { name: 'Herr Von Muellerhoff', fontFamily: '"Herr Von Muellerhoff", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.6 },
  { name: 'Parisienne', fontFamily: '"Parisienne", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.3 },
  { name: 'Petit Formal Script', fontFamily: '"Petit Formal Script", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.2 },
  { name: 'Rouge Script', fontFamily: '"Rouge Script", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.4 },
  { name: 'Tangerine', fontFamily: '"Tangerine", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.8 },
  { name: 'Kristi', fontFamily: '"Kristi", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.8 },
  { name: 'Rochester', fontFamily: '"Rochester", cursive', styleTag: 'Elegant', fontSizeAdjust: 1.2 }, // New: Art Deco

  // Casual / Fun Styles
  { name: 'Dancing Script', fontFamily: '"Dancing Script", cursive', styleTag: 'Casual', fontSizeAdjust: 1.3 },
  { name: 'Clicker Script', fontFamily: '"Clicker Script", cursive', styleTag: 'Casual', fontSizeAdjust: 1.5 }, // New: Thin Monoline
  { name: 'Caveat', fontFamily: '"Caveat", cursive', styleTag: 'Casual', fontSizeAdjust: 1.4 },
  { name: 'Homemade Apple', fontFamily: '"Homemade Apple", cursive', styleTag: 'Casual', fontSizeAdjust: 1.1 },
  { name: 'Yellowtail', fontFamily: '"Yellowtail", cursive', styleTag: 'Casual', fontSizeAdjust: 1.4 },
  { name: 'Marck Script', fontFamily: '"Marck Script", cursive', styleTag: 'Casual', fontSizeAdjust: 1.4 },
  { name: 'Meow Script', fontFamily: '"Meow Script", cursive', styleTag: 'Casual', fontSizeAdjust: 1.5 },
  { name: 'Euphoria Script', fontFamily: '"Euphoria Script", cursive', styleTag: 'Casual', fontSizeAdjust: 1.3 }, // New
];