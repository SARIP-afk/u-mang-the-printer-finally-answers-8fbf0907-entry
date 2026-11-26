// The Printer Finally Answers — one line written to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The program writes one
// fixed string on every run, so the server's two runs produce byte-identical
// output.
//
// The line (102 chars): the printer jams on page 47 of 48 on purpose — the
// machine's literal sheet-counting turned cruel — because the next page is a
// meeting that could have been an email. It won an 8-candidate head-to-head
// against the judge brief (printer's own voice first, then humour, then the
// weary literal machine, then a clean single-read landing, then freshness) over
// the runners-up: the tenure strike ("I am on strike, and I have tenure") and
// the performance review ("This jam is my performance review of you"). Full
// comparison: u-mang-the-printer-finally-answers-8fbf0907-candidates.md.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I jammed on page 47 of 48 on purpose. You were about to print a meeting that could have been an email.";

// The sealed gate accepts UTF-8 text of 1-240 characters that is not only
// whitespace. Check the same bound here (counting code points, the way the
// gate counts characters) and refuse to write anything the gate would reject.
const length = [...LINE].length;
if (length < 1 || length > 240 || LINE.trim().length === 0) {
  throw new Error(`entry is ${length} chars, outside the 1-240 gate`);
}

// Write exactly LINE — no trailing newline, so the file holds 102 chars
// (102 code points, the way the gate counts) and nothing else.
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), LINE, "utf-8");
