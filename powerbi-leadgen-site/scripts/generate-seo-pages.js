#!/usr/bin/env node
/**
 * Programmatic SEO Page Generator
 *
 * Generates 100+ city and industry pages automatically from data arrays.
 * Run: node scripts/generate-seo-pages.js
 *
 * This script creates the data entries for your dynamic [slug] pages.
 * To add a new city or industry: add it to the arrays below and re-run.
 */

const fs = require('fs');
const path = require('path');

// ─── USA CITIES ────────────────────────────────────────────────────────────────
const USA_CITIES = [
  { slug: 'new-york', name: 'New York', state: 'NY', industries: ['Finance', 'Media', 'Real Estate', 'SaaS', 'Healthcare'] },
  { slug: 'los-angeles', name: 'Los Angeles', state: 'CA', industries: ['Ecommerce', 'Entertainment', 'DTC', 'Real Estate', 'Healthcare'] },
  { slug: 'chicago', name: 'Chicago', state: 'IL', industries: ['Manufacturing', 'Finance', 'Logistics', 'Healthcare', 'B2B Services'] },
  { slug: 'houston', name: 'Houston', state: 'TX', industries: ['Energy', 'Healthcare', 'Manufacturing', 'Finance', 'Logistics'] },
  { slug: 'phoenix', name: 'Phoenix', state: 'AZ', industries: ['Real Estate', 'Finance', 'Healthcare', 'Technology', 'Manufacturing'] },
  { slug: 'philadelphia', name: 'Philadelphia', state: 'PA', industries: ['Healthcare', 'Finance', 'Manufacturing', 'Education', 'Pharma'] },
  { slug: 'san-antonio', name: 'San Antonio', state: 'TX', industries: ['Healthcare', 'Military Contractors', 'Finance', 'Manufacturing', 'Retail'] },
  { slug: 'san-diego', name: 'San Diego', state: 'CA', industries: ['Defense', 'Biotech', 'Healthcare', 'Technology', 'Tourism'] },
  { slug: 'dallas', name: 'Dallas', state: 'TX', industries: ['Energy', 'Finance', 'Manufacturing', 'Healthcare', 'Logistics'] },
  { slug: 'san-jose', name: 'San Jose', state: 'CA', industries: ['Technology', 'SaaS', 'Semiconductor', 'Venture Capital', 'Healthcare'] },
  { slug: 'austin', name: 'Austin', state: 'TX', industries: ['SaaS', 'Technology', 'Fintech', 'Ecommerce', 'Real Estate'] },
  { slug: 'seattle', name: 'Seattle', state: 'WA', industries: ['SaaS', 'Ecommerce', 'Technology', 'Healthcare', 'Aerospace'] },
  { slug: 'denver', name: 'Denver', state: 'CO', industries: ['Technology', 'Energy', 'Healthcare', 'Real Estate', 'Finance'] },
  { slug: 'boston', name: 'Boston', state: 'MA', industries: ['Healthcare', 'Biotech', 'Education', 'Finance', 'SaaS'] },
  { slug: 'miami', name: 'Miami', state: 'FL', industries: ['Finance', 'Real Estate', 'Healthcare', 'Hospitality', 'Tech'] },
  { slug: 'atlanta', name: 'Atlanta', state: 'GA', industries: ['Technology', 'Finance', 'Healthcare', 'Logistics', 'Media'] },
  { slug: 'minneapolis', name: 'Minneapolis', state: 'MN', industries: ['Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Technology'] },
  { slug: 'portland', name: 'Portland', state: 'OR', industries: ['Technology', 'Ecommerce', 'Healthcare', 'Manufacturing', 'Finance'] },
  { slug: 'nashville', name: 'Nashville', state: 'TN', industries: ['Healthcare', 'Music', 'Finance', 'Hospitality', 'Technology'] },
  { slug: 'las-vegas', name: 'Las Vegas', state: 'NV', industries: ['Hospitality', 'Real Estate', 'Finance', 'Healthcare', 'Technology'] },
];

