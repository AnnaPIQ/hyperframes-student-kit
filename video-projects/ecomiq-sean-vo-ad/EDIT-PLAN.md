# EcomIQ — "Behind our coaching" · Sean VO + Showcase Reel

Short-form ad. Sean's voice is the spine; the Showcase Reel is the picture.
Sean is never on camera as a talking head — montage throughout, then the brand end card.

## Sources

| Role | Drive file | Probe |
|---|---|---|
| Voiceover (spine) | `who we are.mov` | 3840×2160 ProRes, **25 fps**, PCM s24be 48 kHz stereo, **40.88 s** |
| Visuals — 9:16 | `Showcase Reel.mp4` | 1080×1920, H.264, 30 fps, AAC 44.1 kHz, **29.72 s** |
| Visuals — 1:1 | `Showcase ad-1-1.mp4` | 1440×1440, H.264, 30 fps, AAC, **29.72 s** |

Local copies: `assets/incoming/sean-raw.mov`, `assets/incoming/montage-raw.mp4`,
`assets/incoming/montage-square-raw.mp4` (gitignored).
Montage audio is **discarded** in both — video stream only.

**The two montages are the same edit, natively recomposed per ratio.** Scene detection
returns an identical 37-cut list on both files (0.567 … 27.733), so every source
timestamp in this plan applies unchanged to either ratio. No cropping or padding
anywhere — each export uses its own native-framed master.

### Note on the montage tail
Both montage masters already end with their *own* EcomIQ end card ("Click The Link Below")
from **27.73 s → 29.72 s**. That is trimmed off — we build our own end card from the
brand tokens. Usable montage picture = **0 → 27.733 s** (37 shots, ~0.75 s average).

## Voiceover — verified timings

Speech onset confirmed by RMS analysis (levels jump from −60 dB to −36 dB at 3.26 s);
Whisper `small.en` stretched the first two words, so all timings below are cross-checked
against `silencedetect` + per-200 ms `volumedetect` RMS, not taken from the ASR pass alone.

- **VO in-point: source 3.100 s** (0.16 s pre-roll before the first word "Behind")
- **VO out-point: source 39.300 s** (0.16 s after the last word "more.")
- **VO length: 36.200 s**

Edit time `t` = source time − 3.100.

| Beat | Source | Edit `t` | Line |
|---|---|---|---|
| 1 | 3.26 – 11.27 | 0.16 – 8.17 | Behind our coaching is a full Shopify agency, and that's the part that makes EcomIQ completely different to anything you have ever seen before. |
| 2 | 11.74 – 18.01 | 8.64 – 14.91 | Every strategy we teach, we have already run across dozens of real brands. |
| 3 | 18.67 – 21.79 | 15.57 – 18.69 | We've seen what works. We've seen what doesn't. |
| 4 | 22.56 – 24.88 | 19.46 – 21.78 | And what actually holds up once real money is on the line. |
| 5 | 25.41 – 30.80 | 22.31 – 27.70 | So you're not getting just one person's opinion. You're getting the patterns that we see across a whole portfolio of stores brought right back to yours. |
| 6 | 31.39 – 36.01 | 28.29 – 32.91 | It's coaching that's backed by an agency that has done this for a living for over 10 years. |
| 7 | **36.80** – 39.14 | **33.70** – 36.04 | **I want to see if we can help you.** Tap the link to find out more. |

### ★ END-CARD TRIGGER

> **"want" begins at source `36.80 s` → edit `t = 33.70 s`**

Word-level (tight-window re-transcribe, RMS-confirmed hard speech onset at 36.80):

```
36.74–36.80  I
36.80–36.93  want      ← END CARD STARTS HERE
36.93–37.02  to
37.02–37.16  see
37.16–37.25  if
37.25–37.29  we
37.34–37.48  can
37.48–37.67  help
37.67–37.80  you
37.90–39.14  Tap the link to find out more.
```

The cut is a **0.35 s dissolve starting on "want"** (t = 33.70 → 34.05), so the card
resolves across "…see if we can help you." His voice keeps running over the card.

## Timeline

Total composition: **37.60 s** @ 30 fps.

```
 t=0                                                     27.73        33.70   37.60
 |───────────── BLOCK A · reel plays straight ────────────|── BLOCK B ──|── CARD ──|
 |            beats 1–5 · 37 hard cuts, untouched         | authority   | VO runs  |
                                                          | reprise     | over it  |
                                                            beat 6        3.90 s
```

