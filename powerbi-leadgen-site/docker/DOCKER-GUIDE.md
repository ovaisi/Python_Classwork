# Docker Deployment Guide — datazeb.com

## Architecture

```
                  Internet
                     │
              ┌──────▼──────┐
              │    Nginx    │  :80, :443
              └──────┬──────┘
                     │ Docker bridge network (datazeb_net)
          ┌──────────┴───────────┐
          │                     │
   ┌──────▼──────┐       ┌──────▼──────┐
   │   Next.js   │       │   Strapi    │
   │   :3000     │       │   :1337     │
   └─────────────┘       └──────┬──────┘
                                │
                         ┌──────▼──────┐
                         │ PostgreSQL  │
                         │   :5432     │
                         └─────────────┘

Named volumes (data survives container restarts):
  postgres_data   → /var/lib/postgresql/data
  strapi_uploads  → /app/public/uploads
  certbot_certs   → /etc/letsencrypt
```

---

## Prerequisites

- Ubuntu 22.04 VPS (your 8GB/4-core)
- Domain `datazeb.com` DNS pointing to your VPS IP
  - A record: `@`   → VPS IP
  - A record: `www` → VPS IP
  - A record: `cms` → VPS IP
- SSH access as root

---

## Step 1 — Clone repo on VPS

```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Clone the project
git clone https://github.com/yourusername/powerbi-leadgen-site.git /var/www/datazeb
cd /var/www/datazeb
```

---

## Step 2 — Install Docker

```bash
chmod +x docker/manage.sh
sudo ./docker/manage.sh setup
```

This installs:
- Docker Engine + Docker Compose plugin
- Configures UFW firewall (ports 22, 80, 443 only)

---

## Step 3 — Configure Environment

```bash
cp .env.docker.example .env
nano .env
```

Fill in every value. Generate secrets with:

```bash
# Generate a secure random secret (run once per secret)
openssl rand -base64 32
```

Your `.env` should look like:

```env
POSTGRES_DB=datazeb_cms
POSTGRES_USER=strapi
POSTGRES_PASSWORD=Xk9mP...  ← strong random password

STRAPI_APP_KEYS=abc123==,def456==,ghi789==,jkl012==
STRAPI_API_TOKEN_SALT=abc...
STRAPI_ADMIN_JWT_SECRET=def...
STRAPI_TRANSFER_TOKEN_SALT=ghi...
STRAPI_JWT_SECRET=jkl...

REVALIDATE_SECRET=mno...    ← same value used by both Strapi and Next.js

STRAPI_TOKEN=               ← leave blank for now, fill after Step 5
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
NEXT_PUBLIC_CONTACT_EMAIL=hello@datazeb.com
```

---

## Step 4 — Issue SSL Certificate (first time only)

DNS must be propagated before this step (check with `nslookup datazeb.com`).

```bash
sudo ./docker/manage.sh ssl
```

This:
1. Starts Nginx in HTTP-only mode
2. Runs Certbot to issue certificate for all 3 domains
3. Reloads Nginx with HTTPS enabled

Certificate auto-renews every 12 hours via the certbot container.

---

## Step 5 — Start Everything

```bash
sudo ./docker/manage.sh up
```

This builds both images and starts all 5 containers.
First build takes ~3–5 minutes. Subsequent deploys are faster.

Check status:
```bash
sudo ./docker/manage.sh status
```

Expected output:
```
NAME                STATUS
datazeb_postgres    Up (healthy)
datazeb_strapi      Up (healthy)
datazeb_nextjs      Up (healthy)
datazeb_nginx       Up (healthy)
datazeb_certbot     Up
```

---

## Step 6 — Create Strapi Admin Account

Open `https://cms.datazeb.com/admin` in your browser.

Create your admin account on first visit.

---

## Step 7 — Generate Strapi API Token

In Strapi admin:
1. **Settings → API Tokens → + Create new API Token**
2. Name: `nextjs-read`
3. Token type: **Read-only**
4. Click **Save** → copy the token immediately

Add to `.env`:
```env
STRAPI_TOKEN=paste-your-token-here
```

Restart Next.js to pick up the token:
```bash
sudo ./docker/manage.sh deploy nextjs
```

---

## Day-to-Day Commands

```bash
# Check container status + memory/CPU
./docker/manage.sh status

# Stream all logs
./docker/manage.sh logs

# Stream logs for one service
./docker/manage.sh logs nextjs
./docker/manage.sh logs strapi
./docker/manage.sh logs nginx

# Deploy after code change (zero-downtime for Next.js)
./docker/manage.sh deploy

# Deploy only frontend (faster)
./docker/manage.sh deploy nextjs

# Deploy only CMS
./docker/manage.sh deploy strapi

# Open shell in a container (for debugging)
./docker/manage.sh shell nextjs
./docker/manage.sh shell strapi
./docker/manage.sh shell postgres

# Backup database
./docker/manage.sh backup
# Creates: backup-20250315-143022.sql.gz

# Restore database
./docker/manage.sh restore backup-20250315-143022.sql.gz

# Stop everything
./docker/manage.sh down
```

---

## Publishing Blog Posts

1. Go to `https://cms.datazeb.com/admin`
2. **Content Manager → Blog Post → + Create new entry**
3. Fill in: Title, Slug (auto-generated), Excerpt, Body, Category, Meta fields
4. Click **Publish**

Next.js updates automatically:
- **Instantly** via the revalidation webhook (Strapi → Next.js `/api/revalidate`)
- **Fallback**: ISR revalidates every 10 minutes anyway

---

## Resource Usage on Your VPS (8GB/4-core)

| Container | RAM | CPU (idle) |
|-----------|-----|-----------|
| postgres | ~150MB | ~0% |
| strapi | ~450MB | ~1% |
| nextjs | ~180MB | ~1% |
| n8n | ~250MB | ~1% |
| nginx | ~30MB | ~0% |
| certbot | ~20MB | ~0% |
| **Total** | **~1.1GB** | **~2%** |

**6.9GB free** for traffic spikes and future services.

---

## Updating the Code

```bash
# On VPS:
cd /var/www/datazeb
git pull origin main
./docker/manage.sh deploy
```

Or set up a GitHub Action to SSH in and run this automatically on every push to `main`.

---

## Troubleshooting

**Nginx returns 502 Bad Gateway**
```bash
# Check if Next.js/Strapi containers are healthy
./docker/manage.sh status
./docker/manage.sh logs nginx
./docker/manage.sh logs nextjs
```

**Strapi won't start**
```bash
./docker/manage.sh logs strapi
# Usually: wrong DATABASE_PASSWORD or missing STRAPI_APP_KEYS
```

**SSL certificate not found**
```bash
# Re-run SSL setup
./docker/manage.sh ssl
```

**Database connection error**
```bash
# Verify postgres is healthy
docker exec datazeb_postgres pg_isready -U strapi
```

**Out of disk space**
```bash
# Remove unused Docker images
docker image prune -f
docker system prune -f  # WARNING: removes stopped containers too
df -h
```
