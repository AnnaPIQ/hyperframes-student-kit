/**
 * Generates both delivery ratios of the EcomIQ Black Friday workbook ad from a
 * single spec, so 9:16 and 4:5 can never drift apart on timing or copy.
 *
 *   node scripts/build-compositions.mjs
 *     -> compositions/ad-9x16.html   (1080x1920)
 *     -> compositions/ad-4x5.html    (1080x1350)
 *
 * Every cut time below is a measured pause in Sean's delivery (ffmpeg
 * silencedetect over the real audio), offset by the 2.85s slate trim. See
 * EDIT_PLAN.md for the beat map and the provenance of every on-screen figure.
 *
 * The bottom of every frame is a reserved subtitle band — no graphic enters it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DURATION = 53.0;      // composition length
const AROLL_DUR = 46.6;     // A-roll runs out under the end card
const VO_DUR = 52.1;

/** Scene windows in edit time. Clean-Sean beats carry no graphic layer. */
const T = {
  stamp:     [2.55, 4.05],    // the hook word
  costs:     [10.70, 15.20],  // the cost stack, one beat
  dashboard: [19.55, 21.75],  // real product preview
  contrast:  [21.75, 25.44],  // the punchline
  cover:     [26.75, 29.35],  // the workbook itself
  worksheet: [32.55, 36.15],  // the count-up
  checklist: [37.10, 41.30],  // the four things it walks you through
  endcard:   [45.18, 53.00],
};
const dur = (k) => +(T[k][1] - T[k][0]).toFixed(3);
/* Extra time the outgoing layer stays mounted past its cut, so its exit
   overlaps the incoming beat's entrance. Only the hero->hero seams need it;
   everywhere else Sean is already back on screen underneath. `prod` is capped
   by its 3.0s source clip. */
const TAIL = { dashboard: 0.34, dashcap: 0.34, cover: 0.34 };
const durT = (k, t) => +(T[k][1] - T[k][0] + TAIL[t || k]).toFixed(3);

const RATIOS = [
  {
    key: '9x16', w: 1080, h: 1920, out: 'index.html',
    id: 'ecomiq-bf-workbook-ad-9x16', aroll: 'assets/aroll/sean-9x16.mp4',
    subSafe: 380, bandTop: 1020, heroTop: 280, fs: 1.0, logoTop: 76,
    dashTop: 580, prodTop: 470, statsTop: 1120, coverW: 0.60, pageW: 0.40,
  },
  {
    key: '4x5', w: 1080, h: 1350, out: 'compositions/ad-4x5.html',
    id: 'ecomiq-bf-workbook-ad-4x5', aroll: 'assets/aroll/sean-4x5.mp4',
    subSafe: 268, bandTop: 700, heroTop: 200, fs: 0.86, logoTop: 60,
    dashTop: 296, prodTop: 236, statsTop: 866, coverW: 0.44, pageW: 0.30,
  },
];

/* ── copy + figures ────────────────────────────────────────────────────────
   Every number is the workbook's own worked example or a benchmark printed in
   it. Nothing here is an EcomIQ performance claim. */
const COST_ROWS = [
  { id: 'r1', label: 'Revenue',         note: 'up',        tone: 'good' },
  { id: 'r2', label: 'Discounts',       note: 'up',        tone: 'bad'  },
  { id: 'r3', label: 'Ad costs',        note: 'up',        tone: 'bad'  },
  { id: 'r4', label: 'Fulfilment fees', note: 'still due', tone: 'bad'  },
  { id: 'r5', label: 'Returns',         note: 'up',        tone: 'bad'  },
];

const STACK = [
  { k: 'Selling price',          v: '$114.70', sign: ''  },
  { k: 'Discounts and refunds',  v: '4%',      sign: '−' },
  { k: 'Landed product cost',    v: '$34.00',  sign: '−' },
  { k: 'Fulfilment per order',   v: '$4.50',   sign: '−' },
  { k: 'Delivery per order',     v: '$8.60',   sign: '−' },
  { k: 'Payment and commission', v: '$3.30',   sign: '−' },
];

const CHECKS = ['Your offer', 'Your inventory', 'Your marketing', 'Your email follow-up'];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const px = (n, r) => Math.round(n * r.fs) + 'px';

