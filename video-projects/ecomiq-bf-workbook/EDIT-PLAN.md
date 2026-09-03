# EcomIQ, Black Friday Profit Workbook ad · EDIT PLAN

**Status: awaiting approval. Nothing is rendered until this is signed off.**

Sean's A-roll is the spine, full audio, on screen as the base. Graphics land on
the beats, B-roll and product photos on the workbook beats, end card on "links
below". No captions. Persistent EcomIQ logo top-left.

---

## 1. Source facts (probed, not assumed)

| | |
|---|---|
| A-roll | `2b: Ad/social Black Friday … V2.mov` · ProRes 422 · **3840×2160 (16:9 landscape)** · 25 fps · 55.08 s · PCM 24-bit 48 kHz stereo |
| Speech | first word **3.10 s**, last word **53.29 s**, so **50.2 s of speech** (matches the "~50s" brief) |
| B-roll | 4 × PNG product renders (AI-generated mockups), white and high-key |
| Workbook | `The Black Friday Profit Plan Workbook.pdf`, **8 pages shared** (a sample of the 51-page book) |

**Prepped already, with real ffmpeg:**
- `assets/aroll-916.mp4`, 1080×1920, 30 fps CFR, H.264, silent
- `assets/aroll-1x1.mp4`, 1080×1080, 30 fps CFR, H.264, silent
- `assets/aroll-audio.m4a`, full 55.03 s AAC 192 k, the mixer's audio spine

### Two things to flag before we build

**(a) The A-roll needs a CROP, not scale+pad.** The source is 16:9 landscape and
both deliverables are taller than wide. Scale+pad would put Sean in a 1080×608
letterbox band with roughly 65% of a 9:16 frame empty. I centre-cropped instead:

- 9:16, `crop=1215×2160` at x=1312 (centred), scaled to 1080×1920
- 1:1, `crop=2160×2160` at x=840 (centred), scaled to 1080×1080

Sean sits at about 48% of frame width and holds that position for the whole take,
so a static centre crop keeps him properly framed with nothing clipped. Verified
on frames at 1 s, 4 s, 12 s, 33 s and 50 s. The cost of the crop is the blue-lit
studio edges, which carry no content. I think it is the right call, but it is a
crop, so I am calling it out.

**(b) The transcript timestamps run about 1.8 to 2.5 s early against the audio.**
Timing graphics to the transcript's numbers would land every beat roughly 2 s
before Sean says the words. I anchored to a silence and phrase map of the real
audio instead, which is the technique `docs/LESSONS.md` prescribes. Twelve phrase
segments, and they line up with the transcript's *content* cleanly:

```
S1  3.10– 6.34  hook                    S7   34.90–36.14  "and the maximum discount"
S2  6.90–14.99  the four costs          S8   36.58–39.91  "your margin can support"
S3 15.56–21.29  margin + breakeven      S9   40.63–45.36  offer/inventory/mktg/email
S4 21.83–28.16  sell more, make less    S10  46.14–47.38  "it's completely free"
S5 28.98–32.78  free workbook           S11  47.92–52.05  "links below…"
S6 33.05–34.76  what each order gives   S12  52.80–53.29  tail
```

All timings below are **final-cut timecode**, which is source minus **2.75 s**.
See the trim decision in §5.

---

## 2. The edit, beat by beat

Final duration **52.3 s**. `TC` is final cut. Logo top-left on every frame.

