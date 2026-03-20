# Demo Strategy — 3 Power BI Dashboard Ideas for Client Demos

## Philosophy
Your demo is your best sales asset. A prospect who sees their own industry's data in a well-built dashboard is 5x more likely to convert than one who reads a case study.

Build 3 demo dashboards. Keep them live. Update sample data monthly to show "current" numbers.

---

## DEMO DASHBOARD 1: Sales Performance Dashboard

### Overview
A Salesforce/HubSpot-connected dashboard for B2B sales teams. Show this to: VP Sales, CRO, RevOps Directors, Sales Managers.

### Page Layout

**Page 1: Executive Summary**
| Visual | Type | Position |
|--------|------|----------|
| Monthly Revenue vs Quota | KPI Card (large) | Top left |
| Total Pipeline Value | KPI Card | Top center |
| Win Rate (current vs. prior) | KPI Card | Top right |
| Revenue Trend (12 months) | Line chart | Middle full-width |
| Pipeline Funnel by Stage | Funnel chart | Bottom left |
| Top 5 Open Deals | Table | Bottom right |

**Page 2: Rep Performance**
| Visual | Type | Position |
|--------|------|----------|
| Rep Leaderboard | Bar chart (horizontal) | Left |
| Activity vs. Revenue Scatter | Scatter plot | Right |
| Rep Drill-Through Table | Matrix | Bottom |

**Key DAX Measures to Demonstrate:**
```dax
-- Show this during demo — always impresses
Revenue Attainment % =
DIVIDE([Closed Won Revenue], [Total Quota])

-- Pipeline Coverage (shows "are we set up for next quarter?")
Pipeline Coverage Ratio =
DIVIDE([Open Pipeline Value], [Remaining Quota])

-- Deal Velocity (average days from creation to close)
Avg Days to Close =
AVERAGEX(
    FILTER(FactDeals, FactDeals[IsClosed] = TRUE()),
    DATEDIFF(FactDeals[CreateDate], FactDeals[CloseDate], DAY)
)
```

**Sample Data to Use in Demo:**
- 3 reps: "Alex Chen", "Maria Santos", "David Kim"
- Monthly quota: $250,000 each
- Current attainment: Alex 94%, Maria 78%, David 112%
- Pipeline: $2.1M total, $890K in "Proposal" stage
- Win rate: 34% current period, 29% prior period

**Demo Script (5 minutes):**
1. Open on Executive Summary — "This is what your leadership would see every morning."
2. Click into the pipeline funnel — "You can see exactly where deals are getting stuck."
3. Drill to Rep Performance — "Notice David is at 112% with fewer activities than Alex — that's a coaching conversation about Alex's deal quality."
4. Show date slicer — "Switch to Q4 and see how Q4 shapes up instantly."
5. Show mobile layout — "Your VP of Sales can check this from their phone at 7am."

---

## DEMO DASHBOARD 2: Finance / CFO Dashboard

### Overview
A QuickBooks/Xero-connected financial command center. Show this to: CFOs, Controllers, Finance Managers, CEOs of privately-held companies.

### Page Layout

**Page 1: P&L Overview**
| Visual | Type | Notes |
|--------|------|-------|
| Revenue vs Budget vs Prior Year | Clustered bar | 12-month comparison |
| Gross Margin % trend | Line chart | Key for product mix conversations |
| Operating Expense breakdown | Stacked bar by department | Shows budget ownership |
| EBITDA vs target | Gauge chart | Great for board presentation feel |
| P&L Matrix (drillable) | Matrix | Collapse/expand by category |

**Page 2: Cash Flow**
| Visual | Type | Notes |
|--------|------|-------|
| 13-Week Cash Forecast | Area chart | With minimum reserve line |
| Cash Bridge (Waterfall) | Waterfall chart | Inflows, outflows, net |
| AR Aging Heatmap | Matrix | By customer, by aging bucket |
| AP Due Calendar | Bar chart | What's due in next 30 days |

**Page 3: Department Budgets**
| Visual | Type | Notes |
|--------|------|-------|
| Budget vs. Actuals by dept | Horizontal bar with target line | Color-coded over/under |
| Spend trend by category | Small multiples line charts | Each dept on its own tile |

