#!/usr/bin/env python3
"""build-audio.py: synthesise the SFX bed and mix it under Sean's VO.

    python3 scripts/build-audio.py

Reads  assets/media/vo.wav   (from prep-media.sh)
Writes assets/media/sfx.wav  (SFX only, for the editor)
       assets/media/mix.wav  (VO at -14 LUFS + SFX ~10 dB under)

Every sound is generated from sine maths, so the bed is deterministic and
licence-free. Palette per the edit plan: light impacts, soft ticks, a rise,
a stop-click, a count-up, one chime. No whooshes, coins or booms.
Hit times are ad seconds and match the GSAP timeline in index.html.
"""
import math, os, struct, subprocess, wave

SR = 48000
DUR = 38.65
ROOT = os.path.join(os.path.dirname(__file__), "..", "assets", "media")
buf = [0.0] * int(SR * DUR + SR)


def add(t0, length, fn):
    s0 = int(t0 * SR)
    for i in range(int(length * SR)):
        t = i / SR
        buf[s0 + i] += fn(t)


sin = lambda f, t: math.sin(2 * math.pi * f * t)
impact = lambda t: 0.9 * sin(55, t) * math.exp(-9 * t) + 0.3 * sin(110, t) * math.exp(-14 * t)
tick = lambda t: 0.45 * sin(2400, t) * math.exp(-90 * t)
thud = lambda t: 0.6 * sin(140, t) * math.exp(-25 * t) + 0.22 * sin(1800, t) * math.exp(-80 * t)
rise = lambda t: 0.22 * math.sin(2 * math.pi * (300 * t + 333 * t * t)) * math.sin(math.pi * t / 0.6)
stop = lambda t: 0.45 * sin(900, t) * math.exp(-60 * t) + 0.4 * sin(180, t) * math.exp(-40 * t)
swell = lambda t: 0.10 * (sin(392, t) + sin(587, t)) * math.sin(math.pi * t / 0.9)
blip = lambda t: 0.18 * sin(1320, t) * math.exp(-50 * t)
land = lambda t: 0.35 * sin(196, t) * math.exp(-4 * t) + 0.2 * sin(392, t) * math.exp(-5 * t)
confirm = lambda t: 0.22 * sin(660, t) * math.exp(-12 * t) + (0.22 * sin(990, t - 0.08) * math.exp(-12 * (t - 0.08)) if t > 0.08 else 0)
chime = lambda t: 0.2 * (sin(880, t) + 0.6 * sin(1320, t)) * math.exp(-5 * t)

add(0.75, 0.6, impact)                      # $20K+/MO lands
add(3.21, 0.6, rise)                        # SALES line rises
add(4.16, 0.15, stop)                       # PROFIT line stops flat
add(8.30, 0.9, swell)                       # profit share grows
for t in (11.6, 12.0): add(t, 0.25, thud)   # costs bite into revenue
for t in (13.30, 13.55, 13.80): add(t, 0.08, tick)  # 01 02 03
add(15.00, 0.6, impact)                     # 90 DAYS lands
for t in (15.70, 15.85, 16.00, 16.15): add(t, 0.1, blip)  # rail nodes
# +500% count: ticks that slow into the landing (ease-out spacing)
n = 11
for k in range(n):
    p = 1 - (1 - k / n) ** 2.2
    add(21.40 + p * (22.55 - 21.40) - 0.02, 0.06, lambda t: 0.6 * tick(t))
add(22.55, 1.0, land)                       # +500% lands
for t in (26.30, 26.90, 27.50): add(t, 0.08, tick)  # tracker rows
add(28.12, 0.4, confirm)                    # PROFIT end line
add(34.75, 1.0, chime)                      # BOOK NOW pill


def write(path, samples, gain):
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        frames = bytearray()
        for s in samples[: int(SR * DUR)]:
            v = max(-1.0, min(1.0, s * gain))
            iv = int(v * 32767)
            frames += struct.pack("<hh", iv, iv)
        w.writeframes(bytes(frames))


sfx = os.path.join(ROOT, "sfx.wav")
write(sfx, buf, 0.32)  # peaks around -10 dBFS before the mix gain below
vo = os.path.join(ROOT, "vo.wav")
mix = os.path.join(ROOT, "mix.wav")
subprocess.run([
    "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", vo, "-i", sfx, "-filter_complex",
    # loudnorm buffers its tail; with amix duration=first that dropped the last
    # ~3 s of VO. Pad both inputs and trim the mix to the exact ad length.
    "[0:a]loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000,apad[v];[1:a]volume=0.55,apad[s];"
    "[v][s]amix=inputs=2:normalize=0:duration=longest,alimiter=limit=0.84,"
    f"atrim=0:{DUR},asetpts=PTS-STARTPTS[out]",
    "-map", "[out]", "-c:a", "pcm_s16le", mix], check=True)
print("✓ sfx.wav + mix.wav")
