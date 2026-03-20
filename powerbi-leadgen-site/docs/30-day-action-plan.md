# 30-Day Action Plan — Power BI Lead Generation System

## The Goal
By Day 30: Website live, 8–12 SEO posts published, 3 demo dashboards built,
lead capture active, outreach machine running, and first 2–3 demo calls booked.

---

## WEEK 1 (Days 1–7): FOUNDATION

### Day 1 — Technical Setup
**Morning (3 hours):**
- [ ] Register domain (Namecheap or Cloudflare — ~$10/year)
  - Recommended: powerbi[yourcity].com OR [yourname]powerbi.com
- [ ] Set up Vercel account (free) — connect GitHub repo
- [ ] Clone this Next.js project to your GitHub
- [ ] Deploy to Vercel — site will be live immediately
- [ ] Set up Google Search Console — verify your domain
- [ ] Set up Google Analytics 4 — add tracking ID to layout.tsx

**Afternoon (2 hours):**
- [ ] Replace all placeholder URLs (Calendly links, email addresses) in the codebase
- [ ] Update company name and branding colors in tailwind.config.js
- [ ] Add your actual logo and update Navbar/Footer

**Evening (1 hour):**
- [ ] Test all pages load correctly
- [ ] Run Google PageSpeed Insights — fix any critical issues
- [ ] Submit sitemap to Google Search Console

---

### Day 2 — Calendly + Google Forms Setup
**Morning (2 hours):**
- [ ] Create free Calendly account
- [ ] Set up event: "Power BI Strategy Call — Free, 45 min"
  - Buffer time: 15 min between calls
  - Questions to ask before booking:
    1. "What's your role?"
    2. "What data challenge are you trying to solve?"
    3. "What tool do you currently use for reporting?"
- [ ] Copy Calendly link → replace in Navbar, CTASection, contact page

**Afternoon (2 hours):**
- [ ] Create Google Form: "Get Your Free Dashboard Audit"
  - Fields: Name, Email, Company, Industry, Data Challenge, Budget Range (optional)
- [ ] Set up form response sheet in Google Sheets
- [ ] Set up Zapier/Make.com automation:
  - Form submission → email notification to you
  - Form submission → subscribe to Mailchimp list with tag "website-lead"
- [ ] Replace the contact form iframe placeholder with your Google Form embed

---

### Day 3 — LinkedIn Profile Optimization
**All day (4 hours):**
- [ ] Update LinkedIn headline:
  "Power BI Dashboard Expert | Helping Sales, Finance & Ecommerce Teams in USA/EU Eliminate Manual Reporting"
- [ ] Rewrite About section (lead with problem, show results, end with CTA)
- [ ] Add featured section: link to your website
- [ ] Update Experience: add "Built 100+ Power BI dashboards for US & EU businesses"
- [ ] Request 3 LinkedIn recommendations from past clients or colleagues
- [ ] Connect with 20 potential clients in your target industries
- [ ] Post LinkedIn Post #1 from the templates (The Monday Morning Problem)

---

### Day 4 — First Demo Dashboards
**All day (6 hours):**
- [ ] Download Power BI Desktop (free)
- [ ] Build Demo Dashboard 1: Sales Performance
  - Use sample data from the demo strategy doc
  - Build Executive Summary page + Rep Performance page
  - Add your company branding (colors, logo)
- [ ] Export to PDF as a "preview" to send prospects
- [ ] Record a 3-minute Loom walkthrough of the dashboard

**Goal:** Have a demo you can screen-share on a call by Day 5.

---

### Day 5 — First Blog Posts
**All day (5 hours):**
- [ ] Publish Blog Post 1: "The Ultimate Power BI Sales Dashboard Guide for 2025"
  - Use the pre-written content from /content/blog-posts/
  - Add meta title, meta description, schema markup
  - Add internal links to your contact page and services page
- [ ] Submit URL to Google Search Console for indexing
- [ ] Share on LinkedIn (adapt the How-To Educational post template)
- [ ] Post LinkedIn Post #2 (The €40K Revenue Leak story)

