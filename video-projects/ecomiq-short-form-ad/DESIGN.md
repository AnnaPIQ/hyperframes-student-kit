# ecomiq-short-form-ad — Design Spec

Format: 9:16 Story/Reels · 1080x1920 @ 30fps · Safe area ~10% margins.

Brand kit copied from the EcomIQ brand system. Tokens live in `assets/brand-tokens.css`;
fonts are local `.woff2` in `assets/fonts/` (Rethink Sans + Hedvig Letters Serif).

## This project's idea
- **Hook:** "The problem isn't too few ideas — it's too many." (real talking-head A-roll,
  shot at a dev/e-commerce conference — DotDev 2026, Shopify booth in shot).
- **Message:** Every platform/conference/coach hands you another good idea; saying yes to
  all of them keeps you busy while the numbers stay flat. The brands that grow do one or
  two things really, really well. → maps directly onto EcomIQ's "clear up confusion, focus
  on what moves the numbers."
- **CTA:** *Rethink* your strategy. → ecomiq.com

## Structure (~28s)
A-roll is the spine (its own voice carries the ad); B-roll cuts away on the speech beats.

- **0–19s — the chaos:** A-roll face beats intercut with **Folder-1 phone footage** (packed
  expo floor, booths, screens, people on phones) = "too many ideas / tools."
- **19–26s — the payoff (on-camera):** two expo-floor cutaways carry *"Because the brands
  that grow aren't doing 20 things badly"* (and hide the off-camera VO splice at 19s), then
  it lands on the speaker's face for *"one or two things really, really well."*
- **~26–27.9s — end card (2s):** navy, EcomIQ logo, *Rethink* your strategy. + flame `ecomiq.com →`.

> Note: the Folder-2 laptop-typing b-roll was cut — it didn't land. The prepped clips remain
> local under `assets/broll/` (unused) in case a calm beat is wanted later.

### VO cut
The 47s source is spliced to problem→payoff: src `0–19.00s` (ends exactly on "flat", excludes the next word "When") + src `39.00–46.0s` (starts exactly on "Because", excludes the trailing "…is")
(payoff), pre-rendered into one file `assets/aroll/vo.m4a` with a short fade at the exact
word boundaries so there's no click, ambient jump, or clipped-syllable fragment
(butt-joined `<audio>` clips jolt, and mis-placed cuts leak the neighbouring word — see LESSONS).
The video splice is hidden under the b8/b9 expo cutaways. Audio is loudness-normalized
(`loudnorm I=-16`, high-pass 90Hz) to lift the quiet, ambient conference recording.

### Audio
- `vo` — the pre-spliced A-roll voice, one file `assets/aroll/vo.m4a` (track 3), 0–25.9s.
- `music` — **silent, duckable placeholder** at `data-volume=0.18` (track 4). Drop a real
  bed into `assets/music-bed.m4a` and it already sits under the VO.

## Footage normalization
Every source is natively portrait 9:16 (1080×1920, 4K 2160×3840, or DSCF 1920×1080 with a
−90° rotation flag). Normalized once each to 1080×1920 H.264 via
`scale=…:force_original_aspect_ratio=increase,crop=1080:1920` + ffmpeg autorotate (no
transpose — that would double-rotate). **No destructive crops, no letterbox padding.**
Raw + prepped media stays local under `assets/{incoming,aroll,broll}/` (gitignored); only
`index.html`, the brand kit, and the final `renders/*.mp4` ship.

## Motion / brand rules
- Snappy hard cuts between A-roll and B-roll (intentional insert-edit rhythm, not jump cuts).
- Persistent white EcomIQ wordmark top-left on every shot (top scrim + drop-shadow for
  legibility over bright footage).
- End card: exactly one serif-italic emphasis word (*Rethink*); flame orange is the only
  hot accent; Rethink Sans headline at −3% tracking, ~1.0 leading.

## What NOT to do
- No captions (per brief — the voice carries it).
- Don't animate `width/height/top/left` (or dimensions) on a `<video>` — freezes frames.
- No second hot accent beyond flame orange; never two italic emphasis words.
- Don't commit raw/prepped footage — it's local staging.
