// The capital: law, money, intrigue. Coin Row, Tanner Lane, Saltgate, the Elf Steps,
// and the Drowned Rat. Prefix: city_
export default [
  // ---------- Justiciar Maud ----------
  {
    id: "city_judge_bread", char: "judge", weight: 2,
    text: "A washerwoman on Tanner Lane stole three loaves. For her lodger, a dwarf, who was starving rather than eat what he hadn't paid for. The baker wants her hand. The dwarf has offered his.",
    left: { label: "Take the dwarf's.", fx: { people: -10, gold: 5 }, set: ["city_dwarf_maimed"] },
    right: { label: "Nobody's hand. Pay the baker.", fx: { people: 10, gold: -3, faith: -3 } },
  },
  {
    id: "city_judge_horse_1", char: "judge",
    text: "Lord Verrin's son rode a fishwife down on Coin Row. Drunk, noon, sixty witnesses. Verrin says the boy will pay the family. The family says the boy can pay them from a rope.",
    left: { label: "Hang him.", fx: { people: 15, army: -10, gold: -5 } },
    right: { label: "Let him pay.", fx: { gold: 20, people: -15 }, next: { id: "city_judge_horse_2", delay: 1 } },
  },
  {
    id: "city_judge_horse_2", char: "judge", chainOnly: true,
    text: "The fishwife's sons found the Verrin boy at the Drowned Rat and hanged him from the sign. It's a sturdy sign. Now I've three murderers in irons and Coin Row is standing outside, waiting.",
    left: { label: "Hang them too.", fx: { army: 5 }, random: [
      { chance: 0.7, fx: { people: -20 } },
      { chance: 0.3, fx: { people: -10 }, die: "torn_by_mob" },
    ] },
    right: { label: "Pardon them.", fx: { people: 15, army: -15, faith: -5 } },
  },
  {
    id: "city_judge_elf_horse", char: "judge",
    text: "A carter says an elf stole his horse. No witnesses. The elf says he has owned horses for longer than the carter's family has owned a name, and would not start with that one.",
    left: { label: "The carter's word is enough.", fx: { people: 10, army: -5 }, set: ["city_elf_wronged"] },
    right: { label: "No witnesses, no theft.", fx: { people: -10, gold: 5 } },
  },
  {
    id: "city_judge_tavern", char: "judge", weight: 2,
    text: "A cooper in the Drowned Rat said the King has the chin of a turnip. He'd brought the turnip. He held it up for comparison. Bess says the room agreed.",
    left: { label: "Cut out his tongue.", fx: { people: -15, army: 5 } },
    right: { label: "Buy him a drink.", fx: { people: 10, army: -5 } },
  },
  {
    id: "city_judge_combat_1", char: "judge",
    text: "The baker accused of poisoning the Flamekeeper's cook demands trial by combat. It's still law. He's named a champion. It's the orc who sleeps in Bess's stable.",
    left: { label: "Let them fight.", fx: { people: 10 }, next: { id: "city_judge_combat_2", delay: 0 } },
    right: { label: "Trial by judge. Me.", fx: { people: -5, faith: 5 }, random: [
      { chance: 0.5, fx: { faith: 5, people: -10 } },
      { chance: 0.5, fx: { people: 10, faith: -10 } },
    ] },
  },
  {
    id: "city_judge_combat_2", char: "judge", chainOnly: true,
    text: "Four seconds. The Church's champion is being collected in a sheet. The baker is free, the orc is drunk on the Church's wine, and the Flamekeeper wants the law changed by morning.",
    left: { label: "Change the law.", fx: { faith: 10, people: -10 } },
    right: { label: "The law stands.", fx: { faith: -15, people: 15, army: 5 } },
  },
  {
    id: "city_judge_contradiction", char: "judge",
    text: "Statute nine: a murderer hangs within three days. Statute forty: no hanging on a feast day. The Church has made this whole week feast days. I think on purpose. He's a good tenant of theirs.",
    left: { label: "Hang him. Statute nine.", fx: { faith: -15, people: 10 } },
    right: { label: "Feast days are feast days.", fx: { faith: 5, people: -10, gold: -5 } },
  },
  {
    id: "city_judge_personal_1", char: "judge", once: true, weight: 0.5,
    text: "Two men, each swearing he's Harl Dunning, sole heir to the Dunning counting house. One has the scar. One has the handwriting. Both have the mother, who is not helping.",
    left: { label: "The one with the scar.", random: [
      { chance: 0.5, fx: { people: 10, gold: 5 } },
      { chance: 0.5, fx: { people: -10, gold: -10 }, next: { id: "city_judge_personal_2", delay: 2 } },
    ] },
    right: { label: "Split the house.", fx: { people: -10, gold: 10 }, next: { id: "city_judge_personal_2", delay: 2 } },
  },
  {
    id: "city_judge_personal_2", char: "judge", chainOnly: true,
    text: "Your Dunning ruling is precedent now. Every twin on Coin Row is suing the other. I have forty cases and one of the Dunnings has turned out to be a Kethran called Pol.",
    left: { label: "Hang Pol.", fx: { people: 5, gold: 5, army: -5 } },
    right: { label: "Give it all to the twins.", fx: { people: -10, gold: -10 } },
  },
  {
    id: "city_judge_dungeon", char: "judge", once: true, weight: 0.5, when: { minReign: 4 },
    text: "You told me to judge without fear or favour. Under your own statute, the Coin Row hangings were unlawful. The King is guilty. The sentence is a night in the dungeon. I don't expect you to go.",
    left: { label: "Noted.", fx: { people: 5, faith: 5, army: -5 } },
    right: { label: "One night. For the law.", random: [
      { chance: 0.7, fx: { people: 20, faith: 5 } },
      { chance: 0.3, fx: { people: 5 }, die: "dungeon" },
    ] },
  },

  // ---------- the executioner ----------
  {
    id: "city_exec_guild", char: "executioner", weight: 2,
    text: "The Headsmen's Guild, Sire. Six of us, one a gate. We'd like two crowns a head. It's been one since your grandfather. Rope's gone up. Everything's gone up. Heads especially.",
    left: { label: "Two crowns.", fx: { gold: -5, people: 5 } },
    right: { label: "One. Fewer heads, then.", fx: { gold: 5, people: -5, army: -5 } },
  },
  {
    id: "city_exec_botched_1", char: "executioner",
    text: "The rope broke. Twice. Same man. The crowd at Saltgate says it's a sign from the Flame. The man says he'd like to go home now, if that's all.",
    left: { label: "Let him go.", fx: { faith: 10, people: 10, army: -10 }, next: { id: "city_exec_botched_2", delay: 3 } },
    right: { label: "Axe.", fx: { faith: -15 }, random: [
      { chance: 0.8, fx: { people: -15 } },
      { chance: 0.2, die: "torn_by_mob" },
    ] },
  },
  {
    id: "city_exec_botched_2", char: "flamekeeper", chainOnly: true,
    text: "\"The man the rope refused sits at Saltgate now, and the city brings him bread and coin. They call him the Unhanged. He is a horse thief, Sire. The Flame does not spare horse thieves. I'd know.\"",
    left: { label: "Make him a saint. It's cheaper.", fx: { people: 10, faith: -10, gold: 5 } },
    right: { label: "Hang him properly.", fx: { faith: 10, people: -20 } },
  },
  {
    id: "city_exec_innocent", char: "executioner",
    text: "Tam the ratcatcher's for the rope at noon. Everyone knows Tam. Everyone knows he didn't do it. Justiciar says the law's the law. The crowd's saying something else and there's more of them.",
    left: { label: "The law's the law.", fx: { faith: 5 }, random: [
      { chance: 0.6, fx: { people: -20 } },
      { chance: 0.4, fx: { people: -10 }, die: "torn_by_mob" },
    ] },
    right: { label: "Pardon him.", fx: { people: 15, faith: -5, army: -5 }, set: ["city_tam_lives"] },
  },
  {
    id: "city_exec_retire_1", char: "executioner",
    text: "Forty years, Sire. Hands shake now. My nephew's keen. Too keen, I'll be honest with you, but keen's what you want in a young man and a headsman. He's practised on pigs.",
    left: { label: "The nephew.", fx: { people: -5 }, next: { id: "city_exec_retire_2", delay: 2 } },
    right: { label: "Your hands are fine.", fx: { gold: 5, people: -10 } },
  },
  {
    id: "city_exec_retire_2", char: "judge", chainOnly: true,
    text: "The new headsman did eleven this week. I sentenced eight. He says the other three looked guilty. One was a Guild alderman and another was, until Tuesday, my clerk.",
    left: { label: "Hang the headsman.", fx: { people: 10, army: -5, gold: -5 } },
    right: { label: "Keep him. He's efficient.", fx: { army: 10, people: -15, faith: -5, gold: 5 } },
  },

  // ---------- Mistress Penn ----------
  {
    id: "city_tres_budget", char: "treasurer", weight: 2,
    text: "The year's accounts. We spend forty thousand. We take in thirty-one. The difference has a name, and the name is your reign. Something has to be cut, and I'd like it not to be me.",
    left: { label: "The garrison's pay.", fx: { gold: 20, army: -15 }, next: { id: "city_army_pay_2", delay: 2 } },
    right: { label: "The Church's stipend.", fx: { gold: 20, faith: -15 } },
  },
  {
    id: "city_army_pay_2", char: "captain", chainOnly: true,
    text: "Rook. The Saltgate garrison hasn't seen pay since the budget. This morning they hanged the paymaster from the gate. Not as a mutiny, they say. As a suggestion.",
    left: { label: "Pay them. Now.", fx: { gold: -20, army: 10 } },
    right: { label: "Hang the ringleaders.", random: [
      { chance: 0.6, fx: { army: -15, people: -5 } },
      { chance: 0.4, die: "hanged_by_army" },
    ] },
  },
  {
    id: "city_tres_toll_1", char: "treasurer", weight: 2,
    text: "A copper to cross the Saltgate bridge. Everyone crosses it. Twice a day, most of them. I've done the arithmetic and it makes me feel something, which is rare.",
    left: { label: "A copper.", fx: { gold: 20, people: -10 }, next: { id: "city_tres_toll_2", delay: 3 } },
    right: { label: "Bridges are free.", fx: { people: 5 } },
  },
  {
    id: "city_tres_toll_2", char: "treasurer", chainOnly: true,
    text: "The toll took eight thousand. It also took a ferryman's trade, so he rows people under the bridge for half a copper and calls it a protest. Half the city is protesting. Daily. Twice.",
    left: { label: "Hire him as tollkeeper.", fx: { people: 10, gold: -5 } },
    right: { label: "Sink the boat.", fx: { gold: 15, people: -15 } },
  },
  {
    id: "city_tres_lottery_1", char: "treasurer",
    text: "A lottery. One copper a ticket, one prize of a thousand crowns. Half the city buys a ticket. The other half buys two. The Church calls it gambling, which it is.",
    left: { label: "Sell tickets.", fx: { gold: 20, faith: -10 }, next: { id: "city_tres_lottery_2", delay: 1 } },
    right: { label: "No.", fx: { faith: 5, gold: -3 } },
  },
  {
    id: "city_tres_lottery_2", char: "treasurer", chainOnly: true,
    text: "The winning ticket belongs to the Flamekeeper's cook. Nobody believes it. It's true. That's the trouble with true things. Coin Row is calling it the Church's lottery.",
    left: { label: "Pay her.", fx: { gold: -10, people: -15, faith: 5 } },
    right: { label: "Draw again.", fx: { people: 10, faith: -15 } },
  },
  {
    id: "city_tres_audit_1", char: "treasurer",
    text: "The Church hasn't opened its books since your great-grandfather. I'd like to open them. With a crowbar, if it comes to that, and I've brought one in case.",
    left: { label: "Open them.", fx: { faith: -15, gold: 10 }, next: { id: "city_tres_audit_2", delay: 1 } },
    right: { label: "Put the crowbar away.", fx: { faith: 5, gold: -5 } },
  },
  {
    id: "city_tres_audit_2", char: "treasurer", chainOnly: true,
    text: "Their books balance. To the copper. Every year for ninety years. Nobody's books balance, Sire. I've never seen anything so guilty in my life.",
    left: { label: "Seize what's missing.", random: [
      { chance: 0.6, fx: { gold: 30, faith: -20 } },
      { chance: 0.4, fx: { gold: 5, faith: -25, people: -5 } },
    ] },
    right: { label: "Compliment their clerks.", fx: { faith: 10, gold: -5 } },
  },
  {
    id: "city_tres_vault_1", char: "treasurer", once: true, weight: 0.5, when: { stats: { gold: [40, 100] } },
    text: "Thane Ironledger's bank offers to hold our gold under the Iron Teeth. Nobody has ever robbed a dwarf. Nobody has ever got anything back from one either. I've read the deposit terms. Twice.",
    left: { label: "Deposit it.", fx: { gold: -5 }, effect: "vault", next: { id: "city_dwarf_bank_2", delay: 4 } },
    right: { label: "It stays here.", fx: { gold: 10, army: -3 } },
  },
  {
    id: "city_dwarf_bank_2", char: "dwarf_envoy", chainOnly: true, when: { effects: ["vault"] },
    text: "Clause nine of your deposit. Gold in the dark costs more to guard than gold in the light. Two hundred crowns yearly, or one part in a hundred, whichever offends you less.",
    left: { label: "Pay the dark tax.", fx: { gold: -10 } },
    right: { label: "Withdraw everything.", fx: { gold: 10, army: 3 }, removeEffect: "vault", set: ["city_dwarf_bank_left"] },
  },
  {
    id: "city_tres_fleet", char: "treasurer",
    text: "Six ships to the spice coast. Crane's captains, our coin. If they come back we double it. If they don't, we've bought the sea some very expensive firewood.",
    left: { label: "Sail.", fx: { gold: -10 }, random: [
      { chance: 0.55, fx: { gold: 30, people: 5 } },
      { chance: 0.45, fx: { people: -5 } },
    ] },
    right: { label: "The sea has enough.", fx: { gold: 3, people: -3 } },
  },
  {
    id: "city_tres_recoin_1", char: "treasurer", when: { notEffects: ["mint"] },
    text: "Every coin in the city wears your grandfather's face. I'd like yours. Call them in, melt them, strike them fresh. We keep a tenth for the trouble. Nobody misses a tenth of a face.",
    left: { label: "Strike them.", fx: { gold: 15, people: -5 }, effect: "mint", next: { id: "city_tres_recoin_2", delay: 2 } },
    right: { label: "Grandfather stays.", fx: { people: 3, faith: 3 } },
  },
  {
    id: "city_tres_recoin_2", char: "treasurer", chainOnly: true,
    text: "The new coins are out. The nose is wrong. The engraver says it's flattering; Coin Row calls them snouts. \"That'll be four snouts,\" they say. I've heard it eleven times today.",
    left: { label: "Hang the engraver.", fx: { people: -10, army: 5 } },
    right: { label: "Snouts, then.", fx: { people: 5, gold: -3 } },
  },
  {
    id: "city_tres_wine_1", char: "treasurer",
    text: "Greenreach wine. Every lord in the city drinks it and no peasant can afford it. Tax it at a third: the lords pay, the elves complain, and nobody riots, because peasants drink beer.",
    left: { label: "A third.", fx: { gold: 20, army: -5 }, set: ["city_wine_taxed"], next: { id: "city_tres_wine_2", delay: 2 } },
    right: { label: "Leave the wine.", fx: { army: 3, gold: -3 } },
  },
  {
    id: "city_tres_wine_2", char: "elf_envoy", chainOnly: true,
    text: "Lord Cael has noticed the wine tax. The Greenreach will send no wine this year. Your lords will drink beer. They will remember, he observes, who made them.",
    left: { label: "Repeal it.", fx: { gold: -5, army: 5 }, unset: ["city_wine_taxed"] },
    right: { label: "Beer is good for them.", fx: { army: -15, gold: 5, people: 5 } },
  },
  {
    id: "city_tres_spending", char: "treasurer", weight: 2,
    text: "The royal household spent nine thousand crowns last year. Four thousand was hats. I've listed the hats. I'd like to go through the hats with you, one at a time.",
    left: { label: "Fewer hats.", fx: { gold: 15, people: -3 } },
    right: { label: "More hats.", fx: { gold: -15, people: 10 } },
  },

  // ---------- Guildmaster Crane ----------
  {
    id: "city_merc_goblin_market", char: "merchant", weight: 2,
    text: "Nizzik's stalls under the Elf Steps sell a knife for a copper. The Guild sells one for six. Theirs break in a week. Nobody remembers that when they're holding a copper.",
    left: { label: "Close the goblin stalls.", fx: { gold: 10, people: -10 }, set: ["city_goblin_market_shut"] },
    right: { label: "Sell better knives.", fx: { people: 5, gold: -3 } },
  },
  {
    id: "city_merc_salt", char: "merchant", once: true, weight: 0.5,
    text: "Give the Guild the salt. All of it, Saltgate to the Scar. Twenty thousand up front, and salt costs what we say it costs. People need salt. That's the beauty of it.",
    left: { label: "Take the salt.", fx: { gold: 30, people: -20 }, set: ["city_salt_monopoly"] },
    right: { label: "Salt belongs to the sea.", fx: { people: 5, gold: -5 } },
  },
  {
    id: "city_merc_strike_1", char: "merchant",
    text: "The Coin Row porters have set down their loads. Every load. There's a cart of herring in the sun outside the counting house that is rapidly becoming a public matter.",
    left: { label: "Pay them what they ask.", fx: { gold: -10, people: 10 } },
    right: { label: "Hire the goblins.", fx: { gold: 10, people: -10 }, next: { id: "city_merc_strike_2", delay: 1 } },
  },
  {
    id: "city_merc_strike_2", char: "merchant", chainOnly: true,
    text: "The tanners have joined the porters. So have the carters and, for reasons nobody's explained, the bakers. Nothing moves on Coin Row. The herring has achieved a kind of fame.",
    left: { label: "Send the guard.", fx: { army: 5 }, random: [
      { chance: 0.75, fx: { people: -15, gold: 5 } },
      { chance: 0.25, die: "torn_by_mob" },
    ] },
    right: { label: "Give them their rate.", fx: { gold: -10, people: 10 } },
  },
  {
    id: "city_merc_counterfeit_1", char: "merchant",
    text: "Two thousand false crowns in the city. Lead, dipped. I know because the Guild's been paid in them, and I'd like to know by whom before I'm asked how I didn't notice.",
    left: { label: "Set the Whisperer on it.", fx: { gold: -5 }, next: { id: "city_merc_counterfeit_2", delay: 1 } },
    right: { label: "Spend them on the Church.", fx: { gold: 15, faith: -10 } },
  },
  {
    id: "city_merc_counterfeit_2", char: "judge", chainOnly: true,
    text: "The coiners are a father and three sons, a cellar on Tanner Lane. The law for coining is boiling. The crowd's come to watch. The youngest son is eleven.",
    left: { label: "Boil them all.", fx: { people: -20, gold: 5, army: 5 } },
    right: { label: "The father. Free the boys.", fx: { people: 10, gold: -5 } },
  },

  // ---------- Master Fennick ----------
  {
    id: "city_arch_sewers_1", char: "architect",
    text: "The city has no sewers. It has a slope. Everything the city produces goes down the slope and ends at Saltgate, which is why nothing lives at Saltgate except the garrison.",
    left: { label: "Dig sewers.", fx: { gold: -15, people: 10 }, next: { id: "city_arch_sewers_2", delay: 2 } },
    right: { label: "The slope works.", fx: { people: -5, gold: 3 } },
  },
  {
    id: "city_arch_sewers_2", char: "architect", chainOnly: true,
    text: "The main sewer's dug. It runs under the temple. The Flamekeeper has been told what will pass beneath his altar, and at what volume, and has taken to his bed.",
    left: { label: "Reroute it.", fx: { gold: -10, faith: 5 } },
    right: { label: "It's a sewer. It goes down.", fx: { faith: -15, people: 5 } },
  },
  {
    id: "city_arch_market", char: "architect", weight: 2,
    text: "A new market square where the pig-yards are. Stone, drained, a fountain if you're feeling generous. The pigs would need somewhere. I have thoughts about the Church's orchard.",
    left: { label: "Build it. Pigs to the orchard.", fx: { gold: -10, people: 10, faith: -10 } },
    right: { label: "The pigs stay.", fx: { people: -5, gold: 3 } },
  },
  {
    id: "city_arch_statue_1", char: "architect",
    text: "A statue. Bronze, forty feet, on the Saltgate bar, facing Kethra. So the Kethrans can see you disapprove from the sea. The bronze alone is a year of the goose tax.",
    left: { label: "Face it at Kethra.", fx: { gold: -15, army: 10 }, next: { id: "city_arch_statue_2", delay: 3 } },
    right: { label: "No statues.", fx: { faith: 3, people: -3 } },
  },
  {
    id: "city_arch_statue_2", char: "architect", chainOnly: true,
    text: "It's up. The sculptor has never seen you and worked from coins. It's been mistaken for your brother twice and for a bear once. The scaffolding's still there if you'd like to see the face.",
    left: { label: "Show me. Up close.", random: [
      { chance: 0.8, fx: { people: 5, gold: -5 } },
      { chance: 0.2, die: "fell_from_tower" },
    ] },
    right: { label: "Melt it.", fx: { gold: -10, people: -10 } },
  },
  {
    id: "city_arch_lighthouse", char: "architect",
    text: "Ships break on the Saltgate bar every winter. A light would save them. The wreckers who live on the bar have asked that their objection be recorded. It's recorded.",
    left: { label: "Build the light.", fx: { gold: -15, people: 5, faith: 5 } },
    right: { label: "Let them wreck.", fx: { gold: 15, people: -5, faith: -10 } },
  },
  {
    id: "city_arch_orc_wall_1", char: "architect",
    text: "The orc quarter behind Tanner Lane. The Guild wants a wall round it. The orcs have asked, reasonably, which side of the wall the gate opens from.",
    left: { label: "Build it. Our side.", fx: { people: 10, gold: -10 }, set: ["city_orc_walled"], next: { id: "city_arch_orc_wall_2", delay: 2 } },
    right: { label: "No wall.", fx: { people: -10, gold: 3 } },
  },
  {
    id: "city_arch_orc_wall_2", char: "orc_mercenary", chainOnly: true,
    text: "You built a wall round us. Fine. Walls have two sides. We've locked the gate from ours. Your tanners can't reach the river now. Your problem. We're in here with the river.",
    left: { label: "Tear it down.", fx: { gold: -10, people: -5 }, unset: ["city_orc_walled"] },
    right: { label: "Break the gate.", fx: { army: 5 }, random: [
      { chance: 0.5, fx: { people: 5, army: -10 } },
      { chance: 0.5, fx: { people: -15, army: -5 } },
    ] },
  },
  {
    id: "city_arch_saltgate_1", char: "architect", when: { notEffects: ["high_walls"] },
    text: "The river wall at Saltgate is held up mainly by habit. If Kethra comes by water they come in through the fish market. Rebuild it and they'd have to come in like gentlemen.",
    left: { label: "Rebuild it.", fx: { gold: -20, army: 5 }, next: { id: "city_arch_saltgate_2", delay: 3 } },
    right: { label: "Habit's held it this long.", fx: { gold: 3, army: -5 } },
  },
  {
    id: "city_arch_saltgate_2", char: "architect", chainOnly: true,
    text: "Done. Thirty feet, dwarf-cut, a gate twelve men could hold against a fleet. I'd like a plaque. Something modest. My name, mainly, in a large modest way.",
    left: { label: "A plaque.", fx: { army: 10, people: 5, gold: -5 }, effect: "high_walls" },
    right: { label: "It's my wall.", fx: { army: 10, gold: -3 }, effect: "high_walls" },
  },
  {
    id: "city_arch_collapse", char: "architect",
    text: "The new counting house on Coin Row is leaning. The Guild says I'm afraid to go inside. I'd like you to come and stand in it with me, briefly, so they stop saying it.",
    left: { label: "Briefly.", random: [
      { chance: 0.75, fx: { people: 10, army: 5 } },
      { chance: 0.25, die: "buried_alive" },
    ] },
    right: { label: "Pull it down.", fx: { gold: -10, people: -5 } },
  },

  // ---------- the Whisperer ----------
  {
    id: "city_spy_bed", char: "spymaster",
    text: "\"Lord Harrow's wife sleeps with Marshal Thorne. It matters because Harrow commands the Saltgate garrison, and because Thorne paid me not to tell you. I've taken his money. Here I am.\"",
    left: { label: "Tell Harrow.", fx: { army: -15, people: 5 } },
    right: { label: "Thorne owes me now.", fx: { army: 10, faith: -5 }, set: ["city_thorne_owes"] },
  },
  {
    id: "city_spy_kethra_letter_1", char: "spymaster",
    text: "\"A letter from the Emperor of Kethra to someone at your court. Unsigned. It mentions 'the arrangement' and 'after the funeral'. Nobody at court is ill, which narrows the funeral to one.\"",
    left: { label: "Find who it's for.", fx: { gold: -10 }, next: { id: "city_spy_kethra_letter_2", delay: 1 } },
    right: { label: "Burn it. Sleep less.", fx: { army: -5, people: -5 } },
  },
  {
    id: "city_spy_kethra_letter_2", char: "spymaster", chainOnly: true,
    text: "\"The Chancellor's clerk. Eleven years he's sold your council minutes south. Cheaply, which I find the insulting part. He has a mother on Tanner Lane and no idea we know.\"",
    left: { label: "Hang him. Quietly.", fx: { gold: 10, people: -5, army: 5 } },
    right: { label: "Feed him lies.", fx: { army: 10, gold: -5 }, set: ["city_double_agent"] },
  },
  {
    id: "city_spy_cult_1", char: "spymaster",
    text: "\"Something meets in the tannery cellars at the new moon. Twenty of them. They have a book. I've read the book. I'd rather I hadn't, and I've read your mother's letters.\"",
    left: { label: "Raid the cellars.", fx: { faith: 10, people: -10, army: 5 }, next: { id: "city_spy_cult_2", delay: 0 } },
    right: { label: "Watch them.", fx: { faith: -5 }, set: ["city_cult_watched"] },
  },
  {
    id: "city_spy_cult_2", char: "spymaster", chainOnly: true,
    text: "\"Eleven taken. Nine tanners. One priest of the Flame, who is now the Church's problem. And the Steward's wife. Wendel doesn't know. I can arrange that he never does.\"",
    left: { label: "Tell him.", fx: { people: -5, faith: 5 } },
    right: { label: "He never does.", fx: { gold: -5, faith: -5, army: 5 } },
  },
  {
    id: "city_spy_brother", char: "spymaster",
    text: "\"Your brother writes to the Dowager weekly. I've read them. They're about you. Not unkind, which is worse, because they're accurate. Last week's was about the hats.\"",
    left: { label: "Keep reading them.", fx: { gold: -5, faith: -5, army: 3 } },
    right: { label: "Leave my family's post alone.", fx: { people: 5, army: -5 } },
  },
  {
    id: "city_spy_dossier_1", char: "spymaster",
    text: "\"I have the Flamekeeper. Three mistresses, a son in Kethra, a shipment of holy relics that came off a cow. It's all in a box. I'd like you to have the box.\"",
    left: { label: "Give me the box.", fx: { faith: -10, gold: 20, army: 5 }, set: ["city_flame_box"], next: { id: "city_spy_dossier_2", delay: 2 } },
    right: { label: "Burn the box.", fx: { faith: 10, gold: -5 } },
  },
  {
    id: "city_spy_dossier_2", char: "spymaster", chainOnly: true,
    text: "\"The Flamekeeper knows about the box. He has one of his own. It's about you. I've seen both. His is thicker, and better bound, and some of it I didn't know.\"",
    left: { label: "Trade boxes.", fx: { faith: 5, gold: -5 } },
    right: { label: "Publish first.", random: [
      { chance: 0.5, fx: { faith: -25, people: 10 } },
      { chance: 0.5, fx: { faith: -10 }, die: "poison" },
    ] },
  },
  {
    id: "city_spy_ale_index", char: "spymaster", when: { effects: ["spy_network"] }, weight: 2,
    text: "\"The network reports. Ale at the Drowned Rat is up a copper. Bess raised it because the porters raised theirs because the Guild cut theirs. Riot in eight months, give or take a harvest.\"",
    left: { label: "Pay the porters.", fx: { gold: -15, people: 5 } },
    right: { label: "Ready the guard for spring.", fx: { army: 5, people: -5 } },
  },
  {
    id: "city_spy_ear", char: "spymaster", when: { effects: ["spy_network"] },
    text: "\"One of my ears was found in the river this morning. The ear. The rest of him is elsewhere. Someone in the city knows about the network and has written to say so.\"",
    left: { label: "Find them. Whatever it costs.", fx: { gold: -10, army: 5 } },
    right: { label: "Pull the network.", fx: { gold: 10, army: -5 }, removeEffect: "spy_network" },
  },
  {
    id: "city_spy_identity_1", char: "spymaster", once: true, weight: 0.5, when: { minReign: 3 },
    text: "\"Someone is asking who I am. Bess, at the Drowned Rat. She's been paid to ask. I've traced the payment, which is a thing I do. It came from the Treasury.\"",
    left: { label: "I'll ask Penn.", fx: { gold: -3 }, next: { id: "city_spy_identity_2", delay: 0 } },
    right: { label: "Let Penn look.", fx: { army: -5, gold: 5 } },
  },
  {
    id: "city_spy_identity_2", char: "treasurer", chainOnly: true,
    text: "\"Yes. I paid to find out. Twelve thousand a year goes behind that curtain and I've never seen a receipt. I found out, too.\" She sets a folded paper on the table and doesn't take her hand off it.",
    left: { label: "Read it.", fx: {}, next: { id: "city_spy_identity_3", delay: 0 } },
    right: { label: "Burn it. Some things cost more.", fx: { gold: -5, army: 5 } },
  },
  {
    id: "city_spy_identity_3", char: "spymaster", chainOnly: true,
    text: "The curtain is gone. The chair behind it is empty and warm. On the seat, a note in Penn's hand: \"Both of us, then.\" The Treasury door is locked. From the inside.",
    left: { label: "Break it down.", random: [
      { chance: 0.7, fx: { gold: -15, army: -5 }, removeEffect: "spy_network" },
      { chance: 0.3, die: "poison" },
    ] },
    right: { label: "Leave it.", fx: { army: -3 }, next: { id: "city_spy_identity_4", delay: 3 } },
  },
  {
    id: "city_spy_identity_4", char: "spymaster", chainOnly: true,
    text: "The curtain is back. Nobody mentions it. This year's Treasury ledger balances to the copper, in a hand that isn't quite Penn's. \"Nothing to report,\" says the voice behind the curtain.",
    left: { label: "Good.", fx: { army: 5, gold: 5 } },
    right: { label: "Who am I paying?", fx: { gold: -5, army: -5 } },
  },

  // ---------- the Guild of Quiet Hands ----------
  {
    id: "city_assassin_offer", char: "assassin", once: true,
    text: "A woman with no rings, at the foot of your bed, at noon. \"The Quiet Hands. The Kethran ambassador has been unhelpful. Four thousand crowns, and by spring he's a stair accident.\"",
    left: { label: "Four thousand.", fx: { gold: -15, army: 10 }, set: ["city_hands_hired"], next: { id: "city_assassin_collect", delay: 2 } },
    right: { label: "Guards.", fx: { army: -5 }, next: { id: "city_assassin_insulted", delay: 4 } },
  },
  {
    id: "city_assassin_collect", char: "assassin", chainOnly: true,
    text: "\"Done. Fell from a tower. Tragic. Four thousand, plus two for the tower, which we had to hire, plus one for the widow's silence, which was reasonable of her.\"",
    left: { label: "Pay it.", fx: { gold: -10 } },
    right: { label: "We agreed four.", fx: { gold: -5, army: 5 }, effect: "wanted" },
  },
  {
    id: "city_assassin_insulted", char: "assassin", chainOnly: true,
    text: "\"You set the guard on us. We don't take offence; we take notes. Someone has since paid us for you. We're offering you the chance to outbid, which is more than we offered him.\"",
    left: { label: "Outbid.", fx: { gold: -20 } },
    right: { label: "Let them try.", fx: { army: 5 }, effect: "wanted" },
  },
  {
    id: "city_assassin_pillow", char: "captain", when: { effects: ["wanted"] }, weight: 2,
    text: "Rook. There was a knife on your pillow this morning. On, not in. A note with it: \"Practice.\" The door was barred. I barred it. I've been Captain eleven years and I'd like to keep being one.",
    left: { label: "Double the guard.", fx: { army: 10, gold: -10 } },
    right: { label: "Pay the Hands off.", fx: { gold: -15 }, removeEffect: "wanted" },
  },
  {
    id: "city_assassin_figs", char: "assassin", when: { effects: ["wanted"] }, weight: 2,
    text: "A boy of twelve with a tray of figs, in your chamber, smiling. Nobody let him in. Nobody saw him on the stair. The figs look excellent.",
    left: { label: "Take a fig.", random: [
      { chance: 0.5, fx: { people: 5 } },
      { chance: 0.5, die: "poison" },
    ] },
    right: { label: "Guards.", random: [
      { chance: 0.7, fx: { army: 5 }, removeEffect: "wanted" },
      { chance: 0.3, die: "assassin_blade" },
    ] },
  },
  {
    id: "city_assassin_blade", char: "assassin", when: { effects: ["wanted"] }, once: true,
    text: "\"We don't usually name the buyer. But he's paying badly and late, and we've a reputation. For a sum, we'll tell you who. For a larger sum, we'll make it his problem.\"",
    left: { label: "The name.", fx: { gold: -15 }, removeEffect: "wanted" },
    right: { label: "Make it his problem.", fx: { gold: -20, army: 5 }, random: [
      { chance: 0.6, removeEffect: "wanted" },
      { chance: 0.4, die: "assassin_blade" },
    ] },
  },

  // ---------- Nizzik ----------
  {
    id: "city_gob_loan_1", char: "goblin", when: { stats: { gold: [0, 40] } },
    text: "Money, Majesty? Nizzik has money. Ten thousand today. Eleven next month. Twelve the month after. Goblin arithmetic only goes up. Very simple. Very honest.",
    left: { label: "Ten thousand.", fx: { gold: 25 }, next: { id: "city_gob_loan_2", delay: 3 } },
    right: { label: "No.", fx: { gold: -3, people: -3 } },
  },
  {
    id: "city_gob_loan_2", char: "goblin", chainOnly: true,
    text: "Three months, Majesty. Thirteen thousand. But Nizzik doesn't want the money. Nizzik wants the fish market. Not the fish. The stalls, the fees, the little bit of every fish.",
    left: { label: "Pay him.", fx: { gold: -20 } },
    right: { label: "Take the fish market.", fx: { people: -15, gold: 5 }, set: ["city_goblin_fish_market"] },
  },
  {
    id: "city_gob_rumour", char: "goblin",
    text: "A rumour, Majesty. Fresh this morning. About you. Fifty crowns and you hear it. A hundred and nobody else does. Nizzik recommends the hundred, personally.",
    left: { label: "Fifty. Tell me.", fx: { gold: -5 }, random: [
      { chance: 0.5, fx: { army: -10 } },
      { chance: 0.5, fx: { people: -10 } },
    ] },
    right: { label: "A hundred.", fx: { gold: -5, people: 3 } },
  },
  {
    id: "city_gob_title", char: "goblin", once: true, weight: 0.5,
    text: "Nizzik would like to be a lord. Small lord. Lord of the Elf Steps, say. Two thousand crowns, and Nizzik's cousins stop selling the knives that break. Most of the cousins.",
    left: { label: "Lord Nizzik.", fx: { gold: 20, faith: -5, people: -5 }, set: ["city_lord_nizzik"], next: { id: "city_gob_title_2", delay: 3 } },
    right: { label: "No.", fx: { people: 3 } },
  },
  {
    id: "city_gob_title_2", char: "goblin", chainOnly: true,
    text: "The elves have sent Lord Nizzik a note. Very long. Nizzik can't read elvish but the paper is beautiful and there's a picture of a tree with something hanging from it. Nizzik would like guards.",
    left: { label: "Four guards.", fx: { army: -5, gold: -5 } },
    right: { label: "Lords buy their own guards.", fx: { gold: 5, people: 5 }, unset: ["city_lord_nizzik"] },
  },

  // ---------- the trade ----------
  {
    id: "city_slaver_1", char: "slaver", once: true,
    text: "A man who gives no name. \"Forty a month go out through the Saltgate cellars. Orcs, halflings, a dwarf once. Nobody counts them. For a fee, Your Grace, you could not count them either.\"",
    left: { label: "Name the fee.", fx: { gold: 25, faith: -10, people: -5 }, set: ["city_slaves_ignored"] },
    right: { label: "Break the cellars.", fx: { gold: -15, army: -10, faith: 10 }, next: { id: "city_slaver_2", delay: 1 } },
  },
  {
    id: "city_slaver_2", char: "captain", chainOnly: true,
    text: "Rook. Saltgate cellars are broken. Nineteen freed, four of mine dead. The man running it was Lord Harrow's steward. Harrow says he's shocked. He said it while counting something.",
    left: { label: "Hang the steward.", fx: { people: 10, army: 5 } },
    right: { label: "Hang Harrow too.", fx: { people: 15, army: -15, gold: 15 } },
  },
  {
    id: "city_slaver_ignored", char: "orc_envoy", when: { flags: ["city_slaves_ignored"] }, once: true,
    text: "Shazza. Eleven Ashfang taken from your city this year and sold south. My father doesn't know yet. I'm telling you first, because when he knows he stops talking and starts counting axes.",
    left: { label: "Buy them back.", fx: { gold: -20, army: -5, faith: 5 }, unset: ["city_slaves_ignored"] },
    right: { label: "I know nothing about it.", fx: { faith: -10, people: -10, army: 5 } },
  },

  // ---------- Bess of the Drowned Rat ----------
  {
    id: "city_inn_singing", char: "innkeeper",
    text: "Bess. My regulars have stopped singing. Twenty years, they sing by the third pint. Now they talk low and watch the door. I've seen it once before. Your father's last winter.",
    left: { label: "What do they want?", fx: { gold: -10, people: 10 } },
    right: { label: "Close the Rat for a month.", fx: { people: -15, army: 5 } },
  },
  {
    id: "city_inn_stranger", char: "innkeeper",
    text: "A man in a good cloak has taken my best room for a month. Pays in Kethran silver. Asks how many guards stand the Saltgate at night. I said I'd ask you. He said please do.",
    left: { label: "Arrest him.", fx: { army: 5 }, random: [
      { chance: 0.6, fx: { people: 5, gold: 5 } },
      { chance: 0.4, fx: { army: -10, gold: -5 } },
    ] },
    right: { label: "Tell him forty. There are twelve.", fx: { army: 10, gold: -5 } },
  },
  {
    id: "city_inn_ale_1", char: "innkeeper", weight: 2,
    text: "Ale's at three coppers, Majesty. At four they grumble. At five they throw things. Your grain tax puts it at five by harvest. I'm not complaining. I'm telling you what gets thrown.",
    left: { label: "Drop the grain tax.", fx: { gold: -15, people: 10 } },
    right: { label: "Five it is.", fx: { gold: 15, people: -5 }, next: { id: "city_inn_ale_2", delay: 2 } },
  },
  {
    id: "city_inn_ale_2", char: "innkeeper", chainOnly: true,
    text: "Five coppers. Somebody threw the Chancellor's carriage. Whole carriage, into the river, horses unhitched first. Took thirty of them and they were sober. That's the part I'd sit with.",
    left: { label: "Send the guard.", fx: { army: 5 }, random: [
      { chance: 0.75, fx: { people: -15 } },
      { chance: 0.25, die: "torn_by_mob" },
    ] },
    right: { label: "Drop the tax. Now.", fx: { gold: -15, people: 10 } },
  },

  // ---------- the rats ----------
  {
    id: "city_rat_1", char: "rat", once: true,
    text: "A rat sits on the edge of the council table. Behind it, a line of rats, quite still. It has brought a very small parchment. The parchment says, in bites, NO CATS.",
    left: { label: "No cats.", fx: { people: -10, gold: -5, faith: -5 } },
    right: { label: "More cats.", fx: { people: 5 }, next: { id: "city_rat_2", delay: 2 } },
  },
  {
    id: "city_rat_2", char: "rat", chainOnly: true,
    text: "The cats are gone. All of them, from every cellar between Tanner Lane and Saltgate. The rats have brought you a collar. Small bell. They are not saying anything. They don't need to.",
    left: { label: "...No cats.", fx: { people: -10, gold: -5 } },
    right: { label: "Poison. Everywhere.", fx: { gold: -10 }, random: [
      { chance: 0.75, fx: { people: 10, faith: -5 } },
      { chance: 0.25, die: "poison" },
    ] },
  },

  // ---------- the cult ----------
  {
    id: "city_cult_recruit", char: "cultist",
    text: "A woman in grey, unafraid. \"We feed the slums on Tanner Lane. The Church doesn't. We ask only that they listen. Your Flamekeeper wants us burned. Ask him what he feeds them.\"",
    left: { label: "Feed who you like.", fx: { faith: -15, people: 10 }, set: ["city_cult_tolerated"] },
    right: { label: "Burn them.", fx: { faith: 10, people: -10 } },
  },
  {
    id: "city_cult_procession", char: "cultist", when: { flags: ["city_cult_tolerated"] }, once: true,
    text: "\"Four hundred of us now. We'd like a procession, Tanner Lane to Saltgate, at dusk. With torches. The Church has torches. We would like ours, and a street to carry them down.\"",
    left: { label: "One street. One dusk.", fx: { faith: -20, people: 5 } },
    right: { label: "No torches.", fx: { faith: 5, people: -10 }, unset: ["city_cult_tolerated"] },
  },

  // ---------- Sera ----------
  {
    id: "city_sera_house", char: "half_elf", once: true, weight: 0.5,
    text: "Sera. The half-elf quarter is eleven houses at the top of the Elf Steps. The elves won't have us and the humans won't rent to us. We're not asking for much. We're asking for a twelfth house.",
    left: { label: "A twelfth house.", fx: { gold: -5, people: -5, faith: -3 }, set: ["city_sera_helped"] },
    right: { label: "Eleven is plenty.", fx: { people: 5 } },
  },
  {
    id: "city_sera_pogrom_1", char: "half_elf",
    text: "There's a crowd at the foot of the Elf Steps with torches. A cooper's child is dead and somebody said it was one of us. It wasn't. That will stop mattering when it gets dark.",
    left: { label: "Send the guard.", fx: { army: -5, people: -10 }, next: { id: "city_sera_pogrom_2", delay: 0 } },
    right: { label: "Not my quarrel.", fx: { people: 5, faith: 5 }, set: ["city_pogrom_allowed"], next: { id: "city_sera_pogrom_3", delay: 1 } },
  },
  {
    id: "city_sera_pogrom_2", char: "captain", chainOnly: true,
    text: "Rook. The Steps are held. Three of the crowd dead, two of mine. The Flamekeeper's already preaching that the King's guard killed humans for elves. I'd like to know what to tell my men.",
    left: { label: "You held my city. That's all.", fx: { army: 10, faith: -10, people: -5 } },
    right: { label: "Blame the crowd's leaders.", fx: { faith: 5, people: 5, army: -10 } },
  },
  {
    id: "city_sera_pogrom_3", char: "half_elf", chainOnly: true,
    text: "Sera has one arm bound. \"Seven dead. The twelfth house is available now, if you were wondering. So are the other eleven.\" She's going to the Greenreach. She says they won't have her either.",
    left: { label: "Rebuild the houses.", fx: { gold: -10, people: -5, faith: -5 } },
    right: { label: "Safe travels.", fx: { faith: 5, army: 5 } },
  },
];
