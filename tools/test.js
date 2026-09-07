#!/usr/bin/env node
// Engine tests. Run: node tools/test.js
import assert from "node:assert/strict";
import { Game, createRng, STATS } from "../src/engine.js";
import { EFFECTS, MAX_EFFECTS } from "../src/effects.js";
import { DEATHS } from "../src/deaths.js";
import { CHARACTERS } from "../src/characters.js";
import cards from "../src/cards/index.js";

const mkStore = () => { const s = {}; return { getItem: (k) => s[k] ?? null, setItem: (k, v) => (s[k] = v), removeItem: (k) => delete s[k], _s: s }; };
const mk = (seed = 1, storage = mkStore()) => new Game(cards, { storage, rng: createRng(seed) });

let passed = 0, failed = 0;
async function test(name, fn) {
  try { await fn(); passed++; console.log(`  ok   ${name}`); }
  catch (e) { failed++; console.log(`  FAIL ${name}\n       ${e.message.split("\n")[0]}`); }
}

console.log("engine");

await test("new dynasty starts with coronation card and mid meters", () => {
  const g = mk();
  assert.equal(g.card.id, "story_coronation");
  for (const k of STATS) assert.ok(g.reign.stats[k] >= 40 && g.reign.stats[k] <= 60, k);
  assert.equal(g.reign.years, 0);
});

await test("a swipe advances one year and applies fx", () => {
  const g = mk();
  const before = { ...g.reign.stats };
  const fx = g.card.left.fx;
  const res = g.choose("left");
  assert.equal(g.reign.years, 1);
  for (const [k, v] of Object.entries(fx)) assert.equal(g.reign.stats[k], before[k] + v, k);
  assert.equal(res.death, null);
});

await test("delay 0 follow-up is the very next card", () => {
  const g = mk();
  g.choose("right"); // coronation right -> story_dog_intro delay 0
  assert.equal(g.card.id, "story_dog_intro");
});

await test("Bargainer arrives at year 3 of the first reign", () => {
  const g = mk();
  const seen = [];
  for (let i = 0; i < 4; i++) { seen.push(g.card.id); g.choose("left"); }
  assert.ok(seen.includes("story_demon_intro"), seen.join(","));
});

await test("meter at 0 kills with the _low death; at 100 with _high", () => {
  for (const k of STATS) {
    let g = mk(3);
    g.reign.stats[k] = 1;
    g.reign.card = "t_low"; g.byId.set("t_low", { id: "t_low", char: "peasant", text: "x", left: { label: "a", fx: { [k]: -5 } }, right: { label: "b", fx: {} } });
    let r = g.choose("left");
    assert.equal(r.death, `${k}_low`);
    assert.ok(DEATHS[r.death]);
    g = mk(3);
    g.reign.stats[k] = 99;
    g.reign.card = "t_hi"; g.byId.set("t_hi", { id: "t_hi", char: "peasant", text: "x", left: { label: "a", fx: { [k]: 5 } }, right: { label: "b", fx: {} } });
    r = g.choose("left");
    assert.equal(r.death, `${k}_high`);
  }
});

await test("safety-net effect saves once, then is consumed", () => {
  const g = mk(5);
  g.addEffect("granary");
  g.reign.stats.people = 2;
  g.reign.card = "t"; g.byId.set("t", { id: "t", char: "peasant", text: "x", left: { label: "a", fx: { people: -10 } }, right: { label: "b", fx: { people: -10 } } });
  const r = g.choose("left");
  assert.equal(r.death, null);
  assert.equal(r.saved, "granary");
  assert.equal(g.reign.stats.people, 20);
  assert.ok(!g.hasEffect("granary"));
});

await test("die: on a choice kills regardless of meters", () => {
  const g = mk();
  g.reign.card = "t"; g.byId.set("t", { id: "t", char: "peasant", text: "x", left: { label: "a", die: "poison" }, right: { label: "b" } });
  const r = g.choose("left");
  assert.equal(r.death, "poison");
  assert.equal(g.reign.dead, "poison");
  assert.ok(g.meta.deaths.includes("poison"));
});

await test("effects tray evicts oldest non-sticky beyond MAX_EFFECTS; sticky survive", () => {
  const g = mk();
  g.addEffect("married");
  for (const e of ["granary", "vault", "high_walls", "great_temple", "silk_road"]) g.addEffect(e);
  const keys = g.reign.effects.map((e) => e.key);
  assert.ok(keys.includes("married"), "sticky kept");
  assert.ok(!keys.includes("granary"), "oldest evicted");
  assert.equal(keys.filter((k) => !EFFECTS[k].sticky).length, MAX_EFFECTS);
});

