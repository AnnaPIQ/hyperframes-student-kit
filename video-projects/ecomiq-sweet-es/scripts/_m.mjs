import { chromium } from 'playwright';
import { createServer } from 'node:http'; import { readFile } from 'node:fs/promises';
import { globSync, statSync } from 'node:fs'; import { extname, join, resolve } from 'node:path';
const ROOT=resolve('.');const T={'.html':'text/html','.js':'text/javascript','.css':'text/css','.mp4':'video/mp4','.m4a':'audio/mp4','.woff2':'font/woff2','.svg':'image/svg+xml','.png':'image/png'};
const sv=createServer(async(rq,rs)=>{try{const p=join(ROOT,decodeURIComponent(rq.url.split('?')[0]));const b=await readFile(p);rs.writeHead(200,{'Content-Type':T[extname(p)]||'application/octet-stream'});rs.end(b);}catch{rs.writeHead(404).end('x')}});
await new Promise(r=>sv.listen(0,'127.0.0.1',r));
const C=globSync('/root/.cache/hyperframes/chrome/**/chrome-headless-shell').filter(p=>{try{return statSync(p).isFile()}catch{return false}})[0];
const b=await chromium.launch({executablePath:C}); const pg=await b.newPage({viewport:{width:1080,height:1920}});
await pg.goto(`http://127.0.0.1:${sv.address().port}/index.html`,{waitUntil:'domcontentloaded'});
await pg.waitForFunction(()=>!!(window.__timelines&&window.__timelines['ecomiq-sweet-es']));
await pg.evaluate(()=>window.__timelines['ecomiq-sweet-es'].time(34.2,false));
console.log(await pg.evaluate(()=>{
  const r=s=>{const e=document.querySelector(s);const b=e.getBoundingClientRect();
    return {x:Math.round(b.x),w:Math.round(b.width),right:Math.round(b.right)};};
  const b1=r('#eBar1'), b3=r('#eBar3');
  // rendered width ignores scaleX transform, so read the layout width
  const lay=s=>document.querySelector(s).offsetWidth;
  return {bar1_layout:lay('#eBar1'), bar3_layout:lay('#eBar3'),
    ratio:+(lay('#eBar3')/lay('#eBar1')).toFixed(3),
    bar1_left:b1.x, bar3_left:b3.x, bar3_right:b3.right,
    row2_right:Math.round(document.querySelector('#eRow2').getBoundingClientRect().right)};
}));
// deepest content bottom across every card, to prove the subtitle zone is clear
const worst = await pg.evaluate(async () => {
  const tlx = window.__timelines['ecomiq-sweet-es']; const out=[];
  for (const [id, t] of [['cardA',9.6],['cardB',15.0],['cardC',23.6],['cardD',28.6],['cardE',34.2],['endCard',43.0]]) {
    tlx.time(t,false);
    let max=0, who='';
    document.querySelectorAll('#'+id+' .inner *').forEach(e=>{
      const b=e.getBoundingClientRect();
      if (b.height && b.bottom>max) { max=b.bottom; who=e.id||e.className; }
    });
    out.push({card:id, deepest:Math.round(max), el:who, clearsZone:max<1344});
  }
  return out;
});
console.log(worst);
await b.close(); sv.close();
