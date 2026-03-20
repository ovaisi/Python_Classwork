import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Power BI Dashboard Services — Sales, Finance, Ecommerce & More',
  description:
    'Explore our Power BI dashboard services for sales teams, CFOs, ecommerce brands, and SaaS companies. Custom dashboards delivered in 2–4 weeks.',
  alternates: { canonical: 'https://www.datazeb.com/services' },
};

const services = [
  {
    icon: '📈',
    title: 'Sales Performance Dashboard',
    slug: 'sales',
    price: 'From $1,500',
    description:
      'Give your sales team and leadership real-time visibility into pipeline, revenue, quota attainment, rep performance, and deal velocity.',
    features: [
      'Pipeline by stage, rep, and region',
      'Revenue vs. quota tracking',
      'Win/loss analysis with root-cause breakdown',
      'Forecasting with trend lines',
      'CRM integration (Salesforce, HubSpot)',
      'Daily auto-refresh',
    ],
    ideal: 'Sales Directors, RevOps, VPs of Sales',
  },
  {
    icon: '💰',
    title: 'Finance & CFO Dashboard',
    slug: 'finance',
    price: 'From $2,000',
    description:
      'A single source of truth for your finance team — P&L, cash flow, burn rate, AR/AP aging, and budget vs. actuals in one place.',
    features: [
      'P&L by department and period',
      'Cash flow waterfall chart',
      'Budget vs. actuals variance',
      'AR/AP aging analysis',
      'QuickBooks & Xero integration',
      'Board-ready export templates',
    ],
    ideal: 'CFOs, Controllers, Finance Managers',
  },
  {
    icon: '🛒',
    title: 'Ecommerce Analytics Dashboard',
    slug: 'ecommerce',
    price: 'From $1,800',
    description:
      'Stop guessing which products, channels, and campaigns drive profit. Get a unified view of your entire ecommerce operation.',
    features: [
      'Revenue by channel, product, and SKU',
      'Customer LTV and cohort analysis',
      'Shopify, WooCommerce, Amazon integration',
      'Ad spend vs. revenue attribution',
      'Inventory turnover and stockout alerts',
      'Refund and return rate tracking',
    ],
    ideal: 'Ecommerce Founders, Marketing Managers, Ops Teams',
  },
  {
    icon: '📊',
    title: 'SaaS Metrics Dashboard',
    slug: 'saas',
    price: 'From $2,500',
    description:
      'The dashboard every SaaS founder and investor wants to see: MRR, ARR, churn, NPS, CAC, LTV, and expansion revenue.',
    features: [
      'MRR/ARR with waterfall breakdown',
      'Churn rate (logo and revenue)',
      'CAC by channel and cohort',
      'Net Revenue Retention (NRR)',
      'Stripe, Chargebee, Baremetrics integration',
      'Investor-ready board view',
    ],
    ideal: 'SaaS Founders, CPOs, Investor-Backed Teams',
  },
  {
    icon: '📣',
    title: 'Marketing Performance Dashboard',
    slug: 'marketing',
    price: 'From $1,500',
    description:
      'Unify your marketing data from Google Ads, Meta, LinkedIn, email, and organic into one performance cockpit.',
    features: [
      'ROAS by channel and campaign',
      'Lead volume, CPL, and conversion rates',
      'Multi-touch attribution model',
      'SEO traffic and keyword rankings',
      'Email open/click/conversion tracking',
      'Google Ads & Meta Ads API integration',
    ],
    ideal: 'CMOs, Performance Marketers, Growth Teams',
  },
  {
    icon: '🏭',
    title: 'Operations & Supply Chain Dashboard',
    slug: 'operations',
    price: 'From $2,000',
    description:
      'Monitor production efficiency, supplier performance, on-time delivery, and operational costs in real time.',
    features: [
      'OEE and production throughput',
      'Supplier on-time delivery tracking',
      'Inventory levels and reorder alerts',
      'Cost per unit analysis',
      'ERP integration (SAP, NetSuite, Odoo)',
      'Shift-level performance tracking',
    ],
    ideal: 'COOs, Plant Managers, Supply Chain Directors',
  },
];

export default function ServicesPage() {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Power BI Dashboard Services',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      description: s.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-900 text-white section-padding">
        <div className="container-xl text-center">
          <span className="section-badge bg-white/10 border border-white/20 text-white">Our Services</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-6">
            Power BI Dashboard Services
            <br />
            <span className="text-amber-400">Built for Your Business</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            We specialize in building custom, automated Power BI dashboards for businesses
            across the USA and EU. Every dashboard is tailored — no templates, no fluff.
          </p>
          <a
            href="https://calendly.com/your-link"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent"
          >
            📅 Book Free Discovery Call
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.slug} className="card border hover:border-primary-300 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{service.icon}</div>
                    <div>
                      <h2 className="font-bold text-xl text-gray-900">{service.title}</h2>
                      <span className="text-primary-600 font-semibold text-sm">{service.price}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-5 leading-relaxed">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Best for:</p>
                    <p className="text-xs font-medium text-gray-700">{service.ideal}</p>
                  </div>
                  <Link
                    href={`/power-bi-industry/${service.slug}`}
                    className="btn-primary text-sm py-2 px-4"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Philosophy */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-badge">Pricing</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 mb-8">
              We quote per project — not per hour. Every engagement includes a discovery call,
              data architecture, dashboard build, revision round, and training. Ongoing maintenance
              retainers available from $500/month.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { tier: 'Starter', price: '$1,500–$2,500', desc: '1–2 data sources, 1 dashboard, 3-page report', best: 'Small teams, first dashboards' },
                { tier: 'Growth', price: '$2,500–$5,000', desc: '3–5 data sources, 2–3 dashboards, automation setup', best: 'Mid-size businesses', highlight: true },
                { tier: 'Enterprise', price: '$5,000+', desc: 'Unlimited sources, full data warehouse, ongoing support', best: 'Large orgs, complex needs' },
              ].map((plan) => (
                <div key={plan.tier} className={`card text-left ${plan.highlight ? 'border-primary-400 bg-primary-50' : ''}`}>
                  {plan.highlight && (
                    <span className="inline-block bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-bold text-xl text-gray-900 mb-1">{plan.tier}</h3>
                  <p className="text-2xl font-extrabold text-primary-600 mb-3">{plan.price}</p>
                  <p className="text-gray-600 text-sm mb-3">{plan.desc}</p>
                  <p className="text-xs text-gray-500">Best for: {plan.best}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Not Sure Which Service You Need?"
        subheading="Book a free 45-minute call. We'll review your data setup and recommend the exact dashboard that would give you the most ROI — with no obligation to hire us."
        variant="dark"
      />
    </>
  );
}
