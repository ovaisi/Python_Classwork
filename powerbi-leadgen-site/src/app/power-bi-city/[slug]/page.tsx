import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

// Programmatic SEO: one page per city (USA + EU)
// Scale by adding entries to the cities object

interface CityData {
  name: string;
  state?: string;
  country: string;
  region: 'USA' | 'EU' | 'UK';
  description: string;
  industries: string[];
  timezone: string;
}

const cities: Record<string, CityData> = {
  // USA Cities
  'new-york': { name: 'New York', state: 'NY', country: 'USA', region: 'USA', description: 'serving FinTech, media, and enterprise businesses in NYC and the tri-state area', industries: ['Finance', 'Media', 'Real Estate', 'SaaS', 'Healthcare'], timezone: 'EST (UTC-5)' },
  'chicago': { name: 'Chicago', state: 'IL', country: 'USA', region: 'USA', description: 'serving manufacturing, finance, and B2B service businesses in the Chicago metro', industries: ['Manufacturing', 'Finance', 'Logistics', 'Healthcare', 'B2B Services'], timezone: 'CST (UTC-6)' },
  'los-angeles': { name: 'Los Angeles', state: 'CA', country: 'USA', region: 'USA', description: 'serving ecommerce, entertainment, and DTC brands in LA and Southern California', industries: ['Ecommerce', 'Entertainment', 'DTC', 'Real Estate', 'Healthcare'], timezone: 'PST (UTC-8)' },
  'austin': { name: 'Austin', state: 'TX', country: 'USA', region: 'USA', description: 'serving fast-growing SaaS, tech, and startup businesses in the Austin metro', industries: ['SaaS', 'Technology', 'Fintech', 'Ecommerce', 'Real Estate'], timezone: 'CST (UTC-6)' },
  'miami': { name: 'Miami', state: 'FL', country: 'USA', region: 'USA', description: 'serving finance, real estate, and Latin America-focused businesses in Miami', industries: ['Finance', 'Real Estate', 'Healthcare', 'Hospitality', 'Tech'], timezone: 'EST (UTC-5)' },
  'seattle': { name: 'Seattle', state: 'WA', country: 'USA', region: 'USA', description: 'serving SaaS, ecommerce, and technology companies in the Seattle area', industries: ['SaaS', 'Ecommerce', 'Technology', 'Healthcare', 'Aerospace'], timezone: 'PST (UTC-8)' },
  'boston': { name: 'Boston', state: 'MA', country: 'USA', region: 'USA', description: 'serving biotech, healthcare, and higher education organizations in the Boston area', industries: ['Healthcare', 'Biotech', 'Education', 'Finance', 'SaaS'], timezone: 'EST (UTC-5)' },
  'dallas': { name: 'Dallas', state: 'TX', country: 'USA', region: 'USA', description: 'serving energy, finance, and manufacturing businesses in the Dallas-Fort Worth metro', industries: ['Energy', 'Finance', 'Manufacturing', 'Healthcare', 'Logistics'], timezone: 'CST (UTC-6)' },
  // EU Cities
  'london': { name: 'London', country: 'UK', region: 'UK', description: 'serving FinTech, professional services, and enterprise clients across Greater London and the UK', industries: ['FinTech', 'Finance', 'Professional Services', 'Ecommerce', 'SaaS'], timezone: 'GMT (UTC+0)' },
  'amsterdam': { name: 'Amsterdam', country: 'Netherlands', region: 'EU', description: 'serving SaaS, logistics, and technology companies across the Netherlands and Benelux', industries: ['SaaS', 'Logistics', 'Technology', 'Finance', 'Ecommerce'], timezone: 'CET (UTC+1)' },
  'berlin': { name: 'Berlin', country: 'Germany', region: 'EU', description: 'serving tech startups, ecommerce, and manufacturing businesses across Germany', industries: ['Technology', 'Ecommerce', 'Manufacturing', 'SaaS', 'Healthcare'], timezone: 'CET (UTC+1)' },
  'paris': { name: 'Paris', country: 'France', region: 'EU', description: 'serving luxury, retail, and financial services businesses across France and francophone Europe', industries: ['Luxury', 'Retail', 'Finance', 'Technology', 'Manufacturing'], timezone: 'CET (UTC+1)' },
  'dublin': { name: 'Dublin', country: 'Ireland', region: 'EU', description: 'serving the thriving tech, pharma, and financial services sectors across Ireland', industries: ['Technology', 'Pharma', 'Finance', 'SaaS', 'Professional Services'], timezone: 'GMT (UTC+0)' },
  'stockholm': { name: 'Stockholm', country: 'Sweden', region: 'EU', description: 'serving SaaS, gaming, and technology companies across Scandinavia', industries: ['SaaS', 'Gaming', 'Technology', 'Ecommerce', 'Finance'], timezone: 'CET (UTC+1)' },
};

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return Object.keys(cities).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = cities[params.slug];
  if (!city) return { title: 'Not Found' };

  const locationStr = city.state ? `${city.name}, ${city.state}` : `${city.name}, ${city.country}`;
  return {
    title: `Power BI Consultant ${locationStr} — Custom Dashboard Services`,
    description: `Looking for a Power BI consultant in ${city.name}? We build custom Power BI dashboards for ${city.industries.slice(0, 3).join(', ')} businesses in ${city.name}. Book a free demo.`,
    alternates: { canonical: `https://www.powerbipro.agency/power-bi-city/${params.slug}` },
  };
}

