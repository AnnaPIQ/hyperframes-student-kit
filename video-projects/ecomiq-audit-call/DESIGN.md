# ecomiq-audit-call — Design Spec

Short-form EcomIQ ad: Sean's voiceover over a retimed showcase montage, with
brand motion graphics on the key points and an end card on the CTA.

Ships in two cuts:

| Cut | Project | Dimensions | Render |
|---|---|---|---|
| 9:16 Reels / Stories | `ecomiq-audit-call/` (this one) | 1080×1920 @ 30fps | `renders/ecomiq-audit-call-916.mp4` |
| 4:5 Meta feed | `ecomiq-audit-call-45/` (generated) | 1080×1350 @ 30fps | `renders/ecomiq-audit-call-45.mp4` |

The 4:5 project is generated from this one by `scripts/build-45.py` — edit
`index.html` here and re-run it, never hand-edit the sibling.

## Sources
| | File | Notes |
|---|---|---|
| Voiceover (spine) | `assets/sean-vo.m4a` | 67.33s, from `Book a Audit Call from EIQ Message.aifc` (mono PCM 24-bit/48k), loudness-normalised |
| Word timings | `assets/sean-vo.transcript.json` | whisper `small.en`, 216 words — every beat below is anchored to it |
| Montage | `assets/montage-source.mp4` | 1080×1920, 30fps, 29.70s. **Its own audio is unused.** |

Both sources came from Drive:
- Montage — `Showcase Reel.mp4` · https://drive.google.com/file/d/1SsgE0TJCjKo2YwvpSOA8-MtFcpHWNWwl/view
- Voiceover — `Book a Audit Call from EIQ Message.aifc` · https://drive.google.com/file/d/1NXnQBdkkrXUMX8K98huHoGIytDt9rIiM/view

Two things about the montage that drive the build:

1. **It already ends with an EcomIQ end card** (navy + white logo + flame "Click
   The Link Below" pill) from 27.73s. That tail is excluded from the b-roll pool
   so it can't surface mid-ad; the end card is rebuilt here instead. Usable
   b-roll is **0.00–27.73s**.
2. **27.73s of footage has to cover 64.64s of visuals.** `scripts/build-broll.py`
   retimes every shot to 0.45× with motion-compensated interpolation
   (`minterpolate`, applied per shot — running it across a cut warps the two
   shots together) and adds 7 callback shots. Result: ~1.7s per shot, no loops.

## Audio
The raw recording arrives at **-32.6 LUFS** integrated against a -8.2 dBTP peak
(a ~24 dB crest). Meta and TikTok normalise toward ~-14 LUFS, so shipped as-is
the ad would play roughly 16 dB under everything around it in the feed.
`scripts/prep-vo.py` runs two-pass `loudnorm` (a flat gain can't close that gap
without clipping) to land the deliverables at **-13.2 LUFS / -1.7 dBTP**.

It fixes this on the *asset*, not as a post-step on the rendered MP4, so a
re-render can't silently drop it. The script asserts the duration is unchanged
and the speech onset hasn't moved before it will write — AAC re-encoding pads
the final frame and stretched the file by 72ms on the first attempt, and every
beat here is anchored to word onsets in the transcript.

## Format decisions
- **9:16 is a native passthrough** — the montage is already 1080×1920, so no
  scaling at all.
- **4:5 is a centre crop**, 285px off the top and bottom, *not* scale+pad.
  Padding a 9:16 source into 4:5 gives a 759×1350 image with 160px black bars
  down both sides, which reads as broken in a Meta feed. Checked across the
  reel: no cropped faces. The keynote wide gives up some headroom and floor.

## Beat map
Every timing below is a word onset from the transcript.

| Beat | VO | Line | Graphic |
|---|---|---|---|
| B1 | 0.70–6.80 | "…one problem keeping you up at night" | eyebrow + *One* problem headline |
| B2 | 7.60–11.20 | "revenue climbing but profits not following" | Revenue rising line vs Profit flat line |
| B3 | 11.60–15.30 | "ad spend up but sales going backwards" | Ad spend rising vs Sales falling |
| B4 | 16.30–20.90 | "no idea what your problem is" | four chips: ads / website / product / pricing |
| B5 | 24.20–28.10 | "book a free audit call with our team" | flame pill |
| B6 | 28.15–30.50 | "not a generic teardown" | struck through |
| B7 | 30.80–34.70 | "one specific problem… costing you money" | *One* specific problem |
| B8 | 37.50–41.60 | "your data, your ads, your funnel, your numbers" | four-row stack, one row per phrase |
| B9 | 41.80–45.20 | "not a template or a checklist" | both struck through |
| B10 | 45.70–48.90 | "just your store and your problems" | *Just* your store |
| B11 | 50.30–54.50 | "a clear answer and a plan for what to fix first" | A *clear* answer + sub |
| B12 | 55.10–58.80 | "promise everything and deliver nothing" | second line struck |
| B13 | 59.40–61.30 | "this is the opposite of that" | The *opposite* of that |
| B14 | 61.24–64.64 | "your store, your problems and your plan" | three lines landing on 61.24 / 62.19 / 63.55 |
| **End card** | **64.64–67.33** | "Book your free audit call, click the link below" | logo + flame **Link Below** |

**End-card trigger = 64.64s**, chosen by Nate. Holds 2.69s. Note the alternative
that was offered and declined: 61.24s ("Your store, your problems and your
plan.") would have held 6.09s, closer to the 4–6s outro the motion philosophy
asks for. At 64.64s the button appears ~1.2s before he says "click the link
below" (65.80s), so the CTA still lands with the line.

The white EcomIQ logo sits top-left for the whole b-roll and clears out at
64.34s, just before the whip into the end card.

## Brand application
Straight from `assets/brand-tokens.css` — navy `#06284C` canvas and scrim, flame
`#FF4C32` as the only hot accent (rules, CTA, "wrong" trend lines, strikethroughs),
blue tint `#9CD4FF` for eyebrows and the serif emphasis word. Rethink Sans
throughout, Hedvig Letters Serif italic for exactly one emphasis word per beat.
Both fonts are local `.woff2`; GSAP is vendored. No network at render time.

Copy sits bottom-anchored and left-aligned on every beat, over a navy scrim —
the footage is bright retail and stage material and flat white type loses against
it. 9:16 keeps the block 400px off the bottom to clear the Reels UI; 4:5 drops it
to 150px since the Meta feed has no overlay.

## Known transcription note
Whisper hears "free **order** call" where the script says "free **audit** call"
(65.21–65.55). It's a mis-hear, not a different take — it only ever mattered for
timing, and the on-screen copy says "audit".

## Rebuild
`assets/montage-source.mp4` and both `broll-*.mp4` beds are gitignored — they're
large and fully reproducible. Pull the montage from the Drive link above, then:

```bash
cd video-projects/ecomiq-audit-call
python3 scripts/prep-vo.py <source.aifc>   # normalise VO (only if re-pulling it)
python3 scripts/build-broll.py             # retime montage -> broll-916.mp4 + broll-45.mp4
python3 scripts/build-45.py                # regenerate the 4:5 sibling project
npx hyperframes lint                       # expect 0 errors, 20 benign warnings
npx hyperframes render --quality standard --output renders/ecomiq-audit-call-916.mp4
cd ../ecomiq-audit-call-45 && npx hyperframes render --quality standard \
  --output renders/ecomiq-audit-call-45.mp4
```

The 20 lint warnings are all `nested_structure_needs_subcomposition` — a Studio
timeline-ergonomics note (one row per top-level element), not a render issue.