/* ── CSS ──────────────────────────────────────────────────────────────────── */
function css(r) {
  const wide = r.key === '9x16';
  return `
@font-face { font-family:'Rethink Sans'; font-style:normal; font-weight:400 800;
  font-display:block; src:url(assets/fonts/RethinkSans.woff2) format('woff2'); }
@font-face { font-family:'Hedvig Letters Serif'; font-style:italic; font-weight:400;
  font-display:block; src:url(assets/fonts/HedvigLettersSerif.woff2) format('woff2'); }

* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:${r.w}px; height:${r.h}px; overflow:hidden; background:var(--brand-navy);
  font-family:'Rethink Sans', system-ui, sans-serif; color:var(--brand-white);
  -webkit-font-smoothing:antialiased; }

:root {
  --fs:${r.fs};
  --band-top:${r.bandTop}px;
  --sub-safe:${r.subSafe}px;
  --hero-top:${r.heroTop}px;
  --gutter:${px(72, r)};
  --band-h:calc(${r.h}px - var(--band-top) - var(--sub-safe));
}

#bg { position:absolute; inset:0; background:var(--brand-navy); }

/* A-roll lives in a NON-timed wrapper so the engine never repositions the
   <video>, and so nothing ever animates the video's own box. */
#aroll-wrap { position:absolute; inset:0; transform-origin:50% 42%; will-change:transform, filter; }
#aroll { position:absolute; inset:0; width:${r.w}px; height:${r.h}px; object-fit:cover; display:block; }

/* Constant navy grade over the footage. The bottom stop also darkens the
   subtitle band, so hand-added subtitles will read cleanly. */
#scrim { position:absolute; inset:0; background:linear-gradient(180deg,
  rgba(6,40,76,.58) 0%, rgba(6,40,76,.10) 24%, rgba(6,40,76,.10) 44%,
  rgba(6,40,76,.90) 80%, rgba(6,40,76,.97) 100%); }
/* Variable cover: 0 on clean-Sean beats, part-way on overlay beats, full on heroes. */
#cover-nav { position:absolute; inset:0; background:var(--brand-navy); opacity:0; }

/* The unifying texture: perspective grid + crosshairs, vignette, grain. */
#grid { position:absolute; inset:-12% -6% -6%; opacity:0;
  transform:perspective(900px) rotateX(58deg) scale(1.5); transform-origin:50% 100%;
  background-image:
    repeating-linear-gradient(0deg, rgba(156,212,255,.16) 0 1px, transparent 1px 84px),
    repeating-linear-gradient(90deg, rgba(156,212,255,.12) 0 1px, transparent 1px 84px);
  mask-image:linear-gradient(180deg, transparent 0%, #000 42%, #000 76%, transparent 100%);
  -webkit-mask-image:linear-gradient(180deg, transparent 0%, #000 42%, #000 76%, transparent 100%); }
#marks { position:absolute; inset:0; opacity:0;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><g stroke='rgb(156,212,255)' stroke-opacity='0.34' stroke-width='1.4'><path d='M90 82v16M82 90h16'/></g></svg>"); }
#vignette { position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(ellipse 78% 62% at 50% 40%, rgba(0,0,0,0) 32%, rgba(2,14,28,.72) 100%); }
/* Deterministic CSS grain — three offset dot tiles, no PNG, no randomness. */
#grain { position:absolute; inset:0; pointer-events:none; opacity:.5; mix-blend-mode:overlay;
  background-image:
    radial-gradient(rgba(255,255,255,.030) .5px, transparent .5px),
    radial-gradient(rgba(255,255,255,.020) .5px, transparent .5px),
    radial-gradient(rgba(0,0,0,.015) .5px, transparent .5px);
  background-size:3px 3px, 5px 5px, 7px 7px;
  background-position:0 0, 1px 2px, 2px 1px; }

/* Logo: positioned, NON-clip wrapper so the engine can never move it. */
#logo-wrap { position:absolute; top:${r.logoTop}px; left:${px(64, r)}; z-index:90; }
#logo { display:block; width:${Math.round(r.w * 0.095)}px; height:auto;
  filter:drop-shadow(0 6px 18px rgba(0,0,0,.55)); }

/* ── shared type ─────────────────────────────────────────────────────────── */
.eyebrow { font-weight:700; font-size:${px(23, r)}; letter-spacing:.30em;
  text-transform:uppercase; color:var(--brand-blue-tint); }
.src { font-weight:500; font-size:${px(19, r)}; letter-spacing:.04em;
  color:rgba(222,238,254,.62); }
.hot { color:var(--brand-flame); }
.tint { color:var(--brand-blue-tint); }
.serif { font-family:'Hedvig Letters Serif', Georgia, serif; font-style:italic; font-weight:400; }
.num { font-variant-numeric:tabular-nums; }

/* Overlay band — between Sean's chest and the reserved subtitle area. */
.band { position:absolute; left:var(--gutter); right:var(--gutter);
  top:var(--band-top); height:var(--band-h); display:flex; flex-direction:column;
  justify-content:flex-end; gap:${px(14, r)}; padding-bottom:${px(26, r)}; }
/* Hero beats take the frame above the subtitle band. */
.hero { position:absolute; left:var(--gutter); right:var(--gutter);
  top:var(--hero-top); bottom:var(--sub-safe); display:flex; flex-direction:column;
  justify-content:center; gap:${px(20, r)}; padding-bottom:${px(26, r)}; }

/* 01 — the stamp */
#stamp { align-items:flex-start; justify-content:flex-end; }
#stamp .rule { width:${px(110, r)}; height:${px(7, r)};
  background:var(--brand-flame); border-radius:99px; transform-origin:left center; }
#stamp .word { font-weight:800; font-size:${px(100, r)}; line-height:.92; letter-spacing:-.035em;
  text-shadow:0 0 34px rgba(255,76,50,.38), 0 10px 40px rgba(0,0,0,.55); }
#stamp .sub { font-weight:500; font-size:${px(30, r)}; color:var(--brand-sky); letter-spacing:-.01em; }

/* 02/05 — the cost stack */
.row { display:flex; align-items:center; gap:${px(18, r)};
  padding:${px(15, r)} ${px(24, r)};
  background:rgba(10,50,95,.62); border:1px solid rgba(156,212,255,.16);
  border-left:${px(5, r)} solid var(--brand-blue-tint); border-radius:${px(13, r)}; }
.row.bad { border-left-color:var(--brand-flame); }
.row .lab { flex:1; font-weight:700; font-size:${px(35, r)}; letter-spacing:-.02em; }
.row .arw { font-weight:800; font-size:${px(31, r)}; color:var(--brand-blue-tint); }
.row.bad .arw { color:var(--brand-flame); }
.row .note { font-weight:600; font-size:${px(21, r)}; letter-spacing:.12em;
  text-transform:uppercase; color:rgba(222,238,254,.70); }
.chip { align-self:flex-start; display:flex; align-items:baseline; gap:${px(14, r)};
  padding:${px(12, r)} ${px(22, r)}; border-radius:${px(10, r)};
  background:rgba(255,76,50,.16); border:1px solid rgba(255,76,50,.46); }
.chip .k { font-weight:700; font-size:${px(21, r)}; letter-spacing:.14em;
  text-transform:uppercase; color:var(--brand-sky); }
.chip .v { font-weight:800; font-size:${px(29, r)}; color:var(--brand-flame); }
#costs .closer { font-weight:600; font-size:${px(26, r)}; color:var(--brand-sky);
  letter-spacing:-.01em; padding-left:${px(6, r)}; }

/* 07 — the two terms, over Sean */
.tcard { padding:${px(21, r)} ${px(24, r)}; border-radius:${px(15, r)};
  background:rgba(10,50,95,.72); border:1px solid rgba(156,212,255,.24); }
.tcard .t { font-weight:800; font-size:${px(31, r)}; letter-spacing:-.02em;
  line-height:1.05; margin-bottom:${px(8, r)}; }
.tcard .d { font-weight:500; font-size:${px(22, r)}; line-height:1.30; color:rgba(222,238,254,.84); }
.tcard .f { margin-top:${px(10, r)}; font-weight:700; font-size:${px(23, r)};
  color:var(--brand-flame); letter-spacing:-.01em; }

/* B-roll videos sit in a branded card. Sources are 1600x1000 (1.6:1). */
.bwrap { position:absolute; left:var(--gutter); right:var(--gutter); aspect-ratio:1.6;
  border-radius:${px(16, r)}; overflow:hidden; transform-origin:50% 50%;
  box-shadow:0 30px 90px -20px rgba(0,0,0,.85), 0 0 0 1px rgba(156,212,255,.20); }
.bwrap video { width:100%; height:100%; object-fit:cover; display:block; }
#dash-wrap { top:${r.dashTop}px; }
#prod-wrap { top:${r.prodTop}px; }
#dashcap { position:absolute; left:var(--gutter); right:var(--gutter);
  top:${r.dashTop + Math.round((r.w - 2 * Math.round(72 * r.fs)) / 1.6) + Math.round(34 * r.fs)}px;
  text-align:center; }
#dashcap .t { font-weight:800; font-size:${px(34, r)}; letter-spacing:-.02em; }
#dashcap .s { margin-top:${px(7, r)}; font-weight:500; font-size:${px(23, r)};
  color:rgba(222,238,254,.80); }

/* 09 — the contrast */
#contrast .pair { display:flex; gap:${px(16, r)}; flex-direction:${wide ? 'column' : 'row'}; }
.side { flex:1; padding:${px(26, r)} ${px(26, r)} ${px(22, r)};
  border-radius:${px(17, r)}; background:rgba(10,50,95,.62); border:1px solid rgba(156,212,255,.22); }
.side.down { background:rgba(255,76,50,.13); border-color:rgba(255,76,50,.44); }
.side .k { font-weight:700; font-size:${px(23, r)}; letter-spacing:.16em;
  text-transform:uppercase; color:var(--brand-blue-tint); }
.side.down .k { color:var(--brand-flame); }
.side .v { font-weight:800; font-size:${px(wide ? 86 : 68, r)}; line-height:1;
  letter-spacing:-.04em; margin-top:${px(8, r)}; text-shadow:0 0 30px rgba(156,212,255,.26); }
.side.down .v { text-shadow:0 0 34px rgba(255,76,50,.40); }
.side .c { margin-top:${px(6, r)}; font-weight:500; font-size:${px(21, r)};
  color:rgba(222,238,254,.78); }
#roas { font-weight:800; font-size:${px(27, r)}; letter-spacing:-.01em; }

/* 11/17 — the cover */
.coverimg { display:block; border-radius:${px(7, r)};
  box-shadow:0 40px 110px -24px rgba(0,0,0,.9), 0 0 0 1px rgba(156,212,255,.20); }
#cover { align-items:center; }
#cover .holder { position:relative; }
#cover .coverimg { width:${Math.round(r.w * r.coverW)}px; }
#cover .glint { position:absolute; inset:0; border-radius:${px(7, r)}; overflow:hidden; }
#cover .glint i { position:absolute; top:-30%; left:-60%; width:38%; height:160%; display:block;
  background:linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.34) 50%, rgba(255,255,255,0) 100%);
  transform:rotate(8deg); }
#cover .freechip { position:absolute; top:${px(-16, r)}; right:${px(-18, r)};
  font-weight:800; font-size:${px(25, r)}; letter-spacing:.14em;
  padding:${px(11, r)} ${px(20, r)}; background:var(--brand-flame); border-radius:999px;
  box-shadow:0 16px 46px -10px rgba(255,76,50,.8); }
#cover .cap { text-align:center; font-weight:600; font-size:${px(27, r)}; color:var(--brand-sky); }

/* 12 — what is inside it */
#stats { position:absolute; left:var(--gutter); right:var(--gutter); top:${r.statsTop}px;
  display:flex; gap:${px(12, r)}; }
.stat { flex:1; text-align:center; padding:${px(16, r)} ${px(8, r)};
  border-radius:${px(13, r)}; background:rgba(10,50,95,.64); border:1px solid rgba(156,212,255,.20); }
.stat .n { font-weight:800; font-size:${px(56, r)}; line-height:1; color:var(--brand-flame);
  letter-spacing:-.03em; text-shadow:0 0 26px rgba(255,76,50,.34); }
.stat .l { margin-top:${px(6, r)}; font-weight:700; font-size:${px(18, r)};
  letter-spacing:.16em; text-transform:uppercase; color:rgba(222,238,254,.80); }

/* 13 — the real worksheet */
#worksheet .top { display:flex; align-items:flex-start; gap:${px(20, r)}; }
#worksheet .pageimg { width:${Math.round(r.w * r.pageW)}px; border-radius:${px(6, r)};
  box-shadow:0 26px 70px -18px rgba(0,0,0,.85), 0 0 0 1px rgba(156,212,255,.20); }
#worksheet .lines { flex:1; display:flex; flex-direction:column; gap:${px(7, r)}; }
.ln { display:flex; align-items:baseline; justify-content:space-between; gap:${px(12, r)};
  padding:${px(8, r)} ${px(13, r)}; border-radius:${px(8, r)};
  background:rgba(10,50,95,.58); border:1px solid rgba(156,212,255,.14); }
.ln .k { font-weight:500; font-size:${px(20, r)}; color:rgba(222,238,254,.88); }
.ln .v { font-weight:800; font-size:${px(24, r)}; letter-spacing:-.01em; }
.ln.total { background:rgba(255,76,50,.17); border-color:rgba(255,76,50,.52); }
.ln.total .k { color:var(--brand-white); font-weight:700; }
.ln.total .v { color:var(--brand-flame); font-size:${px(32, r)};
  text-shadow:0 0 24px rgba(255,76,50,.44); }
#worksheet .maxline { display:flex; align-items:baseline; gap:${px(13, r)}; }
#worksheet .maxline .k { font-weight:700; font-size:${px(22, r)}; letter-spacing:.13em;
  text-transform:uppercase; color:var(--brand-blue-tint); }
#worksheet .maxline .v { font-weight:800; font-size:${px(38, r)}; color:var(--brand-flame);
  letter-spacing:-.02em; }

/* 15 — the checklist */
#checklist .items { display:flex; flex-direction:column; gap:${px(11, r)}; }
.chk { display:flex; align-items:center; gap:${px(17, r)};
  padding:${px(14, r)} ${px(22, r)}; border-radius:${px(13, r)};
  background:rgba(10,50,95,.66); border:1px solid rgba(156,212,255,.20); }
.chk .tick { width:${px(38, r)}; height:${px(38, r)}; flex:none; }
.chk .tick circle { fill:rgba(255,76,50,.16); stroke:var(--brand-flame); stroke-width:2; }
.chk .tick path { fill:none; stroke:var(--brand-flame); stroke-width:3.4; stroke-linecap:round;
  stroke-linejoin:round; stroke-dasharray:30; stroke-dashoffset:30; }
.chk .lab { font-weight:700; font-size:${px(35, r)}; letter-spacing:-.02em; }

/* 17 — completely free */
#free { align-items:center; justify-content:center; text-align:center; }
#free .big { font-weight:800; font-size:${px(wide ? 118 : 96, r)}; line-height:.9;
  letter-spacing:-.045em; text-shadow:0 0 44px rgba(255,76,50,.34), 0 12px 50px rgba(0,0,0,.6); }
#free .cap { font-weight:500; font-size:${px(29, r)}; color:var(--brand-sky); max-width:86%; }
#free .coverimg { width:${Math.round(r.w * 0.24)}px; }

/* 18 — end card */
#endcard { align-items:${wide ? 'flex-start' : 'center'}; justify-content:center;
  text-align:${wide ? 'left' : 'center'}; gap:${px(26, r)}; }
#endcard .lock { width:${Math.round(r.w * 0.34)}px; height:auto;
  margin-bottom:${px(10, r)}; }
#endcard .head { font-weight:800; font-size:${px(wide ? 80 : 62, r)}; line-height:1.02;
  letter-spacing:-.035em; max-width:${wide ? '100%' : '88%'}; }
#endcard .meta { font-weight:600; font-size:${px(24, r)}; color:var(--brand-sky); line-height:1.4; }
#endcard .pill { align-self:${wide ? 'flex-start' : 'center'}; margin-top:${px(12, r)};
  font-weight:800; font-size:${px(36, r)}; color:var(--brand-white); background:var(--brand-flame);
  padding:${px(24, r)} ${px(54, r)}; border-radius:999px;
  box-shadow:0 24px 70px -16px rgba(255,76,50,.75); }
`;
}

