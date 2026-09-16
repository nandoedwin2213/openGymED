#!/usr/bin/env bash
# Deploy FISAI Gym from git: pull branch, build web image, restart, health-check.
# Usage: deploy.sh [branch]   (default: main)
set -euo pipefail
ROOT=/opt/fisai-gym
SRC=$ROOT/src
BRANCH=${1:-main}

cd "$SRC"
git fetch -q origin "$BRANCH"
git checkout -q "$BRANCH"
git reset -q --hard "origin/$BRANCH"
sha=$(git rev-parse --short HEAD)

docker build -q -t "fisai-gym-web:$sha" -f web/Dockerfile .
docker tag "fisai-gym-web:$sha" fisai-gym-web:current

cd "$ROOT"
"$ROOT/backup.sh"
docker compose up -d --remove-orphans web api

for i in $(seq 1 20); do
  if curl -fsS http://127.0.0.1:8081/api/health >/dev/null; then
    echo "deployed $sha"; break
  fi
  sleep 3
  [ "$i" = 20 ] && { echo "health check failed after deploy of $sha" >&2; exit 1; }
done

# landing
rm -rf "$ROOT/landing.new" && mkdir -p "$ROOT/landing.new"
cp -r "$SRC/website/index.html" "$SRC/website/site.js" "$SRC/website/styles.css" "$SRC/website/robots.txt" "$SRC/website/img" "$ROOT/landing.new/"
cp "$SRC/frontend/public/icon-180.png" "$SRC/frontend/public/icon-512.png" "$ROOT/landing.new/"
rm -rf "$ROOT/landing.old"; mv "$ROOT/landing" "$ROOT/landing.old" 2>/dev/null || true
mv "$ROOT/landing.new" "$ROOT/landing"
docker image prune -f >/dev/null
