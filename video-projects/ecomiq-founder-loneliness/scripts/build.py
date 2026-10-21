#!/usr/bin/env python3
"""Build the EcomIQ founder-loneliness edit (EDIT-PLAN.md) as a Meta-ready master.

Usage (from the project folder):
    python3 scripts/build.py --aroll /path/heatmap-3.mov --src /path/broll-dir --format 916|45 [--draft] [--qa]

Pure ffmpeg cut (no motion graphics). Quality chain: every intermediate is lossless
FFV1 10-bit 4:2:2 (the sources' native depth/chroma), so the only lossy step is the
single final H.264 encode. --qa also writes a lossless reference of the finished
composite and reports SSIM/PSNR of the master against it.
"""
import argparse, json, os, subprocess, sys

PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FPS = 25
AROLL_IN = 0.40                      # program 0 = source 0.40
END_CARD = 3.0                       # seconds
AR_CX = 1958                         # Sean's face centre in the 3840-wide A-roll

# Per-format layout. a_w: A-roll window width at full source height (2160).
# b_y: top of the 4:5 window inside rotated/vertical 2160x3840 B-roll (None = full frame).
FORMATS = {
    "916": dict(W=1080, H=1920, a_w=1216, st_w=608, logo=(48, 96, 220), sub_top=1490, b_y={}),
    "45":  dict(W=1080, H=1350, a_w=1728, st_w=864, logo=(48, 56, 200), sub_top=1012,
                b_y={"angle.mp4": 420, "holdlaptop.mp4": 260, "women.mp4": 420,
                     "laugh.mp4": 360, "booths.mov": 300}),
}

# Shots (EDIT-PLAN.md section 3, v2 framing: widest crop, slow continuous pushes
# only, max 6%, so consecutive Sean shots join without a zoom jump).
# A = (src_in, src_out, z0, push) where push is (src_t0, src_t1, z1) or None.
# B = (file, clip_in, clip_out, kind, logo).
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

LOSSLESS = ["-c:v", "ffv1", "-level", "3", "-pix_fmt", "yuv422p10le"]
BT709 = ["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv"]


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"FAILED: {' '.join(cmd)}\n{r.stderr[-2000:]}")
    return r


def zoom_expr(seg_in, z0, push):
    """Per-frame zoom (segment-local t), smoothstep between push keyframes."""
    if not push:
        return f"{z0}"
    t0, t1, z1 = push[0] - seg_in, push[1] - seg_in, push[2]
    s = f"clip((t-{t0:.3f})/{t1 - t0:.3f},0,1)"
    return f"({z0}+({z1}-{z0})*{s}*{s}*(3-2*{s}))"


def a_filter(F, seg_in, z0, push):
    W, H, aw = F["W"], F["H"], F["a_w"]
    z = zoom_expr(seg_in, z0, push)
    # full-height window centred on Sean -> per-frame upscale by z -> top-anchored centre crop
    return (f"crop={aw}:2160:{AR_CX - aw // 2}:0,"
            f"scale=w='2*trunc({W}*{z}/2)':h='2*trunc({H}*{z}/2)':eval=frame:flags=lanczos,"
            f"crop={W}:{H}:(iw-{W})/2:0,setsar=1")


def b_filter(F, f, kind):
    W, H = F["W"], F["H"]
    win = "" if f not in F["b_y"] else f"crop=2160:2700:0:{F['b_y'][f]},"
    if kind == "rot":       # shot vertical, stored sideways without rotation flag
        return f"transpose=1,{win}scale={W}:{H}:flags=lanczos,setsar=1"
    if kind == "vert":
        return f"{win}scale={W}:{H}:flags=lanczos,setsar=1"
    if kind == "shoptalk":  # 1080p landscape, follow Sean as he walks right
        # crop-centre keyframes (shot-local s, px) tracked from Sean's face, look-room left
        keys = [(0.0, 760), (0.35, 790), (0.75, 1030), (1.05, 1100), (1.35, 1210),
                (1.65, 1350), (1.95, 1330), (2.25, 1250), (2.55, 1100), (2.85, 1020)]
        half = F["st_w"] // 2
        x = f"{keys[-1][1] - half}"
        for (t0, c0), (t1, c1) in reversed(list(zip(keys, keys[1:]))):
            x = f"if(lt(t,{t1}),{c0 - half}+({c1 - c0})*(t-{t0})/{t1 - t0},{x})"
        return f"crop={F['st_w']}:1080:'{x}':0,scale={W}:{H}:flags=lanczos,setsar=1"
    raise ValueError(kind)


def segments(args, F, work):
    # Snap every shot boundary to the frame grid in program time so A-roll picture
    # stays locked to the continuous A-roll audio (no accumulated rounding drift).
    edges, src_t = [0], AROLL_IN
    for s in SHOTS:
        src_t = s[2] if s[0] == "A" else src_t + (s[3] - s[2])
        edges.append(round((src_t - AROLL_IN) * FPS))
    paths, logos, t = [], [], 0.0
    for i, s in enumerate(SHOTS):
        out = os.path.join(work, f"seg{i:02d}.mkv")
        frames = edges[i + 1] - edges[i]
        if s[0] == "A":
            _, a, b, z0, push = s
            cin = edges[i] / FPS + AROLL_IN
            src, dur, vf, logo = args.aroll, b - a, a_filter(F, cin, z0, push), "navy"
        else:
            _, f, a, b, kind, logo = s
            src, cin, dur, vf = os.path.join(args.src, f), a, frames / FPS, b_filter(F, f, kind)
        if not os.path.exists(out) or args.force:
            run(["ffmpeg", "-v", "error", "-y", "-ss", f"{cin:.3f}", "-i", src, "-an",
                 "-vf", f"{vf},fps={FPS}", "-frames:v", str(frames), *LOSSLESS, *BT709, out])
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


