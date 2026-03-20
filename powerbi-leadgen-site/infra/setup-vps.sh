#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# VPS Setup Script — DataZeb
# Tested on: Ubuntu 22.04 LTS
#
# Run as root on a fresh VPS:
#   chmod +x setup-vps.sh && sudo ./setup-vps.sh
#
# What this does:
#   1. System updates + essential packages
#   2. Node.js 20 LTS via NodeSource
#   3. PM2 process manager
#   4. PostgreSQL 15
#   5. Nginx
#   6. Certbot (Let's Encrypt SSL)
#   7. Creates app directories and system user
#   8. Configures PostgreSQL for Strapi
#   9. Sets up UFW firewall
# ─────────────────────────────────────────────────────────────────────────────

set -e  # Exit on any error

DOMAIN="datazeb.com"       # ← CHANGE THIS
EMAIL="hello@datazeb.com"  # ← CHANGE THIS (for SSL cert)
DB_NAME="powerbi_cms"
DB_USER="strapi"
DB_PASS=$(openssl rand -base64 32)  # Auto-generated secure password

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[SETUP]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }

# ── 1. System Updates ─────────────────────────────────────────────────────────
log "Updating system packages..."
apt-get update -qq && apt-get upgrade -y -qq
apt-get install -y -qq \
    curl wget git unzip build-essential \
    ca-certificates gnupg lsb-release \
    ufw fail2ban

# ── 2. Node.js 20 LTS ────────────────────────────────────────────────────────
log "Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node --version
npm --version

# ── 3. PM2 ───────────────────────────────────────────────────────────────────
log "Installing PM2..."
npm install -g pm2
pm2 --version

# ── 4. PostgreSQL 15 ─────────────────────────────────────────────────────────
log "Installing PostgreSQL 15..."
curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc \
    | gpg --dearmor -o /usr/share/keyrings/postgresql-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/postgresql-keyring.gpg] \
    https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" \
    > /etc/apt/sources.list.d/pgdg.list
apt-get update -qq
apt-get install -y -qq postgresql-15 postgresql-client-15

systemctl enable postgresql
systemctl start postgresql

log "Configuring PostgreSQL for Strapi..."
sudo -u postgres psql <<SQL
CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';
CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
SQL

log "PostgreSQL credentials:"
echo "  User:     ${DB_USER}"
echo "  Password: ${DB_PASS}  ← SAVE THIS NOW"
echo "  Database: ${DB_NAME}"

# ── 5. Nginx ─────────────────────────────────────────────────────────────────
log "Installing Nginx..."
apt-get install -y -qq nginx
systemctl enable nginx
systemctl start nginx

# ── 6. Certbot ───────────────────────────────────────────────────────────────
log "Installing Certbot..."
snap install --classic certbot
ln -sf /snap/bin/certbot /usr/bin/certbot

# ── 7. App Directories ────────────────────────────────────────────────────────
log "Creating application directories..."
mkdir -p /var/www/powerbi/{nextjs,strapi}
mkdir -p /var/log/pm2

useradd -r -s /bin/bash -d /var/www/powerbi powerbi 2>/dev/null || true
chown -R powerbi:powerbi /var/www/powerbi
chown -R powerbi:powerbi /var/log/pm2

# ── 8. Nginx Config ───────────────────────────────────────────────────────────
log "Configuring Nginx..."
# Copy the nginx.conf from your repo after deployment
# For now, create the sites directory structure
mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

# Disable default site
rm -f /etc/nginx/sites-enabled/default

cat > /etc/nginx/nginx.conf << 'NGINX'
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log  /var/log/nginx/error.log;

    # Gzip
    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml text/javascript;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
NGINX

nginx -t && systemctl reload nginx

# ── 9. Firewall ───────────────────────────────────────────────────────────────
log "Configuring UFW firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
ufw status

# ── 10. Fail2ban ─────────────────────────────────────────────────────────────
log "Configuring Fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# ── 11. Save Credentials File ────────────────────────────────────────────────
log "Writing credentials to /root/powerbi-credentials.txt (keep safe!)..."
cat > /root/powerbi-credentials.txt << CREDS
DataZeb — VPS Credentials
Generated: $(date)
===========================================
PostgreSQL:
  Host:     127.0.0.1
  Port:     5432
  Database: ${DB_NAME}
  User:     ${DB_USER}
  Password: ${DB_PASS}

Next Steps:
  1. Deploy app files to /var/www/powerbi/nextjs and /var/www/powerbi/strapi
  2. Copy infra/nginx.conf to /etc/nginx/sites-available/powerbi
  3. Link: ln -s /etc/nginx/sites-available/powerbi /etc/nginx/sites-enabled/
  4. Get SSL: certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} -d cms.${DOMAIN}
  5. Start apps: pm2 start /var/www/powerbi/infra/ecosystem.config.js
  6. Save PM2: pm2 save && pm2 startup
CREDS

chmod 600 /root/powerbi-credentials.txt

log "✅ VPS setup complete!"
log "Next: run deploy.sh to push your app files"
warn "Credentials saved to /root/powerbi-credentials.txt — keep this file safe!"
