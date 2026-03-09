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

// Read metadata dynamically
const blogMetadata = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/blog-metadata.json'), 'utf-8'));
const styleMetadata = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/style-metadata.json'), 'utf-8'));

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
  }
];

// Add blog routes dynamically
blogMetadata.forEach(post => {
    routes.push({
        path: `/blog/${post.slug}`,
        title: `${post.title} | SignCraft`,
        description: post.excerpt
    });
});

// Add style routes dynamically
Object.entries(styleMetadata).forEach(([slug, data]) => {
    routes.push({
        path: `/style/${slug}`,
        title: `${data.title} | SignCraft`,
        description: data.description
    });
});

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
