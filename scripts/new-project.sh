#!/usr/bin/env bash
# =============================================================================
# new-project.sh — scaffold a new, fully-wired EcomIQ video project.
#
#   bash scripts/new-project.sh <slug> [format]
#   npm run new -- <slug> [format]
#
# Creates video-projects/<slug>/ with the right dimensions, the EcomIQ brand
# kit (tokens + logos + LOCAL fonts), a lint-clean starter composition, and a
# DESIGN.md — ready to open in the studio. Does NOT touch existing projects.
#
# Formats:
#   meta      1080x1350  4:5   Meta/Instagram feed ad        (default)
#   square    1080x1080  1:1   square feed / ads
#   story     1080x1920  9:16  Stories / Reels / TikTok
#   wide      1920x1080  16:9  landscape promo / YouTube
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

# ---- pretty output ----------------------------------------------------------
c_blue=$'\033[1;36m'; c_grn=$'\033[1;32m'; c_red=$'\033[1;31m'; c_dim=$'\033[2m'; c_off=$'\033[0m'
say()  { printf '%s▶ %s%s\n' "$c_blue" "$1" "$c_off"; }
ok()   { printf '%s  ✓ %s%s\n' "$c_grn" "$1" "$c_off"; }
err()  { printf '%s✗ %s%s\n' "$c_red" "$1" "$c_off" >&2; }

usage() {
  cat <<USAGE
${c_blue}new-project.sh${c_off} — scaffold a new EcomIQ video project

${c_dim}Usage:${c_off}
  bash scripts/new-project.sh <slug> [format]
  npm run new -- <slug> [format]

${c_dim}Arguments:${c_off}
  slug      kebab-case project name, e.g. q3-launch-ad
  format    one of: meta (default) | square | story | wide

${c_dim}Examples:${c_off}
  bash scripts/new-project.sh summer-sale            # 4:5 Meta ad
  bash scripts/new-project.sh launch-teaser story    # 9:16 Reels
USAGE
}

# ---- args -------------------------------------------------------------------
[ $# -lt 1 ] && { usage; exit 1; }
case "$1" in -h|--help|help) usage; exit 0;; esac

SLUG="$1"
FORMAT="${2:-meta}"

# validate slug: kebab-case
if ! printf '%s' "$SLUG" | grep -qE '^[a-z0-9]+(-[a-z0-9]+)*$'; then
  err "Slug must be kebab-case (lowercase, digits, hyphens). Got: '$SLUG'"; exit 1
fi

case "$FORMAT" in
  meta)   W=1080; H=1350; LABEL="4:5 Meta feed";;
  square) W=1080; H=1080; LABEL="1:1 square";;
  story)  W=1080; H=1920; LABEL="9:16 Story/Reels";;
  wide)   W=1920; H=1080; LABEL="16:9 landscape";;
  *) err "Unknown format '$FORMAT'. Use: meta | square | story | wide"; exit 1;;
esac

DEST="video-projects/$SLUG"
[ -e "$DEST" ] && { err "$DEST already exists — pick another slug."; exit 1; }

BRAND="assets/ecomiq"
[ -d "$BRAND" ] || { err "Brand kit missing at $BRAND. Run from repo root."; exit 1; }

# ---- scaffold ---------------------------------------------------------------
say "Creating $DEST  ($LABEL · ${W}x${H} @ 30fps)"
mkdir -p "$DEST/compositions/components" "$DEST/assets/fonts" "$DEST/assets/vendor" "$DEST/renders"
touch "$DEST/renders/.gitkeep"
ok "folders"

# brand assets (tokens, logos, local fonts)
cp "$BRAND/brand-tokens.css" "$DEST/assets/"
cp "$BRAND"/ecomiq-logo-*.svg "$BRAND"/ecomiq-logo-*.png "$BRAND"/ecomiq-icon-* "$DEST/assets/"
cp "$BRAND"/fonts/RethinkSans.woff2 "$BRAND"/fonts/HedvigLettersSerif.woff2 "$DEST/assets/fonts/"
cp "$BRAND"/vendor/gsap.min.js "$DEST/assets/vendor/"
ok "brand kit (tokens, logos, local fonts, vendored GSAP)"

# hyperframes.json
cat > "$DEST/hyperframes.json" <<'JSON'
{
  "$schema": "https://hyperframes.heygen.com/schema/hyperframes.json",
  "registry": "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
  "paths": { "blocks": "compositions", "components": "compositions/components", "assets": "assets" }
}
JSON

# meta.json
cat > "$DEST/meta.json" <<JSON
{
  "id": "$SLUG",
  "name": "$SLUG",
  "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%S.000Z)",
  "width": $W,
  "height": $H,
  "fps": 30
}
JSON
ok "hyperframes.json + meta.json"

