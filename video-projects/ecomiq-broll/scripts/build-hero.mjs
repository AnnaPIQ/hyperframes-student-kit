/**
 * Builds the 5-second "Black Friday Profit Plan" hero b-roll, in the EcomIQ
 * motion language: deep navy ground, perspective grid, crosshair registration
 * marks, vignette and grain, with the REAL workbook pages as the content.
 *
 * Five beats in five seconds — roughly three times the reference cut rate:
 *   0.000  3D workbook slams in from depth
 *   0.933  its pages whip out into a fan
 *   1.833  8 / 32 / 19 punch in
 *   2.767  the contribution-margin worksheet flies in, its total lights up
 *   3.733  the 2026 Black Friday calendar pushes in, Black Friday lights up
 *
 * Every cut is hidden inside a motion-blurred whip streak; nothing hard-cuts.
 * No logo, no captions, no end card — this stays a building block.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FPS = 30;
const f = (n) => Math.round(n * FPS) / FPS;      // snap every tween time to a frame

const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, 'clips.json'), 'utf8'))
  .find((c) => c.name === 'bf-workbook-hero');
const DUR = MANIFEST.duration;

const FRAME = { '9x16': { w: 1080, h: 1920 }, '4x5': { w: 1080, h: 1350 } };
export const HERO_RATIOS = Object.fromEntries(MANIFEST.ratios.map((r) => [r, FRAME[r]]));

/** Deterministic crosshair field — harmonic hash, never Math.random(). */
function crosshairs(w, h, n = 26) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = Math.round(w * Math.abs(Math.sin(i * 1.7 + 0.4) * Math.cos(i * 0.9 + 1.1)));
    const y = Math.round(h * Math.abs(Math.sin(i * 0.63 + 1.9) * Math.cos(i * 1.31 + 0.2)));
    const s = 5 + Math.round(4 * Math.abs(Math.sin(i * 2.3)));
    const o = (0.10 + 0.22 * Math.abs(Math.cos(i * 1.13))).toFixed(3);
    out += `<g opacity="${o}"><path d="M${x - s} ${y}H${x + s}M${x} ${y - s}V${y + s}" `
         + `stroke="#9CD4FF" stroke-width="1.4"/></g>`;
  }
  return out;
}

// Highlight boxes, measured off the rendered page images as % of the page.
const HL_MARGIN = { left: 9.0, width: 81.5, top: 54.2, height: 3.4 };   // page 8, "Contribution per order"
const HL_CAL = { left: 9.0, width: 81.8, top: 53.5, height: 5.2 };      // page 4, "Fri 27 November / Black Friday"

const box = (h) => `left:${h.left}%;width:${h.width}%;top:${h.top}%;height:${h.height}%`;

