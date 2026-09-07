// Monsters, the uncanny and the wild: Vorrath the Old, the troll's bridge,
// Ombrun, Lady Thistlewick, Count Vesper, the Thornwood pack, Nizzik, the
// cellar rats, Biscuit, the dead kings, the Quiet Hands, and the weather.
// Flags/ids prefixed mon_ (except dragon_dead / dragon_friend, which the
// engine reads for objectives).
export default [
  // ---------- Vorrath the Old ----------
  {
    id: "mon_dragon_arrives", char: "dragon", once: true, weight: 1.5,
    when: { notFlags: ["dragon_dead"], minYear: 4 },
    text: "The shadow over the east pasture is not a cloud. It lands. It takes a while. \"I. Am. Vorrath. Your grandfather. Paid me. You. Have not.\"",
    left: { label: "Paid you what?", fx: { army: -5 }, next: { id: "mon_dragon_terms", delay: 0 } },
    right: { label: "Archers.", fx: { army: 5 }, next: { id: "mon_dragon_archers", delay: 0 } },
  },
  {
    id: "mon_dragon_archers", char: "dragon", chainOnly: true,
    text: "The arrows go in about a finger's width and stay there, like a beard. He does not look down. \"I. Will. Wait. Until. You. Are. Finished.\"",
    left: { label: "We're finished.", fx: { army: -10 }, next: { id: "mon_dragon_terms", delay: 0 } },
    right: { label: "Keep shooting.", fx: { army: -20 }, random: [
      { chance: 0.6, fx: { army: -20, people: -10 }, next: { id: "mon_dragon_terms", delay: 0 } },
      { chance: 0.4, die: "eaten_by_dragon" },
    ] },
  },
  {
    id: "mon_dragon_terms", char: "dragon", chainOnly: true,
    text: "\"A. Fifth. Of the gold. Every year. In return. I do not. Eat. Anything. With a. Name.\" He waits. Waiting is a thing he does very well.",
    left: { label: "A fifth. Fine.", fx: { gold: -15, people: 5 }, effect: "dragon_tax", set: ["mon_dragon_paying"], next: { id: "mon_dragon_collect", delay: 3 } },
    right: { label: "No.", fx: { army: 5, gold: 5 }, set: ["mon_dragon_refused"], next: { id: "mon_dragon_refused_1", delay: 2 } },
  },
  {
    id: "mon_dragon_refused_1", char: "peasant", chainOnly: true,
    text: "Hob Tanner, of what was Millbrook. \"He ate the mill. Not the miller, sire, he was very clear about that. Just the mill. He said to tell you it had a name. It was called The Mill.\"",
    left: { label: "Pay him.", fx: { gold: -20 }, effect: "dragon_tax", unset: ["mon_dragon_refused"], set: ["mon_dragon_paying"], next: { id: "mon_dragon_collect", delay: 3 } },
    right: { label: "Find me a slayer.", fx: { gold: -10, army: 5 }, next: { id: "mon_dragon_slayer_offer", delay: 2 } },
  },
  {
    id: "mon_dragon_collect", char: "dragon", chainOnly: true, when: { effects: ["dragon_tax"] },
    text: "He lands on the treasury roof, which holds, barely. \"You. Rounded. Down.\" Mistress Penn, from the doorway, says she did no such thing. Vorrath produces a coin. Wrong coin.",
    left: { label: "Pay the difference.", fx: { gold: -10 }, next: { id: "mon_dragon_talk", delay: 3 } },
    right: { label: "It's a fifth. Count again.", fx: { gold: 5 }, random: [
      { chance: 0.7, fx: { army: 5 }, next: { id: "mon_dragon_talk", delay: 3 } },
      { chance: 0.3, fx: { gold: -25, people: -10 }, next: { id: "mon_dragon_talk", delay: 3 } },
    ] },
  },
  {
    id: "mon_dragon_talk", char: "dragon", chainOnly: true, when: { effects: ["dragon_tax"] },
    text: "He has stayed after collecting. He does not usually. \"Your. Grandfather. Asked me. Once. What I do. With it.\" A pause the length of a sermon. \"Nothing. I like. Having it.\"",
    left: { label: "I understand that.", fx: { people: -5 }, set: ["mon_dragon_talked"], next: { id: "mon_dragon_offer", delay: 4 } },
    right: { label: "Then it's wasted on you.", fx: { army: 5, gold: -10 }, next: { id: "mon_dragon_slayer_offer", delay: 3 } },
  },
  {
    id: "mon_dragon_offer", char: "dragon", chainOnly: true, when: { effects: ["dragon_tax"] },
    text: "\"The orcs. Are gathering. At the Scar. You did not. Know.\" He shifts a wing; the stable roof goes. \"I would. Sit. On your northern border. For the fifth. And no more. A friend. Costs. The same.\"",
    left: { label: "Sit on the north.", fx: { army: 15, faith: -10 }, set: ["dragon_friend"], next: { id: "mon_dragon_friend_1", delay: 5 } },
    right: { label: "Stay out of my wars.", fx: { army: -5 }, next: { id: "mon_dragon_collect", delay: 4 } },
  },
  {
    id: "mon_dragon_friend_1", char: "orc_envoy", chainOnly: true,
    text: "Shazza, with no escort and very little patience. \"There is a dragon asleep on the Scar. Our raiders climbed him, thinking he was a hill. He has asked us to leave. Politely. Tell him we have left.\"",
    left: { label: "I'll tell him.", fx: { army: 10, people: 10 }, next: { id: "mon_dragon_friend_2", delay: 6 } },
    right: { label: "Tell him yourself.", fx: { army: 5, faith: -5 }, set: ["orc_grudge"], next: { id: "mon_dragon_friend_2", delay: 6 } },
  },
  {
    id: "mon_dragon_friend_2", char: "dragon", chainOnly: true,
    text: "\"I have. Been thinking. Since spring. About. Whether you. Are my friend. Or my. Tenant.\" He blinks; you feel it in the floor. \"It matters. For the will.\"",
    left: { label: "Friend.", fx: { faith: -10, gold: -10 }, next: { id: "mon_dragon_will", delay: 8 } },
    right: { label: "Tenant. Honestly.", fx: { gold: 15, army: -5 }, next: { id: "mon_dragon_collect", delay: 4 } },
  },
  {
    id: "mon_dragon_will", char: "dragon", chainOnly: true, when: { flags: ["dragon_friend"], notFlags: ["dragon_dead"] },
    text: "He is greyer. Something in the breathing. \"I am. Not. Dying. Dragons don't.\" A cough that fells a tree. \"But if. I were. The hoard. Is under. Cinder Tor. Do not. Let the dwarves. Count it.\"",
    left: { label: "I won't.", fx: { faith: 5 }, set: ["mon_dragon_hoard_known"], next: { id: "mon_dragon_hoard", delay: 10 } },
    right: { label: "Sit with him.", fx: { people: -5, gold: -5 }, effect: "love", set: ["mon_dragon_hoard_known"], next: { id: "mon_dragon_hoard", delay: 10 } },
  },
  {
    id: "mon_dragon_hoard", char: "dwarf_thane", chainOnly: true,
    text: "\"Cinder Tor. We are aware what's under it. We are aware of your arrangement. We propose to count it as a courtesy. The counting fee is standard.\" Borri slides a page across. The page is long.",
    left: { label: "It stays uncounted.", fx: { gold: 5, army: 10, faith: 5 }, set: ["dwarf_grudge"] },
    right: { label: "Count it. Split it.", fx: { gold: 25, faith: -10 }, removeEffect: "dragon_tax", unset: ["dragon_friend"], set: ["mon_dragon_betrayed"], next: { id: "mon_dragon_betrayed", delay: 1 } },
  },
  {
    id: "mon_dragon_betrayed", char: "dragon", chainOnly: true,
    text: "He is on the roof of the great hall. The great hall is not designed for this. \"I. Keep. My word. It is. The one thing. I do.\" He is not talking about himself.",
    left: { label: "I can explain.", fx: {}, die: "eaten_by_dragon" },
    right: { label: "Run.", fx: { army: -20, people: -15 }, random: [
      { chance: 0.5, fx: { army: -20, people: -20, gold: -20 }, next: { id: "mon_dragon_slayer_offer", delay: 1 } },
      { chance: 0.5, die: "eaten_by_dragon" },
    ] },
  },
  {
    id: "mon_dragon_slayer_offer", char: "knight", chainOnly: true, when: { notFlags: ["dragon_dead"] },
    text: "Sir Gavriel has read the old accounts. \"Dragons have a soft place under the left forelimb. The accounts disagree on which side is left. Forty men, paid in advance.\"",
    left: { label: "Forty men. Advance.", fx: { gold: -25, army: -10 }, next: { id: "mon_dragon_slayer_fight", delay: 2 } },
    right: { label: "Pay them after.", fx: { army: -15 }, next: { id: "mon_dragon_slayer_fight", delay: 2 } },
  },
  {
    id: "mon_dragon_slayer_fight", char: "messenger", chainOnly: true,
    text: "The rider hasn't dismounted. \"Sir Gavriel got under him, Majesty. Then the dragon sat down. Sir Gavriel is... he was right about the side, if that's a comfort. Vorrath's coming here. Slowly.\"",
    left: { label: "Every man on the walls.", fx: { army: -15, people: -10 }, random: [
      { chance: 0.5, fx: { army: 15, people: 20, faith: 10 }, set: ["dragon_dead"], removeEffect: "dragon_tax", next: { id: "mon_dragon_dead_1", delay: 1 } },
      { chance: 0.5, die: "eaten_by_dragon" },
    ] },
    right: { label: "Open the treasury doors.", fx: { gold: -30, army: -10 }, effect: "dragon_tax", next: { id: "mon_dragon_collect", delay: 3 } },
  },
  {
    id: "mon_dragon_dead_1", char: "treasurer", chainOnly: true,
    text: "\"He is dead. It took nine hundred arrows and Sir Gavriel and the west tower.\" Mistress Penn does not sit. \"The body is on the cathedral. The Flamekeeper wants to know if it's a relic or a mess.\"",
    left: { label: "A relic. Charge admission.", fx: { gold: 25, faith: -10 } },
    right: { label: "Bury it with Gavriel.", fx: { faith: 10, army: 10, gold: -15 } },
  },
  {
    id: "mon_dragon_ignored", char: "peasant", weight: 1.5, when: { flags: ["mon_dragon_refused"], notFlags: ["dragon_dead"], notEffects: ["dragon_tax"] },
    text: "\"Sire, he's eaten the granary at Fenmarch. He asked first. He asked the granary. Then he waited a bit and said it hadn't objected.\" The farmer looks at his hat. \"That's the third one.\"",
    left: { label: "Rebuild it. Stone.", fx: { gold: -15, people: 5 } },
    right: { label: "Stop naming granaries.", fx: { people: -15, army: 5, gold: 10 } },
  },

  // ---------- the troll and the bridge ----------
  {
    id: "mon_troll_toll", char: "troll", weight: 2,
    text: "\"Bridge is mine. Always was. Toll's a penny a foot, two for a hoof, a shilling for anything wearing a crown.\" He has clearly been waiting years to say the last part.",
    left: { label: "Pay the shilling.", fx: { gold: -5, people: 5 } },
    right: { label: "It's my bridge.", fx: { army: 5, gold: 5 }, set: ["mon_troll_grudge"], next: { id: "mon_troll_argue", delay: 1 } },
  },
  {
    id: "mon_troll_argue", char: "troll", chainOnly: true,
    text: "\"Your bridge.\" He puts a hand flat on the keystone. It sinks in an inch. \"I was under it when they laid this. I held it up for the mortar. Whose bridge.\"",
    left: { label: "...Yours.", fx: { army: -10, gold: -5 }, unset: ["mon_troll_grudge"] },
    right: { label: "Cross anyway.", fx: {}, random: [
      { chance: 0.6, fx: { army: 10, people: -5 } },
      { chance: 0.4, die: "troll_toll" },
    ] },
  },
  {
    id: "mon_troll_merchants", char: "merchant", weight: 2, when: { notFlags: ["mon_troll_gone"] },
    text: "\"The Guild has calculated the troll's toll at four percent of everything crossing the Vael. That is more than the Church takes, Majesty, and at least the Church doesn't eat the odd mule.\"",
    left: { label: "Build a second bridge.", fx: { gold: -20, people: 10 }, next: { id: "mon_troll_second_bridge", delay: 3 } },
    right: { label: "Four percent's fair.", fx: { gold: 10, people: -10 } },
  },
  {
    id: "mon_troll_second_bridge", char: "troll", chainOnly: true,
    text: "He's sitting under the new bridge. \"Moved in Tuesday. Nice. Dry.\" He picks something out of a tooth; it's a surveyor's chain. \"Toll's the same. Two bridges now. Twice the toll.\"",
    left: { label: "Burn both.", fx: { people: -20, gold: -10 }, set: ["mon_troll_gone"] },
    right: { label: "Hire him as toll-keeper.", fx: { gold: 15, army: -5 }, set: ["mon_troll_employed"], next: { id: "mon_troll_employed", delay: 4 } },
  },
  {
    id: "mon_troll_employed", char: "troll", chainOnly: true,
    text: "The Crown's Bridge-Warden reports. \"Took four hundred pennies, nine shillings, a goat, and a man who tried to argue. The man's fine. Gave him back. Mostly.\" He wants a hat with the job.",
    left: { label: "A hat. Big one.", fx: { gold: 15, people: 5 } },
    right: { label: "No hat. Fewer goats.", fx: { gold: 20, people: -10 } },
  },

  // ---------- Ombrun the giant ----------
  {
    id: "mon_giant_intro", char: "giant", once: true, weight: 1.5,
    text: "He kneels, which takes down the gatehouse. \"Sorry. Sorry. Ombrun. From the hills. I stepped on a village. Empty one. I checked after. Sorry.\" He is crying, which floods the courtyard.",
    left: { label: "Which village?", fx: { people: -10 }, set: ["mon_giant_met"], next: { id: "mon_giant_village", delay: 0 } },
    right: { label: "Go home. Carefully.", fx: { people: 5, army: -5 }, set: ["mon_giant_met"] },
  },
  {
    id: "mon_giant_village", char: "giant", chainOnly: true,
    text: "\"The one with the... hmm. The wall.\" He thinks. Birds land on him. \"I could build it back. I'm good at big things. Bad at small ones.\" He holds up his hands. They are the size of carts.",
    left: { label: "Build it back.", fx: { gold: 5 }, random: [
      { chance: 0.6, fx: { people: 15 }, set: ["mon_giant_helpful"] },
      { chance: 0.4, fx: { people: -15 } },
    ] },
    right: { label: "Just pay for it.", fx: { gold: 20, people: -5 } },
  },
  {
    id: "mon_giant_work", char: "giant", weight: 1.5, when: { flags: ["mon_giant_met"] },
    text: "\"They said you were building a wall. In the north.\" Ombrun has brought a rock. Most of a hillside, really. \"I brought a rock.\" The road behind him is no longer a road.",
    left: { label: "Put it on the wall.", fx: { army: 10, gold: 15, people: -10 } },
    right: { label: "Put it back.", fx: { people: 5, army: -5 } },
  },
  {
    id: "mon_giant_hug", char: "giant", when: { flags: ["mon_giant_helpful"] }, weight: 1.5,
    text: "He has learned about birthdays and believes it is yours. He's coming across the courtyard with his arms open. Captain Rook is shouting something. Ombrun can't hear him over his own happiness.",
    left: { label: "Stand still.", fx: {}, random: [
      { chance: 0.75, fx: { people: 10, army: -5 } },
      { chance: 0.25, die: "stepped_on_by_giant" },
    ] },
    right: { label: "Dive.", fx: { people: -5, army: 5 } },
  },
  {
    id: "mon_giant_petition", char: "peasant", when: { flags: ["mon_giant_met"] },
    text: "\"The giant's lovely, sire, we all say so. It's the sneezing. He sneezed at Harrow and the church steeple's in the next parish. The next parish wants to keep it.\"",
    left: { label: "Move Ombrun to the hills.", fx: { people: 10, army: -5, gold: -10 } },
    right: { label: "Steeple stays where it landed.", fx: { faith: -10, people: 5, gold: 15 } },
  },

  // ---------- Lady Thistlewick of the fae ----------
  {
    id: "mon_fae_intro", char: "fae", once: true, weight: 1.5,
    text: "She's the height of a child and older than the hill under the palace. \"Lady Thistlewick. Your gardeners cut a hawthorn. Under the terms, that's a debt. How would you like to pay it?\"",
    left: { label: "What terms?", fx: { faith: -5 }, next: { id: "mon_fae_terms", delay: 0 } },
    right: { label: "Plant another.", fx: { gold: -5, people: 3 }, set: ["mon_fae_met"], next: { id: "mon_fae_wish", delay: 5 } },
  },
  {
    id: "mon_fae_terms", char: "fae", chainOnly: true,
    text: "\"The ones your first king agreed to. He said 'anything you like, just leave us be.' Anything. He did say it. I wrote it down.\" She has. On something that used to be a leaf.",
    left: { label: "Name a price.", fx: {}, set: ["mon_fae_met"], next: { id: "mon_fae_price", delay: 0 } },
    right: { label: "I'm not him.", fx: { faith: 5, people: -10 }, set: ["mon_fae_met", "mon_fae_insulted"], next: { id: "mon_fae_wish", delay: 3 } },
  },
  {
    id: "mon_fae_price", char: "fae", chainOnly: true,
    text: "\"A year. Not one of yours, one of mine. You'll have it back, of course, we're not thieves. It'll simply be a year you don't remember.\" She holds out a small hand. \"Or the firstborn. Traditional.\"",
    left: { label: "A year.", fx: { people: -10, army: -10, gold: -10 }, next: { id: "mon_fae_wish", delay: 4 } },
    right: { label: "Firstborn.", fx: { faith: -15, people: -20, gold: 15 }, set: ["mon_fae_took_heir"], next: { id: "mon_fae_heir", delay: 8 } },
  },
  {
    id: "mon_fae_heir", char: "prince", chainOnly: true,
    text: "The boy who walks into court is the right age and has your nose. He knows things about the palace only the prince would know. He also knows things no one should. He calls Wendel by his mother's name.",
    left: { label: "Welcome home.", fx: { people: 10, faith: -10 }, set: ["mon_fae_changeling"] },
    right: { label: "That isn't my son.", fx: { people: -10, army: 5, gold: 5 }, set: ["mon_fae_insulted"] },
  },
  {
    id: "mon_fae_wish", char: "fae", chainOnly: true, when: { flags: ["mon_fae_met"] },
    text: "\"I owe you a small courtesy, for the hawthorn business. One wish. Say it plainly. I'll do exactly that.\" She smiles. Her teeth are exactly the same as yours, which is worse.",
    left: { label: "A full treasury.", fx: { gold: 30 }, next: { id: "mon_fae_wish_gold", delay: 1 } },
    right: { label: "No more war.", fx: { army: -25, people: 10 }, next: { id: "mon_fae_wish_peace", delay: 1 } },
  },
  {
    id: "mon_fae_wish_gold", char: "treasurer", chainOnly: true,
    text: "\"The treasury is full, Majesty. To the ceiling. The coins are real. They are also every coin in the kingdom; there's nothing left in anyone's purse. The bakers are asking what we'd like them to do.\"",
    left: { label: "Give it back.", fx: { gold: -20, people: 15 } },
    right: { label: "Keep it.", fx: { people: -25, army: -10, gold: 10 } },
  },
  {
    id: "mon_fae_wish_peace", char: "general", chainOnly: true,
    text: "Marshal Thorne, without a sword. Nobody has one. \"Every blade in the kingdom's gone soft, Sire. Like bread. The orcs' too. They've sent a letter. They're very angry and holding loaves.\"",
    left: { label: "Peace is peace.", fx: { people: 10, faith: 5, gold: 10 } },
    right: { label: "Get her to undo it.", fx: { army: 15, gold: -15 }, set: ["mon_fae_insulted"] },
  },
  {
    id: "mon_fae_bargain", char: "fae", when: { flags: ["mon_fae_met"] }, weight: 1.5,
    text: "\"A game. I say a thing, you say if it's true. Guess right and I'm your creature for a year. Guess wrong and you're mine. The thing is: your Chancellor is not a man.\"",
    left: { label: "True.", fx: {}, random: [
      { chance: 0.5, fx: { army: 15, gold: 15, faith: -10 } },
      { chance: 0.5, die: "fae_bargain" },
    ] },
    right: { label: "I don't play.", fx: { faith: 5, people: -5 } },
  },
  {
    id: "mon_fae_insulted", char: "fae", chainOnly: true, when: { flags: ["mon_fae_insulted"] },
    text: "\"You've been rude twice. We keep count.\" Every clock in the palace has stopped. Every mirror shows the room from the wrong side. \"A gift, and you'll take it. All your milk is now honey. Forever.\"",
    left: { label: "Apologize.", fx: { faith: -5, people: 5 }, unset: ["mon_fae_insulted"] },
    right: { label: "I like honey.", fx: { people: -15, gold: 20 } },
  },

  // ---------- Count Vesper ----------
  {
    id: "mon_vamp_intro", char: "vampire", once: true, weight: 1.5, when: { minYear: 3 },
    text: "He waits at the door though the door is open. \"Count Vesper, of the Grey House. I have been your neighbor for six hundred years and never once been asked in. It's begun to feel pointed.\"",
    left: { label: "Come in.", fx: { faith: -15, people: 5 }, set: ["mon_vamp_invited"], next: { id: "mon_vamp_dinner", delay: 2 } },
    right: { label: "Stay there.", fx: { faith: 10 }, set: ["mon_vamp_met"], next: { id: "mon_vamp_villagers", delay: 3 } },
  },
  {
    id: "mon_vamp_villagers", char: "peasant", chainOnly: true,
    text: "\"It's Coldwater, sire. Eleven gone since autumn. No bodies. No blood. Just beds slept in and not got out of.\" She twists her apron. \"The Count sends flowers to the families. Nice ones.\"",
    left: { label: "Burn the Grey House.", fx: { faith: 10, army: -10 }, next: { id: "mon_vamp_burn", delay: 1 } },
    right: { label: "Ask the Count to dinner.", fx: { people: -10, faith: -5 }, set: ["mon_vamp_invited"], next: { id: "mon_vamp_dinner", delay: 1 } },
  },
  {
    id: "mon_vamp_burn", char: "captain", chainOnly: true,
    text: "Rook is grey. \"We burned it. He was in it. He came out of it. Said the drapes were four centuries old and he'd like the cost taken from our wages. Then he tipped his hat, Sire. To the men.\"",
    left: { label: "Pay for the drapes.", fx: { gold: -10, army: 5 }, set: ["mon_vamp_met"] },
    right: { label: "Stakes. Garlic. Everyone.", fx: { faith: 10, gold: -10, people: -5 }, set: ["mon_vamp_hunted"], next: { id: "mon_vamp_visit", delay: 3 } },
  },
  {
    id: "mon_vamp_dinner", char: "vampire", chainOnly: true, when: { flags: ["mon_vamp_invited"] },
    text: "He eats nothing and compliments everything. \"Your cook has a gift. The eleven villagers, you'll be wondering. They're well. They're in my cellar. They asked to come. People do, in winters like this.\"",
    left: { label: "Send them home.", fx: { people: 10, faith: 5 }, next: { id: "mon_vamp_visit", delay: 4 } },
    right: { label: "Keep them. Take no more.", fx: { people: -15, gold: 20 }, set: ["mon_vamp_pact"], next: { id: "mon_vamp_visit", delay: 4 } },
  },
  {
    id: "mon_vamp_visit", char: "vampire", chainOnly: true,
    text: "\"I've come to make an offer I make each king, once. Your line dies badly. I could arrange that it doesn't die at all.\" He is not looking at your face. He is looking a little below it.",
    left: { label: "No. Thank you.", fx: { faith: 10, people: 5 }, next: { id: "mon_vamp_old", delay: 8 } },
    right: { label: "Tell me more.", fx: { faith: -20 }, random: [
      { chance: 0.5, fx: { army: 10, gold: 10 }, effect: "elixir", set: ["mon_vamp_turned"] },
      { chance: 0.5, die: "vampire" },
    ] },
  },
  {
    id: "mon_vamp_old", char: "vampire", chainOnly: true,
    text: "\"I've outlived nineteen of your family. I attended most of the funerals. Yours will be a shame; you've been a decent neighbor.\" He pauses. \"I could attend it later. Earlier is possible. Your choice.\"",
    left: { label: "Later.", fx: { faith: -5, gold: -10 } },
    right: { label: "Get out of my house.", fx: { faith: 15, army: 5 }, unset: ["mon_vamp_invited"], set: ["mon_vamp_hunted"] },
  },
  {
    id: "mon_vamp_church", char: "flamekeeper", when: { flags: ["mon_vamp_invited"] },
    text: "\"You've had a vampire to dinner. The Flame has opinions. Chiefly that a king who sups with the dead is not so much a king as a pantry.\" Osric wants the palace re-blessed. He has a price for that.",
    left: { label: "Bless it.", fx: { faith: 15, gold: -20 } },
    right: { label: "He was very polite.", fx: { faith: -15, people: 5, gold: 5 } },
  },

  // ---------- the dead who don't stay buried ----------
  {
    id: "mon_skel_graveyard", char: "skeleton", once: true, weight: 1.5,
    text: "The yard at St. Orrin's has started talking. Not the ghosts, the bones. This one came in person. \"We've a list of grievances. Mostly the damp and the rent, sire. The rent was never mentioned.\"",
    left: { label: "There's no rent.", fx: { faith: -10, people: 5 }, set: ["mon_dead_talking"], next: { id: "mon_skel_rent", delay: 3 } },
    right: { label: "Back in the ground.", fx: { faith: 10, army: -5 }, set: ["mon_dead_talking"], next: { id: "mon_skel_riot", delay: 4 } },
  },
  {
    id: "mon_skel_rent", char: "skeleton", chainOnly: true,
    text: "\"No rent. Good. Then we'd like the yard drained and a roof on the crypt, and for the sexton to stop stacking us like firewood. We've names. Some of us can remember them.\"",
    left: { label: "Drain it. Roof it.", fx: { gold: -15, faith: -5, people: 10 }, set: ["mon_dead_content"] },
    right: { label: "You're dead. Act like it.", fx: { faith: 5, gold: 5 }, next: { id: "mon_skel_riot", delay: 3 } },
  },
  {
    id: "mon_skel_riot", char: "flamekeeper", chainOnly: true,
    text: "\"The dead have taken the cathedral, Majesty. They're sitting in the pews. They're not doing anything. They're just there, during services, and they've asked why the sermons never mention them.\"",
    left: { label: "Mention them.", fx: { faith: -15, people: 10, gold: 5 }, set: ["mon_dead_content"] },
    right: { label: "Burn the pews. With them.", fx: { faith: 20, people: -15, gold: -5 } },
  },
  {
    id: "mon_skel_army", char: "skeleton", when: { flags: ["mon_dead_content"] }, weight: 1.5,
    text: "\"We've been talking. We don't eat, sleep or desert. We'd like to enlist. You'd have to promise to bury us again after, properly. In writing. We've been burned before.\"",
    left: { label: "Enlist them.", fx: { army: 20, faith: -20, gold: 10 }, set: ["mon_dead_army"] },
    right: { label: "Rest.", fx: { faith: 10, army: -5 } },
  },
  {
    id: "mon_necro_offer", char: "necromancer", when: { notFlags: ["mon_dead_content"] }, weight: 1,
    text: "\"I can make the yard quiet again. Cheaply. All it wants is one of them made an example of.\" The necromancer's hands are very clean. \"You'd be surprised how few kings ask what happens to the example.\"",
    left: { label: "Do it.", fx: { faith: 5, people: 10, gold: -10 }, unset: ["mon_dead_talking"] },
    right: { label: "Hang him.", fx: { faith: 10, people: -5 }, random: [
      { chance: 0.7, fx: { faith: 10 } },
      { chance: 0.3, fx: { army: -15 }, next: { id: "mon_skel_riot", delay: 2 } },
    ] },
  },
  {
    id: "mon_necro_king", char: "necromancer", when: { minYear: 15 }, once: true, weight: 0.5,
    text: "\"Your father. He's with me. Not his soul, that's the Church's business. The rest. He wants to tell you where he hid the good silver, and he wants you to know the crown was never meant for you.\"",
    left: { label: "Let him talk.", fx: { gold: 15, faith: -20, people: -5 } },
    right: { label: "Put him back.", fx: { faith: 10, army: 5, gold: -5 } },
  },

  // ---------- the Thornwood pack ----------
  {
    id: "mon_wolf_winter", char: "peasant", weight: 2,
    text: "\"The wolves are in the lanes at Brackenhow. Not the woods. The lanes. They took Anselm's boy off the step, sire, and Anselm was holding the other end of him.\"",
    left: { label: "A hunt.", fx: { gold: -10, army: 5 }, next: { id: "mon_wolf_hunt", delay: 1 } },
    right: { label: "Bar the doors till spring.", fx: { people: -15, gold: 10 } },
  },
  {
    id: "mon_wolf_hunt", char: "general", chainOnly: true,
    text: "\"The men are eager, Sire. Wolves don't have archers.\" Thorne is pulling on gloves. \"You'll ride with us. A king who hunts is loved. A king who doesn't is a rumor.\"",
    left: { label: "I'll ride.", fx: { people: 10, army: 5 }, random: [
      { chance: 0.7, fx: { people: 10, army: 10 } },
      { chance: 0.3, die: "wolves" },
    ] },
    right: { label: "Hunt without me.", fx: { army: -10, people: -5 } },
  },
  {
    id: "mon_wolf_speaks", char: "wolf", once: true, weight: 0.5, when: { minYear: 6 },
    text: "The wolf sits on the council table. The doors are shut. It doesn't speak, exactly. You understand anyway: The wood was ours. The lambs are payment. Stop counting them and the boys stop going.",
    left: { label: "Stop counting lambs.", fx: { people: 10, gold: -10, faith: -10 }, set: ["mon_wolf_pact"] },
    right: { label: "Bring me its skin.", fx: { army: 10, people: 5 }, set: ["mon_wolf_war"], next: { id: "mon_wolf_war", delay: 2 } },
  },
  {
    id: "mon_wolf_war", char: "elf_ranger", chainOnly: true,
    text: "\"You have declared on the Thornwood pack. The pack has, in its way, declared back. Your outriders are gone. Not dead. Gone. We don't know what it does with them. We have lived here a long while.\"",
    left: { label: "Burn the Thornwood.", fx: { army: 15, faith: 5, people: -10, gold: 5 }, set: ["elf_grudge"], unset: ["mon_wolf_war"] },
    right: { label: "Call it off.", fx: { army: -15, people: 5 }, unset: ["mon_wolf_war"], set: ["mon_wolf_pact"] },
  },
  {
    id: "mon_wolf_pact", char: "child", when: { flags: ["mon_wolf_pact"] },
    text: "A girl from Brackenhow, muddy to the knee. \"A wolf walked me home. From the far field. It didn't do anything. Ma says I'm to say thank you to the king because he made the arrangement.\"",
    left: { label: "You're welcome.", fx: { people: 10, faith: -5 } },
    right: { label: "Never go to the far field.", fx: { people: -5, army: 5, faith: 5 } },
  },

  // ---------- monster of the week ----------
  {
    id: "mon_beast_sheep", char: "beast", weight: 2,
    text: "Something is taking sheep at Hollin. Whole. The shepherd found one hoofprint the size of a table and no others, as if it hopped. The Church says it's a judgment. The shepherd says it's a nuisance.",
    left: { label: "Send men.", fx: { gold: -10, army: 5 }, random: [
      { chance: 0.6, fx: { people: 10, army: 5 } },
      { chance: 0.4, fx: { army: -15 } },
    ] },
    right: { label: "Send a priest.", fx: { faith: 15, people: -10, gold: 5 } },
  },
  {
    id: "mon_beast_well", char: "peasant", weight: 2,
    text: "\"There's something in the well at Ashby, sire. Not fallen in. Living there. It's very reasonable, it talks, it just wants to be left be. The water tastes of it.\"",
    left: { label: "Dig a new well.", fx: { gold: -15, people: 10 } },
    right: { label: "Fill it in. With it.", fx: { faith: 5, people: -10, gold: 5 }, random: [
      { chance: 0.7, fx: { people: 5 } },
      { chance: 0.3, fx: { people: -20 }, effect: "plague" },
    ] },
  },
  {
    id: "mon_beast_bridge", char: "troll", weight: 1, when: { notFlags: ["mon_troll_gone"] },
    text: "The troll, agitated. \"Something under my bridge. Not me. I'm the one who's under my bridge. It's under the under. It's been humming since Thursday and my toll's down a third.\"",
    left: { label: "Look under the under.", fx: { army: -10 }, random: [
      { chance: 0.5, fx: { gold: 20, faith: -5 } },
      { chance: 0.5, fx: { army: -15, people: -5 } },
    ] },
    right: { label: "Not my bridge, you said.", fx: { gold: 10, people: -5 } },
  },
  {
    id: "mon_beast_mill", char: "beast", weight: 1.5,
    text: "The mill at Coldwater runs all night with the door locked and the miller at home. The grain comes out ground. It comes out fine, actually. The baker wants to know if he's allowed the flour.",
    left: { label: "Take the flour.", fx: { people: 10, faith: -10, gold: 10 } },
    right: { label: "Burn the mill.", fx: { faith: 10, people: -10, gold: -10 } },
  },
  {
    id: "mon_beast_court", char: "beast", once: true, weight: 0.5, when: { minYear: 10 },
    text: "It has come to court. It is large and mostly mouth and it has waited its turn behind the halflings. It sets down a lamb, gently. It waits. Wendel believes it's a petition. For what, Wendel can't say.",
    left: { label: "Granted.", fx: { faith: -10, people: 10 }, random: [
      { chance: 0.7, fx: { army: 10 } },
      { chance: 0.3, fx: { people: -20 } },
    ] },
    right: { label: "Denied.", fx: { army: -15, faith: 15 } },
  },

  // ---------- Nizzik ----------
  {
    id: "mon_gob_map", char: "goblin", weight: 1.5, when: { notFlags: ["mon_gob_map_bought"] },
    text: "\"Majesty. Map. Genuine. Shows where the old kings put the gold they didn't want the new kings to have.\" Nizzik's eyes go left, right. \"Family price. Because you look like family.\"",
    left: { label: "How much?", fx: { gold: -15 }, set: ["mon_gob_map_bought"], next: { id: "mon_gob_map_2", delay: 3 } },
    right: { label: "I don't look like family.", fx: { people: 3, gold: 5 } },
  },
  {
    id: "mon_gob_map_2", char: "architect", chainOnly: true,
    text: "Fennick has dug where the map said. \"There was gold, Sire. A chest of it. Also a note, in your great-grandfather's hand, saying 'Nizzik, stop selling this.' The note is dated fifty years ago.\"",
    left: { label: "Take the gold anyway.", fx: { gold: 25 }, next: { id: "mon_gob_curse", delay: 2 } },
    right: { label: "Leave it. It's bait.", fx: { people: -5, faith: 5 } },
  },
  {
    id: "mon_gob_curse", char: "goblin", chainOnly: true,
    text: "\"Small thing, Majesty. The chest came with a curse. Not my fault, came with the chest. I can lift it. I happen to have the lifting. Right here.\" He does. In a jar. The jar is looking at you.",
    left: { label: "Lift it.", fx: { gold: -15, faith: 5 } },
    right: { label: "I'll risk the curse.", fx: { gold: 5 }, random: [
      { chance: 0.6, fx: { people: -10 } },
      { chance: 0.4, die: "cursed" },
    ] },
  },
  {
    id: "mon_gob_cousin", char: "goblin", when: { flags: ["mon_gob_map_bought"] }, once: true,
    text: "\"Now this. This is my cousin Skeg. Very good with locks. Very good with your locks, specifically, which is why I'm selling him before he sells you.\" Skeg waves. Your seal is in his other hand.",
    left: { label: "Buy the cousin.", fx: { gold: -10, army: 5 }, set: ["mon_gob_skeg"] },
    right: { label: "Arrest them both.", fx: { army: 5, gold: 15 }, set: ["mon_gob_grudge"], next: { id: "mon_gob_revenge", delay: 4 } },
  },
  {
    id: "mon_gob_revenge", char: "goblin", chainOnly: true,
    text: "\"No hard feelings about the dungeon, Majesty. Got out Tuesday. Point is, you have a lovely dungeon and not a single stall in it. I've fixed that. The guards owe me eleven shillings.\"",
    left: { label: "Pay the guards' debt.", fx: { gold: -10, army: 5 }, unset: ["mon_gob_grudge"] },
    right: { label: "Sell HIM.", fx: { gold: 20, people: -5, faith: -5 } },
  },
  {
    id: "mon_gob_army", char: "goblin", weight: 1.5,
    text: "\"Swords. Four hundred. Dwarf-made, says so on the hilt, 'Dwarf-Made.' In goblin. Marshal won't know the difference till he's holding one, and by then, Majesty, you've saved a fortune.\"",
    left: { label: "Four hundred.", fx: { gold: -10 }, random: [
      { chance: 0.5, fx: { army: 15 } },
      { chance: 0.5, fx: { army: -15 } },
    ] },
    right: { label: "The Marshal can read.", fx: { army: 5, gold: 5 } },
  },
  {
    id: "mon_gob_skeg", char: "captain", when: { flags: ["mon_gob_skeg"] },
    text: "\"The goblin Skeg, Sire. He's opened every lock in the palace, including two we didn't know were locks. He's very pleased. He'd like to know which ones we want closed again and says it's extra.\"",
    left: { label: "Close them all.", fx: { gold: -5, army: 10 } },
    right: { label: "Leave them. See who comes.", fx: { army: -10 }, random: [
      { chance: 0.6, fx: { gold: 15 }, effect: "spy_network" },
      { chance: 0.4, fx: { gold: -20 } },
    ] },
  },

  // ---------- the cellar rats ----------
  {
    id: "mon_rat_intro", char: "rat", once: true, weight: 1.5,
    text: "The rat stands on the wine rack like it owns it. It does, by tenure. \"We've heard you're thinking of cats. We'd like to open a dialogue before that. We know where the mould is. And the dead steward.\"",
    left: { label: "Dialogue.", fx: { people: -5, gold: 5 }, set: ["mon_rat_treaty"], next: { id: "mon_rat_treaty", delay: 4 } },
    right: { label: "Cats.", fx: { people: 5, gold: 5 }, set: ["mon_rat_war"] },
  },
  {
    id: "mon_rat_treaty", char: "rat", chainOnly: true,
    text: "\"Terms are working. Cheese loss is down. But your Whisperer's been in the cellar, sire, with a sack. He's not spying on you. He's spying on us. We'd like to know if that's official.\"",
    left: { label: "It's official.", fx: { army: 5, people: -5, gold: 5 }, unset: ["mon_rat_treaty"], set: ["mon_rat_war"] },
    right: { label: "It's not. I'll stop him.", fx: { army: -5, gold: 5 }, effect: "spy_network" },
  },
  {
    id: "mon_rat_war", char: "steward", when: { flags: ["mon_rat_war"] }, weight: 1.5,
    text: "Wendel, shaking. \"The rats have taken the east pantry, Majesty. And two cats. Not killed. Recruited. They have a flag of sorts. I've drawn it, if you'd like to see the flag.\"",
    left: { label: "Poison the cellar.", fx: { gold: -10, people: 5 }, random: [
      { chance: 0.6, fx: { people: 5 }, unset: ["mon_rat_war"] },
      { chance: 0.4, fx: { people: -15 }, effect: "plague" },
    ] },
    right: { label: "Negotiate.", fx: { army: -5 }, unset: ["mon_rat_war"], set: ["mon_rat_treaty"] },
  },
  {
    id: "mon_rat_warning", char: "rat", when: { flags: ["mon_rat_treaty"] }, weight: 1,
    text: "\"Quick word. There's a man been in the kitchens who doesn't eat anything. Carries a little bottle. Puts it near your cup, not in. Yet. We thought, treaty being treaty, you'd want to know.\"",
    left: { label: "Find him.", fx: { army: 5, gold: -5 } },
    right: { label: "Rats lie.", fx: { people: 3 }, random: [
      { chance: 0.7, fx: {} },
      { chance: 0.3, die: "poison" },
    ] },
  },

  // ---------- Biscuit ----------
  {
    id: "mon_dog_boots", char: "dog", weight: 2,
    text: "The hound has eaten one boot. Not a pair, one. He's brought the other one to you and set it down and is waiting, tail going, as if this constitutes a solution.",
    left: { label: "Good boy.", fx: { people: 3, gold: -3 } },
    right: { label: "Bad dog.", fx: { army: 3, people: -3, gold: 3 } },
  },
  {
    id: "mon_dog_grave", char: "dog", weight: 1,
    text: "The hound has dug up something in the rose garden. A bone, a ring on a finger-bone still attached, and a crown that is not yours but looks it. He's very proud. He wants you to have the ring.",
    left: { label: "Rebury it. Quietly.", fx: { faith: 5, people: -5 } },
    right: { label: "Keep the ring.", fx: { gold: 10, faith: -10 } },
  },
  {
    id: "mon_dog_saves", char: "dog", once: true, weight: 0.5, when: { minReign: 3 },
    text: "The hound will not let you into the council chamber. He's never growled at you. He's growling at the door. Behind it, the Chancellor is calling that everything's ready and you're late.",
    left: { label: "Trust the dog.", fx: { army: 10, people: 5 }, set: ["mon_dog_hero"], next: { id: "mon_dog_saves_2", delay: 0 } },
    right: { label: "Move, Biscuit.", fx: {}, random: [
      { chance: 0.5, fx: { people: -5 } },
      { chance: 0.5, die: "assassin_blade" },
    ] },
  },
  {
    id: "mon_dog_saves_2", char: "captain", chainOnly: true,
    text: "\"A man behind the arras, Sire. Blade, no livery, tongue cut so he couldn't talk. He'd been there since dawn. The dog knew.\" Rook looks at the hound. The hound is asleep again.",
    left: { label: "A pension for the dog.", fx: { people: 10, gold: -5 } },
    right: { label: "Who let him in?", fx: { army: 5, people: -5 }, effect: "wanted" },
  },
  {
    id: "mon_dog_old", char: "dog", when: { flags: ["mon_dog_hero"], minReign: 12 }, once: true,
    text: "Biscuit takes the stairs slowly now. He gets to the top and lies down where he can see the door, the way he always has. Doctor Amaury says a month. Amaury says that about everyone.",
    left: { label: "Carry him up.", fx: { people: 5, army: -3 } },
    right: { label: "Find a pup.", fx: { people: 3 }, set: ["dog_kept"] },
  },

  // ---------- dead kings ----------
  {
    id: "mon_ghost_tax", char: "ghost", weight: 1.5,
    text: "Your great-uncle, translucent, at the foot of the bed. \"Taxes. Double them. The first year they just grumble. I did it four times.\" He died in a riot. He does not bring this up.",
    left: { label: "Double them.", fx: { gold: 25, people: -20 } },
    right: { label: "You died in a riot.", fx: { faith: 5, gold: 5 } },
  },
  {
    id: "mon_ghost_brother", char: "ghost", when: { notFlags: ["court_edmund_dead"] }, weight: 1.5,
    text: "\"Your brother. Edmund.\" The dead king shakes his head; it takes a moment to catch up. \"I had a brother. I trusted him. You'll notice I'm a ghost. That's all. Sleep well.\"",
    left: { label: "Watch Edmund.", fx: { army: 5, people: -5 }, effect: "spy_network" },
    right: { label: "Edmund is loyal.", fx: { people: 5 }, random: [
      { chance: 0.8, fx: {} },
      { chance: 0.2, die: "poison" },
    ] },
  },
  {
    id: "mon_ghost_wall", char: "ghost", weight: 1,
    text: "A king you don't recognize, with an arrow through him that he seems used to. \"Build the wall higher. I said that. Nine times, at council.\" The arrow is elvish. He was shot from inside the wall.",
    left: { label: "Higher walls.", fx: { gold: -20, army: 10 }, effect: "high_walls" },
    right: { label: "Who shot you?", fx: { faith: 5, army: 5 } },
  },
  {
    id: "mon_ghost_treasure", char: "ghost", once: true, weight: 0.5,
    text: "\"I hid a fortune. Behind the third stone in the old chapel. I'm telling you because you seem the least stupid of the lot, and that's saying very little.\" He fades before you can ask which chapel.",
    left: { label: "Tear up every chapel.", fx: { faith: -20 }, random: [
      { chance: 0.5, fx: { gold: 25 } },
      { chance: 0.5, fx: { gold: -10, people: -5 } },
    ] },
    right: { label: "The dead lie.", fx: { faith: 10, gold: 5 } },
  },
  {
    id: "mon_ghost_you", char: "ghost", once: true, weight: 0.5, when: { minReign: 8 },
    text: "The ghost is you. Older. It has your hands. It looks around the room like it's checking what's changed, and doesn't like the answer. \"Don't,\" it says. It doesn't say what.",
    left: { label: "Don't what?", fx: { faith: -5, army: -5 } },
    right: { label: "Fine. I won't.", fx: { faith: 10, people: 5 } },
  },

  // ---------- the Guild of Quiet Hands ----------
  {
    id: "mon_assassin_hire", char: "assassin", weight: 1, when: { notEffects: ["wanted"] },
    text: "She's been in the room some time; the guards have not noticed. \"The Quiet Hands. We're not here for you. Someone's paid us to ask if you'd like to be a client before you're a contract.\"",
    left: { label: "What do clients get?", fx: { faith: -5 }, next: { id: "mon_assassin_menu", delay: 0 } },
    right: { label: "Guards!", fx: { army: 5, faith: 5, gold: 10 }, effect: "wanted", next: { id: "mon_assassin_warning", delay: 3 } },
  },
  {
    id: "mon_assassin_menu", char: "assassin", chainOnly: true,
    text: "\"Anyone. Once. Discreetly. Then we forget your face.\" She waits. \"Most kings pick the brother. It's dull. I mention it so you can be original.\"",
    left: { label: "The Marshal.", fx: { army: -20, gold: -15, people: 5 }, set: ["court_thorne_dead"] },
    right: { label: "No one. Yet.", fx: { gold: -10 }, set: ["mon_hands_client"] },
  },
  {
    id: "mon_assassin_warning", char: "assassin", chainOnly: true, when: { effects: ["wanted"] },
    text: "Your wine, at dinner, is a different colour. Beside the cup, a folded card: 'Reconsider. — Q.H.' The taster is fine. The taster didn't taste it. He's asked to speak to you about his terms.",
    left: { label: "Pay them off.", fx: { gold: -25 }, removeEffect: "wanted" },
    right: { label: "Double the guard.", fx: { army: 10, gold: -10 }, next: { id: "mon_assassin_strike", delay: 4 } },
  },
  {
    id: "mon_assassin_strike", char: "captain", chainOnly: true, when: { effects: ["wanted"] },
    text: "\"The cook's dead, Sire. Not stabbed. Just dead, at the stove, tasting the soup. They wanted us to see what the soup does.\" Rook has not slept. \"The kitchens are empty. So is every plate upstairs.\"",
    left: { label: "I'll eat first.", fx: { people: 15, army: 10 }, random: [
      { chance: 0.6, fx: {} },
      { chance: 0.4, die: "poison" },
    ] },
    right: { label: "Find their guildhouse.", fx: { army: -10, gold: -15 }, next: { id: "mon_assassin_house", delay: 2 } },
  },
  {
    id: "mon_assassin_house", char: "spymaster", chainOnly: true, when: { effects: ["wanted"] },
    text: "The Whisperer, behind the screen. \"A bakery. In the palace bread for a year. I burned it and hanged eleven. A twelfth got out. She left a note: the contract's paid. She's just curious now.\"",
    left: { label: "Let her be curious.", fx: { faith: -5 }, random: [
      { chance: 0.6, fx: { army: 5 }, removeEffect: "wanted" },
      { chance: 0.4, die: "assassin_blade" },
    ] },
    right: { label: "Hunt her.", fx: { army: -15, gold: -15 }, removeEffect: "wanted" },
  },
  {
    id: "mon_assassin_client", char: "assassin", when: { flags: ["mon_hands_client"] }, weight: 1,
    text: "\"Your retainer's due. Also a courtesy: someone's asked our price for you. We declined, because you're a client. We'd like to keep being able to decline.\"",
    left: { label: "Pay the retainer.", fx: { gold: -15, army: 5 } },
    right: { label: "Cancel it.", fx: { gold: 20 }, unset: ["mon_hands_client"], effect: "wanted" },
  },
  {
    id: "mon_assassin_dawn", char: "assassin", when: { effects: ["wanted"] }, weight: 1.5,
    text: "You wake because someone is sitting on the end of the bed. \"I've been paid. I've also watched you rule for a month. I'll take double to walk out of this room. It's an insult, but a fair one.\"",
    left: { label: "Double.", fx: { gold: -30 }, removeEffect: "wanted" },
    right: { label: "Do it, then.", fx: { army: 5 }, random: [
      { chance: 0.4, fx: { people: 10, army: 10 }, removeEffect: "wanted" },
      { chance: 0.6, die: "assassin_blade" },
    ] },
  },
  {
    id: "mon_assassin_prince", char: "assassin", when: { effects: ["heir"] }, once: true, weight: 0.5,
    text: "\"The boy's not been paid for. I mention it because the price for a prince is low and the price for a king is high, and your brother has recently asked which is which.\"",
    left: { label: "Double the prince's guard.", fx: { gold: -15, army: -5 } },
    right: { label: "Hire you for Edmund.", fx: { gold: -20, faith: -10 }, set: ["court_edmund_dead"] },
  },

  // ---------- the Tower and the weather ----------
  {
    id: "mon_mage_clarity", char: "mage", once: true, weight: 1, when: { notEffects: ["clarity"] },
    text: "The Archmage has brought a lens. \"Look at your kingdom through this and you see it as it is. Numbers. Weights. The Church calls it heresy because the Flame prefers you guess.\"",
    left: { label: "Look.", fx: { faith: -15 }, effect: "clarity" },
    right: { label: "I prefer to guess.", fx: { faith: 10 } },
  },
  {
    id: "mon_mage_weather", char: "mage", once: true, weight: 1.5, when: { minYear: 5 },
    text: "\"Weather, Majesty. Sylvane has it nearly. Rain where you want it, sun where you want it, and the Church doesn't own the sky. Yet.\" She wants the west tower and no questions for two years.",
    left: { label: "Take the tower.", fx: { gold: -15, faith: -10 }, set: ["mon_weather_started"], next: { id: "mon_weather_rain", delay: 2 } },
    right: { label: "The sky's fine as it is.", fx: { faith: 10, people: -5, gold: 10 } },
  },
  {
    id: "mon_weather_rain", char: "peasant", chainOnly: true,
    text: "\"It rained on Fenmarch for eleven days, sire. Just Fenmarch. You could stand at the parish line dry as a bone and watch it. The crop's good. Everyone's very frightened.\"",
    left: { label: "Keep going.", fx: { people: 10, gold: 10, faith: -10 }, next: { id: "mon_weather_snow", delay: 2 } },
    right: { label: "Stop the Archmage.", fx: { faith: 15, people: -5, gold: 10 }, unset: ["mon_weather_started"] },
  },
  {
    id: "mon_weather_snow", char: "mage", chainOnly: true,
    text: "The Archmage, in three coats. \"Small correction needed. It's snowing in the great hall. Indoors. I would not open the treasury; it's a different sort of cold in there.\"",
    left: { label: "Open the treasury.", fx: {}, random: [
      { chance: 0.6, fx: { gold: -15, people: -5 }, next: { id: "mon_weather_storm", delay: 1 } },
      { chance: 0.4, die: "frozen" },
    ] },
    right: { label: "Wait it out.", fx: { gold: -10, people: -10 }, next: { id: "mon_weather_storm", delay: 2 } },
  },
  {
    id: "mon_weather_storm", char: "mage", chainOnly: true,
    text: "\"I've got it. I've absolutely got it. One last working, from the roof, tonight. You'll want to be there — history, Majesty.\" Outside, the clouds have started moving the wrong way.",
    left: { label: "I'll watch from the roof.", fx: { faith: -10 }, random: [
      { chance: 0.5, fx: { people: 20, gold: 15 }, set: ["mon_weather_mastered"] },
      { chance: 0.5, die: "struck_by_lightning" },
    ] },
    right: { label: "Do it from the hills.", fx: { people: -10 }, random: [
      { chance: 0.7, fx: { army: -15 }, next: { id: "mon_weather_avalanche", delay: 0 } },
      { chance: 0.3, fx: { people: 15 }, set: ["mon_weather_mastered"] },
    ] },
  },
  {
    id: "mon_weather_avalanche", char: "messenger", chainOnly: true,
    text: "\"The Iron Teeth, Majesty. Half the north face has come down on the road. The dwarves are asking if we did that. They're asking very calmly, in writing, with a clause number.\"",
    left: { label: "We did that.", fx: { gold: -25, army: 5 }, set: ["dwarf_grudge"] },
    right: { label: "Ride out and see.", fx: { army: 5 }, random: [
      { chance: 0.7, fx: { people: 5 } },
      { chance: 0.3, die: "avalanche" },
    ] },
  },
  {
    id: "mon_weather_farmers", char: "halfling", when: { flags: ["mon_weather_mastered"] }, weight: 1.5,
    text: "Mayor Underhill, with a list. \"Now you own the rain, the river-farms would like some. Tuesdays. Not Wednesdays, that's market. And none for the Thornwood; the elves have been smug about their trees.\"",
    left: { label: "Tuesdays.", fx: { people: 10, gold: 5, faith: -5 } },
    right: { label: "The rain isn't a tap.", fx: { people: -10, faith: 5, gold: 10 } },
  },
  {
    id: "mon_alch_gold", char: "alchemist", weight: 2,
    text: "Master Quill, singed. \"Gold, Sire. From lead. I've done it. Once. I've also done the opposite, several times, and I'd like the treasury to stop counting the second thing against the first.\"",
    left: { label: "Fund him.", fx: { gold: -15 }, random: [
      { chance: 0.5, fx: { gold: 25, faith: -5 } },
      { chance: 0.5, fx: { gold: -10, people: -5 }, next: { id: "mon_alch_boom", delay: 1 } },
    ] },
    right: { label: "Stop turning gold into lead.", fx: { gold: 15, people: 3 } },
  },
  {
    id: "mon_alch_boom", char: "alchemist", chainOnly: true,
    text: "\"Good news and, hm. The good news is I've stabilized the mixture. It's stable in the sense that it's now the size of the laboratory and humming. You'll want to be some distance away when I test it.\"",
    left: { label: "Test it now.", fx: {}, random: [
      { chance: 0.6, fx: { army: 10, gold: 10, faith: -10 } },
      { chance: 0.4, die: "explosion" },
    ] },
    right: { label: "Bury it.", fx: { gold: -5, people: 5, faith: 5 } },
  },

  // ---------- Old Mab, the hermit, the odd ----------
  {
    id: "mon_witch_cost", char: "witch", weight: 1.5,
    text: "Old Mab, uninvited. \"The Church wants your faith, the army wants your gold, the people want your head, and the goblin wants your seal. I want a cow. I'm the cheapest thing in this room.\"",
    left: { label: "A cow.", fx: { gold: -5, faith: -5, people: 5 }, set: ["mon_mab_cow"] },
    right: { label: "You'll get nothing.", fx: { faith: 10, gold: 5 }, random: [
      { chance: 0.7, fx: { people: -5 } },
      { chance: 0.3, fx: { people: -15 }, effect: "toadstool" },
    ] },
  },
  {
    id: "mon_witch_mushroom", char: "witch", when: { flags: ["mon_mab_cow"] }, once: true, weight: 0.5,
    text: "\"For the cow. A mushroom. Blue cap. Eat it and you'll see what things really want. Don't eat it and you'll wonder. I've had kings do both. The wonderers lived longer, on the whole.\"",
    left: { label: "Eat it.", fx: { faith: -10 }, random: [
      { chance: 0.6, fx: { people: 5 }, effect: "toadstool", set: ["toadstool_eaten"] },
      { chance: 0.4, die: "bad_mushroom" },
    ] },
    right: { label: "Wonder.", fx: { faith: 10 } },
  },
  {
    id: "mon_cultist_dragon", char: "cultist", when: { notFlags: ["dragon_dead"], minYear: 6 }, weight: 1,
    text: "\"We worship Vorrath. He hasn't asked us to. We asked if we might and he said, after some time, that he 'did not mind.' We'd like a temple. Small. Facing east. He's particular about that.\"",
    left: { label: "Small temple.", fx: { faith: -15, people: 5, gold: -5 } },
    right: { label: "Worship the Flame.", fx: { faith: 15, people: -10, gold: 5 } },
  },
  {
    id: "mon_child_monster", char: "child", weight: 1.5,
    text: "\"There's a monster under my bed and Ma says tell the king because the king's in charge of monsters.\" She has brought a drawing. It's a good drawing. You recognize the Chancellor.",
    left: { label: "Send a guard tonight.", fx: { people: 10, army: -5 } },
    right: { label: "Show this to Aldric.", fx: { people: -5, gold: 10 } },
  },
];
