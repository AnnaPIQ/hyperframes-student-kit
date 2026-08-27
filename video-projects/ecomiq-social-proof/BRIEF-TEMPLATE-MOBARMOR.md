# EcomIQ social-proof ad — Mob Armor, b-roll from the client's own material

Paste everything below the line into a new session. Fill the two `‹…›` blanks.

Everything in `BRIEF-TEMPLATE.md` applies unchanged — style, content rules, pipeline, traps,
verification, delivery. This brief only covers what is specific to Mob Armor.

## Read this first — what you already have

The Drive folder and the site were both checked before this brief was written, so you can skip
the survey. The folder is **not** "just product footage" — it already contains vertical
lifestyle b-roll, which changes where the searching effort should go:

| Subfolder | What's actually in it |
|---|---|
| **Social Cuts** (12 clips, 25–70 MB) | **1080×1920 vertical, 24fps — real lifestyle footage**: people in vehicles, in-cab, hands on mounts. This is the b-roll. Verified by pulling `Mobnetic Maxx Water balloon.mp4`. |
| **MP4 Product Videos** (32 clips) | 1920×1080 **landscape**, 24fps, ~8.6 Mbps — product and packaging on plain colour. Verified with `38W CAR CHARGER.mp4`. |
| **Logos** | `logo-white@2x.png`, `logo-shield-white@2x.png`, `seal-white@2x.png`, plus layered `.ai`. White versions exist — use them, never redraw. |
| **Products**, **Icons** | Stills. |
| **BRANDING_GUIDE.pdf** (2.8 MB), **brandprofile-032921.pdf** | **Read both before choosing any type or colour.** |

So: Social Cuts and Product Videos cover a good part of the cut, and the search job (next
section) is for the lifestyle context they don't have — off-road, trucking, moto, work-truck,
first responder.

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

### Sourcing b-roll — this is real work, budget for it

The Drive folder covers product beats and some in-vehicle lifestyle, but it is **February 2025
material and product-led**. Expect to go looking for more, and treat that as a proper step
rather than a fallback.

1. **Transcribe the VO and build a shot list first.** One line per beat: what the words are
   doing, and the shot that supports them. Search against that list — never browse first and
   retro-fit the edit to whatever turns up.
2. **Mine the Drive folder against the list.** Social Cuts for anything human or in-cab (already
   1080×1920); MP4 Product Videos for product beats (as inset windows, not full-bleed).
3. **Then search the client's own channels for anything still missing.** Their social is the
   right place for lifestyle, off-road, trucking, moto and first-responder context that the
   product folder doesn't have:
   - **YouTube `@mobarmor`** — the richest source. Already spotted: *Top 5 Extreme Uses: Drift,
     Off-Road, Work Truck*, *Behind the Build: How We Make Our Phone Mounts*, *Why Riders Trust
     Mob Armor*, *Mob Armor Mag FLEX Plate Install*, plus a stream of **vertical Shorts**.
     `yt-dlp --flat-playlist` lists the channel fine — use it to build a candidate list with
     ids and durations. **But downloading is blocked**: YouTube answers "Sign in to confirm
     you're not a bot". It needs `--cookies-from-browser` or a cookies file. **Ask me for
     cookies as soon as you know which videos you want** — don't burn time retrying, and don't
     silently drop the beat.
   - **Instagram `@mobarmor` and TikTok `@mobarmor`** — pages respond, but media realistically
     needs auth. Try, and tell me quickly if you're blocked.
   - **mobarmor.com** — `https://www.mobarmor.com/products.json?limit=250` returns product
     image URLs on `cdn.shopify.com` and works without a key. Good for clean stills, a
     Ken-Burns push, or an inset product window. Verified.
   - Blog / case-study / collection pages are worth a look for embedded video and for **real
     figures** you can put on a card.
4. **Report what you found and what you couldn't.** For every beat the shot list can't fill
   from first-party material, say so and propose an alternative (a different shot idea, a
   product-video inset, or a motion-graphic card) rather than quietly substituting stock.
   **Don't use free stock libraries here** — this is a first-party, proof-led ad and stock
   people would read as fake customers. If you think a beat genuinely needs stock, ask first.
5. **Log every clip** in `assets/broll/CREDITS.md`: where it came from, the URL or Drive id,
   and the date pulled.

### Rights
Everything in the Drive folder and on the client's own channels is first-party, so the
licensing worry that comes with stock mostly disappears. Two exceptions:

- **The product-page video on mobarmor.com is Okendo customer-review UGC and only 576×1024.
  Do not use it.** It would upscale 1.9× to fill 1080×1920, and review video is licensed to
  the merchant for on-store display, not for paid ads — those are identifiable real customers.
  If you want it, I have to get written permission first.
- **Creator/UGC content reposted on their social** may not be the brand's to license for paid
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
