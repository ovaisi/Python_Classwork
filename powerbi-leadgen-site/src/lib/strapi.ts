/**
 * Strapi API client for Next.js
 *
 * All data fetching goes through this module.
 * ISR revalidation is configured per-fetch using Next.js fetch options.
 */

const STRAPI_URL    = process.env.STRAPI_URL    || 'http://localhost:1337';
const STRAPI_TOKEN  = process.env.STRAPI_TOKEN  || '';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StrapiImage {
  data: {
    attributes: {
      url:          string;
      alternativeText: string | null;
      width:        number;
      height:       number;
      formats: {
        thumbnail?: { url: string };
        small?:     { url: string };
        medium?:    { url: string };
      };
    };
  } | null;
}

export interface BlogPost {
  id:         number;
  attributes: {
    title:            string;
    slug:             string;
    excerpt:          string;
    body:             string;
    category:         string;
    readTime:         string;
    metaTitle:        string;
    metaDescription:  string;
    keywords:         string[];
    isFeatured:       boolean;
    publishedDate:    string;
    publishedAt:      string;
    coverImage:       StrapiImage;
  };
}

export interface CaseStudy {
  id:         number;
  attributes: {
    title:              string;
    slug:               string;
    company:            string;
    location:           string;
    industry:           string;
    challenge:          string;
    solution:           string;
    fullStory:          string;
    results:            { metric: string; label: string }[];
    testimonialQuote:   string;
    testimonialAuthor:  string;
    testimonialTitle:   string;
    metaTitle:          string;
    metaDescription:    string;
    coverImage:         StrapiImage;
    isFeatured:         boolean;
    publishedAt:        string;
  };
}

export interface Service {
  id:         number;
  attributes: {
    title:          string;
    slug:           string;
    icon:           string;
    description:    string;
    priceFrom:      string;
    features:       string[];
    dataSources:    string[];
    idealFor:       string;
    metaTitle:      string;
    metaDescription: string;
    sortOrder:      number;
    publishedAt:    string;
  };
}

export interface Testimonial {
  id:         number;
  attributes: {
    quote:      string;
    author:     string;
    title:      string;
    company:    string;
    location:   string;
    rating:     number;
    industry:   string;
    isFeatured: boolean;
    sortOrder:  number;
    avatar:     StrapiImage;
    publishedAt: string;
  };
}

interface StrapiListResponse<T> {
  data:  T[];
  meta: {
    pagination: {
      page:      number;
      pageSize:  number;
      pageCount: number;
      total:     number;
    };
  };
}

interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

// ─── Core Fetch ───────────────────────────────────────────────────────────────

async function strapiGet<T>(
  path: string,
  params: Record<string, string> = {},
  revalidate: number | false = 3600   // 1 hour default ISR
): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
    next: revalidate === false
      ? { tags: [path] }
      : { revalidate, tags: [path] },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText} — ${url}`);
  }

  return res.json() as Promise<T>;
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export async function getBlogPosts(params?: {
  category?: string;
  featured?: boolean;
  limit?:    number;
  page?:     number;
}): Promise<StrapiListResponse<BlogPost>> {
  const qs: Record<string, string> = {
    'populate':                  'coverImage',
    'sort':                      'publishedDate:desc',
    'pagination[pageSize]':      String(params?.limit ?? 10),
    'pagination[page]':          String(params?.page ?? 1),
    'filters[publishedAt][$notNull]': 'true',
  };

  if (params?.category) {
    qs['filters[category][$eq]'] = params.category;
  }
  if (params?.featured) {
    qs['filters[isFeatured][$eq]'] = 'true';
  }

  return strapiGet<StrapiListResponse<BlogPost>>('/blog-posts', qs);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await strapiGet<StrapiListResponse<BlogPost>>(
    '/blog-posts',
    {
      'filters[slug][$eq]': slug,
      'populate':            'coverImage,author',
    },
    // Blog posts: revalidate every 10 minutes
    600
  );
  return res.data[0] ?? null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const res = await strapiGet<StrapiListResponse<BlogPost>>(
    '/blog-posts',
    { 'fields':               'slug', 'pagination[pageSize]': '100' },
    false
  );
  return res.data.map((p) => p.attributes.slug);
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

export async function getCaseStudies(featured?: boolean): Promise<CaseStudy[]> {
  const qs: Record<string, string> = {
    'populate':  'coverImage',
    'sort':      'publishedAt:desc',
  };
  if (featured) {
    qs['filters[isFeatured][$eq]'] = 'true';
  }

  const res = await strapiGet<StrapiListResponse<CaseStudy>>('/case-studies', qs);
  return res.data;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const res = await strapiGet<StrapiListResponse<CaseStudy>>(
    '/case-studies',
    { 'filters[slug][$eq]': slug, 'populate': 'coverImage' }
  );
  return res.data[0] ?? null;
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  const res = await strapiGet<StrapiListResponse<Service>>(
    '/services',
    { 'sort': 'sortOrder:asc', 'pagination[pageSize]': '20' }
  );
  return res.data;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const res = await strapiGet<StrapiListResponse<Service>>(
    '/services',
    { 'filters[slug][$eq]': slug }
  );
  return res.data[0] ?? null;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(featured?: boolean): Promise<Testimonial[]> {
  const qs: Record<string, string> = {
    'populate':  'avatar',
    'sort':      'sortOrder:asc',
  };
  if (featured) {
    qs['filters[isFeatured][$eq]'] = 'true';
  }

  const res = await strapiGet<StrapiListResponse<Testimonial>>('/testimonials', qs);
  return res.data;
}

// ─── Image URL helper ─────────────────────────────────────────────────────────

export function getStrapiImageUrl(
  image: StrapiImage,
  size: 'thumbnail' | 'small' | 'medium' | 'original' = 'original'
): string | null {
  const attrs = image?.data?.attributes;
  if (!attrs) return null;

  if (size !== 'original' && attrs.formats?.[size]?.url) {
    const url = attrs.formats[size]!.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }

  return attrs.url.startsWith('http') ? attrs.url : `${STRAPI_URL}${attrs.url}`;
}
