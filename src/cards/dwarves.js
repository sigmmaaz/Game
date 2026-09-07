// The Deep Holds under the Iron Teeth. Everything is a contract; every contract has an annex.
export default [
  // ---------- everyday: the Thane ----------
  {
    id: "dwarf_envoy_intro", char: "dwarf_envoy", weight: 2,
    text: "Dunna, envoy of the Deep Holds, three foot nine and not interested in your chair. \"The Thane sends greetings, itemised. There are six. Do you want them read?\"",
    left: { label: "Read them.", fx: { faith: 3, gold: -3 } },
    right: { label: "Round it off.", fx: { people: 3 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_thane_rounding", char: "dwarf_thane", weight: 2,
    text: "\"Your treasurer rounded our tariff to the nearest crown. The difference is four coppers. The insult is not four coppers. The insult is that she thought we wouldn't count.\"",
    left: { label: "Pay the four coppers.", fx: { gold: -3, people: -3 } },
    right: { label: "Keep the change.", fx: { gold: 5 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_thane_border_stone", char: "dwarf_thane",
    text: "\"Your border stone at Kell's Hollow is seventeen inches inside our line. It has been for ninety years. We've measured to the inch. We will be watching the inch.\"",
    left: { label: "Move the stone.", fx: { gold: -5, people: -5 } },
    right: { label: "It's a stone.", fx: { army: 5 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_thane_wedding", char: "dwarf_thane", when: { effects: ["married"] }, once: true,
    text: "\"Congratulations on your marriage. A gift: a chest, and a clause that the chest remains ours and you are leasing it. The contents are yours. Mostly.\"",
    left: { label: "Accept the chest.", fx: { gold: 15 }, set: ["dwarf_chest_leased"], next: { id: "dwarf_thane_chest", delay: 5 } },
    right: { label: "No leases.", fx: { gold: -3, people: 3 } },
  },
  {
    id: "dwarf_thane_chest", char: "dwarf_envoy", chainOnly: true,
    text: "\"The chest lease is up. We'd like the chest. We've noticed you've been keeping the crown jewels in it, which the lease permits and the annex taxes.\"",
    left: { label: "Pay the tax.", fx: { gold: -15 }, unset: ["dwarf_chest_leased"] },
    right: { label: "Keep the chest.", fx: { gold: 5, army: 5 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_thane_mining_rights", char: "dwarf_thane", once: true,
    text: "\"Under your Duke's hills there is silver. Under the silver there is us. We were there first. Sell us the rights and we'll leave the hills where they are.\"",
    left: { label: "Sell.", fx: { gold: 20, people: -10 }, set: ["dwarf_mining"], next: { id: "dwarf_mining_peasant", delay: 3 } },
    right: { label: "The hills stay whole.", fx: { people: 5, gold: -5 } },
  },
  {
    id: "dwarf_mining_peasant", char: "peasant", chainOnly: true,
    text: "Arn, from the Duke's hills. \"The ground hums at night, Your Kingness. Cows won't lie down. And a dwarf came up in the churchyard Tuesday, said sorry, went back down.\"",
    left: { label: "Compensate the village.", fx: { gold: -10, people: 10 } },
    right: { label: "Cows can stand.", fx: { people: -10, faith: -5 } },
  },
  {
    id: "dwarf_thane_hostage", char: "dwarf_thane", once: true,
    text: "\"The Treaty of the Teeth requires a hostage of good family every ten years. Yours is overdue. We are still holding your uncle. He's happy. He'd like to know if you want him.\"",
    left: { label: "Send my brother.", fx: { army: 5, people: -5, gold: 5 } },
    right: { label: "Keep the uncle.", fx: { people: 3 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_thane_census", char: "dwarf_thane",
    text: "\"We are conducting a census of debts owed to the Holds by humans. You are humans. Sign here to confirm you exist. Do not sign there; that's a mortgage.\"",
    left: { label: "Sign here.", fx: { gold: -2 } },
    right: { label: "Sign there.", fx: {}, random: [
      { chance: 0.5, fx: { gold: 20 }, set: ["dwarf_loan"] },
      { chance: 0.5, fx: { gold: -20 } },
    ] },
  },
  {
    id: "dwarf_thane_funeral", char: "dwarf_thane", once: true, when: { minYear: 8 },
    text: "\"My father is dead. He kept the ledger before me. His last entry is your family's name, underlined twice. I'd like you at the funeral. It's a long walk down.\"",
    left: { label: "Walk down.", fx: { faith: -5, army: -5, people: 5 }, unset: ["dwarf_grudge"] },
    right: { label: "Send flowers.", fx: { people: 3 }, set: ["dwarf_grudge"] },
  },

  // ---------- everyday: Master Hesk ----------
  {
    id: "dwarf_eng_bridge", char: "dwarf_engineer",
    text: "\"Your bridge at Hollin Ford. Whoever built it used arches. Arches are for people who don't know how strong iron is. Let me rebuild it. Nothing will cross it that I don't want to.\"",
    left: { label: "Rebuild it.", fx: { gold: -15, people: 5, army: 5 } },
    right: { label: "The arches are fine.", fx: {}, random: [
      { chance: 0.8, fx: { people: -3 } },
      { chance: 0.2, fx: { people: -12 } },
    ] },
  },
  {
    id: "dwarf_eng_clock", char: "dwarf_engineer",
    text: "\"A clock. For the tower. It strikes the hour, and on the hour it fires a small cannon, so people know it's the hour. The cannon is essential. Without it, it's just a clock.\"",
    left: { label: "Without the cannon.", fx: { gold: -10, people: 5 } },
    right: { label: "With the cannon.", fx: { gold: -15 }, random: [
      { chance: 0.8, fx: { people: 12 } },
      { chance: 0.2, fx: { people: -10, army: -5 } },
    ] },
  },
  {
    id: "dwarf_eng_sewer", char: "dwarf_engineer",
    text: "\"Your city smells like a city. I can fix that. Pipes under every street, water pushed by a wheel. It's the wheel I want to talk about. It's big. It needs the river. All of it.\"",
    left: { label: "Take the river.", fx: { gold: -25, people: 15 } },
    right: { label: "The river stays.", fx: { people: -5 } },
  },
  {
    id: "dwarf_eng_drill", char: "dwarf_engineer",
    text: "\"I've built a drill that goes through granite like bread. I tested it on granite. Then on bread. Then, briefly, on the Thane's door. I need somewhere to be for a while.\"",
    left: { label: "Hide him.", fx: { army: 5, gold: -5 }, set: ["dwarf_grudge"] },
    right: { label: "Return him to Borri.", fx: { gold: 10, faith: 3 } },
  },
  {
    id: "dwarf_eng_bellows", char: "dwarf_engineer",
    text: "\"Your smiths use bellows worked by boys. Mine are worked by water. Your boys will be out of work. Your iron will be twice as good. Both things are true and I only care about one.\"",
    left: { label: "Water bellows.", fx: { army: 10, people: -10, gold: -10 } },
    right: { label: "Keep the boys.", fx: { people: 5, army: -5 } },
  },
  {
    id: "dwarf_eng_wall", char: "dwarf_engineer",
    text: "\"Your city wall. I could bring it down in an afternoon with two barrels and a nap. I mention this because someone else could too, and they wouldn't nap first.\"",
    left: { label: "Reinforce the wall.", fx: { gold: -20, army: 10 } },
    right: { label: "Nobody else has barrels.", fx: { army: -5, people: 3 } },
  },

  // ---------- everyday: Dunna ----------
  {
    id: "dwarf_envoy_tithe", char: "dwarf_envoy",
    text: "\"The Church has been tithing our miners who work on your side. They don't worship the Flame. They worship depth, mostly, and their mothers. Stop it, or we tithe your priests when they come down.\"",
    left: { label: "Exempt the miners.", fx: { faith: -10, gold: 5 } },
    right: { label: "Everyone tithes.", fx: { faith: 10, gold: 3 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_envoy_market", char: "dwarf_envoy", weight: 2,
    text: "\"A dwarf market, one day a week, in your square. Iron, lamps, locks, and ale that will change your opinions. We take a fifth of the stall-fees and the right to weigh your weights.\"",
    left: { label: "Grant it.", fx: { gold: 10, people: 5 } },
    right: { label: "Weigh your own weights.", fx: { people: -3, gold: -3 } },
  },
  {
    id: "dwarf_envoy_measure", char: "dwarf_envoy",
    text: "\"Your yard is thirty-five and a half of our inches. Ours is thirty-six. For a century your cloth merchants have been short-changing ours by half an inch a yard. I have the total.\"",
    left: { label: "Pay the half-inches.", fx: { gold: -15 } },
    right: { label: "Use our yard.", fx: { gold: 5, people: 3 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_envoy_insult", char: "dwarf_envoy",
    text: "\"Your jester did a dwarf voice at the harvest feast. We have a recording — a scribe. The voice was accurate, which is the problem. Entry twenty-two, if you don't act.\"",
    left: { label: "Flog the jester.", fx: { people: -10, army: 3 } },
    right: { label: "It was accurate.", fx: { people: 5 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_envoy_refugee", char: "dwarf_envoy", once: true,
    text: "\"Goblins have been driven out of the Under-Teeth by something we're not discussing. Three hundred are in our lower halls. We'd like them to be in yours. We'll pay by the head.\"",
    left: { label: "Take them.", fx: { gold: 15, people: -15 } },
    right: { label: "Not my goblins.", fx: { gold: -3, army: 3 } },
  },

  // ---------- everyday: Grombold ----------
  {
    id: "dwarf_smith_horseshoes", char: "dwarf_smith",
    text: "\"Your cavalry's shoes are shite. Pardon. Your farriers use soft iron and nail it hot. I'll shoe the whole army. It'll cost more than the horses did. Worth it.\"",
    left: { label: "Shoe them.", fx: { gold: -20, army: 15 } },
    right: { label: "The horses have managed.", fx: { army: -5 } },
  },
  {
    id: "dwarf_smith_apprentice", char: "dwarf_smith", when: { effects: ["heir"] }, once: true,
    text: "\"I want your prince for a year. Apprentice. He'll burn his hands, learn a trade, and come back knowing what things weigh. No king of yours has ever known what anything weighed.\"",
    left: { label: "A year.", fx: { people: 5, army: -5, faith: -3 } },
    right: { label: "He's a prince.", fx: { people: -3 } },
  },
  {
    id: "dwarf_smith_bell", char: "dwarf_smith",
    text: "\"Your temple bell has a crack. Osric says it's a holy crack. It isn't. It's a bad pour. I'll recast it free. I can't sleep with that noise coming down through the rock.\"",
    left: { label: "Recast it.", fx: { faith: -10, people: 5 } },
    right: { label: "The crack is holy.", fx: { faith: 10, people: -5 } },
  },
  {
    id: "dwarf_smith_armor", char: "dwarf_smith", once: true,
    text: "\"A suit of plate. For you. Fitted, proofed, warm in winter. You'd survive a fall from a horse, an arrow, a brother. Not a bath. Don't bathe in it.\"",
    left: { label: "Fit me.", fx: { gold: -20, army: 10 }, set: ["dwarf_armor"] },
    right: { label: "I don't fall off horses.", fx: { army: 3 } },
  },
  {
    id: "dwarf_smith_hammer", char: "dwarf_smith", once: true,
    text: "\"My grandfather's hammer is in your treasury. Your grandfather borrowed it to knight someone. I've not struck a true blow in forty years. Neither has anything I've made.\"",
    left: { label: "Return it.", fx: { gold: -5, army: 5 } },
    right: { label: "It's a royal hammer now.", fx: { gold: 5, army: -5 }, set: ["dwarf_grudge"] },
  },

  // ---------- everyday: humans on the subject of dwarves ----------
  {
    id: "dwarf_treasurer_ledger", char: "treasurer",
    text: "Odile Penn: \"The dwarves have sent our ledgers back. Corrected. In red. There are four hundred corrections and every one of them is right. I would like to resign, or have them killed.\"",
    left: { label: "Neither.", fx: { gold: 10 } },
    right: { label: "Hire the dwarf who did it.", fx: { gold: 15, people: -5 } },
  },
  {
    id: "dwarf_general_plans", char: "general", once: true, when: { minReign: 2 },
    text: "Thorne. \"The Deep Holds have iron, powder, and a front door I could hold with forty men. Or take with four hundred. I've drawn up both plans. I prefer the second.\"",
    left: { label: "Neither plan.", fx: { army: -10 } },
    right: { label: "The second.", fx: { army: 15, gold: -20 }, effect: "war", set: ["dwarf_grudge"], next: { id: "dwarf_war_1", delay: 2 } },
  },
  {
    id: "dwarf_war_1", char: "dwarf_thane", chainOnly: true,
    text: "Borri, under a flag of contract. \"Your Marshal is in our front hall. It's where we keep guests and floods. He can leave with his men or stay with the flood. Sign the peace. The clauses are short, for once.\"",
    left: { label: "Sign.", fx: { gold: -25, army: -10 }, removeEffect: "war" },
    right: { label: "Hold the hall.", fx: {}, random: [
      { chance: 0.5, fx: { army: -25 }, removeEffect: "war" },
      { chance: 0.5, die: "buried_alive" },
    ] },
  },
  {
    id: "dwarf_peasant_lamps", char: "peasant",
    text: "Hob, from Lowmarket. \"The dwarves sell lamps that don't go out. Ever. My wife bought one. Now she reads. At night. Books. Sire, I'd like them banned, for the family.\"",
    left: { label: "Ban the lamps.", fx: { people: -10, faith: 5 } },
    right: { label: "Let her read.", fx: { people: 5, faith: -5 } },
  },
  {
    id: "dwarf_flamekeeper_depth", char: "flamekeeper",
    text: "Osric. \"The dwarves worship downward. The Flame rises. These are not compatible theologies, and now they're selling lamps in my parish. I want a sermon-tax on all dwarf goods.\"",
    left: { label: "Tax them.", fx: { faith: 10, gold: 5 }, set: ["dwarf_grudge"] },
    right: { label: "No.", fx: { faith: -10, people: 5 } },
  },
  {
    id: "dwarf_child_contract", char: "child",
    text: "A child, filthy to the neck. \"There's a hole behind the fishmarket that goes down forever and there's a dwarf at the bottom and he gave me this.\" It's a contract. Her name's on it.",
    left: { label: "Tear it up.", fx: { people: 5 }, set: ["dwarf_grudge"] },
    right: { label: "What did you sign?", fx: { gold: -10, people: 3 } },
  },
  {
    id: "dwarf_jester_tiles", char: "jester",
    text: "Pib. \"Why don't dwarves get lost? They always know where they stand — on a clause! No? Fine. The envoy's outside counting the floor tiles. I think she's found one missing.\"",
    left: { label: "Fix the tile.", fx: { gold: -3 } },
    right: { label: "Send Pib to explain.", fx: { people: 5 }, set: ["dwarf_grudge"] },
  },

  // ---------- chain: the inherited debt ----------
  {
    id: "dwarf_debt_1", char: "dwarf_thane", once: true,
    text: "\"Annex nine. Your great-aunt hired forty pick-men for a well that never got dug. Forty pick-men have forty grandsons. They'd like their wages, with a hundred years of interest, compounded.\"",
    left: { label: "Pay the grandsons.", fx: { gold: -20, people: 5 } },
    right: { label: "No well, no wages.", fx: { gold: 5 }, set: ["dwarf_grudge"], next: { id: "dwarf_debt_2", delay: 3 } },
  },
  {
    id: "dwarf_debt_2", char: "dwarf_envoy", chainOnly: true,
    text: "\"The Thane sent me because he's too angry to be polite. The well is now a lien on your salt mines. You still own the salt. We own what's under it, which is more salt.\"",
    left: { label: "Take the lower salt.", fx: { gold: -15 } },
    right: { label: "Salt is salt. Mine.", fx: { army: 5, gold: 5 }, next: { id: "dwarf_debt_3", delay: 3 } },
  },
  {
    id: "dwarf_debt_3", char: "dwarf_thane", chainOnly: true,
    text: "\"The lien has matured. Clause forty converts unpaid liens to labour, and clause forty-one names the debtor's person as collateral of last resort. I've never had to read forty-one aloud. I'd rather not.\"",
    left: { label: "Pay it. All of it.", fx: { gold: -30 } },
    right: { label: "Read it aloud.", fx: { army: 10 }, random: [
      { chance: 0.5, fx: { gold: -15, army: -10 } },
      { chance: 0.5, die: "dwarven_contract" },
    ] },
  },

  // ---------- chain: the loan ----------
  {
    id: "dwarf_loan_1", char: "dwarf_envoy", when: { stats: { gold: [0, 30] }, notFlags: ["dwarf_loan"] }, weight: 2,
    text: "\"Your treasury echoes. We heard it from under the floor. The Deep Holds lend at a fair rate: one part in eight, yearly, with a small annex about your grandchildren.\"",
    left: { label: "Read me the annex.", fx: {}, next: { id: "dwarf_loan_annex", delay: 0 } },
    right: { label: "Take the gold.", fx: { gold: 25 }, set: ["dwarf_loan"], next: { id: "dwarf_loan_2", delay: 4 } },
  },
  {
    id: "dwarf_loan_annex", char: "dwarf_envoy", chainOnly: true,
    text: "\"If the principal is unpaid at your death, it passes to the heir, who may not refuse it, on pain of what the annex calls 'the customary remedy'. Nobody has needed to ask what that is.\"",
    left: { label: "Take the gold anyway.", fx: { gold: 25 }, set: ["dwarf_loan"], next: { id: "dwarf_loan_2", delay: 4 } },
    right: { label: "Keep your gold.", fx: { people: -5 } },
  },
  {
    id: "dwarf_loan_2", char: "dwarf_thane", chainOnly: true,
    text: "\"First instalment. One part in eight, plus a fee for the courier, plus a fee for the fee, which is traditional. I didn't write the tradition. I do enforce it.\"",
    left: { label: "Pay.", fx: { gold: -15 } },
    right: { label: "Next year.", fx: { gold: 3 }, set: ["dwarf_loan_late"], next: { id: "dwarf_loan_3", delay: 2 } },
  },
  {
    id: "dwarf_loan_3", char: "dwarf_thane", chainOnly: true,
    text: "\"You've missed a payment. The rate is now one part in five. The annex is now two annexes. The second one is about your dog.\"",
    left: { label: "Pay everything.", fx: { gold: -30 }, unset: ["dwarf_loan", "dwarf_loan_late"] },
    right: { label: "Leave the dog out of it.", fx: { army: 5, people: -5 }, next: { id: "dwarf_loan_4", delay: 3 } },
  },
  {
    id: "dwarf_loan_4", char: "dwarf_envoy", chainOnly: true,
    text: "Dunna, with a sealed iron box. \"It's the loan, called in full. Or it's the customary remedy. I don't know which. I wasn't allowed to look.\"",
    left: { label: "Open it.", fx: {}, random: [
      { chance: 0.5, fx: { gold: -35 }, unset: ["dwarf_loan", "dwarf_loan_late"] },
      { chance: 0.5, die: "dwarven_contract" },
    ] },
    right: { label: "Pay in full. Now.", fx: { gold: -40, people: -10 }, unset: ["dwarf_loan", "dwarf_loan_late"] },
  },
  {
    id: "dwarf_loan_settle", char: "dwarf_envoy", when: { flags: ["dwarf_loan"], stats: { gold: [60, 100] } },
    text: "\"You appear to have money. We appear to have a loan. Settle it now, while the annex is still only about your grandchildren.\"",
    left: { label: "Settle it.", fx: { gold: -25 }, unset: ["dwarf_loan", "dwarf_loan_late"] },
    right: { label: "Money's for spending.", fx: { gold: 5, people: 5 }, set: ["dwarf_grudge"] },
  },

  // ---------- chain: the Deep Vault ----------
  {
    id: "dwarf_vault_1", char: "dwarf_thane", once: true, when: { notEffects: ["vault"], stats: { gold: [40, 100] } },
    text: "\"Kings are robbed. It's in the nature of kings and of robbers. We can build you a Deep Vault: a door no thief can open and no king can lose the key to. We keep the spare.\"",
    left: { label: "How much?", fx: {}, next: { id: "dwarf_vault_2", delay: 0 } },
    right: { label: "I trust my guards.", fx: { army: 5 } },
  },
  {
    id: "dwarf_vault_2", char: "dwarf_thane", chainOnly: true,
    text: "\"Forty thousand, in three payments, with a clause that we may inspect it. 'Inspect' is defined in annex three. It runs to eleven pages.\"",
    left: { label: "Build it.", fx: { gold: -30 }, next: { id: "dwarf_vault_3", delay: 3 } },
    right: { label: "Too much.", fx: { gold: 3 }, next: { id: "dwarf_vault_haggle", delay: 0 } },
  },
  {
    id: "dwarf_vault_haggle", char: "dwarf_thane", chainOnly: true,
    text: "Borri has never haggled. He looks at you like you asked him to dance. \"The price is the price.\" A long silence. \"However. A smaller door.\"",
    left: { label: "A smaller door.", fx: { gold: -20 }, next: { id: "dwarf_vault_3", delay: 4 } },
    right: { label: "No door.", fx: { people: 3 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_vault_3", char: "dwarf_engineer", chainOnly: true,
    text: "Hesk, dusty. \"Vault's finished. Door weighs more than your chapel. The combination's your grandmother's birthday, which we looked up. She'd be a hundred and twelve.\"",
    left: { label: "Good.", fx: { faith: -3 }, effect: "vault" },
    right: { label: "Change the combination.", fx: { gold: -5 }, effect: "vault" },
  },

  // ---------- chain: Hesk's inventions ----------
  {
    id: "dwarf_hesk_1", char: "dwarf_engineer", once: true,
    text: "Hesk unrolls a drawing. It's a tower on wheels. It throws a smaller tower. \"For sieges. Or for arguing. Twelve years of thinking. Three of them in hospital.\"",
    left: { label: "Build one.", fx: { gold: -15, army: 10 }, next: { id: "dwarf_hesk_2", delay: 2 } },
    right: { label: "Keep thinking.", fx: { army: -3 } },
  },
  {
    id: "dwarf_hesk_2", char: "dwarf_engineer", chainOnly: true,
    text: "\"The engine works. It threw the smaller tower into the Marshal's stables. The Marshal says it's the finest weapon he's seen. He's also billing you for horses.\"",
    left: { label: "Pay for the horses.", fx: { gold: -10, army: 5 }, next: { id: "dwarf_hesk_3", delay: 3 } },
    right: { label: "He's a Marshal. He has horses.", fx: { army: -10 }, next: { id: "dwarf_hesk_3", delay: 3 } },
  },
  {
    id: "dwarf_hesk_3", char: "dwarf_engineer", chainOnly: true,
    text: "\"Next: a mine. Not the digging kind. You bury it, someone stands on it, it stops them standing. I've made forty. I've mislaid one.\"",
    left: { label: "Find the one.", fx: { gold: -10, people: 5 }, next: { id: "dwarf_hesk_4", delay: 2 } },
    right: { label: "Bury the other thirty-nine at the Scar.", fx: { army: 15, people: -5 }, set: ["dwarf_mines_laid"], next: { id: "dwarf_hesk_4", delay: 2 } },
  },
  {
    id: "dwarf_hesk_4", char: "dwarf_engineer", chainOnly: true,
    text: "\"Safe powder. Burns slow, won't go off if dropped, won't go off if shouted at. I've been shouting at it for a month. May I test it in your cellar?\"",
    left: { label: "Not the cellar.", fx: { gold: -5, army: 5 }, next: { id: "dwarf_hesk_5", delay: 1 } },
    right: { label: "The cellar's fine.", fx: {}, random: [
      { chance: 0.6, fx: { army: 10, gold: -10 }, next: { id: "dwarf_hesk_5", delay: 1 } },
      { chance: 0.4, die: "explosion" },
    ] },
  },
  {
    id: "dwarf_hesk_5", char: "dwarf_engineer", chainOnly: true,
    text: "\"The test went well. The quarry is now a lake.\" Hesk is happier than you have ever seen anyone. He wants a hundred barrels and permission to put them somewhere \"clever\".",
    left: { label: "A hundred barrels.", fx: { gold: -20, army: 15 }, set: ["dwarf_powder"], next: { id: "dwarf_powder_store", delay: 3 } },
    right: { label: "Nothing clever. No.", fx: { army: -5, people: 5 } },
  },
  {
    id: "dwarf_powder_store", char: "general", chainOnly: true,
    text: "\"Hesk's barrels are in the old chapel crypt. The Flamekeeper found them. He lit a candle to complain. He's fine. The candle's still burning.\"",
    left: { label: "Move the barrels.", fx: { gold: -10, faith: 5 } },
    right: { label: "Snuff the candle. Slowly.", fx: {}, random: [
      { chance: 0.7, fx: { faith: -10, army: 5 } },
      { chance: 0.3, die: "explosion" },
    ] },
  },
  {
    id: "dwarf_mines_orc", char: "general", when: { flags: ["dwarf_mines_laid"] }, once: true,
    text: "\"The Ashfang found Hesk's mines. One of them found them the hard way. Grukhar wants to know if we're at war, because he'd like to be told first next time.\"",
    left: { label: "Apologise to an orc.", fx: { army: -10, people: 5 } },
    right: { label: "Now they know.", fx: { army: 10, faith: -5 }, random: [
      { chance: 0.6, fx: {} },
      { chance: 0.4, fx: { people: -10 }, effect: "war" },
    ] },
  },

  // ---------- chain: the tunnels ----------
  {
    id: "dwarf_tunnel_1", char: "steward", once: true, when: { minReign: 2 },
    text: "Wendel, pale. \"A baker on Coin Street went to fetch flour and fell through his floor. There is a tunnel. It has lamps. Somebody has swept it.\"",
    left: { label: "Send the Guard down.", fx: { army: 5 }, next: { id: "dwarf_tunnel_2", delay: 1 } },
    right: { label: "Ask the Thane.", fx: {}, next: { id: "dwarf_tunnel_2b", delay: 1 } },
  },
  {
    id: "dwarf_tunnel_2", char: "captain", chainOnly: true,
    text: "\"My men went down. They came up with a receipt. Your grandfather sold the ground under the city, but not the city. The dwarves kept the ground. There's a stamp.\"",
    left: { label: "Buy the ground back.", fx: { gold: -25, people: 5 } },
    right: { label: "Fill it in.", fx: { gold: -10, army: 5 }, set: ["dwarf_grudge"], next: { id: "dwarf_tunnel_3", delay: 3 } },
  },
  {
    id: "dwarf_tunnel_2b", char: "dwarf_thane", chainOnly: true,
    text: "\"The tunnel. Yes. Clause six of the Ground Sale, first year of your grandfather. Under the city is ours; the city is yours. We were going to mention it when it mattered.\"",
    left: { label: "Buy the ground back.", fx: { gold: -25, people: 5 } },
    right: { label: "Get out from under my city.", fx: { army: 5 }, set: ["dwarf_grudge"], next: { id: "dwarf_tunnel_3", delay: 3 } },
  },
  {
    id: "dwarf_tunnel_3", char: "dwarf_envoy", chainOnly: true,
    text: "Dunna, from beneath a street grate. \"We filled the tunnel like you asked. With water. It's ours; we fill it how we like. Your wells taste of clay now. Sorry about that.\"",
    left: { label: "Pay for pipes.", fx: { gold: -15, people: 5 } },
    right: { label: "Boil it.", fx: { people: -10 }, random: [
      { chance: 0.7, fx: {} },
      { chance: 0.3, fx: { people: -5 }, effect: "plague" },
    ] },
  },

  // ---------- chain: the treaty ----------
  {
    id: "dwarf_treaty_1", char: "dwarf_envoy", once: true, when: { notFlags: ["dwarf_contract_signed"], minReign: 1 },
    text: "Dunna sets down a document the height of a child. \"A trade treaty. Iron for wheat, fixed rate, a hundred years. Nine hundred clauses. You have until dusk.\"",
    left: { label: "Read it.", fx: { gold: -5 }, next: { id: "dwarf_treaty_2", delay: 0 } },
    right: { label: "Sign it unread.", fx: {}, random: [
      { chance: 0.5, fx: { gold: 10 }, set: ["dwarf_contract_signed"], effect: "prosperity" },
      { chance: 0.5, fx: { gold: -20, people: -10 }, set: ["dwarf_contract_signed", "dwarf_bad_treaty"], effect: "prosperity", next: { id: "dwarf_treaty_bad", delay: 2 } },
    ] },
  },
  {
    id: "dwarf_treaty_2", char: "treasurer", chainOnly: true,
    text: "Odile has read four hundred clauses. \"Clause 212 gives them the right to name our coinage. Clause 340 is about beards. Clause 511 is fair. For the rest I'd need a year.\"",
    left: { label: "Strike 212 and 340.", fx: {}, next: { id: "dwarf_treaty_3", delay: 1 } },
    right: { label: "Sign as written.", fx: { gold: 5, faith: -5 }, set: ["dwarf_contract_signed", "dwarf_bad_treaty"], effect: "prosperity", next: { id: "dwarf_treaty_bad", delay: 3 } },
  },
  {
    id: "dwarf_treaty_3", char: "dwarf_envoy", chainOnly: true,
    text: "\"Struck. Both. Borri says you read it, which nobody has done since the Ground Sale, and he's very slightly impressed. He wants that phrase in the minutes.\" She slides the pen.",
    left: { label: "Sign.", fx: { gold: -5 }, set: ["dwarf_contract_signed"], effect: "prosperity" },
    right: { label: "One more clause. Mine.", fx: { army: 5, people: 5 }, next: { id: "dwarf_treaty_4", delay: 1 } },
  },
  {
    id: "dwarf_treaty_4", char: "dwarf_thane", chainOnly: true,
    text: "Your clause: 'the King may not be dug under.' Borri has read it nine times. \"Fine. It costs you the pass tolls.\" He signs. His hand is shaking. It's rage, not age.",
    left: { label: "Done.", fx: { gold: -10, people: 5 }, set: ["dwarf_contract_signed", "dwarf_no_digging"], effect: "prosperity" },
    right: { label: "Withdraw the clause.", fx: { gold: 5 }, set: ["dwarf_contract_signed"], effect: "prosperity" },
  },
  {
    id: "dwarf_treaty_bad", char: "dwarf_thane", chainOnly: true,
    text: "\"You signed clause 212. Your coins are now called 'the Borri'. Your people find this funny. Your treasurer does not. Neither, I promise you, do I.\"",
    left: { label: "Rename them back.", fx: { gold: -15 }, set: ["dwarf_grudge"], unset: ["dwarf_bad_treaty"] },
    right: { label: "Long live the Borri.", fx: { people: 5, faith: -5, gold: -5 } },
  },
  {
    id: "dwarf_treaty_dividend", char: "dwarf_envoy", when: { flags: ["dwarf_contract_signed"] },
    text: "\"The year's iron, on schedule, to the pound. The wheat you sent was a bushel short. I'd like to say it doesn't matter. The ledger doesn't let me.\"",
    left: { label: "Send the bushel.", fx: { gold: -3, army: 3 } },
    right: { label: "A bushel.", fx: { gold: 3 }, set: ["dwarf_grudge"] },
  },

  // ---------- chain: the mountain pass ----------
  {
    id: "dwarf_pass_1", char: "merchant", once: true,
    text: "Crane. \"The Iron Teeth pass is the short road to the Holds. The dwarves close it in winter. Their winter runs September to June. Ask them to open it, or I ship by troll.\"",
    left: { label: "Ask them.", fx: {}, next: { id: "dwarf_pass_2", delay: 1 } },
    right: { label: "Ship by troll.", fx: { gold: -10, people: -3 } },
  },
  {
    id: "dwarf_pass_2", char: "dwarf_thane", chainOnly: true,
    text: "\"The pass is closed for a reason. The reason is snow, and what snow does. Sign a waiver — annex two, no liability for burials — and we'll open it for your caravans.\"",
    left: { label: "Sign the waiver.", fx: { gold: 15 }, set: ["dwarf_pass_open"], next: { id: "dwarf_pass_3", delay: 2 } },
    right: { label: "No waiver.", fx: { gold: -5 } },
  },
  {
    id: "dwarf_pass_3", char: "messenger", chainOnly: true,
    text: "\"The first caravan through the pass met the snow. The snow won. Eleven wagons gone. The Thane has sent the waiver back with 'as discussed' underlined.\"",
    left: { label: "Close the pass.", fx: { gold: -10, people: 5 }, unset: ["dwarf_pass_open"] },
    right: { label: "Send the next one. I'll ride with it.", fx: {}, random: [
      { chance: 0.6, fx: { gold: 20, people: 5, army: 5 } },
      { chance: 0.4, die: "avalanche" },
    ] },
  },
  {
    id: "dwarf_pass_tolls", char: "dwarf_envoy", when: { flags: ["dwarf_pass_open"] },
    text: "\"Pass tolls. Fourteen wagons, a third of a wagon — a cart — and one bishop, who counts as freight under annex two. Payment due.\"",
    left: { label: "Pay for the bishop.", fx: { gold: -10, faith: 5 } },
    right: { label: "A bishop is not freight.", fx: { faith: 5, gold: 3 }, set: ["dwarf_grudge"] },
  },

  // ---------- chain: the forge ----------
  {
    id: "dwarf_forge_1", char: "dwarf_smith", once: true,
    text: "Grombold turns your crown over like a bad egg. \"Tin under the gilt. Whoever made this hated your family. I'll make a real one. It'll take a year and cost you a year.\"",
    left: { label: "Make the crown.", fx: { gold: -20 }, next: { id: "dwarf_forge_crown", delay: 2 } },
    right: { label: "Make me a sword instead.", fx: { gold: -15 }, next: { id: "dwarf_forge_sword", delay: 2 } },
  },
  {
    id: "dwarf_forge_crown", char: "dwarf_smith", chainOnly: true,
    text: "The crown is finished. It's heavy in a way that means something. Grombold says there's a clause etched inside the band. He won't say what. \"You'll find out when it applies.\"",
    left: { label: "Wear it.", fx: { faith: 10, people: 10 }, set: ["dwarf_crown"], next: { id: "dwarf_crown_inspect", delay: 6 } },
    right: { label: "What clause?", fx: {}, next: { id: "dwarf_forge_crown_2", delay: 0 } },
  },
  {
    id: "dwarf_forge_crown_2", char: "dwarf_smith", chainOnly: true,
    text: "\"It says the crown returns to the forge if it's worn by a fool. It's a joke. Smiths' joke. Probably.\" He does not laugh. Dwarves don't, at work.",
    left: { label: "Wear it.", fx: { faith: 10, people: 10 }, set: ["dwarf_crown"], next: { id: "dwarf_crown_inspect", delay: 6 } },
    right: { label: "Melt it down.", fx: { gold: 10, army: -5 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_crown_inspect", char: "dwarf_smith", chainOnly: true,
    text: "Grombold, unannounced. \"The crown's due for inspection. Annex one. Take it off.\" He looks inside the band for a long time. \"Still fits,\" he says. It sounds like a reprieve.",
    left: { label: "Thank him.", fx: { gold: -5, faith: 3 } },
    right: { label: "Never do that again.", fx: { army: 3 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_forge_sword", char: "dwarf_smith", chainOnly: true,
    text: "The sword has no name. \"Names are for swords that need help.\" It's light, and the edge doesn't catch the light so much as remove it. He wants it tested on something.",
    left: { label: "Give it to the Marshal.", fx: { army: 15, gold: -5 } },
    right: { label: "I'll test it myself.", fx: {}, random: [
      { chance: 0.7, fx: { army: 10, people: 5 }, set: ["dwarf_sword"] },
      { chance: 0.3, die: "duel" },
    ] },
  },

  // ---------- chain: under the palace ----------
  {
    id: "dwarf_under_1", char: "dwarf_engineer", once: true, when: { minReign: 3 },
    text: "Hesk, no goggles, which is how you know it's serious. \"We were surveying under your palace — clause six, don't start — and we found something. We've stopped. We'd like to keep it stopped.\"",
    left: { label: "Found what?", fx: {}, next: { id: "dwarf_under_2", delay: 0 } },
    right: { label: "Then stop.", fx: { faith: 5 }, next: { id: "dwarf_under_2b", delay: 5 } },
  },
  {
    id: "dwarf_under_2", char: "dwarf_engineer", chainOnly: true,
    text: "\"I'm not describing it. I'm a dwarf, we describe everything, it's how you know it's bad. There's a door. It's older than the Holds. It's warm.\"",
    left: { label: "Open it.", fx: { faith: -10 }, next: { id: "dwarf_under_3", delay: 1 } },
    right: { label: "Seal it in stone.", fx: { gold: -15, faith: 5 }, set: ["dwarf_under_sealed"] },
  },
  {
    id: "dwarf_under_2b", char: "dwarf_thane", chainOnly: true,
    text: "\"Hesk stopped. Someone else didn't. Three of my miners went down and one came up. He's been counting backwards for a week. Bill attached, under 'hazards not disclosed by client'.\"",
    left: { label: "Pay it.", fx: { gold: -20 } },
    right: { label: "Not disclosed by me.", fx: { army: 5 }, set: ["dwarf_grudge"], next: { id: "dwarf_under_3", delay: 2 } },
  },
  {
    id: "dwarf_under_3", char: "flamekeeper", chainOnly: true,
    text: "Osric has heard about the door. \"Whatever lies beneath the seat of the Flame's anointed is the Church's concern. We will bless it. Then we will open it. Then we will bless it again.\"",
    left: { label: "Let the Church open it.", fx: {}, random: [
      { chance: 0.6, fx: { faith: 15 } },
      { chance: 0.4, fx: { faith: -15, people: -10 }, next: { id: "dwarf_under_4", delay: 1 } },
    ] },
    right: { label: "Nobody opens it.", fx: { faith: -10, gold: -10 }, set: ["dwarf_under_sealed"] },
  },
  {
    id: "dwarf_under_4", char: "dwarf_thane", chainOnly: true,
    text: "Borri, at night, alone. \"Your priests opened the door. Something came up through the Holds instead of your palace. The invoice for that is—\" He stops. \"There's no invoice. I want it shut. I'll pay.\"",
    left: { label: "We shut it together.", fx: { gold: 10, army: -15, faith: -5 }, set: ["dwarf_under_sealed"], unset: ["dwarf_grudge"] },
    right: { label: "Your problem now.", fx: {}, random: [
      { chance: 0.6, fx: { faith: -15, army: -10 }, set: ["dwarf_grudge"] },
      { chance: 0.4, die: "cursed" },
    ] },
  },

  // ---------- chain: the grudge ledger ----------
  {
    id: "dwarf_grudge_1", char: "dwarf_envoy", when: { flags: ["dwarf_grudge"] }, oncePerReign: true, weight: 2,
    text: "Dunna reads from a slim black book. \"Grudge ledger, House of Vael. Fourteen entries. The last three are yours. Borri says you can settle in gold, or you can be in the book. It's a long book.\"",
    left: { label: "Settle in gold.", fx: { gold: -20 }, unset: ["dwarf_grudge"] },
    right: { label: "I like books.", fx: { army: 5 }, next: { id: "dwarf_grudge_2", delay: 4 } },
  },
  {
    id: "dwarf_grudge_2", char: "merchant", chainOnly: true,
    text: "Crane. \"Every smith in the Holds has stopped shipping to Vael. Not refused. Stopped. There's a difference, they say, and it's in a book.\" The price of iron has tripled.",
    left: { label: "Buy elf iron.", fx: { gold: -20, army: -5 } },
    right: { label: "Make do.", fx: { army: -15, people: -5 }, next: { id: "dwarf_grudge_3", delay: 3 } },
  },
  {
    id: "dwarf_grudge_3", char: "dwarf_thane", chainOnly: true,
    text: "Borri, with the ledger. \"We've been not shipping for three years. That's a page. Apologise in writing — I have the writing here — or the next page is about your walls.\"",
    left: { label: "Sign the apology.", fx: { people: -10, faith: -5 }, unset: ["dwarf_grudge"] },
    right: { label: "Show me the page about walls.", fx: { army: 10 }, random: [
      { chance: 0.6, fx: { army: -20, gold: -15 } },
      { chance: 0.4, die: "dwarven_contract" },
    ] },
  },

  // ---------- chain: the ale ----------
  {
    id: "dwarf_ale_1", char: "innkeeper", once: true,
    text: "\"The dwarves want to sell their ale in the city. I've had it. I was ill for a day and honest for three. Nobody wants honest for three days, Majesty. Not in my trade.\"",
    left: { label: "License it.", fx: { gold: 10, people: 5 }, set: ["dwarf_ale"], next: { id: "dwarf_ale_2", delay: 3 } },
    right: { label: "Ban it.", fx: { people: -5 }, set: ["dwarf_grudge"] },
  },
  {
    id: "dwarf_ale_2", char: "captain", chainOnly: true,
    text: "Rook. \"The dwarf ale. Half the Guard drank it Saturday. Sunday they confessed to things. Monday I had to arrest nine of my own men for what they said Sunday.\"",
    left: { label: "Pardon them.", fx: { army: 10, faith: -5 } },
    right: { label: "Let it stand.", fx: { army: -15, faith: 10 } },
  },
  {
    id: "dwarf_ale_3", char: "flamekeeper", when: { flags: ["dwarf_ale"] }, once: true,
    text: "Osric. \"This dwarf drink. Men drink it and speak only truth for a day. The confessionals are empty; they simply tell their wives. It is an attack on the sacraments.\"",
    left: { label: "Ban the ale.", fx: { faith: 10, people: -10, gold: -5 }, unset: ["dwarf_ale"], set: ["dwarf_grudge"] },
    right: { label: "Truth is holy.", fx: { faith: -15, people: 5 } },
  },

  // ---------- rare ----------
  {
    id: "dwarf_rare_ledger_burn", char: "dwarf_thane", once: true, weight: 0.5, when: { flags: ["dwarf_grudge"], minYear: 15 },
    text: "Borri, whispering, which for a dwarf means shouting quietly. \"The grudge ledger is a book. Books burn. I'm old. I'd let it happen, for a price. Nobody in the Holds may know I said this.\"",
    left: { label: "Pay the price.", fx: { gold: -30, people: 5 }, unset: ["dwarf_grudge"] },
    right: { label: "A dwarf who'd burn a ledger.", fx: { faith: 5, army: 5 } },
  },
  {
    id: "dwarf_rare_gold_vein", char: "dwarf_engineer", once: true, weight: 0.5,
    text: "Hesk, out of breath. \"There's gold under your throne room. A vein. A big one. I can have it out in a month. The throne room will be lower afterwards, but still a room.\"",
    left: { label: "Dig.", fx: {}, random: [
      { chance: 0.7, fx: { gold: 30, people: -5 } },
      { chance: 0.3, die: "buried_alive" },
    ] },
    right: { label: "Leave it.", fx: { faith: 5 } },
  },
  {
    id: "dwarf_rare_dragon", char: "dwarf_thane", once: true, weight: 0.5, when: { minYear: 10 },
    text: "\"Vorrath the dragon owes the Holds. Clause one of the oldest contract we have. We'd like to collect. We need a human to hand him the invoice. Tradition. Dwarves who hand it are eaten.\"",
    left: { label: "I'll hand it to him.", fx: {}, random: [
      { chance: 0.5, fx: { gold: 25, army: 10, faith: 5 } },
      { chance: 0.5, die: "eaten_by_dragon" },
    ] },
    right: { label: "Send a volunteer.", fx: { people: -10, gold: 10 } },
  },
  {
    id: "dwarf_rare_star_iron", char: "dwarf_smith", once: true, weight: 0.5,
    text: "\"A star fell on the Teeth. Iron from the sky. Enough for one blade or one crown, not both. Whatever it becomes will outlast your line. Choose knowing that.\"",
    left: { label: "A crown.", fx: { faith: 15, gold: -20 } },
    right: { label: "A blade.", fx: { army: 15, gold: -20 } },
  },
  {
    id: "dwarf_rare_bottom", char: "dwarf_engineer", once: true, weight: 0.5, when: { minYear: 20 },
    text: "\"We've found the bottom. Of everything. Under the Holds, under the roots. It's flat and it's warm and someone has written on it. We'd like to stop digging. We've never wanted that before.\"",
    left: { label: "Stop.", fx: { faith: 10, gold: -5 } },
    right: { label: "What's written?", fx: {}, random: [
      { chance: 0.7, fx: { faith: -15, army: -5 } },
      { chance: 0.3, die: "cursed" },
    ] },
  },
  {
    id: "dwarf_rare_beard", char: "dwarf_envoy", once: true, weight: 0.5, when: { effects: ["married"] },
    text: "\"The Queen touched Borri's beard at the feast. She meant it kindly. Among us that's a proposal or a challenge, and she isn't dwarf enough for either. He needs an answer.\"",
    left: { label: "It was a proposal.", fx: { people: 10, faith: -10, gold: -10 } },
    right: { label: "It was a challenge.", fx: {}, random: [
      { chance: 0.7, fx: { army: 10 } },
      { chance: 0.3, die: "duel" },
    ] },
  },
  {
    id: "dwarf_rare_handshake", char: "dwarf_thane", once: true, weight: 0.5, when: { flags: ["dwarf_contract_signed"], notFlags: ["dwarf_grudge"], minYear: 12 },
    text: "Borri, without a document. It takes you a moment to recognise him. \"Twelve years of treaty and not one clause disputed. I have nothing to give you but this.\" He shakes your hand. It hurts.",
    left: { label: "Hm.", fx: { people: 5, army: 5, gold: 5 } },
    right: { label: "Put it in the minutes.", fx: { faith: 5, people: 3 } },
  },
  {
    id: "dwarf_rare_no_digging", char: "dwarf_engineer", once: true, weight: 0.5, when: { flags: ["dwarf_no_digging"] },
    text: "Hesk, sheepish. \"Your clause says you may not be dug under. It doesn't say beside. We've dug beside. The palace is now on a sort of island. It's fine. It's mostly fine.\"",
    left: { label: "Fill it in.", fx: { gold: -15, army: 5 } },
    right: { label: "Mostly?", fx: {}, random: [
      { chance: 0.6, fx: { people: -10 } },
      { chance: 0.4, fx: { gold: -20, people: -10 }, set: ["dwarf_grudge"] },
    ] },
  },
  {
    id: "dwarf_rare_armor_test", char: "brother", once: true, weight: 0.5, when: { flags: ["dwarf_armor"] },
    text: "Edmund admires your dwarf plate at length. \"Grombold says it stops arrows. I've a longbow and a wager with the Marshal. Purely to settle the wager.\"",
    left: { label: "Fire, brother.", fx: {}, random: [
      { chance: 0.8, fx: { army: 10, people: 5 } },
      { chance: 0.2, die: "assassin_blade" },
    ] },
    right: { label: "Settle it on a straw man.", fx: { army: -5 } },
  },
];
