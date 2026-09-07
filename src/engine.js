// Game state and rules. No DOM here.
import { EFFECTS, MAX_EFFECTS } from "./effects.js";
import { DEATHS } from "./deaths.js";
import { CHARACTERS } from "./characters.js";
import { duelCard, duelChoose, deepCard, deepChoose } from "./modes.js";

export const STATS = ["faith", "people", "army", "gold"];
const SAVE_KEY = "crown-of-ash:v1";
const START_YEAR = 1012;
const RECENT_WINDOW = 12;

const KING_NAMES = [
  "Aldous", "Berengar", "Cedric", "Dunstan", "Edric", "Fulke", "Godwin", "Hamon",
  "Ivo", "Jocelin", "Kenric", "Leofric", "Merrick", "Osbert", "Piers", "Rannulf",
  "Sigurd", "Theobald", "Ulric", "Waleran", "Wystan", "Anselm", "Brice", "Corwin",
  "Drogo", "Emeric", "Fenwick", "Gilroy", "Hereward", "Ingram", "Joss", "Lambert",
  "Maddox", "Nyle", "Orrin", "Perrin", "Roland", "Sewal", "Tancred", "Umfrey",
];

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];
function roman(n) { return ROMAN[n] ?? String(n); }

export function createRng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

export class Game {
  constructor(cards, { storage = globalThis.localStorage, rng = Math.random } = {}) {
    this.cards = cards;
    this.byId = new Map(cards.map((c) => [c.id, c]));
    this.storage = storage;
    this.rng = rng;
    this.listeners = new Set();
    for (const c of cards) if (!this.byId.get(c.id)) throw new Error("dup " + c.id);
    this.load();
  }

  // ---------- persistence ----------
  load() {
    let saved = null;
    try { saved = JSON.parse(this.storage?.getItem(SAVE_KEY) ?? "null"); } catch { saved = null; }
    if (saved && saved.version === 1) {
      this.meta = saved.meta;
      this.dyn = saved.dyn;
      this.reign = saved.reign;
    } else {
      this.meta = { seen: [], deaths: [], objectives: [], kings: [], bestReign: 0, nameCounts: {} };
      this.dyn = null;
      this.reign = null;
    }
    this.seen = new Set(this.meta.seen);
    if (!this.dyn) this.newDynasty();
    if (!this.reign) this.newReign();
    if (!this.reign.card) this.drawCard();
  }

  save() {
    this.meta.seen = [...this.seen];
    const blob = JSON.stringify({ version: 1, meta: this.meta, dyn: this.dyn, reign: this.reign });
    try { this.storage?.setItem(SAVE_KEY, blob); } catch { /* storage full or disabled */ }
  }

  reset() {
    this.storage?.removeItem(SAVE_KEY);
    this.load();
    this.emit("reset");
  }

  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit(type, payload) { for (const fn of this.listeners) fn(type, payload, this); }

  // ---------- dynasty / reign ----------
  newDynasty() {
    this.dyn = {
      year: START_YEAR,
      flags: {},           // dynasty flags
      onceUsed: {},        // cards with once:true already shown
      kingIndex: 0,
      timeline: [],        // { name, from, to, death }
      demonStage: 0,
    };
  }

  newReign() {
    const idx = this.dyn.kingIndex++;
    const base = KING_NAMES[Math.floor(this.rng() * KING_NAMES.length)];
    const n = (this.meta.nameCounts[base] ?? 0) + 1;
    this.meta.nameCounts[base] = n;
    this.reign = {
      name: n > 1 ? `${base} ${roman(n)}` : base,
      baseName: base,
      startYear: this.dyn.year,
      years: 0,
      stats: { faith: 50, people: 50, army: 50, gold: 50 },
      effects: [],         // { key, years? }
      rflags: {},          // die with the king
      queue: [],           // { id, at }  follow-ups scheduled by dynasty year
      recent: [],
      card: null,
      dead: null,
      mode: null,          // duel / dungeon state
    };
    this.reign.stats = STATS.reduce((o, k) => ({ ...o, [k]: 40 + Math.floor(this.rng() * 21) }), {});
    // Every king is crowned. The Bargainer meets the first king, and keeps
    // visiting every heir until the bargain is settled one way or the other.
    this.reign.queue.push({ id: "story_coronation", at: this.dyn.year });
    if (idx === 0) this.reign.queue.push({ id: "story_demon_intro", at: this.dyn.year + 3 });
    else if (this.has("demon_met") && !this.has("bargain_broken")) {
      this.reign.queue.push({ id: "story_demon_heir_visit", at: this.dyn.year + 2 + Math.floor(this.rng() * 4) });
    }
    this.emit("reign");
  }

