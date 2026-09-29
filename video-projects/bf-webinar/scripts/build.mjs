// Build every variant from one template (src/ad.template.html).
//   node scripts/build.mjs
//
// Preview comps (full composition, A-roll included — open in Studio):
//   index.html                 9:16 1080x1920  [project root]
//   .build-4x5/index.html      4:5  1080x1350
// Graphics layers (A-roll stripped, transparent page — rendered to ProRes 4444 alpha by
// scripts/finish.sh, then composited over the untouched HLG A-roll with an exact
// SDR->HLG LUT, because the engine's own HDR compositor shifts brand colours):
//   .build-layer-9x16/index.html        .build-layer-9x16-2x/index.html   (2160x3840 hi-res)
//   .build-layer-4x5/index.html         .build-layer-4x5-2x/index.html    (2160x2700 hi-res)
// 2x layers zoom the same 1x layout (#canvas { zoom: 2 }) and use assets/footage-2x/.
// The CLI allows exactly one root composition per project folder, so each variant is its
// own generated (gitignored) project with hard-linked assets.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tpl = readFileSync(join(root, "src/ad.template.html"), "utf8");
const FORMATS = {
  "9x16": { FMT: "9x16", W: 1080, H: 1920, CLS: "f9x16" },
  "4x5": { FMT: "4x5", W: 1080, H: 1350, CLS: "f4x5" },
};

const render = (f, layer) => {
  let html = layer ? tpl.replace(/<!--AROLL-->[\s\S]*?<!--\/AROLL-->/g, "") : tpl.replace(/<!--\/?AROLL-->/g, "");
  const z = f.ZOOM || 1;
  const vars = { ZOOM: 1, FOOT: "footage", ...f, CW: f.W * z, CH: f.H * z, PAGE_BG: layer ? "transparent" : "var(--brand-black)" };
  return html.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (!(k in vars)) throw new Error(`unknown token {{${k}}}`);
    return String(vars[k]);
  });
};

const sibling = (dir, f, id, layer) => {
  const b = join(root, dir);
  rmSync(b, { recursive: true, force: true });
  mkdirSync(b, { recursive: true });
  execSync(`cp -al "${join(root, "assets")}" "${join(b, "assets")}"`);
  cpSync(join(root, "hyperframes.json"), join(b, "hyperframes.json"));
  const meta = JSON.parse(readFileSync(join(root, "meta.json"), "utf8"));
  const z = f.ZOOM || 1;
  writeFileSync(join(b, "meta.json"), JSON.stringify({ ...meta, id, name: id, width: f.W * z, height: f.H * z }, null, 2));
  writeFileSync(join(b, "index.html"), render({ ...f, ID: id }, layer));
  console.log(`wrote ${dir}/index.html (${f.W * z}x${f.H * z}${layer ? ", graphics layer" : ""})`);
};

writeFileSync(join(root, "index.html"), render({ ...FORMATS["9x16"], ID: "bf-webinar-9x16" }, false));
console.log("wrote index.html (1080x1920)");
sibling(".build-4x5", FORMATS["4x5"], "bf-webinar-4x5", false);
sibling(".build-layer-9x16", FORMATS["9x16"], "bf-webinar-layer-9x16", true);
sibling(".build-layer-4x5", FORMATS["4x5"], "bf-webinar-layer-4x5", true);
const HI = { ZOOM: 2, FOOT: "footage-2x" };
sibling(".build-layer-9x16-2x", { ...FORMATS["9x16"], ...HI }, "bf-webinar-layer-9x16-2x", true);
sibling(".build-layer-4x5-2x", { ...FORMATS["4x5"], ...HI }, "bf-webinar-layer-4x5-2x", true);
