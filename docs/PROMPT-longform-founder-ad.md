# Reusable prompt — long-form founder ad (EcomIQ style)

Paste the fenced block below into a **new session** from the workspace root. Fill in the
`{{PLACEHOLDERS}}` first.

**The point of this prompt:** the *topic* and the *specific motion graphics change every
time*. What stays **identical** is the **style** — the EcomIQ visual language, the motion
grammar, the founder-A-roll ↔ motion-graphics structure, and the production discipline.
The reference build is `video-projects/revenue-up-bank-empty/`: match its *look and feel*,
do **not** reuse its revenue/profit scenes literally. Design new graphics that fit the new
topic, rendered in the exact same style.

---

```
Using /ecomiq-ad and /hyperframes, build a long-form (~{{LENGTH_SECONDS}}s) EcomIQ
founder ad. IMPORTANT: match the STYLE of video-projects/revenue-up-bank-empty/ exactly,
but the TOPIC and the specific motion graphics are different this time — design brand-new
scenes that fit MY topic below. Do NOT copy that ad's revenue/profit scenes; reuse its
visual language, motion, and structure only.

Before you start: read MOTION_PHILOSOPHY.md and docs/LESSONS.md, and open
video-projects/revenue-up-bank-empty/ (index.html + compositions/) as your STYLE
reference — study how its scenes are built, then build my topic in the same manner.

=== INPUTS (I'm providing these) ===
- A-roll (talking-head founder footage): {{A_ROLL_FILE e.g. assets/raw/ad.mov}}
- Voiceover transcript (verbatim, in order) — this is the spine of the edit and the VO:
  """
  {{PASTE FULL TRANSCRIPT HERE}}
  """
- Aspect ratio: {{4:5 (1080x1350) | 9:16 (1080x1920) | 16:9}}   (default 4:5)
- Project slug: {{my-new-ad}}

=== TOPIC & MESSAGE (this is what changes each time) ===
- What this ad is about: {{ONE-LINE TOPIC}}
- The hook (2-part cold open; part 2 is the "pain/turn", shown in flame orange):
  "{{HOOK LINE A}}" / "{{HOOK LINE B}}"
- The core tension/problem: {{...}}
- Key facts / numbers / concepts to visualize (I'll trust you to pick the right scene
  type for each — see the SCENE VOCABULARY): {{list the data points, comparisons,
  lists, or ideas the graphics should show}}
- The turn / payoff line: "{{...}}"
- CTA end-card line + button: "{{...}}" / "{{Click the link below →}}"

=== STYLE LOCK (identical every time — do not change) ===
- Palette, ≤5 colors: navy base #06284C; deep-navy panels; chrome/WHITE for neutral
  headline words; flame orange #FF4C32 (CTA pill uses a #FF4C32→#f09025 gradient) ONLY
  for pain/emphasis words and the CTA; muted blue-grey #6f8db3 for "before"/struck text;
  soft blue #9CD4FF for positive tags.
- Background on EVERY graphic scene: navy with subtle radial blooms + a faint grid, soft
  vignette. EcomIQ logo lockup pinned top-left (~60px margin), PERSISTENT across the whole
  video via the root composition.
- Type: Rethink Sans, heavy weights for headlines; tight letter-spacing on big numbers.
  Emphasis/keyword words are WHITE and NON-italic; pain words are flame orange. One idea
  per beat.
- Motion grammar: snappy GSAP entrances (use fromTo on anything that starts hidden),
  kinetic type, numbers count up, elements settle with a slight overshoot. Transitions
  BETWEEN scenes are blur/whip — NEVER hard cuts. Hold the CTA end card 4–6s.
- Founder A-roll is full-frame, cover-cropped to the target aspect ratio (re-crop the
  source; never letterbox). Interleave founder segments with graphic scenes.
- Pacing: ~1.5–2.5s per graphic beat; cut every scene in/out on the exact transcript
  words it illustrates.

=== SCENE VOCABULARY (pick + adapt per topic; all rendered in the STYLE LOCK above) ===
These are the building blocks — choose whichever fit MY facts, invent similar ones if
needed, but keep the styling identical:
- Cold-open hook: a simple animated chart/visual + the 2-part headline.
- Stat tiles: 2–4 rounded navy cards, each a big number + label + a small ↑/↓ tag.
- Big-number reveal: one huge figure counting up, with small chips/labels flying in.
- Comparison bars: two (or more) bars side by side with tags, to contrast A vs B.
- List / checklist reveal: staggered rows or chips appearing one by one.
- Diagram / flow: nodes + connectors animating in sequence (use for processes/systems).
- Partner/brand reveal: EcomIQ lockup + one-line tagline + feature chips.
- Payoff moment: a single strong line, then a small hero object animating (e.g. a card,
  a coin, a meter filling) that embodies the promise.
- CTA end card (held 4–6s): logo, the CTA line, flame gradient pill.

=== PRODUCTION WORKFLOW (do all of this) ===
1. Scaffold: `npm run new -- {{slug}} {{meta|square|story|wide}}` (meta=4:5, story=9:16).
2. Re-encode the A-roll to H.264 MP4 (crf 20, +faststart), cover-cropped to the target
   dimensions; cut it into the founder segments you need.
3. Transcribe the VO for word-level timestamps
   (`npx hyperframes transcribe <file> --model small.en --json`) and time every scene
   cut to those words. VO goes on a sibling <audio> track; <video> stays muted. Correct
   for any VO/scene start offset so words land on the right frames.
4. Render contract: one paused GSAP timeline per composition on
   window.__timelines["<data-composition-id>"]; sub-comps via <template>+
   data-composition-src; class="clip" on timed elements except <video>/<audio>;
   deterministic only (no Date.now/Math.random/network fetches); vendor GSAP locally;
   wrap any <video> in a positioned <div> (never animate the video element directly).
5. `npx hyperframes lint` — fix all errors.
6. VISUAL VERIFICATION GATE (required): render a draft, pull one frame per scene at its
   hero moment, Read each PNG, confirm the face isn't cropped, transitions land on the
   intended word, type is on-brand and readable, nothing overflows/overlaps.
7. Fix, re-render, re-verify. Only then render final at --quality high. Report the output
   path and show me the frames.

Ask me anything ambiguous before rendering. Keep MOTION_PHILOSOPHY discipline (one idea
per beat, motion in the transitions, breathing outro, callbacks) and append any new
hard-won fix to docs/LESSONS.md.
```

---

**How to drive it**
- Only two things change per ad: the **transcript** and the **TOPIC & MESSAGE** block.
  Everything under **STYLE LOCK** stays byte-for-byte the same — that's what makes every
  video look like part of the same series.
- Leave scene selection to the model: give it your *facts/ideas* in the message block and
  let it map each to a scene type from the **SCENE VOCABULARY**. It'll design new graphics
  in the locked style rather than reskinning the revenue ad.
- **Short cut:** same style + scenes, fewer founder segments and a tighter VO (~28–35s).
- **9:16:** set the aspect line to `9:16 (1080x1920)` — founder gets a tighter center
  crop, graphic scenes recenter for the taller frame.
- Non-negotiable style signatures: navy + flame palette, white/non-italic emphasis words,
  persistent top-left logo, blur/whip transitions, numbers that count up, 4–6s CTA hold.
