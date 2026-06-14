# AI B-Roll with Runway Gen-4

Generate animated b-roll from a still image + a motion prompt, then drop it into a
composition. Wired via `npm run gen` (`scripts/gen-broll.mjs`, the `@runwayml/sdk`).

> **Gen-4 video is image-to-video** — it animates a *starting image*. You can either
> bring your own still (`--image`) or have it **generate the still first** from a text
> prompt (`--text`, via `gen4_image`), which closes the loop: prompt → still → motion →
> b-roll. Use `--image-only` to stop at the still (e.g. an ad background).

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
# generate the still AND animate it (closes the loop)
npm run gen -- --text "minimalist desk with a glowing analytics dashboard, navy tones" \
  --prompt "slow push-in, soft studio light" --project summer-sale

# bring your own product still → b-roll
npm run gen -- --image assets/incoming/product.jpg \
  --prompt "subtle rotation, shallow depth of field" --project summer-sale

# just a still (e.g. an ad background), no animation
npm run gen -- --text "abstract flame-orange gradient, soft grain" --image-only --project summer-sale

# vertical clip for a story/reel
npm run gen -- --image assets/incoming/hero.png --prompt "drifting parallax" --ratio 720:1280
```

| Option | Default | Notes |
|---|---|---|
| `--text "<scene>"` | — | generate the starting still from a prompt (`gen4_image`) |
| `--image <path\|url>` | — | OR bring your own still (local file or https URL). One of `--text`/`--image` required |
| `--prompt "<text>"` | — | the **motion** (required unless `--image-only`) |
| `--image-only` | off | generate just the still (PNG), skip animation (needs `--text`) |
| `--ratio <w:h>` | `1280:720` | video ratio: also `720:1280` (vertical) · `960:960` (square) · `832:1104` (3:4) |
| `--image-ratio <w:h>` | derived | still ratio (defaults to match `--ratio` orientation: `1920:1080`/`1080:1920`/`1080:1080`) |
| `--duration <5\|10>` | `5` | clip length in seconds |
| `--image-model <id>` | `gen4_image` | also `gen4_image_turbo` |
| `--project <slug>` | — | save into `video-projects/<slug>/assets/` (else `assets/incoming/`) |
| `--out <file>` | — | explicit output path |

The script submits each task, polls until done, and downloads the result. When `--text`
is used with motion, the generated still is also saved alongside the video for reuse.

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

## Which model (mid-2026)
Runway's API is a **multi-model gateway** — one `RUNWAYML_API_SECRET` reaches many
models via `--model`. Picks for ecommerce ad b-roll:

| Use | `--model` | Why |
|---|---|---|
| Default — short social b-roll, animate a still | `kling3.0_pro` | best realism per dollar (~$0.10/sec) |
| Hero / final cinematic shot (wants audio, 4K) | `veo3.1` | top quality (~$0.15/sec) |
| Budget / volume | `seedance2` | strong value |
| Max control / Runway-native | `gen4_turbo` (current tested default) | reliable image-to-video |

> The script's tested default is `gen4_turbo` (image-to-video). `kling*`/`veo*` are
> available via `--model` — some route through text-to-video vs image-to-video, so the
> first time you use one, confirm the output (and tell me if a model needs the routing
> tweaked). Avoid `sora*` — OpenAI's video API is deprecating (Sept 2026).

## Notes
- Costs run against your Runway account per generation — generate deliberately.
- Determinism: AI gen is **not** reproducible across runs. Generate once, commit the
  resulting MP4 as an asset, and reference that file — don't regenerate at render time.
