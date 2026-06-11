# Starting a New Video Project — Step by Step

The complete loop, using the tooling and skills set up in this repo. Copy-paste
friendly. Works the same for any format (Meta 4:5, square, story, landscape).

---

## 0. Once per session (cloud / fresh container only)

```bash
npm run setup
```
Installs FFmpeg, Chrome, poppler, deps, then runs `hyperframes doctor`. Skip on a
machine that already has the toolchain. All-green except "Docker running" = good.

---

## 1. Create the project — one command

```bash
npm run new -- <slug> [format]
```
- `slug` = kebab-case name, e.g. `summer-sale`
- `format` = `meta` (4:5, default) · `square` (1:1) · `story` (9:16) · `wide` (16:9)

```bash
npm run new -- summer-sale meta
```

This scaffolds a fully-wired project at `video-projects/summer-sale/`:
- correct dimensions in `meta.json`
- the **EcomIQ brand kit** copied in (tokens, logos, local fonts)
- a **lint-clean starter composition** (`index.html`) you'll edit
- a `DESIGN.md` to capture this ad's idea

> Why a generator? Every project needs the same plumbing (config, brand assets,
> font setup, render contract). The script gets it right every time so you start
> at "edit the creative," not "wire up boilerplate."

---

## 2. Get your assets in (b-roll, product images)

**Option A — Google Drive (eComm IQ folder).** Needs the Drive connector live in
the session (start a *new* session if you just enabled it). Then just ask:
> "Pull b-roll from the eComm IQ Drive folder → Content, prep it into summer-sale."

**Option B — upload to chat.** Drag clips/images into the conversation; I prep them.

**Either way, raw video gets normalized before use:**
```bash
npm run prep -- assets/incoming/clip.mov --project summer-sale --mute
```
- re-encodes to render-ready H.264 (yuv420p, 30fps CFR, faststart)
- `--mute` strips audio (use for b-roll — Hyperframes `<video>` must be muted)
- `--project` drops it straight into `video-projects/summer-sale/assets/`
- `--crf 18` for hero shots (higher quality)

Images: copy into the project's `assets/` (keep them ≥ the composition's longest edge).

> Why prep? Raw `.mov`/HEVC/variable-frame-rate files stutter or fail mid-render.
> Normalizing once up front saves you from mysterious render bugs later.

---

## 3. Build the creative — with a skill, not from scratch

Invoke the skill that matches what you're making. The skill loads the brand +
the proven recipe, then writes/edits the composition:

| You're making… | Invoke |
|---|---|
| An EcomIQ Meta/IG ad | `/ecomiq-ad` |
| Any HTML video, captions, transitions, TTS, audio-reactive | `/hyperframes` |
| A 9:16 talking-head short w/ karaoke captions | `/short-form-video` |
| A video from a website URL | `/website-to-hyperframes` |
| A first video, fully guided | `/make-a-video` |
| GSAP timing/easing help | `/gsap` |
| Install a catalog block (chart, social card, shader transition) | `/hyperframes-registry` |

Example prompt after creating the project:
> "Using /ecomiq-ad, make a 7s summer-sale ad: headline *Summer* sale, subhead
> '20% off sitewide', CTA 'Shop now', with the prepped b-roll behind a navy scrim."

> Why skills first? They encode framework rules (the `window.__timelines`
> registration, `data-*` timing, render contract) and the EcomIQ brand. Skipping
> them is how you get broken comps and off-brand colors.

---

## 4. The authoring loop (edit → lint → render → verify)

Run all CLI commands **from inside the project folder**:
```bash
cd video-projects/summer-sale
```

1. **Lint** — catch structural errors before rendering:
   ```bash
   npx hyperframes lint        # aim for 0 errors (warnings are usually survivable)
   ```
2. **Draft render** — fast, pixelated, for checking timing/layout:
   ```bash
   npx hyperframes render --quality draft --output renders/draft.mp4
   ```
3. **Verify the frames** (this is mandatory — lint can't see a cropped face or a
   scene landing on the wrong word):
   ```bash
   mkdir -p renders/frames
   for t in 1 3 5; do ffmpeg -y -ss $t -i renders/draft.mp4 -frames:v 1 -q:v 2 renders/frames/t$t.png; done
   ```
   Then actually *look* at each PNG. (When I build, I `Read` every frame — never
   ship a render I haven't seen.)
4. **Fix → re-render → re-verify** until it's right.
5. **Final render** — visually lossless 1080p, the file you ship:
   ```bash
   npx hyperframes render --quality standard --output renders/final.mp4
   ```

> Preview note (this cloud env): `npx hyperframes preview` (live Studio at
> localhost:3002) isn't reachable from your browser in the web container — that's
> why we lean on the render → frame-grab loop here. On your own machine, the live
> Studio with hot-reload works great.

---

## 5. Where everything lives

```
video-projects/<slug>/
├── index.html          ← root composition (your main edit surface)
├── compositions/       ← sub-scenes (data-composition-src) + components/
├── assets/             ← this project's video/images/fonts/logos/tokens
├── renders/            ← drafts + final.mp4 (gitignored scratch)
├── DESIGN.md           ← this ad's brand spec + idea
└── meta.json           ← dimensions / fps

assets/ecomiq/          ← CANONICAL brand kit (edit brand here, once)
assets/incoming/        ← raw asset drop zone (Drive / uploads land here)
```

To re-skin the brand everywhere, edit `assets/ecomiq/brand-tokens.css` — new
projects inherit it automatically.

---

## The whole thing, end to end

```bash
npm run setup                                   # fresh container only
npm run new -- summer-sale meta                 # scaffold
npm run prep -- assets/incoming/broll.mov --project summer-sale --mute
# → invoke /ecomiq-ad and describe the ad
cd video-projects/summer-sale
npx hyperframes lint
npx hyperframes render --quality draft --output renders/draft.mp4
# → verify frames, iterate
npx hyperframes render --quality standard --output renders/final.mp4
```

That's it. Generator for the plumbing, prep for the footage, a skill for the
creative, lint+frames to keep it honest, standard render to ship.