function template(ratioKey) {
  const r = HERO_RATIOS[ratioKey];
  const id = `bf-workbook-hero-${ratioKey}`;
  const STAGE_H = 1180;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${r.w}, height=${r.h}" />
    <title>EcomIQ B-roll — Black Friday Profit Plan hero (${ratioKey})</title>
    <script src="assets/gsap.min.js"></script>
    <link rel="stylesheet" href="assets/brand-tokens.css" />
    <link rel="stylesheet" href="assets/fonts/fonts-full.css" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body {
        width: ${r.w}px; height: ${r.h}px; overflow: hidden;
        background: #041a33; font-family: var(--font-sans);
      }

      /* ---- ground -------------------------------------------------------- */
      #bg {
        position: absolute; inset: 0;
        background:
          radial-gradient(74% 46% at 50% 41%, #0f3e70 0%, #092d52 36%, #062442 60%, #03121f 100%);
      }
      /* Perspective floor + ceiling. The spine under everything (law 10). */
      .grid {
        position: absolute; left: -60%; width: 220%; height: 130%;
        background-image:
          repeating-linear-gradient(0deg,  rgba(156,212,255,.22) 0 1px, transparent 1px 74px),
          repeating-linear-gradient(90deg, rgba(156,212,255,.22) 0 1px, transparent 1px 74px);
        will-change: transform;
      }
      #grid-floor {
        bottom: -52%;
        transform: perspective(820px) rotateX(74deg);
        -webkit-mask-image: linear-gradient(to top, #000 4%, transparent 62%);
                mask-image: linear-gradient(to top, #000 4%, transparent 62%);
      }
      #grid-roof {
        top: -52%;
        transform: perspective(820px) rotateX(-74deg);
        opacity: .5;
        -webkit-mask-image: linear-gradient(to bottom, #000 4%, transparent 55%);
                mask-image: linear-gradient(to bottom, #000 4%, transparent 55%);
      }
      #marks { position: absolute; inset: 0; }
      #vignette {
        position: absolute; inset: 0; pointer-events: none;
        background: radial-gradient(112% 74% at 50% 46%, rgba(0,0,0,0) 34%, rgba(2,14,28,.82) 100%);
      }
      /* Fixed-seed turbulence: deterministic frame to frame. */
      #grain {
        position: absolute; inset: 0; pointer-events: none; opacity: .055;
        mix-blend-mode: overlay;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch' seed='7'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
      }

      /* ---- stage --------------------------------------------------------- */
      #stage {
        position: absolute; left: 0; width: ${r.w}px; height: ${STAGE_H}px;
        top: ${Math.round((r.h - STAGE_H) / 2)}px;
      }
      .beat { position: absolute; inset: 0; opacity: 0; will-change: transform, opacity, filter; }

      /* ---- beat 1 · the book --------------------------------------------- */
      #book-wrap { perspective: 1500px; }
      #book {
        position: absolute; left: 50%; top: 50%;
        width: 540px; height: 699px; margin: -350px 0 0 -270px;
        transform-style: preserve-3d;
      }
      #book-front {
        position: absolute; inset: 0; width: 100%; height: 100%;
        box-shadow: 0 0 0 1px rgba(156,212,255,.16);
      }
      /* Gloss across the cover so it reads as a physical object, not a flat png. */
      #book-gloss {
        position: absolute; inset: 0;
        background: linear-gradient(112deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,0) 34%, rgba(0,0,0,.22) 100%);
      }
      /* Fore-edge: a real 3D face hinged off the right edge, ruled like a page block. */
      #book-edge {
        position: absolute; top: 4px; right: 0; height: calc(100% - 8px); width: 40px;
        transform-origin: 100% 50%; transform: rotateY(90deg);
        background:
          repeating-linear-gradient(0deg, rgba(6,40,76,.16) 0 1px, transparent 1px 4px),
          linear-gradient(90deg, #cdd9e6 0%, #f4f8fc 55%, #b9c8d8 100%);
      }
      #book-shadow {
        position: absolute; left: 50%; top: 50%; width: 660px; height: 130px;
        margin: 300px 0 0 -330px; filter: blur(46px);
        background: radial-gradient(ellipse at center, rgba(0,0,0,.72) 0%, rgba(0,0,0,0) 70%);
      }

      /* ---- beat 2 · the page fan ----------------------------------------- */
      .fan {
        position: absolute; left: 50%; top: 50%;
        width: 330px; height: 427px; margin: -214px 0 0 -165px;
        transform-origin: 50% 128%;
        box-shadow: 0 26px 60px rgba(0,0,0,.55), 0 0 0 1px rgba(156,212,255,.14);
        background: #fff;
      }
      .fan img { display: block; width: 100%; height: 100%; }

      /* ---- beat 3 · the numbers ------------------------------------------ */
      #stats { display: flex; flex-direction: column; align-items: center; justify-content: center; }
      #stats .eyebrow {
        font-size: 24px; font-weight: 600; letter-spacing: .42em;
        color: var(--brand-blue-tint); text-transform: uppercase; margin-bottom: 26px;
      }
      #stats .rule { width: 96px; height: 3px; background: var(--brand-flame); margin-bottom: 58px; }
      #stats .row { display: flex; align-items: flex-start; gap: 54px; }
      #stats .col { display: flex; flex-direction: column; align-items: center; }
      #stats .n {
        font-family: var(--font-serif); font-size: 190px; line-height: .86;
        color: var(--brand-flame); letter-spacing: -.02em;
        text-shadow: 0 0 46px rgba(255,76,50,.42);
      }
      #stats .l {
        font-size: 21px; font-weight: 600; letter-spacing: .3em;
        color: #cfe2f6; text-transform: uppercase; margin-top: 26px;
      }
      #stats .sep { width: 1px; height: 190px; background: rgba(156,212,255,.26); }

      /* ---- beats 4 & 5 · real pages -------------------------------------- */
      .doc-wrap { perspective: 1900px; }
      .doc {
        position: absolute; left: 50%; top: 50%;
        width: 880px; height: 1139px; margin: -570px 0 0 -440px;
        transform-style: preserve-3d;
        box-shadow: 0 40px 110px rgba(0,0,0,.62), 0 0 0 1px rgba(156,212,255,.18);
        background: #fff;
      }
      .doc img { display: block; width: 100%; height: 100%; }
      /* Flame outline that pops on the row the page is really about. */
      .hl {
        position: absolute; border: 3px solid var(--brand-flame); border-radius: 4px;
        box-shadow: 0 0 34px rgba(255,76,50,.6), inset 0 0 22px rgba(255,76,50,.22);
        opacity: 0;
      }

      /* ---- whip streaks --------------------------------------------------- */
      .whip {
        position: absolute; left: -60%; top: 50%; width: 220%; height: 26px;
        margin-top: -13px; opacity: 0;
        background: linear-gradient(90deg, transparent 0%, rgba(156,212,255,.95) 38%, #ffffff 50%, rgba(255,76,50,.95) 62%, transparent 100%);
        filter: blur(13px);
      }
    </style>
  </head>
  <body>
    <div id="${id}" data-composition-id="${id}" data-start="0" data-width="${r.w}" data-height="${r.h}" data-fps="${FPS}">

      <div id="bg" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0">
        <div id="grid-floor" class="grid"></div>
        <div id="grid-roof" class="grid"></div>
      </div>

      <svg id="marks" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1"
           viewBox="0 0 ${r.w} ${r.h}" width="${r.w}" height="${r.h}">${crosshairs(r.w, r.h)}</svg>

      <div id="stage" class="clip" data-start="0" data-duration="${DUR}" data-track-index="2">

        <!-- beat 1 -->
        <div id="b-book" class="beat">
          <div id="book-shadow"></div>
          <div id="book-wrap" style="position:absolute;inset:0">
            <div id="book">
              <img id="book-front" src="assets/pages/page1.png" alt="" />
              <div id="book-gloss"></div>
              <div id="book-edge"></div>
            </div>
          </div>
        </div>

        <!-- beat 2 -->
        <div id="b-fan" class="beat">
          ${[3, 5, 8, 4, 6].map((p, i) => `<div class="fan f${i}"><img src="assets/pages/page${p}.png" alt="" /></div>`).join('\n          ')}
        </div>

        <!-- beat 3 -->
        <div id="b-stats" class="beat">
          <div id="stats" style="position:absolute;inset:0">
            <div class="eyebrow">Inside the workbook</div>
            <div class="rule"></div>
            <div class="row">
              <div class="col s0"><div class="n">8</div><div class="l">Parts</div></div>
              <div class="sep"></div>
              <div class="col s1"><div class="n">32</div><div class="l">Worksheets</div></div>
              <div class="sep"></div>
              <div class="col s2"><div class="n">19</div><div class="l">Free tools</div></div>
            </div>
          </div>
        </div>

        <!-- beat 4 -->
        <div id="b-margin" class="beat">
          <div class="doc-wrap" style="position:absolute;inset:0">
            <div class="doc" id="doc-margin">
              <img src="assets/pages/page8.png" alt="" />
              <div class="hl" id="hl-margin" style="${box(HL_MARGIN)}"></div>
            </div>
          </div>
        </div>

        <!-- beat 5 -->
        <div id="b-cal" class="beat">
          <div class="doc-wrap" style="position:absolute;inset:0">
            <div class="doc" id="doc-cal">
              <img src="assets/pages/page4.png" alt="" />
              <div class="hl" id="hl-cal" style="${box(HL_CAL)}"></div>
            </div>
          </div>
        </div>

        <div class="whip w0"></div>
        <div class="whip w1"></div>
        <div class="whip w2"></div>
        <div class="whip w3"></div>
      </div>

      <div id="vignette" class="clip" data-start="0" data-duration="${DUR}" data-track-index="3"></div>
      <div id="grain" class="clip" data-start="0" data-duration="${DUR}" data-track-index="4"></div>
    </div>

    <script>
      const SLOT = ${DUR};
      const tl = gsap.timeline({ paused: true });

      // Beat marks, all on frame boundaries at ${FPS}fps.
      const B = { book: ${f(0)}, fan: ${f(28 / 30)}, stats: ${f(55 / 30)}, margin: ${f(83 / 30)}, cal: ${f(112 / 30)} };
      const W = [${f(25 / 30)}, ${f(52 / 30)}, ${f(80 / 30)}, ${f(109 / 30)}];

      /* ---- the ground never sleeps (law 4) ---------------------------------- */
      tl.fromTo("#grid-floor", { yPercent: 0 }, { yPercent: -7, duration: SLOT, ease: "none" }, 0)
        .fromTo("#grid-roof", { yPercent: 0 }, { yPercent: 7, duration: SLOT, ease: "none" }, 0)
        .fromTo("#marks", { scale: 1, opacity: .85 }, { scale: 1.05, opacity: 1, duration: SLOT, ease: "none" }, 0);

      /* ---- beat 1 · the book slams in from depth ---------------------------- */
      // NOTE: the blur lives on the wrapper, never on #book itself — a filter on
      // an element forces transform-style back to flat, which collapses the
      // book's 3D fore-edge into the cover.
      tl.fromTo("#b-book", { opacity: 0 }, { opacity: 1, duration: ${f(3 / 30)}, ease: "none" }, B.book)
        .fromTo("#b-book", { filter: "blur(30px)" }, { filter: "blur(0px)", duration: ${f(17 / 30)}, ease: "power4.out" }, B.book)
        .fromTo("#book",
          { scale: 1.9, rotateY: -52, rotateX: 15 },
          { scale: 1, rotateY: -17, rotateX: 5, duration: ${f(17 / 30)}, ease: "power4.out" },
          B.book)
        // then it keeps turning, so the hold is never a still frame
        .to("#book", { rotateY: -5, scale: 1.05, duration: ${f(11 / 30)}, ease: "sine.inOut" }, ${f(17 / 30)})
        .fromTo("#book-shadow", { opacity: 0, scaleX: 1.5 }, { opacity: 1, scaleX: 1, duration: ${f(14 / 30)}, ease: "power3.out" }, B.book)
        // and blows out through the lens as the pages take over
        .to("#b-book", { opacity: 0, duration: ${f(4 / 30)}, ease: "power2.in" }, ${f(26 / 30)})
        .to("#b-book", { filter: "blur(24px)", duration: ${f(5 / 30)}, ease: "power3.in" }, ${f(25 / 30)})
        .to("#book", { scale: 1.5, duration: ${f(5 / 30)}, ease: "power3.in" }, ${f(25 / 30)});

      /* ---- beat 2 · the pages whip out into a fan --------------------------- */
      const FAN = [
        { r: -26, x: -312, y: 44 },
        { r: -13, x: -166, y: 10 },
        { r: 0, x: 0, y: -6 },
        { r: 13, x: 166, y: 10 },
        { r: 26, x: 312, y: 44 },
      ];
      tl.fromTo("#b-fan", { opacity: 0 }, { opacity: 1, duration: ${f(2 / 30)}, ease: "none" }, B.fan);
      FAN.forEach((p, i) => {
        tl.fromTo("#b-fan .f" + i,
          { rotate: 0, x: 0, y: 0, scale: .72, opacity: 0, filter: "blur(14px)" },
          { rotate: p.r, x: p.x, y: p.y, scale: 1, opacity: 1, filter: "blur(0px)",
            duration: ${f(13 / 30)}, ease: "power4.out" },
          B.fan + i * ${f(2 / 30)});
      });
      // the whole fan drifts up while it sits, then whips away
      tl.to("#b-fan", { y: -26, scale: 1.04, duration: ${f(20 / 30)}, ease: "sine.out" }, B.fan)
        .to("#b-fan", { opacity: 0, scale: 1.3, filter: "blur(20px)", duration: ${f(5 / 30)}, ease: "power3.in" }, ${f(52 / 30)});

      /* ---- beat 3 · 8 / 32 / 19 -------------------------------------------- */
      tl.fromTo("#b-stats", { opacity: 0 }, { opacity: 1, duration: ${f(2 / 30)}, ease: "none" }, B.stats)
        .fromTo("#stats .eyebrow", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: ${f(7 / 30)}, ease: "power3.out" }, B.stats)
        .fromTo("#stats .rule", { scaleX: 0 }, { scaleX: 1, duration: ${f(7 / 30)}, ease: "power3.out" }, B.stats + ${f(2 / 30)})
        .fromTo("#stats .sep", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: ${f(9 / 30)}, ease: "power3.out" }, B.stats + ${f(4 / 30)});
      [0, 1, 2].forEach((i) => {
        tl.fromTo("#stats .s" + i + " .n",
          { opacity: 0, scale: 2.1, y: 24, filter: "blur(16px)" },
          { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: ${f(9 / 30)}, ease: "power4.out" },
          B.stats + ${f(2 / 30)} + i * ${f(2 / 30)})
          .fromTo("#stats .s" + i + " .l",
            { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: ${f(7 / 30)}, ease: "power2.out" },
            B.stats + ${f(5 / 30)} + i * ${f(2 / 30)});
      });
      tl.to("#stats .row", { scale: 1.06, duration: ${f(23 / 30)}, ease: "sine.inOut" }, B.stats)
        .to("#b-stats", { opacity: 0, scale: 1.22, filter: "blur(18px)", duration: ${f(5 / 30)}, ease: "power3.in" }, ${f(80 / 30)});

      /* ---- beat 4 · the worksheet that does the maths ----------------------- */
      tl.fromTo("#b-margin", { opacity: 0 }, { opacity: 1, duration: ${f(2 / 30)}, ease: "none" }, B.margin)
        .fromTo("#doc-margin",
          { x: 520, rotateY: 34, scale: .9, filter: "blur(18px)" },
          { x: 0, rotateY: -5, scale: 1, filter: "blur(0px)", duration: ${f(15 / 30)}, ease: "power4.out" },
          B.margin)
        .to("#doc-margin", { rotateY: 2, scale: 1.05, duration: ${f(14 / 30)}, ease: "sine.inOut" }, B.margin + ${f(15 / 30)})
        .fromTo("#hl-margin", { opacity: 0, scaleX: .6 }, { opacity: 1, scaleX: 1, duration: ${f(6 / 30)}, ease: "power3.out" }, B.margin + ${f(9 / 30)})
        .to("#b-margin", { opacity: 0, scale: 1.16, filter: "blur(16px)", duration: ${f(5 / 30)}, ease: "power3.in" }, ${f(109 / 30)});

      /* ---- beat 5 · the date it all runs at --------------------------------- */
      tl.fromTo("#b-cal", { opacity: 0 }, { opacity: 1, duration: ${f(2 / 30)}, ease: "none" }, B.cal)
        .fromTo("#doc-cal",
          { x: -480, rotateY: -32, scale: .92, filter: "blur(16px)" },
          { x: 0, rotateY: 4, scale: 1, filter: "blur(0px)", duration: ${f(14 / 30)}, ease: "power4.out" },
          B.cal)
        // holds the hero shot to the last frame, still moving (law 9 + law 4)
        .to("#doc-cal", { rotateY: -2, scale: 1.06, duration: ${f(24 / 30)}, ease: "sine.inOut" }, B.cal + ${f(14 / 30)})
        .fromTo("#hl-cal", { opacity: 0, scaleX: .6 }, { opacity: 1, scaleX: 1, duration: ${f(6 / 30)}, ease: "power3.out" }, B.cal + ${f(8 / 30)});

      /* ---- whips hide every cut (law 5) ------------------------------------- */
      W.forEach((t, i) => {
        tl.fromTo(".whip.w" + i,
          { opacity: 0, xPercent: -46, scaleX: .5, scaleY: .6, rotate: i % 2 ? -7 : 7 },
          { opacity: 1, xPercent: 0, scaleX: 1.35, scaleY: 2.4, duration: ${f(3 / 30)}, ease: "power2.out" }, t)
          .to(".whip.w" + i, { opacity: 0, xPercent: 46, scaleX: .6, duration: ${f(4 / 30)}, ease: "power2.in" }, t + ${f(3 / 30)});
      });

      // Law 11: the timeline must fill its slot or the tail goes black.
      tl.to({}, { duration: SLOT }, 0);

      window.__timelines = window.__timelines || {};
      window.__timelines["${id}"] = tl;
    </script>
  </body>
</html>
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const ratioKey of Object.keys(HERO_RATIOS)) {
    const file = path.join(ROOT, 'compositions', `bf-workbook-hero-${ratioKey}.html`);
    fs.writeFileSync(file, template(ratioKey));
    console.log('wrote', path.relative(ROOT, file));
  }
}
