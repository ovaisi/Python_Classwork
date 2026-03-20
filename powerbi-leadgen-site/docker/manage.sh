#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# DataZeb — Docker management script
#
# Usage:
#   ./docker/manage.sh <command>
#
# Commands:
#   setup     — First-time VPS setup (installs Docker)
#   ssl       — Issue SSL certificate (run once after setup)
#   up        — Start all containers
#   down      — Stop all containers
#   deploy    — Pull latest code + rebuild + restart (zero-downtime)
#   deploy nextjs  — Rebuild and restart only Next.js
#   deploy strapi  — Rebuild and restart only Strapi
#   logs      — Stream all logs
#   logs nextjs|strapi|nginx|postgres — Stream specific service logs
#   status    — Show container status and resource usage
#   backup    — Backup PostgreSQL database
#   restore   — Restore PostgreSQL from backup file
#   shell     — Open shell in a container
# ─────────────────────────────────────────────────────────────────────────────

set -e
COMPOSE="docker compose"
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
log()  { echo -e "${GREEN}[datazeb]${NC} $1"; }
warn() { echo -e "${YELLOW}[warn]${NC} $1"; }
err()  { echo -e "${RED}[error]${NC} $1"; exit 1; }

CMD="${1:-help}"
ARG="${2:-}"

# ── Ensure .env exists ────────────────────────────────────────────────────────
check_env() {
    if [[ ! -f .env ]]; then
        err ".env not found. Run: cp .env.docker.example .env && nano .env"
    fi
}

case "$CMD" in

# ── First-time VPS setup ──────────────────────────────────────────────────────
setup)
    log "Installing Docker Engine on Ubuntu..."
    apt-get update -qq
    apt-get install -y -qq ca-certificates curl gnupg lsb-release

    # Docker GPG key
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
        | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg

    # Docker apt repo
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
        https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
        | tee /etc/apt/sources.list.d/docker.list > /dev/null

    apt-get update -qq
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    systemctl enable docker
    systemctl start docker

    # UFW firewall
    ufw --force reset
    ufw default deny incoming
    ufw default allow outgoing
    ufw allow ssh
    ufw allow http
    ufw allow https
    ufw --force enable

    log "✅ Docker installed. Next steps:"
    echo "  1. cp .env.docker.example .env && nano .env"
    echo "  2. ./docker/manage.sh ssl"
    echo "  3. ./docker/manage.sh up"
    ;;

# ── Issue SSL cert (first time) ───────────────────────────────────────────────
ssl)
    check_env
    source .env

    warn "Your DNS A records must point datazeb.com, www.datazeb.com, and cms.datazeb.com to this server's IP before running this."
    read -rp "Continue? (y/N) " confirm
    [[ "$confirm" =~ ^[Yy]$ ]] || exit 1

    log "Starting Nginx in HTTP-only mode for ACME challenge..."
    # Start nginx with the pre-ssl config temporarily
    $COMPOSE up -d nginx

    log "Issuing certificate for datazeb.com, www.datazeb.com, cms.datazeb.com..."
    $COMPOSE run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email "${CERTBOT_EMAIL:-hello@datazeb.com}" \
        --agree-tos \
        --no-eff-email \
        -d datazeb.com \
        -d www.datazeb.com \
        -d cms.datazeb.com

    log "Reloading Nginx with SSL enabled..."
    $COMPOSE exec nginx nginx -s reload

    log "✅ SSL certificate issued. Valid for 90 days — auto-renewed by certbot container."
    ;;

# ── Start all containers ──────────────────────────────────────────────────────
up)
    check_env
    log "Starting all containers..."
    $COMPOSE up -d --build
    $COMPOSE ps
    log "✅ All services running"
    echo ""
    echo "  Frontend:   https://datazeb.com"
    echo "  CMS:        https://cms.datazeb.com/admin"
    echo "  Automation: https://datazeb.com/automation/"
    ;;

