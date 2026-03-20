# Full Automation Workflow — Power BI Lead Generation Pipeline

## The Complete Pipeline

```
Keyword Research
     ↓
Content Creation (Blog + Landing Pages)
     ↓
Publish & Distribute
     ↓
SEO Traffic (Organic)
     ↓
Lead Capture (Form / Calendly)
     ↓
Nurture (Email Sequence)
     ↓
Demo Call
     ↓
Proposal
     ↓
Conversion (Paying Client)
     ↓
Case Study → Back to Content
```

---

## STAGE 1: KEYWORD RESEARCH → CONTENT PIPELINE

### Free Tools
- **Google Search Console** — See which keywords already bring you traffic, find expansion opportunities
- **Google Keyword Planner** — Free monthly volume estimates in Ads account
- **AnswerThePublic** (3 free/day) — Question-based keywords ("how to Power BI...")
- **Ahrefs Free Tier** — Limited but useful for backlink checking and top pages
- **SEMrush Free Tier** — 10 keyword lookups/day

### Workflow (2 hours/week)
```
Every Monday:
1. Check Google Search Console → note top 10 queries from last 7 days
2. For each high-impression/low-click query → write blog post targeting it
3. Use AnswerThePublic on your top 3 target keywords
4. Add new topic ideas to your Content Calendar (Google Sheet)
```

### Content Calendar Template (Google Sheet)
Columns:
| Blog Topic | Target Keyword | Monthly Volume | Priority | Status | Publish Date | Author | Promoted? |

---

## STAGE 2: CONTENT CREATION → PUBLISH AUTOMATION

### Writing Workflow (Per Post)
```
Step 1 (30 min): Research
   - Read top 3 Google results for the target keyword
   - Note unique angles they missed
   - Identify 3 questions they don't fully answer

Step 2 (90 min): Write
   - Write human-first draft
   - Use AI (Claude/ChatGPT) only for outlines and editing passes
   - Add original insights, client examples, and specific numbers

Step 3 (30 min): Optimize
   - Add primary keyword to: title, H1, first 100 words, URL, meta description
   - Add internal links to 2 related posts and your contact page
   - Add Article Schema markup
   - Add FAQ section (helps with People Also Ask)

Step 4 (20 min): Publish + Distribute
   - Publish to blog
   - Share teaser on LinkedIn (use one of the 10 LinkedIn post formats)
   - Email to newsletter list (if applicable)
   - Add to sitemap → re-submit to Search Console
```

### Automation Option: n8n (Free, Self-Hosted)
Set up an n8n workflow that:
1. Monitors your Google Sheet for "Ready to Publish" posts
2. Auto-publishes to your CMS (or triggers a webhook to your Next.js API)
3. Posts a LinkedIn update via LinkedIn API
4. Sends an email campaign via Mailchimp/ConvertKit free tier

```yaml
# n8n Workflow Example (simplified)
trigger: Google Sheets - Row Updated (Status = "Published")
nodes:
  - Webhook to Next.js /api/publish-post
  - LinkedIn API: Post status update
  - Mailchimp: Add to "New Post" campaign
  - Slack: Notify team channel
```

---

## STAGE 3: LEAD CAPTURE AUTOMATION

### Tool Stack (All Free)
| Tool | Purpose | Free Tier |
|------|---------|-----------|
| Google Forms | Contact form / audit request | Unlimited |
| Calendly | Demo booking | 1 event type free |
| Mailchimp | Email list + sequences | 500 contacts free |
| ConvertKit | More advanced sequences | 1,000 subscribers free |

### Google Form → CRM Automation
**Using Zapier (Free tier: 100 tasks/month):**
```
Trigger: New Google Form submission
Actions:
  1. Add contact to Mailchimp list with tag "Website Lead"
  2. Send internal notification email to you
  3. (Optional) Create task in your project management tool
  4. Send automated reply email from your domain
```

**Using Make.com (formerly Integromat — more generous free tier):**
Same workflow with more steps allowed.

### Lead Capture Sequence
When someone submits your contact form:

```
Immediately:
  Email 1: "Received! Here's what happens next..."
  (Confirm receipt, set expectations, link to Calendly)

Day 1:
  Email 2: "While you wait — 3 Power BI quick wins"
  (Educational value, builds credibility, no pitch)

Day 3 (if no call booked):
  Email 3: "Haven't heard from you — is this still a priority?"
  (Gentle nudge with Calendly link)

Day 7 (if still no call booked):
  Email 4: "One last thing before I close your file..."
  (FOMO + easy yes: "Reply YES to schedule, NO to remove")
```

