# EcomIQ Ad — Recipe & Variants

The canonical, render-verified template lives at
`video-projects/my-meta-ad/index.html` (4:5, 1080×1350). Start there. This file
captures the structure and the common variants so you don't re-derive them.

## Composition skeleton (4:5 default)
Layered top→bottom, each a `class="clip"` on its own `data-track-index`:
1. `#bg` — navy canvas + faint sky radial top (separates the logo).
2. `#bloom` — `--brand-gradient-2` blurred bloom, lower third, opacity ~0.38.
3. `#logo` — `ecomiq-logo-white.svg`, top-left, ~360px wide.
4. `#rule` — flame-orange accent bar that wipes in (scaleX 0→1).
5. `#stage` — eyebrow (tracked, blue-tint) → headline → subhead.
6. `#cta` — flame-orange pill, white text, glow shadow, "Get started →".

Headline signature:
```html
<div id="headline"><span class="rethink">Rethink</span><br />your strategy.</div>
```
```css
#headline { font-family: var(--font-sans); font-weight: 800; line-height: .98; letter-spacing: -.03em; }
#headline .rethink { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--brand-blue-tint); }
```

## Timeline shape (GSAP, paused, one per comp)
logo (y −24) → rule (scaleX) → eyebrow (y) → serif emphasis (x −30) → rest of
headline (y) → subhead (y) → CTA (back.out scale) → bloom fade (0s) → CTA
breathing pulse (yoyo). Pad to `data-duration` with `tl.to({}, {duration: N}, 0)`.

Easing defaults: `power3.out` for type entrances, `back.out(1.7)` for the CTA,
`sine.inOut` for the pulse. (Brand feel = confident, clean — not bouncy.)

## Variants

### Light version (for A/B)
- `#bg` → white/`--brand-sky`; swap `ecomiq-logo-navy.svg`.
- Text → navy; eyebrow → navy or a darker blue; keep flame CTA.
- Drop or lighten the bloom so it doesn't muddy white.

### 1:1 square (1080×1080)
- Tighten vertical rhythm: logo top, headline mid, CTA bottom — less gap.
- Same tokens, same type scale ~−10%.

### 9:16 story / Reels (1080×1920)
- More vertical room: logo top ~160px, headline centered band, CTA pinned ~220px from bottom (above the platform UI).
- Consider a subtle full-bleed product photo behind a navy scrim.

### Multi-scene (10–15s)
- Scene 1 (hook): the "Clear up confusion" line.
- Scene 2 (value): one product/benefit, big number or chart (see `/hyperframes-registry` `data-chart`).
- Scene 3 (CTA outro): logo + flame CTA, hold 3–4s.
- Whip/blur transitions between scenes (never hard cuts) — see `/hyperframes` transitions.

## Copy bank (on-brand)
Headlines: "*Rethink* your strategy." · "*Clarity* for every decision." ·
"*Clear up* the confusion." · "Gain *peace of mind*."
CTAs: "Get started →" · "See how it works" · "Book a demo".

## Checklist before delivery
- [ ] lint = 0 errors
- [ ] draft rendered, hero + 1 frame `Read` — both fonts resolved (serif italic visible)
- [ ] flame is the only hot accent; one emphasis word only
- [ ] nothing past the safe area
- [ ] `ffprobe` confirms duration + dimensions
- [ ] standard render shipped
