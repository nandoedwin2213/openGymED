#!/usr/bin/env bash
# Every 5 min: if the public app or landing stop answering, restart the stack and log it.
# Optional: set HEALTHCHECKS_URL (healthchecks.io ping URL) in /opt/fisai-gym/watchdog.env to
# get email/WhatsApp alerts when pings stop.
set -u
ROOT=/opt/fisai-gym
[ -f "$ROOT/watchdog.env" ] && . "$ROOT/watchdog.env"
log() { echo "$(date -Is) $*" >> "$ROOT/watchdog.log"; }

ok=1
curl -fsS -m 10 https://gym-95-217-188-12.sslip.io/api/health >/dev/null || { ok=0; log "app down"; }
curl -fsS -m 10 -o /dev/null https://fisai-95-217-188-12.sslip.io/ || { ok=0; log "landing down"; }

if [ $ok = 0 ]; then
  (cd "$ROOT" && docker compose up -d web api >/dev/null 2>&1) && log "restarted stack"
  systemctl is-active --quiet caddy || { systemctl restart caddy; log "restarted caddy"; }
else
  [ -n "${HEALTHCHECKS_URL:-}" ] && curl -fsS -m 10 "$HEALTHCHECKS_URL" >/dev/null 2>&1
fi
exit 0
