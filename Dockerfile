# === BASE IMAGE ===
FROM node:20.10-alpine AS base

# === DEPENDENCIES ===
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Use ci mode to install from package-lock.json
COPY package.json package-lock.json ./
RUN npm ci

# === BUILD ===
FROM base AS builder
WORKDIR /app

# Copy the dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /root/.npm /root/.npm
# Copy the source code
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN npm run build

# === PROD MODE ===
FROM base AS production
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs --ingroup nodejs

# Copy static files
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 80
ENV PORT=80
CMD sh -c "node server.js"

# === DEV MODE ===
FROM base AS dev
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /root/.npm /root/.npm

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 80

CMD ["npm", "run", "dev"]
