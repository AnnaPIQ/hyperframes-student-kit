/* Generator for duckhorn-sizzle index.html — single master composition.
 * Architecture: one root composition, one paused GSAP timeline.
 *  - Background = always-on non-timed layers (ink + warm radial + vignette + grain).
 *  - Each beat = a non-timed wrapper, GSAP-animated, autoAlpha-gated to its window.
 *  - The only timed elements are <video> (HF owns their window) + <audio>.
 *  - Videos sit over a poster background-image so there is never a black frame.
 *  - Videos are wrapped in a div; GSAP animates the wrapper, never the <video>.
 */
const fs = require('fs');

const W = 1920, H = 1080, FPS = 30, TOTAL = 45.0;

// palette
const INK = '#0E0A09', CREAM = '#F2E9DC', CREAM_DIM = 'rgba(242,233,220,0.60)',
      GOLD = '#C2A24B', BURG = '#6E1F2A', PIQ = '#0500ED';

// card geometry
const CARD_X = 660, CARD_Y = 200, SCREEN_W = 1180, SCREEN_H = 640, CHROME_H = 46;

const BRANDS = [
  { id:'tdc', start:5.0, dur:5.5, idx:'01',
    name:'The Duckhorn Collection', nameSize:60, desc:'The portfolio, reimagined',
    domain:'THEDUCKHORNCOLLECTION.COM', video:'tdc-home',
    dual:{ video:'tdc-products', at:3.0 } },
  { id:'duckhorn', start:10.5, dur:5.0, idx:'02',
    name:'Duckhorn Vineyards', nameSize:72, desc:'Napa Valley estate · est. 1976',
    domain:'DUCKHORN.COM', video:'duckhorn-home' },
  { id:'decoy', start:15.5, dur:5.0, idx:'03',
    name:'Decoy', nameSize:104, desc:'Pour to what&rsquo;s possible',
    domain:'DECOYWINES.COM', video:'decoy-home' },
  { id:'goldeneye', start:20.5, dur:5.0, idx:'04',
    name:'Goldeneye', nameSize:96, desc:'Anderson Valley Pinot Noir',
    domain:'GOLDENEYEWINERY.COM', video:'goldeneye-home' },
  { id:'calera', start:25.5, dur:5.0, idx:'05',
    name:'Calera', nameSize:104, desc:'A singular mountain, a radical belief',
    domain:'CALERAWINE.COM', video:'calera-home' },
  { id:'greenwing', start:30.5, dur:5.5, idx:'06',
    name:'Greenwing', nameSize:96, desc:'Rooted in remarkable places',
    domain:'GREENWINGWINES.COM', video:'greenwing-home',
    dual:{ video:'greenwing-product', at:3.0 } },
];

/* ---------- DOM ---------- */
function cardMarkup(beat){
  const v1dur = (beat.dual ? beat.dual.at + 0.4 : beat.dur).toFixed(2);
  let cards = `
      <div class="card" id="${beat.id}-card1">
        <div class="chrome"><span class="dot d1"></span><span class="dot d2"></span><span class="dot d3"></span>
          <span class="urlpill">${beat.domain.toLowerCase()}</span></div>
        <div class="screen" style="background-image:url('assets/posters/${beat.video}.jpg')">
          <div class="vidwrap"><video id="${beat.id}-vid1" data-start="${beat.start}" data-duration="${v1dur}" data-track-index="20"
            src="assets/site-${beat.video}.mp4" muted playsinline></video></div>
        </div>
      </div>`;
  if (beat.dual){
    const v2start = (beat.start + beat.dual.at).toFixed(2);
    const v2dur = (beat.dur - beat.dual.at + 0.3).toFixed(2);
    cards += `
      <div class="card card2" id="${beat.id}-card2">
        <div class="chrome"><span class="dot d1"></span><span class="dot d2"></span><span class="dot d3"></span>
          <span class="urlpill">${beat.domain.toLowerCase()}/experiences</span></div>
        <div class="screen" style="background-image:url('assets/posters/${beat.dual.video}.jpg')">
          <div class="vidwrap"><video id="${beat.id}-vid2" data-start="${v2start}" data-duration="${v2dur}" data-track-index="21"
            src="assets/site-${beat.dual.video}.mp4" muted playsinline></video></div>
        </div>
      </div>`;
  }
  return cards;
}