# ── Stop all containers ────────────────────────────────────────────────────────
down)
    log "Stopping all containers..."
    $COMPOSE down
    log "✅ All containers stopped (data volumes preserved)"
    ;;

# ── Deploy ─────────────────────────────────────────────────────────────────────
deploy)
    check_env
    log "Pulling latest code..."
    git pull origin main

    if [[ -z "$ARG" ]]; then
        log "Rebuilding and restarting all services..."
        $COMPOSE up -d --build
    else
        log "Rebuilding and restarting: $ARG"
        $COMPOSE up -d --build "$ARG"
    fi

    log "✅ Deploy complete"
    $COMPOSE ps
    ;;

# ── Logs ──────────────────────────────────────────────────────────────────────
logs)
    if [[ -n "$ARG" ]]; then
        $COMPOSE logs -f "$ARG"
    else
        $COMPOSE logs -f
    fi
    ;;

# ── Status ────────────────────────────────────────────────────────────────────
status)
    echo ""
    $COMPOSE ps
    echo ""
    log "Resource usage:"
    docker stats --no-stream \
        datazeb_postgres \
        datazeb_strapi \
        datazeb_nextjs \
        datazeb_n8n \
        datazeb_nginx 2>/dev/null || true
    ;;

# ── Backup PostgreSQL ──────────────────────────────────────────────────────────
backup)
    check_env
    source .env
    BACKUP_FILE="backup-$(date +%Y%m%d-%H%M%S).sql.gz"
    log "Backing up PostgreSQL to $BACKUP_FILE..."
    docker exec datazeb_postgres \
        pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" \
        | gzip > "$BACKUP_FILE"
    log "✅ Backup saved: $BACKUP_FILE ($(du -sh "$BACKUP_FILE" | cut -f1))"
    ;;

# ── Restore PostgreSQL ─────────────────────────────────────────────────────────
restore)
    check_env
    source .env
    BACKUP_FILE="$ARG"
    [[ -f "$BACKUP_FILE" ]] || err "Backup file not found: $BACKUP_FILE"
    warn "This will OVERWRITE the current database. Are you sure?"
    read -rp "Type 'yes' to confirm: " confirm
    [[ "$confirm" == "yes" ]] || exit 1
    log "Restoring from $BACKUP_FILE..."
    gunzip -c "$BACKUP_FILE" | docker exec -i datazeb_postgres \
        psql -U "$POSTGRES_USER" "$POSTGRES_DB"
    log "✅ Database restored"
    ;;

# ── Shell into a container ────────────────────────────────────────────────────
shell)
    SERVICE="${ARG:-nextjs}"
    log "Opening shell in $SERVICE container..."
    docker exec -it "datazeb_${SERVICE}" sh
    ;;

# ── Help ──────────────────────────────────────────────────────────────────────
help|*)
    echo ""
    echo "DataZeb — Docker management"
    echo ""
    echo "  ./docker/manage.sh setup           First-time Docker install on VPS"
    echo "  ./docker/manage.sh ssl             Issue Let's Encrypt SSL certificate"
    echo "  ./docker/manage.sh up              Start all containers"
    echo "  ./docker/manage.sh down            Stop all containers"
    echo "  ./docker/manage.sh deploy          Pull + rebuild + restart all"
    echo "  ./docker/manage.sh deploy nextjs   Rebuild only Next.js"
    echo "  ./docker/manage.sh deploy strapi   Rebuild only Strapi"
    echo "  ./docker/manage.sh logs            Stream all logs"
    echo "  ./docker/manage.sh logs nextjs     Stream Next.js logs"
    echo "  ./docker/manage.sh status          Container status + resource usage"
    echo "  ./docker/manage.sh backup          Backup PostgreSQL database"
    echo "  ./docker/manage.sh restore <file>  Restore PostgreSQL from backup"
    echo "  ./docker/manage.sh shell [service] Open shell in container"
    echo ""
    ;;

esac
