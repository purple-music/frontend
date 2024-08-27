FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY ./prisma /app/prisma

RUN echo "DATABASE_URL=postgresql://purple:music_purple@db:5432/music" > .env

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run build