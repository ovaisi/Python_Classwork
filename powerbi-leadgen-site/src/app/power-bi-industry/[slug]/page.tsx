import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

// Programmatic SEO: one page per industry
// Scale to 20+ industries by adding entries to this object

interface IndustryData {
  title: string;
  headline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  kpis: string[];
  dataSources: string[];
  painPoints: string[];
  results: { metric: string; label: string }[];
}

const industries: Record<string, IndustryData> = {
  sales: {
    title: 'Sales',
    headline: 'Power BI Sales Dashboard',
    description: 'Real-time pipeline visibility, quota tracking, and rep performance analytics for sales teams.',
    metaTitle: 'Power BI Sales Dashboard — CRM Integration & Pipeline Analytics | PowerBI Pro',
    metaDescription: 'Custom Power BI sales dashboards connecting Salesforce, HubSpot, and your CRM. Real-time pipeline, quota attainment, and win-rate analytics. Get a free demo.',
    kpis: ['Pipeline by stage and rep', 'Revenue vs. quota attainment', 'Win rate by source', 'Deal velocity (days in stage)', 'Forecast vs. actuals', 'Activity-to-close correlation'],
    dataSources: ['Salesforce', 'HubSpot', 'Outreach / Salesloft', 'Stripe / billing system', 'Google Sheets (quota targets)'],
    painPoints: ['Manual weekly Excel pipeline report', 'No real-time visibility into quota attainment', 'CRM data not trusted by leadership', 'Reps using different trackers than leadership'],
    results: [{ metric: '15 hrs', label: 'Saved per week on reporting' }, { metric: '+28%', label: 'Forecast accuracy improvement' }, { metric: '3 weeks', label: 'Delivery time' }, { metric: '$240K', label: 'Pipeline leakage found' }],
  },
  finance: {
    title: 'Finance',
    headline: 'Power BI Finance Dashboard',
    description: 'P&L, cash flow, budget vs. actuals, and AR/AP aging — all live, all connected, all automated.',
    metaTitle: 'Power BI Finance Dashboard for CFOs — P&L, Cash Flow & Budget Tracking',
    metaDescription: 'Power BI finance dashboards for CFOs and finance teams. Connects QuickBooks, Xero, NetSuite. Real-time P&L, budget vs actuals, and board-ready reporting.',
    kpis: ['P&L by department and period', 'Budget vs. actuals variance', 'Cash flow (13-week rolling)', 'AR/AP aging', 'Gross margin by product line', 'EBITDA trend'],
    dataSources: ['QuickBooks Online', 'Xero', 'NetSuite / SAP', 'Bank feed (via Plaid)', 'Excel budget files'],
    painPoints: ['Monthly close takes 3+ days', 'No unified view across multiple entities', 'Board reports built manually in PowerPoint', 'No visibility into department-level budget burn'],
    results: [{ metric: '3 days → 0', label: 'Monthly close reporting time' }, { metric: '€180K', label: 'Cost overruns identified' }, { metric: '98%', label: 'Data accuracy vs. manual' }, { metric: '4 weeks', label: 'Full implementation' }],
  },
  ecommerce: {
    title: 'Ecommerce',
    headline: 'Power BI Ecommerce Dashboard',
    description: 'Unified view of Shopify, Amazon, and ad platforms — product profitability, LTV, and ROAS in one place.',
    metaTitle: 'Power BI Ecommerce Dashboard — Shopify, Amazon & Ad Attribution Analytics',
    metaDescription: 'Power BI dashboards for ecommerce brands. Connects Shopify, Amazon Seller Central, Google Ads, and Meta. Track LTV, ROAS, return rates, and inventory.',
    kpis: ['Gross profit by SKU and channel', 'Customer LTV by cohort', 'Blended MER (Marketing Efficiency Ratio)', 'Return rate by product', 'Inventory turnover and stockout risk', 'Channel revenue breakdown'],
    dataSources: ['Shopify', 'Amazon Seller Central', 'Google Ads', 'Meta Ads', 'Klaviyo / Attentive', 'WooCommerce'],
    painPoints: ['Data siloed across 3+ platforms', 'No unified profit view (revenue ≠ profit)', 'Ad attribution is platform-reported (unreliable)', 'Stockouts happen without warning'],
    results: [{ metric: '€40K/mo', label: 'Revenue leak found' }, { metric: '+22%', label: 'ROAS after reallocation' }, { metric: '1 dashboard', label: 'Replacing 3 platform reports' }, { metric: '2 weeks', label: 'Delivery time' }],
  },
  saas: {
    title: 'SaaS',
    headline: 'Power BI SaaS Metrics Dashboard',
    description: 'The dashboard every SaaS founder and investor wants: MRR, churn, CAC, LTV, and NRR — live and accurate.',
    metaTitle: 'Power BI SaaS Dashboard — MRR, Churn, CAC & LTV Analytics',
    metaDescription: 'Custom Power BI dashboards for SaaS companies. Track MRR, ARR, churn, NRR, CAC, and LTV. Connects Stripe, Chargebee, and your CRM. Investor-ready views.',
    kpis: ['MRR/ARR with waterfall breakdown', 'Logo and revenue churn rate', 'Net Revenue Retention (NRR)', 'CAC by channel and cohort', 'LTV:CAC ratio', 'Expansion and contraction MRR'],
    dataSources: ['Stripe', 'Chargebee', 'Recurly', 'Salesforce / HubSpot', 'Intercom / Zendesk (NPS)'],
    painPoints: ['No single view of MRR and churn together', 'Investors ask for metrics not currently tracked', 'CAC calculated differently by marketing and finance', 'No cohort-level retention analysis'],
    results: [{ metric: 'NRR 94→108%', label: 'Retention improvement visibility' }, { metric: '+40%', label: 'Faster investor reporting' }, { metric: '1 source', label: 'Of truth for all SaaS metrics' }, { metric: '3 weeks', label: 'Build time' }],
  },
  marketing: {
    title: 'Marketing',
    headline: 'Power BI Marketing Dashboard',
    description: 'Unify Google Ads, Meta, LinkedIn, email, and organic into one marketing performance cockpit.',
    metaTitle: 'Power BI Marketing Dashboard — ROAS, CPL & Multi-Channel Attribution',
    metaDescription: 'Power BI marketing dashboards tracking ROAS, CPL, and MER across Google Ads, Meta, LinkedIn, and email. Blended attribution models for smarter budget decisions.',
    kpis: ['Blended MER and channel ROAS', 'Lead volume and CPL by channel', 'Multi-touch attribution model', 'Email revenue per recipient', 'SEO traffic and keyword rank', 'Campaign-level ROI'],
    dataSources: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Google Analytics 4', 'Klaviyo / Mailchimp', 'SEMrush / Ahrefs API'],
    painPoints: ['ROAS data lives in separate platforms', 'No blended view of ad spend vs. total revenue', 'Attribution conflicts between platforms', 'Monthly reporting takes 2 days to compile'],
    results: [{ metric: '+31%', label: 'ROAS improvement post-reallocation' }, { metric: '2 days → 20 min', label: 'Monthly report time' }, { metric: '1 dashboard', label: 'All channels unified' }, { metric: '2 weeks', label: 'Build time' }],
  },
  healthcare: {
    title: 'Healthcare',
    headline: 'Power BI Healthcare Dashboard',
    description: 'HIPAA-compliant operational and financial dashboards for healthcare providers and health-tech companies.',
    metaTitle: 'Power BI Healthcare Dashboard — HIPAA-Compliant Analytics for Providers',
    metaDescription: 'HIPAA-compliant Power BI dashboards for healthcare organizations. Patient volume, revenue cycle, payer mix, and operational efficiency — all automated.',
    kpis: ['Patient volume by facility and provider', 'Revenue cycle KPIs (AR days, collection rate)', 'Payer mix analysis', 'No-show and cancellation rates', 'Staff utilization and scheduling', 'Cost per patient visit'],
    dataSources: ['Epic / Cerner EHR', 'Practice Management System', 'RCM platform', 'Payroll system', 'Insurance payer data'],
    painPoints: ['No unified view across multiple locations', 'Revenue cycle KPIs buried in EHR reports', 'No proactive visibility into no-show trends', 'Compliance reporting is manual and time-consuming'],
    results: [{ metric: '-18%', label: 'AR days reduced' }, { metric: '+12%', label: 'Collection rate improvement' }, { metric: '100%', label: 'HIPAA compliant architecture' }, { metric: '4 weeks', label: 'Implementation time' }],
  },
};

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = industries[params.slug];
  if (!data) return { title: 'Not Found' };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `https://www.powerbipro.agency/power-bi-industry/${params.slug}` },
  };
}

