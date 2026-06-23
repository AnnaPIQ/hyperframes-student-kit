#!/bin/bash
set -e
declare -A F=(
  ["tdc-home"]="1oclc24yF-S_DFLwtX296UA6WScFzT4gY"
  ["tdc-products"]="1-smDIw44ZuPR1kQa7PEkCStN-EGCE2Na"
  ["decoy-home"]="1muDwzODgGhKyqngwmM8sKi3KLkNtkOTr"
  ["duckhorn-home"]="12Tsy3R0BS-pl9PTDFtXK1_H6f5JPkMLp"
  ["calera-home"]="1B74pgb2WNZOoCYPDaoyd9MIoFlI3NrKD"
  ["goldeneye-home"]="1mszMXm_MUgdnmsLDfKzwYPr3CXHGUJYt"
  ["greenwing-home"]="1pdW_MTvEZkE-phhvF7L7sSaGBpJod35t"
  ["greenwing-product"]="1jS5R4ByQiT7PPaB-oHWlua1Ik4_7vSzd"
)
for name in "${!F[@]}"; do
  echo "=== downloading $name ==="
  yt-dlp -q -o "${name}.mp4" "https://drive.google.com/uc?id=${F[$name]}&export=download"
done
echo "=== ALL DOWNLOADS DONE ==="
ls -la *.mp4
echo "=== PROBE (resolution/duration/fps) ==="
for f in *.mp4; do
  echo -n "$f: "
  ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,duration -of csv=p=0 "$f"
done
