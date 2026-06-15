# b-roll-v2m-epic — BRIEF

**EcomIQ ad · "Scaling but losing money / margin pain" · Meta delivery**

## Format
- **Slug:** `b-roll-v2m-epic`
- **Aspect:** 9:16 vertical — **1080×1920** (`story` format). *Note:* your `npm run new`
  command ended in `meta` (which the tool maps to 4:5 / 1080×1350), but the creative
  intent says "Cinematic 9:16 vertical," so I scaffolded 9:16. Treating "meta" as the
  delivery platform (Reels/Stories). Flag if you actually want 4:5.
- **FPS:** 30
- **Duration:** ~78s (driven by the VO — transcript runs 0:00→1:18)

## Audience
Shopify / DTC founders scaling revenue but watching profit shrink. Sophisticated,
skeptical, numbers-aware.

## Intent / look
Cinematic 9:16, anamorphic feel, shallow DoF, slow dolly push-ins. Low-key volumetric
lighting, hard raking light, deep navy shadows. **Monochromatic navy + pale sky-blue,
cool tones, no warm colors.** Fine film grain, lifted blacks, subtle halation, slow
motion + smooth motion blur. Premium, art-directed fintech brand-film aesthetic.

## Brand (EcomIQ, adapted to the cool cinematic brief)
- **Palette:** Navy `#06284C` (canvas) · Blue Tint `#9CD4FF` (accent/italic emphasis) ·
  Sky `#DEEEFE` (pale surfaces) · White `#FFFFFF`.
- **Flame `#FF4C32`** — EcomIQ's only hot accent. The brief says "no warm colors," so
  flame is **reserved for the single final CTA button** (its signature use) and nowhere
  else. *Decision to confirm: flame-on-CTA-only vs. strictly cool throughout.*
- **Type:** Rethink Sans (headlines ≥72px, 100% leading, −2% tracking) +
  Hedvig Letters Serif *italic* for one emphasis word per headline (brand signature).
  Both vendored locally in `assets/fonts/`.
- **Logo:** `ecomiq-logo-white.svg` on navy.

## Script (VO from `ad 4.mov`)
Full transcript captured in STORYBOARD.md, mapped beat-by-beat. The talking head is
**not** shown — this is a b-roll + kinetic-type montage carried by the VO audio
(consistent with the "b-roll" project name). VO audio extracted from `ad 4.mov`.

## Captions
Clean phrase captions, body-level siblings, Rethink Sans, sky-blue accent on key words.
Timed to Whisper word onsets (`npx hyperframes transcribe`).

## Audio
- VO: 1.0 (extracted from `ad 4.mov`, drives all timing)
- Optional ambient drone pad: 0.15 (premium fintech mood) — needs a track or we ship VO-only
- Subtle whoosh SFX on whip transitions: 0.2

## Assets
- **VO source:** `ad 4.mov` (Drive, 108 MB) → extract `assets/vo.wav`
- **Real b-roll selects** (Drive → `curl` → re-encode H.264): founder typing/thinking
  close-ups, walking, driving, Dryft product, Shoptalk authority. Final selects in
  STORYBOARD.md. The multi-GB raw recordings are excluded (impractical to pull, and
  unnecessary).
- **Metaphor beats:** Runway Gen-4 (if key added) OR Canva-generated navy stills +
  parallax OR hand-built GSAP motion graphics.

## Decisions (LOCKED — Gate 5 sign-off 2026-06-15)
1. **Aspect ratio: 9:16 (1080×1920).** ✅
2. **Palette: flame on the final CTA button only.** Cool navy/sky-blue everywhere else. ✅
3. **Metaphor beats: Canva-generated navy stills + parallax now.** Swap in Runway Gen-4
   later if `RUNWAYML_API_SECRET` lands. Pure GSAP is the fallback if Canva stills don't
   read as cinematic. ✅
</content>
</invoke>
