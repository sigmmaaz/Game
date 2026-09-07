#!/usr/bin/env node
// Validates every card module in src/cards. Usage: node tools/validate.js [file...]
import { readdirSync } from "node:fs";
import { resolve, basename } from "node:path";
import { pathToFileURL } from "node:url";
import { CHARACTERS } from "../src/characters.js";
import { EFFECTS } from "../src/effects.js";
import { DEATHS } from "../src/deaths.js";

const STATS = ["faith", "people", "army", "gold"];
const BANNED = [
  /\bindeed\b/i, /\bi must say\b/i, /\bvery well then\b/i, /\bdelve/i, /\btapestry\b/i,
  /\btestament\b/i, /\ba dance of\b/i, /\bwhispers of\b/i, /\bvery fabric\b/i,
  /\blittle did\b/i, /\bit seems\b/i, /\bin the end\b/i, /^alas\b/i, /^ah,/i,
  /\bnestled\b/i, /\bunwavering\b/i, /\bembark\b/i, /\brealm of\b/i, /\bbeacon\b/i,
];

const dir = resolve("src/cards");
const files = process.argv.slice(2).length
  ? process.argv.slice(2).map((f) => resolve(f))
  : readdirSync(dir).filter((f) => f.endsWith(".js") && f !== "index.js").map((f) => resolve(dir, f));

const all = [];
const errors = [];
const warnings = [];
const perFile = {};

for (const file of files) {
  let mod;
  try {
    mod = await import(pathToFileURL(file).href);
  } catch (e) {
    errors.push(`${basename(file)}: failed to import: ${e.message}`);
    continue;
  }
  const cards = mod.default;
  if (!Array.isArray(cards)) {
    errors.push(`${basename(file)}: default export is not an array`);
    continue;
  }
  perFile[basename(file)] = cards.length;
  for (const c of cards) all.push({ ...c, __file: basename(file) });
}

const ids = new Map();
const texts = new Map();
const referenced = new Set();
let bang = 0;

function checkChoice(c, side, ch, path) {
  if (!ch || typeof ch !== "object") return errors.push(`${path}: missing ${side}`);
  if (!ch.random) {
    if (typeof ch.label !== "string" || !ch.label.trim()) errors.push(`${path}.${side}: label required`);
  }
  if (ch.label && ch.label.length > 48) warnings.push(`${path}.${side}: label long (${ch.label.length})`);
  if (ch.fx) {
    for (const [k, v] of Object.entries(ch.fx)) {
      if (!STATS.includes(k)) errors.push(`${path}.${side}.fx: unknown stat ${k}`);
      if (typeof v !== "number" || Number.isNaN(v)) errors.push(`${path}.${side}.fx.${k}: not a number`);
      else if (Math.abs(v) > 40) warnings.push(`${path}.${side}.fx.${k}: very large (${v})`);
    }
  }
  if (ch.next) {
    if (!ch.next.id) errors.push(`${path}.${side}.next: id required`);
    else referenced.add(ch.next.id);
    if (ch.next.else) referenced.add(ch.next.else);
    if (ch.next.delay != null && (typeof ch.next.delay !== "number" || ch.next.delay < 0)) errors.push(`${path}.${side}.next.delay invalid`);
  }
  if (ch.effect && !EFFECTS[ch.effect]) errors.push(`${path}.${side}.effect: unknown ${ch.effect}`);
  if (ch.removeEffect && !EFFECTS[ch.removeEffect]) errors.push(`${path}.${side}.removeEffect: unknown ${ch.removeEffect}`);
  if (ch.die && !DEATHS[ch.die]) errors.push(`${path}.${side}.die: unknown ${ch.die}`);
  if (ch.mode) {
    if (!["duel", "deep"].includes(ch.mode.kind)) errors.push(`${path}.${side}.mode: unknown kind ${ch.mode.kind}`);
    if (ch.mode.kind === "duel" && ch.mode.foe && !CHARACTERS[ch.mode.foe]) errors.push(`${path}.${side}.mode.foe: unknown ${ch.mode.foe}`);
    if (ch.mode.lose && !DEATHS[ch.mode.lose]) errors.push(`${path}.${side}.mode.lose: unknown ${ch.mode.lose}`);
    if (ch.mode.win?.next) referenced.add(ch.mode.win.next);
    if (ch.mode.exit) referenced.add(ch.mode.exit);
  }
  for (const k of ["set", "unset", "setReign", "unsetReign"]) {
    if (ch[k] && !Array.isArray(ch[k])) errors.push(`${path}.${side}.${k}: must be array`);
  }
  if (ch.random) {
    if (!Array.isArray(ch.random) || !ch.random.length) errors.push(`${path}.${side}.random: must be non-empty array`);
    else ch.random.forEach((r, i) => checkChoice(c, `${side}.random[${i}]`, { label: "x", ...r }, path));
  }
}

