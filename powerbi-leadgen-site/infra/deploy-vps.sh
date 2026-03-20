#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# DataZeb — VPS First-Time Deploy Script
#
# Run once on the VPS from the repo root:
#   cd /root/datazeb/powerbi-leadgen-site
#   bash infra/deploy-vps.sh
#
# What this does:
#   1. Issues SSL cert for cms.datazeb.com (temp nginx block → certbot → cleanup)
#   2. Deploys nginx configs for datazeb.com + cms.datazeb.com
#   3. Migrates datazeb.cloud config to its own file (keeps n8n working)
#   4. Starts the Docker stack (postgres + strapi + nextjs)
# ─────────────────────────────────────────────────────────────────────────────

set -e

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
GREEN='\033[0;32m'; RED='\033[0;31m'; NC='\033[0m'
log()  { echo -e "${GREEN}[deploy]${NC} $1"; }
fail() { echo -e "${RED}[error]${NC} $1"; exit 1; }

# ── Preflight checks ──────────────────────────────────────────────────────────
[ "$(id -u)" -eq 0 ] || fail "Run as root"
[ -f "$REPO_DIR/.env" ]  || fail ".env not found — cp .env.example .env and fill in values"
command -v docker   >/dev/null || fail "docker not found"
command -v certbot  >/dev/null || fail "certbot not found"
command -v nginx    >/dev/null || fail "nginx not found"

# ── Step 1: Issue SSL cert for cms.datazeb.com ────────────────────────────────
if [ ! -d /etc/letsencrypt/live/cms.datazeb.com ]; then
    log "Creating temporary nginx block for cms.datazeb.com cert issuance..."
    cat > /etc/nginx/sites-available/cms-temp <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name cms.datazeb.com;
    location /.well-known/acme-challenge/ { root /var/www/html; }
    location / { return 301 https://$host$request_uri; }
}
EOF
    ln -sf /etc/nginx/sites-available/cms-temp /etc/nginx/sites-enabled/cms-temp
    nginx -t && systemctl reload nginx

    log "Issuing SSL cert for cms.datazeb.com..."
    certbot certonly --nginx -d cms.datazeb.com --non-interactive --agree-tos \
        --email "$(grep NEXT_PUBLIC_CONTACT_EMAIL "$REPO_DIR/.env" | cut -d= -f2)"

    log "Cleaning up temp nginx block..."
    rm -f /etc/nginx/sites-enabled/cms-temp /etc/nginx/sites-available/cms-temp
else
    log "SSL cert for cms.datazeb.com already exists — skipping"
fi

# ── Step 2: Deploy datazeb.cloud config (separate file, keeps n8n working) ───
log "Deploying datazeb.cloud nginx config..."
cp "$REPO_DIR/infra/nginx/datazeb.cloud.conf" /etc/nginx/sites-available/datazeb.cloud
ln -sf /etc/nginx/sites-available/datazeb.cloud /etc/nginx/sites-enabled/datazeb.cloud

# ── Step 3: Deploy datazeb.com + cms.datazeb.com config ──────────────────────
log "Deploying datazeb.com nginx config..."
cp "$REPO_DIR/infra/nginx/datazeb.com.conf" /etc/nginx/sites-available/datazeb.com
# sites-enabled/datazeb.com already exists (old combined file) — overwrite symlink
ln -sf /etc/nginx/sites-available/datazeb.com /etc/nginx/sites-enabled/datazeb.com

# ── Step 4: Reload nginx ──────────────────────────────────────────────────────
log "Testing and reloading nginx..."
nginx -t || fail "nginx config test failed — check errors above"
systemctl reload nginx
log "nginx reloaded"

# ── Step 5: Start Docker stack ────────────────────────────────────────────────
log "Building and starting Docker containers..."
cd "$REPO_DIR"
docker compose up -d --build

log ""
log "Deploy complete!"
log "  Next.js  → https://datazeb.com"
log "  Strapi   → https://cms.datazeb.com"
log "  n8n      → https://datazeb.cloud/automation  (unchanged)"
log ""
log "Next steps:"
log "  1. Open https://cms.datazeb.com/admin to create your Strapi admin account"
log "  2. Create a Strapi API token and add it to .env as STRAPI_TOKEN"
log "  3. Redeploy Next.js: docker compose up -d --build nextjs"
