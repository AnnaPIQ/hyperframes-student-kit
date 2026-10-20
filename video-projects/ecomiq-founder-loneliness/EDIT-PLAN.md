# EcomIQ, "You don't have to decide alone" | 9:16 organic edit plan

**Format:** 1080 × 1920, 25 fps (A-roll native), organic Reels / TikTok / Shorts
**Runtime:** 58.90 s (A-roll source 00:00.40 → 00:59.30)
**Companion files:** `subtitles-en-US.srt` (US spelling, timed to program TC), `reference/` (logo + subtitle placement frames)

---

## 0. What the actual A-roll tells us

| Fact (measured from `heatmap - 3.mov`) | Consequence for the edit |
| --- | --- |
| ProRes 4K **landscape** 3840 × 2160, 25 fps, 61.2 s, 24-bit PCM audio | The 9:16 window is cut from the middle of a 16:9 frame. Full-height window = 1216 × 2160, so there is no "wider than standard". |
| Sean's face centre sits at **48–54 % horizontally, 41–47 % vertically for the entire take** (face-tracked at 1 s intervals) | One horizontal crop anchor works for the whole video: **x centre = 1958 px (51 %)**. No reframing between shots. |
| The full-height 9:16 window is already a **medium close-up** (head and shoulders fill the frame) | 120–125 % crops become extreme close-ups and push his hair into the logo and his chin into the subtitles. **Cap crops at 114 %.** See §2. |
| Foreground camera/mic lens visible bottom-centre at 100 % | It disappears progressively as we crop in. Subtitles sit above it. |
| Sean is still shifting into position until ~0.40 s. First word at 0.52 s. | **In-point 00:00.40.** |
| Last word ("brand.") ends 58.38 s. Eye contact holds until ~59.35 s, then he looks down. | **Out-point 00:59.30**, a 0.9 s natural hold, then hard cut to end. |
| He says **"because"**, not "cuz" | Subtitle reads "because". |

Program TC = Source TC − 0.40 s. All times below are **A-roll source TC** unless marked *(prog)*.

---

## 1. Emotional arc (how the visuals progress)

The brief cut off at "PERSONAL", so I've continued the arc as the script implies:

```
ALONE ──► DECISIONS / UNCERTAINTY ──► PERSONAL STRATEGIST ──► SPECIALISTS / INDUSTRY ──► FOUNDER COMMUNITY ──► BACK TO YOU (you decide)
 Sean only     Sean only, tightening      first 1:1 B-roll         authority B-roll            peer conversation       Sean only
 0:00–0:17     + 1 solitary B-roll          0:30                      0:33–0:39                   0:41–0:47               0:47–end
```

- **0:00 to 0:30, Sean is alone on screen** apart from one solitary B-roll (Sean at a laptop, thinking). The only "other person" in the first half is the viewer.
- **0:30 to 0:47, the world opens up.** One-to-one, then stage and industry, then peers. Every B-roll has more people in it than the last.
- **0:47 to end, back to Sean alone, but the meaning has changed.** He's not lonely now, he's in control. This is deliberate: "You still make all of the decisions" must not be covered by team footage.

B-roll share: 17.6 s of 58.9 s (30 %). Sean is on screen for 70 % of the video.

---

## 2. A-roll crop system

All crops are top-anchored (window top = 0) and centred at x = 1958 px. Top-anchoring keeps headroom constant so his hair never reaches the logo, and the crop-in removes the mic from the bottom instead.

| Name | Scale | 4K source window (w × h, x, y) | Use |
| --- | --- | --- | --- |
| **Standard** | 100 % | 1216 × 2160 @ 1350, 0 | Opening, "And that's how EcomIQ works", final line |
| **Medium** | 108 % | 1126 × 2000 @ 1395, 0 | "I've been there", the three questions, "And you also get access" |
| **Medium+** | 110 % | 1104 × 1964 @ 1406, 0 | "You still make all of the decisions" |
| **Tight** (push-in ceiling) | 114 % | 1066 × 1894 @ 1425, 0 | Only ever reached via slow push-in, never cut to directly |

