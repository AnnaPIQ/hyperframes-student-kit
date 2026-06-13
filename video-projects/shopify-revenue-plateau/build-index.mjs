// Full-version generator for the Plateau ad.
// Spine = one continuous talking-head take (no merges). Motion-graphics overlays
// annotate each beat; two full-screen takeovers (Driftsleep proof + CTA card).
// Voice-only. Recurring motif: a revenue line that starts flat and kicks into growth.
import fs from "node:fs";

const ID = "shopify-revenue-plateau";

// ---- continuous-take beat markers (composition time == source time) ----
const FACE_DUR = 86.7;     // talking-head + VO length
const COMP     = 90.5;     // CTA card holds ~4s past the VO

// chips (beat 2)
const C1 = 8.9, C2 = 9.97, C3 = 11.35, C4 = 12.8, CHIPS_OUT = 13.3;
// effort -> system (beat 3)
const EFFORT_T = 16.3, STRIKE_T = 18.0, SYSTEM_T = 19.05, SYS_OUT = 23.3;
// friction checklist (beat 4)
const F1 = 26.89, F2 = 28.74, F3 = 30.69, F4 = 34.47, FRICTION_OUT = 37.0;
// symptom vs cause (beat 5)
const SYMPTOM_T = 40.2, CAUSE_T = 42.3, SAME_T = 47.2, CAUSE_OUT = 49.4;
// hero line (beat 6) — graph callback
const GRAPH_BACK = 49.5, INFO_T = 52.27, NEXT_T = 53.8, GRAPH_OUT = 57.2;
// proof full-screen (beat 7)
const PROOF_IN = 57.5, COUNT_START = 60.8, COUNT_END = 62.4, PROOF_OUT = 65.6;
// philosophy (beat 8)
const PHIL1 = 65.9, PHIL2 = 68.5, PHIL_OUT = 71.2;
// cta setup + card (beats 9-10)
const BLOOM_IN = 71.4, CTA_IN = 76.9;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1350" />
    <title>EcomIQ — Plateau (full)</title>
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
      :root { --red: #ff5a4d; }

      /* ---- talking head (full-bleed cover crop) ---- */
      #video-wrap { position: absolute; inset: 0; transform-origin: 50% 40%; z-index: 0; }
      #video-wrap video { width: 100%; height: 100%; object-fit: cover; object-position: 50% 36%;
        filter: contrast(1.06) saturate(1.08) brightness(0.98); display: block; }

      /* ---- brand scrims + texture ---- */
      #scrims { position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background:
          linear-gradient(180deg, rgba(6,40,76,0.82) 0%, rgba(6,40,76,0.0) 18%),
          linear-gradient(0deg, rgba(6,40,76,0.92) 0%, rgba(6,40,76,0.30) 26%, rgba(6,40,76,0.0) 46%); }
      #vignette { position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background: radial-gradient(125% 92% at 50% 40%, rgba(6,40,76,0) 54%, rgba(6,40,76,0.5) 100%); }
      #grain { position: absolute; inset: 0; pointer-events: none; z-index: 2; opacity: .5;
        background-image:
          radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
          radial-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
          radial-gradient(rgba(0,0,0,.02) 1px, transparent 1px);
        background-size: 3px 3px, 5px 5px, 7px 7px;
        background-position: 0 0, 1px 2px, 2px 1px; }

      /* ---- logo chip ---- */
      #logo { position: absolute; top: 56px; left: 60px; width: 300px; height: auto; z-index: 9;
        filter: drop-shadow(0 6px 18px rgba(0,0,0,0.45)); }

      /* ---- shared overlay primitives ---- */
      .band { position: absolute; left: 84px; right: 84px; bottom: 96px; z-index: 6; }
      .eyebrow { font-weight: 700; font-size: 28px; letter-spacing: .22em; text-transform: uppercase;
        color: var(--brand-blue-tint); }
      .pop { font-weight: 800; letter-spacing: -.02em; color: #fff;
        text-shadow: 0 8px 26px rgba(0,0,0,.55); }
      .flame { color: var(--brand-flame); }

      /* ---- beat 1/6 revenue graph ---- */
      #beat-graph { height: 320px; opacity: 0; }
      #beat-graph .lbl { position: absolute; top: 0; left: 4px; }
      #g-info { position: absolute; top: -6px; right: 8px; font-weight: 800; font-size: 46px;
        color: var(--brand-flame); opacity: 0; text-shadow: 0 6px 22px rgba(255,76,50,.45); }
      #beat-graph svg { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 250px; overflow: visible; }
      #g-flat { stroke: var(--brand-blue-tint); }
      #g-grow { stroke: var(--brand-flame); filter: drop-shadow(0 6px 16px rgba(255,76,50,.5)); }

      /* ---- beat 2 chips ---- */
      #beat-chips { position: absolute; inset: 0; z-index: 6; }
      .chip { position: absolute; padding: 18px 34px; border-radius: 999px;
        background: rgba(6,40,76,.84); border: 2px solid var(--brand-flame); color: #fff;
        font-weight: 800; font-size: 44px; white-space: nowrap; opacity: 0;
        box-shadow: 0 16px 44px rgba(0,0,0,.55); }

      /* ---- beat 3 effort/system ---- */
      #beat-system { text-align: center; height: 300px; }
      #sys-effort { position: absolute; left: 0; right: 0; top: 60px; font-weight: 800; font-size: 96px;
        letter-spacing: -.02em; color: #cdd9ea; opacity: 0; }
      #sys-strike { position: absolute; left: 50%; top: 110px; width: 0; height: 10px; transform: translateX(-50%);
        background: var(--red); border-radius: 6px; box-shadow: 0 0 18px rgba(255,90,77,.6); }
      #sys-system { position: absolute; left: 0; right: 0; top: 150px; font-weight: 800; font-size: 116px;
        letter-spacing: -.03em; color: var(--brand-flame); opacity: 0;
        text-shadow: 0 12px 40px rgba(255,76,50,.45); }

      /* ---- beat 4 friction checklist ---- */
      #beat-friction { height: 420px; }
      #fr-title { position: absolute; top: -8px; left: 4px; }
      .frow { position: absolute; left: 8px; display: flex; align-items: center; gap: 24px; opacity: 0; }
      .frow .dot { width: 26px; height: 26px; border-radius: 50%; background: var(--red); flex: none;
        box-shadow: 0 0 16px rgba(255,90,77,.7); }
      .frow .txt { font-weight: 800; font-size: 52px; color: #fff; text-shadow: 0 6px 20px rgba(0,0,0,.5); }
      #fr1 { top: 70px; } #fr2 { top: 158px; } #fr3 { top: 246px; } #fr4 { top: 334px; }

      /* ---- beat 5 symptom/cause ---- */
      #beat-cause { height: 360px; }
      .crow { position: absolute; left: 8px; display: flex; align-items: center; gap: 26px; opacity: 0; }
      .crow .mk { font-weight: 800; font-size: 62px; line-height: 1; }
      .crow .txt { font-weight: 800; font-size: 58px; color: #fff; }
      #c-sym { top: 40px; } #c-sym .mk { color: var(--red); } #c-sym .txt { color: #cdd9ea; }
      #c-cause { top: 150px; } #c-cause .mk { color: var(--brand-flame); } #c-cause .txt .em { color: var(--brand-flame); }
      #c-same { position: absolute; left: 8px; top: 268px; font-weight: 700; font-size: 38px;
        color: var(--brand-blue-tint); opacity: 0; }

      /* ---- beat 8 philosophy ---- */
      #beat-phil { height: 320px; text-align: left; }
      #ph1 { position: absolute; left: 8px; top: 60px; font-weight: 800; font-size: 72px; color: #cdd9ea; opacity: 0; }
      #ph2 { position: absolute; left: 8px; top: 168px; font-weight: 800; font-size: 88px;
        letter-spacing: -.02em; color: var(--brand-flame); opacity: 0;
        text-shadow: 0 12px 40px rgba(255,76,50,.4); }

      /* ---- beat 9 flame bloom ---- */
      #beat-bloom { position: absolute; left: 50%; top: 50%; width: 1200px; height: 1200px; z-index: 5;
        transform: translate(-50%,-50%) scale(.4); border-radius: 50%; opacity: 0; pointer-events: none;
        background: radial-gradient(circle, rgba(255,76,50,.55) 0%, rgba(255,76,50,0) 60%); filter: blur(40px); }

      /* ---- beat 7 Driftsleep proof (full-screen) ---- */
      #proof { position: absolute; inset: 0; z-index: 12; opacity: 0; overflow: hidden;
        transform-origin: 50% 50%; }
      #proof video { width: 100%; height: 100%; object-fit: cover; object-position: 50% 48%;
        filter: contrast(1.06) saturate(1.08); display: block; }
      #proof .pscrim { position: absolute; inset: 0; pointer-events: none;
        background:
          linear-gradient(0deg, rgba(6,40,76,.92) 0%, rgba(6,40,76,.25) 30%, rgba(6,40,76,0) 55%),
          linear-gradient(180deg, rgba(6,40,76,.7) 0%, rgba(6,40,76,0) 24%); }
      #p-eyebrow { position: absolute; top: 150px; left: 0; right: 0; text-align: center;
        font-weight: 700; font-size: 30px; letter-spacing: .2em; text-transform: uppercase;
        color: var(--brand-blue-tint); opacity: 0; }
      #p-stat { position: absolute; top: 800px; left: 0; right: 0; text-align: center;
        font-weight: 800; font-size: 280px; line-height: .82; color: var(--brand-flame);
        letter-spacing: -.04em; text-shadow: 0 16px 60px rgba(255,76,50,.5); opacity: 0; }
      #p-lab { position: absolute; top: 1090px; left: 0; right: 0; text-align: center;
        font-weight: 800; font-size: 56px; color: #fff; opacity: 0; }
      #p-sub { position: absolute; top: 1180px; left: 0; right: 0; text-align: center;
        font-weight: 700; font-size: 34px; color: var(--brand-blue-tint); opacity: 0; }
      #p-tag { position: absolute; top: 56px; left: 60px; font-weight: 700; font-size: 26px;
        letter-spacing: .14em; text-transform: uppercase; color: #fff;
        background: rgba(6,40,76,.78); padding: 12px 24px; border-radius: 999px;
        border: 1px solid rgba(156,212,255,.4); opacity: 0; }
      #p-tag b { color: var(--brand-blue-tint); }

      /* ---- whip-streak transition ---- */
      #whip { position: absolute; top: 0; bottom: 0; left: 0; width: 70%; z-index: 20; opacity: 0;
        pointer-events: none; transform: translateX(-130%);
        background: linear-gradient(90deg, transparent 0%, rgba(156,212,255,.0) 30%, #ffffff 50%,
          rgba(255,76,50,.7) 66%, transparent 100%); filter: blur(26px); mix-blend-mode: screen; }

      /* ---- beat 10 CTA card (full-screen) ---- */
      #cta { position: absolute; inset: 0; z-index: 16; opacity: 0;
        background:
          radial-gradient(90% 55% at 50% 16%, rgba(156,212,255,.10) 0%, rgba(6,40,76,0) 55%),
          var(--brand-navy);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; padding: 0 104px; }
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
      #cta #osmall { margin-top: 30px; font-weight: 600; font-size: 30px; color: var(--brand-text-dim); }
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
      <div id="grain" class="clip" data-start="0" data-duration="${COMP}" data-track-index="4"></div>
      <img id="logo" class="clip" data-start="0" data-duration="${FACE_DUR}" data-track-index="5"
           src="assets/ecomiq-logo-white.svg" alt="EcomIQ" />

      <!-- beat 1 + 6 : revenue graph (callback) -->
      <div id="beat-graph" class="band clip" data-start="0" data-duration="57.5" data-track-index="6">
        <div class="eyebrow lbl" id="g-label">Revenue&nbsp;&middot;&nbsp;flat for months</div>
        <div id="g-info">it's information&nbsp;&uarr;</div>
        <svg viewBox="0 0 900 250" preserveAspectRatio="none">
          <line id="g-flat" x1="20" y1="175" x2="720" y2="175" stroke-width="6" stroke-linecap="round" stroke-dasharray="14 16" />
          <path id="g-grow" fill="none" pathLength="1" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"
                d="M20,175 L430,175 C560,175 590,160 650,120 C712,78 778,48 880,20" />
          <circle id="g-dot" cx="880" cy="20" r="12" fill="#FF4C32" />
        </svg>
      </div>

      <!-- beat 2 : "more X" chips -->
      <div id="beat-chips" class="clip" data-start="${C1 - 0.5}" data-duration="${CHIPS_OUT - C1 + 1.2}" data-track-index="7">
        <div class="chip" id="chip1" style="left:120px; top:892px; transform:rotate(-4deg);">More ads</div>
        <div class="chip" id="chip2" style="right:120px; top:980px; transform:rotate(3deg);">More products</div>
        <div class="chip" id="chip3" style="left:170px; top:1088px; transform:rotate(-2deg);">More launches</div>
        <div class="chip" id="chip4" style="right:140px; top:1176px; transform:rotate(5deg);">More marketing</div>
      </div>

      <!-- beat 3 : effort -> system -->
      <div id="beat-system" class="band clip" data-start="${EFFORT_T - 0.5}" data-duration="${SYS_OUT - EFFORT_T + 1.2}" data-track-index="8">
        <div id="sys-effort" class="pop">EFFORT problem</div>
        <div id="sys-strike"></div>
        <div id="sys-system" class="pop">SYSTEM problem</div>
      </div>

      <!-- beat 4 : friction checklist -->
      <div id="beat-friction" class="band clip" data-start="${F1 - 1.5}" data-duration="${FRICTION_OUT - F1 + 3}" data-track-index="9">
        <div class="eyebrow" id="fr-title">Where's the friction?</div>
        <div class="frow" id="fr1"><span class="dot"></span><span class="txt">Traffic has stalled</span></div>
        <div class="frow" id="fr2"><span class="dot"></span><span class="txt">Conversion slipped</span></div>
        <div class="frow" id="fr3"><span class="dot"></span><span class="txt">Customers aren't returning</span></div>
        <div class="frow" id="fr4"><span class="dot"></span><span class="txt">Order value quietly fell</span></div>
      </div>

      <!-- beat 5 : symptom vs cause -->
      <div id="beat-cause" class="band clip" data-start="${SYMPTOM_T - 1}" data-duration="${CAUSE_OUT - SYMPTOM_T + 2}" data-track-index="10">
        <div class="crow" id="c-sym"><span class="mk">&#10007;</span><span class="txt">Treat the symptom</span></div>
        <div class="crow" id="c-cause"><span class="mk">&#10003;</span><span class="txt">Find the <span class="em">cause</span></span></div>
        <div id="c-same">work harder &middot; spend more &middot; launch more &rarr; same number</div>
      </div>

      <!-- beat 8 : philosophy -->
      <div id="beat-phil" class="band clip" data-start="${PHIL1 - 0.6}" data-duration="${PHIL_OUT - PHIL1 + 1.5}" data-track-index="11">
        <div id="ph1" class="pop">Growth isn't doing more.</div>
        <div id="ph2" class="pop">Fix what's already there.</div>
      </div>

      <!-- beat 9 : flame bloom into CTA -->
      <div id="beat-bloom" class="clip" data-start="${BLOOM_IN - 0.3}" data-duration="${CTA_IN - BLOOM_IN + 1.5}" data-track-index="13"></div>

      <!-- beat 7 : Driftsleep proof (full-screen takeover) — static wrapper, GSAP-driven -->
      <div id="proof">
        <video id="proof-vid" data-start="${PROOF_IN}" data-duration="${PROOF_OUT - PROOF_IN + 0.4}" data-track-index="15"
               src="assets/driftsleep-stab.mp4" muted playsinline></video>
        <div class="pscrim"></div>
        <div id="p-tag">Client&nbsp;&middot;&nbsp;<b>Driftsleep</b></div>
        <div id="p-eyebrow">Real result</div>
        <div id="p-stat">+59<span style="font-size:150px;">%</span></div>
        <div id="p-lab">returning customers</div>
        <div id="p-sub">without spending another dollar on ads</div>
      </div>

      <!-- whip-streak transition -->
      <div id="whip" class="clip" data-start="${PROOF_IN - 0.6}" data-duration="${CTA_IN - PROOF_IN + 2}" data-track-index="17"></div>

      <!-- beat 10 : CTA card (full-screen) -->
      <div id="cta" class="clip" data-start="${CTA_IN - 0.6}" data-duration="${COMP - CTA_IN + 1}" data-track-index="16">
        <div id="obloom"></div>
        <img id="ologo" src="assets/ecomiq-logo-white.svg" alt="EcomIQ" />
        <div id="oeyebrow">Stuck for months?</div>
        <div id="ohead">Find your<br /><span class="em">bottleneck.</span></div>
        <div id="oguar">We <span class="em">guarantee</span> the breakthrough.</div>
        <div id="octa">Learn how it works <span class="arrow">&rarr;</span></div>
        <div id="osmall">Click the link below &darr;</div>
      </div>
    </div>

    <script>
      const FACE_DUR = ${FACE_DUR}, COMP = ${COMP};
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      // gentle continuous push on the face
      tl.fromTo("#video-wrap", { scale: 1.0 }, { scale: 1.05, duration: FACE_DUR, ease: "none" }, 0);
      // logo in
      tl.from("#logo", { opacity: 0, y: -18, duration: .5, ease: "power3.out" }, .2);

      // ---------- BEAT 1 : flat revenue line ----------
      tl.set("#g-grow", { strokeDasharray: 1, strokeDashoffset: 1 }, 0);
      tl.set("#g-dot", { scale: 0, transformOrigin: "center" }, 0);
      tl.fromTo("#beat-graph", { opacity: 0 }, { opacity: 1, duration: .5, ease: "power2.out" }, 0.7);
      tl.fromTo("#g-flat", { scaleX: .2, transformOrigin: "left center" }, { scaleX: 1, duration: .9, ease: "power2.out" }, 0.9);
      tl.from("#g-label", { opacity: 0, y: 10, duration: .5, ease: "power2.out" }, 1.0);

      // ---------- BEAT 2 : "more X" chips pile up ----------
      const chips = [["#chip1", ${C1}], ["#chip2", ${C2}], ["#chip3", ${C3}], ["#chip4", ${C4}]];
      chips.forEach(([sel, t]) => {
        tl.fromTo(sel, { opacity: 0, scale: .6, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: .34, ease: "back.out(2.2)" }, t);
      });
      tl.to("#beat-chips", { opacity: 0, y: -20, duration: .4, ease: "power2.in" }, ${CHIPS_OUT});
      tl.to("#beat-graph", { opacity: 0, duration: .4, ease: "power2.in" }, ${CHIPS_OUT});

      // ---------- BEAT 3 : effort -> system ----------
      tl.fromTo("#sys-effort", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .45, ease: "power2.out" }, ${EFFORT_T});
      tl.fromTo("#sys-strike", { width: 0 }, { width: 560, duration: .35, ease: "power2.in" }, ${STRIKE_T});
      tl.to("#sys-effort", { opacity: .35, duration: .3 }, ${STRIKE_T} + .1);
      tl.fromTo("#sys-system", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .45, ease: "back.out(2)" }, ${SYSTEM_T});
      tl.to("#beat-system", { opacity: 0, y: -20, duration: .4, ease: "power2.in" }, ${SYS_OUT});

      // ---------- BEAT 4 : friction checklist ----------
      tl.from("#fr-title", { opacity: 0, y: 12, duration: .4, ease: "power2.out" }, ${F1 - 0.8});
      [["#fr1", ${F1}], ["#fr2", ${F2}], ["#fr3", ${F3}], ["#fr4", ${F4}]].forEach(([sel, t]) => {
        tl.fromTo(sel, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: .4, ease: "power3.out" }, t);
      });
      tl.to("#beat-friction", { opacity: 0, y: -20, duration: .45, ease: "power2.in" }, ${FRICTION_OUT});

      // ---------- BEAT 5 : symptom vs cause ----------
      tl.fromTo("#c-sym", { opacity: 0, x: -36 }, { opacity: 1, x: 0, duration: .4, ease: "power3.out" }, ${SYMPTOM_T});
      tl.fromTo("#c-cause", { opacity: 0, x: -36 }, { opacity: 1, x: 0, duration: .4, ease: "power3.out" }, ${CAUSE_T});
      tl.fromTo("#c-same", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${SAME_T});
      tl.to("#beat-cause", { opacity: 0, y: -20, duration: .4, ease: "power2.in" }, ${CAUSE_OUT});

      // ---------- BEAT 6 : graph callback -> growth ----------
      tl.set("#g-label", { opacity: 0 }, ${GRAPH_BACK - 0.1});
      tl.set("#g-flat", { opacity: 1, scaleX: 1 }, ${GRAPH_BACK - 0.1});
      tl.fromTo("#beat-graph", { opacity: 0 }, { opacity: 1, duration: .45, ease: "power2.out" }, ${GRAPH_BACK});
      // kick up on "information"
      tl.to("#g-grow", { strokeDashoffset: 0, duration: .8, ease: "power2.inOut" }, ${INFO_T});
      tl.to("#g-flat", { opacity: .22, duration: .5 }, ${INFO_T});
      tl.to("#g-dot", { scale: 1, duration: .35, ease: "back.out(2.4)" }, ${INFO_T} + .6);
      tl.fromTo("#g-info", { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: .45, ease: "power3.out" }, ${INFO_T} + .55);
      tl.to("#beat-graph", { opacity: 0, duration: .4, ease: "power2.in" }, ${GRAPH_OUT});

      // ---------- WHIP into proof ----------
      function whip(t) {
        tl.set("#whip", { opacity: 1 }, t);
        tl.fromTo("#whip", { xPercent: -130 }, { xPercent: 230, duration: .42, ease: "power3.in" }, t);
        tl.set("#whip", { opacity: 0 }, t + .42);
      }
      whip(${PROOF_IN} - .12);

      // ---------- BEAT 7 : Driftsleep proof (full-screen) ----------
      tl.fromTo("#proof", { opacity: 0, scale: 1.12, filter: "blur(22px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: .55, ease: "power2.out" }, ${PROOF_IN});
      tl.to("#proof video", { scale: 1.06, duration: ${PROOF_OUT - PROOF_IN}, ease: "none", transformOrigin: "50% 48%" }, ${PROOF_IN});
      tl.fromTo("#p-tag", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${PROOF_IN} + .3);
      tl.fromTo("#p-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${COUNT_START} - .4);
      // counter ticks +0 -> +59
      const ctr = { v: 0 };
      tl.set("#p-stat", { opacity: 1 }, ${COUNT_START});
      tl.fromTo("#p-stat", { scale: .7 }, { scale: 1, duration: .5, ease: "back.out(1.8)" }, ${COUNT_START});
      tl.to(ctr, { v: 59, duration: ${COUNT_END - COUNT_START}, ease: "power1.out",
        onUpdate: () => { document.querySelector("#p-stat").firstChild.nodeValue = "+" + Math.round(ctr.v); } }, ${COUNT_START});
      tl.fromTo("#p-lab", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${COUNT_END} - .1);
      tl.fromTo("#p-sub", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${COUNT_END} + .5);
      // whip back out to face
      whip(${PROOF_OUT} - .12);
      tl.to("#proof", { opacity: 0, scale: 1.08, filter: "blur(18px)", duration: .45, ease: "power2.in" }, ${PROOF_OUT});

      // ---------- BEAT 8 : philosophy ----------
      tl.fromTo("#ph1", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .45, ease: "power2.out" }, ${PHIL1});
      tl.fromTo("#ph2", { opacity: 0, y: 22, scale: .94 }, { opacity: 1, y: 0, scale: 1, duration: .5, ease: "power3.out" }, ${PHIL2});
      tl.to("#beat-phil", { opacity: 0, y: -18, duration: .45, ease: "power2.in" }, ${PHIL_OUT});

      // ---------- BEAT 9 : flame bloom ----------
      tl.fromTo("#beat-bloom", { opacity: 0, scale: .4 }, { opacity: .9, scale: 1.0, duration: ${CTA_IN - BLOOM_IN}, ease: "power1.in" }, ${BLOOM_IN});

      // ---------- WHIP into CTA + BEAT 10 card ----------
      whip(${CTA_IN} - .1);
      tl.to("#beat-bloom", { opacity: 0, duration: .4 }, ${CTA_IN});
      tl.fromTo("#cta", { opacity: 0, scale: 1.06, filter: "blur(16px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: .5, ease: "power2.out" }, ${CTA_IN});
      tl.fromTo("#ologo", { opacity: 0, y: -16, xPercent: -50 }, { opacity: 1, y: 0, xPercent: -50, duration: .5, ease: "power3.out" }, ${CTA_IN} + .25);
      tl.from("#oeyebrow", { opacity: 0, y: 14, duration: .45, ease: "power2.out" }, ${CTA_IN} + .45);
      tl.from("#ohead .em", { opacity: 0, x: -24, duration: .55, ease: "power3.out" }, ${CTA_IN} + .6);
      tl.from("#ohead", { opacity: 0, y: 24, duration: .55, ease: "power3.out" }, ${CTA_IN} + .72);
      tl.from("#oguar", { opacity: 0, y: 16, duration: .5, ease: "power2.out" }, ${CTA_IN} + 1.0);
      tl.from("#octa", { opacity: 0, scale: .85, duration: .5, ease: "back.out(1.7)" }, ${CTA_IN} + 1.3);
      tl.from("#osmall", { opacity: 0, duration: .5, ease: "power2.out" }, ${CTA_IN} + 1.7);
      tl.to("#octa", { scale: 1.04, duration: .7, ease: "sine.inOut", yoyo: true, repeat: 4 }, ${CTA_IN} + 2.2);

      // Law 11 — fill the slot
      tl.to({}, { duration: COMP }, 0);
      window.__timelines["${ID}"] = tl;
    </script>
  </body>
</html>
`;

fs.writeFileSync(new URL("./index.html", import.meta.url), html);
console.log("wrote index.html", html.length, "bytes");
