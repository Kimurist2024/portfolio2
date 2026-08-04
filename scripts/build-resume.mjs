#!/usr/bin/env node
/**
 * Build resume/resume.tex -> public/resume.pdf with XeLaTeX.
 *
 * XeLaTeX is required (the document uses system fonts via fontspec/xeCJK:
 * Hiragino Kaku Gothic ProN + Helvetica Neue). Aux files are written to a
 * throwaway directory so only the PDF lands in the repo.
 *
 * Not wired into predev/prebuild on purpose — TeX Live is a heavy, optional
 * toolchain and CI/Vercel builds just serve the committed PDF. Run this
 * locally after editing the .tex, then commit both files.
 */

import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "resume", "resume.tex");
const TARGET = join(ROOT, "public", "resume.pdf");
const ENGINE = "xelatex";

/** XeLaTeX needs two passes to settle hyperref's PageLabels/outlines. */
const PASSES = 2;

function fail(message) {
  console.error(`[build-resume] ${message}`);
  process.exit(1);
}

if (!existsSync(SOURCE)) fail(`source not found: ${SOURCE}`);

const workDir = mkdtempSync(join(tmpdir(), "resume-"));

try {
  for (let pass = 1; pass <= PASSES; pass += 1) {
    try {
      execFileSync(
        ENGINE,
        [
          "-interaction=nonstopmode",
          "-halt-on-error",
          `-output-directory=${workDir}`,
          SOURCE,
        ],
        { cwd: ROOT, stdio: "pipe" },
      );
    } catch (error) {
      const log = error.stdout?.toString() ?? "";
      const diagnostics = log
        .split("\n")
        .filter((line) => line.startsWith("!") || line.startsWith("l."))
        .slice(0, 20)
        .join("\n");
      fail(
        `${ENGINE} failed on pass ${pass}.\n${diagnostics || log.slice(-2000)}`,
      );
    }
  }

  const built = join(workDir, "resume.pdf");
  if (!existsSync(built)) fail("compile reported success but produced no PDF");

  copyFileSync(built, TARGET);
  console.log(`[build-resume] wrote ${TARGET.replace(`${ROOT}/`, "")}`);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
