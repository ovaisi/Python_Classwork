import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  getBlogPostBySlug,
  getBlogPosts,
  getAllBlogSlugs,
  getStrapiImageUrl,
  type BlogPost,
} from '@/lib/strapi';
import CTASection from '@/components/CTASection';

export const revalidate = 600; // ISR: revalidate every 10 minutes

interface PageProps {
  params: { slug: string };
}

// Pre-build all blog post pages at build time
export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = await getBlogPostBySlug(params.slug);
    if (!post) return { title: 'Post Not Found' };

    const { title, metaTitle, metaDescription, keywords, coverImage, publishedDate } = post.attributes;
    const imgUrl = getStrapiImageUrl(coverImage, 'medium');

    return {
      title:       metaTitle || title,
      description: metaDescription,
      keywords:    keywords,
      alternates:  { canonical: `https://www.datazeb.com/blog/${params.slug}` },
      openGraph: {
        type:          'article',
        title:         metaTitle || title,
        description:   metaDescription,
        publishedTime: publishedDate ? new Date(publishedDate).toISOString() : undefined,
        images:        imgUrl ? [{ url: imgUrl, width: 1200, height: 630 }] : [],
      },
    };
  } catch {
    return { title: 'Blog Post' };
  }
}

function RelatedPosts({ posts, currentSlug }: { posts: BlogPost[]; currentSlug: string }) {
  const related = posts.filter((p) => p.attributes.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <div className="card">
      <h3 className="font-bold text-gray-900 mb-4">Related Articles</h3>
      <ul className="space-y-3">
        {related.map((p) => (
          <li key={p.id}>
            <Link
              href={`/blog/${p.attributes.slug}`}
              className="text-sm text-gray-700 hover:text-primary-600 transition-colors font-medium leading-tight block"
            >
              {p.attributes.title}
            </Link>
            <span className="text-xs text-gray-400">{p.attributes.readTime}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  let post: BlogPost | null = null;
  let recentPosts: BlogPost[] = [];

  try {
    [post, { data: recentPosts }] = await Promise.all([
      getBlogPostBySlug(params.slug),
      getBlogPosts({ limit: 6 }),
    ]);
  } catch (err) {
    console.error('[blog/slug] Strapi fetch error:', err);
  }

  if (!post) notFound();

  const {
    title, body, category, readTime, publishedDate,
    coverImage, metaDescription, keywords,
  } = post.attributes;

  const imgUrl = getStrapiImageUrl(coverImage, 'medium');

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type':    'Article',
    headline:   title,
    description: metaDescription,
    datePublished: publishedDate ? new Date(publishedDate).toISOString() : undefined,
    author:     { '@type': 'Organization', name: 'DataZeb', url: 'https://www.datazeb.com' },
    publisher:  { '@type': 'Organization', name: 'DataZeb', url: 'https://www.datazeb.com' },
    mainEntityOfPage: `https://www.datazeb.com/blog/${params.slug}`,
    ...(imgUrl ? { image: imgUrl } : {}),
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
            <span className="text-gray-600">{category}</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
              {category}
            </span>
            <span className="text-xs text-gray-400">
              {readTime}
              {publishedDate && (
                <> · {new Date(publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</>
              )}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{metaDescription}</p>
        </div>
      </section>

      {/* Cover image */}
      {imgUrl && (
        <div className="container-xl max-w-3xl mt-8">
          <Image
            src={imgUrl}
            alt={title}
            width={900}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-2xl"
            priority
          />
        </div>
      )}

      {/* Article + Sidebar */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Body — Strapi rich text rendered as HTML */}
            <article
              className="lg:col-span-2 prose prose-lg max-w-none
                prose-headings:font-extrabold prose-headings:text-gray-900
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100
                prose-blockquote:border-primary-500 prose-blockquote:bg-gray-50
                prose-table:text-sm prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: body }}
            />

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-primary-600 text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">Want This Built for You?</h3>
                <p className="text-primary-100 text-sm mb-4">
                  Book a free 45-minute call — we'll show you what this looks like
                  for your specific data.
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

              <RelatedPosts posts={recentPosts} currentSlug={params.slug} />

              {keywords?.length > 0 && (
                <div className="card">
                  <h3 className="font-bold text-gray-900 mb-3">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((kw) => (
                      <span key={kw} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to Build Your Power BI Dashboard?"
        subheading="Book a free 45-minute call. No commitment — just a conversation about what your data could look like."
        variant="dark"
      />
    </>
  );
}
