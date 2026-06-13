// Generates index.html with caption timings baked in from captions-data.json.
import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("./assets/captions-data.json", "utf8"));
const LINES = data.lines;
const SEGS = data.segs;
const STAT = data.statCut;          // cut-timeline t when "59%" is spoken
const CUTS = SEGS.slice(1).map((s) => s.cutIn); // internal jump-cut points
const VIDEO_DUR = 23.85;            // play the assembled cut (file is 23.866s)
const OUTRO_IN = 23.2;              // outro card fades in just before video ends
const COMP = 27.4;                  // total composition duration

const ID = "shopify-revenue-plateau";

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

      /* ---- video (full-bleed cover crop, 16:9 -> 4:5) ---- */
      #video-wrap { position: absolute; inset: 0; transform-origin: 50% 42%; z-index: 0; }
      #video-wrap video { width: 100%; height: 100%; object-fit: cover; object-position: 50% 38%;
        filter: contrast(1.06) saturate(1.08) brightness(0.98); display: block; }

      /* ---- Driftsleep product b-roll cut-in (covers the face over the proof line) ---- */
      #broll-wrap { position: absolute; inset: 0; z-index: 2; transform-origin: 50% 45%; overflow: hidden; }
      #broll-wrap video { width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%;
        filter: contrast(1.05) saturate(1.06); display: block; }

      /* ---- brand scrims so logo + captions stay legible over face AND b-roll ---- */
      #scrims { position: absolute; inset: 0; pointer-events: none; z-index: 3;
        background:
          linear-gradient(180deg, rgba(6,40,76,0.85) 0%, rgba(6,40,76,0.0) 22%),
          linear-gradient(0deg, rgba(6,40,76,0.96) 0%, rgba(6,40,76,0.55) 24%, rgba(6,40,76,0.0) 42%); }
      #vignette { position: absolute; inset: 0; pointer-events: none; z-index: 3;
        background: radial-gradient(125% 90% at 50% 42%, rgba(6,40,76,0) 55%, rgba(6,40,76,0.55) 100%); }

      /* ---- logo chip top-left ---- */
      #logo { position: absolute; top: 56px; left: 60px; width: 300px; height: auto; z-index: 4;
        filter: drop-shadow(0 6px 18px rgba(0,0,0,0.45)); }

      /* ---- "59% returning customers" proof badge ---- */
      #stat { position: absolute; top: 196px; right: 60px; z-index: 4; text-align: right;
        opacity: 0; transform-origin: 100% 0; }
      #stat .big { font-weight: 800; font-size: 132px; line-height: .9; letter-spacing: -.04em;
        color: var(--brand-flame); text-shadow: 0 10px 36px rgba(255,76,50,.45); }
      #stat .lab { display: inline-block; margin-top: 8px; font-weight: 700; font-size: 30px;
        letter-spacing: .02em; color: #fff; background: rgba(6,40,76,.72); padding: 10px 20px;
        border-radius: 12px; border: 1px solid rgba(156,212,255,.35); }

      /* ---- flat-line -> growth motif (the "flat line is information" beat) ---- */
      #motif { position: absolute; left: 110px; right: 110px; top: 690px; height: 220px; z-index: 3;
        opacity: 0; pointer-events: none; }
      #motif svg { width: 100%; height: 100%; overflow: visible; }

      /* ---- captions ---- */
      #captions { position: absolute; left: 0; right: 0; bottom: 232px; z-index: 5;
        padding: 0 70px; pointer-events: none; }
      .cap-line { position: absolute; bottom: 0; left: 70px; right: 70px; text-align: center;
        font-family: 'Rethink Sans', sans-serif; font-weight: 800; font-size: 60px; line-height: 1.1;
        letter-spacing: -.02em; word-spacing: .1em; color: #fff; opacity: 0; visibility: hidden;
        text-shadow: -3px -3px 0 #06284C, 3px -3px 0 #06284C, -3px 3px 0 #06284C, 3px 3px 0 #06284C,
          -4px 0 0 #06284C, 4px 0 0 #06284C, 0 -4px 0 #06284C, 0 4px 0 #06284C, 0 8px 18px rgba(0,0,0,.5); }
      .cap-w { display: inline-block; transform-origin: center; will-change: transform, color; }

      /* ---- cut-transition dip ---- */
      #dip { position: absolute; inset: 0; background: var(--brand-navy); opacity: 0; z-index: 6; pointer-events: none; }

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

      <!-- Driftsleep product b-roll, shown over the whole proof segment (9.7-18.0).
           Talking-head audio keeps playing underneath; the cut dips at 9.7 & 18.0 mask it. -->
      <div id="broll-wrap">
        <video id="broll" data-start="9.7" data-duration="8.3" data-track-index="9"
               src="assets/driftsleep.mp4" muted playsinline></video>
      </div>

      <div id="scrims" class="clip" data-start="0" data-duration="${COMP}" data-track-index="2"></div>
      <div id="vignette" class="clip" data-start="0" data-duration="${COMP}" data-track-index="3"></div>

      <img id="logo" class="clip" data-start="0" data-duration="${VIDEO_DUR}" data-track-index="4"
           src="assets/ecomiq-logo-white.svg" alt="EcomIQ" />

      <div id="captions" class="clip" data-start="0" data-duration="${VIDEO_DUR}" data-track-index="6"></div>

      <div id="dip" class="clip" data-start="0" data-duration="${VIDEO_DUR}" data-track-index="7"></div>

      <div id="outro" class="clip" data-start="0" data-duration="${COMP}" data-track-index="8">
        <div id="obloom"></div>
        <img id="ologo" src="assets/ecomiq-logo-white.svg" alt="EcomIQ" />
        <div id="oeyebrow">Stuck for months?</div>
        <div id="ohead">Find your<br /><span class="em">bottleneck.</span></div>
        <div id="octa">Learn how it works <span class="arrow">&rarr;</span></div>
      </div>
    </div>

    <script>
      const LINES = ${JSON.stringify(LINES)};
      const STAT = ${STAT};
      const CUTS = ${JSON.stringify(CUTS)};
      const VIDEO_DUR = ${VIDEO_DUR};
      const OUTRO_IN = ${OUTRO_IN};
      const COMP = ${COMP};

      // Build caption DOM (one absolutely-positioned line per phrase, swapped over time).
      const capStage = document.getElementById("captions");
      LINES.forEach((ln, i) => {
        const div = document.createElement("div");
        div.className = "cap-line"; div.id = "cap-" + i;
        ln.words.forEach((w, j) => {
          const sp = document.createElement("span");
          sp.className = "cap-w"; sp.id = "cap-" + i + "-" + j; sp.textContent = w.t;
          div.appendChild(sp);
          if (j < ln.words.length - 1) div.appendChild(document.createTextNode(" "));
        });
        capStage.appendChild(div);
      });

      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      // Logo in
      tl.from("#logo", { opacity: 0, y: -18, duration: .5, ease: "power3.out" }, .15);

      // Subtle Ken Burns on the face so it never feels like a freeze
      tl.to("#video-wrap", { scale: 1.05, duration: VIDEO_DUR, ease: "none" }, 0);
      // Slow push on the Driftsleep b-roll so the shelf shot has life
      tl.fromTo("#broll-wrap", { scale: 1.0 }, { scale: 1.07, duration: 8.3, ease: "none" }, 9.7);

      // Cut-transition dips to mask the jump cuts (kept separate from the Ken Burns scale)
      CUTS.forEach((t) => {
        tl.fromTo("#dip", { opacity: 0 }, { opacity: .55, duration: .08, ease: "power2.in" }, t - .08)
          .to("#dip", { opacity: 0, duration: .14, ease: "power2.out" }, t);
      });

      // Captions: clean hard hand-off (only ONE line visible at a time — no
      // crossfade overlap), karaoke-pop each word to flame as it's spoken.
      const ACTIVE = "#FF4C32", REST = "#ffffff", DIM = "rgba(255,255,255,.55)";
      LINES.forEach((ln, i) => {
        const sel = "#cap-" + i;
        const start = ln.words[0].s, end = ln.words[ln.words.length - 1].e;
        const next = (i < LINES.length - 1) ? LINES[i + 1].words[0].s : Infinity;
        const inAt = Math.max(start - .04, 0);
        // hide this line before the next one appears (clean cut), else just after it ends
        const hardOut = Math.min(end + .14, next - .07);
        const outAt = Math.max(hardOut - .09, inAt + .12);
        const hideAt = outAt + .09;
        ln.words.forEach((w, j) => tl.set("#cap-" + i + "-" + j, { color: DIM, scale: 1 }, inAt));
        tl.set(sel, { visibility: "visible" }, inAt);
        tl.fromTo(sel, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .1, ease: "power2.out" }, inAt);
        ln.words.forEach((w, j) => {
          const ws = "#cap-" + i + "-" + j;
          tl.to(ws, { color: ACTIVE, scale: 1.12, duration: .07, ease: "back.out(3)" }, Math.max(w.s, inAt));
          tl.to(ws, { color: REST, scale: 1, duration: .12, ease: "power2.out" }, w.e);
        });
        tl.to(sel, { opacity: 0, duration: .09, ease: "power2.in" }, outAt);
        tl.set(sel, { visibility: "hidden", opacity: 0 }, hideAt);
      });

      // 59% proof badge pop
      tl.fromTo("#stat", { opacity: 0, scale: .8, y: -10 }, { opacity: 1, scale: 1, y: 0, duration: .4, ease: "back.out(2)" }, STAT - .25)
        .to("#stat", { opacity: 0, scale: .94, duration: .3, ease: "power2.in" }, 17.7);

      // Outro card: fade in over the last beat, hold, CTA breathes.
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

fs.writeFileSync("./index.html", html);
console.log("wrote index.html", html.length, "bytes; lines:", LINES.length, "cuts:", CUTS);
