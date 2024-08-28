FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY ./prisma /app/prisma

# Define environment variable but don't run migrations yet
RUN echo "DATABASE_URL=postgresql://purple:music_purple@db:5432/music" > .env

RUN npm install

COPY migrate-and-start.sh .
RUN chmod +x migrate-and-start.sh

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN mkdir .next
RUN chown nextjs:nodejs .next

EXPOSE 3000
ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["./migrate-and-start.sh"]