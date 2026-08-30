/* ---------------------------------------------------------------------------
 * fit-logo-viewbox.mjs — tighten a logo SVG's viewBox to its artwork.
 *
 *   node scripts/fit-logo-viewbox.mjs assets/logos/*.svg
 *
 * Brand SVGs are often exported on a big square canvas, so `object-fit:
 * contain` fits the empty canvas and the mark renders tiny. This measures the
 * real ink bounds in Chrome (getBBox) and rewrites viewBox/width/height to
 * match, with a small even margin.
 *
 * This only CROPS whitespace — no path, colour or proportion is altered, so the
 * mark is still the brand's own file, unmodified.
 * ------------------------------------------------------------------------- */
import { chromium } from 'playwright';
import { globSync, statSync, readFileSync, writeFileSync } from 'node:fs';
const CHROME = globSync('/root/.cache/hyperframes/chrome/**/chrome-headless-shell')
  .filter(p => { try { return statSync(p).isFile(); } catch { return false; } })[0];
const files = process.argv.slice(2);
if (!files.length) { console.error('usage: fit-logo-viewbox.mjs <svg…>'); process.exit(1); }

const b = await chromium.launch({ executablePath: CHROME });
const pg = await b.newPage({ viewport: { width: 1200, height: 1200 } });
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  await pg.setContent(`<body style="margin:0">${src}</body>`);
  const box = await pg.evaluate(() => {
    const svg = document.querySelector('svg');
    const all = svg.getBBox();
    const area = all.width * all.height;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    svg.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line,text,image').forEach(el => {
      let bb; try { bb = el.getBBox(); } catch { return; }
      if (!(bb.width > 0 && bb.height > 0)) return;
      /* Skip a white full-canvas backing plate: it is not part of the mark and
         it makes the ink bounds look square. Anything smaller is kept, even if
         white, because white is often part of the artwork. */
      const fill = getComputedStyle(el).fill.replace(/\s/g, '');
      const isWhite = /^(rgb\(255,255,255\)|#fff|#ffffff|white)$/i.test(fill);
      if (isWhite && bb.width * bb.height > area * 0.9) return;
      x0 = Math.min(x0, bb.x); y0 = Math.min(y0, bb.y);
      x1 = Math.max(x1, bb.x + bb.width); y1 = Math.max(y1, bb.y + bb.height);
    });
    if (!isFinite(x0)) return { x: all.x, y: all.y, w: all.width, h: all.height };
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  });
  if (!(box.w > 0 && box.h > 0)) { console.log(`  ! ${f}: no measurable bbox, left alone`); continue; }
  const pad = Math.max(box.w, box.h) * 0.02;
  const vb = [box.x - pad, box.y - pad, box.w + pad * 2, box.h + pad * 2].map(n => +n.toFixed(2));
  let out = src.replace(/viewBox="[^"]*"/, `viewBox="${vb.join(' ')}"`);
  if (!/viewBox=/.test(out)) out = out.replace('<svg', `<svg viewBox="${vb.join(' ')}"`);
  out = out.replace(/\s(width|height)="[^"]*"/g, '')
           .replace('<svg', `<svg width="${vb[2].toFixed(0)}" height="${vb[3].toFixed(0)}"`);
  writeFileSync(f, out);
  console.log(`  ✓ ${f}  ink ${box.w.toFixed(0)}x${box.h.toFixed(0)} -> viewBox ${vb.join(' ')}`);
}
await b.close();
