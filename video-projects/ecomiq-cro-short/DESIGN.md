# ecomiq-cro-short — Design Spec

Short-form EcomIQ CRO ad: montage visuals under Sean's voiceover, resolving to a
native EcomIQ end card.

Formats: **9:16** 1080x1920 (primary) · **4:5** 1080x1350 · **1:1** 1080x1080, all
@30fps, 21.60s. Safe area ~10% margins.

Brand kit from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens in `assets/brand-tokens.css`; Rethink Sans + Hedvig Letters Serif ship as
local `.woff2` in `assets/fonts/` (no CDN at render time).

## This project's idea
- **Hook:** "Run a Shopify store? Getting the traffic but not the sales?"
- **Message:** conversion rate is the fixable problem; 90 days with an EcomIQ
  strategist moves it.
- **CTA:** flame-orange "Link Below" pill on the navy end card.

## Structure
| | |
|---|---|
| 0.00 to 15.43 | 11-shot montage cutdown (~0.68x retime, 1.40s avg shot), white EcomIQ lockup pinned top-left, flame progress rule filling along the bottom |
| 14.96 to 15.36 | light-streak whip + cross-dissolve, resolving **on** the word "Stop" |
| 15.36 to 21.60 | end card holds under the rest of the VO (6.24s) |

Audio is Sean's VO only, at `data-volume="1"`. The montage's own audio is dropped
at prep (`-an`), so there is nothing to duck against. No music bed, no captions.

## Palette in use (all from the tokens, no new hues)
`--brand-navy` canvas · `--brand-white` lockup and logo · `--brand-flame` the single
hot accent, used only for the progress rule, the CTA pill and its bloom ·
`--brand-blue-tint` as a faint top wash on the card.

## Type
Rethink Sans 800 on the card headline at 64px (9:16), 100% leading, -2% tracking.
Rethink Sans 700 on the CTA. **Exactly one** italic Hedvig Letters Serif emphasis
word, "Guaranteed", in `--brand-blue-tint`. Never add a second.

## Motion
Hard cuts inside each act, a 6-frame cross-dissolve at each of the three act
boundaries, and one light-streak whip into the end card. Shots are retimed to ~0.68x
so the cutting breathes at ~1.40s per shot. On the card, the headline lands line by
line and "Guaranteed" pulses 0.18s ahead of the spoken word.

## What NOT to do
- Don't un-mute the montage. Sean's VO is the only audio.
- Don't add a second root-level HTML with a `data-composition-id` — the runtime
  treats it as a second entry point and layers the audio. Generate each ratio into
  `index.html` in turn (see `scripts/render-all.sh`).
- Don't move the end card off 15.36s without re-measuring the onset of "Stop".
- Don't introduce a second hot accent. Flame orange is the only one.
- Don't stretch or recolour the logo.
- Don't put a watermark mark or an arrow glyph back on the card; both were removed
  deliberately.
- Don't add a second serif-italic emphasis word alongside "Guaranteed".

## Build
```bash
python3 scripts/build-cutdown.py --all        # assemble the montage cutdowns
bash    scripts/render-all.sh standard        # generate + lint + render all 3 ratios
```