await test("drift effects tick every year and timed ones expire", () => {
  const g = mk();
  g.addEffect("plague");
  const p = g.reign.stats.people;
  g.reign.card = "t"; g.byId.set("t", { id: "t", char: "peasant", text: "x", left: { label: "a", fx: {} }, right: { label: "b", fx: {} } });
  g.choose("left");
  assert.equal(g.reign.stats.people, p + EFFECTS.plague.drift.people);
  for (let i = 0; i < 5 && !g.reign.dead; i++) { g.reign.card = "t"; g.choose("left"); }
  assert.ok(!g.hasEffect("plague"), "plague expired");
});

await test("once cards never repeat within a dynasty; oncePerReign repeat after succession", () => {
  const g = mk();
  const once = cards.find((c) => c.once && !c.chainOnly && !c.when);
  g.setCard(once);
  assert.ok(!g.eligible(once));
  const opr = cards.find((c) => c.oncePerReign && !c.chainOnly && !c.when);
  g.setCard(opr);
  assert.ok(!g.eligible(opr));
  g.die("poison"); g.succeed();
  g.reign.recent = [];
  assert.ok(!g.eligible(once), "once stays used");
  assert.ok(g.eligible(opr), "oncePerReign resets");
});

await test("when: conditions gate eligibility", () => {
  const g = mk();
  const c = { id: "t", char: "peasant", text: "x", left: { label: "a" }, right: { label: "b" }, when: { flags: ["f1"], notFlags: ["f2"], stats: { gold: [0, 30] }, effects: ["war"], minReign: 2 } };
  assert.ok(!g.eligible(c));
  g.dyn.flags.f1 = true; g.reign.stats.gold = 20; g.addEffect("war"); g.reign.years = 2;
  assert.ok(g.eligible(c));
  g.dyn.flags.f2 = true;
  assert.ok(!g.eligible(c));
});

await test("chainOnly cards are never drawn randomly", () => {
  const g = mk(9);
  for (let i = 0; i < 300; i++) {
    if (g.reign.dead) g.succeed();
    const c = g.card;
    if (c.chainOnly) {
      // must have arrived via queue — i.e. previous card pointed at it or it was scheduled
      assert.ok(g.reign.__lastFromQueue !== false);
    }
    g.choose("left");
  }
});

await test("next.else falls back when target's when fails", () => {
  const g = mk();
  g.byId.set("a", { id: "a", char: "peasant", text: "x", left: { label: "l", next: { id: "b", delay: 0, else: "c" } }, right: { label: "r" } });
  g.byId.set("b", { id: "b", char: "peasant", text: "x", when: { flags: ["never"] }, left: { label: "l" }, right: { label: "r" } });
  g.byId.set("c", { id: "c", char: "peasant", text: "x", left: { label: "l" }, right: { label: "r" } });
  g.reign.card = "a"; g.choose("left");
  assert.equal(g.card.id, "c");
});

await test("random choice resolves by weight and applies chosen branch", () => {
  const g = mk();
  const ch = { label: "x", fx: { gold: 1 }, random: [{ chance: 1, fx: { gold: 7 } }, { chance: 0, die: "poison" }] };
  const r = g.resolveChoice(ch);
  assert.deepEqual(r.fx, { gold: 7 });
  assert.equal(r.die, undefined);
});

await test("preview reports dot magnitude and uncertainty", () => {
  const g = mk();
  g.byId.set("p", { id: "p", char: "peasant", text: "x", left: { label: "l", fx: { gold: -12, faith: 3 } }, right: { label: "r", random: [{ chance: 1, fx: { army: 10 } }] } });
  g.reign.card = "p";
  const l = g.preview("left");
  assert.equal(l.gold.mag, 2); assert.equal(l.faith.mag, 1); assert.equal(l.gold.uncertain, false);
  const r = g.preview("right");
  assert.equal(r.army.mag, 2); assert.equal(r.army.uncertain, true);
});

await test("save/load round-trips dynasty, reign and seen set", () => {
  const store = mkStore();
  const g = mk(11, store);
  for (let i = 0; i < 12; i++) { if (g.reign.dead) g.succeed(); g.choose("right"); }
  const snap = JSON.stringify({ dyn: g.dyn, reign: g.reign, seen: [...g.seen].sort() });
  const g2 = new Game(cards, { storage: store, rng: createRng(99) });
  assert.equal(JSON.stringify({ dyn: g2.dyn, reign: g2.reign, seen: [...g2.seen].sort() }), snap);
});

await test("corrupt save is ignored, not fatal", () => {
  const store = mkStore(); store.setItem("crown-of-ash:v1", "{not json");
  const g = new Game(cards, { storage: store, rng: createRng(1) });
  assert.ok(g.card);
});

