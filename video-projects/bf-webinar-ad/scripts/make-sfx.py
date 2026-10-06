"""Synthesise the BF webinar ad's sound design as one pre-mixed, deterministic WAV.

Soft, premium cues only (no whoosh stacks, booms, cash registers). Levels sit
roughly 12 dB under Sean's voice. Cue times follow EDIT_PLAN.md "Sound design".
Usage: python3 -I scripts/make-sfx.py assets/sfx.wav
"""
import sys
import wave

import numpy as np

SR = 48000
DUR = 37.0
rng = np.random.default_rng(1414)  # seeded: identical output every run
out = np.zeros(int(SR * DUR))


def env(n, attack, decay):
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    return a * np.exp(-t / decay)


def lowpass(x, cutoff):
    # one-pole low-pass, fine for soft textures
    alpha = 1 - np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc += alpha * (v - acc)
        y[i] = acc
    return y


def tick(freq=1900, dur=0.07, gain=0.10):
    n = int(SR * dur)
    t = np.arange(n) / SR
    return gain * np.sin(2 * np.pi * freq * t) * env(n, 0.002, 0.018)


def click(gain=0.12):
    return tick(2600, 0.05, gain) + tick(1300, 0.05, gain * 0.5)


def impact(gain=0.30):
    n = int(SR * 0.9)
    t = np.arange(n) / SR
    body = np.sin(2 * np.pi * (62 + 30 * np.exp(-t / 0.08)) * t) * env(n, 0.004, 0.22)
    air = lowpass(rng.standard_normal(n), 900) * env(n, 0.002, 0.06) * 0.6
    return gain * (body + air)


def swell(dur=0.55, gain=0.08, cutoff=2500):
    n = int(SR * dur)
    x = lowpass(rng.standard_normal(n), cutoff)
    shape = np.sin(np.linspace(0, np.pi, n)) ** 2
    return gain * x * shape


def chime(gain=0.07):
    n = int(SR * 0.9)
    t = np.arange(n) / SR
    tone = np.sin(2 * np.pi * 880 * t) + 0.6 * np.sin(2 * np.pi * 1320 * t)
    return gain * tone * env(n, 0.004, 0.25)


def place(sig, at):
    i = int(at * SR)
    j = min(len(out), i + len(sig))
    out[i:j] += sig[: j - i]


place(impact(0.26), 0.55)            # DOUBLE
place(tick(), 4.08)                  # FREE
place(swell(0.5, 0.05, 1800), 8.45)  # proof card rise
place(swell(0.6, 0.08, 2600), 13.40) # discount reset
place(swell(0.5, 0.05, 1800), 15.95) # playbook card slide
place(tick(), 16.70)                 # 01
for k in range(4):                   # 02 card deal (soft)
    place(tick(1500, 0.05, 0.05), 18.15 + k * 0.06)
place(swell(0.5, 0.06, 2200), 19.25) # bundles
place(swell(0.25, 0.06, 5000), 21.20)  # email send
for at in (22.70, 22.85, 23.00):     # data ticks
    place(tick(2200, 0.05, 0.07), at)
place(chime(), 27.00)                # recap confirm
place(impact(0.18), 28.90)           # October 14
place(click(), 32.55)                # "click the link"
place(click(), 34.40)                # 100% FREE

peak = np.max(np.abs(out))
if peak > 0.5:
    out *= 0.5 / peak
pcm = (out * 32767).astype("<i2")
with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote", sys.argv[1], f"{DUR}s")
