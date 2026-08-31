/* ---------------------------------------------------------------------------
 * scrub.mjs — cheap layout check. Loads a composition in Chromium, seeks its
 * GSAP timeline to each timestamp and screenshots the frame. Far faster than a
 * render for checking type, spacing, overflow and the subtitle-safe zone.
 *
 *   node scripts/scrub.mjs <html> <composition-id> <w> <h> <t,t,t…>
 *   node scripts/scrub.mjs index.html ecomiq-sweet-es 1080 1920 7.9,12.2,26.4
 *
 * Writes renders/scrub/t<t>.png. Pass --safe to overlay the bottom-30%
 * subtitle zone and a 10% safe-area inset. Pass --measure to also assert the
 * card-E bar ratio and that no card's content enters the subtitle zone.
 *
 * NOTE: Playwright reports <video> frames unreliably under a static seek —
 * treat footage frames here as indicative only and verify b-roll from a draft
 * render.
 * ------------------------------------------------------------------------- */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { globSync, statSync } from 'node:fs';

const [html, compId, w, h, times] = process.argv.slice(2);
if (!times) { console.error('usage: scrub.mjs <html> <comp-id> <w> <h> <t,t,…> [--safe]'); process.exit(1); }
const SAFE = process.argv.includes('--safe');
const MEASURE = process.argv.includes('--measure');
const ROOT = resolve('.');
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.mp4':'video/mp4',
  '.m4a':'audio/mp4', '.woff2':'font/woff2', '.svg':'image/svg+xml', '.png':'image/png', '.json':'application/json' };

const server = createServer(async (req, res) => {
  try {
    const p = join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    const body = await readFile(p);
    const type = TYPES[extname(p)] || 'application/octet-stream';
    /* Media needs real HTTP Range support or the element never becomes ready. */
    const range = req.headers.range;
    if (range) {
      const m = /bytes=(\d*)-(\d*)/.exec(range) || [];
      const start = m[1] ? +m[1] : 0;
      const end = m[2] ? +m[2] : body.length - 1;
      res.writeHead(206, { 'Content-Type': type, 'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${start}-${end}/${body.length}`,
        'Content-Length': end - start + 1 });
      return res.end(body.subarray(start, end + 1));
    }
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes',
      'Content-Length': body.length });
    res.end(body);
  } catch { res.writeHead(404).end('nope'); }
});

