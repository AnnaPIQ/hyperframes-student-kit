#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# setup-studio.sh — bootstrap the Hyperframes studio in a fresh environment.
#
# Each Claude-Code-on-the-web container starts clean: node_modules, FFmpeg,
# Chrome, and poppler (for reading brand PDFs) are NOT present. This script
# installs everything the authoring + render + verify loop needs. Idempotent —
# safe to re-run.
#
# Usage:  bash scripts/setup-studio.sh
# -----------------------------------------------------------------------------
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

say() { printf '\n\033[1;36m▶ %s\033[0m\n' "$1"; }

say "1/4 npm install (workspace tooling: playwright)"
npm install

say "2/4 system packages (ffmpeg · poppler · imagemagick · yt-dlp)"
# ffmpeg = encode/decode · poppler(pdftoppm) = PDF brand kits · imagemagick(convert)
# = image resize/crop/convert · yt-dlp = pull reference clips from URLs.
need_apt=0
for b in ffmpeg ffprobe pdftoppm convert; do command -v "$b" >/dev/null 2>&1 || need_apt=1; done
if [ "$need_apt" -eq 1 ]; then
  sudo apt-get update -y >/dev/null 2>&1 || true
  sudo apt-get install -y ffmpeg poppler-utils imagemagick
else
  echo "ffmpeg + poppler + imagemagick already present — skipping apt"
fi
# yt-dlp: standalone binary (apt's is often stale); idempotent.
if ! command -v yt-dlp >/dev/null 2>&1; then
  echo "installing yt-dlp…"
  sudo curl -fsSL https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    -o /usr/local/bin/yt-dlp && sudo chmod a+rx /usr/local/bin/yt-dlp
else
  echo "yt-dlp already present — skipping"
fi

say "3/4 Chrome headless shell (Hyperframes render/preview engine)"
npx --yes hyperframes browser ensure

say "4/4 environment doctor"
# Run from inside a project so the CLI finds a hyperframes.json/meta.json.
( cd video-projects/my-meta-ad 2>/dev/null && npx --yes hyperframes doctor ) \
  || npx --yes hyperframes doctor || true

cat <<'DONE'

✅ Studio ready. Notes for this environment:
   • Preview server (npx hyperframes preview) binds to localhost:3002 INSIDE the
     container — not reachable from your browser on the web. Use the render →
     frame-grab loop here instead. Live Studio works when you clone locally.
   • Docker "not running" is fine — only needed for --docker archival renders.

   Try:  cd video-projects/my-meta-ad && npx hyperframes lint
DONE
