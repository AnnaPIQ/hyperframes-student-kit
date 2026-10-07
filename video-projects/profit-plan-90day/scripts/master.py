#!/usr/bin/env python3
"""master.py: full-quality master for the 90-day ad (9:16 or 4:5).

    python3 scripts/master.py 916  <path/to/aroll ProRes .mov>
    python3 scripts/master.py 45   <path/to/aroll ProRes .mov>

Why this exists: rendering live footage through the browser (H.264 proxy ->
JPEG frame cache -> bilinear CSS scaling -> encode) cost ~25% of the detail in
Sean's face. Here the footage never touches the browser:

  1. base   Sean's framing modes, punch-ins and push-ins are built by ffmpeg
            straight from the 4K ProRes with Lanczos scaling; B-roll is pulled
            from the Drive originals the same way. One resample, lossless
            intermediates.
  2. gfx    HyperFrames renders ONLY graphics/captions/cards/logo as a
            transparent ProRes 4444 overlay (index.html with media hidden).
  3. final  overlay gfx on base, one x264 encode (2-pass, high bitrate) + AAC.

Framing timeline and B-roll picks mirror index.html / prep-media.sh exactly.
"""
import os, re, subprocess, sys

FMT, AROLL = sys.argv[1], sys.argv[2]
PROJ = os.path.normpath(os.path.join(os.path.dirname(__file__), ".."))
GFX_PROJ = PROJ if FMT == "916" else os.path.normpath(os.path.join(PROJ, "..", "profit-plan-90day-4x5"))
H = 1920 if FMT == "916" else 1350
W = 1080
DUR = 38.65
FPS = 30
WORK = os.path.join(PROJ, "assets", "media", f"master-{FMT}")
os.makedirs(WORK, exist_ok=True)
DRIVE = "https://drive.usercontent.google.com/download?export=download&confirm=t&id="
GRADE = "huesaturation=hue=-20:saturation=-0.15:colors=b+m:strength=1"
LOSSLESS = ["-c:v", "ffv1", "-level", "3", "-pix_fmt", "yuv444p"]


def ff(*args):
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", *args], check=True)


# ---- 1a. Sean column: the 4 source ranges, graded, lossless --------------------
COL = (1216, 2160, 1322) if FMT == "916" else (1728, 2160, 1066)  # w, h, x in the 4K frame
col = os.path.join(WORK, "col.mkv")
if not os.path.exists(col):
    ff("-i", AROLL, "-filter_complex",
       "[0:v]split=4[v0][v1][v2][v3];"
       "[v0]trim=0.50:14.95,setpts=PTS-STARTPTS[a];[v1]trim=15.55:30.05,setpts=PTS-STARTPTS[b];"
       "[v2]trim=30.65:36.10,setpts=PTS-STARTPTS[c];[v3]trim=36.65:40.90,setpts=PTS-STARTPTS[d];"
       f"[a][b][c][d]concat=n=4:v=1:a=0,crop={COL[0]}:{COL[1]}:{COL[2]}:0,{GRADE},fps={FPS}[v]",
       "-map", "[v]", *LOSSLESS, col)
print("✓ column")

# ---- 1b. Sean framing (mirrors the #cam timeline in index.html) ---------------
# (start, end, s0, s1, mode)  mode: T=TIGHT (1.3x, top offset), G=GRAPHIC (bottom-anchored), W=WIDE
SEG = [(0, .75, 1.3, 1.3, "T"), (.75, 3.02, 1.15, 1.15, "G"), (3.02, 5.87, 1.15, 1.2, "G"),
       (5.87, 7.05, 1, 1, "W"), (7.05, 9.83, 1.15, 1.15, "G"), (9.83, 11.40, 1.3, 1.3, "T"),
       (11.40, 14.45, 1.15, 1.15, "G"), (14.45, 18.00, 1.15, 1.22, "G"), (18.00, 28.95, 1.22, 1.22, "G"),
       (28.95, 31.75, 1.15, 1.19, "G"), (31.75, 34.40, 1.3, 1.3, "T"), (34.40, 99, 1.15, 1.18, "G")]
TOP = 325 if FMT == "916" else 229  # TIGHT top offset in output px (same as index.html)


def piecewise(fn):
    expr = fn(SEG[-1])
    for seg in reversed(SEG[:-1]):
        expr = f"if(lt(t,{seg[1]}),{fn(seg)},{expr})"
    return expr


S = piecewise(lambda g: f"({g[2]}+({g[3]}-{g[2]})*(t-{g[0]})/{g[1]-g[0]})" if g[2] != g[3] else f"{g[2]}")
Y = piecewise(lambda g: "(ih-oh)" if g[4] == "G" else (str(TOP) if g[4] == "T" else "0"))
sean = os.path.join(WORK, "sean.mkv")
if not os.path.exists(sean):
    ff("-i", col, "-vf",
       f"format=gbrp,scale=w='round({W}*{S})':h='round({H}*{S})':eval=frame:flags=lanczos+accurate_rnd+full_chroma_int,"
       f"crop={W}:{H}:'(iw-{W})/2':'{Y}',format=yuv444p",
       "-t", str(DUR), *LOSSLESS, sean)
print("✓ sean framing")

