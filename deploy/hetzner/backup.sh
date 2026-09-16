#!/usr/bin/env bash
# Daily backup of FISAI Gym data (profiles, passkeys, workout state, session secret).
# Local copies in /opt/fisai-gym/backups (30 days). If rclone has a remote named
# "fisai-backup" configured, the archive is also copied off-site.
set -euo pipefail
ROOT=/opt/fisai-gym
OUT=$ROOT/backups
mkdir -p "$OUT"
stamp=$(date +%F-%H%M)
file="$OUT/fisai-gym-$stamp.tar.gz"
tar czf "$file" -C "$ROOT" data
chmod 600 "$file"
find "$OUT" -name 'fisai-gym-*.tar.gz' -mtime +30 -delete
if command -v rclone >/dev/null && rclone listremotes | grep -q '^fisai-backup:'; then
  rclone copy "$file" fisai-backup:fisai-gym/ --quiet
fi
echo "$(date -Is) ok $file $(du -h "$file" | cut -f1)" >> "$OUT/backup.log"
