import { chromium } from 'playwright';
const [file, H] = [process.argv[2], Number(process.argv[3])];
const b = await chromium.launch({ executablePath: process.env.CH });
const p = await b.newPage({ viewport: { width: 1080, height: H } });
await p.goto('file://' + (await import('path')).resolve(file));
await p.waitForTimeout(2500);                       // fonts + GSAP settle
const rows = await p.evaluate((H) => {
  const out = [];
  for (const beat of document.querySelectorAll('.layer')) {
    const id = beat.id; if (!id || !beat.querySelector('.beat')) continue;
    // Include EVERY descendant: SVGs here use overflow:visible and can spill
    // below the text box, which a rect on .beat alone would miss.
    let lo = -Infinity, hi = Infinity;
    for (const el of beat.querySelectorAll('.beat, .beat *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      lo = Math.max(lo, r.bottom); hi = Math.min(hi, r.top);
    }
    out.push({ id, lowestFromBottom: Math.round(H - lo), topFromBottom: Math.round(H - hi) });
  }
  return out;
}, H);
await b.close();
rows.sort((a, c) => a.lowestFromBottom - c.lowestFromBottom);
console.log('beat'.padEnd(10), 'lowest px from bottom'.padStart(22), 'top px from bottom'.padStart(20));
for (const r of rows) console.log(r.id.padEnd(10), String(r.lowestFromBottom).padStart(22), String(r.topFromBottom).padStart(20));
console.log('\nWORST (lowest-reaching):', rows[0].id, '=', rows[0].lowestFromBottom, 'px');
console.log('TALLEST top edge:', Math.max(...rows.map(r => r.topFromBottom)), 'px from bottom');
