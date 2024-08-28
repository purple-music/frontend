#!/bin/sh
# ENVIRONEMTN from docker-compose.yaml doesn't get through to subprocesses
# Need to explicit pass DATABASE_URL here, otherwise migration doesn't work
# Run migrations
DATABASE_URL="postgresql://purple:music_purple@db:5432/music?sslmode=disable" npx prisma migrate deploy
# start app
DATABASE_URL="postgresql://purple:music_purple@db:5432/music?sslmode=disable" node server.js