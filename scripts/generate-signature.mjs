// Build-time generator: extracts an SVG path for the signature glyph
// from the Dancing Script font (OFL) and writes it as JSON so the
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
  const p = font.getPath(TEXT, 0, 0, FONT_SIZE);
  const bb = p.getBoundingBox();
  const payload = {
    text: TEXT,
    fontSize: FONT_SIZE,
    d: p.toPathData(2),
    bbox: { x1: bb.x1, y1: bb.y1, x2: bb.x2, y2: bb.y2 },
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n");
  console.log(
    `wrote ${path.relative(ROOT, OUT)} (${payload.d.length} chars of path data)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
