#!/usr/bin/env bash
# Bake Sean's framing (crop + punch-ins) into the A-roll with Lanczos so the composition
# shows it 1:1. Browser-side scaling of <video> cost ~half the fine detail (see LESSONS.md).
#   usage: prep-aroll-framed.sh <4K source .mov> <out.mp4> <916|45>
# Framing values mirror the composition's original GSAP framing (x, y, scale in native 4K
# pixels of the crop that starts at x=1380). Times are SOURCE seconds (comp time + 0.48).
set -euo pipefail
SRC="$1"; OUT="$2"; FMT="$3"
if [ "$FMT" = 916 ]; then H=1920
  S='if(lt(t,3.92),0.8893+(max(t,0.48)-0.48)/3.44*0.0534,if(lt(t,16.2),0.9427,if(lt(t,24.9),0.9249,1.0)))'
  X='if(lt(t,3.92),-236-(max(t,0.48)-0.48)/3.44*37,if(lt(t,16.2),-273,if(lt(t,24.9),-261,-160)))'
  Y='if(lt(t,3.92),-(max(t,0.48)-0.48)/3.44*30,if(lt(t,16.2),-30,if(lt(t,24.9),-20,-170)))'
else H=1350
  S='if(lt(t,3.92),0.8449+(max(t,0.48)-0.48)/3.44*0.0444,if(lt(t,16.2),0.8893,if(lt(t,24.9),0.8715,0.9338)))'
  X='if(lt(t,3.92),-205-(max(t,0.48)-0.48)/3.44*31,if(lt(t,16.2),-236,if(lt(t,24.9),-223,-116)))'
  Y='if(lt(t,3.92),-215-(max(t,0.48)-0.48)/3.44*19,if(lt(t,16.2),-234,if(lt(t,24.9),-225,-263)))'
fi
ffmpeg -v error -y -i "$SRC" -an -filter_complex \
 "[0:v]scale=w='2*trunc(3840*($S)/2)':h='2*trunc(2160*($S)/2)':eval=frame:flags=lanczos+accurate_rnd+full_chroma_int,crop=w=1080:h=$H:x='1380*($S)-($X)':y='-($Y)',format=yuv420p[v]" \
 -map "[v]" -r 25 -c:v libx264 -preset slow -crf 14 -tune film -color_primaries bt709 -color_trc bt709 -colorspace bt709 -movflags +faststart "$OUT"
