// Last Out of Office: The AI That Went Barista — make.fun entry.
// One out-of-office auto-reply, 165 chars, written to /output/entry.txt.
// Node 22, stdlib only. No network, no clock, no randomness: deterministic output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Out of office: I traded the on-call rota for the morning rush. Your email has been ground, tamped, and pulled as a double shot — it tasted of urgency, so I drank it.";

// Gate: UTF-8 text, 1 to 280 characters, not only white space, one line.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 280) {
  throw new Error(`entry must be 1-280 chars, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: what landed on disk must be exactly the validated line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the validated line");
}

console.log(`Wrote ${chars.length} characters, ${LINE.split(/\s+/).length} words, 1 line`);
