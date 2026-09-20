#!/usr/bin/env python3
"""
build-cutdown.py — assemble the EcomIQ CRO short montage cutdown.

v2 (Nate: "slow down montage slightly, we don't need to use it all, I prefer last
clips"). 13 shots instead of 18, every one drawn from the back half of the reel
(13.87s onward), each gently retimed to ~0.81x so the cutting breathes: average
shot is now 1.19s, up from 0.86s.

Everything is expressed in FRAMES at 30fps so every cut lands on a frame boundary.

    python3 scripts/build-cutdown.py --ratio 9x16
    python3 scripts/build-cutdown.py --all

Input : assets/montage-source-<ratio>.mp4   (muted, live footage only)
Output: assets/montage-cutdown-<ratio>.mp4  (muted, 463 frames / 15.4333s)
"""
import argparse, json, subprocess, sys
from pathlib import Path

FPS = 30
XFADE = 6  # OUTPUT frames of cross-dissolve at each act boundary

PROJECT = Path(__file__).resolve().parent.parent

# (src_in_frame, src_len_frames, out_len_frames, label)
# out_len > src_len is a slow-down. Source frames index the montage-source-*.mp4.
ACTS = [
    ("act1-hook", [
        (738, 27, 33, "S1  Shopify booth"),
        (709, 29, 37, "S2  Boutique, Sean + client with product"),
    ]),
    ("act2-problem", [
        (765, 25, 33, "S3  TikTok booth, Capture Leads"),
        (468, 25, 31, "S4  Store site screen recording"),
    ]),
    ("act3-diagnosis", [
        (685, 24, 30, "S5  Hands on keyboard"),
        (661, 24, 30, "S6  Sean with mic, expo"),
        (536, 35, 43, "S7  Stage, 1.3+ Billion / 99.9% uptime"),
        (493, 19, 24, "S8  Strategist call, to camera"),
        (599, 28, 35, "S9  Coffee meeting"),
    ]),
    ("act4-offer", [
        (627, 34, 35, "S10 Tesla"),
        (571, 28, 39, "S11 Boutique, lands on 'EcomIQ strategist'"),
        (416, 52, 62, "S12 Retail aisle, product lifted on 'move'"),
        (806, 26, 31, "S13 Sean portrait, into the end card"),
    ]),
]

RATIOS = {
    "9x16": "montage-source-9x16.mp4",
    "4x5":  "montage-source-4x5.mp4",
    "1x1":  "montage-source-1x1.mp4",
}


def run(cmd):
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        sys.stderr.write(p.stderr[-4000:])
        raise SystemExit(f"ffmpeg failed: {' '.join(cmd[:6])} ...")
    return p


def head_frames(src_len, out_len):
    """Source frames to prepend so the dissolve head is XFADE frames of OUTPUT."""
    return max(1, round(XFADE * src_len / out_len))


def act_filter(shots, head):
    parts, labels = [], []
    for i, (src_in, src_len, out_len, _lbl) in enumerate(shots):
        if i == 0 and head:
            h = head_frames(src_len, out_len)
            src_in, src_len, out_len = src_in - h, src_len + h, out_len + XFADE
        factor = out_len / src_len
        chain = (f"[0:v]trim=start={src_in/FPS:.6f}:end={(src_in + src_len)/FPS:.6f},"
                 f"setpts=({factor:.6f})*(PTS-STARTPTS)[v{i}]")
        parts.append(chain)
        labels.append(f"[v{i}]")
    parts.append(f"{''.join(labels)}concat=n={len(shots)}:v=1:a=0[out]")
    return ";".join(parts)


def act_length(shots, head):
    total = XFADE if head else 0
    return total + sum(s[2] for s in shots)


