#!/usr/bin/env bash
# Runs ON THE VPS (invoked over SSH by .github/workflows/deploy.yml).
# Assumes: repo already cloned, .env already present, Docker + Compose plugin installed.
set -euo pipefail

cd "$(dirname "$0")/.."

git fetch origin main
git reset --hard origin/main

docker compose -f docker-compose.prod.yml build app
docker compose -f docker-compose.prod.yml up -d

docker image prune -f
