#!/usr/bin/env python3
"""
build-compositions.py — generate the EcomIQ CRO short composition for each ratio.

    python3 scripts/build-compositions.py --ratio 4x5

A Hyperframes project must have exactly ONE root composition: the runtime
discovers every root-level HTML file carrying a data-composition-id as an entry
point, and a second one causes duplicate, layered audio playback. So each ratio is
written to index.html in turn and rendered before the next is generated. That is
what scripts/render-all.sh does. The committed index.html is the 9:16 cut.

meta.json is rewritten to match, so the project metadata never disagrees with the
composition actually on disk.

Timing is fixed by Sean's VO and the approved EDIT-PLAN.md:
  0.0000 -> 15.4333   montage cutdown (11 shots, hard cuts + 3 act dissolves)
 14.9600 -> 15.3633   cross-dissolve to the end card, resolving on the word "Stop"
 15.3633 -> 21.6000   end card holds under the rest of the VO
"""
import argparse, json
from pathlib import Path

PROJECT = Path(__file__).resolve().parent.parent

TOTAL      = 21.600     # full VO
MONTAGE    = 15.433333  # 463 frames @30
CARD_IN    = 14.960     # cross-dissolve starts
CARD_FULL  = 15.363333  # card fully opaque, onset of "Stop"
LOGO_IN    = 0.400
LOGO_OUT   = 14.700
GUARANTEE  = 17.750     # Sean says "Guaranteed"; the card word pulses with it

RATIOS = {
    "9x16": dict(w=1080, h=1920, comp="ecomiq-cro-short",
                 logo_w=300, pad=72,
                 card_logo=440, head=64, em=72, card_btn=44, card_gap=58, lift=0.0),
    "4x5":  dict(w=1080, h=1350, comp="ecomiq-cro-4x5",
                 logo_w=280, pad=64,
                 card_logo=400, head=56, em=63, card_btn=40, card_gap=48, lift=0.0),
    "1x1":  dict(w=1080, h=1080, comp="ecomiq-cro-1x1",
                 logo_w=260, pad=60,
                 card_logo=360, head=48, em=54, card_btn=36, card_gap=38, lift=0.0),
}

