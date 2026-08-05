# Status — Pacific IQ "About Us" montage

## What shipped
A **13.9s** vertical (1080x1920, silent) Pacific IQ "About Us" cut, built from the
only footage reachable in this environment. Composition: `index.html`.
Final render (gitignored, delivered in chat): `renders/pacific-iq-about-us.mp4`.
Lint clean; frame-verified across the full timeline.

## Why it's 14s and not the full 30s: footage access
The Drive shot-list clips could not be pulled at scale:

- **Google Drive connector `download_file_content` has a hard 10 MB per-file cap.**
- **The files are account-restricted** (not "anyone with link"), so `curl`/`yt-dlp`
  hit Google's sign-in wall and can't fetch them either.
- Of the whole shot list, only **5 clips are under 10 MB**; every hero clip is
  26 MB–1.76 GB (stage A-roll 1.4 GB, Sweet E's 1.76 GB, Dryft 0.7 GB, …).

Reachable & used (3): `Jaren in Pacific IQ Car` (1.5 MB), `Jaren getting into
Pacific IQ Car` (6.0 MB), `Outside setting — Sean texting / Rutherford Hill` (5.1 MB).
Reachable but not yet pulled (connector session kept expiring): `PIQv2.mp4` PIQ
reel (9.8 MB), `Intro.mp4` Shopify screen-rec (1.1 MB, low-res 640x360).

## To unblock the full 30s (pick one)
1. **Set the shot-list files (or the folder) to "Anyone with the link → Viewer."**
   Then `yt-dlp`/`curl` pull each full clip straight to disk (no 10 MB cap, never
   through model context) and segments get trimmed server-side. Fastest; makes the
   files link-viewable.
2. **Pre-trim the needed 2–3s segments to <10 MB mp4s** and drop them in a Drive
   folder. Pulled via the connector. Keeps everything private; a little manual work.

## How a full clip gets in once reachable (proven pipeline)
`download_file_content` → oversized result auto-saves to a tool-results `.txt`
(`{content: base64, …}`) → `python3` decodes base64 → mp4 on disk → `ffmpeg` trims
+ scales to 1080x1920 + mutes → drop in `assets/video/` → add a `<div class="shot">
<video>` block in `index.html`. No base64 ever touches model context.

## Shot-swap map — full 30s target (drop-in when footage lands)
Each row = one ~1.2–1.6s beat. Timecodes are the sheet's segments (MM.SS = min:sec).

| Beat | Source clip (Drive title) | Segment |
|---|---|---|
| Open / driving | Car driving into hotel in LA | 0:05–0:06 |
| Hotel laptop | Sean on laptop (low angle) / Angle over laptop – Sean thinking | 0:04–0:08 |
| Walking event floor | Walking in Klaviyo event space | 0:07–0:11 |
| **Stage anchor 1** | A-roll: Sean on stage (Shoptalk, rebuy) | 0:12–0:14 |
| Client — Sweet E's | Erica packing cake / cake being packed | 0:29–0:45 |
| Client — Dryft | Dryft – product holding | 0:10–0:12 |
| Team / working | Sweet E's team working / Sean on laptop | 1:00–1:03 |
| Lifestyle — car | Jaren getting into Pacific IQ car ✅ used | 0:07–0:12 |
| Lifestyle — winery | Sean texting / Rutherford Hill bag ✅ used | 0:00–0:05 |
| **Stage anchor 2** | A-roll: Sean on stage (rebuy) | 6:02–6:05 |
| Sign / brand | Limitless growth rebuy sign | 0:18 |
| Product detail | Sweet E's sprinkle on cupcakes / cookie scroll | 0:01–0:05 |
| PIQ reel accent | PIQv2.mp4 (Pacific IQ reel) | pick |
| End card | (built) `PacificIQ.` + CTA | — |

Note: one A-roll file (`1PBebA58MNIHdxmZuxpJd9Ftdmocpfy0`) returned "Entity not
found" — bad/inaccessible ID; needs a corrected link. Several phone clips are
stored with rotation metadata — re-check orientation on ingest and rotate 90° if
`ffprobe` shows a rotate tag (the 3 used here were true portrait, no rotation).
