#!/bin/sh
DATABASE_URL="postgresql://purple:music_purple@db:5432/music?sslmode=disable" npx prisma migrate deploy
node --env-file=.env server.js