# starter composition (local fonts, brand tokens, lint-clean)
cat > "$DEST/index.html" <<HTML
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=$W, height=$H" />
    <title>$SLUG</title>
    <!-- GSAP vendored locally — CDN cert-fails in the render env and freezes renders -->
    <script src="assets/vendor/gsap.min.js"></script>
    <link rel="stylesheet" href="assets/brand-tokens.css" />
    <style>
      /* LOCAL fonts — no network dependency at render time (latin subset) */
      @font-face { font-family: 'Rethink Sans'; font-style: normal; font-weight: 400 800;
        font-display: block; src: url(assets/fonts/RethinkSans.woff2) format('woff2'); }
      @font-face { font-family: 'Hedvig Letters Serif'; font-style: normal; font-weight: 400;
        font-display: block; src: url(assets/fonts/HedvigLettersSerif.woff2) format('woff2'); }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${W}px; height: ${H}px; overflow: hidden;
        background: var(--brand-bg); font-family: 'Rethink Sans', system-ui, sans-serif; color: var(--brand-text); }
      #bg { position: absolute; inset: 0;
        background: radial-gradient(90% 55% at 50% 20%, rgba(156,212,255,.10) 0%, rgba(6,40,76,0) 55%), var(--brand-navy); }
      #logo { position: absolute; top: 7%; left: 10%; width: 33%; height: auto; }
      #stage { position: absolute; inset: 0; display: flex; flex-direction: column;
        align-items: center; justify-content: center; gap: 24px; padding: 10%; text-align: center; }
      #eyebrow { font-weight: 600; font-size: 26px; letter-spacing: .34em; text-transform: uppercase; color: var(--brand-blue-tint); }
      #headline { font-weight: 800; font-size: 96px; line-height: .98; letter-spacing: -.03em; }
      #headline .em { font-family: 'Hedvig Letters Serif', serif; font-style: italic; font-weight: 400; color: var(--brand-blue-tint); }
      #subhead { font-weight: 500; font-size: 34px; line-height: 1.3; color: var(--brand-text-dim); max-width: 70%; }
      #cta { margin-top: 12px; font-weight: 700; font-size: 34px; color: var(--brand-white);
        background: var(--brand-flame); padding: 26px 52px; border-radius: 999px;
        box-shadow: 0 20px 64px -16px rgba(255,76,50,.6); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="$SLUG" data-start="0" data-duration="6" data-width="$W" data-height="$H">
      <div id="bg" class="clip" data-start="0" data-duration="6" data-track-index="0"></div>
      <img id="logo" class="clip" data-start="0" data-duration="6" data-track-index="1" src="assets/ecomiq-logo-white.svg" alt="EcomIQ" />
      <div id="stage" class="clip" data-start="0" data-duration="6" data-track-index="2">
        <div id="eyebrow">E-Commerce Intelligence</div>
        <div id="headline"><span class="em">Rethink</span> your strategy.</div>
        <div id="subhead">Replace this copy. Build your scene. Ship the ad.</div>
        <div id="cta">Get started &rarr;</div>
      </div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      tl.from("#logo", { opacity: 0, y: -20, duration: .6, ease: "power3.out" }, .2)
        .from("#eyebrow", { opacity: 0, y: 16, duration: .5, ease: "power2.out" }, .5)
        .from("#headline", { opacity: 0, y: 32, duration: .7, ease: "power3.out" }, .7)
        .from("#subhead", { opacity: 0, y: 20, duration: .6, ease: "power2.out" }, 1.1)
        .from("#cta", { opacity: 0, scale: .85, duration: .55, ease: "back.out(1.7)" }, 1.5);
      tl.to({}, { duration: 6 }, 0); // pad to data-duration
      window.__timelines["$SLUG"] = tl;
    </script>
  </body>
</html>
HTML
ok "index.html (starter composition, local fonts)"

# DESIGN.md (project brand spec, seeded from the canonical brand)
{
  echo "# $SLUG — Design Spec"
  echo
  echo "Format: $LABEL · ${W}x${H} @ 30fps · Safe area ~10% margins."
  echo
  echo "Brand kit copied from \`assets/ecomiq/\`. Full reference: \`assets/ecomiq/BRAND.md\`."
  echo "Tokens live in \`assets/brand-tokens.css\`; fonts in \`assets/fonts/fonts.css\` (local)."
  echo
  echo "## This project's idea"
  echo "- Hook: TODO"
  echo "- Message: TODO"
  echo "- CTA: TODO"
} > "$DEST/DESIGN.md"
ok "DESIGN.md"

# ---- done -------------------------------------------------------------------
printf '\n%s✅ Project ready:%s %s\n\n' "$c_grn" "$c_off" "$DEST"
cat <<NEXT
${c_dim}Next:${c_off}
  cd $DEST
  npx hyperframes lint
  npx hyperframes render --quality draft --output renders/draft.mp4
  ${c_dim}# then grab a frame to verify, then --quality standard${c_off}

  ${c_dim}Or just:${c_off} invoke /ecomiq-ad and describe the ad you want.
NEXT
