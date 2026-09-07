#!/usr/bin/env node
// Headless playtest: random kings, prints reign lengths, death mix and card coverage.
import { Game, createRng } from "../src/engine.js";
import cards from "../src/cards/index.js";

const N = Number(process.argv[2] ?? 300);
const rng = createRng(12345);
const mem = { store: {}, getItem: (k) => mem.store[k] ?? null, setItem: (k, v) => (mem.store[k] = v), removeItem: (k) => delete mem.store[k] };
const game = new Game(cards, { storage: mem, rng });

// A slightly-sensible player: avoids the side whose preview would push a meter past the edge.
function pick() {
  const s = game.reign.stats;
  const score = (side) => {
    const p = game.preview(side);
    let bad = 0;
    for (const [k, v] of Object.entries(p)) {
      const after = s[k] + (v.value ?? 0);
      if (after <= 0 || after >= 100) bad += 10;
      else if (after < 15 || after > 85) bad += 2;
    }
    return bad;
  };
  const l = score("left"), r = score("right");
  if (l !== r) return l < r ? "left" : "right";
  return rng() < 0.5 ? "left" : "right";
}

const deaths = {};
const reigns = [];
let swipes = 0;
for (let k = 0; k < N; k++) {
  let guard = 0;
  while (!game.reign.dead && guard++ < 2000) { game.choose(pick()); swipes++; }
  const d = game.reign.dead ?? "none";
  deaths[d] = (deaths[d] ?? 0) + 1;
  reigns.push(game.reign.years);
  game.succeed();
}
reigns.sort((a, b) => a - b);
const avg = reigns.reduce((a, b) => a + b, 0) / reigns.length;
console.log(`kings: ${N}  swipes: ${swipes}  cards: ${cards.length}  discovered: ${game.seen.size} (${Math.round((game.seen.size / cards.length) * 100)}%)`);
console.log(`reign years: avg ${avg.toFixed(1)}  median ${reigns[Math.floor(N / 2)]}  min ${reigns[0]}  max ${reigns[N - 1]}`);
console.log("deaths:", Object.entries(deaths).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}=${v}`).join(" "));
const never = cards.filter((c) => !game.seen.has(c.id) && !c.chainOnly).map((c) => c.id);
if (never.length) console.log(`never drawn (${never.length}): ${never.slice(0, 40).join(", ")}${never.length > 40 ? "..." : ""}`);
