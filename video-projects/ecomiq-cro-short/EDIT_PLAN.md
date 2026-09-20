# EcomIQ CRO short — edit plan

Sean's VO is the spine; the Showcase Reel montage is the visuals underneath it.
Sean is never on screen as a talking head — it is montage throughout with his
voice over the top, cutting to an EcomIQ end card on the closing line.

Two exports, same edit, two frames:

| Export | Project | Size | Deliverable |
|---|---|---|---|
| 9:16 vertical | `ecomiq-cro-short` | 1080×1920 | `renders/ecomiq-cro-916.mp4` · `final.mp4` |
| 4:5 feed | `ecomiq-cro-short-45` | 1080×1350 | `renders/ecomiq-cro-45.mp4` · `final.mp4` |

Total runtime **22.90s**. H.264 High / AAC LC, faststart.

---

## Sources

| Role | File | Probe |
|---|---|---|
| VO (master) | `Showcase`→ `CRO2.aifc` | AIFF-C, pcm_s24be, mono, 48 kHz, **22.23s** |
| Montage 9:16 | `Showcase Reel.mp4` | H.264 1080×1920, 30fps, 29.70s |
| Montage 1:1 | `Showcase ad-1-1.mp4` | H.264 1440×1440, 30fps, 29.70s |

Both montage masters are the **same edit** — identical 891 frames and identical
shot boundaries — reframed. That is why one shot map drives both exports.

The montage's own audio is discarded. The VO is loudness-normalised to
**-16 LUFS / -1.5 dBTP** (social delivery standard) and carried as
`assets/sean-vo.wav`.

### The transcript on the tape

The VO differs from the script that came with the brief. What Sean actually says:

> Want more of your Shopify traffic to actually buy? You're paying for every
> visitor, too few of them actually convert, and we guarantee we can change
> that. Give us 90 days, you'll work with an EcomIQ strategist who'll turn more
> of those visitors into sales, more sales from the traffic you've already got.
> Tap the link and see if you qualify.

The line "want to see if we can help you" is **not** in this recording. The
closest is "Tap the link and see if you qualify" at **19.77s**.

---

## The end-card trigger

| Line | In | Out |
|---|---|---|
| **"more sales from the traffic you've already got."** | **16.87s** | 19.66s |
| "Tap the link and see if you qualify." | 19.77s | 22.48s |

The card cuts in at **16.87s**, landing on the word *more*, and holds **6.03s**
to 22.90s with the VO playing out over it.

---

## Shot map

The reel is a rapid-cut montage — its own shots fire every 0.6–0.9s — so the bed
runs at **0.84x** to let each one land, and draws from the **back half** of the
reel rather than sampling across all of it. Source 13.87–27.56 is the whole
usable tail; at 0.84x it fills the 16.87s under the VO. Nothing before 13.87 is
used, except one deliberate insert.

| # | On screen | Montage source | Content |
|---|---|---|---|
| A | 0.00–8.69 | 13.870–21.170 | store aisle → storefront UI → street → retail → café |
| B | 8.69–9.36 | 7.030–7.597 | **Shopify Premier Partner card — INSERT** |
| C | 9.36–16.87 | 21.170–27.560 | Tesla → laptop → expo → customer buys → closes on Sean's portrait |
| — | 16.87–22.90 | — | **END CARD** |

**B is the one frame pulled from outside the tail.** It is the strongest
credibility image in the reel and it lands square on the word *guarantee*
(VO 8.81–9.08). C resumes exactly where A left off, so it reads as a clean
insert cut rather than a jump. Drop B and widen A/C if it isn't wanted.

Source past **27.73s** is the montage's own baked-in EcomIQ end card. Never
pulled from — ours is built in the composition.

### Transitions

Two **hard cuts**, in and out of the insert. An insert cut is always hard — a
dissolve would read as a scene change rather than a cutaway. With the reel
slowed and the tail running continuously either side, the edit sits far calmer
than the six-block version it replaces. A 0.19s sky-blue flash still carries
the cut into the end card so the card arrives on the beat.

The bed is built ~0.23s longer than the 16.87s clip and the engine trims the
tail: `ffmpeg`'s `trim` floors each block to a whole source frame, and matching
16.87 exactly left the bed two frames short, flashing navy before the card.

---

## Motion graphics

Brand tokens only — flame `#FF4C32`, blue tint `#9CD4FF`, Rethink Sans, with the
one Hedvig Letters Serif italic reserved for *days*. **No captions.**

| Mark | Time | Beat |
|---|---|---|
| EcomIQ white lockup, top-left | 0.00–16.87 | persistent, off as the end card takes over |
| Conversion-gap bars (VISITORS / BUYERS) | 6.30–7.93 | "too few of them actually convert" |
| GUARANTEED flame pill | 9.25–10.55 | "we guarantee we can change that" |
| **90** counter + *days* | 10.82–13.60 | "Give us 90 days" |
| VISITORS → SALES | 14.90–16.80 | "turn more of those visitors into sales" |
| End card: logo + headline + "Link Below" | 16.87–22.90 | the close |

The end card reads, in order: EcomIQ lockup → **"More sales from the traffic you
have already got."** → **Guaranteed** → flame "Link Below" pill, with an even
96px of air between all four. Guaranteed is white upright Rethink Sans, not a
roman serif — the brand only ever sets the serif italic, so an upright Hedvig
would be off-system. The headline appears as Sean says that exact line.

The bars are deliberately unlabelled by percentage — the script makes no
numeric claim, so neither does the graphic.

---

## Framing decisions

- **9:16** uses the vertical master **as-is**. Native 1080×1920, zero loss.
- **4:5** is cut from the **square** master: centre-crop 1152×1440 (20% off the
  sides) then scale to 1080×1350. Cropping the 9:16 master into 4:5 instead
  would drop 29.7% of the height and clip heads; scale-and-pad would put 160px
  black bars down both sides of a feed ad.
- One crop note: the 4:5 trims the outer edges of the storefront-UI shot in
  beat A, so a little of that page's left-hand text is lost. Inherent to any
  crop of a square into 4:5; the shot still reads.

---

## Rebuild

```bash
cd video-projects/ecomiq-cro-short
bash scripts/fetch-sources.sh     # pulls both masters + the VO from Drive
bash scripts/build-bed.sh 916     # -> assets/montage-bed-916.mp4
bash scripts/build-bed.sh 45      # -> ../ecomiq-cro-short-45/assets/montage-bed-45.mp4
python3 scripts/make-45.py        # regenerates the 4:5 root from this one
npx hyperframes lint
npx hyperframes render --quality standard --output renders/ecomiq-cro-916.mp4
```

`index.html` is the single source of truth for both frames — edit it, re-run
`make-45.py`, and the 4:5 follows.
