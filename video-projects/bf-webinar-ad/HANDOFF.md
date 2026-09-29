# bf-webinar-ad — Handoff

EcomIQ Black Friday free-webinar ad, 37.0s, two ratios from one template.

| Deliverable | File | Size |
|---|---|---|
| 9:16 Reels / Stories | `bf-webinar-ad/final.mp4` (also `renders/ecomiq-bf-webinar-9x16.mp4`) | 1080x1920 |
| 4:5 Meta feed | `bf-webinar-ad-4x5/final.mp4` (also `renders/ecomiq-bf-webinar-4x5.mp4`) | 1080x1350 |

Both: H.264 High, SDR bt709, AAC 192k, 30fps, faststart, 37.0s, -16 LUFS integrated / -1.4 dBTP.

Destination URL for the ad: https://ecomiq.com/pages/bf-webinar?utm_source=ecomiq&utm_medium=owned&utm_campaign=bf-webinar-2026

## Edit, rebuild, render
```bash
cd video-projects/bf-webinar-ad
# edit src/ad.template.html (never the generated index.html files)
node build.mjs                                  # writes both index.html files + syncs 4:5 assets
npx hyperframes lint
npx hyperframes render --quality standard --sdr --output renders/bf-webinar-9x16-master.mp4
# transcode for Meta (H.264, SDR bt709, faststart):
ffmpeg -i renders/bf-webinar-9x16-master.mp4 -c:v libx264 -crf 17 -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 -c:a aac -b:a 192k -movflags +faststart renders/ecomiq-bf-webinar-9x16.mp4
cd ../bf-webinar-ad-4x5 && npx hyperframes lint && \
  npx hyperframes render --quality standard --sdr --output renders/bf-webinar-4x5-master.mp4   # then the same ffmpeg transcode
```

## Sources
- A-roll: Drive `IMG_1545.MOV` (4K HEVC HLG-HDR portrait, 36.4s). Speech runs 0 to 35.3s, used in full.
  Original lighting kept (HLG code values passed through, re-tagged SDR bt709; a tone-map was
  rejected at review) and recropped for headroom; see DESIGN.md flags.
- Subtitle safe zone reserved for manual subtitles: 9:16 y 1385 to 1640, 4:5 y 1060 to 1290.
- B-roll (Drive "B-Roll Short Cut" sheet), segments pulled at the sheet's timecodes, all muted:
  Shoptalk stage (`Sean Clarke Pacific IQ.mp4` 0:12), Dryft product holding (0:10, reused
  at 0:11.4 for "bundles"), Sweet E's cake packing (0:29), Sweet E's cookie scroll (0:01),
  Sweet E's team at laptop (0:09), Klaviyo event space (`IMG_0472.MOV` 0:00).
  Dryft / Sweet E's clips were stored sideways and are rotated 90° CW.
- VO normalised to -16 LUFS (two-pass loudnorm); the raw phone mic was about -37 LUFS.
- Word timings: `assets/transcript/sean-words.json` (faster-whisper small.en).
- $98M+ and the Wed 14 Oct, 1:30pm PT / 4:30pm ET details come from the landing page.

## Placeholders / open items
- Music: `assets/audio/music-bed-PLACEHOLDER.m4a` is silent, mixed at 0.15 (ducked level).
  Drop in the licensed bed under the same name and re-render.
- Copy marked "confirm" in the brief is used as written: "Double your Black Friday",
  "Sign up free".
