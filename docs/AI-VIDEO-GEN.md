# AI B-Roll with Runway Gen-4

Generate animated b-roll from a still image + a motion prompt, then drop it into a
composition. Wired via `npm run gen` (`scripts/gen-broll.mjs`, the `@runwayml/sdk`).

> **Gen-4 is image-to-video, not text-to-video.** It animates a *starting image*.
> Give it a product photo (or any still) + how it should move. Perfect for turning a
> product shot from the Marketing folder into a moving shot.

## One-time setup: the API key

The script needs `RUNWAYML_API_SECRET`. Set it in the **environment config** (Manage
environments → variables) so every session has it — **don't commit it**. Get a key at
https://dev.runwayml.com. Network egress to Runway is already open in this environment.

## Generate

```bash
npm run gen -- --image <path|url> --prompt "<motion>" [options]
```

Examples:
```bash
# product still in the incoming folder → b-roll in a project
npm run gen -- --image assets/incoming/product.jpg \
  --prompt "slow push-in, soft studio light, subtle rotation" \
  --project summer-sale

# vertical clip for a story/reel
npm run gen -- --image assets/incoming/hero.png --prompt "drifting parallax" --ratio 720:1280
```

| Option | Default | Notes |
|---|---|---|
| `--image <path\|url>` | — (required) | starting still; local file or https URL |
| `--prompt "<text>"` | — (required) | describe the **motion**, not just the scene |
| `--ratio <w:h>` | `1280:720` | also `720:1280` (vertical) · `960:960` (square) · `832:1104` (3:4 portrait) |
| `--duration <5\|10>` | `5` | clip length in seconds |
| `--project <slug>` | — | save into `video-projects/<slug>/assets/` (else `assets/incoming/`) |
| `--out <file>` | — | explicit output path |

The script submits the task, polls until it's done, and downloads the MP4.

## Then: prep and use it

Runway returns an MP4; normalize it for deterministic rendering, then reference it:
```bash
npm run prep -- video-projects/summer-sale/assets/product-broll.mp4 --mute
```
```html
<video src="assets/product-broll.mp4" muted data-start="0" data-duration="5" data-track-index="0"></video>
```
(Remember: Hyperframes `<video>` must be `muted`, and never add `class="clip"` to it.)

## Ratios vs. ad formats
Runway's fixed ratios don't exactly match 4:5 Meta. Pick the nearest (`832:1104` for
portrait, `960:960` for square, `720:1280` for story) and crop/scale inside the
composition by wrapping the `<video>` in a `<div>` and animating the wrapper.

## Notes
- Costs run against your Runway account per generation — generate deliberately.
- Determinism: AI gen is **not** reproducible across runs. Generate once, commit the
  resulting MP4 as an asset, and reference that file — don't regenerate at render time.
