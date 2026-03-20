import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Power BI Blog — Tips, Tutorials & Dashboard Ideas',
  description:
    'Practical Power BI tutorials, dashboard ideas, and data strategy guides for sales, finance, and ecommerce teams in the USA and EU.',
  alternates: { canonical: 'https://www.powerbipro.agency/blog' },
};

// In production: replace with dynamic MDX/CMS data fetching
const posts = [
  {
    slug: 'power-bi-sales-dashboard-guide',
    title: 'The Ultimate Power BI Sales Dashboard Guide for 2025',
    excerpt: 'A step-by-step guide to building a sales dashboard that gives your team real-time pipeline visibility, quota tracking, and win-rate analysis.',
    category: 'Sales Analytics',
    readTime: '8 min read',
    date: 'Jan 15, 2025',
    tags: ['Sales', 'Dashboard', 'CRM'],
  },
  {
    slug: 'power-bi-vs-tableau-for-small-business',
    title: 'Power BI vs Tableau for Small Business: Which Is Worth It in 2025?',
    excerpt: 'An honest comparison of Power BI and Tableau — costs, capabilities, learning curve, and which one actually makes sense for businesses under $10M revenue.',
    category: 'Comparison',
    readTime: '6 min read',
    date: 'Jan 22, 2025',
    tags: ['Power BI', 'Tableau', 'Comparison'],
  },
  {
    slug: 'power-bi-ecommerce-dashboard',
    title: '7 Power BI Metrics Every Ecommerce Brand Must Track in 2025',
    excerpt: 'Stop flying blind with platform-native reports. Here are the 7 metrics that actually predict ecommerce growth — and how to visualize them in Power BI.',
    category: 'Ecommerce',
    readTime: '7 min read',
    date: 'Feb 3, 2025',
    tags: ['Ecommerce', 'Shopify', 'Dashboard'],
  },
  {
    slug: 'power-bi-finance-dashboard-cfo',
    title: 'Power BI for CFOs: Building a Finance Dashboard That Replaces 3 Spreadsheets',
    excerpt: 'How to build a Power BI finance dashboard that connects QuickBooks, your ERP, and your bank feed — and gives your CFO a real-time financial command center.',
    category: 'Finance',
    readTime: '9 min read',
    date: 'Feb 14, 2025',
    tags: ['Finance', 'CFO', 'QuickBooks'],
  },
  {
    slug: 'power-bi-consultant-new-york',
    title: 'How to Find a Power BI Consultant in New York (Without Overpaying)',
    excerpt: "What to look for in a Power BI consultant, red flags to avoid, and why many NYC businesses get better results working with specialized remote agencies.",
    category: 'Consulting',
    readTime: '5 min read',
    date: 'Feb 28, 2025',
    tags: ['Consulting', 'New York', 'USA'],
  },
];

const categories = ['All', 'Sales Analytics', 'Finance', 'Ecommerce', 'Comparison', 'Consulting', 'SaaS'];

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-900 text-white section-padding">
        <div className="container-xl text-center">
          <span className="section-badge bg-white/10 border border-white/20 text-white">Blog</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-6">
            Power BI Tips, Guides &{' '}
            <span className="text-amber-400">Dashboard Ideas</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Practical guides for sales, finance, and operations teams who want to stop
            drowning in spreadsheets and start making data-driven decisions.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-xl">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === 'All'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          <div className="card mb-8 md:grid md:grid-cols-2 gap-8 items-center border-primary-200 bg-primary-50">
            <div className="bg-primary-100 rounded-xl h-48 flex items-center justify-center text-7xl">
              📈
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">Featured</span>
                <span className="text-xs text-gray-500">{posts[0].readTime} · {posts[0].date}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{posts[0].title}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{posts[0].excerpt}</p>
              <Link href={`/blog/${posts[0].slug}`} className="btn-primary text-sm">
                Read Full Guide →
              </Link>
            </div>
          </div>

          {/* Post grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <article key={post.slug} className="card hover:border-primary-200 flex flex-col">
                <div className="bg-gray-100 rounded-xl h-32 flex items-center justify-center text-5xl mb-4">
                  {post.category === 'Finance' ? '💰' :
                   post.category === 'Ecommerce' ? '🛒' :
                   post.category === 'Comparison' ? '⚖️' :
                   post.category === 'Consulting' ? '🧑‍💼' : '📊'}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h2 className="font-bold text-gray-900 mb-2 leading-tight flex-1">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <Link href={`/blog/${post.slug}`} className="text-primary-600 font-semibold text-sm hover:underline">
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
              Get Power BI Tips in Your Inbox
            </h2>
            <p className="text-gray-600 mb-6">
              One practical Power BI guide per week. No fluff. Unsubscribe anytime.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe with one click.</p>
          </div>
        </div>
      </section>

      <CTASection variant="dark" />
    </>
  );
}
