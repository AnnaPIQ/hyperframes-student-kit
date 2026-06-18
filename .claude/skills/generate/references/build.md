# Build Reference (Gate 3)

The HyperFrames **render contract** (`CLAUDE.md` / `/hyperframes`) governs everything here — read it. This file is the `/generate`-specific build playbook on top of it: the composition scaffold, the 9:16 talking-head choreography, the EcomIQ Meta-ad recipe, and the determinism rules.

---

## Composition scaffold (every sub-composition)

```html
<div data-composition-id="scene-name" class="clip"
     data-start="..." data-duration="..." data-track-index="1">
  <style>
    [data-composition-id="scene-name"] { /* ALL styles scoped to this id */ }
  </style>
  <!-- DOM -->
  <script>
    (function () {
      const SLOT_DURATION = /* match data-duration */;
      const tl = gsap.timeline({ paused: true });
      // ...tweens, all LOCAL (0-based from scene start)...
      tl.to({}, { duration: SLOT_DURATION }, 0);   // anchor — MOTION_PHILOSOPHY Law 11
      window.__timelines["scene-name"] = tl;        // key === data-composition-id, exactly
    })();
  </script>
</div>
```

- Root `index.html`: `id` + `data-composition-id` + `data-start="0"` + `data-width` + `data-height`. Sub-comps loaded via `<template data-composition-src="compositions/scene-name.html">` — their timelines auto-link to the parent. **Never** `masterTL.add(child)`.
- Timed visible elements need `class="clip"` + `data-start` + `data-duration` + `data-track-index`. **Except `<video>`/`<audio>`** — `class="clip"` on a `<video>` breaks it.
- Same-track clips can't overlap; use different `data-track-index`. `data-start` can reference another clip's id: `data-start="intro + 2"`.
- Composition duration = `tl.duration()`. Pad with `tl.set({}, {}, <seconds>)` if the timeline is shorter than the media (otherwise the video truncates).

## Backgrounds — never ship a flat color

Minimum stack on `data-track-index="0"` for the full duration: radial gradient base (center 15–20% lighter) + animated noise/grain 8–12% + 4–8 drifting particles/grid traces + vignette. `background: #07121c` alone is a placeholder, not a design.

## Kinetic type & motion discipline

