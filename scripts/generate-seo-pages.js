import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('index.html not found in dist directory. Run build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

const routes = [
  {
    path: '/about',
    title: 'About Us | SignCraft',
    description: 'Learn about SignCraft, our mission to bring elegant, secure, and privacy-first handwritten signatures to the digital world.'
  },
  {
    path: '/contact',
    title: 'Contact Us | SignCraft',
    description: 'Get in touch with the SignCraft team for support, feature requests, or general inquiries about our signature generator.'
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | SignCraft',
    description: 'Read our privacy policy. SignCraft operates with a privacy-first, client-side approach to secure your signatures.'
  },
  {
    path: '/terms',
    title: 'Terms & Conditions | SignCraft',
    description: 'Terms of service for using the SignCraft Handwritten Signature Generator.'
  },
  {
    path: '/blog',
    title: 'Blog & Guides | SignCraft',
    description: 'Expert advice on personal branding, digital security, and the art of professional signatures.'
  },
  {
    path: '/blog/professional-handwritten-signature-guide-2025',
    title: 'The Art of the Digital Mark: Why Your Personal Brand Needs a Professional Handwritten Signature in 2025 | SignCraft',
    description: 'In an era of automated text and sterile Helvetica, a personalized handwritten signature is the ultimate power move. Learn how to create one for free, understand the psychology behind it, and master the digital tools to implement it securely.'
  },
  {
    path: '/blog/electronic-vs-digital-signatures-legal-guide-2025',
    title: 'Electronic vs. Digital vs. Wet Ink Signatures: The Definitive 2025 Guide | SignCraft',
    description: 'Confused by ESIGN, eIDAS, and cryptographic certificates? This guide demystifies the legal landscape of signatures in 2025. Learn when you can simply use an image, when you need a digital certificate, and how to combine them for the perfect workflow.'
  },
  {
    path: '/blog/how-to-design-perfect-email-signature-2025',
    title: 'How to Design the Perfect Email Signature in 2025 (Templates & Best Practices) | SignCraft',
    description: 'Your email signature is the most undervalued digital real estate you own. Stop using plain text or messy images. This guide covers the anatomy of a high-converting signature, mobile responsiveness, and how to use our free builder.'
  },
  {
    path: '/blog/how-to-add-signature-in-word',
    title: 'How to Add Signature in Word? (The 2026 Professional Guide) | SignCraft',
    description: 'Stop printing and scanning! Learn the 4 best methods on how to add a signature in Word in 2026. From professional PNG insertion to digital certificates, we cover everything you need to know for signing documents electronically.'
  },
  {
    path: '/blog/how-to-insert-signature-in-word',
    title: 'How to Insert a Signature in Word? (The Ultimate 2026 Tutorial) | SignCraft',
    description: 'Looking for a step-by-step guide on how to insert a signature in Word? Discover the 4 most effective methods for 2026, including transparent images, digital lines, and drawing tools, to make your documents legally binding and professional.'
  },
  {
    path: '/blog/how-to-add-a-signature-to-a-word-document',
    title: 'How to Add a Signature to a Word Document? (The 2026 Master Guide) | SignCraft',
    description: 'Navigating the new features of Word 2026? Learn the definitive methods for adding a professional signature to your documents. From dragging transparent PNGs to using the advanced Draw tab, we cover every technique to make your paperwork official.'
  },
  {
    path: '/style/handwriting-signature-generator',
    title: 'Free Handwriting Signature Generator | SignCraft',
    description: 'Create a natural-looking handwritten signature online. Our generator mimics real pen pressure and ink flow.'
  },
  {
    path: '/style/cursive-signature-generator',
    title: 'Cursive Signature Generator | SignCraft',
    description: 'Professional cursive signature maker. Choose from elegant scripts and casual cursive fonts.'
  },
  {
    path: '/style/calligraphy-signature-generator',
    title: 'Calligraphy Signature Generator | SignCraft',
    description: 'Create beautiful calligraphy signatures for free. Perfect for wedding invitations, photography watermarks, and formal documents.'
  },
  {
    path: '/style/wet-ink-signature-generator',
    title: 'Wet Ink Signature Generator | SignCraft',
    description: 'Simulate the look of a wet ink signature digitally. Perfect for signing PDFs legally.'
  },
  {
    path: '/style/autograph-maker',
    title: 'Free Online Autograph Maker | SignCraft',
    description: 'Design your own personal autograph. Fast, free, and downloadable as PNG.'
  }
];

routes.forEach(route => {
  const routeDir = path.join(distDir, route.path.substring(1)); // Remove leading slash
  fs.mkdirSync(routeDir, { recursive: true });
  
  let html = baseHtml;
  // Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
  // Replace description
  html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${route.description}">`);
  
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
  console.log(`✅ Generated SEO page for ${route.path}`);
});

console.log('🎉 All SEO pages generated successfully!');
