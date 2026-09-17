# EcomIQ × Sweet E's — montage social-proof ad · HANDOFF

Sweet E's 30-second montage as the spine, Sean's full voiceover over the top,
finishing on the EcomIQ CTA end card. 46.20s, delivered in 9:16 and 4:5.

Read `DESIGN.md` for the look and the rules, `EDIT-PLAN.md` for the frame-exact
beat sheet and the word onsets every band is cut to.

---

## What to look at first

1. `renders/sweet-es-montage-9x16.mp4` — the master.
2. `renders/sweet-es-montage-4x5.mp4` — the 4:5, scale + pad, per the brief.
3. `renders/sweet-es-montage-4x5-crop.mp4` — the 4:5 alternative, full-bleed.
   **You need to pick one of these two.** See "Decisions waiting on you".

Committed copies of all three also sit at the project root as `final-*.mp4`,
because `renders/` is gitignored workspace-wide.

## Decisions waiting on you

1. **Which 4:5.** The montage master is 1080×1920 and there is no wider master,
   so a 1080×1350 frame cannot be filled without losing picture. The brief said
   scale + pad and to flag anything needing a crop, so both exist:
   - **padded** keeps 100% of every shot, with 160px of brand navy each side.
     Nothing is lost; the picture occupies 70% of the width.
   - **crop** is full-bleed and native 1080 wide with no upscale, and behaves
     like a normal Meta 4:5 creative in-feed. It loses 285px off the top and
     bottom of every shot.
   My recommendation is the crop for paid placement and the padded one only if
   losing frame is unacceptable.
2. **Whether the case-study results go back in.** An earlier Sweet E's build in
   this repo carried four-year results from EcomIQ's own case study (7×
   sessions, +115% total sales, +15% AOV). They are **not** in this cut: nothing
   in this voiceover says them aloud, and I could not re-verify the source here.
   The 29.20–32.00 window is clean footage and would take a results band with no
   other change. Say the word.
3. **Music.** The montage master's audio track is digital silence, so the mix is
   the voiceover alone. A bed under it is a one-line addition.

## Things you should know

- **The recorded take does not match the script you sent.** The audio says
  *"…on 10,000, 20,000 cookies"*, *"over four years"*, and *"they recently had
  to move into a bigger facility that was three times the size just to keep up
  with demand"*; your script has a tighter read. Everything is cut to the audio,
  since the ad is audio-led and that audio is what ships. If a take matching
  your script exists, send it — the plan is timing-only, so the re-time is
  cheap.
- **The voiceover is complete.** Dead air was measured on the master (digital
  silence at 0–2.40s and 44.30–47.20s) and trimmed off both ends; nothing is cut
  out of the middle. The read runs 41.90s.
- **The montage is retimed to 0.776×** to carry a 41.90s voiceover from a
  29.97s source, using motion-compensated interpolation rather than frame
  duplication. Average shot length goes 1.43s → 1.84s. No shot is repeated, cut
  or frozen.
- **Nothing on screen is unspoken.** Every figure and client name in the piece is
  said aloud in the voiceover, and no third-party logo is reproduced anywhere.
- **No burned-in captions.** The bottom 30% of both frames is kept clear of
  graphics so platform subtitles have somewhere to go.

## To rebuild from scratch

```bash
cd video-projects/sweet-es-montage
bash scripts/pull-media.sh              # both Drive masters, size-guarded
bash scripts/prep-assets.sh             # VO trim + the montage retime (~10 min)
node scripts/verify-layout.mjs          # static safe-area / overflow / font assertions
npx hyperframes lint
npx hyperframes render --quality standard --fps 30 --output renders/sweet-es-montage-9x16.mp4

python3 scripts/make-ratios.py          # emits build/4x5/ (padded)
cd build/4x5 && node ../../scripts/verify-layout.mjs build/4x5
npx hyperframes render --quality standard --fps 30 --output ../../renders/sweet-es-montage-4x5.mp4

cd ../.. && python3 scripts/make-ratios.py --crop
cd build/4x5 && npx hyperframes render --quality standard --fps 30 \
  --output ../../renders/sweet-es-montage-4x5-crop.mp4
```

Or in one command: `bash scripts/bake.sh` runs the gates and renders all three.

`bash scripts/grab-frames.sh <render.mp4>` pulls one frame per beat for visual
checking; `bash scripts/verify-render.sh <render.mp4> <w> <h>` checks the
finished file's spec, `+faststart`, runtime, and the voiceover's offset against
`assets/vo.m4a` by envelope cross-correlation.

## Gates this project passes

| Gate | Result |
|---|---|
| `npx hyperframes lint` | 0 errors, 0 warnings (both ratios) |
| `node ../../scripts/preflight.mjs` | all checks passed — Studio preview will open |
| `node scripts/verify-layout.mjs` | bands clear the subtitle zone and the logo, no overflow, bars measured at 1:3, both fonts local |
| `bash scripts/verify-render.sh` | spec, `+faststart`, 46.20s, voiceover at **+0 ms** (r=1.000) |
| Frame verification | 19 frames per ratio, one per beat, opened and checked |

Note on the authoring loop: CLAUDE.md asks for a live Studio preview gate before
any render. In this cloud container `hyperframes preview` binds to a localhost
that is not reachable from a browser, so the render → frame-grab loop stood in
for it, as `docs/REMOTE-ENV-SETUP.md` prescribes. On a local clone the Studio
preview now opens correctly — that is what the root `data-start` change in
DESIGN §4.1 buys.
