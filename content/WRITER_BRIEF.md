# Brief for a card writer

You are one of several writers on Crown of Ash, a swipe-a-card kingdom game.
Read `content/CARD_FORMAT.md` in full before writing a word. Then read
`src/cards/story.js` if it exists, to match tone.

Your job: write ONE file, `src/cards/<yourfile>.js`, exporting a default array
of cards, as specified in your assignment. Use only characters, effects and
deaths listed in the format doc. Prefix every card id and every flag you
invent with your file's prefix.

Process:
1. Draft the cards. Write like a person: specific nouns, dry humour, real
   stakes. Re-read the WRITING RULES section and cut anything generic.
2. Run `node tools/validate.js src/cards/<yourfile>.js`. Fix every error.
   Read the warnings and fix the ones about banned phrases and duplicate-ish
   text.
3. Read your file top to bottom once as a player would. Delete or rewrite any
   card that (a) could be swapped with another by find-and-replace, (b)
   explains its own joke, (c) has both choices with tiny effects (the game
   must be lethal — at least 40% of choices should include a ±10 or larger
   swing, and at least 3 of your cards should be able to kill the king via
   `die` or `random`), or (d) is a rhetorical question.
4. Make sure at least a third of your cards are in chains (`next` + flags),
   with 2–5 cards per chain, and that chains escalate.
5. Include a mix: ~60% repeatable everyday cards (weight 1–2), ~30% chain
   cards (`chainOnly: true` for cards that should ONLY appear via `next`),
   ~10% rare (`once: true`, weight 0.5).
6. Balance: sum the fx across your file per meter. No meter's total should be
   more than ±150 away from zero. The validator prints the sums.

Do not touch any other file. Do not commit. When done, reply with the card
count and the validator's last output.
