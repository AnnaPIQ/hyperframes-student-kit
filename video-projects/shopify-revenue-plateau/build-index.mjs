// Full-version generator for the Plateau ad — v2 "cut to camera" structure.
// Spine = one continuous talking-head take (no merges) + continuous VO.
// We CUT between Sean talking (full-frame face) and FULL-SCREEN graphic / emphasis
// cards on the key beats. No flat-line graphic. Bottom ~1/6 left clear for
// captions the user adds later. Voice-only.
import fs from "node:fs";

const ID = "shopify-revenue-plateau";

const FACE_DUR = 86.7;     // talking-head + VO length
const COMP     = process.env.TEST ? 4 : 90.5;     // CTA card holds ~4s past the VO
const CAP_PAD  = 250;      // reserved caption-safe strip at the bottom (px)

// ---- full-screen card windows (composition time == source time) ----
// A: "push harder / more X" overload
const A_IN = 5.7, A1 = 8.86, A2 = 9.62, A3 = 10.95, A4 = 12.5, A_OUT = 13.3;
// B: "a system problem"
const B_IN = 18.6, B_OUT = 20.8;
// C: friction checklist
const C_IN = 23.6, F1 = 26.89, F2 = 28.74, F3 = 30.69, F4 = 34.47, C_OUT = 37.0;
// D: symptom vs cause
const D_IN = 37.3, D_SYM = 38.1, D_CAUSE = 41.2, D_OUT = 43.0;
// E: hero — "not failure. information."
const E_IN = 49.6, E_INFO = 52.27, E_OUT = 53.6;
// F: Driftsleep proof
const PROOF_IN = 57.4, COUNT_START = 60.8, COUNT_END = 62.4, PROOF_OUT = 65.6;
// G: philosophy
const G_IN = 65.8, G2 = 68.5, G_OUT = 71.3;
// H: CTA card
const CTA_IN = 76.9;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1350" />
    <title>EcomIQ — Plateau (full v2)</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <link rel="stylesheet" href="assets/brand-tokens.css" />
    <style>
      @font-face { font-family: 'Rethink Sans'; font-style: normal; font-weight: 400 800;
        font-display: block; src: url(assets/fonts/RethinkSans.woff2) format('woff2'); }
      @font-face { font-family: 'Hedvig Letters Serif'; font-style: italic; font-weight: 400;
        font-display: block; src: url(assets/fonts/HedvigLettersSerif.woff2) format('woff2'); }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1350px; overflow: hidden;
        background: var(--brand-navy); font-family: 'Rethink Sans', system-ui, sans-serif; color: #fff; }
      :root { --red: #ff5a4d; --cap: ${CAP_PAD}px; }

      /* ---- talking head (base layer; full-screen cards cut over it) ---- */
      #video-wrap { position: absolute; inset: 0; transform-origin: 50% 38%; z-index: 0; }
      #video-wrap video { width: 100%; height: 100%; object-fit: cover; object-position: 50% 36%;
        filter: contrast(1.06) saturate(1.08) brightness(0.98); display: block; }

      /* ---- top scrim (keeps logo legible) + faint vignette ---- */
      #scrims { position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background: linear-gradient(180deg, rgba(6,40,76,0.78) 0%, rgba(6,40,76,0.0) 16%); }
      #vignette { position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background: radial-gradient(125% 92% at 50% 38%, rgba(6,40,76,0) 56%, rgba(6,40,76,0.45) 100%); }

      /* ---- logo chip (wrapped so the render engine keeps it top-left) ---- */
      #logo-wrap { position: absolute; top: 56px; left: 60px; width: 290px; z-index: 20; }
      #logo { width: 100%; height: auto; display: block;
        filter: drop-shadow(0 6px 18px rgba(0,0,0,0.45)); }

      /* ---- full-screen card shell (opaque; content sits ABOVE the caption strip) ---- */
      .card { position: absolute; inset: 0; z-index: 10; opacity: 0; overflow: hidden;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; padding: 120px 90px var(--cap);
        background:
          radial-gradient(120% 80% at 50% 34%, #0a325f 0%, var(--brand-navy) 62%),
          var(--brand-navy); }
      .card .eyebrow { font-weight: 700; font-size: 32px; letter-spacing: .26em; text-transform: uppercase;
        color: var(--brand-blue-tint); margin-bottom: 44px; }
      .big { font-weight: 800; letter-spacing: -.03em; line-height: .98; color: #fff;
        text-shadow: 0 12px 40px rgba(0,0,0,.45); }
      .flame { color: var(--brand-flame); }
      .dim { color: #b9c8dc; }

      /* card A — overload */
      #cardA .line { font-weight: 800; font-size: 104px; line-height: 1.04; letter-spacing: -.03em;
        color: #fff; opacity: 0; }
      #cardA .line .m { color: var(--brand-flame); }

      /* card B — system problem */
      #cardB .top { font-weight: 700; font-size: 46px; color: #b9c8dc; opacity: 0; margin-bottom: 18px; }
      #cardB .hero { font-weight: 800; font-size: 168px; line-height: .92; letter-spacing: -.04em;
        color: var(--brand-flame); opacity: 0; text-shadow: 0 16px 56px rgba(255,76,50,.4); }

      /* card C — friction checklist */
      #cardC .frow { display: flex; align-items: center; gap: 28px; margin: 18px 0; opacity: 0; }
      #cardC .frow .dot { width: 30px; height: 30px; border-radius: 50%; background: var(--red); flex: none;
        box-shadow: 0 0 18px rgba(255,90,77,.7); }
      #cardC .frow .txt { font-weight: 800; font-size: 72px; letter-spacing: -.02em; color: #fff; }

      /* card D — symptom / cause */
      #cardD .crow { display: flex; align-items: center; gap: 30px; margin: 22px 0; opacity: 0; }
      #cardD .crow .mk { font-weight: 800; font-size: 88px; line-height: 1; }
      #cardD .crow .txt { font-weight: 800; font-size: 84px; letter-spacing: -.03em; }
      #cardD #d-sym .mk { color: var(--red); } #cardD #d-sym .txt { color: #9fb1c8; }
      #cardD #d-cause .mk { color: var(--brand-flame); } #cardD #d-cause .txt { color: #fff; }
      #cardD #d-cause .txt .em { color: var(--brand-flame); }

      /* card E — hero line */
      #cardE .l1 { font-weight: 800; font-size: 100px; line-height: 1; letter-spacing: -.03em; color: #b9c8dc; opacity: 0; }
      #cardE .l2 { font-weight: 800; font-size: 120px; line-height: .92; letter-spacing: -.04em; white-space: nowrap;
        color: var(--brand-flame); opacity: 0; margin-top: 20px; text-shadow: 0 18px 60px rgba(255,76,50,.45); }

      /* card G — philosophy */
      #cardG .l1 { font-weight: 800; font-size: 84px; line-height: 1.02; letter-spacing: -.03em; color: #b9c8dc; opacity: 0; }
      #cardG .l2 { font-weight: 800; font-size: 120px; line-height: .96; letter-spacing: -.04em;
        color: var(--brand-flame); opacity: 0; margin-top: 22px; text-shadow: 0 16px 56px rgba(255,76,50,.4); }

      /* ---- card F : Driftsleep proof (full-screen b-roll) ---- */
      #proof { position: absolute; inset: 0; z-index: 10; opacity: 0; overflow: hidden; }
      #proof video { width: 100%; height: 100%; object-fit: cover; object-position: 50% 46%;
        filter: contrast(1.06) saturate(1.08); display: block; }
      #proof .pscrim { position: absolute; inset: 0; pointer-events: none;
        background:
          radial-gradient(110% 70% at 50% 42%, rgba(6,40,76,.2) 0%, rgba(6,40,76,.78) 100%),
          linear-gradient(0deg, rgba(6,40,76,.9) 0%, rgba(6,40,76,0) 42%); }
      #p-tag { position: absolute; top: 56px; left: 60px; font-weight: 700; font-size: 26px;
        letter-spacing: .14em; text-transform: uppercase; color: #fff;
        background: rgba(6,40,76,.78); padding: 12px 24px; border-radius: 999px;
        border: 1px solid rgba(156,212,255,.4); opacity: 0; }
      #p-tag b { color: var(--brand-blue-tint); }
      #p-eyebrow { position: absolute; top: 300px; left: 0; right: 0; text-align: center;
        font-weight: 700; font-size: 32px; letter-spacing: .22em; text-transform: uppercase;
        color: var(--brand-blue-tint); opacity: 0; }
      #p-stat { position: absolute; top: 470px; left: 0; right: 0; text-align: center;
        font-weight: 800; font-size: 320px; line-height: .82; color: var(--brand-flame);
        letter-spacing: -.05em; text-shadow: 0 18px 70px rgba(255,76,50,.5); opacity: 0; }
      #p-lab { position: absolute; top: 830px; left: 0; right: 0; text-align: center;
        font-weight: 800; font-size: 64px; letter-spacing: -.02em; color: #fff; opacity: 0; }
      #p-sub { position: absolute; top: 930px; left: 0; right: 0; text-align: center;
        font-weight: 700; font-size: 36px; color: var(--brand-blue-tint); opacity: 0; }

      /* ---- whip-streak transition ---- */
      #whip { position: absolute; top: 0; bottom: 0; left: 0; width: 70%; z-index: 31; opacity: 0;
        pointer-events: none; transform: translateX(-130%);
        background: linear-gradient(90deg, transparent 0%, rgba(156,212,255,.0) 30%, #ffffff 50%,
          rgba(255,76,50,.7) 66%, transparent 100%); filter: blur(26px); mix-blend-mode: screen; }

      /* ---- subtle grain across everything ---- */
      #grain { position: absolute; inset: 0; pointer-events: none; z-index: 30; opacity: .5;
        background-image:
          radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
          radial-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
          radial-gradient(rgba(0,0,0,.02) 1px, transparent 1px);
        background-size: 3px 3px, 5px 5px, 7px 7px;
        background-position: 0 0, 1px 2px, 2px 1px; }

      /* ---- card H : CTA (full-screen) ---- */
      #cta { position: absolute; inset: 0; z-index: 12; opacity: 0;
        background:
          radial-gradient(90% 55% at 50% 16%, rgba(156,212,255,.10) 0%, rgba(6,40,76,0) 55%),
          var(--brand-navy);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; padding: 0 104px var(--cap); }
      #cta #obloom { position: absolute; left: -10%; bottom: -20%; width: 120%; height: 58%;
        background: var(--brand-gradient-2); filter: blur(90px); opacity: .34; }
      #cta #ologo { position: absolute; top: 116px; left: 50%; transform: translateX(-50%); width: 360px; }
      #cta #oeyebrow { font-weight: 700; font-size: 28px; letter-spacing: .32em; text-transform: uppercase;
        color: var(--brand-blue-tint); margin-bottom: 28px; }
      #cta #ohead { font-weight: 800; font-size: 110px; line-height: .96; letter-spacing: -.03em; color: #fff; }
      #cta #ohead .em { font-family: 'Hedvig Letters Serif', serif; font-style: italic; font-weight: 400;
        color: var(--brand-blue-tint); }
      #cta #oguar { margin-top: 40px; font-weight: 700; font-size: 40px; color: #fff; }
      #cta #oguar .em { color: var(--brand-flame); }
      #cta #octa { margin-top: 50px; display: inline-flex; align-items: center; gap: 18px;
        font-weight: 700; font-size: 42px; color: #fff; background: var(--brand-flame);
        padding: 32px 62px; border-radius: 999px; box-shadow: 0 22px 70px -16px rgba(255,76,50,.65); }
      #cta #octa .arrow { font-size: 44px; line-height: 1; transform: translateY(-2px); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="${ID}" data-start="0" data-duration="${COMP}" data-width="1080" data-height="1350">

      <!-- continuous talking-head (muted; audio is the sibling track) -->
      <div id="video-wrap">
        <video id="vid" data-start="0" data-duration="${FACE_DUR}" data-track-index="0"
               src="assets/ad.mp4" muted playsinline></video>
      </div>
      <audio id="aud" data-start="0" data-duration="${FACE_DUR}" data-track-index="1"
             data-volume="1" src="assets/ad.mp4"></audio>

      <div id="scrims" class="clip" data-start="0" data-duration="${COMP}" data-track-index="2"></div>
      <div id="vignette" class="clip" data-start="0" data-duration="${COMP}" data-track-index="3"></div>
      <div id="logo-wrap"><img id="logo" class="clip" data-start="0" data-duration="${FACE_DUR}" data-track-index="5"
           src="assets/ecomiq-logo-white.svg" alt="EcomIQ" /></div>

      <!-- CARD A : overload -->
      <div id="cardA" class="card clip" data-start="${A_IN - 0.4}" data-duration="${A_OUT - A_IN + 1}" data-track-index="6">
        <div class="eyebrow">So you push harder</div>
        <div class="line" id="a1"><span class="m">More</span> ads</div>
        <div class="line" id="a2"><span class="m">More</span> products</div>
        <div class="line" id="a3"><span class="m">More</span> launches</div>
        <div class="line" id="a4"><span class="m">More</span> marketing</div>
      </div>

      <!-- CARD B : system problem -->
      <div id="cardB" class="card clip" data-start="${B_IN - 0.4}" data-duration="${B_OUT - B_IN + 1}" data-track-index="7">
        <div class="top">It's not an effort problem.</div>
        <div class="hero">A SYSTEM<br/>PROBLEM</div>
      </div>

      <!-- CARD C : friction checklist -->
      <div id="cardC" class="card clip" data-start="${C_IN - 0.4}" data-duration="${C_OUT - C_IN + 1}" data-track-index="8">
        <div class="eyebrow">Something's creating friction</div>
        <div class="frow" id="c1"><span class="dot"></span><span class="txt">Traffic has stalled</span></div>
        <div class="frow" id="c2"><span class="dot"></span><span class="txt">Conversion slipped</span></div>
        <div class="frow" id="c3"><span class="dot"></span><span class="txt">Customers aren't returning</span></div>
        <div class="frow" id="c4"><span class="dot"></span><span class="txt">Order value fell</span></div>
      </div>

      <!-- CARD D : symptom vs cause -->
      <div id="cardD" class="card clip" data-start="${D_IN - 0.4}" data-duration="${D_OUT - D_IN + 1}" data-track-index="9">
        <div class="crow" id="d-sym"><span class="mk">&#10007;</span><span class="txt">The symptom</span></div>
        <div class="crow" id="d-cause"><span class="mk">&#10003;</span><span class="txt">The <span class="em">cause</span></span></div>
      </div>

      <!-- CARD E : hero line -->
      <div id="cardE" class="card clip" data-start="${E_IN - 0.4}" data-duration="${E_OUT - E_IN + 1}" data-track-index="10">
        <div class="l1">Not failure.</div>
        <div class="l2">INFORMATION.</div>
      </div>

      <!-- CARD F : Driftsleep proof (full-screen b-roll) — static wrapper, GSAP-driven -->
      <div id="proof">
        <video id="proof-vid" data-start="${PROOF_IN}" data-duration="${PROOF_OUT - PROOF_IN + 0.4}" data-track-index="12"
               src="assets/driftsleep-stab.mp4" muted playsinline></video>
        <div class="pscrim"></div>
        <div id="p-tag">Client&nbsp;&middot;&nbsp;<b>Driftsleep</b></div>
        <div id="p-eyebrow">Real result</div>
        <div id="p-stat">+59<span style="font-size:170px;">%</span></div>
        <div id="p-lab">returning customers</div>
        <div id="p-sub">without spending another dollar on ads</div>
      </div>

      <!-- CARD G : philosophy -->
      <div id="cardG" class="card clip" data-start="${G_IN - 0.4}" data-duration="${G_OUT - G_IN + 1}" data-track-index="13">
        <div class="l1">Growth isn't doing more.</div>
        <div class="l2">Fix what's already there.</div>
      </div>

      <!-- whip-streak transition -->
      <div id="whip" class="clip" data-start="0" data-duration="${COMP}" data-track-index="15"></div>

      <!-- CARD H : CTA (full-screen) -->
      <div id="cta" class="clip" data-start="${CTA_IN - 0.6}" data-duration="${COMP - CTA_IN + 1}" data-track-index="14">
        <div id="obloom"></div>
        <img id="ologo" src="assets/ecomiq-logo-white.svg" alt="EcomIQ" />
        <div id="oeyebrow">Stuck for months?</div>
        <div id="ohead">Find your<br /><span class="em">bottleneck.</span></div>
        <div id="oguar">We <span class="em">guarantee</span> the breakthrough.</div>
        <div id="octa">Learn how it works <span class="arrow">&rarr;</span></div>
      </div>

      <!-- grain over everything -->
      <div id="grain" class="clip" data-start="0" data-duration="${COMP}" data-track-index="30"></div>
    </div>

    <script>
      const FACE_DUR = ${FACE_DUR}, COMP = ${COMP};
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      // gentle continuous push on the face
      tl.fromTo("#video-wrap", { scale: 1.0 }, { scale: 1.05, duration: FACE_DUR, ease: "none" }, 0);
      tl.from("#logo-wrap", { opacity: 0, y: -18, duration: .5, ease: "power3.out" }, .2);

      // whip-streak fired at each cut (face<->card)
      function whip(t) {
        tl.set("#whip", { opacity: 1 }, t);
        tl.fromTo("#whip", { xPercent: -130 }, { xPercent: 230, duration: .4, ease: "power3.in" }, t);
        tl.set("#whip", { opacity: 0 }, t + .4);
      }
      // card in (opaque cut over face) / out (back to face), each with a whip
      function cardIn(sel, t) {
        whip(t - .1);
        tl.fromTo(sel, { opacity: 0, scale: 1.08, filter: "blur(20px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: .42, ease: "power2.out" }, t);
      }
      function cardOut(sel, t) {
        whip(t - .05);
        tl.to(sel, { opacity: 0, scale: 1.06, filter: "blur(16px)", duration: .38, ease: "power2.in" }, t);
      }

      // ---------- CARD A : overload ----------
      cardIn("#cardA", ${A_IN});
      [["#a1", ${A1}], ["#a2", ${A2}], ["#a3", ${A3}], ["#a4", ${A4}]].forEach(([s, t]) =>
        tl.fromTo(s, { opacity: 0, y: 36, scale: .9 }, { opacity: 1, y: 0, scale: 1, duration: .34, ease: "back.out(2)" }, t));
      cardOut("#cardA", ${A_OUT});

      // ---------- CARD B : system problem ----------
      cardIn("#cardB", ${B_IN});
      tl.fromTo("#cardB .top", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .35, ease: "power2.out" }, ${B_IN} + .1);
      tl.fromTo("#cardB .hero", { opacity: 0, scale: .82 }, { opacity: 1, scale: 1, duration: .5, ease: "back.out(1.9)" }, ${B_IN} + .25);
      cardOut("#cardB", ${B_OUT});

      // ---------- CARD C : friction checklist ----------
      cardIn("#cardC", ${C_IN});
      [["#c1", ${F1}], ["#c2", ${F2}], ["#c3", ${F3}], ["#c4", ${F4}]].forEach(([s, t]) =>
        tl.fromTo(s, { opacity: 0, x: -44 }, { opacity: 1, x: 0, duration: .4, ease: "power3.out" }, t));
      cardOut("#cardC", ${C_OUT});

      // ---------- CARD D : symptom vs cause ----------
      cardIn("#cardD", ${D_IN});
      tl.fromTo("#d-sym", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: .4, ease: "power3.out" }, ${D_SYM});
      tl.fromTo("#d-cause", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: .4, ease: "power3.out" }, ${D_CAUSE});
      cardOut("#cardD", ${D_OUT});

      // ---------- CARD E : hero line ----------
      cardIn("#cardE", ${E_IN});
      tl.fromTo("#cardE .l1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${E_IN} + .1);
      tl.fromTo("#cardE .l2", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .5, ease: "back.out(2)" }, ${E_INFO});
      cardOut("#cardE", ${E_OUT});

      // ---------- CARD F : Driftsleep proof ----------
      // hide the EcomIQ chip during the full-screen client takeover (avoids tag collision)
      tl.to("#logo-wrap", { opacity: 0, duration: .25, ease: "power2.in" }, ${PROOF_IN} - .15);
      tl.to("#logo-wrap", { opacity: 1, duration: .3, ease: "power2.out" }, ${PROOF_OUT} + .05);
      whip(${PROOF_IN} - .12);
      tl.fromTo("#proof", { opacity: 0, scale: 1.1, filter: "blur(20px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: .5, ease: "power2.out" }, ${PROOF_IN});
      tl.to("#proof video", { scale: 1.06, duration: ${PROOF_OUT - PROOF_IN}, ease: "none", transformOrigin: "50% 46%" }, ${PROOF_IN});
      tl.fromTo("#p-tag", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${PROOF_IN} + .3);
      tl.fromTo("#p-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${COUNT_START} - .4);
      const ctr = { v: 0 };
      tl.set("#p-stat", { opacity: 1 }, ${COUNT_START});
      tl.fromTo("#p-stat", { scale: .7 }, { scale: 1, duration: .5, ease: "back.out(1.8)" }, ${COUNT_START});
      tl.to(ctr, { v: 59, duration: ${COUNT_END - COUNT_START}, ease: "power1.out",
        onUpdate: () => { document.querySelector("#p-stat").firstChild.nodeValue = "+" + Math.round(ctr.v); } }, ${COUNT_START});
      tl.fromTo("#p-lab", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${COUNT_END} - .1);
      tl.fromTo("#p-sub", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${COUNT_END} + .5);
      whip(${PROOF_OUT} - .12);
      tl.to("#proof", { opacity: 0, scale: 1.08, filter: "blur(16px)", duration: .42, ease: "power2.in" }, ${PROOF_OUT});

      // ---------- CARD G : philosophy ----------
      cardIn("#cardG", ${G_IN});
      tl.fromTo("#cardG .l1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .42, ease: "power2.out" }, ${G_IN} + .1);
      tl.fromTo("#cardG .l2", { opacity: 0, y: 24, scale: .92 }, { opacity: 1, y: 0, scale: 1, duration: .5, ease: "power3.out" }, ${G2});
      cardOut("#cardG", ${G_OUT});

      // ---------- CARD H : CTA ----------
      whip(${CTA_IN} - .1);
      tl.to("#logo-wrap", { opacity: 0, duration: .3 }, ${CTA_IN} - .1);
      tl.fromTo("#cta", { opacity: 0, scale: 1.06, filter: "blur(16px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: .5, ease: "power2.out" }, ${CTA_IN});
      tl.fromTo("#ologo", { opacity: 0, y: -16, xPercent: -50 }, { opacity: 1, y: 0, xPercent: -50, duration: .5, ease: "power3.out" }, ${CTA_IN} + .25);
      tl.from("#oeyebrow", { opacity: 0, y: 14, duration: .45, ease: "power2.out" }, ${CTA_IN} + .45);
      tl.from("#ohead .em", { opacity: 0, x: -24, duration: .55, ease: "power3.out" }, ${CTA_IN} + .6);
      tl.from("#ohead", { opacity: 0, y: 24, duration: .55, ease: "power3.out" }, ${CTA_IN} + .72);
      tl.from("#oguar", { opacity: 0, y: 16, duration: .5, ease: "power2.out" }, ${CTA_IN} + 1.0);
      tl.from("#octa", { opacity: 0, scale: .85, duration: .5, ease: "back.out(1.7)" }, ${CTA_IN} + 1.3);
      tl.to("#octa", { scale: 1.04, duration: .7, ease: "sine.inOut", yoyo: true, repeat: 4 }, ${CTA_IN} + 1.9);

      // Law 11 — fill the slot
      tl.to({}, { duration: COMP }, 0);
      window.__timelines["${ID}"] = tl;
    </script>
  </body>
</html>
`;

fs.writeFileSync(new URL("./index.html", import.meta.url), html);
console.log("wrote index.html", html.length, "bytes");
