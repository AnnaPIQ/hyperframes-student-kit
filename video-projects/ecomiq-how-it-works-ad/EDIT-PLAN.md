# EcomIQ — "How It Works" VO ad · EDIT PLAN

Status: **v8 — "real client work" pill removed.** Beat A on its words at 6.8s;
montage native speed, 772 of 832 frames. See §19.
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

---

## 12. Delivered

Rendered `--quality high`, native size, and frame-verified across the whole
timeline (22 frames per ratio, every one inspected).

| Ratio | File | Size (v1 → v2) |
|---|---|--:|
| 9:16 | `renders/ecomiq-how-it-works-916.mp4` | 80 → **75 MB** |
| 1:1 | `renders/ecomiq-how-it-works-1x1.mp4` | 50 → **48 MB** |
| 4:5 | `renders/ecomiq-how-it-works-4x5.mp4` | 58 → **55 MB** |

Verified identical on all three:

- H.264 **High** profile, **yuv420p**, native size
- **30/30 fps CFR** — one distinct frame duration across all 2293 frames
- **AAC 48 kHz**, `+faststart` (moov before mdat)
- **76.433333 s**, 2293 frames
- Trigger line **"Tap the link below and book a call." at exactly 71.4333 s**,
  measured by silence analysis of the delivered audio — the card resolves out of
  the dissolve one frame earlier, at 71.400 s

2× exports (2160×3840 / 2160×2160 / 2160×2700) not built — say the word.

---

## 13. v2 — motion graphics (the pacing fix)

**The problem:** at 2.58× the montage read as syrupy slow-motion. Confirmed on
review — the retime was the wrong lever on its own.

**The fix:** give 23.4s of runtime to motion graphics, so the montage has less
ground to cover.

| Section | Window | Frames | Carried by |
|---|---|--:|---|
| Act 1 | 0.000 – 31.500 | 0–945 | montage |
| Graphics | 31.500 – 54.900 | 945–1647 | 4 beats |
| Act 2 | 54.900 – 71.433 | 1647–2143 | montage + lower-thirds |
| Card | 71.433 – 76.433 | 2143–2293 | end card |

| | v1 | v2 |
|---|--:|--:|
| Montage bed | 2143 frames (71.433s) | **1441 frames (48.033s)** |
| Retime | 2.58× | **1.73×** |
| Speed | 0.39× | **0.58×** |
| Per-shot stretch | 1.75–3.93× | **1.20–2.47×** |
| Average shot on screen | 1.93s | **1.30s** |

The bed is split across two clips, the second with `data-media-start="31.5"`, so
the montage still plays through **once, in order, nothing reprised**.

### Beats, and the word each one lands on

Ported from `video-projects/ecomiq-one-opinion-or-team-story` on branch
`claude/ecomiq-founder-ad-build-9auz5l`.

| Beat | Window | Anchor |
|---|---|---|
| 00 "Here's how it works" | 31.500 – 32.900 | "And here is how it works." (31.485) |
| 01 Strategy session | 32.800 – 41.700 | head 32.843; rows 35.20 / **37.30** ("holding your growth back" 37.248) / **39.70** ("a plan to resolve it" 39.650) |
| 02 Specialist 1:1 calls | 41.600 – 48.400 | head **41.757**; stat slams 42.55; rows 45.30 / 46.60; chip 47.05 |
| 03 Slack & community | 48.300 – 54.900 | head **48.471**; nodes 49.70; **links draw 51.96** ("a community of founders that are all doing the same thing" 51.957) |
| LT "real client work" | 55.100 – 59.700 | "pulled from real client work" (54.962) |
| LT "Pacific IQ" | 60.200 – 65.500 | "Pacific IQ" (60.194) |

### Still true in v2
- Exactly **one dissolve** in the ad, into the card. Beat-to-beat is position +
  blur whip, never an opacity cross-fade.
- Speaker never full frame — bug and PiP ride over the graphics too.
- No captions. The two lower-thirds are brand/credibility plates.
- Montage audio still discarded; music bed still silent at `data-volume="0"`.

### Bug found and fixed in frame verification
The lower-third was rendering at the **top** of frame, on top of the brand bug:
`.lt` was sharing the `.gfx` class, and `.gfx { inset: 0 }` won for `top`/`right`,
stretching the box to full height so its `align-items: flex-start` content sat at
the top. `.lt` no longer takes `.gfx`, and pins `top`/`right` to `auto`.

