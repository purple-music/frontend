# Install dependencies only when needed
FROM node:20-bullseye AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      openssl && \
    rm -rf /var/lib/apt/lists/*
RUN npm ci

# Rebuild the source code only when needed
FROM node:20-bullseye AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      openssl && \
    rm -rf /var/lib/apt/lists/*
RUN npx prisma generate
RUN npm run build

# Production image
FROM node:20-bullseye AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      openssl && \
    rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --chown=node:node prisma ./prisma/
COPY --chown=node:node migrate-and-start.sh ./
RUN chown -R node:node /app/node_modules
RUN chmod +x migrate-and-start.sh
USER node
EXPOSE 80
ENV PORT=80
CMD ["sh", "./migrate-and-start.sh"]
