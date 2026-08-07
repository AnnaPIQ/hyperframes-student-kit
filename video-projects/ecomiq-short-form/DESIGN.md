# EcomIQ — Short-Form Vertical Ad (9:16 + 4:5)

Footage-forward social short for EcomIQ. Two source clips, a small persistent
logo bug, and a branded end card. **No captions, no kinetic type** — the footage
carries the message. Brand system is EcomIQ's (navy + flame, Rethink Sans /
Hedvig Letters Serif) — see `assets/brand-tokens.css` and the root `DESIGN.ais-example.md`
sibling `assets/ecomiq/BRAND.md`.

## Deliverables (two standalone root compositions under `compositions/`)

| File | Aspect | Dimensions | Render |
|---|---|---|---|
| `compositions/ecomiq-short-9x16.html` | 9:16 | 1080×1920 | `renders/ecomiq-short-9x16.mp4` |
| `compositions/ecomiq-short-4x5.html`  | 4:5  | 1080×1350 | `renders/ecomiq-short-4x5.mp4` |

`index.html` is a lightweight cover that points at the two deliverables — it is
NOT the ad. Render each deliverable with the `-c` flag (see below).

## Timeline (48s, identical in both aspects)

| Segment | Time | Source | Notes |
|---|---|---|---|
| Video A | 0–38.5s | `assets/videoA-1080.mp4` | talking head, full-frame, own audio |
| Video B | 38–46s | `assets/videoB-1080.mp4` | second clip; 0.5s crossfade in at 38s |
| End card | 45.5–48s | — | navy card fades up; logo + flame rule + CTA + pill |

- **Persistent logo:** white EcomIQ lockup (SVG) top-left, `--bug-w: 520px`
  (~48% width — a bold brand mark), with a soft dark radial scrim + drop-shadow so
  it reads over the bright window shots. Present 0–46s; the opaque end card covers
  it at the close. It's a single CSS custom property at the top of each comp —
  change once to resize.
- **A→B transition:** a 0.5s opacity crossfade (dissolve), not a hard cut. The two
  clips sit on separate `data-track-index` values so they can overlap; Video A holds
  an extra 0.5s (`data-duration 38.5`) to cover the dissolve.
- **End card CTA:** "Join our Free Profitability Bootcamp" (all white, single weight,
  no italics) + a flame **"Join now"** pill with a soft glow.
- **Audio:** each clip's own audio via a sibling `<audio>` element (the `<video>`
  stays `muted`). End card (46–48s) is a quiet outro.

## How it's built (the render contract that matters here)

- Both footage clips share `data-track-index="0"` (sequential, back-to-back) and
  live in transparent full-frame wrappers `#vidA-wrap` / `#vidB-wrap`. The A→B cut
  is driven by **wrapper opacity** (`tl.set(...)` at 38s) so only the active clip
  shows — **do not** stack opaque wrappers with manual `z-index` (that hid Video A
  and the end card in v1; see `docs/LESSONS.md`).
- `object-fit: cover` sizes the 1080×1920 encodes to fill each frame. The 4:5 comp
  crops top/bottom with `object-position: 50% 44%` to hold the face.
- Local brand fonts + vendored GSAP → no render-time network fetches.

## Re-render

```bash
cd video-projects/ecomiq-short-form
npx hyperframes lint
npx hyperframes render -c compositions/ecomiq-short-9x16.html --quality standard --output renders/ecomiq-short-9x16.mp4
npx hyperframes render -c compositions/ecomiq-short-4x5.html  --quality standard --output renders/ecomiq-short-4x5.mp4
```

## Source footage

Video A (`IMG_1100.MOV`, 2160×3840, 54s) → trimmed to 0–38s and scaled to 1080×1920.
Video B (`202608071131.mp4`, 1440×2560, 8.6s) → scaled to 1080×1920. Both are
already 9:16, so no distortion; re-encoded H.264 CRF 20 with faststart into `assets/`.

## Footguns

- Never animate `<video>` dimensions — freezes frames. Wrappers only.
- Keep one serif-italic emphasis word; flame orange is the only hot accent.
- `renders/` is gitignored — the committed deliverables are the comps + `assets/`.
