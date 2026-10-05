# Profit Plan 90-Day: Meta 9:16 ad (EcomIQ)

Sean direct-to-camera ad for Shopify founders doing $20K+/month. Goal: book a
free discovery call. Edit plan (source of truth for timing, B-roll picks and
copy): the "90-Day Profit Plan Ad: Edit Plan" doc.

## Style Prompt
Premium, operator-led, clean. Sean is the anchor; graphics explain numbers;
B-roll is proof. Visual system matches the August Mob Armor 9:16 ad: navy
radial cards, tracked eyebrow labels, huge white numbers with a short flame
underline, sentence-case white captions.

This brief overrides MOTION_PHILOSOPHY.md's texture rules (no chrome type,
grid, grain or whip transitions). The brand brief asks for hard cuts, mask
reveals, line draws and bar fills, and bans glow, glitch and neon.

## Colors
| Hex | Role |
|---|---|
| #06284C | Navy: cards, panels, scrims |
| #FFFFFF | All primary type, hero numbers |
| #FF4C32 | Flame: the only hot accent. PROFIT, FREE, BOOK NOW pill, underlines, profit line/bar |
| #9CD4FF | Blue Tint: SALES line, eyebrows, the one italic serif word |
| #DEEEFE | Sky: bar outlines, rails |

## Typography
Rethink Sans (800 headlines at -2% tracking, 600 captions, 700 tracked
eyebrows). Hedvig Letters Serif italic for one emphasis word per graphic only.
Local woff2 in assets/fonts.

## Layout
- 1080x1920. Message text only between y 270 and y 1250 (Meta safe zone).
- Captions: y 1135 to 1245, 50px SemiBold.
- Sean framing modes on #cam: WIDE 1.0x, GRAPHIC 1.15x bottom-anchored (face
  in the top half, graphics on the chest), TIGHT 1.3x.

## What NOT to Do
- No glitch, neon, glow, spinning type, bouncy cartoon motion, cash/coin SFX.
- No Sweet E's or Dryft footage near the +500% claim.
- No Rebuy stage stats in frame.
- No dollar values on the tracker; the three profit killers stay unnamed.
- Never a second serif emphasis word in one graphic.

## Rebuild
```bash
bash scripts/prep-media.sh "/path/to/Ad - Your 90-day profit plan.mov"   # A-roll + B-roll -> assets/media
python3 scripts/build-audio.py                                            # SFX + VO mix
npx hyperframes lint && npx hyperframes render --quality standard --output renders/final.mp4
```
Music is not included: add a licensed bed in the edit, 18 to 20 dB under VO.