export default function IndustryPage({ params }: PageProps) {
  const data = industries[params.slug];
  if (!data) notFound();

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${data.headline} Service`,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: 'PowerBI Pro Agency',
      url: 'https://www.powerbipro.agency',
    },
    areaServed: ['United States', 'European Union'],
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
              <Link href="/services" className="hover:text-white">Services</Link>
              {' → '}
              <span className="text-gray-200">{data.title}</span>
            </nav>
            <span className="section-badge bg-white/10 border border-white/20 text-white">
              {data.title} Industry
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-6">
              {data.headline}
              <br />
              <span className="text-amber-400">for {data.title} Teams</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">{data.description}</p>
            <a
              href="https://calendly.com/your-link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
            >
              📅 Book Free {data.title} Dashboard Demo
            </a>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.results.map((r) => (
              <div key={r.label} className="text-center">
                <p className="text-3xl font-extrabold text-white mb-1">{r.metric}</p>
                <p className="text-sm text-primary-100">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* KPIs */}
            <div className="card">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
                📊 KPIs Included in Your {data.title} Dashboard
              </h2>
              <ul className="space-y-3">
                {data.kpis.map((kpi) => (
                  <li key={kpi} className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-lg">✓</span>
                    <span className="text-gray-700">{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pain Points + Data Sources */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                  😩 Problems We Solve
                </h2>
                <ul className="space-y-2">
                  {data.painPoints.map((pain) => (
                    <li key={pain} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="text-red-400 font-bold mt-0.5">✗</span>
                      {pain}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">
                  🔗 Data Sources We Connect
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.dataSources.map((ds) => (
                    <span
                      key={ds}
                      className="bg-primary-50 text-primary-700 text-sm font-medium px-3 py-1.5 rounded-full"
                    >
                      {ds}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl text-center max-w-3xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Your {data.title} Dashboard in 4 Steps
          </h2>
          <p className="text-gray-600 mb-10">
            From your first call to a live, auto-refreshing {data.title.toLowerCase()} dashboard — typically in 2–4 weeks.
          </p>
          <div className="grid md:grid-cols-4 gap-6 text-left">
            {[
              { n: '1', t: 'Discovery', d: `We map your ${data.title.toLowerCase()} data sources and define your most important KPIs.` },
              { n: '2', t: 'Data Architecture', d: 'We build a clean, reliable data model connecting all your sources.' },
              { n: '3', t: 'Dashboard Build', d: `We build and refine your ${data.title.toLowerCase()} dashboard with your feedback.` },
              { n: '4', t: 'Training & Launch', d: 'We train your team and hand over a fully documented, live dashboard.' },
            ].map((step) => (
              <div key={step.n} className="card">
                <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center font-bold mb-3">
                  {step.n}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.t}</h3>
                <p className="text-sm text-gray-600">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={`Ready to See Your ${data.title} Dashboard?`}
        subheading={`Book a free 45-minute call. We'll show you exactly what a ${data.title.toLowerCase()} Power BI dashboard would look like for your business — at no cost.`}
        variant="dark"
      />
    </>
  );
}