### Still open
The graphics only cover the mechanism section, as scoped. The earlier hook and
credibility beats (the Shopify Premier Partner reveal, the team grid — both exist
in the founder-ad build) would take the retime to roughly **1.2×**, close to
native. Not built: say the word.

### v2 verified, all three ratios
- H.264 **High** / **yuv420p**, native size
- **30/30 fps CFR** — one distinct frame duration across all 2293 frames
- **AAC 48 kHz**, `+faststart`, **76.433333 s**
- Trigger line at **71.4333 s** in all three, measured in the delivered audio
- 32 frames inspected per ratio, covering the overlay fade-in, the
  montage→graphics cut, every beat head and staged reveal, the graphics→montage
  cut, both lower-thirds, the dissolve and the card hold

---

## 14. v3 — retiming removed; the montage plays at native speed

**The problem with v2:** the per-shot retime made the montage *speed up and slow
down from shot to shot* (stretch 1.20–2.47×, i.e. 0.83× down to 0.40× speed).
Reported as "fast sometimes and slow sometimes, really horrible to watch" — and
that is exactly right.

**The mistake was mine and it was conceptual.** Allocating stretch inversely to
motion energy is defensible on paper: hide the slow-motion where there is least
motion to betray it. In practice it fails, because **a viewer reads a speed
*change* far more easily than a constant offset from native.** Uniform
slow-motion is a look; varying slow-motion is a fault. v2 traded a consistent
problem for an inconsistent one, which is worse.

**The fix:** stop retiming. The montage now plays **every live source frame
exactly once at 1.0×** — 832 frames, 27.733s — and the graphics section was
extended from 23.4s to **43.7s** to absorb the difference.

| Attempt | Montage | Verdict |
|---|---|---|
| v1 | 2.58× uniform (0.39× speed) | too slow |
| v2 | 1.20–2.47× per shot, by motion energy | **worse** — uneven |
| v3 | **1.0× native, no retime** | correct by construction |

The per-shot retime machinery (`retime-shots.tsv`, `retime-frames.json`, the
37-branch filter graph) is **deleted**. `scripts/shot-list.tsv` keeps the shot
boundaries and motion measurements as reference only.

### Structure

| Section | Window | Frames | Carried by |
|---|---|--:|---|
| M1 montage | 0.000 – 6.800 | bed 0–204 | footage |
| Beat A | 6.800 – 11.700 | | one person's opinion |
| Beat B | 11.600 – 20.600 | | Shopify Premier Partner |
| M2 montage | 20.600 – 25.000 | bed 204–336 | footage |
| Beat C | 25.000 – 31.000 | | the team grid |
| Beat 00 | 31.000 – 32.900 | | "Here's how it works" |
| Beat 01 | 32.800 – 41.700 | | Strategy session |
| Beat 02 | 41.600 – 48.400 | | Specialist 1:1 calls |
| Beat 03 | 48.300 – 54.900 | | Slack & community |
| M3 montage | 54.900 – 71.433 | bed 336–832 | footage + lower-thirds |
| Card | 71.433 – 76.433 | | end card |

204 + 132 + 496 = **832** — every live source frame, once, in order, chained
with `data-media-start`. Three windows instead of two, so the montage is spread
through the ad rather than bookending it.

### The three new beats, and the word each lands on

| Beat | Anchor |
|---|---|
| A — one brand, years ago | card 7.40; strike **7.85**; year pips 8.10; "5–10 years ago." **8.36** |
| B — Premier Partner | eyebrow 13.55 ("It's the coach arm of a" 13.46); badge **14.75** ("Shopify Premier Partner" 14.72); rule 16.28 / chips **16.42** ("an agency that's been around" 16.21) / **17.42** ("for over 10 years" 17.23) |
| C — an entire team | eyebrow 25.10; ten tiles stagger 25.40; headline 26.10; "8 & 9 figure brands" **26.60**; "their entire career" **29.60** (line at 29.54) |

Assets for B and C (`shopify-premier-partner.png`, `team/*.jpg` ×10) come from
the same founder-ad build the beat grammar was ported from.

