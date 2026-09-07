#!/usr/bin/env node
// Style audit: flags phrasing tics that make a deck read machine-written.
import cards from "../src/cards/index.js";

const texts = cards.map((c) => c.text);
const openers = {};
for (const t of texts) for (const s of t.split(/(?<=[.!?"])\s+/)) {
  const w = s.replace(/^["']/, "").split(/\s+/).slice(0, 2).join(" ").toLowerCase();
  if (w) openers[w] = (openers[w] || 0) + 1;
}
console.log("top sentence openers:\n  " + Object.entries(openers).sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => `${k}=${v}`).join("  "));

const pats = {
  "which is worse/better": /which is (worse|better)/i,
  "same thing": /same thing/i,
  "'. Or ...' fragment": /\. Or [a-z]/,
  "trailing 'Yet.'": /\bYet\.$/,
  "em dash": /—/,
  "nobody": /\bnobody\b/i,
  "in fairness": /in fairness/i,
  "technically": /technically/i,
  "obviously": /obviously/i,
  "'It's a ... thing'": /it's a \w+ thing/i,
  "'That's the'": /That's the/,
  "'He/She isn't joking'": /isn't joking/i,
  "'X is Y. Y is Z.' (anadiplosis)": /\b(\w+) is (\w+)\. \2 is\b/i,
  "'The X is Y. The Y is Z.'": /\. The (\w+) (is|are|was) [^.]+\. The \1\b/,
  "'a very good X'": /a very good/i,
  "'exactly'": /\bexactly\b/i,
  "'not exactly'": /not exactly/i,
  "'in a voice that'": /in a voice that/i,
  "'the way (someone) looks'": /the way (a|an|the|he|she|you|it) \w+ looks?/i,
  "'has/have opinions'": /ha(s|ve) opinions/i,
  "'is/are not people'": /not people/i,
  "'shrugs'": /shrug/i,
  "'pause'": /\bpause\b/i,
};
console.log("\npattern counts:");
for (const [n, re] of Object.entries(pats)) {
  const hits = cards.filter((c) => re.test(c.text));
  console.log(`  ${String(hits.length).padStart(3)}  ${n}${hits.length > 12 ? "   e.g. " + hits.slice(0, 4).map((c) => c.id).join(", ") : ""}`);
}

const labels = {};
for (const c of cards) for (const s of [c.left, c.right]) if (s.label) labels[s.label] = (labels[s.label] || 0) + 1;
console.log("\ntop labels:\n  " + Object.entries(labels).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([k, v]) => `${k}=${v}`).join(" | "));

const lens = texts.map((t) => t.length).sort((a, b) => a - b);
console.log(`\ntext length p10/p50/p90: ${lens[Math.floor(lens.length * 0.1)]} / ${lens[Math.floor(lens.length * 0.5)]} / ${lens[Math.floor(lens.length * 0.9)]}`);
const chars = {};
for (const c of cards) chars[c.char] = (chars[c.char] || 0) + 1;
console.log("\ncards per character:\n  " + Object.entries(chars).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}=${v}`).join("  "));
