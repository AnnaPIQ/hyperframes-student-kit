# EcomIQ social-proof ad — Mob Armor, b-roll from the client's own material

Paste everything below the line into a new session. Fill the two `‹…›` blanks.

Everything in `BRIEF-TEMPLATE.md` applies unchanged — style, content rules, pipeline, traps,
verification, delivery. This brief only covers what is specific to Mob Armor.

## Read this first — the premise changed

The Drive folder was checked before this brief was written. **You already have vertical
lifestyle b-roll; you do not have to go hunting online.** The folder is not "just product
footage":

| Subfolder | What's actually in it |
|---|---|
| **Social Cuts** (12 clips, 25–70 MB) | **1080×1920 vertical, 24fps — real lifestyle footage**: people in vehicles, in-cab, hands on mounts. This is the b-roll. Verified by pulling `Mobnetic Maxx Water balloon.mp4`. |
| **MP4 Product Videos** (32 clips) | 1920×1080 **landscape**, 24fps, ~8.6 Mbps — product and packaging on plain colour. Verified with `38W CAR CHARGER.mp4`. |
| **Logos** | `logo-white@2x.png`, `logo-shield-white@2x.png`, `seal-white@2x.png`, plus layered `.ai`. White versions exist — use them, never redraw. |
| **Products**, **Icons** | Stills. |
| **BRANDING_GUIDE.pdf** (2.8 MB), **brandprofile-032921.pdf** | **Read both before choosing any type or colour.** |

So the sourcing job is small: use Social Cuts for lifestyle beats, Product Videos for product
beats, and only go outside if a specific beat can't be filled.

**Two real technical constraints, both verified:**
- **Every clip is 24fps** and carries an audio track plus a stray data stream. Normalise to
  30fps and strip both: `-map v:0 -an`, or `npm run prep -- <file> --project <slug> --mute`.
- **The Product Videos are landscape.** A 9:16 crop out of 1920×1080 is only 608px wide and
  gets upscaled to 1080 — that was the single biggest softness problem on the Dryft build.
  **Don't crop them full-bleed.** Product-on-plain-background footage should sit as an inset
  product window on a brand card, at native scale. The Social Cuts are already 1080×1920 and
  need no crop at all.

---

## Brief — social-proof ad, Mob Armor

Build a social-proof video ad in the **same idea and style** as
`video-projects/ecomiq-social-proof/`. New voiceover, new numbers, Mob Armor as the brand.

**Read first:** `BRIEF-TEMPLATE.md` in that folder (full spec — all of it applies), then
`DESIGN.md`, `EDIT-PLAN.md`, `docs/LESSONS.md`, the workspace `CLAUDE.md` and
`MOTION_PHILOSOPHY.md`, and **both Mob Armor brand PDFs from the Drive folder**. Copy the
project and swap the media and numbers — don't start from a blank composition.

**Sources**
- A-roll (Sean to camera, picture + sound): ‹DRIVE LINK›
- Client media: https://drive.google.com/drive/folders/1DBvZ_8bcxVX9wPEe0a8dUvXZhdftuAgt
- Client site: https://www.mobarmor.com (Shopify)

**Confirm with me before building — ‹WHOSE AD IS THIS?›**
The Dryft build was an **EcomIQ** ad crediting the client, EcomIQ navy + flame throughout,
with the client's wordmark on the stat card. Default to that here (Mob Armor's white logo
plays the role Dryft's did). If this is instead a **Mob Armor-branded** ad, the whole palette
comes from `BRANDING_GUIDE.pdf` — black/gunmetal/blue/red, not navy/flame — and the end card
is Mob Armor's, not EcomIQ's. **Ask me which, in one line, before you design anything.**

### Proof points — all real, all on mobarmor.com (verify before use)
- **500,000+ drivers** trust Mob Armor
- **3-year warranty** (they call it industry-leading)
- **4.5–5.0★** product ratings, **47–504 reviews** per product
- **Veteran-owned**; military / first-responder discounts
- Tagline: *"The Most Versatile Phone Mounts on the Planet"*

Same hard rule as always: **never invent a figure**, and a beat with no real number gets no
graphic. Re-check each of these on the live site before it goes on screen — they change.

### Sourcing order
1. **Transcribe the VO and build a shot list first**, then match clips to beats.
2. **Social Cuts** for anything human or in-vehicle. Already 1080×1920.
3. **MP4 Product Videos** for product beats — as inset windows, not full-bleed (see above).
4. **Shopify product images** if you need clean stills: `https://www.mobarmor.com/products.json?limit=250`
   returns image URLs on `cdn.shopify.com`. Verified working.
5. Only then look outside. What was tested from the container:
   - **YouTube `@mobarmor`** — `yt-dlp` **lists** the channel fine and there is genuinely good
     material (*Top 5 Extreme Uses: Drift, Off-Road, Work Truck*, *Behind the Build*, *Why
     Riders Trust Mob Armor*, plus vertical Shorts). But **downloading is blocked** — "Sign in
     to confirm you're not a bot". It needs `--cookies` / `--cookies-from-browser`. Ask me for
     cookies rather than assuming it works.
   - **Instagram / TikTok** — pages return 200 but media realistically needs auth. Don't count
     on them.
   - **Product-page video on the site is Okendo customer-review UGC**, only 576×1024. **Do not
     use it**: it would upscale 1.9× to fill 1080×1920, and review video is licensed to the
     merchant for on-store display, not for paid ads — those are identifiable real customers.
     If you want it, I have to get written permission first.

### Rights
Everything in the Drive folder and on the site is the client's own, so the licensing worry
from stock footage mostly disappears — with two exceptions: **the Okendo review videos above**,
and any creator/UGC content reposted on their social, which the brand may not own for paid
media. If a clip's origin isn't obviously first-party, ask before using it.

### Everything else is unchanged
Audio-led, full VO, no cutdown. Graphics only where a real figure is spoken, each a full-bleed
card. All text white, all display type weight 800, logo top-left, blur-whip cuts, vignette +
grain, bottom ~30% clear for subtitles. Same script pipeline, same traps (`renders/` is
gitignored — the deliverables are the committed `final-*.mp4` at the project root).

**Checkpoint:** give me the **shot list with the specific clips chosen per beat** plus the
**transcript-timed edit plan**, and wait for approval before rendering.

**Delivery:** 9:16 (1080×1920) and 4:5 (1080×1350), 30fps, H.264/AAC, `+faststart`,
`--quality high`, committed as `final-9x16.mp4` / `final-4x5.mp4` at the project root, plus a
sub-30 MiB copy of anything larger, and give me the links.
