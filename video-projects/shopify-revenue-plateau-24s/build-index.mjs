// Plateau ad — 24s cut. Same v3 look (full-screen cards cutting over the face),
// built on a stitched 4-line VO source (short-sync.mp4). Splices are hidden under
// the cards. Voice-only. Bottom ~1/6 kept clear for captions.
import fs from "node:fs";

const ID = "shopify-revenue-plateau-24s";
const FACE_DUR = 18.0;                       // stitched VO length
const COMP     = process.env.TEST ? 6 : 23.0;
const CAP_PAD  = 250;

// HOOK
const HK_IN = 2.3, HK_MONTHS = 2.85, HK_TELL = 4.4, HK_OUT = 5.25;
// REFRAME (not failure / information)
const E_IN = 5.35, E_INFO = 7.9, E_OUT = 8.95;
// PROOF b-roll + +59% stat
const BROLL_IN = 8.95, BROLL_OUT = 11.25;
const STAT_IN = 11.15, COUNT_START = 11.35, COUNT_END = 12.05, STAT_OUT = 15.05;
// CTA
const CTA_IN = 16.4;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1350" />
    <title>EcomIQ — Plateau (24s)</title>
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

      #video-wrap { position: absolute; inset: 0; transform-origin: 50% 38%; z-index: 0; }
      #video-wrap video { width: 100%; height: 100%; object-fit: cover; object-position: 50% 36%;
        filter: contrast(1.06) saturate(1.08) brightness(0.98); display: block; }

      #scrims { position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background: linear-gradient(180deg, rgba(6,40,76,0.78) 0%, rgba(6,40,76,0.0) 16%); }
      #vignette { position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background: radial-gradient(125% 92% at 50% 38%, rgba(6,40,76,0) 56%, rgba(6,40,76,0.45) 100%); }

      #logo-wrap { position: absolute; top: 56px; left: 60px; width: 290px; z-index: 20; }
      #logo { width: 100%; height: auto; display: block; filter: drop-shadow(0 6px 18px rgba(0,0,0,0.45)); }

      .card { position: absolute; inset: 0; z-index: 10; opacity: 0; overflow: hidden;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; padding: 120px 90px var(--cap);
        background: radial-gradient(120% 80% at 50% 32%, #0b386a 0%, var(--brand-navy) 60%), var(--brand-navy); }
      .card .cbloom { position: absolute; inset: -12%; z-index: 0; pointer-events: none; filter: blur(26px);
        background:
          radial-gradient(38% 28% at 42% 38%, rgba(255,76,50,.16), rgba(255,76,50,0) 70%),
          radial-gradient(44% 32% at 66% 64%, rgba(156,212,255,.14), rgba(156,212,255,0) 72%); }
      .card .cgrid { position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .55;
        background:
          repeating-linear-gradient(0deg, rgba(156,212,255,.05) 0 1px, transparent 1px 90px),
          repeating-linear-gradient(90deg, rgba(156,212,255,.05) 0 1px, transparent 1px 90px);
        -webkit-mask-image: radial-gradient(78% 62% at 50% 42%, #000 28%, transparent 100%);
                mask-image: radial-gradient(78% 62% at 50% 42%, #000 28%, transparent 100%); }
      .card > *:not(.cbloom):not(.cgrid) { position: relative; z-index: 1; }

      .eyebrow { position: relative; font-weight: 700; font-size: 32px; letter-spacing: .26em;
        text-transform: uppercase; color: var(--brand-blue-tint); margin-bottom: 50px; padding-bottom: 24px; }
      .eyebrow .shopbag { height: 1.05em; width: auto; vertical-align: -0.16em; margin: 0 .14em;
        filter: drop-shadow(0 3px 8px rgba(0,0,0,.4)); }
      .eyebrow::after { content: ""; position: absolute; left: 50%; bottom: 0; transform: translateX(-50%);
        width: 56px; height: 4px; border-radius: 3px; background: var(--brand-flame);
        box-shadow: 0 0 14px rgba(255,76,50,.6); }
      .fg { background: linear-gradient(180deg, #ff5e48 0%, #ff4c32 55%, #ef3a22 100%);
        -webkit-background-clip: text; background-clip: text; color: transparent;
        filter: drop-shadow(0 14px 44px rgba(255,76,50,.42)); }

      #h-flat { font-weight: 800; font-size: 236px; line-height: .86; letter-spacing: -.05em; opacity: 0; }
      #h-months { font-weight: 800; font-size: 90px; letter-spacing: -.02em; color: #fff; opacity: 0; margin-top: 8px; }
      #h-tell { font-weight: 700; font-size: 50px; color: var(--brand-blue-tint); opacity: 0; margin-top: 40px; }

      #cardE .l1 { font-weight: 800; font-size: 100px; line-height: 1; letter-spacing: -.03em; color: #b9c8dc; opacity: 0; }
      #cardE .l2 { font-weight: 800; font-size: 124px; line-height: .92; letter-spacing: -.04em; white-space: nowrap; opacity: 0; margin-top: 22px; }

      #f-stat { font-weight: 800; font-size: 320px; line-height: .82; letter-spacing: -.05em; opacity: 0; }
      #f-stat span { font-size: 180px; }
      #f-lab { font-weight: 800; font-size: 68px; letter-spacing: -.02em; color: #fff; opacity: 0; margin-top: 6px; }
      #f-sub { font-weight: 700; font-size: 38px; color: var(--brand-blue-tint); opacity: 0; margin-top: 26px; }

      #proof { position: absolute; inset: 0; z-index: 10; opacity: 0; overflow: hidden; }
      #proof video { width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%;
        filter: contrast(1.05) saturate(1.06); display: block; }
      #proof .pscrim { position: absolute; inset: 0; pointer-events: none;
        background:
          radial-gradient(120% 80% at 50% 45%, rgba(6,40,76,.12) 0%, rgba(6,40,76,.66) 100%),
          linear-gradient(0deg, rgba(6,40,76,.85) 0%, rgba(6,40,76,0) 40%); }
      #p-tag { position: absolute; top: 56px; left: 60px; font-weight: 700; font-size: 26px;
        letter-spacing: .14em; text-transform: uppercase; color: #fff;
        background: rgba(6,40,76,.78); padding: 12px 24px; border-radius: 999px;
        border: 1px solid rgba(156,212,255,.4); opacity: 0; }
      #p-tag b { color: var(--brand-blue-tint); }

      #grain { position: absolute; inset: 0; pointer-events: none; z-index: 30; opacity: .5;
        background-image:
          radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
          radial-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
          radial-gradient(rgba(0,0,0,.02) 1px, transparent 1px);
        background-size: 3px 3px, 5px 5px, 7px 7px; background-position: 0 0, 1px 2px, 2px 1px; }

      #cta { position: absolute; inset: 0; z-index: 15; opacity: 0;
        background: radial-gradient(90% 55% at 50% 16%, rgba(156,212,255,.10) 0%, rgba(6,40,76,0) 55%), var(--brand-navy);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; padding: 0 104px var(--cap); }
      #cta #obloom { position: absolute; left: -10%; bottom: -20%; width: 120%; height: 58%;
        background: var(--brand-gradient-2); filter: blur(90px); opacity: .34; }
      #cta #ologo { position: absolute; top: 116px; left: 50%; transform: translateX(-50%); width: 360px; }
      #cta #oeyebrow { font-weight: 700; font-size: 28px; letter-spacing: .32em; text-transform: uppercase;
        color: var(--brand-blue-tint); margin-bottom: 28px; }
      #cta #ohead { font-weight: 800; font-size: 110px; line-height: .96; letter-spacing: -.03em; color: #fff; }
      #cta #ohead .em { font-family: 'Hedvig Letters Serif', serif; font-style: italic; font-weight: 400; color: var(--brand-blue-tint); }
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

      <div id="video-wrap">
        <video id="vid" data-start="0" data-duration="${FACE_DUR}" data-track-index="0" src="assets/short-sync.mp4" muted playsinline></video>
      </div>
      <audio id="aud" data-start="0" data-duration="${FACE_DUR}" data-track-index="1" data-volume="1" src="assets/short-sync.mp4"></audio>

      <div id="scrims" class="clip" data-start="0" data-duration="${COMP}" data-track-index="2"></div>
      <div id="vignette" class="clip" data-start="0" data-duration="${COMP}" data-track-index="3"></div>
      <div id="logo-wrap"><img id="logo" class="clip" data-start="0" data-duration="${FACE_DUR}" data-track-index="5"
           src="assets/ecomiq-logo-white.svg" alt="EcomIQ" /></div>

      <!-- HOOK card -->
      <div id="cardHook" class="card clip" data-start="2.0" data-duration="${HK_OUT - 2.0 + 1}" data-track-index="6">
        <div class="cbloom"></div><div class="cgrid"></div>
        <div class="eyebrow">Your <img class="shopbag" src="assets/shopify-bag.svg" alt="Shopify" /> revenue</div>
        <div id="h-flat" class="fg">FLAT</div>
        <div id="h-months">for months.</div>
        <div id="h-tell">It's telling you something.</div>
      </div>

      <!-- REFRAME card -->
      <div id="cardE" class="card clip" data-start="${E_IN - 0.4}" data-duration="${E_OUT - E_IN + 1}" data-track-index="11">
        <div class="cbloom"></div><div class="cgrid"></div>
        <div class="l1">Not failure.</div>
        <div class="l2 fg">INFORMATION.</div>
      </div>

      <!-- PROOF b-roll -->
      <div id="proof">
        <video id="proof-vid" data-start="${BROLL_IN}" data-duration="${BROLL_OUT - BROLL_IN + 0.2}" data-track-index="12"
               src="assets/driftsleep-stab.mp4" muted playsinline></video>
        <div class="pscrim"></div>
        <div id="p-tag">Client&nbsp;&middot;&nbsp;<b>Dryft&nbsp;Sleep</b></div>
      </div>

      <!-- +59% stat -->
      <div id="cardStat" class="card clip" data-start="${STAT_IN - 0.4}" data-duration="${STAT_OUT - STAT_IN + 1}" data-track-index="13">
        <div class="cbloom"></div><div class="cgrid"></div>
        <div id="f-stat" class="fg">+59<span>%</span></div>
        <div id="f-lab">returning customers</div>
        <div id="f-sub">without spending another dollar on ads</div>
      </div>

      <!-- CTA card -->
      <div id="cta" class="clip" data-start="${CTA_IN - 0.6}" data-duration="${COMP - CTA_IN + 1}" data-track-index="15">
        <div id="obloom"></div>
        <img id="ologo" src="assets/ecomiq-logo-white.svg" alt="EcomIQ" />
        <div id="oeyebrow">Stuck for months?</div>
        <div id="ohead">Find your<br /><span class="em">bottleneck.</span></div>
        <div id="oguar">We <span class="em">guarantee</span> the breakthrough.</div>
        <div id="octa">Learn how it works <span class="arrow">&rarr;</span></div>
      </div>

      <div id="grain" class="clip" data-start="0" data-duration="${COMP}" data-track-index="30"></div>
    </div>

    <script>
      const FACE_DUR = ${FACE_DUR}, COMP = ${COMP};
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      tl.fromTo("#video-wrap", { scale: 1.0 }, { scale: 1.05, duration: FACE_DUR, ease: "none" }, 0);
      tl.from("#logo-wrap", { opacity: 0, y: -18, duration: .5, ease: "power3.out" }, .2);
      tl.to(".cbloom", { xPercent: 8, yPercent: -6, scale: 1.12, duration: 7, ease: "sine.inOut", repeat: ${Math.ceil(COMP / 7) + 1}, yoyo: true }, 0);

      function cardIn(sel, t) {
        tl.fromTo(sel, { opacity: 0, scale: 1.05, yPercent: 1.5, filter: "blur(16px)" },
          { opacity: 1, scale: 1, yPercent: 0, filter: "blur(0px)", duration: .5, ease: "power2.out" }, t);
      }
      function cardOut(sel, t) {
        tl.to(sel, { opacity: 0, scale: .99, yPercent: -1.5, filter: "blur(12px)", duration: .4, ease: "power2.in" }, t);
      }

      // HOOK
      cardIn("#cardHook", ${HK_IN});
      tl.fromTo("#h-flat", { opacity: 0, scale: .72, yPercent: 16 }, { opacity: 1, scale: 1, yPercent: 0, duration: .55, ease: "back.out(2)" }, ${HK_IN} + .1);
      tl.fromTo("#h-months", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${HK_MONTHS});
      tl.fromTo("#h-tell", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .45, ease: "power3.out" }, ${HK_TELL});
      cardOut("#cardHook", ${HK_OUT});

      // REFRAME
      cardIn("#cardE", ${E_IN});
      tl.fromTo("#cardE .l1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${E_IN} + .1);
      tl.fromTo("#cardE .l2", { opacity: 0, scale: .82 }, { opacity: 1, scale: 1, duration: .5, ease: "back.out(2)" }, ${E_INFO});
      cardOut("#cardE", ${E_OUT});

      // PROOF b-roll
      tl.to("#logo-wrap", { opacity: 0, duration: .25, ease: "power2.in" }, ${BROLL_IN} - .15);
      tl.to("#logo-wrap", { opacity: 1, duration: .3, ease: "power2.out" }, ${STAT_OUT} + .05);
      tl.fromTo("#proof", { opacity: 0, scale: 1.08, filter: "blur(18px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: .5, ease: "power2.out" }, ${BROLL_IN});
      tl.fromTo("#proof video", { scale: 1.0 }, { scale: 1.08, duration: ${BROLL_OUT - BROLL_IN + 0.2}, ease: "none", transformOrigin: "50% 50%" }, ${BROLL_IN});
      tl.fromTo("#p-tag", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${BROLL_IN} + .25);
      tl.to("#proof", { opacity: 0, scale: 1.04, filter: "blur(14px)", duration: .4, ease: "power2.in" }, ${BROLL_OUT});

      // +59% stat
      cardIn("#cardStat", ${STAT_IN});
      const ctr = { v: 0 };
      tl.fromTo("#f-stat", { opacity: 0, scale: .72 }, { opacity: 1, scale: 1, duration: .5, ease: "back.out(1.8)" }, ${COUNT_START} - .05);
      tl.to(ctr, { v: 59, duration: ${COUNT_END - COUNT_START}, ease: "power1.out",
        onUpdate: () => { document.querySelector("#f-stat").firstChild.nodeValue = "+" + Math.round(ctr.v); } }, ${COUNT_START});
      tl.fromTo("#f-lab", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${COUNT_END} + .05);
      tl.fromTo("#f-sub", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out" }, ${COUNT_END} + .5);
      cardOut("#cardStat", ${STAT_OUT});

      // CTA
      tl.to("#logo-wrap", { opacity: 0, duration: .3 }, ${CTA_IN} - .1);
      tl.fromTo("#cta", { opacity: 0, scale: 1.05, filter: "blur(14px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: .5, ease: "power2.out" }, ${CTA_IN});
      tl.fromTo("#ologo", { opacity: 0, y: -16, xPercent: -50 }, { opacity: 1, y: 0, xPercent: -50, duration: .5, ease: "power3.out" }, ${CTA_IN} + .25);
      tl.from("#oeyebrow", { opacity: 0, y: 14, duration: .45, ease: "power2.out" }, ${CTA_IN} + .45);
      tl.from("#ohead .em", { opacity: 0, x: -24, duration: .55, ease: "power3.out" }, ${CTA_IN} + .6);
      tl.from("#ohead", { opacity: 0, y: 24, duration: .55, ease: "power3.out" }, ${CTA_IN} + .72);
      tl.from("#oguar", { opacity: 0, y: 16, duration: .5, ease: "power2.out" }, ${CTA_IN} + 1.0);
      tl.from("#octa", { opacity: 0, scale: .85, duration: .5, ease: "back.out(1.7)" }, ${CTA_IN} + 1.3);
      tl.to("#octa", { scale: 1.04, duration: .7, ease: "sine.inOut", yoyo: true, repeat: 4 }, ${CTA_IN} + 1.9);

      tl.to({}, { duration: COMP }, 0);
      window.__timelines["${ID}"] = tl;
    </script>
  </body>
</html>
`;

fs.writeFileSync(new URL("./index.html", import.meta.url), html);
console.log("wrote index.html", html.length, "bytes");
