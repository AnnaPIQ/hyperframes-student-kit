#!/usr/bin/env bash
# =============================================================================
# prep-video.sh — re-encode raw footage into render-ready H.264 MP4.
#
#   bash scripts/prep-video.sh <input> [output] [--project <slug>] [--mute]
#   npm run prep -- <input> [output] [--project <slug>] [--mute]
#
# Raw camera/phone/screen-capture files (mov, hevc, vfr, huge bitrate) often
# stutter or fail mid-render. This normalizes them to the project standard:
# H.264 yuv420p, constant frame rate, faststart, AAC audio (or stripped).
#
# Examples:
#   bash scripts/prep-video.sh assets/incoming/raw.mov
#       -> assets/incoming/raw.prepped.mp4
#   bash scripts/prep-video.sh assets/incoming/broll.MOV --project summer-sale --mute
#       -> video-projects/summer-sale/assets/broll.mp4  (no audio — good for b-roll)
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

c_blue=$'\033[1;36m'; c_grn=$'\033[1;32m'; c_red=$'\033[1;31m'; c_dim=$'\033[2m'; c_off=$'\033[0m'
err() { printf '%s✗ %s%s\n' "$c_red" "$1" "$c_off" >&2; }

usage() {
  cat <<USAGE
${c_blue}prep-video.sh${c_off} — re-encode footage to render-ready H.264 MP4

${c_dim}Usage:${c_off}
  bash scripts/prep-video.sh <input> [output] [--project <slug>] [--mute]

${c_dim}Options:${c_off}
  output            explicit output path (default: <input>.prepped.mp4)
  --project <slug>  write into video-projects/<slug>/assets/<input-basename>.mp4
  --mute            strip audio (recommended for b-roll — Hyperframes <video> must be muted)
  --crf <n>         quality, lower = better (default 20; try 18 for hero shots)
USAGE
}

[ $# -lt 1 ] && { usage; exit 1; }
case "$1" in -h|--help|help) usage; exit 0;; esac

command -v ffmpeg >/dev/null 2>&1 || { err "ffmpeg not found — run: npm run setup"; exit 1; }

IN=""; OUT=""; PROJECT=""; MUTE=0; CRF=20
while [ $# -gt 0 ]; do
  case "$1" in
    --project) PROJECT="$2"; shift 2;;
    --mute)    MUTE=1; shift;;
    --crf)     CRF="$2"; shift 2;;
    -*)        err "unknown option $1"; usage; exit 1;;
    *) if [ -z "$IN" ]; then IN="$1"; elif [ -z "$OUT" ]; then OUT="$1"; fi; shift;;
  esac
done

[ -f "$IN" ] || { err "input not found: $IN"; exit 1; }
base="$(basename "${IN%.*}")"

if [ -n "$PROJECT" ]; then
  pdir="video-projects/$PROJECT/assets"
  [ -d "$pdir" ] || { err "no project at video-projects/$PROJECT — create it with: npm run new -- $PROJECT"; exit 1; }
  OUT="${OUT:-$pdir/$base.mp4}"
else
  OUT="${OUT:-${IN%.*}.prepped.mp4}"
fi

mkdir -p "$(dirname "$OUT")"

printf '%s▶ Prepping%s %s  %s→%s  %s\n' "$c_blue" "$c_off" "$IN" "$c_dim" "$c_off" "$OUT"
printf '   %sH.264 · yuv420p · CRF %s · 30fps cfr · faststart%s\n' "$c_dim" "$CRF" "$c_off"

audio_args=( -c:a aac -b:a 192k )
[ "$MUTE" -eq 1 ] && audio_args=( -an )

ffmpeg -y -hide_banner -loglevel error -stats -i "$IN" \
  -map 0:v:0 $([ "$MUTE" -eq 0 ] && echo "-map 0:a:0?") \
  -c:v libx264 -preset medium -crf "$CRF" -pix_fmt yuv420p \
  -vsync cfr -r 30 -movflags +faststart \
  "${audio_args[@]}" \
  "$OUT"

dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$OUT" 2>/dev/null || echo "?")
dim=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$OUT" 2>/dev/null || echo "?")
printf '%s✓ done%s  %s · %ss · %s\n' "$c_grn" "$c_off" "$OUT" "$dur" "$dim"
printf '   %sReference in a composition as:%s <video src="assets/%s.mp4" muted ...>\n' "$c_dim" "$c_off" "$base"
