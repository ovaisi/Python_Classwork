import Link from 'next/link';

const services = [
  { label: 'Sales Dashboard', href: '/power-bi-industry/sales' },
  { label: 'Finance Dashboard', href: '/power-bi-industry/finance' },
  { label: 'Marketing Dashboard', href: '/power-bi-industry/marketing' },
  { label: 'SaaS Analytics', href: '/power-bi-industry/saas' },
  { label: 'Ecommerce Analytics', href: '/power-bi-industry/ecommerce' },
];

const locations = [
  { label: 'New York', href: '/power-bi-city/new-york' },
  { label: 'London', href: '/power-bi-city/london' },
  { label: 'Chicago', href: '/power-bi-city/chicago' },
  { label: 'Amsterdam', href: '/power-bi-city/amsterdam' },
  { label: 'Los Angeles', href: '/power-bi-city/los-angeles' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PB</span>
              </div>
              <span className="font-bold text-xl text-white">
                PowerBI<span className="text-primary-400">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Custom Power BI dashboards for growing businesses in the USA and EU.
              We turn raw data into revenue-driving insights.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors text-sm font-bold">
                in
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors text-sm font-bold">
                𝕏
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services by Industry</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-semibold mb-4">Serving Cities</h3>
            <ul className="space-y-2">
              {locations.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    Power BI Consultant — {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>📧 hello@powerbiproagency.com</li>
              <li>📅 <a href="https://calendly.com/your-link" className="hover:text-white transition-colors">Book a Free Demo Call</a></li>
              <li>🌍 Serving USA & EU clients</li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="btn-primary text-sm">
                Get Free Dashboard Audit
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PowerBI Pro Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
