// The human court: the people who see the king every day and want something anyway.
export default [
  // ---------- the Chancellor ----------
  {
    id: "court_chancellor_tax_1", char: "chancellor", weight: 2,
    text: "The harvest was good, which means the farmers have money, which means they'll spend it on something stupid. Let's take a third before they do.",
    left: { label: "Take it.", fx: { gold: 20, people: -10 } },
    right: { label: "Let them be stupid.", fx: { people: 8 } },
  },
  {
    id: "court_chancellor_tax_2", char: "chancellor",
    text: "The salt tax brings in nothing. Everyone smuggles salt. I propose we tax the smugglers instead. They're the only people in the kingdom with money.",
    left: { label: "Tax the smugglers.", fx: { gold: 15, army: -5 } },
    right: { label: "Abolish the salt tax.", fx: { people: 10, gold: -10 } },
  },
  {
    id: "court_chancellor_festival", char: "chancellor",
    text: "The people want a festival. They always want a festival. I've costed it: three days of bread and wine, or one day of bread, wine and a hanging. The hanging is cheaper.",
    left: { label: "Three days.", fx: { gold: -10, people: 15 } },
    right: { label: "One day. With hanging.", fx: { gold: -5, people: 5, faith: 5 } },
  },
  {
    id: "court_chancellor_debt", char: "chancellor", once: true,
    text: "Your predecessor borrowed from the Deep Holds at interest. Dwarven interest. I've done the arithmetic twice and had a lie-down. We can pay, or we can pretend we can't read.",
    left: { label: "Pay.", fx: { gold: -20, army: 5 } },
    right: { label: "Pretend.", fx: { gold: 15 }, set: ["court_dwarf_debt_dodged"], next: { id: "court_chancellor_debt_2", delay: 4 } },
  },
  {
    id: "court_chancellor_debt_2", char: "chancellor", chainOnly: true,
    text: "The dwarves have sent a bill. Only a bill. It arrived on a cart, in eleven volumes, and the carter wants paying too. Volume one is the interest. Volume two is the interest on the carter.",
    left: { label: "Pay it.", fx: { gold: -20 } },
    right: { label: "Send the cart back.", fx: { army: 5 }, random: [
      { chance: 0.6, fx: { people: -10 } },
      { chance: 0.4, die: "dwarven_contract" },
    ] },
  },
  {
    id: "court_chancellor_survive", char: "chancellor",
    text: "I have served four kings, Majesty. The trick is not to be interesting. May I suggest you do nothing at all this year? It has worked before.",
    left: { label: "Nothing it is.", fx: { people: -5, gold: 10 } },
    right: { label: "I'm not that kind of king.", fx: { army: 10, people: -5 } },
  },
  {
    id: "court_chancellor_harrow", char: "chancellor",
    text: "Lord Harrow of the Marches has stopped sending his tax and started calling himself 'Protector'. It's only a word. So is 'traitor'.",
    left: { label: "Send the army.", fx: { army: 10, gold: -10, people: -5 } },
    right: { label: "Send a letter.", fx: { gold: -5 }, random: [
      { chance: 0.5, fx: { gold: 20 } },
      { chance: 0.5, fx: { people: -10, army: -10 } },
    ] },
  },

  // ---------- the Treasurer ----------
  {
    id: "court_treasurer_mint_1", char: "treasurer", when: { notEffects: ["mint"] },
    text: "Mistress Penn sets a coin on the table. Then a slightly smaller coin. 'Same face. Same king. Less silver. Who studies a king's face that closely? Bakers, possibly. We'll see.'",
    left: { label: "Do it.", fx: { gold: 15 }, effect: "mint", next: { id: "court_treasurer_mint_2", delay: 3 } },
    right: { label: "They look at mine.", fx: { faith: 5, gold: -5 } },
  },
  {
    id: "court_treasurer_mint_2", char: "treasurer", chainOnly: true,
    text: "The bakers have noticed the coins. Bakers notice everything. Bread is up a copper. The bakers say it's the coin. The coin says nothing.",
    left: { label: "Fix the price of bread.", fx: { people: 10, gold: -10 } },
    right: { label: "Blame the bakers.", fx: { people: -10, gold: 10, army: 5 } },
  },
  {
    id: "court_treasurer_geese", char: "treasurer",
    text: "A tax on geese. Hear me out. Everyone has a goose. No one has ever wept over a goose. A copper a goose and the treasury eats for a year.",
    left: { label: "Tax the geese.", fx: { gold: 20, people: -10 }, set: ["court_goose_tax"] },
    right: { label: "Leave the geese.", fx: { people: 5 } },
  },
  {
    id: "court_treasurer_war_chest", char: "treasurer", when: { effects: ["war"] },
    text: "The war costs eleven thousand crowns a season. I've written the number down so you can look at it whenever you feel brave.",
    left: { label: "A war levy.", fx: { gold: 20, people: -15 } },
    right: { label: "Cut the Marshal's pay.", fx: { gold: 15, army: -15 } },
  },
  {
    id: "court_treasurer_rich", char: "treasurer", when: { stats: { gold: [70, 100] } },
    text: "The vault is full. I want to be clear that this is a problem. Full vaults attract nephews, dragons and the Church, in roughly that order.",
    left: { label: "Roads.", fx: { gold: -20, people: 15 } },
    right: { label: "Soldiers.", fx: { gold: -20, army: 15 } },
  },
  {
    id: "court_treasurer_poor", char: "treasurer", when: { stats: { gold: [0, 30] } },
    text: "We have eleven crowns and a chair. I've sold the other chair. Either the Church lends, or the goblins lend. The Church wants your soul. The goblins want interest.",
    left: { label: "The Church.", fx: { gold: 25, faith: 10 } },
    right: { label: "The goblins.", fx: { gold: 25, people: -5 }, set: ["court_goblin_loan"], next: { id: "court_treasurer_goblin", delay: 3 } },
  },
  {
    id: "court_treasurer_goblin", char: "treasurer", chainOnly: true,
    text: "Nizzik's people have come for their interest. They'd take it in silver, or in the East Tower, or in the youngest of your cooks. They aren't fussy.",
    left: { label: "Silver.", fx: { gold: -20 } },
    right: { label: "The tower.", fx: { people: -10, army: -10, gold: 5 } },
  },

  // ---------- the General ----------
  {
    id: "court_general_war", char: "general", weight: 2, when: { notEffects: ["war"] },
    text: "The orcs have been quiet three years. That isn't peace, that's planning. Let me hit them first. Two thousand men, and I'll be back for the harvest.",
    left: { label: "Go.", fx: { army: 10, people: -5, gold: -10 }, effect: "war" },
    right: { label: "Sit down, Marshal.", fx: { army: -10, people: 5 } },
  },
  {
    id: "court_general_pay", char: "general",
    text: "The men haven't been paid since spring. They're fine about it. They've said so, in a letter, signed by all of them, which I found nailed to my door.",
    left: { label: "Pay them.", fx: { gold: -15, army: 10 } },
    right: { label: "Loyalty is its own reward.", fx: { army: -20, gold: 10 } },
  },
  {
    id: "court_general_parade", char: "general",
    text: "A parade. Through the city. Eight hundred men, drums, the good banners. The people love a parade. The men love being loved. I love being seen.",
    left: { label: "March.", fx: { army: 10, people: 10, gold: -5 } },
    right: { label: "No parades.", fx: { army: -5, gold: 5 } },
  },
  {
    id: "court_general_coup_1", char: "general", when: { stats: { army: [75, 100] } }, oncePerReign: true,
    text: "Marshal Thorne has brought his officers to the audience. Fourteen of them. None asked to come in. 'The men admire you, Sire. They'd admire you more from a distance.'",
    left: { label: "Arrest them all.", random: [
      { chance: 0.5, fx: { army: -25, people: 5 }, set: ["court_coup_crushed"] },
      { chance: 0.5, die: "hanged_by_army" },
    ] },
    right: { label: "What do you want?", fx: { army: -5 }, next: { id: "court_general_coup_2", delay: 0 } },
  },
  {
    id: "court_general_coup_2", char: "general", chainOnly: true,
    text: "'A council of war. Real power. Your seal on our orders, your face on the coins. You'd still be king. You just wouldn't need to come in on weekdays.'",
    left: { label: "Agree.", fx: { army: -20, people: -15, gold: -10 }, set: ["court_general_regent"], next: { id: "court_general_coup_3", delay: 3 } },
    right: { label: "Over my body.", fx: { army: -10 }, next: { id: "court_general_coup_duel", delay: 0 } },
  },
  {
    id: "court_general_coup_duel", char: "general", chainOnly: true,
    text: "'That can be arranged.' He draws. The officers don't. They're waiting to see. Captain Rook is at the door, and he's waiting too.",
    left: { label: "Fight him.", random: [
      { chance: 0.5, die: "duel" },
      { chance: 0.5, fx: { army: -30, people: 15 }, set: ["court_thorne_dead"] },
    ] },
    right: { label: "Rook. Now.", random: [
      { chance: 0.6, fx: { army: -20, faith: 5 }, set: ["court_thorne_dead"] },
      { chance: 0.4, die: "hanged_by_army" },
    ] },
  },
  {
    id: "court_general_coup_3", char: "general", chainOnly: true,
    text: "The Marshal's council has ruled three years. Taxes are up. So is the army. So is the number of people missing. He asks if you'd like to open a fair. He asks politely.",
    left: { label: "Open the fair.", fx: { people: -10, army: 10 } },
    right: { label: "Take back the seal.", random: [
      { chance: 0.5, fx: { army: -25, people: 10 }, unset: ["court_general_regent"] },
      { chance: 0.5, die: "dungeon" },
    ] },
  },

  // ---------- the Spymaster ----------
  {
    id: "court_spy_network_1", char: "spymaster", when: { notEffects: ["spy_network"] },
    text: "A voice from behind the curtain. 'Forty ears in forty kitchens, from here to the Scar. Twelve thousand crowns a year, and you'll never be surprised again. Surprise is what kills kings.'",
    left: { label: "Buy the ears.", fx: { gold: -15 }, effect: "spy_network", next: { id: "court_spy_network_2", delay: 2 } },
    right: { label: "I like surprises.", fx: { army: -5 } },
  },
  {
    id: "court_spy_network_2", char: "spymaster", chainOnly: true,
    text: "'First report. Your brother dined with the Kethran envoy. Your Treasurer keeps two ledgers. Your dog has a second family in the kennels. Which first?'",
    left: { label: "My brother.", fx: { army: 5 }, set: ["court_edmund_watched"], next: { id: "court_brother_plot_1", delay: 2 } },
    right: { label: "The Treasurer.", fx: { gold: 10, people: -5 } },
  },
  {
    id: "court_spy_report", char: "spymaster", when: { effects: ["spy_network"] }, weight: 2,
    text: "'The baker on Coin Street calls you the Goose King, on account of the tax. It's caught on. Someone has set it to music.'",
    left: { label: "Hang the baker.", fx: { people: -15, army: 5 } },
    right: { label: "Is it a good song?", fx: { people: 5 } },
  },
  {
    id: "court_spy_assassin", char: "spymaster", when: { effects: ["spy_network"] },
    text: "'There's a man in the city who was paid to kill you. I know who paid him. I don't know where he is. One of those is fixable tonight.'",
    left: { label: "The payer.", fx: { army: 5 }, random: [
      { chance: 0.6, fx: { gold: 10 } },
      { chance: 0.4, die: "assassin_blade" },
    ] },
    right: { label: "Find the man first.", fx: { gold: -5, army: 5 } },
  },
  {
    id: "court_spy_price", char: "spymaster",
    text: "'The Whisperer requests a raise. Not for himself. For the forty ears. Three have gone deaf. Permanently. Orcs.'",
    left: { label: "Raise it.", fx: { gold: -10, army: 5 } },
    right: { label: "Hire cheaper ears.", fx: { gold: 10 }, random: [
      { chance: 0.5, fx: { army: -10 } },
      { chance: 0.5, fx: { people: -10 } },
    ] },
  },
  {
    id: "court_spy_face", char: "spymaster", once: true, weight: 0.5,
    text: "The curtain moves. For the first time a hand comes through. A woman's hand, old, ink on the fingers. 'You may look. Once. Those who have looked have kept it to themselves. All of them.'",
    left: { label: "Look.", fx: { faith: -5 }, random: [
      { chance: 0.7, fx: { army: 5 }, set: ["court_saw_whisperer"] },
      { chance: 0.3, die: "poison" },
    ] },
    right: { label: "Don't.", fx: { faith: 5 } },
  },

  // ---------- the Steward ----------
  {
    id: "court_steward_feast", char: "steward",
    text: "Wendel has the figures for the midwinter feast. He's holding them with both hands. 'Forty swans. Or, and I only mention it, four swans and some very confident chickens.'",
    left: { label: "Forty swans.", fx: { gold: -10, people: 10 } },
    right: { label: "Confident chickens.", fx: { people: -5, gold: 5 } },
  },
  {
    id: "court_steward_roof", char: "steward",
    text: "'The great hall chimney has stopped drawing. The smoke comes out into the hall and goes, specifically, to you. I have moved the throne twice. The smoke has found it both times.'",
    left: { label: "Fix the chimney.", fx: { gold: -5, people: 5 } },
    right: { label: "Move the throne again.", fx: { faith: -5, people: -5 } },
  },
  {
    id: "court_steward_guests", char: "steward",
    text: "'The Kethran ambassador wants the east rooms. The orc envoy has the east rooms. She said she likes them. She said it while sharpening something.'",
    left: { label: "Move the ambassador.", fx: { army: 5 } },
    right: { label: "Move the orc.", fx: { army: -10, gold: 15 } },
  },
  {
    id: "court_steward_dog", char: "steward", when: { flags: ["dog_kept"] },
    text: "'The hound has eaten the Kethran treaty. The original. There is no copy. I've kept... what came out. In case.'",
    left: { label: "Blame Kethra.", fx: { army: 5, gold: -5 } },
    right: { label: "Confess.", fx: { people: 5, army: -5 } },
  },

  // ---------- the Jester ----------
  {
    id: "court_jester_everyday", char: "jester", weight: 2,
    text: "'Heard a good one. What's the difference between a king and a scarecrow?' Pib pauses too long. 'I'll get back to you on that.'",
    left: { label: "Do.", fx: { people: 3 } },
    right: { label: "Stocks. A week.", fx: { people: -10, army: 5 } },
  },
  {
    id: "court_jester_1", char: "jester",
    text: "Pib does a handstand, falls over, and stays down. 'That one's called The King.' The hall is silent. 'That's also The King.'",
    left: { label: "Get up.", fx: { people: 3, army: -3 } },
    right: { label: "Sit with me a while.", fx: { people: 3 }, set: ["court_pib_close"], next: { id: "court_jester_2", delay: 2 } },
  },
  {
    id: "court_jester_2", char: "jester", chainOnly: true,
    text: "'Riddle. What has a hundred servants, a thousand soldiers, and eats dinner alone?' Pib waits. 'No, go on. It's a hard one.'",
    left: { label: "A king.", fx: { faith: -3 }, next: { id: "court_jester_3", delay: 3 } },
    right: { label: "Not funny.", fx: { people: -5, army: 3 } },
  },
  {
    id: "court_jester_3", char: "jester", chainOnly: true,
    text: "Pib brings a second chair into the throne room and sits in it. Says nothing. Juggles nothing. After an hour the guards stop looking at him.",
    left: { label: "Leave the chair.", fx: { people: 5 }, set: ["court_second_chair"], next: { id: "court_jester_4", delay: 4 } },
    right: { label: "Take it away.", fx: { people: -5 } },
  },
  {
    id: "court_jester_4", char: "jester", chainOnly: true,
    text: "'Council wants the chair gone, King. Says it looks like a second throne. I said it's for a fool. They said that's what worried them.'",
    left: { label: "The chair stays.", fx: { army: -10, faith: -5, people: 10 } },
    right: { label: "They're right.", fx: { people: -10 }, unset: ["court_second_chair"], next: { id: "court_jester_5", delay: 2 } },
  },
  {
    id: "court_jester_5", char: "jester", chainOnly: true,
    text: "Pib has been sacked, by the council, for you. He's at the gate with a sack. 'Told them the joke about the crown. The one with no punchline. They didn't get it either.'",
    left: { label: "Bring him back in.", fx: { army: -10, people: 5, faith: -5 }, set: ["court_pib_returned"] },
    right: { label: "Let him go.", fx: { people: -5 } },
  },

  // ---------- the Healer ----------
  {
    id: "court_healer_leech", char: "healer", weight: 2,
    text: "Doctor Amaury has a jar. In the jar, a leech the size of a shoe. 'Elvish. Very expensive. It only takes the bad blood. It knows.'",
    left: { label: "Apply it.", fx: { gold: -5 }, random: [
      { chance: 0.8, fx: { faith: -3 } },
      { chance: 0.2, die: "poison" },
    ] },
    right: { label: "Burn it.", fx: { faith: 5 } },
  },
  {
    id: "court_healer_theory", char: "healer",
    text: "'I've a theory about the sweating sickness in the Tannery. It's the smell. Close the tannery, the smell goes, the sickness goes. So do the tanners. To somewhere else.'",
    left: { label: "Close the tannery.", fx: { people: -15, gold: -5 } },
    right: { label: "Keep it open.", random: [
      { chance: 0.5, fx: { people: -10 } },
      { chance: 0.5, fx: { people: 5 } },
    ] },
  },
  {
    id: "court_healer_plague", char: "healer", when: { effects: ["plague"] },
    text: "Amaury has a mask with a beak. 'It doesn't help. But when I wear it they stop asking me what helps.' The dead-cart is outside, waiting for him.",
    left: { label: "Burn the low town.", fx: { people: -20, faith: 10 }, removeEffect: "plague" },
    right: { label: "Pray.", fx: { faith: 5, people: -5 } },
  },
  {
    id: "court_healer_king", char: "healer",
    text: "'You've a cough. Kings have coughs the way peasants have fleas, but yours has a sound I don't like. Bed rest, a month, no audiences.'",
    left: { label: "A month.", fx: { army: -10, people: -5 } },
    right: { label: "Kings don't cough.", random: [
      { chance: 0.7, fx: { army: 5 } },
      { chance: 0.3, die: "plague" },
    ] },
  },

  // ---------- the poison ----------
  {
    id: "court_poison_1", char: "steward", once: true,
    text: "Wendel is grey. 'The taster died, Majesty. At dinner. In the soup. Well — near the soup. The soup is under guard. The cook is under the cook.'",
    left: { label: "Question the cook.", fx: { army: 3 }, next: { id: "court_poison_2", delay: 0 } },
    right: { label: "Hang the cook.", fx: { people: -5, faith: 3 }, set: ["court_poison_cook_dead"], next: { id: "court_poison_3", delay: 2 } },
  },
  {
    id: "court_poison_2", char: "captain", chainOnly: true,
    text: "The cook, upside down, says the soup came from the buttery. The buttery says the wine cellar. The wine cellar belongs to your brother. It has for years.",
    left: { label: "Search Edmund's cellar.", fx: { army: 5 }, set: ["court_edmund_suspected"], next: { id: "court_brother_plot_1", delay: 1 } },
    right: { label: "Cooks lie upside down.", fx: { people: 5 }, next: { id: "court_poison_3", delay: 3 } },
  },
  {
    id: "court_poison_3", char: "healer", chainOnly: true,
    text: "Amaury has found it. Wolfsbane, in the salt. Everyone's salt. 'The good news is you'd have noticed by now if it had worked. The bad news is who else would have.'",
    left: { label: "New salt. New staff.", fx: { gold: -10, people: -5, army: 5 } },
    right: { label: "I'll taste everything myself.", random: [
      { chance: 0.5, fx: { people: 10, faith: 5 } },
      { chance: 0.5, die: "poison" },
    ] },
  },

  // ---------- the Captain ----------
  {
    id: "court_captain_gate", char: "captain",
    text: "Captain Rook wants the city gates shut at dusk. 'Thieves, wolves, elves, and the odd dead man. All of them prefer the dark. So do I, but I'm paid to.'",
    left: { label: "Shut them.", fx: { army: 5, people: -10, gold: 8 } },
    right: { label: "The city stays open.", fx: { people: 10 }, random: [
      { chance: 0.7, fx: { people: 5 } },
      { chance: 0.3, fx: { army: -10 } },
    ] },
  },
  {
    id: "court_captain_guard_pay", char: "captain",
    text: "'Six of my men have taken second jobs. Two as guards. For your brother.'",
    left: { label: "Double their pay.", fx: { gold: -10, army: 10 } },
    right: { label: "Sack the six.", fx: { army: -10 }, set: ["court_edmund_guards"] },
  },
  {
    id: "court_captain_riot", char: "captain", when: { stats: { people: [0, 30] } },
    text: "'There's a crowd at the bread gate. Four hundred, maybe. They've a list. I've read it. Your name is on it, but so is the price of flour, so it's not personal.'",
    left: { label: "Open the stores.", fx: { gold: -10, people: 15 } },
    right: { label: "Disperse them.", fx: { army: 10 }, random: [
      { chance: 0.6, fx: { people: -15 } },
      { chance: 0.4, die: "torn_by_mob" },
    ] },
  },
  {
    id: "court_captain_assassin", char: "captain", when: { effects: ["wanted"] },
    text: "Rook has a man face-down in the courtyard. 'Found him on the roof over your window. With a bow. Says he's a roofer. He may be a roofer. Roofers don't usually bring bows.'",
    left: { label: "Hang the roofer.", fx: { army: 5, faith: 3, people: -5 } },
    right: { label: "Question him.", fx: { people: 3 }, random: [
      { chance: 0.5, fx: { army: 5 }, removeEffect: "wanted" },
      { chance: 0.5, die: "assassin_blade" },
    ] },
  },

  // ---------- the Executioner ----------
  {
    id: "court_exec_axe", char: "executioner",
    text: "The executioner wants a new axe. He shows you the old one. 'Third head last week took four. Four's unkind. Two's professional. One is showing off, but I'd like the option.'",
    left: { label: "Buy the axe.", fx: { gold: -5, people: 8, faith: 3 } },
    right: { label: "Use a rope.", fx: { gold: 8, people: -5 } },
  },
  {
    id: "court_exec_heretic", char: "executioner",
    text: "The Flamekeeper has sent a heretic for burning. 'He argues well, Sire. Too well for a man about to be on fire. I'd hang him instead. Quicker. Quieter.'",
    left: { label: "Burn him.", fx: { faith: 15, people: -10 } },
    right: { label: "Hang him.", fx: { faith: -10, people: 5 } },
  },
  {
    id: "court_exec_pardon", char: "executioner",
    text: "'The girl for hanging tomorrow stole a sheep. The sheep's been returned. It's a good sheep. That's a lot of rope for one sheep.'",
    left: { label: "Pardon her.", fx: { people: 10, faith: -5 } },
    right: { label: "Law is law.", fx: { people: -10, faith: 5, army: 3 } },
  },
  {
    id: "court_exec_crowd", char: "executioner",
    text: "'Hangings draw a crowd. Crowds draw pickpockets. Pickpockets draw hangings. I've counted. At this rate we're self-sustaining.'",
    left: { label: "Hang them faster.", fx: { people: -10, faith: 5, gold: 10 } },
    right: { label: "Stop hanging pickpockets.", fx: { people: 10, gold: -10 } },
  },

  // ---------- the Judge ----------
  {
    id: "court_judge_noble", char: "judge",
    text: "Justiciar Maud has a lord in irons. 'Lord Ashby hanged three tenants for poaching. On his own oak. It's technically his oak, they were technically poaching, and I technically want his head.'",
    left: { label: "Take his head.", fx: { people: 15, army: -10, gold: 10 } },
    right: { label: "Fine him.", fx: { gold: 20, people: -10 } },
  },
  {
    id: "court_judge_elf", char: "judge",
    text: "'An elf killed a man in the market. Claims self-defence. The man had a knife. The man was also asleep. The elf says elves think ahead.'",
    left: { label: "Hang the elf.", fx: { people: 10, army: -10 } },
    right: { label: "Fine and release.", fx: { people: -15, gold: 15 } },
  },
  {
    id: "court_judge_law", char: "judge",
    text: "'Your grandfather made it law that a man may beat his wife on Tuesdays. I'd like it to be no days. The Church prefers Tuesdays. It's traditional.'",
    left: { label: "No days.", fx: { people: 10, faith: -10 } },
    right: { label: "Keep Tuesday.", fx: { faith: 5, people: -5 } },
  },

  // ---------- the Architect ----------
  {
    id: "court_arch_granary_1", char: "architect", when: { notEffects: ["granary"] },
    text: "Master Fennick has drawings. 'A granary. Stone, dry, rat-proof. Feeds the city two winters if the harvest fails. Costs the same as a small war. Lasts longer.'",
    left: { label: "Build it.", fx: { gold: -15, people: 5 }, set: ["court_granary_started"], next: { id: "court_arch_granary_2", delay: 2 } },
    right: { label: "Wars are more fun.", fx: { army: 5, people: -5 } },
  },
  {
    id: "court_arch_granary_2", char: "architect", chainOnly: true,
    text: "'Halfway. The foundations struck a cellar. Old. There are jars in it, sealed, and they're humming. My preference is to keep building over them. Quickly.'",
    left: { label: "Build over them.", fx: { gold: -10 }, next: { id: "court_arch_granary_3", delay: 2 } },
    right: { label: "Open a jar.", fx: { faith: -10 }, random: [
      { chance: 0.6, fx: { gold: 15 }, next: { id: "court_arch_granary_3", delay: 2 } },
      { chance: 0.4, die: "cursed" },
    ] },
  },
  {
    id: "court_arch_granary_3", char: "architect", chainOnly: true,
    text: "'Finished. Rat-proof, damp-proof, and I've had a priest bless the cellar, which he did from outside. The first grain goes in tomorrow. My fee should go in before it.'",
    left: { label: "Pay him.", fx: { gold: -10, people: 10 }, effect: "granary" },
    right: { label: "Half now.", fx: { gold: -5, people: 5, army: -3 }, effect: "granary" },
  },
  {
    id: "court_arch_walls_1", char: "architect", when: { notEffects: ["high_walls"] },
    text: "'The city wall is old. There's a stretch by the tannery that's mostly ivy. The orcs know about the ivy. I've seen them look at it.'",
    left: { label: "New walls. All of it.", fx: { gold: -20, army: 5 }, next: { id: "court_arch_walls_2", delay: 3 } },
    right: { label: "Plant more ivy.", fx: { gold: 10, army: -10 } },
  },
  {
    id: "court_arch_walls_2", char: "architect", chainOnly: true,
    text: "'Forty feet, and I want sixty. Sixty means dwarves. Dwarves mean a contract. Contracts mean the Thane. I could stop at forty, but orcs are tall.'",
    left: { label: "Sixty. Get the dwarves.", fx: { gold: -15 }, next: { id: "court_arch_walls_3", delay: 2 } },
    right: { label: "Forty is enough.", fx: { army: 5, gold: -5 }, effect: "high_walls" },
  },
  {
    id: "court_arch_walls_3", char: "architect", chainOnly: true,
    text: "Done. Sixty feet, dwarf-cut, and one clause: the Deep Holds keep a door in the foundations. 'For maintenance,' says Fennick, the way you'd say 'for plague'.",
    left: { label: "Accept the door.", fx: { army: 10, gold: -5 }, set: ["court_dwarf_door"], effect: "high_walls" },
    right: { label: "Brick it up.", fx: { army: 5 }, effect: "high_walls", random: [
      { chance: 0.6, fx: { gold: -10 } },
      { chance: 0.4, fx: { gold: -20, army: -10 } },
    ] },
  },
  {
    id: "court_arch_tower", char: "architect",
    text: "'A tower. Tall. No purpose. Kings have always wanted one and I've never understood why, but it would keep four hundred masons fed and out of taverns.'",
    left: { label: "Build the tower.", fx: { gold: -15, people: 10 }, next: { id: "court_arch_tower_2", delay: 5 } },
    right: { label: "Feed them some other way.", fx: { gold: 5, people: -5 } },
  },
  {
    id: "court_arch_tower_2", char: "architect", chainOnly: true,
    text: "The tower is finished. From the top you can see the Greenreach, the Scar, and the Church's new temple, which is taller. Fennick suggests a second floor.",
    left: { label: "A second floor.", fx: { gold: -10, faith: -5, people: 5 } },
    right: { label: "Go up and look.", random: [
      { chance: 0.85, fx: { people: 5 } },
      { chance: 0.15, die: "fell_from_tower" },
    ] },
  },

  // ---------- the brother ----------
  {
    id: "court_brother_1", char: "brother", weight: 2, when: { notFlags: ["court_edmund_dead", "court_edmund_exiled", "court_edmund_jailed"] },
    text: "Duke Edmund wants a seat on the council. 'I'm your brother. I'm also the only man in this palace who'd tell you your beard looks stupid. It does. Seat me.'",
    left: { label: "Seat him.", fx: { army: 5 }, set: ["court_edmund_council"], next: { id: "court_brother_plot_1", delay: 4 } },
    right: { label: "Grow your own beard.", fx: { people: 3, army: -3 }, set: ["court_edmund_snubbed"], next: { id: "court_brother_plot_1", delay: 6 } },
  },
  {
    id: "court_brother_plot_1", char: "mother", chainOnly: true,
    text: "Edmund has been hunting with the Marshal. Dining with the Kethran envoy. Praying with the Flamekeeper. He hates hunting, dinner and prayer. Mother says it's a phase.",
    left: { label: "Exile him.", fx: { army: -10, people: -10 }, set: ["court_edmund_exiled"], next: { id: "court_brother_exile", delay: 5 } },
    right: { label: "Watch him.", fx: { army: 3 }, next: { id: "court_brother_plot_2", delay: 3 } },
  },
  {
    id: "court_brother_plot_2", char: "brother", chainOnly: true,
    text: "'You've had me followed. By a man in a hat. I bought him a drink and he told me everything, which was nothing. You've nothing on me, brother. I've a great deal on you.'",
    left: { label: "Then say it.", fx: { faith: -5 }, next: { id: "court_brother_plot_3", delay: 0 } },
    right: { label: "Arrest him.", fx: { army: -15, people: -5 }, set: ["court_edmund_jailed"], next: { id: "court_brother_jail", delay: 4 } },
  },
  {
    id: "court_brother_plot_3", char: "brother", chainOnly: true,
    text: "Edmund lists them. The tax. The hangings. The dwarf debt. 'The lords would have you gone by autumn if I said the word. I'm not saying it. I'm asking to be paid not to.'",
    left: { label: "Pay him.", fx: { gold: -20 }, set: ["court_edmund_paid"] },
    right: { label: "Say it, then.", random: [
      { chance: 0.5, fx: { army: -20, people: -10 }, set: ["court_edmund_rebels"], next: { id: "court_brother_war", delay: 1 } },
      { chance: 0.5, die: "assassin_blade" },
    ] },
  },
  {
    id: "court_brother_war", char: "general", chainOnly: true,
    text: "The Marches have risen for Edmund. Half the lords. The Marshal is asking, carefully, which brother he's fighting for. He'd like to know before the battle rather than during.",
    left: { label: "Me. Now.", fx: { army: 10, gold: -15 }, random: [
      { chance: 0.6, fx: { people: 10 }, set: ["court_edmund_dead"] },
      { chance: 0.4, die: "duel" },
    ] },
    right: { label: "Give Edmund the Marches.", fx: { army: -15, gold: -10, people: -5 }, set: ["court_edmund_duke_marches"] },
  },
  {
    id: "court_brother_exile", char: "messenger", chainOnly: true,
    text: "A letter from Kethra. Edmund is at the Emperor's court. He's been given a palace, a wife and a title. The title is 'King of Vael in Exile'. The Emperor thought it was funny.",
    left: { label: "War on Kethra.", fx: { army: 10, gold: -10, people: -10 }, effect: "war" },
    right: { label: "Let them laugh.", fx: { army: -10, faith: -5 } },
  },
  {
    id: "court_brother_jail", char: "mother", chainOnly: true,
    text: "The Dowager comes at night. 'Your brother has been in that cell four years. He's stopped eating. Kill him or let him out. I won't say which. I'm not burying two of you.'",
    left: { label: "Let him out.", fx: { people: 5 }, set: ["court_edmund_freed"], unset: ["court_edmund_jailed"], next: { id: "court_brother_plot_3", delay: 3 } },
    right: { label: "Do it quietly.", fx: { faith: -15, people: -5, army: 5 }, set: ["court_edmund_dead"], random: [
      { chance: 0.8, fx: { faith: -15, people: -5, army: 5 } },
      { chance: 0.2, die: "cursed" },
    ] },
  },
  {
    id: "court_brother_wine", char: "brother", when: { notFlags: ["court_edmund_dead", "court_edmund_exiled", "court_edmund_jailed"] },
    text: "Edmund has bought the vineyard at Carrow. He's calling the wine 'Younger Son'. It's very good. He's sending you a barrel a year. Free.",
    left: { label: "Drink it.", random: [
      { chance: 0.9, fx: { people: 3 } },
      { chance: 0.1, die: "poison" },
    ] },
    right: { label: "Give it to the guards.", fx: { army: 5, people: -3 } },
  },

  // ---------- the Dowager ----------
  {
    id: "court_mother_ring", char: "mother", when: { notFlags: ["court_mother_dead"] },
    text: "The Dowager has your father's ring. She's never given it to you. 'You'll have it when you've done one thing he'd have been proud of. He set the bar low. You've still not cleared it.'",
    left: { label: "Keep the ring.", fx: { faith: 3, people: -3 } },
    right: { label: "I've done plenty.", fx: { army: 5, faith: -5 } },
  },
  {
    id: "court_mother_nag", char: "mother", weight: 2, when: { notEffects: ["married"], notFlags: ["court_mother_dead"] },
    text: "'You're not married. Your father married at nineteen. He was also dead at forty, but he had heirs, and heirs are the point. Pick a house. Any house. Not the elves.'",
    left: { label: "I'll think about it.", fx: { people: -5 } },
    right: { label: "Not the elves?", fx: { faith: -5 }, next: { id: "court_queen_prop_elf", delay: 2 } },
  },
  {
    id: "court_mother_church", char: "mother", when: { notFlags: ["court_mother_dead"] },
    text: "Your mother prays at the Flame every dawn with the Flamekeeper. For your soul, she says. She's back before you're awake, and she knows what you said at council.",
    left: { label: "Stop her going.", fx: { faith: -10, people: -5 } },
    right: { label: "Let her pray.", fx: { faith: 10, gold: -5 } },
  },
  {
    id: "court_mother_advice", char: "mother", when: { notFlags: ["court_mother_dead"] },
    text: "'Your grandfather kept his council to three men. He had each told the other two were spies. They watched each other thirty years and he slept beautifully.'",
    left: { label: "Try it.", fx: { army: 5, gold: 10, people: -5 } },
    right: { label: "I trust my council.", fx: { faith: 3 }, random: [
      { chance: 0.6, fx: { gold: -15 } },
      { chance: 0.4, fx: { people: 5 } },
    ] },
  },
  {
    id: "court_mother_dies", char: "mother", once: true, weight: 0.5, when: { minReign: 12, notFlags: ["court_mother_dead"] },
    text: "The Dowager is dying and annoyed about it. 'Keep Edmund from the funeral. Keep the Church from the money. Don't cry. Kings don't. Your father did, once. I never let him forget it.'",
    left: { label: "Cry.", fx: { people: 10, army: -5, faith: 5 }, set: ["court_mother_dead"] },
    right: { label: "Kings don't.", fx: { army: 5, people: -5 }, set: ["court_mother_dead"] },
  },

  // ---------- marriage ----------
  {
    id: "court_queen_prop_kethra", char: "foreign_envoy", once: true, when: { notEffects: ["married"] },
    text: "The Emperor of Kethra offers his daughter. She's twenty, reads four languages, and has been told you're taller than you are. The dowry would pay the army for a decade.",
    left: { label: "Marry her.", fx: { gold: 25, army: 5, people: -5 }, effect: "married", set: ["court_queen_kethran"] },
    right: { label: "Decline.", fx: { army: -5 } },
  },
  {
    id: "court_queen_prop_elf", char: "elf_envoy", once: true, when: { notEffects: ["married"] },
    text: "Lord Cael presents a portrait. A Sylvan lady of a minor house, three hundred years old. 'She has agreed to outlive you. It is, for us, a considerable sacrifice.'",
    left: { label: "Marry her.", fx: { faith: -15, people: -5, army: -5 }, effect: "married", set: ["court_queen_elf"] },
    right: { label: "Decline.", fx: { faith: 5 } },
  },
  {
    id: "court_queen_prop_marches", char: "knight", once: true, when: { notEffects: ["married"] },
    text: "Lord Harrow of the Marches offers his daughter and, with her, the Marches back under the crown. She's plain, his letter says, before you can. 'But she rides, she counts, and she hates me.'",
    left: { label: "Marry her.", fx: { army: 10, people: 5, gold: -5 }, effect: "married", set: ["court_queen_marches"] },
    right: { label: "Decline.", fx: { army: -5, people: -5 } },
  },
  {
    id: "court_queen_prop_guild", char: "merchant", once: true, when: { notEffects: ["married"] },
    text: "Guildmaster Crane offers his daughter, the Guild's blessing, and the Guild's debts forgiven. 'She's run the counting-house since she was twelve. You'd be marrying the counting-house. It's a good one.'",
    left: { label: "Marry her.", fx: { gold: 30, faith: -5, army: -10 }, effect: "married", set: ["court_queen_guild"] },
    right: { label: "Decline.", fx: { army: -3 } },
  },

  // ---------- the Queen ----------
  {
    id: "court_queen_minutes", char: "queen", weight: 2, when: { effects: ["married"] },
    text: "'I've read your council minutes. All of them. You say 'we'll see' eleven times a session. I counted. Say yes or no to me, at least. Are you going to war this year?'",
    left: { label: "Yes.", fx: { army: 10, people: -5 } },
    right: { label: "No.", fx: { army: -10, people: 5 } },
  },
  {
    id: "court_queen_pillar", char: "queen", when: { effects: ["married"], notFlags: ["court_mother_dead"] },
    text: "'Your mother has moved my chair. Again. It's behind a pillar now. I can see the pillar very well. Either she goes to a nunnery or I go to the pillar permanently.'",
    left: { label: "Mother goes.", fx: { faith: 5, people: -5 }, set: ["court_mother_dead"] },
    right: { label: "The pillar's nice.", fx: { people: -10, faith: 3 } },
  },
  {
    id: "court_queen_witch", char: "queen", once: true, when: { effects: ["married"], notFlags: ["court_has_princess"] },
    text: "'I'd like a daughter. You'd like a son. The healer says we can't choose. The witch says we can, for a price. I've already paid the witch.'",
    left: { label: "Unpay her.", fx: { faith: 5, gold: -5 } },
    right: { label: "What price?", fx: { faith: -10 }, next: { id: "court_queen_daughter", delay: 2 } },
  },
  {
    id: "court_queen_daughter", char: "queen", chainOnly: true,
    text: "'It's a girl. The witch kept her word. She said the price would come later, and that it wasn't ours to pay. I've decided not to think about that.'",
    left: { label: "Name her for my mother.", fx: { people: 5, faith: 5 }, set: ["court_has_princess"] },
    right: { label: "Name her for the witch.", fx: { faith: -15, people: 5 }, set: ["court_has_princess", "court_witch_named"] },
  },
  {
    id: "court_queen_affair", char: "queen", when: { effects: ["married"] },
    text: "'The Whisperer has told you I'm sleeping with Sir Gavriel. I'm not. Gavriel is the only man at court who hasn't tried. What does it cost to replace the Whisperer?'",
    left: { label: "I believe you.", fx: { people: 5, army: 5, gold: -5 } },
    right: { label: "Gavriel goes to the border.", fx: { army: -10, faith: 5 } },
  },
  {
    id: "court_queen_love", char: "queen", once: true, when: { effects: ["married"], notEffects: ["love"] },
    text: "The Queen falls asleep at council, on your shoulder. The Chancellor pretends not to see. You notice you've stopped counting the years until she's useful.",
    left: { label: "Let her sleep.", fx: { people: 5, army: -5 }, effect: "love" },
    right: { label: "Wake her.", fx: { faith: 3, people: -5 } },
  },
  {
    id: "court_queen_death", char: "healer", once: true, weight: 0.5, when: { effects: ["married"], minReign: 8 },
    text: "Amaury has tried the leech, the smoke and a prayer he isn't sure was a prayer. The Queen is asking for you. She's asking politely, which is how you know.",
    left: { label: "Go to her.", removeEffect: "married", random: [
      { chance: 0.8, fx: { people: 5, faith: 5 } },
      { chance: 0.2, die: "broken_heart" },
    ] },
    right: { label: "Finish the council.", fx: { people: -15, faith: -5 }, removeEffect: "married" },
  },

  // ---------- the Prince ----------
  {
    id: "court_prince_sword", char: "prince", when: { flags: ["has_prince"] },
    text: "Your son has hit the Chancellor with a wooden sword. The Chancellor says it didn't hurt. The dent says otherwise. 'He'll make a fine king,' he says, through his teeth.",
    left: { label: "Take the sword.", fx: { people: -3, army: -5 } },
    right: { label: "Give him a real one.", fx: { army: 10, gold: -5 }, set: ["court_prince_martial"] },
  },
  {
    id: "court_prince_command", char: "prince", when: { flags: ["has_prince"], minReign: 10 },
    text: "The prince is sixteen and wants a command. The Marshal says yes. The Marshal always says yes to sixteen-year-olds with swords. It's how he got most of his army.",
    left: { label: "A company.", fx: { army: 10 }, random: [
      { chance: 0.7, fx: { people: 5 } },
      { chance: 0.3, fx: { people: -15, army: -10 }, set: ["court_prince_dead"] },
    ] },
    right: { label: "He stays home.", fx: { army: -10, people: 5 } },
  },
  {
    id: "court_prince_die", char: "prince", when: { flags: ["has_prince"], notFlags: ["court_prince_dead"], minReign: 15 },
    text: "Your son asks, in front of the whole court, when you plan to die. He asks kindly. It's for planning purposes. The court waits.",
    left: { label: "Not soon.", fx: { army: 5, people: -5 } },
    right: { label: "Name him regent.", fx: { army: -5, people: 10, gold: -5 }, set: ["court_prince_regent"], next: { id: "court_prince_regent", delay: 4 } },
  },
  {
    id: "court_prince_regent", char: "prince", chainOnly: true,
    text: "The regent has lowered taxes, raised the army, and been seen with your brother. The people love him. They never loved you. Wendel keeps calling him 'Majesty' and correcting himself.",
    left: { label: "Take it back.", fx: { people: -20, army: -10 }, unset: ["court_prince_regent"] },
    right: { label: "Let him have it.", random: [
      { chance: 0.6, set: ["abdicated"], die: "peaceful" },
      { chance: 0.4, die: "dungeon" },
    ] },
  },

  // ---------- the Princess ----------
  {
    id: "court_princess_mage", char: "princess", when: { flags: ["court_has_princess"], notFlags: ["court_princess_mage"] },
    text: "Your daughter has asked the Archmage to teach her. The Archmage said yes. The Flamekeeper said something in Old Vaelic that Wendel refuses to translate.",
    left: { label: "Let her learn.", fx: { faith: -15, people: 5 }, set: ["court_princess_mage"] },
    right: { label: "No magic.", fx: { faith: 10, people: -5 } },
  },
  {
    id: "court_princess_suitor", char: "princess", when: { flags: ["court_has_princess"], minReign: 10 },
    text: "'Lord Cael has asked for my hand. Not for himself. For his lord's grandson. He's four hundred. Cael showed me a portrait. I'd rather marry the portrait.'",
    left: { label: "You'll marry the grandson.", fx: { army: 10, faith: -10, people: -5 }, set: ["court_princess_elf_wed"] },
    right: { label: "Marry whom you like.", fx: { people: 10, army: -10 } },
  },
  {
    id: "court_princess_treasury", char: "princess", when: { flags: ["court_has_princess"], minReign: 12 },
    text: "The princess has run the treasury for a year. Mistress Penn allowed it because the order to stop never came. Revenue is up a fifth. Penn wants to know if she's sacked.",
    left: { label: "Penn stays. She rules it.", fx: { gold: 20, faith: -5 }, set: ["court_princess_treasury"] },
    right: { label: "Back to embroidery.", fx: { gold: -10, people: -5 } },
  },
  {
    id: "court_princess_fire", char: "princess", when: { flags: ["court_princess_mage"] },
    text: "Your daughter set fire to the east wing. Controlled, she says. The Archmage says it was a very good fire. The Flamekeeper says this is what he warned about, in Old Vaelic.",
    left: { label: "Rebuild. Quietly.", fx: { gold: -10, faith: -5 } },
    right: { label: "Send her to the Tower.", fx: { faith: 10, people: -10, army: -5 } },
  },
];
