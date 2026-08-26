#!/usr/bin/env bash
# =============================================================================
# prep-logo-wall.sh — turn the mixed client-logo drop into a uniform set of
# white knockouts for the "dozens of real brands" logo wall.
#
#   bash scripts/prep-logo-wall.sh <src-dir> <dest-dir>
#
# The drop is screengrabs with every kind of background: white cards, black
# cards, coloured cards, transparent PNGs. The wall renders every mark in
# low-opacity white on navy, so each source is reduced to a white silhouette on
# transparency. Which way to threshold is decided per file by sampling the
# border: a light border means a dark mark (invert), a dark border means a light
# mark (keep). Fully transparent sources use their own alpha.
# =============================================================================
set -uo pipefail
SRC="${1:-.media/logos}"
DEST="${2:-video-projects/my-meta-ad/assets/logos}"
mkdir -p "$DEST"

slugify() { basename "$1" | tr 'A-Z' 'a-z' | sed 's/[^a-z0-9]\+/-/g; s/^-//; s/-$//'; }

n=0
for f in "$SRC"/*; do
  [ -f "$f" ] || continue
  case "${f,,}" in *.png|*.jpg|*.jpeg|*.webp|*.svg) ;; *) continue ;; esac
  slug=$(slugify "$f")

  # Mean luminance of a 2px border ring decides mark polarity.
  border=$(convert "$f" -background white -alpha remove -alpha off -resize 120x120! \
             -shave 2x2 -bordercolor none -format '%[fx:mean]' info: 2>/dev/null || echo 1)
  edge=$(convert "$f" -background white -alpha remove -alpha off -resize 120x120! \
             -gravity North -crop 120x3+0+0 +repage -format '%[fx:mean]' info: 2>/dev/null || echo 1)
  polarity=$(python3 -c "print('dark-mark' if float('$edge') > 0.5 else 'light-mark')")

  # The border heuristic misreads a few sources. Two-tone marks (a light mark
  # sitting inside a dark badge on a coloured card) also need a tighter
  # threshold so only the mark itself survives instead of the whole badge.
  LEVEL="12%,88%"
  case "$slug" in
    images-7-png) polarity="light-mark" ;;                     # Dryft
    images-6-png) polarity="light-mark"; LEVEL="60%,96%" ;;     # Sweet E's
    images-6-jpeg) polarity="light-mark"; LEVEL="52%,92%" ;;    # Naturally Linda
  esac

  if [ "$polarity" = "dark-mark" ]; then NEG="-negate"; else NEG=""; fi

  # Grayscale + threshold gives the mark as a mask; clone it white and copy the
  # mask into that clone's alpha, so every brand ends up as one white silhouette.
  convert "$f" -background white -alpha remove -alpha off \
      -colorspace Gray $NEG -normalize -level "$LEVEL" \
      \( +clone -fill white -colorize 100 \) +swap \
      -alpha off -compose CopyOpacity -composite \
      -trim +repage -resize 420x210\> \
      "PNG32:$DEST/$slug.png" 2>/dev/null && n=$((n+1)) \
    || echo "  ! failed: $f"
  printf '  %-34s %s\n' "$slug.png" "$polarity"
done
echo "→ $n logos written to $DEST"
