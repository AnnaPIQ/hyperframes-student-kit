# EcomIQ — Brand & Design Spec (my-meta-ad)

> Distilled from the EcomIQ Brand Guidelines. Source of truth for this
> project's look & feel. Palette mirrored into `assets/brand-tokens.css`.

## Brand essence
Precision and clarity for e-commerce. Trust, reliability, efficiency,
empowerment. Tone: modern yet trustworthy, analytical yet approachable.
Signature lines: *"Rethink Your Strategy"*, *"Clear Up Confusion, Gain Peace of Mind."*

## Format
- **Platform:** Meta (Facebook / Instagram) feed advertising
- **Aspect:** 4:5 vertical · **Dimensions:** 1080 × 1350 px · **FPS:** 30
- **Safe area:** hero content inside ~10% margins (≈108px sides)

## Palette  → `assets/brand-tokens.css`
| Name | Hex | Token | Use |
|---|---|---|---|
| Navy | `#06284C` | `--brand-navy` | primary background, primary text on light |
| Blue Tint | `#9CD4FF` | `--brand-blue-tint` | secondary accent, highlights, italic emphasis |
| Sky Blue | `#DEEEFE` | `--brand-sky` | pale surfaces / subtle dividers |
| Flame Orange | `#FF4C32` | `--brand-flame` | hot accent, CTAs, emphasis |
| White | `#FFFFFF` | `--brand-white` | text on navy |
| Black | `#000000` | `--brand-black` | neutral |

**Gradients:** `--brand-gradient-1` (warm: flame→gold) · `--brand-gradient-2` (blue→flame).

## Type — both on Google Fonts
- **Primary sans:** **Rethink Sans** (Reg / Med / Bold) — headlines & body.
  Large headlines 72px+, 100% leading, **−2% tracking**.
- **Secondary serif:** **Hedvig Letters Serif** — italic emphasis word in headlines
  ("*Rethink*"), reports, credibility moments.

## Logo (in `assets/`)
- `ecomiq-logo-white.svg/.png` — full lockup for **dark/navy** backgrounds (use this on ads)
- `ecomiq-logo-navy.svg/.png` — full lockup for **light** backgrounds
- `ecomiq-icon-white.svg` — icon-only mark (white)
- `ecomiq-icon-navy.png` — icon mark on navy square

## Art direction
Vibrant, fresh product photography (bright, high-key, energetic) — set against
navy or white. Italic-serif emphasis word + bold sans is the headline signature.

## What NOT to do
- Don't stretch or recolor the logo outside the palette.
- Don't drop tracking back to 0 on big headlines (brand uses −2%).
- Don't mix in off-brand accent colors — flame orange is the only hot accent.

---

## Aug-General ad 4 — short-form talking-head cut (added 2026-08-26)

Two new compositions built from one A-roll, sharing an identical beat map and the
tokens above. Neither hardcodes a colour or a font — everything resolves through
`assets/brand-tokens.css` and the local `.woff2` faces.

| | File | Canvas | Render |
|---|---|---|---|
| 9:16 | `compositions/aug-general-ad-4-vertical.html` | 1080×1920 | `renders/aug-general-ad-4-vertical.mp4` |
| 1:1 | `compositions/aug-general-ad-4-square.html` | 1080×1080 | `renders/aug-general-ad-4-square.mp4` |

**Source.** `What We Do Version 1.mov` (Drive) — 3840×2160 ProRes, 25fps, 37.20s,
PCM 24-bit. Normalized by `scripts/prep-aroll.sh` into `assets/aroll-vertical.mp4`,
`assets/aroll-square.mp4` and `assets/aroll-vo.m4a` (H.264 · yuv420p · CRF 20 ·
30fps CFR · faststart · AAC 192k).

**Both targets are crops, centre-punched on the speaker at ~47% of frame width:**
9:16 crops `1215×2160 @ x=1198` → `1080×1920`; 1:1 crops `2160×2160 @ x=725` →
`1080×1080`. Both are **full bleed** — the clip fills the canvas edge to edge.

**Don't try to "zoom out" by widening these crops.** They already use the source's
entire 2160-pixel height, so this is the widest field of view a full-bleed frame
can have. The source is a mid-shot: Sean is framed from about the waist up and
his legs are not in the footage at all. A wider window shrinks the clip below the
canvas and leaves a navy strip along the bottom — tried in rev 2, and it reads as
an overlay sitting on the speaker rather than as a design choice. If more of him
is ever genuinely needed, that's a re-shoot, or a blurred self-fill layered behind
the clip — not a wider crop.

