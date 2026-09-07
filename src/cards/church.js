// The Church of the Undying Flame, and everyone it would like to burn.
export default [
  // ---------- the tithe ----------
  {
    id: "church_tithe_1", char: "flamekeeper", when: { notEffects: ["tithe"] }, weight: 2,
    text: "The tithe, Majesty. One coin in ten, as it has been since your ancestor saw the Flame in a burning barn. The barn, you'll recall, was ours.",
    left: { label: "Collect it.", fx: { faith: 10, gold: -5, people: -5 }, effect: "tithe" },
    right: { label: "The barn burned down.", fx: { faith: -15, people: 5, gold: 10 } },
  },
  {
    id: "church_tithe_2", char: "flamekeeper", when: { effects: ["tithe"] }, weight: 2,
    text: "The people say the tithe falls hard this year. The people say a great many things. The Flame hears only some of them.",
    left: { label: "Suspend the tithe.", fx: { faith: -10, people: 10 }, removeEffect: "tithe" },
    right: { label: "The Flame hears fine.", fx: { faith: 5, people: -10, gold: 10 } },
  },
  {
    id: "church_tithe_abbot", char: "flamekeeper", when: { effects: ["tithe"] },
    text: "The abbot of Greywater has been skimming the tithe. A tenth of a tenth. He has a new roof, and a mistress with a new roof. Quietly would be kinder. Quietly sets no example.",
    left: { label: "Hang the abbot.", fx: { faith: 5, people: 10, gold: 15 } },
    right: { label: "Quietly.", fx: { faith: 10, gold: -5 } },
  },
  {
    id: "church_tithe_peasant", char: "peasant", when: { effects: ["tithe"] }, weight: 2,
    text: "The tithe-man took our tenth pig, Yer Worship. We had nine. He says he'll be back when we've got the tenth. We've stopped feeding the ninth so as not to encourage him.",
    left: { label: "Feed the pig.", fx: { people: 10, faith: -5, gold: -5 } },
    right: { label: "Nine is a lot of pigs.", fx: { people: -10, faith: 5, gold: 5 } },
  },

  // ---------- Osric, everyday ----------
  {
    id: "church_osric_feast", char: "flamekeeper",
    text: "The Feast of the First Spark falls in a lean month. The Flame asks nothing, of course. But the bishops have grown used to goose.",
    left: { label: "Goose for the bishops.", fx: { gold: -15, faith: 10 } },
    right: { label: "Bread and prayer.", fx: { faith: -10, people: 5, gold: 15 } },
  },
  {
    id: "church_osric_bell", char: "flamekeeper",
    text: "The great bell at Saint Ivo's can be heard in eleven parishes. Kethra's cathedral bell can be heard in fourteen. I have had a founder draw up a fifteenth-parish bell. Bronze is eleven hundred crowns.",
    left: { label: "Cast it.", fx: { gold: -15, faith: 5, people: 5 } },
    right: { label: "Eleven parishes will do.", fx: { faith: -10, gold: 10 } },
  },
  {
    id: "church_osric_elves", char: "flamekeeper",
    text: "The elves do not burn their dead, Majesty. They plant them. I've walked the orchards. The apples are very large and I would not eat one.",
    left: { label: "Ban elven apples.", fx: { faith: 10, gold: -10, people: -5 } },
    right: { label: "Send me a basket.", fx: { faith: -10, people: 5 } },
  },
  {
    id: "church_osric_orcs", char: "flamekeeper",
    text: "An orc shaman has asked to see the Eternal Flame. Out of respect, she says. Orcs respect things by hitting them.",
    left: { label: "Let her see it.", fx: { faith: -10, army: 5 } },
    right: { label: "Refuse.", fx: { faith: 5, army: -10 } },
  },
  {
    id: "church_osric_school", char: "flamekeeper",
    text: "The Tower teaches children to read. Reading leads to questions, questions to doubt, doubt to the Hollow. I would like a school of our own, or theirs shut, and I am not particular which.",
    left: { label: "Close the Tower's school.", fx: { faith: 15, people: -15 } },
    right: { label: "Fund a Church school.", fx: { gold: -10, faith: 10 } },
  },
  {
    id: "church_osric_chaplains", char: "flamekeeper",
    text: "Your soldiers swear by their swords. Swords do not listen. I have chaplains ready to march with every company, at a modest stipend.",
    left: { label: "Send the chaplains.", fx: { faith: 10, gold: -10, army: -5 } },
    right: { label: "The swords are fine.", fx: { army: 5, faith: -10, gold: 10 } },
  },
  {
    id: "church_osric_pamphlet", char: "flamekeeper",
    text: "A bookseller on Candle Row sells a pamphlet claiming the Flame is merely hot. Merely. The pamphlet is in my sleeve. The bookseller is in my cellar.",
    left: { label: "Burn the pamphlet.", fx: { faith: 10, people: -5 } },
    right: { label: "Release him.", fx: { faith: -15, people: 10 } },
  },
  {
    id: "church_osric_burial", char: "flamekeeper", weight: 2,
    text: "A soldier died unshriven at the Scar. His mother wants him in holy ground. He died swearing, Sire; the men who heard it still blush. The Church can make an exception. At a price.",
    left: { label: "Pay the exception.", fx: { gold: -10, army: 10, faith: 5 } },
    right: { label: "Bury him with the swearers.", fx: { faith: -10, army: 5, gold: 10 } },
  },
  {
    id: "church_osric_bones", char: "flamekeeper",
    text: "The crypt under the chapel is full. Your ancestors are stacked three deep and your great-uncle is in a cupboard. A new crypt, or we move the lesser kings to the abbey.",
    left: { label: "New crypt.", fx: { gold: -15, faith: 5 } },
    right: { label: "Move the lesser kings.", fx: { faith: -5, people: -5 }, next: { id: "church_ghost_abbey", delay: 3 } },
  },
  {
    id: "church_ghost_abbey", char: "ghost", chainOnly: true,
    text: "A dead king stands by the bed. Not one of the good ones. \"Lesser,\" he says. \"You moved me to the abbey. The abbey has damp. I'm not asking to be moved back. I'm telling you I know where you sleep.\"",
    left: { label: "Move him back.", fx: { gold: -10, faith: 5 } },
    right: { label: "Enjoy the damp.", random: [
      { chance: 0.7, fx: { people: -5 } },
      { chance: 0.3, fx: { army: -10, faith: -5 } },
    ] },
  },
  {
    id: "church_lightning", char: "flamekeeper",
    text: "You swore at the Flame in open chapel, Sire. Not at me. At the Flame. A storm is coming up the valley. I suggest, gently, that you stay indoors and away from anything tall.",
    left: { label: "Stay indoors.", fx: { faith: 5, people: -5 } },
    right: { label: "Ride out in it.", fx: { army: 10 }, random: [
      { chance: 0.7, fx: { people: 10, faith: -10 } },
      { chance: 0.3, die: "struck_by_lightning" },
    ] },
  },

  // ---------- the bright man ----------
  {
    id: "church_angel_1", char: "angel", once: true, weight: 0.5,
    text: "A man is standing in the throne room. The guards did not see him come in. He is very bright and smells faintly of a struck match. \"I bring word,\" he says, \"from the Flame.\"",
    left: { label: "Speak.", fx: { faith: 5 }, next: { id: "church_angel_2", delay: 0 } },
    right: { label: "Throw him out.", fx: { faith: -10 }, random: [
      { chance: 0.7, fx: { army: 5 } },
      { chance: 0.3, die: "struck_by_lightning" },
    ] },
  },
  {
    id: "church_angel_2", char: "angel", chainOnly: true,
    text: "\"The Flame is pleased with you. Broadly. It asks a small token. Gold, for the poor. I will carry it myself, to save you the trouble.\" He holds out a sack. A large sack.",
    left: { label: "Fill it.", fx: { gold: -20, faith: 10 }, set: ["church_angel_paid"], next: { id: "church_angel_3", delay: 3 } },
    right: { label: "The poor can come to me.", fx: { faith: -5, people: 5, gold: 10 }, next: { id: "church_angel_3", delay: 3 } },
  },
  {
    id: "church_angel_3", char: "spymaster", chainOnly: true,
    text: "The Whisperer reports a very bright man drinking in a tavern in Kethra, buying rounds. The man wears wings. They are, the report says, quite well made.",
    left: { label: "Bring him back.", fx: { army: -5 }, random: [
      { chance: 0.5, fx: { gold: 15 }, set: ["church_angel_fraud"], next: { id: "church_angel_4", delay: 4 } },
      { chance: 0.5, fx: { army: -10 }, next: { id: "church_angel_4", delay: 4 } },
    ] },
    right: { label: "Let him drink.", fx: { people: 5, gold: 5 } },
  },
  {
    id: "church_angel_4", char: "angel", chainOnly: true,
    text: "He is back, and brighter. \"You doubted. That is permitted. Once.\" Every candle in the hall leans toward him. Captain Rook's beard is smoking slightly.",
    left: { label: "Forgive me.", fx: { faith: 15, gold: -10 } },
    right: { label: "You're a drunk with wings.", fx: { faith: -10 }, random: [
      { chance: 0.6, fx: { people: 10 } },
      { chance: 0.4, die: "struck_by_lightning" },
    ] },
  },

  // ---------- is the Flame a god ----------
  {
    id: "church_flame_god_1", char: "mage", once: true,
    text: "I have measured the Eternal Flame, Sire. Its heat, its colour, what it eats. It eats oil. Nine centuries of oil. The Church buys it from a man in Tallow Street.",
    left: { label: "Tell no one.", fx: { faith: 5, gold: -5 }, set: ["church_flame_doubt"], next: { id: "church_flame_god_hermit", delay: 3 } },
    right: { label: "Tell Osric.", fx: { faith: -5 }, set: ["church_flame_doubt"], next: { id: "church_flame_god_osric", delay: 1 } },
  },
  {
    id: "church_flame_god_osric", char: "flamekeeper", chainOnly: true,
    text: "Of course it eats oil, Majesty. The Flame is in the world, and things in the world eat. Your soul eats bread. Is your soul bread? The man in Tallow Street is a devout man.",
    left: { label: "Fair enough.", fx: { faith: 5 }, next: { id: "church_flame_god_hermit", delay: 4 } },
    right: { label: "Stop buying the oil.", fx: { faith: -15, people: -5 }, next: { id: "church_flame_god_out", delay: 2 } },
  },
  {
    id: "church_flame_god_out", char: "flamekeeper", chainOnly: true,
    text: "The Flame went out on the ninth night. For an hour. A novice relit it with a taper, weeping. The people saw the dark window. I call it a test of faith. The people are calling it something else.",
    left: { label: "It was a test.", fx: { faith: 10, people: -15 } },
    right: { label: "It was a taper.", fx: { faith: -20, people: 5 }, set: ["church_flame_is_oil"] },
  },
  {
    id: "church_flame_god_hermit", char: "hermit", chainOnly: true,
    text: "The Hermit has heard about the oil. Everyone has. \"Doesn't matter what it eats. Matters what's watching through it. Something is. I've stood there at night. It looked back.\"",
    left: { label: "What looked back?", fx: { faith: 5 }, next: { id: "church_flame_god_angel", delay: 2 } },
    right: { label: "You need sleep.", fx: { people: 3 } },
  },
  {
    id: "church_flame_god_angel", char: "angel", chainOnly: true,
    text: "The bright man is sitting in the empty chapel when you go alone at night. \"You want to know if it's a god. Wrong question. Ask if it likes you.\" He doesn't answer that either.",
    left: { label: "Does it?", random: [
      { chance: 0.5, fx: { faith: 15 }, set: ["church_flame_likes_you"] },
      { chance: 0.5, fx: { faith: -15, army: -5 } },
    ] },
    right: { label: "Leave.", fx: { faith: -5, people: 5 } },
  },

  // ---------- the Hollow ----------
  {
    id: "church_hollow_1", char: "cultist",
    text: "A man in a grey hood got in on a forged writ. His eyes are fine. It's the space behind them. \"The Flame burns,\" he says pleasantly. \"Everything that burns goes out. We'd like to help.\"",
    left: { label: "Hang him.", fx: { faith: 10, people: -5 } },
    right: { label: "Help how?", fx: { faith: -10 }, set: ["church_hollow_met"], next: { id: "church_hollow_2", delay: 0 } },
  },
  {
    id: "church_hollow_2", char: "cultist", chainOnly: true,
    text: "\"The tithe is heavy. The bishops are fat. We ask nothing. We take nothing. We sit with people, in the dark, until they stop wanting things. It's very restful. Try it.\"",
    left: { label: "Sit with me, then.", fx: { faith: -15, people: 5 }, set: ["church_hollow_sat"], next: { id: "church_hollow_3", delay: 2 } },
    right: { label: "Get out.", fx: { army: 5 }, next: { id: "church_hollow_spread", delay: 4 } },
  },
  {
    id: "church_hollow_3", char: "cultist", chainOnly: true,
    text: "You sit in the dark with the hooded man for an hour. You feel better. You feel less. When you come out the dog will not come near you and the Chancellor asks if you've eaten.",
    left: { label: "Again tomorrow.", fx: { faith: -20, people: -5, army: -5 }, set: ["church_hollow_deep"], next: { id: "church_hollow_4", delay: 3 } },
    right: { label: "Never again.", fx: { faith: 10 }, next: { id: "church_hollow_spread", delay: 3 } },
  },
  {
    id: "church_hollow_4", char: "flamekeeper", chainOnly: true,
    text: "Osric is sweating. \"You have not blinked this whole audience. There is a hooded man behind your chair. There is no hooded man behind your chair. I am asking, humbly, to burn something.\"",
    left: { label: "Burn the Hollow.", fx: { faith: 15, people: -10, army: 5 }, unset: ["church_hollow_deep"] },
    right: { label: "There's nothing to burn.", random: [
      { chance: 0.5, fx: { faith: -20, people: -5 } },
      { chance: 0.5, die: "burned_as_heretic" },
    ] },
  },
  {
    id: "church_hollow_spread", char: "peasant", chainOnly: true,
    text: "There's grey hoods in Marrow village now, Yer Grace. They don't do nothing. They sit in the square. The barley's standing in the field, and the folk stand looking at it, and that's what minds me.",
    left: { label: "Send soldiers.", fx: { army: -5, people: 5, faith: 10 } },
    right: { label: "Sitting isn't a crime.", fx: { people: -15, faith: -10 } },
  },
  {
    id: "church_hollow_water", char: "cultist", when: { flags: ["church_hollow_met"] },
    text: "The hooded man is back, on no writ at all. He has brought you a cup of water. \"You looked thirsty. Everyone looks thirsty. You needn't be.\"",
    left: { label: "Drink.", fx: { faith: -10 }, random: [
      { chance: 0.7, fx: { people: 5 } },
      { chance: 0.3, die: "poison" },
    ] },
    right: { label: "Pour it out.", fx: { faith: 5 } },
  },
  {
    id: "church_hollow_bowls", char: "cultist",
    text: "A grey-hooded girl left a bowl on the chapel step. Empty. They leave them everywhere, Osric says; the poor stand looking into them and stop being hungry, and then stop.",
    left: { label: "Smash the bowls.", fx: { faith: 10, people: -5 } },
    right: { label: "Leave them.", fx: { faith: -10, people: 5 }, next: { id: "church_hollow_spread", delay: 3 } },
  },

  // ---------- the purge ----------
  {
    id: "church_purge_1", char: "flamekeeper", oncePerReign: true, when: { notEffects: ["purge"] },
    text: "There is rot in the provinces, Sire. Hedge-witches, corner-mages, men who pray to wells. My clerks have drawn up a list. It is a long list. Give me the year and I will give you a clean kingdom.",
    left: { label: "Take the year.", fx: { faith: 10, people: -10 }, effect: "purge", next: { id: "church_purge_2", delay: 3 } },
    right: { label: "Burn the list.", fx: { faith: -15, people: 10, gold: 5 } },
  },
  {
    id: "church_purge_2", char: "judge", chainOnly: true,
    text: "Justiciar Maud has stopped signing. \"Two hundred and eleven this month. They brought me a miller's boy for whistling on a holy day. I sign for heretics. I will not sign for whistling.\"",
    left: { label: "Sign anyway.", fx: { faith: 10, people: -15 }, next: { id: "church_purge_3", delay: 3 } },
    right: { label: "End the purge.", fx: { faith: -15, people: 10 }, removeEffect: "purge", set: ["church_purge_ended"] },
  },
  {
    id: "church_purge_3", char: "executioner", chainOnly: true,
    text: "The Executioner has run out of rope. Not of people. He mentions it flatly, the way he mentions everything. He wants to know if the Church is paying for the rope or the Crown is.",
    left: { label: "The Church pays.", fx: { faith: -10, gold: 5 }, next: { id: "church_purge_4", delay: 2 } },
    right: { label: "The Crown pays.", fx: { gold: -15, people: -10 }, next: { id: "church_purge_4", delay: 2 } },
  },
  {
    id: "church_purge_4", char: "flamekeeper", chainOnly: true,
    text: "The list has grown, Majesty. Lists do. Near the bottom, in a different hand, is a name I did not put there. It is yours. I mention it only so you can see how thorough my clerks have become.",
    left: { label: "End it. Now.", fx: { faith: -20, people: 15, army: 5 }, removeEffect: "purge" },
    right: { label: "Burn the clerk.", fx: { faith: 5, army: -5 }, random: [
      { chance: 0.6, fx: { people: -10 } },
      { chance: 0.4, die: "burned_as_heretic" },
    ] },
  },
  {
    id: "church_purge_ongoing", char: "peasant", when: { effects: ["purge"] }, weight: 2,
    text: "They took the ferryman at Hollin, Majesty. For heresy. He can't read, so I don't know where he got it. The ferry sits tied up and folk walk four miles round. The heresy might be in the boat.",
    left: { label: "Release the ferryman.", fx: { faith: -10, people: 10 } },
    right: { label: "Burn the boat too.", fx: { faith: 5, people: -10, gold: -5 } },
  },

  // ---------- the trial ----------
  {
    id: "church_trial_1", char: "flamekeeper",
    text: "The miller's widow at Cobb's Reach has been curing fevers with river-mud and rudeness. Four dead. Six alive. The Church has counted the four and would like to proceed.",
    left: { label: "Try her properly.", fx: { faith: -5, people: 5 }, next: { id: "church_trial_2", delay: 1 } },
    right: { label: "Burn her.", fx: { faith: 15, people: -15, gold: 5 } },
  },
  {
    id: "church_trial_2", char: "judge", chainOnly: true,
    text: "\"The widow's mud works about as often as Doctor Amaury's leeches. I said so in open court. The Flamekeeper's clerk wrote it down and underlined my name. Twice.\"",
    left: { label: "Acquit her.", fx: { faith: -15, people: 10 }, set: ["church_widow_freed"], next: { id: "church_trial_3", delay: 3 } },
    right: { label: "Guilty. Exile.", fx: { faith: 5, people: -5 } },
  },
  {
    id: "church_trial_3", char: "peasant", chainOnly: true,
    text: "The mud-widow's been made a sort of saint down at Cobb's Reach, m'lord. Not by the Church. By us. We built a shrine. People leave mud. The Flamekeeper's man came to look and got some thrown at him.",
    left: { label: "Let them keep their shrine.", fx: { faith: -10, people: 10 } },
    right: { label: "Tear it down.", fx: { faith: 10, people: -15 } },
  },
  {
    id: "church_trial_scholar", char: "elf_scholar", once: true,
    text: "An elven scholar stands accused of heresy for saying the Flame was lit by an elf. She has brought the elf. He's very old and would like to sit down.",
    left: { label: "Let him sit.", fx: { faith: -15, people: 5 }, set: ["church_elf_lit_flame"] },
    right: { label: "Both of them. Out.", fx: { faith: 10, army: -5 } },
  },

  // ---------- relics ----------
  {
    id: "church_relic_thumbs_1", char: "merchant",
    text: "Guildmaster Crane has acquired the left thumb of Saint Ivo. He also has the right thumb, and, from a different ship, a third. The set is offered at a discount.",
    left: { label: "Buy the set.", fx: { gold: -15, faith: 10 }, next: { id: "church_relic_thumbs_2", delay: 3 } },
    right: { label: "Saints have two thumbs.", fx: { people: 5, gold: 10 } },
  },
  {
    id: "church_relic_thumbs_2", char: "flamekeeper", chainOnly: true,
    text: "The thumbs, Majesty. One is a saint's, certainly. The others are a goat's and a goblin's. We have enshrined the first. Which is the first is a matter I would prefer stays inside the Church.",
    left: { label: "Enshrine all three.", fx: { faith: 10, people: 5, gold: 15 }, set: ["church_goat_thumb"] },
    right: { label: "Tell the people.", fx: { faith: -15, people: -5, gold: 5 } },
  },
  {
    id: "church_relic_lantern_1", char: "knight", once: true,
    text: "Sir Gavriel rides in with a dented iron lantern from a barrow under the Scar. No oil, no wick, and it is lit. It has been lit, he says, for three days, including the river crossing.",
    left: { label: "Give it to the Church.", fx: { faith: 15, army: -5 }, set: ["church_lantern_church"], next: { id: "church_relic_lantern_2", delay: 2 } },
    right: { label: "Lock it in the treasury.", fx: { gold: 10, faith: -10 }, next: { id: "church_relic_lantern_2", delay: 2 } },
  },
  {
    id: "church_relic_lantern_2", char: "mage", chainOnly: true,
    text: "Sylvane has examined the barrow-lantern. \"Older than the Church, older than the Empire, and it doesn't care for either. Something lit it. I'd rather it stayed lit. I'd rather no one asked it why.\"",
    left: { label: "Bury it again.", fx: { faith: -5, army: 5 } },
    right: { label: "Hang it in the Great Hall.", fx: { faith: 10 }, random: [
      { chance: 0.7, fx: { people: 10 } },
      { chance: 0.3, fx: { army: -15 } },
    ] },
  },

  // ---------- saints and miracles ----------
  {
    id: "church_saint_aunt", char: "flamekeeper",
    text: "Your late aunt, the Lady Berenice, has performed a miracle. A cripple touched her tomb and walked. He had walked in, admittedly. Still. A saint in the family costs only a shrine.",
    left: { label: "Canonize her.", fx: { gold: -15, faith: 15, people: 5 } },
    right: { label: "She hated cripples.", fx: { faith: -10, people: 5, gold: 10 } },
  },
  {
    id: "church_saint_child_1", char: "child", once: true,
    text: "A girl of nine, brought by her mother, says the Flame speaks to her. It told her the harvest would fail. It told her your horse's name. It told her not to tell you the third thing.",
    left: { label: "What third thing?", fx: { faith: 5 }, random: [
      { chance: 0.5, fx: { people: 10 }, set: ["church_child_saint"], next: { id: "church_saint_child_2", delay: 4 } },
      { chance: 0.5, fx: { faith: -10, army: -10 } },
    ] },
    right: { label: "Send her home.", fx: { faith: -5, people: -5 } },
  },
  {
    id: "church_saint_child_2", char: "flamekeeper", chainOnly: true,
    text: "The girl who hears the Flame has a following now. They camp outside the chapel. I would like her inside the Church, as a novice, where she can be guided. He says guided the way a man says buried.",
    left: { label: "Give her to the Church.", fx: { faith: 15, people: -10 } },
    right: { label: "She stays with her mother.", fx: { faith: -15, people: 10 } },
  },
  {
    id: "church_miracle_well", char: "peasant", weight: 2,
    text: "The well at Dunmere's run wine, Sire. Red. Not good red. Father Ambrose says it's a miracle and has put a man on it with a ladle and a cash box.",
    left: { label: "The Crown's well now.", fx: { gold: 15, faith: -10, people: -10 } },
    right: { label: "Let the Church have it.", fx: { faith: 10, people: 5, gold: 5 } },
  },
  {
    id: "church_miracle_doctor", char: "healer",
    text: "\"A boy at Cobb's Reach rose on the third day, Sire. On examination, he was not dead; he was very drunk. I told the Flamekeeper. The Flamekeeper told me to stop examining things.\"",
    left: { label: "Stop examining things.", fx: { faith: 10, people: 5, gold: 10 } },
    right: { label: "Publish it.", fx: { faith: -15, people: -5 } },
  },

  // ---------- the Great Temple ----------
  {
    id: "church_temple_1", char: "flamekeeper", once: true, when: { notFlags: ["built_great_temple", "church_temple_begun"], minReign: 3 },
    text: "The Flame's house is a barn with a roof on it, Sire. It was a barn. A Great Temple, in the square, with a dome Kethra could see from its walls. Say yes and I'll trouble you about money later. Often.",
    left: { label: "Begin.", fx: { gold: -25, faith: 10, people: -5 }, set: ["church_temple_begun"], next: { id: "church_temple_2", delay: 3 } },
    right: { label: "The barn is fine.", fx: { faith: -15, gold: 15 } },
  },
  {
    id: "church_temple_2", char: "architect", chainOnly: true,
    text: "Fennick has news about the dome. \"It wants a base. Bases want stone. Stone wants quarrymen, and quarrymen want paying. Also the Flamekeeper wants it gilded. I did not tell him what gilt costs.\"",
    left: { label: "Gild it.", fx: { gold: -25, faith: 10 }, next: { id: "church_temple_3", delay: 3 } },
    right: { label: "Bare stone.", fx: { gold: -15, faith: -5 }, next: { id: "church_temple_3", delay: 3 } },
  },
  {
    id: "church_temple_3", char: "treasurer", chainOnly: true,
    text: "\"The Temple has eaten a fifth of the treasury and has no roof. The masons found a dwarf tunnel under it and won't dig until someone says whose it is. My office has a candle. It is holy enough.\"",
    left: { label: "Pay the dwarves to leave.", fx: { gold: -20 }, next: { id: "church_temple_4", delay: 3 } },
    right: { label: "Build over the tunnel.", fx: { gold: -10 }, random: [
      { chance: 0.7, fx: { army: -5 }, next: { id: "church_temple_4", delay: 3 } },
      { chance: 0.3, fx: { people: -15 }, next: { id: "church_temple_4", delay: 4 } },
    ] },
  },
  {
    id: "church_temple_4", char: "flamekeeper", chainOnly: true,
    text: "The Great Temple is finished. Osric stands in the dome-light looking, for once, small. \"It will outlast us both. That is the point of it.\" Then, recovering: \"The consecration feast is unpaid.\"",
    left: { label: "Pay for the feast.", fx: { gold: -15, faith: 15, people: 10 }, set: ["built_great_temple"], effect: "great_temple" },
    right: { label: "The Flame provides.", fx: { gold: -5, faith: 10, people: 5 }, set: ["built_great_temple"], effect: "great_temple" },
  },
  {
    id: "church_temple_pilgrims", char: "innkeeper", when: { flags: ["built_great_temple"] },
    text: "Pilgrims, Majesty. Thousands. They sleep in my yard, they pray in my stable, they pay in blessings. I can't spend a blessing. I've tried.",
    left: { label: "Tax the pilgrims.", fx: { gold: 15, faith: -10 } },
    right: { label: "Blessings are payment.", fx: { faith: 5, people: -10, gold: 5 } },
  },

  // ---------- excommunication ----------
  {
    id: "church_excomm_1", char: "flamekeeper", when: { notEffects: ["excommunicated"] },
    text: "You have taxed the abbeys, Majesty. Not much. But the Flame does not measure in much. Withdraw it, or I must read your name from the pulpit. Not in the good voice.",
    left: { label: "Withdraw it.", fx: { gold: -15, faith: 10 } },
    right: { label: "Read it.", fx: { faith: -15, gold: 10, people: -5 }, effect: "excommunicated", set: ["church_was_excommunicated"], next: { id: "church_excomm_2", delay: 2, else: "church_excomm_moot" } },
  },
  {
    id: "church_excomm_2", char: "steward", chainOnly: true, when: { effects: ["excommunicated"] },
    text: "Wendel, very quietly: \"The cooks won't bless the bread, Sire, on account of you're cursed. The guards won't stand the chapel door. Your mother has moved to the abbey. She sent for her chairs.\"",
    left: { label: "Cook the bread myself.", fx: { people: 10, army: -5 } },
    right: { label: "Hire heathen cooks.", fx: { gold: -10, faith: -5, people: 5 } },
  },
  {
    id: "church_excomm_moot", char: "steward", chainOnly: true,
    text: "Wendel: \"The, ah, the excommunication business appears to have blown over, Majesty. Your mother wants her chairs back.\"",
    left: { label: "Send them.", fx: { gold: -3 } },
    right: { label: "They're my chairs now.", fx: { people: 3 } },
  },
  {
    id: "church_excomm_kneel", char: "flamekeeper", when: { effects: ["excommunicated"] }, weight: 2,
    text: "Osric arrives without his mitre, which he does when he wants something. \"The Flame forgives. It requires only a sign. Public. On your knees. In the square. I have picked a day with good weather.\"",
    left: { label: "Kneel.", fx: { faith: 15, people: -5, army: -10 }, removeEffect: "excommunicated" },
    right: { label: "I don't kneel.", fx: { faith: -10, army: 5, gold: 10 }, random: [
      { chance: 0.7, fx: { people: -5 } },
      { chance: 0.3, fx: { people: -15 } },
    ] },
  },
  {
    id: "church_excomm_buy", char: "treasurer", when: { effects: ["excommunicated"] },
    text: "\"The Church will lift the ban for a donation. The figure is written here. It is a round one. Round in the way the sun is round.\"",
    left: { label: "Pay it.", fx: { gold: -25, faith: 10 }, removeEffect: "excommunicated" },
    right: { label: "Let it stand.", fx: { people: -5, gold: 15 } },
  },
  {
    id: "church_excomm_army", char: "general", when: { effects: ["excommunicated"] },
    text: "Marshal Thorne: \"Half the men won't follow a cursed king. The other half don't believe in curses, but they do believe in the first half, who are bigger. Pick a chapel and go in it.\"",
    left: { label: "Pick a chapel.", fx: { faith: 5, army: 5, gold: -10 } },
    right: { label: "Pay the bigger half.", fx: { gold: -15, army: 10 } },
  },

  // ---------- the Tower ----------
  {
    id: "church_mage_register_1", char: "mage",
    text: "Sylvane doesn't bow; the Tower hasn't in four hundred years and she won't start. \"The Church wants my apprentices registered. Names, addresses, spells. I'd sooner register the weather.\"",
    left: { label: "Register them.", fx: { faith: 15, people: -5 }, set: ["church_mages_registered"], next: { id: "church_mage_register_2", delay: 3 } },
    right: { label: "The Tower is its own house.", fx: { faith: -15, army: 5, gold: 10 }, next: { id: "church_mage_cellar", delay: 2 } },
  },
  {
    id: "church_mage_cellar", char: "flamekeeper", chainOnly: true,
    text: "\"The Tower is its own house. Yes. And a house that will not open when the Flame knocks is a house with something in the cellar. I am not accusing, Majesty. I am describing.\"",
    left: { label: "Search the Tower.", fx: { faith: 10, army: -5 }, next: { id: "church_mage_search", delay: 1 } },
    right: { label: "You're describing nothing.", fx: { faith: -10, people: 5 } },
  },
  {
    id: "church_mage_search", char: "mage", chainOnly: true,
    text: "The search found eleven apprentices, a talking stove, four thousand books and one small door that would not open for the soldiers or for you. Sylvane says it's a cupboard. The door is warm.",
    left: { label: "Open it.", random: [
      { chance: 0.5, fx: { faith: 10, gold: 15 }, set: ["church_tower_door"] },
      { chance: 0.5, fx: { army: -20 } },
    ] },
    right: { label: "Leave the cupboard.", fx: { faith: -5, army: 5, gold: 5 } },
  },
  {
    id: "church_mage_register_2", char: "mage", chainOnly: true,
    text: "\"Registered. Now the Church knows where my apprentices sleep, and three of them don't anymore. Burned in their beds. An accident, says the Flamekeeper. My people can make fire, King. They'd like to.\"",
    left: { label: "Hold them back.", fx: { faith: 5, army: -10, people: -5 } },
    right: { label: "Let them.", fx: { faith: -20, people: 10 }, next: { id: "church_mage_ice", delay: 2 } },
  },
  {
    id: "church_mage_ice", char: "flamekeeper", chainOnly: true,
    text: "Saint Ivo's chapel is now a large, clear block of ice, with the choir still inside. Alive, Sylvane assures us. Cold. Osric is not asking for anything. Osric is simply standing here, dripping.",
    left: { label: "Make peace between them.", fx: { gold: -20, faith: 5 } },
    right: { label: "Let them fight it out.", random: [
      { chance: 0.5, fx: { faith: -15, people: -10 } },
      { chance: 0.5, fx: { army: -15, people: -10 } },
    ] },
  },
  {
    id: "church_mage_light", char: "mage",
    text: "I can light the city. Every street, all night, no oil, no fire. The Church has already objected on the grounds that light is the Flame's, and I am not the Flame. Correct on both counts.",
    left: { label: "Light the city.", fx: { people: 15, faith: -15, gold: -10 } },
    right: { label: "Dark is traditional.", fx: { faith: 5, people: -5, gold: 10 } },
  },

  // ---------- Master Quill ----------
  {
    id: "church_quill_1", char: "alchemist", weight: 2,
    text: "Master Quill has made gold. Two grains, from lead, at a cost of nine hundred crowns and one apprentice's eyebrows. He requires a further nine hundred to scale up.",
    left: { label: "Fund it.", fx: { gold: -15 }, next: { id: "church_quill_2", delay: 2 } },
    right: { label: "Two grains is plenty.", fx: { gold: 10, people: 3 } },
  },
  {
    id: "church_quill_2", char: "alchemist", chainOnly: true,
    text: "The furnace in the east wing is running very hot. Quill says this is expected. The east wing's windows have all blown out, which he says is also expected. He would like you behind the pillar.",
    left: { label: "Behind the pillar.", random: [
      { chance: 0.5, fx: { gold: 25 }, set: ["church_quill_gold"] },
      { chance: 0.3, fx: { gold: -10, people: -10 } },
      { chance: 0.2, die: "explosion" },
    ] },
    right: { label: "Douse it.", fx: { gold: -5, faith: 5 } },
  },
  {
    id: "church_quill_heresy", char: "alchemist",
    text: "The Church has ruled alchemy a heresy, on the grounds that only the Flame may change one thing into another. Quill has a rebuttal. The rebuttal is in a jar. The jar is ticking.",
    left: { label: "Jar in the river.", fx: { faith: 10, gold: -5 } },
    right: { label: "Send the jar to Osric.", fx: { faith: -20 }, random: [
      { chance: 0.6, fx: { people: 10 } },
      { chance: 0.4, fx: { army: -10 } },
    ] },
  },
  {
    id: "church_quill_holy", char: "alchemist",
    text: "Quill has distilled holy oil down to what he calls its essence. A thimbleful. It has eaten through the thimble, the table and most of the floor. He would like to try it on the Flame.",
    left: { label: "Absolutely not.", fx: { faith: 5, gold: -5 } },
    right: { label: "Try it.", fx: { faith: -15 }, random: [
      { chance: 0.6, fx: { people: 10 } },
      { chance: 0.4, die: "explosion" },
    ] },
  },

  // ---------- Vessel Ashe ----------
  {
    id: "church_ashe_1", char: "necromancer", once: true, weight: 0.5,
    text: "A thin woman in grave-dirt introduces herself as Vessel Ashe. She has brought a gift: your grandfather's household guard. All of them. They stand very still in the courtyard and do not need feeding.",
    left: { label: "Take them.", fx: { army: 20, faith: -25, people: -10, gold: 10 }, set: ["church_dead_guard"], next: { id: "church_ashe_2", delay: 3 } },
    right: { label: "Burn them. Again.", fx: { faith: 15, army: -5 } },
  },
  {
    id: "church_ashe_2", char: "flamekeeper", chainOnly: true,
    text: "\"There are dead men on the walls, Majesty. I have said nothing for three years. My silence has a price, and the price is the woman. Give her to the Flame and I will never mention who stands guard.\"",
    left: { label: "Give her up.", fx: { faith: 15, army: -10 }, next: { id: "church_ashe_pyre", delay: 0 } },
    right: { label: "She stays.", fx: { faith: -15 }, next: { id: "church_ashe_3", delay: 4 } },
  },
  {
    id: "church_ashe_pyre", char: "necromancer", chainOnly: true,
    text: "Ashe goes to the pyre without complaint. \"They'll stop when I do,\" she says of the guards. \"Mostly.\" As the fire takes, every dead man on your walls turns and looks at you. Then falls.",
    left: { label: "So be it.", fx: { army: -15, faith: 5 }, unset: ["church_dead_guard"] },
    right: { label: "Look away.", fx: { army: -15, people: 5 }, unset: ["church_dead_guard"] },
  },
  {
    id: "church_ashe_3", char: "necromancer", chainOnly: true,
    text: "\"The Flamekeeper wants me burned, so here's a proposal. Your army loses men every year. I can get them back. Every one. The Church will hate you. The Marshal will love you. Pick a friend.\"",
    left: { label: "Every one.", fx: { army: 20, faith: -25, gold: 10 }, set: ["church_dead_army"] },
    right: { label: "Enough dead.", fx: { faith: 10, army: -5 }, unset: ["church_dead_guard"] },
  },
  {
    id: "church_ashe_chapel", char: "necromancer", when: { flags: ["church_dead_army"] },
    text: "One of the dead soldiers has started coming to chapel. He kneels. He doesn't rise, after; someone has to lift him. The novices are frightened. Osric is frightened. Ashe says it's harmless.",
    left: { label: "Let him pray.", fx: { faith: -10, people: 5 } },
    right: { label: "Unmake him.", fx: { faith: 10, army: -10 } },
  },
  {
    id: "church_ashe_ghost", char: "ghost", when: { flags: ["church_dead_army"] }, once: true,
    text: "A dead king, one of the better ones, at the foot of the bed. \"You've got my soldiers walking about. Some of them were mine. They didn't like it the first time. Put them down properly or I'll do it.\"",
    left: { label: "Put them down.", fx: { army: -20, faith: 15 }, unset: ["church_dead_army", "church_dead_guard"] },
    right: { label: "Try it.", fx: { faith: -10 }, random: [
      { chance: 0.6, fx: { army: -10 } },
      { chance: 0.4, die: "buried_alive" },
    ] },
  },

  // ---------- Old Mab, small business ----------
  {
    id: "church_mab_mushroom_1", char: "witch",
    text: "Old Mab has brought mushrooms in a basket. \"The blue ones make you see the world as it is, which is mostly frogs. The brown ones are dinner. Don't mix them up. I have.\"",
    left: { label: "The blue one.", fx: { faith: -5, people: 5 }, effect: "toadstool", set: ["toadstool_eaten"] },
    right: { label: "Dinner.", random: [
      { chance: 0.8, fx: { people: 3 } },
      { chance: 0.2, die: "bad_mushroom" },
    ] },
  },
  {
    id: "church_mab_mushroom_2", char: "witch", when: { flags: ["toadstool_eaten"] }, once: true,
    text: "\"You liked the blue. Everyone likes the blue the first time. This one's black. Shows you the day you die. Half the men who ate it got the date right by eating it.\"",
    left: { label: "Eat it.", random: [
      { chance: 0.5, die: "bad_mushroom" },
      { chance: 0.5, fx: { faith: -10, people: 5 }, effect: "clarity" },
    ] },
    right: { label: "Keep it.", fx: { faith: 5 } },
  },
  {
    id: "church_mab_cure", char: "witch", weight: 2,
    text: "The Prince's cough. Mab has a paste. It smells of goat. \"Amaury will bleed him for a month and call it progress. Mine's a week and he'll hate the taste. Your doctor's a fool, but he's your fool.\"",
    left: { label: "The paste.", fx: { faith: -10, people: 5 } },
    right: { label: "The leeches.", fx: { people: -5, gold: -5, faith: 5 } },
  },
  {
    id: "church_mab_curse", char: "witch",
    text: "A farmer's wife has paid Mab to curse you. Three hens. \"I've come to say I won't do it for three hens. Five, I'd think about it. I'm telling you because I'm honest, not because I like you.\"",
    left: { label: "Six hens not to.", fx: { gold: -5, people: 5 } },
    right: { label: "Curse away.", fx: { faith: 5 }, random: [
      { chance: 0.7, fx: { people: -5 } },
      { chance: 0.3, fx: { army: -10, people: -10 } },
    ] },
  },
  {
    id: "church_mab_raid", char: "witch",
    text: "\"Osric's boys came for me Tuesday. Found the cat. Left in a hurry. He'll ask you for soldiers next. Send them if you like; I'll send them back. Most of them.\"",
    left: { label: "No soldiers.", fx: { faith: -10 } },
    right: { label: "Send soldiers.", fx: { faith: 10 }, random: [
      { chance: 0.6, fx: { army: -15 } },
      { chance: 0.4, fx: { army: -5, people: -10 } },
    ] },
  },

  // ---------- the Hermit ----------
  {
    id: "church_hermit_vision_1", char: "hermit",
    text: "\"I've had a vision. Your city, on fire. Not the good kind. Osric's kind. Or the other kind. Hard to tell in visions; fire's fire.\" He asks for bread, and to sleep in the stable.",
    left: { label: "Bread and stable.", fx: { people: 3, faith: 3 }, next: { id: "church_hermit_vision_2", delay: 5 } },
    right: { label: "Move along.", fx: { faith: -5 } },
  },
  {
    id: "church_hermit_vision_2", char: "hermit", chainOnly: true,
    text: "The Hermit smells of smoke. \"Wasn't the city. Was the granary at Hollin. Same shape from far off. I'd check who lit it. I'd check under your own roof.\"",
    left: { label: "Search the palace.", fx: { army: -5 }, random: [
      { chance: 0.5, fx: { faith: -15 }, set: ["church_osric_arson"] },
      { chance: 0.5, fx: { people: 5 } },
    ] },
    right: { label: "Grain burns.", fx: { people: -10 } },
  },
  {
    id: "church_hermit_osric", char: "hermit", when: { flags: ["church_osric_arson"] }, once: true,
    text: "\"Told you. Osric's men, with Osric's oil. He'll say it was to make room for the Temple. Might be true. Doesn't make the grain less burnt. You could hang him. Kings used to.\"",
    left: { label: "Hang the Flamekeeper.", fx: { faith: -25, people: 10, army: 5 }, set: ["church_osric_hanged"] },
    right: { label: "I need him.", fx: { faith: 10, people: -10, gold: 10 } },
  },

  // ---------- other peoples and the Flame ----------
  {
    id: "church_orc_convert", char: "orc_shaman",
    text: "An Ashfang shaman wants to enter the Flame. Convert. Osric is delighted and terrified in equal parts. She wants to know if the Flame can be carried on the end of a spear, or if that's rude.",
    left: { label: "It's rude.", fx: { faith: 5, army: -5 } },
    right: { label: "Give her a spear.", fx: { faith: -10, army: 10, people: -5 } },
  },
  {
    id: "church_elf_scrolls", char: "elf_scholar",
    text: "An elven scholar asked to copy the Church's founding scrolls. Osric refused. She has now offered to correct them instead, as she was present for most of it.",
    left: { label: "Let her correct them.", fx: { faith: -20, people: 5 } },
    right: { label: "The scrolls stand as written.", fx: { faith: 10, gold: 5 } },
  },
  {
    id: "church_half_elf_law", char: "half_elf",
    text: "Sera wasn't allowed at the Flame-feast. The ears, apparently. She isn't asking to go. She's asking why your grandfather's law counts her as livestock for purposes of the tithe.",
    left: { label: "Change the law.", fx: { faith: -10, people: 10 } },
    right: { label: "The law stands.", fx: { faith: 5, people: -5, gold: 5 } },
  },

  // ---------- court and Church ----------
  {
    id: "church_pib_confession", char: "jester",
    text: "Pib has been to confession. \"I told Osric all my sins. He said they weren't sins, just bad jokes. Then he told me one of yours. I think he wanted me to hear it. I think he wants you to know that.\"",
    left: { label: "Which one?", fx: { faith: -5, people: 5, army: 5 } },
    right: { label: "Have Pib whipped.", fx: { people: -10, faith: 5 } },
  },
  {
    id: "church_spy_letters_1", char: "spymaster",
    text: "From behind the curtain: \"The Flamekeeper writes to Kethra. Weekly. He is not a traitor, precisely. He is a man making sure he has a chair when the music stops.\"",
    left: { label: "Read his letters.", fx: { gold: -5, faith: -5 }, next: { id: "church_spy_letters_2", delay: 2 } },
    right: { label: "Let him write.", fx: { faith: 5 } },
  },
  {
    id: "church_spy_letters_2", char: "spymaster", chainOnly: true,
    text: "\"The letters are about you. Your health, your temper, which of your council he could keep. Also a recipe for goose. The goose is a code. I have not broken it. It might be goose.\"",
    left: { label: "Confront Osric.", fx: { faith: -15, army: 5 } },
    right: { label: "Send him a goose.", fx: { faith: 5, people: 5 } },
  },
];