/* ── HTML ─────────────────────────────────────────────────────────────────── */
function html(r) {
  const rows = (ids) => ids.map((i) => {
    const c = COST_ROWS[i];
    return `        <div class="row ${c.tone === 'bad' ? 'bad' : ''}" id="${c.id}">
          <span class="lab">${esc(c.label)}</span>
          <span class="note">${esc(c.note)}</span>
          <span class="arw">&#8593;</span>
        </div>`;
  }).join('\n');

  const lines = STACK.map((s, i) => `            <div class="ln" id="ln${i}">
              <span class="k">${esc(s.k)}</span>
              <span class="v num">${esc(s.sign ? s.sign + ' ' + s.v : s.v)}</span>
            </div>`).join('\n');

  const checks = CHECKS.map((c, i) => `          <div class="chk" id="chk${i}">
            <svg class="tick" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18"/><path d="M12 20.5l5.5 5.5L28 15"/></svg>
            <span class="lab">${esc(c)}</span>
          </div>`).join('\n');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${r.w}, height=${r.h}" />
    <title>EcomIQ — Black Friday Profit Plan (${r.key})</title>
    <!-- GSAP vendored locally: a CDN script cert-fails in the render env and freezes the render. -->
    <script src="assets/vendor/gsap.min.js"></script>
    <link rel="stylesheet" href="assets/brand-tokens.css" />
    <style>${css(r)}</style>
  </head>
  <body>
    <!-- GENERATED by scripts/build-compositions.mjs — edit the generator, not this file. -->
    <div id="root" data-composition-id="${r.id}"
         data-start="0" data-duration="${DURATION}" data-width="${r.w}" data-height="${r.h}">

      <div id="bg" class="clip" data-start="0" data-duration="${DURATION}" data-track-index="0"></div>

      <!-- A-roll: muted video in a non-timed wrapper; the VO rides a sibling <audio>. -->
      <div id="aroll-wrap">
        <video id="aroll" data-start="0" data-duration="${AROLL_DUR}" data-track-index="1"
               src="${r.aroll}" muted playsinline></video>
      </div>

      <div id="scrim" class="clip" data-start="0" data-duration="${DURATION}" data-track-index="2"></div>
      <div id="cover-nav" class="clip" data-start="0" data-duration="${DURATION}" data-track-index="3"></div>
      <div id="grid" class="clip" data-start="0" data-duration="${DURATION}" data-track-index="4"></div>
      <div id="marks" class="clip" data-start="0" data-duration="${DURATION}" data-track-index="5"></div>

      <!-- 01 · the stamp lands on the word "unprofitable" -->
      <div id="stamp" class="band clip" data-start="${T.stamp[0]}" data-duration="${dur('stamp')}" data-track-index="10">
        <div class="rule"></div>
        <div class="word">Unprofitable.</div>
        <div class="sub">A record Black Friday can still be one.</div>
      </div>

      <!-- 02 · the cost stack, once, as a summary -->
      <div id="costs" class="band clip" data-start="${T.costs[0]}" data-duration="${dur('costs')}" data-track-index="12">
${rows([1, 2, 3, 4])}
        <div class="closer">All of it out of the same order.</div>
      </div>

      <!-- 08 · the real Profitability Dashboard -->
      <div id="dash-wrap" class="bwrap">
        <video id="dash" data-start="${T.dashboard[0]}" data-duration="${durT('dashboard')}" data-track-index="14"
               src="assets/broll/dashboard.mp4" muted playsinline></video>
      </div>
      <div id="dashcap" class="clip" data-start="${T.dashboard[0]}" data-duration="${durT('dashboard', 'dashcap')}" data-track-index="15">
        <div class="t">The Profitability Dashboard</div>
        <div class="s">One of the companion sheets. It runs the calculation for you.</div>
      </div>

      <!-- 09 · selling more, making less -->
      <div id="contrast" class="hero clip" data-start="${T.contrast[0]}" data-duration="${dur('contrast')}" data-track-index="16">
        <div class="pair">
          <div class="side" id="sideA">
            <div class="k">Selling more</div>
            <div class="v num" id="units">1.00&times;</div>
            <div class="c">the unit volume, just to stand still</div>
          </div>
          <div class="side down" id="sideB">
            <div class="k">Making less</div>
            <div class="v num" id="contrib">$59.71</div>
            <div class="c">contribution per order</div>
          </div>
        </div>
        <div id="roas" class="num">Breakeven ROAS <span class="tint">1.92</span> <span class="hot">&rarr; 2.61</span></div>
        <div class="src">The workbook&rsquo;s worked example, at 25% off</div>
      </div>

      <!-- 11 · the workbook lands -->
      <div id="cover" class="hero clip" data-start="${T.cover[0]}" data-duration="${durT('cover')}" data-track-index="17">
        <div class="holder">
          <img class="coverimg" src="assets/pages/cover.png" alt="The Black Friday Profit Plan" />
          <div class="glint"><i></i></div>
          <div class="freechip">FREE</div>
        </div>
        <div class="cap">The Black Friday Profit Plan</div>
      </div>

      <!-- 13 · the real contribution-margin worksheet -->
      <div id="worksheet" class="hero clip" data-start="${T.worksheet[0]}" data-duration="${dur('worksheet')}" data-track-index="20">
        <div class="eyebrow">What each order actually contributes</div>
        <div class="top">
          <img class="pageimg" src="assets/pages/page8.png" alt="Calculate your contribution margin" />
          <div class="lines">
${lines}
            <div class="ln total" id="lnT">
              <span class="k">Contribution per order</span>
              <span class="v num">$59.71 &middot; 52.1%</span>
            </div>
          </div>
        </div>
        <div class="maxline">
          <span class="k">Max discount it supports</span>
          <span class="v num">25%</span>
        </div>
      </div>

      <!-- 15 · then it walks you through -->
      <div id="checklist" class="band clip" data-start="${T.checklist[0]}" data-duration="${dur('checklist')}" data-track-index="21">
        <div class="items">
${checks}
        </div>
      </div>

      <!-- 18 · end card -->
      <div id="endcard" class="hero clip" data-start="${T.endcard[0]}" data-duration="${dur('endcard')}" data-track-index="23">
        <img class="lock" src="assets/ecomiq-lockup-white.png" alt="EcomIQ" />
        <div class="head">Get your free Black Friday workbook</div>
        <div class="meta">8 parts &middot; 32 worksheets &middot; 19 free tools &middot; 2026 edition</div>
        <div class="pill">Sign up free</div>
      </div>

      <div id="vignette" class="clip" data-start="0" data-duration="${DURATION}" data-track-index="6"></div>
      <div id="grain" class="clip" data-start="0" data-duration="${DURATION}" data-track-index="7"></div>

      <!-- Logo sits in a positioned, NON-clip wrapper so it never drifts. -->
      <div id="logo-wrap"><img id="logo" src="assets/ecomiq-logo-white.png" alt="EcomIQ" /></div>

      <audio id="vo" data-start="0" data-duration="${VO_DUR}" data-track-index="30"
             src="assets/aroll/sean-vo.m4a" data-volume="1"></audio>
      <!-- Duckable music-bed slot: silent placeholder. See assets/music/README.md -->
      <audio id="music" data-start="0" data-duration="${DURATION}" data-track-index="31"
             src="assets/music/music-bed.m4a" data-volume="0.14"></audio>
    </div>

    <script>${js(r)}</script>
  </body>
</html>
`;
}

/* ── timeline ─────────────────────────────────────────────────────────────── */
function js(r) {
  const K = r.key;
  const A = (n) => +n.toFixed(3);
  return `
window.__timelines = window.__timelines || {};
(() => {
  const tl = gsap.timeline({ paused: true });
  const F = 1 / 30;
  const snap = (t) => Math.round(t / F) * F;   // keep every cue on a frame boundary

  /* Counts a number up in place. Deterministic: the displayed value is a pure
     function of the timeline position, so seeking to any frame re-derives the
     same digits. The trailing hold keeps the final value written for the rest
     of the clip's window. */
  const countTo = (sel, from, to, at, d, fmt, holdUntil) => {
    const write = (o) => { const el = document.querySelector(sel); if (el) el.textContent = fmt(o.v); };
    const o = { v: from };
    tl.to(o, { v: to, duration: d, ease: 'power2.out', onUpdate: () => write(o) }, snap(at));
    if (holdUntil > at + d) {
      const h = { v: to };
      tl.to(h, { v: to, duration: holdUntil - (at + d), ease: 'none', onUpdate: () => write(h) }, snap(at + d));
    }
  };
  const money = (v) => '$' + v.toFixed(2);
  const mult  = (v) => v.toFixed(2) + '\\u00d7';
  const whole = (v) => String(Math.round(v));

  /* ── the bed ───────────────────────────────────────────────────────────
     Sean is the spine. "Cutting to a graphic" is the navy cover coming up and
     the footage pushing back — he stays under the overlay beats and is only
     fully replaced on the hero beats. */
  const bed = (t, s) => {
    tl.to('#aroll-wrap', { scale: s.scale, filter: 'blur(' + s.blur + 'px)',
      duration: 0.46, ease: 'power2.out' }, snap(t));
    tl.to('#cover-nav', { opacity: s.nav, duration: 0.34, ease: 'power2.inOut' }, snap(t));
  };
  // Push IN, never out: scaling the footage below 1.0 exposes the frame edge.
  const CLEAN   = { scale: 1.000, blur: 0,   nav: 0.00 };
  const OVERLAY = { scale: 1.040, blur: 1.6, nav: 0.36 };
  const HERO    = { scale: 1.090, blur: 9,   nav: 1.00 };

  tl.set('#cover-nav', { opacity: 0 }, 0);
  bed(0.00,  CLEAN);
  bed(10.55, OVERLAY);   // the cost stack
  bed(15.10, CLEAN);
  bed(19.40, HERO);      // dashboard -> contrast, one continuous hero run
  bed(25.34, CLEAN);
  bed(26.60, HERO);      // the workbook
  bed(29.30, CLEAN);
  bed(32.40, HERO);      // the count-up
  bed(36.05, CLEAN);
  bed(36.95, OVERLAY);   // the checklist
  bed(41.20, CLEAN);
  bed(45.05, HERO);      // end card

  /* ── texture ───────────────────────────────────────────────────────────
     Grid + crosshairs only come up on the graphic beats, so Sean's footage
     still reads as footage. */
  const tex = (t, o) => {
    tl.to('#grid',  { opacity: o,        duration: 0.5, ease: 'sine.out' }, snap(t));
    tl.to('#marks', { opacity: o * 0.70, duration: 0.5, ease: 'sine.out' }, snap(t));
  };
  tl.set('#grid', { opacity: 0 }, 0);
  tl.set('#marks', { opacity: 0 }, 0);
  tex(10.55, 0.40); tex(15.10, 0.08); tex(19.40, 0.88); tex(25.34, 0.10);
  tex(26.60, 0.88); tex(29.30, 0.10); tex(32.40, 0.88); tex(36.05, 0.10);
  tex(36.95, 0.40); tex(41.20, 0.10); tex(45.05, 0.88);
  // Camera never sleeps: the grid parallaxes across the whole piece.
  tl.fromTo('#grid', { backgroundPositionY: '0px' },
    { backgroundPositionY: '168px', duration: ${DURATION}, ease: 'none' }, 0);
  // Vignette breath — finite repeat count, never -1.
  tl.to('#vignette', { opacity: 0.86, duration: 4.4, ease: 'sine.inOut',
    yoyo: true, repeat: Math.max(0, Math.floor(${DURATION} / 8.8) - 1) }, 0);

  tl.fromTo('#logo-wrap', { opacity: 0, y: -18 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.20);

  /* Beat handover: the incoming layer rises out of blur, the outgoing one
     rides up into it. Velocity-matched, so no seam is ever a hard cut. */
  const enterUp = (sel, at, d = 0.62, y = 86) =>
    tl.fromTo(sel, { y: y, opacity: 0, filter: 'blur(22px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: d, ease: 'power3.out' }, snap(at));
  const exitUp = (sel, at, d = 0.22) =>
    tl.to(sel, { y: -70, opacity: 0, filter: 'blur(24px)', duration: d, ease: 'power2.in' }, snap(at));

  /* ── 01 · the stamp ───────────────────────────────────────────────────── */
  tl.fromTo('#stamp .rule', { scaleX: 0 }, { scaleX: 1, duration: 0.42, ease: 'expo.out' }, ${T.stamp[0]});
  tl.fromTo('#stamp .word', { y: 52, opacity: 0, scale: 0.90, filter: 'blur(20px)' },
    { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.60, ease: 'expo.out' }, ${A(T.stamp[0] + 0.06)});
  tl.fromTo('#stamp .sub', { y: 26, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.46, ease: 'power2.out' }, ${A(T.stamp[0] + 0.34)});
  exitUp('#stamp', ${A(T.stamp[1] - 0.22)});

  /* ── 02 · the cost stack. One beat, landing as a summary rather than a
     slow build, so it reads as emphasis and hands the frame straight back. ── */
  enterUp('#r2', 10.85, 0.48);
  enterUp('#r3', 11.80, 0.48);
  enterUp('#r4', 12.75, 0.48);
  enterUp('#r5', 13.70, 0.48);
  tl.fromTo('#costs .closer', { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.40, ease: 'power2.out' }, 14.35);
  exitUp('#costs', ${A(T.costs[1] - 0.22)});

  /* ── 08 · the real Profitability Dashboard ────────────────────────────── */
  tl.fromTo('#dash-wrap', { y: 90, opacity: 0, scale: 0.93, filter: 'blur(22px)' },
    { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.48, ease: 'power3.out' }, ${T.dashboard[0]});
  // Slow push starts only after the entrance lands, so scale is never double-driven.
  tl.to('#dash-wrap', { scale: 1.035, duration: ${A(dur('dashboard') - 0.56)}, ease: 'none' }, ${A(T.dashboard[0] + 0.56)});
  tl.fromTo('#dashcap', { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.46, ease: 'power2.out' }, ${A(T.dashboard[0] + 0.55)});
  tl.to('#dash-wrap', { opacity: 0, y: -60, filter: 'blur(24px)', duration: 0.30, ease: 'power2.in' }, ${T.dashboard[1]});
  exitUp('#dashcap', ${T.dashboard[1]}, 0.30);

  /* ── 09 · selling more, making less ───────────────────────────────────── */
  tl.fromTo('#sideA', { y: 70, opacity: 0, filter: 'blur(24px)' },
    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.52, ease: 'expo.out' }, ${A(T.contrast[0] + 0.08)});
  countTo('#units', 1.00, 1.81, ${A(T.contrast[0] + 0.30)}, 1.05, mult, ${A(T.contrast[1] - 0.22)});
  tl.fromTo('#sideB', { y: 70, opacity: 0, filter: 'blur(24px)' },
    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.52, ease: 'expo.out' }, ${A(T.contrast[0] + 1.05)});
  countTo('#contrib', 59.71, 33.00, ${A(T.contrast[0] + 1.60)}, 1.20, money, ${A(T.contrast[1] - 0.22)});
  tl.fromTo('#roas', { opacity: 0, scale: 0.90 },
    { opacity: 1, scale: 1, duration: 0.40, ease: 'back.out(1.6)' }, ${A(T.contrast[0] + 2.30)});
  tl.fromTo('#contrast .src', { opacity: 0 },
    { opacity: 1, duration: 0.34, ease: 'sine.out' }, ${A(T.contrast[0] + 2.55)});
  exitUp('#contrast', ${A(T.contrast[1] - 0.22)});

  /* ── 11 · the workbook lands ──────────────────────────────────────────── */
  tl.fromTo('#cover .holder', { y: 150, scale: 0.72, opacity: 0, filter: 'blur(26px)' },
    { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.70, ease: 'expo.out' }, ${A(T.cover[0] + 0.02)});
  tl.fromTo('#cover .cap', { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out' }, ${A(T.cover[0] + 1.00)});
  tl.fromTo('#cover .glint i', { xPercent: 0 },
    { xPercent: 420, duration: 0.70, ease: 'power2.inOut' }, ${A(T.cover[0] + 1.15)});
  tl.fromTo('#cover .freechip', { scale: 0, rotate: -14 },
    { scale: 1, rotate: -6, duration: 0.46, ease: 'back.out(2.2)' }, ${A(T.cover[0] + 1.75)});
  exitUp('#cover', ${T.cover[1]}, 0.30);

  /* ── 13 · the real worksheet fills in on the beat ─────────────────────── */
  tl.fromTo('#worksheet .eyebrow', { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.40, ease: 'power2.out' }, ${A(T.worksheet[0] + 0.06)});
  tl.fromTo('#worksheet .pageimg', { x: -70, opacity: 0, filter: 'blur(22px)' },
    { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.54, ease: 'expo.out' }, ${A(T.worksheet[0] + 0.04)});
  [0, 1, 2, 3, 4, 5].forEach((i) => {
    tl.fromTo('#ln' + i, { x: 48, opacity: 0, filter: 'blur(12px)' },
      { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.34, ease: 'power3.out' },
      snap(${A(T.worksheet[0] + 0.18)} + i * 0.30));
  });
  tl.fromTo('#lnT', { x: 48, opacity: 0, scale: 0.94, filter: 'blur(16px)' },
    { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.48, ease: 'back.out(1.5)' }, ${A(T.worksheet[0] + 2.00)});
  tl.fromTo('#worksheet .maxline', { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out' }, ${A(T.worksheet[0] + 2.50)});
  exitUp('#worksheet', ${A(T.worksheet[1] - 0.22)});

  /* ── 15 · offer, inventory, marketing, follow-up ──────────────────────── */
  [0, 1, 2, 3].forEach((i) => {
    const at = snap(${A(T.checklist[0] + 0.20)} + i * 0.90);
    tl.fromTo('#chk' + i, { x: -56, opacity: 0, filter: 'blur(16px)' },
      { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.46, ease: 'expo.out' }, at);
    tl.fromTo('#chk' + i + ' .tick path', { strokeDashoffset: 30 },
      { strokeDashoffset: 0, duration: 0.34, ease: 'power2.out' }, at + 0.20);
  });
  exitUp('#checklist', ${A(T.checklist[1] - 0.22)});

  /* ── 18 · end card. Audio ends at 49.13; the card holds to ${DURATION}. ─── */
  tl.fromTo('#endcard .lock', { opacity: 0, y: -26, filter: 'blur(14px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.36, ease: 'power3.out' }, ${A(T.endcard[0] + 0.02)});
  tl.fromTo('#endcard .head', { opacity: 0, y: 46, filter: 'blur(20px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.62, ease: 'expo.out' }, ${A(T.endcard[0] + 0.30)});
  tl.fromTo('#endcard .meta', { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.48, ease: 'power2.out' }, ${A(T.endcard[0] + 0.66)});
  tl.fromTo('#endcard .pill', { opacity: 0, scale: 0.80 },
    { opacity: 1, scale: 1, duration: 0.52, ease: 'back.out(1.7)' }, ${A(T.endcard[0] + 1.22)});
  tl.to('#endcard .pill', { scale: 1.035, duration: 1.05, ease: 'sine.inOut',
    yoyo: true, repeat: 2 }, ${A(T.endcard[0] + 2.30)});

  // Duration anchor: keeps the composition alive for its whole slot.
  tl.to({}, { duration: ${DURATION} }, 0);
  window.__timelines['${r.id}'] = tl;
})();
`;
}

fs.mkdirSync(path.join(ROOT, 'compositions'), { recursive: true });
for (const r of RATIOS) {
  fs.writeFileSync(path.join(ROOT, r.out), html(r));
  console.log('wrote', r.out, `(${r.w}x${r.h}, ${DURATION}s)`);
}
