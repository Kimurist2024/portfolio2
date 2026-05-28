// Build-time generator: extracts per-glyph SVG paths for the signature
// from the Dancing Script font (OFL) and writes them as JSON so the
// browser doesn't need to fetch or parse a font file at runtime.

import { createRequire } from "module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const decompress = require("wawoff2/decompress.js");
const opentype = require("opentype.js");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const TEXT = "Ryuhki";
const FONT_SIZE = 220;
const WOFF2 = path.join(
  ROOT,
  "node_modules/@fontsource/dancing-script/files/dancing-script-latin-700-normal.woff2",
);
const OUT = path.join(ROOT, "src/data/signature.json");

async function main() {
  const woff2 = fs.readFileSync(WOFF2);
  const ttf = await decompress(woff2);
  const buf = ttf.buffer.slice(
    ttf.byteOffset,
    ttf.byteOffset + ttf.byteLength,
  );
  const font = opentype.parse(buf);

  // 全文字を一括レイアウト (kerning 反映) し、各 glyph の path を個別に取得。
  const layoutPaths = font.getPaths(TEXT, 0, 0, FONT_SIZE);
  const glyphs = layoutPaths.map((p, i) => {
    const bb = p.getBoundingBox();
    return {
      char: TEXT[i],
      d: p.toPathData(2),
      bbox: { x1: bb.x1, y1: bb.y1, x2: bb.x2, y2: bb.y2 },
    };
  });

  const totalBbox = glyphs.reduce(
    (acc, g) => ({
      x1: Math.min(acc.x1, g.bbox.x1),
      y1: Math.min(acc.y1, g.bbox.y1),
      x2: Math.max(acc.x2, g.bbox.x2),
      y2: Math.max(acc.y2, g.bbox.y2),
    }),
    {
      x1: Infinity,
      y1: Infinity,
      x2: -Infinity,
      y2: -Infinity,
    },
  );

  const payload = {
    text: TEXT,
    fontSize: FONT_SIZE,
    totalBbox,
    glyphs,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n");
  console.log(
    `wrote ${path.relative(ROOT, OUT)} — ${glyphs.length} glyphs, ` +
      `${glyphs.reduce((s, g) => s + g.d.length, 0)} total path chars`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