- Every crop stays at or under native resolution (114 % = 1066 px wide into 1080, a 1.3 % upscale). No softening.
- **Push-ins:** linear or gentle ease-in-out, max 6 % over at least 3 s. It should be felt, not seen.
- **Crop changes only happen on a pause** between sentences (gaps measured in §0), never mid-word.
- **Why not 120–125 %:** tested on frame. At 118 % his hair touches the logo, at 120 % his beard sits inside the subtitle block. 114 % gives the same "leaning in" effect within this framing.

Total A-roll framing events in 59 s: 6 hard crop cuts + 4 slow push-ins. Never "every sentence".

---

## 3. Shot-by-shot edit decision list

| # | Source TC | Prog TC | Dur | Picture | Script covered | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 00.40 → 06.82 | 0:00.00 → 0:06.42 | 6.42 | **A · Standard 100 %**, push 100 → 104 % from 03.90 → 06.76 | "Being an e-commerce founder can be extremely lonely, especially when every important decision sits with you." | §1 Hook. No B-roll, no text treatment. The push starts on "especially" and lands on "sits with you", quietly drawing the viewer in. |
| 2 | 06.82 → 17.58 | 0:06.42 → 0:17.18 | 10.76 | **A · Medium 108 %** hard cut. Hold. Then push 108 → 114 % from 11.80 → 15.70. Hold 114 % to end of shot. | "And I know this because I've been there. You start to second-guess yourself… all alone. And even when you have the data," | §2 + §3. The cut on "And I know this" is the one crop change for the personal-credibility line. The push across "work everything out yourself, all alone" is the "one subtle tighter" move for §3. Long hold is intentional: it is the loneliness section, so it should feel unhurried. |
| 3 | 17.58 → 20.92 | 0:17.18 → 0:20.52 | 3.34 | **B1 · Angle over laptop - Sean thinking.MP4**, src 0:04.00 → 0:07.34 | "like a heat map showing you how customers use your website," | §4. **What it adds:** the real act of looking at information and not knowing what it means. It is still Sean, still alone, so it doesn't break the emotional arc. Chosen over "Sean on Laptop" (see §6 flag). No heatmap recreation. |
| 4 | 20.92 → 27.10 | 0:20.52 → 0:26.70 | 6.18 | **A · Medium 108 %**, push 108 → 112 % from 21.00 → 26.48 | "you still need to know, well, what does this actually mean? What should I change next? What do I test first?" | §5–7. Return to Sean for the questions. **One shot for all three questions**, no cuts. The slow push gives them a quiet build. 0.62 s of air after "first?" before the next cut lets them land. |
| 5 | 27.10 → 30.05 | 0:26.70 → 0:29.65 | 2.95 | **A · Standard 100 %** hard cut | "And that's how EcomIQ works. You get a" | §8. Problem → support. The cut back to the widest frame is the visual exhale. The logo is already top-left, so no branded moment is needed. |
| 6 | 30.05 → 32.96 | 0:29.65 → 0:32.56 | 2.91 | **B2 · Sean holding laptop talking to man**, src 0:03.00 → 0:05.91. *Alt:* Over Sean's shoulder - talking to Mason.MP4 | "personal strategist who understands your business and" | §9. **What it adds:** the first time another person appears. A one-to-one working conversation with a laptop in hand is literally "someone to think through the business with". |
| 7 | 32.96 → 35.78 | 0:32.56 → 0:35.38 | 2.82 | **B3 · Sean talking on stage at Shoptalk - rebuy**, src 6:02.00 → 6:04.82 | "access to specialists currently doing this kind of" | §10. **What it adds:** proof of real industry involvement. Sean presenting at Shoptalk shows the team is active at the top of US ecommerce, not just talking about it. Uses the 6:02 window because the 0:12–0:14 window is only 2 s. |
| 8 | 35.78 → 38.90 | 0:35.38 → 0:38.50 | 3.12 | **B4 · Walking in Klaviyo Event space**, src 0:07.00 → 0:10.12 *(verified: native vertical 4K, busy event bar, no Sean)* | "work with the top ecom brands in the U.S." | §11. **What it adds:** neutral, real US ecommerce-industry context. It shows the environment without showing or implying any specific brand. Check no client logos are readable (§6). |
| 9 | 38.90 → 41.30 | 0:38.50 → 0:40.90 | 2.40 | **A · Medium 108 %** static | "And you also get access to other" | Re-anchors on Sean between the authority block and the community block, so the video never leaves him for more than ~9 s, and marks the shift from specialists to peers. |
| 10 | 41.30 → 44.05 | 0:40.90 → 0:43.65 | 2.75 | **B5 · Sean and Mason standing talking to 2 woman**, src 0:04.60 → 0:07.35 | "founders at a similar stage to bounce ideas off" | §12. **What it adds:** a visible peer conversation, a small group, standing and talking at an event. It reads as founders comparing notes, not a sales meeting. |
| 11 | 44.05 → 46.70 | 0:43.65 → 0:46.30 | 2.65 | **B6 · Sean Laughing over Mason shoulder**, src 0:02.00 → 0:04.65. *Alt:* Through window - Sean listening to Mason talking.MP4 | "within our EcomIQ community." | §13. **What it adds:** rapport. Laughter is the clearest visual for "people who get it". One shot, allowed to breathe, no title, no group-chat graphic. |
| 12 | 46.70 → 55.05 | 0:46.30 → 0:54.65 | 8.35 | **A · Medium+ 110 %** hard cut, hold to 49.30, then push 110 → 114 % from 49.30 → 54.48 | "You still make all of the decisions. We just help you make them faster with better information and a clear plan for what to do next." | §14–16. Sean owns "You still make all of the decisions": no team footage. The 0.84 s pause after "decisions." is left intact, which is the breathing room the brief asks for. The push starts on "We just help you", so the visual tightens as the support is explained. **No B-roll on §16 by default** (see option below). |
| 13 | 55.05 → 59.30 | 0:54.65 → 0:58.90 | 4.25 | **A · Standard 100 %** hard cut, hold, **hard cut to end** | "Talk to us to find out where EcomIQ could help your brand." | §17. The open frame reads as an invitation, not a pitch. 0.9 s hold after "brand." while he keeps eye contact, then cut. No end card, no CTA, no slate. |

