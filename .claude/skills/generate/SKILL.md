---
name: generate
description: The one command to make a video end-to-end in this workspace. Use when the user says "/generate", "generate a video", "make a video", "create a video", "new video", "build a video", "make me a short", "make an EcomIQ/Meta ad", "video from the b-roll", or arrives with a concept, script, or rough idea and wants a finished MP4. Standalone all-in-one: it runs the full interview (intent, format, script, voice, style, footage), then builds, renders, and visually verifies — with no hand-off to another skill. Knows the B-Roll – EIQ Google Drive library and the "B-Roll Short Cut" content/copy matrix, sources footage through the Drive connector, handles 16:9 / 9:16 talking-head / 4:5 Meta-ad formats, and is built for this repo's cloud-container render loop.
---

# /generate — The One Video Command

The single front door for making a video in this workspace. **Standalone and all-in-one:** it contains the entire interview → build → render → verify loop. It does **not** hand off to `/make-a-video`, `/short-form-video`, or `/ecomiq-ad` — everything those skills do is folded in here. It still leans on `/hyperframes` for the *framework rules* (the render contract, `data-*` attributes, `window.__timelines`) because those are non-negotiable for every build — read `references/build.md` and invoke `/hyperframes` knowledge at build time.

**Two phases, four gates. Don't skip gates — each produces an artifact the next consumes.**

- **Phase 1 — INTERVIEW (Gate 1):** one conversational pass to gather everything *before* touching code → write `BRIEF.md`, wait for explicit approval.
- **Phase 2 — BUILD (Gates 2–4):** scaffold + storyboard → compositions → lint → render → **visual verification** → final MP4.

---

## Read these first (every session, before building)

1. **`MOTION_PHILOSOPHY.md`** (workspace root) — the canonical motion aesthetic. Mandatory read before brainstorming any composition. If it's missing, stop and ask.
2. **`CLAUDE.md`** (workspace root) — the render contract (11 must-dos), workspace layout, asset-prep rules.
3. **`docs/EDITING-WITH-FOOTAGE.md`** — the footage workflow + the canonical b-roll source (see `references/broll-sourcing.md`).

Don't quote these from memory — they evolve. Read them.

---

## Gate 1 · Interview (HARD-GATE: write BRIEF.md, get approval)

Ask **one question at a time** via `AskUserQuestion`, multiple-choice wherever the answer has discrete forms. Follow-ups happen inline (if "I'll record it myself," skip the TTS question). **Never ask for what already exists** — inventory first:

```bash
ls "$(git rev-parse --show-toplevel)/assets" 2>/dev/null      # shared brand assets
ls video-projects/*/assets 2>/dev/null                          # per-project assets
ls assets/incoming 2>/dev/null                                  # footage waiting to be prepped
```

Then walk the bank in `references/interview.md`. The essentials:

1. **Intent** — promo · social ad · launch teaser · product demo · tutorial · explainer · EcomIQ Meta ad · intro/outro card.
2. **Audience** (open).
3. **Duration** — 10–20s · 20–45s · 45–90s · 1.5–3 min · custom.
4. **Aspect ratio** — 16:9 (1920×1080) · 9:16 (1080×1920) · 1:1 (1080×1080) · 4:5 (1080×1350, Meta feed).
5. **Frame rate** — 30 default · 60 crisp UI · 24 cinematic.
6. **Script source** — paste · outline→I draft · I'll record (face-cam/VO path) · TTS · no narration · **pull from the "B-Roll Short Cut" matrix** (see below).
7. **Voice** (if TTS) — offer from `npx hyperframes tts --help` (e.g. `am_adam`, `af_bella`) + pace.
8. **Captions** — off · hype · corporate · karaoke (per-word) · minimal.
9. **Footage / b-roll** — supplied paths · **source from the B-Roll – EIQ Drive library** · AI-generated (`npm run gen`, needs `RUNWAYML_API_SECRET`) · none.
10. **Style** — EcomIQ brand kit (if `assets/ecomiq/` exists, offer it first) · paste palette+fonts+logo · MOTION_PHILOSOPHY defaults.
11. **Pacing** — kinetic 1–2s · balanced 2–3s · relaxed 3–5s.
12. **Music** — none · ambient pad `0.15` · bed `0.4` · full `0.8` (path if supplied).
13. **Outro / CTA** — line + hold (4–6s, the longest shot).

### Two workspace-specific intake paths (the new learnings — use them)

