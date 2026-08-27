# Brief — VO-over-montage EcomIQ ad (reusable)

Paste everything below the line into a fresh session, after filling in the four
`«...»` placeholders. It rebuilds the `ecomiq-sean-vo-ad` format with a new
speaking clip.

The recipe is proven; the parts that **must** be re-derived for a new clip are
the VO timings, the PiP crop and the retime factor. Everything else is settled.

---

Build a short-form EcomIQ ad: a recorded voiceover carrying the edit, an existing
montage as the picture, the speaker riding along in a circular PiP, and the brand
end card landing on a nominated line.

## Sources
- **SPEAKER (voiceover + PiP):** «Drive link to the new Sean clip»
- **MONTAGE 9:16:** «Drive link» — or reuse `Showcase Reel.mp4`
- **MONTAGE 1:1:** «Drive link» — or reuse `Showcase ad-1-1.mp4`
- **END-CARD TRIGGER LINE:** «the exact words the card should land on, e.g. "want to see if we can help you"»

## Start from the existing build
`video-projects/ecomiq-sean-vo-ad/` is the working reference — read its
`DESIGN.md`, `EDIT-PLAN.md` and `scripts/build-assets.sh` before writing anything.
Scaffold the new project with `npm run new -- «slug» story`, then port the three
compositions and the asset script across and re-derive the numbers. Also read
`docs/LESSONS.md`.

## The format

```
 t=0                                                        CARD           END
 |──────────── montage, ONCE, retimed to fit ───────────────|── end card ──|
 |  brand bug top left · speaker PiP top right              |  VO runs on  |
```

- **Voiceover is the spine.** Montage audio is discarded entirely.
- **Montage plays through exactly once**, retimed so one pass covers the VO. Never
  loop it and never reprise shots — an earlier version reprised eight hero shots
  to fill a 6 s gap and it read as a repeat.
- **Speaker never appears full frame** — only in the corner PiP.
- **Brand bug** (small white lockup) top left, **PiP** top right, sharing a top
  offset so they read as a pair. Both fade in inside the first 0.5 s and are
  covered by the end card.
- **Snappy:** hard cuts throughout, exactly **one** 0.35 s dissolve — into the end card.
- **End card:** navy ground, white EcomIQ lockup, flame rule, flame pill reading
  **"Find out more →"**. One face, one weight, no italics, no second line.
- **Music:** wire a silent `music-bed.wav` placeholder at `data-volume="0"` with
  duck targets noted in comments (0.13 under speech, 0.35 over the card).
- **No captions.**

## Ratios
9:16 (1080×1920, `index.html`) · 1:1 (1080×1080, `compositions/square.html`) ·
4:5 (1080×1350, `compositions/meta45.html`). Same timeline and card in each; only
overlay sizes change.

## Steps

1. **Pull and probe** both sources. Confirm the montage masters share a cut list
   (`select='gt(scene,0.25)',showinfo`) so one set of timestamps drives every ratio.
2. **Transcribe the new VO and verify it** — see the timing warning below. Report
   the exact timestamp of the trigger line.
3. **Produce an edit plan** — VO beat breakdown, the retime factor, the end-card
   trigger time, transitions. **Show it and wait for approval before rendering.**
4. Build the beds and compositions, lint, render.
5. **Frame-verify every render** before claiming done — pull frames across the whole
   timeline and actually look at them.
6. Commit the compositions, scripts and docs to the branch.

## Deliver
`--quality high`, H.264 High / yuv420p, AAC 48 kHz, `+faststart`, 30 fps CFR.
Each ratio at native size, plus 2× if asked. Note that renders can exceed chat
upload limits — say so rather than silently sending only compressed copies.

---

## Gotchas that cost real time on the last build

**Whisper timestamps drift.** A full-file pass put the first word at 0.26 s when
speech actually started at 3.26 s — it stretches words across leading room tone,
and the error propagates by up to 0.8 s. Never take a cut point from one ASR pass.
Cross-check with `silencedetect` (sweep −35 and −45 dB; the quieter threshold
swallows soft speech) plus per-200 ms `volumedetect` RMS, then **re-transcribe a
tight 2–3 s window** around the trigger line. Confirm afterwards by measuring RMS
on the finished render at the cut time.

**Retime with motion interpolation, not frame duplication.** If the VO outruns the
montage, slow the whole reel: `setpts=<VO_len/reel_len>*PTS` then
`minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1`. Plain
duplication judders on camera moves. Scene-change detection handles hard cuts
cleanly — verify across one cut before committing. Costs ~10 min per ratio.

**`-t` goes BEFORE `-i`.** After `-i` it caps the *output*, silently truncating a
slowed bed back to the source length and dropping the tail of the reel.

**Extend the bed past the dissolve start**, not up to it — a 0.35 s dissolve at
`t` needs picture through `t + 0.35`.

**Supplied montages carry their own end card.** The Showcase Reel's starts at
27.733 s. Scene-detect the tail and trim it, or you get two cards back to back.

**Centre the PiP on the FACE, not the head's bounding box.** Long hair pulls the
box sideways; box-centring leaves the face visibly off-centre once masked. Measure
it — a skin-tone centroid over ~60 frames spanning the take. Eyeballing hero frames
got it wrong twice. Judge through the real circle mask at final display size, never
the square crop.

**Don't crop the PiP too tight.** A tight window can land entirely inside the
brightest patch of a coloured backdrop and read as a flat disc — which looks like a
grade nobody applied. Leave room for the falloff.

**Cut the PiP from the same in-point as the VO** so lips track the voice with no
offset to tune. Conform 25 fps source to 30.

**Give the brand bug a drop shadow** — the reel lands on near-white shots where a
white lockup vanishes.

**Two `<img>` on one source trips `duplicate_media_discovery_risk`.** The bug and
the end-card lockup are the same art: point one at the PNG and one at the SVG.

**Only one root `index.html` may carry a `data-composition-id`** — ratio variants
live in `compositions/` and render with `--composition`. Relative `assets/...`
paths still resolve from the project root.

**There is no 4:5 `--resolution` preset.** For 4:5 at 2×, generate a sibling
composition with every px doubled (including GSAP's px offsets), then verify by
downscaling the 2× render and difference-blending it against the native — it should
come back black.

**4:5 has no native master.** Centre-crop it out of the 9:16 master (y≈240 on a
1080×1920 frame) rather than the 1:1 — the 1:1 route reads on-screen graphics
better but slices people at the frame edge. Ask for a native 4:5 recompose if the
client can supply one.

**2× does not invent detail.** It genuinely sharpens composition graphics and the
PiP (cut from 4K). It does not sharpen footage beyond the master's own resolution
— say so rather than implying a 4K upscale is a 4K asset.

**Vendor GSAP locally, use local `.woff2`, `gsap.fromTo` for anything that starts
hidden, and wrap the logo in a positioned non-`clip` div.** All four are in
`docs/LESSONS.md` and all four have bitten before.
