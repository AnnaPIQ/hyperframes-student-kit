#!/usr/bin/env bash
# =============================================================================
# pull-media.sh — fetch the Dryft social-proof VO + B-roll from Google Drive.
#
# Why this exists: the 2.5 GB ProRes master ("Dryft Sleep - Without spending a
# dollar more on ads..mov") is shared publicly, but Drive rate-limits the
# SOURCE-file download ("Too many users have viewed or downloaded this file
# recently... up to 24 hours"). Two workarounds, both used here:
#
#   1) VO  — pull Drive's *transcoded preview* stream with yt-dlp. That endpoint
#            is NOT subject to the source-file download quota. Gives the full
#            43.0s of audio as 128 kbps AAC / 44.1 kHz stereo.
#            (The master's own audio is 24-bit/48 kHz LPCM — ~12.35 MB of the
#            2.5 GB. scripts/drive-moov-locate.py + drive-audio-ranges.py can
#            recover exactly those byte ranges once the quota resets.)
#
#   2) B-roll — these files are NOT quota-blocked, and their `moov` atom sits at
#            the FRONT, so ffmpeg can seek over HTTP and pull only the seconds
#            we need instead of downloading whole multi-GB clips.
#
# All six wholesaler clips are phone-vertical stored SIDEWAYS with no rotation
# metadata -> transpose=1 (90 deg CW) makes them upright AND native 2160x3840,
# a perfect 9:16 fill with no padding. "product" is true landscape 16:9.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."
UA="Mozilla/5.0"
dl() { echo "https://drive.usercontent.google.com/download?id=$1&export=download&confirm=t"; }

VO_ID=1WyK-Gg6_MWcsOny0abvOJx1niEvz6Ea7
mkdir -p assets/vo assets/broll

# ---- 1. Voiceover (full length, via transcoded preview stream) ---------------
if [ ! -f assets/vo/dryft-social-proof-vo.m4a ]; then
  echo "▶ VO via Drive preview stream (bypasses source-file quota)"
  yt-dlp -f "ba/b" --no-playlist \
    -o "assets/vo/dryft-social-proof-vo.%(ext)s" \
    "https://drive.google.com/file/d/$VO_ID/view"
fi

# ---- 2. B-roll (HTTP-range seek: only the seconds we need) -------------------
# name|drive_id|in_point|duration|transpose(1=90CW, 0=none)
CLIPS="
walking|1jHsUTe013mdBLjB6VQvJmjzwj0r6cXzT|19|7.0|1
storefront|1NgRACv6dGVzw0cay3767fp4kO4qwDTQQ|3|4.2|1
excited|1HLSp2jot_gQjx2xpl-xeM97bz6u8ihqC|3|6.8|1
product|1RapxMHiEtRmM6ig2GKFSSeCSHU4PA_U1|8|5.2|0
suppliers|1wMgbUuI5dVtGyVLryar5xL-fXg9ZnIQU|2|8.0|1
shelf|1Bhl0B7FWeJy_EmOmLMn06SC_B49ADkdr|0.8|7.6|1
"
echo "$CLIPS" | while IFS='|' read -r name id ss dur tp; do
  [ -z "${name:-}" ] && continue
  out="assets/broll/${name}-src.mp4"
  [ -f "$out" ] && { echo "  ✓ $name (cached)"; continue; }
  vf="null"; [ "$tp" = "1" ] && vf="transpose=1"
  echo "▶ $name  (${ss}s +${dur}s, transpose=$tp)"
  ffmpeg -nostdin -y -hide_banner -loglevel error -user_agent "$UA" \
    -ss "$ss" -i "$(dl "$id")" -t "$dur" \
    -an -vf "$vf" -c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p "$out"
done
echo "✅ media ready in assets/vo + assets/broll"
