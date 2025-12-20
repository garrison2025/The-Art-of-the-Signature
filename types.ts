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

export type TabMode = 'type' | 'draw' | 'scan' | 'sign-pdf';

export type PageView = 'home' | 'about' | 'contact' | 'privacy' | 'terms';

export interface TypeSignatureConfig {
    text: string;
    color: string;
    slant: number; // -20 to 20 degrees
    spacing: number; // -2 to 10px
    weight: number; // 400 to 900
    trim: boolean;
    texture: boolean; // New: Realism/Grunge effect
    backgroundColor: 'transparent' | '#ffffff' | '#000000';
}

export interface SignatureHistoryItem {
    id: string;
    type: TabMode;
    dataUrl: string;
    timestamp: number;
    label: string; // "John Doe" or "Sketch"
}

export interface Point {
  x: number;
  y: number;
  pressure?: number;
  time?: number;
}

export interface Stroke {
  points: Point[];
  color: string;
  isEraser: boolean;
  baseWidth: number;
  smoothing: number;
}

export interface EmailSignatureConfig {
    name: string;
    jobTitle: string;
    company: string;
    phone: string;
    email: string;
    website: string;
}
