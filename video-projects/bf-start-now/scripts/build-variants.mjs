#!/usr/bin/env node
/**
 * build-variants.mjs — generate the 4:5 cut from the 9:16 master.
 *
 *   node scripts/build-variants.mjs        (run from the master project folder)
 *
 * The 9:16 project owns scene structure, copy and ALL timing (which is locked to
 * the voiceover). The variant is a copy with:
 *   1. dimensions rewritten,
 *   2. the face-mode constants swapped — the crop that fills 1080x1920 is not
 *      the crop that fills 1080x1350,
 *   3. its layout deltas appended to each file's own <style> block.
 *
 * Never hand-edit a variant: edit the master or the override file, then re-run.
 */
import { readFileSync, writeFileSync, rmSync, mkdirSync, cpSync, existsSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const MASTER = join(HERE, "..");
const PROJECTS = join(MASTER, "..");

const FORMATS = [
  {
    slug: "bf-start-now-4x5", w: 1080, h: 1350, css: "4x5.css", label: "4:5 feed",
    // 1920x1080 source: 0.70 fills most of the width and bottom-anchors to 1350.
    bottom: "{ x: -132, y: 594, scale: 0.7 }",
    // Covering 1080x1350 is height-driven: 1350/1080 = 1.25.
    full: "{ x: -660, y: 0, scale: 1.25 }",
    seamTop: 566, seamLineTop: 588,
  },
];

function parseOverrides(text) {
  const out = {};
  const parts = text.split(/\/\* *== *([\w.-]+) *== *\*\//);
  for (let i = 1; i < parts.length; i += 2) out[parts[i].trim()] = parts[i + 1].trim();
  return out;
}

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
  for (const entry of ["assets", "compositions", "index.html", "hyperframes.json"]) {
    rmSync(join(dest, entry), { recursive: true, force: true });
  }
  mkdirSync(dest, { recursive: true });
  for (const entry of ["assets", "compositions", "index.html", "hyperframes.json"]) {
    cpSync(join(MASTER, entry), join(dest, entry), { recursive: true });
  }
  mkdirSync(join(dest, "renders"), { recursive: true });
  if (!existsSync(join(dest, "renders/.gitkeep"))) writeFileSync(join(dest, "renders/.gitkeep"), "");

  const overrides = parseOverrides(readFileSync(join(HERE, "overrides", fmt.css), "utf8"));
  const files = ["index.html", ...readdirSync(join(dest, "compositions"))
    .filter((f) => f.endsWith(".html")).map((f) => join("compositions", f))];

  for (const rel of files) {
    const path = join(dest, rel);
    let html = readFileSync(path, "utf8");

    html = html.replace('content="width=1080, height=1920"', `content="width=${fmt.w}, height=${fmt.h}"`);
    html = html.replaceAll('data-width="1080" data-height="1920"', `data-width="${fmt.w}" data-height="${fmt.h}"`);
    html = html.replaceAll('      data-width="1080"\n      data-height="1920"', `      data-width="${fmt.w}"\n      data-height="${fmt.h}"`);
    html = html.replaceAll("width: 1080px;\n        height: 1920px;", `width: ${fmt.w}px;\n        height: ${fmt.h}px;`);

    if (rel === "index.html") {
      html = html.replace(/const BOTTOM = \{[^}]*\};/, `const BOTTOM = ${fmt.bottom};`);
      html = html.replace(/const FULL = \{[^}]*\};/, `const FULL = ${fmt.full};`);
      html = html.replace(/(#seam \{[\s\S]*?top: )\d+px;/, `$1${fmt.seamTop}px;`);
      html = html.replace(/(#seam-line \{[\s\S]*?top: )\d+px;/, `$1${fmt.seamLineTop}px;`);
    }

    html = appendStyle(html, overrides[basename(rel, ".html")]);
    writeFileSync(path, html);
  }

  const meta = JSON.parse(readFileSync(join(MASTER, "meta.json"), "utf8"));
  writeFileSync(join(dest, "meta.json"), JSON.stringify(
    { ...meta, id: fmt.slug, name: fmt.slug, width: fmt.w, height: fmt.h }, null, 2) + "\n");

  writeFileSync(join(dest, "README.md"),
    `# ${fmt.slug}\n\n**Generated — do not hand-edit.**\n\n${fmt.label} · ${fmt.w}x${fmt.h} @ 30fps.\n` +
    "Rebuilt from `video-projects/bf-start-now` with:\n\n```bash\ncd video-projects/bf-start-now\nnode scripts/build-variants.mjs\n```\n\n" +
    `Timing is locked to the voiceover and comes from the master. This format's\n` +
    `layout deltas live in \`../bf-start-now/scripts/overrides/${fmt.css}\`.\n`);

  console.log(`built ${fmt.slug}  ${fmt.w}x${fmt.h}  (${files.length} files)`);
}
