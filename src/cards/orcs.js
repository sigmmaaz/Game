// The Ashfang orc clans across the Scar. Grukhar (warchief), Shazza (his
// daughter, the envoy), Old Muzgash (shaman), Dorg (mercenary captain).
// Grukhar can die once per dynasty (orc_grukhar_dead); his repeatable cards
// check that flag so Shazza takes over cleanly.
const G = { notFlags: ["orc_grukhar_dead"] };

export default [
  // ---------- everyday: the Scar ----------
  {
    id: "orc_tax_goats", char: "orc_warchief", weight: 2, when: G,
    text: "Your tax man came to the Scar. He counted our goats. We counted him. He is fine. He is not coming back.",
    left: { label: "Send another.", fx: { gold: 20, army: 5, people: -5 } },
    right: { label: "Keep the goats.", fx: { gold: -5, people: 5 } },
  },
  {
    id: "orc_cattle_greeting", char: "orc_warchief", weight: 2, when: G,
    text: "A raid is a greeting. Ten cattle means we respect you. Your border lord sent the cattle back with a letter. Now my riders think you are poor.",
    left: { label: "Keep the cattle.", fx: { people: -5, army: 5, gold: 10 } },
    right: { label: "Send twenty back.", fx: { gold: -10, army: 5, people: 5 } },
  },
  {
    id: "orc_axe_gift", char: "orc_envoy", weight: 1,
    text: "My father sends you this axe. It is not a threat. It is a gift. He would like you to know the difference, because last time your court did not.",
    left: { label: "Hang it in the hall.", fx: { faith: -5, army: 5 } },
    right: { label: "Send it back.", fx: { army: -10, people: 5 }, set: ["orc_grudge"] },
  },
  {
    id: "orc_hanged_lads", char: "orc_mercenary", weight: 1, when: { flags: ["orc_merc_hired"] },
    text: "You hanged three of my lads for a tavern fight. Fine. They started it. But you hanged them in front of the others, and the others have started counting.",
    left: { label: "Pay the company.", fx: { gold: -15, army: 5 } },
    right: { label: "Let them count.", fx: { army: -15, people: 5, gold: 10 } },
  },
  {
    id: "orc_well_fixed", char: "peasant", weight: 2,
    text: "Orcs came through Millbrook. They didn't burn anything. They fixed the well, drank from it, and left. We don't know what it means and we can't sleep.",
    left: { label: "It means the well works.", fx: { people: 10 } },
    right: { label: "Double the watch.", fx: { gold: -5, army: 5 } },
  },
  {
    id: "orc_priest_river", char: "orc_warchief", weight: 1, when: G,
    text: "Your priest came north. Said our fire is the wrong fire. My people listened, which is more than yours do. Then they put him in the river. He can swim. Mostly.",
    left: { label: "He shouldn't have gone.", fx: { faith: -15, people: 5 } },
    right: { label: "Send soldiers for him.", fx: { faith: 10, army: -10 } },
  },
  {
    id: "orc_iron_price", char: "orc_envoy", weight: 2,
    text: "Your merchants sell us iron at three times what they charge halflings. We know because we asked the halflings. Fix the price or we fix the merchants.",
    left: { label: "Fix the price.", fx: { gold: -5, people: -5 } },
    right: { label: "Try it.", fx: { army: 5, people: -10, gold: 10 } },
  },
  {
    id: "orc_ward_1", char: "orc_warchief", once: true, when: G,
    text: "My son wants to see a city. He is fourteen and stupid. Keep him a year. Feed him. Do not let him near your daughter or your wine.",
    left: { label: "Send him.", fx: { people: -5 }, set: ["orc_ward"], next: { id: "orc_ward_2", delay: 2 } },
    right: { label: "Cities are bad for boys.", fx: { army: 5, gold: 5 } },
  },
  {
    id: "orc_ward_2", char: "orc_warchief", chainOnly: true,
    text: "My son came home. He can read. He says 'please'. He wants a bath. I do not know what you did to him and I do not know if I should thank you.",
    left: { label: "Civilised him.", fx: { army: -5, people: 5, faith: 3 } },
    right: { label: "Gave him a bath.", fx: { people: 3, gold: -3 } },
  },
  {
    id: "orc_red_mud", char: "orc_shaman", weight: 1,
    text: "The Scar is bleeding again. The red mud. Last time it did that, your great-grandfather died and we got a good harvest. I am only saying.",
    left: { label: "Superstition.", fx: { faith: 5, people: -5 } },
    right: { label: "Riders on the Scar.", fx: { gold: -5, army: 5 } },
  },
  {
    id: "orc_wall_crossbows", char: "orc_warchief", weight: 1, when: G,
    text: "Your Marshal put a wall on the Scar. Stone. We do not mind the wall. We mind that he points the crossbows at us and not at the trolls.",
    left: { label: "Turn them round.", fx: { army: -5, people: 5 } },
    right: { label: "Trolls don't have crossbows.", fx: { army: 10, people: -5 } },
  },
  {
    id: "orc_name", char: "orc_warchief", weight: 1, when: G,
    text: "You call me Chieftain. My name is Grukhar. Your scribe writes 'the orc' in your books. My scribe writes 'the small king'. Now we are both offended.",
    left: { label: "Grukhar, then.", fx: { people: -3, army: 3 } },
    right: { label: "Small king?", fx: { army: 5, people: -5, faith: -3 } },
  },
  {
    id: "orc_uphill", char: "orc_mercenary", weight: 1, when: { flags: ["orc_merc_hired"] },
    text: "Your Marshal ordered my company to charge uphill at a wall. We're orcs, not idiots. We went round. The wall fell. He wants us flogged for disobedience.",
    left: { label: "Flog them.", fx: { army: -15, people: -5, gold: 10 } },
    right: { label: "Promote Dorg.", fx: { army: 10, people: 5, gold: -5 } },
  },
  {
    id: "orc_face_down", char: "orc_shaman", weight: 1,
    text: "Your Flamekeeper burns the dead. We bury ours face down so they can dig their way to the ancestors. He wants us to stop. He can dig his own way.",
    left: { label: "Let them bury.", fx: { faith: -10, people: 5 } },
    right: { label: "Church law is law.", fx: { faith: 10, army: -5, people: -5, gold: 5 } },
  },
  {
    id: "orc_ugroth_hand", char: "orc_envoy", once: true, weight: 0.8,
    text: "Your daughter's hand. Not for me. For my cousin Ugroth. He is kind, he is tall, and he has never lost a fight. She would have a good life. A loud one.",
    left: { label: "Absolutely not.", fx: { faith: 5, army: 5, people: 3 } },
    right: { label: "Ask her.", fx: { people: -10, faith: -10, army: 10 }, set: ["orc_goodwill"] },
  },
  {
    id: "orc_sorry_goat", char: "refugee", weight: 1,
    text: "We're from Hollin Ford, sir. Orcs came. We ran. When we came back they'd left a goat tied to the door and some bread. We think it was sorry. Can we have soldiers anyway.",
    left: { label: "Soldiers.", fx: { gold: -5, army: 5 } },
    right: { label: "Eat the goat.", fx: { people: -5 } },
  },
  {
    id: "orc_wolves", char: "orc_warchief", weight: 1, when: G,
    text: "Wolves in the Scar. Big ones. Not ours. We hunt them, you hunt them, or they hunt both of us and we argue about it later.",
    left: { label: "Hunt together.", fx: { people: 5 }, random: [
      { chance: 0.85, fx: { army: 10, people: 5, gold: -5 } },
      { chance: 0.15, fx: { army: -5 }, die: "wolves" },
    ] },
    right: { label: "Your side of the Scar.", fx: { people: -10, army: 5 } },
  },
  {
    id: "orc_singing", char: "orc_mercenary", weight: 1, when: { flags: ["orc_merc_hired"] },
    text: "Company's bored. Bored orcs drink. Drunk orcs sing. Your city hasn't slept in a week. Give us someone to fight or somewhere to be.",
    left: { label: "The border. Now.", fx: { army: 5 } },
    right: { label: "Let them sing.", fx: { people: -15 } },
  },
  {
    id: "orc_souls", char: "orc_envoy", weight: 1,
    text: "The Church says we have no souls. We had a vote. We've decided we don't want them if they're anything like the Flamekeeper's.",
    left: { label: "Tell Osric to stop.", fx: { faith: -10, people: 5 } },
    right: { label: "That's blasphemy.", fx: { faith: 10, army: -5 } },
  },
  {
    id: "orc_bridge_toll", char: "orc_warchief", weight: 1, when: G,
    text: "Your bridge at Scar's End charges a toll. We built half that bridge. We would like half the toll, or half the bridge. We have axes for the second.",
    left: { label: "Half the toll.", fx: { gold: -5, people: 5 } },
    right: { label: "Try it.", fx: {}, random: [
      { chance: 0.6, fx: { army: 5, gold: 15 } },
      { chance: 0.4, fx: { gold: -15, people: -10 } },
    ] },
  },
  {
    id: "orc_kings_hair", char: "orc_shaman", weight: 1,
    text: "I need a king's hair. One. For a working. It will not hurt you. It might hurt someone who looks like you.",
    left: { label: "Take it.", fx: { faith: -10 }, random: [
      { chance: 0.7, fx: { army: 10 } },
      { chance: 0.3, fx: { people: -10 } },
    ] },
    right: { label: "No.", fx: { faith: 5 } },
  },
  {
    id: "orc_knives", char: "peasant", weight: 2,
    text: "The orc traders sell better knives than the smithy, and cheaper. Smithy's furious. My wife's delighted. I'd like a decision I can blame on you.",
    left: { label: "Ban orc knives.", fx: { people: -5, gold: 10 } },
    right: { label: "Let them sell.", fx: { people: 10, gold: -5 }, set: ["orc_trade"] },
  },
  {
    id: "orc_kneel", char: "orc_warchief", weight: 1, when: G,
    text: "Your priests say we should kneel. Orcs do not kneel. Our knees do not do that. It is a matter of bone. Tell your priests.",
    left: { label: "They don't have to.", fx: { faith: -10, army: 5 } },
    right: { label: "Everyone kneels.", fx: { faith: 15 }, random: [
      { chance: 0.7, fx: { people: -5 } },
      { chance: 0.3, fx: { army: -15 }, set: ["orc_grudge"] },
    ] },
  },
  {
    id: "orc_dead_grandfather", char: "orc_shaman", weight: 0.8,
    text: "Your dead grandfather is under the palace. Not his body. Him. He is loud. He is asking for you. I would not go, but I am not a king.",
    left: { label: "Go down.", fx: { faith: -10 }, random: [
      { chance: 0.6, fx: { army: 10, people: 5, gold: 10 } },
      { chance: 0.4, die: "buried_alive" },
    ] },
    right: { label: "Seal it.", fx: { faith: 5, gold: -5 } },
  },
  {
    id: "orc_horse_killing", char: "orc_warchief", weight: 1, when: G,
    text: "A man of yours killed a rider of mine over a horse. The horse was the rider's. Under our law you owe me a man. Send him. Or send a better horse.",
    left: { label: "Send the man.", fx: { people: -15, army: 5 } },
    right: { label: "Send a horse.", fx: { gold: -5, people: 5 } },
  },
  {
    id: "orc_fence_builder", char: "peasant", weight: 2,
    text: "There's an orc in the village. Just one. He builds things. Fences, mostly. Nobody asked him. Nobody's stopped him. It's a very good fence.",
    left: { label: "Leave him.", fx: { people: 10 } },
    right: { label: "Send him home.", fx: { people: -5, army: 5 } },
  },
  {
    id: "orc_jester", char: "jester", weight: 1,
    text: "The orcs sent a jester, Majesty. He told one joke. Nobody laughed. He hit the Chancellor. Everybody laughed. I'd like to discuss my terms.",
    left: { label: "Hire the orc.", fx: { people: 15, gold: -5 } },
    right: { label: "Keep Pib.", fx: { people: -5, gold: 5 } },
  },
  {
    id: "orc_fire_east", char: "orc_shaman", weight: 1,
    text: "Your king-fire in the great hall. Move it. It faces east. Fires that face east lie, and you have been listening to it.",
    left: { label: "Move the fire.", fx: { faith: -10 } },
    right: { label: "It's a fireplace.", fx: { faith: 5 } },
  },
  {
    id: "orc_third_law", char: "orc_envoy", weight: 1,
    text: "I've been reading your law. Under it, my father's raids are theft. Under ours, your farmers are squatting. I propose a third law, written by me, that annoys both.",
    left: { label: "Draft it.", fx: { people: -5, army: -5 }, set: ["orc_law"] },
    right: { label: "One law. Mine.", fx: { army: 5, people: 5, gold: 5 } },
  },
  {
    id: "orc_letters", char: "orc_envoy", once: true,
    text: "We would like to learn your letters. Not to write poems. To read your treaties before we sign them. It has come up.",
    left: { label: "Send a tutor.", fx: { gold: -5, faith: -5 }, set: ["orc_letters"] },
    right: { label: "Sign first. Read later.", fx: { army: 5, people: 5 } },
  },
  {
    id: "orc_comet", char: "orc_shaman", weight: 0.8, oncePerReign: true,
    text: "Comet. Red tail. Last one, your line began and ours lost a war. This one, I do not know yet. Give me a goat and a night.",
    left: { label: "One goat.", fx: { faith: -5 }, next: { id: "orc_comet_2", delay: 1 } },
    right: { label: "It's a rock.", fx: { faith: 5 } },
  },
  {
    id: "orc_comet_2", char: "orc_shaman", chainOnly: true,
    text: "The goat is dead and I am tired. The comet says: a wall falls. Yours or mine, it did not say. Goats are cheap. Walls are not. Choose which to mend.",
    left: { label: "Mend mine.", fx: { gold: -15, army: 5 }, effect: "high_walls" },
    right: { label: "Mend nothing.", fx: { gold: 5 }, random: [
      { chance: 0.5, fx: { people: 5 } },
      { chance: 0.5, fx: { army: -20 } },
    ] },
  },
  {
    id: "orc_scales", char: "treasurer", weight: 1, when: { flags: ["orc_merc_hired"] },
    text: "The orc company is paid in silver, by weight. They have begun bringing their own scales. Their scales disagree with mine. Theirs are bigger.",
    left: { label: "Use their scales.", fx: { gold: -15, army: 5 } },
    right: { label: "Mine.", fx: { army: -10, gold: 10 } },
  },

  // ---------- rare ----------
  {
    id: "orc_grukhar_old", char: "orc_warchief", once: true, weight: 0.5, when: { flags: ["orc_blood_oath"], notFlags: ["orc_grukhar_dead"] },
    text: "I am old. My arm is slow. Shazza will lead, or Ugroth will, and there will be blood either way. I am asking you, human, which. I do not ask twice.",
    left: { label: "Shazza.", fx: { army: -5, people: 5 }, set: ["orc_backed_shazza"] },
    right: { label: "Ugroth.", fx: { army: 10, people: -10 } },
  },
  {
    id: "orc_grukhar_dies", char: "orc_envoy", once: true, weight: 0.5, when: { minYear: 30, notFlags: ["orc_grukhar_dead"] },
    text: "My father is dead. Not a duel. His heart. He would have hated that. I lead the Ashfang now. Everything you agreed with him, you agree with me. Or we find out what happens.",
    left: { label: "I agree with you.", fx: { army: -5, people: 5 }, set: ["orc_grukhar_dead"] },
    right: { label: "We'll find out.", fx: { army: 10, people: -5 }, set: ["orc_grukhar_dead", "orc_grudge"] },
  },
  {
    id: "orc_dorg_leaves", char: "orc_mercenary", once: true, weight: 0.5, when: { flags: ["orc_merc_hired"], minYear: 20 },
    text: "I've served eleven kings. Four of yours. Eleven's a lot of kings to bury. I'm going home. Wanted to say it to your face, because none of the others got that.",
    left: { label: "Go well, Dorg.", fx: { army: -15, people: 5 }, unset: ["orc_merc_hired"] },
    right: { label: "Double pay to stay.", fx: { gold: -20, army: 5 } },
  },
  {
    id: "orc_kethra_gold", char: "orc_envoy", once: true, weight: 0.5, when: { minYear: 15 },
    text: "The Emperor of Kethra has offered me gold to turn the clans south, against you. A great deal of gold. I am telling you so you can offer more.",
    left: { label: "How much more?", fx: { gold: -15, army: 5 } },
    right: { label: "Let him have you.", fx: { gold: 10 }, random: [
      { chance: 0.5, fx: { army: -20, people: -10 }, set: ["orc_grudge"] },
      { chance: 0.5, fx: { army: 5, people: 5 } },
    ] },
  },
  {
    id: "orc_death_seen", char: "orc_shaman", once: true, weight: 0.5,
    text: "I saw how you die. I will not tell you. Nobody should carry that. But I would not eat at the dark of the year, and I would not stand under anything heavy.",
    left: { label: "Tell me.", fx: { faith: -10, gold: -10 }, set: ["orc_death_told"] },
    right: { label: "Keep it.", fx: { faith: 5, people: -3 } },
  },
  {
    id: "orc_ash_mouth", char: "orc_shaman", once: true, weight: 0.5, when: { flags: ["demon_met"] },
    text: "The one in your fire. We know him. We call him Ash-in-the-Mouth. He came to us before he came to your grandfather. We said no. That is why we are poor and you are king.",
    left: { label: "How did you say no?", fx: { faith: -10, gold: -10 }, set: ["orc_demon_lore"] },
    right: { label: "I don't discuss my fire.", fx: { faith: 5 } },
  },
  {
    id: "orc_luck_stone", char: "orc_warchief", once: true, weight: 0.5, when: { flags: ["orc_respect"], notFlags: ["orc_grukhar_dead"] },
    text: "My daughter is cleverer than me. My son is stronger. Neither is as lucky. Luck is the only thing that kept me alive. This is my luck. It is a stone. Do not lose it.",
    left: { label: "Keep it close.", fx: { people: 5, faith: -5 }, set: ["orc_luck_stone"] },
    right: { label: "I have enough stones.", fx: { army: -10 } },
  },
  {
    id: "orc_shazza_marry", char: "orc_envoy", once: true, weight: 0.5, when: { flags: ["orc_backed_shazza"], notEffects: ["married"] },
    text: "Marry me. Not for love. My father dies, I hold the clans, you hold the south, our child holds both. Your Church will scream. Your Church screams anyway.",
    left: { label: "...Yes.", fx: { faith: -25, army: 15, people: -10, gold: 10 }, effect: "married", set: ["orc_queen"] },
    right: { label: "No.", fx: { faith: 5, army: -5 } },
  },

  // ---------- chain: the blood oath ----------
  {
    id: "orc_oath_1", char: "orc_warchief", once: true, when: { minReign: 3, notFlags: ["orc_blood_oath", "orc_grudge", "orc_grukhar_dead"] },
    text: "You kept your word about the cattle. Three times. Nobody keeps their word three times. Come to the Scar. Bring a knife. Bring no priests.",
    left: { label: "Go.", fx: { faith: -5 }, next: { id: "orc_oath_2", delay: 0 } },
    right: { label: "Kings don't cross the Scar.", fx: { army: 5, faith: 5, people: -3 } },
  },
  {
    id: "orc_oath_2", char: "orc_warchief", chainOnly: true,
    text: "He cuts his palm and holds out the knife. \"Your blood, my blood. My war, your war. My feast, your feast. Say no now and go home. Say yes and never say no again.\"",
    left: { label: "Cut.", fx: { faith: -15, army: 10 }, set: ["orc_blood_oath"], next: { id: "orc_oath_3", delay: 3 } },
    right: { label: "I'll keep my blood.", fx: { faith: 5, army: -5, people: -5 } },
  },
  {
    id: "orc_oath_3", char: "messenger", chainOnly: true,
    text: "A rider from Grukhar, Sire. Just the message: \"Trolls under the Old Bridge. Twelve. My war is your war. Two hundred men by the new moon. Your men. Not the ones you pay.\"",
    left: { label: "Two hundred men.", fx: { army: -15, gold: -5 }, next: { id: "orc_oath_4", delay: 1 } },
    right: { label: "The oath was ceremonial.", fx: { army: 5, people: -5 }, unset: ["orc_blood_oath"], set: ["orc_grudge"], next: { id: "orc_oath_broken", delay: 2 } },
  },
  {
    id: "orc_oath_4", char: "orc_warchief", chainOnly: true,
    text: "The trolls are dead. Sixty of your men too. Grukhar sends their swords back, cleaned, and a troll's head for your hall. Your Marshal says it is the ugliest thing he has ever been proud of.",
    left: { label: "Hang the head.", fx: { people: 10, army: 5, faith: -5, gold: 10 }, next: { id: "orc_oath_5", delay: 6 } },
    right: { label: "Bury the swords.", fx: { faith: 5, people: 5, gold: 5 }, next: { id: "orc_oath_5", delay: 6 } },
  },
  {
    id: "orc_oath_5", char: "orc_warchief", chainOnly: true,
    text: "Your army is thin. I hear things. Three hundred riders sit on the Scar with nothing to do. Your feast is my feast. Say the word.",
    left: { label: "The word.", fx: { army: 20, gold: -5, faith: -5 } },
    right: { label: "We manage.", fx: { army: -5, people: 5 } },
  },
  {
    id: "orc_oath_broken", char: "orc_warchief", chainOnly: true,
    text: "You cut your hand for nothing. My people say I should have cut higher. I say a coward is a coward and needs no help from me. Do not cross the Scar again.",
    left: { label: "Understood.", fx: { people: -5, army: -5 } },
    right: { label: "I'm not a coward.", fx: { army: 5, people: -5 }, next: { id: "orc_duel_1", delay: 1 } },
  },

  // ---------- chain: the duel ----------
  {
    id: "orc_duel_1", char: "orc_warchief", oncePerReign: true, weight: 0.8, when: { minReign: 2, notFlags: ["orc_grukhar_dead"] },
    text: "You called me a liar in front of your court. Or your Chancellor did and you laughed. Same thing. Old Bridge, midsummer. Axes. Bring one, or bring a coward's excuse.",
    left: { label: "I'll be there.", fx: { army: 5 }, next: { id: "orc_duel_2", delay: 0 } },
    right: { label: "Kings don't duel.", fx: { people: -15, army: -15, gold: 10 }, set: ["orc_coward"], next: { id: "orc_duel_coward", delay: 1 } },
  },
  {
    id: "orc_duel_2", char: "orc_warchief", chainOnly: true,
    text: "He is a head taller and has done this before. The clans have come to watch. So has half your court, which is worse. He hands you the heavier axe. \"Fair,\" he says.",
    left: { label: "Fight.", fx: {}, mode: { kind: "duel", foe: "orc_warchief", lose: "duel", win: { fx: { army: 20, people: 10 }, set: ["orc_respect"], next: "orc_duel_won" } } },
    right: { label: "Sir Gavriel fights for me.", fx: { army: -10, people: -10, gold: 5 }, set: ["orc_coward"], next: { id: "orc_duel_champion", delay: 0 } },
  },
  {
    id: "orc_duel_won", char: "orc_warchief", chainOnly: true,
    text: "His arm is in a sling. He is grinning. \"Nobody has cut me in twenty years. My daughter is angry. My riders are impressed. Eat with us. You have earned bad meat.\"",
    left: { label: "Eat.", fx: { people: 5, gold: 5, faith: -5 }, unset: ["orc_grudge"] },
    right: { label: "Go home and bleed.", fx: { army: 5, people: -3 } },
  },
  {
    id: "orc_duel_champion", char: "knight", chainOnly: true,
    text: "Sir Gavriel lost an ear and won the fight. Grukhar shook his hand, then turned his back on you and walked off. The clans did the same. Nobody has ever heard that many orcs be quiet.",
    left: { label: "Reward Gavriel.", fx: { gold: -10, army: 5 } },
    right: { label: "A win is a win.", fx: { people: -10, army: -5 }, set: ["orc_grudge"] },
  },
  {
    id: "orc_duel_coward", char: "orc_envoy", chainOnly: true,
    text: "You did not come. My father waited a day, then went home and sharpened things. I can fix this. It costs. Or you can wait for him to fix it. That costs more.",
    left: { label: "Pay.", fx: { gold: -15 }, unset: ["orc_coward"] },
    right: { label: "Let him come.", fx: { army: -10, people: -5 }, set: ["orc_grudge"], next: { id: "orc_raid_3", delay: 2 } },
  },

  // ---------- chain: mercenaries who don't leave ----------
  {
    id: "orc_merc_1", char: "orc_mercenary", weight: 1.5, when: { notFlags: ["orc_merc_hired"] },
    text: "Word is you're short of swords. I've got two hundred. They eat a lot and don't salute. Price is fair. Fairer than losing.",
    left: { label: "Hire them.", fx: { gold: -15, army: 15, people: -10 }, set: ["orc_merc_hired"], next: { id: "orc_merc_2", delay: 2 } },
    right: { label: "We have swords.", fx: { army: -5, gold: 10 } },
  },
  {
    id: "orc_merc_2", char: "orc_mercenary", chainOnly: true,
    text: "Company's paid. Company's fed. Company's fought twice and won twice. Now the company's wondering why it would ever leave. I'm wondering too, frankly.",
    left: { label: "Contract ends in spring.", fx: {}, next: { id: "orc_merc_3", delay: 2 } },
    right: { label: "Stay.", fx: { army: 10, gold: -10, people: -10 }, next: { id: "orc_merc_4", delay: 3 } },
  },
  {
    id: "orc_merc_3", char: "orc_mercenary", chainOnly: true,
    text: "Spring came. We didn't go. Nobody quite told us to. Your Marshal tried, and Ugroth laughed at him, and now the Marshal doesn't come to the barracks.",
    left: { label: "Pay them off.", fx: { gold: -20, army: -10 }, unset: ["orc_merc_hired"] },
    right: { label: "Fine. Stay.", fx: { army: 10, people: -10 }, next: { id: "orc_merc_4", delay: 3 } },
  },
  {
    id: "orc_merc_4", char: "orc_mercenary", chainOnly: true,
    text: "Half my company wants to go home. Other half married your bakers. I've stopped being a captain and started being a mayor. I don't like it.",
    left: { label: "Give them a quarter.", fx: { people: -15, army: 10 }, set: ["orc_quarter"], next: { id: "orc_merc_5", delay: 4 } },
    right: { label: "Home. All of them.", fx: { army: -20, people: 5, gold: 15 }, unset: ["orc_merc_hired"] },
  },
  {
    id: "orc_merc_5", char: "peasant", chainOnly: true,
    text: "Orc quarter's fine, Sire. Truly. They pay. They're quiet. It's just the kids. Half-orc, half-baker, all of them taller than me, and they've started a guild.",
    left: { label: "A guild's a guild.", fx: { people: 10, gold: 10 } },
    right: { label: "No orc guilds.", fx: { people: -10, army: -5 } },
  },

  // ---------- chain: refugees after the bad winter ----------
  {
    id: "orc_ref_1", char: "orc_envoy", once: true, when: { minYear: 6 },
    text: "The winter killed the horses. Then the old. Then the young. Four hundred of mine are at the Scar with nothing. I'm not asking as an envoy. I'm asking.",
    left: { label: "Open the ford.", fx: { people: -15, gold: -5 }, set: ["orc_refugees"], next: { id: "orc_ref_2", delay: 2 } },
    right: { label: "The Scar is closed.", fx: { army: 5, faith: 5, gold: 10 }, set: ["orc_grudge"], next: { id: "orc_ref_closed", delay: 1 } },
  },
  {
    id: "orc_ref_closed", char: "orc_shaman", chainOnly: true,
    text: "They died at the ford. We burned them where they fell, so you would see the smoke. You saw it. I watched you see it. That is all. I am too old to curse anyone.",
    left: { label: "It was the right decision.", fx: { army: 5, faith: -10, people: -5 } },
    right: { label: "Send grain now.", fx: { gold: -15, people: 5, faith: -5 } },
  },
  {
    id: "orc_ref_2", char: "peasant", chainOnly: true,
    text: "The orcs you let in are camped in the north field. They don't steal. They don't beg. They just stand there being large. Millbrook wants to know if it's permanent.",
    left: { label: "Give them the field.", fx: { people: -10, gold: 15 }, next: { id: "orc_ref_3", delay: 3 } },
    right: { label: "They go home in spring.", fx: { people: 10, army: -5 }, next: { id: "orc_ref_3", delay: 3 } },
  },
  {
    id: "orc_ref_3", char: "orc_envoy", chainOnly: true,
    text: "Your refugees. Mine. They've built a village. They call it Grukhar's Debt. They want to pay your tax, which nobody has ever wanted. Take it, or they'll be insulted.",
    left: { label: "Take the tax.", fx: { gold: 20, people: 5, faith: -5 }, next: { id: "orc_ref_4", delay: 2 } },
    right: { label: "They owe nothing.", fx: { people: -5, army: 5 }, set: ["orc_goodwill"], next: { id: "orc_ref_4", delay: 2 } },
  },
  {
    id: "orc_ref_4", char: "flamekeeper", chainOnly: true,
    text: "Four hundred unbaptised orcs, Majesty, inside the border, with a village and a name for it. The Flame is patient. I am not. Convert them or move them.",
    left: { label: "Send priests.", fx: { faith: 15, people: -10 }, random: [
      { chance: 0.7, fx: { gold: -5 } },
      { chance: 0.3, fx: { army: -10 }, set: ["orc_grudge"] },
    ] },
    right: { label: "Leave them be.", fx: { faith: -15, people: 5 } },
  },

  // ---------- chain: Shazza's succession ----------
  {
    id: "orc_shz_1", char: "orc_envoy", once: true, when: { minYear: 8, notFlags: ["orc_grukhar_dead", "orc_backed_shazza"] },
    text: "My father is getting old. He doesn't know it. When he dies there will be a fight for the clans. I would like to win it. You would like me to win it. Let's discuss the cost.",
    left: { label: "What does it cost?", fx: {}, next: { id: "orc_shz_2", delay: 0 } },
    right: { label: "That's orc business.", fx: { army: 5, people: 3 } },
  },
  {
    id: "orc_shz_2", char: "orc_envoy", chainOnly: true,
    text: "Coin, for the clans who can be bought. A road, for the clans who can't. And your word, in public, that you deal with me and not Ugroth. My father must not hear the last part.",
    left: { label: "Done.", fx: { gold: -15 }, set: ["orc_backed_shazza"], next: { id: "orc_shz_3", delay: 4 } },
    right: { label: "I don't do secrets.", fx: { army: 5, faith: 5 }, next: { id: "orc_ugroth", delay: 5 } },
  },
  {
    id: "orc_shz_3", char: "orc_warchief", chainOnly: true,
    text: "My daughter has a road and a purse and a human king in her pocket. She thinks I am blind. I am old. It is different. Tell me it was for the clans and I will believe you. Once.",
    left: { label: "For the clans.", fx: { army: -5, people: 5 }, next: { id: "orc_shz_4", delay: 3 } },
    right: { label: "She asked. I said yes.", fx: { army: 5, people: -5 }, next: { id: "orc_shz_4", delay: 3 } },
  },
  {
    id: "orc_shz_4", char: "orc_envoy", chainOnly: true,
    text: "My father named me heir in front of the clans. Ugroth walked out with two hundred riders. That was your road they took. I said it would be expensive. I didn't say for whom.",
    left: { label: "Hunt Ugroth.", fx: { army: -15, gold: -10 }, next: { id: "orc_shz_5", delay: 2 } },
    right: { label: "Let him go.", fx: { people: -5 }, next: { id: "orc_ugroth", delay: 6 } },
  },
  {
    id: "orc_shz_5", char: "orc_envoy", chainOnly: true,
    text: "Ugroth is dead. Your riders did it, so it counts as a war and not a murder, which is better for me. I owe you. Orcs pay debts. Name it.",
    left: { label: "A generation of peace.", fx: { army: -5, people: 15, gold: 5 }, set: ["orc_peace"], unset: ["orc_grudge"] },
    right: { label: "Gold.", fx: { gold: 35, people: -5 } },
  },
  {
    id: "orc_ugroth", char: "orc_warchief", chainOnly: true,
    text: "Ugroth. The broken clan. Shazza has your ear. I have three hundred riders and no ear at all. Give me something, or I take your border towns for practice.",
    left: { label: "Buy him.", fx: { gold: -15, army: 5 } },
    right: { label: "Practice, then.", fx: {}, random: [
      { chance: 0.5, fx: { army: 10, people: -10 } },
      { chance: 0.5, fx: { army: -15, people: -15 }, effect: "war", set: ["orc_war"], next: { id: "orc_war_4", delay: 3 } },
    ] },
  },

  // ---------- chain: the shaman's dreams ----------
  {
    id: "orc_vis_1", char: "orc_shaman", weight: 1, oncePerReign: true,
    text: "I dreamed a crow sat on your crown. It ate your ear. Then it flew west. I tell you this for nothing. The next one costs.",
    left: { label: "Consider me warned.", fx: { faith: -5, army: 5 } },
    right: { label: "Pay for the next.", fx: { gold: -5, faith: -10 }, next: { id: "orc_vis_2", delay: 1 } },
  },
  {
    id: "orc_vis_2", char: "orc_shaman", chainOnly: true,
    text: "Second dream. Your crown in the river, going down. A hand comes up and holds it. Not yours. A woman's, I think. Orc, I think. I do not like this dream.",
    left: { label: "Neither do I.", fx: { faith: -5, army: 5 } },
    right: { label: "Whose hand?", fx: { gold: -5 }, next: { id: "orc_vis_3", delay: 2 } },
  },
  {
    id: "orc_vis_3", char: "orc_shaman", chainOnly: true,
    text: "I asked the ancestors. They laughed. They only laugh about kings. Third dream: your hall, full of my people, eating. Nobody dead. That is the strange one.",
    left: { label: "Feed them, then.", fx: { gold: -10, people: -10, army: 5 }, set: ["orc_goodwill"], next: { id: "orc_vis_4", delay: 3 } },
    right: { label: "Enough dreams.", fx: { faith: 5 } },
  },
  {
    id: "orc_vis_4", char: "orc_shaman", chainOnly: true,
    text: "The dreams have stopped. That has never happened. Either the ancestors have nothing more to say, or someone has stopped them saying it. Sleep lightly.",
    left: { label: "Double the guard.", fx: { gold: -10, army: 5 } },
    right: { label: "Sleep is sleep.", fx: {}, random: [
      { chance: 0.8, fx: { people: 5 } },
      { chance: 0.2, die: "assassin_blade" },
    ] },
  },

  // ---------- chain: the Ashfang feast ----------
  {
    id: "orc_feast_1", char: "orc_envoy", oncePerReign: true, weight: 1, when: { notFlags: ["orc_grudge"] },
    text: "The Ashfang feast is at the dark of the year. You're invited. That has never happened. Eat what you're given, drink what you're poured, and don't mention my father's teeth.",
    left: { label: "Go.", fx: {}, next: { id: "orc_feast_2", delay: 0 } },
    right: { label: "Send a gift instead.", fx: { gold: -10, army: -5, people: 3 } },
  },
  {
    id: "orc_feast_2", char: "orc_warchief", chainOnly: true,
    text: "The meat is black. The drink is grey. Grukhar stands. \"The small king eats with us. Say something, small king. Short. We are hungry.\"",
    left: { label: "To the Ashfang.", fx: { people: 5, army: 5 }, next: { id: "orc_feast_3", delay: 0 } },
    right: { label: "To your teeth.", fx: {}, random: [
      { chance: 0.4, fx: { people: 5, army: 10 }, set: ["orc_respect"], next: { id: "orc_feast_3", delay: 0 } },
      { chance: 0.6, die: "orc_axe" },
    ] },
  },
  {
    id: "orc_feast_3", char: "orc_shaman", chainOnly: true,
    text: "Muzgash pushes a bowl at you. \"Ancestor broth. Everyone drinks. Then everyone sees. Your priest would call it a sin. Your priest is not here.\"",
    left: { label: "Drink.", fx: { faith: -15 }, random: [
      { chance: 0.7, fx: { army: 5, people: 5 }, set: ["orc_respect"], next: { id: "orc_feast_4", delay: 0 } },
      { chance: 0.3, die: "bad_mushroom" },
    ] },
    right: { label: "Refuse.", fx: { faith: 5, army: -5, people: -5 }, next: { id: "orc_feast_4", delay: 0 } },
  },
  {
    id: "orc_feast_4", char: "orc_mercenary", chainOnly: true,
    text: "Dorg, drunk, leans in. \"Wrestling. You and Grukhar's boy. Fourteen, but big. Lose and they like you. Win and they respect you. Refuse and I can't help you.\"",
    left: { label: "Wrestle.", fx: {}, random: [
      { chance: 0.6, fx: { army: 10, people: 5 }, next: { id: "orc_feast_5", delay: 1 } },
      { chance: 0.4, fx: { army: -10, people: 5 }, next: { id: "orc_feast_5", delay: 1 } },
    ] },
    right: { label: "Refuse.", fx: { people: -10, army: -10 } },
  },
  {
    id: "orc_feast_5", char: "orc_envoy", chainOnly: true,
    text: "You're alive. My father is pleased. He has decided you are 'nearly an orc', which is the kindest thing he has said about a human, and he wants to say it to your court.",
    left: { label: "Let him.", fx: { faith: -10, people: -5, army: 10 } },
    right: { label: "Quietly.", fx: { army: 5 } },
  },

  // ---------- chain: raids and what they mean ----------
  {
    id: "orc_raid_1", char: "peasant", weight: 2, when: { notEffects: ["war"] },
    text: "Orcs rode through Ashby. Took the sheep, left a spear stuck in the green. Old Tam says it's a declaration. Young Tam says it's a compliment. We need to know which Tam.",
    left: { label: "Old Tam. Arm the village.", fx: { gold: -10, army: 5, people: 5 }, next: { id: "orc_raid_2", delay: 1 } },
    right: { label: "Young Tam.", fx: { people: -5 }, next: { id: "orc_raid_2b", delay: 1 } },
  },
  {
    id: "orc_raid_2", char: "orc_warchief", chainOnly: true,
    text: "Your villagers shot my rider. He was bringing the sheep back. The spear meant 'we will bring them back'. Everyone knows this. Now I owe his mother something and I want it to be you.",
    left: { label: "Blood price.", fx: { gold: -10, people: -5 } },
    right: { label: "He shouldn't have taken sheep.", fx: { army: 5, people: 5 }, set: ["orc_grudge"], next: { id: "orc_raid_3", delay: 2 } },
  },
  {
    id: "orc_raid_3", char: "orc_warchief", chainOnly: true,
    text: "Fine. New rule. We do not bring things back. Your border towns will learn our old customs, from before we had manners.",
    left: { label: "Send the Marshal.", fx: { army: 5, people: -5 }, effect: "war", set: ["orc_war"], next: { id: "orc_war_2", delay: 1 } },
    right: { label: "Pay the mother.", fx: { gold: -15, people: -5 }, unset: ["orc_grudge"] },
  },
  {
    id: "orc_raid_2b", char: "orc_warchief", chainOnly: true,
    text: "Your villagers took the sheep back and gave my rider a pie. He has told everyone. Now there are fifty riders on the Scar asking who else wants a pie.",
    left: { label: "Pies for all.", fx: { gold: -10, people: 5, army: -5 }, set: ["orc_goodwill"] },
    right: { label: "One pie was enough.", fx: { people: -5, army: 5 } },
  },

  // ---------- chain: war ----------
  {
    id: "orc_war_1", char: "general", weight: 1, when: { notEffects: ["war"], notFlags: ["orc_blood_oath", "orc_peace"] },
    text: "The Ashfang are weak this year, Sire. Bad winter, thin horses. I can take the Scar in a season. It would look wonderful in the histories.",
    left: { label: "No.", fx: { army: -10, people: 5 } },
    right: { label: "Take it.", fx: { army: 10, people: 5 }, effect: "war", set: ["orc_war"], next: { id: "orc_war_2", delay: 1 } },
  },
  {
    id: "orc_war_2", char: "orc_warchief", chainOnly: true,
    text: "Your Marshal crossed the Scar with banners. We do not use banners. We used the dark. He has four hundred fewer men and I have his hat. Talk, or I keep coming.",
    left: { label: "Talk.", fx: { army: -5 }, next: { id: "orc_war_peace", delay: 0 } },
    right: { label: "Keep coming.", fx: { army: -15, gold: -10 }, next: { id: "orc_war_3", delay: 2 } },
  },
  {
    id: "orc_war_3", char: "messenger", chainOnly: true,
    text: "Millbrook's gone, Sire. Not burned. Gone. They took the doors, the mill wheel and the priest. Left the people. The people are asking whose idea this war was.",
    left: { label: "Mine.", fx: { people: -15, army: 5 }, next: { id: "orc_war_4", delay: 2 } },
    right: { label: "The Marshal's.", fx: { army: -15, people: -5 }, next: { id: "orc_war_4", delay: 2 } },
  },
  {
    id: "orc_war_4", char: "orc_envoy", chainOnly: true,
    text: "Three years. You've lost two towns and a Marshal's hat. We've lost a hundred riders and our patience. My father will take peace if you ask. He will not offer. Orcs don't.",
    left: { label: "I'm asking.", fx: { people: 5 }, next: { id: "orc_war_peace", delay: 0 } },
    right: { label: "Never.", fx: {}, random: [
      { chance: 0.4, fx: { army: 15, people: 10 }, removeEffect: "war", unset: ["orc_war"], set: ["orc_grudge"] },
      { chance: 0.6, fx: { army: -20, people: -15 }, next: { id: "orc_war_5", delay: 2 } },
    ] },
  },
  {
    id: "orc_war_5", char: "orc_warchief", chainOnly: true,
    text: "I am in your hall. Your guards are outside, alive, because I am not you. Sit. We end this. Sign what my daughter wrote, or I end it another way.",
    left: { label: "Sign.", fx: { gold: -20, army: -10 }, removeEffect: "war", unset: ["orc_war"], set: ["orc_grudge"] },
    right: { label: "Another way.", die: "orc_axe" },
  },
  {
    id: "orc_war_peace", char: "orc_envoy", chainOnly: true,
    text: "Peace. Terms: the fence comes down, the ford stays open, and you send a hundred head of cattle so my father can say he won. He needs to say he won.",
    left: { label: "Cattle.", fx: { gold: -10, people: 5 }, removeEffect: "war", unset: ["orc_war", "orc_grudge"] },
    right: { label: "No cattle.", fx: { army: 5, people: -5 }, removeEffect: "war", unset: ["orc_war"], set: ["orc_grudge"] },
  },

  // ---------- chain: traders ----------
  {
    id: "orc_trade_1", char: "merchant", weight: 1, when: { notFlags: ["orc_trade"] },
    text: "Orc traders at the north gate, Majesty. Wolf pelts, iron, some sort of cheese. Undercutting the Guild by half. It's not trade, it's an invasion with receipts.",
    left: { label: "Tax them at the gate.", fx: { gold: 15, people: -5 }, next: { id: "orc_trade_2", delay: 2 } },
    right: { label: "Free trade.", fx: { people: 10, gold: -10 }, set: ["orc_trade"], next: { id: "orc_trade_3", delay: 3 } },
  },
  {
    id: "orc_trade_2", char: "orc_envoy", chainOnly: true,
    text: "Your gate tax. My traders paid it once, in wolf pelts, then went round the wall and sold to the halflings, who sold to you. You have taxed yourself. Well done.",
    left: { label: "Drop the tax.", fx: { gold: -5, people: 5 }, set: ["orc_trade"], next: { id: "orc_trade_3", delay: 2 } },
    right: { label: "Tax the halflings.", fx: { gold: 15, people: -10 } },
  },
  {
    id: "orc_trade_3", char: "peasant", chainOnly: true,
    text: "The orc cheese, Sire. Everyone's eating it. Nobody knows what it's made from. Three people have asked. The orcs just smile. It's very good cheese.",
    left: { label: "Ask what's in it.", fx: {}, random: [
      { chance: 0.7, fx: { people: 5 } },
      { chance: 0.3, fx: { people: -10, faith: -5 } },
    ] },
    right: { label: "Don't ask.", fx: { people: 10, gold: 10 } },
  },
];
