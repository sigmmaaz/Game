// The spine of the dynasty: the Bargainer, coronations, old age, the ending.
// Everything here is referenced by the engine or by chains; keep ids stable.
export default [
  // ---------- coronation ----------
  {
    id: "story_coronation", char: "chancellor", chainOnly: true,
    text: "The crown fits. That's the last thing that will. Your predecessor left debts, a war whose cause is in a drawer somewhere, and a dog. The dog is loyal. Start there.",
    left: { label: "Read me the debts.", fx: { gold: 5, people: -5 } },
    right: { label: "Where's the dog?", fx: { people: 5 }, next: { id: "story_dog_intro", delay: 0 } },
  },
  {
    id: "story_dog_intro", char: "dog", chainOnly: true,
    text: "The hound looks at you the way it looked at the last four kings. It does not seem to think you're different. It puts its head on your knee anyway.",
    left: { label: "Good dog.", fx: { people: 3 }, set: ["dog_kept"] },
    right: { label: "Kennels.", fx: { army: 3 } },
  },

  // ---------- the Bargainer ----------
  {
    id: "story_demon_intro", char: "demon", chainOnly: true,
    text: "You wake and the fire is burning black. A man sits in it, comfortably. He says he knew your grandfather. He says your grandfather owes him, and the dead can't pay.",
    left: { label: "Guards.", fx: { army: -5 }, next: { id: "story_demon_intro_2", delay: 0 } },
    right: { label: "What does he owe?", fx: { faith: -5 }, next: { id: "story_demon_intro_2", delay: 0 } },
  },
  {
    id: "story_demon_intro_2", char: "demon", chainOnly: true,
    text: "\"A small thing. He asked for a long line of kings. I gave it. He forgot to ask that they be happy, or clever, or live long. You'll have noticed.\" He smiles. \"I collect one a reign.\"",
    left: { label: "Collect what?", fx: {}, next: { id: "story_demon_intro_3", delay: 0 } },
    right: { label: "Get out of my fire.", fx: { faith: 5 }, next: { id: "story_demon_intro_3", delay: 0 } },
  },
  {
    id: "story_demon_intro_3", char: "demon", chainOnly: true,
    text: "\"A king, obviously. Every one of you dies for me, one way or another. Unless you'd like to renegotiate. I'm always open to that.\" The fire goes out. It's morning. The dog is growling at the hearth.",
    left: { label: "No deals.", fx: { faith: 5 }, set: ["demon_met"], next: { id: "story_demon_return", delay: 9 } },
    right: { label: "I'm listening.", fx: { faith: -10 }, set: ["demon_met", "demon_listening"], next: { id: "story_demon_offer", delay: 2 } },
  },
  {
    id: "story_demon_offer", char: "demon", chainOnly: true,
    text: "\"Here's the shape of it. I take my king each reign. You'd like to be the one I don't. Fine. Bring me something better. A saint. A dragon. A whole people's god. I'm flexible.\"",
    left: { label: "I'll find something.", fx: { faith: -10, gold: 5 }, set: ["demon_hunt"], effect: "doomed", next: { id: "story_demon_check", delay: 10 } },
    right: { label: "Take me instead. Later.", fx: { faith: -5, people: 10 }, set: ["demon_self"], next: { id: "story_demon_return", delay: 12 } },
  },
  {
    id: "story_demon_return", char: "demon", chainOnly: true,
    text: "The fire goes black in the middle of a council session. The Chancellor keeps talking about drains. \"Just checking in. You look tired. Your grandfather looked tired at this point too.\"",
    left: { label: "Leave me alone.", fx: { people: -5 }, next: { id: "story_demon_return", delay: 11 } },
    right: { label: "How did he die?", fx: { faith: -3 }, next: { id: "story_demon_grandfather", delay: 0 } },
  },
  {
    id: "story_demon_grandfather", char: "demon", chainOnly: true,
    text: "\"Badly. He tried to burn me out of the hearth with holy oil. It's still there, under the flagstones. Pull them up sometime. There's a stair.\"",
    left: { label: "Pull up the flagstones.", fx: { gold: -10 }, set: ["deep_stair_found"], next: { id: "story_deep_1", delay: 1 } },
    right: { label: "Leave the floor alone.", fx: { faith: 5 }, next: { id: "story_demon_return", delay: 15 } },
  },
  {
    id: "story_demon_check", char: "demon", chainOnly: true,
    text: "\"Ten years. Nothing. I gave you a whole decade and you built a granary.\" He picks something out of his teeth. \"I'll take a smaller payment on account. Someone you like.\"",
    left: { label: "Take the Chancellor.", fx: { people: -5, gold: 10 }, set: ["chancellor_taken"], next: { id: "story_demon_check_2", delay: 8 } },
    right: { label: "You'll take nothing.", fx: { faith: 5 }, random: [
      { chance: 0.7, fx: { army: -15 }, next: { id: "story_demon_check_2", delay: 6 } },
      { chance: 0.3, die: "cursed" },
    ] },
  },
  {
    id: "story_demon_check_2", char: "demon", chainOnly: true,
    text: "\"You're stalling. I admire it. Here's a hint, free: there's a woman in the Thornwood who knows how these bargains are written. She won't like you. She doesn't like anyone. Go anyway.\"",
    left: { label: "Find the witch.", fx: { faith: -5 }, set: ["seek_mab"], next: { id: "story_mab_1", delay: 2 } },
    right: { label: "I don't take hints from you.", fx: { army: 5 }, next: { id: "story_demon_final", delay: 9 } },
  },
  {
    id: "story_mab_1", char: "witch", chainOnly: true,
    text: "Old Mab doesn't get up. \"You've got the smell. Hearth-smoke and someone else's promise. Your grandfather had it. Sit down. Don't touch the cat, it isn't one.\"",
    left: { label: "How do I get out?", fx: {}, next: { id: "story_mab_2", delay: 0 } },
    right: { label: "How much?", fx: { gold: -10 }, next: { id: "story_mab_2", delay: 0 } },
  },
  {
    id: "story_mab_2", char: "witch", chainOnly: true,
    text: "\"You don't get out. You get it read properly. He promised a long line of kings. He never said human. Put something on the throne that isn't one of you and the line runs on. He's nothing to collect.\"",
    left: { label: "That's absurd.", fx: { faith: 5 }, next: { id: "story_demon_final", delay: 8 } },
    right: { label: "Who, then?", fx: {}, set: ["mab_plan"], next: { id: "story_mab_3", delay: 0 } },
  },
  {
    id: "story_mab_3", char: "witch", chainOnly: true,
    text: "\"Anyone who'll have it. An elf'll live long enough to spite him. An orc won't want it, which is a fine quality in a king. Or the dog. The dog's loyal.\" She isn't joking. She never is.",
    left: { label: "Not the dog.", fx: {}, set: ["mab_heir_hunt"], next: { id: "story_heir_choice", delay: 4 } },
    right: { label: "...The dog.", fx: { people: -10 }, set: ["mab_dog_plan"], next: { id: "story_dog_heir", delay: 3 } },
  },
  {
    id: "story_heir_choice", char: "chancellor", chainOnly: true,
    text: "\"You want to name a non-human heir. Sire. I've served four kings. None of them were sane either, but they had the decency to be sane in public. Who?\"",
    left: { label: "The half-elf, Sera.", fx: { faith: -10, people: -10 }, set: ["heir_sera"], next: { id: "story_sera_heir", delay: 1 } },
    right: { label: "Shazza of the Ashfang.", fx: { army: -15, people: -10 }, set: ["heir_shazza"], next: { id: "story_shazza_heir", delay: 1 } },
  },
  {
    id: "story_sera_heir", char: "half_elf", chainOnly: true,
    text: "Sera hears you out. \"I've been thrown out of an elf court and a human tavern in the same week. You want to give me a throne so a demon chokes on it.\" A long pause. \"Fine. I've had worse offers.\"",
    left: { label: "Swear her in tonight.", fx: { faith: -10, army: -5 }, set: ["nonhuman_heir"], next: { id: "story_demon_final", delay: 5 } },
    right: { label: "Quietly. In writing.", fx: { gold: -5 }, set: ["nonhuman_heir"], next: { id: "story_demon_final", delay: 7 } },
  },
  {
    id: "story_shazza_heir", char: "orc_envoy", chainOnly: true,
    text: "Shazza laughs for a while. \"Human king wants an orc queen after him. My father will think you're mocking us.\" She stops laughing. \"I'll do it. Tell no one till you're dead. Orcs don't do this.\"",
    left: { label: "Done.", fx: { army: -5 }, set: ["nonhuman_heir"], next: { id: "story_demon_final", delay: 5 } },
    right: { label: "I need it public.", fx: { army: -20, people: -10 }, set: ["nonhuman_heir"], next: { id: "story_demon_final", delay: 4 } },
  },
  {
    id: "story_dog_heir", char: "dog", chainOnly: true,
    text: "You put the small crown on the dog. The dog does not object. The Chancellor objects. The Flamekeeper objects. The dog eats a slipper. The document is sealed.",
    left: { label: "Long live the King.", fx: { people: -15, faith: -15 }, set: ["nonhuman_heir", "dog_heir"], next: { id: "story_demon_final", delay: 4 } },
    right: { label: "Take it off him. Burn the paper.", fx: { faith: 5 }, next: { id: "story_demon_final", delay: 8 } },
  },
  {
    id: "story_demon_final", char: "demon", chainOnly: true,
    text: "The fire goes black one last time. \"Time. I've been fair. I've been patient. I've been, frankly, charming.\" He stands. The room is very cold. \"What have you got for me?\"",
    left: { label: "Read the bargain again.", fx: {}, next: { id: "story_demon_ending", delay: 0, else: "story_demon_ending_fail" } },
    right: { label: "Nothing. Take me.", fx: {}, set: ["bargain_kept"], die: "cursed" },
  },
  {
    id: "story_demon_heir_visit", char: "demon", chainOnly: true,
    text: "The fire goes black on your first night in the big bed. \"Condolences. Also, congratulations. Also, your father owed me and now you do. Nothing personal. It never is, that's what makes it work.\"",
    left: { label: "I know the terms.", fx: { faith: -5 }, next: { id: "story_demon_return", delay: 8 } },
    right: { label: "I don't recognise his debts.", fx: { faith: 5, people: -5 }, random: [
      { chance: 0.75, next: { id: "story_demon_check_2", delay: 6 } },
      { chance: 0.25, fx: { army: -15, gold: -15 }, next: { id: "story_demon_return", delay: 4 } },
    ] },
  },
  {
    id: "story_demon_ending", char: "demon", chainOnly: true,
    when: { flags: ["nonhuman_heir"] },
    text: "He reads it. He reads it again. He looks at your heir, who isn't human, and at the word 'kings', which doesn't say human either. Something behind his face goes very still. \"Oh,\" he says. \"Oh, good.\"",
    left: { label: "Get out.", fx: { faith: 20, people: 10 }, set: ["bargain_broken"], removeEffect: "doomed", next: { id: "story_demon_gone", delay: 0 } },
    right: { label: "We could renegotiate.", fx: { gold: 25, faith: -20 }, set: ["bargain_broken", "demon_partner"], removeEffect: "doomed", next: { id: "story_demon_gone", delay: 0 } },
  },
  {
    id: "story_demon_ending_fail", char: "demon", chainOnly: true,
    text: "He reads it. There is nothing in it to help you. He was, after all, the one who wrote it. \"Nice try,\" he says, and means it.",
    left: { label: "So be it.", fx: {}, set: ["bargain_kept"], die: "cursed" },
    right: { label: "Wait—", fx: {}, set: ["bargain_kept"], die: "cursed" },
  },
  {
    id: "story_demon_gone", char: "dog", chainOnly: true,
    text: "The hearth is a hearth. The fire is orange. The dog sniffs the ashes, sneezes, and lies down in front of it for the first time in your life. You are, for now, only a king.",
    left: { label: "Only a king.", fx: { people: 5 } },
    right: { label: "Good dog.", fx: { people: 5 } },
  },

  // ---------- the Deep (dungeon) ----------
  {
    id: "story_deep_1", char: "captain", chainOnly: true,
    text: "The flagstones come up. There is a stair. It goes down further than a stair should. Captain Rook says there's a smell like a cellar that's been thinking. He'd rather not go first.",
    left: { label: "I'll go first.", fx: { army: 5 }, next: { id: "story_deep_2", delay: 0 } },
    right: { label: "Seal it.", fx: { faith: 5, gold: -5 }, set: ["deep_sealed"] },
  },
  {
    id: "story_deep_2", char: "skeleton", chainOnly: true,
    text: "The first landing has a skeleton sitting against the wall. It's wearing a crown. Not yours. Older. It is, very slowly, turning its head.",
    left: { label: "Take the crown.", fx: { gold: 10 }, random: [
      { chance: 0.6, next: { id: "story_deep_3", delay: 0 } },
      { chance: 0.4, fx: { army: -10 }, next: { id: "story_deep_3", delay: 0 }, setReign: ["deep_hurt"] },
    ] },
    right: { label: "Leave it.", fx: { faith: 5 }, next: { id: "story_deep_3", delay: 0 } },
  },
  {
    id: "story_deep_3", char: "captain", chainOnly: true,
    text: "Below the landing the stair stops pretending to be a stair. Rook counts the torches. Six. \"That's six hours, Sire, or six wrong turns. Whichever comes first.\"",
    left: { label: "Down.", fx: {}, mode: { kind: "deep", goal: 6, exit: "story_deep_4" } },
    right: { label: "Back up. Seal it.", fx: { faith: 5, people: -5 }, set: ["deep_sealed"] },
  },
  {
    id: "story_deep_4", char: "mage", chainOnly: true,
    text: "At the bottom there's a room with a table, and at the table an old man in a hat, writing. \"Your grandfather sat where you're standing. He wanted the exit. It's behind you. It always was.\"",
    left: { label: "What's under the table?", fx: {}, next: { id: "story_deep_5", delay: 0 } },
    right: { label: "Take the exit.", fx: { army: -5 }, set: ["deep_visited"] },
  },
  {
    id: "story_deep_5", char: "mage", chainOnly: true,
    text: "\"The bargain. The original. Your grandfather's hand, his blood. I keep it because someone should. Read it if you like. It says 'kings'. Just that. He was in a hurry.\"",
    left: { label: "Read it.", fx: { faith: -5 }, set: ["read_bargain", "dungeon_cleared", "deep_visited"], next: { id: "story_mab_1", delay: 3 } },
    right: { label: "Burn it.", fx: {}, set: ["deep_visited"], random: [
      { chance: 0.5, fx: { faith: 10 }, set: ["bargain_burned", "dungeon_cleared"], next: { id: "story_demon_burned", delay: 1 } },
      { chance: 0.5, die: "explosion" },
    ] },
  },
  {
    id: "story_demon_burned", char: "demon", chainOnly: true,
    text: "\"You burned it.\" He doesn't sound angry. He sounds like a man whose favourite chair has been moved. \"I have copies, obviously. But that was the one with his handwriting.\"",
    left: { label: "Good.", fx: { faith: 5 }, next: { id: "story_demon_final", delay: 6 } },
    right: { label: "I'm sorry.", fx: { people: 5 }, next: { id: "story_demon_final", delay: 8 } },
  },

  // ---------- old age ----------
  {
    id: "story_old_age_warning", char: "healer", chainOnly: true,
    text: "Doctor Amaury has been looking at you a certain way for a month. \"Nothing is wrong, exactly. You are simply old. I would put your affairs in order and eat less pie.\"",
    left: { label: "Less pie.", fx: { people: -3 } },
    right: { label: "More pie.", fx: { people: 5, gold: -5 } },
  },
  {
    id: "story_old_age_ghost", char: "ghost",
    when: { effects: ["old_age"] }, oncePerReign: true,
    text: "A dead king stands at the foot of your bed. He looks like you. He looks bored. \"Not yet,\" he says. \"But bring a coat.\"",
    left: { label: "Which one are you?", fx: { faith: 3 } },
    right: { label: "Go away.", fx: {} },
  },
  {
    id: "story_elixir_offer", char: "alchemist",
    when: { effects: ["old_age"], notEffects: ["elixir"] }, once: true,
    text: "Master Quill has made something. It's green and it's moving a bit. \"It will not let you die of age. I'm fairly sure. I tested it on a chicken. The chicken is fine. If anything, too fine.\"",
    left: { label: "Drink it.", fx: { faith: -10 }, random: [
      { chance: 0.6, effect: "elixir", removeEffect: "old_age", set: ["drank_elixir"] },
      { chance: 0.4, die: "poison" },
    ] },
    right: { label: "Give it to the chicken.", fx: { people: 3 } },
  },

  // ---------- fallback ----------
  {
    id: "story_empty_hall", char: "steward", chainOnly: true,
    text: "Wendel checks the antechamber twice. Empty. Even the bench is empty. \"No petitions today, Majesty. It's... quite unsettling, honestly.\"",
    left: { label: "Enjoy it.", fx: { people: 2 } },
    right: { label: "Find someone.", fx: { gold: -2 } },
  },

  // ---------- Kethra & the succession ----------
  {
    id: "story_heir_born", char: "queen", when: { effects: ["married"], notEffects: ["heir"] }, oncePerReign: true, weight: 1.5,
    text: "\"It's a boy. He has your nose, which I'm told was the plan.\" The Queen is grey with exhaustion and looking at you like she's calculating something.",
    left: { label: "Name him after me.", fx: { people: 10, faith: 5 }, effect: "heir", set: ["has_prince"] },
    right: { label: "Name him after her father.", fx: { people: 5, army: 5, gold: 5 }, effect: "heir", set: ["has_prince"] },
  },
  {
    id: "story_abdicate", char: "hermit", when: { minReign: 20 }, once: true, weight: 0.4,
    text: "The Hermit walks in; the guards are used to him. \"You could just leave. None of you do. I've watched a dozen of you sit there till it killed you. There are goats in the hills. Goats need no king.\"",
    left: { label: "I'm a king.", fx: { army: 5 } },
    right: { label: "...Goats.", fx: {}, set: ["abdicated"], die: "peaceful" },
  },
];