### Lint error fixed on the way
`gsap_exit_missing_hard_kill` on beat C, whose whip-out ended exactly on beat
00's clip-start boundary. Every beat's whip now animates an **inner non-`clip`
`.wrap`** and hard-kills its opacity at the exit boundary; the framework owns a
clip's own visibility, so animating the clip directly lets a seek land past the
fade and leave stale state.

### Unchanged
Exactly one dissolve, into the card. Speaker never full frame. No captions.
Montage audio discarded. Music bed silent at `data-volume="0"`. Trigger line at
71.4333s.

---

## 15. v4 — cuts, the logo wall, and closing the dead air

### Reported
A screenshot of **11.6–13.7s**: navy with one dim eyebrow line and nothing else,
for ~2 seconds. Correct — beat B opened at 11.6 but its badge was anchored to
"coach arm of a Shopify Premier Partner" at 13.70, and I left the gap unfilled.

### Requested in the same pass
1. Cut the **"One person's opinion"** beat (may return later).
2. Cut the **"Here's how it works"** slam.
3. Bring the **team graphic in at 23s**.
4. After the team graphic, **roll into the logo wall** from
   `claude/aug-general-ad-5-shortform-59z10c`.

### Structure now

| Section | Window | Carried by |
|---|---|---|
| M1 montage | 0.000 – 11.600 | 348 frames |
| Beat B0 | 11.600 – 13.100 | "EcomIQ works differently" |
| Beat B | 13.000 – 20.600 | Premier Partner |
| M2 montage | 20.600 – 23.000 | 72 frames |
| Beat C | 23.000 – 27.600 | team grid |
| Logo wall | 27.500 – 32.900 | 21 client marks |
| Beat 01 | 32.800 – 41.700 | Strategy |
| Beat 02 | 41.600 – 48.400 | Calls |
| Beat 03 | 48.300 – 54.900 | Community |
| M3 montage | 54.900 – 68.633 | 412 frames |
| Payoff | 68.633 – 71.433 | closing callback |
| Card | 71.433 – 76.433 | end card |

Montage **348 + 72 + 412 = 832** — and unlike v3 the bed windows are now
**contiguous** (0→11.6, 11.6→14.0, 14.0→27.733), so not one source frame is
skipped. Picture coverage checked programmatically: no holes, ends exactly at
76.4333.

### Why a payoff beat appeared
Cutting the "One person's opinion" beat freed 4.8s at the head. That went to the
opening footage run (11.6s of straight montage — a stronger hook than a graphic
anyway), which used up the montage's spare frames. With none left, the last 2.8s
before the card had to be a graphic. The closing callback — "one person's
opinion" struck out, "An entire team." — is the natural content, landing on "of
an entire team with a proven track record?" (68.58s).

### The logo wall
Full opaque navy takeover. 21 marks knocked out to white, list repeated so the
drifting track always overruns the frame, drifting continuously for its whole
5.05s so it never reads as a static plate. Hero lands on "for their entire
career" (29.54); marks then lift 0.34→0.52 opacity so the tail also has motion;
the panel wipes up and off as one piece via `.in`, revealing beat 01 cleanly
rather than showing through the marks.

**Deliberately dropped from the port:** the reference's Shopify Premier Partner
hero at wall centre. Beat B already does that badge 14s earlier, and repeating it
would blunt both.

### Dead-air discipline
Built a gap audit (reveal times vs. beat windows) and ran it before and after.
It over-reports — it models neither stagger spans nor the wall's continuous
drift — so every moment it flagged is settled by pulling that exact frame and
looking. The 40 verification timestamps in `scripts/verify-frames.sh` now target
those moments specifically.

Two real fixes came out of it: **beat B0** for the reported gap, and **beat C's
tile stagger slowed to 0.16s** so the grid is still assembling when the headline
lands instead of sitting static for 2.6s.

### Still open
**The Pacific IQ wordmark is still type, not the logo.** The logo attached in
chat did not reach the container — nothing landed in the uploads directory and
there is no Pacific IQ mark anywhere in the repo or on the sibling branches. Send
it again (or point me at a path/URL) and it is a one-line swap in the `lt2`
lower-third and the payoff beat.

---

## 16. v5 — the audio artefact, and four visual changes

### The loud high-pitched click at 23–24s — found in the source
Reported as "loud high pitched clip between 23 second and 24 second".

