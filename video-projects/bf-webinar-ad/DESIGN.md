# bf-webinar-ad — Design Spec

EcomIQ Black Friday free-webinar ad. Sean's A-roll is the spine (full VO, 0 to 35.3s),
B-roll carries social proof, motion graphics emphasise the key numbers, and a
workbook-style CTA end card closes on "click the link below".

Two deliverables are built from ONE template (`src/ad.template.html` + `build.mjs`):

| File | Ratio | Size | Footage |
|---|---|---|---|
| `index.html` | 9:16 Reels / Stories | 1080x1920 | `assets/9x16/*` (A-roll 1.25x crop from 4K for headroom) |
| `../bf-webinar-ad-4x5/index.html` | 4:5 Meta feed | 1080x1350 | `bf-webinar-ad-4x5/assets/4x5/*` (portrait centre-crop, see flags) |

Never edit `index*.html` by hand. Edit the template, then `node build.mjs`.

Brand kit copied from `assets/ecomiq/`. Tokens: `assets/brand-tokens.css`. Fonts: local
`assets/fonts/RethinkSans.woff2` + `assets/fonts/HedvigLettersSerif.woff2`.

## Tokens / assets in use
- Colours: `--brand-navy` (canvas), `--brand-white` (all text incl. eyebrows; no light blue or
  italics, per review), `--brand-sky` (calendar tile), `--brand-flame` (the one hot accent: CTA pill, "x", strike,
  checkmarks, tallest bar), `--brand-white`, `--brand-text-dim`, `--brand-surface-2`,
  `--brand-border`, `--brand-gradient-2` (end-card bloom only). Scrims use
  `color-mix()` on `--brand-navy`, no new hex values.
- Type: `'Rethink Sans'` 500/600/800, `'Hedvig Letters Serif'` upright (not italic) for the
  one emphasis word on the end card ("Double").
- Logos: `ecomiq-logo-white.svg` persistent top-left (22% width, enlarged at review; soft shadow, every frame);
  `ecomiq-icon-white.svg` as the end-card mark.

## Beat map (seconds, anchored to faster-whisper word timestamps in `assets/transcript/`)
| t | VO | Picture | Graphic |
|---|---|---|---|
| 0.0 to 5.9 | "double your revenue ... free webinar" | Sean | 1.0x to 2.0x count-up + last-year / this-year bars; then "Free live webinar" pill |
| 5.9 to 8.45 | "exact secrets we use at Pacific IQ" | Shoptalk stage clip in a card | none (footage is the proof) |
| 8.45 to 10.1 | "eight and nine figure brands" | Dryft product | $10,000,000 to $100,000,000 count-up |
| 10.1 to 13.8 | "year on year ... incredible performance" | Sweet E's cake, cookies | none |
| 13.8 to 17.25 | "not just what discounts" | Sean | 0 to 50% OFF count-up, flame strike, "It's the whole plan." |
| 17.25 to 24.85 | ad accounts / creatives / bundles / emails / once live | laptop, Sweet E's cookies, Dryft bundle, Klaviyo event, Sweet E's packing | none |
| 24.85 to 28.45 | "walk through all of this" | Sean, slow push-in | rest beat |
| 28.45 to 30.3 | "October 14th" | full navy | calendar tile flip, 01 to 14 count |
| 30.3 to 32.45 | "if that's helpful" | Sean | none |
| 32.45 to 37.0 | "click the link below ... completely free" | end card | icon, headline, subhead, flame pill, 4.5s hold |

Transitions: vertical whip (y + blur) on every cut, no light streak (removed at review). No hard cuts.

Motion graphics are for emphasis only (review): 2x hook, free-webinar pill, 8/9-figure count,
not-just-discounts strike, date card, end card. Everything else is footage.

## Subtitle safe zone (for subtitles added later by hand)
No graphic enters this strip; motion graphics sit directly above it and centred scenes
(date, end card) centre above it. Controlled by `--sub-zone` in the template.
- 9:16: y 1385 to 1640 (the bottom 280px is left for the Reels caption / CTA UI)
- 4:5: y 1060 to 1290

## Audio
- `assets/audio/sean-vo.m4a` at 1.0 (full A-roll audio). B-roll is muted.
- `assets/audio/music-bed-PLACEHOLDER.m4a` (silent) at 0.15, the ducked-under-VO level.
  Swap the file for the licensed bed, keep the filename or update the template.

## Flags
- A-roll framing: recropped from the 4K source so Sean's head starts ~15% from the top.
  9:16 = `crop=1728:3072:216:768`, 4:5 = `crop=2160:2700:0:862`, both from `IMG_1545.MOV`.
- 4:5 B-roll crops: portrait B-roll is centre-cropped 1920 to 1350 tall. Padding would
  pillarbox it.
- Stage clip is landscape: scaled to fit and framed as a card (no crop) in both ratios.

## What NOT to do
- No captions (brief). No second serif word in a frame. Flame only for hot moments.
- Don't hardcode colours or fonts. Don't hand-edit generated `index*.html`.
