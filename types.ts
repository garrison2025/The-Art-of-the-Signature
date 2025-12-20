export type SignatureStyle = 'CEO Scribble' | 'Handwriting' | 'Elegant' | 'Casual';

export interface FontOption {
  name: string;
  fontFamily: string;
  styleTag: SignatureStyle;
  fontSizeAdjust: number; // To normalize visual size
  offsetY?: number; // To center vertically if font baseline is weird
}

export interface SignatureColor {
  name: string;
  hex: string;
}

export type TabMode = 'type' | 'draw';

export type PageView = 'home' | 'about' | 'contact' | 'privacy' | 'terms';