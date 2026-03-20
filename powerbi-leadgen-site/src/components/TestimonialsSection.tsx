const testimonials = [
  {
    quote:
      "We went from spending 15 hours a week on Excel reports to having everything live in Power BI. Our VP of Sales now has real-time pipeline visibility. Game changer.",
    author: 'Sarah Mitchell',
    title: 'Head of Revenue Operations',
    company: 'TechScale Inc. — Austin, TX',
    rating: 5,
  },
  {
    quote:
      "The finance dashboard they built connects to our QuickBooks and Salesforce. Our CFO reviews it every Monday morning instead of asking for manual reports. ROI was immediate.",
    author: 'James Okonkwo',
    title: 'CFO',
    company: 'Meridian Group — London, UK',
    rating: 5,
  },
  {
    quote:
      "Our ecommerce team was drowning in data from 3 platforms. Now it's all unified in one dashboard. We identified a €40K/month revenue leak in the first week.",
    author: 'Lena Brauer',
    title: 'E-Commerce Director',
    company: 'NordStyle GmbH — Berlin, DE',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <div className="text-center mb-12">
          <span className="section-badge">Client Results</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Real Businesses. Real Results.
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Don't take our word for it — here's what our clients say after working with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.author} className="card border-l-4 border-l-primary-500 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed flex-1 italic mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 text-sm">
                  {t.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.title} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-6 md:p-8 text-center max-w-3xl mx-auto">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">100% Satisfaction Guarantee</h3>
          <p className="text-gray-600">
            If you're not fully satisfied with the dashboard after the first revision round,
            we'll refund your deposit — no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
