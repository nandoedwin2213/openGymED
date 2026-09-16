# FISAI Gym on the Hetzner VPS

Layout on the server (`/opt/fisai-gym`):

```
docker-compose.yml            copy of the repo file
docker-compose.override.yml   image fisai-gym-web:current, memory limits, log rotation
.env                          RP_ID / ORIGIN / WEB_PORT / RP_NAME / INVITE_ONLY / ADMIN_UIDS
src/                          git checkout of this repo (built by deploy.sh)
data/                         profiles, passkeys, workout state — the only thing that matters
backups/                      daily tar.gz of data/, 30 days
landing/                      static site served by Caddy (website/ + icons)
deploy.sh backup.sh watchdog.sh
```

Caddy (`/etc/caddy/Caddyfile`) terminates TLS: app host → `reverse_proxy 127.0.0.1:8081`,
`gymfisai.com` (+`www` redirect) → `file_server` on `/opt/fisai-gym/landing`.

- `deploy.sh [branch]` — pull, build `web/Dockerfile`, back up, `compose up`, health-check,
  refresh landing. Run after merging to `main`.
- `backup.sh` — cron 03:17 daily (`/etc/cron.d/fisai-gym`). Copies off-site too if an rclone
  remote named `fisai-backup` exists. Production uses a Hetzner Storage Box sub-user over SFTP
  (port 23, chrooted to its own directory); remote copies live in `fisai-backup:fisai-gym/` and are
  kept 90 days. Credentials live only in `/root/.config/rclone/rclone.conf` (mode 600). To recreate:
  `rclone config create fisai-backup sftp host <box>.your-storagebox.de user <subuser> port 23 pass "$(rclone obscure '<pw>')" --obscure=false`.
  Restore test: `rclone copy fisai-backup:fisai-gym/<file> /tmp/rt/ && tar xzf /tmp/rt/<file> -C /tmp/rt`.
- `watchdog.sh` — cron every 5 min; restarts the stack/Caddy if the public URLs stop answering.
  Put `HEALTHCHECKS_URL=https://hc-ping.com/…` in `/opt/fisai-gym/watchdog.env` for alerts.

Changing domain: edit `.env` (`RP_ID`, `ORIGIN`), the two Caddy site blocks, `APP_URL` in
`website/site.js` and the URLs in `watchdog.sh`, then `deploy.sh`. Passkeys are bound to
`RP_ID` — existing users must register again after a domain change.
