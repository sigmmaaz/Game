# Crown of Ash

A swipe-a-card kingdom game. You are the human king of the Empire of Vael, wedged
between elves, orcs, dwarves, dragons, the Church of the Undying Flame and a
demon who says your grandfather owes him. Swipe left or right on each petition.
Every swipe is a year. Keep four meters — Flame, People, Army, Treasury —
between empty and full, because either end kills you.

Plain HTML/CSS/ES modules, no build step, no dependencies. Progress is saved in
`localStorage`.

## Run

```
python3 -m http.server 3000
```

Open http://localhost:3000. Drag the card, or use the arrow keys.

## Layout

- `src/engine.js` — rules: meters, years, card draw (unseen cards are weighted up so the deck reveals itself), follow-up queues, effects, deaths, objectives, save/load.
- `src/modes.js` — the two mini-games: the duel (read your opponent's tells) and the Deep (a descent with a torch that runs out).
- `src/cards/*.js` — the deck, ~1000 cards in twelve themed files. `story.js` is the spine (the Bargainer, the Deep, old age, the ending).
- `src/characters.js`, `src/effects.js`, `src/deaths.js` — everyone who talks to you, every lingering effect, every way to die.
- `src/portrait.js` — procedural SVG portraits.
- `content/CARD_FORMAT.md` — the card schema and writing guide. Read it before adding cards.

## Tools

```
node tools/validate.js     # schema, references, duplicates, banned phrases
node tools/simulate.js 500 # headless playtest: reign lengths, death mix, coverage
node tools/simulate.js 500 --random
node tools/audit.js        # style tics across the deck
```
