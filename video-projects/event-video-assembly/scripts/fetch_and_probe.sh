#!/usr/bin/env bash
# Download all selected A-roll + B-roll clips from Google Drive (public link)
# and probe each with ffprobe. Writes a probe report to probe_report.tsv.
set -uo pipefail
cd "$(dirname "$0")/.."

dl() {  # dl <fileId> <destpath>
  local id="$1" dest="$2"
  if [[ -s "$dest" ]]; then echo "SKIP  $dest (exists)"; return 0; fi
  yt-dlp -q --no-warnings -o "$dest" "https://drive.google.com/uc?id=${id}&export=download" 2>/dev/null
  if [[ -s "$dest" ]]; then echo "OK    $dest"; else echo "FAIL  $dest ($id)"; fi
}

# ---- A-ROLL (event clips) ----
dl 19HV9umQD35LbEFhP33wimDocY7d7o09Q assets/araw/IMG_8304.MOV
dl 1mIqedZgpSdbUO-nlqzvkKrwN3ymnwRgo assets/araw/IMG_8308.MOV
dl 1wmlClSsPkDetNcl9MfL5xksVxHhQH-2g assets/araw/IMG_8309.MOV
dl 1DoPvD4Hblg2xq40HVvO45NOLEZshhpLy assets/araw/IMG_8303.MOV
dl 1wMh5vmVLccWDyh67a7Zh6-kXtOEap-iU assets/araw/IMG_8285.MOV
dl 1p5Dmz-vjdBCS2Lp6zK44Q9CVtxgLVwEK assets/araw/IMG_8286.MOV
dl 11MJoqPP3upERf2didJKmHkSZV8UFFeFc assets/araw/IMG_8290.MOV
dl 17OzTFpKK99hNCuIA4587VaE96MMpm1Bj assets/araw/IMG_0894.MOV
dl 1CcRclTXmCMKJ2Q2VPrhwur9W4p0WDp0a assets/araw/IMG_0878.MOV
dl 1xzznEiu-1UBOsrxJ3Q4Uyf4jNv6lsarw assets/araw/IMG_0879.MOV
dl 1trSt1GvQMvwP_km1jDpss095j1SrUETz assets/araw/IMG_8284.MOV
dl 1gqoxMxcnGaOJxRb_UlpmxwX8q1QJD8Jo assets/araw/IMG_0853.MOV

# ---- B-ROLL (post-exclusion: no Sweet Es / Shoptalk / Dryft) ----
dl 1OEhRQ9CeyZxdI_21Eqm9x-SqGXKuoCL2 assets/braw/b01_sean_laptop.mov
dl 1kjxpA__zg4O2RCkylC5cPLvoosXrkq0A assets/braw/b02_bess_sean_podcast.mov
dl 1cQ3NitKGYa1c4e--fehHg9eXAZ4_sjI4 assets/braw/b03_klaviyo_event_space.mov
dl 1GycuM9sO1RClaXwnU7sdYi6HOqr6p15I assets/braw/b04_sean_mason_2women.mov
dl 1dNYc4_WmlkTcBxo9J51bXnFXYsDtm1TF assets/braw/b05_limitless_sign.mov
dl 1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu assets/braw/b06_sean_laptop_talking_man.mov
dl 1oVTj4XGGc0JKgHr9jI2Chue_hLYais9O assets/braw/b07_sean_laughing_mason.mov
dl 1x1uT_kVmPod-vpPn5SVIGY4kUZmfCwBo assets/braw/b08_over_laptop_thinking.mov
dl 1vmYi5ZP_zYfXkxcm57lQdwwCGJRDI0s7 assets/braw/b09_car_into_hotel_la.mov
dl 1ORRLYbkYhSU3NIaLTEcZ36tGhUFybGti assets/braw/b10_sean_mason_walking_industrial.mov
dl 1vk6MsGPlFBwNjRb_CvsJ17lq6EokzIXi assets/braw/b11_following_sean_walking.mov
dl 1mMQyiHcU5cb6KKnzUajxnTxOqKJlLgDj assets/braw/b12_sean_getting_into_car.mov
dl 1K-FUSQ43EWm80t6f4WT-2s_h1NPdlJL7 assets/braw/b13_shopify_intro.mov
dl 1bCUe9ETpsi_4LYDwqDXRHRHdaV0-dNi- assets/braw/b14_outside_sean_texting.mov
dl 1VSu3Mqc8P78Kqnzkvge8vzIY9fGtIoCC assets/braw/b15_jaren_in_piq_car.mov
dl 1WsMOk5hNhK5b-iNaELhBT6FZ0UWPXV6O assets/braw/b16_jaren_getting_into_piq_car.mov
dl 1JNuCmTeW9-UxRyaW5SyWiffEqDqlM636 assets/braw/b17_hotel_sean_typing.mov
dl 1Az_P577iqasuJeGVJuptFgfipG5jIKQC assets/braw/b18_pacific_iq_reel.mov
dl 1E-8ZHZQNI5jGseDnYnJ9Z4TazXH_MwSU assets/braw/b19_sean_jaren_outside.mov
dl 1reXIHROlDwRj2wAV-FQeVcoCzyakM2df assets/braw/b20_zoom_sean_mason_handshake.mov

# ---- PROBE ----
echo "=== probing ==="
printf "file\twidth\theight\tfps\tdur_s\tvcodec\thas_audio\torient\n" > probe_report.tsv
for f in assets/araw/*.MOV assets/braw/*.mov; do
  [[ -s "$f" ]] || continue
  w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$f" 2>/dev/null)
  h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$f" 2>/dev/null)
  rfr=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$f" 2>/dev/null)
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f" 2>/dev/null)
  vcodec=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of csv=p=0 "$f" 2>/dev/null)
  na=$(ffprobe -v error -select_streams a -show_entries stream=codec_type -of csv=p=0 "$f" 2>/dev/null | head -1)
  fps=$(awk -F/ 'NF==2 && $2>0 {printf "%.2f",$1/$2; next} {print $0}' <<<"$rfr")
  has_audio="no"; [[ -n "$na" ]] && has_audio="yes"
  orient="landscape"; if [[ -n "$w" && -n "$h" ]] && (( h > w )); then orient="PORTRAIT"; fi
  printf "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n" "$(basename "$f")" "$w" "$h" "$fps" "$dur" "$vcodec" "$has_audio" "$orient" >> probe_report.tsv
done
echo "=== done ==="
cat probe_report.tsv