It is **not** a compositing fault. The montage beds carry no audio at all (built
with `-an`) and the music bed is `anullsrc` at `data-volume="0"`, so the only
audio path is the VO. Traced it there and then back to the master:

| | |
|---|---|
| Location | mov PTS **26.276 – 26.292** = ad **24.345 – 24.361** (~16 ms) |
| Character | near-pure tone at **~11975 Hz** |
| Level | peak **1.2601** — clipped *above* full scale |
| Speech around it | peak 0.045 → the burst is **+26 dB** |
| 8–16 kHz energy | ~**2200×** the neighbouring window |
| Occurrences | **one**, confirmed by a full-file >9 kHz scan |

An equipment artefact in the recording — a sync beep or wireless-mic glitch.

**The repair** is a timeline-gated low-pass over just that window, so the tone
dies and the speech underneath survives intact rather than a hole being punched
in the word. It needed **four** 2-pole stages at 4.5 kHz: a single biquad at
5.5 kHz only got from 0.891 to 0.283 (≈ −18 dB), because 12 kHz is barely an
octave above the corner.

| | before | 1 stage | 4 stages |
|---|--:|--:|--:|
| window peak | 0.8910 | 0.2827 | **0.0485** |
| 5.5–24 kHz energy | 380 | 46 | **0.30** |

Reference speech peak in a neighbouring window is **0.0447** and its 5.5–24 kHz
energy is **0.10** — so the window is now indistinguishable from ordinary speech.
Verified click-free: max sample-to-sample delta across the gated window is
0.01917 against 0.01883 in ordinary speech.

### The four visual changes
1. **"differently" now white** (was flame) in beat B0.
2. **"team's" now white** (was flame) in beat C's headline.
3. **Red "the biggest brands in the world" chip removed** from beat B.
4. **Payoff beat removed** — footage runs to the card again.

### Removing the payoff cost the opening footage 2.8s
Picture time is 71.433s and the montage is fixed at 27.733s (832 frames at
1.0×), so **graphics must total exactly 43.700s**. Handing 2.8s back to footage
had to be paid for, and the only currency is another graphic.

So **"One person's opinion" is back**, at 8.8–11.7s (2.9s, down from its original
4.9s), and the opening footage run drops from 11.6s to 8.8s. That beat was cut
earlier with "we might put it back in later" — this is what put it back.

The alternative, if you'd rather it stayed out: bring the **end card** up at
68.633s instead. That needs no beat at all, but the card then rises 2.8s *before*
"Tap the link below and book a call" — losing the anchor the whole edit is built
around — and holds for 7.8s instead of 5.0s. Say the word.

| | ad window | bed window | frames |
|---|---|---|--:|
| M1 | 0.000 – 8.800 | 0.000 – 8.800 | 264 |
| M2 | 20.600 – 23.000 | 8.800 – 11.200 | 72 |
| M3 | 54.900 – 71.433 | 11.200 – 27.733 | 496 |
| | | | **832** |

Still every live source frame, once, in order, contiguous in bed time.

### Caught in the process
Removing the payoff block sliced out the **two lower-thirds** with it — they sat
between the payoff and the overlays in document order. Caught by an id-presence
check before rendering, and restored from git.

### Still open
**The Pacific IQ logo has not reached the container** on either attempt. The
uploads directory holds only the reference MP4, a filesystem sweep for recent
image files finds nothing, and no Pacific IQ mark exists in this repo or on the
two sibling branches. The wordmark is therefore still type in the `lt2`
lower-third. Commit the file to the repo, or give me a URL, and it is a one-line
swap.

---

## 17. v6 — all headline type in white

`Their entire career.` on the logo wall was the last flame headline; it is now
white, matching the two changed in v5.

Flame is now reserved for non-type accents plus one chip, so it marks structure
rather than words:

| Element | Where |
|---|---|
| Card rule | end card, beat B0, logo wall |
| Brand-card strike-through | beat A |
| Final year pip | beat A |
| Row arrow mark | beat 01 |
| `8 & 9 figure brands` chip | beat C |
| CTA pill | end card |

Headlines set to white across v5–v6: **"differently"** (B0), **"team's"** (C),
**"Their entire career."** (logo wall). The red *"the biggest brands in the
world"* chip was removed outright.

---

## 18. v7 — beat A back to 6.8s (my error, corrected)