export default function CityPage({ params }: PageProps) {
  const city = cities[params.slug];
  if (!city) notFound();

  const locationStr = city.state ? `${city.name}, ${city.state}` : `${city.name}, ${city.country}`;
  const regionLabel = city.region === 'USA' ? 'US' : city.region;

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `PowerBI Pro Agency — ${city.name}`,
    description: `Power BI consultant ${city.name} — custom dashboard services for ${city.industries.join(', ')} businesses`,
    url: `https://www.powerbipro.agency/power-bi-city/${params.slug}`,
    areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'Country', name: city.country } },
    serviceType: 'Power BI Dashboard Development',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-900 text-white section-padding">
        <div className="container-xl">
          <div className="max-w-3xl">
            <nav className="text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              {' → '}
              <span className="text-gray-200">Power BI Consultant {locationStr}</span>
            </nav>
            <span className="section-badge bg-white/10 border border-white/20 text-white">
              {regionLabel} Clients
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-6">
              Power BI Consultant
              <br />
              <span className="text-amber-400">{locationStr}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We're a specialist Power BI agency {city.description}.
              Remote-first, fast delivery, and results-focused.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://calendly.com/your-link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                📅 Book Free Demo — {city.name}
              </a>
              <Link href="/case-studies" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary-700">
                View Client Results →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="section-badge">Industries We Serve in {city.name}</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Power BI Dashboards for {city.name} Businesses
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We work with businesses across {city.name} and {city.state || city.country} to build custom Power BI dashboards
                that replace manual reporting and deliver real-time visibility into the metrics that matter.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {city.industries.map((ind) => (
                  <Link
                    key={ind}
                    href={`/power-bi-industry/${ind.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-primary-50 text-primary-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-primary-100 transition-colors"
                  >
                    {ind}
                  </Link>
                ))}
              </div>
              <div className="card">
                <h3 className="font-bold text-gray-900 mb-3">Working With {city.name} Clients</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2"><span>🌐</span>100% remote — discovery and training via Zoom</li>
                  <li className="flex gap-2"><span>🕐</span>We accommodate {city.timezone} business hours</li>
                  <li className="flex gap-2"><span>⚡</span>Typically 2–4 weeks from kickoff to live dashboard</li>
                  <li className="flex gap-2"><span>💬</span>Async-friendly — no need for daily check-ins</li>
                  {city.region === 'EU' && (
                    <li className="flex gap-2"><span>🔒</span>GDPR-compliant data architecture built-in</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: '📊', title: 'Custom dashboards, not templates', desc: 'Every dashboard is architected around your specific data sources and KPIs.' },
                { icon: '⚡', title: 'Fast, predictable delivery', desc: `Most ${city.name} clients have a live dashboard within 2–4 weeks of starting.` },
                { icon: '🔗', title: 'Connect any data source', desc: 'Salesforce, QuickBooks, Shopify, SQL, Google Analytics — we connect them all.' },
                { icon: '🎓', title: 'Full training and handover', desc: 'Your team will own and maintain the dashboard after we deliver it.' },
                { icon: '🛡️', title: '100% satisfaction guarantee', desc: 'If you're not happy after the first revision round, we'll refund your deposit.' },
              ].map((b) => (
                <div key={b.title} className="card flex items-start gap-4">
                  <div className="text-3xl">{b.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                    <p className="text-sm text-gray-600">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Also Serving These {regionLabel} Cities
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(cities)
              .filter(([slug, c]) => slug !== params.slug && c.region === city.region)
              .slice(0, 8)
              .map(([slug, c]) => (
                <Link
                  key={slug}
                  href={`/power-bi-city/${slug}`}
                  className="bg-white border border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={`Ready to Transform Reporting for Your ${city.name} Business?`}
        subheading={`Book a free 45-minute call with our team. We'll review your data setup and show you exactly what a custom Power BI dashboard could deliver for your ${city.name}-based business.`}
        variant="dark"
      />
    </>
  );
}
