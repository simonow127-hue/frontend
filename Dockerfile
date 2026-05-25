FROM node:22-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Required for final COPY in runner (Next.js does not create this if missing from repo)
RUN mkdir -p public

# Easypanel / CI pass these as --build-arg; embed at build time
ARG NEXT_PUBLIC_SITE_URL=https://riads.shop
ARG NEXT_PUBLIC_API_URL=https://api.riads.shop
ARG NEXT_PUBLIC_META_PIXEL_ID=
ARG NEXT_PUBLIC_TIKTOK_PIXEL_ID=
ARG NEXT_PUBLIC_SNAP_PIXEL_ID=
ARG NEXT_PUBLIC_ENABLE_META_PIXEL=true
ARG NEXT_PUBLIC_ENABLE_TIKTOK_PIXEL=true
ARG NEXT_PUBLIC_ENABLE_SNAP_PIXEL=true
ARG NEXT_PUBLIC_ENABLE_DEBUG_EVENTS=false

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID
ENV NEXT_PUBLIC_TIKTOK_PIXEL_ID=$NEXT_PUBLIC_TIKTOK_PIXEL_ID
ENV NEXT_PUBLIC_SNAP_PIXEL_ID=$NEXT_PUBLIC_SNAP_PIXEL_ID
ENV NEXT_PUBLIC_ENABLE_META_PIXEL=$NEXT_PUBLIC_ENABLE_META_PIXEL
ENV NEXT_PUBLIC_ENABLE_TIKTOK_PIXEL=$NEXT_PUBLIC_ENABLE_TIKTOK_PIXEL
ENV NEXT_PUBLIC_ENABLE_SNAP_PIXEL=$NEXT_PUBLIC_ENABLE_SNAP_PIXEL
ENV NEXT_PUBLIC_ENABLE_DEBUG_EVENTS=$NEXT_PUBLIC_ENABLE_DEBUG_EVENTS
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
