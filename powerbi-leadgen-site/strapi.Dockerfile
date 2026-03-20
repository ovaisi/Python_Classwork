# ─────────────────────────────────────────────────────────────────────────────
# Strapi v5 — Dockerfile
# Two-stage: build admin panel, then run in production
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

RUN apk add --no-cache \
    libc6-compat \
    vips-dev \
    build-base \
    python3

WORKDIR /app

# Install dependencies
COPY strapi/package.json ./
RUN npm install

# Copy Strapi source
COPY strapi/ .

# Build Strapi admin panel
# NODE_ENV is intentionally NOT set to production here so Strapi's internal
# `npm install` (for react/styled-components) doesn't prune esbuild and other
# build-time deps. We set it in the runner stage instead.
# Ensure output dirs exist even if Strapi skips them for a plain project.
RUN npm run build && mkdir -p build dist

# ── Stage 2: Production runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner

RUN apk add --no-cache \
    libc6-compat \
    vips        \
    libstdc++

# Non-root user
RUN addgroup --system --gid 1001 strapi \
 && adduser  --system --uid 1001 strapi

WORKDIR /app

COPY --from=builder --chown=strapi:strapi /app/node_modules  ./node_modules
COPY --from=builder --chown=strapi:strapi /app/build         ./build
COPY --from=builder --chown=strapi:strapi /app/dist          ./dist
COPY --from=builder --chown=strapi:strapi /app/config        ./config
COPY --from=builder --chown=strapi:strapi /app/database      ./database
COPY --from=builder --chown=strapi:strapi /app/src           ./src
COPY --from=builder --chown=strapi:strapi /app/package.json  ./package.json
COPY --from=builder --chown=strapi:strapi /app/tsconfig.json ./tsconfig.json

# Uploads directory — mounted as volume in docker-compose
RUN mkdir -p /app/public/uploads \
 && chown -R strapi:strapi /app/public

USER strapi

EXPOSE 1337
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

CMD ["node_modules/.bin/strapi", "start"]