- **Script/copy from the content matrix:** the **"B-Roll Short Cut"** Google Sheet is the approved per-month copy grid (concepts by pain point: Ads / Plateau / Scaling, each with V1/V2 primary text, headline, description, CTA, hashtags). If the user wants an EcomIQ/Meta ad, *offer to pull the approved copy from it* instead of writing fresh. How → `references/broll-sourcing.md`.
- **Footage from the Drive library:** all b-roll lives in **"B-Roll – EIQ"** on Google Drive (`Sean/`, `Clients/`). If the user wants real footage, search it via the Drive connector and pull clips. The connector has hard constraints (no thumbnails, base64 inline limit, heavy `.mov` impractical) — the full sourcing protocol is in `references/broll-sourcing.md`. **Read it before pulling anything.**

### Synthesize the brief

Write `<project-folder>/BRIEF.md`: slug · intent · audience · dimensions · fps · duration · script (full or outline, with matrix source noted if used) · voice · caption plan · face-cam plan · footage plan (which Drive clips, by id+title) · style profile (palette hex, fonts, logo path) · pacing · music · outro/CTA. **Show it. WAIT for an explicit "yes, build it."** Silence is not approval.

---

## Gate 2 · Scaffold & storyboard

### Scaffold (always inside a project folder — never the workspace root)