await test("succession: new king, new name, meters reset, timeline grows, year continues", () => {
  const g = mk();
  const y = g.dyn.year;
  g.choose("left");
  g.die("poison");
  const name = g.reign.name;
  g.succeed();
  assert.notEqual(g.reign.dead, "poison");
  assert.equal(g.dyn.timeline.length, 1);
  assert.equal(g.reign.years, 0);
  assert.equal(g.dyn.year, y + 1);
  assert.ok(g.card);
  assert.ok(g.reign.name !== name || /\s(II|III|IV)$/.test(g.reign.name));
});

await test("repeated king names get regnal numbers", () => {
  const g = mk();
  g.meta.nameCounts = {}; g.rng = () => 0;
  g.newReign(); const a = g.reign.name;
  g.newReign(); const b = g.reign.name;
  assert.ok(!/ II$/.test(a)); assert.ok(/ II$/.test(b), b);
});

await test("old age arrives on long reigns and eventually kills", () => {
  const g = mk(2);
  g.reign.years = 60;
  g.byId.set("t", { id: "t", char: "peasant", text: "x", left: { label: "a", fx: {} }, right: { label: "b", fx: {} } });
  let died = null;
  for (let i = 0; i < 200 && !died; i++) { g.reign.card = "t"; died = g.choose("left").death; }
  assert.equal(died, "old_age");
});

await test("elixir blocks old age", () => {
  const g = mk(2);
  g.addEffect("elixir"); g.reign.years = 60;
  g.byId.set("t", { id: "t", char: "peasant", text: "x", left: { label: "a", fx: {} }, right: { label: "b", fx: {} } });
  for (let i = 0; i < 100; i++) { g.reign.card = "t"; assert.equal(g.choose("left").death, null); }
});

await test("dying in love is a broken heart", () => {
  const g = mk();
  g.addEffect("love"); g.reign.stats.gold = 1;
  g.byId.set("t", { id: "t", char: "peasant", text: "x", left: { label: "a", fx: { gold: -5 } }, right: { label: "b" } });
  g.reign.card = "t";
  assert.equal(g.choose("left").death, "broken_heart");
});

await test("objectives unlock and persist across kings", () => {
  const g = mk();
  g.reign.years = 10; g.checkObjectives();
  assert.ok(g.meta.objectives.includes("decade"));
  g.dyn.flags.dragon_dead = true; g.checkObjectives();
  assert.ok(g.meta.objectives.includes("dragon_slayer"));
});

await test("recent cards are not redrawn immediately", () => {
  const g = mk(4);
  const ids = [];
  for (let i = 0; i < 12; i++) { if (g.reign.dead) g.succeed(); ids.push(g.card.id); g.choose("left"); }
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i && !id.startsWith("__"));
  assert.deepEqual(dupes, []);
});

console.log("mini-games");

await test("duel: mode card renders, hearts count down, ends in win or duel death, no year passes", () => {
  const g = mk(7);
  const y = g.dyn.year;
  g.startMode({ kind: "duel", foe: "orc_warchief", lose: "duel", win: { fx: { army: 20 }, next: "orc_duel_won" } });
  assert.equal(g.card.id, "__duel");
  assert.ok(g.card.text.includes("♥"));
  let res;
  for (let i = 0; i < 40 && g.reign.mode; i++) res = g.choose(i % 2 ? "left" : "right");
  assert.equal(g.reign.mode, null);
  assert.equal(g.dyn.year, y, "no years pass in a duel");
  if (res.death) assert.equal(res.death, "duel");
  else { assert.ok(g.dyn.flags.duel_won); assert.equal(g.card.id, "orc_duel_won"); }
});

await test("duel: starting from a card choice works and the win branch continues", () => {
  let wins = 0, losses = 0;
  for (let seed = 1; seed <= 60; seed++) {
    const g = mk(seed);
    g.reign.card = "orc_duel_2";
    g.choose("left");
    assert.equal(g.reign.mode?.kind, "duel");
    for (let i = 0; i < 40 && g.reign.mode; i++) g.choose(g.rng() < 0.5 ? "left" : "right");
    if (g.reign.dead) { assert.equal(g.reign.dead, "duel"); losses++; } else { assert.equal(g.card.id, "orc_duel_won"); wins++; }
  }
  assert.ok(wins > 5 && losses > 5, `wins=${wins} losses=${losses}`);
});

