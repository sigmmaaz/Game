// War, the army, and the people who make it necessary. Marshal Thorne wants a
// war. Everyone else wants to survive one. Prefix: war_
export default [
  // ---------- Marshal Brannoc Thorne ----------
  {
    id: "war_thorne_any_war", char: "general", weight: 2,
    text: "Marshal Thorne has a map. The map has pins in it. \"Kethra. The Greenreach. The Scar. The trolls, if we're desperate. Pick one, Sire. The men are sharpening things at each other.\"",
    left: { label: "None. Sharpen the ploughs.", fx: { army: -10, people: 5, gold: 10 } },
    right: { label: "Put a pin in Kethra.", fx: { army: 10, gold: -5 }, set: ["war_thorne_kethra_pin"], next: { id: "war_kethra_1", delay: 2 } },
  },
  {
    id: "war_thorne_recruit_1", char: "general", weight: 2,
    text: "\"Recruitment's down. Farm boys would rather farm. I'd like to send sergeants to the villages with a drum, a barrel of ale and no particular instructions.\"",
    left: { label: "Drum and ale.", fx: { army: 15, people: -10, gold: -5 }, next: { id: "war_thorne_recruit_2", delay: 1 } },
    right: { label: "Farming is also work.", fx: { army: -5, people: 5 } },
  },
  {
    id: "war_thorne_recruit_2", char: "peasant", chainOnly: true,
    text: "\"The sergeant came to Marl. Drank the barrel, then took my son and the miller's son and the miller. We've no miller now. We've got a drum.\"",
    left: { label: "Send the miller home.", fx: { army: -5, people: 10 } },
    right: { label: "Learn the drum.", fx: { people: -15, army: 5, gold: 5 } },
  },
  {
    id: "war_thorne_pensions", char: "general",
    text: "\"There's a man outside with one leg and a paper signed by your father. The paper promises him a pension. There are four hundred papers. I've counted the legs.\"",
    left: { label: "Honour the papers.", fx: { gold: -15, army: 10, people: 5 } },
    right: { label: "My father signed them.", fx: { army: -15, people: -5, gold: 10 }, set: ["war_pensions_refused"] },
  },
  {
    id: "war_thorne_mutiny_1", char: "general", when: { stats: { gold: [0, 30] } }, weight: 2,
    text: "\"The Third Company hasn't been paid since spring. They've stopped saluting. This morning they stopped standing up. I'd call it a mutiny but they're being very quiet about it.\"",
    left: { label: "Pay them. Somehow.", fx: { gold: -15, army: 10 } },
    right: { label: "Hang the loudest.", fx: { army: -10, gold: 5 }, next: { id: "war_thorne_mutiny_2", delay: 1 } },
  },
  {
    id: "war_thorne_mutiny_2", char: "general", chainOnly: true,
    text: "\"The loudest is hanged. The quietest has taken the armoury. He's asking for you, by name, without any titles. I'd bring gold. I'd bring a lot.\"",
    left: { label: "Bring gold.", fx: { gold: -20, army: 10 } },
    right: { label: "Bring the Marshal's head.", fx: { army: 5 }, random: [
      { chance: 0.5, fx: { people: 5 } },
      { chance: 0.5, die: "hanged_by_army" },
    ] },
  },
  {
    id: "war_thorne_parade", char: "general",
    text: "\"A parade. Full plate, drums, the elephants we borrowed and haven't returned. The people love it, the men love it, and it reminds both of them what the swords are for.\"",
    left: { label: "March.", fx: { people: 10, army: 10, gold: -15 } },
    right: { label: "Return the elephants.", fx: { army: -5, gold: 10 } },
  },
  {
    id: "war_thorne_fort_1", char: "general",
    text: "\"A fort at Cinder Gap. Stone, a well, a garrison of two hundred. The Scar narrows there. Whoever holds it decides who comes through, and I'd like that to be me. Us.\"",
    left: { label: "Build it.", fx: { gold: -15, army: 10 }, set: ["war_cinder_fort"], next: { id: "war_thorne_fort_2", delay: 3 } },
    right: { label: "The Scar is wide enough.", fx: { army: -5, gold: 10 } },
  },
  {
    id: "war_thorne_fort_2", char: "orc_envoy", chainOnly: true,
    text: "Shazza doesn't sit. \"You built a fort where our herds cross. My father says a fort is a wall that has decided to be rude. He says take it down, or he will, and he's slower about it.\"",
    left: { label: "It stays.", fx: { army: 10, people: -5 }, set: ["orc_grudge"], next: { id: "war_thorne_fort_3", delay: 2 } },
    right: { label: "Open the gates to herds.", fx: { army: -10, people: 5, gold: 5 } },
  },
  {
    id: "war_thorne_fort_3", char: "messenger", chainOnly: true,
    text: "\"Cinder Gap, Sire. The orcs came at night. The well's fine. The fort is mostly still there. The garrison sends its regrets, in that most of it can't send anything.\"",
    left: { label: "Rebuild. Bigger.", fx: { gold: -15, army: 5 }, effect: "high_walls" },
    right: { label: "Let the Gap be a gap.", fx: { army: -15, people: 5, gold: 10 }, unset: ["war_cinder_fort"] },
  },
  {
    id: "war_thorne_too_strong_1", char: "general", when: { stats: { army: [70, 100] } }, weight: 2,
    text: "The Marshal doesn't knock anymore. \"The men are wondering what they're for. I keep telling them. It gets harder. Give me a war or give me a reason. A reason is harder.\"",
    left: { label: "Disband two companies.", fx: { army: -15, gold: 20, people: 5 } },
    right: { label: "You'll have your war.", fx: { army: 10, gold: -10, people: -10 }, effect: "war", next: { id: "war_thorne_too_strong_2", delay: 2 } },
  },
  {
    id: "war_thorne_too_strong_2", char: "general", chainOnly: true,
    text: "\"Good war. Short. The men are happy, which is worse. Now they know you'll give them one when they ask. I mention this as a friend, before they mention it as something else.\"",
    left: { label: "Retire the Marshal.", fx: { army: -20, gold: -10 }, set: ["war_thorne_retired"] },
    right: { label: "Raise his pay.", fx: { gold: -15, army: 5 } },
  },
  {
    id: "war_thorne_too_weak", char: "general", when: { stats: { army: [0, 30] } }, weight: 2,
    text: "\"I inspected the ranks. There are ranks. That's the good news. Half of them are borrowed from the city watch and one is a scarecrow with a helmet. Good helmet.\"",
    left: { label: "Hire the orcs.", fx: { gold: -15, army: 20, people: -10 }, set: ["orc_merc_hired"] },
    right: { label: "Conscription.", fx: { army: 15, people: -15, gold: 5 }, next: { id: "war_peasant_conscript", delay: 1 } },
  },
  {
    id: "war_thorne_bored", char: "general",
    text: "\"Barracks report. Three duels, a goat in the chapel, and the Second Company has learned to juggle. It's bad when soldiers get hobbies. Hobbies turn into opinions.\"",
    left: { label: "Drill them till they drop.", fx: { army: 10, people: -5 } },
    right: { label: "Let them juggle.", fx: { army: -10, people: 5 } },
  },
  {
    id: "war_thorne_glory", char: "general", once: true, weight: 0.5,
    text: "Thorne is drunk, which is new. \"I've buried more men than I've promoted. Every one of them believed me when I said glory. I've stopped saying it. I say pay now. It's more honest.\"",
    left: { label: "Go to bed, Marshal.", fx: { army: 5 } },
    right: { label: "Say glory anyway.", fx: { army: 10, people: -5 }, set: ["war_thorne_hollow"] },
  },
  {
    id: "war_thorne_coup_whisper", char: "general", when: { stats: { army: [80, 100] }, notFlags: ["war_thorne_retired"] }, once: true,
    text: "\"Some colonels asked me a question last night. I said no. I'm telling you I said no so you know there was a question.\" He waits. He's very good at waiting.",
    left: { label: "Name the colonels.", fx: { army: -20, faith: 5 }, next: { id: "war_colonels_hanged", delay: 0 } },
    right: { label: "Thank you, Marshal.", fx: { army: 10 }, random: [
      { chance: 0.6, fx: { gold: -10 } },
      { chance: 0.4, die: "hanged_by_army" },
    ] },
  },
  {
    id: "war_colonels_hanged", char: "executioner", chainOnly: true,
    text: "\"Three colonels. Good rope, good drop, no speeches. Their regiments watched. Not a cheer, not a murmur. I'd keep the Marshal close for a while, Sire. Or far.\"",
    left: { label: "Close.", fx: { army: 5, gold: -5 } },
    right: { label: "Far. The northern border.", fx: { army: -5 }, set: ["war_thorne_retired"] },
  },

  // ---------- Captain Rook: palace guard ----------
  {
    id: "war_rook_intruder_1", char: "captain",
    text: "Captain Rook, at your door, at two in the morning. \"There's a man in the east gallery who isn't on any list. He's very calm about it. He's asked for tea.\"",
    left: { label: "Give him tea. Bring him.", fx: { army: -5 }, next: { id: "war_rook_intruder_2", delay: 0 } },
    right: { label: "Kill him quietly.", fx: { army: 5 }, random: [
      { chance: 0.7, fx: { faith: -5 } },
      { chance: 0.3, fx: { army: -10 }, next: { id: "war_rook_intruder_3", delay: 0 } },
    ] },
  },
  {
    id: "war_rook_intruder_2", char: "assassin", chainOnly: true,
    text: "He drinks the tea. \"I was paid to kill you. I was paid by someone who has since been outbid by someone else who wants you alive. I'm here to tell you both of those things exist.\"",
    left: { label: "Who paid the first?", fx: { gold: -10 }, set: ["war_assassin_named"], next: { id: "war_rook_intruder_3", delay: 1 } },
    right: { label: "Hang him anyway.", fx: { faith: 5, army: 5 }, effect: "wanted" },
  },
  {
    id: "war_rook_intruder_3", char: "captain", chainOnly: true,
    text: "\"We found a second one in the wine cellar. He wasn't calm. He's now considerably less calm, and I've had the cellar door bricked. You'll drink from the kitchens.\"",
    left: { label: "Double the guard.", fx: { gold: -15, army: 10 } },
    right: { label: "Find who's sending them.", fx: { gold: -10 }, effect: "spy_network" },
  },
  {
    id: "war_rook_corrupt_1", char: "captain",
    text: "\"Six of my men are taking coin at the postern gate. Merchants in, questions out. I know their names. I've known for a year. That year is the part I'm ashamed of.\"",
    left: { label: "Flog them. Publicly.", fx: { army: -10, people: 5, faith: 5 } },
    right: { label: "Take a cut.", fx: { gold: 20, army: -5 }, set: ["war_rook_cut"], next: { id: "war_rook_corrupt_2", delay: 3 } },
  },
  {
    id: "war_rook_corrupt_2", char: "judge", chainOnly: true,
    text: "Justiciar Maud has a ledger. \"Someone at the postern is running a toll. The toll goes up a chain that ends, as far as I can tell, in this room. Tell me it ends with the Captain.\"",
    left: { label: "It ends with the Captain.", fx: { army: -15, faith: 5 }, unset: ["war_rook_cut"] },
    right: { label: "It ends here, Maud.", fx: { faith: -10, gold: 15 }, random: [
      { chance: 0.7, fx: { people: -10 } },
      { chance: 0.3, fx: { people: -10 }, effect: "wanted" },
    ] },
  },
  {
    id: "war_rook_disguise_1", char: "captain",
    text: "\"You want to walk the city. In a cloak. Alone. Sire, I've had this conversation with two kings. One came back with a wife, one came back in a sack. I'm against it.\"",
    left: { label: "I'm going.", fx: { people: 5 }, next: { id: "war_rook_disguise_2", delay: 0 } },
    right: { label: "Fine. Stay in.", fx: { people: -5, army: 3 } },
  },
  {
    id: "war_rook_disguise_2", char: "innkeeper", chainOnly: true,
    text: "The Drowned Rat, past midnight. The innkeeper's telling a table what she'd do with the king if she had him for an hour. Most of it is about the tax on ale. Some of it isn't.",
    left: { label: "Buy the table a round.", fx: { people: 10, gold: -5 }, next: { id: "war_rook_disguise_3", delay: 0 } },
    right: { label: "Take names.", fx: { people: -10, army: 5 } },
  },
  {
    id: "war_rook_disguise_3", char: "captain", chainOnly: true,
    text: "Rook is outside the tavern, in a worse cloak than yours. \"Two men followed you from the fish market. I followed them. They're in the river. Don't do this again.\"",
    left: { label: "Every month, Captain.", fx: { people: 10, army: -5 }, random: [
      { chance: 0.7, fx: {} },
      { chance: 0.3, die: "assassin_blade" },
    ] },
    right: { label: "Never again.", fx: { army: 5 } },
  },
  {
    id: "war_rook_retire", char: "captain", once: true, weight: 0.5, when: { minReign: 12 },
    text: "\"Twelve years on your door. I've got a bad knee and a cottage in mind. My second is a good lad. He'll stand where I stood. He just hasn't been shot at yet, and that changes a man.\"",
    left: { label: "Go home, Rook.", fx: { army: -10, gold: -5, people: 5 } },
    right: { label: "One more year.", fx: { army: 5 }, random: [
      { chance: 0.8, fx: {} },
      { chance: 0.2, fx: { army: -15 } },
    ] },
  },

  // ---------- Sir Gavriel ----------
  {
    id: "war_gavriel_tourney_1", char: "knight",
    text: "\"A tourney, Your Grace. Lances, a purse, ladies throwing things. The Kethran champion has sent word he'll attend. He's killed four men in the lists and apologised to each.\"",
    left: { label: "Hold it.", fx: { gold: -15, people: 10, army: 5 }, next: { id: "war_gavriel_tourney_2", delay: 1 } },
    right: { label: "No blood sport this year.", fx: { people: -10, faith: 5, gold: 5 } },
  },
  {
    id: "war_gavriel_tourney_2", char: "knight", chainOnly: true,
    text: "\"He's beaten everyone. He's beaten me, which I'll be honest about. He's asked whether the King of Vael rides, or only watches. The stands heard him ask.\"",
    left: { label: "I ride.", fx: { people: 10, army: 10 }, random: [
      { chance: 0.55, fx: { faith: 5 }, set: ["duel_won"], next: { id: "war_gavriel_tourney_3", delay: 0 } },
      { chance: 0.45, die: "duel" },
    ] },
    right: { label: "Kings watch.", fx: { people: -10, army: -10 } },
  },
  {
    id: "war_gavriel_tourney_3", char: "foreign_envoy", chainOnly: true,
    text: "The Kethran envoy bows lower than usual. \"Our champion is being carried home. The Emperor says the King of Vael is either very brave or very lucky, and that he'd like to know which before winter.\"",
    left: { label: "Brave.", fx: { army: 10, people: 5 } },
    right: { label: "Lucky. Tell him lucky.", fx: { faith: 5, gold: 5 } },
  },
  {
    id: "war_gavriel_relic_1", char: "knight",
    text: "\"The Flamekeeper says the Ember of Saint Orrin is in a troll's cave north of the Teeth. He'd like it back. He'd like me to fetch it. I'd like to know if you'd like that too.\"",
    left: { label: "Fetch it.", fx: { faith: 10, army: -5 }, next: { id: "war_gavriel_relic_2", delay: 3 } },
    right: { label: "The troll can keep an ember.", fx: { faith: -10, army: 5 } },
  },
  {
    id: "war_gavriel_relic_2", char: "knight", chainOnly: true,
    text: "Gavriel is thinner and missing a glove. \"The troll had the Ember. He also had a family, a fair bit of reading, and a strong view on trespass. The Ember's in my saddlebag. I'd rather not say how.\"",
    left: { label: "To the temple with it.", fx: { faith: 15, people: 5 }, next: { id: "war_gavriel_relic_3", delay: 4 } },
    right: { label: "Keep it in the vault.", fx: { faith: -10, gold: 15 }, next: { id: "war_gavriel_relic_3", delay: 4 } },
  },
  {
    id: "war_gavriel_relic_3", char: "troll", chainOnly: true,
    text: "The troll fills the doorway. The herald took one look and went for his lunch. \"Your knight took a thing from my cave and my brother's arm. I want one of them back. I'm not fussy which.\"",
    left: { label: "Return the Ember.", fx: { faith: -15, people: 5 } },
    right: { label: "Give him the knight.", fx: { army: -15, faith: 5 }, set: ["war_gavriel_gone"] },
  },
  {
    id: "war_gavriel_doubt_1", char: "knight", when: { notFlags: ["war_gavriel_gone"] }, weight: 0.8,
    text: "\"I swore to protect the weak. I've spent this year collecting taxes from them. I've got very good at it. I'd like to be worse at it, Sire, if you can spare me.\"",
    left: { label: "You're a knight. Collect.", fx: { gold: 20, people: -10 }, set: ["war_gavriel_bitter"], next: { id: "war_gavriel_doubt_2", delay: 5 } },
    right: { label: "Guard the roads instead.", fx: { gold: -10, people: 10 } },
  },
  {
    id: "war_gavriel_doubt_2", char: "knight", chainOnly: true,
    text: "Gavriel doesn't kneel. That's the first thing. \"I hanged a boy for stealing a loaf from the army stores. Twelve. I did it because you'd have asked why not. I'm asking you now. Why not.\"",
    left: { label: "Because it's mine.", fx: { army: 5, people: -10, gold: 10 }, next: { id: "war_gavriel_doubt_3", delay: 3 } },
    right: { label: "I don't know.", fx: { people: 5, army: -5 } },
  },
  {
    id: "war_gavriel_doubt_3", char: "messenger", chainOnly: true,
    text: "\"Sir Gavriel has ridden west, Majesty. He left his spurs on the altar and his sword in the Marshal's door. The Marshal is upset about the door.\"",
    left: { label: "Let him go.", fx: { army: -10, faith: 5 }, set: ["war_gavriel_gone"] },
    right: { label: "Bring him back in chains.", fx: { army: -5, people: -10 }, set: ["war_gavriel_gone"], random: [
      { chance: 0.6, fx: {} },
      { chance: 0.4, fx: { faith: -10 } },
    ] },
  },
  {
    id: "war_gavriel_squire", char: "knight", when: { notFlags: ["war_gavriel_gone"] },
    text: "\"My squire wants to be knighted. He's sixteen, he can't sit a horse, and he ran into a burning barn last week for a goat. The goat lived. I think that counts.\"",
    left: { label: "Knight the boy.", fx: { army: 5, people: 5, gold: -5 } },
    right: { label: "Knight the goat.", fx: { people: 10, army: -10, faith: -5 } },
  },

  // ---------- Dorg, orc mercenary ----------
  {
    id: "war_dorg_bill", char: "orc_mercenary", when: { flags: ["orc_merc_hired"] },
    text: "Dorg puts a sack on the table. \"Bandits. Twelve heads. Contract says two silver a head. Your clerk says the contract says two silver per bandit and one's a woman. Explain your clerk to me.\"",
    left: { label: "Pay for twelve.", fx: { gold: -10, army: 10 } },
    right: { label: "The clerk is right.", fx: { gold: 10, army: -15 }, random: [
      { chance: 0.75, fx: {} },
      { chance: 0.25, die: "orc_axe" },
    ] },
  },
  {
    id: "war_dorg_flank", char: "orc_mercenary", when: { flags: ["orc_merc_hired"], effects: ["war"] },
    text: "\"Your Marshal wants my lads on the left flank. Left flank is where you put people you want dead. I know this. He knows I know this. We'd like to talk about money.\"",
    left: { label: "Double pay for the left.", fx: { gold: -15, army: 10 } },
    right: { label: "The left. As ordered.", fx: { army: -10 }, random: [
      { chance: 0.5, fx: { army: -10 }, unset: ["orc_merc_hired"] },
      { chance: 0.5, fx: { army: 15, people: 5 } },
    ] },
  },
  {
    id: "war_dorg_feast", char: "orc_mercenary", when: { flags: ["orc_merc_hired"] }, weight: 0.8,
    text: "\"Lads want to feast with your soldiers. One table. Their food, our drink. Your priests say orcs and men can't eat together. I say your priests aren't invited.\"",
    left: { label: "One table.", fx: { army: 10, faith: -10, people: 5 } },
    right: { label: "Separate tables.", fx: { army: -10, faith: 5 } },
  },

  // ---------- Messengers: battle reports ----------
  {
    id: "war_msg_field", char: "messenger", when: { effects: ["war"] }, weight: 2,
    text: "The messenger has ridden two horses to death. \"Battle at the Weir, Sire. The Marshal says it went as well as could be expected, and asks what you'd expected.\"",
    left: { label: "A victory.", fx: {}, random: [
      { chance: 0.5, fx: { army: 15, people: 10, gold: -5 } },
      { chance: 0.5, fx: { army: -20, people: -10 } },
    ] },
    right: { label: "Survivors.", fx: { army: -10, gold: -5, people: 5 } },
  },
  {
    id: "war_msg_siege_1", char: "messenger", when: { effects: ["war"] },
    text: "\"Kethran host under the walls of Wickham, Majesty. The town has eight days of grain and one priest. The Marshal can relieve it in nine, if he's not stopped, and he will be.\"",
    left: { label: "Ride in nine.", fx: { army: -10, gold: -10 }, next: { id: "war_msg_siege_2", delay: 1 } },
    right: { label: "Wickham's lost. Save the army.", fx: { people: -20, army: 5 } },
  },
  {
    id: "war_msg_siege_2", char: "messenger", chainOnly: true,
    text: "\"Wickham. The Marshal broke the siege on the tenth day. On the ninth the town opened the gates and gave the Kethrans the priest. They're saying it's not what it looks like.\"",
    left: { label: "Hang the aldermen.", fx: { faith: 10, people: -15, army: 5 } },
    right: { label: "Pretend I didn't hear.", fx: { people: 10, faith: -10 } },
  },
  {
    id: "war_msg_victory", char: "messenger", when: { effects: ["war"] },
    text: "\"Victory at Harrow Down. Complete. The Marshal took the Kethran baggage, the Kethran standards, and the Kethran cook. He'd like to keep the cook. He'd like to keep going.\"",
    left: { label: "Peace while we're ahead.", fx: { people: 10, gold: 20, army: -10 }, removeEffect: "war" },
    right: { label: "Keep going.", fx: { army: 15, gold: -15, people: -5 } },
  },
  {
    id: "war_msg_bad_road", char: "messenger",
    text: "\"The supply train's stuck at Sallow Ford. The road's gone. The carts are gone. The mules are somewhere. The bread is, technically, in the river, so the fish are well.\"",
    left: { label: "Buy bread locally. Any price.", fx: { gold: -15, army: 5 } },
    right: { label: "Soldiers can fish.", fx: { army: -15, people: 5, gold: 5 } },
  },

  // ---------- Kethra: Emperor Tavian ----------
  {
    id: "war_kethra_1", char: "foreign_envoy", chainOnly: true,
    text: "The Kethran envoy is unhurried. \"Emperor Tavian has noticed a lot of Vaelish soldiers near his border, pointing. He wonders whether they are lost. He'd be glad to send maps.\"",
    left: { label: "Send the maps.", fx: { army: -10, gold: 10, people: 5 }, unset: ["war_thorne_kethra_pin"] },
    right: { label: "They know where they are.", fx: { army: 10 }, next: { id: "war_kethra_2", delay: 1 } },
  },
  {
    id: "war_kethra_2", char: "foreign_king", chainOnly: true,
    text: "Tavian himself, by letter, in his own hand. \"Cousin. I have a larger army than you and more gold. I'm telling you this as a courtesy. Withdraw and we'll call it a hunting trip.\"",
    left: { label: "A hunting trip.", fx: { army: -15, people: 5 } },
    right: { label: "War.", fx: { army: 15, gold: -15, people: -10 }, effect: "war", set: ["war_kethra_war"], next: { id: "war_kethra_3", delay: 2 } },
  },
  {
    id: "war_kethra_3", char: "messenger", chainOnly: true,
    text: "\"Two years of it. We hold the Weir, they hold the Down, everyone holds the mud. The Marshal says one more push. He said that last spring. Kethra's envoy is at the gate with a flag.\"",
    left: { label: "One more push.", fx: { army: -10, gold: -15 }, random: [
      { chance: 0.5, fx: { army: 20, people: 10 }, next: { id: "war_kethra_4", delay: 1 } },
      { chance: 0.5, fx: { army: -15, people: -10 }, next: { id: "war_kethra_4", delay: 1 } },
    ] },
    right: { label: "Hear the flag.", fx: { people: 5 }, next: { id: "war_kethra_4", delay: 0 } },
  },
  {
    id: "war_kethra_4", char: "foreign_envoy", chainOnly: true,
    text: "\"Terms. The border where it was. Your prisoners for ours. Fifty thousand crowns, from whichever of you the Emperor's clerks decide lost. He suggests you decide first.\"",
    left: { label: "We lost. Pay.", fx: { gold: -20, army: -10, people: 10 }, removeEffect: "war", unset: ["war_kethra_war"], set: ["war_kethra_peace"], next: { id: "war_kethra_5", delay: 4 } },
    right: { label: "They lost. Collect.", fx: { army: 10 }, random: [
      { chance: 0.4, fx: { gold: 25, people: 10 }, removeEffect: "war", unset: ["war_kethra_war"], set: ["war_kethra_peace"], next: { id: "war_kethra_5", delay: 4 } },
      { chance: 0.6, fx: { army: -20, gold: -15 } },
    ] },
  },
  {
    id: "war_kethra_5", char: "foreign_king", chainOnly: true,
    text: "Tavian, at your table, eating your bread. \"Peace suits us both. We'll fight again in twenty years, when we've forgotten why not. Until then, I have a daughter and you have a throne with one seat.\"",
    left: { label: "Marry her.", fx: { gold: 30, army: 10, people: -5 }, effect: "married", set: ["court_queen_kethran"] },
    right: { label: "One seat suits me.", fx: { army: -5, faith: 5 } },
  },
  {
    id: "war_kethra_hostage_1", char: "foreign_envoy", once: true, weight: 0.8,
    text: "\"We hold your cousin Aldous. You hold the Emperor's nephew, who we're told is enjoying the cheese. A simple exchange at the bridge. Keep the nephew if you like; the Emperor has several.\"",
    left: { label: "Exchange them.", fx: { people: 5, army: 5 }, next: { id: "war_kethra_hostage_2", delay: 1 } },
    right: { label: "Keep the nephew.", fx: { gold: 20, army: -5 }, set: ["war_nephew_kept"] },
  },
  {
    id: "war_kethra_hostage_2", char: "captain", chainOnly: true,
    text: "\"The exchange went well, in that both men crossed the bridge. Cousin Aldous is home. He's brought a Kethran wife, a Kethran priest and a great many Kethran opinions about your taxes.\"",
    left: { label: "Give him a county far away.", fx: { gold: -10, people: 5 } },
    right: { label: "Send him back.", fx: { people: -5, army: 5, faith: 5, gold: 5 } },
  },
  {
    id: "war_kethra_island_1", char: "foreign_envoy",
    text: "\"The island of Gaunt. Three fishermen, a lighthouse, a goat. Your maps say Vael. Ours say Kethra. The Emperor proposes the goat decide. He's joking. He proposes you give it up.\"",
    left: { label: "Give up Gaunt.", fx: { people: -10, gold: 15, army: -5 } },
    right: { label: "Garrison the lighthouse.", fx: { gold: -10, army: 10 }, next: { id: "war_kethra_island_2", delay: 2 } },
  },
  {
    id: "war_kethra_island_2", char: "messenger", chainOnly: true,
    text: "\"Gaunt, Majesty. Kethra landed forty men. Our garrison of six surrendered honourably after breakfast. The goat has, we think, been eaten. The fishermen don't care who owns the water.\"",
    left: { label: "Take it back.", fx: { gold: -15, army: 5 }, random: [
      { chance: 0.6, fx: { army: 10, people: 10 } },
      { chance: 0.4, fx: { army: -15 }, effect: "war" },
    ] },
    right: { label: "Let them have the lighthouse.", fx: { people: -10, army: -10, gold: 15 } },
  },
  {
    id: "war_kethra_marriage_offer", char: "foreign_king", when: { notEffects: ["married"], notFlags: ["war_kethra_war"] }, once: true, weight: 0.6,
    text: "\"My daughter Livia. Twenty-two, reads, rides, hasn't poisoned anyone that I've heard of. Marry her and the border becomes a line on a map instead of a place people die. That's the whole offer.\"",
    left: { label: "Marry Livia.", fx: { gold: 15, army: 10, people: -5, faith: -5 }, effect: "married", set: ["court_queen_kethran"] },
    right: { label: "Borders are for dying on.", fx: { army: 10, gold: -5 } },
  },
  {
    id: "war_kethra_spy_gift", char: "foreign_envoy",
    text: "\"A gift from the Emperor. A clockwork nightingale. It sings at dawn. It also, our engineers admit, hears everything said in the room it sings in. He thought you'd prefer to know.\"",
    left: { label: "Keep it. Sing back.", fx: { gold: 5, army: -5 }, set: ["war_nightingale"] },
    right: { label: "Melt it.", fx: { gold: 5, faith: 3 } },
  },

  // ---------- the Whisperer ----------
  {
    id: "war_whisper_assassinate_1", char: "spymaster", when: { effects: ["spy_network"] },
    text: "A voice from the curtain. \"The Kethran Marshal drinks from one cup. A very reachable cup. This is not a proposal. Proposals are written down.\"",
    left: { label: "Reach the cup.", fx: { army: 10, faith: -10 }, random: [
      { chance: 0.6, fx: { gold: -10 }, set: ["war_kethran_marshal_dead"] },
      { chance: 0.4, fx: { people: -10 }, effect: "wanted", next: { id: "war_whisper_assassinate_2", delay: 2 } },
    ] },
    right: { label: "Kings don't poison cups.", fx: { faith: 5, army: -5 } },
  },
  {
    id: "war_whisper_assassinate_2", char: "spymaster", chainOnly: true,
    text: "\"The cup was noticed. The Emperor has hired someone to notice yours. I've replaced your taster twice. The second one is holding up. The first is not.\"",
    left: { label: "Taste nothing. Fast.", fx: { people: -5, army: -5 }, removeEffect: "wanted" },
    right: { label: "I trust my kitchens.", fx: { people: 5 }, random: [
      { chance: 0.6, fx: {} },
      { chance: 0.4, die: "poison" },
    ] },
  },
  {
    id: "war_whisper_double_1", char: "spymaster", when: { effects: ["spy_network"] },
    text: "\"The Kethran envoy's secretary sells me the Emperor's letters. Yesterday he sold me one of yours. He works for both of us or for neither. Finding out which will take time. Slowly is better.\"",
    left: { label: "Slowly.", fx: { gold: -10 }, next: { id: "war_whisper_double_2", delay: 2 } },
    right: { label: "Quickly. A knife.", fx: { army: 5, faith: -5 } },
  },
  {
    id: "war_whisper_double_2", char: "spymaster", chainOnly: true,
    text: "\"Neither. He works for the Church. The Flamekeeper has been reading your letters and the Emperor's, and judging which of you is holier. You are currently losing.\"",
    left: { label: "Feed the Flamekeeper lies.", fx: { faith: 10, gold: -5 } },
    right: { label: "Confront Osric.", fx: { faith: -15, army: 5, people: 5 } },
  },
  {
    id: "war_whisper_plot_1", char: "spymaster", when: { effects: ["spy_network"] },
    text: "\"Your brother has been buying horses. Not riding horses. Fast horses. Fast horses in four towns, all a night's ride from the palace. Until this moment I've said nothing. I am saying this.\"",
    left: { label: "Arrest Edmund.", fx: { people: -10, army: 5, gold: 10 }, set: ["war_edmund_arrested"] },
    right: { label: "Buy his horses.", fx: { gold: -15, people: 5 }, next: { id: "war_whisper_plot_2", delay: 1 } },
  },
  {
    id: "war_whisper_plot_2", char: "brother", chainOnly: true,
    text: "Duke Edmund, smiling. \"You bought my horses. All of them, above price, through a merchant who couldn't lie to a child. I take it we understand each other. I take it I'm to be watched.\"",
    left: { label: "You are.", fx: { army: 5, people: -5 } },
    right: { label: "You're to be Marshal.", fx: { army: -15, gold: 5 }, set: ["war_thorne_retired"] },
  },
  {
    id: "war_whisper_no_network", char: "spymaster", when: { notEffects: ["spy_network"] }, weight: 0.8,
    text: "\"You have no eyes in Kethra. I mention it because Kethra has eleven in here. I counted. I'd offer to buy some, but you'd ask what it costs, and I'd have to tell you.\"",
    left: { label: "What does it cost?", fx: { gold: -15 }, effect: "spy_network" },
    right: { label: "Eleven is fine.", fx: { army: -5, gold: 5 }, random: [
      { chance: 0.8, fx: {} },
      { chance: 0.2, fx: { gold: -15 }, effect: "wanted" },
    ] },
  },
  {
    id: "war_whisper_wanted", char: "spymaster", when: { effects: ["wanted"] },
    text: "\"The Guild has your name in ink. Ink can be bought back. The Guild's clerk could also simply stop writing. I have his address. I have everyone's address.\"",
    left: { label: "Buy the ink back.", fx: { gold: -15 }, removeEffect: "wanted" },
    right: { label: "Stop the clerk.", fx: { faith: -5 }, random: [
      { chance: 0.5, fx: { army: 5 }, removeEffect: "wanted" },
      { chance: 0.5, die: "assassin_blade" },
    ] },
  },

  // ---------- Executioner: prisoners ----------
  {
    id: "war_exec_prisoners", char: "executioner", when: { effects: ["war"] },
    text: "\"Three hundred Kethran prisoners, Sire. Feeding them costs a company's pay a week. Ransoming them takes a year. Not feeding them takes about nine days. I'm only saying what the numbers are.\"",
    left: { label: "Feed them. Ransom them.", fx: { gold: -15, faith: 5, army: 5 } },
    right: { label: "Nine days.", fx: { gold: 20, faith: -15, people: -10 }, set: ["war_prisoners_starved"] },
  },
  {
    id: "war_exec_warchief_1", char: "executioner", once: true,
    text: "\"We've a captured warchief in the low cells. Raghal Nine-Scars. He's asked for an axe, a witness and a clean floor. He's not asking to escape. He's asking to do it properly.\"",
    left: { label: "Give him the axe.", fx: { army: 10, faith: -10 }, next: { id: "war_exec_warchief_2", delay: 2 } },
    right: { label: "He hangs like anyone.", fx: { faith: 5 }, set: ["orc_grudge"], next: { id: "war_exec_warchief_3", delay: 2 } },
  },
  {
    id: "war_exec_warchief_2", char: "orc_warchief", chainOnly: true,
    text: "Grukhar has come himself. \"You let Raghal die his own way. He was my enemy and I hated him and you did right. Here's a horse. It's a good horse. Don't make this a thing.\"",
    left: { label: "A good horse.", fx: { army: 5, people: 5 }, set: ["orc_favor"] },
    right: { label: "Make it a treaty.", fx: { faith: -5, gold: 5 }, set: ["orc_favor"], next: { id: "war_orc_treaty", delay: 2 } },
  },
  {
    id: "war_exec_warchief_3", char: "orc_shaman", chainOnly: true,
    text: "The shaman smells of smoke. \"You hanged Raghal with a rope. Rope is for goats. His clan has sworn to hang a king with one, to see if it's different. I came to tell you they'll try.\"",
    left: { label: "Raise the walls.", fx: { gold: -15 }, effect: "high_walls" },
    right: { label: "Let them try.", fx: { army: 5 }, random: [
      { chance: 0.7, fx: { army: -10 } },
      { chance: 0.3, die: "orc_axe" },
    ] },
  },
  {
    id: "war_orc_treaty", char: "orc_envoy", chainOnly: true,
    text: "Shazza brings the treaty herself. It is one sentence long. \"You don't cross the Scar with soldiers. We don't cross it with riders. Anyone who does belongs to the crows.\"",
    left: { label: "Sign the sentence.", fx: { army: -10, people: 10, gold: 5 }, set: ["war_orc_peace"] },
    right: { label: "Add a clause about herds.", fx: { army: 5, people: -5 }, unset: ["orc_favor"] },
  },
  {
    id: "war_exec_deserter", char: "executioner",
    text: "\"A deserter. Ran from the Weir with his brother's body on his back. Walked forty miles to bury him. The Marshal wants him hanged from the church. The priest wants the church left out of it.\"",
    left: { label: "Hang him. Not from the church.", fx: { army: 10, people: -10, faith: 3 } },
    right: { label: "He buried his brother.", fx: { army: -15, people: 10 } },
  },

  // ---------- refugees, peasants ----------
  {
    id: "war_refugee_fields", char: "refugee", when: { effects: ["war"] }, weight: 2,
    text: "\"The battle was in our barley. Both sides. Then the crows. Then the men who come after the crows, who took the door. We've four children and a field of things we can't plant over.\"",
    left: { label: "Land in the south. Go.", fx: { gold: -10, people: 10 } },
    right: { label: "Plough around them.", fx: { people: -15, faith: -5, gold: 5 } },
  },
  {
    id: "war_refugee_kethran", char: "refugee",
    text: "\"We're Kethran, Your Majesty. From Harrow. Your Marshal burned it, which we understand was tactical. We've walked here because the other way is also on fire. We can build. We can dig.\"",
    left: { label: "Take them in.", fx: { people: -10, gold: 15, faith: 5 } },
    right: { label: "Back over the border.", fx: { people: 5, army: 5, faith: -10 } },
  },
  {
    id: "war_refugee_camp", char: "refugee", when: { effects: ["war"] },
    text: "\"Four thousand of us under the east wall. The guards throw bread over. The Church throws pamphlets. Something's going round the tents that isn't either.\"",
    left: { label: "Doctors. Now.", fx: { gold: -15, people: 5 } },
    right: { label: "Move the camp downriver.", fx: { people: -10 }, random: [
      { chance: 0.7, fx: {} },
      { chance: 0.3, fx: { people: -10 }, effect: "plague" },
    ] },
  },
  {
    id: "war_peasant_conscript", char: "peasant", weight: 2,
    text: "\"Took my two eldest for the levy. Left me the one who can't count and the one who can't be counted on. Harvest's in three weeks. I'm not complaining, your worship. I'm describing.\"",
    left: { label: "Send one back.", fx: { army: -10, people: 10 } },
    right: { label: "Harvest with what you've got.", fx: { people: -10, army: 5, gold: 10 } },
  },
  {
    id: "war_peasant_billet", char: "peasant", weight: 2,
    text: "\"Sixty soldiers billeted in my barn. They've eaten the pig and named the cow. The sergeant says it's for the good of the realm. The cow's called Marjorie now. She wasn't before.\"",
    left: { label: "Pay for the pig.", fx: { gold: -10, people: 10 } },
    right: { label: "Marjorie's a fine name.", fx: { people: -10, army: 5, gold: 5 } },
  },
  {
    id: "war_peasant_widows", char: "peasant", when: { flags: ["war_pensions_refused"] },
    text: "\"Eleven widows in Marl, and the soldiers' pensions didn't come. They've stopped going to the Flame. They go up the hill instead, where the old stones are. The priest's frightened of them.\"",
    left: { label: "Pay the pensions.", fx: { gold: -15, people: 10, faith: 5 }, unset: ["war_pensions_refused"] },
    right: { label: "Let them go up the hill.", fx: { faith: -15, people: 5, gold: 5 } },
  },
  {
    id: "war_peasant_victory_bells", char: "peasant", when: { flags: ["war_kethra_peace"] }, once: true,
    text: "\"Bells rang for the peace. Rang all day. My lad came home from the Weir with one arm, and the bells were ringing then too, so he thought they were for him. Let him think it.\"",
    left: { label: "They were for him.", fx: { people: 10, gold: -5 } },
    right: { label: "Bells cost money. Stop them.", fx: { gold: 5, people: -10 } },
  },

  // ---------- Captain Sable ----------
  {
    id: "war_sable_1", char: "pirate", weight: 0.8,
    text: "Captain Sable smells of tar and lemons. \"Kethra's grain comes by sea. I can make it not. Ships burn nicely. All I want is a letter saying I'm yours when I'm caught, and a fifth.\"",
    left: { label: "A letter and a fifth.", fx: { army: 10, gold: 15, faith: -10 }, set: ["war_sable_ally"], next: { id: "war_sable_2", delay: 3 } },
    right: { label: "No pirates.", fx: { army: -5 }, set: ["war_sable_spurned"] },
  },
  {
    id: "war_sable_2", char: "pirate", chainOnly: true,
    text: "\"Burned nine grain ships. Sank a warship by accident. Also, and this is the awkward bit, took a Vaelish merchantman. Flags look alike at dusk. I'll give back what's left of the crew.\"",
    left: { label: "Give back the crew and the cargo.", fx: { people: 10, gold: -10, army: 5 } },
    right: { label: "Flags look alike. Keep it.", fx: { gold: 20, people: -15 }, next: { id: "war_sable_3", delay: 2 } },
  },
  {
    id: "war_sable_3", char: "merchant", chainOnly: true,
    text: "Guildmaster Crane, white with fury. \"Your pirate took the Fair Wind and you split the cargo. Every captain in the harbour knows. Half of them are flying Kethran flags now. Out of a sense of humour.\"",
    left: { label: "Hang Sable.", fx: { gold: 20, army: -10 }, unset: ["war_sable_ally"], set: ["war_sable_spurned"] },
    right: { label: "Fine them for the flags.", fx: { gold: 20, people: -15 } },
  },
  {
    id: "war_sable_enemy", char: "pirate", when: { flags: ["war_sable_spurned"] },
    text: "Sable, in chains, still smiling. \"Kethra hired me after you didn't. I took your salt fleet. Then I got caught, which is on me. You can hang me or hire me. I'm the same person either way.\"",
    left: { label: "Hang her.", fx: { people: 10, faith: 5, gold: -5 } },
    right: { label: "Hire her.", fx: { army: 10, faith: -10, gold: 10 }, set: ["war_sable_ally"], unset: ["war_sable_spurned"] },
  },
  {
    id: "war_sable_voyage", char: "pirate", when: { flags: ["war_sable_ally"] },
    text: "\"Come aboard. One night. Kethran coast, a lit harbour, a lot of very surprised people. Kings should see a burning fleet once. It changes how you sign things.\"",
    left: { label: "Stay dry.", fx: { army: -5 } },
    right: { label: "Come aboard.", fx: { army: 10 }, random: [
      { chance: 0.55, fx: { people: 5, gold: 10 } },
      { chance: 0.25, die: "lost_at_sea" },
      { chance: 0.2, die: "drowned" },
    ] },
  },
  {
    id: "war_sable_navy", char: "pirate", when: { flags: ["war_sable_ally"] }, once: true,
    text: "\"You haven't got a navy. You've got me and eleven ships that were someone else's. Make it official. Admiral Sable. I'd wear the hat. I'd also stop robbing you, mostly.\"",
    left: { label: "Admiral Sable.", fx: { army: 15, gold: -15, faith: -5, people: 5 } },
    right: { label: "You're a pirate.", fx: { army: -5, gold: 10 } },
  },

  // ---------- Ombrun the giant ----------
  {
    id: "war_ombrun_1", char: "giant", once: true,
    text: "Ombrun sits outside; the doors don't allow for him. \"Your Marshal asked me to fight. I said what for. He said the king. I said the king can ask himself.\" He waits, the size of weather.",
    left: { label: "Fight for me, Ombrun.", fx: { army: 15, gold: -10 }, next: { id: "war_ombrun_2", delay: 2 } },
    right: { label: "Go home. Sorry he asked.", fx: { army: -5, people: 5, gold: 5 } },
  },
  {
    id: "war_ombrun_2", char: "giant", chainOnly: true,
    text: "\"I fought. I put my foot down and eleven men were under it. They didn't say there'd be men there. They were very small.\" He's been crying, which takes a while. \"I'm going home now.\"",
    left: { label: "Stay. One more battle.", fx: { army: 10 }, random: [
      { chance: 0.7, fx: { people: -5 } },
      { chance: 0.3, die: "stepped_on_by_giant" },
    ] },
    right: { label: "Go home, Ombrun.", fx: { army: -15, faith: 5 } },
  },
  {
    id: "war_ombrun_wall", char: "giant", weight: 0.6,
    text: "\"I don't fight. But I can lift. Your wall's got a gap where the river goes under. I could put a rock in it. A big rock. Then I'd like to be left alone for about ten years.\"",
    left: { label: "A big rock.", fx: { gold: -10 }, effect: "high_walls" },
    right: { label: "We'll manage the gap.", fx: { army: -5, gold: 5 } },
  },

  // ---------- arms suppliers ----------
  {
    id: "war_elf_bows", char: "elf_ranger", weight: 0.8,
    text: "The ranger doesn't come in past the threshold. \"Two hundred longbows. Yew from the Thornwood. They'll outrange anything Kethra owns. The price is that you don't ask where the yew came from.\"",
    left: { label: "Don't ask. Buy.", fx: { gold: -15, army: 15 }, random: [
      { chance: 0.7, fx: {} },
      { chance: 0.3, fx: { people: -10 }, set: ["elf_grudge"] },
    ] },
    right: { label: "Where did the yew come from?", fx: { army: -5, faith: 5, gold: 5 } },
  },
  {
    id: "war_dwarf_steel", char: "dwarf_smith", weight: 0.8,
    text: "\"Deep Hold steel. Blades that don't notch, mail that doesn't rust. Delivered by spring. Paid by winter. Late payment is a clause you don't want me to read out.\"",
    left: { label: "Order the steel.", fx: { army: 15, gold: -20 }, set: ["war_dwarf_steel_owed"], next: { id: "war_dwarf_steel_due", delay: 3 } },
    right: { label: "Our smiths are fine.", fx: { army: -5, people: 5, gold: 10 } },
  },
  {
    id: "war_dwarf_steel_due", char: "dwarf_smith", chainOnly: true,
    text: "\"Winter. The steel's in your armoury; the gold isn't in my ledger. I'll read the clause. 'Unpaid steel remains dwarven property, wherever it currently is, including in whom.'\"",
    left: { label: "Pay. Every coin.", fx: { gold: -15, army: 5 }, unset: ["war_dwarf_steel_owed"] },
    right: { label: "Come and get it.", fx: { army: -15 }, set: ["dwarf_grudge"], random: [
      { chance: 0.7, fx: { gold: -10 } },
      { chance: 0.3, die: "dwarven_contract" },
    ] },
  },

  // ---------- diplomacy, misc ----------
  {
    id: "war_envoy_insult", char: "foreign_envoy",
    text: "\"The Emperor sends greetings and this.\" A small box. Inside, a dead sparrow wearing a paper crown. \"He says it is a Kethran custom. It isn't. I looked it up before I came.\"",
    left: { label: "Send back a dead eagle.", fx: { army: 10, gold: -10, people: 5 }, random: [
      { chance: 0.7, fx: {} },
      { chance: 0.3, effect: "war" },
    ] },
    right: { label: "Thank him for the bird.", fx: { army: -10, gold: 10 } },
  },
  {
    id: "war_treasurer_cost", char: "treasurer", when: { effects: ["war"] }, weight: 2,
    text: "Odile Penn lays down one sheet. \"The war, this year. In grain, that is the winter. In silver, that is the roof of the cathedral. In men, I don't count men. Someone should.\"",
    left: { label: "Raise a war tax.", fx: { gold: 20, people: -15 } },
    right: { label: "Sell the cathedral roof.", fx: { gold: 20, faith: -20 } },
  },
  {
    id: "war_chancellor_peace", char: "chancellor", when: { effects: ["war"] },
    text: "\"I have drafted a peace. I've drafted one every year, in case. It says nothing happened and no one owes an apology. Kethra will sign it. So would the Marshal, if you signed first and held his hand.\"",
    left: { label: "Sign it.", fx: { people: 10, army: -15, gold: 15 }, removeEffect: "war", unset: ["war_kethra_war"] },
    right: { label: "Burn the draft.", fx: { army: 10, people: -5 } },
  },
  {
    id: "war_flamekeeper_blessing", char: "flamekeeper", when: { effects: ["war"] },
    text: "Osric, hands folded over his stomach. \"The Flame blesses your war. Formally. In writing. For a consideration, of course; blessings cost oil. Unblessed wars lose. The records are quite clear.\"",
    left: { label: "Pay for the blessing.", fx: { gold: -15, faith: 10, army: 5 } },
    right: { label: "Swords don't need oil.", fx: { faith: -15, army: 5, gold: 5 } },
  },
  {
    id: "war_bard_song", char: "bard",
    text: "\"I've written a song about the Weir. It's very moving. Everyone dies in it, heroically, in the right order. The Marshal wants two verses cut. They're the ones about the Marshal.\"",
    left: { label: "Cut them.", fx: { army: 10, people: -5 } },
    right: { label: "Sing it all.", fx: { people: 10, army: -10 } },
  },
  {
    id: "war_veterans_march", char: "peasant", when: { flags: ["war_pensions_refused"] }, once: true,
    text: "\"Two thousand old soldiers on the north road, walking on what they've got left. They're not armed. They're not asking. They're just walking towards the palace, slowly, and singing.\"",
    left: { label: "Pay them at the gate.", fx: { gold: -20, army: 10, people: 10 }, unset: ["war_pensions_refused"] },
    right: { label: "Close the gate.", fx: { people: -15, gold: 10 }, random: [
      { chance: 0.6, fx: { army: -15 } },
      { chance: 0.4, die: "torn_by_mob" },
    ] },
  },
  {
    id: "war_ghost_king", char: "ghost", when: { effects: ["war"] }, once: true, weight: 0.5,
    text: "A dead king in your father's chair. \"I had a war with Kethra. Won it, mostly. Cost me both sons and the west. It's on a plaque in the Marshal's hall. The plaque has never once been read.\"",
    left: { label: "What did you win?", fx: { faith: 5, army: -5 } },
    right: { label: "I'll read the plaque.", fx: { people: 5 } },
  },
  {
    id: "war_jester_map", char: "jester",
    text: "Pib has stolen the Marshal's map and coloured all of it Vaelish. \"There. Won. Same map, no funerals. I've done in an afternoon what he's done nothing about in ten years.\"",
    left: { label: "Give it back to the Marshal.", fx: { army: 5, people: -3 } },
    right: { label: "Frame it.", fx: { people: 10, army: -10 } },
  },
  {
    id: "war_mother_peace", char: "mother", when: { effects: ["war"] }, once: true,
    text: "The Dowager doesn't ask to see you. She's in your chair. \"Your father had this war. I buried him with it. Stop it before I'm burying you with it, or after, I suppose. Your choice.\"",
    left: { label: "I'll stop it.", fx: { army: -15, people: 10 }, removeEffect: "war", unset: ["war_kethra_war"] },
    right: { label: "Father would understand.", fx: { army: 5, people: -5 } },
  },
  {
    id: "war_healer_wounded", char: "healer", when: { effects: ["war"] },
    text: "Amaury, sleeves red. \"Six hundred wounded in the tiltyard. Four surgeons and a theory about maggots. The theory is holding up. The surgeons aren't.\"",
    left: { label: "Hire every barber in the city.", fx: { gold: -15, army: 10, people: 5 } },
    right: { label: "Trust the maggots.", fx: { army: -15, faith: 3, gold: 5 } },
  },
  {
    id: "war_elf_neutral", char: "elf_envoy", when: { effects: ["war"] }, once: true,
    text: "Lord Cael inspects a painting of your victory. \"Greenreach remains neutral, naturally. We have watched eleven of your wars with Kethra. They are all the same war. Do let us know who wins this one.\"",
    left: { label: "Lend us archers.", fx: { gold: -15 }, random: [
      { chance: 0.4, fx: { army: 15 }, set: ["elf_favor"] },
      { chance: 0.6, fx: { army: -5, people: -5 } },
    ] },
    right: { label: "We will.", fx: { faith: 3, army: -3, gold: 5 } },
  },
  {
    id: "war_goblin_arms", char: "goblin", when: { effects: ["war"] },
    text: "Nizzik has crossbows. Lots. \"Fell off a Kethran wagon. Then off a second wagon. Very unlucky wagons. Half price, no questions, and I'll be selling to the other side next week, so hurry.\"",
    left: { label: "Buy the lot.", fx: { gold: -10, army: 10, faith: -5 } },
    right: { label: "Sell to Kethra, then.", fx: { army: -10, gold: 10 } },
  },
];
