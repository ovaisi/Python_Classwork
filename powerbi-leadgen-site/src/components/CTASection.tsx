import Link from 'next/link';

interface CTASectionProps {
  heading?: string;
  subheading?: string;
  variant?: 'dark' | 'light';
}

export default function CTASection({
  heading = 'Ready to See Your Data Come Alive?',
  subheading = 'Book a free 45-minute strategy call. We'll review your current reporting setup and show you exactly what a Power BI dashboard could do for your business — for free.',
  variant = 'dark',
}: CTASectionProps) {
  const isDark = variant === 'dark';
  return (
    <section className={`section-padding ${isDark ? 'bg-gray-900' : 'bg-primary-50'}`}>
      <div className="container-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {heading}
          </h2>
          <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/your-link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
            >
              📅 Book Free Strategy Call
            </a>
            <Link
              href="/contact"
              className={`btn-secondary ${isDark ? 'border-gray-500 text-gray-300 hover:bg-gray-700' : ''}`}
            >
              Get Free Dashboard Audit
            </Link>
          </div>

          <p className={`text-sm mt-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            No credit card. No commitment. Just insights.
          </p>
        </div>
      </div>
    </section>
  );
}
