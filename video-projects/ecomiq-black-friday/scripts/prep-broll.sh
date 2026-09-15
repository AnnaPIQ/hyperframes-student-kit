#!/usr/bin/env bash
# =============================================================================
# prep-broll.sh — cut the workbook b-roll into the two slots this ad needs.
#
#   bash scripts/prep-broll.sh
#
# Source: assets/broll-workbook-916.mp4 / -45.mp4 — the 21.4s EcomIQ workbook
# b-roll built in video-projects/bf-workbook-broll (branch
# claude/wonderful-curie-brnfzl). Beat map from that composition:
#
#     cover      0.0–2.8      deck (worksheets) 2.4–5.1
#     stats      4.7–7.5      margin page       7.1–10.4   <- SKIPPED
#     calendar  10.0–12.9     spreadsheets     12.5–15.3
#     tools     14.9–17.6     outro lockup     17.2–21.4   <- SKIPPED
#
# Two beats are deliberately dropped because the ad already shows them:
#   • the margin page counts up to $59.71, which the cost-stack panel does at 5s
#   • the outro lockup is an EcomIQ end card, which the real end card does at 34.4s
#
# Slot A (7.48s) runs under the 4-item checklist only. The worksheets-deck beat
# was dropped: it is almost a held frame, so it read as ~2s of dead screen at
# 15-17s. Sean now stays on camera through "…is much easier" instead, and the
# b-roll starts when the checklist does. Natural speed, one hard cut where the
# margin page is skipped (stats -> calendar).
#
# Slot B (3.98s) covers "We've put the full process into a free Black Friday
# workbook" with the cover shot. Only 2.55s of clean cover exists before it
# crossfades to the deck, so it is stretched to fit — 0.64x on an already-slow
# push, which reads as a normal drift.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

A_KEEP="between(t,4.90,7.30)+between(t,10.20,15.28)"   # 2.40s + 5.08s = 7.48s
B_IN=2.55
B_STRETCH=1.5608                                        # 2.55s -> 3.98s

for R in 916 45; do
  SRC="assets/broll-workbook-${R}.mp4"
  [ -f "$SRC" ] || { echo "✗ missing $SRC" >&2; exit 1; }
  echo "▶ ${R}: cutting slot A + slot B…"
  ffmpeg -hide_banner -v warning -i "$SRC" \
    -filter_complex "\
      [0:v]select='${A_KEEP}',setpts=N/FRAME_RATE/TB,fps=30,setsar=1[a];\
      [0:v]trim=start=0:end=${B_IN},setpts=(PTS-STARTPTS)*${B_STRETCH},fps=30,setsar=1[b]" \
    -map "[a]" -an -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
      -movflags +faststart -y "assets/broll-a-${R}.mp4" \
    -map "[b]" -an -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
      -movflags +faststart -y "assets/broll-b-${R}.mp4"
done

echo "✓ done:"
for f in assets/broll-a-916.mp4 assets/broll-b-916.mp4 assets/broll-a-45.mp4 assets/broll-b-45.mp4; do
  printf '   %-24s %ss\n' "$(basename "$f")" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")"
done
