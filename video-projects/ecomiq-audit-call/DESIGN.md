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
| B-roll | 35 clips, per `scripts/broll-manifest.json` | from the "B-Roll Short Cut" sheet |

Sources on Drive:
- Voiceover — `Book a Audit Call from EIQ Message.aifc` · https://drive.google.com/file/d/1NXnQBdkkrXUMX8K98huHoGIytDt9rIiM/view
- B-roll cheat sheet — https://docs.google.com/spreadsheets/d/1TdA4lCWJTMRTmWDtU7yCzyrqeU6CyNeZygH5Opnvif8/edit

### Why the bed is built from the cheat sheet, not the Showcase Reel
The first cut used the single `Showcase Reel.mp4` montage. That reel holds only
**27.73s** of usable footage (its last 2s are its own EcomIQ end card, excluded
so it can't surface mid-ad) against **64.64s** of voiceover, so it was retimed to
0.45×. At 2.2× slow motion it read as obviously wrong.

The cheat sheet fixes it at the source: the bed now runs at **native speed** —
no retiming, no interpolation, no looping, one shot per 2.55s.

**Motif caps.** The sheet holds 8 near-identical hotel-laptop setups. Using them
all made the bed feel repetitive even though every file was distinct, so each
clip carries a `motif` and `scripts/broll-manifest.json` caps how many of each
can appear: laptop 2, car 3, walking 2, phone 1, meeting 5, stage 2, event 4,
retail 3, bakery 3 — **23 shots** at 2.9s. The laptop motif went from 10
available to 2 used. The build asserts no two *adjacent* shots share a motif.

**No chopped-text frames.** Four clips were cut because the frame sliced text
mid-word, which reads as a flash of nonsense: both Shoptalk stage shots (16:9
presentation slides, and the only clips that needed a 9:16 crop), and the
Limitless Growth banner (the camera pans across it, so the shot always ends on
half a word). A fourth, "sweetes-team", turned out to be mislabelled in the
sheet — the file is Sean on a laptop end to end, a third laptop shot in
disguise. Reasons for all of them are in the manifest's `dropped` map. Every
remaining shot was checked at three points across its duration.

**Orientation is the trap.** 18 of these clips are phone-shot vertical footage
exported into a 3840×2160 container with the rotation *baked in* and no rotation
metadata, so ffmpeg does not auto-correct them and they decode with faces on
their side. They carry `"transform": "rotate_cw"` in the manifest and get
`transpose=1`; afterwards they are true 2160×3840 and need **no crop at all**.
Only 2 clips are genuinely landscape and take a centre crop. Three were dropped
(reasons in the manifest's `dropped` map): a two-shot wide that loses a person in
9:16, surf footage that is off-message, and one whose Drive download returned no
video stream.

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
- **9:16 needs no cropping at all** — with the two Shoptalk stage shots cut,
  every remaining clip is natively vertical (some already, the rest after the
  rotation fix above). Nothing in the bed is cropped.
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
| B4 | 18.95–20.90 | "your ads, your website, your product, your pricing" | four chips, one per phrase |
| B5 | 24.20–28.10 | "book a free audit call with our team" | flame pill |
| B6 | 28.15–30.50 | "not a generic teardown" | struck through |
| B7 | 30.80–34.70 | "one specific problem… costing you money" | "One specific problem." — all white, upright |
| B8 | 37.50–41.60 | "your data, your ads, your funnel, your numbers" | four-row stack, one row per phrase |
| B9 | 41.80–45.20 | "not a template or a checklist" | both struck through |
| B10 | 45.70–48.90 | "just your store and your problems" | "Just your store." — all white, upright |
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
blue tint `#9CD4FF` for eyebrows. Rethink Sans throughout.

**No serif italic emphasis.** At Nate's direction every blue-tint italic
emphasis word was changed to white and upright, so `.em` now only sets colour
and inherits font, style and weight from `.head`. Hedvig Letters Serif is still
shipped in `assets/fonts/` and still declared, but nothing renders in it.
Blue tint survives only where it was never italic: the eyebrows, and the last
row of the B8 stack ("All of your numbers").
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
Both `broll-*.mp4` beds are gitignored — they're large and fully reproducible.
`build-broll.py` downloads every clip itself from the ids in the manifest:

```bash
cd video-projects/ecomiq-audit-call
python3 scripts/prep-vo.py <source.aifc>   # normalise VO (only if re-pulling it)
python3 scripts/build-broll.py             # pull b-roll from Drive -> broll-916.mp4 + broll-45.mp4
python3 scripts/build-45.py                # regenerate the 4:5 sibling project
npx hyperframes lint                       # expect 0 errors, 20 benign warnings
npx hyperframes render --quality standard --output renders/ecomiq-audit-call-916.mp4
cd ../ecomiq-audit-call-45 && npx hyperframes render --quality standard \
  --output renders/ecomiq-audit-call-45.mp4
```

The 20 lint warnings are all `nested_structure_needs_subcomposition` — a Studio
timeline-ergonomics note (one row per top-level element), not a render issue.
