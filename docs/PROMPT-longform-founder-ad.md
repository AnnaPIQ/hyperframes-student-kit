# Reusable prompt — long-form founder ad (EcomIQ style)

Paste everything in the fenced block below into a **new session** from the workspace
root. Fill in the `{{PLACEHOLDERS}}` first. It reproduces the style of
`video-projects/revenue-up-bank-empty/` — a talking-head founder A-roll interleaved
with EcomIQ motion-graphics scenes, cut to the voiceover.

---

```
Using /ecomiq-ad and /hyperframes, build a long-form (~{{LENGTH_SECONDS}}s) EcomIQ
founder ad in the SAME style as video-projects/revenue-up-bank-empty/. Before you
start, read MOTION_PHILOSOPHY.md and docs/LESSONS.md, and open the existing
revenue-up-bank-empty project (index.html + compositions/) as your reference build —
match its structure, brand system, and polish.

=== INPUTS (I'm providing these) ===
- A-roll (talking-head founder footage): {{A_ROLL_FILE e.g. assets/raw/ad.mov}}
- Voiceover transcript (verbatim, in order):
  """
  {{PASTE FULL TRANSCRIPT HERE — this is the spine of the edit and the VO track}}
  """
- Product / brand: EcomIQ (e-commerce profit intelligence)
- Aspect ratio: {{4:5 (1080x1350) | 9:16 (1080x1920) | 16:9}}  (default 4:5)
- Project slug: {{q4-founder-ad}}

=== THE HOOK & MESSAGE (swap the copy, keep the shape) ===
- Cold-open hook line (2 parts, 2nd part is the "pain" in flame orange):
  "{{Biggest month ever.}}" / "{{Nothing in the bank.}}"
- Core tension: {{revenue is up but profit/cash is not}}
- Proof stats to visualize: {{Revenue $248K ↑34%, Orders 5,120 ↑28%, Growth +41%}}
- The hidden cost buckets: {{Refunds, Ad waste, Fees, Returns}}
- The turn / payoff line: "{{You didn't sell less. You kept less.}}"
- CTA end-card line + button: "{{Let's find your missing profit.}}" / "{{Click the link below →}}"

=== VISUAL SYSTEM (match exactly) ===
- Palette (≤5 colors): navy base #06284C, deep-navy panels, chrome/white for neutral
  headline words, flame orange #FF4C32 (with #f09025 gradient on the CTA pill) ONLY for
  the pain/emphasis words and the CTA, muted blue-grey #6f8db3 for struck-through
  "before" text, soft blue #9CD4FF for positive tags.
- Every graphic scene: navy background with subtle radial blooms + faint grid, a soft
  vignette, and the EcomIQ logo lockup pinned top-left (~60px margin, persistent across
  the whole video via the root composition).
- Type: Rethink Sans, heavy weights for headlines; tight letter-spacing on big numbers.
  Emphasis/keyword words are WHITE and NON-italic; pain words are flame orange.
- Motion: snappy GSAP entrances (fromTo on anything that starts hidden), kinetic type,
  and blur/whip transitions BETWEEN scenes — never hard cuts. Hold the end card 4–6s.
- Founder A-roll is full-frame, cover-cropped to the target aspect ratio (re-crop the
  source, don't letterbox).

=== STRUCTURE (founder A-roll ↔ motion-graphics, cut to the VO) ===
Interleave founder talking-head segments with graphic scenes that VISUALIZE what he's
saying at that moment. Cut each graphic scene in/out on the specific transcript words it
illustrates. Reference beat map (adapt to my transcript):
  1. Cold-open GFX hook: a line chart climbing to a "Record month" peak with a dotted
     baseline pill "Bank balance · $0", then the 2-part headline.
  2. Founder intro (A-roll).
  3. "From the outside, everything looks like it's working" + 3 stat tiles.
  4. Founder.
  5. Big revenue figure counting up + cost chips flying in ("…and the one that hides the
     most problems").
  6. Founder.
  7. Two bars side by side: Revenue (record high) vs Profit (stands still), with
     "setting records" / "flat" tags.
  8. Founder.
  9. Partner reveal: EcomIQ lockup + one-line tagline + feature chips.
  10. Payoff: the turn line, then a bank-balance card with a coin dropping in.
  11. CTA end card (held 4–6s): logo, the CTA line, flame gradient pill.

=== PRODUCTION WORKFLOW (do all of this) ===
1. Scaffold: `npm run new -- {{slug}} {{meta|square|story|wide}}` (meta=4:5, story=9:16).
2. Re-encode the A-roll to H.264 MP4 (crf 20, +faststart), cover-cropped to the target
   dimensions. Cut it into the founder segments you need.
3. Transcribe the VO for word-level timestamps
   (`npx hyperframes transcribe <file> --model small.en --json`) and use those
   timestamps to time every scene cut. Put the VO on a sibling <audio> track; <video>
   stays muted. Account for any VO/scene start offset so words land on the right frames.
4. Follow the render contract: one paused GSAP timeline per composition on
   window.__timelines["<data-composition-id>"]; sub-comps via <template>+
   data-composition-src; class="clip" on timed elements except <video>/<audio>;
   deterministic only (no Date.now/Math.random/network fetches); vendor GSAP locally.
5. `npx hyperframes lint` — fix all errors.
6. Render a draft, then DO THE VISUAL VERIFICATION GATE: pull one frame per scene at its
   hero moment, Read each PNG, and confirm face isn't cropped, transitions land on the
   intended word, captions are on-brand and readable, nothing overflows/overlaps.
7. Fix anything wrong, re-render, re-verify. Only then render final at --quality high.
8. Report the output path and show me the frames.

Ask me anything ambiguous before rendering. Keep the discipline from MOTION_PHILOSOPHY
(one idea per beat, motion in the transitions, breathing outro, callbacks) and append any
new hard-won fix to docs/LESSONS.md.
```

---

**Tips for reuse**
- For a **short cut**, keep the same beats but drop founder segments 4/6/8 and tighten the
  VO — same scenes, ~28–35s.
- For **9:16**, change the aspect line to `9:16 (1080x1920)`; the founder gets a tighter
  center crop and the graphic scenes get recentred for the taller frame.
- The single most style-defining choices: navy+flame palette, white/non-italic emphasis
  words, persistent top-left logo, blur/whip transitions, and the 4–6s CTA hold.
