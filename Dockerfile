FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY ./prisma /app/prisma

# Define environment variable but don't run migrations yet
RUN echo "DATABASE_URL=postgresql://purple:music_purple@db:5432/music" > .env

RUN npm install

COPY . .

EXPOSE 3000

# Replace the 'npm run build' with a script to ensure db is up and Prisma migrations run
CMD ["sh", "-c", "npx prisma generate && npm run build && npm run start"]
