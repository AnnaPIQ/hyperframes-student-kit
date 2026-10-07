"""Bake Sean's shot framing (crops / punch-ins / playbook window) straight from the 4K iPhone source.

Why: scaling the A-roll inside the browser (CSS transform on an animated layer) makes Chrome
rasterise at layout size and upsample, which softened every Sean shot (~22% less detail than an
ideal crop). Here each shot is cut from the 2160x3840 original with Lanczos and placed at 1:1 on
the output canvas, so the composition only clips it (never scales it).

Usage: python3 -I scripts/bake-sean.py <aroll.mov> <out.mp4> <916|45>
"""
import subprocess
import sys

SRC, OUT, ASPECT = sys.argv[1], sys.argv[2], sys.argv[3]
W, H = (1080, 1920) if ASPECT == "916" else (1080, 1350)
FX, FY = 533, 1067  # face anchor in 1080x1920 layout space (same as the composition)
SRC_SCALE = 2.0     # 4K source pixels per layout pixel

# (start, end, face_x, face_y, scale): identical framings to the composition's SHOT table
SHOTS = {
    "916": [(0.00, 3.55, 540, 966, 1.12), (3.55, 11.80, 540, 900, 1.30), (11.80, 15.90, 540, 840, 1.59),
            (15.90, 30.90, 246, 650, 0.72), (30.90, 32.40, 540, 880, 1.22), (32.40, 37.00, 750, 940, 1.15)],
    "45":  [(0.00, 3.55, 540, 800, 1.12), (3.55, 11.80, 540, 780, 1.30), (11.80, 15.90, 540, 740, 1.59),
            (15.90, 30.90, 246, 510, 0.72), (30.90, 32.40, 540, 780, 1.22), (32.40, 37.00, 750, 800, 1.15)],
}[ASPECT]

HLG_TO_SDR = "zscale=min=bt2020nc:pin=bt2020:tin=bt709:rin=tv:m=bt709:p=bt709:t=bt709:r=tv,format=yuv420p"
parts = [f"[0:v]{HLG_TO_SDR},fps=30,tpad=stop_mode=clone:stop_duration=0.8,split={len(SHOTS)}" + "".join(f"[s{i}]" for i in range(len(SHOTS)))]
for i, (a, b, fx, fy, s) in enumerate(SHOTS):
    k = s / SRC_SCALE
    sw, sh = round(2160 * k / 2) * 2, round(3840 * k / 2) * 2
    ox, oy = round(fx - FX * s), round(fy - FY * s)
    parts.append(
        f"[s{i}]trim=start={a}:end={b},setpts=PTS-STARTPTS,scale={sw}:{sh}:flags=lanczos[z{i}];"
        f"color=c=0x06284C:s={W}x{H}:r=30:d={b - a:.3f}[c{i}];"
        f"[c{i}][z{i}]overlay=x={ox}:y={oy}:shortest=1,format=yuv420p[o{i}]"
    )
parts.append("".join(f"[o{i}]" for i in range(len(SHOTS))) + f"concat=n={len(SHOTS)}:v=1:a=0[v]")

cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", SRC, "-filter_complex", ";".join(parts),
       "-map", "[v]", "-t", "37", "-c:v", "libx264", "-preset", "medium", "-crf", "10", "-g", "30", "-keyint_min", "30",
       "-pix_fmt", "yuv420p", "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
       "-movflags", "+faststart", "-an", OUT]
subprocess.run(cmd, check=True)
print("wrote", OUT)
