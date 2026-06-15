# Editing a Talking-Head / Footage Video (the make-a-video workflow)

For videos built **around a real clip of you talking** (demo, lesson, promo) with
motion-graphic overlays — the workflow from Nate's live edit, adapted to this repo.
For pure brand ads with no footage, use `/ecomiq-ad`. For 9:16 + karaoke captions,
use `/short-form-video`.

---

## 0. Pre-edit your footage FIRST (the biggest time-saver)

Cut the mistakes, retakes, and dead space **before** the clip enters the project.
Claude can't reliably tell a flubbed take from a good one — it doesn't know where a
sentence really starts or which take you want. Trim in Descript (or any editor, or
manually) and export the clean cut. Drop *that* in.

> You *can* ask Claude to cut "4s–7s and 15s–22s" with FFmpeg, but specifying every
> cut + re-rendering is slower than just trimming it yourself. Bring it in clean.

## 1. Get the clip into the project (prepped)

Never reference a raw `.mov` straight from Downloads. Normalize it:
```bash
npm run new -- golden-ratio wide          # create the project (16:9 talking-head)
npm run prep -- assets/incoming/talk.mov --project golden-ratio   # → assets/talk.mp4
```
Keep audio here (don't `--mute`) — the voice IS the video.

### Where the b-roll lives — the canonical EIQ library (Google Drive)

All b-roll from now on lives in the shared Drive folder **"B-Roll - EIQ"**:
<https://drive.google.com/drive/folders/1Td1UbF9wxkJn9iyO9mNExlXv6ztG7Uld>

```
B-Roll - EIQ/                    1Td1UbF9wxkJn9iyO9mNExlXv6ztG7Uld
├── Sean/                        1qWcGB1Kc8AFcjmWFMfpglcse4Lo0vY5s   (Sean's own footage)
│   ├── Klaviyo event 26
│   ├── March 26 LA
│   ├── Shoptalk 26
│   └── Old Podcast
└── Clients/                     1XIsqQguZ0EJCJzwmGtQ4agL29FRqjUmm   (per-client footage)
    ├── Dryft
    └── Sweet E's
```

Browse/search it with the **Google Drive connector** (`mcp__Google_Drive__search_files`,
e.g. `parentId = '<folder-id>'`). The connector is great for **finding** clips and for
pulling **small files** (images, docs).

**Constraint worth knowing** (learned the hard way): the connector returns file bytes as
inline base64 and exposes **no thumbnails and no video duration/dimensions**. A ~1 MB image
already overflows the inline limit; raw `.mov` clips (100–180 MB) are impractical to pull
this way. So to actually get footage *into a project*:

- **Small images / stills** → download via the connector, decode, drop into `assets/`.
- **Heavy video** → download it to `assets/incoming/` (on a machine with Drive access, or
  via a direct-download path if the network policy allows), then normalize with
  `npm run prep` (see §1). Don't try to stream big `.mov` files through the connector.

## 2. Invoke the skill in PLAN MODE

```
/make-a-video — build a video from assets/talk.mp4 in video-projects/golden-ratio.
```
Send it in **plan mode**. The skill will:
- **Sample frames** to understand the clip ("you at your desk, talking, mic in frame").
- **Interview you** through gates: face treatment (corner PiP vs full-screen vs
  full-screen + floating overlays), trim vs keep full length, captions yes/no, the
  hero visual metaphor, per-section motion-graphic ideas.
- **Transcribe** for word-level timestamps so overlays land on the right words:
  ```bash
  npx hyperframes transcribe assets/talk.mp4 --model small.en --json
  ```
  (On-device — no Whisper install, no API key needed in this repo.)

## 3. Review the PLAN before approving — this is where you save tokens

Generating compositions writes a LOT of HTML = output tokens. A plan you approve and
then dislike costs a full re-gen. So **read the plan carefully**: per section, check
the goal + the motion-graphic idea. Cheap to redirect now, expensive to redo comps.
Approve only when each beat matches what you pictured.

## 4. Preview / render to review

Localhost Studio can be flaky in this cloud container (timeline shows `0s / 0s`, or
the master comp stalls under software WebGL). When it misbehaves:
- Try an **individual comp URL** (`?comp=<id>`) — they load instantly.
- Or just say *"skip the preview, give me the full draft render"* and review the MP4.

The skill often **self-verifies and ships a V2** (a fix pass) before you even give
feedback. Watch the draft end-to-end with audio — pacing and sync only read right in
real time.

## 5. Give feedback like you would to a human editor

Reference timestamps, say what you don't like, say what you want instead:
> "At ~5s the title is blurred out — the blur is on top of the text; put it behind."
> "The 60% at ~12s looks great, but the right half of the % sign is clipped."

Keep it concrete and per-timestamp. Don't over-engineer the wording.

## 6. Manage context on big feedback rounds

When the session gets heavy (lots of comps + token usage), don't pile more edits on
top. Ask:
> "Summarize everything you've built and where each file is, so I can clear and continue."
Copy that handoff, start a fresh session (check out the branch first), paste it, and
give feedback from a clean slate. Faster and cheaper than iterating on a bloated context.

---

## The loop in one screen
```
trim footage (Descript)  →  npm run prep --project <slug>  →  /make-a-video (plan mode)
   →  review the plan  →  approve  →  draft render  →  watch it  →  timestamped feedback
   →  iterate  →  standard render  →  ship
```
Plan carefully, footage clean, feedback specific. That's the whole game.
