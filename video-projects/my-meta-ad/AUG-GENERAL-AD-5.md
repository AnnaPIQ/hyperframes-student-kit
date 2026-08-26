# Aug-General ad 5 — build notes

Short-form EcomIQ ad cut from the "what's working" A-roll. Two deliveries from
one spine: **9:16** (1080×1920, Reels/Stories/TikTok) and **1:1** (1080×1080,
square feed). Both 30fps, **40.6s**.

| | |
|---|---|
| Compositions | `compositions/aug-general-ad-5-9x16.html`, `compositions/aug-general-ad-5-1x1.html` |
| Renders | `renders/aug-general-ad-5-9x16.mp4`, `renders/aug-general-ad-5-1x1.mp4` |
| Footage prep | `scripts/prep-aug-general-ad-5.sh` (repo root) |
| A-roll | Drive `1PrOe05PfJ1yxNLV7abFliy16ygbYtM-F` — *whats working.mov*, 2.41 GB ProRes |
| B-roll | Drive `1cF3UR7rqtK27rx9HUh5H7Wt_yipf8fhp` — *Sweet E's Owner Erica - Packing cake*, from 1:27.4 (+3.6s) |
| B-roll | Drive `1jHsUTe013mdBLjB6VQvJmjzwj0r6cXzT` — *Dryft - Walking in wholesaler*, from 0:21.0 (+2.45s) |

## The one structural idea

The VO is a **single continuous take**, so it is never spliced. Every "cut" is a
**reframe of the crop window** — a `scale`/`x`/`y` tween on a wrapper div — hidden
under a whip-streak. Lip sync cannot drift because nothing was ever cut.

Every reframe is anchored to a real silence boundary from
`ffmpeg -af silencedetect=noise=-34dB:d=0.28`. Speech runs **1.892s → 38.087s** in
the source, so prep trims 1.75s of head air and holds 1.16s past the last word →
**37.5s of film**, with the end card taking over at **33.75s** — it lands on
"wanna see if it'll work for you", so the spoken CTA plays over the branded card
rather than after it. Total 40.6s.

## Beat map (composition seconds)

| t | Beat | Graphic |
|---|---|---|
| 4.00 | **logo wall** | 18 client marks drifting up a navy scrim, Shopify Premier Partner badge lands centre |
| 8.36 | not theory | "THEORY" struck through in flame |
| 11.50 | premier partner | pulsing flame dot + "LIVE · EVERY SINGLE DAY" |
| 15.65 | revenue/profit | two risers, blue-tint → flame |
| 17.85 | **B-roll · Sweet E's** | full-bleed rotated phone footage, "SWEET E'S" chip |
| 19.75 | **B-roll · Dryft** | full-bleed, "DRYFT" chip — the speaker himself is in the shot |
| 23.80 | **hero stamp** | "NOT A GUESS." + 6px shake on the footage |
| 26.60 | pattern | node lattice with a flame pulse |
| 30.04 | should → already | "Not what should work. What already does." all white |
| 33.75 | **end card** | film cross-dissolves out; lockup + "Built for Shopify founders." + "Learn More" pill, 6.85s |

## B-roll

Two real portfolio brands run full-bleed over "tested on real stores with real
money on the line", replacing a receipt-tick graphic that only repeated the VO.
The cut lands on the pause before "So when we tell you to do something".

Both sources are phone footage stored landscape with **no rotation metadata**, so
prep applies an explicit `transpose=1` (90° clockwise). After the rotate a
1920×1080 source is exactly **1080×1920** — a native fit for the vertical cut with
no crop at all, which makes the B-roll noticeably sharper than the A-roll. The 1:1
takes a 1080×1080 window pulled up from centre (y=290 / y=250) to keep faces and
product in frame. Audio is stripped; the VO keeps running underneath.

**Seams are hard cuts, never fades.** Fading a B-roll clip out revealed the A-roll
underneath for a couple of frames and ghosted a visible double exposure. Each cut
lands on a whip-streak instead.

## Logo wall (4.00 → 8.36)

Built to the supplied reference: client marks knocked out to low-opacity white,
drifting upward over a heavy navy scrim with the speaker faintly visible behind,
and the **Shopify Premier Partner** badge landing centre as the hero.

`scripts/prep-logo-wall.sh` turns the mixed logo drop (white cards, black cards,
coloured cards, transparent PNGs) into uniform white silhouettes. Polarity is
decided per file by sampling the border — a light border means a dark mark, so
invert; a dark border means the mark is already light. Four sources needed
handling by name:

| Source | Why |
|---|---|
| Dryft | light card, light mark — heuristic misread it |
| Mob Armor, Sweet E's, Naturally Linda | two-tone marks that cannot survive being reduced to one silhouette — **excluded** |

18 of the 22 supplied logos are in the wall. Mob Armor, Sweet E's and Naturally
Linda would each need a hand-made mono version to be included; Sweet E's and
Dryft already appear as B-roll anyway.

## Captions

**None baked in.** The bottom **300px** (9:16) / **190px** (1:1) is kept clear of
all graphics so captions can be added later without a relayout.

## Deliberate deviations from the EcomIQ house style

Both were requested directly and are intentional, not oversights:

- **No italic-serif emphasis word.** The brand signature (one Hedvig Letters Serif
  italic word per headline) is not used — "Shopify" on the end card and
  "should"/"already" in the closing beat are all white upright Rethink Sans. The
  Hedvig `@font-face` is still declared but currently unused.
- **No grid/crosshair texture over the footage.** It read as dirt on the speaker's
  face, so it survives on the end card only. Vignette and grain remain global.

## Known limitation — the 9:16 is soft

Google rate-limited the 2.41 GB ProRes master ("too many users have viewed or
downloaded this file recently", up to 24h), so both cuts were baked from Drive's
**1080p transcode** (~1.3 Mbps). Consequences:

- **1:1 is unaffected** — its crop is a native-pixel 1080×1080 lift, no resample.
- **9:16 is soft** — a 608×1080 window upscaled 1.78×. Punch-ins are capped at
  1.12 for that reason (the square would take more).

**To re-bake once the master downloads:**

```bash
.media/fetch-chunked.sh 1PrOe05PfJ1yxNLV7abFliy16ygbYtM-F .media/aroll.mov 2411074211
bash scripts/prep-aug-general-ad-5.sh .media/aroll.mov
cd video-projects/my-meta-ad
npx hyperframes render -c compositions/aug-general-ad-5-9x16.html --quality standard \
  --output renders/aug-general-ad-5-9x16.mp4
```

Nothing in the compositions changes — they reference `assets/aug5-aroll-*.mp4` by
name, and the punch cap in the 9:16 timeline can go back up to ~1.18.

## Footguns hit on this build

All three are now in `docs/LESSONS.md`:

- **Layer order is DOM order, not `data-track-index`.** A veil with a lower track
  index still painted over the headline it was meant to sit behind.
- **`ecomiq-logo-white.svg` renders inverted** in the headless Chrome shell (it uses
  a `mask-type: luminance` mask) — use the `.png`. Also, `ecomiq-icon-white.svg` is
  the badge *only*, not a corner logo.
- Asset paths must be **root-relative** (`assets/…`), never `../assets/…`.
