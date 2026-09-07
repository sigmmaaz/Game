// The Sylvan elves of Greenreach: Lord Cael, the Lady Aerinwe, the rangers,
// the scholar, and Sera who is half of each. Flags/ids prefixed elf_.
export default [
  // ---------- Lord Cael, everyday ----------
  {
    id: "elf_envoy_wardens", char: "elf_envoy", weight: 2,
    text: "Your wardens at Ashford shot at a hunting party of ours in the fog. They missed. Our people have already composed a song about the marksmanship.",
    left: { label: "Flog the wardens.", fx: { army: -10, people: -5 } },
    right: { label: "The fog is ours too.", fx: { army: 10, gold: 10 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_envoy_map", char: "elf_envoy", weight: 2,
    text: "Lord Cael unrolls a map older than your dynasty. On it the border is forty miles east of where you keep it. \"We thought you would like to see the original.\"",
    left: { label: "Maps age.", fx: { army: 5, people: 5, gold: 10 }, set: ["elf_grudge"] },
    right: { label: "Move the boundary stones.", fx: { people: -15, gold: -5 }, set: ["elf_favor"] },
  },
  {
    id: "elf_envoy_stag", char: "elf_envoy",
    text: "The stag your huntsmen killed in the Thornwood was four hundred years old. It had a name. Lord Cael does not tell you what it was.",
    left: { label: "Reparations. For a deer.", fx: { gold: -10, people: -5 } },
    right: { label: "It was a deer.", fx: { army: 5, people: 3, gold: 5 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_envoy_cup", char: "elf_envoy", once: true,
    text: "Your grandfather promised the mill-stream at Coldwater would run clean. It runs brown. Lord Cael has brought a cup of it, in case you doubt him.",
    left: { label: "Close the tannery.", fx: { people: -10, gold: -10 }, set: ["elf_favor"] },
    right: { label: "You drink it.", fx: { people: 5, army: 3 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_envoy_sapling", char: "elf_envoy", when: { effects: ["heir"] },
    text: "A gift for your son: a sapling. \"It will be a tree when he is old. It will still be a tree when his grandchildren are forgotten. We find that comforting. He may not.\"",
    left: { label: "Plant it in the courtyard.", fx: { faith: -5, people: 5 } },
    right: { label: "Firewood.", fx: { faith: 5 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_envoy_tolls", char: "elf_envoy", weight: 2,
    text: "\"We have waited eleven years for an answer on the Thornwood tolls.\" Lord Cael says it the way one mentions rain. \"Eleven years is not long. We simply note it.\"",
    left: { label: "Abolish the tolls.", fx: { gold: -15, people: -5 }, set: ["elf_favor"] },
    right: { label: "Note eleven more.", fx: { gold: 20 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_envoy_sleepers", char: "elf_envoy",
    text: "Lord Cael brings an apology. Three of your woodcutters were found asleep at the forest edge and were not woken for a week. \"Our rangers are thorough. A flaw, we admit.\"",
    left: { label: "Soldiers go with the cutters.", fx: { army: 5, gold: -5 }, set: ["elf_grudge"] },
    right: { label: "The cutters stay home.", fx: { people: -10, gold: -5 } },
  },
  {
    id: "elf_envoy_bow", char: "elf_envoy",
    text: "A gift from the Lady: a bow of grey yew. No mortal alive can draw it. Lord Cael waits, with interest, to see whether you try.",
    left: { label: "Try.", random: [
      { chance: 0.6, fx: { army: 10, people: 5 } },
      { chance: 0.4, fx: { army: -10, people: -5 } },
    ] },
    right: { label: "Hang it on a wall.", fx: { faith: 3, gold: 5 } },
  },
  {
    id: "elf_envoy_refugees", char: "elf_envoy",
    text: "There are humans camped at our border. Yours. They say your tax collectors are worse than our wolves. We have wolves. We cannot confirm the comparison.",
    left: { label: "Bring them home. Lower the tax.", fx: { gold: -15, people: 10 } },
    right: { label: "Keep them.", fx: { people: -10, army: 5, gold: 10 } },
  },
  {
    id: "elf_envoy_missionaries", char: "elf_envoy",
    text: "The Flamekeeper has sent missionaries into the Greenreach. They preach to the trees, which is fine, and cut them for pulpits, which is not.",
    left: { label: "Recall them.", fx: { faith: -15, people: 3 } },
    right: { label: "The Flame goes where it wills.", fx: { faith: 10 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_envoy_aging", char: "elf_envoy", when: { effects: ["old_age"] }, oncePerReign: true,
    text: "Lord Cael studies your face with real interest. \"You are aging. It is remarkable, up close. The Lady asks whether you have thought about who we speak to next, and whether he will be worse.\"",
    left: { label: "My son.", fx: { faith: 3, people: 3, gold: 5 } },
    right: { label: "Not your concern.", fx: { army: 5, faith: -3 } },
  },
  {
    id: "elf_envoy_loan", char: "elf_envoy", when: { stats: { gold: [0, 25] }, notFlags: ["elf_debt"] },
    text: "\"Your treasury echoes; one hears it from the road. The Lady offers a loan. The interest is nothing. The term is ninety years. The collateral is the Thornwood.\"",
    left: { label: "Take it.", fx: { gold: 25, faith: -5 }, set: ["elf_debt"] },
    right: { label: "We'll manage.", fx: { people: -10 } },
  },
  {
    id: "elf_envoy_loan_due", char: "elf_envoy", when: { flags: ["elf_debt"], minYear: 30 }, once: true, weight: 0.5,
    text: "\"Your loan is ninety years old today. I congratulate you on outliving the man who took it. The Thornwood is now ours. We have already moved in. You will not have noticed.\"",
    left: { label: "Fight for it.", fx: { army: 15 }, effect: "war", set: ["elf_at_war"], unset: ["elf_debt"], next: { id: "elf_war_2", delay: 1 } },
    right: { label: "It was never really ours.", fx: { people: -15, gold: 10 }, unset: ["elf_debt"], set: ["elf_favor"] },
  },
  {
    id: "elf_envoy_shrine", char: "elf_envoy",
    text: "The Church wants a Flame-shrine at Larch Hollow, where the treaty was signed. \"We have no objection to a shrine. We object to the burning part. Our feelings about fire are well documented.\"",
    left: { label: "Build it elsewhere.", fx: { faith: -10 }, set: ["elf_favor"] },
    right: { label: "Build it.", fx: { faith: 15 }, set: ["elf_grudge"], random: [
      { chance: 0.7, fx: { faith: 15 } },
      { chance: 0.3, fx: { faith: 15, people: -10 } },
    ] },
  },
  {
    id: "elf_envoy_nothing", char: "elf_envoy",
    text: "Lord Cael asks, on the Lady's behalf, for nothing at all. He has come to stand in your hall for an afternoon, so that you remember he can.",
    left: { label: "Give him a chair.", fx: { people: 3, army: -3 } },
    right: { label: "Remove him.", fx: { army: 5, faith: 3 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_envoy_plague", char: "elf_envoy", when: { effects: ["plague"] }, oncePerReign: true,
    text: "Lord Cael has withdrawn to the far end of the hall. \"We do not catch it. We remember the last time your people had it. Close the western road, or we will close it for you.\"",
    left: { label: "Close it.", fx: { gold: -10, people: -5 } },
    right: { label: "Roads stay open.", random: [
      { chance: 0.5, fx: { people: -15 } },
      { chance: 0.5, fx: { army: -10 }, set: ["elf_grudge"] },
    ] },
  },
  {
    id: "elf_envoy_famine", char: "elf_envoy", when: { effects: ["famine"] },
    text: "\"Your people are eating bark. The Greenreach has grain. The Lady will sell it for silver, or for the Coldwater alders. She would prefer the alders. So, I think, would the bark.\"",
    left: { label: "The alders.", fx: { people: 15, gold: -5 }, set: ["elf_favor"] },
    right: { label: "Silver.", fx: { gold: -25, people: 10 } },
  },
  {
    id: "elf_envoy_kethra", char: "elf_envoy", when: { notFlags: ["elf_alliance"] },
    text: "\"The Emperor of Kethra has asked the Greenreach for an alliance against you. The Lady has not answered him. She wished you to know she has not answered, and that she can count.\"",
    left: { label: "Pay for her silence.", fx: { gold: -20 }, set: ["elf_favor"] },
    right: { label: "Let her answer.", fx: { army: 5 }, random: [
      { chance: 0.5, fx: { army: 5, gold: 10 } },
      { chance: 0.5, fx: { army: -15, gold: -10 } },
    ] },
  },
  {
    id: "elf_envoy_water", char: "elf_envoy", when: { flags: ["elf_grudge"] }, weight: 1.5,
    text: "Lord Cael no longer takes wine at your table. He drinks water, and looks at you, and drinks water. He has been doing this for a year.",
    left: { label: "Ask what it would take.", fx: { gold: -15, people: -5 }, unset: ["elf_grudge"] },
    right: { label: "Water's cheaper.", fx: { gold: 5, army: 3 } },
  },

  // ---------- humans, about elves ----------
  {
    id: "elf_flamekeeper_expel", char: "flamekeeper", weight: 1.5,
    text: "The Flamekeeper wants the elf envoy gone. \"It does not age, Sire. It does not pray. It attended the founding of the Church and finds us charming. Charming.\"",
    left: { label: "Expel Cael.", fx: { faith: 15, army: -5, gold: 10 }, set: ["elf_grudge"] },
    right: { label: "He stays.", fx: { faith: -15, people: 3 } },
  },
  {
    id: "elf_general_map", char: "general",
    text: "Marshal Thorne has a plan for the Greenreach. He has had it since he was nine. It is drawn on the back of a map and involves a great deal of fire and the word \"finally\".",
    left: { label: "Put the map away.", fx: { army: -10, people: 5 } },
    right: { label: "Tell me more.", fx: { army: 10, gold: -5 } },
  },
  {
    id: "elf_peasant_stone", char: "peasant", weight: 2,
    text: "Old Mag from Ashford. \"The elves put a stone in my field. Just a stone. It's been there a week and my cows won't go past it and neither will my husband.\"",
    left: { label: "Move the stone.", fx: { army: 3, people: 5 }, set: ["elf_grudge"] },
    right: { label: "Leave the stone.", fx: { people: -8 } },
  },
  {
    id: "elf_spymaster_letters", char: "spymaster",
    text: "The Whisperer has read Lord Cael's letters home for nine years. They are all about the weather. \"Nine years of weather, Sire. Either he is very dull, or the weather is us.\"",
    left: { label: "Have him followed.", fx: { gold: -10, army: 5 } },
    right: { label: "It's a wet country.", fx: { people: 3 } },
  },
  {
    id: "elf_bard_lay", char: "bard",
    text: "The bard has learned an elven lay about your great-great-grandfather. In it he is a coward, a thief and, oddly, a superb dancer. The court would like to hear all of it.",
    left: { label: "Sing it.", fx: { people: 10, faith: -5, army: -5 } },
    right: { label: "Not in my hall.", fx: { people: -5 } },
  },
  {
    id: "elf_treasurer_remembrance", char: "treasurer",
    text: "Mistress Penn has found a line in the ledger: \"To Greenreach, in remembrance, forty marks.\" Paid every year for two centuries. Remembrance of what, the ledger doesn't say.",
    left: { label: "Keep paying.", fx: { gold: -10 } },
    right: { label: "Stop paying.", fx: { gold: 15 }, random: [
      { chance: 0.5, fx: { gold: 15 } },
      { chance: 0.5, fx: { gold: 15, army: -10 }, set: ["elf_grudge"] },
    ] },
  },
  {
    id: "elf_dog_doorway", char: "dog",
    text: "The hound will not enter the hall while Lord Cael is in it. It lies across the doorway and watches him. Cael says it remembers something its great-grandmother saw. He does not say what.",
    left: { label: "Trust the dog.", fx: { army: 5, faith: 3 } },
    right: { label: "Trust the elf.", fx: { faith: -5, people: 3 } },
  },
  {
    id: "elf_executioner", char: "executioner", once: true,
    text: "There is an elf in the cells. Poaching. \"Sire, I've hanged men, orcs, a goblin once by accident. Never an elf. I'm told they take a very long time about it and are polite throughout.\"",
    left: { label: "Hang him.", fx: { army: 5, faith: 5 }, set: ["elf_grudge"] },
    right: { label: "Send him home.", fx: { people: -5 }, set: ["elf_favor"] },
  },
  {
    id: "elf_jester_impression", char: "jester",
    text: "Pib did Lord Cael at the feast. Slow voice, long pauses. Cael watched the whole thing, then said \"Yes. Exactly like that,\" and Pib has not spoken since.",
    left: { label: "Give Pib the day off.", fx: { people: 5, gold: -3 } },
    right: { label: "Do it again.", fx: { people: 8 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_merchant_casks", char: "merchant",
    text: "Guildmaster Crane has three casks of elven summerwine, source unstated. He wants a royal monopoly on it. He also wants a royal pardon, unrelated, in advance.",
    left: { label: "Monopoly and pardon.", fx: { gold: 20, faith: -5 }, set: ["elf_grudge"] },
    right: { label: "Confiscate the casks.", fx: { gold: 5, people: 5, army: -5 } },
  },

  // ---------- rangers, everyday ----------
  {
    id: "elf_ranger_poachers", char: "elf_ranger", weight: 2,
    text: "\"Your poachers cross the Whitewater at night for the silver-hart. We do not object to hunting. We object to the leaving of bodies in our streams.\"",
    left: { label: "Hang the poachers.", fx: { people: -10, faith: 5 } },
    right: { label: "The hart is free game.", fx: { people: 8, gold: 10 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_ranger_wolves", char: "elf_ranger",
    text: "\"A wolf pack is moving east out of the Greenreach. We are not driving it. We note only that it is moving toward your villages and away from ours.\"",
    left: { label: "Send hunters.", fx: { army: 5, gold: -10 } },
    right: { label: "Wolves eat what they eat.", fx: { people: -15, gold: 5 } },
  },
  {
    id: "elf_ranger_heath", char: "elf_ranger",
    text: "Your charcoal burners lit the Ravensmoor heath. It has burned for two days. The ranger's cloak still smokes. She has not sat down.",
    left: { label: "Every man to the fire.", fx: { army: -10, gold: -10, people: 5 } },
    right: { label: "Heath regrows.", fx: { people: -5, gold: 10 }, set: ["elf_grudge"], random: [
      { chance: 0.7, fx: { people: -5, gold: 10 } },
      { chance: 0.3, fx: { people: -15, gold: 10 } },
    ] },
  },
  {
    id: "elf_ranger_arrow_name", char: "elf_ranger",
    text: "A ranger delivers an arrow. Your steward's name is cut into the shaft, though it never touched him. \"This is the last one we give away.\"",
    left: { label: "Double the guard.", fx: { army: 10, gold: -10 } },
    right: { label: "Threats, now.", fx: { army: 5 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_ranger_pony", char: "elf_ranger",
    text: "A ranger has your daughter's pony. And your daughter. \"She crossed into the Greenreach after a fox. The fox is well. Please keep her on your side.\"",
    left: { label: "Reward her. Handsomely.", fx: { gold: -10, people: 5 } },
    right: { label: "Whip the groom.", fx: { people: -5, army: 3 } },
  },
  {
    id: "elf_ranger_herbs", char: "elf_ranger", when: { effects: ["plague"] },
    text: "A ranger brings a bundle of herbs for the plague quarter. \"Boil them. Do not pray over them; it does nothing, and the steam goes cold.\"",
    left: { label: "Boil them.", fx: { people: 15, faith: -10 } },
    right: { label: "Burn them.", fx: { faith: 10, people: -10 } },
  },
  {
    id: "elf_ranger_notches", char: "elf_ranger", weight: 0.7,
    text: "\"There is a tree at the Ashford edge with nine notches. One for each king of your line who tried to cut it. It is a healthy tree. Your steward has asked about firewood.\"",
    left: { label: "Make the tenth notch.", random: [
      { chance: 0.5, fx: { army: 15, people: 10 } },
      { chance: 0.5, die: "elf_arrow" },
    ] },
    right: { label: "Leave the tree.", fx: { people: -3 } },
  },
  {
    id: "elf_ranger_collector", char: "elf_ranger",
    text: "A ranger pulled your tax collector out of the Whitewater. \"He was in the river because your farmers put him there. We returned him because he is yours. We do not want him.\"",
    left: { label: "Hang the farmers.", fx: { faith: 5, people: -15, army: 5, gold: 10 } },
    right: { label: "Lower the tax.", fx: { gold: -15, people: 10 } },
  },
  {
    id: "elf_ranger_favor_road", char: "elf_ranger", when: { flags: ["elf_favor"] },
    text: "The rangers have cleared the bandits from the Coldwater road. Unbidden. \"The Lady remembers the wood you gave. This is what remembering looks like. The other kind looks different.\"",
    left: { label: "Thank them.", fx: { people: 10, gold: 5 } },
    right: { label: "Who gave permission?", fx: { army: 3 } },
  },
  {
    id: "elf_ranger_wagons", char: "elf_ranger", when: { flags: ["elf_at_war"] },
    text: "Your supply wagons on the Coldwater road were found intact. The oxen unharmed. The drivers alive. Every arrow was in the wine casks. Only the wine casks.",
    left: { label: "Send more wine.", fx: { people: -5, gold: -10 } },
    right: { label: "Send soldiers with it.", fx: { army: -10 } },
  },

  // ---------- the scholar, everyday ----------
  {
    id: "elf_scholar_tutor", char: "elf_scholar", when: { effects: ["heir"] },
    text: "The scholar offers to tutor your heir. \"He will learn six languages, the stars, and patience. The last will take longest. He is yours.\"",
    left: { label: "Teach him.", fx: { faith: -10, gold: -5 }, set: ["elf_tutor"] },
    right: { label: "Human tutors.", fx: { faith: 5 } },
  },
  {
    id: "elf_scholar_goose", char: "elf_scholar",
    text: "\"Your court speaks a debased form of our tongue. Every 'Majesty' is a word we use for a kind of goose. I have said nothing for forty years. I am saying it now.\"",
    left: { label: "Then I'm a goose.", fx: { people: 8 } },
    right: { label: "Escort her out.", fx: { faith: 5, army: 3 } },
  },
  {
    id: "elf_scholar_histories", char: "elf_scholar",
    text: "\"Your histories say this land was empty when your people came. Ours say otherwise, and were written at the time. I could correct yours in an afternoon.\"",
    left: { label: "Correct them.", fx: { faith: -10, people: -5 }, set: ["elf_favor"] },
    right: { label: "Ours are fine.", fx: { faith: 5, army: 5, gold: 5 } },
  },
  {
    id: "elf_scholar_watch", char: "elf_scholar", when: { effects: ["old_age"] }, once: true,
    text: "\"You will die soon. I have a request I could not make to a younger king: let me watch. I have never seen one from the beginning, and my notes are incomplete.\"",
    left: { label: "Watch, then.", fx: { faith: -10, people: -3 } },
    right: { label: "Get out.", fx: { faith: 5 } },
  },

  // ---------- Sera, everyday ----------
  {
    id: "elf_sera_cells", char: "half_elf",
    text: "Sera spent the night in the cells. Your guards took her for an elf spy. The elf hostel took her for a human one. \"I'd like a badge. Something that says what I'm for.\"",
    left: { label: "The royal badge.", fx: { army: -5, people: -5, faith: -3 }, set: ["elf_sera_court"] },
    right: { label: "What's anyone for?", fx: { people: 3 } },
  },
  {
    id: "elf_sera_queen", char: "half_elf", when: { flags: ["elf_alliance"], effects: ["married"] },
    text: "\"Your wife asked me what it's like. Half. I said I'd tell her in a hundred years when I knew. She said she could wait. She wasn't joking. She has never joked.\"",
    left: { label: "Give Sera a title.", fx: { people: -5, faith: -5, army: 3, gold: -5 } },
    right: { label: "Leave the Queen alone.", fx: { people: -3 } },
  },

  // ---------- the Lady, everyday ----------
  {
    id: "elf_lady_letter", char: "elf_queen", weight: 0.8,
    text: "A letter from the Lady, on birch bark. One sentence: \"Your grandfather's grandfather asked me the same question, and I told him no.\" You have not asked her anything. Yet.",
    left: { label: "Burn it.", fx: { faith: 5 } },
    right: { label: "Keep it.", fx: { faith: -3, army: -3 } },
  },
  {
    id: "elf_lady_summons", char: "elf_queen", when: { minReign: 5 }, once: true, weight: 0.5,
    text: "A summons. Not a request. The Lady will receive you at Larch Hollow at midsummer. Your grandfather went. Your father did not. She mentions both, in that order, without comment.",
    left: { label: "Go.", random: [
      { chance: 0.7, fx: { faith: -10, army: -5, people: 10 }, set: ["elf_favor"] },
      { chance: 0.3, fx: { gold: -20, people: 5 } },
    ] },
    right: { label: "Don't go.", fx: { army: 5 }, set: ["elf_grudge"] },
  },

  // ---------- CHAIN: the hunt, then the wood, then your daughter ----------
  {
    id: "elf_hunt_1", char: "elf_envoy", when: { notFlags: ["elf_hunt_done"] },
    text: "The Lady would like the Thornwood hunt. Not the wood, only the hunt. Your huntsmen may keep the rabbits. \"We have no strong feelings about rabbits.\"",
    left: { label: "Grant it.", fx: { people: -10, army: -5 }, set: ["elf_favor"], next: { id: "elf_hunt_2", delay: 3 } },
    right: { label: "The hunt is mine.", fx: { army: 5, people: 5, gold: 10 }, set: ["elf_grudge", "elf_hunt_done"] },
  },
  {
    id: "elf_hunt_2", char: "elf_envoy", chainOnly: true,
    text: "\"The hunt was generous. The deer, however, cross into the Ashford pastures, where your farmers shoot them. The wood should follow the deer. It is only sense.\"",
    left: { label: "Give them Ashford wood.", fx: { people: -15, gold: -10 }, next: { id: "elf_hunt_3", delay: 3 } },
    right: { label: "The deer can learn the border.", fx: { army: 5, gold: 10 }, set: ["elf_grudge", "elf_hunt_done"] },
  },
  {
    id: "elf_hunt_3", char: "elf_envoy", chainOnly: true,
    text: "\"The Ashford wood needs a warden your people will obey. The Lady suggests your daughter. Fostered. Twenty years, thirty. She will come back knowing which trees to leave alone.\"",
    left: { label: "Take her.", fx: { people: -10, faith: -10, army: -5 }, set: ["elf_princess_fostered", "elf_hunt_done"], next: { id: "elf_hunt_4", delay: 8 } },
    right: { label: "Take the wood back.", fx: { army: 10, people: 10, gold: 10 }, set: ["elf_grudge", "elf_hunt_done"], unset: ["elf_favor"] },
  },
  {
    id: "elf_hunt_4", char: "princess", chainOnly: true,
    text: "Your daughter writes from Greenreach. Her hand is steadier. Three lines: she is well, she has learned to be quiet, and you should stop cutting the Coldwater alders. She does not say please.",
    left: { label: "Stop cutting.", fx: { gold: -10, people: -5 }, set: ["elf_favor"] },
    right: { label: "She's theirs now.", fx: { faith: 5, people: -5, army: 3 }, set: ["elf_grudge"] },
  },

  // ---------- CHAIN: loggers vs rangers ----------
  {
    id: "elf_logger_1", char: "elf_ranger", weight: 1.5,
    text: "A ranger stands in your hall with mud to the knee and a logger's axe. \"He will want this back. He is in a tree. He may come down when he is calm.\"",
    left: { label: "Bring him down.", fx: { army: 5, people: 5 }, next: { id: "elf_logger_2", delay: 2 } },
    right: { label: "Keep the axe.", fx: { people: -5, gold: 5 } },
  },
  {
    id: "elf_logger_2", char: "peasant", chainOnly: true,
    text: "The logger, Hob, is back from his tree. \"Ten days, Your Kingship. They fed me. Acorns. I want the elf forest opened for cutting, or a pension. Acorns. Ten days.\"",
    left: { label: "Open the forest edge.", fx: { gold: 15, people: 10 }, set: ["elf_grudge"], next: { id: "elf_logger_3", delay: 2 } },
    right: { label: "A pension.", fx: { gold: -5, people: 3 } },
  },
  {
    id: "elf_logger_3", char: "elf_ranger", chainOnly: true,
    text: "\"Your loggers took forty oaks from the edge. We have taken forty loggers, gently, into the deep wood. Both are being shown what they were worth. Yours, more slowly.\"",
    left: { label: "Give the oaks back.", fx: { gold: -15, people: -5 }, unset: ["elf_grudge"] },
    right: { label: "Soldiers into the wood.", fx: { army: -15 }, random: [
      { chance: 0.6, fx: { army: -15, people: 5, gold: 15 } },
      { chance: 0.4, fx: { army: -25, people: -5 } },
    ] },
  },

  // ---------- CHAIN: the Treaty of Larch Hollow ----------
  {
    id: "elf_treaty_1", char: "elf_envoy", when: { notFlags: ["elf_treaty_done"] },
    text: "\"The Treaty of Larch Hollow. Your ancestors signed it in blood, which we found theatrical but binding. Clause nine gave us the Whitewater fords. You have been in breach for ninety years.\"",
    left: { label: "Read me clause nine.", fx: { gold: -3 }, next: { id: "elf_treaty_2", delay: 0 } },
    right: { label: "Ninety years is precedent.", fx: { army: 5, people: 5, gold: 15 }, set: ["elf_grudge", "elf_treaty_done"] },
  },
  {
    id: "elf_treaty_2", char: "elf_envoy", chainOnly: true,
    text: "\"'The King of Vael and his heirs shall keep no boat, bridge, nor ferry upon the Whitewater below the fords.'\" You have four bridges, a barge fleet and a toll house. He has counted them.",
    left: { label: "Pull down the bridges.", fx: { gold: -20, people: -15 }, set: ["elf_favor", "elf_treaty_done"] },
    right: { label: "Renegotiate.", fx: { gold: -10 }, next: { id: "elf_treaty_3", delay: 2 } },
  },
  {
    id: "elf_treaty_3", char: "elf_envoy", chainOnly: true,
    text: "The Lady will amend the clause. In exchange: one child of your house, fostered in Greenreach for twenty years. \"They come back. They always come back. They are simply... quieter.\"",
    left: { label: "Send a cousin.", fx: { people: -5, faith: -5 }, set: ["elf_fosterling", "elf_treaty_done"], next: { id: "elf_treaty_4", delay: 12 } },
    right: { label: "No child of mine.", fx: { army: 5, gold: 5 }, set: ["elf_grudge", "elf_treaty_done"] },
  },
  {
    id: "elf_treaty_4", char: "elf_envoy", chainOnly: true,
    text: "Your cousin has returned from Greenreach. He is thirty-two and looks nineteen. He speaks your language with an accent now. He asked, politely, where the trees were.",
    left: { label: "Give him a forest estate.", fx: { gold: -10, people: 5 } },
    right: { label: "A post at court.", fx: { army: -5, faith: -5 }, random: [
      { chance: 0.6, fx: { army: -5, faith: -5 } },
      { chance: 0.4, fx: { army: -5, faith: -5, gold: -15 } },
    ] },
  },

  // ---------- CHAIN: the marriage ----------
  {
    id: "elf_marriage_1", char: "elf_envoy", when: { notEffects: ["married"], notFlags: ["elf_alliance", "elf_grudge"] }, weight: 0.8,
    text: "\"The Lady proposes a marriage. Her niece Ithilwen, to you. She is young. Two hundred and six. She has agreed to try to find you interesting.\"",
    left: { label: "Accept.", fx: { faith: -10, people: -5 }, next: { id: "elf_marriage_2", delay: 1 } },
    right: { label: "I'll marry a human.", fx: { faith: 10, people: 5, gold: 10 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_marriage_2", char: "flamekeeper", chainOnly: true,
    text: "The Flamekeeper says the Flame cannot bless a union with a creature that predates the Flame. He has a document proving it. The document is newer than the bride.",
    left: { label: "Marry her anyway.", fx: { faith: -20, people: 5, gold: 15 }, effect: "married", set: ["elf_alliance"], next: { id: "elf_marriage_3", delay: 2 } },
    right: { label: "Call it off.", fx: { faith: 10, people: -5 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_marriage_3", char: "queen", chainOnly: true,
    text: "Your wife has not slept in a month. Elves don't, much. She sits in the garden all night and the roses have begun leaning toward her window. The gardener has resigned.",
    left: { label: "Hire an elf gardener.", fx: { gold: -10, people: -5 } },
    right: { label: "Sit with her.", fx: { army: -5 }, effect: "love", next: { id: "elf_marriage_4", delay: 5 } },
  },
  {
    id: "elf_marriage_4", char: "queen", chainOnly: true,
    text: "\"I will look like this when you are dust. I have decided not to apologize for it. But I will bury you in the Greenreach, under a tree with a name, if you like. Humans like that.\"",
    left: { label: "I'd like that.", fx: { faith: -10, people: 5 }, set: ["elf_burial"] },
    right: { label: "Bury me with my fathers.", fx: { faith: 5, people: 3 } },
  },
  {
    id: "elf_alliance_song", char: "elf_envoy", when: { flags: ["elf_alliance"], effects: ["heir"] },
    text: "Your heir is a quarter elf, and the Greenreach has begun a song about him. It has four hundred verses so far. He is six.",
    left: { label: "Bring the singers.", fx: { gold: -10, people: 10 } },
    right: { label: "Human heir. Human songs.", fx: { faith: 5, people: -5 } },
  },
  {
    id: "elf_alliance_archers", char: "elf_envoy", when: { flags: ["elf_alliance"], stats: { army: [0, 30] } },
    text: "\"The Lady notes your army is thin. Family is family. Two hundred archers wait at the border. They will not take orders from your Marshal. They will take suggestions.\"",
    left: { label: "Suggest they help.", fx: { army: 20, faith: -5, gold: -5 } },
    right: { label: "No elves in my ranks.", fx: { army: -5, faith: 5 } },
  },
  {
    id: "elf_alliance_ships", char: "elf_envoy", when: { flags: ["elf_alliance"] }, weight: 0.7,
    text: "\"Kethran ships were seen off the Greenreach coast. They were not seen again. Family is family. There will be no charge. There will be a song.\"",
    left: { label: "Feast the elves.", fx: { gold: -10, people: 5, army: 5 } },
    right: { label: "Say nothing.", fx: { faith: 3, gold: 10 } },
  },
  {
    id: "elf_alliance_mirror", char: "elf_envoy", when: { effects: ["married"], notFlags: ["elf_alliance"] }, once: true,
    text: "A wedding gift, a year late; the Lady wished to see whether the marriage lasted. A mirror. \"It shows what you will look like. She said you would find that instructive.\"",
    left: { label: "Look.", random: [
      { chance: 0.6, fx: { faith: -5, people: 3 } },
      { chance: 0.4, fx: { army: -10, faith: -5 } },
    ] },
    right: { label: "Give it to the Queen.", fx: { people: 5 } },
  },

  // ---------- CHAIN: the war ----------
  {
    id: "elf_war_1", char: "elf_envoy", when: { flags: ["elf_grudge"], notFlags: ["elf_at_war", "elf_peace"], notEffects: ["war"] }, oncePerReign: true, weight: 0.6,
    text: "Lord Cael has stopped bowing. \"The Lady has counted your offences and reached a number she finds sufficient. The trees at Ashford have been asked to remember your soldiers' faces.\"",
    left: { label: "Apologize. Fully.", fx: { gold: -20, army: -10, people: -5 }, unset: ["elf_grudge"] },
    right: { label: "Let the trees try.", fx: { army: 10 }, effect: "war", set: ["elf_at_war"], next: { id: "elf_war_2", delay: 1 } },
  },
  {
    id: "elf_war_2", char: "general", chainOnly: true,
    text: "Marshal Thorne is delighted. \"A real war. With elves. Forty years I've waited.\" He has a plan. It involves burning the Greenreach. All of it.",
    left: { label: "Burn it.", fx: { army: 10, faith: 5, people: -10, gold: 10 }, next: { id: "elf_war_3", delay: 2 } },
    right: { label: "Meet them in the open.", fx: { army: -10 }, next: { id: "elf_war_3b", delay: 2 } },
  },
  {
    id: "elf_war_3", char: "elf_ranger", chainOnly: true,
    text: "The forest did not burn. It rained for eleven days out of a clear sky. Your men are wet, and something in the trees is laughing very quietly. Six hundred did not come back.",
    left: { label: "Push on.", fx: { army: -20 }, random: [
      { chance: 0.6, fx: { army: -20 }, next: { id: "elf_war_4", delay: 2 } },
      { chance: 0.4, die: "elf_arrow" },
    ] },
    right: { label: "Fall back.", fx: { army: -10, people: -5 }, next: { id: "elf_war_4", delay: 3 } },
  },
  {
    id: "elf_war_3b", char: "general", chainOnly: true,
    text: "Thorne met them on the Ashford plain. \"They didn't come. We stood there three days in formation. Then we went home and they'd taken the granaries.\"",
    left: { label: "Take them back.", fx: { army: -15, gold: 5 }, next: { id: "elf_war_4", delay: 2 } },
    right: { label: "Hold the walls.", fx: { people: -15 }, next: { id: "elf_war_4", delay: 3 } },
  },
  {
    id: "elf_war_4", char: "elf_envoy", chainOnly: true,
    text: "Lord Cael returns under a green branch. He is bowing again, a little. \"The Lady offers terms. The Thornwood, the mill-stream, your archives. Otherwise we continue. We are not tired. Are you?\"",
    left: { label: "Take the terms.", fx: { gold: -20, people: 10, army: -10 }, removeEffect: "war", unset: ["elf_at_war", "elf_grudge"], set: ["elf_peace"], next: { id: "elf_war_peace", delay: 4 } },
    right: { label: "Continue.", random: [
      { chance: 0.5, fx: { army: -10 }, next: { id: "elf_war_5", delay: 2 } },
      { chance: 0.5, die: "elf_arrow" },
    ] },
  },
  {
    id: "elf_war_5", char: "elf_queen", chainOnly: true,
    text: "The Lady does not come herself. An arrow comes, over the walls, from the far bank of the river, from further than any bow should reach. It is in the cushion of your throne. You were standing.",
    left: { label: "Fight on.", random: [
      { chance: 0.7, die: "elf_arrow" },
      { chance: 0.3, fx: { army: 15, faith: 10, people: 10 }, removeEffect: "war", unset: ["elf_at_war", "elf_grudge"], set: ["elf_peace"] },
    ] },
    right: { label: "Peace. Her terms.", fx: { gold: -25, army: -15, people: 5 }, removeEffect: "war", unset: ["elf_at_war", "elf_grudge"], set: ["elf_peace"], next: { id: "elf_war_peace", delay: 3 } },
  },
  {
    id: "elf_war_peace", char: "elf_envoy", chainOnly: true,
    text: "Lord Cael brings the peace. It is on bark and it is short. \"We have left out the usual clause about your grandchildren. We have learned to write those separately.\"",
    left: { label: "Sign.", fx: { gold: -5, faith: -3 } },
    right: { label: "Put the grandchildren in.", fx: { people: 5 }, set: ["elf_favor"] },
  },

  // ---------- CHAIN: summerwine ----------
  {
    id: "elf_wine_1", char: "elf_envoy",
    text: "A gift: twelve bottles of Greenreach summerwine. \"One glass. Not two. Your great-uncle had two, and was found in a tree, and happy, and dead.\"",
    left: { label: "One glass.", fx: { people: 5, faith: -3 }, set: ["elf_wine_tasted"], next: { id: "elf_wine_2", delay: 1 } },
    right: { label: "Send it to the Flamekeeper.", random: [
      { chance: 0.7, fx: { faith: 10 } },
      { chance: 0.3, fx: { faith: -15 } },
    ] },
  },
  {
    id: "elf_wine_2", char: "steward", chainOnly: true,
    text: "Wendel reports the summerwine is gone. Eleven bottles. The Chancellor wears a look of terrible peace and has forgiven everyone, by name. The Marshal was last seen heading for the orchard.",
    left: { label: "Find the Marshal.", fx: { army: -5, gold: -5 }, next: { id: "elf_wine_3", delay: 0 } },
    right: { label: "Let him be happy.", fx: { army: -10, people: 5 } },
  },
  {
    id: "elf_wine_3", char: "general", chainOnly: true,
    text: "Thorne was in the orchard, up a pear tree, singing. He has climbed down and remembers all of it. He would like the Greenreach invaded before anyone else does.",
    left: { label: "It was wine, Brannoc.", fx: { army: -5, people: 5 } },
    right: { label: "...Perhaps.", fx: { army: 10 }, set: ["elf_grudge"] },
  },
  {
    id: "elf_wine_bucket", char: "jester", when: { flags: ["elf_wine_tasted"] },
    text: "Pib has found the last bottle of elf wine. \"One glass, they said. What's a glass, though? Is a bucket a glass? I've decided it is.\" He offers you the bucket.",
    left: { label: "Drink.", random: [
      { chance: 0.6, fx: { people: 10, faith: -5 } },
      { chance: 0.4, die: "poison" },
    ] },
    right: { label: "Take the bucket away.", fx: { people: -3, faith: 3 } },
  },

  // ---------- CHAIN: the archives ----------
  {
    id: "elf_scholar_1", char: "elf_scholar", when: { notFlags: ["elf_archives_open"] },
    text: "An elf scholar wants your archives. All of them. \"They rot in a damp tower. We have a dry one. We also have time to read them, which you demonstrably do not.\"",
    left: { label: "Show her the tower.", fx: { faith: -5, gold: 10 }, set: ["elf_archives_open"], next: { id: "elf_scholar_2", delay: 2 } },
    right: { label: "Our rot is our own.", fx: { faith: 5 } },
  },
  {
    id: "elf_scholar_2", char: "elf_scholar", chainOnly: true,
    text: "She has read the founding charter. \"Your first king could not spell his own name. He signed as Vael, then Vale, then Vahl. Which one is the country?\"",
    left: { label: "All three.", fx: { people: 5 }, next: { id: "elf_scholar_3", delay: 3 } },
    right: { label: "Burn the charter.", fx: { faith: 10, people: -5 } },
  },
  {
    id: "elf_scholar_3", char: "elf_scholar", chainOnly: true,
    text: "She has found a deed. The land under this palace was leased from the Greenreach for one thousand years. The lease ends in the spring.",
    left: { label: "Renew the lease.", fx: { gold: -25 }, set: ["elf_favor"] },
    right: { label: "Lose the deed.", fx: { faith: -5, gold: 10 }, set: ["elf_grudge"], next: { id: "elf_scholar_4", delay: 4 } },
  },
  {
    id: "elf_scholar_4", char: "elf_scholar", chainOnly: true,
    text: "The scholar has gone. So has the deed. Lord Cael sends word that the Lady found it very interesting reading, and will keep it somewhere dry.",
    left: { label: "Offer a new lease.", fx: { gold: -20 }, unset: ["elf_grudge"] },
    right: { label: "Paper is paper.", fx: { army: 5 }, next: { id: "elf_war_1", delay: 3 } },
  },

  // ---------- CHAIN: Sera ----------
  {
    id: "elf_sera_1", char: "half_elf", when: { notFlags: ["elf_sera_court", "elf_sera_gone"] },
    text: "Sera's ears are too pointed for the city and too short for the wood. She wants a post. Any post. \"I speak both tongues and both sides lie to me equally. That's useful. Use it.\"",
    left: { label: "Court interpreter.", fx: { gold: -5, army: 3 }, set: ["elf_sera_court"], next: { id: "elf_sera_2", delay: 3 } },
    right: { label: "No.", fx: { people: -3 } },
  },
  {
    id: "elf_sera_2", char: "half_elf", chainOnly: true,
    text: "\"Lord Cael used a word yesterday I translated as 'friend'. It also means 'livestock'. I picked the one you'd like. Do you want me to keep doing that?\"",
    left: { label: "Keep doing it.", fx: { people: 5, faith: -3 }, next: { id: "elf_sera_3", delay: 3 } },
    right: { label: "Tell me everything.", fx: { army: 5, gold: -5 }, set: ["elf_sera_honest"], next: { id: "elf_sera_3", delay: 3 } },
  },
  {
    id: "elf_sera_3", char: "half_elf", chainOnly: true,
    text: "Sera has been offered gold by the Greenreach to report on you, and by your Whisperer to report on the Greenreach. \"I'm telling you because you're the only one who hasn't asked me for anything yet.\"",
    left: { label: "What do you want?", fx: { people: 5 }, next: { id: "elf_sera_4", delay: 2 } },
    right: { label: "Take both purses.", fx: { gold: 15, army: -5 }, next: { id: "elf_sera_4", delay: 4 } },
  },
  {
    id: "elf_sera_4", char: "half_elf", chainOnly: true,
    text: "\"A house. With a door. Somewhere people stop asking which half I am.\" She is not crying. Half of her would consider it undignified.",
    left: { label: "Give her a house.", fx: { gold: -15, people: 5 }, set: ["elf_sera_home"], next: { id: "elf_sera_5", delay: 5 } },
    right: { label: "That isn't something I can give.", fx: { people: -10 } },
  },
  {
    id: "elf_sera_5", char: "half_elf", chainOnly: true,
    text: "Sera's house burned. Someone painted a slur on the door first, in your language and then, carefully, in theirs. She is standing in your hall with a bag.",
    left: { label: "Find them. Hang them.", fx: { faith: -5, people: -10, army: 5 } },
    right: { label: "Go to the Greenreach.", fx: { people: -5 }, set: ["elf_sera_gone"], unset: ["elf_sera_court"], next: { id: "elf_sera_6", delay: 6 } },
  },
  {
    id: "elf_sera_6", char: "half_elf", chainOnly: true,
    text: "Sera is back, in grey. She serves Lord Cael now, and translates you for him. \"I choose the kinder word,\" she says. \"For both of you. Someone should.\"",
    left: { label: "Come home.", random: [
      { chance: 0.5, fx: { people: 5 }, unset: ["elf_sera_gone"], set: ["elf_sera_court"] },
      { chance: 0.5, fx: { army: -5, faith: -3 } },
    ] },
    right: { label: "Stay useful.", fx: { faith: -3, army: 3 } },
  },

  // ---------- CHAIN: the Lady comes in person ----------
  {
    id: "elf_lady_visit_1", char: "elf_queen", when: { minReign: 3 }, once: true, weight: 0.5,
    text: "The Lady Aerinwe is in your hall. She was not announced; the herald is sitting on the floor. Two guards are weeping and do not know why. She has come to look at you.",
    left: { label: "Kneel.", fx: { faith: -10, people: 5, army: -5 }, next: { id: "elf_lady_visit_2", delay: 0 } },
    right: { label: "Stand.", fx: { army: 10, faith: 5 }, next: { id: "elf_lady_visit_2", delay: 0 } },
  },
  {
    id: "elf_lady_visit_2", char: "elf_queen", chainOnly: true,
    text: "\"I met your line's founder. He was a bandit with a good horse. You have his jaw and his debts. I am not here to collect. I am here to see if there is anything worth waiting for.\"",
    left: { label: "There is.", fx: { people: 5 }, next: { id: "elf_lady_visit_3", delay: 0 } },
    right: { label: "Wait and see.", fx: { army: 5 }, next: { id: "elf_lady_visit_3", delay: 0 } },
  },
  {
    id: "elf_lady_visit_3", char: "elf_queen", chainOnly: true,
    text: "She touches the arm of your throne and the oak puts out one green leaf. \"Ninety years of peace between us, or the forest takes the rest of this chair. Choose slowly. I have time.\"",
    left: { label: "Peace.", fx: { faith: -10, army: -15, gold: 10, people: 10 }, removeEffect: "war", unset: ["elf_at_war", "elf_grudge"], set: ["elf_peace"] },
    right: { label: "The chair is mine.", fx: { army: 15, faith: 5, gold: 10 }, set: ["elf_grudge"], unset: ["elf_peace"], next: { id: "elf_war_1", delay: 5 } },
  },
];