### Block A — 0 → 27.733 (27.733 s)
Showcase Reel `0 → 27.733`, played straight at native speed, audio muted.
Its own 37 hard cuts carry beats 1–5. Nothing reordered — it is already a
tightly-cut reel and it tracks the VO's build well.

### Block B — 27.733 → 33.700 (5.967 s) · "authority reprise"
The VO's sixth beat is the credibility line, and the reel runs out 6 s early. Rather than
slow-mo (judder at 30 fps) or a loop, this is a deliberate **reprise of seven hero shots**
at native speed and native cadence, cut to the credibility line. Seam at 27.733 is a
**hard cut** landing exactly on a sentence boundary.

| # | Source in → out | Dur | Shot | Why here |
|---|---|---|---|---|
| 1 | 7.033 → 7.600 | 0.567 | "SHOPIFY PREMIER PARTNER" card | "…backed by…" |
| 2 | 9.067 → 9.967 | 0.900 | Sean presenting charts on screen | "…an agency…" |
| 3 | 15.600 → 16.433 | 0.833 | Product / search UI with Sean inset | the actual work |
| 4 | 18.033 → 19.033 | 1.000 | Stage: *2.3+ Billion requests daily · 99.9% uptime* | "…done this for a living…" |
| 5 | 16.433 → 17.067 | 0.633 | Coaching call grid (two-up) | "…coaching…" |
| 6 | 22.833 → 23.633 | 0.800 | Hands on laptop | craft |
| 7 | 26.867 → 27.733 | 0.867 **+0.367 hold** | Sean, warm half-smile | "…for over 10 years." → human beat into the card |

Shot 7 is held an extra 0.367 s so Block B lands exactly on 33.700 and the dissolve
begins on a settled frame rather than mid-motion.

### Block C — 33.700 → 37.600 (3.900 s) · END CARD
Navy canvas (`--brand-navy`) + the starter's radial bloom, EcomIQ white logo lockup,
flame-orange **"Find out more"** pill. Built from `assets/brand-tokens.css` +
local `RethinkSans.woff2` — no new colours, no new fonts.
VO continues over the card and ends at t = 36.04; card holds 1.56 s of silence after.

## Transitions
Snappy, per brief.
- Inside Block A — the reel's own hard cuts, untouched.
- Block A → B — hard cut (sentence boundary, invisible).
- Inside Block B — hard cuts at native cadence.
- Block B → card — **0.35 s cross-dissolve**, the only dissolve in the piece, on "want".
- Card elements — logo and pill land on a short GSAP stagger inside the first 0.6 s.

## Audio
- **VO**: Sean, source `3.100 → 39.300`, extracted to 48 kHz stereo WAV → AAC on export.
- **Montage audio**: dropped entirely.
- **Music bed**: a silent, duckable placeholder `<audio>` is wired into the composition at
  track 0 for Nate to swap later. Sidechain-style duck already keyed to the VO envelope
  (bed sits −18 dB under speech, returns to −9 dB over the card).

## Deliverables
| Ratio | Composition | Montage master | Output |
|---|---|---|---|
| 9:16 | 1080×1920 | `Showcase Reel.mp4` (1080×1920, native) | `renders/ecomiq-sean-vo-916.mp4` |
| 1:1 | 1080×1080 | `Showcase ad-1-1.mp4` (1440×1440 → 1080×1080) | `renders/ecomiq-sean-vo-square.mp4` |

H.264 High / yuv420p, AAC 192 kbps, `+faststart`, 30 fps CFR.

### Aspect normalisation — resolved, nothing to flag
Each ratio now has a natively-framed montage master, so there is **no scale+pad and no
crop in either export**:

- **9:16** — source is already 1080×1920. Pixel-for-pixel, untouched.
- **1:1** — source is already square; a clean 1440→1080 downscale (integer-friendly 0.75×,
  Lanczos) is the only resampling. The recompose keeps the framing the crop would have
  broken: the *1.3+ Billion requests daily / 99.9% platform uptime* stat card reads in
  full at 1:1, and the wide full-body stage shots keep head and feet.

The end card is authored natively per ratio, so it matches either way.
