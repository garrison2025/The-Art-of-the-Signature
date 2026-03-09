import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read metadata dynamically
const blogMetadata = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/blog-metadata.json'), 'utf-8'));
const styleMetadata = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/style-metadata.json'), 'utf-8'));

const blogSlugs = blogMetadata.map(post => post.slug);
const styleSlugs = Object.keys(styleMetadata).map(slug => `style/${slug}`);

const baseUrl = 'https://handwrittensignaturegenerator.org';

const staticPages = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/privacy',
    '/terms',
    ...styleSlugs.map(slug => `/${slug}`)
];

const generateSitemap = () => {
    const pages = [
        ...staticPages.map(url => ({
            url: `${baseUrl}${url}`,
            changefreq: 'weekly',
            priority: url === '' ? '1.0' : '0.8'
        })),
        ...blogSlugs.map(slug => ({
            url: `${baseUrl}/blog/${slug}`,
            changefreq: 'monthly',
            priority: '0.7'
        }))
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => `
    <url>
        <loc>${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('')}
</urlset>`;

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // Determine output path (dist for build, public for dev/static)
    // We put it in public so it gets copied on build, AND dist just in case it runs post-build
    const publicDir = path.resolve(__dirname, '../public');
    const distDir = path.resolve(__dirname, '../dist');

    if (!fs.existsSync(publicDir)){
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated in public/sitemap.xml');

    if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
        console.log('✅ Sitemap copied to dist/sitemap.xml');
    }
};

generateSitemap();