### §16 option (only if Nate wants more visual support)
Replace 51.26 → 54.48 of shot 12 with **Sean working on laptop in cream venue.MP4** (3.2 s, in Drive). **What it adds:** "better information and a clear plan" shown as calm, focused work. I recommend against it. It splits the "you decide / we help" thought, and the close is stronger with Sean holding the camera.

---

## 4. Logo

| Spec | Value |
| --- | --- |
| File | `assets/ecomiq/ecomiq-logo-navy.png` (full lockup) |
| Size | **170 px wide** (~16 % of frame width) |
| Position | **x = 56 px, y = 200 px** (top-left, just below the Reels/TikTok header area) |
| Behavior | Static, full opacity, on from frame 1 to the last frame. No fade, no animation. |
| B-roll exception | Over dark B-roll (Shoptalk stage, event interiors, if the top-left is dark) swap to `ecomiq-logo-white.png` at the **identical** size and position, hard-cut with the shot. Check each clip; keep navy wherever it reads. |

Verified on frame (`reference/`): with top-anchored crops, Sean's hair is more than 100 px below the logo at every crop up to 114 %. The logo never touches him or the subtitles.

---

## 5. Subtitles (US spelling)

**Copy:** `subtitles-en-US.srt`, 32 cues, timed to program TC, max 2 lines, max 30 characters per line.

| Spec | Value |
| --- | --- |
| Font | Rethink Sans SemiBold (`assets/ecomiq/fonts/`), 52–56 px, sentence case |
| Color | White `#FFFFFF` on a navy `#06284C` box at 60 % opacity, 14–16 px corner radius, ~24 px side padding |
| Position | Centred. **Box top at y = 1410 px**, bottom ≤ 1560 px. Keep within x 120–960 to clear the right-hand like/share column. |
| Motion | **None.** Cues hard-cut on and off. No word highlight, no pop, no karaoke. |
| Why the box | The subtitle zone sits over Sean's **white T-shirt**. White text without a backing disappears there. The box is the minimum treatment that keeps them legible, and it's in brand navy. |

