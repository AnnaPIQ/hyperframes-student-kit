#!/usr/bin/env bash
# Turn the raw client-logo pack into white silhouettes with alpha, for the
# drifting logo wall on the "dozens of live brands" beat.
#
# The reference (Shopify_Partner_Hero_v2.mp4) renders every client mark as a
# low-opacity WHITE shape on navy. The source pack is mixed: most marks are dark
# on white, but a few sit on solid colour (Ozium blue, Flaming Estate green,
# Naturally Linda orange, Sweet E black). So the polarity is decided per file
# from its mean luminance rather than assumed:
#   mean > 0.5  -> dark mark on light ground -> alpha = 1 - luma
#   mean <= 0.5 -> light mark on dark ground -> alpha = luma
# Marks sitting on a SOLID COLOUR (not black/white) can't use either rule — the
# ground's mid luminance survives as a visible grey box. Those are listed in
# BG_KNOCK and handled by flood-filling the ground away from the edges instead,
# then keeping whatever shape is left.
# Either way the output is pure white + an alpha mask, so the composition can
# tint and fade them freely.
#
# The Shopify Premier Partner badge is the HERO and is NOT silhouetted — it
# ships as the original black-on-white card.
#
# Usage: bash scripts/prep-brand-logos.sh <dir-with-raw-logos>
set -euo pipefail

SRC="${1:?usage: prep-brand-logos.sh <dir-with-raw-logos>}"
OUT="assets/brands"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

# raw filename -> brand slug
map() {
  case "$1" in
    "Sotheby's-Logo.wine.svg")   echo sothebys ;;
    "harmless-harvest-logo.webp")echo harmless-harvest ;;
    "images (10).png")           echo bricoleur ;;
    "images (11).png")           echo skinny-mixes ;;
    "images (12).png")           echo bedrock ;;
    "images (13).png")           echo cats-pajamas ;;
    "images (14).png")           echo trew ;;
    "images (2).png")            echo kos ;;
    "images (3).png")            echo allstora ;;
    "images (4).jpeg")           echo flaming-estate ;;
    "images (4).png")            echo ozium ;;
    "images (5).jpeg")           echo duckhorn ;;
    "images (5).png")            echo folk-potions ;;
    "images (6).jpeg")           echo naturally-linda ;;
    "images (6).png")            echo sweet-e ;;
    "images (7).jpeg")           echo far-niente ;;
    "images (7).png")            echo dryft ;;
    "images (8).jpeg")           echo mp ;;
    "images (8).png")            echo mob-armor ;;
    "images (9).png")            echo biosyntropy ;;
    "unnamed.jpg")               echo sonoma-cutrer ;;
    *)                           echo "" ;;
  esac
}

# Marks on a solid colour ground — flood-fill the ground out instead of
# thresholding, otherwise the rectangle reads as a grey box on navy.
BG_KNOCK=" dryft flaming-estate naturally-linda ozium sweet-e "

n=0
for f in "$SRC"/*; do
  base="$(basename "$f")"
  [ "$base" = "image (5).png" ] && continue          # hero badge, handled below
  slug="$(map "$base")"
  [ -z "$slug" ] && { echo "  skip (unmapped): $base"; continue; }

  mean=$(convert "$f" -background white -flatten -colorspace gray -format "%[fx:mean]" info:)
  if [[ "$BG_KNOCK" == *" $slug "* ]]; then
    # Ground colour sampled at the top-left pixel, then keyed out EVERYWHERE —
    # not just flood-filled from the edges, which leaves letter counters (the
    # hole in Ozium's O, Flamingo's O) filled in. Transparent pixels are then
    # composited onto black so the mask is luminance-weighted: the brighter the
    # mark, the more opaque, which keeps interior detail instead of flattening
    # each logo to a solid blob.
    bg=$(convert "$f" -format '%[pixel:p{0,0}]' info:)
    convert "$f" -alpha set -fuzz 28% -transparent "$bg" \
            -background black -alpha remove -alpha off \
            -trim +repage -colorspace gray -level 18%,100% "$TMP/mask.png"
  elif awk "BEGIN{exit !($mean > 0.5)}"; then
    convert "$f" -background white -flatten -trim +repage -colorspace gray -negate \
            -level 10%,90% "$TMP/mask.png"
  else
    convert "$f" -background black -flatten -trim +repage -colorspace gray \
            -level 10%,90% "$TMP/mask.png"
  fi
  # White fill + the mask as alpha. Done via MPR so we never have to read the
  # mask's dimensions back out — `identify -format` prints no trailing newline,
  # which makes `read` return non-zero and `set -e` kill the run.
  convert "$TMP/mask.png" -write MPR:mask -fill white -colorize 100% \
          MPR:mask -alpha off -compose CopyOpacity -composite \
          -resize 'x300>' "$OUT/$slug.png"
  n=$((n+1))
  printf '  %-18s mean %s\n' "$slug" "${mean:0:5}"
done

# Hero badge — the original card, trimmed. The source is only 338x149, and the
# composition shows it ~480px wide, so it is upscaled 3x with lanczos + a light
# unsharp here rather than left to the browser's bilinear stretch at render time.
convert "$SRC/image (5).png" -background white -flatten -trim +repage \
        -filter Lanczos -resize 300% -unsharp 0x0.8+0.7+0.02 \
        "$OUT/shopify-premier-partner.png"
echo "  shopify-premier-partner  (hero, not silhouetted)"
echo "done: $n client marks + 1 hero -> $OUT"
