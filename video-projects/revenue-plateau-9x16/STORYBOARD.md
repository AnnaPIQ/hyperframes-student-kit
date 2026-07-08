# Revenue Plateau — Storyboard

Single continuous composition (`index.html`). One founder video (0–67s) + one master
GSAP timeline driving all overlays. Captions + MG overlays are `class="clip"` children of
the root on high `data-track-index` values. Persistent layers: logo (top-left), bottom
scrim, thin flame progress bar (very bottom edge).

**Timing table** (speech boundaries from `silencedetect`):

| Beat | Time | VO anchor | On-screen graphic | Mode |
|---|---|---|---|---|
| 0 · Persistent | 0–67 | — | logo top-left, flame progress bar bottom edge | — |
| 1 · Hook | 0.3–8 | "revenue hasn't moved in months…" | **flat revenue line** draws in lower-third, sits dead flat; "MONTHS" ticks | face-forward |
| 2 · The "do more" trap | 8–16 | "assume they need to do more… ads, emails, products, marketing" | 4 flame-outline chips pop in + pile (ADS · EMAILS · PRODUCTS · MARKETING); flat line **stays flat** behind them | face-forward |
| 3 · It's a system | 16–23.7 | "revenue isn't one lever — it's a system" | "ONE LEVER" struck through → the word **SYSTEM** scales in (blue-tint) | MG-forward |
| 4 · The 4 levers | 23.7–30 | "Traffic, conversion, AOV, retention…" | 4 connected lever/bars label in one-by-one: TRAFFIC·CONVERSION·AOV·RETENTION (blue-tint), linked by a spine | MG-forward |
| 5 · One breaks | 30–34 | "when one of those breaks, throwing effort at the rest rarely fixes it" | one lever snaps **flame-red** + dims; the others gray; spine cracks | MG-forward |
| 6 · Same number | 34–46 | "work harder… same revenue number month after month" | flat-line **callback** returns; a revenue figure repeats/stamps "MONTH AFTER MONTH" | face-forward |
| 7 · Holding you back | 46–54 | "the plateau… something inside is holding growth back" | a constriction/bottleneck motif chokes an upward arrow | MG-forward |
| 8 · Proof | 54–57 | "we've helped hundreds of Shopify brands…" | stat pop: **100s** of Shopify brands · "found the bottleneck" | face-forward |
| 9 · Breakthrough → CTA | 57–67 | "if your revenue's been stuck… click the link below" | flat line **breaks upward** (payoff), whips into the full **CTA card**: logo · eyebrow · "Break the *plateau*." · subhead · flame pill "Learn how we help →". Hold ~6s. | MG-forward → card |

## Beat detail

**Beat 1 — Hook (0.3–8, face-forward).** Bottom scrim fades up (0.3s). A single blue-tint
line draws left→right across the lower third (`power2.out`, 1.2s) then flatlines — a small
"$" axis label + a dim baseline grid. Caption: "If your Shopify brand's revenue" → "hasn't
moved in months —". Ambient: line has a faint breathing glow (`sine.inOut`). *Motion:* draw-on
stroke; *ease:* power2.out.

**Beat 2 — Do-more trap (8–16, face-forward).** As he lists, 4 chips (flame 1px outline,
navy fill, Rethink 600) pop in staggered (`back.out(1.6)`, 0.35s each): ADS · EMAILS ·
PRODUCTS · MARKETING, stacking around the flat line. The line pointedly **does not move**.
Caption tracks the list. *4 elements = his own rule-of-four.*

**Beat 3 — System (16–23.7, MG-forward).** Full dim-scrim drops (`power2.inOut`, 0.5s).
"ONE LEVER" appears with a flame strike-through, then the word **SYSTEM** scales up big
(blue-tint chrome, `expo.out`). Holds on the 1.23s VO pause after "system" — the reveal beat.

**Beat 4 — 4 levers (23.7–30, MG-forward).** A horizontal spine with 4 vertical lever
markers. Labels write in one at a time synced to the list: TRAFFIC → CONVERSION → AOV →
RETENTION (blue-tint). Each lever bar rises (`power3.out`, stagger). Eyebrow above: "REVENUE
IS A SYSTEM".

**Beat 5 — One breaks (30–34, MG-forward).** Lever #2 (CONVERSION, or whichever reads best)
snaps to **flame**, drops, and cracks the spine; the other three desaturate. Caption:
"throwing effort at the others" → "rarely fixes the problem." *Callback color:* flame = the
thing that needs attention.

**Beat 6 — Same number (34–46, face-forward).** Return to face. The **flat line callback**
slides back in; a revenue number (e.g. `$48,200`) stamps in and a "MONTH AFTER MONTH" chip
repeats 3× (staggered, `steps`-ish). Reinforces the trap. Caption: "…the same revenue
number" (blue-tint on "revenue number") → "month after month."

**Beat 7 — Holding you back (46–54, MG-forward).** An upward-arrow gets pinched by a
bottleneck shape (two converging forms). Caption: "The plateau isn't because you stopped
trying." → "Something inside is holding growth back." ("holding growth back" in flame.)

**Beat 8 — Proof (54–57, face-forward).** Quick confidence beat: **"100s"** counter +
"Shopify brands" + "bottleneck found" tag pops. Short, punchy.

**Beat 9 — Breakthrough + CTA (57–67, MG-forward → card).** The bottleneck releases, the
flat line **breaks sharply upward** (`expo.out`) — the emotional payoff. That upward motion
whip-transitions (blur + rise) into the full CTA card:
- logo top · eyebrow `FOR SHOPIFY BRANDS`
- headline **Break the _plateau_.** (Hedvig italic on "plateau", blue-tint)
- subhead "We find the bottleneck holding your store back — and the plan to grow past it."
- flame pill **Learn how we help →** (enters `back.out(1.7)`, then a gentle breathing pulse)
Hold to 67s over the closing VO (~6s CTA hold — the outro breathing room).

## Discipline check
- ≤5 hues, flame is the only hot accent, one serif-italic emphasis word ("plateau").
- Callback: flat line appears 3× (hook / "same number" / breakthrough).
- No hard cuts — scrim fades + a blur-rise whip into the card.
- Every timed overlay animates IN; the CTA card is the only place elements settle & hold.
- Master timeline padded with `tl.to({}, {duration: 67}, 0)` (Law 11).