await new Promise(r => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

await mkdir('renders/scrub', { recursive: true });
/* Playwright's own download is absent in this container; reuse the Chrome
   headless shell that Hyperframes already ensures. CHROME_PATH overrides. */
const CHROME = process.env.CHROME_PATH || (() => {
  const g = globSync('/root/.cache/hyperframes/chrome/**/chrome-headless-shell')
    .filter(p => { try { return statSync(p).isFile(); } catch { return false; } });
  if (!g.length) throw new Error('no chrome-headless-shell found; set CHROME_PATH');
  return g[0];
})();
const browser = await chromium.launch({ executablePath: CHROME,
  args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.error('  page error:', e.message));
page.on('console', m => { if (m.type() === 'error') console.error('  console:', m.text()); });
await page.goto(`http://127.0.0.1:${port}/${html}`, { waitUntil: 'domcontentloaded' });
/* Must return a BOOLEAN: returning the GSAP timeline itself makes Playwright
   try to serialise a circular object and the wait never resolves. */
await page.waitForFunction(id => !!(window.__timelines && window.__timelines[id]), compId, { timeout: 20000 });
await page.evaluate(() => document.fonts.ready);

if (SAFE) await page.evaluate(() => {
  const d = document.createElement('div');
  d.style.cssText = 'position:absolute;inset:0;z-index:99999;pointer-events:none';
  d.innerHTML = '<div style="position:absolute;left:0;right:0;top:70%;bottom:0;background:rgba(255,0,0,.16);'
    + 'border-top:2px solid red"></div><div style="position:absolute;inset:10% 10%;border:2px dashed rgba(0,255,0,.5)"></div>';
  document.body.appendChild(d);
});

/* The engine gates class="clip" elements by data-start/data-duration at
   runtime; a static seek of the GSAP timeline does not re-run that gating, so
   cards would scrub as an empty background. Reproduce the gating ourselves. */
async function gate(t) {
  await page.evaluate(tt => {
    document.querySelectorAll('.clip[data-start]').forEach(el => {
      const s = parseFloat(el.dataset.start || '0');
      const d = parseFloat(el.dataset.duration || '0');
      const on = tt >= s && tt < s + d;
      el.style.setProperty('display', on ? '' : 'none', 'important');
      if (on && el.style.visibility === 'hidden') el.style.visibility = 'visible';
    });
  }, t);
}

/* .time()/.duration() must be called in a BLOCK body or with a scalar
   return: returning the timeline itself hangs Playwright on a circular object. */
const dur = await page.evaluate(id => window.__timelines[id].duration(), compId);
console.log(`timeline duration ${dur.toFixed(2)}s`);
for (const t of times.split(',').map(Number)) {
  await page.evaluate(([id, tt]) => { window.__timelines[id].time(tt, false); }, [compId, t]);
  await gate(t);
  await page.waitForTimeout(140);
  const out = `renders/scrub/t${t}.png`;
  await page.screenshot({ path: out });
  console.log(`  ✓ ${out}`);
}
if (process.argv.includes('--probe')) {
  for (const t of [17.40, 17.55, 17.72, 17.90, 18.05]) {
    await page.evaluate(([i, tt]) => { window.__timelines[i].time(tt, false); }, [compId, t]);
    const r = await page.evaluate(() => {
      const c = s => { const e = document.querySelector(s); const st = getComputedStyle(e);
        return { transform: st.transform, filter: st.filter, opacity: st.opacity }; };
      return { cupcake: c('#w-s7'), sean: c('#w-s8') };
    });
    console.log(`  t=${t}`, JSON.stringify(r));
  }
}

if (process.argv.includes('--figures')) {
  /* Every on-screen figure must read its real value at EVERY frame — a
     counter that passes through "+110%" is a factual error on screen. */
  console.log('  on-screen figures across each card:');
  let bad = 0;
  for (let t = 7.40; t <= 35.0; t += 0.10) {
    await page.evaluate(([i, tt]) => { window.__timelines[i].time(tt, false); }, [compId, +t.toFixed(2)]);
    const vals = await page.evaluate(() => ({
      a: (document.querySelector('#aFig').textContent || '').trim(),
      d: ['#dV1','#dV2','#dV3'].map(s => (document.querySelector(s).textContent || '').trim()).join(' '),
    }));
    const okA = ['10,000', '20,000'].includes(vals.a);
    const okD = vals.d === '7× +115% +15%';
    if (!okA || !okD) { bad++; console.log(`    ✗ t=${t.toFixed(2)} aFig="${vals.a}" d="${vals.d}"`); }
  }
  console.log(bad === 0 ? '    ✓ no frame shows a value other than the real figures'
                        : `    ✗ ${bad} sample(s) showed a wrong figure`);
}

if (MEASURE) {
  /* offsetWidth is the layout width, unaffected by GSAP's scaleX. */
  await page.evaluate(id => { window.__timelines[id].time(34.2, false); }, compId);
  await gate(34.2);
  const bars = await page.evaluate(() => {
    const w = s => document.querySelector(s).offsetWidth;
    return { bar1: w('#eBar1'), bar3: w('#eBar3'), ratio: +(w('#eBar3') / w('#eBar1')).toFixed(3) };
  });
  console.log(`\n  card E bar ratio: ${bars.bar3}/${bars.bar1} = ${bars.ratio}`
    + (bars.ratio === 3 ? '  ✓ true 3:1' : '  ✗ NOT the real ratio'));

  const CHECK = [['cardA',9.6],['cardB',15.0],['cardD',28.6],['cardE',34.2],['endCard',43.0]];
  console.log('  subtitle zone (content must stay above y=1344):');
  for (const [id, t] of CHECK) {
    await page.evaluate(([i, tt]) => { window.__timelines[i].time(tt, false); }, [compId, t]);
    await gate(t);
    const r = await page.evaluate(cid => {
      let max = 0, who = '';
      document.querySelectorAll('#' + cid + ' .inner *').forEach(e => {
        const b = e.getBoundingClientRect();
        if (b.height > 0 && b.bottom > max) { max = b.bottom; who = e.id || e.className; }
      });
      return { deepest: Math.round(max), who };
    }, id);
    console.log(`    ${id.padEnd(9)} deepest ${String(r.deepest).padStart(4)}px (${r.who})`
      + (r.deepest < 1344 ? '  ✓' : '  ✗ ENTERS ZONE'));
  }
}

await browser.close(); server.close();
