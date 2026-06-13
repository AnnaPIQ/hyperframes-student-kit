// Generates index.html for the Plateau ad.
// Face stays the hero; motion-graphics overlays (flat-line->growth motif,
// 59% stat, framed Driftsleep b-roll insert) ride on top. No captions.
// The four spoken segments are cross-dissolved INSIDE ad-cut.mp4, so the
// composition no longer masks jump cuts.
import fs from "node:fs";

const ID = "shopify-revenue-plateau";

const VIDEO_DUR = 22.95;   // assembled cut (file is 22.97s)
// --- beat markers in the assembled-cut timeline ---
const MOTIF_IN   = 6.0;    // "The flat line isn't failure..."
const MOTIF_KICK = 7.9;    // "...it's information." -> line kicks up
const MOTIF_OUT  = 9.5;
const BROLL_IN   = 10.6;   // "...brands like Driftsleep..."
const BROLL_OUT  = 16.7;
const STAT_T     = 13.37;  // "59%" is spoken
const STAT_OUT   = 16.9;
const OUTRO_IN   = 22.4;   // outro card fades in as the CTA line lands
const COMP       = 27.2;   // total composition duration (outro holds ~4.8s)

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1350" />
    <title>EcomIQ — Plateau ad</title>
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

      /* ---- talking head (full-bleed cover crop, 16:9 -> 4:5) ---- */
      #video-wrap { position: absolute; inset: 0; transform-origin: 50% 40%; z-index: 0; }
      #video-wrap video { width: 100%; height: 100%; object-fit: cover; object-position: 50% 38%;
        filter: contrast(1.06) saturate(1.08) brightness(0.98); display: block; }

      /* ---- brand scrims so logo + overlays stay legible over the face ---- */
      #scrims { position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background:
          linear-gradient(180deg, rgba(6,40,76,0.82) 0%, rgba(6,40,76,0.0) 20%),
          linear-gradient(0deg, rgba(6,40,76,0.80) 0%, rgba(6,40,76,0.18) 18%, rgba(6,40,76,0.0) 36%); }
      #vignette { position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background: radial-gradient(125% 92% at 50% 40%, rgba(6,40,76,0) 56%, rgba(6,40,76,0.5) 100%); }

      /* ---- logo chip top-left ---- */
      #logo { position: absolute; top: 56px; left: 60px; width: 300px; height: auto; z-index: 6;
        filter: drop-shadow(0 6px 18px rgba(0,0,0,0.45)); }

      /* ---- flat-line -> growth motif (the "flat line is information" beat) ---- */
      #motif { position: absolute; left: 96px; right: 96px; top: 1000px; height: 250px; z-index: 4;
        opacity: 0; pointer-events: none; }
      #motif svg { width: 100%; height: 100%; overflow: visible; }
      #motif #mlabel { position: absolute; right: 6px; top: 6px; font-weight: 800; font-size: 40px;
        letter-spacing: -.01em; color: var(--brand-flame); opacity: 0;
        text-shadow: 0 6px 22px rgba(255,76,50,.45); }
      #flat { stroke: var(--brand-blue-tint); }
      #grow { stroke: var(--brand-flame); filter: drop-shadow(0 6px 16px rgba(255,76,50,.5)); }

      /* ---- 59% proof badge ---- */
      #stat { position: absolute; top: 188px; right: 60px; z-index: 6; text-align: right;
        opacity: 0; transform-origin: 100% 0; }
      #stat .big { font-weight: 800; font-size: 138px; line-height: .9; letter-spacing: -.04em;
        color: var(--brand-flame); text-shadow: 0 10px 36px rgba(255,76,50,.45); }
      #stat .lab { display: inline-block; margin-top: 8px; font-weight: 700; font-size: 30px;
        letter-spacing: .02em; color: #fff; background: rgba(6,40,76,.72); padding: 10px 20px;
        border-radius: 12px; border: 1px solid rgba(156,212,255,.35); }

      /* ---- Driftsleep b-roll, framed insert OVER the face (face stays visible above) ---- */
      #broll-card { position: absolute; left: 50%; top: 690px; width: 430px; height: 516px;
        z-index: 5; border-radius: 30px; overflow: hidden;
        border: 3px solid var(--brand-flame); opacity: 0;
        box-shadow: 0 36px 90px -24px rgba(0,0,0,.7), 0 0 0 8px rgba(6,40,76,.5); }
      #broll-card video { width: 100%; height: 100%; object-fit: cover; object-position: 50% 48%;
        filter: contrast(1.05) saturate(1.06); display: block; }
      #broll-tag { position: absolute; left: 50%; top: 1232px; z-index: 5;
        font-weight: 700; font-size: 26px; letter-spacing: .14em; text-transform: uppercase;
        color: #fff; background: rgba(6,40,76,.78); padding: 12px 26px; border-radius: 999px;
        border: 1px solid rgba(156,212,255,.4); opacity: 0; white-space: nowrap; }
      #broll-tag b { color: var(--brand-blue-tint); }

      /* ---- outro CTA card ---- */
      #outro { position: absolute; inset: 0; z-index: 8; opacity: 0;
        background:
          radial-gradient(90% 55% at 50% 16%, rgba(156,212,255,.10) 0%, rgba(6,40,76,0) 55%),
          var(--brand-navy);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; padding: 0 110px; }
      #outro #obloom { position: absolute; left: -10%; bottom: -20%; width: 120%; height: 58%;
        background: var(--brand-gradient-2); filter: blur(90px); opacity: .34; }
      #outro #ologo { position: absolute; top: 120px; left: 50%; transform: translateX(-50%); width: 360px; }
      #outro #oeyebrow { font-weight: 700; font-size: 27px; letter-spacing: .34em; text-transform: uppercase;
        color: var(--brand-blue-tint); margin-bottom: 30px; }
      #outro #ohead { font-weight: 800; font-size: 104px; line-height: .98; letter-spacing: -.03em; color: #fff; }
      #outro #ohead .em { font-family: 'Hedvig Letters Serif', serif; font-style: italic; font-weight: 400;
        color: var(--brand-blue-tint); }
      #outro #octa { margin-top: 56px; display: inline-flex; align-items: center; gap: 18px;
        font-weight: 700; font-size: 40px; color: #fff; background: var(--brand-flame);
        padding: 32px 60px; border-radius: 999px; box-shadow: 0 22px 70px -16px rgba(255,76,50,.65); }
      #outro #octa .arrow { font-size: 42px; line-height: 1; transform: translateY(-2px); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="${ID}" data-start="0" data-duration="${COMP}" data-width="1080" data-height="1350">

      <!-- full-bleed talking-head cut (muted; audio is the sibling track) -->
      <div id="video-wrap">
        <video id="vid" data-start="0" data-duration="${VIDEO_DUR}" data-track-index="0"
               src="assets/ad-cut.mp4" muted playsinline></video>
      </div>
      <audio id="aud" data-start="0" data-duration="${VIDEO_DUR}" data-track-index="1"
             data-volume="1" src="assets/ad-cut.mp4"></audio>

      <div id="scrims" class="clip" data-start="0" data-duration="${COMP}" data-track-index="2"></div>
      <div id="vignette" class="clip" data-start="0" data-duration="${COMP}" data-track-index="3"></div>

      <img id="logo" class="clip" data-start="0" data-duration="${VIDEO_DUR}" data-track-index="4"
           src="assets/ecomiq-logo-white.svg" alt="EcomIQ" />

      <!-- flat-line -> growth motion graphic -->
      <div id="motif" class="clip" data-start="${MOTIF_IN - 0.3}" data-duration="${MOTIF_OUT - MOTIF_IN + 0.6}" data-track-index="5">
        <svg viewBox="0 0 888 250" preserveAspectRatio="none">
          <line id="flat" x1="20" y1="170" x2="700" y2="170"
                stroke-width="6" stroke-linecap="round" stroke-dasharray="14 16" />
          <path id="grow" fill="none" pathLength="1" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"
                d="M20,170 L430,170 C560,170 590,158 650,120 C712,80 778,52 868,26" />
          <circle id="gdot" cx="868" cy="26" r="11" fill="#FF4C32" />
        </svg>
        <div id="mlabel">information&nbsp;&uarr;</div>
      </div>

      <!-- 59% proof badge -->
      <div id="stat" class="clip" data-start="${STAT_T - 0.6}" data-duration="${STAT_OUT - STAT_T + 1.0}" data-track-index="6">
        <div class="big">+59%</div>
        <div class="lab">returning customers</div>
      </div>

      <!-- Driftsleep b-roll insert (stabilized) -->
      <div id="broll-card">
        <video id="broll" data-start="${BROLL_IN}" data-duration="${BROLL_OUT - BROLL_IN}" data-track-index="9"
               src="assets/driftsleep-stab.mp4" muted playsinline></video>
      </div>
      <div id="broll-tag" class="clip" data-start="${BROLL_IN}" data-duration="${BROLL_OUT - BROLL_IN}" data-track-index="7">
        Client&nbsp;&middot;&nbsp;<b>Driftsleep</b>
      </div>

      <div id="outro" class="clip" data-start="0" data-duration="${COMP}" data-track-index="8">
        <div id="obloom"></div>
        <img id="ologo" src="assets/ecomiq-logo-white.svg" alt="EcomIQ" />
        <div id="oeyebrow">Stuck for months?</div>
        <div id="ohead">Find your<br /><span class="em">bottleneck.</span></div>
        <div id="octa">Learn how it works <span class="arrow">&rarr;</span></div>
      </div>
    </div>

    <script>
      const VIDEO_DUR = ${VIDEO_DUR};
      const COMP = ${COMP};
      const OUTRO_IN = ${OUTRO_IN};

      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      // Logo in
      tl.from("#logo", { opacity: 0, y: -18, duration: .5, ease: "power3.out" }, .15);

      // Gentle continuous push on the face (cross-dissolves are baked into the cut,
      // so a single slow Ken Burns reads smooth across the whole piece).
      tl.fromTo("#video-wrap", { scale: 1.0 }, { scale: 1.045, duration: VIDEO_DUR, ease: "none" }, 0);

      // ---- flat-line -> growth motif ----
      tl.fromTo("#motif", { opacity: 0 }, { opacity: 1, duration: .4, ease: "power2.out" }, ${MOTIF_IN});
      // hide the growth curve until the kick
      tl.set("#grow", { strokeDasharray: 1, strokeDashoffset: 1 }, 0);
      tl.set("#gdot", { scale: 0, transformOrigin: "center" }, 0);
      // kick up on "information"
      tl.to("#grow", { strokeDashoffset: 0, duration: .7, ease: "power2.inOut" }, ${MOTIF_KICK});
      tl.to("#flat", { opacity: .25, duration: .5, ease: "power2.out" }, ${MOTIF_KICK});
      tl.to("#gdot", { scale: 1, duration: .35, ease: "back.out(2.4)" }, ${MOTIF_KICK} + .55);
      tl.fromTo("#mlabel", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: .4, ease: "power3.out" }, ${MOTIF_KICK} + .5);
      tl.to("#motif", { opacity: 0, duration: .45, ease: "power2.in" }, ${MOTIF_OUT});

      // ---- 59% proof badge ----
      tl.fromTo("#stat", { opacity: 0, scale: .8, y: -10 }, { opacity: 1, scale: 1, y: 0, duration: .45, ease: "back.out(2)" }, ${STAT_T} - .25)
        .to("#stat", { opacity: 0, scale: .94, duration: .3, ease: "power2.in" }, ${STAT_OUT});

      // ---- Driftsleep b-roll insert (slides up, holds, slides out) ----
      tl.fromTo("#broll-card", { opacity: 0, y: 46, scale: .94, xPercent: -50 }, { opacity: 1, y: 0, scale: 1, xPercent: -50, duration: .5, ease: "power3.out" }, ${BROLL_IN});
      tl.fromTo("#broll-tag", { opacity: 0, y: 14, xPercent: -50 }, { opacity: 1, y: 0, xPercent: -50, duration: .4, ease: "power2.out" }, ${BROLL_IN} + .15);
      tl.to("#broll-card", { opacity: 0, y: 36, duration: .45, ease: "power2.in" }, ${BROLL_OUT} - .35);
      tl.to("#broll-tag", { opacity: 0, duration: .35, ease: "power2.in" }, ${BROLL_OUT} - .35);

      // ---- Outro CTA card ----
      tl.to("#outro", { opacity: 1, duration: .5, ease: "power2.out" }, OUTRO_IN);
      tl.fromTo("#ologo", { opacity: 0, y: -16, xPercent: -50 }, { opacity: 1, y: 0, xPercent: -50, duration: .5, ease: "power3.out" }, OUTRO_IN + .25);
      tl.from("#oeyebrow", { opacity: 0, y: 14, duration: .45, ease: "power2.out" }, OUTRO_IN + .45);
      tl.from("#ohead .em", { opacity: 0, x: -24, duration: .55, ease: "power3.out" }, OUTRO_IN + .6);
      tl.from("#ohead", { opacity: 0, y: 24, duration: .55, ease: "power3.out" }, OUTRO_IN + .72);
      tl.from("#octa", { opacity: 0, scale: .85, duration: .5, ease: "back.out(1.7)" }, OUTRO_IN + 1.0);
      tl.to("#octa", { scale: 1.04, duration: .7, ease: "sine.inOut", yoyo: true, repeat: 3 }, OUTRO_IN + 1.7);

      // Pad to composition duration.
      tl.set({}, {}, COMP);
      window.__timelines["${ID}"] = tl;
    </script>
  </body>
</html>
`;

fs.writeFileSync(new URL("./index.html", import.meta.url), html);
console.log("wrote index.html", html.length, "bytes");