function beatMarkup(beat){
  return `
    <!-- BEAT ${beat.idx} — ${beat.name} (${beat.start}–${(beat.start+beat.dur).toFixed(1)}) -->
    <div class="beat" id="beat-${beat.id}">
      <div class="textcol">
        <div class="idx tline">${beat.idx}<span class="of">/06</span></div>
        <div class="bname tline" style="font-size:${beat.nameSize}px">${beat.name}</div>
        <div class="desc tline">${beat.desc}</div>
        <div class="uline"></div>
        <div class="domain tline">${beat.domain}</div>
      </div>
      ${cardMarkup(beat)}
    </div>`;
}

const gridImgs = BRANDS.map(b => `<div class="gcell"><img src="assets/posters/${b.video}.jpg" alt=""></div>`).join('\n        ');

/* ---------- audio ---------- */
const whooshes = BRANDS.map((b,i)=>
  `      <audio id="whoosh-${i}" data-start="${b.start.toFixed(2)}" data-duration="0.42" data-track-index="${31+i}" data-volume="0.12" src="assets/sfx-whoosh-${(i%2)+1}.mp3"></audio>`).join('\n');

/* ---------- GSAP timeline ---------- */
function beatTimeline(beat){
  const s = beat.start, d = beat.dur, end = s + d;
  const root = `#beat-${beat.id}`;
  let js = `
  // ${beat.name}
  tl.set('${root}', { autoAlpha: 1 }, ${s});
  gsap.set('${root} .card1, ${root} .textcol', { });
  // card1 rise
  tl.fromTo('${root} #${beat.id}-card1', { y: 130, autoAlpha: 0, filter: 'blur(30px)' },
    { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }, ${s});
  tl.fromTo('${root} #${beat.id}-card1 .screen', { scale: 1.0 }, { scale: 1.045, duration: ${d.toFixed(2)}, ease: 'none' }, ${s});
  // text column stagger
  tl.fromTo('${root} .tline', { y: 28, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.62, ease: 'power3.out', stagger: 0.12 }, ${(s+0.28).toFixed(2)});
  tl.fromTo('${root} .uline', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.out' }, ${(s+0.95).toFixed(2)});`;
  if (beat.dual){
    const sw = s + beat.dual.at;
    js += `
  // dual-card swap
  gsap.set('${root} #${beat.id}-card2', { autoAlpha: 0, x: 70, filter: 'blur(26px)' });
  tl.to('${root} #${beat.id}-card1', { x: -50, autoAlpha: 0, filter: 'blur(22px)', duration: 0.5, ease: 'power2.in' }, ${sw.toFixed(2)});
  tl.fromTo('${root} #${beat.id}-card2', { x: 70, autoAlpha: 0, filter: 'blur(26px)' },
    { x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' }, ${sw.toFixed(2)});
  tl.fromTo('${root} #${beat.id}-card2 .screen', { scale: 1.0 }, { scale: 1.03, duration: ${(d-beat.dual.at).toFixed(2)}, ease: 'none' }, ${sw.toFixed(2)});`;
  }
  js += `
  // exit
  tl.to('${root} .beat-inner-x', {}, ${(end-0.5).toFixed(2)}); // (no-op marker)
  tl.to('${root}', { y: -70, autoAlpha: 0, filter: 'blur(18px)', duration: 0.5, ease: 'power2.in' }, ${(end-0.5).toFixed(2)});
  tl.set('${root}', { autoAlpha: 0, y: 0, filter: 'blur(0px)' }, ${end.toFixed(2)});`;
  return js;
}