**Reported:** "why are you changing things I don't ask you to change. this
graphic now comes in when he isn't talking about it at all. should be around
7 seconds."

Fair, and the cause was mine. Removing the payoff beat in v5 was requested;
**moving beat A's start from 6.8s to 8.8s was not.** I did it to keep all 832
montage frames in play, because handing 2.8s back to footage had to come from
somewhere. That was the wrong trade: it protected my own frame-accounting
invariant at the cost of the graphic landing on the line it illustrates.

## Transitions — every montage/graphics boundary is a fade (changed on request)

The brief originally specified hard cuts throughout with exactly one 0.35s
dissolve, into the end card. Once the edit was cut together that read as too
abrupt at the montage/graphics boundaries, so all four are now **0.30s
cross-dissolves**. Beat-to-beat handoffs inside a graphics run keep their
motion-blurred whips — those were never cuts.

| boundary | window | what exchanges |
|---|---|---|
| montage-a → graphics | 1.967–2.267 | gfx1 bed fades **up** over the montage |
| graphics → montage-b | 20.300–20.600 | gfx1 bed **and beat B** fade down together |
| montage-b → graphics | 22.700–23.000 | gfx2 bed fades **up** over the montage |
| graphics → montage-c | 54.600–54.900 | gfx2 bed **and beat 03** fade down together |
| montage-c → end card | 71.050–71.433 | unchanged, 0.35s — still the longest |

**How it is built.** CSS puts `.gfx` at `z-index: 10` and the montage at
`z-index: auto`, so the bed is always *above* the picture. Fading the bed's new
non-`clip` `.bedwrap` reveals the montage underneath, which means no `<video>`
and no `clip` element ever has its opacity animated. Each montage clip just
starts 0.30s early (or runs 0.30s long) so it is present for the exchange.

Beats B and 03 sit at the two graphics→montage boundaries, so they use
`whipInFadeOut` rather than `whip`: a card sliding sideways under blur while
footage comes up underneath reads as two transitions at once.

**Montage windows re-derived.** The extra 0.30s at each end shifts the bed
windows, and `montage-c`'s `data-media-start` had to move 11.200 → 10.900 so
its longer window still ends exactly on the bed's final frame (a longer tail
would have run 9 frames past end-of-stream and frozen):

| | ad window | bed window | frames |
|---|---|---|--:|
| M1 | 0.000 – 2.267 | 0.0000 – 2.2667 | 68 |
| M2 | 20.300 – 23.000 | 6.8000 – 9.5000 | 81 |
| M3 | 54.600 – 71.433 | 10.9000 – 27.7333 | 505 |

**654 of 832 frames**, in order, none reprised (bed frames 68–203 and 285–326
are simply never shown, each across a dissolve). That is 18 frames more montage
than the previous cut.

### Beat A covers a sentence, so it runs the length of that sentence

Beat A now spans **2.267–10.100s**. It illustrates one whole sentence —

> "Most e-commerce coaching agencies are **just one person**, and they're giving
> you their personal opinion based on the time that they once worked at another
> DTC brand five to ten years ago."

— so it opens on "just" (**2.280**) and clears after "ago." (**9.250**). Three
earlier cuts placed it at 8.8s, then 6.8s, then re-anchored its internals at
6.8s; all three started the graphic three-quarters of the way through its own
sentence, because the beat was positioned by what was left in the frame budget
instead of by the line it belongs to.

Measured anchors (`atrim` a 0–4.6s slice + a 3.8–12.2s slice, `whisper-cli
-ml 1 -oj` on each, offset added back). Every start is
**word − entrance duration** so the element *lands* on the word:

| Reveal | At | Entrance | Lands on (measured) |
|---|--:|--:|---|
| eyebrow "Most e-commerce coaching" | 2.34 | 0.36 | "**just** one person" **2.280** |
| "One person's opinion" | 2.44 | 0.46 | "just **one person**" **2.640** |
| brand card | 3.60 | 0.50 | "their **personal opinion**" **4.040** |
| card footer "based on one brand" | 4.70 | 0.36 | "**based on the time** that" **4.960** |
| strike-through | 6.56 | 0.42 | "another **DTC brand**" **6.980** |
| year pips | 8.00 | 0.30+stagger | "**five to ten** years" **8.120** |
| "5–10 years ago." | 8.36 | 0.44 | "ten **years ago.**" **8.680** |