# ---- 1c. B-roll from the Drive originals, lossless, with the 3% push ----------
ROT = "transpose=1,scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920"
BR = [  # name, id, src in, ad start, ad dur, filter to 1080x1920, crop anchor for 4:5
    ("b1", "1XuPAArGjpESm3JUhjU7Q3gVmz4L_y72Z", 13.2, 18.00, .80, "crop=ih*9/16:ih:iw*0.42:0,scale=1080:1920:flags=lanczos,unsharp=5:5:0.4", "top"),
    ("b2", "1GycuM9sO1RClaXwnU7sdYi6HOqr6p15I", 5.0, 18.80, .75, ROT, "mid"),
    ("b3", "1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu", 4.0, 19.55, .70, ROT, "mid"),
    ("b4", "1y-p9X7CAXZ9kW9a_5ntcjSeAJvIxTC-2", 27.4, 20.25, 1.05, "scale=1512:2688:flags=lanczos,crop=1080:1920:216:220", "mid"),
    ("b5", "1vk6MsGPlFBwNjRb_CvsJ17lq6EokzIXi", 13.0, 24.45, .80, ROT, "mid"),
    ("b6", "1eaH53uLyLgLPm6v75Ad2NSgeelsIBLKJ", 2.0, 25.25, .76, ROT, "mid"),
    ("b7", "1x1uT_kVmPod-vpPn5SVIGY4kUZmfCwBo", 4.0, 26.01, 2.94, ROT, "mid"),
]
for name, fid, ss, start, dur, vf, anchor in BR:
    out = os.path.join(WORK, f"{name}.mkv")
    if os.path.exists(out):
        continue
    # push-in about the centre, then cut the frame (4:5: centre or top of the 9:16 shot)
    push = (f"format=gbrp,scale=w='round({W}*(1+0.03*t/{dur}))':h='round(1920*(1+0.03*t/{dur}))':eval=frame:flags=lanczos,"
            f"crop={W}:1920:'(iw-{W})/2':'(ih-1920)/2',crop={W}:{H}:0:{0 if anchor == 'top' or H == 1920 else (1920 - H) // 2}")
    ff("-ss", str(ss), "-i", DRIVE + fid, "-t", f"{dur + 0.1:.2f}", "-an",
       "-vf", f"{vf},fps={FPS},setpts=PTS-STARTPTS,{push},format=yuv444p", *LOSSLESS, out)
    print("✓", name)

# ---- 1d. base = Sean with B-roll laid over at their ad times -------------------
base = os.path.join(WORK, "base.mkv")
inputs, chain, last = ["-i", sean], "", "0:v"
for i, (name, _, _, start, dur, _, _) in enumerate(BR, 1):
    inputs += ["-i", os.path.join(WORK, f"{name}.mkv")]
    a, b = round(start * FPS) / FPS, round((start + dur) * FPS) / FPS
    chain += f"[{i}:v]setpts=PTS+{a}/TB[s{i}];[{last}][s{i}]overlay=enable='between(t,{a},{b - 0.001})':eof_action=pass[o{i}];"
    last = f"o{i}"
ff(*inputs, "-filter_complex", chain.rstrip(";"), "-map", f"[{last}]", "-t", str(DUR), *LOSSLESS, base)
print("✓ base")

# ---- 2. graphics-only transparent overlay from the composition -----------------
src = open(os.path.join(GFX_PROJ, "index.html")).read()
g = src
g = re.sub(r'\s*<video [^>]*></video>', "", g)                       # no footage in the browser
g = g.replace("background: #06284C;\n        font-family", "background: transparent;\n        font-family")
g = g.replace("overflow: hidden; background: #06284C; }", "overflow: hidden; background: transparent; }")
g = re.sub(r'\s*<audio [^>]*></audio>', "", g)
assert "<video" not in g and "transparent" in g
gfx_html = os.path.join(GFX_PROJ, "index.gfx.html")
open(gfx_html, "w").write(g)
os.replace(os.path.join(GFX_PROJ, "index.html"), os.path.join(GFX_PROJ, "index.full.html"))
os.replace(gfx_html, os.path.join(GFX_PROJ, "index.html"))
gfx = os.path.join(WORK, "gfx.mov")
try:
    subprocess.run(["npx", "hyperframes", "render", "--format", "mov", "--quality", "high", "--output", gfx],
                   cwd=GFX_PROJ, check=True, stdout=subprocess.DEVNULL)
finally:
    os.replace(os.path.join(GFX_PROJ, "index.full.html"), os.path.join(GFX_PROJ, "index.html"))
print("✓ graphics overlay")

# ---- 3. composite + single delivery encode -------------------------------------
mix = os.path.join(PROJ, "assets", "media", "mix.wav")
final = os.path.join(GFX_PROJ, "final.mp4")
kbps = 18000 if FMT == "916" else 14000   # keeps each file under GitHub's 100 MB
vf = "[0:v][1:v]overlay=format=auto:shortest=1,format=yuv420p,setsar=1[v]"
common = ["-i", base, "-i", gfx, "-i", mix, "-filter_complex", vf, "-map", "[v]",
          "-c:v", "libx264", "-preset", "slow", "-tune", "film", "-profile:v", "high",
          "-b:v", f"{kbps}k", "-maxrate", f"{int(kbps * 1.5)}k", "-bufsize", f"{kbps * 2}k",
          "-g", "60", "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
          "-t", str(DUR)]
plog = os.path.join(WORK, "x264pass")
ff(*common, "-pass", "1", "-passlogfile", plog, "-an", "-f", "mp4", os.devnull)
ff(*common, "-map", "2:a", "-pass", "2", "-passlogfile", plog,
   "-c:a", "aac", "-b:a", "320k", "-ar", "48000", "-movflags", "+faststart", final)
print("✅", final)
