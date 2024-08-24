FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache tree
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

ARG DATABASE_URL
ARG AUTH_SECRET
ARG AUTH_YANDEX_ID
ARG AUTH_YANDEX_SECRET
ARG RESEND_API_KEY

ENV ENV_DATABASE_URL=${DATABASE_URL}
ENV ENV_AUTH_SECRET=${AUTH_SECRET}
ENV ENV_AUTH_YANDEX_ID=${AUTH_YANDEX_ID}
ENV ENV_AUTH_YANDEX_SECRET=${AUTH_YANDEX_SECRET}
ENV ENV_RESEND_API_KEY=${RESEND_API_KEY}

RUN echo "Variable ${DATABASE_URL} | ${ENV_AUTH_SECRET}"

# Create .env file with the environment variables
RUN echo "DATABASE_URL=${ENV_DATABASE_URL}" > .env && \
    echo "AUTH_SECRET=${ENV_AUTH_SECRET}" >> .env && \
    echo "AUTH_YANDEX_ID=${ENV_AUTH_YANDEX_ID}" >> .env && \
    echo "AUTH_YANDEX_SECRET=${ENV_AUTH_YANDEX_SECRET}" >> .env && \
    echo "RESEND_API_KEY=${ENV_RESEND_API_KEY}" >> .env

COPY prisma /app/prisma
RUN tree /app
RUN cat /app/.env

RUN $(grep '^DATABASE_URL' ../.env) corepack enable pnpm && pnpm i --frozen-lockfile


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN corepack enable pnpm && pnpm i --frozen-lockfile;

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js