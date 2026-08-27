# Aug-General ad 5 — build notes

Short-form EcomIQ ad cut from the "what's working" A-roll. Two deliveries from
one spine, all 30fps and **37.0s**:

| Cut | Size | Use |
|---|---|---|
| **9:16** | 1080×1920 | Reels / Stories / TikTok |
| **4:5** | 1080×1350 | Meta feed — this project's native format |
| **1:1** | 1080×1080 | square feed |

| | |
|---|---|
| Compositions | `compositions/aug-general-ad-5-{9x16,4x5,1x1}.html` |
| Renders | `renders/aug-general-ad-5-{9x16,1x1}.mp4` (1080, `--quality high`) + `…-4k.mp4` 2× exports |
| Footage prep | `scripts/prep-aug-general-ad-5.sh` (repo root) |
| A-roll | Drive `1PrOe05PfJ1yxNLV7abFliy16ygbYtM-F` — *whats working.mov*, 2.41 GB **3840×2160 ProRes 422 10-bit** |
| B-roll | Drive `1cF3UR7rqtK27rx9HUh5H7Wt_yipf8fhp` — *Sweet E's Owner Erica - Packing cake*, 4K, from 1:28.5 (+2.05s) |
| B-roll | Drive `1jHsUTe013mdBLjB6VQvJmjzwj0r6cXzT` — *Dryft - Walking in wholesaler*, 4K, from 0:21.2 (+1.85s) |

## The one structural idea

The VO is a **single continuous take**, so it is never spliced. Every "cut" is a
**reframe of the crop window** — a `scale`/`x`/`y` tween on a wrapper div — hidden
under a whip-streak. Lip sync cannot drift because nothing was ever cut.

Every reframe is anchored to a real silence boundary from
`ffmpeg -af silencedetect=noise=-34dB:d=0.28`. Speech runs **1.892s → 38.087s** in
the source, so prep trims 1.75s of head air and holds 1.16s past the last word →
**37.5s of film**, with the end card taking over at **33.75s** — it lands on
"wanna see if it'll work for you", so the spoken CTA plays over the branded card
rather than after it.

The piece ends at **37.0s** (1110 frames). The last word lands at 36.34, so the
card rings out for 0.66s and stops — everything past that was a static card over
silence. The CTA pulse and the shimmer glint were both retimed to finish before
the new out-point, so the final frame is the fully-formed card.

## Beat map (composition seconds)

| t | Beat | Graphic |
|---|---|---|
| 4.00 | **logo wall** | full navy takeover, all 21 client marks drifting up, Shopify Premier Partner badge lands centre |
| 11.50 | premier partner | pulsing flame dot + "LIVE · EVERY SINGLE DAY" |
| 15.65 | revenue/profit | two risers, blue-tint → flame |
| 17.85 | **B-roll · Sweet E's** | full-bleed rotated phone footage, "SWEET E'S" chip |
| 19.75 | **B-roll · Dryft Sleep** | full-bleed, "DRYFT SLEEP" chip — the speaker himself is in the shot |
| 23.80 | **hero stamp** | "NOT A GUESS." + 6px shake on the footage |
| 26.60 | pattern | node lattice with a flame pulse |
| 33.75 | **end card** | film cross-dissolves out; lockup + "See if it will work for you." + "Learn More" pill, 3.25s |

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
drifting upward over a **full opaque navy takeover** — the footage is completely
covered for this beat — with the **Shopify Premier Partner** badge landing centre
as the hero.

All 22 supplied assets are used: 21 brand marks in the wall, plus the Premier
Partner badge as the hero.

`scripts/prep-logo-wall.sh` turns the mixed drop (white cards, black cards,
coloured cards, transparent PNGs) into uniform white silhouettes. Polarity is
decided per file by sampling the border — a light border means a dark mark, so
invert. Three sources need an override:

| Source | Override | Why |
|---|---|---|
| Dryft | force light-mark | light mark on a light card; the border heuristic misread it |
| Sweet E's | light-mark + level `60%,96%` | white script inside a pink circle on black — only the brightest pixels are the mark |
| Naturally Linda | light-mark + level `52%,92%` | white type on a rust card that otherwise normalises to a grey block |

**Entry and exit are both hard.** The scrim snaps opaque on the whip rather than
fading up (a fade showed the speaker through a half-opaque wall). The exit slides
the whole panel off the top, so the footage is revealed cleanly from beneath
instead of showing through the logos — which needs `#wall .in` to carry
`overflow: hidden`, because the drifting track is much taller than the frame and
would otherwise leave stray logos behind after the scrim had gone.

## Captions

**None baked in.** The bottom **300px** (9:16) / **190px** (1:1) is kept clear of
all graphics so captions can be added later without a relayout.

## Deliberate deviations from the EcomIQ house style

Both were requested directly and are intentional, not oversights:

- **No italic-serif emphasis word.** The brand signature (one Hedvig Letters Serif
  italic word per headline) is not used anywhere — the end card headline is plain
  white upright Rethink Sans. The Hedvig `@font-face` is still declared but unused.
- **Two graphics were cut on review** — the "THEORY" strike-through (8.36) and the
  "Not what should work / What already does" closing beat (30.04). Both stretches
  now play as plain A-roll, which gives the piece two deliberate breathing gaps.
- **No grid/crosshair texture over the footage.** It read as dirt on the speaker's
  face, so it survives on the end card only. Vignette and grain remain global.

## Resolution & delivery

All three sources are **3840×2160**, and every prepped asset is a **pure crop of
its master — no scaling anywhere**, so the delivery resolution is decided by the
renderer rather than baked in:

| Asset | Crop | Result |
|---|---|---|
| A-roll 9:16 | `crop=1216:2160:1266:0` | 1216 px is *all* the horizontal detail a 9:16 window of a 16:9 frame can hold |
| A-roll 4:5 | `crop=1728:2160:1010:0` | full-height 4:5 |
| A-roll 1:1 | `crop=2160:2160:794:0` | full-height square — true 4K |
| B-roll 9:16 | `transpose=1` only | lands natively at 2160×3840 |
| B-roll 4:5 | `transpose=1` + `crop=2160:2700` | true 4K |
| B-roll 1:1 | `transpose=1` + `crop=2160:2160` | true 4K |

**Shipping files** — `--quality high` (CRF 15) at native 1080×1920 / 1080×1350 / 1080×1080.
This is the right size for Meta feed and Reels, and the footage is now a *down*scale
rather than the 1.78× upscale of the earlier proxy build.

**2× exports** — `…-4k.mp4` via `--resolution portrait-4k` / `square-4k`:

- **1:1 at 2160×2160 is genuinely 4K** end to end.
- **9:16 at 2160×3840 upscales the footage.** The graphics, logo wall, type and
  end card all render at true 2×, but the A-roll only carries 1216 px of real
  width. Use it for archival or for platforms that reward a larger file; the
  1080 version is not visibly worse on a phone.

### The prepped A-roll crops are gitignored

At 143 MB, 202 MB and 250 MB they exceed GitHub's 100 MB per-file hard limit. They are
fully reproducible:

```bash
yt-dlp -f source -o .media/aroll-master.mov \
  "https://drive.google.com/file/d/1PrOe05PfJ1yxNLV7abFliy16ygbYtM-F/view"
bash scripts/prep-aug-general-ad-5.sh .media/aroll-master.mov
```

The B-roll crops are small enough to stay committed.
