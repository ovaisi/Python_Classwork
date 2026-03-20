#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# PostgreSQL init script — runs once on first container start
#
# Creates a separate database + user for n8n so it is isolated from Strapi.
# Mounted at: /docker-entrypoint-initdb.d/init.sh
# ─────────────────────────────────────────────────────────────────────────────
set -e

N8N_USER="${N8N_DB_USER:-n8n}"
N8N_PASS="${N8N_DB_PASSWORD}"
N8N_DB="${N8N_DB:-n8n_db}"

echo "[init] Creating n8n database and user..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create n8n user (skip if already exists)
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${N8N_USER}') THEN
            CREATE USER ${N8N_USER} WITH PASSWORD '${N8N_PASS}';
        END IF;
    END
    \$\$;

    -- Create n8n database (skip if already exists)
    SELECT 'CREATE DATABASE ${N8N_DB} OWNER ${N8N_USER}'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${N8N_DB}')\gexec

    -- Grant privileges
    GRANT ALL PRIVILEGES ON DATABASE ${N8N_DB} TO ${N8N_USER};
EOSQL

echo "[init] n8n database '${N8N_DB}' ready for user '${N8N_USER}'"