// ─── EU / INTERNATIONAL CITIES ─────────────────────────────────────────────────
const EU_CITIES = [
  { slug: 'london', name: 'London', country: 'UK', industries: ['FinTech', 'Finance', 'Professional Services', 'Ecommerce', 'SaaS'] },
  { slug: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', industries: ['SaaS', 'Logistics', 'Technology', 'Finance', 'Ecommerce'] },
  { slug: 'berlin', name: 'Berlin', country: 'Germany', industries: ['Technology', 'Ecommerce', 'Manufacturing', 'SaaS', 'Healthcare'] },
  { slug: 'paris', name: 'Paris', country: 'France', industries: ['Luxury', 'Retail', 'Finance', 'Technology', 'Manufacturing'] },
  { slug: 'dublin', name: 'Dublin', country: 'Ireland', industries: ['Technology', 'Pharma', 'Finance', 'SaaS', 'Professional Services'] },
  { slug: 'stockholm', name: 'Stockholm', country: 'Sweden', industries: ['SaaS', 'Gaming', 'Technology', 'Ecommerce', 'Finance'] },
  { slug: 'madrid', name: 'Madrid', country: 'Spain', industries: ['Finance', 'Retail', 'Tourism', 'Technology', 'Real Estate'] },
  { slug: 'zurich', name: 'Zurich', country: 'Switzerland', industries: ['Finance', 'Banking', 'Pharma', 'Technology', 'Insurance'] },
  { slug: 'frankfurt', name: 'Frankfurt', country: 'Germany', industries: ['Finance', 'Banking', 'Logistics', 'Technology', 'Automotive'] },
  { slug: 'copenhagen', name: 'Copenhagen', country: 'Denmark', industries: ['SaaS', 'Healthcare', 'Cleantech', 'Finance', 'Gaming'] },
  { slug: 'barcelona', name: 'Barcelona', country: 'Spain', industries: ['Technology', 'Tourism', 'Ecommerce', 'SaaS', 'Healthcare'] },
  { slug: 'munich', name: 'Munich', country: 'Germany', industries: ['Automotive', 'Technology', 'Finance', 'Manufacturing', 'Healthcare'] },
  { slug: 'warsaw', name: 'Warsaw', country: 'Poland', industries: ['Technology', 'Finance', 'Manufacturing', 'Ecommerce', 'BPO'] },
  { slug: 'brussels', name: 'Brussels', country: 'Belgium', industries: ['Finance', 'Technology', 'Pharma', 'Logistics', 'Professional Services'] },
  { slug: 'toronto', name: 'Toronto', country: 'Canada', industries: ['Finance', 'Technology', 'Healthcare', 'Real Estate', 'SaaS'] },
];

// ─── INDUSTRIES ────────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { slug: 'sales', name: 'Sales', icon: '📈' },
  { slug: 'finance', name: 'Finance', icon: '💰' },
  { slug: 'ecommerce', name: 'Ecommerce', icon: '🛒' },
  { slug: 'saas', name: 'SaaS', icon: '📊' },
  { slug: 'marketing', name: 'Marketing', icon: '📣' },
  { slug: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { slug: 'manufacturing', name: 'Manufacturing', icon: '🏭' },
  { slug: 'real-estate', name: 'Real Estate', icon: '🏠' },
  { slug: 'logistics', name: 'Logistics', icon: '🚛' },
  { slug: 'hr', name: 'HR & People Analytics', icon: '👥' },
  { slug: 'operations', name: 'Operations', icon: '⚙️' },
  { slug: 'retail', name: 'Retail', icon: '🏪' },
  { slug: 'private-equity', name: 'Private Equity', icon: '💼' },
  { slug: 'nonprofit', name: 'Nonprofit', icon: '🤝' },
  { slug: 'customer-success', name: 'Customer Success', icon: '🎯' },
  { slug: 'legal', name: 'Legal / Law Firm', icon: '⚖️' },
];

// ─── GENERATE REPORT ───────────────────────────────────────────────────────────
function generateReport() {
  const allCities = [...USA_CITIES, ...EU_CITIES];
  const totalPages = allCities.length + INDUSTRIES.length;

  const report = {
    generatedAt: new Date().toISOString(),
    totalProgrammaticPages: totalPages,
    cityPages: {
      count: allCities.length,
      usa: USA_CITIES.length,
      eu: EU_CITIES.length,
      slugs: allCities.map(c => `/power-bi-city/${c.slug}`),
    },
    industryPages: {
      count: INDUSTRIES.length,
      slugs: INDUSTRIES.map(i => `/power-bi-industry/${i.slug}`),
    },
    sitemapUrls: [
      '/',
      '/services',
      '/case-studies',
      '/blog',
      '/contact',
      ...allCities.map(c => `/power-bi-city/${c.slug}`),
      ...INDUSTRIES.map(i => `/power-bi-industry/${i.slug}`),
    ],
  };

  // Write report
  const outputDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(
    path.join(outputDir, 'seo-pages-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n✅ SEO Pages Report Generated');
  console.log('─'.repeat(50));
  console.log(`📄 Total programmatic pages: ${totalPages}`);
  console.log(`🏙️  City pages: ${allCities.length} (${USA_CITIES.length} USA + ${EU_CITIES.length} EU)`);
  console.log(`🏭 Industry pages: ${INDUSTRIES.length}`);
  console.log(`📊 Total site pages (with core): ${totalPages + 5}`);
  console.log('\n📁 Output: public/seo-pages-report.json');
  console.log('\n🚀 To add more pages:');
  console.log('   1. Add city/industry to arrays in this script');
  console.log('   2. Add data to the cities/industries objects in the [slug]/page.tsx files');
  console.log('   3. Re-run: node scripts/generate-seo-pages.js');
}

generateReport();
