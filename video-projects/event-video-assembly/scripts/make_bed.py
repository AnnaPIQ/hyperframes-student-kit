#!/usr/bin/env python3
"""Synthesize a subtle, original, royalty-free ambient/tech music bed.
Am-F-C-G pad (warm, uplifting) + soft arp + sub, stereo, faded. Deterministic.
Output: assets/music_bed.wav (48k stereo 16-bit)."""
import numpy as np, wave, os, sys

SR = 48000
DUR = float(sys.argv[1]) if len(sys.argv) > 1 else 51.05
N = int(SR * DUR)
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "music_bed.wav")

def mtof(m): return 440.0 * 2 ** ((m - 69) / 12.0)

# (name, pad voices [midi], sub root [midi])
CHORDS = [("Am",[57,60,64,71],45), ("F",[53,57,60,67],41),
          ("C",[60,64,67,74],48), ("G",[55,59,62,69],43)]
CHORD_DUR = 3.2      # seconds per chord
XF = 1.0             # crossfade between chords
BPM = 84.0
QN = 60.0 / BPM      # quarter-note seconds

def raised_cos_fade(n_fade):
    x = np.linspace(0, np.pi/2, n_fade)
    return np.sin(x)**2  # 0->1 ease

def render_chord(voices, sub, n):
    """One chord segment: pad(L,R)+sub, raised-cosine fade in/out over XF."""
    t = np.arange(n) / SR
    L = np.zeros(n); R = np.zeros(n)
    for m in voices:
        f = mtof(m)
        # slight detune per channel for width; sine + soft 2nd/3rd harmonic for warmth
        for ch, cents in ((0, -4.0), (1, +4.0)):
            fd = f * 2 ** (cents / 1200.0)
            ph = 2*np.pi*fd*t
            wv = np.sin(ph) + 0.14*np.sin(2*ph) + 0.05*np.sin(3*ph)
            (L if ch == 0 else R)[:] += wv
    L /= max(1, len(voices)); R /= max(1, len(voices))
    subw = 0.6*np.sin(2*np.pi*mtof(sub)*t)
    # fades
    nf = int(XF*SR); nf = min(nf, n//2)
    env = np.ones(n); env[:nf] = raised_cos_fade(nf); env[-nf:] = raised_cos_fade(nf)[::-1]
    return L*env, R*env, subw*env

padL = np.zeros(N); padR = np.zeros(N); sub = np.zeros(N)
nseg = int(np.ceil(DUR / CHORD_DUR)) + 1
for i in range(nseg):
    s0 = int(i*CHORD_DUR*SR)
    if s0 >= N: break
    n = int((CHORD_DUR + XF) * SR); n = min(n, N - s0)
    if n <= 4: break
    name, voices, subm = CHORDS[i % len(CHORDS)]
    l, r, sb = render_chord(voices, subm, n)
    padL[s0:s0+n] += l; padR[s0:s0+n] += r; sub[s0:s0+n] += sb

# soft arp: quarter-note plucks cycling chord tones (root, 5th, 3rd, octave)
arp = np.zeros(N)
step = 0
tcur = 0.0
while tcur < DUR:
    ci = int(tcur // CHORD_DUR) % len(CHORDS)
    voices = CHORDS[ci][1]
    pattern = [voices[0], voices[2], voices[1], voices[0]+12]  # root,5th,3rd,oct
    m = pattern[step % len(pattern)]
    s0 = int(tcur*SR); n = int(min(QN*1.6, DUR - tcur)*SR)
    if n > 8:
        te = np.arange(n)/SR
        envp = np.exp(-te/0.45) * np.minimum(1, te/0.005)   # pluck: fast attack, exp decay
        note = np.sin(2*np.pi*mtof(m)*te) * envp
        arp[s0:s0+n] += note
    step += 1; tcur += QN

# gentle low-pass (small Hann smoothing) to soften highs
k = np.hanning(9); k /= k.sum()
padL = np.convolve(padL, k, mode='same'); padR = np.convolve(padR, k, mode='same')
arp = np.convolve(arp, k, mode='same')

# mix bed
L = 0.60*padL + 0.30*arp + 0.55*sub
R = 0.60*padR + 0.30*arp + 0.55*sub

# global fade in/out
fi = int(1.5*SR); fo = int(2.8*SR)
g = np.ones(N)
g[:fi] = raised_cos_fade(fi); g[-fo:] = raised_cos_fade(fo)[::-1]
L *= g; R *= g

# normalize to -6 dBFS peak (bed level tuned further in the ffmpeg mix)
peak = max(np.max(np.abs(L)), np.max(np.abs(R)), 1e-6)
L *= 0.5/peak; R *= 0.5/peak

stereo = np.empty((N, 2), dtype=np.int16)
stereo[:, 0] = np.clip(L, -1, 1) * 32767
stereo[:, 1] = np.clip(R, -1, 1) * 32767
with wave.open(OUT, 'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(stereo.tobytes())
print("wrote", OUT, f"{DUR:.2f}s")
