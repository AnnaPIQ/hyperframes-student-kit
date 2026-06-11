# Remote Environment Setup (Claude Code on the web)

This repo is often run in **Claude Code on the web** — an ephemeral cloud
container that's cloned fresh each session. The video toolchain is NOT
pre-installed, so a new session needs a one-time bootstrap.

## TL;DR

```bash
npm run setup        # = bash scripts/setup-studio.sh  (idempotent)
```

That installs everything the authoring → render → verify loop needs. Re-run it
any time `npx hyperframes doctor` shows a red check.

## What a fresh container is missing (and why)

| Tool | Installed by | Needed for |
|---|---|---|
| `node_modules` (playwright) | `npm install` | live-state screenshots while authoring |
| **FFmpeg / FFprobe** | `apt-get install ffmpeg` | audio extract/re-encode, render encode, **frame grabs for visual verification**, `ffprobe` duration checks |
| **Chrome headless shell** | `npx hyperframes browser ensure` | the Hyperframes render + preview engine |
| **poppler-utils** (`pdftoppm`, `pdftotext`) | `apt-get install poppler-utils` | reading brand-kit PDFs (the `Read` tool needs `pdftoppm` to render PDF pages) |

`npx hyperframes doctor` reports each. **Docker "not running" is expected and
fine** — it's only used for `--docker` archival deterministic renders.

## Environment quirks to remember

- **Preview is not reachable from your browser.** `npx hyperframes preview`
  binds to `localhost:3002` *inside the container*. On the web you can't open
  that URL. Use the **render → frame-grab → `Read` the PNG** loop instead. The
  live Studio works normally when you clone the repo to your own machine.
- **CLI render output line** reads `<filesize> · <wall-clock render time> ·
  <status>`. The middle value is how long the render took, **not** the clip
  length. Confirm duration with `ffprobe -show_entries format=duration`.
- **Google Fonts warnings on lint are survivable here** — the container has
  network, so `fonts.googleapis.com` resolves at render time. Always *verify in
  a frame* that the intended font rendered (not a fallback). For fully offline /
  sandboxed renders, capture `.woff2` files and use `@font-face` instead.
- **`apt-get` may warn about stale third-party PPAs** (deadsnakes/ondrej). Those
  are unrelated; `apt-get update` + install still succeeds for ffmpeg/poppler.

## Verifying

```bash
cd video-projects/<project>
npx hyperframes doctor     # all green except "Docker running"
npx hyperframes lint       # 0 errors
```