| TC | Sean says | On screen | Graphic |
|---|---|---|---|
| **0.35–3.59** | "A record Black Friday can still be an unprofitable one." | Sean full-frame | **Hook type.** `RECORD SALES` sets in white, then flame-orange `RECORD PROFIT?` stamps over it with "PROFIT?" struck through. Kinetic, 2 beats, no B-roll (see §6). |
| **4.15–12.24** | the four cost lines | Sean full-frame plus cost card, lower 45% | **COST STACK.** A `REVENUE $114.70` bar fills once, then four flame chips stack in and eat it. The contribution number counts *down* live as each one lands. |
| ↳ 4.15 | "…so do your discounts." | | chip 1 · **DISCOUNTS −$28.68** |
| ↳ 6.23 | "advertising costs through the roof" | | chip 2 · **ADVERTISING −$18.00** |
| ↳ 7.85 | "you've still got fulfillment fees" | | chip 3 · **FULFILMENT + DELIVERY −$13.10** |
| ↳ 9.00 | "more returns than a normal month" | | chip 4 · **RETURNS −$8.00** |
| **12.81–18.54** | "if you haven't worked out your contribution margin and break-even ROAS…" | Sean plus two-figure card | **TWO FIGURES** animate in side by side, `CONTRIBUTION MARGIN 52.1%` and `BREAK-EVEN ROAS 1.9×`. Count-up on both, flame underline sweeps in. |
| **19.08–22.96** | "you might sell more… but make far less money" | Sean plus contrast card | **CONTRAST.** `SALES ↑` (blue tint, arrow rises) beside `PROFIT ↓` (flame, arrow drops), split by a hairline rule. |
| **22.96–25.41** | "You can have nothing left." | Sean, the bar returns | **DRAIN.** The revenue bar from the cost stack comes back and the contribution segment drains to **$9.62**, visibly nothing. Bar pulses once on the landing. |
| **26.23–30.03** | "I've put together a free workbook…" | **B-roll: `workbook-hero.png`** | Workbook cover lifts in on navy with a soft floor shadow and a slow 3% push-in. Flame eyebrow `FREE WORKBOOK`. |
| **30.30–32.01** | "…what each order actually contributes" | **B-roll: `wb-page-08.png`**, the real contribution-margin page | **COUNT-UP** `$59.71` over the page, label `CONTRIBUTION PER ORDER`, with the actual worksheet behind it. |
| **32.15–37.16** | "…and the maximum discount your margin can actually support" | Sean plus dial card | **MAX DISCOUNT DIAL.** Arc sweeps to **25%**, number counts up, `MAX DISCOUNT YOUR MARGIN SUPPORTS` beneath. Figure lands at 34.4 on "maximum discount", arc completes by 36.6. |
| **37.88–42.61** | "your offer, your inventory, your marketing, your email follow-up plan" | Sean plus checklist card | **4-ITEM CHECKLIST** builds at 37.9, then ticks flame one at a time: |
| ↳ 40.09 | "your offer" | | ✓ OFFER |
| ↳ 40.72 | "your inventory" | | ✓ INVENTORY |
| ↳ 41.35 | "your marketing" | | ✓ MARKETING |
| ↳ 41.75 | "your email follow-up plan" | | ✓ EMAIL FOLLOW-UP |
| **43.39–44.63** | "It's completely free." | **B-roll: `toolkit-spread.png`** | Spread of the whole toolkit, and **FREE** slams in oversized flame over it. One beat, hard. |
| **45.17–52.33** | "Links below if you want to build your Black Friday plan before you lock in anything else." | **END CARD** | Full navy card, logo, headline, flame pill. Audio finishes at 50.5 and the card holds to **52.33**, a 7.2 s card with about 1.8 s of clean hold after the last word. |

### End card (wording to confirm)

- Logo: `ecomiq-logo-white.svg`
- Headline: **Get your free Black Friday workbook**, with *Black Friday* as the
  Hedvig italic-serif emphasis, the brand's signature move, exactly one per frame
- Pill: **Sign up free**, flame fill, pill radius, Rethink Sans bold, subtle
  pop-in (`back.out(1.7)`), then one slow breathe
- Under-pill line: `8 parts · 32 worksheets · 19 free tools`, straight off the cover

Both strings are the brief's proposed wording, flagged there as `[confirm]`. Say
the word and I will change them.

---

## 3. On-screen numbers, all from the workbook, nothing invented

Every figure traces to the workbook's own worked example on page 8, or is derived
from it. No performance claims, no fabricated results.

| On screen | Value | Where it comes from |
|---|---|---|
| Revenue bar | `$114.70` | Workbook p.8, cited as the 2025 Shopify BFCM average order value |
| Fulfilment + delivery | `−$13.10` | Workbook p.8 worked example, $4.50 fulfilment plus $8.60 delivery |
| Contribution margin | `52.1%` | Workbook p.8 worked example, verbatim |
| Contribution per order | `$59.71` | Workbook p.8 worked example, verbatim |
| Break-even ROAS | `1.9×` | Derived, 1 ÷ 0.521 = 1.92 |
| Discounts | `−$28.68` | Illustrative, 25% off the $114.70 AOV |
| Advertising | `−$18.00` | Illustrative round figure |
| Returns | `−$8.00` | Illustrative round figure |
| Drained contribution | `$9.62` | **Computed** from the stack: 114.70 − (34.00 product + 3.30 charges + 28.68 + 18.00 + 13.10 + 8.00) = 9.62 |
| Max discount | `25%` | Derived. Holding the workbook's "below roughly 35 percent leaves little room" floor gives a ceiling of about 29%, so 25% is the clean, conservative figure. |

