#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Deploy Script — DataZeb
#
# Usage (from your local machine):
#   ./infra/deploy.sh
#
# Or deploy only one service:
#   ./infra/deploy.sh nextjs
#   ./infra/deploy.sh strapi
#
# What this does:
#   1. Git pull latest code
#   2. Install dependencies
#   3. Build Next.js (or Strapi admin)
#   4. PM2 reload (zero-downtime for Next.js)
# ─────────────────────────────────────────────────────────────────────────────

set -e

VPS_USER="powerbi"
VPS_HOST="YOUR_VPS_IP"   # ← CHANGE THIS
DEPLOY="$1"              # optional: "nextjs" or "strapi"

GREEN='\033[0;32m'
NC='\033[0m'
log() { echo -e "${GREEN}[DEPLOY]${NC} $1"; }

deploy_nextjs() {
    log "Deploying Next.js..."
    ssh ${VPS_USER}@${VPS_HOST} << 'REMOTE'
        set -e
        cd /var/www/powerbi/nextjs

        log() { echo "[REMOTE] $1"; }

        log "Pulling latest code..."
        git pull origin main

        log "Installing dependencies..."
        npm ci --production=false

        log "Building Next.js..."
        npm run build

        log "Reloading PM2 (zero-downtime)..."
        pm2 reload nextjs --update-env

        log "✅ Next.js deployed"
REMOTE
}

deploy_strapi() {
    log "Deploying Strapi..."
    ssh ${VPS_USER}@${VPS_HOST} << 'REMOTE'
        set -e
        cd /var/www/powerbi/strapi

        log() { echo "[REMOTE] $1"; }

        log "Pulling latest code..."
        git pull origin main

        log "Installing dependencies..."
        npm ci

        log "Building Strapi admin..."
        npm run build

        log "Restarting Strapi via PM2..."
        pm2 restart strapi --update-env

        log "✅ Strapi deployed"
REMOTE
}

case "$DEPLOY" in
    "nextjs")  deploy_nextjs  ;;
    "strapi")  deploy_strapi  ;;
    *)
        deploy_nextjs
        deploy_strapi
        log "✅ Full deployment complete"
        ;;
esac
