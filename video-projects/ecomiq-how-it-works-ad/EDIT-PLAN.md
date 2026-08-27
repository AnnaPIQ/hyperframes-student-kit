# EcomIQ — "How It Works" VO ad · EDIT PLAN

Status: **approved and built.** Both decisions signed off (trim the dead air,
retime the montage to fit). Rendered and frame-verified at all three ratios.
Branch `claude/ecomiq-short-form-ad-8sw5cx`. Slug `ecomiq-how-it-works-ad`.

---

## 1. Sources — pulled and probed

| Role | File | Probe |
|---|---|---|
| SPEAKER (VO + PiP) | `Copy of How it works version 2 .mov` (Drive `1GOok…WOR`) | ProRes 422 Standard, **3840×2160, 25 fps**, yuv422p10le, 79.000 s, PCM s24be 48 kHz stereo, 4.67 GB |
| MONTAGE 9:16 | `Showcase Reel.mp4` (Drive `1SsgE…NWwl`) | H.264 Main, **1080×1920**, 30 fps, yuv420p, 891 frames, 29.721 s |
| MONTAGE 1:1 | `Showcase ad-1-1.mp4` (Drive `1CJF1…Q3zk`) | H.264 Main, **1440×1440**, 30 fps, yuv420p, 891 frames, 29.721 s |

All three downloaded byte-complete (sizes match Drive metadata exactly).

### Cut lists — confirmed identical
`select='gt(scene,0.25)',showinfo` on both montage masters returns the **same 37
timestamps to the millisecond**, and both are 891 frames / 29.721 s:

```
0.567 1.100 1.667 2.300 2.900 3.400 4.100 4.967 5.600 6.367 7.033 7.600 8.367
9.067 9.967 10.867 11.733 12.367 13.167 13.867 14.667 14.833 15.600 16.433
17.067 18.033 19.033 19.967 20.900 22.033 22.833 23.633 24.600 25.500 26.333
26.867 27.733
```

**One timestamp set drives every ratio.** Confirmed as step 1 required.

### ⚠️ The montage already contains its own end card
The last cut at **27.733 s** is not a shot change — it is the master's own baked
outro: navy ground, white EcomIQ lockup, flame pill reading **"Click The Link
Below"**, running 27.733 → 29.721 s (1.988 s), then black.

That is a near-duplicate of the end card this ad is supposed to build. Retiming the
full 29.721 s would stretch it to ~5 s and park a *second, differently-worded* end
card in the middle of the ad, immediately before ours.

**Decision (needs your nod):** treat the montage's live picture as **0 → 27.733 s**
(37 shots) and drop the master's baked card. Still exactly one pass, no loop, no
reprise — just not inheriting a competing card.

---

## 2. VO — transcribed and verified

### The transcript timings you pasted are ~1.5–1.8 s late, and Whisper's are worse
- Your pasted transcript puts the closing line at **1:15**. Speech in the file
  demonstrably **ends at 74.782 s** — that line cannot start at 75 s.
- `hyperframes transcribe --model small.en` returns the right *words* but
  **fabricated word timings**: its 245-word list contains **one** gap ≥ 0.30 s,
  while the audio has **nineteen**. It also reported `durationSeconds: 75` for a
  79.000 s file and placed the first word at 0.00 s when speech starts at 2.054 s.

So neither timing source is usable. I anchored to `silencedetect=noise=-34dB:d=0.30`
and then transcribed **each isolated speech run separately** — short clips align
reliably even when the full-file pass smears. That is the verified map below.

### Verified beat map (19 speech runs, source timebase)

