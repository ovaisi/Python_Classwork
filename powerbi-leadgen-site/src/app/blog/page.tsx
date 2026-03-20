import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts, getStrapiImageUrl, type BlogPost } from '@/lib/strapi';
import CTASection from '@/components/CTASection';

export const revalidate = 3600; // ISR: rebuild at most every 1 hour

export const metadata: Metadata = {
  title: 'Power BI Blog — Tips, Tutorials & Dashboard Ideas',
  description:
    'Practical Power BI tutorials, dashboard ideas, and data strategy guides for sales, finance, and ecommerce teams in the USA and EU.',
  alternates: { canonical: 'https://www.powerbipro.agency/blog' },
};

const CATEGORY_ICON: Record<string, string> = {
  'Sales Analytics': '📈',
  Finance:           '💰',
  Ecommerce:         '🛒',
  SaaS:              '📊',
  Marketing:         '📣',
  Consulting:        '🧑‍💼',
  Comparison:        '⚖️',
  Tutorial:          '🎓',
  Healthcare:        '🏥',
  Operations:        '⚙️',
};

const categories = [
  'All', 'Sales Analytics', 'Finance', 'Ecommerce',
  'SaaS', 'Marketing', 'Comparison', 'Tutorial', 'Consulting',
];

function PostCard({ post }: { post: BlogPost }) {
  const { title, slug, excerpt, category, readTime, publishedDate, coverImage, isFeatured } = post.attributes;
  const imgUrl = getStrapiImageUrl(coverImage, 'small');

  return (
    <article className="card hover:border-primary-200 flex flex-col group">
      {/* Cover image or fallback emoji */}
      <div className="bg-gray-100 rounded-xl h-36 flex items-center justify-center text-5xl mb-4 overflow-hidden">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={title}
            width={400}
            height={144}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          CATEGORY_ICON[category] ?? '📊'
        )}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
          {category}
        </span>
        <span className="text-xs text-gray-400">{readTime}</span>
        {isFeatured && (
          <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
      </div>

      <h2 className="font-bold text-gray-900 mb-2 leading-tight flex-1 group-hover:text-primary-600 transition-colors">
        {title}
      </h2>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">{excerpt}</p>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-gray-400">
          {publishedDate
            ? new Date(publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : ''}
        </span>
        <Link href={`/blog/${slug}`} className="text-primary-600 font-semibold text-sm hover:underline">
          Read more →
        </Link>
      </div>
    </article>
  );
}

export default async function BlogPage() {
  // Fetch from Strapi — falls back gracefully if Strapi is unreachable
  let posts: BlogPost[] = [];
  let featured: BlogPost | null = null;

  try {
    const [featuredRes, allRes] = await Promise.all([
      getBlogPosts({ featured: true, limit: 1 }),
      getBlogPosts({ limit: 12 }),
    ]);
    featured = featuredRes.data[0] ?? null;
    posts    = allRes.data.filter((p) => p.id !== featured?.id);
  } catch (err) {
    console.error('[blog] Failed to fetch from Strapi:', err);
    // Page still renders — just empty
  }

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
            Practical guides for teams who want to stop drowning in spreadsheets
            and start making data-driven decisions.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-xl">
          {/* Category filter (client-side filtering could be added) */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-default ${
                  cat === 'All'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Featured post */}
          {featured && (
            <div className="card mb-10 md:grid md:grid-cols-2 gap-8 items-center border-primary-200 bg-primary-50">
              <div className="bg-primary-100 rounded-xl h-48 flex items-center justify-center text-7xl overflow-hidden">
                {getStrapiImageUrl(featured.attributes.coverImage, 'medium') ? (
                  <Image
                    src={getStrapiImageUrl(featured.attributes.coverImage, 'medium')!}
                    alt={featured.attributes.title}
                    width={600}
                    height={192}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  CATEGORY_ICON[featured.attributes.category] ?? '📊'
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">Featured</span>
                  <span className="text-xs text-gray-500">{featured.attributes.readTime}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                  {featured.attributes.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{featured.attributes.excerpt}</p>
                <Link href={`/blog/${featured.attributes.slug}`} className="btn-primary text-sm">
                  Read Full Guide →
                </Link>
              </div>
            </div>
          )}

          {/* Post grid */}
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">✍️</p>
              <p className="text-lg">Blog posts coming soon.</p>
              <p className="text-sm mt-2">Add posts in the Strapi admin panel.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
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
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <CTASection variant="dark" />
    </>
  );
}