---

### Day 6 — Cold Email Setup
**All day (4 hours):**
- [ ] Register a secondary domain for cold email (e.g., datazeb.com — $12/year)
- [ ] Set up Google Workspace on secondary domain ($6/month)
- [ ] Configure SPF, DKIM, DMARC records (Google will guide you)
- [ ] Create email account: yourname@datazeb.com
- [ ] Start warm-up period on the new mailbox (7–10 days before sending cold)
  - Send 5–10 emails per day to real contacts in your network
  - Have them reply — this builds sender reputation
- [ ] Set up Apollo.io free account — build first lead list (50 contacts)
  - Filter: VP Sales, CFO, Director level
  - Industry: SaaS, B2B, Finance
  - Company size: 10–200 employees (USA)
- [ ] Set up HubSpot Free CRM — import lead list

---

### Day 7 — Content + Rest
**Morning (3 hours):**
- [ ] Write Blog Post 2: "Power BI vs Tableau for Small Business 2025"
  - Use pre-written content, personalize and expand
- [ ] Run `node scripts/generate-sitemap.js` — update sitemap
- [ ] Re-submit sitemap to Google Search Console

**Afternoon:** Rest. Sustainable execution matters more than sprinting week one.

---

## WEEK 2 (Days 8–14): OUTREACH + CONTENT

### Day 8 — Launch Cold Email Outreach
- [ ] Your secondary domain has been warming for 7 days ✓
- [ ] Start sending: 15 emails/day (cold email sequence 1 — VP Sales)
- [ ] Personalize each email with prospect's company name and a specific detail
- [ ] Use the templates from /docs/cold-email-templates.md

### Day 9 — Blog Post 3 + LinkedIn
- [ ] Publish Blog Post 3: "7 Power BI Metrics Every Ecommerce Brand Must Track"
- [ ] Post LinkedIn Post #3 (The Credibility Post)
- [ ] Connect with 30 new prospects on LinkedIn (VP/Director level in target industries)

### Day 10 — Finance Demo Dashboard
- [ ] Build Demo Dashboard 2: Finance / CFO Dashboard in Power BI Desktop
- [ ] Use the sample data from the demo strategy doc
- [ ] Record a 3-minute Loom walkthrough
- [ ] Add to your Loom library

### Day 11 — Programmatic SEO Pages
- [ ] Run `node scripts/generate-seo-pages.js`
- [ ] Verify all city and industry pages render correctly
- [ ] Check 5 random city pages for content quality
- [ ] Add any missing industries or cities to the data objects in page.tsx

### Day 12 — Blog Post 4 + LinkedIn
- [ ] Publish Blog Post 4: "Power BI for CFOs: Finance Dashboard Guide"
- [ ] Post LinkedIn Post #4 (The Mythbuster Post)
- [ ] Cold email: increase to 25/day

### Day 13 — First Demo Calls (hopefully)
- [ ] Check Calendly for any booked calls
- [ ] If calls booked: prepare with industry-specific demo
- [ ] If no calls yet: follow up on cold email replies

### Day 14 — Week 2 Review
- [ ] Check Google Search Console: any first impressions on your blog posts?
- [ ] LinkedIn: check profile views, connection requests, DMs
- [ ] Cold email: track open rates and reply rates
- [ ] Update metrics spreadsheet (template below)

---

## WEEK 3 (Days 15–21): ACCELERATION

### Days 15–21 Daily Rhythm:
**Morning (1 hour):**
- Check email/LinkedIn notifications
- Reply to all leads within 2 hours
- Send any pending proposal follow-ups

**Midday (3 hours):**
- Write or finish one blog post
- Send cold emails (target 30–40/day by now)
- LinkedIn engagement (reply to comments, DM warm leads)

**Afternoon (1 hour):**
- Demo calls (if scheduled)
- Update HubSpot CRM with pipeline status