The stack is internally consistent. The same $114.70 bar carries through the cost
stack, the drain and the per-order figure, so the arithmetic holds on screen.

**One thing for you to pick, the contrast beat at 19.08.** Three options:

1. **Arrows only**, no percentages. Safest, zero numeric claim. *My recommendation.*
2. `SALES ↑ +27%` and `PROFIT ↓ −84%`. The +27% is the workbook's cited 2025 BFCM
   *market* growth and −84% is derived from the on-screen cost model. Both are
   traceable, but they are different units of thing sitting side by side.
3. Carry the bar values, `$114.70 → $9.62`.

---

## 4. Layout

**9:16 (1080×1920).** Sean full-bleed as the base. Graphics ride in the lower
**40%** over a navy scrim gradient (transparent to `--brand-navy`), so type always
has contrast over his dark shirt and the mic. The two heaviest cards, cost stack
and checklist, extend to **48%**. His face stays fully clear throughout. The scrim
covers the hand and mic, which is the right trade.

**1:1 (1080×1080).** Same crop logic, graphics card from **56%**. Same content,
compacted: cost chips drop to two rows of two, type steps down about 18%, and the
checklist stays one column. Re-laid-out from the same tokens, not a squashed 9:16.

Logo: `ecomiq-logo-white.svg`, top-left, **9% width** (97 px on 1080), inside the
10% safe margin, in a positioned non-`clip` wrapper (`LESSONS.md` notes that
`clip` makes the logo drift), with a subtle drop shadow.

Type is Rethink Sans throughout at −2% tracking on anything large, with Hedvig
Letters Serif italic reserved for exactly one emphasis word per card. Flame orange
is the only hot accent. Local `.woff2` fonts and vendored GSAP, so there is no
render-time network dependency.

---

## 5. Decisions I need from you

**① The 3.1 s of dead air at the top.** The source opens with 3.1 s of silence
before Sean's first word, which is fatal for a paid social ad. My plan trims it to
a 0.35 s breath, shifting everything back 2.75 s for a **52.3 s** cut. Full speech
and the natural tail are untouched, so "use the full audio" still holds. The
alternative is to keep source timing exactly and open on 3 s of a silent man. I
recommend the trim.

**② Sean on camera vs pure voiceover.** The brief offered pure VO over B-roll.
**I recommend keeping Sean on screen as the base, as specced.** We have 4 static
product stills, which cannot carry 50 s. As VO-only this becomes a slideshow.

**③ Music bed.** I will wire a commented-out `<audio>` with the duck values ready:
bed at `data-volume="0.18"`, dipping to `0.08` under speech and up to `0.30` on the
end card. Nothing is fabricated. Drop a file at `assets/music-bed.m4a`, uncomment,
re-render. Say if you would rather I generate a placeholder tone instead.

**④ End-card wording**, the two `[confirm]` strings in §2.

**⑤ The contrast-beat numbers**, the three options in §3.

---

## 6. Gaps and honest notes

- **No Black Friday retail B-roll exists in the folder.** The beat map wanted
  "Black Friday sale B-roll" on the 00:03 hook, but the folder holds only workbook
  and toolkit product renders. So the hook is Sean plus kinetic type instead. If
  you want retail footage there, point me at it and I will cut it in.
- **The B-roll PNGs are AI-generated mockups with garbled microtext.** `broll-1`
  is the worst of them ("Delivery Coe Coot Sheet", "Pash Cycle Calculator"), so it
  is **not used**. `toolkit-spread.png` (broll-4) and `workbook-hero.png` (broll-2)
  are clean where it counts. I am keeping them at medium scale with no tight crops
  on small text.
- **Only 8 of 51 workbook pages were shared**, so real-page shots come from that
  sample. Page 8 is ideal, since it *is* the contribution-margin worked example.
- **Lip sync.** `LESSONS.md` warns of a roughly 0.16 s offset on talking heads. I
  will check it on the draft and nudge the video against the audio if it reads soft.
- Delivery is H.264 High / yuv420p plus AAC, `+faststart`, 30 fps, both ratios.

---

## 7. Build order once approved

1. `index.html` (9:16) and `square.html` (1:1), one project, rendered via `-c`
2. `npx hyperframes lint`, 0 errors
3. Draft render 9:16, then frame-grab **every beat above** and `Read` each PNG
4. Fix, then draft 1:1 and verify the same way
5. `--quality standard` on both, to `renders/ecomiq-bf-workbook-916.mp4` and `-1x1.mp4`
6. Commit composition and prep script to `claude/ecomiq-black-friday-ad-hxizip`
