import story from "./story.js";
import court from "./court.js";
import elves from "./elves.js";
import orcs from "./orcs.js";
import dwarves from "./dwarves.js";
import church from "./church.js";
import commons from "./commons.js";
import monsters from "./monsters.js";

// Every card file in the game. New files must be added here and pass tools/validate.js.
const files = [story, court, elves, orcs, dwarves, church, commons, monsters];

export default files.flat();
