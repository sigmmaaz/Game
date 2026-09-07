// Weather, disasters, the calendar, and the king's private life.
export default [
  // ---------- flood ----------
  {
    id: "sea_flood_1", char: "messenger", weight: 2,
    text: "The Vael is over its banks at Lowmarket. The bakers' street is a canal. A man is fishing from his bedroom window and says he's caught two.",
    left: { label: "I'll see it myself.", fx: { people: 10 }, random: [
      { chance: 0.75, fx: { army: -5 }, next: { id: "sea_flood_2", delay: 1 } },
      { chance: 0.25, die: "drowned" },
    ] },
    right: { label: "Send grain and boats.", fx: { gold: -15, people: 5 }, next: { id: "sea_flood_2", delay: 1 } },
  },
  {
    id: "sea_flood_2", char: "messenger", chainOnly: true,
    text: "Water's down. It left three feet of mud, a dead horse in the Flame chapel, and the tax rolls for Lowmarket, which are now paste. Lowmarket is not in mourning for the rolls.",
    left: { label: "Rewrite the rolls.", fx: { gold: 15, people: -15 } },
    right: { label: "Lowmarket's had a bad year.", fx: { gold: -5, people: 15 } },
  },

  // ---------- hard winter ----------
  {
    id: "sea_winter_1", char: "messenger", weight: 2,
    text: "Snow to the windowsills in the lower town, Majesty. The wells are ice. The wolves have come down to the midden heaps and they're not frightened of torches anymore.",
    left: { label: "Open the palace cellars.", fx: { gold: -15, people: 10 } },
    right: { label: "Then we hunt.", fx: { army: 5 }, next: { id: "sea_winter_hunt", delay: 0 } },
  },
  {
    id: "sea_winter_hunt", char: "knight", chainOnly: true,
    text: "Sir Gavriel has the horses saddled and his doubts on his face. \"It's the far side of the Iron Teeth, Sire. If the weather turns, there's no shelter and the horses will know it before we do.\"",
    left: { label: "Ride.", fx: { army: 10, people: 10 }, random: [
      { chance: 0.6, fx: { gold: -5 } },
      { chance: 0.4, die: "frozen" },
    ] },
    right: { label: "You go. I'll wait here.", fx: { army: -10, people: 5 } },
  },

  // ---------- drought & famine ----------
  {
    id: "sea_drought_1", char: "messenger",
    text: "Nine weeks without rain, Sire. The millers have nothing to grind. The halflings on the river are selling their surplus to Kethra because Kethra pays in silver and we pay in promises.",
    left: { label: "Pay in silver.", fx: { gold: -15, people: 5 } },
    right: { label: "It'll rain.", fx: { gold: 10 }, effect: "famine", set: ["sea_famine"], next: { id: "sea_famine_2", delay: 2 } },
  },
  {
    id: "sea_famine_2", char: "peasant", chainOnly: true,
    text: "We've eaten the seed grain, your lordship. All of it. There'll be no crop next year either, but there'll be fewer of us to miss it, so it evens out.",
    left: { label: "Requisition the lords' stores.", fx: { people: 15, army: -15, gold: -5 }, next: { id: "sea_famine_3", delay: 1 } },
    right: { label: "Pray harder.", fx: { faith: 10, people: -15 }, next: { id: "sea_famine_3", delay: 1 } },
  },
  {
    id: "sea_famine_3", char: "halfling", chainOnly: true,
    text: "Mayor Underhill has come herself, with forty wagons. \"We've got seed and we've got bread. Price is double and we'd like it in writing that you'll never tax the river-farms. That's the whole offer.\"",
    left: { label: "In writing.", fx: { gold: -15, people: 15 }, removeEffect: "famine", set: ["sea_halfling_charter"], unset: ["sea_famine"] },
    right: { label: "Take the wagons.", fx: { gold: 15, people: 10, faith: -10, army: -5 }, removeEffect: "famine", set: ["sea_halfling_grudge"], unset: ["sea_famine"] },
  },

  // ---------- comet ----------
  {
    id: "sea_comet_1", char: "messenger", once: true, weight: 0.5,
    text: "There is a second star over the Iron Teeth with a tail like spilled milk. The Flamekeeper says it's a blessing. The astrologers say it's a warning. The tanners say it's making the dogs bark.",
    left: { label: "Declare a holy week.", fx: { faith: 15, gold: -10 }, next: { id: "sea_comet_hesse", delay: 1 } },
    right: { label: "Ask someone who's seen one.", fx: {}, next: { id: "sea_comet_hesse", delay: 0 } },
  },
  {
    id: "sea_comet_hesse", char: "old_woman", chainOnly: true,
    text: "Granny Hesse was nine the last time. \"Your grandfather taxed it. A comet tax, on account of the extra light. Then the harvest failed and they said it was the star. It wasn't the star, dear.\"",
    left: { label: "What was it?", fx: { people: 5 }, next: { id: "sea_comet_hesse_2", delay: 0 } },
    right: { label: "A comet tax. Interesting.", fx: { gold: 20, people: -20 } },
  },
  {
    id: "sea_comet_hesse_2", char: "old_woman", chainOnly: true,
    text: "\"It was the tax. Everyone knew it was the tax.\" She pats your hand. \"You've got his chin. Try not to have his ideas.\"",
    left: { label: "Give her a pension.", fx: { gold: -5, people: 5 } },
    right: { label: "Show her out.", fx: { people: -3 } },
  },

  // ---------- earthquake ----------
  {
    id: "sea_quake_1", char: "messenger", once: true, weight: 0.5,
    text: "The ground moved, Sire. Two chimneys down and the old chapel floor has split. Under it there's a stair that isn't on any plan, going down. The Flamekeeper wants it sealed before anyone looks.",
    left: { label: "Seal it.", fx: { faith: 10, gold: -5 } },
    right: { label: "Captain Rook. Torches.", fx: { faith: -10 }, next: { id: "sea_quake_2", delay: 0 } },
  },
  {
    id: "sea_quake_2", char: "captain", chainOnly: true,
    text: "Rook came back up grey. \"Forty steps, then a door. Dwarf-work, but old. A name cut into it. Yours, Sire. Well. Your family's. And a date about three hundred years off.\"",
    left: { label: "Open the door.", fx: { faith: -10 }, random: [
      { chance: 0.5, fx: { gold: 30 }, set: ["sea_vault_opened"] },
      { chance: 0.5, fx: { army: -15 }, set: ["sea_vault_opened"], die: "buried_alive" },
    ] },
    right: { label: "Brick it up. Say nothing.", fx: { faith: 5, army: 5 }, set: ["sea_vault_sealed"] },
  },

  // ---------- avalanche ----------
  {
    id: "sea_avalanche", char: "messenger", weight: 1,
    text: "The Thane's envoy is stuck the far side of Hawk Pass, Majesty. The snow's hanging off the ridge like a held breath. The mountain men won't cross. They say it just needs one loud noise.",
    left: { label: "I'll fetch him myself.", fx: { army: 10 }, random: [
      { chance: 0.65, fx: { gold: 10 } },
      { chance: 0.35, die: "avalanche" },
    ] },
    right: { label: "He can wait till spring.", fx: { gold: -10, people: 3 } },
  },

  // ---------- Wendel & the palace ----------
  {
    id: "sea_roof_1", char: "steward", weight: 2,
    text: "Wendel is holding a bucket. \"The roof over the great hall, Majesty. The rain comes in over the throne specifically. Master Fennick wants sixty crowns and a month. I am aware there is no sixty crowns.\"",
    left: { label: "Pay Fennick.", fx: { gold: -15, people: 5 } },
    right: { label: "I'll go up and look.", fx: { people: 10 }, random: [
      { chance: 0.7, fx: { gold: -5 } },
      { chance: 0.3, die: "fell_from_tower" },
    ] },
  },
  {
    id: "sea_anniv_5", char: "steward", when: { minReign: 5 }, oncePerReign: true,
    text: "\"Five years on the throne this spring, Sire. Your father had a tournament. Your grandfather had an execution. I've costed both. The tournament is dearer but fewer people write to me afterwards.\"",
    left: { label: "Tournament.", fx: { gold: -15, people: 15, army: 10 } },
    right: { label: "Nothing. Quietly.", fx: { gold: 10, people: -10 } },
  },
  {
    id: "sea_anniv_15", char: "steward", when: { minReign: 15 }, oncePerReign: true,
    text: "\"Fifteen years, Majesty. Longer than the last three of your line together. The Chancellor suggests a medal. The Flamekeeper suggests a chapel. I suggest you don't say the number in the barracks.\"",
    left: { label: "A chapel.", fx: { faith: 15, gold: -10 } },
    right: { label: "Medals for the barracks.", fx: { army: 15, gold: -5, faith: -5 } },
  },
  {
    id: "sea_visit_1", char: "steward",
    text: "\"The Emperor of Kethra arrives in nine days with four hundred retainers. We have wine for a hundred and one good tablecloth. I wrote to your brother about his silver. He has not replied.\"",
    left: { label: "Borrow from the Guild.", fx: { gold: -15, people: -5 }, next: { id: "sea_visit_2", delay: 0 } },
    right: { label: "Serve him what we have.", fx: { gold: 10, army: -10 }, next: { id: "sea_visit_2", delay: 0 } },
  },
  {
    id: "sea_visit_2", char: "foreign_king", chainOnly: true,
    text: "The Emperor turns a wine cup over and reads the maker's mark. \"Charming. Rustic. At home we'd give this to the grooms.\" His retainers laugh a half-second after he does.",
    left: { label: "The grooms have good taste.", fx: { people: 10, army: 5, gold: -10 } },
    right: { label: "Cut the visit short.", fx: { gold: 15, army: -10, people: -5 } },
  },
  {
    id: "sea_portrait_1", char: "steward",
    text: "\"The painter has finished, Majesty.\" Wendel unveils it. Kind about the nose, honest about everything else. \"He suggests the great hall. Over the fireplace. Where your great-uncle is.\"",
    left: { label: "Move the great-uncle.", fx: { people: 5, gold: -5 }, next: { id: "sea_ghost_portrait", delay: 2 } },
    right: { label: "Burn it. Hire a liar.", fx: { gold: -15, people: -5 } },
  },
  {
    id: "sea_ghost_portrait", char: "ghost", chainOnly: true,
    text: "The great-uncle. Standing in the fireplace, dripping nothing. \"Two hundred years over that hearth. Warm. Central. Now I'm in a corridor next to a painting of a goose. Put me back.\"",
    left: { label: "Fine. Back you go.", fx: { faith: 5, people: -5 } },
    right: { label: "You're dead. Enjoy the goose.", fx: { faith: -10 }, random: [
      { chance: 0.7, fx: { people: 5 } },
      { chance: 0.3, fx: { army: -10, gold: -10 } },
    ] },
  },

  // ---------- mice ----------
  {
    id: "sea_mouse_1", char: "steward", weight: 2,
    text: "\"A mouse, Majesty. In the pantry. One. I mention it only because the cook has demanded a cat and the cat costs two crowns and I am not permitted to spend two crowns without asking.\"",
    left: { label: "Two crowns. Honestly.", fx: { gold: -3 } },
    right: { label: "It's one mouse.", fx: { gold: 3 }, set: ["sea_mice"], next: { id: "sea_mouse_2", delay: 2 } },
  },
  {
    id: "sea_mouse_2", char: "steward", chainOnly: true,
    text: "\"Several mice, Majesty. The cook has lost a ham and her composure. The cat is now four crowns because the cat-seller heard about the ham.\"",
    left: { label: "Four crowns.", fx: { gold: -5 }, unset: ["sea_mice"] },
    right: { label: "Poison. Cheaper.", fx: { gold: -2 }, next: { id: "sea_mouse_3", delay: 2 } },
  },
  {
    id: "sea_mouse_3", char: "rat", chainOnly: true,
    text: "The thing on the pantry floor is not a mouse. It is the size of a spaniel, it has eaten the poison and a sack of it, and it is looking at the cook with what she describes as intent.",
    left: { label: "Send in the guard.", fx: { army: -10, people: 5 }, unset: ["sea_mice"] },
    right: { label: "Ask Nizzik to take it.", fx: { gold: 10, faith: -5 }, unset: ["sea_mice"], random: [
      { chance: 0.8, fx: {} },
      { chance: 0.2, effect: "plague", fx: { people: -10 } },
    ] },
  },

  // ---------- Doctor Amaury ----------
  {
    id: "sea_diet", char: "healer", weight: 2,
    text: "\"Your water is cloudy, Majesty. I recommend no wine, no pork, no bread after noon, and a raw onion at dawn. Your father refused the onion. You'll recall how that went.\"",
    left: { label: "The onion.", fx: { people: -5, army: 3 }, setReign: ["sea_onion"] },
    right: { label: "My father lived to sixty.", fx: { people: 5, gold: -5 } },
  },
  {
    id: "sea_leech", char: "healer",
    text: "Amaury has a bowl. The bowl is steaming. \"Powdered dragon scale. Genuine; I bought it from a goblin. Taken behind the knees as a poultice it draws off the choler that makes a man sign things.\"",
    left: { label: "Behind the knees, then.", fx: { faith: 5 }, random: [
      { chance: 0.7, fx: { army: -5 } },
      { chance: 0.3, fx: { people: -15 } },
    ] },
    right: { label: "Try it on the Chancellor.", fx: { people: 5, gold: 10 } },
  },
  {
    id: "sea_plague_1", char: "healer", weight: 1,
    text: "\"Three dead on Tanner Lane, Sire. Black under the arms. I want the whole lane boarded up with everyone inside it. Everyone. Some of them are not yet sick. That is rather the point.\"",
    left: { label: "Board it up.", fx: { people: -15, faith: 5 }, setReign: ["sea_quarantine"], next: { id: "sea_plague_2", delay: 1 } },
    right: { label: "You can't wall in the living.", fx: { people: 5 }, effect: "plague", next: { id: "sea_plague_2", delay: 1 } },
  },
  {
    id: "sea_plague_2", char: "healer", chainOnly: true,
    text: "\"It's in the grain. It was always in the grain. The rats sleep in the granary and the granary feeds the city. Burn it, Majesty, or bury the city one street at a time.\"",
    left: { label: "Burn the granary.", fx: { people: -10, gold: -10 }, removeEffect: "granary", next: { id: "sea_plague_3", delay: 2 } },
    right: { label: "Grain doesn't burn. Not mine.", fx: { people: 5 }, effect: "plague", next: { id: "sea_plague_3", delay: 2 } },
  },
  {
    id: "sea_plague_3", char: "healer", chainOnly: true,
    text: "\"It's over, or it's resting. Two hundred dead, most of them poor, which the Guild calls efficient. The rats interest me. A grant, please, and forty more rats.\"",
    left: { label: "A grant. No rats.", fx: { gold: -10, faith: -5 }, removeEffect: "plague" },
    right: { label: "You've had enough rats.", fx: { gold: 10, people: 5 }, removeEffect: "plague", random: [
      { chance: 0.75, fx: {} },
      { chance: 0.25, die: "plague" },
    ] },
  },

  // ---------- children ----------
  {
    id: "sea_child_knight", char: "child",
    text: "A boy of about seven, in a pot helmet, has got past Captain Rook by being under his line of sight. \"I want to be a knight. I've got a sword.\" It's a spoon.",
    left: { label: "Knight him. Now.", fx: { people: 10, army: -5 } },
    right: { label: "Give him to Sir Gavriel.", fx: { army: 5, gold: -3 }, set: ["sea_spoon_knight"] },
  },
  {
    id: "sea_child_smile", char: "child", weight: 2,
    text: "A girl with a runny nose stares at you for a long time from behind the Chancellor's robe. \"My mum says you never smile. She says it's because of the taxes. Is it the taxes?\"",
    left: { label: "It's the taxes.", fx: { people: 5, gold: -5 } },
    right: { label: "Smile at her.", fx: { people: -5 }, random: [
      { chance: 0.7, fx: { people: 10 } },
      { chance: 0.3, fx: { people: -5 } },
    ] },
  },
  {
    id: "sea_child_frog", char: "child",
    text: "\"I brought you a frog.\" He did. It's enormous and very calm. \"He was in the Flame chapel font. The priest said he was a demon. He's not a demon, he's Gerald.\"",
    left: { label: "Keep Gerald.", fx: { people: 5, faith: -10 } },
    right: { label: "Return Gerald to the font.", fx: { faith: 5, people: -3 } },
  },

  // ---------- Biscuit ----------
  {
    id: "sea_dog_dead", char: "dog", when: { flags: ["dog_kept"] }, weight: 2,
    text: "Biscuit has brought you something. It's dead, it was a pheasant, and it belonged to the Flamekeeper's dovecote, judging by the ribbon. He sets it on your foot and waits.",
    left: { label: "Good boy.", fx: { people: 5, faith: -5 } },
    right: { label: "Return it. With apologies.", fx: { faith: 5, gold: -3 } },
  },
  {
    id: "sea_dog_room", char: "dog", when: { flags: ["dog_kept"] },
    text: "Biscuit will not go into the east tower room. He'll stand at the door and growl at the floor. The last king's valet used that room. The valet was never found.",
    left: { label: "Have the floor up.", fx: { gold: -5 }, random: [
      { chance: 0.5, fx: { gold: 15, faith: -5 } },
      { chance: 0.5, fx: { faith: -10, people: -5 }, set: ["sea_valet_found"] },
    ] },
    right: { label: "Lock the room.", fx: { faith: 3 } },
  },
  {
    id: "sea_dog_old_1", char: "dog", when: { flags: ["dog_kept"], minReign: 8 }, once: true, weight: 0.5,
    text: "Biscuit takes the stairs one at a time now, and stops on the landing to think about it. He still comes. He's grey to the shoulders. The kennel master says a year, maybe.",
    left: { label: "He sleeps in my room now.", fx: { people: 3 }, set: ["sea_dog_old"], next: { id: "sea_dog_old_2", delay: 2 } },
    right: { label: "Get a younger dog.", fx: { army: 3, people: -5 }, set: ["sea_dog_replaced"], next: { id: "sea_dog_old_2", delay: 2 } },
  },
  {
    id: "sea_dog_old_2", char: "dog", chainOnly: true,
    text: "He didn't get up this morning. He looked at you and moved his tail once, the way he does when he's decided something. Wendel is standing in the doorway and doesn't know where to put his hands.",
    left: { label: "Bury him under the throne.", fx: { faith: -10, people: 5 }, unset: ["dog_kept", "sea_dog_old"] },
    right: { label: "Bury him by the kennels.", fx: { people: 3 }, unset: ["dog_kept", "sea_dog_old"] },
  },

  // ---------- Pib ----------
  {
    id: "sea_pib_newyear", char: "jester", weight: 2,
    text: "Pib, on New Year's, upside down. \"Prophecy! This year a great man falls from a great height!\" Last year he said a great man would be poisoned. The kennel master's dog died of a bad sausage.",
    left: { label: "Who's the great man?", fx: { people: 3 }, next: { id: "sea_pib_newyear_2", delay: 4 } },
    right: { label: "Stop doing prophecies.", fx: { faith: 5, people: -5 } },
  },
  {
    id: "sea_pib_newyear_2", char: "jester", chainOnly: true,
    text: "\"Told you. Great man, great height.\" He means the bell-ringer, who fell out of the belfry into a hay cart and is fine. \"Next year: a king weds a stranger. Possibly a duck. It's blurry.\"",
    left: { label: "Give him a raise.", fx: { gold: -5, people: 5 } },
    right: { label: "Give him to the belfry.", fx: { people: -5, army: 3 } },
  },

  // ---------- the bard ----------
  {
    id: "sea_bard_song_1", char: "bard",
    text: "\"I've written a song about you, Majesty. It's called 'The King Who Counted Geese'. It's about the goose tax. The tavern crowd have learned the chorus and I can't seem to stop them.\"",
    left: { label: "Pay him to stop.", fx: { gold: -5 } },
    right: { label: "Let them sing.", fx: { people: 5 }, next: { id: "sea_bard_song_2", delay: 2 } },
  },
  {
    id: "sea_bard_song_2", char: "bard", chainOnly: true,
    text: "\"It's reached the barracks. They've added verses. The new verses are about your mother, and they are, I'm sorry to say, very good.\" He hums a bit before he can stop himself.",
    left: { label: "Flog the barracks.", fx: { army: -15, people: -5 } },
    right: { label: "Hire him to write a better one.", fx: { gold: -10, people: 10, army: 5 }, set: ["sea_goose_song"] },
  },

  // ---------- the hermit ----------
  {
    id: "sea_hermit_tuesday_1", char: "hermit",
    text: "\"The world ends Tuesday. I've done the sums three times. Tuesday, mid-morning, fire from above. I'd cancel anything you've got Wednesday.\" He's brought a small bag, packed.",
    left: { label: "Cancel Wednesday.", fx: { people: -10, faith: 5 }, next: { id: "sea_hermit_tuesday_2", delay: 0 } },
    right: { label: "Lock him up till Thursday.", fx: { people: 5, faith: -5 } },
  },
  {
    id: "sea_hermit_tuesday_2", char: "hermit", chainOnly: true,
    text: "Tuesday. Clear sky, then not. \"On the tower, Majesty, quickly. The righteous will be lifted up. You want to be standing somewhere high when it comes, so it can see you.\"",
    left: { label: "Up the tower.", fx: { faith: 10 }, random: [
      { chance: 0.55, fx: { people: 10 } },
      { chance: 0.45, die: "struck_by_lightning" },
    ] },
    right: { label: "I'll wait in the cellar.", fx: { faith: -5, people: 5, army: -5 } },
  },

  // ---------- the innkeeper ----------
  {
    id: "sea_inn_1", char: "innkeeper", weight: 2,
    text: "Bess wipes the same spot on the bar. \"You asked what they say. They say you're cheap. They say the Chancellor runs things. They say you've a mistress in the Deep Holds, which is anatomically hopeful.\"",
    left: { label: "Buy the house a round.", fx: { gold: -10, people: 10 } },
    right: { label: "Find who said cheap.", fx: { people: -10, army: 5 }, next: { id: "sea_inn_2", delay: 2 } },
  },
  {
    id: "sea_inn_2", char: "innkeeper", chainOnly: true,
    text: "\"Your guardsmen took the cooper. He said cheap. Everyone says cheap. Now they say cheap and they say frightened, and the cooper's wife drinks here and I've had to stop charging her.\"",
    left: { label: "Release the cooper.", fx: { people: 10, army: -10 } },
    right: { label: "Frightened is fine.", fx: { people: -15, army: 10 } },
  },

  // ---------- the Dowager ----------
  {
    id: "sea_mother_marriage", char: "mother", when: { notEffects: ["married"] }, weight: 2,
    text: "\"I've had a list drawn up. Eleven girls, two of them royal, one of them an elf who's older than the palace. I've ranked them by dowry. You may choose from the top three. You may not choose the elf.\"",
    left: { label: "The top one, then.", fx: { gold: 20, people: -5, faith: 5 }, effect: "married" },
    right: { label: "I'll choose my own wife.", fx: { people: 5, gold: -5 } },
  },
  {
    id: "sea_mother_weight", char: "mother", weight: 2,
    text: "\"You've got your father's stomach and you're getting his neck. The Emperor of Kethra is thin. People trust thin men; it looks like discipline. I've told the kitchens. You'll notice at supper.\"",
    left: { label: "Reverse the kitchens.", fx: { people: 5 }, random: [
      { chance: 0.85, fx: { gold: -5 } },
      { chance: 0.15, die: "choked_at_feast" },
    ] },
    right: { label: "Fine. Half portions.", fx: { people: -5, army: 5 } },
  },
  {
    id: "sea_mother_father", char: "mother", once: true, weight: 0.5,
    text: "The Dowager is looking at the fire. \"Your father talked to that hearth. At night, when he thought I slept. He'd say 'not yet'. Every night for eleven years.\" She turns. \"Do you talk to it?\"",
    left: { label: "No.", fx: { faith: 5, people: -3 } },
    right: { label: "Sometimes.", fx: { faith: -10 }, set: ["sea_mother_knows"] },
  },

  // ---------- old age ----------
  {
    id: "sea_old_stairs", char: "steward", when: { effects: ["old_age"] }, oncePerReign: true,
    text: "\"I've had a rail put on the tower stair, Majesty. On my own authority, which I don't have. I've also moved your bedchamber down a floor and told the guard it's for security. It is not for security.\"",
    left: { label: "Move it back up.", fx: { army: 5 }, random: [
      { chance: 0.8, fx: { people: 3 } },
      { chance: 0.2, die: "fell_from_tower" },
    ] },
    right: { label: "Thank you, Wendel.", fx: { people: 5, army: -5 } },
  },
  {
    id: "sea_old_feast", char: "mother", when: { effects: ["old_age"] }, oncePerReign: true,
    text: "\"You're older than your father got. I had money on the other outcome.\" She has ordered a feast; there's a whole boar. \"Eat something. You look like a rumour of yourself.\"",
    left: { label: "Eat.", fx: { people: 10, gold: -10 }, random: [
      { chance: 0.75, fx: {} },
      { chance: 0.25, die: "choked_at_feast" },
    ] },
    right: { label: "Broth. Just broth.", fx: { people: -5, army: 3 } },
  },
  {
    id: "sea_old_winter", char: "messenger", when: { effects: ["old_age"] }, oncePerReign: true,
    text: "\"First snow, Sire.\" The messenger is red-cheeked and twenty and thinks it's good news. Your hands have been cold since harvest and nothing Amaury does warms them.",
    left: { label: "Ride out in it. Like before.", fx: { army: 10, people: 5 }, random: [
      { chance: 0.6, fx: {} },
      { chance: 0.4, die: "frozen" },
    ] },
    right: { label: "Build up the fire.", fx: { gold: -5 } },
  },
];
