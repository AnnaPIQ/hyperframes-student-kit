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
| 4 · End card | 17.07 to 23.20 | "Same customers, bigger orders... tap the link." | EcomIQ logo, flame rule, flame "Link Below" pill, held 6.15s |

**End-card trigger.** "Same customers," begins at **17.05s**. Three independent
measurements agree: a 0.77s pause at 16.30 to 17.07, the RMS floor breaking at
16.97 and fully voiced by 17.10, and whisper placing the preceding word
immediately before it. The transition fires at **16.85s** so the card is fully
resolved as the word lands, which is the standard 0.2s visual lead on a
punchline.

Cuts are hard inside a beat and a 0.18s dissolve across the three beat
boundaries. The montage is muted at the asset level (`-an` in the build script),
so only Sean's VO reaches the mixer.

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

```bash
npx hyperframes render --quality standard --output renders/aov-916.mp4
npx hyperframes render -c compositions/aov-45.html --quality standard --output renders/aov-45.mp4
```

Both are H.264 / AAC MP4 with `+faststart`.