| # | in → out | dur | line |
|--:|---|--:|---|
| 1 | 2.054 → 14.560 | 12.506 | Most e-commerce coaching agencies are just one person, and they're giving you their personal opinion based on the time that they once worked at another DTC brand 5 to 10 years ago. And this is why we've created EcomIQ, and this is why it works differently. |
| 2 | 15.393 → 22.099 | 6.706 | It's the coach arm of a Shopify Premier Partner, an agency that's been around for over 10 years and worked with some of the biggest brands in the world. |
| 3 | 22.556 → 26.212 | 3.656 | So you're not just getting one person's take, you're getting an entire team's… |
| 4 | 26.734 → 27.449 | 0.715 | …knowledge and experience… |
| 5 | 27.811 → 30.861 | 3.050 | …that's worked across eight and nine figure brands… |
| 6 | 31.394 → 32.390 | 0.996 | …for their entire career. |
| 7 | 33.342 → 34.344 | 1.002 | And here is how it works. |
| 8 | 34.699 → 38.468 | 3.769 | You'll start with a strategy session with your lead coach. They will map out with you… |
| 9 | 39.105 → 41.027 | 1.922 | …what they think is holding your growth back… |
| 10 | 41.506 → 43.004 | 1.498 | …and work on a plan to resolve it. |
| 11 | 43.613 → 49.729 | 6.116 | You'll get two specialist one-on-one calls each month that teach you the right move and hold you to actually doing it. |
| 12 | 50.327 → 53.246 | 2.919 | Plus, on top of that, you get access to our Slack support channel… |
| 13 | 53.813 → 56.286 | 2.473 | …and a community of founders that are all doing the same thing. |
| 14 | 56.818 → 61.671 | 4.853 | Now remember, every single strategy we deliver to you is pulled from real client work. |
| 15 | 62.050 → 62.976 | 0.926 | Pacific IQ… |
| 16 | 63.429 → 65.089 | 1.660 | …the eight and nine figure brand agency. |
| 17 | 65.760 → 70.060 | 4.300 | So would you prefer the opinion of just one person, or would you prefer the opinion… |
| 18 | 70.435 → 72.610 | 2.175 | …of an entire team with a proven track record? |
| **19** | **73.291 → 74.790** | **1.499** | **"Tap the link below and book a call."** ← end-card trigger |

Speech: 2.054 → 74.782 s. Trailing dead air: 74.782 → 79.000 (4.218 s).

### Trigger line timestamp — the number you asked for

> **"Tap the link below and book a call." begins at `73.291 s` in the source file.**

You left the trigger line as a placeholder; this is the only line in the VO that
reads as a card cue, so I nominated it. Say the word if you want the card earlier —
the obvious alternative is the closing question at **65.760 s**, which would give a
13 s card and lose the b-roll under the strongest argument in the script.

---

## 3. Two decisions I need you to confirm

### (a) Trim the silence off the head of the VO — **approved**
The file opened on 2 s of nothing. On paid social that's the whole hook window, so
the VO starts **1.931 s** in and speech lands at **0.198 s**.

**Corrected during the build:** the plan first said 1.854 s. `speaker-raw.mov` has
its **audio stream starting at PTS 0.074563** (`start_pts=3579 @ 1/48000`) while the
video starts at 0. Every transcript timing was measured off a straight `-vn` WAV
dump, which discards that offset — so transcript time *t* is .mov audio PTS
*t + 0.074563*. Trimming 1.854 s on the PTS timeline left the trigger line 2 frames
late (measured at 71.510 s, not 71.433 s). Both trims now run on the .mov PTS
timeline at **1.931063 s**, which keeps A/V locked exactly as the source has it and
puts the trigger line at **71.4333 s — verified in the delivered audio.**

### (b) The montage is cut for a 30 s ad and the VO is 76 s — retime is heavy
27.733 s of live picture has to cover 71.433 s. That's **2.576× uniform**, i.e.
0.388× speed, on handheld footage of people walking. Uniformly applied it is
syrupy and fights the "snappy" brief.

**Recommended: per-shot variable retime.** I measured motion energy per shot
(mean `signalstats.YDIF` over each of the 37 shots — range 0.20 to 14.66) and
allocated stretch inversely: near-static shots absorb the slack, moving shots stay
closer to native. Clamped to **1.75×–3.90×**, solved so the 37 shots sum to exactly
71.433 s.

- Output shot length: 0.29 s min, 3.53 s max, **1.93 s average** — on the
  `MOTION_PHILOSOPHY` ~1.5 s target rather than far off it.
- Speed range 0.256×–0.571×; the deepest slow-mo lands only on shots with almost
  no motion to betray it.
- Still one pass, in order, no shot reprised.

