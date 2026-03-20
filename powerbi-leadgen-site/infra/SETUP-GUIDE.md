# VPS Setup Guide — Step by Step

## Prerequisites
- Ubuntu 22.04 VPS (8GB/4 cores — your setup)
- A domain pointed to your VPS IP (A record: `@` and `www` and `cms`)
- SSH access as root

---

## Step 1 — Run Setup Script (once, on fresh VPS)

```bash
# On your VPS as root:
git clone https://github.com/yourrepo/powerbi-leadgen-site.git /tmp/setup
chmod +x /tmp/setup/infra/setup-vps.sh
sudo /tmp/setup/infra/setup-vps.sh
```

This installs Node.js 20, PostgreSQL 15, Nginx, PM2, Certbot, and UFW.
At the end it prints your **PostgreSQL password** — save it.

---

## Step 2 — Deploy App Files

```bash
# Clone your repo to the VPS
sudo -u powerbi git clone https://github.com/yourrepo/powerbi-leadgen-site.git /tmp/app

# Copy Next.js
cp -r /tmp/app/powerbi-leadgen-site/* /var/www/powerbi/nextjs/

# Copy Strapi
cp -r /tmp/app/powerbi-leadgen-site/strapi/* /var/www/powerbi/strapi/

# Copy infra
cp -r /tmp/app/powerbi-leadgen-site/infra /var/www/powerbi/
```

---

## Step 3 — Configure Environment Files

### Strapi `.env`
```bash
cd /var/www/powerbi/strapi
cp .env.example .env
nano .env
```

Fill in:
```env
DATABASE_PASSWORD=<password from setup script>
APP_KEYS=<run: node -e "console.log(require('crypto').randomBytes(16).toString('base64'))" 4 times>
API_TOKEN_SALT=<random 32 chars>
ADMIN_JWT_SECRET=<random 32 chars>
JWT_SECRET=<random 32 chars>
TRANSFER_TOKEN_SALT=<random 32 chars>
NEXTJS_URL=http://localhost:3000
REVALIDATE_SECRET=<choose a secret, must match Next.js>
```

### Next.js `.env.local`
```bash
cd /var/www/powerbi/nextjs
cp .env.example .env.local
nano .env.local
```

Fill in:
```env
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=<generate after Strapi is running — see Step 5>
REVALIDATE_SECRET=<same secret as Strapi .env>
NEXT_PUBLIC_SITE_URL=https://datazeb.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
NEXT_PUBLIC_CONTACT_EMAIL=hello@yourdomain.com
```

---

## Step 4 — Install Dependencies & Build

```bash
# Strapi
cd /var/www/powerbi/strapi
npm ci
npm run build

# Next.js
cd /var/www/powerbi/nextjs
npm ci
npm run build
```

---

## Step 5 — Start with PM2

```bash
pm2 start /var/www/powerbi/infra/ecosystem.config.js

# Verify both are running
pm2 status

# Save process list (survives reboots)
pm2 save

# Enable PM2 to start on boot
pm2 startup  # Copy and run the printed command
```

---

## Step 6 — Configure Nginx

```bash
# Copy Nginx config
cp /var/www/powerbi/infra/nginx.conf /etc/nginx/sites-available/powerbi

# Edit: replace "datazeb.com" with your actual domain
nano /etc/nginx/sites-available/powerbi

# Enable site
ln -s /etc/nginx/sites-available/powerbi /etc/nginx/sites-enabled/powerbi

# Test config
nginx -t

# Reload Nginx
systemctl reload nginx
```

---

## Step 7 — SSL Certificate

```bash
# Your domain DNS must point to this VPS IP before running this
certbot --nginx \
    -d datazeb.com \
    -d www.datazeb.com \
    -d cms.datazeb.com \
    --email hello@yourdomain.com \
    --agree-tos \
    --non-interactive

# Verify auto-renewal
certbot renew --dry-run
```

---

## Step 8 — Generate Strapi API Token

1. Open `https://cms.datazeb.com/admin`
2. Create your admin account
3. Go to **Settings → API Tokens → Create new API Token**
4. Name: `nextjs-read`
5. Type: **Read-only**
6. Copy the token

Then update `/var/www/powerbi/nextjs/.env.local`:
```env
STRAPI_TOKEN=paste-your-token-here
```

Restart Next.js:
```bash
pm2 restart nextjs
```

---

## Step 9 — Add Content in Strapi Admin

1. Go to `https://cms.datazeb.com/admin`
2. **Content Manager → Blog Post → Create new entry**
3. Fill in: Title, Slug, Excerpt, Body (rich text), Category, Meta fields
4. Click **Publish**

The Next.js site revalidates automatically within 10 minutes (ISR), or instantly via the webhook.

---

## Day-to-Day Commands

```bash
# Check app status
pm2 status

# Watch live logs
pm2 logs

# Restart after config change
pm2 restart nextjs
pm2 restart strapi

# Deploy new code (from your local machine)
./infra/deploy.sh

# Deploy only frontend
./infra/deploy.sh nextjs

# Check Nginx errors
tail -f /var/log/nginx/error.log

# Check disk usage
df -h

# Check memory
free -h

# Check PostgreSQL
sudo -u postgres psql -c "\l"
```

---

## Performance Expectations (Your 8GB/4-core VPS)

| Service | RAM Usage | CPU |
|---------|-----------|-----|
| Next.js (2 workers) | ~400MB total | Low |
| Strapi | ~500MB | Low |
| PostgreSQL | ~200MB | Low |
| Nginx | ~50MB | Negligible |
| **Total** | **~1.2GB** | **<10% idle** |

You have ~6.8GB headroom. Handles **500+ concurrent users** comfortably.
