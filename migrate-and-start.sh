#!/bin/sh
DATABASE_URL="postgresql://purple:music_purple@db:5432/music?sslmode=disable" npx --yes prisma generate
DATABASE_URL="postgresql://purple:music_purple@db:5432/music?sslmode=disable" npx --yes prisma migrate deploy
DATABASE_URL="postgresql://purple:music_purple@db:5432/music?sslmode=disable" node server.js