  // ---------- flags ----------
  has(flag) { return !!(this.dyn.flags[flag] || this.reign.rflags[flag]); }
  hasEffect(key) { return this.reign.effects.some((e) => e.key === key); }
  addEffect(key) {
    if (!EFFECTS[key]) return;
    if (this.hasEffect(key)) return;
    const def = EFFECTS[key];
    this.reign.effects.push({ key, years: def.years ?? null });
    // States like marriage don't compete for the four tray slots.
    const evictable = () => this.reign.effects.filter((e) => !EFFECTS[e.key].sticky);
    while (evictable().length > MAX_EFFECTS) {
      const victim = evictable()[0];
      this.reign.effects = this.reign.effects.filter((e) => e !== victim);
    }
    this.emit("effect", key);
  }
  removeEffect(key) {
    this.reign.effects = this.reign.effects.filter((e) => e.key !== key);
  }

  // ---------- eligibility ----------
  eligible(card) {
    if (card.chainOnly) return false;
    if (card.once && this.dyn.onceUsed[card.id]) return false;
    if (card.oncePerReign && this.reign.rflags["__seen_" + card.id]) return false;
    if (this.reign.recent.includes(card.id)) return false;
    return this.conditionsMet(card.when);
  }

  conditionsMet(w) {
    if (!w) return true;
    if (w.flags && !w.flags.every((f) => this.has(f))) return false;
    if (w.notFlags && w.notFlags.some((f) => this.has(f))) return false;
    if (w.minYear != null && this.dyn.year - START_YEAR < w.minYear) return false;
    if (w.maxYear != null && this.dyn.year - START_YEAR > w.maxYear) return false;
    if (w.minReign != null && this.reign.years < w.minReign) return false;
    if (w.effects && !w.effects.every((e) => this.hasEffect(e))) return false;
    if (w.notEffects && w.notEffects.some((e) => this.hasEffect(e))) return false;
    if (w.stats) {
      for (const [k, [lo, hi]] of Object.entries(w.stats)) {
        const v = this.reign.stats[k];
        if (v < lo || v > hi) return false;
      }
    }
    return true;
  }

  // ---------- drawing ----------
  drawCard() {
    const r = this.reign;
    // 1. due follow-ups, earliest first
    r.queue.sort((a, b) => a.at - b.at);
    const dueIdx = r.queue.findIndex((q) => q.at <= this.dyn.year);
    if (dueIdx >= 0) {
      const q = r.queue.splice(dueIdx, 1)[0];
      const c = this.byId.get(q.id);
      if (c && this.conditionsMet(c.when)) return this.setCard(c);
      // `next.else` names the card to show when the target's `when` fails.
      const alt = q.else && this.byId.get(q.else);
      if (alt && this.conditionsMet(alt.when)) return this.setCard(alt);
      return this.drawCard();
    }
    // 2. weighted random from the pool, preferring unseen cards (discovery)
    const pool = [];
    let total = 0;
    for (const c of this.cards) {
      if (!this.eligible(c)) continue;
      let w = c.weight ?? 1;
      if (!this.seen.has(c.id)) w *= 1.6;
      if (r.recent.slice(-RECENT_WINDOW * 2).some((id) => this.byId.get(id)?.char === c.char)) w *= 0.6;
      pool.push([c, w]);
      total += w;
    }
    if (!pool.length) return this.setCard(this.byId.get("story_empty_hall"));
    let x = this.rng() * total;
    for (const [c, w] of pool) { x -= w; if (x <= 0) return this.setCard(c); }
    return this.setCard(pool[pool.length - 1][0]);
  }

  setCard(card) {
    const r = this.reign;
    r.card = card.id;
    r.isNew = !this.seen.has(card.id);
    this.seen.add(card.id);
    if (card.once) this.dyn.onceUsed[card.id] = true;
    if (card.oncePerReign) r.rflags["__seen_" + card.id] = true;
    r.recent.push(card.id);
    if (r.recent.length > RECENT_WINDOW) r.recent.shift();
    this.save();
    this.emit("card", card);
    return card;
  }

  get card() {
    const m = this.reign.mode;
    if (m?.kind === "duel") return duelCard(this, m, this.rng);
    if (m?.kind === "deep") return deepCard(this, m, this.rng);
    return this.byId.get(this.reign.card);
  }
  get character() { return CHARACTERS[this.card?.char]; }

  startMode(spec) {
    const m = { ...spec };
    if (m.kind === "duel") { m.hp = m.hp ?? 3; m.foeHp = m.foeHp ?? 3; m.foeName = m.foeName ?? CHARACTERS[m.foe]?.name ?? "Your opponent"; m.tell = null; m.last = ""; }
    if (m.kind === "deep") { m.depth = 0; m.goal = m.goal ?? 6; m.torch = m.torch ?? 6; m.room = null; m.last = ""; }
    this.reign.mode = m;
  }