TEMPLATE = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width={w}, height={h}" />
    <title>EcomIQ CRO short — {ratio}</title>
    <!-- GSAP vendored locally: a CDN script cert-fails in the render env and freezes renders -->
    <script src="assets/vendor/gsap.min.js"></script>
    <link rel="stylesheet" href="assets/brand-tokens.css" />
    <style>
      /* LOCAL fonts, no network at render time. Families are named literally
         (not via var()) so the linter resolves them. */
      @font-face {{ font-family: 'Rethink Sans'; font-style: normal; font-weight: 400 800;
        font-display: block; src: url(assets/fonts/RethinkSans.woff2) format('woff2'); }}
      @font-face {{ font-family: 'Hedvig Letters Serif'; font-style: normal; font-weight: 400;
        font-display: block; src: url(assets/fonts/HedvigLettersSerif.woff2) format('woff2'); }}

      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{
        width: {w}px; height: {h}px; overflow: hidden;
        background: var(--brand-navy);
        font-family: 'Rethink Sans', system-ui, sans-serif;
        color: var(--brand-white);
      }}

      /* Navy safety net so no frame can ever land on black. */
      #bg {{ position: absolute; inset: 0; background: var(--brand-navy); }}

      /* Video lives in a plain positioned wrapper and is never animated
         (render contract rule 9: animating a <video> freezes frames). */
      #video-wrap {{ position: absolute; inset: 0; overflow: hidden; }}
      #montage {{ width: 100%; height: 100%; object-fit: cover; display: block; }}

      /* Vignette sits over the footage only, to seat the logo and the progress rule. */
      #vignette {{
        position: absolute; inset: 0; pointer-events: none;
        background: radial-gradient(ellipse 78% 62% at 50% 46%,
          rgba(0,0,0,0) 40%, rgba(2,14,28,0.30) 74%, rgba(2,14,28,0.62) 100%);
      }}

      /* Deterministic CSS film grain: three offset dot tiles, no PNG, no randomness. */
      #grain {{
        position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
        background-image:
          radial-gradient(rgba(255,255,255,.030) 0.5px, transparent 0.5px),
          radial-gradient(rgba(255,255,255,.020) 0.5px, transparent 0.5px),
          radial-gradient(rgba(0,0,0,.015) 0.5px, transparent 0.5px);
        background-size: 3px 3px, 5px 5px, 7px 7px;
        background-position: 0 0, 1px 2px, 2px 1px;
      }}

      /* Persistent white lockup, top-left. Wrapped in a positioned non-clip div so
         the render engine cannot reposition it (docs/LESSONS.md). */
      #logo-wrap {{ position: absolute; top: {pad}px; left: {pad}px; }}
      #logo {{ width: {logo_w}px; height: auto; display: block; opacity: 0;
        filter: drop-shadow(0 4px 18px rgba(2,14,28,.55)); }}

      /* Flame progress rule: fills across the montage, callback to the CTA colour. */
      #progress-track {{
        position: absolute; left: 0; right: 0; bottom: 0; height: 7px;
        background: rgba(255,255,255,.14);
      }}
      #progress {{
        position: absolute; inset: 0; transform-origin: left center; transform: scaleX(0);
        background: linear-gradient(90deg, var(--brand-flame) 0%, #FF8A4C 100%);
        box-shadow: 0 0 22px rgba(255,76,50,.75);
      }}

      /* Light-streak whip that masks the cut into the end card. */
      #streak {{
        position: absolute; top: 0; bottom: 0; width: 46%; opacity: 0;
        pointer-events: none; filter: blur(22px);
        background: linear-gradient(100deg, rgba(255,76,50,0) 0%,
          rgba(255,138,76,.55) 42%, rgba(255,255,255,.92) 55%,
          rgba(255,138,76,.55) 68%, rgba(255,76,50,0) 100%);
      }}

      /* ---- End card ---------------------------------------------------- */
      #card {{ position: absolute; inset: 0; opacity: 0; overflow: hidden; }}
      #card-bg {{
        position: absolute; inset: 0;
        background:
          radial-gradient(72% 50% at 50% 30%, rgba(156,212,255,.13) 0%, rgba(6,40,76,0) 62%),
          var(--brand-navy);
      }}
      #card-stage {{
        position: absolute; inset: 0; display: flex; flex-direction: column;
        align-items: center; justify-content: center; gap: {card_gap}px;
        padding: 9%; text-align: center; transform: translateY(-{lift_px}px);
      }}
      #card-logo {{ width: {card_logo}px; height: auto; opacity: 0; display: block; }}

      /* Headline. Brand rule: bold Rethink Sans, ~1.0 leading, -2% tracking, with
         exactly ONE italic-serif emphasis word ("Guaranteed"). */
      #card-copy {{ display: flex; flex-direction: column; align-items: center;
        gap: {copy_gap}px; }}
      #card-copy .hl {{
        font-weight: 800; font-size: {head}px; line-height: 1.0;
        letter-spacing: -0.02em; color: var(--brand-white); opacity: 0;
      }}
      #card-em {{
        font-family: 'Hedvig Letters Serif', Georgia, serif;
        font-style: italic; font-weight: 400;
        font-size: {em}px; line-height: 1.0; letter-spacing: -0.01em;
        color: var(--brand-blue-tint); opacity: 0;
        margin-top: {em_gap}px;
      }}

      #card-cta-wrap {{ position: relative; display: flex; justify-content: center; }}
      /* Flame bloom behind the button, echoing the reel's light-streak reveal. */
      #card-bloom {{
        position: absolute; left: 50%; top: 50%; width: 150%; height: 240%;
        transform: translate(-50%, -50%) scaleX(0.2); opacity: 0;
        background: radial-gradient(closest-side, rgba(255,76,50,.75) 0%, rgba(255,76,50,0) 100%);
        filter: blur(34px); pointer-events: none;
      }}
      #card-btn {{
        position: relative; opacity: 0;
        font-weight: 700; font-size: {card_btn}px; letter-spacing: -.01em;
        color: var(--brand-white); background: var(--brand-flame);
        padding: {btn_pad_v}px {btn_pad_h}px; border-radius: 999px;
        box-shadow: 0 22px 62px -14px rgba(255,76,50,.7);
        display: inline-flex; align-items: center; white-space: nowrap;
      }}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="{comp}" data-start="0" data-duration="{total}"
         data-width="{w}" data-height="{h}">

      <div id="bg"></div>

      <div id="video-wrap">
        <!-- No class="clip" on <video> — it breaks playback (render contract rule 2).
             Audio is a sibling <audio>; the montage's own audio was dropped at prep. -->
        <video id="montage" src="assets/montage-cutdown-{ratio}.mp4"
               data-start="0" data-duration="{montage}" data-track-index="0"
               muted playsinline></video>
      </div>

      <div id="vignette"></div>

      <div id="logo-wrap">
        <img id="logo" src="assets/ecomiq-logo-white.png" alt="EcomIQ" />
      </div>

      <div id="progress-track"><div id="progress"></div></div>

      <div id="streak"></div>

      <div id="card">
        <div id="card-bg"></div>
        <div id="card-stage">
          <img id="card-logo" src="assets/ecomiq-logo-white.svg" alt="EcomIQ" />
          <!-- Each line is its own block rather than a <br>, so the break never
               depends on rendered font width. -->
          <div id="card-copy">
            <div class="hl" id="hl1">Stop losing sales</div>
            <div class="hl" id="hl2">you&rsquo;ve already paid for</div>
            <div id="card-em">Guaranteed</div>
          </div>
          <div id="card-cta-wrap">
            <div id="card-bloom"></div>
            <div id="card-btn">Link Below</div>
          </div>
        </div>
      </div>

      <div id="grain"></div>

      <!-- Sean's voiceover is the spine of the edit and runs the full duration. -->
      <audio id="vo" src="assets/sean-vo.m4a"
             data-start="0" data-duration="{total}" data-track-index="1"
             data-volume="1"></audio>
    </div>

    <script>
      window.__timelines = window.__timelines || {{}};
      const tl = gsap.timeline({{ paused: true }});

      // --- Montage phase -------------------------------------------------
      // Logo enters top-left and holds through the footage.
      tl.fromTo("#logo", {{ opacity: 0, y: -18 }},
        {{ opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }}, {logo_in});

      // Flame rule fills across the montage. Linear: it is a progress read, not a flourish.
      tl.fromTo("#progress", {{ scaleX: 0 }},
        {{ scaleX: 1, duration: {montage}, ease: "none" }}, 0);

      // Vignette breathes so the "still" frames never sit dead.
      tl.fromTo("#vignette", {{ opacity: 0.82 }},
        {{ opacity: 1, duration: 3.858333, ease: "sine.inOut", yoyo: true, repeat: 3 }}, 0);

      // Logo clears before the card takes over.
      tl.to("#logo", {{ opacity: 0, y: -14, duration: 0.26, ease: "power2.in" }}, {logo_out});

      // --- Transition to the end card ------------------------------------
      // Light streak whips across to mask the cut, peaking inside the dissolve.
      tl.fromTo("#streak", {{ xPercent: -160, opacity: 0 }},
        {{ xPercent: 40, opacity: 1, duration: 0.2, ease: "power2.in" }}, {card_in});
      tl.to("#streak", {{ xPercent: 260, opacity: 0, duration: 0.26, ease: "power2.out" }},
        {card_in} + 0.2);

      // The cross-dissolve resolves exactly on the word "Stop".
      tl.fromTo("#card", {{ opacity: 0 }},
        {{ opacity: 1, duration: {card_dur}, ease: "power2.inOut" }}, {card_in});
      // Progress rule completes and retires into the card.
      tl.to("#progress-track", {{ opacity: 0, duration: 0.3, ease: "power2.out" }}, {montage});

      // --- End card ------------------------------------------------------
      // Lockup, then the headline lands line by line as he reads it.
      tl.fromTo("#card-logo", {{ opacity: 0, scale: 0.93, y: 14 }},
        {{ opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.2)" }}, {card_full});
      tl.fromTo("#hl1", {{ opacity: 0, y: 26 }},
        {{ opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }}, {hl1_at});
      tl.fromTo("#hl2", {{ opacity: 0, y: 26 }},
        {{ opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }}, {hl2_at});
      tl.fromTo("#card-em", {{ opacity: 0, y: 18, scale: 0.94 }},
        {{ opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }}, {em_at});

      tl.fromTo("#card-bloom", {{ opacity: 0, scaleX: 0.2 }},
        {{ opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out" }}, {btn_at} - 0.12);
      tl.fromTo("#card-btn", {{ opacity: 0, scale: 0.86 }},
        {{ opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }}, {btn_at});

      // "Guaranteed" punches as Sean says the word, leading the audio by 0.2s.
      tl.to("#card-em", {{ scale: 1.07, textShadow: "0 0 34px rgba(156,212,255,.75)",
        duration: 0.266667, ease: "power2.out" }}, {punch_at});
      tl.to("#card-em", {{ scale: 1, textShadow: "0 0 0px rgba(156,212,255,0)",
        duration: 0.5, ease: "power2.inOut" }}, {release_at});

      // Camera never sleeps: the CTA breathes under the rest of the VO.
      tl.to("#card-bloom", {{ opacity: 0.55, duration: 0.65, ease: "sine.inOut",
        yoyo: true, repeat: {breathe_repeat} }}, {breathe_at});
      tl.to("#card-btn", {{ scale: 1.035, duration: 0.65, ease: "sine.inOut",
        yoyo: true, repeat: {breathe_repeat} }}, {breathe_at});

      // Law #11 duration anchor — keeps the composition alive for its whole slot.
      tl.to({{}}, {{ duration: {total} }}, 0);
      window.__timelines["{comp}"] = tl;
    </script>
  </body>
</html>
"""


def build(ratio, cfg):
    hl1_at = round(CARD_FULL + 0.26, 6)
    hl2_at = round(CARD_FULL + 0.42, 6)
    em_at = round(CARD_FULL + 0.64, 6)
    btn_at = round(CARD_FULL + 0.98, 6)
    breathe_at = round(btn_at + 0.55, 6)
    breathe_repeat = max(1, int((TOTAL - breathe_at) / 0.65) - 1)

    html = TEMPLATE.format(
        ratio=ratio, w=cfg["w"], h=cfg["h"], comp=cfg["comp"],
        pad=cfg["pad"], logo_w=cfg["logo_w"], card_logo=cfg["card_logo"],
        head=cfg["head"], em=cfg["em"], card_btn=cfg["card_btn"],
        card_gap=cfg["card_gap"],
        copy_gap=int(cfg["head"] * 0.18), em_gap=int(cfg["head"] * 0.30),
        lift_px=int(cfg["h"] * cfg["lift"]),
        btn_pad_v=int(cfg["card_btn"] * 0.72), btn_pad_h=int(cfg["card_btn"] * 1.5),
        total=f"{TOTAL:.4f}", montage=f"{MONTAGE:.6f}",
        card_in=f"{CARD_IN:.4f}", card_full=f"{CARD_FULL:.6f}",
        card_dur=f"{CARD_FULL - CARD_IN:.6f}",
        logo_in=f"{LOGO_IN:.4f}", logo_out=f"{LOGO_OUT:.4f}",
        hl1_at=f"{hl1_at:.4f}", hl2_at=f"{hl2_at:.4f}", em_at=f"{em_at:.4f}",
        btn_at=f"{btn_at:.4f}", breathe_at=f"{breathe_at:.4f}",
        breathe_repeat=breathe_repeat,
        punch_at=f"{GUARANTEE - 0.183333:.6f}",   # leads the spoken word by ~0.2s
        release_at=f"{GUARANTEE + 0.116667:.6f}", # frame-aligned, no tween overlap
    )
    (PROJECT / "index.html").write_text(html)

    meta = json.loads((PROJECT / "meta.json").read_text())
    meta["width"], meta["height"] = cfg["w"], cfg["h"]
    (PROJECT / "meta.json").write_text(json.dumps(meta, indent=2) + "\n")

    print(f"  index.html <- {ratio} ({cfg['w']}x{cfg['h']}), comp id {cfg['comp']}, "
          f"btn {btn_at:.2f}s, breathe repeat={breathe_repeat}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--ratio", choices=list(RATIOS), default="9x16")
    a = ap.parse_args()
    print(f"total {TOTAL}s · montage {MONTAGE:.4f}s · card {CARD_IN} -> {CARD_FULL:.4f}")
    build(a.ratio, RATIOS[a.ratio])