---

## STAGE 4: DEMO → PROPOSAL AUTOMATION

### After the Demo Call
```
Same day:
  - Send "Demo Follow-Up" email template (pre-written)
  - Attach: 1-page PDF summary of their specific use case
  - Include Calendly link for "Next Steps" call

Day 2–3 (if no response):
  - Send Loom video: 2-min personalized walkthrough of their industry's demo dashboard
  - Subject: "Made this for you, {FirstName}"

Day 5 (if still no response):
  - Final follow-up: Simple "Is this still on your radar?" email
```

### Proposal Template
Use a Google Docs template with these sections:
1. **Understanding your situation** (personalized pain points from discovery)
2. **Proposed solution** (specific dashboards, data sources, pages)
3. **Timeline** (kickoff → delivery → training)
4. **Investment** (fixed price, payment terms)
5. **Guarantee** (100% satisfaction or deposit refund)
6. **Next step** (e-sign → deposit → kickoff call scheduled)

Use **Docusign** (free tier for 3 sends/month) or **HelloSign** (similar) for e-signatures.

---

## STAGE 5: DELIVERY → CASE STUDY LOOP

### After Project Completion
```
Week 1 after launch:
  - Send check-in email ("How's the dashboard treating you?")
  - Ask for any initial feedback or adjustments

Month 1:
  - Request testimonial (Google Form with 3 questions)
  - Ask: "Would you be open to a brief case study?"

Month 2:
  - Write case study using their results (before/after format)
  - Publish as blog post + website case study
  - Share on LinkedIn (tag the client company if they're okay with it)
  - Use in future cold emails as social proof
```

---

## FREE AUTOMATION TOOLS STACK

| Category | Tool | Free Limit |
|----------|------|-----------|
| Email sequences | Mailchimp | 500 contacts, 1,000 emails/month |
| Email sequences | ConvertKit | 1,000 subscribers |
| Automation | Make.com | 1,000 operations/month |
| Automation | Zapier | 100 tasks/month |
| Automation | n8n | Self-hosted, unlimited |
| Lead forms | Google Forms | Unlimited |
| Booking | Calendly | 1 event type |
| Video prospecting | Loom | 5 min videos, 25 videos free |
| CRM | HubSpot Free CRM | Unlimited contacts |
| Email finding | Hunter.io | 25 searches/month |
| Lead sourcing | Apollo.io | 50 contacts/month free |
| Proposals | Pandadoc | 5 docs/month free |
| Analytics | Google Analytics 4 | Free |
| SEO | Google Search Console | Free |
| Heatmaps | Microsoft Clarity | Free, unlimited |

---

## 90-Day Traffic + Lead Projection

Based on consistent execution:

| Metric | Day 30 | Day 60 | Day 90 |
|--------|--------|--------|--------|
| Blog posts published | 8–12 | 20–25 | 35–50 |
| Monthly organic visitors | 200–500 | 800–1,500 | 2,000–4,000 |
| Monthly leads (forms + Calendly) | 2–5 | 8–15 | 15–30 |
| Demo calls/month | 1–3 | 5–10 | 10–20 |
| Clients closed/month | 0–1 | 1–2 | 2–4 |

**Note:** These are conservative estimates for a brand-new domain with no existing authority. LinkedIn outreach and cold email can accelerate the early months significantly.

---

## Weekly Operating Rhythm

### Monday (2 hours)
- Review last week's Google Search Console data
- Check incoming leads and reply to any pending inquiries
- Schedule week's LinkedIn posts (use Buffer free tier)

### Tuesday–Wednesday (4 hours)
- Write 1–2 blog posts or programmatic SEO pages
- Do cold email outreach (30–50 per day)
- LinkedIn engagement (respond to comments, DM warm leads)

### Thursday (2 hours)
- Demo calls (block 10am–12pm and 2–4pm)
- Follow-up emails from calls this week

### Friday (1 hour)
- Weekly metrics review (traffic, leads, calls, revenue)
- Update content calendar for next week
- Administrative tasks (invoicing, proposals)

**Total active time: ~9 hours/week**
This is manageable solo in the first 90 days.
