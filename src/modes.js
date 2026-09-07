// Mini-games. A mode takes over card generation until it ends. Mode cards do
// not advance the year; they drain meters or the king directly.

// ---------- DUEL ----------
// Each round the foe shows a tell. Most tells are honest; some are feints.
const DUEL_TELLS = {
  high: [
    "raises the blade over one shoulder. The ribs are open.",
    "comes in tall, guard up, eyes on your face. The low line is empty.",
    "swings high and wide, showing off for the crowd.",
    "lifts to strike at your head. It leaves the knee.",
  ],
  low: [
    "drops low, going for the legs. The head is unguarded.",
    "feints at your shin. The shoulder is turned.",
    "crouches, blade skimming the floor. Above the belt is wide open.",
    "sweeps low, hoping you'll jump. The throat is right there.",
  ],
};
const DUEL_HIT = ["Steel finds meat. First blood is yours.", "You read it right. The blade goes in and comes out red.", "A clean hit. The crowd makes a noise like one animal."];
const DUEL_MISS = ["It was a feint. The pommel takes you in the mouth.", "Wrong line. The edge opens your arm to the elbow.", "You guessed. Kings shouldn't guess. It cuts deep."];
const DUEL_CLASH = ["Blades lock. You shove apart, both breathing hard.", "Steel on steel, sparks, nothing. Again.", "You both read each other. Neither of you bleeds. Yet."];

export function duelCard(game, mode, rng) {
  const foe = game.byId.get(mode.foeCard)?.char ?? mode.foe;
  if (!mode.tell) {
    const truth = rng() < 0.5 ? "high" : "low";
    const honest = rng() < 0.7;
    const shown = honest ? truth : truth === "high" ? "low" : "high";
    mode.tell = { truth, shown };
  }
  const t = mode.tell;
  const tells = DUEL_TELLS[t.shown];
  const line = tells[Math.floor(rng() * tells.length)];
  const status = `You: ${"♥".repeat(mode.hp)}${"·".repeat(3 - mode.hp)}   Them: ${"♥".repeat(mode.foeHp)}${"·".repeat(3 - mode.foeHp)}`;
  return {
    id: "__duel", char: foe, isMode: true,
    text: `${mode.last ? mode.last + " " : ""}${mode.foeName} ${line}\n\n${status}`,
    left: { label: "Strike low" }, right: { label: "Strike high" },
  };
}

export function duelChoose(game, mode, side, rng) {
  const r = game.reign;
  const strike = side === "right" ? "high" : "low";
  // To hit high you strike where the high guard is open (they went low), and vice versa.
  const opening = mode.tell.truth === "high" ? "low" : "high";
  const res = { deltas: {}, death: null };
  if (strike === opening) { mode.foeHp--; mode.last = DUEL_HIT[Math.floor(rng() * 3)]; }
  else if (rng() < 0.35) { mode.last = DUEL_CLASH[Math.floor(rng() * 3)]; }
  else { mode.hp--; mode.last = DUEL_MISS[Math.floor(rng() * 3)]; }
  mode.tell = null;
  if (mode.foeHp <= 0) {
    r.mode = null;
    game.dyn.flags.duel_won = true;
    for (const [k, v] of Object.entries(mode.win?.fx ?? {})) { r.stats[k] += v; res.deltas[k] = v; }
    for (const f of mode.win?.set ?? []) game.dyn.flags[f] = true;
    if (mode.win?.next) r.queue.push({ id: mode.win.next, at: game.dyn.year });
    res.ended = "win";
  } else if (mode.hp <= 0) {
    r.mode = null;
    res.death = mode.lose ?? "duel";
    res.ended = "lose";
  }
  return res;
}

// ---------- THE DEEP ----------
// A branching descent. Each fork is a card; the king picks a passage. Rooms
// are rolled from a table weighted by depth. Torches run out.
const ROOMS = [
  { w: 3, kind: "fork", text: "Two passages. The left one smells of wet stone. The right one smells of nothing at all, which is worse." },
  { w: 3, kind: "fork", text: "The stair splits. Someone has scratched an arrow on the wall pointing left. Someone else has scratched it out." },
  { w: 3, kind: "fork", text: "A low room with two doors. There's a boot in the middle of the floor. Just the one." },
  { w: 2, kind: "trap", text: "The floor is tiled in two colours. The Captain says the dark tiles look 'load-bearing'. He doesn't say what they're bearing." },
  { w: 2, kind: "trap", text: "A long hall. Holes in the walls at chest height, left and right. Something oiled them recently." },
  { w: 2, kind: "loot", text: "A side chamber. A chest with a dwarven lock, and a sack with no lock at all. You can carry one." },
  { w: 2, kind: "loot", text: "Bones in the corner wearing a very good ring. The skull is watching the ring, not you." },
  { w: 2, kind: "skeleton", text: "A skeleton in old armour steps out of the wall. It raises a sword, slowly, like it's remembering how." },
  { w: 1, kind: "rat", text: "The rat again. The clerk one. It sits at a fork and looks left, then at you, then left again." },
  { w: 1, kind: "torch", text: "A dead man's pack. A torch in it, half-burned. Also a letter you don't read." },
  { w: 1, kind: "water", text: "The passage is flooded to the knee. Something moves under the surface, unhurried. There's a ledge on the right." },
  { w: 1, kind: "voice", text: "A voice from the dark ahead says your name. Your childhood one. The one only your mother used." },
];