const beatsHTML = BRANDS.map(beatMarkup).join('\n');
const beatsJS = BRANDS.map(beatTimeline).join('\n');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <title>Duckhorn — Six-Site Launch Sizzle</title>
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family:'Hedvig Letters Serif'; src:url('assets/fonts/HedvigLettersSerif.woff2') format('woff2'); font-weight:400; font-display:block; }
      @font-face { font-family:'Rethink Sans'; src:url('assets/fonts/RethinkSans.woff2') format('woff2'); font-weight:400 800; font-display:block; }
      * { margin:0; padding:0; box-sizing:border-box; }
      html, body { width:${W}px; height:${H}px; overflow:hidden; background:${INK}; color:${CREAM}; }
      #root { position:absolute; inset:0; overflow:hidden; }

      /* ---- background (always on) ---- */
      .bg-radial { position:absolute; inset:0; background:
        radial-gradient(120% 90% at 30% 18%, rgba(178,120,58,0.13) 0%, rgba(110,31,42,0.05) 38%, transparent 70%); }
      .bg-vignette { position:absolute; inset:0; pointer-events:none;
        background:radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.78) 100%); }
      .bg-grain { position:absolute; inset:0; pointer-events:none; opacity:0.06; mix-blend-mode:overlay;
        background-image:
          radial-gradient(rgba(255,255,255,0.5) 0.6px, transparent 0.6px),
          radial-gradient(rgba(255,255,255,0.4) 0.6px, transparent 0.6px);
        background-size:3px 3px, 5px 5px; background-position:0 0, 1px 2px; }

      /* ---- beats ---- */
      .beat { position:absolute; inset:0; visibility:hidden; opacity:0; }
      .textcol { position:absolute; left:120px; top:322px; width:486px; }
      .idx { font-family:'Rethink Sans',sans-serif; font-weight:700; font-size:26px; letter-spacing:0.18em;
        color:${GOLD}; margin-bottom:26px; }
      .idx .of { color:${CREAM_DIM}; font-weight:500; }
      .bname { font-family:'Hedvig Letters Serif',Georgia,serif; line-height:1.02; color:${CREAM};
        letter-spacing:0.005em; margin-bottom:24px; }
      .desc { font-family:'Rethink Sans',sans-serif; font-weight:400; font-size:27px; line-height:1.4;
        color:${CREAM_DIM}; max-width:430px; margin-bottom:30px; }
      .uline { width:300px; height:2px; background:linear-gradient(90deg, ${GOLD}, ${BURG}); transform-origin:left center; margin-bottom:18px; }
      .domain { font-family:'Rethink Sans',sans-serif; font-weight:600; font-size:19px; letter-spacing:0.2em; color:${GOLD}; }

      .card { position:absolute; left:${CARD_X}px; top:${CARD_Y}px; width:${SCREEN_W}px;
        border-radius:15px; overflow:hidden; background:#16110f;
        box-shadow:0 50px 110px rgba(0,0,0,0.7), 0 0 0 1px rgba(242,233,220,0.10), inset 0 1px 0 rgba(255,255,255,0.10); }
      .card2 { }
      .chrome { height:${CHROME_H}px; display:flex; align-items:center; gap:9px; padding:0 18px;
        background:linear-gradient(180deg,#221a17,#19120f); border-bottom:1px solid rgba(255,255,255,0.06); }
      .dot { width:11px; height:11px; border-radius:50%; }
      .d1{background:#7a4b3a;} .d2{background:#8a7448;} .d3{background:#5a6a4a;}
      .urlpill { margin-left:18px; padding:6px 18px; border-radius:8px; background:rgba(0,0,0,0.35);
        font-family:'Rethink Sans',sans-serif; font-size:15px; letter-spacing:0.04em; color:rgba(242,233,220,0.7); }
      .screen { position:relative; width:${SCREEN_W}px; height:${SCREEN_H}px; background-size:cover; background-position:center top; overflow:hidden; }
      .vidwrap { position:absolute; inset:0; }
      .vidwrap video { width:100%; height:100%; object-fit:cover; object-position:center top; display:block; }

      /* ---- open (beat 0) ---- */
      #beat-open { position:absolute; inset:0; visibility:hidden; opacity:0; display:flex; flex-direction:column;
        align-items:center; justify-content:center; }
      #beat-open .o-rule { width:0px; height:2px; background:linear-gradient(90deg,transparent,${GOLD},transparent); margin-bottom:34px; }
      #beat-open .o-title { font-family:'Hedvig Letters Serif',serif; font-size:96px; color:${CREAM}; text-align:center; line-height:1.05; }
      #beat-open .o-sub { font-family:'Rethink Sans',sans-serif; font-weight:600; font-size:24px; letter-spacing:0.34em;
        color:${GOLD}; margin-top:30px; }
      .mote { position:absolute; width:4px; height:4px; border-radius:50%; background:${GOLD}; opacity:0; }

      /* ---- outro (beat 9) ---- */
      #beat-outro { position:absolute; inset:0; visibility:hidden; opacity:0; }
      .o-layer { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
      #grid { width:1320px; display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:repeat(2,1fr); gap:26px; }
      .gcell { border-radius:10px; overflow:hidden; aspect-ratio:16/9; box-shadow:0 24px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(194,162,75,0.35); opacity:0; }
      .gcell img { width:100%; height:100%; object-fit:cover; object-position:center top; }
      #payline { text-align:center; font-family:'Hedvig Letters Serif',serif; color:${CREAM}; opacity:0; }
      #payline .l1, #payline .l2 { font-size:104px; line-height:1.08; }
      #payline .l2 em { font-style:normal; color:${GOLD}; }
      #credit { text-align:center; opacity:0; }
      #credit .builtby { font-family:'Rethink Sans',sans-serif; font-weight:600; font-size:20px; letter-spacing:0.4em; color:${CREAM_DIM}; margin-bottom:34px; }
      #credit .lockup { display:flex; align-items:center; justify-content:center; gap:24px; }
      #credit .leaf { width:88px; height:88px; }
      #credit .wordmark { font-family:'Rethink Sans',sans-serif; font-weight:800; font-size:72px; letter-spacing:-0.02em; color:${PIQ}; position:relative; }
      #credit .glint { position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.85) 50%,transparent 60%);
        background-size:260% 100%; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; opacity:0; }
      #credit .url { font-family:'Rethink Sans',sans-serif; font-weight:500; font-size:24px; letter-spacing:0.22em; color:${CREAM_DIM}; margin-top:36px; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="duckhorn-sizzle" data-start="0" data-duration="${TOTAL}" data-width="${W}" data-height="${H}">

      <!-- background -->
      <div class="bg-radial"></div>
      <div class="bg-vignette"></div>
      <div class="bg-grain"></div>

      <!-- OPEN -->
      <div id="beat-open">
        <div class="o-rule"></div>
        <div class="o-title">The Duckhorn<br>Collection</div>
        <div class="o-sub">SIX ESTATE BRANDS &middot; ONE LAUNCH</div>
        ${Array.from({length:14},(_,i)=>`<div class="mote" id="mote-${i}"></div>`).join('')}
      </div>

      <!-- BRAND BEATS -->
${beatsHTML}

      <!-- OUTRO -->
      <div id="beat-outro">
        <div class="o-layer" id="grid-layer">
          <div id="grid">
          ${gridImgs}
          </div>
        </div>
        <div class="o-layer" id="pay-layer">
          <div id="payline">
            <div class="l1">Six websites.</div>
            <div class="l2"><em>One launch.</em></div>
          </div>
        </div>
        <div class="o-layer" id="credit-layer">
          <div id="credit">
            <div class="builtby">BUILT BY</div>
            <div class="lockup">
              <img class="leaf" src="assets/piq-leaf.png" alt="PacificIQ">
              <span class="wordmark">PacificIQ<span class="glint">PacificIQ</span></span>
            </div>
            <div class="url">PACIFICIQ.COM</div>
          </div>
        </div>
      </div>

      <!-- AUDIO -->
      <audio id="ambient-pad" data-start="0" data-duration="${TOTAL}" data-track-index="30" data-volume="0.16" src="assets/ambient-pad.mp3"></audio>
${whooshes}
      <audio id="twinkle" data-start="41.4" data-duration="0.55" data-track-index="40" data-volume="0.15" src="assets/sfx-twinkle.mp3"></audio>
    </div>

    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      /* ===== OPEN (0.0–5.0) ===== */
      tl.set('#beat-open', { autoAlpha: 1 }, 0);
      tl.fromTo('#beat-open .o-rule', { width: 0 }, { width: 420, duration: 1.0, ease: 'power2.inOut' }, 0.2);
      tl.fromTo('#beat-open .o-title', { y: 40, autoAlpha: 0, filter: 'blur(14px)' },
        { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' }, 0.5);
      tl.fromTo('#beat-open .o-sub', { y: 18, autoAlpha: 0, letterSpacing: '0.5em' },
        { y: 0, autoAlpha: 1, letterSpacing: '0.34em', duration: 0.9, ease: 'power3.out' }, 2.1);
      // drifting motes
      for (let i = 0; i < 14; i++) {
        const px = (i * 137) % 1820 + 40, py = (i * 89) % 980 + 40;
        const r = 0.4 + Math.abs(Math.sin(i * 1.7)) * 0.5;
        gsap.set('#mote-' + i, { x: px, y: py });
        tl.to('#mote-' + i, { autoAlpha: r * 0.8, duration: 1.2, ease: 'sine.inOut' }, 0.3 + (i % 5) * 0.18);
        tl.to('#mote-' + i, { y: py - 60, duration: 4.5, ease: 'none' }, 0.3);
      }
      tl.to('#beat-open', { y: -60, autoAlpha: 0, filter: 'blur(16px)', duration: 0.6, ease: 'power2.in' }, 4.4);
      tl.set('#beat-open', { autoAlpha: 0, y: 0, filter: 'blur(0px)' }, 5.0);

      /* ===== BRAND BEATS ===== */
${beatsJS}

      /* ===== OUTRO (36.0–45.0) ===== */
      tl.set('#beat-outro', { autoAlpha: 1 }, 36.0);
      // grid assemble
      tl.fromTo('#beat-outro .gcell',
        { autoAlpha: 0, y: 50, scale: 0.9 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.2)', stagger: 0.09 }, 36.05);
      // grid hold then recede + dim
      tl.to('#grid', { scale: 0.86, autoAlpha: 0.18, filter: 'blur(7px)', duration: 0.9, ease: 'power2.inOut' }, 38.0);
      // payline
      tl.fromTo('#payline', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 38.2);
      tl.fromTo('#payline .l1', { y: 36, autoAlpha: 0, filter: 'blur(10px)' },
        { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }, 38.2);
      tl.fromTo('#payline .l2', { y: 36, autoAlpha: 0, filter: 'blur(10px)' },
        { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }, 38.7);
      // clear grid + payline to black
      tl.to('#grid', { autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, 40.2);
      tl.to('#payline', { autoAlpha: 0, y: -40, filter: 'blur(12px)', duration: 0.7, ease: 'power2.in' }, 40.2);
      // end credit
      tl.fromTo('#credit', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 41.2);
      tl.fromTo('#credit .builtby', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 41.2);
      tl.fromTo('#credit .lockup', { autoAlpha: 0, y: 22, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out' }, 41.5);
      tl.fromTo('#credit .glint', { autoAlpha: 1, backgroundPosition: '160% 0' },
        { backgroundPosition: '-60% 0', duration: 1.1, ease: 'none' }, 42.6);
      tl.to('#credit .glint', { autoAlpha: 0, duration: 0.2 }, 43.7);
      tl.fromTo('#credit .url', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 42.4);

      /* anchor — Law 11 */
      tl.to({}, { duration: ${TOTAL} }, 0);
      window.__timelines['duckhorn-sizzle'] = tl;
    </script>
  </body>
</html>
`;

fs.writeFileSync(__dirname + '/../index.html', html);
console.log('Wrote index.html — ' + html.length + ' bytes, ' + BRANDS.length + ' brand beats.');
