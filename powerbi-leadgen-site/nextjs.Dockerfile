# ─────────────────────────────────────────────────────────────────────────────
# Next.js — Multi-stage Dockerfile
# Stage 1 (deps):   install dependencies
# Stage 2 (builder): build the Next.js app
# Stage 3 (runner):  minimal production image (~200MB vs ~1GB)
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Install dependencies ────────────────────────────────────────────
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# ── Stage 2: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# These build-time env vars get baked into the JS bundle
# Runtime secrets (STRAPI_TOKEN etc.) are passed at container start
ARG NEXT_PUBLIC_SITE_URL=https://datazeb.com
ARG NEXT_PUBLIC_SITE_NAME=DataZeb
ARG NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
ARG NEXT_PUBLIC_CONTACT_EMAIL=hello@datazeb.com

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME
ENV NEXT_PUBLIC_CALENDLY_URL=$NEXT_PUBLIC_CALENDLY_URL
ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 3: Production runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy only what's needed to run
COPY --from=builder /app/public          ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Next.js standalone server
CMD ["node", "server.js"]
