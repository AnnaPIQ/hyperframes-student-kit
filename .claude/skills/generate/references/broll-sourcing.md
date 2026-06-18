# B-Roll Sourcing & the Content/Copy Matrix

The workspace-specific knowledge that makes `/generate` more than a generic builder. Two Google Drive resources: the **footage library** and the **content/copy matrix**. Both are reached through the **Google Drive connector** (`mcp__Google_Drive__*` tools). Canonical write-up lives in `docs/EDITING-WITH-FOOTAGE.md` — this is the operational version for the build loop.

---

## 1. The footage library — "B-Roll – EIQ"

All b-roll from now on lives in this shared Drive folder:
<https://drive.google.com/drive/folders/1Td1UbF9wxkJn9iyO9mNExlXv6ztG7Uld>

```
B-Roll – EIQ/                    1Td1UbF9wxkJn9iyO9mNExlXv6ztG7Uld
├── Sean/                        1qWcGB1Kc8AFcjmWFMfpglcse4Lo0vY5s   (Sean's own footage)
│   ├── Klaviyo event 26 · March 26 LA · Shoptalk 26 · Old Podcast
└── Clients/                     1XIsqQguZ0EJCJzwmGtQ4agL29FRqjUmm   (per-client footage)
    └── Dryft · Sweet E's
```

Folder IDs change as footage is added — **don't trust this tree blindly; re-list at build time:**

```
mcp__Google_Drive__search_files  query: "parentId = '1Td1UbF9wxkJn9iyO9mNExlXv6ztG7Uld'"
```

Recurse into subfolders the same way (`parentId = '<subfolder-id>'`). Match clips to storyboard beats **by title** — these clips are descriptively named ("Burnout Isn't Weakness — It's Math"), so filename relevance actually works.

### Connector constraints — learned the hard way (read before pulling)

The connector exposes **only** `title`, `size`, `mimeType`, `createdTime`, `parentId`, `viewUrl`. **No thumbnail. No video duration or dimensions.** And `download_file_content` returns the file as **base64 inline**, which overflows fast:

| File | Path |
|---|---|
| **Small image / still / doc** | Pull it. A ~1MB image already overflows the inline token limit and gets spilled to a tool-results file — that's fine, decode it (below) and `Read` it. |
| **Heavy video (`.mov`, 100–180MB)** | **Do NOT pull through the connector** — base64 would be ~10–15× the file size. Route it through disk instead (next section). |

### Pulling a small image and actually seeing it

`download_file_content` spills large output to a JSON file `{content, id, mimeType, title}`. Decode the base64 and `Read` the result:

```bash
jq -r '.content' <tool-results-file>.txt | base64 -d > assets/incoming/<name>.jpg
file assets/incoming/<name>.jpg     # confirm it's a valid image
```

Then `Read assets/incoming/<name>.jpg` — now you can judge whether the shot fits the beat.

### Getting heavy video into a project

The connector is the wrong pipe for big `.mov`. Two real paths:

1. **User drops it in** — they download from Drive on a machine with access and place it in `assets/incoming/`. Then: `npm run prep -- assets/incoming/<clip>.mov --project <slug>` (add `--mute` for b-roll). `prep` re-encodes to H.264 MP4 (`-crf 20 -pix_fmt yuv420p -vsync cfr -movflags +faststart`) — the only safe form to reference as `<video src>`.
2. **Direct download** — only if the environment's network policy allows the Drive download host. If it does, fetch to `assets/incoming/` then `npm run prep`. If outbound is blocked, fall back to path 1.

**Never reference a raw `.mov` directly in a composition** — variable-frame-rate / HEVC clips stutter or fail mid-render.

---

## 2. The content/copy matrix — "B-Roll Short Cut"

The approved per-month copy grid (it's a **Google Sheet, not footage**):
<https://docs.google.com/spreadsheets/d/1TdA4lCWJTMRTmWDtU7yCzyrqeU6CyNeZygH5Opnvif8/edit>
ID `1TdA4lCWJTMRTmWDtU7yCzyrqeU6CyNeZygH5Opnvif8`

Read it as text (works for Sheets) with:

```
mcp__Google_Drive__read_file_content  fileId: "1TdA4lCWJTMRTmWDtU7yCzyrqeU6CyNeZygH5Opnvif8"
```

### What's in it

Each **column is one ad concept**, grouped by pain point:

| Pain point | Concepts (examples) |
|---|---|
| **Ads** | "The Lever That Used To Work Doesn't Anymore" · "Don't Pour Fuel On A Leak" |
| **Plateau** | "Revenue Flat For Months?" · "The Flat Line Is Information" |
| **Scaling** | "Revenue Up. Profit Flat." · "Revenue Up. Bank Account Down." |

Every concept ships full Meta ad copy in **V1 and V2** variants: **Primary Text · Headline · Description · CTA Button · Hashtags**. The sheet also links to:

- **Scripts doc** (Long/Short): `1ZbTpo7alV77vF8JgqVoHtBgKxPNtH8ADbP_Av18bw7k`
- **Drafts folder** (Final Long/Short): `1zUu18WxT7LsbVybG9RjV74SUoh68XpT_`

### How to use it in the interview

When the user wants an EcomIQ/Meta ad, **offer to pull approved copy from the matrix** instead of writing fresh:

1. Read the sheet → list the available concepts (by headline + pain point).
2. Let the user pick a concept and **V1 or V2**.
3. Lift Primary Text → narration/on-screen beats, Headline → hero line, Description → subhead, CTA Button → outro CTA, Hashtags → captions/description metadata.
4. Record the chosen concept + variant in `BRIEF.md` so the storyboard maps copy → beats.

This keeps on-brand voice locked to what's already approved — no invented claims.
