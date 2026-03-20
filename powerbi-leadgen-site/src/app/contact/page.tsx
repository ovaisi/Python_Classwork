import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Book a Free Power BI Dashboard Consultation',
  description:
    'Book a free 45-minute Power BI strategy call. We'll review your data setup and show you exactly what a custom dashboard could do for your business.',
  alternates: { canonical: 'https://www.datazeb.com/contact' },
};

const faqs = [
  {
    q: 'How long does it take to build a Power BI dashboard?',
    a: 'Most projects take 2–4 weeks from kickoff to go-live. Complex multi-source projects may take 4–6 weeks. We'll give you a precise timeline during your discovery call.',
  },
  {
    q: 'Do I need a Power BI license?',
    a: 'To share dashboards with your team, you need Power BI Pro ($10/user/month) or Power BI Premium. We'll guide you through the most cost-effective licensing option during onboarding.',
  },
  {
    q: 'What data sources can you connect?',
    a: 'Power BI connects to 200+ data sources. We commonly work with Salesforce, HubSpot, Shopify, QuickBooks, Xero, Google Analytics, Meta Ads, SQL databases, Excel, and more.',
  },
  {
    q: 'Do you work with clients outside the USA?',
    a: 'Yes — we serve clients across the EU, UK, Canada, and Australia. All work is done remotely with async communication and scheduled video calls.',
  },
  {
    q: 'What happens after the dashboard is built?',
    a: 'We provide a full training session, documentation, and 30 days of free support. We also offer ongoing maintenance retainers from $500/month if you want continued support.',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-900 text-white section-padding">
        <div className="container-xl text-center">
          <span className="section-badge bg-white/10 border border-white/20 text-white">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-6">
            Book Your Free{' '}
            <span className="text-amber-400">Power BI Strategy Call</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            In 45 minutes, we'll map your data sources, identify your biggest reporting pain points,
            and show you exactly what a custom dashboard could deliver for your business.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Form */}
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                Get Your Free Dashboard Audit
              </h2>
              <p className="text-gray-600 mb-6">
                Fill in the form below and we'll reach out within 1 business day to schedule your call.
              </p>

              {/*
                INTEGRATION NOTE:
                Replace this iframe src with your actual Google Form embed URL.
                Go to Google Forms → Send → Embed → copy the src URL.
                Google Forms is 100% free with no backend needed.
              */}
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
                <p className="text-gray-500 text-sm mb-4">
                  📋 <strong>Integration Point:</strong> Embed your Google Form here.
                </p>
                <p className="text-gray-400 text-xs mb-6">
                  Replace this block with:
                  <code className="block bg-gray-100 rounded p-2 mt-2 text-left text-xs overflow-x-auto">
                    {`<iframe src="YOUR_GOOGLE_FORM_URL" width="100%" height="600" frameBorder="0">Your form</iframe>`}
                  </code>
                </p>

                {/* Fallback direct form for demonstration */}
                <form className="text-left space-y-4" action="#" method="POST">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Smith" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Email *</label>
                    <input type="email" required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Acme Corp" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What industry are you in? *</label>
                    <select required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="">Select your industry</option>
                      <option>SaaS / Software</option>
                      <option>Ecommerce / Retail</option>
                      <option>Finance / Banking</option>
                      <option>Healthcare</option>
                      <option>Manufacturing</option>
                      <option>Professional Services</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What's your biggest data challenge?</label>
                    <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="E.g. Manual Excel reports taking 10+ hours/week, can't see real-time pipeline, no unified view of data..." />
                  </div>
                  <button type="submit" className="w-full btn-accent justify-center">
                    📅 Request My Free Dashboard Audit
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    We respond within 1 business day. No spam, ever.
                  </p>
                </form>
              </div>
            </div>

            {/* Right: Info + Calendly */}
            <div className="space-y-8">
              {/* Calendly embed block */}
              <div className="card">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Prefer to Book Directly?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Skip the form and schedule your free call instantly on Calendly.
                </p>
                {/*
                  INTEGRATION NOTE: Replace with your Calendly inline embed.
                  Go to Calendly → Share → Embed → Inline Embed
                  Add the Calendly script tag to your layout.tsx head
                */}
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    📅 <strong>Calendly Integration Point</strong>
                  </p>
                  <a
                    href="https://calendly.com/your-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Open Calendly — Book Free Call
                  </a>
                </div>
              </div>

              {/* What to expect */}
              <div className="card">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  What to Expect on Your Free Call
                </h3>
                <ul className="space-y-3">
                  {[
                    { icon: '🎯', text: 'We review your current data setup and reporting process' },
                    { icon: '📊', text: 'We identify 2–3 quick wins you could get from a Power BI dashboard' },
                    { icon: '💡', text: 'We walk you through a live example relevant to your industry' },
                    { icon: '📋', text: 'We share a project scope and rough cost estimate (if you're interested)' },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact info */}
              <div className="card">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Prefer Email?</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Send us a message and we'll get back within 1 business day.
                </p>
                <a href="mailto:hello@datazeb.com" className="text-primary-600 font-semibold hover:underline">
                  hello@datazeb.com
                </a>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <span>🌍</span>
                  <span>Serving USA, UK, EU — remote-first agency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-badge">FAQs</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="card group cursor-pointer">
                <summary className="font-semibold text-gray-900 flex items-center justify-between cursor-pointer list-none">
                  {faq.q}
                  <span className="text-primary-600 text-xl ml-4 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
