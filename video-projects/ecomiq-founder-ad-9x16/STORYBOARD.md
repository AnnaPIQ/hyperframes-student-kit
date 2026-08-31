# Storyboard — One Opinion, or an Entire Team · **9:16** (1080×1920 · 30fps)

Vertical cut of `video-projects/ecomiq-founder-ad` (4:5). **Identical edit** — same VO,
same 19 beats, same cut points, same seam mechanics. Only the framing changes. For beat
copy, timing rationale, audio notes and seam architecture see the 4:5 storyboard:
`../ecomiq-founder-ad/STORYBOARD.md`.

## What differs from the 4:5

**Founder A-roll.** Re-cropped natively from the 4K source rather than upscaled from the
4:5 renders — `scale=3413:1920:flags=lanczos, crop=1080:1920:1049:0, fps=30`.

The crop x is **not** the centre of the scaled source (that would be 1166). Sean stands
right of centre in the 3840x2160 master, so a mathematically centred crop puts him ~115px
left of frame — which is what shipped in the first pass, and in the 4:5 as well (~85px
there, crop x corrected to 577 in a 2400x1350 scale). Both are cut from the same measured
subject position: eyeline on source-x 1589 in the 3413-wide space. Verify framing by
drawing the centre line, never by trusting the arithmetic:

    ffmpeg -ss <t> -i <render> -frames:v 1 \
      -vf "crop=1080:800:0:200,scale=400:296,drawbox=x=199:y=0:w=2:h=296:color=red:t=fill" chk.png

**Social-proof b-roll.** Native 1080×1920 masters pulled from the
`ecomiq-one-opinion-or-team-story` variant on `claude/ecomiq-founder-ad-build-9auz5l`,
not re-cropped from the 4:5 versions.

**Graphic beats.** The `.body` content box stays 1080×1350 and is centred in the 1920
frame (`top: 285px`). Content is **not** stretched to fill the height:

- Width is 1080 in both formats, so the content cannot scale up — only spread apart.
  Spreading a 6-element beat over 1920px breaks the visual grouping; it reads as
  disconnected fragments rather than one panel.
- The resulting block sits inside the Reels / TikTok / Stories safe area (top ~250px,
  bottom ~420px), so nothing is covered by platform chrome.
- The navy, the bloom gradients, the perspective grid and the vignette all run the full
  1920, so the margins carry brand atmosphere rather than reading as letterbox.

`.plate` slide distances, `#wall-track` offsets and `#wall-fade` insets are all rebased
to the 1920 frame so the whip seams and the logo-wall scroll behave identically.

**Lower-third overlays.** `.bchip` 1108 → 1678, `#bcap` 1176 → 1746, `#topscrim`
280 → 320 to hold the logo over brighter footage in the taller frame.

## Build

Scenes are generated: `.work/build_comps_916.py` (derived from `.work/build_comps.py` by
frame-space transforms). Regenerate with `python3 .work/build_comps_916.py`.

## Delivery

`renders/ecomiq-founder-ad-9x16-final.mp4` — 1080×1920, 30fps, `--quality high`.
Rendered at native resolution rather than `--resolution portrait-4k`: the 4K source is
2160 tall, so a 3840-tall export would upscale the founder footage ~1.8× while only the
graphics gained real detail — and every placement transcodes to ~1080 anyway.
