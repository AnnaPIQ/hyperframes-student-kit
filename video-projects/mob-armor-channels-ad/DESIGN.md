# DESIGN — Mob Armor × EcomIQ social-proof ad

EcomIQ's ad, crediting the client. The client's mark opens it; EcomIQ signs it.

## Colors

| Hex | Token | Meaning (Law 7 — every hue owns one concept) |
|---|---|---|
| `#06284C` | `--brand-navy` | the ground. ~85% of every frame. |
| `#FFFFFF` | `--brand-white` | **all copy, without exception.** Also the two logos. |
| `#FF4C32` | `--brand-flame` | *an active paid channel.* One lit dot at 7.2s, four at 14.0s, the rule under `+500%`, the outro rule. Nothing else. |
| `#9CD4FF` | `--brand-blue-tint` | **graphic accent only — never type.** The unlit channel dots and the faint upper bloom. |

Four active hues. No fifth.

## Typography

**Rethink Sans** only, self-hosted `assets/fonts/RethinkSans.woff2` (no Google-Fonts
fetch at render time). Named literally in CSS, never through `var()` — the linter
doesn't resolve custom properties and would raise a false `font_family_without_font_face`.

| Role | Size (9:16) | Weight | Tracking |
|---|---|---|---|
| Figure (`+500%`, `1 → 4`) | 260–300px | 800 | −0.03em |
| Display (`TAP THE LINK`) | 108px | 800 | −0.02em |
| Eyebrow (`TOTAL SALES · 12 MONTHS`) | 30px | 600 | 0.34em, uppercase |
| Channel names | 27px | 700 | 0.16em, uppercase |

Hedvig Letters Serif is **not** used here. The EcomIQ italic-serif emphasis word is a
headline device; this piece has no headlines, only figures, and the brief locks
display type to weight 800.

## Motion

- **Blur-whip between every beat.** Out: `expo.in`, 0.20s, blur to 26px, x −140px.
  In: `expo.out`, 0.38s, blur from 26px, x +140px. A flame streak crosses under the
  swap. No hard cuts anywhere.
- Figures **scale** into place (0.86 → 1) — never a flat fade (anti-pattern #1).
- Camera never sleeps: the A-roll wrapper drifts 1.000 → 1.035 across the runtime;
  the vignette breathes on a 6s `sine.inOut` cycle.
- All tween end-times land on multiples of 1/30.
- Every timeline ends with the Law #11 duration anchor.

## Texture

Vignette + grain over every frame. **No perspective grid, no crosshairs** — the brief
removes them; the navy ground plus the vignette is the unifying texture instead.

## Layout — the subtitle-safe zone is a hard constraint

No burned-in subtitles. The bottom of the frame stays clear for the platform's own:

| | frame | keep clear below |
|---|---|---|
| 9:16 | 1080×1920 | **y = 1344** |
| 4:5 | 1080×1350 | **y = 945** |

Card content is centred in the space *above* that line via `padding-bottom`, not by
absolute positioning — so the same markup re-centres correctly at both sizes and the
4:5 script only has to swap the padding constant.

## What NOT to do

- No blue-tint, grey, or reduced-opacity white on type. Copy is `#FFFFFF` or absent.
  Secondary copy reads secondary through **size and tracking**, never colour.
- No second hot accent. Flame is the only warm hue; the b-roll's sparks are the one
  place warmth appears without being applied.
- Never recolour, stretch, split or crowd either logo. The Mob Armor lockup is used
  white, intact, side-by-side, on plain navy (its brand guide allows white or black only).
- No graphic on a beat with no spoken figure. No figure that isn't in the case study.
- No content below the subtitle-safe line — not even a rule or a dot.
- No hard cut on the A-roll: it is one uncut take running the whole piece.