  // A swipe inside a mini-game. No year passes.
  chooseInMode(side) {
    const m = this.reign.mode;
    const res = m.kind === "duel" ? duelChoose(this, m, side, this.rng) : deepChoose(this, m, side, this.rng);
    const result = { side, card: null, choice: {}, deltas: res.deltas, death: res.death, saved: null, newEffect: null, mode: m.kind, ended: res.ended };
    if (!result.death) result.death = this.checkStats(result);
    if (result.death) { this.die(result.death); result.epitaph = DEATHS[result.death]; }
    else if (res.ended) { this.checkObjectives(); this.drawCard(); }
    this.save();
    this.emit("choice", result);
    return result;
  }

  // Resolve `random` sub-choices for preview/execution.
  resolveChoice(choice, roll = null) {
    if (!choice.random) return choice;
    const total = choice.random.reduce((s, r) => s + (r.chance ?? 1), 0);
    let x = (roll ?? this.rng()) * total;
    for (const r of choice.random) { x -= r.chance ?? 1; if (x <= 0) return { ...choice, ...r, random: null }; }
    return { ...choice, ...choice.random[choice.random.length - 1], random: null };
  }

  // Dots shown above meters while dragging. Without clarity: magnitude only.
  preview(side) {
    const ch = this.card?.[side];
    if (!ch) return {};
    const out = {};
    const fxs = ch.random ? ch.random.map((r) => r.fx ?? ch.fx ?? {}) : [ch.fx ?? {}];
    for (const fx of fxs) for (const [k, v] of Object.entries(fx)) {
      const mag = Math.abs(v) >= 10 ? 2 : Math.abs(v) > 0 ? 1 : 0;
      out[k] = Math.max(out[k]?.mag ?? 0, mag) ? { mag: Math.max(out[k]?.mag ?? 0, mag), value: v, uncertain: !!ch.random } : out[k];
    }
    return out;
  }

  // ---------- the swipe ----------
  choose(side) {
    const r = this.reign;
    if (r.mode) return this.chooseInMode(side);
    const card = this.card;
    if (!card || r.dead) return null;
    const raw = card[side];
    const ch = this.resolveChoice(raw);
    const result = { side, card, choice: ch, deltas: {}, death: null, saved: null, newEffect: null };

    for (const [k, v] of Object.entries(ch.fx ?? {})) {
      r.stats[k] += v;
      result.deltas[k] = v;
    }
    for (const f of ch.set ?? []) this.dyn.flags[f] = true;
    for (const f of ch.unset ?? []) delete this.dyn.flags[f];
    for (const f of ch.setReign ?? []) r.rflags[f] = true;
    for (const f of ch.unsetReign ?? []) delete r.rflags[f];
    if (ch.effect) { this.addEffect(ch.effect); result.newEffect = ch.effect; }
    if (ch.removeEffect) this.removeEffect(ch.removeEffect);
    if (ch.next) {
      const delay = ch.next.delay ?? 1;
      r.queue.push({ id: ch.next.id, at: this.dyn.year + 1 + delay, else: ch.next.else });
    }
    if (ch.mode) this.startMode(ch.mode);

    // a year passes
    this.dyn.year++;
    r.years++;
    this.tickEffects(result);

    if (ch.die) result.death = ch.die;
    else result.death = this.checkStats(result);

    if (result.death) {
      r.mode = null;
      this.die(result.death);
      result.epitaph = DEATHS[result.death];
    } else {
      this.checkObjectives();
      if (!r.mode) this.drawCard();
      else this.save();
    }
    this.save();
    this.emit("choice", result);
    return result;
  }

  tickEffects(result) {
    const r = this.reign;
    for (const e of [...r.effects]) {
      const def = EFFECTS[e.key];
      if (def.drift) for (const [k, v] of Object.entries(def.drift)) { r.stats[k] += v; result.deltas[k] = (result.deltas[k] ?? 0) + v; }
      if (e.years != null) { e.years--; if (e.years <= 0) this.removeEffect(e.key); }
    }
    // old age: long reigns end. Kings age faster after 30 years on the throne.
    if (!this.hasEffect("old_age") && !this.hasEffect("elixir") && r.years > 28 && this.rng() < (r.years - 28) * 0.04) {
      this.addEffect("old_age");
      r.queue.push({ id: "story_old_age_warning", at: this.dyn.year });
    }
    if (this.hasEffect("old_age") && !this.hasEffect("elixir")) {
      const e = r.effects.find((x) => x.key === "old_age");
      if (e.years <= 0 || this.rng() < 0.05) result.forceDeath = "old_age";
    }
    if (result.forceDeath && !result.death) result.death = result.forceDeath;
  }

