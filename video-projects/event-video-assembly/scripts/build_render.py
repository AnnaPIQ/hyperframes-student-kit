#!/usr/bin/env python3
"""
Build & run the ffmpeg render from edl.json.
- Trims each clip to its in/out (input-level fast+accurate seek).
- Normalizes every clip to 1920x1080 / 30fps:
    * fit=scale    -> landscape source, scale+pad into 16:9
    * fit=pad_blur -> portrait source, blurred pillarbox (full-height center + blurred side bars)
- Chains all shots with xfade transitions (offset-timed, cumulative).
    cut->fade(1frame) | dissolve/matchcut->fade | dipblack->fadeblack | dipwhite->fadewhite
- Adds a silent stereo AAC "audio bed" sized to the video (empty/duckable for music later).
- H.264, yuv420p, +faststart.

Usage:
  python3 scripts/build_render.py --print                 # dry-run: print plan + ffmpeg cmd, no render
  python3 scripts/build_render.py --render [--draft]      # actually render
"""
import argparse, json, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EDL  = os.path.join(ROOT, "edl.json")

TMAP = {"cut": "fade", "dissolve": "fade", "matchcut": "fade",
        "dipblack": "fadeblack", "dipwhite": "fadewhite"}

def norm_chain(idx, fit, W, H, FPS):
    """Return filter string producing [v{idx}] from input idx, plus the label."""
    v = f"[{idx}:v]"
    out = f"[v{idx}]"
    if fit == "pad_blur":
        return (
            f"{v}fps={FPS},split=2[bg{idx}][fg{idx}];"
            f"[bg{idx}]scale={W}:{H}:force_original_aspect_ratio=increase,"
            f"crop={W}:{H},boxblur=20:2,setsar=1[bgb{idx}];"
            f"[fg{idx}]scale=-2:{H},setsar=1[fgf{idx}];"
            f"[bgb{idx}][fgf{idx}]overlay=(W-w)/2:0,format=yuv420p{out}"
        ), out
    else:  # scale (landscape)
        return (
            f"{v}fps={FPS},scale={W}:{H}:force_original_aspect_ratio=decrease,"
            f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p{out}"
        ), out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--print", action="store_true", dest="dry")
    ap.add_argument("--render", action="store_true")
    ap.add_argument("--draft", action="store_true")
    ap.add_argument("--output", default=None)
    args = ap.parse_args()

    edl = json.load(open(EDL))
    W = edl["target"]["width"]; H = edl["target"]["height"]; FPS = edl["target"]["fps"]
    segs = edl["segments"]
    fin = edl.get("fade_in", 0.5); fout = edl.get("fade_out", 0.6)

    # per-segment durations
    for s in segs:
        s["dur"] = round(float(s["out"]) - float(s["in"]), 3)
        if s["dur"] <= 0:
            sys.exit(f"segment {s['n']} ({s['id']}) has non-positive duration")

    # ffmpeg inputs (pre-trimmed via -ss/-t)
    inputs = []
    for s in segs:
        path = os.path.join(ROOT, s["src"])
        if not os.path.exists(path):
            sys.exit(f"missing source: {path}")
        inputs += ["-ss", f"{s['in']}", "-t", f"{s['dur']}", "-i", path]

    # normalization chains
    fc = []
    labels = []
    for i, s in enumerate(segs):
        chain, lbl = norm_chain(i, s["fit"], W, H, FPS)
        fc.append(chain); labels.append(lbl)

    # xfade chain
    prev = labels[0]
    cum = segs[0]["dur"]
    xi = 0
    for i in range(1, len(segs)):
        ttype = segs[i-1]["transition_out"]["type"]
        tdur  = float(segs[i-1]["transition_out"]["dur"])
        xf = TMAP.get(ttype, "fade")
        off = round(cum - tdur, 3)
        outl = f"[vx{xi}]"
        fc.append(f"{prev}{labels[i]}xfade=transition={xf}:duration={tdur}:offset={off}{outl}")
        prev = outl
        cum = round(cum + segs[i]["dur"] - tdur, 3)
        xi += 1

    total = cum
    # final fade in/out from/to black on the composite
    fc.append(f"{prev}fade=t=in:st=0:d={fin},fade=t=out:st={round(total-fout,3)}:d={fout}[vout]")

    # silent audio bed input
    aidx = len(segs)
    inputs += ["-f", "lavfi", "-t", f"{total}", "-i",
               f"anullsrc=r={edl['audio_bed']['sample_rate']}:cl=stereo"]

    filter_complex = ";".join(fc)

    if args.draft:
        venc = ["-c:v", "libx264", "-preset", "veryfast", "-crf", "30"]
    else:
        venc = ["-c:v", "libx264", "-preset", "medium", "-crf", "18"]

    out = args.output or os.path.join(ROOT, "renders",
            "event-recap-draft.mp4" if args.draft else "event-recap.mp4")

    cmd = ["ffmpeg", "-y", *inputs,
           "-filter_complex", filter_complex,
           "-map", "[vout]", "-map", f"{aidx}:a",
           *venc, "-pix_fmt", "yuv420p", "-r", str(FPS),
           "-c:a", "aac", "-b:a", "192k", "-ar", str(edl['audio_bed']['sample_rate']),
           "-movflags", "+faststart", "-shortest", out]

    # plan table
    print(f"# {edl['title']}")
    print(f"# target {W}x{H} @ {FPS}fps  | segments: {len(segs)}  | est. duration: {total:.2f}s ({int(total//60)}:{total%60:04.1f})")
    print(f"# audio bed: silent stereo AAC (empty/duckable)")
    print("#  n  id    dur   fit        trans_out          label")
    for s in segs:
        to = s["transition_out"]
        print(f"#  {s['n']:>2} {s['id']:<5} {s['dur']:>4}s {s['fit']:<9} {to['type']:>8}@{to['dur']:<4}  {s['label']}")
    print(f"# output: {out}")

    if args.dry or not args.render:
        print("\n# DRY RUN — ffmpeg command:\n")
        print(" ".join(f"'{c}'" if (' ' in c or ';' in c) else c for c in cmd))
        return

    print("\n# RENDERING...\n", flush=True)
    r = subprocess.run(cmd)
    sys.exit(r.returncode)

if __name__ == "__main__":
    main()
