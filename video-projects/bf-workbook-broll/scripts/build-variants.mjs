#!/usr/bin/env node
/**
 * build-variants.mjs — generate the 9:16 and 4:5 b-roll projects from the 16:9 master.
 *
 *   node scripts/build-variants.mjs          (run from the master project folder)
 *
 * The master (bf-workbook-broll, 1920x1080) is the single source of truth for
 * scene structure, copy and TIMING. Each variant is a copy with:
 *   1. dimensions rewritten (viewport meta, data-width/height, root stage box),
 *   2. its layout deltas appended to each file's own <style> block, from
 *      scripts/overrides/<format>.css (sections keyed by file stem),
 *   3. the s05 calendar pan constants replaced (the pan distance depends on
 *      how much taller the page is than the frame).
 *
 * Re-running is safe: variants are deleted and rebuilt. Never hand-edit a
 * variant — edit the master or the override file, then re-run this.
 */
import { readFileSync, writeFileSync, rmSync, mkdirSync, cpSync, existsSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const MASTER = join(HERE, "..");
const PROJECTS = join(MASTER, "..");

const FORMATS = [
  { slug: "bf-workbook-broll-9x16", w: 1080, h: 1920, css: "9x16.css", label: "9:16 Story/Reels",
    pan: { from: 230, to: 60 } },
  { slug: "bf-workbook-broll-4x5",  w: 1080, h: 1350, css: "4x5.css",  label: "4:5 Meta feed",
    pan: { from: 40, to: -160 } },
];

/** Split an override file into { fileStem: cssText } on `/* == stem == *\/` markers. */
function parseOverrides(text) {
  const out = {};
  const parts = text.split(/\/\* *== *([\w.-]+) *== *\*\//);
  for (let i = 1; i < parts.length; i += 2) out[parts[i].trim()] = parts[i + 1].trim();
  return out;
}

/** Append `css` just before the final `</style>` so it wins the cascade. */
function appendStyle(html, css) {
  if (!css) return html;
  const i = html.lastIndexOf("    </style>");
  if (i === -1) throw new Error("no </style> to append to");
  return html.slice(0, i) + "\n      /* ── format overrides (generated) ─────────────────────── */\n"
    + css.split("\n").map((l) => (l.trim() ? "      " + l : l)).join("\n")
    + "\n" + html.slice(i);
}

for (const fmt of FORMATS) {
  const dest = join(PROJECTS, fmt.slug);
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });

  for (const entry of ["assets", "compositions", "index.html", "hyperframes.json"]) {
    cpSync(join(MASTER, entry), join(dest, entry), { recursive: true });
  }
  mkdirSync(join(dest, "renders"), { recursive: true });
  writeFileSync(join(dest, "renders/.gitkeep"), "");

  const overrides = parseOverrides(readFileSync(join(HERE, "overrides", fmt.css), "utf8"));

  const files = ["index.html", ...readdirSync(join(dest, "compositions"))
    .filter((f) => f.endsWith(".html")).map((f) => join("compositions", f))];

  for (const rel of files) {
    const path = join(dest, rel);
    let html = readFileSync(path, "utf8");

    html = html.replace('content="width=1920, height=1080"', `content="width=${fmt.w}, height=${fmt.h}"`);
    html = html.replaceAll('data-width="1920" data-height="1080"', `data-width="${fmt.w}" data-height="${fmt.h}"`);
    html = html.replaceAll('data-width="1920"\n        data-height="1080"', `data-width="${fmt.w}"\n        data-height="${fmt.h}"`);
    html = html.replaceAll('      data-width="1920"\n      data-height="1080"', `      data-width="${fmt.w}"\n      data-height="${fmt.h}"`);
    // root stage box: html/body and .beat-layer both carry the frame size
    html = html.replaceAll("width: 1920px;\n        height: 1080px;", `width: ${fmt.w}px;\n        height: ${fmt.h}px;`);

    if (basename(rel) === "s05-calendar.html") {
      html = html.replace(/const PAN_FROM = -?[\d.]+;/, `const PAN_FROM = ${fmt.pan.from};`);
      html = html.replace(/const PAN_TO = -?[\d.]+;/, `const PAN_TO = ${fmt.pan.to};`);
    }

    html = appendStyle(html, overrides[basename(rel, ".html")]);
    writeFileSync(path, html);
  }

  const meta = JSON.parse(readFileSync(join(MASTER, "meta.json"), "utf8"));
  writeFileSync(join(dest, "meta.json"), JSON.stringify(
    { ...meta, id: fmt.slug, name: fmt.slug, width: fmt.w, height: fmt.h }, null, 2) + "\n");

  writeFileSync(join(dest, "README.md"),
    `# ${fmt.slug}\n\n**Generated — do not hand-edit.**\n\n${fmt.label} · ${fmt.w}x${fmt.h} @ 30fps.\n` +
    `Rebuilt from \`video-projects/bf-workbook-broll\` with:\n\n` +
    "```bash\ncd video-projects/bf-workbook-broll\nnode scripts/build-variants.mjs\n```\n\n" +
    `Scene structure, copy and timing come from the master. This format's layout\n` +
    `deltas live in \`../bf-workbook-broll/scripts/overrides/${fmt.css}\`.\n`);

  console.log(`built ${fmt.slug}  ${fmt.w}x${fmt.h}  (${files.length} files)`);
}
