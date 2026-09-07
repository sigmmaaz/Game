// The borders: Threeways market, tolls, mixed marriages, and everyone's grudges.
// Prefix: fr_. Shared flags used: elf_grudge, dwarf_grudge, orc_grudge, elf_alliance, orc_blood_oath.
export default [
  // ---------- Threeways ----------
  {
    id: "fr_threeways_1", char: "merchant", once: true,
    text: "Crane. \"Threeways. Where the Scar road meets the river road meets the forest road. Four peoples, one market, no law. Last week an orc sold a dwarf his own hammer back. It's thriving. I want a piece.\"",
    left: { label: "Garrison it.", fx: { army: 10, gold: -5 }, set: ["fr_tw_garrison"], next: { id: "fr_threeways_2", delay: 2 } },
    right: { label: "Let it run.", fx: { people: 5, gold: 5 }, set: ["fr_tw_free"], next: { id: "fr_threeways_3", delay: 2 } },
  },
  {
    id: "fr_threeways_2", char: "captain", chainOnly: true,
    text: "Rook. \"My men are in Threeways, Sire. They don't fight in the market anymore. They fight in the alley behind it. Also my sergeant's married a dwarf. I checked. There's no rule.\"",
    left: { label: "Tax the market.", fx: { gold: 15, people: -10 }, set: ["fr_tw_taxed"], next: { id: "fr_threeways_4", delay: 2 } },
    right: { label: "Leave the market alone.", fx: { people: 5, army: -5 }, next: { id: "fr_threeways_5", delay: 3 } },
  },
  {
    id: "fr_threeways_3", char: "goblin", chainOnly: true,
    text: "Nizzik, in a hat with a badge on it. \"Threeways elected a council. Me, an elf, an orc, a dwarf, and a woman who sells eels. We'd like a charter. We'll pay for the parchment.\"",
    left: { label: "Grant the charter.", fx: { gold: 10, people: 5, faith: -5 }, set: ["fr_tw_charter"], next: { id: "fr_threeways_5", delay: 3 } },
    right: { label: "No town votes in my empire.", fx: { people: -10, army: 5 }, next: { id: "fr_threeways_4", delay: 2 } },
  },
  {
    id: "fr_threeways_4", char: "orc_envoy", chainOnly: true,
    text: "Shazza. \"Your men at Threeways take a coin from every orc stall and none from the human ones. My father calls it a tax on tusks. He's not wrong. Fix it before he fixes it.\"",
    left: { label: "Same tax for all.", fx: { gold: 5, people: -5 }, next: { id: "fr_threeways_6", delay: 2 } },
    right: { label: "Orcs can trade elsewhere.", fx: { army: 5, gold: -10 }, set: ["orc_grudge"], next: { id: "fr_threeways_6", delay: 2 } },
  },
  {
    id: "fr_threeways_5", char: "elf_ranger", chainOnly: true,
    text: "A ranger with a Threeways market-token on a cord. \"It works. Nobody planned it, which is why. A dwarf owes me a drink and a human owes me a boot. Whatever you're about to do to it, do less.\"",
    left: { label: "Do less.", fx: { people: 10, gold: -5 }, set: ["fr_tw_free"] },
    right: { label: "Do more.", fx: { gold: 10, people: -10 }, next: { id: "fr_threeways_6", delay: 1 } },
  },
  {
    id: "fr_threeways_6", char: "messenger", chainOnly: true,
    text: "Threeways burned, Sire. Started in the eel stall, ended at the granary. Elves blame dwarves, dwarves blame orcs, orcs blame your garrison, the eel woman blames everyone. Nobody's wrong.",
    left: { label: "Rebuild it. All of us.", fx: { gold: -15, people: 10 }, set: ["fr_tw_rebuilt"] },
    right: { label: "Let the ash settle.", fx: { gold: 5, people: -15, army: -5 } },
  },
  {
    id: "fr_tw_council", char: "goblin", when: { flags: ["fr_tw_charter"] }, oncePerReign: true,
    text: "Councillor Nizzik, badge polished. \"First decree of Threeways: no kings inside the market. Soldiers spend nothing. Second decree: you're welcome any time. As a customer.\"",
    left: { label: "I'll come as a customer.", fx: { people: 10, army: -5, gold: -5 } },
    right: { label: "A king goes where he likes.", fx: { army: 5, people: -10 } },
  },
  {
    id: "fr_tw_native", char: "captain", when: { flags: ["fr_tw_garrison"] }, oncePerReign: true,
    text: "Rook. \"The Threeways garrison has gone native. Half speak orc, all owe the dwarf tavern, one's engaged to the eel woman. When I give an order they check with the council. There isn't one.\"",
    left: { label: "Rotate them home.", fx: { army: 5, people: -10 } },
    right: { label: "Leave them. They're happy.", fx: { army: -10, people: 10 } },
  },

  // ---------- the marriage at Sallow ----------
  {
    id: "fr_marriage_1", char: "peasant", once: true,
    text: "Tam Wickes, of Sallow. \"My girl's marrying an orc. Ruk. He fixed our roof and hasn't eaten anybody. The village says it's against nature. I say nature's never fixed my roof.\"",
    left: { label: "Let them marry.", fx: { faith: -10, people: -5 }, set: ["fr_mixed_wed"], next: { id: "fr_marriage_2", delay: 2 } },
    right: { label: "The village decides.", fx: { people: 5, faith: 5 }, next: { id: "fr_marriage_3", delay: 1 } },
  },
  {
    id: "fr_marriage_2", char: "flamekeeper", chainOnly: true,
    text: "Osric, damp with outrage. \"A Flame-priest wed a woman to an orc at Sallow. On your authority, he says. The Flame does not bless things with tusks. I've had him flogged. Gently.\"",
    left: { label: "Unflog him. Loudly.", fx: { faith: -15, people: 10 } },
    right: { label: "The Church knows best.", fx: { faith: 10, people: -10 } },
  },
  {
    id: "fr_marriage_3", char: "orc_warchief", chainOnly: true,
    text: "Grukhar. \"Ruk is my sister's son. Your village drove him out with rakes. Rakes. He came home ashamed, which for us is worse than dead. The girl came with him. She is ours now.\"",
    left: { label: "Send men to fetch her.", fx: { people: 5 }, random: [
      { chance: 0.6, fx: { army: -10 }, set: ["orc_grudge"] },
      { chance: 0.4, die: "orc_axe" },
    ] },
    right: { label: "She chose.", fx: { people: -10, army: -5 }, next: { id: "fr_marriage_4", delay: 5 } },
  },
  {
    id: "fr_marriage_4", char: "peasant", chainOnly: true,
    text: "Tam Wickes, older. \"She writes. Ruk built her a house with a door you can stand up in. There's a grandchild. Green as a bean. I want a pass north to see him and the border man says no.\"",
    left: { label: "Give him a pass.", fx: { people: 5, army: -5 } },
    right: { label: "The border is closed.", fx: { people: -10, faith: 5 } },
  },

  // ---------- the child in Tanner Lane ----------
  {
    id: "fr_halforc_1", char: "steward", once: true,
    text: "Wendel, with paper. \"A child was born in Tanner Lane. Mother's a laundress, father's one of the orc mercenaries. The Church wants it. The orcs want it. The mother wants everyone to leave.\"",
    left: { label: "Leave the mother alone.", fx: { people: 5, faith: -5 }, next: { id: "fr_halforc_2", delay: 1 } },
    right: { label: "Bring the child to court.", fx: { people: -5, gold: -5 }, next: { id: "fr_halforc_3", delay: 1 } },
  },
  {
    id: "fr_halforc_2", char: "flamekeeper", chainOnly: true,
    text: "Osric. \"The child has no soul, or half of one, and either way it's Church business. I'm not asking to burn it. I'm asking to baptise it, in the old way. With the iron.\"",
    left: { label: "No iron.", fx: { faith: -15, people: 10 }, next: { id: "fr_halforc_4", delay: 6 } },
    right: { label: "Baptise it.", fx: { faith: 10, people: -15 }, next: { id: "fr_halforc_4", delay: 6 } },
  },
  {
    id: "fr_halforc_3", char: "orc_shaman", chainOnly: true,
    text: "The shaman looks at the baby a long time. \"Orc enough. Give it to us at seven, it becomes a rider. Keep it, it grows up ashamed. You know which. You have a mirror.\"",
    left: { label: "At seven, it goes north.", fx: { people: -5, army: 5 }, set: ["fr_halforc_orc"] },
    right: { label: "It's a citizen of Vael.", fx: { people: 5, faith: -5 }, set: ["fr_halforc_vael"], next: { id: "fr_halforc_4", delay: 6 } },
  },
  {
    id: "fr_halforc_4", char: "child", chainOnly: true,
    text: "A child with small tusks and a laundress's hands. \"Mum says you decided about me. I don't know what. The other kids call me Half. I want to be a soldier, or a baker. Which one's allowed?\"",
    left: { label: "Both.", fx: { people: 10, army: -5, faith: -5 } },
    right: { label: "Neither. Go home.", fx: { people: -10, faith: 5 } },
  },

  // ---------- the Whitewater: dam or grove ----------
  {
    id: "fr_river_1", char: "dwarf_engineer", once: true,
    text: "Hesk, with drawings. \"The Whitewater. A dam here. Nine mills, a lake for your fish, lamps in your city. The only thing under the lake would be trees. Old ones. Elves. Fussy.\"",
    left: { label: "Build the dam.", fx: { gold: -10 }, set: ["fr_dam"], next: { id: "fr_river_2", delay: 1 } },
    right: { label: "Hear the elves first.", fx: {}, next: { id: "fr_river_3", delay: 0 } },
  },
  {
    id: "fr_river_2", char: "elf_ranger", chainOnly: true,
    text: "The ranger doesn't sit. \"The Hollow Grove is where we put our dead. Standing, in the trees. Your dwarf wants forty feet of water over them. Say no. Or go and say it to them.\"",
    left: { label: "The dam stands.", fx: { gold: 15, people: 5 }, set: ["elf_grudge"], random: [
      { chance: 0.7, fx: { army: -5 }, next: { id: "fr_river_4", delay: 3 } },
      { chance: 0.3, die: "elf_arrow" },
    ] },
    right: { label: "Move the dam downstream.", fx: { gold: -5 }, set: ["dwarf_grudge"] },
  },
  {
    id: "fr_river_3", char: "elf_ranger", chainOnly: true,
    text: "\"The grove is sacred. I'm told that word means nothing to you. Try this one: it is full. Nine hundred of us stand in those trees. Flood them and they will not stay standing.\"",
    left: { label: "No dam.", fx: { gold: -5, faith: 5 }, set: ["fr_dam_refused", "dwarf_grudge"] },
    right: { label: "Dam it anyway.", fx: { gold: 10, people: 5 }, set: ["elf_grudge", "fr_dam"], next: { id: "fr_river_4", delay: 3 } },
  },
  {
    id: "fr_river_4", char: "dwarf_engineer", chainOnly: true,
    text: "Hesk, wet. \"Dam's up. Lake's filling. The trees under it are humming. My lads won't work the sluice at night. I've offered double. They've offered to quit. I'd like a priest, or a bigger sluice.\"",
    left: { label: "Send a priest.", fx: { faith: 10, gold: -5 } },
    right: { label: "Open the sluice. Drain it.", fx: { gold: -15, people: -5 }, set: ["fr_dam_drained"] },
  },

  // ---------- the straight road ----------
  {
    id: "fr_road_1", char: "dwarf_envoy", once: true,
    text: "The envoy unrolls a map. \"The Deep Holds want a road to your capital. Straight. That goes through the Greenreach. We cut it in a season. The elves complain for a century, which to them is the same.\"",
    left: { label: "Cut the road.", fx: { gold: 15 }, set: ["elf_grudge", "fr_road_cut"], next: { id: "fr_road_2", delay: 2 } },
    right: { label: "Go round the forest.", fx: { gold: -10 }, set: ["dwarf_grudge"], next: { id: "fr_road_3", delay: 2 } },
  },
  {
    id: "fr_road_2", char: "elf_envoy", chainOnly: true,
    text: "Lord Cael. \"The dwarves have felled a straight line through the Greenreach. From the air it looks like a wound. We have no air. We have the dwarves, though, who are very slow on foot.\"",
    left: { label: "Guard the road crews.", fx: { army: -10, gold: -5 } },
    right: { label: "The dwarves are on their own.", fx: { army: 5 }, next: { id: "fr_road_4", delay: 1 } },
  },
  {
    id: "fr_road_3", char: "dwarf_envoy", chainOnly: true,
    text: "\"Round the forest is forty miles longer. Forty miles at Deep Hold rates is a number I've written here. You owe it, or you owe it with interest, or the road goes through your palace cellar instead.\"",
    left: { label: "Pay the forty miles.", fx: { gold: -15 } },
    right: { label: "Dig where you like.", fx: { army: 5 }, random: [
      { chance: 0.7, fx: { gold: -10, army: -5 } },
      { chance: 0.3, die: "dwarven_contract" },
    ] },
  },
  {
    id: "fr_road_4", char: "messenger", chainOnly: true,
    text: "The dwarf road crew was found at dawn. All alive. All bald. Every beard shaved to the chin and stacked neatly on the road. The dwarves call it an act of war. The elves call it a haircut.",
    left: { label: "It was a haircut.", fx: { people: 10 }, set: ["dwarf_grudge"] },
    right: { label: "It was war.", fx: { army: 10, gold: -10 }, set: ["elf_grudge"] },
  },

  // ---------- the herds ----------
  {
    id: "fr_migrate_1", char: "orc_envoy", once: true,
    text: "Shazza. \"Every winter the herds go south to the Bleak grass. Every winter your farmers plant a little further north. This year the path is wheat. Goats don't read fences. Move the wheat or lose it.\"",
    left: { label: "Let them cross.", fx: { people: -15, army: -5 }, set: ["fr_herds_cross"], next: { id: "fr_migrate_2", delay: 1 } },
    right: { label: "Hold the line.", fx: { army: 5, people: 5 }, next: { id: "fr_migrate_3", delay: 1 } },
  },
  {
    id: "fr_migrate_2", char: "peasant", chainOnly: true,
    text: "Bleakfield man. \"Ten thousand goats went through my winter wheat, king. Ten thousand. I counted the first hundred and gave up. The orc chief left a purse on the gatepost. It's very light.\"",
    left: { label: "Make up the difference.", fx: { gold: -10, people: 10 } },
    right: { label: "A purse is a purse.", fx: { people: -10, gold: 5 } },
  },
  {
    id: "fr_migrate_3", char: "general", chainOnly: true,
    text: "Thorne, cheerful. \"We held the line. The herds turned east into the Fenmarch and drowned, mostly. The orcs are burying goats and saying your name. Not fondly. Winter's early up there.\"",
    left: { label: "Send grain north.", fx: { gold: -15, army: -5, people: 5 } },
    right: { label: "Their goats, their problem.", fx: { army: 5, people: 5 }, set: ["orc_grudge"], next: { id: "fr_migrate_4", delay: 1 } },
  },
  {
    id: "fr_migrate_4", char: "orc_warchief", chainOnly: true,
    text: "Grukhar rides to your gate in the snow. \"Four thousand goats dead. Forty children. Come north and see what your line cost. Come alone. If you're what you say, you'll come back.\"",
    left: { label: "Go.", fx: { faith: 5 }, random: [
      { chance: 0.5, fx: { army: 10, people: 10 }, set: ["fr_orc_respected"] },
      { chance: 0.5, die: "frozen" },
    ] },
    right: { label: "Send Thorne.", fx: { army: -10, people: -5 } },
  },

  // ---------- Fallow Cross ----------
  {
    id: "fr_goblin_1", char: "goblin", once: true,
    text: "Nizzik, not smiling, which is unsettling. \"Your soldiers stopped my caravan at Fallow Cross. Took the silk, the salt, my cousin's shoes. In your colours. I kept the receipt they didn't give me.\"",
    left: { label: "Find the soldiers.", fx: { army: -10, people: 5 }, next: { id: "fr_goblin_2", delay: 1 } },
    right: { label: "Goblins lie.", fx: { people: 5, army: 5, gold: 5 }, set: ["fr_goblin_cheated"], next: { id: "fr_goblin_3", delay: 3 } },
  },
  {
    id: "fr_goblin_2", char: "captain", chainOnly: true,
    text: "Rook. \"It was the Fallow garrison. Whole company. Their pay's five months late, Sire, which isn't an excuse but it is a reason. The silks are in the barracks. Someone's made curtains.\"",
    left: { label: "Hang their captain.", fx: { army: -15, people: 5, faith: 5, gold: -10 } },
    right: { label: "Pay them. Return the goods.", fx: { gold: -15, army: 10 } },
  },
  {
    id: "fr_goblin_3", char: "goblin", chainOnly: true,
    text: "Nizzik, smiling again. \"No hard feelings. I've sold the story to the halflings, the dwarves and the Scar. Nobody comes to Fallow Cross market now. It was a nice market. Anyway. Prices are up.\"",
    left: { label: "How much to shut up?", fx: { gold: -15, people: 5 } },
    right: { label: "Nobody listens to goblins.", fx: { gold: -10, people: -10 } },
  },

  // ---------- barges ----------
  {
    id: "fr_barge_1", char: "halfling", once: true,
    text: "Mayor Underhill, up to your knee, furious. \"Your toll at Kingsbridge is a copper a barge. Fine. Your toll man now charges by the barrel. Our barges are barrels. It's turnips, Your Highness.\"",
    left: { label: "A copper a barge.", fx: { gold: -10, people: 10 }, set: ["fr_barge_fair"] },
    right: { label: "By the barrel.", fx: { gold: 15, people: -10 }, next: { id: "fr_barge_2", delay: 2 } },
  },
  {
    id: "fr_barge_2", char: "halfling", chainOnly: true,
    text: "\"We've stopped coming. The turnips go downriver to Kethra now, and Kethra pays. Your city's onion soup is just soup. The bakers are rioting. Small riots. Halfling-sized. Yours are bigger.\"",
    left: { label: "Drop the toll.", fx: { gold: -5, people: 10 } },
    right: { label: "Let them eat soup.", fx: { gold: 5 }, random: [
      { chance: 0.7, fx: { people: -15 } },
      { chance: 0.3, die: "torn_by_mob" },
    ] },
  },
  {
    id: "fr_barge_troll", char: "troll", weight: 0.7,
    text: "The Kingsbridge troll. \"Halfling barges go under my bridge. Under is still my bridge. I want a barrel a barge. The mayor says talk to you. So. Talk. Or come to the bridge and we'll talk there.\"",
    left: { label: "A barrel a barge.", fx: { people: -5, gold: -5 } },
    right: { label: "Nothing goes under free.", fx: { army: 5 }, random: [
      { chance: 0.7, fx: { gold: 5 } },
      { chance: 0.3, die: "troll_toll" },
    ] },
  },

  // ---------- grey fever ----------
  {
    id: "fr_plague_1", char: "plague_doctor", once: true,
    text: "The beak points at a map. \"Grey fever at Threeways. Humans, dwarves and orcs have it. Elves don't, which the orcs find suspicious. There's one crate of feverbark. It'll do a third of them.\"",
    left: { label: "Humans first.", fx: { people: 10, army: -5 }, set: ["fr_plague_human"], next: { id: "fr_plague_2", delay: 1 } },
    right: { label: "Sickest first. Any kind.", fx: { people: -10, faith: -5 }, set: ["fr_plague_fair"], next: { id: "fr_plague_3", delay: 1 } },
  },
  {
    id: "fr_plague_2", char: "dwarf_envoy", chainOnly: true,
    text: "\"Clause: mutual aid in pestilence, signed by your grandfather. You gave the feverbark to humans. Eleven dwarves are dead. Eleven is a number we'll remember. It's written down, your name beside it.\"",
    left: { label: "Compensate the families.", fx: { gold: -10 }, next: { id: "fr_plague_4", delay: 2 } },
    right: { label: "Humans come first here.", fx: { army: 5, people: 5 }, set: ["dwarf_grudge"], next: { id: "fr_plague_4", delay: 2 } },
  },
  {
    id: "fr_plague_3", char: "peasant", chainOnly: true,
    text: "A Threeways woman. \"You gave my husband's medicine to an orc. The orc lived. My husband didn't. The orc came to the burial and stood at the back, and I don't know what to do with that.\"",
    left: { label: "I'm sorry.", fx: { people: 5, faith: 5 }, next: { id: "fr_plague_4", delay: 2 } },
    right: { label: "The orc was sicker.", fx: { people: -10, army: 5 }, next: { id: "fr_plague_4", delay: 2 } },
  },
  {
    id: "fr_plague_4", char: "elf_scholar", chainOnly: true,
    text: "The scholar. \"Elves don't take grey fever. It's a moss we eat. I can teach your doctors to grow it; that's nine years. Or I give you our stock, we go without, and the Lady will want something later.\"",
    left: { label: "Take the stock.", fx: { people: 15, gold: -10 }, set: ["fr_moss_debt"] },
    right: { label: "Nine years, then.", fx: { people: -5, gold: -5 } },
  },

  // ---------- one word ----------
  {
    id: "fr_translate_1", char: "half_elf", once: true,
    text: "Sera, pale. \"The orc treaty. Your scribe wrote 'the King holds the Scar.' In Ashfang, 'holds' is what you do to a prisoner or a wife. Grukhar has read it. He's stopped talking, which is bad.\"",
    left: { label: "Send Sera to explain.", fx: { people: -5, army: -5 }, next: { id: "fr_translate_2", delay: 1 } },
    right: { label: "Let him stew.", fx: { army: 5 }, set: ["fr_translate_stew"], next: { id: "fr_translate_3", delay: 2 } },
  },
  {
    id: "fr_translate_2", char: "orc_warchief", chainOnly: true,
    text: "Grukhar. \"Your half-elf explained. I laughed. My riders did not hear the explanation, only the word. Three hundred already ride for your border. I'll call them back. It costs me. It will cost you.\"",
    left: { label: "Name your price.", fx: { gold: -15, army: -5 }, next: { id: "fr_translate_4", delay: 2 } },
    right: { label: "Call them back for nothing.", fx: {}, random: [
      { chance: 0.6, fx: { army: 10, people: 5 }, next: { id: "fr_translate_4", delay: 2 } },
      { chance: 0.4, fx: { army: -15 }, set: ["orc_grudge"], next: { id: "fr_translate_3", delay: 0 } },
    ] },
  },
  {
    id: "fr_translate_3", char: "general", chainOnly: true,
    text: "Thorne. \"Orc riders at Ashford. Not raiding. Standing, in a line, facing us. I've had the men stand in a line facing them. It's been three days. Someone will sneeze eventually.\"",
    left: { label: "Ride out. Explain it myself.", fx: { faith: 5 }, random: [
      { chance: 0.6, fx: { army: 10, people: 10 }, set: ["fr_orc_respected"], next: { id: "fr_translate_4", delay: 2 } },
      { chance: 0.4, die: "orc_axe" },
    ] },
    right: { label: "Pull back.", fx: { army: -15, people: -5 }, next: { id: "fr_translate_4", delay: 2 } },
  },
  {
    id: "fr_translate_4", char: "chancellor", chainOnly: true,
    text: "Vane. \"The scribe responsible has been found. He's eleven. He's the Flamekeeper's nephew and he was proud of the penmanship. I can hang him, promote him, or send him to Greenreach to learn elvish.\"",
    left: { label: "Greenreach.", fx: { faith: -5, gold: -5, people: 5 } },
    right: { label: "Promote him.", fx: { faith: 5, army: -5 } },
  },

  // ---------- Kethra's clean method ----------
  {
    id: "fr_kethra_1", char: "foreign_envoy", once: true, weight: 0.5,
    text: "The Kethran envoy, in silk that cost more than your hall. \"The Emperor notes you are surrounded by things with tusks and points. He has dealt with his own. He offers to lend you how. A clean method.\"",
    left: { label: "Tell me the method.", fx: { faith: 5 }, next: { id: "fr_kethra_2", delay: 0 } },
    right: { label: "Tell your Emperor no.", fx: { army: 5, people: 5 }, set: ["fr_kethra_refused"], next: { id: "fr_kethra_4", delay: 6 } },
  },
  {
    id: "fr_kethra_2", char: "foreign_envoy", chainOnly: true,
    text: "\"Ships. His ships, your ports. The non-humans go south to work Kethran fields. Free labour for him, clean borders for you. He asks only that you not call it what it is. In writing.\"",
    left: { label: "Get out.", fx: { people: 5, faith: 5, army: 5 }, set: ["fr_kethra_refused"], next: { id: "fr_kethra_4", delay: 6 } },
    right: { label: "In writing, no.", fx: { gold: 25, people: -10, faith: -10 }, set: ["fr_kethra_ships"], next: { id: "fr_kethra_3", delay: 2 } },
  },
  {
    id: "fr_kethra_3", char: "half_elf", chainOnly: true,
    text: "Sera stands at the door and doesn't come in. \"The first ship left this morning. Forty goblins, nine dwarves, a halfling on the wrong dock. I translated for the loading. I'm not doing the second ship.\"",
    left: { label: "No second ship.", fx: { gold: -15, people: 5 }, set: ["fr_kethra_stopped"], unset: ["fr_kethra_ships"] },
    right: { label: "There will be a second ship.", fx: { gold: 15, faith: -5 }, set: ["elf_grudge", "dwarf_grudge", "orc_grudge"], random: [
      { chance: 0.7, fx: { people: -15 } },
      { chance: 0.3, die: "torn_by_mob" },
    ] },
  },
  {
    id: "fr_kethra_4", char: "foreign_king", chainOnly: true,
    text: "The Emperor writes in his own hand, which is meant to frighten you. \"You keep strange company. When your elves and orcs turn on you, and they will, remember I offered. My price will not be the same.\"",
    left: { label: "Burn the letter.", fx: { army: 5, faith: 5 } },
    right: { label: "Keep it. Reply politely.", fx: { gold: 5, people: -5 } },
  },

  // ---------- the census ----------
  {
    id: "fr_census_1", char: "treasurer", once: true,
    text: "Odile. \"The census. I need to know what a citizen is. Dwarves in the Iron Quarter pay tax. Orcs in the north field don't. Elves say they're guests, forty years running. Define it and I'll count it.\"",
    left: { label: "Anyone who pays.", fx: { gold: 15, faith: -10 }, set: ["fr_census_pay"], next: { id: "fr_census_2", delay: 2 } },
    right: { label: "Humans. Obviously.", fx: { faith: 10, people: 5 }, set: ["fr_census_human"], next: { id: "fr_census_3", delay: 2 } },
  },
  {
    id: "fr_census_2", char: "flamekeeper", chainOnly: true,
    text: "An Iron Quarter smith, apron on. \"Not a citizen, your census says. Fair. Then no tax, no horseshoes, and I'm taking my anvil. It's in your barracks.\"",
    left: { label: "They paid. Give them a pew.", fx: { faith: -15, people: 10, gold: 5 } },
    right: { label: "Pews are for humans.", fx: { faith: 10, gold: -10 } },
  },
  {
    id: "fr_census_3", char: "dwarf_smith", chainOnly: true,
    text: "An Iron Quarter smith, apron on. \"Not a citizen, your census says. Fair. Then no tax, no horseshoes, and I'm taking my anvil. It's a large anvil. It's in your barracks.\"",
    left: { label: "You're a citizen. Sorry.", fx: { faith: -5, gold: 5, army: 5 } },
    right: { label: "Take your anvil.", fx: { gold: -15, army: -10 }, set: ["dwarf_grudge"] },
  },

  // ---------- Gavriel's company ----------
  {
    id: "fr_regiment_1", char: "knight", once: true,
    text: "Sir Gavriel. \"A border company. Forty men, twenty orcs, ten dwarves, elves if any will come. They'd know each other's tricks. Thorne says it's madness. He said that about stirrups.\"",
    left: { label: "Raise the company.", fx: { army: -10, gold: -5 }, set: ["fr_mixed_company"], next: { id: "fr_regiment_2", delay: 2 } },
    right: { label: "Thorne's right.", fx: { army: 5, people: -5 } },
  },
  {
    id: "fr_regiment_2", char: "general", chainOnly: true,
    text: "Thorne. \"Gavriel's mongrel company. The orcs won't march in step, the dwarves won't march uphill, the elf won't march. And yet they took the Fenmarch bandits in a night. I don't like it.\"",
    left: { label: "Give them the whole border.", fx: { army: 10, gold: -5 }, next: { id: "fr_regiment_3", delay: 3 } },
    right: { label: "Disband it.", fx: { army: 5, people: -5 }, unset: ["fr_mixed_company"] },
  },
  {
    id: "fr_regiment_3", char: "knight", chainOnly: true,
    text: "Gavriel, arm in a sling. \"Kethran raiders at the coast. My company held them. We lost the elf. The orcs want to bury her their way, the dwarves theirs, and nobody knows hers. Choose one.\"",
    left: { label: "Orc way. Face down.", fx: { faith: -10, army: 5 } },
    right: { label: "Send her home to Greenreach.", fx: { army: -5, faith: 5, gold: -5 }, set: ["fr_elf_returned"] },
  },

  // ---------- kegs and turnips ----------
  {
    id: "fr_smuggle_1", char: "spymaster", once: true,
    text: "The Whisperer, behind the curtain. \"Dwarven powder is coming over the Iron Teeth in beer kegs. Enough to remove a palace. The buyer's in the city. I can name him, for a price. Or name someone.\"",
    left: { label: "Name him.", fx: { gold: -10 }, next: { id: "fr_smuggle_2", delay: 1 } },
    right: { label: "Name someone.", fx: { people: -10, army: 5, gold: 5 } },
  },
  {
    id: "fr_smuggle_2", char: "merchant", chainOnly: true,
    text: "Crane, sweating. \"It was for quarrying. Quarrying, Sire. A hundred kegs. Under the Guildhall. Which is beside the treasury, I realise, in retrospect. I'd like to make a donation.\"",
    left: { label: "Take the donation. And the kegs.", fx: { gold: 25, army: 5 } },
    right: { label: "Hang him.", fx: { people: 5, faith: 5, gold: -10, army: -5 } },
  },
  {
    id: "fr_smuggle_wine", char: "halfling", weight: 0.7,
    text: "Mayor Underhill, not meeting your eye. \"The barge with the elven wine under the turnips. It was on our barge, in our turnips, under our mark, but it wasn't ours. The customs man drank the evidence.\"",
    left: { label: "Fine the river-farms.", fx: { gold: 15, people: -10 } },
    right: { label: "Send me what's left.", fx: { faith: -5, people: 5 }, random: [
      { chance: 0.8, fx: { gold: 5 } },
      { chance: 0.2, die: "poison" },
    ] },
  },

  // ---------- the conference ----------
  {
    id: "fr_peace_1", char: "chancellor", once: true, weight: 0.5, when: { minReign: 4 },
    text: "Vane. \"A peace conference. All peoples, one table, at Threeways. Nobody's tried since your great-grandfather's, which ended in what our histories call a misunderstanding and the elves call Tuesday.\"",
    left: { label: "Convene it.", fx: { gold: -10 }, next: { id: "fr_peace_2", delay: 1 } },
    right: { label: "Peace by letter.", fx: { people: -5 } },
  },
  {
    id: "fr_peace_2", char: "steward", chainOnly: true,
    text: "Wendel, with a seating chart, unslept. \"The orcs won't sit below the elves. The elves won't sit at all. The dwarves want a clause on the chairs. The goblin's selling seats.\"",
    left: { label: "Round table.", fx: { gold: -10 }, next: { id: "fr_peace_3", delay: 0 } },
    right: { label: "I sit highest. Done.", fx: { army: 5, people: 5 }, set: ["fr_peace_high"], next: { id: "fr_peace_3", delay: 0 } },
  },
  {
    id: "fr_peace_3", char: "messenger", chainOnly: true,
    text: "Third day, Sire. Nobody has died. Lord Cael has spoken once. Grukhar has eaten a chair. Thane Borri has drafted forty pages. The Lady's cup-bearer is asking which cup is yours.",
    left: { label: "Drink with them.", fx: {}, random: [
      { chance: 0.35, fx: { people: 15, army: 5 }, set: ["elf_alliance", "fr_peace_signed"] },
      { chance: 0.35, fx: { army: 10, people: 5 }, set: ["orc_blood_oath", "fr_peace_signed"] },
      { chance: 0.3, die: "poison" },
    ] },
    right: { label: "Drink from my own flask.", fx: {}, random: [
      { chance: 0.5, fx: { people: 5, faith: 5 }, set: ["fr_peace_signed"] },
      { chance: 0.5, fx: { people: -10, army: -5 }, set: ["fr_peace_failed"], next: { id: "fr_peace_4", delay: 1 } },
    ] },
  },
  {
    id: "fr_peace_4", char: "jester", chainOnly: true,
    text: "Pib. \"Summary of the peace conference: elves left first, politely. Orcs left second, with the table. The dwarves are still there, billing you for the room. I stole a spoon. Peace!\"",
    left: { label: "Pay for the room.", fx: { gold: -10 } },
    right: { label: "Keep the spoon. Bill the dwarves.", fx: { gold: 5 }, set: ["dwarf_grudge"] },
  },

  // ---------- the fort ----------
  {
    id: "fr_fort_1", char: "architect", once: true,
    text: "Fennick. \"A fort at the Scar crossing. Stone, three towers, a gate the orcs can't kick in. Ten years of taxes. Or a wooden one in a year, which the orcs can kick in, but politely.\"",
    left: { label: "Stone.", fx: { gold: -20, army: 10 }, set: ["fr_fort_stone"], next: { id: "fr_fort_2", delay: 3 } },
    right: { label: "Wood.", fx: { gold: -5, army: 5 }, next: { id: "fr_fort_3", delay: 2 } },
  },
  {
    id: "fr_fort_2", char: "orc_warchief", chainOnly: true,
    text: "Grukhar looks at your new fort a long time. \"Good wall. Very high. My riders can't climb it. So they went round. Your farms are behind it. Your fort is not. Explain the plan to me. Slowly.\"",
    left: { label: "Garrison the farms too.", fx: { army: -10, gold: -10 }, effect: "high_walls", next: { id: "fr_fort_4", delay: 3 } },
    right: { label: "The fort is the plan.", fx: { army: 5, people: -10 }, set: ["orc_grudge"] },
  },
  {
    id: "fr_fort_3", char: "captain", chainOnly: true,
    text: "Hesk, at the fort. \"Your walls are good. Ours would be better. A season and I'll put a second wall inside the first, and a third nobody finds. Price is in the drawer. Don't open it yet.\"",
    left: { label: "Pay the orc.", fx: { gold: -5, people: 5 } },
    right: { label: "Burn the bill.", fx: { army: 5 }, set: ["orc_grudge"] },
  },
  {
    id: "fr_fort_4", char: "dwarf_engineer", chainOnly: true,
    text: "Hesk, at the fort. \"Your walls are good. Ours would be better. A season and I'll put a second wall inside the first, and a third nobody finds. Price is in the drawer. Don't open the drawer yet.\"",
    left: { label: "Open the drawer.", fx: {}, random: [
      { chance: 0.7, fx: { gold: -15, army: 10 } },
      { chance: 0.3, fx: { gold: -5 }, die: "dwarven_contract" },
    ] },
    right: { label: "The walls are good enough.", fx: { army: 5 } },
  },

  // ---------- everyday border ----------
  {
    id: "fr_stone", char: "elf_ranger", weight: 2,
    text: "A ranger, at the border stone. \"Your farmers moved this stone three feet east. We moved it back. They moved it. This has happened nine times. We are elves. We have the time. Do they?\"",
    left: { label: "Move the farmers back.", fx: { people: -10 } },
    right: { label: "Three feet is nothing.", fx: { people: 5 }, set: ["elf_grudge"] },
  },
  {
    id: "fr_knives", char: "orc_envoy", weight: 2,
    text: "Shazza. \"Your gate guards search every orc for weapons. Every one, every time. An orc without a knife is naked. You've stripped three hundred of my people at your gate. It looks bad for both of us.\"",
    left: { label: "Knives stay. Swords don't.", fx: { army: -5, people: -5, gold: 5 } },
    right: { label: "Search them all.", fx: { army: 5, people: 5, gold: -10 }, set: ["orc_grudge"] },
  },
  {
    id: "fr_tariff", char: "dwarf_envoy", weight: 2,
    text: "\"Your tariff on iron is twelve parts in a hundred. On steel, nine. Steel is iron. We've shipped steel-labelled iron for a decade and now your customs man has learned to read. The ledger is attached.\"",
    left: { label: "Back-tax them.", fx: { gold: 25 }, set: ["dwarf_grudge"] },
    right: { label: "Steel it is.", fx: { gold: -10, people: 5 } },
  },
  {
    id: "fr_weir_troll", char: "halfling", weight: 1.5,
    text: "Mayor Underhill. \"A troll's moved onto the mill weir. He isn't charging toll. He just eats carp. The children throw bread at him. We'd like him to stay, honestly, but we'd like it in writing.\"",
    left: { label: "The troll may stay.", fx: { people: 5, faith: -10 } },
    right: { label: "Trolls belong on bridges.", fx: { army: -5, gold: -5, faith: 5 } },
  },
  {
    id: "fr_licence", char: "goblin", weight: 2,
    text: "Nizzik. \"Border licence: sixty crowns a year for a goblin, six for a dwarf, nothing for an elf. Not complaining. I'm offering to buy the licence office. A hundred goblins through by spring, all paid.\"",
    left: { label: "Sell him the office.", fx: { gold: 25, people: -10 } },
    right: { label: "Nobody buys a border.", fx: { gold: -5, people: 5 } },
  },
  {
    id: "fr_sera_wage", char: "half_elf", weight: 1.5,
    text: "Sera. \"The border post needs a translator. I speak all four. They offered a dwarf's wage: half an elf's, twice an orc's, which is what humans get. Pick one. I'd like to be one thing on the roll.\"",
    left: { label: "A human's wage.", fx: { people: 5, gold: -5 } },
    right: { label: "An elf's wage.", fx: { gold: -10, faith: -5, army: 5 } },
  },
  {
    id: "fr_dwarf_refugees", char: "refugee", weight: 1.5,
    text: "A dwarf woman with three children and no beard-clasp. \"The Deep Holds sealed a gallery. Ours. Nobody said why. Forty of us at your border. We can dig, smith and count. We can't go home.\"",
    left: { label: "Let them in.", fx: { people: -5, gold: 15 }, set: ["fr_dwarf_refugees"] },
    right: { label: "Send them back to the Holds.", fx: { people: 5, gold: -5, faith: -5 } },
  },
  {
    id: "fr_kethra_refugees", char: "refugee", weight: 1.5,
    text: "Humans, this time, coming north from Kethra. \"The Emperor cleared our valley for a hunting park. We heard you take in orcs and goblins. We hoped you'd take in us. We're less trouble. Probably.\"",
    left: { label: "Take them in.", fx: { people: 5, gold: -5 } },
    right: { label: "Kethra's problem.", fx: { people: -10, gold: 5 } },
  },
  {
    id: "fr_salt", char: "peasant", weight: 2,
    text: "Orc trader came through Sallow selling salt at half price. Everybody bought. Then the salt-tax man came, said orc salt's untaxed, and fined us for buying it. Tax the orc, not us. Or tax nobody.",
    left: { label: "Tax the orc.", fx: { gold: 15, people: -5 }, set: ["orc_grudge"] },
    right: { label: "Tax nobody.", fx: { gold: -10, people: 10 } },
  },
  {
    id: "fr_rope", char: "merchant", weight: 1.5,
    text: "Crane. \"An elven ropewalk opened at Threeways. Their rope doesn't rot. Ours does, which is how we sell more of it. The Guild asks you to ban elven rope for reasons of... I've written 'tradition'.\"",
    left: { label: "Ban it.", fx: { gold: 5, people: -10 }, set: ["elf_grudge"] },
    right: { label: "Buy the good rope.", fx: { gold: -5, army: 5, people: 5 } },
  },
  {
    id: "fr_swim", char: "knight", weight: 1.5,
    text: "Gavriel, damp. \"A halfling boy fell in the Whitewater. An orc rider went in after him. The orc couldn't swim either. I went in after both. All fine. The orc wants to be knighted. I said I'd ask.\"",
    left: { label: "Knight the orc.", fx: { army: -10, faith: -5, people: 10 } },
    right: { label: "Orcs aren't knights.", fx: { army: 5, people: -5 } },
  },
  {
    id: "fr_wolves", char: "elf_ranger", weight: 1.5,
    text: "A ranger with a wolf pelt over one shoulder. \"Your border villages feed the wolves. Bones, scraps, a goat once. The pack has learned where villages are. This winter it learns what else is in them.\"",
    left: { label: "Hunt the pack.", fx: { army: -5, gold: -5, people: 5 } },
    right: { label: "Wolves are your side's problem.", fx: {}, random: [
      { chance: 0.75, fx: { people: -10 } },
      { chance: 0.25, die: "wolves" },
    ] },
  },
  {
    id: "fr_creek", char: "peasant", weight: 2,
    text: "Hollin Bank, sir. The halflings dammed the creek upstream for their barges. Our mill's dry. They say the creek's theirs by charter. We can't read the charter. Neither can they. Someone should.",
    left: { label: "The charter stands.", fx: { people: -10, gold: 5 } },
    right: { label: "Break the dam. I'll watch.", fx: { people: 5 }, random: [
      { chance: 0.7, fx: { gold: -5 } },
      { chance: 0.3, die: "drowned" },
    ] },
  },
  {
    id: "fr_sergeant", char: "orc_mercenary", weight: 1.5,
    text: "\"Border duty. Your sergeant told my lads to shoot at anything green crossing the Scar. Half my lads are green. He's fine. He's in the river. He can swim, mostly. We'd like a new sergeant.\"",
    left: { label: "New sergeant.", fx: { army: -5, people: 5 } },
    right: { label: "Fish him out. Flog you.", fx: { army: 5, people: -5 }, random: [
      { chance: 0.7, fx: {} },
      { chance: 0.3, fx: { army: -15 }, set: ["orc_grudge"] },
    ] },
  },
  {
    id: "fr_song", char: "bard", weight: 1.5,
    text: "The bard has a song about Threeways. In it a dwarf loves an elf, an orc loves a human, and the king loves his tax. It rhymes. It's popular in four languages. It's less popular in your court.",
    left: { label: "Let him sing it.", fx: { people: 10, faith: -5, army: -5 } },
    right: { label: "Cut a verse. Mine.", fx: { people: -5, gold: 5 } },
  },
  {
    id: "fr_chapels", char: "flamekeeper", weight: 1.5,
    text: "Osric. \"The border chapels have started blessing orc marriages, dwarf contracts and elf... whatever elves do. The priests say it brings in coin. It does. I'd like it stopped, and I'd like the coin.\"",
    left: { label: "Stop it. He gets the coin.", fx: { faith: 10, people: -10, gold: -10 } },
    right: { label: "The chapels are doing fine.", fx: { faith: -15, gold: 15, people: 5 } },
  },
  {
    id: "fr_herdboy", char: "general", weight: 1.5,
    text: "Thorne. \"Patrol found an orc herd-boy, twelve, on our side of the Scar. Lost. My lieutenant wants to send him home. My sergeant wants a hostage. My horse wants to bite him. Three votes.\"",
    left: { label: "Send him home. On a horse.", fx: { army: -5, gold: -5, people: 5 }, set: ["fr_orc_boy_returned"] },
    right: { label: "Keep him.", fx: { army: 5, people: -5 }, set: ["orc_grudge"] },
  },
  {
    id: "fr_herdboy_horse", char: "orc_warchief", once: true, when: { flags: ["fr_orc_boy_returned"] },
    text: "Grukhar. \"The herd-boy came home on a horse. Your horse. A good horse. He says a king's man gave it. I have brought a horse back. It is a better horse. Don't insult me by saying no.\"",
    left: { label: "Take the horse.", fx: { army: 10, people: 5 } },
    right: { label: "Your horse is too good.", fx: { army: -10 }, set: ["orc_grudge"] },
  },
  {
    id: "fr_pidgin", char: "elf_scholar", weight: 1.5,
    text: "The scholar. \"Threeways has invented a language. Half elvish, a third Ashfang, some dwarf oaths, human for the numbers. Only children speak it. I'd like to record it before it becomes a country.\"",
    left: { label: "Record it.", fx: { gold: -5, faith: -5, people: 5 } },
    right: { label: "Ban it in the schools.", fx: { people: -10, faith: 5 } },
  },
  {
    id: "fr_two_laws", char: "judge", weight: 1.5,
    text: "Justiciar Maud. \"A dwarf sued an orc at Threeways. Orc law: the loser owes a fight. Dwarf law: the loser owes a clause. Your law: whichever's older. Both are older than yours. A ruling, or a holiday.\"",
    left: { label: "My law. Fine them both.", fx: { gold: 10, people: -5, army: 5 } },
    right: { label: "Let them fight it out.", fx: { people: 10 }, random: [
      { chance: 0.7, fx: {} },
      { chance: 0.3, fx: { army: -10 } },
    ] },
  },
  {
    id: "fr_three_necks", char: "executioner", weight: 1.5,
    text: "The executioner, cap in hand. \"Border court sent me a goblin thief, a dwarf forger and an orc who hit a tax man. Three peoples wanting three bodies back. Or one rope, and let them argue.\"",
    left: { label: "Hang them all.", fx: { faith: 5, people: 5, army: 5 }, set: ["orc_grudge", "dwarf_grudge"] },
    right: { label: "Send them home to be judged.", fx: { people: -10, gold: -5 } },
  },
  {
    id: "fr_map", char: "dwarf_thane", weight: 1.5,
    text: "Borri. \"A human at Threeways sold a dwarf a map to a gold seam. The seam is under Deep Hold. It's ours. The map is accurate. We'd like the human, the map, and a clause forbidding maps.\"",
    left: { label: "Hand over the human.", fx: { people: -10, gold: 5 } },
    right: { label: "Maps are free.", fx: {}, random: [
      { chance: 0.6, fx: { gold: 15 }, set: ["dwarf_grudge"] },
      { chance: 0.4, fx: { gold: -15, army: -5 } },
    ] },
  },
  {
    id: "fr_hair", char: "elf_envoy", weight: 1.5,
    text: "Lord Cael. \"A human at Threeways sells elven hair. Ours. Cut from the dead, one presumes; none of the living offered. Your ladies buy it. It's a fashion. We would like it to stop being one.\"",
    left: { label: "Ban the trade.", fx: { gold: -5, people: -5, faith: 5 } },
    right: { label: "Fashion is fashion.", fx: { gold: 10 }, set: ["elf_grudge"], random: [
      { chance: 0.8, fx: {} },
      { chance: 0.2, die: "elf_arrow" },
    ] },
  },
  {
    id: "fr_boot", char: "wolf", once: true, weight: 0.5,
    text: "The wolf at the border gate isn't afraid of the guards. It's carrying a dwarf's boot. The dwarf is not in it. It puts the boot down at your feet and waits.",
    left: { label: "Follow it.", fx: {}, random: [
      { chance: 0.6, fx: { army: 5, people: 5, gold: 10 } },
      { chance: 0.4, die: "wolves" },
    ] },
    right: { label: "Shut the gate.", fx: { people: -5 } },
  },
  {
    id: "fr_three_husbands", char: "old_woman", weight: 2,
    text: "An old woman from Threeways. \"I've buried a human husband and a dwarf husband, and I'm working on an orc. The Church won't say which one I'm buried next to. I'd like to know before it matters.\"",
    left: { label: "Whichever she chooses.", fx: { faith: -10, people: 10 } },
    right: { label: "The human. Obviously.", fx: { faith: 5, people: -5 } },
  },
  {
    id: "fr_border_lords", char: "chancellor", once: true, weight: 0.5,
    text: "Vane. \"The border lords want the right to hang non-humans without trial, as in your grandfather's day. It was very quick in your grandfather's day. It was also very short. His day, I mean.\"",
    left: { label: "No.", fx: { people: -5, army: -5, faith: -5 } },
    right: { label: "Grant it.", fx: { army: 10, faith: 5, people: -5 }, set: ["elf_grudge", "orc_grudge", "dwarf_grudge"], random: [
      { chance: 0.7, fx: {} },
      { chance: 0.3, die: "orc_axe" },
    ] },
  },
  {
    id: "fr_queen_market", char: "queen", when: { effects: ["married"] }, weight: 1.5,
    text: "The Queen. \"I went to Threeways in a plain cloak. An orc sold me a ring, a dwarf appraised it as glass, an elf said it was older than the dwarf. I liked it there. I'd like to go back. Without guards.\"",
    left: { label: "Without the guards.", fx: { people: 10, army: -5 }, random: [
      { chance: 0.8, fx: {} },
      { chance: 0.2, fx: { people: -10, army: -10 } },
    ] },
    right: { label: "With the guards.", fx: { people: -5, gold: -5 } },
  },
  {
    id: "fr_tw_rebuilt_visit", char: "innkeeper", when: { flags: ["fr_tw_rebuilt"] }, oncePerReign: true,
    text: "The Threeways innkeeper, new roof. \"Rebuilt, thanks to you. The elves sent timber, the dwarves nails, the orcs sent an orc to argue about the nails. We've named the inn after you. Spelt wrong.\"",
    left: { label: "Leave it spelt wrong.", fx: { people: 10, faith: -5 } },
    right: { label: "Fix the sign.", fx: { gold: -5, people: -5 } },
  },
];
