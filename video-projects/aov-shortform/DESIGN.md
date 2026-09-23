# AOV Short-Form, EcomIQ

Short-form ad built from two sources: a montage carrying all the visuals, and
Sean's voiceover carrying the spine of the edit. No captions. Two deliverables,
9:16 and 4:5.

Brand spec is inherited from the EcomIQ kit, palette and type in
`assets/brand-tokens.css`, logos in `assets/`, local `.woff2` in
`assets/fonts/`. Nothing is hardcoded and no new colours or families are
introduced.

## Sources

| Role | Drive file | Probe |
|---|---|---|
| Visuals | `Showcase Reel.mp4` | 1080x1920, 30fps, 29.72s, H.264 + AAC |
| Voiceover | `AOV1.aifc` | AIFF-C, pcm_s24be, mono 48kHz, 22.98s |

Two things worth knowing about the sources:

- **The reel carries its own baked-in EcomIQ end card** from roughly 27.70s to
  the end. Usable b-roll therefore stops at **27.65s**. This ad builds its own
  card and never shows the reel's.
- **The VO differs from the written script** it was briefed against. What Sean
  actually says, per `whisper small.en` plus an RMS envelope pass:

  > Run a Shopify store? Want every order worth more? You're already winning the
  > customer, now make each one spend more. Give us 90 days. You'll work with an
  > EcomIQ strategist who's done this before, and they'll do it for you. **Same
  > customers, bigger orders**, guaranteed in 90 days. Tap the link and see if
  > you qualify.

- The VO arrived at **-34.7 LUFS**, far too quiet for social. `assets/vo-sean.m4a`
  is loudness-normalised to **-17.9 LUFS** (target -16, TP -1.5).

## Structure

Runtime **23.20s**. Sean's VO runs 0 to 23.00s and drives every cut.

| Beat | Window | VO | Visual |
|---|---|---|---|
| 1 · Hook | 0.00 to 4.55 | "Run a Shopify store? Want every order worth more?" | Shopify cube, Premier Partner card, store aisle, dryft, site search, cupcakes, storefront |
| 2 · Problem | 4.55 to 10.75 | "You're already winning the customer, now make each one spend more." | expo crowd, badge scan, aisle walk, couple laughing, bakery kitchen, studio, arriving, keyboard, coffee |
| 3 · Offer | 10.75 to 17.30 | "Give us 90 days... a strategist who's done this before." | stage, "2.3+ Billion / 99.9% uptime", MMNTM room, podcast, presenting, SHOPTALK, walking, profile |
| 4 · End card | 17.07 to 23.20 | "Same customers, bigger orders... tap the link." | EcomIQ logo, flame rule, "Same customers, bigger orders / Guaranteed in 90 days", flame "Link Below" pill, held 6.15s |

**End-card trigger.** "Same customers," begins at **17.05s**. Three independent
measurements agree: a 0.77s pause at 16.30 to 17.07, the RMS floor breaking at
16.97 and fully voiced by 17.10, and whisper placing the preceding word
immediately before it. The transition fires at **16.85s** so the card is fully
resolved as the word lands, which is the standard 0.2s visual lead on a
punchline.

Cuts are hard inside a beat and a 0.18s dissolve across the three beat
boundaries. The montage is muted at the asset level (`-an` in the build script),
so only Sean's VO reaches the mixer.

The end card carries the payoff line flat: "Same customers, bigger orders" in
white Rethink Sans at -2% tracking, no serif italic emphasis, over "Guaranteed
in 90 days" at 50px so the guarantee reads nearly as strongly. The CTA pill is
the only flame element besides the rule.

## Pacing

The source reel is fast-cut, averaging 0.73s per shot across 38 shots. Covering
the 17.30s bed at native speed therefore needs roughly 24 of them, which reads
frantic under a calm VO. The shot table instead uses **20 shots** and retimes
each beat to fill its slot:

| Beat | Shots | Source | On screen | Retime | Avg shot |
|---|---|---|---|---|---|
| 1 · Hook | 6 | 4.38s | 4.55s | x1.10 | 0.76s |
| 2 · Problem | 7 | 5.49s | 6.38s | x1.21 | 0.91s |
| 3 · Offer | 7 | 5.59s | 6.73s | x1.25 | 0.96s |

Shots hold about 26% longer than a native-speed assembly would allow. The cost
is mild slow motion, applied by frame duplication rather than interpolation, so
roughly one frame in five to nine repeats on the later beats. The escalating
retime is deliberate: the hook stays punchiest and the offer breathes most.

`build-montage.sh` prints these figures on every build. To trade the slow motion
back for speed, add shots to `BEAT2` / `BEAT3` in the shot table; the retime
factor falls automatically because each beat's target length is fixed.

## Frame normalisation

The source is 9:16, so **9:16 is a straight pass-through, no scale and no pad**.

4:5 cannot be filled without losing something. Scale+pad was rejected: it
lands the picture at 759x1350 inside navy pillarbox bars and shrinks subjects
too far for a feed. The shipped 4:5 uses a **crop biased 15% toward the top**
(`crop-up`), which fills the frame and clears the head-room that a plain centre
crop clips on the two stage shots. Roughly 200px is lost off the top and 370px
off the bottom.

`build-montage.sh` still supports `crop-centre` and `pad` if that call changes.

## Files

```
index.html                     9:16 master, 1080x1920
compositions/aov-45.html       4:5 master, 1080x1350 (same timeline, rescaled furniture)
scripts/build-montage.sh       cuts, retimes and normalises the b-roll bed
scripts/make-45.py             derives compositions/aov-45.html from index.html
scripts/make-hires.py          derives a zoomed 2x composition from any of the above
assets/vo-sean.m4a             normalised voiceover (committed)
assets/montage-916.mp4         derived b-roll bed, 17.30s (gitignored, rebuild below)
assets/montage-45.mp4          derived b-roll bed, 17.30s (gitignored, rebuild below)
```

The two montage beds are build output, not sources, and follow the repo's
convention of not committing large prepped media. Rebuild them from the Drive
reel staged at `assets/incoming/`:

```bash
cd video-projects/aov-shortform
bash scripts/build-montage.sh ../../assets/incoming/showcase-reel.mp4 916
bash scripts/build-montage.sh ../../assets/incoming/showcase-reel.mp4 45
```

Both cuts share one timeline, so the 4:5 is generated rather than maintained by
hand. Edit `index.html`, then run `python3 scripts/make-45.py`. It fails loudly
if index.html drifts from what it expects, so the 4:5 can never ship stale.

## Render

Platform masters, 1080 wide, which is what Meta actually wants:

```bash
npx hyperframes render --quality standard --output renders/aov-916.mp4
npx hyperframes render -c compositions/aov-45.html --quality standard --output renders/aov-45.mp4
```

2x hi-res masters for archival and repurposing:

```bash
# 9:16, portrait-4k is an exact 2x of 1080x1920
npx hyperframes render --resolution portrait-4k --quality standard --output renders/aov-916-hires.mp4

# 4:5 has no matching preset, so generate a zoomed 2x composition first
python3 scripts/make-hires.py compositions/aov-45.html compositions/aov-45-2x.html
npx hyperframes render -c compositions/aov-45-2x.html --quality standard --output renders/aov-45-hires.mp4
```

All four are H.264 / AAC MP4 with `+faststart`.

What 2x buys: the end card, its type and the corner logo are drawn by the
browser, so they rasterise at full size and genuinely resolve finer. The
montage bed is 1080 wide at source, so the footage is upscaled, not improved.
The 2x files are worth shipping for archival or for re-cropping later, but the
1080 masters are the correct upload for Meta.

`make-hires.py` reasserts the authored size on `#root` with `!important`
because the engine writes the composition size there inline. Without that the
root is both doubled and zoomed, which lays the content out in a 4x box and
strands it in the bottom-right quadrant.