**The honest fix is more footage.** If a longer montage master exists, hand it over
and the retime drops toward native. I'm not going to reprise shots to fill — you
already saw that fail.

---

## 4. Timeline (30 fps CFR, assumes decision (a) = yes)

```
 t=0                                                      CARD          END
 |────────── montage, ONCE, per-shot retime, 71.433s ──────|── end card ─|
 |  brand bug top-left · speaker PiP top-right             |  VO runs on |
 0.000                                              71.083 71.433   76.433
                                                     └ 0.35s dissolve
```

| Event | Time | Frame | Note |
|---|--:|--:|---|
| Montage in | 0.000 | 0 | shot 0, hard cut in |
| Brand bug + PiP fade in | 0.000 → 0.400 | 0–12 | both, together, inside first 0.5 s |
| VO speech starts | 0.198 | 6 | after head trim |
| 36 hard cuts | per §5 table | | no dissolves, no whips |
| **Dissolve to end card starts** | **71.083** | 2132 | 0.35 s, over the 0.681 s silence gap |
| **End card fully up** | **71.433** | 2143 | resolves exactly as "Tap" hits |
| Bug + PiP gone | 71.433 | 2143 | covered by the card |
| VO speech ends | 72.928 | 2188 | card holds on |
| END | **76.433** | 2293 | card hold 5.000 s |

- **Total runtime 76.433 s** (2293 frames @ 30 fps).
- Exactly **one** dissolve in the whole ad — into the card. Everything else hard cut.
- Card hold 5.000 s, inside `MOTION_PHILOSOPHY`'s 4–6 s outro window.
- 3.505 s of the card runs over VO silence; the trigger line covers the first 1.495 s.

---

## 5. Per-shot retime table (montage, 9:16 timebase — same for every ratio)

Solved: clamp 1.75×–3.90×, weight `1/(YDIF+1.2)^0.55`, sum = 71.433 s exactly.

