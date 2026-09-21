#!/usr/bin/env python3
"""
build-broll.py — turn the 29.7s "Showcase Reel" montage into a ~70s visual bed
that sits under Sean's 67.3s voiceover.

Why this exists
---------------
The montage is 29.70s of very fast cuts (36 shots, ~0.77s each) and ends with its
OWN EcomIQ end card at 27.73s. The VO is 67.33s. So we:

  1. Drop the montage's built-in end card  -> usable b-roll is 0.00 - 27.73s.
  2. Retime every shot to 0.45x with motion-compensated interpolation, so each
     shot lands at ~1.7s on screen (the MOTION_PHILOSOPHY target) and the whole
     reel stretches to ~61.6s with zero looping.
  3. Add 7 deliberate callback shots (visual rhymes) placed on the beats where
     that image earns a second look.

The bed deliberately overshoots the 64.64s end-card trigger - the composition
trims it. Per-segment frame rounding loses a few frames per shot, so never
assume the nominal EDL sum; the script prints the MEASURED duration and that is
what the composition is built against.

Interpolation runs PER SHOT, never across a cut - interpolating over a cut
produces warping artifacts.

Both outputs get a keyframe every 30 frames. The HyperFrames renderer seeks this
file frame by frame, and default x264 keyframe spacing (~2.4s here) makes those
seeks fail and freeze frames mid-shot - the compiler warns about it explicitly.

Outputs (into assets/):
  broll-916.mp4  1080x1920  the 9:16 visual bed, muted
  broll-45.mp4   1080x1350  the same edit, centre-cropped 285px top and bottom
"""
import json
import os
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

# Shot boundaries from ffmpeg scene detection (threshold 0.30) on the source.
# Last value 27.73 is where the montage's own end card begins - hard stop.
BOUNDS = [0.00, 0.57, 1.10, 1.67, 2.30, 2.90, 3.40, 4.10, 4.97, 5.60, 6.37,
          7.03, 7.60, 8.37, 9.07, 9.97, 10.87, 11.73, 12.37, 13.17, 13.87,
          14.83, 15.60, 16.43, 17.07, 18.03, 19.03, 19.97, 20.90, 22.03,
          22.83, 23.63, 24.60, 25.50, 26.33, 26.87, 27.73]

SPEED = 0.45  # every shot plays for ~2.2x its source length

# Callbacks: (insert_after_shot_index, source_in, source_out, why)
# These are the visual rhymes - an image the viewer already saw, returning on a
# line where it now means something more.
CALLBACKS = [
    (12, 7.03,  7.60, "Shopify Premier Partner card returns on 'with our team'"),
    (18, 5.60,  6.37, "late-night laptop returns on 'costing you money'"),
    (22, 17.07, 18.03, "keynote stats screen returns on 'all of your numbers'"),
    (26, 14.83, 15.60, "product-in-store returns on 'your store and your problems'"),
    (29, 26.87, 27.73, "portrait smile returns on 'a clear answer'"),
    (33, 0.57,  1.10, "Sean Clarke badge returns on 'the opposite of that'"),
    (35, 7.03,  7.60, "Shopify Premier Partner card lands last, straight into the end card"),
]

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "montage-source.mp4"
OUT_916 = ROOT / "assets" / "broll-916.mp4"
OUT_45 = ROOT / "assets" / "broll-45.mp4"
WORK = Path(os.environ.get("BROLL_WORK", "/tmp/broll-work"))
WORKERS = int(os.environ.get("BROLL_WORKERS", os.cpu_count() or 4))

VF_RETIME = (
    "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,"
    f"setpts={1/SPEED}*PTS"
)


def build_edl():
    """Ordered list of (src_in, src_out, note) including callbacks."""
    shots = [(BOUNDS[i], BOUNDS[i + 1], f"shot {i:02d}") for i in range(len(BOUNDS) - 1)]
    cb = {idx: (a, b, why) for idx, a, b, why in CALLBACKS}
    edl = []
    for i, s in enumerate(shots):
        edl.append(s)
        if i in cb:
            a, b, why = cb[i]
            edl.append((a, b, f"callback -> {why}"))
    return edl


def run(cmd):
    subprocess.run(cmd, check=True)


def main():
    if not SRC.exists():
        sys.exit(f"missing source: {SRC}")
    WORK.mkdir(parents=True, exist_ok=True)
    edl = build_edl()

    schedule, t = [], 0.0
    for i, (a, b, note) in enumerate(edl):
        dur = (b - a) / SPEED
        schedule.append({"i": i, "src_in": round(a, 2), "src_out": round(b, 2),
                         "screen_in": round(t, 2), "screen_out": round(t + dur, 2),
                         "duration": round(dur, 2), "note": note})
        t += dur

    (ROOT / "scripts" / "broll-edl.json").write_text(json.dumps(schedule, indent=1))
    print(f"{len(edl)} slots -> {t:.2f}s of visual bed")

    segs = [WORK / f"seg{s['i']:03d}.mp4" for s in schedule]

    def render_seg(s):
        """Retime one shot. Interpolation is per-shot on purpose: running it
        across a cut warps the two shots into each other."""
        seg = WORK / f"seg{s['i']:03d}.mp4"
        if seg.exists():
            return
        run(["ffmpeg", "-y", "-v", "error", "-ss", str(s["src_in"]),
             "-t", str(round(s["src_out"] - s["src_in"], 3)),
             "-i", str(SRC), "-an", "-vf", VF_RETIME, "-r", "30",
             "-c:v", "libx264", "-crf", "16", "-preset", "fast",
             "-pix_fmt", "yuv420p", str(seg)])
        print(f"  [{s['i']+1}/{len(schedule)}] {s['src_in']:.2f}-{s['src_out']:.2f} "
              f"-> screen {s['screen_in']:.2f}s ({s['duration']:.2f}s)  {s['note']}",
              flush=True)

    # minterpolate is the whole cost here and it is effectively single-threaded,
    # so fan the shots out across cores instead of encoding them one at a time.
    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        list(pool.map(render_seg, schedule))

    missing = [p for p in segs if not p.exists()]
    if missing:
        sys.exit(f"segments failed to render: {[p.name for p in missing]}")

    listfile = WORK / "concat.txt"
    listfile.write_text("".join(f"file '{p}'\n" for p in segs))

    print("concatenating 9:16 ...")
    run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(listfile),
         "-an", "-c:v", "libx264", "-crf", "16", "-preset", "fast",
         "-r", "30", "-g", "30", "-keyint_min", "30", "-sc_threshold", "0",
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUT_916)])

    # 4:5 is a centre crop (285px off top and bottom), not a pad - padding a 9:16
    # source into 4:5 would leave 160px black bars down both sides.
    print("cropping 4:5 ...")
    run(["ffmpeg", "-y", "-v", "error", "-i", str(OUT_916),
         "-an", "-vf", "crop=1080:1350:0:285",
         "-c:v", "libx264", "-crf", "16", "-preset", "fast",
         "-r", "30", "-g", "30", "-keyint_min", "30", "-sc_threshold", "0",
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUT_45)])
    measured = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                               "format=duration", "-of", "csv=p=0", str(OUT_916)],
                              capture_output=True, text=True).stdout.strip()
    print(f"done -> {OUT_916.name}, {OUT_45.name}")
    print(f"MEASURED 9:16 duration: {measured}s (nominal EDL {t:.2f}s)")


if __name__ == "__main__":
    main()