for (const c of all) {
  const path = `${c.__file}:${c.id ?? "?"}`;
  if (!c.id || typeof c.id !== "string") errors.push(`${path}: id required`);
  else if (ids.has(c.id)) errors.push(`${path}: duplicate id (also in ${ids.get(c.id)})`);
  else ids.set(c.id, c.__file);
  if (!CHARACTERS[c.char]) errors.push(`${path}: unknown char '${c.char}'`);
  if (typeof c.text !== "string" || !c.text.trim()) errors.push(`${path}: text required`);
  else {
    if (c.text.length > 230) errors.push(`${path}: text too long (${c.text.length})`);
    else if (c.text.length > 200) warnings.push(`${path}: text long (${c.text.length})`);
    const norm = c.text.toLowerCase().replace(/[^a-z ]/g, "").trim();
    if (texts.has(norm)) errors.push(`${path}: duplicate text of ${texts.get(norm)}`);
    else texts.set(norm, path);
    for (const re of BANNED) if (re.test(c.text)) warnings.push(`${path}: banned phrase ${re}`);
    if (c.text.includes("!")) bang++;
  }
  checkChoice(c, "left", c.left, path);
  checkChoice(c, "right", c.right, path);
  if (c.when) {
    const w = c.when;
    for (const k of Object.keys(w)) {
      if (!["flags", "notFlags", "minYear", "minReign", "stats", "effects", "notEffects", "maxYear"].includes(k)) errors.push(`${path}.when: unknown key ${k}`);
    }
    if (w.effects) for (const e of w.effects) if (!EFFECTS[e]) errors.push(`${path}.when.effects: unknown ${e}`);
    if (w.notEffects) for (const e of w.notEffects) if (!EFFECTS[e]) errors.push(`${path}.when.notEffects: unknown ${e}`);
    if (w.stats) for (const k of Object.keys(w.stats)) if (!STATS.includes(k)) errors.push(`${path}.when.stats: unknown ${k}`);
  }
  for (const k of Object.keys(c)) {
    if (!["id", "char", "text", "left", "right", "when", "once", "oncePerReign", "weight", "reignOnly", "__file", "chainOnly", "tags"].includes(k)) errors.push(`${path}: unknown key ${k}`);
  }
}
for (const id of referenced) if (!ids.has(id)) errors.push(`next references missing card '${id}'`);

// Stat balance sanity: sum of all fx per stat should not be wildly skewed.
const sums = { faith: 0, people: 0, army: 0, gold: 0 };
let choices = 0;
for (const c of all) for (const s of [c.left, c.right]) {
  if (s?.fx) { choices++; for (const [k, v] of Object.entries(s.fx)) sums[k] += v; }
}

console.log(`files: ${Object.entries(perFile).map(([f, n]) => `${f}=${n}`).join(", ")}`);
console.log(`cards: ${all.length}   choices with fx: ${choices}   exclamations: ${bang}`);
console.log(`fx sums: ${JSON.stringify(sums)}`);
if (warnings.length) console.log(`\n${warnings.length} warnings:\n  ` + warnings.slice(0, 80).join("\n  ") + (warnings.length > 80 ? `\n  ...${warnings.length - 80} more` : ""));
if (errors.length) {
  console.error(`\n${errors.length} errors:\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log("\nOK");
