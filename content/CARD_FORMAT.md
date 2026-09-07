# Crown of Ash — card format and writing guide

You are writing cards for a swipe-based kingdom game (in the style of Reigns).
The player is a HUMAN KING of the Empire of Vael, an old, tired, human empire
wedged between other peoples: the Sylvan elves of the Greenreach to the west,
the Ashfang orc clans across the Scar to the north, the dwarven Deep Holds under
the Iron Teeth mountains, goblin markets, troll bridges, halfling river-farms,
a dragon or two, the fae, the dead who do not stay buried, and — somewhere
underneath everything — a Demon who has taken an interest in this bloodline.

Each card is ONE petitioner talking to the king. The player swipes LEFT or RIGHT.
Each swipe is one year of reign. The four meters are:

| key      | meaning                                   | icon   |
|----------|-------------------------------------------|--------|
| `faith`  | the Church of the Undying Flame           | flame  |
| `people` | the common folk's happiness               | face   |
| `army`   | the army's strength and loyalty           | sword  |
| `gold`   | the treasury                              | coin   |

Every meter runs 0–100 and the king DIES if any meter hits 0 OR 100.
Too much is as deadly as too little: an adored king is carried off by the mob,
a rich king is robbed and feasted to death, a strong army stages a coup, a
powerful Church makes a martyr of him.

## Schema

Export a plain array from a JS module: `export default [ ...cards ];`

```js
{
  id: "elf_envoy_1",          // unique, lowercase, prefix with YOUR file prefix
  char: "elf_envoy",          // character key — see CHARACTERS below
  text: "Your border wardens shot at our hunting party. We were not hunting them. Yet.",
  left:  { label: "Apologize", fx: { faith: 0, people: -5, army: -10, gold: -5 } },
  right: { label: "They were trespassing", fx: { army: 10, people: 5 }, set: ["elf_grudge"], next: { id: "elf_envoy_2", delay: 2 } },

  // OPTIONAL fields:
  when: {
    flags: ["married"],          // all must be set
    notFlags: ["queen_dead"],    // none may be set
    minYear: 10,                 // dynasty year (counts across all kings)
    minReign: 5,                 // years the CURRENT king has ruled
    stats: { gold: [0, 30] },    // meter must be within [min,max] inclusive
    effects: ["war"],            // all active
    notEffects: ["plague"],
  },
  once: true,                    // appears once per dynasty (default: repeatable)
  oncePerReign: true,            // at most once per king
  weight: 2,                     // draw weight, default 1 (use 2–3 for "common" cards, 0.5 for rare)
  reignOnly: true,               // card only relevant to this king — flags set with `setReign` die with him
}
```

Choice (`left` / `right`) fields:

- `label` (required) — what the king says or does. 1–6 words. Terse. Often funny.
- `fx` — meter deltas. Omit zero keys. Magnitudes:
  - small: ±3 to ±9 (renders as a small dot)
  - big:   ±10 to ±25 (renders as a big dot) — USE THESE OFTEN. The game must be lethal.
- `set` / `unset` — dynasty flags (arrays of strings). Prefix with your file prefix.
- `setReign` / `unsetReign` — flags that vanish when the king dies.
- `next` — `{ id, delay }` queue a follow-up card. `delay: 0` = very next card. `delay: 3` = about 3 years later. Chains are the heart of the game; write many. Optional `else: "other_id"` names a card to show instead if the target's `when` fails.
- `effect` — add a persistent effect (see EFFECTS). `removeEffect` — remove one.
- `die` — a death key (see DEATHS). The king dies right after this choice, with that epitaph. Use sparingly but really use it: some choices must simply kill you.
- `mode` — start a mini-game after this choice. `{ kind: "duel", foe: "orc_warchief", lose: "orc_axe", win: { fx: { army: 15 }, set: ["flag"], next: "card_id" } }` runs a three-hit duel where the player reads the opponent's tells. `{ kind: "deep", goal: 6, exit: "card_id" }` sends the king down the Deep: forks, traps, a torch that runs out. Use `mode` at most twice per file.
- `random` — array of `{ chance, ...choice-fields }` overrides; the engine picks one by weight. Example: `random: [ {chance: 0.6, fx:{gold:15}}, {chance: 0.4, fx:{army:-15}, next:{id:"x", delay:0}} ]`

A card may also have:
- `after` — a card that is a pure consequence and has only one meaningful outcome should still give both labels; make them flavor ("So be it." / "Hm.") with the same `fx`. Do this rarely; two real choices is better.

## CHARACTERS

Use ONLY these keys. If you need someone new, use the closest and put their
name/role in the text. Each key already has a name, title and portrait.