def build(ratio, work, keep=False):
    src = PROJECT / "assets" / RATIOS[ratio]
    if not src.exists():
        raise SystemExit(f"missing source: {src}")
    out = PROJECT / "assets" / f"montage-cutdown-{ratio}.mp4"
    print(f"\n=== {ratio} ===\nsource: {src.name}")

    act_files, lengths = [], []
    for idx, (name, shots) in enumerate(ACTS):
        head = idx > 0
        dst = work / f"{ratio}-{name}.mp4"
        run(["ffmpeg", "-y", "-v", "error", "-i", str(src),
             "-filter_complex", act_filter(shots, head), "-map", "[out]",
             "-c:v", "libx264", "-preset", "medium", "-crf", "16",
             "-pix_fmt", "yuv420p", "-r", str(FPS), "-an", str(dst)])
        n = act_length(shots, head)
        act_files.append(dst); lengths.append(n)
        print(f"  {name:16s} {n:4d}f  {n/FPS:6.3f}s")
        for s_in, s_len, o_len, lbl in shots:
            print(f"      {lbl:48s} {s_len:3d}f -> {o_len:3d}f  ({o_len/s_len:.2f}x slower)")

    cur, cur_len = act_files[0], lengths[0]
    for i in range(1, len(act_files)):
        offset = (cur_len - XFADE) / FPS
        dst = work / f"{ratio}-chain{i}.mp4"
        run(["ffmpeg", "-y", "-v", "error", "-i", str(cur), "-i", str(act_files[i]),
             "-filter_complex",
             f"[0:v][1:v]xfade=transition=fade:duration={XFADE/FPS:.6f}:offset={offset:.6f}[out]",
             "-map", "[out]", "-c:v", "libx264", "-preset", "medium", "-crf", "16",
             "-pix_fmt", "yuv420p", "-r", str(FPS), "-an", str(dst)])
        cur_len += lengths[i] - XFADE
        cur = dst
        print(f"  dissolve -> act{i+1} at {offset:.4f}s, total {cur_len}f ({cur_len/FPS:.4f}s)")

    run(["ffmpeg", "-y", "-v", "error", "-i", str(cur), "-an",
         "-c:v", "libx264", "-preset", "slow", "-crf", "17",
         "-pix_fmt", "yuv420p", "-r", str(FPS), "-movflags", "+faststart", str(out)])

    pr = json.loads(subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-count_frames",
         "-show_entries", "stream=nb_read_frames,width,height",
         "-show_entries", "format=duration", "-of", "json", str(out)],
        capture_output=True, text=True).stdout)
    st, fmt = pr["streams"][0], pr["format"]
    print(f"  -> {out.name}: {st['width']}x{st['height']} "
          f"{st['nb_read_frames']}f {float(fmt['duration']):.4f}s")
    if not keep:
        for f in act_files:
            f.unlink(missing_ok=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ratio", choices=sorted(RATIOS))
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--keep-intermediates", action="store_true")
    a = ap.parse_args()
    targets = sorted(RATIOS) if a.all else ([a.ratio] if a.ratio else [])
    if not targets:
        ap.error("pass --ratio <r> or --all")

    work = PROJECT / "renders" / "cutdown-work"
    work.mkdir(parents=True, exist_ok=True)

    n_shots = sum(len(s) for _, s in ACTS)
    total = sum(act_length(s, i > 0) for i, (_, s) in enumerate(ACTS)) - XFADE * (len(ACTS) - 1)
    src_f = sum(sh[1] for _, s in ACTS for sh in s)
    out_f = sum(sh[2] for _, s in ACTS for sh in s)
    print(f"{n_shots} shots · target {total}f = {total/FPS:.4f}s · "
          f"avg shot {out_f/n_shots/FPS:.2f}s · overall retime {out_f/src_f:.3f}x")

    for r in targets:
        build(r, work, a.keep_intermediates)
    if not a.keep_intermediates:
        for f in work.glob("*.mp4"):
            f.unlink(missing_ok=True)
        work.rmdir()


if __name__ == "__main__":
    main()