function rollRoom(rng, depth) {
  const total = ROOMS.reduce((s, r) => s + r.w, 0);
  let x = rng() * total;
  for (const r of ROOMS) { x -= r.w; if (x <= 0) return r; }
  return ROOMS[0];
}

export function deepCard(game, mode, rng) {
  if (!mode.room) {
    if (mode.depth >= mode.goal) mode.room = { kind: "bottom", text: "The stair ends. A door, ajar. Lamplight behind it, and the scratch of a pen." };
    else mode.room = rollRoom(rng, mode.depth);
  }
  const room = mode.room;
  const status = `Depth ${mode.depth} · torch ${"▮".repeat(Math.max(0, mode.torch))}${"▯".repeat(Math.max(0, 6 - mode.torch))}`;
  const labels = {
    fork: ["Left passage", "Right passage"],
    trap: ["Dark tiles", "Light tiles"],
    loot: ["The locked one", "The open one"],
    skeleton: ["Fight it", "Run past it"],
    rat: ["Follow the rat", "Go right anyway"],
    torch: ["Take the torch", "Leave the dead alone"],
    water: ["Wade through", "Take the ledge"],
    voice: ["Answer it", "Walk on"],
    bottom: ["Go in", "Go in"],
  }[room.kind];
  const char = room.kind === "skeleton" ? "skeleton" : room.kind === "rat" ? "rat" : room.kind === "voice" ? "ghost" : "captain";
  return {
    id: "__deep", char, isMode: true,
    text: `${mode.last ? mode.last + " " : ""}${room.text}\n\n${status}`,
    left: { label: labels[0] }, right: { label: labels[1] },
  };
}

export function deepChoose(game, mode, side, rng) {
  const r = game.reign;
  const res = { deltas: {}, death: null };
  const hit = (k, v) => { r.stats[k] += v; res.deltas[k] = (res.deltas[k] ?? 0) + v; };
  const room = mode.room;
  const right = side === "right";
  mode.last = "";
  switch (room.kind) {
    case "fork":
      if (rng() < 0.5) { mode.depth++; mode.last = "The passage slopes down."; }
      else { mode.last = "Dead end. You double back, and the torch is shorter for it."; mode.torch--; }
      break;
    case "trap":
      if (rng() < 0.5) { hit("army", -8); mode.last = "Click. A dart in the Captain's shoulder. He says it's fine in a voice that means it isn't."; }
      else { mode.last = "Nothing. You breathe out."; mode.depth++; }
      break;
    case "loot":
      if (right) { if (rng() < 0.6) { hit("gold", 12); mode.last = "Coin. Old coin, with a face you don't know."; } else { hit("people", -6); mode.last = "Dust. It gets in your lungs and stays."; } }
      else { if (rng() < 0.4) { hit("gold", 25); mode.last = "Dwarven gold. Somewhere in the Deep Holds a ledger just changed."; game.dyn.flags.dwarf_grudge = true; } else { mode.torch--; mode.last = "The lock eats a torch's worth of time and gives nothing."; } }
      break;
    case "skeleton":
      if (!right) { if (rng() < 0.65) { mode.last = "You take it apart. It seems relieved."; hit("faith", 4); mode.depth++; } else { hit("army", -12); mode.last = "It's faster than it looks. Rook drags you clear, bleeding."; } }
      else { if (rng() < 0.7) { mode.last = "It swings at where you were."; mode.depth++; } else { hit("army", -8); mode.torch--; mode.last = "It catches your cloak. You lose the cloak, and a torch, and some dignity."; } }
      break;
    case "rat":
      if (!right) { mode.depth += 2; mode.last = "The rat knows the way. Of course it does."; }
      else { mode.torch--; mode.last = "The rat watches you go the wrong way with what can only be pity."; }
      break;
    case "torch":
      if (!right) { mode.torch = Math.min(6, mode.torch + 3); mode.last = "Light. The dead man doesn't mind."; }
      else { hit("faith", 4); mode.last = "You leave him his torch. It's the decent thing. It's also dark."; }
      break;
    case "water":
      if (!right) { if (rng() < 0.6) { mode.depth++; mode.last = "Cold, but only cold."; } else { mode.torch = Math.max(0, mode.torch - 2); hit("army", -6); mode.last = "Something takes the Captain's boot, and nearly the Captain. The torch hisses out and has to be relit from the spare."; } }
      else { mode.last = "Slow, careful, dry."; mode.depth++; mode.torch--; }
      break;
    case "voice":
      if (!right) { if (rng() < 0.5) { hit("faith", -10); mode.depth += 2; mode.last = "It tells you the way down. It tells you other things, too, that you'll wish it hadn't."; } else { res.death = "dungeon"; } }
      else { mode.last = "You don't answer. It stops, eventually."; hit("faith", 4); }
      break;
    case "bottom":
      r.mode = null;
      game.dyn.flags.deep_visited = true;
      r.queue.push({ id: mode.exit ?? "story_deep_4", at: game.dyn.year });
      res.ended = "win";
      return res;
  }
  mode.room = null;
  if (mode.torch <= 0 && !res.death) res.death = "dungeon";
  if (res.death) { r.mode = null; res.ended = "lose"; }
  return res;
}