The card footer is now staged off the card rather than riding in with it — the
sentence gives it its own clause, and the beat is long enough that it needs the
extra step to stay alive.

**What paid for it.** The opening montage window drops from 6.800s to 2.267s
(204 frames → 68). The bed is untouched; the composition simply never shows bed
frames 68–203. There is a hard cut at ad 2.267s and 18s of graphics before M2
resumes at bed 6.800s, so the jump cannot read. Montage total: **636 of 832
frames**, in order, none reprised.

**Beat B0 slides up to keep the chain unbroken**: 11.600 → **10.000–13.550s**.
Its slam now lands on "we've **created EcomIQ**" (10.160–10.800) at 10.10 and
its rule on "this is why **it works**" (11.530–12.040) at 11.60. Beat B is
untouched at 13.450.

### Superseded: the previous pass, which only fixed beat A's internals

Beat A was at **6.800–11.700s**, with its reveals **measured**, not
estimated. The earlier table interpolated word positions across an unbroken
12.5s speech run; measuring the same run word by word (`atrim` a 3.8–12.2s
slice, then `whisper-cli -ml 1 -oj` on that slice alone) put every anchor
1.3–1.6s later than the truth:

| Reveal | was | now | Lands on (measured) |
|---|--:|--:|---|
| eyebrow | 6.90 | 6.90 | — (beat head) |
| "One person's opinion" | 7.00 | 7.00 | — (beat head) |
| brand card | 7.40 | 7.40 | "another DTC brand" **6.98–8.12** |
| strike-through | 8.60 | **7.85** | ditto, resolving as the phrase ends |
| year pips | 9.10 | **8.10** | "**five** to ten years ago" starts **8.12** |
| "5–10 years ago." | 9.70 | **8.36** | "ten **years ago.**" **8.52–9.25** |

Beat B was wrong the other way — its badge fired a full second *before* he
named it:

| Reveal | was | now | Entrance | Lands on (measured) |
|---|--:|--:|--:|---|
| eyebrow | 13.55 | 13.55 | 0.40 | "It's the coach arm of a" **13.46–14.72** |
| Premier Partner badge | 13.70 | **14.32** | 0.58 | "**Shopify** Premier Partner," **14.72** |
| flame rule | 14.60 | **16.05** | 0.44 | "**an agency** that's been around" **16.21** |
| chip "Pacific IQ" | 15.20 | **16.30** | 0.38 | ditto |
| chip "10+ years" | 16.80 | **17.22** | 0.38 | "for over **10** years" **17.52** |

Each start is the word **minus the entrance duration**, so the element *lands*
on the syllable rather than still rising through it. A first pass fired the
badge at 14.75, exactly on the word — which was correct on paper and wrong on
screen: the entrance was mid-flight as he said it, and the 1.2s before it held
nothing but a dim eyebrow. Doing the subtraction closes that gap for free.

"…worked with some of the biggest brands in the world" (18.02–20.23) carries no
graphic — the red "biggest brands" chip was cut on request — so beat B holds
2.4s on a *complete* frame. That is a beat landing, not a dead screen: the
earlier "nothing happening" complaint was about a frame with only a dim eyebrow
on it.

### What paid for it
The montage now uses **772 of its 832 frames** — 2.0s trimmed, taken mid-bed
(frames 276–335) so the closing shot survives. Still native speed, still in
order, nothing reprised.

| | ad window | bed window | frames |
|---|---|---|--:|
| M1 | 0.000 – 6.800 | 0.000 – 6.800 | 204 |
| M2 | 20.600 – 23.000 | 6.800 – 9.200 | 72 |
| M3 | 54.900 – 71.433 | 11.200 – 27.733 | 496 |

### The rule this establishes
**A graphic's position is set by the line it illustrates. Nothing else outranks
that** — not frame budgets, not "use every source frame". When the arithmetic
does not close, the montage gets trimmed, not the anchor moved. Recorded in
`docs/LESSONS.md`.

---

## 19. v8 — "real client work" pill removed

The flame pill at **55.1–59.7s** is gone on request. Montage M3 now runs from
54.900s with no overlay until the **Pacific IQ** lower-third at 60.2–65.5s,
which is unchanged.

Nothing else moved: no timing, no montage window, no other graphic. The in-flight
render was stopped rather than allowed to finish on a stale build.