**Sample Data to Use in Demo:**
- Company: "Meridian Services Group" (fictional)
- Revenue: $4.2M YTD vs $4.0M budget (5% favorable)
- EBITDA: 18% vs 20% target (2% unfavorable — good discussion starter)
- Cash: $410K current, 13-week forecast showing a tight week 7 (creates urgency)
- AR: $340K outstanding, $85K over 60 days

**Demo Script (5 minutes):**
1. Start on P&L — "Your CFO sees this every morning before any calls."
2. Expand the OpEx matrix — "Click here to see which department drove the variance."
3. Switch to Cash Flow — "This is the page most CFOs love most. See week 7 here? You'd know to negotiate that vendor payment 3 weeks in advance."
4. Show AR Aging — "This tells you exactly which customers to call this week for collections."
5. Close with: "Right now, how long does it take to answer 'what did we make last month?' Let's talk about getting that to zero."

---

## DEMO DASHBOARD 3: Marketing Performance Dashboard

### Overview
A multi-channel marketing analytics dashboard. Show this to: CMOs, Marketing Directors, Performance Marketers, Growth Leads.

### Page Layout

**Page 1: Channel Overview**
| Visual | Type | Notes |
|--------|------|-------|
| Blended MER (weekly trend) | Line chart | The star metric most don't track |
| ROAS by Channel | Clustered bar | Google, Meta, LinkedIn, Email, Organic |
| Revenue by Channel (pie) | Donut chart | With period slicer |
| Total Ad Spend vs Revenue | Dual-axis line | 3-month rolling |

**Page 2: Campaign Detail**
| Visual | Type | Notes |
|--------|------|-------|
| Campaign ROAS Table | Matrix | Sortable, filterable |
| CPL by campaign and channel | Bar chart | Shows cost efficiency |
| Impression → Click → Lead → Sale funnel | Funnel chart | Conversion rate at each stage |

**Page 3: SEO + Organic**
| Visual | Type | Notes |
|--------|------|-------|
| Organic traffic trend | Line chart | vs. prior period |
| Top 10 landing pages | Table | Sessions, leads, revenue |
| Keyword ranking changes | Matrix | Up/down indicators |

**Key Metrics to Feature:**
- Blended MER (Total Revenue / Total Ad Spend) — always demo this first
- Channel-contributed revenue (adjusted for overlap)
- CPL by channel over time
- Email revenue per recipient (RPR)

**Sample Data:**
- Blended MER: 4.2x (vs. 3.8x last month)
- Google ROAS: 5.1x | Meta ROAS: 3.4x | LinkedIn: 1.8x
- CPL: Google $62 | Meta $84 | LinkedIn $210
- Email RPR: $4.20 (highest revenue/dollar invested)

**Demo Script (5 minutes):**
1. Open on Blended MER — "This is the number most marketing teams don't track. Your platform-reported ROAS is a lie — each platform claims the same conversion. MER tells you the truth."
2. Show ROAS table — "Your LinkedIn ROAS is 1.8x. That means for every dollar spent, you get $1.80 back. Is that intentional, or do you want us to reallocate that budget?"
3. Campaign detail drill-through — "Click into Meta — see this campaign at 1.2x ROAS? That's below cost of goods. You're losing money on it."
4. Email section — "Email RPR of $4.20 vs. $0.84 CPL from Meta. Your email list is your highest-ROI channel. Are you growing it intentionally?"
5. Close: "How are you currently making budget allocation decisions across channels? Let's talk about getting this live for your team."

---

## Demo Delivery Tips

**Before the demo:**
- Send a 2-minute Loom showing the dashboard before the call ("sneak preview")
- Ask: "Can you share a rough sense of how many channels and data sources you use?" — then subtly customize the demo language

**During the demo:**
- Never say "in this demo the numbers are fictional" — say "these are sample numbers from a similar company"
- Always use their industry's language
- Ask questions while showing: "Does this view match how you think about your pipeline?"
- Let them drive: "What would you want to see on this page that's not here?"

**After the demo:**
- Follow up same day with a summary email + Calendly link for next step
- Attach: 1-pager PDF of the demo dashboard with your contact details
- Ask for: "Who else from your team should see this before we decide on next steps?"
