// The common folk: farmers, drunks, children, the people who actually live in the empire.
// Nobody here has a title. Most of them have a grievance.
export default [
  // ---------- peasants (a different one each time) ----------
  {
    id: "com_peasant_geese", char: "peasant", weight: 2,
    text: "Hob Tarrant, of Cheddle. The new tax is a penny a goose. I've got forty geese. I've done the sum, Lordship, and it's more than the geese.",
    left: { label: "A penny a goose.", fx: { gold: 20, people: -12 } },
    right: { label: "Geese are exempt.", fx: { people: 8, gold: -5 }, set: ["com_geese_exempt"] },
  },
  {
    id: "com_peasant_geese_2", char: "peasant", when: { flags: ["com_geese_exempt"] }, once: true,
    text: "Marlow Bottom. Since geese aren't taxed, everyone here has declared themselves a goose farmer. Including the smith. He has one goose. It's wooden.",
    left: { label: "Tax the wooden goose.", fx: { gold: 10, people: -5 } },
    right: { label: "Let them be geese.", fx: { people: 10, gold: -15 } },
  },
  {
    id: "com_peasant_turnips", char: "peasant", weight: 2,
    text: "Wat, from Owlsbury. Turnips this year. Only turnips. The barley rotted and the beans had a beetle. We'd like to not eat turnips until spring. Anything. Oats.",
    left: { label: "Send oats.", fx: { gold: -8, people: 10 } },
    right: { label: "Turnips build character.", fx: { people: -10 } },
  },
  {
    id: "com_peasant_road", char: "peasant", weight: 2,
    text: "Dunmarsh. The road to market has a hole in it the size of a cow. We know the size because there's a cow in it. Third one. We'd like the hole filled, or a bigger cow.",
    left: { label: "Fill the hole.", fx: { gold: -8, people: 8 } },
    right: { label: "Fence the hole.", fx: { people: -5, gold: 8 } },
  },
  {
    id: "com_peasant_wolves", char: "peasant", weight: 2,
    text: "Thornby. Wolves took eleven sheep and Aldous's leg. Aldous is fine about it. The sheep less so. Send hunters or we're moving to town, all of us, with the sheep.",
    left: { label: "Send hunters.", fx: { army: -8, people: 10 } },
    right: { label: "Move to town.", fx: { people: -12, gold: 5 } },
  },
  {
    id: "com_peasant_lord", char: "peasant",
    text: "Farrow. Our lord, Sir Pell, takes half the wheat and all the daughters. The wheat we're used to. We'd like a different lord. We're not fussy. A worse one, even, if he's slower.",
    left: { label: "Hang Sir Pell.", fx: { people: 15, army: -10 } },
    right: { label: "Sir Pell is your lord.", fx: { people: -15, army: 5 } },
  },
  {
    id: "com_peasant_tithe", char: "peasant", weight: 2,
    text: "Haddock's End. The Flamekeeper takes a tenth of the barley and a tenth of the pigs. Last year he took a tenth of the baby. Not a real tenth. He blessed it and charged us. We want that penny back.",
    left: { label: "Refund the baby.", fx: { people: 8, faith: -10 } },
    right: { label: "Blessings cost.", fx: { faith: 8, people: -8 } },
  },
  {
    id: "com_peasant_orcs", char: "peasant",
    text: "Wetherby Cross, up by the Scar. An orc came through and bought a pig. Paid in silver. Fair silver. Then he went home. We're not sure what to do about it and thought you'd want to know.",
    left: { label: "Sell them more pigs.", fx: { gold: 12, people: 5, army: -8 } },
    right: { label: "Burn the silver.", fx: { army: 5, faith: 5, people: -8 } },
  },
  {
    id: "com_peasant_well", char: "peasant", weight: 2,
    text: "Little Gribble. The well's gone bad. Green, and it hums. Doctor says it's fine. Doctor drank some to prove it. Doctor's gone green, and he hums.",
    left: { label: "Dig a new well.", fx: { gold: -12, people: 10 } },
    right: { label: "Drink from the river.", fx: { people: -8 }, random: [
      { chance: 0.7, fx: {} },
      { chance: 0.3, fx: { people: -10 }, effect: "plague" },
    ] },
  },
  {
    id: "com_peasant_harvest", char: "peasant", once: true, weight: 0.8,
    text: "Cheddle again, Hob Tarrant. Just come to say the harvest's the best in forty years. Barns are full. Nobody's died. Thought you'd want to hear a good one for once. That's all.",
    left: { label: "Tax the surplus.", fx: { gold: 25, people: -10 } },
    right: { label: "Let it stand.", fx: { people: 10 }, effect: "prosperity" },
  },
  {
    id: "com_peasant_scarecrow", char: "peasant",
    text: "Owlsbury. The scarecrow's started moving at night. Not much. Just enough. Crows love it. The field's stripped. We'd like a priest, or a bigger scarecrow to frighten the first one.",
    left: { label: "Send a priest.", fx: { faith: 8, gold: -5 } },
    right: { label: "Burn the scarecrow.", fx: { people: 5 }, random: [
      { chance: 0.8, fx: {} },
      { chance: 0.2, fx: { people: -12, faith: -5 } },
    ] },
  },
  {
    id: "com_peasant_conscripts", char: "peasant", when: { effects: ["war"] },
    text: "Marlow Bottom. The Marshal's men took every lad over fourteen. Left us the women, the old, and Denny, who's simple. Who's going to get the barley in? Denny? Denny's tried.",
    left: { label: "Send the lads home.", fx: { people: 12, army: -15 } },
    right: { label: "Denny will manage.", fx: { people: -15, army: 5 } },
  },
  {
    id: "com_peasant_soldier_pay", char: "peasant",
    text: "Thornby. Your soldiers came through and paid for the beer with a paper saying THE KING OWES YOU. Do you? Because they drank a lot, and the paper's gone soft.",
    left: { label: "I owe you.", fx: { gold: -10, people: 8, army: 3 } },
    right: { label: "I don't recall.", fx: { people: -10, army: -5 } },
  },

  // ---------- Guildmaster Crane ----------
  {
    id: "com_merchant_silk", char: "merchant", when: { notEffects: ["silk_road"] }, once: true,
    text: "Guildmaster Crane, Majesty. The eastern caravans want to come through Vael instead of Kethra. They'd need the pass cleared and a guard. They'd pay. Possibly to me first, but they'd pay.",
    left: { label: "Clear the pass.", fx: { gold: -15, army: -5 }, effect: "silk_road" },
    right: { label: "Let Kethra have them.", fx: { gold: 3 } },
  },
  {
    id: "com_merchant_guild", char: "merchant", weight: 2,
    text: "The cobblers want a guild charter so nobody can make shoes but them. They'd pay for the charter. Everyone else would pay for shoes. Everybody pays. I like it.",
    left: { label: "Charter them.", fx: { gold: 18, people: -8 } },
    right: { label: "Anyone may make shoes.", fx: { people: 8, gold: -3 } },
  },
  {
    id: "com_merchant_weights", char: "merchant",
    text: "Crane. A delicate matter. The royal pound is heavier than the guild pound. Has been for years. If you correct it, every merchant in the city loses a tenth. If you don't, I'll say nothing.",
    left: { label: "Correct the pound.", fx: { people: 10, gold: -12 } },
    right: { label: "Say nothing.", fx: { gold: 15, people: -5 } },
  },
  {
    id: "com_merchant_loan", char: "merchant", when: { stats: { gold: [0, 30] } },
    text: "The Guild notices the treasury is thin. We could lend. Nothing dwarven, no clauses, just money at a rate a friend would offer another friend who's a king.",
    left: { label: "Borrow.", fx: { gold: 25, army: -5 }, set: ["com_guild_loan"], next: { id: "com_merchant_loan_2", delay: 5 } },
    right: { label: "The Crown does not borrow.", fx: { gold: -5, faith: 3 } },
  },
  {
    id: "com_merchant_loan_2", char: "merchant", chainOnly: true,
    text: "The Guild's loan, Majesty. Five years. The friendly rate has compounded in a friendly way. We'd take repayment, or the wool monopoly, or — the Guild's idea, not mine — a seat on the council.",
    left: { label: "Repay it.", fx: { gold: -30 }, unset: ["com_guild_loan"] },
    right: { label: "A seat. Not the wool.", fx: { gold: 10, people: -10, army: -8 }, unset: ["com_guild_loan"] },
  },
  {
    id: "com_merchant_slaves", char: "merchant", when: { flags: ["com_slaver_bought"] }, once: true,
    text: "Crane. The Guild wishes it noted that the men you bought from Marrow are cheaper than the men we employ. Our men have noticed too. There's talk of a strike, or a fire. They haven't decided.",
    left: { label: "Free the bought men.", fx: { people: 10, gold: -10 }, unset: ["com_slaver_bought"] },
    right: { label: "Let them strike.", fx: { people: -15, gold: 8 } },
  },

  // ---------- Bess the innkeeper ----------
  {
    id: "com_inn_soldiers", char: "innkeeper", weight: 2,
    text: "Bess, of the Drowned Rat. Your guard drink in my place every night and pay one night in three. I've kept a slate. It's not a slate any more. It's a wall.",
    left: { label: "Pay the wall.", fx: { gold: -10, army: 5, people: 5 } },
    right: { label: "Soldiers drink free.", fx: { army: 10, people: -10 } },
  },
  {
    id: "com_inn_curfew", char: "innkeeper",
    text: "Bess. This curfew. Nobody out after dark. I sell beer. Beer is a night thing, Majesty. Nobody drinks at noon except the Chancellor, and he doesn't come to mine.",
    left: { label: "Lift the curfew.", fx: { people: 10, army: -8 } },
    right: { label: "Sell beer at noon.", fx: { people: -8, faith: 3, gold: 5 } },
  },
  {
    id: "com_inn_rumor", char: "innkeeper",
    text: "Bess. A man in my back room's been buying rounds and saying your brother would make a finer king. He tips well. I wanted to check, before I threw him out, whether he's right.",
    left: { label: "Throw him out.", fx: { army: 5, people: -3 } },
    right: { label: "Send him to the Whisperer.", fx: { army: 8, people: -8 }, effect: "spy_network" },
  },
  {
    id: "com_inn_orc", char: "innkeeper",
    text: "An orc's been sleeping in my stable a week. Pays, doesn't fight, drinks less than the smith. The Flamekeeper says I'm harboring. I say I'm renting. Which is it?",
    left: { label: "Renting.", fx: { people: 5, faith: -8, army: 3 } },
    right: { label: "Harboring.", fx: { faith: 8, people: -5, army: -5 } },
  },

  // ---------- children ----------
  {
    id: "com_child_question", char: "child", once: true, weight: 0.6,
    text: "A small girl has got past the guards. \"My mum says the king decides who eats. My brother didn't eat and he died. Did you decide that?\" She's not crying. She wants the answer.",
    left: { label: "Yes.", fx: { people: -10, faith: 5 } },
    right: { label: "No.", fx: { people: 5, faith: -8 } },
  },
  {
    id: "com_child_coin", char: "child", weight: 2,
    text: "A boy holds out a coin with your face on it. \"Is that really you? It doesn't look like you. You look tireder.\" He wants to know if he can keep it.",
    left: { label: "Keep it.", fx: { people: 5, gold: -3 } },
    right: { label: "It's the Crown's.", fx: { gold: 5, people: -5 } },
  },
  {
    id: "com_child_soldier", char: "child",
    text: "A boy of nine, very serious. \"I want to join the army. I can carry a sword. Not lift it, carry it. My dad's in the army. He hasn't come back but he will.\"",
    left: { label: "You're in. Drums.", fx: { army: 5, people: -5 } },
    right: { label: "Go home to your mother.", fx: { people: 5, army: -3 } },
  },
  {
    id: "com_child_dragon", char: "child",
    text: "A girl with a bucket. \"There's a dragon in the hills, everyone says. I'm going to give it this water so it doesn't burn us. Do you want to come? You've got a horse.\"",
    left: { label: "Give her a horse.", fx: { people: 8, army: -5 } },
    right: { label: "Confiscate the bucket.", fx: { people: -8, faith: 3 } },
  },

  // ---------- Granny Hesse ----------
  {
    id: "com_granny_kings", char: "old_woman", weight: 2,
    text: "Granny Hesse, who has outlived five kings and mentions it. \"You're the sixth. The third one listened to me. He lasted longest. Sit up straight and stop signing things.\"",
    left: { label: "Stop signing things.", fx: { gold: 10, army: -5 } },
    right: { label: "Sign more things.", fx: { gold: -5, army: 5 } },
  },
  {
    id: "com_granny_bread", char: "old_woman", weight: 2,
    text: "Granny Hesse. \"The loaf's smaller. Same penny, smaller loaf. The baker says it's the flour. The flour says it's the miller. The miller says it's you. I've come to the end of the line.\"",
    left: { label: "Fix the price of bread.", fx: { people: 12, gold: -10 } },
    right: { label: "Blame the miller.", fx: { people: -5, gold: 3 }, next: { id: "com_mill_1", delay: 2 } },
  },
  {
    id: "com_granny_ghost", char: "old_woman",
    text: "Granny Hesse. \"My husband's back. Dead forty years and he's sat by the fire complaining about the damp. I don't mind the company. The Church minds. Tell them to leave him be.\"",
    left: { label: "Leave him be.", fx: { people: 5, faith: -12 } },
    right: { label: "He goes back in the ground.", fx: { faith: 8, people: -8 } },
  },
  {
    id: "com_granny_advice", char: "old_woman", when: { stats: { people: [70, 100] } },
    text: "Granny Hesse, quietly. \"They love you. I've seen that before, with the second one. They loved him right up until they carried him round the city on their shoulders. Then they dropped him.\"",
    left: { label: "Raise a tax.", fx: { people: -15, gold: 15 } },
    right: { label: "They'd never.", fx: { people: 5 } },
  },

  // ---------- messengers ----------
  {
    id: "com_msg_flood", char: "messenger", weight: 2,
    text: "The Marl's burst its banks at Hollin. Six villages under water, the grain with them. The Flamekeeper says it's a judgment. The villagers say it's a river.",
    left: { label: "Send grain and boats.", fx: { gold: -15, people: 12 } },
    right: { label: "Send the Flamekeeper.", fx: { faith: 8, people: -12 } },
  },
  {
    id: "com_msg_fire", char: "messenger", weight: 2,
    text: "Fire in the Tanners' Quarter, Sire. Started in a vat. Forty houses gone. The tanners say the dyers did it. The dyers have left town, which they say proves nothing.",
    left: { label: "Rebuild it.", fx: { gold: -15, people: 10 } },
    right: { label: "Hunt the dyers.", fx: { army: 5, people: -5, gold: 8 } },
  },
  {
    id: "com_msg_calf", char: "messenger",
    text: "A two-headed calf's been born at Farrow, Majesty. One head's black, one's white. The Church wants it burned. The village wants it kept. The calf, as far as anyone can tell, wants milk.",
    left: { label: "Burn it.", fx: { faith: 10, people: -8 } },
    right: { label: "Milk it. Both ends.", fx: { people: 8, faith: -10 } },
  },
  {
    id: "com_msg_skirmish", char: "messenger",
    text: "Border post at Redwater, Sire. Kethran riders came across, took horses, went back. Two of ours dead. The captain there wants to go and take the horses back, and a few more for interest.",
    left: { label: "Take them back.", fx: { army: 10, gold: -5 }, set: ["com_kethra_tension"] },
    right: { label: "Write to Kethra.", fx: { army: -10, gold: 3 }, next: { id: "com_kethra_envoy_1", delay: 1 } },
  },
  {
    id: "com_msg_landslide", char: "messenger",
    text: "Half of Stoke Pallow slid into the valley in the night. Nobody hurt — it slid slowly, they walked alongside. But the village is now in Sir Pell's land, and he's charging them rent.",
    left: { label: "The village is theirs.", fx: { people: 10, army: -5 } },
    right: { label: "Land is land. Pay.", fx: { people: -12, gold: 10 } },
  },
  {
    id: "com_msg_riot", char: "messenger", when: { stats: { people: [0, 30] } },
    text: "The bread queue in Coppergate turned into a crowd, Sire, and the crowd turned into a fire. The guard are holding the bridge. They ask, respectfully, what you'd like them to do next.",
    left: { label: "Open the granaries.", fx: { people: 15, gold: -15 } },
    right: { label: "Clear the street.", fx: { army: 5, people: -10 }, random: [
      { chance: 0.75, fx: {} },
      { chance: 0.25, die: "torn_by_mob" },
    ] },
  },

  // ---------- Lute-Tam the bard ----------
  {
    id: "com_bard_song_1", char: "bard", weight: 2,
    text: "Lute-Tam. He's written a song about you. It's called \"The King Who Sat Down.\" It's very popular in the taverns. He's here to ask if you'd like to hear it, or pay for a different one.",
    left: { label: "Pay for a different one.", fx: { gold: -10, people: 8 }, next: { id: "com_bard_song_2", delay: 2 } },
    right: { label: "Let's hear it.", fx: { people: 5, army: -5 } },
  },
  {
    id: "com_bard_song_2", char: "bard", chainOnly: true,
    text: "Lute-Tam, with the new song. \"The King Who Stood Up.\" In it you kill a dragon, marry the sea and forgive a tax. The last verse is the popular one. People are asking when the tax is forgiven.",
    left: { label: "Forgive a tax.", fx: { people: 15, gold: -15 } },
    right: { label: "It's a song.", fx: { people: -10 } },
  },
  {
    id: "com_bard_kethra", char: "bard",
    text: "Lute-Tam has been offered a post in Kethra. Twice the pay, and the Emperor has, he's told, a wonderful singing voice. He'd stay for a title. Any title. Court Poet. Lord of Something Small.",
    left: { label: "Lord of Something Small.", fx: { people: 5, army: -5, gold: -5 } },
    right: { label: "Enjoy Kethra.", fx: { people: -8, gold: 8 } },
  },
  {
    id: "com_bard_war", char: "bard", when: { effects: ["war"] },
    text: "Lute-Tam, back from the front, thinner. \"I wrote the marching song you asked for. The men changed the words. The new words are about you. I could sing you the new words, but I'd rather not.\"",
    left: { label: "Sing them.", fx: { army: 5, people: -5 } },
    right: { label: "Pay the men.", fx: { gold: -15, army: 10 } },
  },

  // ---------- refugees from the Burned Lands ----------
  {
    id: "com_refugee_1", char: "refugee", once: true,
    text: "Three hundred of us, Majesty. From the Burned Lands. Farmers, mostly. We've got seed and no soil. We walked past your border post; they didn't seem to have instructions.",
    left: { label: "Give them the fen at Dunmarsh.", fx: { people: -8, gold: -5 }, set: ["com_refugees_settled"], next: { id: "com_refugee_2", delay: 3 } },
    right: { label: "Turn them back.", fx: { faith: -10, army: 5 }, set: ["com_refugees_turned"], next: { id: "com_refugee_turned", delay: 2 } },
  },
  {
    id: "com_refugee_2", char: "refugee", chainOnly: true,
    text: "The fen at Dunmarsh. We've drained it. Sire, we've drained it and it grows. The Dunmarsh folk say it was always theirs to not drain. They've put a fence up. We've put a fence up. It's mostly fences.",
    left: { label: "The fen is the settlers'.", fx: { people: -10, gold: 12 }, next: { id: "com_refugee_3", delay: 4 } },
    right: { label: "Split it.", fx: { people: 3, gold: -5 }, next: { id: "com_refugee_3", delay: 5 } },
  },
  {
    id: "com_refugee_3", char: "refugee", chainOnly: true,
    text: "Dunmarsh has a new headman. He's one of us. Elected, properly. The old Dunmarsh folk want him removed for being foreign. He's lived here eight years. Their word for us is still 'the walkers'.",
    left: { label: "He stays.", fx: { people: 5, faith: 5 }, next: { id: "com_refugee_4", delay: 4 } },
    right: { label: "Remove him.", fx: { people: -8, army: 5 } },
  },
  {
    id: "com_refugee_4", char: "refugee", chainOnly: true,
    text: "The headman of Dunmarsh, once a walker. \"The fen's the best grain land in the north now. Kethra's offered to buy the whole crop. We'd rather sell to you, but you'd have to pay what they pay.\"",
    left: { label: "Pay what Kethra pays.", fx: { gold: -15, people: 12 }, effect: "prosperity" },
    right: { label: "Sell to Kethra.", fx: { gold: 15, people: -5 } },
  },
  {
    id: "com_refugee_turned", char: "refugee", chainOnly: true,
    text: "The ones you turned back didn't go back. There's nothing to go back to. They're camped outside the wall in the rain, and the city's started throwing them bread, which the guards call a breach.",
    left: { label: "Let them in.", fx: { people: -5, faith: 10, gold: -8 }, set: ["com_refugees_settled"] },
    right: { label: "Clear the camp.", fx: { faith: -15, army: 5 } },
  },

  // ---------- Mayor Posy Underhill ----------
  {
    id: "com_halfling_1", char: "halfling", once: true,
    text: "Mayor Underhill of the river-farms. \"Your grain barges are using our river. Which is your river, of course. We'd just like the bargemen to stop mooring on our pies. They dry on the bank.\"",
    left: { label: "Move the moorings.", fx: { people: 5, gold: -5 }, next: { id: "com_halfling_2", delay: 4 } },
    right: { label: "Pies dry elsewhere.", fx: { gold: 5, people: -5 }, set: ["com_halfling_slighted"], next: { id: "com_halfling_2", delay: 3 } },
  },
  {
    id: "com_halfling_2", char: "halfling", chainOnly: true,
    text: "Mayor Underhill, with a basket. \"A gift. Also, the river-farms have voted, very informally, over supper, to be a separate country. Nothing personal. We'd still sell you the flour. Slightly dearer.\"",
    left: { label: "Absolutely not.", fx: { army: 8, people: -5 }, next: { id: "com_halfling_3", delay: 2 } },
    right: { label: "How much dearer?", fx: { gold: -10, people: 5 }, set: ["com_halfling_free"], next: { id: "com_halfling_4", delay: 5 } },
  },
  {
    id: "com_halfling_3", char: "halfling", chainOnly: true,
    text: "\"We heard you sent soldiers. They've eaten everything and one of them married the miller's girl. We're not sure who's occupying whom. Perhaps we could go back to the flour arrangement.\"",
    left: { label: "Flour arrangement.", fx: { gold: 8, people: 5, army: -5 }, unset: ["com_halfling_slighted"] },
    right: { label: "Annex the pies.", fx: { army: 10, gold: 10, people: -15, faith: -5 } },
  },
  {
    id: "com_halfling_4", char: "halfling", chainOnly: true,
    text: "The Free River-Farms, as they're now stitched on the flag, have a problem. \"Kethran boats. Coming up the river. We don't have an army, you see. We have a very good bakery. Could we borrow yours?\"",
    left: { label: "Lend the army.", fx: { army: -12, people: 10, gold: 5 }, unset: ["com_halfling_free"] },
    right: { label: "You're a separate country.", fx: { people: -10, gold: 8 }, set: ["com_kethra_tension"] },
  },
  {
    id: "com_halfling_boats", char: "halfling", weight: 1.5,
    text: "Mayor Underhill. \"Your Guildmaster wants to buy every boat on the river and rent them back to us. He calls it efficiency. We call it Tuesday, because that's when he's coming with the papers.\"",
    left: { label: "Stop Crane.", fx: { people: 8, gold: -8 } },
    right: { label: "Efficiency.", fx: { gold: 18, people: -10 } },
  },

  // ---------- Tock the gnome ----------
  {
    id: "com_gnome_1", char: "gnome", once: true,
    text: "Tock, a gnome, with a box that ticks. \"It tells the hour. Every hour, without a bell-ringer or a sun. Your bell-ringers will hate it. I need a tower to put it in. Yours has a nice one.\"",
    left: { label: "Put it in the tower.", fx: { gold: -10, people: 5, faith: -5 }, set: ["com_tock_clock"], next: { id: "com_gnome_2", delay: 3 } },
    right: { label: "We have the sun.", fx: { faith: 3 } },
  },
  {
    id: "com_gnome_2", char: "gnome", chainOnly: true,
    text: "Tock. \"The clock works. Now — letters. Metal letters. I ink them, press them, one page becomes a hundred. A hundred of anything. Sermons, tax rolls, songs about you. The Church says it's witchcraft.\"",
    left: { label: "Build the press.", fx: { faith: -15, people: 10, gold: 5 }, set: ["com_tock_press"], next: { id: "com_gnome_3", delay: 2 } },
    right: { label: "Only the Church may copy.", fx: { faith: 10, people: -5 } },
  },
  {
    id: "com_gnome_3", char: "flamekeeper", chainOnly: true,
    text: "The High Flamekeeper, holding a printed page at arm's length. \"A thousand Books of Flame. In a week. Anyone can read it now, Sire. Anyone can read it wrong. Smash the gnome's machine or I will.\"",
    left: { label: "Smash it.", fx: { faith: 12, people: -12 }, unset: ["com_tock_press"] },
    right: { label: "Print a thousand more.", fx: { faith: -15, people: 10, gold: 12 }, next: { id: "com_gnome_4", delay: 4 } },
  },
  {
    id: "com_gnome_4", char: "gnome", chainOnly: true,
    text: "Tock, with a drawing. Wings. \"It flies. I've flown a goat off the clock tower and the goat is, with one exception, fine. It's built for a man your weight. I need someone brave, or someone your weight.\"",
    left: { label: "Strap me in.", fx: { people: 10 }, random: [
      { chance: 0.5, fx: { people: 15, faith: -10 } },
      { chance: 0.5, die: "fell_from_tower" },
    ] },
    right: { label: "Fly the Chancellor.", fx: { people: 5, gold: -5 }, random: [
      { chance: 0.6, fx: { army: -5 } },
      { chance: 0.4, fx: { people: 8, gold: 5 } },
    ] },
  },
  {
    id: "com_gnome_pump", char: "gnome", weight: 1.5,
    text: "Tock. \"The Deep Holds flood every spring. I've made a pump. Steam. The dwarves won't buy it; it isn't in any contract. If you buy it and give it to them, that's a gift. Gifts have no clauses.\"",
    left: { label: "Buy the pump.", fx: { gold: -15, army: 5 } },
    right: { label: "Let them flood.", fx: { gold: 8, faith: 3 } },
  },

  // ---------- Sir Gavriel ----------
  {
    id: "com_knight_1", char: "knight", once: true,
    text: "Sir Gavriel. \"There's a beast in the Thornwood taking children. Not many. Enough. I'd like to go and kill it. I'd like a horse that isn't lame and three men who aren't drunk. Two would do.\"",
    left: { label: "Horse and three men.", fx: { army: -8, gold: -5 }, next: { id: "com_knight_2", delay: 2 } },
    right: { label: "Go on foot. Alone.", fx: { army: 5 }, next: { id: "com_knight_2_alone", delay: 2 } },
  },
  {
    id: "com_knight_2", char: "knight", chainOnly: true,
    text: "Sir Gavriel, with a head in a sack. \"It was a wolf. A big one. The children were the fae's; the wolf was just the story they told. The fae would like the wolf back. And the children. I've said no.\"",
    left: { label: "Give the fae the wolf.", fx: { faith: -5, people: 10, army: -5 } },
    right: { label: "Keep saying no.", fx: { army: 10, people: 5 }, set: ["com_gavriel_fae"], next: { id: "com_knight_3", delay: 5 } },
  },
  {
    id: "com_knight_2_alone", char: "knight", chainOnly: true,
    text: "Sir Gavriel came back on a cart, mostly. \"It's dead, Sire. So is my horse, and I've an arm that doesn't turn. I'd like to note for the record that I asked for three men.\"",
    left: { label: "A pension.", fx: { gold: -10, army: 8 } },
    right: { label: "Noted.", fx: { army: -10, people: -3 } },
  },
  {
    id: "com_knight_3", char: "knight", chainOnly: true,
    text: "Sir Gavriel. \"A fae lord has challenged me to single combat over the wolf. I'll fight him. Their rules say my liege stands as second, in the ring, unarmed. That's you. Wear something you don't mind losing.\"",
    left: { label: "Stand as second.", fx: { army: 15, faith: -5 }, random: [
      { chance: 0.7, fx: { people: 10 } },
      { chance: 0.3, die: "fae_bargain" },
    ] },
    right: { label: "Send the Chancellor as me.", fx: { army: -12, people: -5 } },
  },
  {
    id: "com_knight_tourney", char: "knight", weight: 1.5,
    text: "Sir Gavriel. \"A tournament, Sire. The men need something to hit that isn't each other. The people need something to watch that isn't a hanging. You'd ride in the first tilt. Tradition.\"",
    left: { label: "I'll ride.", fx: { gold: -12, army: 10, people: 10 }, random: [
      { chance: 0.85, fx: {} },
      { chance: 0.15, die: "duel" },
    ] },
    right: { label: "You ride. I'll watch.", fx: { gold: -12, people: 8, army: -5 } },
  },

  // ---------- Kethra ----------
  {
    id: "com_kethra_envoy_1", char: "foreign_envoy", chainOnly: true,
    text: "The Kethran envoy, who has practised this. \"The Emperor regrets Redwater. He notes your riders also cross. He proposes a tariff on Vaelish wool to cover the horses. Twelve percent.\"",
    left: { label: "Pay the tariff.", fx: { gold: -15, army: -8 }, next: { id: "com_kethra_envoy_2", delay: 4, else: "com_kethra_insult" } },
    right: { label: "Tariff Kethran wine.", fx: { gold: 12, people: -5 }, set: ["com_kethra_tension"], next: { id: "com_kethra_envoy_2", delay: 3, else: "com_kethra_insult" } },
  },
  {
    id: "com_kethra_envoy_2", char: "foreign_envoy", chainOnly: true, when: { notEffects: ["married"] },
    text: "The envoy. \"The Emperor has a daughter. Unmarried, clever, plays the harp badly. He has a border he'd like settled. He has put these two thoughts in the same letter and asks you to notice.\"",
    left: { label: "Send for the harp.", fx: { army: 5, gold: 10, people: 5 }, effect: "married", set: ["com_kethra_wife"], next: { id: "com_kethra_married", delay: 3 } },
    right: { label: "I've noticed.", fx: { army: -5 }, next: { id: "com_kethra_insult", delay: 4 } },
  },
  {
    id: "com_kethra_married", char: "queen", chainOnly: true,
    text: "The Queen, over breakfast. \"My father's written. He wants Redwater as my dowry, which he neglected to mention at the wedding. He says he's sure you won't mind. I've told him you will.\"",
    left: { label: "Give him Redwater.", fx: { army: -15, people: -10, gold: 10 } },
    right: { label: "I mind.", fx: { army: 10, people: 5 }, set: ["com_kethra_tension"], next: { id: "com_kethra_insult", delay: 3 } },
  },
  {
    id: "com_kethra_insult", char: "foreign_king", chainOnly: true,
    text: "The Emperor of Kethra has written in his own hand. Three pages. The kindest word for you in it is \"provincial\". He ends by offering to buy Redwater for a sum a child would laugh at, \"as a courtesy\".",
    left: { label: "Sell it. Buy something nice.", fx: { gold: 20, army: -15, people: -10 } },
    right: { label: "Burn the letter. Publicly.", fx: { army: 10, people: 8 }, effect: "war", set: ["com_kethra_war"], next: { id: "com_kethra_war_1", delay: 2 } },
  },
  {
    id: "com_kethra_war_1", char: "messenger", chainOnly: true,
    text: "Redwater's fallen, Sire. Kethra took it in a day. The Marshal says he can take it back in a month, or take Kethra's own border fort in a week, which he says is the same thing but louder.",
    left: { label: "Take Redwater back.", fx: { army: -10, gold: -10 }, next: { id: "com_kethra_war_2", delay: 3 } },
    right: { label: "Take their fort.", fx: { army: 10, gold: -15 }, random: [
      { chance: 0.6, fx: { people: 10 }, next: { id: "com_kethra_war_2", delay: 3 } },
      { chance: 0.4, fx: { army: -20, people: -10 }, next: { id: "com_kethra_war_2", delay: 2 } },
    ] },
  },
  {
    id: "com_kethra_war_2", char: "foreign_envoy", chainOnly: true,
    text: "The envoy, under a white flag he's holding as if it's dirty. \"The Emperor finds the war tedious. So, he suspects, do you. Redwater stays as it is. Each side pays its own dead. He calls this generous.\"",
    left: { label: "Peace.", fx: { people: 10, army: -10 }, removeEffect: "war", unset: ["com_kethra_war", "com_kethra_tension"] },
    right: { label: "One more season.", fx: { army: 10, people: -10, gold: -15 }, random: [
      { chance: 0.5, fx: { army: 10, people: 10 }, removeEffect: "war", unset: ["com_kethra_war"] },
      { chance: 0.5, fx: { army: -20 } },
    ] },
  },
  {
    id: "com_kethra_trade", char: "foreign_envoy", when: { notEffects: ["war"] }, weight: 1.5,
    text: "The Kethran envoy. \"Kethra would buy your iron. All of it. At a very good price, for ten years, exclusively. Your smiths would have to buy it back from us, of course. At a different price.\"",
    left: { label: "Sell the iron.", fx: { gold: 30, army: -15, people: -5 } },
    right: { label: "Our iron stays.", fx: { gold: -5, army: 5 } },
  },
  {
    id: "com_kethra_ambassador", char: "foreign_king", when: { notEffects: ["war"] }, once: true, weight: 0.5,
    text: "The Emperor of Kethra himself, unannounced, with forty riders in the courtyard. \"I was passing. I thought I'd see what you look like.\" He looks. \"Hm.\" He would like dinner.",
    left: { label: "Dinner. The good wine.", fx: { gold: -15, army: 5, people: 5 } },
    right: { label: "Dinner. The other wine.", fx: { gold: -5, army: -5 }, set: ["com_kethra_tension"] },
  },

  // ---------- Captain Sable ----------
  {
    id: "com_pirate_1", char: "pirate", once: true,
    text: "Captain Sable, who was asked to leave her sword at the door and hasn't. \"Kethran grain ships. Fat, slow, badly guarded. A paper saying I'm yours, and the Crown gets a third. If it goes wrong, you never met me.\"",
    left: { label: "Write the paper.", fx: { gold: 15, army: -5 }, set: ["com_sable_marque"], next: { id: "com_pirate_2", delay: 3 } },
    right: { label: "Hang her.", fx: { faith: 5, people: -5, gold: -3 } },
  },
  {
    id: "com_pirate_2", char: "pirate", chainOnly: true,
    text: "Sable, with a chest. \"Your third. Also, I took a ship that turned out to be yours. Flying Kethran colors, which I'd call your captain's fault. I kept the cargo. I brought you the captain. He's furious.\"",
    left: { label: "Give the cargo back.", fx: { gold: -10, army: 8 }, next: { id: "com_pirate_3", delay: 4 } },
    right: { label: "Keep it. Hang the captain.", fx: { gold: 20, army: -12 }, set: ["com_kethra_tension"], next: { id: "com_pirate_3", delay: 3 } },
  },
  {
    id: "com_pirate_3", char: "pirate", chainOnly: true,
    text: "Sable, in a hurry. \"Kethra's sent a fleet. For me, but they've got your paper. They'll hang me and call it your war. I can outrun them with you aboard — nobody fires on a king. Probably.\"",
    left: { label: "Aboard.", fx: { army: -10 }, random: [
      { chance: 0.6, fx: { gold: 20, people: 10 } },
      { chance: 0.4, die: "lost_at_sea" },
    ] },
    right: { label: "Burn the paper.", fx: { gold: -15, army: 5 }, unset: ["com_sable_marque"] },
  },
  {
    id: "com_pirate_raid", char: "pirate", when: { flags: ["com_sable_marque"] }, weight: 1.5,
    text: "Sable. \"Slow year. Kethra's guarding its grain now. There's a fat Church barge on the Marl, though, carrying tithe upriver. Nobody would know. Well. You would.\"",
    left: { label: "Nobody would know.", fx: { gold: 25, faith: -20 } },
    right: { label: "Not the Church.", fx: { faith: 5, gold: -5 } },
  },

  // ---------- Marrow the slaver ----------
  {
    id: "com_slaver_1", char: "slaver", once: true,
    text: "A man called Marrow, who smells of the coast. \"Labor, Majesty. Kethran prisoners, orc debtors, some nobody's asked about. Cheap. They'd build your walls in half the time and eat half the bread.\"",
    left: { label: "Buy them.", fx: { gold: -10, army: 10, faith: -10, people: -10 }, set: ["com_slaver_bought"], next: { id: "com_slaver_2", delay: 3 } },
    right: { label: "Chain him. See how he likes it.", fx: { people: 10, faith: 8, army: -5 } },
  },
  {
    id: "com_slaver_2", char: "slaver", chainOnly: true,
    text: "Marrow, pleased. \"The walls are up. The men are... not all up. Some of your farmers have asked to buy a few for the harvest. I'd need a license. Something with your seal, so it's proper.\"",
    left: { label: "License him.", fx: { gold: 25, people: -15, faith: -15 } },
    right: { label: "Get out of my country.", fx: { people: 10, faith: 8, gold: -8 }, unset: ["com_slaver_bought"] },
  },

  // ---------- plague ----------
  {
    id: "com_plague_1", char: "plague_doctor", when: { notEffects: ["plague"] }, once: true,
    text: "A man in a leather mask with a beak. \"Doctor Vell. The cooper's family on Tanner Lane went blue and stopped moving. Six houses since. Shut the lane. All of it. Well people inside.\"",
    left: { label: "Shut the lane.", fx: { people: -12, faith: 5 }, next: { id: "com_plague_2", delay: 1 } },
    right: { label: "It's a bad week. Wait.", fx: { people: 5 }, effect: "plague", next: { id: "com_plague_2", delay: 1 } },
  },
  {
    id: "com_plague_2", char: "plague_doctor", chainOnly: true,
    text: "Vell. \"It's in Coppergate now, and the palace kitchens. Your cook is blue. I can burn the Tanners' Quarter, which works, or the Church can hold a procession, which doesn't, but they'll do it anyway.\"",
    left: { label: "Burn the Quarter.", fx: { people: -15, gold: -10, faith: -5 }, removeEffect: "plague", next: { id: "com_plague_3", delay: 3 } },
    right: { label: "Let them process.", fx: { faith: 10 }, effect: "plague", random: [
      { chance: 0.7, fx: { people: -10 }, next: { id: "com_plague_3", delay: 2 } },
      { chance: 0.3, die: "plague" },
    ] },
  },
  {
    id: "com_plague_3", char: "plague_doctor", chainOnly: true,
    text: "Vell, mask off. Younger than you thought. \"It's burning out. Nine hundred dead. I've a list of who hoarded grain and sold it at four times. Some names you'll know. One of them's on your council.\"",
    left: { label: "Hang the names.", fx: { people: 15, gold: -5, army: -8 } },
    right: { label: "Burn the list.", fx: { gold: 20, people: -12 } },
  },
  {
    id: "com_plague_granary", char: "plague_doctor", when: { effects: ["plague", "granary"] }, weight: 1.5,
    text: "Vell. \"The plague's worst in the hungry streets. You've a granary full. Open it and I lose half as many. Keep it and you'll have grain in the autumn, and fewer mouths to argue about it.\"",
    left: { label: "Open the granary.", fx: { people: 15, gold: -10 }, removeEffect: "granary" },
    right: { label: "Keep it.", fx: { people: -12, gold: 5 } },
  },
  {
    id: "com_plague_cure", char: "plague_doctor", when: { effects: ["plague"] },
    text: "Vell. \"A goblin is selling a cure in Coppergate. Vinegar, garlic, and something that bites. The Church wants him burned for false hope. Half the street's taken it. Half the street's alive, so.\"",
    left: { label: "Buy the lot.", fx: { gold: -15, faith: -8, people: 10 } },
    right: { label: "Burn the goblin.", fx: { faith: 10, people: -10 } },
  },

  // ---------- famine ----------
  {
    id: "com_famine_1", char: "peasant", when: { notEffects: ["famine"] }, once: true,
    text: "Nan Cobb, of Marlow Bottom, with a hundred behind her. \"Rain since planting. The wheat's lying flat and black. There isn't a harvest, Lordship. There's a field. We've come for bread.\"",
    left: { label: "Open the stores.", fx: { gold: -20, people: 10 }, effect: "famine", next: { id: "com_famine_2", delay: 1 } },
    right: { label: "Pray for a dry spell.", fx: { faith: 8, people: -15 }, effect: "famine", next: { id: "com_famine_2", delay: 1 } },
  },
  {
    id: "com_famine_2", char: "merchant", chainOnly: true,
    text: "Crane. \"The Guild has grain, Majesty. Kethran, mostly. We'd sell to the Crown at cost, plus a modest — please don't look at me like that — plus a modest sum for the risk we took in buying it.\"",
    left: { label: "Pay the modest sum.", fx: { gold: -20, people: 15 }, removeEffect: "famine", next: { id: "com_famine_3", delay: 3 } },
    right: { label: "Seize the grain.", fx: { gold: 5, people: 10, army: -10 }, removeEffect: "famine", set: ["com_grain_seized"], next: { id: "com_famine_3", delay: 3 } },
  },
  {
    id: "com_famine_3", char: "peasant", chainOnly: true,
    text: "Nan Cobb again. Fewer behind her. \"We lived. Most. The village wants a granary, proper stone, so we never come to you like that again. We've no stone and no mason. We've a lot of turnips.\"",
    left: { label: "Stone and a mason.", fx: { gold: -20, people: 12 }, effect: "granary" },
    right: { label: "Turnips again next year, then.", fx: { people: -12, gold: 10 } },
  },
  {
    id: "com_famine_seized", char: "merchant", when: { flags: ["com_grain_seized"] }, once: true,
    text: "Crane, formally, without the usual smile. \"The Guild has closed its warehouses to the Crown. Every one. We remember the grain. You'll find things cost more from now on, and arrive later, if at all.\"",
    left: { label: "Pay for the grain.", fx: { gold: -20, people: -5 }, unset: ["com_grain_seized"] },
    right: { label: "Open the warehouses. Now.", fx: { army: 5, people: -10, gold: 10 }, unset: ["com_grain_seized"], random: [
      { chance: 0.7, fx: {} },
      { chance: 0.3, fx: { gold: -25 } },
    ] },
  },

  // ---------- the bridge ----------
  {
    id: "com_bridge_1", char: "peasant", once: true,
    text: "Two villages, one bridge. Cheddle built it. Owlsbury's on the other end and won't pay toward it, but won't stop walking on it. Cheddle's come to ask leave to take the bridge down. Their half.",
    left: { label: "Owlsbury pays half.", fx: { people: 3, gold: 3 }, next: { id: "com_bridge_2", delay: 2 } },
    right: { label: "Take down your half.", fx: { people: -8 }, next: { id: "com_bridge_2", delay: 2 } },
  },
  {
    id: "com_bridge_2", char: "troll", chainOnly: true,
    text: "A troll, comfortable under the Cheddle bridge. \"Nobody was using it right. Bridge needs a troll. I'm the troll. Penny a foot, two a cart. Or the king can walk through the river.\"",
    left: { label: "Pay the troll.", fx: { gold: -10, people: 8 } },
    right: { label: "Walk through the river.", fx: { army: 5 }, random: [
      { chance: 0.7, fx: { people: -8 } },
      { chance: 0.3, die: "troll_toll" },
    ] },
  },

  // ---------- the mill ----------
  {
    id: "com_mill_1", char: "peasant", chainOnly: true,
    text: "The miller of Coppergate, red in the face. \"Granny Hesse says I'm short-weighting. I'm not. The wheel's slow because the Church built a chapel upstream and the millrace runs through the font.\"",
    left: { label: "Move the chapel.", fx: { faith: -12, people: 10 }, next: { id: "com_mill_2", delay: 3 } },
    right: { label: "Move the mill.", fx: { gold: -12, faith: 5 } },
  },
  {
    id: "com_mill_2", char: "flamekeeper", chainOnly: true,
    text: "The High Flamekeeper. \"The chapel is moved. The font is now dry. The miller grinds twice as fast and half the parish eats bread instead of fasting. I want him excommunicated. Him, or his wheel.\"",
    left: { label: "Excommunicate the wheel.", fx: { faith: 8, people: -5 } },
    right: { label: "Nobody's excommunicated.", fx: { faith: -10, people: 8 } },
  },

  // ---------- festivals & misc everyday ----------
  {
    id: "com_festival_flame", char: "peasant", weight: 2,
    text: "Coppergate wants Flame Night the old way: bonfires, a wicker king, the wicker king goes on the bonfire. Tradition. The Church says it's very much not, and would like the wicker king to be a saint.",
    left: { label: "Burn the wicker king.", fx: { people: 12, faith: -10 } },
    right: { label: "Burn a wicker saint.", fx: { faith: 10, people: -8 } },
  },
  {
    id: "com_festival_beer", char: "innkeeper", weight: 1.5,
    text: "Bess. \"Harvest fair. Three days. I'll need the ban on brewing lifted, the guard told to drink slower, and you to open it. Last king opened it and fell off the stage. Best fair anyone remembers.\"",
    left: { label: "Open the fair.", fx: { people: 12, gold: -8 }, random: [
      { chance: 0.9, fx: {} },
      { chance: 0.1, fx: { army: -5, people: 10 } },
    ] },
    right: { label: "No fair this year.", fx: { people: -12, gold: 10, faith: 3 } },
  },
  {
    id: "com_hanging", char: "executioner", weight: 1.5,
    text: "The executioner. \"Three for the rope this month, Sire. A horse thief, a heretic and a man who says he's your cousin. The crowd want all three. I'm asking about the cousin.\"",
    left: { label: "Hang all three.", fx: { people: 10, faith: 5, army: -5 } },
    right: { label: "Spare the cousin.", fx: { people: -8, army: 5 } },
  },
  {
    id: "com_dog_sheep", char: "peasant",
    text: "Thornby. Your hound got out and killed six of my sheep. I know it was yours because it's got a collar with your name on, and it's sat in my kitchen now, and won't leave.",
    left: { label: "Pay for the sheep.", fx: { gold: -8, people: 8 } },
    right: { label: "You have a dog now.", fx: { people: -8 } },
  },
  {
    id: "com_gold_rumor", char: "innkeeper", when: { stats: { gold: [70, 100] } },
    text: "Bess, low-voiced. \"Every drunk in the Rat knows the vaults are full. They're counting it in songs. I've heard three plans to rob you and one to marry you. I'd spend some, if I were you. Fast.\"",
    left: { label: "A feast for the city.", fx: { gold: -20, people: 15 } },
    right: { label: "Double the vault guard.", fx: { gold: -5, army: 8, people: -5 } },
  },
  {
    id: "com_army_rumor", char: "old_woman", when: { stats: { army: [70, 100] } },
    text: "Granny Hesse. \"Soldiers everywhere. Marching up and down. The fourth king had that many soldiers. He gave them a war and they came back and gave him a funeral. Mind how you go.\"",
    left: { label: "Disband a regiment.", fx: { army: -15, gold: 15 } },
    right: { label: "They're loyal.", fx: { army: 5 } },
  },
  {
    id: "com_faith_rumor", char: "peasant", when: { stats: { faith: [70, 100] } },
    text: "Haddock's End. There's a Flamekeeper in every village now. They've started asking who we'd follow if it came to it, you or the Flame. We said you. We're not sure that was the right answer for us.",
    left: { label: "It was the right answer.", fx: { faith: -15, people: 10 } },
    right: { label: "Say the Flame next time.", fx: { faith: 8, people: -10 } },
  },
  {
    id: "com_msg_border_fair", char: "messenger",
    text: "Sire, the goblins have set up a market inside the border at Redwater. Overnight. Stalls, a tavern, a tent that says BANK. The captain can burn it, but the men have already spent their pay there.",
    left: { label: "Tax the market.", fx: { gold: 12, army: -5 } },
    right: { label: "Burn it.", fx: { army: -8, faith: 5, people: -5 } },
  },
  {
    id: "com_child_orc", char: "child",
    text: "A girl of eight, holding an orc child by the hand. \"He was lost at the fair. He doesn't speak right. Can he stay at ours till his mum comes? Mum says only if you say.\"",
    left: { label: "He can stay.", fx: { people: 5, faith: -5, army: -3 } },
    right: { label: "Send him to the Scar.", fx: { army: 5, people: -5 } },
  },
  {
    id: "com_refugee_smith", char: "refugee", when: { flags: ["com_refugees_settled"] },
    text: "One of the walkers, a smith. \"I made swords in the Burned Lands. Good ones. Your Marshal won't take mine; he says the steel's foreign. It's the same iron. I'm the foreign part.\"",
    left: { label: "Buy his swords.", fx: { army: 10, gold: -10, people: -3 } },
    right: { label: "The Marshal decides.", fx: { army: 3, people: -5 } },
  },
  {
    id: "com_bard_elegy", char: "bard", when: { minReign: 15 }, once: true, weight: 0.5,
    text: "Lute-Tam, older. \"I've written your elegy. Early, I know. Kings don't give notice. It's good. Genuinely. I'd like to know if you'd rather it was true or kind, because I can't do both.\"",
    left: { label: "True.", fx: { people: -5, army: 5, faith: 5 } },
    right: { label: "Kind.", fx: { people: 8, gold: -8 } },
  },
  {
    id: "com_granny_last", char: "old_woman", when: { minReign: 20 }, once: true, weight: 0.5,
    text: "Granny Hesse, sat down without asking, for the first time. \"I'm going to die before you. Didn't expect that. You've done all right. Don't let it go to your head. The second one let it go to his head.\"",
    left: { label: "Thank you, Granny.", fx: { people: 10 } },
    right: { label: "You'll outlive me yet.", fx: { faith: 3 } },
  },
];