| # | src in → out | src dur | motion (YDIF) | stretch | out dur | out in → out |
|--:|---|--:|--:|--:|--:|---|
| 0 | 0.000 → 0.567 | 0.567 | 6.09 | 2.01× | 1.141 | 0.000 → 1.141 |
| 1 | 0.567 → 1.100 | 0.533 | 0.25 | 3.90× | 2.079 | 1.141 → 3.220 |
| 2 | 1.100 → 1.667 | 0.567 | 2.10 | 3.11× | 1.765 | 3.220 → 4.986 |
| 3 | 1.667 → 2.300 | 0.633 | 8.83 | 1.75× | 1.108 | 4.986 → 6.093 |
| 4 | 2.300 → 2.900 | 0.600 | 0.20 | 3.90× | 2.340 | 6.093 → 8.433 |
| 5 | 2.900 → 3.400 | 0.500 | 0.83 | 3.90× | 1.950 | 8.433 → 10.383 |
| 6 | 3.400 → 4.100 | 0.700 | 6.23 | 1.99× | 1.395 | 10.383 → 11.778 |
| 7 | 4.100 → 4.967 | 0.867 | 3.26 | 2.64× | 2.287 | 11.778 → 14.065 |
| 8 | 4.967 → 5.600 | 0.633 | 9.37 | 1.75× | 1.108 | 14.065 → 15.173 |
| 9 | 5.600 → 6.367 | 0.767 | 3.29 | 2.63× | 2.016 | 15.173 → 17.189 |
| 10 | 6.367 → 7.033 | 0.666 | 2.89 | 2.77× | 1.843 | 17.189 → 19.031 |
| 11 | 7.033 → 7.600 | 0.567 | 1.68 | 3.36× | 1.903 | 19.031 → 20.934 |
| 12 | 7.600 → 8.367 | 0.767 | 4.89 | 2.22× | 1.705 | 20.934 → 22.639 |
| 13 | 8.367 → 9.067 | 0.700 | 2.74 | 2.82× | 1.977 | 22.639 → 24.615 |
| 14 | 9.067 → 9.967 | 0.900 | 4.45 | 2.32× | 2.085 | 24.615 → 26.700 |
| 15 | 9.967 → 10.867 | 0.900 | 7.01 | 1.89× | 1.697 | 26.700 → 28.397 |
| 16 | 10.867 → 11.733 | 0.866 | 5.00 | 2.20× | 1.906 | 28.397 → 30.303 |
| 17 | 11.733 → 12.367 | 0.634 | 2.24 | 3.04× | 1.929 | 30.303 → 32.232 |
| 18 | 12.367 → 13.167 | 0.800 | 2.16 | 3.08× | 2.466 | 32.232 → 34.699 |
| 19 | 13.167 → 13.867 | 0.700 | 5.12 | 2.18× | 1.524 | 34.699 → 36.223 |
| 20 | 13.867 → 14.667 | 0.800 | 10.50 | 1.75× | 1.400 | 36.223 → 37.623 |
| 21 | 14.667 → 14.833 | 0.166 | 14.47 | 1.75× | 0.290 | 37.623 → 37.913 |
| 22 | 14.833 → 15.600 | 0.767 | 2.61 | 2.88× | 2.206 | 37.913 → 40.120 |
| 23 | 15.600 → 16.433 | 0.833 | 0.73 | 3.90× | 3.249 | 40.120 → 43.369 |
| 24 | 16.433 → 17.067 | 0.634 | 0.63 | 3.90× | 2.473 | 43.369 → 45.841 |
| 25 | 17.067 → 18.033 | 0.966 | 6.08 | 2.01× | 1.946 | 45.841 → 47.788 |
| 26 | 18.033 → 19.033 | 1.000 | 1.42 | 3.53× | 3.535 | 47.788 → 51.322 |
| 27 | 19.033 → 19.967 | 0.934 | 3.67 | 2.51× | 2.348 | 51.322 → 53.670 |
| 28 | 19.967 → 20.900 | 0.933 | 2.95 | 2.74× | 2.561 | 53.670 → 56.230 |
| 29 | 20.900 → 22.033 | 1.133 | 6.43 | 1.96× | 2.225 | 56.230 → 58.455 |
| 30 | 22.033 → 22.833 | 0.800 | 8.01 | 1.75× | 1.400 | 58.455 → 59.855 |
| 31 | 22.833 → 23.633 | 0.800 | 1.21 | 3.70× | 2.961 | 59.855 → 62.816 |
| 32 | 23.633 → 24.600 | 0.967 | 6.37 | 1.97× | 1.907 | 62.816 → 64.722 |
| 33 | 24.600 → 25.500 | 0.900 | 6.14 | 2.01× | 1.805 | 64.722 → 66.528 |
| 34 | 25.500 → 26.333 | 0.833 | 14.66 | 1.75× | 1.458 | 66.528 → 67.985 |
| 35 | 26.333 → 26.867 | 0.534 | 3.56 | 2.55× | 1.359 | 67.985 → 69.344 |
| 36 | 26.867 → 27.733 | 0.866 | 4.05 | 2.41× | 2.088 | 69.344 → 71.433 |

---

## 6. Overlays

Brand bug and PiP share a **top offset of 5.2 % of frame height** so they read as a
pair. Both fade in 0.00 → 0.40 s, both die under the card at 71.433 s.

| Ratio | Frame | Bug width | PiP ø | Top offset | Side inset |
|---|---|--:|--:|--:|--:|
| 9:16 | 1080×1920 | 260 px | 240 px | 100 px | 56 px |
| 1:1 | 1080×1080 | 240 px | 220 px | 56 px | 52 px |
| 4:5 | 1080×1350 | 250 px | 230 px | 70 px | 54 px |

Only these numbers change between ratios — same timeline, same card.

- **Brand bug:** `ecomiq-logo-white.svg`, top-left. No box, no shadow.
- **Speaker PiP:** top-right, circular, 3 px `--brand-white` @ 55 % ring.
  Never full frame, never moves, never resized mid-ad.

### PiP crop — verified
Speaker sits centre-frame, head in the upper third. Crop
`crop=1320:1320:1140:190` off the 4K plate gives head-and-shoulders with the mic in
shot. Checked at t = 3, 12, 25, 38, 50, 62, 74 s — head stays inside the circle at
every one, including his widest gestures.

