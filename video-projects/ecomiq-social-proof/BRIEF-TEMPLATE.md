# EcomIQ social-proof ad — reusable brief

Paste everything below the line into a **new session** to build another ad in this style.
Fill in the four `‹…›` blanks first; leave the rest exactly as written.

The reference build is `video-projects/ecomiq-social-proof/` on branch
`claude/ecomiq-social-proof-ad-s9352m` (commit `39377b2`) — Dryft Sleep, 38.5s, 9:16 + 4:5.

---

## Brief — EcomIQ social-proof ad (‹BRAND›)

Build an EcomIQ social-proof video ad, **same idea and style** as the Dryft Sleep one in
`video-projects/ecomiq-social-proof/`. New voiceover, new b-roll, new numbers.

**Ground yourself first — do this before proposing anything:**
1. Read `video-projects/ecomiq-social-proof/DESIGN.md` and `EDIT-PLAN.md` end to end. They
   are the style spec and the worked example.
2. Read `docs/LESSONS.md`. It lists the bugs that cost the last build hours. Don't rediscover them.
3. Read the workspace `CLAUDE.md` and `MOTION_PHILOSOPHY.md`.
4. Open `index.html` and `scripts/` in that project. **Copy the project, then swap the media
   and numbers** — do not start from a blank composition.

**Sources**
- A-roll (Sean to camera, picture + sound): ‹DRIVE LINK›
- B-roll: ‹DRIVE FOLDER LINK›
- Proof / case study: ‹URL or the real figures›

**The idea (unchanged)**
Audio-led, driven by the **full voiceover** — no cutdown. Cuts between Sean to camera and
b-roll. A graphic appears **only where a real figure is spoken**, and every one is a
**full-bleed navy card**, never a numeral floating over footage. Beats with no figure play
clean footage with no scrim. Ends on the EcomIQ end card.

**Content rules — these are hard**
- **Real values only. Never invent a figure, a quote, or a star rating.** Every number on
  screen must trace to the VO or the published case study. If a beat has no real number,
  it gets no graphic.
- Never redraw a third-party logo. Use the brand's own file — their site's white lockup
  (Shopify stores: `/cdn/shop/files/…`) is usually perfect on navy.
- No captions/subtitles burned in, and **keep the bottom ~30% of frame clear** for subtitles
  added later.
- No unlabelled charts. A bar that can't say what it compares says nothing; label it on a
  card, and make the proportions the real ratio.

**Look (match the reference exactly)**
- Brand tokens and local fonts only — `assets/brand-tokens.css`, Rethink Sans. Don't hardcode
  or invent colours/fonts.
- **All text is white.** Blue tint is for non-text accents only.
- **All display type is weight 800.** A 700 cut loads fine and lints clean but reads as a
  different typeface next to it. Only small tracked eyebrows go lighter.
- Navy + flame orange, flame is the only hot accent.
- Persistent EcomIQ logo top-left on every frame until the end card.
- Every cut is a **motion-blurred vertical whip**, never a fade. The camera never sleeps
  (slow scale push on b-roll). Navy vignette + deterministic CSS grain on every frame.
- **End card:** centred oversized EcomIQ lockup → one wide-tracked uppercase line → flame pill.
  Text: "SEE IF WE CAN HELP YOU" / "Find out more" unless told otherwise.

**Pipeline**
```
scripts/pull-media.sh      # yt-dlp for the A-roll preview stream; HTTP-range ffmpeg for b-roll
scripts/prep-assets.sh     # VO trim + loudnorm; A-roll + b-roll crops per ratio
python3 scripts/make-ratios.py   # generates the 4:5 and 1:1 comps FROM index.html
npx hyperframes lint
node scripts/scrub.mjs <comp> <id> <w> <h> <t,…>   # cheap layout check, seconds not minutes
npx hyperframes render --quality high --output renders/<name>.mp4
```
Adapt the scripts rather than rewriting them — the trim points, crop windows and per-clip
brightness lifts in there were all measured.

**Checkpoint:** produce a **transcript-timed edit plan** (word-level timings, cut sheet, which
figure lands on which spoken word) and **wait for my approval before rendering.**

**Traps that cost real time last build — check these**
- `renders/` is **gitignored** and this runs in a throwaway container. The deliverables are
  the committed **`final-*.mp4` at the project root**. Copy renders up and commit them every
  version, or what I can actually download stays stale.
- A full-bleed card needs `position: absolute; inset: 0` — `z-index` is inert without it, and
  the card silently falls into normal flow. Author hidden states as `opacity: 0` **in CSS**;
  `tl.set(…, 0)` doesn't render frame 0.
- Audio and video share one `data-track-index` space. A collision breaks the element.
- Don't tween `letterSpacing` (lint rejects it — it reflows text). Animate per-word spans.
- `tl.call()` never fires under render (the engine seeks). Use a proxy tween + `onUpdate`.
- Vendor GSAP locally. No render-time network fetches. No `repeat: -1`.
- Playwright scrubbing is reliable for type/layout but **not** for `<video>` frames — verify
  b-roll from a draft render or straight off the clip with `ffmpeg -ss`.
- Check each b-roll clip's first second for a handheld wobble; `data-media-start` trims past it.
- Phone-vertical clips are often stored sideways with no rotation metadata → `transpose=1`.
- If the A-roll's Drive source is quota-blocked, use the preview stream, but **retry the master
  before the final bake** — the Dryft master turned out to be 4K, and the 9:16 crop had been
  upscaling. To re-align a master against an approved cut, trim a candidate then measure the
  result against the approved audio with FFT cross-correlation; RMS onset estimates were wrong
  twice.

**Verification before you tell me it's done (not optional)**
Render a draft, pull a frame at every scene's hero moment plus each transition, and **actually
`Read` each PNG**. Check: no cropped faces, no text overflow, graphics land on the right word,
bottom subtitle zone clear. Lint passing is not verification.

**Delivery**
- **9:16 (1080×1920)** and **4:5 (1080×1350)**, 30fps, H.264/AAC, `+faststart`,
  `--quality high`.
- Commit as `final-9x16.mp4` / `final-4x5.mp4` at the project root, plus a copy under
  30 MiB if the master exceeds it (that's the chat upload limit), and give me the links.
