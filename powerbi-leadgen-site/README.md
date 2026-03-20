# DataZeb — Lead Generation Website

A complete, production-ready Power BI lead generation system built with Next.js 14, Tailwind CSS, and programmatic SEO.

## What's Included

### Website (Next.js 14 + TypeScript)
- `/` — High-converting homepage with hero, features, process, and testimonials
- `/services` — 6 service pages with pricing
- `/case-studies` — 3 detailed case studies with metrics
- `/blog` — SEO blog with category filtering
- `/blog/[slug]` — Individual blog post pages with schema markup
- `/contact` — Contact page with Google Form + Calendly integration
- `/power-bi-industry/[slug]` — Programmatic industry pages (16 industries)
- `/power-bi-city/[slug]` — Programmatic city pages (35 USA + EU cities)

### Content
- `content/blog-posts/` — 5 full-length SEO blog posts (1,000–2,000+ words)
- `docs/seo-blog-topics-50.md` — 50 SEO-optimized blog topics with keyword data
- `docs/linkedin-posts-10.md` — 10 viral LinkedIn posts + DM outreach templates
- `docs/cold-email-templates.md` — 3 cold email sequences (VP Sales, CFO, Ecommerce)
- `docs/demo-strategy-dashboards.md` — 3 demo dashboard blueprints with scripts
- `docs/automation-workflow.md` — Complete lead pipeline automation workflow
- `docs/30-day-action-plan.md` — Daily action plan for 30-day launch

### Scripts
- `scripts/generate-seo-pages.js` — Generates 100+ programmatic page report
- `scripts/generate-sitemap.js` — Generates XML sitemap for all pages

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Calendly URL, Google Form URL, etc.

# Run development server
npm run dev

# Generate sitemap
npm run generate-sitemap

# Generate SEO pages report
npm run generate-pages
```

## Deployment

Deploy to Vercel in 3 steps:
1. Push to GitHub
2. Connect repo to Vercel (vercel.com)
3. Add environment variables in Vercel dashboard

Your site will be live at `yourproject.vercel.app` immediately.
Connect your custom domain in Vercel settings.

## Configuration

### Replace Placeholders
Before deploying, update these in your code:
- `https://calendly.com/your-link` → Your Calendly URL
- `hello@datazeb.com` → Your email
- `https://www.datazeb.com` → Your actual domain
- Company name: `DataZeb` → Your agency name

### Add Google Analytics
Add your GA4 Measurement ID to `.env.local`:
```
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Embed Google Form
Replace the form placeholder in `src/app/contact/page.tsx` with your actual Google Form iframe.

## Scale Programmatic SEO

To add more city or industry pages:
1. Add entry to `industries` object in `src/app/power-bi-industry/[slug]/page.tsx`
2. Add entry to `cities` object in `src/app/power-bi-city/[slug]/page.tsx`
3. Add the slug to `scripts/generate-sitemap.js`
4. Run `npm run generate-sitemap`

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel (free tier)
- **Forms:** Google Forms (free)
- **Booking:** Calendly (free tier)
- **Email:** Mailchimp or ConvertKit (free tier)
- **CRM:** HubSpot Free CRM
- **Analytics:** Google Analytics 4 (free)