def overlay_layer(F, work, logos, cues, total):
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
    layout = {"W": F["W"], "H": F["H"], "logo": F["logo"], "subTop": F["sub_top"]}
    json.dump({"frames": frames, "out": work, "proj": PROJ, "layout": layout}, open(spec, "w"))
    run(["node", os.path.join(PROJ, "scripts", "render-layer.mjs"), spec])
    lst = os.path.join(work, "layer.txt")
    with open(lst, "w") as f:
        for i, fr in enumerate(frames):
            f.write(f"file 'layer{i:03d}.png'\nduration {fr['dur']:.4f}\n")
        f.write(f"file 'layer{len(frames) - 1:03d}.png'\n")
    return lst


def end_card(F, work):
    png = os.path.join(work, "end-card.png")
    run(["node", os.path.join(PROJ, "scripts", "render-card.mjs"), os.path.join(PROJ, "end-card.html"),
         png, str(F["W"]), str(F["H"])])
    out = os.path.join(work, "endcard.mkv")
    run(["ffmpeg", "-v", "error", "-y", "-loop", "1", "-i", png, "-t", f"{END_CARD}",
         "-vf", f"fps={FPS},scale=out_color_matrix=bt709:out_range=tv,format=yuv422p10le",
         *LOSSLESS, *BT709, out])
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--aroll", required=True)
    ap.add_argument("--src", required=True)
    ap.add_argument("--format", choices=FORMATS, default="916")
    ap.add_argument("--draft", action="store_true")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--qa", action="store_true", help="measure master vs lossless reference")
    ap.add_argument("--out")
    args = ap.parse_args()
    F = FORMATS[args.format]
    tag = {"916": "9x16", "45": "4x5"}[args.format]
    work = os.path.join(PROJ, "renders", f"work-{args.format}")
    os.makedirs(work, exist_ok=True)

    print(f"[{tag}] Cutting shots (lossless)...")
    paths, logos, total = segments(args, F, work)
    card = end_card(F, work)
    print("Rendering logo + subtitle layer...")
    layer = overlay_layer(F, work, logos, parse_srt(os.path.join(PROJ, "subtitles-en-US.srt")), total)
    concat = os.path.join(work, "edit.txt")
    open(concat, "w").write("".join(f"file '{p}'\n" for p in paths))

    pre = f"pan=stereo|c0=c0|c1=c0,afade=t=in:d=0.03,afade=t=out:st={total - 0.04:.3f}:d=0.04"
    print("Measuring loudness...")
    r = subprocess.run(["ffmpeg", "-hide_banner", "-ss", f"{AROLL_IN}", "-t", f"{total:.3f}", "-i", args.aroll,
                        "-af", f"{pre},loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
                       capture_output=True, text=True)
    m = json.loads(r.stderr[r.stderr.rindex("{"):r.stderr.rindex("}") + 1])
    norm = (f"loudnorm=I=-14:TP=-1.5:LRA=11:linear=true:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
            f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}")

    inputs = ["-f", "concat", "-safe", "0", "-i", concat, "-f", "concat", "-safe", "0", "-i", layer,
              "-i", card, "-ss", f"{AROLL_IN}", "-t", f"{total:.3f}", "-i", args.aroll]
    # Overlay converted RGBA -> YUV with the BT.709 matrix (default would be BT.601 and shift the navy).
    # setpts=N/FPS: the concat demuxer's ms timestamps can collide at a segment join and
    # silently drop a frame; regenerate them from the frame count instead.
    video = (f"[0:v]setpts=N/{FPS}/TB[cut];"
             f"[1:v]fps={FPS},scale=out_color_matrix=bt709:out_range=tv,format=yuva422p10le[ov];"
             f"[cut][ov]overlay=0:0:shortest=1:format=yuv422p10[ed];[ed][2:v]concat=n=2:v=1:a=0")
    audio = f"[3:a]{pre},{norm},aresample=48000,apad=pad_dur={END_CARD}[a]"
    dur = ["-t", f"{total + END_CARD:.3f}"]

    out = args.out or os.path.join(PROJ, "renders", f"ecomiq-founder-loneliness-{tag}-{'draft' if args.draft else 'master'}.mp4")
    x264 = (["-preset", "veryfast", "-crf", "23"] if args.draft else
            ["-preset", "slower", "-crf", "12", "-profile:v", "high", "-level:v", "4.2",
             "-x264-params", "keyint=50:min-keyint=25:aq-mode=3"])
    print("Encoding master...")
    run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", f"{video},format=yuv420p[v];{audio}",
         "-map", "[v]", "-map", "[a]", *dur, "-c:v", "libx264", *x264, "-pix_fmt", "yuv420p", *BT709,
         "-r", str(FPS), "-c:a", "aac", "-b:a", "320k", "-ar", "48000", "-movflags", "+faststart", out])
    print(f"Done: {out}  ({total + END_CARD:.2f}s)")

    if args.qa:
        ref = os.path.join(work, "reference-lossless.mkv")
        print("QA: writing lossless reference + comparing...")
        run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", f"{video},format=yuv420p[v]",
             "-map", "[v]", *dur, "-c:v", "ffv1", "-level", "3", "-pix_fmt", "yuv420p", ref])
        r = run(["ffmpeg", "-hide_banner", "-i", out, "-i", ref, "-lavfi",
                 "[0:v]split[a1][a2];[1:v]split[b1][b2];[a1][b1]ssim;[a2][b2]psnr", "-f", "null", "-"])
        for line in r.stderr.splitlines():
            if "SSIM Y:" in line or "PSNR y:" in line:
                print("  " + line.split("] ")[-1])


if __name__ == "__main__":
    main()