### Week 3 Deliverables:
- [ ] Blog Posts 5–7 published (use remaining templates, then write originals)
- [ ] Demo Dashboard 3: Marketing Dashboard built
- [ ] LinkedIn posts 5, 6, 7 published
- [ ] Cold email: Phase 2 follow-ups sent to non-openers from week 2
- [ ] Google Search Console: Starting to see impressions on blog posts
- [ ] First booked demo calls (goal: 2–3 by end of week 3)

---

## WEEK 4 (Days 22–30): CLOSE + SYSTEMATIZE

### Day 22–24 — Lead Nurture Focus
- [ ] For any demo calls completed: send same-day follow-up email
- [ ] For prospects who said "not now": add to 30-day nurture sequence
- [ ] Post LinkedIn Posts 8, 9, 10

### Day 25–27 — Referral System
- [ ] Email your entire professional network (LinkedIn connections, past colleagues)
  - Short email: "I've launched a Power BI dashboard agency. If you know anyone who might need this, I'd love a warm intro."
- [ ] Ask for referrals from past clients or anyone who's seen your work
- [ ] Offer: "I'll pay a $200 referral fee for any client that signs"

### Day 28–30 — Month 1 Retrospective
**Review metrics:**
- [ ] Website traffic: unique visitors, sessions, pages per session
- [ ] SEO: impressions, clicks, average position (Google Search Console)
- [ ] Leads: total form submissions + Calendly bookings
- [ ] Demo calls: how many held
- [ ] Pipeline: total value of prospects in HubSpot
- [ ] Revenue: any signed clients

**Questions to answer:**
1. Which blog posts got any traction? Write 3 more like them.
2. Which cold email subject line had the best open rate? Use it more.
3. Which LinkedIn post got the most engagement? Repeat the format.
4. What objection came up most on demo calls? Address it in a blog post.

---

## Metrics Tracking Template

Copy this into a Google Sheet and update weekly:

| Week | Blogs Published | Organic Sessions | LinkedIn Followers | Cold Emails Sent | Email Replies | Calendly Bookings | Demo Calls | Proposals Sent | Clients Closed | Revenue |
|------|----------------|-----------------|-------------------|-----------------|---------------|-------------------|-----------|----------------|----------------|---------|
| 1 | 2 | 45 | +12 | 0 | 0 | 0 | 0 | 0 | 0 | $0 |
| 2 | 3 | 120 | +28 | 75 | 4 | 1 | 0 | 0 | 0 | $0 |
| 3 | 3 | 280 | +41 | 150 | 9 | 3 | 2 | 1 | 0 | $0 |
| 4 | 2 | 490 | +55 | 180 | 14 | 5 | 3 | 2 | 1 | $2,500 |

---

## What "Good" Looks Like at Day 30

**Minimum viable success:**
✅ Website live and loading fast
✅ 8–10 blog posts indexed by Google
✅ 2–3 demo dashboards built
✅ Cold email sending at 30–40/day
✅ LinkedIn profile optimized, posting 3x/week
✅ 3+ demo calls held
✅ 1 proposal sent

**Stretch goals:**
⭐ First client signed ($1,500–$3,000 project)
⭐ 500+ organic website visitors from search
⭐ 5+ demo calls in the calendar for month 2

---

## Month 2–3 Focus Areas

Once the foundation is running:

**Content:** Scale to 3–4 posts/week with AI-assisted drafting + human editing.

**SEO:** Start a basic backlink strategy — guest posting on industry blogs, contributing to LinkedIn articles, answering questions on Reddit r/PowerBI and r/BusinessIntelligence (with your site link in your profile).

**Paid traffic (optional):** $300–$500/month on Google Ads targeting "Power BI consultant [city]" keywords can accelerate leads significantly while SEO builds.

**Partnerships:** Connect with Microsoft Partners, accounting firms, Salesforce consultants, and digital agencies — they all have clients who need dashboards. Offer a referral fee.

**Product expansion:** Once you have 3–5 happy clients, package your most common dashboard type into a "starter package" with a fixed price and faster delivery. This makes selling easier.
