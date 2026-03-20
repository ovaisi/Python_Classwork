import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import TestimonialsSection from '@/components/TestimonialsSection';
import StatsSection from '@/components/StatsSection';

export const metadata: Metadata = {
  title: 'Power BI Dashboard Services for USA & EU Businesses | DataZeb',
  description:
    'We build custom Power BI dashboards that save 10+ hours/week and increase revenue visibility. Trusted by 40+ businesses across the USA and EU. Book your free demo today.',
  alternates: { canonical: 'https://www.datazeb.com' },
};

const industries = [
  { icon: '📈', label: 'Sales Analytics' },
  { icon: '💰', label: 'Finance & CFO' },
  { icon: '🛒', label: 'Ecommerce' },
  { icon: '📊', label: 'SaaS Metrics' },
  { icon: '🏭', label: 'Manufacturing' },
  { icon: '🏥', label: 'Healthcare' },
];

const features = [
  {
    icon: '⚡',
    title: 'Live, Real-Time Data',
    desc: 'Dashboards that refresh automatically — no more manual Excel reports or outdated spreadsheets.',
  },
  {
    icon: '🎯',
    title: 'Built for Your KPIs',
    desc: 'Every metric is designed around what actually drives your business — revenue, churn, margins, pipeline.',
  },
  {
    icon: '🔗',
    title: 'Connects to Any Source',
    desc: 'Salesforce, HubSpot, Shopify, QuickBooks, Google Analytics, SQL — we connect them all.',
  },
  {
    icon: '🔒',
    title: 'Enterprise-Grade Security',
    desc: 'Row-level security, Azure AD integration, and GDPR-compliant data handling built-in.',
  },
  {
    icon: '📱',
    title: 'Mobile-Friendly Reports',
    desc: 'Your team can access critical KPIs from any device, anywhere — including the Power BI mobile app.',
  },
  {
    icon: '🚀',
    title: 'Fast Delivery (2–4 Weeks)',
    desc: 'From kickoff to live dashboard in 2–4 weeks. No bloated timelines or expensive consulting fees.',
  },
];

const processSteps = [
  { step: '01', title: 'Discovery Call', desc: 'We map your data sources, KPIs, and business goals in a 45-min strategy session.' },
  { step: '02', title: 'Data Architecture', desc: 'We design the data model and connect all your sources into a clean, reliable pipeline.' },
  { step: '03', title: 'Dashboard Build', desc: 'We build your custom Power BI dashboards with your branding and exact KPIs.' },
  { step: '04', title: 'Training & Handoff', desc: 'We train your team and provide documentation. You own the dashboard forever.' },
];

export default function HomePage() {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'DataZeb',
    url: 'https://www.datazeb.com',
    description: 'Custom Power BI dashboard development for USA and EU businesses',
    serviceType: 'Business Intelligence Consulting',
    areaServed: ['United States', 'European Union'],
    offers: {
      '@type': 'Offer',
      description: 'Free Power BI Dashboard Consultation',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container-xl section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Trusted by 40+ businesses in USA & EU
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Turn Your Messy Data Into{' '}
              <span className="text-amber-400">Revenue-Driving</span>{' '}
              Power BI Dashboards
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              We build custom Power BI dashboards for sales, finance, and ecommerce teams
              that save <strong className="text-white">10+ hours per week</strong> and make your KPIs impossible to ignore.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://calendly.com/your-link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                📅 Book Free Demo Call
              </a>
              <Link href="/case-studies" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary-700">
                View Case Studies →
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">✅ Free 45-min consultation</span>
              <span className="flex items-center gap-2">✅ No lock-in contracts</span>
              <span className="flex items-center gap-2">✅ Delivery in 2–4 weeks</span>
              <span className="flex items-center gap-2">✅ 100% satisfaction guarantee</span>
            </div>
          </div>
        </div>

        {/* Dashboard mockup bar */}
        <div className="container-xl pb-12 relative z-10">
          <div className="bg-gray-800/60 backdrop-blur border border-white/10 rounded-2xl p-4 max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-400 ml-2">Sales Performance Dashboard — Live</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Monthly Revenue', value: '$2.4M', change: '+18%' },
                { label: 'Deals Closed', value: '142', change: '+24%' },
                { label: 'Avg Deal Size', value: '$16.9K', change: '+7%' },
                { label: 'Win Rate', value: '38%', change: '+5%' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-gray-700/50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">{kpi.label}</p>
                  <p className="text-xl font-bold text-white">{kpi.value}</p>
                  <p className="text-xs text-green-400 font-medium">{kpi.change} vs last month</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <StatsSection />

      {/* INDUSTRIES */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl">
          <div className="text-center mb-12">
            <span className="section-badge">Industries We Serve</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Power BI Dashboards for Every Industry
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're a $1M startup or a $100M enterprise, we build dashboards
              tailored to your exact data and decision-making needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind) => (
              <div key={ind.label} className="card text-center hover:border-primary-200 hover:bg-primary-50 cursor-pointer transition-all">
                <div className="text-3xl mb-2">{ind.icon}</div>
                <p className="font-semibold text-sm text-gray-800">{ind.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="text-center mb-12">
            <span className="section-badge">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Dashboards That Actually Drive Decisions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We don't just build pretty charts. We architect data pipelines that deliver
              the right information to the right people at the right time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card group hover:border-primary-200">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl">
          <div className="text-center mb-12">
            <span className="section-badge">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              From Kickoff to Live Dashboard in 4 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-200 z-0" style={{ width: 'calc(100% - 2rem)' }} />
                )}
                <div className="card relative z-10">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* CTA SECTION */}
      <CTASection />
    </>
  );
}
