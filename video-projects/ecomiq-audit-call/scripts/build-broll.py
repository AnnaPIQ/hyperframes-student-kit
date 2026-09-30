#!/usr/bin/env python3
"""
build-broll.py — assemble the visual bed from the b-roll cheat sheet.

  python3 scripts/build-broll.py

Why this replaced the previous version
--------------------------------------
v1 built the bed from the single "Showcase Reel" montage. That reel only has
27.73s of usable footage (its last 2s are its own EcomIQ end card), and it had
to cover 64.64s of voiceover, so v1 retimed everything to 0.45x. At 2.2x slow
motion it read as obviously wrong, which is exactly what Nate flagged.

The cheat sheet (Drive: "B-Roll Short Cut") solves it properly: 35 usable clips,
so the bed now runs at NATIVE SPEED. No retiming, no interpolation, no looping,
one shot per 1.85s.

Orientation is the trap here
----------------------------
18 of these clips are phone-shot vertical footage exported into a 3840x2160
container with the rotation BAKED IN and no rotation metadata, so ffmpeg does
not auto-correct them and they decode with faces on their side. They are listed
as transform "rotate_cw" and get `transpose=1`; after that they are true
2160x3840, and need no cropping at all. (docs/LESSONS.md warns about this.)

Only 2 clips are genuinely landscape and get a centre crop. Three more were
dropped outright - see "dropped" in scripts/broll-manifest.json for why.

Outputs (into assets/, both gitignored):
  broll-916.mp4  1080x1920  the 9:16 bed, muted
  broll-45.mp4   1080x1350  the same edit, centre-cropped 285px top and bottom
"""
import json
import os
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "scripts" / "broll-manifest.json"
OUT_916 = ROOT / "assets" / "broll-916.mp4"
OUT_45 = ROOT / "assets" / "broll-45.mp4"
WORK = Path(os.environ.get("BROLL_WORK", "/tmp/broll-work2"))
SRC_CACHE = Path(os.environ.get("BROLL_SRC", "/tmp/broll-src"))
WORKERS = int(os.environ.get("BROLL_WORKERS", os.cpu_count() or 4))

# Vertical sources just get scaled to fill; the rotated ones are vertical too
# once transposed. Only the genuine landscape pair is cropped.
FIT = "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920"
TRANSFORMS = {
    "none": FIT,
    "rotate_cw": "transpose=1," + FIT,
    "crop": "crop=ih*9/16:ih,scale=1080:1920",
}


def run(cmd):
    subprocess.run(cmd, check=True)


def fetch(clip):
    """Drive serves an HTML interstitial for large files; follow the confirm token."""
    # Cache by Drive id, not alias: two shots ("shoptalk-stage-a" and "-b") are
    # different in-points on the SAME source file.
    dst = SRC_CACHE / f"{clip['drive_id']}.src"
    if dst.exists() and dst.stat().st_size > 100_000:
        return dst
    SRC_CACHE.mkdir(parents=True, exist_ok=True)
    fid = clip["drive_id"]
    run(["curl", "-sSL", "--max-time", "900", "-o", str(dst),
         f"https://drive.google.com/uc?export=download&id={fid}"])
    with open(dst, "rb") as fh:
        head = fh.read(200)
    if b"<html" in head.lower():
        import re
        m = re.search(rb"confirm=([0-9A-Za-z_-]+)", dst.read_bytes())
        tok = m.group(1).decode() if m else "t"
        run(["curl", "-sSL", "--max-time", "900", "-o", str(dst),
             f"https://drive.usercontent.google.com/download?id={fid}&export=download&confirm={tok}"])
    return dst


def main():
    man = json.loads(MANIFEST.read_text())
    shot = float(man["shot_seconds"])
    clips = man["clips"]
    WORK.mkdir(parents=True, exist_ok=True)

    def build(clip):
        # Key the cache on the clip's CONTENT, not just its index - keying by
        # index alone silently served a stale segment whenever an in-point,
        # source or transform changed.
        seg = WORK / f"seg{clip['i']:03d}_{clip['drive_id'][:8]}_{clip['in']}_{clip['transform']}.mp4"
        if seg.exists():
            return
        src = fetch(clip)
        run(["ffmpeg", "-y", "-v", "error", "-ss", str(clip["in"]), "-t", str(shot),
             "-i", str(src), "-an", "-vf", TRANSFORMS[clip["transform"]] + ",fps=30",
             "-c:v", "libx264", "-crf", "17", "-preset", "fast",
             "-pix_fmt", "yuv420p", str(seg)])
        print(f"  [{clip['i']+1}/{len(clips)}] {clip['alias']:<22} "
              f"@{clip['in']:>6.2f}s  {clip['transform']}", flush=True)

    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        list(pool.map(build, clips))

    segs = [WORK / f"seg{c['i']:03d}_{c['drive_id'][:8]}_{c['in']}_{c['transform']}.mp4"
            for c in clips]
    missing = [p.name for p in segs if not p.exists()]
    if missing:
        sys.exit(f"segments failed to render: {missing}")

    listfile = WORK / "concat.txt"
    listfile.write_text("".join(f"file '{p}'\n" for p in segs))

    # A keyframe every 30 frames: the renderer seeks this file frame by frame and
    # sparse keyframes make those seeks fail and freeze frames mid-shot.
    KEY = ["-r", "30", "-g", "30", "-keyint_min", "30", "-sc_threshold", "0"]
    print("concatenating 9:16 ...")
    run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(listfile),
         "-an", "-c:v", "libx264", "-crf", "17", "-preset", "fast", *KEY,
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUT_916)])

    # 4:5 is a centre crop, not a pad - padding a 9:16 source into 4:5 would
    # leave 160px black bars down both sides.
    print("cropping 4:5 ...")
    run(["ffmpeg", "-y", "-v", "error", "-i", str(OUT_916), "-an",
         "-vf", "crop=1080:1350:0:285",
         "-c:v", "libx264", "-crf", "17", "-preset", "fast", *KEY,
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUT_45)])

    measured = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                               "-of", "csv=p=0", str(OUT_916)],
                              capture_output=True, text=True).stdout.strip()
    print(f"done -> {OUT_916.name}, {OUT_45.name}")
    print(f"MEASURED 9:16 duration: {measured}s (nominal {len(clips) * shot:.2f}s)")


if __name__ == "__main__":
    main()
