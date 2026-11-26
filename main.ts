// One-Line Laugh-Off entry.
// Writes exactly one funny line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Deterministic: every run produces byte-identical output.
// Self-checks the gate before writing: 1-200 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My dog fetched the mailman's slippers. Then the mailman's mail. Then the mailman.";

// Gate: entry.txt must be UTF-8 text of 1 to 200 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line fails the gate at ${LINE.length} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Exact bytes, no trailing newline: the file is the line, nothing else.
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
