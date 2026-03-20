import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

// In production: use gray-matter + remark to parse MDX from /content/blog-posts/
// For now: static post data for the 5 sample posts

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
}

const posts: Record<string, Post> = {
  'power-bi-sales-dashboard-guide': {
    slug: 'power-bi-sales-dashboard-guide',
    title: 'The Ultimate Power BI Sales Dashboard Guide for 2025',
    date: 'January 15, 2025',
    category: 'Sales Analytics',
    readTime: '8 min read',
    metaTitle: 'Power BI Sales Dashboard Guide 2025 — KPIs, Setup & Best Practices',
    metaDescription: 'Step-by-step guide to building a Power BI sales dashboard covering key KPIs, data sources, Salesforce integration, and design best practices.',
    keywords: ['Power BI sales dashboard', 'sales dashboard Power BI', 'Power BI Salesforce integration'],
    excerpt: 'A complete guide to building a sales dashboard that gives your team real-time pipeline visibility, quota tracking, and win-rate analysis.',
  },
  'power-bi-vs-tableau-for-small-business': {
    slug: 'power-bi-vs-tableau-for-small-business',
    title: 'Power BI vs Tableau for Small Business: Which Is Worth It in 2025?',
    date: 'January 22, 2025',
    category: 'Comparison',
    readTime: '6 min read',
    metaTitle: 'Power BI vs Tableau for Small Business 2025 — Honest Comparison',
    metaDescription: 'Power BI vs Tableau comparison for small businesses. Covers cost (Power BI wins at $10/user vs $75+), ease of use, data connectors, and ROI in 2025.',
    keywords: ['Power BI vs Tableau', 'Power BI vs Tableau small business'],
    excerpt: 'An honest comparison covering costs, capabilities, and which tool delivers better ROI for businesses under $10M revenue.',
  },
  'power-bi-ecommerce-dashboard': {
    slug: 'power-bi-ecommerce-dashboard',
    title: '7 Power BI Metrics Every Ecommerce Brand Must Track in 2025',
    date: 'February 3, 2025',
    category: 'Ecommerce',
    readTime: '7 min read',
    metaTitle: '7 Power BI Metrics for Ecommerce Dashboards (Shopify, Amazon, WooCommerce)',
    metaDescription: 'The 7 ecommerce metrics your Power BI dashboard must track. Covers Shopify integration, LTV, blended MER, return rates, and inventory analytics.',
    keywords: ['Power BI ecommerce dashboard', 'Shopify Power BI', 'ecommerce analytics Power BI'],
    excerpt: 'Stop flying blind with platform-native reports. Here are the 7 metrics that actually predict ecommerce growth and how to visualize them in Power BI.',
  },
  'power-bi-finance-dashboard-cfo': {
    slug: 'power-bi-finance-dashboard-cfo',
    title: 'Power BI for CFOs: Building a Finance Dashboard That Replaces 3 Spreadsheets',
    date: 'February 14, 2025',
    category: 'Finance',
    readTime: '9 min read',
    metaTitle: 'Power BI Finance Dashboard for CFOs — P&L, Cash Flow & Budget Tracking',
    metaDescription: 'Build a CFO-ready Power BI finance dashboard connecting QuickBooks, Xero, or NetSuite. Covers P&L, cash flow, budget vs actuals, and board reporting.',
    keywords: ['Power BI finance dashboard', 'CFO dashboard Power BI', 'Power BI QuickBooks'],
    excerpt: 'How to build a Power BI finance dashboard that connects QuickBooks, your ERP, and your bank feed and gives your CFO a real-time financial command center.',
  },
  'power-bi-consultant-new-york': {
    slug: 'power-bi-consultant-new-york',
    title: 'How to Find a Power BI Consultant in New York (Without Overpaying)',
    date: 'February 28, 2025',
    category: 'Consulting',
    readTime: '5 min read',
    metaTitle: 'Power BI Consultant New York — How to Hire & What to Expect',
    metaDescription: 'Looking for a Power BI consultant in New York? Learn what to look for, red flags to avoid, and what Power BI consulting costs in NYC in 2025.',
    keywords: ['Power BI consultant New York', 'Power BI developer NYC', 'hire Power BI consultant'],
    excerpt: "What to look for in a Power BI consultant, red flags to avoid, and why many NYC businesses get better results with specialized remote agencies.",
  },
};

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = posts[params.slug];
  if (!post) return { title: 'Not Found' };
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `https://www.powerbipro.agency/blog/${params.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.metaDescription,
      publishedTime: new Date(post.date).toISOString(),
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = posts[params.slug];
  if (!post) notFound();

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: new Date(post.date).toISOString(),
    author: { '@type': 'Organization', name: 'PowerBI Pro Agency', url: 'https://www.powerbipro.agency' },
    publisher: { '@type': 'Organization', name: 'PowerBI Pro Agency', url: 'https://www.powerbipro.agency' },
    description: post.metaDescription,
    mainEntityOfPage: `https://www.powerbipro.agency/blog/${params.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="container-xl max-w-3xl">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            {' → '}
            <Link href="/blog" className="hover:text-gray-600">Blog</Link>
            {' → '}
            <span className="text-gray-600">{post.category}</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">{post.readTime} · {post.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <article className="lg:col-span-2 prose prose-lg max-w-none
              prose-headings:font-extrabold prose-headings:text-gray-900
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100
              prose-blockquote:border-primary-500 prose-blockquote:bg-gray-50 prose-blockquote:not-italic
              prose-table:text-sm
              prose-li:text-gray-700">

              {/* In production: render MDX content here using next-mdx-remote or similar */}
              {/* Example: <MDXRemote source={content} /> */}

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                <p className="text-amber-800 font-semibold mb-2">📖 Full Article Available</p>
                <p className="text-amber-700 text-sm">
                  The complete article content is stored in{' '}
                  <code className="bg-amber-100 px-1 rounded">
                    /content/blog-posts/{params.slug}.mdx
                  </code>.
                  In production, render it here using{' '}
                  <strong>next-mdx-remote</strong> or your preferred MDX renderer.
                </p>
              </div>

              <p className="text-gray-600 italic">
                This page demonstrates the routing, SEO metadata, and schema markup.
                Connect your MDX content from <code>/content/blog-posts/</code> to display the full article.
              </p>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA Card */}
              <div className="bg-primary-600 text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">Want This Built for You?</h3>
                <p className="text-primary-100 text-sm mb-4">
                  Book a free 45-minute call. We'll show you exactly what this would
                  look like for your business data.
                </p>
                <a
                  href="https://calendly.com/your-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-3 rounded-lg transition-colors"
                >
                  📅 Book Free Demo
                </a>
              </div>

              {/* Related posts */}
              <div className="card">
                <h3 className="font-bold text-gray-900 mb-4">Related Articles</h3>
                <ul className="space-y-3">
                  {Object.values(posts)
                    .filter((p) => p.slug !== params.slug)
                    .slice(0, 3)
                    .map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/blog/${p.slug}`}
                          className="text-sm text-gray-700 hover:text-primary-600 transition-colors font-medium leading-tight block"
                        >
                          {p.title}
                        </Link>
                        <span className="text-xs text-gray-400">{p.readTime}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="card">
                <h3 className="font-bold text-gray-900 mb-3">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((kw) => (
                    <span key={kw} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to Build Your Power BI Dashboard?"
        subheading="Book a free 45-minute call. No commitment — just a conversation about what your data could look like in Power BI."
        variant="dark"
      />
    </>
  );
}