- **Fastest path (EcomIQ brand):** `npm run new -- <slug> [meta|square|story|wide]` — scaffolds dimensions + EcomIQ brand kit (tokens, logos, local fonts) + a lint-clean starter + `DESIGN.md`. `meta`=4:5, `square`=1:1, `story`=9:16, `wide`=16:9.
- **Any brand:** `mkdir video-projects/<slug>` → `cd` in → `npx hyperframes init` (or copy a sibling's `hyperframes.json`+`meta.json`), edit `meta.json` for id/dimensions/fps.
- Copy supplied assets into `<project>/assets/`. **Re-encode raw video before referencing it** — `npm run prep -- <clip> --project <slug>` (add `--mute` for b-roll, keep audio for talking-head). Never reference a raw `.mov` directly.
- Write `assets/style-profile.md` — the single source of truth for palette/fonts/logo from Gate 1.

### Storyboard

Write `<project>/STORYBOARD.md`. Top: a timing table (scene · start · duration · composition file). Then each beat:

```
Beat N — TITLE (start–end, dur) — one-sentence concept
Visual: [elements, size, animation, timing]    Motion: [kind]    Eases: [3–4 distinct]
Exit: [transition into next]    Audio: [VO line / SFX / music]    Footage: [clip id if any]
```

Propose a **rule-of-threes** structure: hook ≈20% · body ≈55% · payoff + outro (4–6s hold) ≈25%. Map intents → catalog blocks via `npx hyperframes catalog --type block`.

**Gate:** show the storyboard + timing table, iterate until approved. Get this right — building comps is the token-expensive phase; redirecting the plan is cheap, regenerating approved comps is not. Push the user to actually read it.

---

## Gate 3 · Build compositions

Full build rules, the GSAP/IIFE scaffold, face-mode choreography, karaoke captions, and the always-on background stack are in **`references/build.md`**. The load-bearing rules (do not soften):

- **One root composition** per project (`index.html`) with `id`, `data-composition-id`, `data-start="0"`, `data-width`, `data-height`. Sub-comps via `<template>` + `data-composition-src` — their timelines auto-link; never `masterTL.add(child)`.
- **Every timed visible element** gets `class="clip"` + `data-start` + `data-duration` + `data-track-index` — **except `<video>`/`<audio>`** (adding `class="clip"` to `<video>` breaks it).
- **Every sub-composition registers exactly one paused GSAP timeline** on `window.__timelines["<data-composition-id>"]`, key matching exactly. End every timeline with the anchor `tl.to({}, { duration: SLOT_DURATION }, 0)` so `tl.duration()` matches the slot (MOTION_PHILOSOPHY Law 11).
- **`<video>` must be `muted`**; audio is a sibling `<audio>` for the mixer. Never animate `<video>` width/height/top/left — wrap in a div and animate the wrapper (animating the video element freezes frames).
- **Captions** are body-level siblings of the root in `index.html`, `data-track-index ≥ 20` — never inside a scene timeline.
- **Catalog blocks** via `npx hyperframes add <name>` — immediately scope their CSS to `[data-composition-id="..."]` (they ship `html, body{}` rules that bleed).
- **Determinism:** no `Date.now()`, no unseeded `Math.random()`, no render-time `fetch()`, no `repeat: -1`. Seeded PRNG / harmonic-sin hashes only.
- **Apply only what the user supplied** — their palette, fonts, logo. Fall back to MOTION_PHILOSOPHY / EcomIQ defaults only when they decline.
- **9:16 talking-head?** Use the 4-layer scaffold (ambient-bg · face wrapper · scene overlays · karaoke captions), face-mode `BOTTOM ↔ FULLSCREEN` interpolated (never snapped), seam treatment at y=960. Full choreography + the 10-rule quality checklist → `references/build.md`.
- **EcomIQ Meta ad?** Navy `#06284C` + flame `#FF4C32`, Rethink Sans + one Hedvig Serif italic emphasis word, logo + flame CTA, reads in 1.5s muted. Full recipe → `references/build.md`.

---

## Gate 4 · Render → visual verification → final (MANDATORY gate)

Full loop + the cloud-container reality → **`references/render-loop.md`**. The short version:

1. `npx hyperframes lint` — 0 errors; triage warnings (the two Google-Fonts warnings are survivable — verify in frames).
2. **Preview reality:** in this cloud container, `npx hyperframes preview` (localhost:3002) is **not reachable from the user's browser**. So the **rendered MP4 review is the preview gate.** Don't stall waiting on live Studio — render a draft and have the user review the MP4. (Live Studio only works when cloned locally; if so, run it and hand over `?comp=<id>` URLs.)
3. **Draft render:** `npx hyperframes render --quality draft --output renders/<slug>-draft.mp4`.
4. **Visual verification — NEVER skip, NEVER claim done without it:** extract a frame at every beat's hero moment + every transition (word-exact timestamps for talking-head), then **`Read` every PNG** so it loads into context. Confirm: face not cropped, correct face-mode per scene, text readable + on-palette, transitions land on the intended word, no overflow/overlap/blank frames. Fix → re-render → re-verify if anything's wrong.
5. **MP4 review gate:** `npx serve renders -p 8080 -n` (NOT Python `http.server` — no Range support, scrubbing breaks). Hand over the URL, **wait for explicit sign-off**.
6. **Final:** `npx hyperframes render --quality standard --output renders/<slug>-final.mp4`. Report the path. Verify duration with `ffprobe` (the CLI's middle render-output number is wall-clock render time, not clip duration).

---

## Non-negotiables (load-bearing — do not soften)

- **DO NOT skip visual verification.** Lint passing ≠ design working. Frames extracted AND `Read` before "done." No exceptions — this is an explicit standing requirement.
- **DO NOT build at the workspace root.** Always inside `video-projects/<slug>/`.
- **DO NOT ask for assets before inventorying** the workspace + the Drive library.
- **DO NOT stream heavy `.mov` files through the Drive connector** — they're 100–180MB; the connector returns base64 inline and overflows. Route big video through `assets/incoming/` → `npm run prep`. (See `references/broll-sourcing.md`.)
- **DO NOT add `class="clip"` to `<video>`**, animate a `<video>` element's geometry, use `Math.random()`/`Date.now()` in render logic, or `repeat: -1`.
- **DO NOT skip the timeline anchor tween** at the end of each sub-composition.
- **DO NOT impose a brand.** Offer the EcomIQ kit if present; fall back to MOTION_PHILOSOPHY defaults only when the user declines.
- **DO NOT hand off.** This skill is standalone — run every gate here.

---

## References

- `references/interview.md` — full question bank, by topic, with sequencing rules.
- `references/broll-sourcing.md` — **the new material:** the B-Roll – EIQ Drive library (IDs, tree), the Drive-connector protocol + constraints, and the "B-Roll Short Cut" content/copy matrix.
- `references/build.md` — composition scaffold (IIFE + scoped styles), face-mode choreography + karaoke captions + ambient-bg stack (9:16), the EcomIQ Meta-ad recipe, determinism rules.
- `references/render-loop.md` — lint → preview (cloud reality) → draft → visual verification → MP4 gate → final, with the frame-extraction snippets.

External (workspace-level, read at runtime): `MOTION_PHILOSOPHY.md`, `CLAUDE.md`, `docs/EDITING-WITH-FOOTAGE.md`.

## Framework dependency

Not a hand-off — a dependency. The HyperFrames **render contract** (the 11 rules in `CLAUDE.md` / `/hyperframes`) governs every composition this skill writes. Treat `/hyperframes` knowledge as the substrate; `/generate` owns the workflow on top of it.