  checkStats(result) {
    if (result.death) return result.death;
    const r = this.reign;
    for (const k of STATS) {
      if (r.stats[k] <= 0) {
        const net = r.effects.find((e) => EFFECTS[e.key].saves === k);
        if (net) { this.removeEffect(net.key); r.stats[k] = 20; result.saved = net.key; continue; }
        if (this.hasEffect("love")) return "broken_heart";
        return k + "_low";
      }
      if (r.stats[k] >= 100) {
        if (this.hasEffect("love")) return "broken_heart";
        return k + "_high";
      }
    }
    // clamp to sane range after saves
    for (const k of STATS) r.stats[k] = Math.max(0, Math.min(100, r.stats[k]));
    return null;
  }

  die(key) {
    const r = this.reign;
    r.dead = key;
    const entry = { name: r.name, from: r.startYear, to: this.dyn.year, years: r.years, death: key };
    this.dyn.timeline.push(entry);
    this.meta.kings.push(entry);
    if (!this.meta.deaths.includes(key)) this.meta.deaths.push(key);
    if (r.years > this.meta.bestReign) this.meta.bestReign = r.years;
    this.checkObjectives();
    this.emit("death", entry);
  }

  succeed() {
    if (!this.reign.dead) return;
    if (this.reign.dead === "cursed_final") this.newDynasty();
    this.newReign();
    this.drawCard();
    this.save();
  }

  // ---------- objectives ----------
  checkObjectives() {
    const got = new Set(this.meta.objectives);
    const add = (k) => { if (!got.has(k)) { got.add(k); this.emit("objective", k); } };
    if (this.reign.years >= 10) add("decade");
    if (this.reign.years >= 25) add("quarter");
    if (this.reign.years >= 50) add("half_century");
    if (this.meta.kings.length >= 5) add("five_kings");
    if (this.meta.kings.length >= 20) add("twenty_kings");
    if (this.meta.deaths.length >= 10) add("ten_deaths");
    if (this.seen.size >= 100) add("hundred_cards");
    if (this.seen.size >= 500) add("five_hundred_cards");
    if (this.seen.size >= this.cards.length) add("all_cards");
    for (const [flag, key] of Object.entries(FLAG_OBJECTIVES)) if (this.has(flag)) add(key);
    this.meta.objectives = [...got];
  }
}

const FLAG_OBJECTIVES = {
  married: "married",
  elf_alliance: "elf_alliance",
  orc_blood_oath: "orc_oath",
  dwarf_contract_signed: "dwarf_contract",
  dragon_dead: "dragon_slayer",
  dragon_friend: "dragon_friend",
  dungeon_cleared: "dungeon",
  duel_won: "duelist",
  bargain_broken: "bargain_broken",
  bargain_kept: "bargain_kept",
  toadstool_eaten: "toadstool",
  built_great_temple: "temple",
  abdicated: "abdicated",
};

export const OBJECTIVES = {
  decade: { name: "Ten Years", desc: "Rule for a decade." },
  quarter: { name: "A Quarter Century", desc: "Rule for 25 years." },
  half_century: { name: "Fifty Winters", desc: "Rule for 50 years." },
  five_kings: { name: "A Line", desc: "Bury five kings." },
  twenty_kings: { name: "A Dynasty", desc: "Bury twenty kings." },
  ten_deaths: { name: "Memento Mori", desc: "Die ten different ways." },
  hundred_cards: { name: "Petitions", desc: "Discover 100 cards." },
  five_hundred_cards: { name: "The Long Court", desc: "Discover 500 cards." },
  all_cards: { name: "Everything That Was Said", desc: "Discover every card." },
  married: { name: "A Queen", desc: "Marry." },
  elf_alliance: { name: "The Green Accord", desc: "Make the elves your allies." },
  orc_oath: { name: "Blood Oath", desc: "Swear brotherhood with the Ashfang." },
  dwarf_contract: { name: "Read the Annexes", desc: "Sign a dwarven contract and survive it." },
  dragon_slayer: { name: "Dragonslayer", desc: "Kill Vorrath the Old." },
  dragon_friend: { name: "Dragonfriend", desc: "Come to an understanding with Vorrath." },
  dungeon: { name: "What Lies Beneath", desc: "Reach the bottom of the Deep." },
  duelist: { name: "First Blood", desc: "Win a duel." },
  bargain_broken: { name: "Out of the Bargain", desc: "Cheat the Bargainer." },
  bargain_kept: { name: "Paid in Full", desc: "Give the Bargainer what he asked." },
  toadstool: { name: "Blue Cap", desc: "Eat the mushroom." },
  temple: { name: "The Great Temple", desc: "Build a temple worthy of the Flame." },
  abdicated: { name: "Goats", desc: "Leave the crown on the chair." },
};