- Per-word stagger 0.06–0.10s on openers.
- No dead frames — every 100ms has ≥1 animating element; offset the first entrance 0.1–0.3s, not t=0.
- ≥3 distinct eases per scene. One "jaw-dropper" (typography slam, glitch, whip-pan, audio slam) per ~5s.
- Payoff/reveal holds ≥1s (ideally 1.5s). Slam/stamp overlays land AFTER the target text is fully visible (`stamp_t ≥ target-visible_t + 0.10–0.25s`) — reveal order beats word-sync.
- Rotate transition flavors — no two consecutive the same (six hard cuts in a row is the #1 AI-edit tell). Install from registry: `npx hyperframes add <whip-pan|flash-through-white|sdf-iris|push-up|...>`, then **scope the block's CSS** to `[data-composition-id="..."]`.

---

## 9:16 talking-head (folded from the short-form playbook)

Four always-on layers under `compositions/`, all sharing the same `data-duration`:

```
index.html (1080×1920, data-composition-id="main")
├── ambient-bg.html      track 3   radial + drift grid + particles + vignette
├── face wrapper+<video> track 0   talking head (animate the WRAPPER, never the <video>)
├── seam-treatment.html  track 5   feathers the y=960 edge (bottom-half scenes)
├── sceneN-<label>.html  track 1   back-to-back overlays, no gaps
└── captions.html        track 2   karaoke, word-synced
```

**Face-mode choreography** — animate the wrapper div (sized to the source's native 1920×1080), never the `<video>` (that freezes frames):

```js
const BOTTOM     = { x: -180,    y: 1110, scale: 0.75 };   // crops 180px/side; tune to source framing
const FULLSCREEN = { x: -1166.5, y: 0,    scale: 1.7778 }; // cropped-cover fills portrait
const HIDDEN     = { ...BOTTOM, opacity: 0 };              // geometry identical to BOTTOM, only opacity differs
// Transition 0.25–0.30s BEFORE the new scene; hero changes get dur 0.45–0.55s, others 0.32s:
[ { t: <scene-start>, mode: FULLSCREEN, dur: 0.50 }, ... ]
  .forEach(({t,mode,dur}) => mainTl.to("#face-wrapper", {...mode, duration: dur, ease: "expo.inOut"}, t));
```

Preview ONE frame of BOTTOM against the real source before committing the constant — tight-framed source → scale ~0.65; wide studio → ~0.80. Never snap modes.

- **Grade the face every time:** `filter: contrast(1.08) saturate(1.08) brightness(0.97);` + a 1.00→1.025 Ken Burns over the full duration (`ease:"none"`) + a side-vignette `::after`.
- **Seam treatment** (bottom-half scenes): navy→transparent band (60–100px) at y=960 + a 2px accent scan line with glow, drawn AFTER the face. Razor-sharp y=960 cuts are the #2 AI-edit tell.
- **Audio-sync rule:** if the audio was edited (retakes/pauses cut), ALL timing lives in **edited-time** — never mix original-time and edited-time anchors. Use a `shift()` map in `captions.html` for transcript words; apply the same shift to every scene `data-start` AND every face-mode `t`.

### Karaoke captions

Montserrat 900, 46–58px, white base; active word scales 1.08 + recolors to the brand accent. Stroke via layered `text-shadow` (NOT `-webkit-text-stroke` — renders inconsistently in Chromium). Drop the rgba pill — captions are graffiti on the frame, not a subtitle track. Per-word `<span>` with `data-word-start`, tight 0.08–0.12s pops. No `<br>` inside captions. Full implementation → `/hyperframes` `references/captions.md`.

### 9:16 quality checklist (run during authoring)

No dead frames · payoff ≥1s hold · face graded + Ken Burns + vignette · no hard y=960 seam · one jaw-dropper per 5s · audio reactivity (text 3–6%, bg 10–30%, seeded offline analyser — never `AnalyserNode` in the render path) · rotate transitions · captions pop not label · motion through full scene · background is layered.

---

## EcomIQ Meta ad (folded from the ad recipe)

- **Palette:** navy `#06284C` canvas · flame `#FF4C32` (the one hot accent — CTAs/emphasis) · blue tint `#9CD4FF` · sky `#DEEEFE` · white.
- **Type:** Rethink Sans (headlines/body, big headlines −2% tracking, ~1.0 leading) + **one** Hedvig Letters Serif *italic* emphasis word. Never two italic words.
- **Structure:** eyebrow → headline (one serif-italic emphasis word) → subhead → flame CTA. Logo top-left/center. Reads in 1.5s on a muted scroll.
- **Formats:** 4:5 1080×1350 (feed default) · 1:1 1080×1080 · 9:16 1080×1920 (story: logo top, CTA bottom). Keep hero content inside ~10% safe margins.
- **Fastest scaffold:** `npm run new -- <slug> meta` already wires the brand kit (tokens + local fonts `RethinkSans.woff2` + `HedvigLettersSerif.woff2` + logos). Declare fonts inline, reference by literal name so lint stays clean.
- Pull the approved copy from the "B-Roll Short Cut" matrix when applicable (see `broll-sourcing.md` §2). Don't invent claims.

---

## Determinism (breaks the render if violated)

No `Date.now()`, no unseeded `Math.random()`, no render-time `fetch()`, no `repeat: -1` (finite counts only). Use seeded PRNGs or harmonic-sin hashes. Audio reactivity uses a pre-computed offline feature track, never a live `AnalyserNode`.
