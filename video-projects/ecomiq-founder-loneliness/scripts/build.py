#!/usr/bin/env python3
"""Build the EcomIQ founder-loneliness 9:16 edit from EDIT-PLAN.md.

Usage (from the project folder):
    python3 scripts/build.py --aroll /path/heatmap-3.mov --src /path/broll-dir [--draft]

Pure ffmpeg cut (no motion graphics): per-shot segments -> concat -> static
logo + subtitle overlay layer (rendered with Playwright for brand fonts) ->
end card -> loudness-normalised A-roll audio.
"""
import argparse, json, os, subprocess, sys, shutil

PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H, FPS = 1080, 1920, 25
AROLL_IN = 0.40                      # program 0 = source 0.40
END_CARD = 3.0                       # seconds

# ---- A-roll crop: full-height 9:16 window, x-centred on Sean, top-anchored ----
AR_X, AR_W, AR_H = 1350, 1216, 2160

# Shots (EDIT-PLAN.md section 3, v2 framing: widest crop, slow continuous pushes
# only, max 6%, so consecutive Sean shots join without a zoom jump). A = (src_in, src_out, z0, push) where push is
# (src_t0, src_t1, z1) or None. B = (file, clip_in, clip_out, kind, logo).
SHOTS = [
    ("A", 0.40, 6.82, 1.00, (3.90, 6.76, 1.03)),
    ("A", 6.82, 17.58, 1.03, (11.80, 15.70, 1.06)),
    ("B", "angle.mp4", 4.00, 7.34, "rot", "navy"),
    ("A", 20.92, 27.10, 1.00, (21.00, 26.48, 1.05)),
    ("A", 27.10, 30.05, 1.05, None),
    ("B", "holdlaptop.mp4", 3.00, 5.91, "rot", "white"),
    ("B", "shoptalk_0_60.mp4", 14.45, 17.27, "shoptalk", "white-shadow"),
    ("B", "booths.mov", 4.40, 7.52, "vert", "white"),
    ("A", 38.90, 41.30, 1.00, None),
    ("B", "women.mp4", 4.60, 7.35, "rot", "navy"),
    ("B", "laugh.mp4", 2.00, 4.65, "rot", "navy"),
    ("A", 46.70, 55.05, 1.00, (49.30, 54.48, 1.04)),
    ("A", 55.05, 59.30, 1.04, (55.20, 58.40, 1.00)),
]


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"FAILED: {' '.join(cmd)}\n{r.stderr[-2000:]}")


def zoom_expr(seg_in, z0, push):
    """Per-frame zoom (segment-local t), smoothstep between push keyframes."""
    if not push:
        return f"{z0}"
    t0, t1, z1 = push[0] - seg_in, push[1] - seg_in, push[2]
    s = f"clip((t-{t0:.3f})/{t1 - t0:.3f},0,1)"
    return f"({z0}+({z1}-{z0})*{s}*{s}*(3-2*{s}))"


def a_filter(seg_in, z0, push):
    z = zoom_expr(seg_in, z0, push)
    # base window -> per-frame upscale by z -> top-anchored centre crop
    return (f"crop={AR_W}:{AR_H}:{AR_X}:0,"
            f"scale=w='2*trunc({W}*{z}/2)':h='2*trunc({H}*{z}/2)':eval=frame:flags=lanczos,"
            f"crop={W}:{H}:(iw-{W})/2:0,setsar=1")


def b_filter(kind):
    if kind == "rot":       # shot vertical, stored sideways without rotation flag
        return f"transpose=1,scale={W}:{H}:flags=lanczos,setsar=1"
    if kind == "vert":
        return f"scale={W}:{H}:flags=lanczos,setsar=1"
    if kind == "shoptalk":  # 1080p landscape, follow Sean as he walks right
        # crop-centre keyframes (shot-local s, px) tracked from Sean's face, look-room left
        keys = [(0.0, 760), (0.35, 790), (0.75, 1030), (1.05, 1100), (1.35, 1210),
                (1.65, 1350), (1.95, 1330), (2.25, 1250), (2.55, 1100), (2.85, 1020)]
        x = f"{keys[-1][1] - 304}"
        for (t0, c0), (t1, c1) in reversed(list(zip(keys, keys[1:]))):
            x = f"if(lt(t,{t1}),{c0 - 304}+({c1 - c0})*(t-{t0})/{t1 - t0},{x})"
        return f"crop=608:1080:'{x}':0,scale={W}:{H}:flags=lanczos,setsar=1"
    raise ValueError(kind)


def segments(args, work, crf, preset):
    # Snap every shot boundary to the frame grid in program time so A-roll picture
    # stays locked to the continuous A-roll audio (no accumulated rounding drift).
    edges, src_t = [0], AROLL_IN
    for s in SHOTS:
        src_t = s[2] if s[0] == "A" else src_t + (s[3] - s[2])
        edges.append(round((src_t - AROLL_IN) * FPS))
    paths, logos, t = [], [], 0.0
    for i, s in enumerate(SHOTS):
        out = os.path.join(work, f"seg{i:02d}.mp4")
        frames = edges[i + 1] - edges[i]
        if s[0] == "A":
            _, a, b, z0, push = s
            cin = edges[i] / FPS + AROLL_IN
            src, dur, vf, logo = args.aroll, b - a, a_filter(cin, z0, push), "navy"
        else:
            _, f, a, b, kind, logo = s
            src, cin, dur, vf = os.path.join(args.src, f), a, frames / FPS, b_filter(kind)
        if not os.path.exists(out) or args.force:
            run(["ffmpeg", "-v", "error", "-y", "-ss", f"{cin:.3f}", "-i", src, "-an",
                 "-vf", f"{vf},fps={FPS}", "-frames:v", str(frames),
                 "-c:v", "libx264", "-preset", preset, "-crf", str(crf), "-pix_fmt", "yuv420p", out])
        paths.append(out)
        logos.append((t, t + frames / FPS, logo))
        t += frames / FPS
        print(f"  shot {i + 1:2d}  {s[0]}  {dur:5.2f}s  -> prog {t:6.2f}", flush=True)
    return paths, logos, t