**Beat map** (composition time; anchored to `silencedetect` on the real waveform,
not estimated). Speech runs 3.717→34.172s in the source; the clip is trimmed from
3.45s so VO starts at t≈0.27.

| t | VO | On screen |
|---|---|---|
| 0.27–5.02 | "Most ecommerce advice…not working inside brands." | `#g1` "Most advice" + flame strike-through wipe |
| 5.58–6.41 | "We're not those people." | clean — the line lands on the face |
| 6.72–13.46 | "…coaching side of a Shopify agency, working inside dozens of live brands…" | `#g3` full-frame: drifting wall of 21 real client logos + **Shopify Premier Partner** badge landing centre on "Shopify agency", then "Inside dozens of live brands" |
| 14.73–22.00 | "…we're doing it right now." | `#g4` "right now." in Hedvig italic, scale-in |
| 22.49–23.66 | "No gurus." | `#g5` full-frame type + strike, over a navy scrim |
| 23.84–24.66 | "No theory." | `#g6` same layout, whip-cut (rule of threes, beat 2) |
| 24.80–26.81 | "Just what actually grows a profitable brand." | `#g7` full-frame type, all white; flame rising rule carries the accent |
| 27.82–30.72 | "Want to see if we're a good fit? Tap the link…" | clean; logo begins its flight |
| 30.87–36.00 | — | End card: logo centre, "Advice from people doing it" (all white, upright), flame "Learn More →" pill, 5.1s hold |

### Beat 3 — the credibility beat

Modelled on `Shopify_Partner_Hero_v2.mp4` (Anna's reference): real client marks
as low-opacity **white silhouettes** drifting on navy, with the Shopify Premier
Partner badge landing centre as hero. It replaces an earlier abstract row of
blue tiles, which said "dozens of brands" without showing any.

- **Assets:** `assets/brands/` — 21 client marks + `shopify-premier-partner.png`.
  Built by `scripts/prep-brand-logos.sh` from the raw logo pack.
- **Silhouetting:** polarity is decided per file from mean luminance (dark mark
  on light ground → invert; light mark on dark ground → straight). Marks on a
  solid colour (Ozium, Flaming Estate, Naturally Linda, dryft, Sweet E) can't
  use either rule — the ground survives as a grey box — so those are colour-keyed
  out instead, everywhere rather than flood-filled from the edges, which would
  leave letter counters (Ozium's O) filled.
- **The badge is not silhouetted** — it ships as the original black-on-white
  card, upscaled 3× at prep time because the source is only 338×149.
- **Two parallax layers** (`.a` at 13% opacity drifting −150px, `.b` at 22%
  drifting −280px) so the wall never reads as one flat sheet sliding past.
- **The badge lands on the word**, at 8.4s — "Shopify agency" — not at the top
  of the beat. The copy lands at 10.4s on "dozens of live brands".
- Every logo appears exactly once; duplicates trip the linter's
  `duplicate_media_discovery_risk`.

**Design rules this cut follows**
- **No captions** — the band sits at y 1080–1400 (9:16) / 640–860 (1:1), and the
  zone below it (y 1420–1700 / 880–1010) is deliberately empty so captions can be
  dropped in later without recomposing. The bottom strip is left clear of the
  platform's own UI chrome.
- **Persistent logo, one callback.** The lockup sits top-left on every frame in a
  positioned **non-`clip`** wrapper (LESSONS.md — the engine repositions `clip`
  nodes), then flies to centre at 30.53 to *become* the end-card logo. One logo,
  every frame, and the piece's single visual callback.
- **Unifying texture on every frame:** navy grade scrim → registration crosshairs →
  vignette (slow breath) → deterministic CSS grain. No PNG, no PRNG.
- **Transitions are motion, never slow fades:** blur-whip in/out on every band, a
  motion-blurred light streak masking each of the three type cuts.
- Flame orange stays the only hot accent. Per Anna's direction the serif-italic
  emphasis is used **only** on "right now." (17.4s) — the g7 line and the end-card
  headline are both plain white upright sans.

**Logo sizing note.** The lockup is 1671×286 (5.84:1), so the "8–10% of width"
watermark spec would render it ~18px tall and unreadable. It ships at 216px (20%)
on 9:16 and 194px (18%) on 1:1. To go smaller, switch to `ecomiq-icon-white.svg` —
the square mark reads fine at 9%.