await test("the Deep: reaches bottom or dies; exits to story_deep_4", () => {
  let bottoms = 0, deaths = 0;
  for (let seed = 1; seed <= 60; seed++) {
    const g = mk(seed);
    g.startMode({ kind: "deep", goal: 6, exit: "story_deep_4" });
    assert.equal(g.card.id, "__deep");
    for (let i = 0; i < 200 && g.reign.mode && !g.reign.dead; i++) g.choose(g.rng() < 0.5 ? "left" : "right");
    assert.equal(g.reign.mode, null, "mode must end");
    if (g.reign.dead) deaths++; else { assert.equal(g.card.id, "story_deep_4"); bottoms++; }
  }
  assert.ok(bottoms > 5 && deaths > 5, `bottoms=${bottoms} deaths=${deaths}`);
});

await test("mode state survives save/load mid-game", () => {
  const store = mkStore();
  const g = mk(3, store);
  g.startMode({ kind: "deep", goal: 6, exit: "story_deep_4" });
  g.choose("left"); g.save();
  const g2 = new Game(cards, { storage: store, rng: createRng(3) });
  assert.equal(g2.reign.mode?.kind, "deep");
  assert.equal(g2.card.id, "__deep");
  g2.choose("right");
});

console.log("content");

await test("every card references a known character, and every death/effect key is defined", () => {
  for (const c of cards) assert.ok(CHARACTERS[c.char], c.id);
  for (const c of cards) for (const s of [c.left, c.right]) {
    const all = [s, ...(s.random ?? [])];
    for (const x of all) {
      if (x.die) assert.ok(DEATHS[x.die], `${c.id} die ${x.die}`);
      if (x.effect) assert.ok(EFFECTS[x.effect], `${c.id} effect ${x.effect}`);
      if (x.removeEffect) assert.ok(EFFECTS[x.removeEffect], `${c.id} removeEffect ${x.removeEffect}`);
    }
  }
});

await test("every chainOnly card is reachable from some next/mode/engine reference", () => {
  const refs = new Set(["story_coronation", "story_demon_intro", "story_demon_heir_visit", "story_old_age_warning", "story_empty_hall"]);
  for (const c of cards) for (const s of [c.left, c.right]) for (const x of [s, ...(s.random ?? [])]) {
    if (x.next?.id) refs.add(x.next.id);
    if (x.next?.else) refs.add(x.next.else);
    if (x.mode?.win?.next) refs.add(x.mode.win.next);
    if (x.mode?.exit) refs.add(x.mode.exit);
  }
  const orphans = cards.filter((c) => c.chainOnly && !refs.has(c.id)).map((c) => c.id);
  assert.deepEqual(orphans, []);
});

await test("every flag required by a when: is set somewhere (or is an engine flag)", () => {
  const engineFlags = new Set(["duel_won", "deep_visited", "dwarf_grudge", "dog_kept"]);
  const setFlags = new Set(engineFlags);
  for (const c of cards) for (const s of [c.left, c.right]) for (const x of [s, ...(s.random ?? [])]) {
    for (const f of [...(x.set ?? []), ...(x.setReign ?? []), ...(x.mode?.win?.set ?? [])]) setFlags.add(f);
  }
  const missing = new Set();
  for (const c of cards) for (const f of c.when?.flags ?? []) if (!setFlags.has(f)) missing.add(`${c.id}:${f}`);
  assert.deepEqual([...missing], []);
});

await test("every card death is authored somewhere; most are hit in a long random simulation", () => {
  const authored = new Set();
  for (const c of cards) for (const s of [c.left, c.right]) for (const x of [s, ...(s.random ?? [])]) { if (x.die) authored.add(x.die); if (x.mode?.lose) authored.add(x.mode.lose); }
  for (const k of STATS) { authored.add(k + "_low"); authored.add(k + "_high"); }
  authored.add("old_age"); authored.add("broken_heart"); authored.add("dungeon"); authored.add("duel");
  const unauthored = Object.keys(DEATHS).filter((d) => !authored.has(d));
  assert.deepEqual(unauthored, [], "deaths with no way to trigger them");

  const g = mk(2024);
  const seen = new Set();
  for (let k = 0; k < 3000; k++) {
    let n = 0;
    while (!g.reign.dead && n++ < 500) g.choose(g.rng() < 0.5 ? "left" : "right");
    seen.add(g.reign.dead); g.succeed();
  }
  const unreachable = Object.keys(DEATHS).filter((d) => !seen.has(d));
  // Secret deaths hide behind long chains a random swiper rarely finishes.
  assert.ok(unreachable.length <= 6, `unreached: ${unreachable.join(", ")}`);
});

await test("no card can push a meter by more than 40 in one swipe", () => {
  for (const c of cards) for (const s of [c.left, c.right]) for (const x of [s, ...(s.random ?? [])]) {
    for (const [k, v] of Object.entries(x.fx ?? {})) assert.ok(Math.abs(v) <= 40, `${c.id} ${k} ${v}`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
