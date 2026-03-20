#!/usr/bin/env node
/**
 * Sitemap Generator
 * Run: node scripts/generate-sitemap.js
 * Outputs: public/sitemap.xml
 *
 * Add this to your CI/CD pipeline to auto-generate on every deploy.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.datazeb.com';

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/services', priority: '0.9', changefreq: 'monthly' },
  { url: '/case-studies', priority: '0.9', changefreq: 'monthly' },
  { url: '/blog', priority: '0.8', changefreq: 'daily' },
  { url: '/contact', priority: '0.9', changefreq: 'monthly' },
];

const industries = [
  'sales', 'finance', 'ecommerce', 'saas', 'marketing',
  'healthcare', 'manufacturing', 'real-estate', 'logistics',
  'hr', 'operations', 'retail', 'private-equity', 'nonprofit',
  'customer-success', 'legal',
];

const cities = [
  // USA
  'new-york', 'los-angeles', 'chicago', 'houston', 'phoenix',
  'philadelphia', 'san-antonio', 'san-diego', 'dallas', 'san-jose',
  'austin', 'seattle', 'denver', 'boston', 'miami', 'atlanta',
  'minneapolis', 'portland', 'nashville', 'las-vegas',
  // EU / International
  'london', 'amsterdam', 'berlin', 'paris', 'dublin',
  'stockholm', 'madrid', 'zurich', 'frankfurt', 'copenhagen',
  'barcelona', 'munich', 'warsaw', 'brussels', 'toronto',
];

// Blog posts — add new posts here as you publish
const blogPosts = [
  'power-bi-sales-dashboard-guide',
  'power-bi-vs-tableau-for-small-business',
  'power-bi-ecommerce-dashboard',
  'power-bi-finance-dashboard-cfo',
  'power-bi-consultant-new-york',
];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateSitemap() {
  const today = formatDate(new Date());
  const urls = [
    ...staticPages.map(p => ({
      loc: `${BASE_URL}${p.url}`,
      lastmod: today,
      changefreq: p.changefreq,
      priority: p.priority,
    })),
    ...industries.map(slug => ({
      loc: `${BASE_URL}/power-bi-industry/${slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    })),
    ...cities.map(slug => ({
      loc: `${BASE_URL}/power-bi-city/${slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    })),
    ...blogPosts.map(slug => ({
      loc: `${BASE_URL}/blog/${slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml);

  console.log(`\n✅ Sitemap generated: public/sitemap.xml`);
  console.log(`📄 Total URLs: ${urls.length}`);
  console.log(`   Static pages: ${staticPages.length}`);
  console.log(`   Industry pages: ${industries.length}`);
  console.log(`   City pages: ${cities.length}`);
  console.log(`   Blog posts: ${blogPosts.length}`);
  console.log(`\n📤 Submit to:`);
  console.log(`   Google Search Console: ${BASE_URL}/sitemap.xml`);
  console.log(`   Bing Webmaster Tools: ${BASE_URL}/sitemap.xml`);
}

generateSitemap();
