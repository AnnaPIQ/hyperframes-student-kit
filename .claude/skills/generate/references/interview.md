# Interview — Full Question Bank (Gate 1)

Ask **one question per `AskUserQuestion` call** — never batch; the user can't focus on three at once. Multiple-choice over open-ended whenever the answer has discrete valid forms. Follow-ups happen inline. **Capture each answer to `BRIEF.md` as a short phrase** as you go.

## Before asking anything — inventory

```bash
ls "$(git rev-parse --show-toplevel)/assets" 2>/dev/null    # shared brand (EcomIQ, AIS, music)
ls video-projects/*/assets 2>/dev/null
ls assets/incoming 2>/dev/null                               # footage waiting for npm run prep
ls assets/ecomiq 2>/dev/null                                 # saved EcomIQ brand kit?
```

Never ask for what's already there — confirm the interpretation instead.

---

## Intent & format

**Q1. What's this video for?** Promo · Social ad (TikTok/Reels/Shorts/X) · Launch teaser · Product demo · Tutorial · Explainer · **EcomIQ Meta ad** · Intro/outro card · Other.

**Q2. Audience?** (open) — industry · expertise · platform they'll watch on · what they should feel.

**Q3. Duration?** Short 10–20s · Promo 20–45s · Explainer 45–90s · Lesson 1.5–3 min · Custom (number).

**Q4. Aspect ratio?** 16:9 (1920×1080) · 9:16 (1080×1920) · 1:1 (1080×1080) · **4:5 (1080×1350, Meta feed)**.

**Q5. Frame rate?** 30 (default) · 60 (crisp UI/product) · 24 (cinematic).

**Q6. Platform / delivery?** Where it plays · file-size ceiling · deadline.

---

## Script & voice

**Q7. Script source?**
- Paste the full script
- Outline — I'll draft it
- I'll record it (face-cam / VO file — get the path)
- TTS narration from text
- No narration — visuals + music
- **Pull approved copy from the "B-Roll Short Cut" matrix** (EcomIQ ads — see `broll-sourcing.md` §2)

**Q8. If TTS:** voice (offer from `npx hyperframes tts --help` — `am_adam`, `am_michael`, `af_bella`, `bf_emma`) + pace.

**Q9. If face-cam / recorded VO:** file path · full-screen or corner (which corner) · transcription? → `npx hyperframes transcribe <file> --model small.en --json`. **Tell the user to TRIM FIRST** — cut retakes/flubs/dead space before handing the clip over; you can't reliably tell a flub from a keeper, and re-cutting via FFmpeg is slower than them trimming in Descript. Audio is the source of truth: measure the edited clip with `ffprobe`; that duration is the composition's `data-duration`.

**Q10. Captions?** Off · hype · corporate · karaoke (per-word) · minimal.

---

## Footage & b-roll

**Q11. Footage?**
- Supplied (paths)
- **Source from the B-Roll – EIQ Drive library** → `broll-sourcing.md` §1 (search by `parentId`, match by title, mind the connector constraints)
- AI-generated → `npm run gen` (Runway; needs `RUNWAYML_API_SECRET` — if unset, say so and offer the Drive library or supplied paths instead)
- None

---

## Style

**Q12. Brand?** If `assets/ecomiq/` exists, **offer the EcomIQ kit first** ("Use the EcomIQ brand, or a different look?") — never impose it. Else: paste a style guide/path · or none.

**Q13. Palette?** Hex codes (at least background · text/primary · accent). EcomIQ: navy `#06284C` + flame `#FF4C32` + blue tint `#9CD4FF` + sky `#DEEEFE`. Or MOTION_PHILOSOPHY defaults.

**Q14. Fonts?** Google Fonts names / file paths. EcomIQ: Rethink Sans + Hedvig Letters Serif (italic emphasis). Default: Inter + JetBrains Mono.

**Q15. Logo?** Path · or text wordmark (get the text + weight). EcomIQ logos live in any project's `assets/` (`ecomiq-logo-white.svg` on navy, `-navy.svg` on light).

**Q16. Reference videos for vibe?** URLs/paths · none.

**Q17. Aesthetic?** MOTION_PHILOSOPHY (black canvas · chrome type · perspective grid · whip transitions · 4–6s outro) · or different (describe/reference).

**Q18. Pacing?** Kinetic 1–2s · Balanced 2–3s · Relaxed 3–5s.

**Q19. Music?** None · ambient pad `data-volume="0.15"` · bed `0.4` · full `0.8` (path if supplied).

**Q20. Outro / CTA?** Line + hold duration (4–6s — the longest shot in the video).

---

## Sequencing rules

- One question per call. Multiple-choice when possible.
- Follow-ups inline (Q7 = "I'll record" → jump to Q9, skip Q8).
- Never re-ask what's known from an earlier answer or the asset inventory.
- If an answer is surprising ("4-hour TikTok ad"), confirm before proceeding.
- The `BRIEF.md` at the end is a synthesis, not a transcript.