**25 → 30 fps:** the speaker plate is 25 fps and the deliverable is 30 fps CFR, so
the PiP is conformed with `fps=30` (duplication, no retiming — duration and lip-sync
preserved). The montage is already 30 fps.

---

## 7. End card

Navy ground `--brand-navy #06284C`. Centred stack:

1. `ecomiq-logo-white.svg`, 46 % frame width
2. flame rule — 2 px × 120 px, `--brand-flame #FF4C32`, 34 px under the lockup
3. flame pill — `--brand-flame` fill, white label **"Find out more →"**

One face (Rethink Sans), one weight (700), no italics, no second line — as briefed.
Pill and rule ride in on the dissolve; nothing animates after 71.8 s so the card
sits still for its hold.

---

## 8. Audio

| Track | Source | Level |
|---|---|---|
| VO | speaker plate, PCM 24-bit 48 kHz → mono | 0 dB, spine of the edit |
| Montage audio | — | **discarded entirely** (`--mute` on every picture bed) |
| Music | `assets/music-bed.wav` — **silent placeholder** | `data-volume="0"` |

`music-bed.wav` is wired in at zero with the duck targets noted in the composition
comments: **0.13 under speech, 0.35 over the card.** Drop a real bed in at that path
and the only edit is `data-volume`.

VO gets a 120 ms fade-in at 0.000 and a 400 ms fade-out landing on 76.433.

**No captions** — none authored in any ratio.

---

## 9. Ratios

| Ratio | Size | Entry | Picture source |
|---|---|---|---|
| 9:16 | 1080×1920 | `index.html` | 9:16 master, native |
| 1:1 | 1080×1080 | `compositions/square.html` | 1:1 master, scaled 1440→1080 |
| 4:5 | 1080×1350 | `compositions/meta45.html` | **derived — see below** |

### ⚠️ There is no native 4:5 master
Two options, both lossy:
- crop the 9:16 master to 1080×1350 → loses **29.7 % of height**
- scale the 1:1 master to 1350 tall and centre-crop to 1080 wide → loses **20 % of width**

**Taking the second** — less material discarded, and the 1:1 master is already framed
centre-safe. Flagging it because it is a derivation, not a supplied master. A native
4:5 export of the montage would beat it.

### ⚠️ The montage carries the speaker in two of its own shots
Verified by pulling one frame per shot for all 37:

- **Shot 23** (on screen **40.100 → 43.367 s**) is a pale UI screen recording with
  the master's **own circular headshot inset** in the middle of frame. For those
  3.3 s there are two circular speaker insets on screen — mine top right, the
  master's centre. Nothing in the composition can remove it; it is baked into the
  montage.
- **Shot 24** (**43.367 → 45.833 s**) is a stacked pair of rectangular talking-head
  windows. Less of a clash, but the speaker is in the picture there too.

Left as-is because the brief has the PiP riding along for the whole montage. Say the
word and I can duck the PiP out across shot 23 — it costs one extra fade in each
ratio, though it breaks the "speaker rides along" continuity.

Shot 23 is also where the white brand bug was hardest to read, which is why the bug
now carries a soft drop-shadow (no box).

---

## 10. Delivery

`--quality high`, per ratio, native size:

- H.264 **High** profile, **yuv420p**
- **AAC 48 kHz**
- **`+faststart`**
- **30 fps CFR**

2× exports (2160×3840 / 2160×2160 / 2160×2700) on request — not built by default.

**Upload size:** three 76 s 1080p files at `high` will likely exceed the chat upload
limit. I'll report paths and sizes and tell you plainly if a file is too big to
attach, rather than quietly sending a squashed copy.

---

## 11. Build order once approved

1. `scripts/build-assets.sh` — VO bed, 3 × retimed picture beds (37-segment
   per-shot concat), PiP plate, silent music bed
2. Author `index.html`, `compositions/square.html`, `compositions/meta45.html`
3. `npx hyperframes lint` — clean
4. Draft render → frame-grab across the whole timeline → `Read` every frame
5. `--quality high` × 3
6. Commit compositions + scripts + docs; append lessons to `docs/LESSONS.md`