Measured clearances at y = 1410: ~60 px below his chin at 114 %, ~50 px above the mic top at 100 %. Same position on B-roll for consistency.

**US-spelling and style edits made against the brief's transcript:**
- "cuz" → **"because"** (what he actually says)
- "second guess" → **"second-guess"** (hyphenated compound verb, US style)
- "US" → **"U.S."** (US style guides, AP and Chicago)
- "e-commerce" kept hyphenated; "ecom" kept lowercase as spoken slang; **"EcomIQ"** kept in brand case
- No British spellings appear elsewhere in the script, so nothing else changed

---

## 6. Flags to clear before the edit

1. **"Sean on Laptop" (0:09–0:12) is actually a client file.** The sheet's link opens **"Sweet E's Sean and Erica - intro.MP4"**. Using it as generic "Sean analyzing data" footage risks showing a client's content out of context. I've used *Angle over laptop - Sean thinking* instead. If you prefer the Sweet E's shot, confirm there is no client branding in frame.
2. **Unverified B-roll.** Google returned "download quota exceeded" on these, so I couldn't pull frames: *Angle over laptop*, *Sean holding laptop talking to man*, *Shoptalk stage*, *Sean and Mason talking to 2 woman* (I confirmed it's 4K, 8.1 s long), *Laughing over Mason's shoulder*, *Following Sean walking*. The timecodes above come from the sheet's notes. Whoever cuts should confirm each window shows **visible interaction** and no readable third-party logos. Quota normally resets within 24 hours, and I can re-check then.
3. **No Drive links in the sheet** for *Over Sean's shoulder - talking to Mason*, *Over Mason's shoulder*, *Through window - Sean listening to Mason*, *Sean thinking and typing close up*. They're named as alternatives only.
4. **"Other founders" honesty.** Mason is team, not a community member. Shots 10–11 show genuine peer conversation without captioning anyone as a founder, which is defensible. **Don't** use Sweet E's or Dryft footage here, because it would imply those clients are in the EcomIQ community.
5. **Two women in shot 10.** Confirm they're OK to appear in paid or organic EcomIQ content.
6. **Rejected from the sheet:** *Sean and Jaren - talking outside* (720p, and the conversation isn't visible: it's Sean on his phone with empty scenery either side). *Klaviyo booths* (strangers networking, reads as stock and could misrepresent the "community"). *Sean walking around at Shoptalk* (selfie-style with him talking to camera, so muted it becomes lip-flap).

---

## 7. Technical notes for the edit

- **Timeline:** 1080 × 1920, 25 fps. Conform the 23.976/30 fps B-roll to 25 (frame blending off).
- **B-roll crops:** landscape 4K clips use a 1216 × 2160 centre-weighted window, nudged to keep faces and interaction in frame. Klaviyo space is already vertical 4K, so just scale it.
- **Transitions:** hard cuts only. No dissolves, whips or zoom transitions.
- **Audio:** Sean's VO is continuous throughout. B-roll is muted. Optional low event ambience (−30 dB under VO) on shots 7–8 only, for texture. If a music bed is added, keep it sparse and sit it ~−24 LUFS under the voice. Nothing motivational.
- **Grade:** keep the A-roll's lavender room as-is. Bring B-roll to neutral-warm, matched for skin tone. Don't push B-roll toward lavender.
- **Deliver:** H.264 MP4, ~16–20 Mbps, AAC 48 kHz, −14 LUFS integrated.

---

## 8. Pre-flight check (run before sign-off)

- [ ] Sean on screen for "I've been there", the three questions, "You still make all of the decisions" and the final line
- [ ] No B-roll shorter than 2.6 s, no montage, no more than 3 consecutive B-roll shots
- [ ] No crop above 114 %, all crop changes on a pause
- [ ] Logo identical size and position in every frame, never touching Sean or subtitles
- [ ] Subtitles: US spelling, no animation, legible over the white shirt and every B-roll
- [ ] No end card, CTA, motion graphic, animated text, cut-out or background change
- [ ] Ends on Sean, eye contact, clean cut at 0:58.90 (prog)