def parse_srt(path):
    cues, block = [], open(path).read().strip().split("\n\n")
    ts = lambda x: sum(float(p) * m for p, m in zip(x.replace(",", ".").split(":"), (3600, 60, 1)))
    for b in block:
        lines = b.strip().split("\n")
        a, z = lines[1].split(" --> ")
        cues.append((ts(a), ts(z), "\n".join(lines[2:])))
    return cues


def overlay_layer(work, logos, cues, total):
    """One transparent PNG per interval (logo variant + current subtitle)."""
    cuts = sorted({0.0, total} | {x for a, b, _ in logos for x in (a, b)} | {x for a, b, _ in cues for x in (a, b)})
    cuts = [c for c in cuts if 0 <= c <= total]
    frames = []
    for a, b in zip(cuts, cuts[1:]):
        if b - a < 1e-3:
            continue
        m = (a + b) / 2
        logo = next(l for s, e, l in logos if s <= m < e)
        sub = next((x for s, e, x in cues if s <= m < e), "")
        frames.append({"dur": b - a, "logo": logo, "sub": sub})
    spec = os.path.join(work, "layer.json")
    json.dump({"frames": frames, "out": work, "proj": PROJ}, open(spec, "w"))
    run(["node", os.path.join(PROJ, "scripts", "render-layer.mjs"), spec])
    lst = os.path.join(work, "layer.txt")
    with open(lst, "w") as f:
        for i, fr in enumerate(frames):
            f.write(f"file 'layer{i:03d}.png'\nduration {fr['dur']:.4f}\n")
        f.write(f"file 'layer{len(frames) - 1:03d}.png'\n")
    return lst


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--aroll", required=True)
    ap.add_argument("--src", required=True)
    ap.add_argument("--draft", action="store_true")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--out")
    args = ap.parse_args()
    crf, preset = (24, "veryfast") if args.draft else (16, "slow")
    work = os.path.join(PROJ, "renders", "work-draft" if args.draft else "work")
    os.makedirs(work, exist_ok=True)

    print("Cutting shots...")
    paths, logos, total = segments(args, work, crf, preset)

    card = os.path.join(work, "endcard.mp4")
    run(["ffmpeg", "-v", "error", "-y", "-loop", "1", "-i", os.path.join(PROJ, "assets", "end-card.png"),
         "-t", f"{END_CARD}", "-vf", f"fps={FPS},format=yuv420p", "-c:v", "libx264", "-preset", preset,
         "-crf", str(crf), "-tune", "stillimage", card])

    print("Rendering logo + subtitle layer...")
    layer = overlay_layer(work, logos, parse_srt(os.path.join(PROJ, "subtitles-en-US.srt")), total)

    concat = os.path.join(work, "edit.txt")
    open(concat, "w").write("".join(f"file '{p}'\n" for p in paths))

    out = args.out or os.path.join(PROJ, "renders", "ecomiq-founder-loneliness-draft.mp4" if args.draft
                                   else "ecomiq-founder-loneliness.mp4")
    a_end = AROLL_IN + total
    pre = (f"pan=stereo|c0=c0|c1=c0,afade=t=in:d=0.03,afade=t=out:st={total - 0.04:.3f}:d=0.04")
    print("Measuring loudness...")
    r = subprocess.run(["ffmpeg", "-hide_banner", "-ss", f"{AROLL_IN}", "-t", f"{total:.3f}", "-i", args.aroll,
                        "-af", f"{pre},loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
                       capture_output=True, text=True)
    m = json.loads(r.stderr[r.stderr.rindex("{"):r.stderr.rindex("}") + 1])
    norm = (f"loudnorm=I=-14:TP=-1.5:LRA=11:linear=true:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
            f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}")
    print("Assembling...")
    run(["ffmpeg", "-v", "error", "-y",
         "-f", "concat", "-safe", "0", "-i", concat,
         "-f", "concat", "-safe", "0", "-i", layer,
         "-i", card,
         "-ss", f"{AROLL_IN}", "-t", f"{total:.3f}", "-i", args.aroll,
         "-filter_complex",
         f"[1:v]fps={FPS},format=rgba[ov];[0:v][ov]overlay=0:0:shortest=1:format=auto[ed];"
         f"[ed][2:v]concat=n=2:v=1:a=0,format=yuv420p[v];"
         f"[3:a]{pre},{norm},aresample=48000,apad=pad_dur={END_CARD}[a]",
         "-map", "[v]", "-map", "[a]", "-t", f"{total + END_CARD:.3f}",
         "-c:v", "libx264", "-preset", preset, "-crf", str(crf), "-r", str(FPS),
         "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", out])
    print(f"Done: {out}  ({total + END_CARD:.2f}s, A-roll {AROLL_IN:.2f}-{a_end:.2f})")


if __name__ == "__main__":
    main()
