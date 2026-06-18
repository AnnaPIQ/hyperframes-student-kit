# Render Loop & Visual Verification (Gate 4)

Lint passing ≠ design working. This gate is mandatory and the user (and `CLAUDE.md`) explicitly require it: **never report a render done until frames have been extracted AND `Read`.**

---

## 1. Lint

```bash
cd video-projects/<slug>
npx hyperframes lint        # fix ALL errors; triage warnings
```

The two Google-Fonts resolution warnings are **survivable in this env** — fonts resolve at render time; verify the actual typeface in the frames rather than trusting/failing on the warning.

## 2. Preview — the cloud-container reality

`npx hyperframes preview` binds to **localhost:3002 inside the container** — **not reachable from the user's browser** on Claude Code for the web. Do **not** stall waiting on live Studio here.

- **Cloud (default here):** the **rendered draft MP4 becomes the preview gate.** Say so plainly: *"Live preview isn't reachable in this container — I'll render a draft and you review the MP4."* Then go straight to step 3.
- **Cloned locally:** live Studio works. Run `npx hyperframes preview` in the background, wait for "Studio running", and hand over **individual composition URLs** (`http://localhost:3002/?comp=<id>`) — they load instantly and dodge a master-comp stall (software WebGL + shader blocks). Wait for "looks good, render a draft."

Either way: **never skip both review gates.** A draft-MP4 review fully satisfies the first gate when Studio is unavailable.

## 3. Draft render

```bash
npx hyperframes render --quality draft --output renders/<slug>-draft.mp4
```

The CLI's output line is `<size> · <render-time> · <status>` — the middle number is **wall-clock render time, NOT clip duration.** Verify duration separately:

```bash
ffprobe -v error -show_entries format=duration -of csv=p=0 renders/<slug>-draft.mp4
```

## 4. Visual verification — MANDATORY, no exceptions

Extract a frame at **every beat's hero moment and every transition**. For talking-head, pick **word-exact** timestamps (the exact spoken word where a specific visual should be on screen — not round numbers, not mid-scene):

```bash
mkdir -p renders/frames
for pair in "<t>:<label>" "<t>:<label>" ...; do
  t="${pair%%:*}"; label="${pair##*:}"
  ffmpeg -y -ss "$t" -i renders/<slug>-draft.mp4 -frames:v 1 -q:v 2 "renders/frames/t${t}-${label}.png"
done
```

**Call `Read` on every PNG** — the Read tool loads the image into context. Do NOT just list filenames. For each frame confirm:

- Speaker's face not cropped in any bottom-half scene; correct full-screen vs bottom-half mode per scene.
- Text readable, on-palette (EcomIQ: navy/flame/blue-tint; AIS: Montserrat, `#37bdf8` accent, `#f09025` hot), no overflow, no unintended overlap.
- Fonts resolved to the real typeface (not a fallback) — especially Rethink Sans + Hedvig Serif italic for EcomIQ.
- Transitions/overlays land on the intended word; no blank frames.

If anything is wrong: **fix → re-render → re-verify the affected frames.** Never ship a broken draft and let the user find the bug.

## 5. MP4 review gate

```bash
npx serve renders -p 8080 -n      # NOT python http.server — no Range support, scrubbing breaks
```

Hand over `http://localhost:8080/<slug>-draft.mp4` and **wait for explicit sign-off** on motion + audio sync. (In the cloud container this is the local-serve fallback; if the user can't reach it either, the frame-by-frame `Read` verification above stands in — but get explicit sign-off before the final render.)

## 6. Final render

```bash
npx hyperframes render --quality standard --output renders/<slug>-final.mp4
```

Spot-check 3–4 frames from the final (same timestamps, fresh `renders/frames-final/`) to confirm the standard-quality encode didn't shift anything. Report the output path + verified duration.

---

## Iterating on feedback

Feedback arrives **per timestamp**, like notes to a human editor ("at ~5s the blur is on top of the text — put it behind"; "the % at ~12s is clipped"). Apply each note to the specific scene/beat, re-render, re-verify only the affected frames. Don't refactor untouched scenes.

**Long sessions:** building multi-scene video burns context fast. When it gets heavy and the user wants a fresh round, offer a clean handoff *before* continuing: *"Want a summary of everything built + where each file lives, so you can start a fresh session and we iterate from a clean slate?"* — cheaper and sharper than piling edits onto a bloated context.
