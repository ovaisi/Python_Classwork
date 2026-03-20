import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Power BI Case Studies — Real Results for Real Businesses',
  description:
    'See how we helped businesses in the USA and EU save 10+ hours/week and uncover hidden revenue with custom Power BI dashboards.',
  alternates: { canonical: 'https://www.datazeb.com/case-studies' },
};

const caseStudies = [
  {
    slug: 'techscale-sales-dashboard',
    industry: 'SaaS',
    company: 'TechScale Inc.',
    location: 'Austin, TX — USA',
    title: 'How TechScale Went From Weekly Excel Hell to Real-Time Sales Intelligence',
    challenge:
      'TechScale's sales team was producing a 40-tab Excel report manually every Monday. It took 15 hours, was always outdated, and no one trusted the numbers.',
    solution:
      'We connected Salesforce, HubSpot, and their billing platform (Stripe) into a unified Power BI sales dashboard with daily auto-refresh.',
    results: [
      { metric: '15 hrs/week', label: 'Time saved on manual reporting' },
      { metric: '+31%', label: 'Increase in quota attainment visibility' },
      { metric: '$240K', label: 'Pipeline leakage identified in month 1' },
      { metric: '3 weeks', label: 'Delivery time from kickoff to live' },
    ],
    quote: 'Our CRO now starts every Monday with the dashboard open on the big screen. We finally know what's happening in our pipeline in real time.',
    author: 'Sarah Mitchell, Head of RevOps',
    image: '📈',
  },
  {
    slug: 'meridian-finance-dashboard',
    industry: 'Professional Services',
    company: 'Meridian Group',
    location: 'London, UK — EU',
    title: 'How Meridian's CFO Eliminated Manual Reporting Across 3 Entities',
    challenge:
      'Meridian operated three business entities across the UK and Germany. Consolidating financials each month took 3 days and was error-prone.',
    solution:
      'We built a multi-entity finance dashboard pulling from QuickBooks (UK) and DATEV (Germany), with automated FX conversion and group-level P&L.',
    results: [
      { metric: '3 days → 0', label: 'Time spent on monthly close reporting' },
      { metric: '€180K', label: 'Cost overruns identified in first quarter' },
      { metric: '98%', label: 'Data accuracy improvement vs. manual process' },
      { metric: '4 weeks', label: 'Full implementation including FX setup' },
    ],
    quote: 'We identified a €180K cost overrun in Q2 that we would have missed without this dashboard. It paid for itself in the first month.',
    author: 'James Okonkwo, CFO',
    image: '💰',
  },
  {
    slug: 'nordstyle-ecommerce-dashboard',
    industry: 'Ecommerce',
    company: 'NordStyle GmbH',
    location: 'Berlin, DE — EU',
    title: 'How NordStyle Found a €40K/Month Revenue Leak Using a Unified Ecommerce Dashboard',
    challenge:
      'NordStyle sold on Shopify, Amazon, and their own website. Data was siloed in three platforms with no way to see total profit, LTV, or ad attribution.',
    solution:
      'We unified all three channels into a single Power BI dashboard with product-level profitability, ad attribution, and customer LTV cohort analysis.',
    results: [
      { metric: '€40K/mo', label: 'Revenue leak found from high-return SKUs' },
      { metric: '+22%', label: 'Increase in ROAS after reallocating ad budget' },
      { metric: '1 dashboard', label: 'Replacing 3 separate platform reports' },
      { metric: '2 weeks', label: 'Time to first live dashboard' },
    ],
    quote: 'We had a product category returning at 45% that we didn't know about. Fixing it was worth more than the dashboard cost in month one.',
    author: 'Lena Brauer, E-Commerce Director',
    image: '🛒',
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-900 text-white section-padding">
        <div className="container-xl text-center">
          <span className="section-badge bg-white/10 border border-white/20 text-white">Case Studies</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-6">
            Real Results for{' '}
            <span className="text-amber-400">Real Businesses</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See exactly how we've helped businesses across the USA and EU eliminate manual
            reporting and uncover revenue with Power BI dashboards.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding">
        <div className="container-xl space-y-12">
          {caseStudies.map((cs, idx) => (
            <div key={cs.slug} className={`grid lg:grid-cols-2 gap-10 items-start ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{cs.image}</span>
                  <div>
                    <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {cs.industry}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{cs.company} · {cs.location}</p>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{cs.title}</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-red-700 text-sm uppercase tracking-wide mb-1">The Challenge</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-700 text-sm uppercase tracking-wide mb-1">Our Solution</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{cs.solution}</p>
                  </div>
                </div>

                <blockquote className="bg-gray-50 border-l-4 border-primary-500 rounded-r-xl p-4 mb-6">
                  <p className="text-gray-700 italic text-sm mb-2">"{cs.quote}"</p>
                  <cite className="text-xs text-gray-500 not-italic font-semibold">— {cs.author}</cite>
                </blockquote>
              </div>

              {/* Results */}
              <div className="bg-gray-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-6 text-center">
                  📊 Measurable Results
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {cs.results.map((r) => (
                    <div key={r.label} className="bg-white/10 rounded-xl p-4 text-center">
                      <p className="text-2xl font-extrabold text-amber-400 mb-1">{r.metric}</p>
                      <p className="text-xs text-gray-300 leading-tight">{r.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="https://calendly.com/your-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent text-sm py-3"
                  >
                    Get Similar Results for Your Business
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        heading="Want Results Like These?"
        subheading="Book a free call and we'll show you how a custom Power BI dashboard could transform your reporting in 2–4 weeks."
        variant="dark"
      />
    </>
  );
}
