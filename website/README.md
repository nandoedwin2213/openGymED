# FISAI Gym landing

Static, hand-written HTML/CSS/JS, no build step. Spanish is the HTML; `site.js` swaps in the
English strings (`EN` table) when the visitor picks EN, has `?lang=en`, or has an English
browser. The app URL lives in `APP_URL` at the top of `site.js`.

`img/` holds phone screenshots of the app in Spanish (demo build, 390×844 @2x). Not in this
folder: `icon-180.png` / `icon-512.png`, copied from `../frontend/public/` at deploy time.

Deploy: copy this folder plus those files to any static host (nginx, Caddy `file_server`).
Bump `?v=N` on `styles.css` / `site.js` in `index.html` on every change.
