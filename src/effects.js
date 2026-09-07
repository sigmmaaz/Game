// Persistent effects shown in the bottom-right tray. At most MAX_EFFECTS at
// once; acquiring another evicts the oldest. `drift` runs every year.
// `saves` names the meter this effect rescues once from hitting 0.
export const MAX_EFFECTS = 4;

export const EFFECTS = {
  granary: { name: "Granary", glyph: "▦", desc: "Grain against famine. Once, when the people would starve, they don't.", saves: "people" },
  vault: { name: "Deep Vault", glyph: "◈", desc: "Dwarven-built. Once, when the treasury would empty, it doesn't.", saves: "gold" },
  great_temple: { name: "Great Temple", glyph: "▲", desc: "Once, when the Flame would gutter out, it flares instead.", saves: "faith" },
  high_walls: { name: "High Walls", glyph: "▮", desc: "Once, when the army would break, the walls hold.", saves: "army" },

  silk_road: { name: "Spice Road", glyph: "≋", desc: "Southern trade fills the vault every year. It also draws eyes.", drift: { gold: 3 } },
  purge: { name: "The Purging", glyph: "†", desc: "The Flamekeepers burn heretics. Faith rises. The people thin.", drift: { faith: 3, people: -3 } },
  plague: { name: "Grey Cough", glyph: "☠", desc: "A sickness in the city. Fewer people each year until it burns out.", drift: { people: -5 }, years: 4 },
  war: { name: "At War", glyph: "⚔", desc: "Every year of war costs soldiers and silver.", drift: { army: -4, gold: -3 } },
  famine: { name: "Famine", glyph: "▽", desc: "The harvest failed. People leave, or stop.", drift: { people: -4 }, years: 3 },
  tithe: { name: "Great Tithe", glyph: "◉", desc: "A tenth of everything goes to the Flame.", drift: { faith: 3, gold: -3 } },
  mint: { name: "Royal Mint", glyph: "¤", desc: "You print coin. The coin is worth a little less each year.", drift: { gold: 4, people: -2 } },
  prosperity: { name: "Good Years", glyph: "❀", desc: "Fat harvests, fat merchants.", drift: { people: 2, gold: 2 }, years: 6 },
  dragon_tax: { name: "Dragon's Due", glyph: "◆", desc: "Vorrath takes his share every year. He does keep his word.", drift: { gold: -5 } },

  clarity: { name: "Clarity", glyph: "◎", desc: "You see the numbers. Whether this is a gift is unclear." },
  old_age: { name: "Old Age", glyph: "⌛", desc: "Your knees know it. Your court knows it. Death is filling in the forms.", years: 12 },
  elixir: { name: "Elixir", glyph: "⚗", desc: "Something in your blood does not want you to die." },
  doomed: { name: "The Bargain", glyph: "✦", desc: "You owe the Bargainer. Every year you refuse him, he gets closer." },
  love: { name: "In Love", glyph: "♥", desc: "Dangerous. Kings who die in love die twice." },
  toadstool: { name: "Blue Cap", glyph: "☂", desc: "You ate the mushroom. Everyone looks like a frog now. Everyone is a frog now." },
  spy_network: { name: "Quiet Hands", glyph: "◑", desc: "The Whisperer hears everything. Plots come to you before they mature." },
  married: { name: "Married", glyph: "⚭", desc: "You have a queen. She has opinions." },
  heir: { name: "An Heir", glyph: "♙", desc: "Your line continues. That makes you replaceable." },
  excommunicated: { name: "Excommunicated", glyph: "✕", desc: "The Flame has cast you out. Faith cannot rise while this holds.", drift: { faith: -2 } },
  wanted: { name: "Marked", glyph: "◌", desc: "The Guild of Quiet Hands has your name. They are patient." },
};
