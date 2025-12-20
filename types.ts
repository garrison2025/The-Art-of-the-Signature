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

export interface TypeSignatureConfig {
    text: string;
    color: string;
    slant: number; // -20 to 20 degrees
    spacing: number; // -2 to 10px
    weight: number; // 400 to 900
    trim: boolean;
    backgroundColor: 'transparent' | '#ffffff' | '#000000';
}