Court (human): `chancellor` (Aldric Vane, Lord Chancellor — old, smooth, survivalist), `treasurer` (Mistress Odile Penn — counts everything, never smiles), `general` (Marshal Brannoc Thorne — wants a war, any war), `spymaster` (the Whisperer — face never seen), `flamekeeper` (High Flamekeeper Osric — the Church; fat, pious, dangerous), `steward` (Wendel — runs the palace, terrified of you), `jester` (Pib — tells the truth, badly), `healer` (Doctor Amaury — leeches, theories), `queen` (whoever the king married; text should work for any wife), `prince` (your son, heir), `princess` (your daughter), `brother` (the king's brother, Duke Edmund — ambitious), `mother` (the Dowager), `captain` (Captain Rook of the palace guard), `executioner`, `judge` (Justiciar Maud), `architect` (Master Builder Fennick), `bard`, `peasant` (a different farmer each time), `merchant` (Guildmaster Tobias Crane), `innkeeper`, `child` (a random child of the city), `hermit` (a wild-eyed prophet), `ghost` (a dead king of your line), `old_woman`, `messenger`, `knight` (Sir Gavriel, the last decent knight), `pirate` (Captain Sable), `foreign_king` (the Emperor of Kethra, the human power to the south), `foreign_envoy`.

Elves: `elf_envoy` (Lord Cael of Greenreach — polite, contemptuous, patient), `elf_queen` (the Lady Aerinwe, eleven hundred years old), `elf_ranger`, `elf_scholar`, `half_elf` (Sera, half-elf, belongs nowhere).

Orcs: `orc_warchief` (Grukhar of the Ashfang — blunt, honorable in his own way), `orc_envoy` (Shazza — his daughter, smarter than him), `orc_shaman`, `orc_mercenary`.

Dwarves: `dwarf_thane` (Thane Borri Ironledger of the Deep Holds — everything is a contract), `dwarf_engineer` (Master Hesk — explosive ideas), `dwarf_envoy`, `dwarf_smith`.

Others: `goblin` (Nizzik, a goblin trader — everything's for sale), `troll` (owns a bridge), `halfling` (Mayor Posy Underhill of the river-farms), `gnome` (a tinkerer), `giant`, `dragon` (Vorrath the Old — talks slowly, wants gold, keeps his word), `fae` (a fairy noble, rules-lawyer), `witch` (Old Mab, the hedge-witch — the only one who tells you what things cost), `alchemist` (Master Quill — tries to make gold, makes explosions), `mage` (the Archmage Sylvane of the Tower), `necromancer`, `vampire` (Count Vesper — very old, very polite), `skeleton`, `wolf`, `demon` (the Bargainer — do NOT use him in bulk files; he belongs to the story files), `angel` (a Flame-messenger, ambiguous), `cultist`, `assassin`, `slaver`, `refugee`, `beast` (a monster of the week), `plague_doctor`, `dog` (the king's hound — never speaks; the text is narration), `rat`.

## EFFECTS (only these)

Safety nets (consumed when a meter would hit 0; instead it is set to ~20):
`granary` (people), `vault` (gold), `great_temple` (faith), `high_walls` (army).

Drifts (change meters every year): `silk_road` (gold +3/yr, occasional raid cards), `purge` (faith +3, people -3 per yr), `plague` (people -5/yr for a few years), `war` (army -4, gold -3 per yr until peace), `famine` (people -4/yr), `tithe` (faith +3, gold -3), `mint` (gold +4, people -2), `prosperity` (people +2, gold +2), `dragon_tax` (gold -5/yr).

Special: `clarity` (shows exact numbers), `old_age` (the king is old; death approaches), `elixir` (protects from old age), `doomed` (the Demon's curse — story files only), `love` (the king is in love; dying while in love is "a broken heart"), `toadstool` (everyone looks like frogs; cosmetic), `spy_network`, `married`, `heir`, `excommunicated`, `wanted` (assassins hunt you).

## DEATHS (for `die`)

`duel`, `poison`, `assassin_blade`, `fell_from_tower`, `eaten_by_dragon`, `drowned`, `burned_as_heretic`, `hanged_by_army`, `torn_by_mob`, `choked_at_feast`, `plague`, `old_age`, `dungeon`, `broken_heart`, `stepped_on_by_giant`, `cursed`, `frozen`, `avalanche`, `struck_by_lightning`, `bad_mushroom`, `orc_axe`, `elf_arrow`, `dwarven_contract`, `troll_toll`, `fae_bargain`, `lost_at_sea`, `wolves`, `explosion`, `vampire`, `buried_alive`, `peaceful` (abdicated / went to live in the woods).

## WRITING RULES — READ TWICE

The goal: text that reads like one sharp, tired, funny human wrote it. Not a
model. Specifically:

1. **Short.** Card text ≤ 200 characters. Most under 140. One idea per card.
2. **Concrete, not generic.** Not "a terrible plague spreads" but "The cooper's
   family went blue and stopped moving. Nobody will go down Tanner Lane."
3. **Petitioners have wants.** Every card is someone who wants something from
   you and is a little bit lying about why.
4. **Funny sideways.** Humor comes from understatement, bureaucracy, bad
   priorities, and people saying the quiet part. Never from the narrator
   winking. No puns in the text unless a character is bad at them (Pib).
5. **Consequences hurt.** Many "kind" choices should hemorrhage gold or army.
   Many "strong" choices should enrage the people or the Church. Some choices
   just kill you (`die`). The player should feel each swipe is a gamble.
6. **Chains.** At least a third of your cards should belong to a chain of 2–5
   cards using `next` and flags. Escalate. The elf who asks for a hunting
   permit comes back wanting the forest, then the border, then your daughter.
7. **Voice per people.** Elves: slow, formal, faintly amused by mortals, never
   raise their voice, threats phrased as observations. Orcs: short words,
   direct, a strict honor code humans don't understand, dry. Dwarves: contracts,
   clauses, grudges kept in ledgers, offended by rounding. Goblins: salesmen.
   Fae: literal-minded, delighted by loopholes. Church: unctuous. Peasants:
   practical, complain about specifics (the mill, the road, the tax on geese).
8. **Labels are the king's voice.** Dry, short, sometimes cruel, sometimes
   weak. "Fine." / "Hang him." / "How much?" / "Not my problem." / "Send the
   army." / "Let them try." / "Give her the forest." / "Pretend I didn't hear."
9. **Never** use: "Ah,", "Indeed", "I must say", "Very well then", "delve",
   "tapestry", "testament", "a dance of", "whispers of", "the very fabric",
   "little did", "it seems", "in the end", "as you wish, sire" (once is fine,
   twenty times is a pattern). No sentence beginning with "Alas". No more than
   one exclamation mark per 10 cards. Don't end cards with rhetorical
   questions unless the character is genuinely asking. Don't explain the joke.
   Don't summarize the choice in the text ("Will you help or refuse?"). The
   swipe labels are the choice.
10. **No reused templates.** If two of your cards could be swapped by
    find-and-replace, delete one.
11. Address the king as "Sire", "Majesty", "Your Grace", "King", "my lord", or
    by nothing at all (orcs don't bother). Vary it. Peasants get it wrong.
12. Meters must make sense: the Church cares about heresy, magic, the dead, and
    its tithe; the people about bread, safety, spectacle, and taxes; the army
    about pay, glory, honor and not being ordered to do stupid things; gold
    about gold.

### Examples of the level we want

```js
{ id: "ex_1", char: "peasant",
  text: "The river took the bridge at Hollin Ford. Then it took the ferryman. We'd like a new bridge, or a new ferryman who can swim.",
  left:  { label: "A bridge. Stone.", fx: { gold: -15, people: 10 } },
  right: { label: "Learn to swim.", fx: { people: -10 } } },

{ id: "ex_2", char: "elf_envoy",
  text: "The Lady Aerinwe congratulates you on your coronation. She attended your great-grandfather's. She says you have his ears.",
  left:  { label: "Thank her.", fx: { faith: -3 } },
  right: { label: "What does she want?", fx: { army: 5 }, next: { id: "ex_3", delay: 1 } } },

{ id: "ex_3", char: "elf_envoy",
  text: "Only a small thing. The hunting rights to the Thornwood. It was ours before your people had writing, and the deer miss us.",
  left:  { label: "The deer will cope.", fx: { people: 5, army: 5 }, set: ["elf_grudge"] },
  right: { label: "Take the wood.", fx: { people: -15, gold: 5 }, set: ["elf_favor"] } },

{ id: "ex_4", char: "dwarf_thane",
  text: "Clause fourteen, subsection two. Your grandfather owed us eleven barrels of wine a year. He's paid none of them. You have inherited the wine.",
  left:  { label: "Pay it.", fx: { gold: -20, people: -5 } },
  right: { label: "He also inherited death.", fx: { gold: 5 }, set: ["dwarf_grudge"], next: { id: "ex_5", delay: 4 } } },

{ id: "ex_5", char: "dwarf_thane",
  text: "We have adjusted the ledger. The wine is now a road. The road runs under your treasury. Sign here and we'll stop digging.",
  left:  { label: "Sign.", fx: { gold: -25 } },
  right: { label: "Keep digging.", fx: { army: 5 }, random: [
      { chance: 0.5, fx: { gold: -30 } },
      { chance: 0.5, fx: { gold: -10, army: -10 }, die: "dwarven_contract" } ] } },

{ id: "ex_6", char: "orc_warchief",
  text: "Your farmers put a fence across the Scar. My riders burned it. Now your farmers are angry and my riders are bored. Fix one.",
  left:  { label: "Move the farmers.", fx: { people: -15, army: -5 } },
  right: { label: "Bore your riders elsewhere.", fx: { army: 10, people: 5 }, next: { id: "ex_7", delay: 2 } } },
```

Note how each one is a specific person, with a specific stake, being specific.
