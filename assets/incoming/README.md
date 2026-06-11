# assets/incoming — raw asset drop zone

Dump raw footage, b-roll, photos, and audio here as it arrives. Nothing here is
final — it's the staging area before assets are prepped and moved into a
project's `assets/` folder.

## Source: Google Drive — "eComm IQ"

Primary asset source is the Google Drive folder **`eComm IQ`**, with subfolders:
- **`Content`** — b-roll, product/lifestyle video, raw clips
- **`Marketing`** — marketing imagery, creative

**Requires the Google Drive connector to be live in the session.** Connectors
load at session start, so if it was added mid-session, start a *new* session
first. Once a `mcp__*drive*` tool is available, the flow is:
1. List `eComm IQ/Content` (and `Marketing`), pick the clips/images needed.
2. Download into `assets/incoming/`.
3. `npm run prep -- assets/incoming/<file> --project <slug> --mute` (video) or
   copy images into `video-projects/<slug>/assets/`.

## Workflow for incoming video (b-roll / content / clips)

Raw recordings (`.mov`, HEVC, variable frame rate, huge bitrate) often stutter
or fail mid-render. Always re-encode before referencing in a composition:

```bash
# generic prep → assets/incoming/<name>.prepped.mp4
npm run prep -- assets/incoming/clip.mov

# b-roll straight into a project, audio stripped (Hyperframes <video> must be muted)
npm run prep -- assets/incoming/broll.MOV --project summer-sale --mute

# hero shot, higher quality
npm run prep -- assets/incoming/hero.mov --project summer-sale --crf 18
```

Output is render-ready: H.264 / yuv420p / 30fps CFR / faststart.

## Photos / images
Drop them here, then copy the ones you need into the project's `assets/`. Keep
source resolution ≥ the composition's longest edge so they don't upscale-blur.

## Audio
Music / VO / SFX land here too. Reference audio in compositions via sibling
`<audio>` elements (never bake it into a muted `<video>`).

## Housekeeping
This folder is for *raw* drops — prepped, project-bound assets live under
`video-projects/<slug>/assets/`. Large raw files are gitignored (see below);
commit only what a project actually uses.
