// Procedural SVG portraits so every character has a distinct face without art assets.
import { CHARACTERS } from "./characters.js";

function hsl(h, s, l) { return `hsl(${h} ${s}% ${l}%)`; }

const SKIN = {
  human: (h) => hsl((h + 20) % 360, 30, 72),
  hooded: () => "#3a2f2a",
  elf: () => "#efe1cf",
  orc: (h) => hsl(95, 30, 40),
  dwarf: (h) => hsl(25, 40, 68),
  goblin: () => hsl(75, 45, 45),
  troll: () => hsl(200, 20, 45),
  halfling: () => hsl(30, 40, 74),
  gnome: () => hsl(20, 40, 76),
  giant: () => hsl(210, 15, 60),
  dragon: () => hsl(0, 55, 30),
  fae: () => hsl(290, 35, 80),
  vampire: () => "#e8e2e6",
  skeleton: () => "#e5dcc5",
  wolf: () => hsl(215, 10, 45),
  demon: () => "#1a0a0a",
  angel: () => "#f4ead6",
  beast: () => hsl(130, 25, 25),
  plague: () => "#2a2a2a",
  dog: () => hsl(35, 50, 55),
  rat: () => hsl(30, 15, 45),
  ghost: () => "rgba(220,235,240,.85)",
};

const HAIR = { grey: "#9a9a9a", black: "#1c1a1a", red: "#8e3a22", brown: "#5a3a22", dark: "#2b1d16", white: "#eeeeee", blond: "#d8b46a", orange: "#d4712a", silver: "#cfd6dc", curly: "#5a3a22", singed: "#3a3030", none: null };

export function portraitSVG(key, seed = 0) {
  const c = CHARACTERS[key];
  if (!c) return "";
  const skin = SKIN[c.kind]?.(c.hue) ?? SKIN.human(c.hue);
  const bg1 = hsl(c.hue, 25, 18), bg2 = hsl(c.hue, 20, 9);
  const parts = [];
  const cx = 100, cy = 118;
  const w = c.fat ? 74 : c.thin ? 52 : c.child || c.young ? 56 : 62;
  const hh = c.fat ? 84 : c.child ? 72 : 88;

  // background
  parts.push(`<rect width="200" height="200" fill="url(#bg)"/>`);
  parts.push(`<circle cx="100" cy="110" r="78" fill="${hsl(c.hue, 30, 24)}" opacity=".5"/>`);

  // shoulders / body
  const bodyCol = c.kind === "hooded" || c.kind === "plague" ? "#23201f" : hsl((c.hue + 180) % 360, 35, 30);
  parts.push(`<path d="M20 200 Q30 150 100 148 Q170 150 180 200Z" fill="${bodyCol}"/>`);
  if (c.kind === "hooded") parts.push(`<path d="M40 200 Q45 60 100 40 Q155 60 160 200Z" fill="#2a2523"/>`);

  // wings
  if (c.wings || c.kind === "angel") {
    parts.push(`<path d="M60 130 Q10 90 30 40 Q60 80 70 120Z" fill="${c.kind === "angel" ? "#f7efdc" : "hsl(290 60% 85%)"}" opacity=".7"/>`);
    parts.push(`<path d="M140 130 Q190 90 170 40 Q140 80 130 120Z" fill="${c.kind === "angel" ? "#f7efdc" : "hsl(290 60% 85%)"}" opacity=".7"/>`);
  }

  // ears
  const earY = cy - 4;
  if (c.kind === "elf" || c.halfEars) {
    const L = c.halfEars ? 22 : 34;
    parts.push(`<path d="M${cx - w / 2 + 6} ${earY} L${cx - w / 2 - L} ${earY - 26} L${cx - w / 2 + 2} ${earY + 12}Z" fill="${skin}"/>`);
    parts.push(`<path d="M${cx + w / 2 - 6} ${earY} L${cx + w / 2 + L} ${earY - 26} L${cx + w / 2 - 2} ${earY + 12}Z" fill="${skin}"/>`);
  } else if (c.kind === "goblin") {
    parts.push(`<path d="M${cx - w / 2} ${earY} L${cx - w / 2 - 40} ${earY - 10} L${cx - w / 2} ${earY + 16}Z" fill="${skin}"/>`);
    parts.push(`<path d="M${cx + w / 2} ${earY} L${cx + w / 2 + 40} ${earY - 10} L${cx + w / 2} ${earY + 16}Z" fill="${skin}"/>`);
  } else if (c.kind === "dog" || c.kind === "wolf") {
    parts.push(`<path d="M${cx - 30} ${cy - 40} L${cx - 42} ${cy - 5} L${cx - 10} ${cy - 30}Z" fill="${skin}"/>`);
    parts.push(`<path d="M${cx + 30} ${cy - 40} L${cx + 42} ${cy - 5} L${cx + 10} ${cy - 30}Z" fill="${skin}"/>`);
  } else if (c.kind === "rat") {
    parts.push(`<circle cx="${cx - 30}" cy="${cy - 34}" r="14" fill="${skin}"/><circle cx="${cx + 30}" cy="${cy - 34}" r="14" fill="${skin}"/>`);
  } else if (c.kind === "demon") {
    parts.push(`<path d="M${cx - 24} ${cy - 40} Q${cx - 50} ${cy - 70} ${cx - 30} ${cy - 95} Q${cx - 30} ${cy - 60} ${cx - 8} ${cy - 44}Z" fill="#3a1010"/>`);
    parts.push(`<path d="M${cx + 24} ${cy - 40} Q${cx + 50} ${cy - 70} ${cx + 30} ${cy - 95} Q${cx + 30} ${cy - 60} ${cx + 8} ${cy - 44}Z" fill="#3a1010"/>`);
  } else if (c.kind !== "hooded" && c.kind !== "skeleton" && c.kind !== "dragon" && c.kind !== "plague") {
    parts.push(`<circle cx="${cx - w / 2}" cy="${earY}" r="7" fill="${skin}"/><circle cx="${cx + w / 2}" cy="${earY}" r="7" fill="${skin}"/>`);
  }

  // head
  if (c.kind === "dragon") {
    parts.push(`<path d="M40 150 Q60 60 110 62 Q170 60 185 110 Q150 120 120 118 Q100 150 40 150Z" fill="${skin}"/>`);
    parts.push(`<circle cx="130" cy="88" r="7" fill="#f2c14e"/><circle cx="130" cy="88" r="2.5" fill="#000"/>`);
    parts.push(`<path d="M110 62 L100 30 L120 58Z M140 66 L150 36 L150 70Z" fill="#5a1a1a"/>`);
    parts.push(`<path d="M150 110 l6 10 M162 110 l4 10 M174 108 l2 10" stroke="#f0ead0" stroke-width="3"/>`);
  } else {
    const rx = w / 2, ry = hh / 2;
    parts.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${skin}"/>`);
    if (c.kind === "skeleton") {
      parts.push(`<circle cx="${cx - 14}" cy="${cy - 8}" r="11" fill="#111"/><circle cx="${cx + 14}" cy="${cy - 8}" r="11" fill="#111"/>`);
      parts.push(`<path d="M${cx - 4} ${cy + 10} l4 8 l4 -8Z" fill="#111"/>`);
      parts.push(`<path d="M${cx - 18} ${cy + 26} h36 M${cx - 12} ${cy + 20} v12 M${cx - 4} ${cy + 20} v12 M${cx + 4} ${cy + 20} v12 M${cx + 12} ${cy + 20} v12" stroke="#111" stroke-width="2"/>`);
    } else {
      // eyes
      const ey = cy - 6;
      const eyeCol = c.kind === "demon" ? "#ff3b1f" : c.kind === "vampire" ? "#9b1c2c" : c.kind === "ghost" ? "#0a2a30" : "#1a1410";
      if (c.eyepatch) parts.push(`<rect x="${cx - 26}" y="${ey - 8}" width="20" height="14" fill="#111"/><path d="M${cx - 30} ${ey - 10} L${cx + 30} ${ey - 26}" stroke="#111" stroke-width="2"/>`);
      else parts.push(`<ellipse cx="${cx - 14}" cy="${ey}" rx="5" ry="${c.old ? 3 : 4.5}" fill="${eyeCol}"/>`);
      parts.push(`<ellipse cx="${cx + 14}" cy="${ey}" rx="5" ry="${c.old ? 3 : 4.5}" fill="${eyeCol}"/>`);
      if (c.glasses || c.goggles) {
        const r = c.goggles ? 12 : 9;
        parts.push(`<circle cx="${cx - 14}" cy="${ey}" r="${r}" fill="none" stroke="${c.goggles ? "#8a6a2a" : "#333"}" stroke-width="${c.goggles ? 4 : 1.5}"/><circle cx="${cx + 14}" cy="${ey}" r="${r}" fill="none" stroke="${c.goggles ? "#8a6a2a" : "#333"}" stroke-width="${c.goggles ? 4 : 1.5}"/><path d="M${cx - 5} ${ey} h10" stroke="#333" stroke-width="1.5"/>`);
      }
      // brows
      const browY = ey - 12;
      const angry = c.kind === "orc" || c.kind === "demon" || key === "general" || key === "executioner";
      parts.push(`<path d="M${cx - 21} ${browY + (angry ? -3 : 0)} L${cx - 7} ${browY + (angry ? 2 : 0)}" stroke="#2a1a10" stroke-width="3" opacity=".8"/>`);
      parts.push(`<path d="M${cx + 7} ${browY + (angry ? 2 : 0)} L${cx + 21} ${browY + (angry ? -3 : 0)}" stroke="#2a1a10" stroke-width="3" opacity=".8"/>`);
      // nose
      if (c.kind === "plague") parts.push(`<path d="M${cx} ${cy - 10} L${cx + 40} ${cy + 30} L${cx - 6} ${cy + 22}Z" fill="#d9d1b8"/>`);
      else if (c.kind === "dog" || c.kind === "wolf" || c.kind === "rat") parts.push(`<ellipse cx="${cx}" cy="${cy + 14}" rx="9" ry="6" fill="#222"/>`);
      else parts.push(`<path d="M${cx} ${ey + 4} q-5 14 0 18" stroke="#2a1a10" stroke-width="2" fill="none" opacity=".6"/>`);
      // mouth
      const my = cy + 26;
      if (c.kind === "orc") {
        parts.push(`<path d="M${cx - 16} ${my} h32" stroke="#1a1010" stroke-width="3"/>`);
        parts.push(`<path d="M${cx - 12} ${my} l-2 -12 l6 12Z M${cx + 12} ${my} l2 -12 l-6 12Z" fill="#f0ead0"/>`);
      } else if (c.kind === "vampire") {
        parts.push(`<path d="M${cx - 12} ${my} q12 6 24 0" stroke="#5a1020" stroke-width="2" fill="none"/><path d="M${cx - 6} ${my + 1} l2 8 l2 -8Z M${cx + 2} ${my + 1} l2 8 l2 -8Z" fill="#fff"/>`);
      } else if (c.kind === "demon") {
        parts.push(`<path d="M${cx - 18} ${my - 2} q18 16 36 0" stroke="#ff3b1f" stroke-width="2" fill="none"/>`);
      } else if (c.kind === "troll" || c.kind === "giant") {
        parts.push(`<path d="M${cx - 14} ${my} q14 -6 28 0" stroke="#1a1010" stroke-width="3" fill="none"/>`);
      } else if (!c.mask && c.kind !== "hooded" || c.kind === "hooded" && !c.mask) {
        const smile = key === "jester" || key === "goblin" || key === "merchant" || key === "innkeeper" || key === "bard" ? 6 : key === "treasurer" || key === "judge" || c.kind === "elf" ? 0 : -2;
        parts.push(`<path d="M${cx - 12} ${my} q12 ${smile} 24 0" stroke="#4a2a20" stroke-width="2" fill="none"/>`);
      }
      if (c.mask) parts.push(`<rect x="${cx - w / 2 + 4}" y="${cy + 6}" width="${w - 8}" height="30" fill="${c.mask === "bone" ? "#e5dcc5" : "#1a1516"}"/>`);
      if (c.scars) parts.push(`<path d="M${cx + 8} ${cy - 30} l10 40" stroke="#5a2020" stroke-width="2.5"/>`);
      if (c.paint) parts.push(`<path d="M${cx - 30} ${cy - 20} h60 M${cx - 26} ${cy + 4} h52" stroke="#e8e0c0" stroke-width="3" opacity=".7"/>`);
      if (c.old) parts.push(`<path d="M${cx - 26} ${cy + 14} q6 4 12 0 M${cx + 14} ${cy + 14} q6 4 12 0" stroke="#2a1a10" stroke-width="1.5" fill="none" opacity=".5"/>`);
      if (c.kind === "fae") parts.push(`<circle cx="${cx - 26}" cy="${cy + 8}" r="3" fill="#fff" opacity=".8"/><circle cx="${cx + 28}" cy="${cy - 2}" r="2" fill="#fff" opacity=".8"/>`);
    }
    // hair
    const hair = HAIR[c.hair];
    if (hair && c.kind !== "hooded" && !c.helm && c.kind !== "plague") {
      const ty = cy - hh / 2;
      if (c.female || c.hair === "long" || key === "mage") parts.push(`<path d="M${cx - rx - 4} ${cy + 20} Q${cx - rx - 8} ${ty - 6} ${cx} ${ty - 12} Q${cx + rx + 8} ${ty - 6} ${cx + rx + 4} ${cy + 20} L${cx + rx - 4} ${cy + 20} Q${cx + rx} ${ty + 14} ${cx} ${ty + 8} Q${cx - rx} ${ty + 14} ${cx - rx + 4} ${cy + 20}Z" fill="${hair}"/>`);
      else parts.push(`<path d="M${cx - rx} ${cy - 10} Q${cx - rx - 2} ${ty - 6} ${cx} ${ty - 10} Q${cx + rx + 2} ${ty - 6} ${cx + rx} ${cy - 10} Q${cx + rx - 6} ${ty + 12} ${cx} ${ty + 6} Q${cx - rx + 6} ${ty + 12} ${cx - rx} ${cy - 10}Z" fill="${hair}"/>`);
      if (c.wild) parts.push(`<path d="M${cx - rx - 10} ${ty + 10} l-10 -14 M${cx + rx + 10} ${ty + 10} l10 -14 M${cx} ${ty - 12} l0 -14" stroke="${hair}" stroke-width="4"/>`);
    }
    // beard
    if (c.beard) {
      const bcol = c.beard === "singed" ? "#3a3030" : hair ?? "#6a5040";
      const len = c.beard === "long" || c.beard === "braided" ? 60 : c.beard === "short" ? 16 : 34;
      parts.push(`<path d="M${cx - rx + 4} ${cy + 6} Q${cx} ${cy + 30 + len} ${cx + rx - 4} ${cy + 6} Q${cx} ${cy + 36} ${cx - rx + 4} ${cy + 6}Z" fill="${bcol}"/>`);
      if (c.beard === "braided") parts.push(`<path d="M${cx - 10} ${cy + 40} l0 40 M${cx + 10} ${cy + 40} l0 40" stroke="#c9a24a" stroke-width="3" stroke-dasharray="4 4"/>`);
    }
    // headgear
    const top = cy - hh / 2;
    if (c.helm) {
      parts.push(`<path d="M${cx - rx - 4} ${cy - 4} Q${cx - rx - 4} ${top - 10} ${cx} ${top - 12} Q${cx + rx + 4} ${top - 10} ${cx + rx + 4} ${cy - 4}Z" fill="#6f7580"/>`);
      if (c.helm === "horn") parts.push(`<path d="M${cx - rx} ${top + 4} l-26 -30 l14 36Z M${cx + rx} ${top + 4} l26 -30 l-14 36Z" fill="#e8e0c0"/>`);
    }
    if (c.crown) {
      const sz = c.crown === "small" ? 0.7 : 1;
      const cw = rx * 1.3 * sz, chh = 22 * sz;
      if (c.crown === "leaf") parts.push(`<path d="M${cx - cw} ${top + 4} q${cw / 2} -14 ${cw} 0 q${cw / 2} -14 ${cw} 0" stroke="#5a8a3a" stroke-width="5" fill="none"/>`);
      else parts.push(`<path d="M${cx - cw} ${top + 2} L${cx - cw} ${top - chh} L${cx - cw / 2} ${top - chh / 2} L${cx} ${top - chh} L${cx + cw / 2} ${top - chh / 2} L${cx + cw} ${top - chh} L${cx + cw} ${top + 2}Z" fill="${hsl(45, 70, 55)}"/>`);
    }
    if (c.mitre) parts.push(`<path d="M${cx - rx + 4} ${top + 6} Q${cx} ${top - 70} ${cx + rx - 4} ${top + 6}Z" fill="#f3e6c8"/><path d="M${cx} ${top - 44} v36" stroke="#c9a24a" stroke-width="3"/>`);
    if (c.hat === "jester") parts.push(`<path d="M${cx - rx} ${top + 8} L${cx - rx - 26} ${top - 30} L${cx - 10} ${top - 4} L${cx} ${top - 40} L${cx + 10} ${top - 4} L${cx + rx + 26} ${top - 30} L${cx + rx} ${top + 8}Z" fill="#7a2a7a"/><circle cx="${cx - rx - 26}" cy="${top - 30}" r="5" fill="#c9a24a"/><circle cx="${cx}" cy="${top - 40}" r="5" fill="#c9a24a"/><circle cx="${cx + rx + 26}" cy="${top - 30}" r="5" fill="#c9a24a"/>`);
    if (c.hat === "witch" || c.hat === "wizard") parts.push(`<path d="M${cx - rx - 16} ${top + 8} h${rx * 2 + 32} l-${rx + 10} 0 L${cx + 6} ${top - 60} L${cx - rx + 6} ${top + 8}Z" fill="${c.hat === "witch" ? "#1a1a1a" : "#2a2a6a"}"/>`);
    if (c.hat === "straw") parts.push(`<ellipse cx="${cx}" cy="${top + 6}" rx="${rx + 22}" ry="8" fill="#c9a24a"/><path d="M${cx - rx + 4} ${top + 6} Q${cx} ${top - 26} ${cx + rx - 4} ${top + 6}Z" fill="#d8b46a"/>`);
    if (c.hat === "round") parts.push(`<path d="M${cx - rx} ${top + 4} Q${cx} ${top - 26} ${cx + rx} ${top + 4}Z" fill="#3a2a2a"/>`);
    if (c.hat === "tricorn") parts.push(`<path d="M${cx - rx - 20} ${top + 6} L${cx} ${top - 24} L${cx + rx + 20} ${top + 6}Z" fill="#1e1a1a"/>`);
    if (c.hat === "feather") parts.push(`<path d="M${cx - rx} ${top + 4} Q${cx} ${top - 14} ${cx + rx} ${top + 4}Z" fill="#3a6a3a"/><path d="M${cx + 10} ${top - 4} q20 -30 30 -20" stroke="#d8b46a" stroke-width="3" fill="none"/>`);
    if (c.hood) parts.push(`<path d="M${cx - rx - 6} ${cy + 20} Q${cx - rx - 8} ${top - 14} ${cx} ${top - 16} Q${cx + rx + 8} ${top - 14} ${cx + rx + 6} ${cy + 20} L${cx + rx - 2} ${cy + 10} Q${cx + rx - 6} ${top + 6} ${cx} ${top + 2} Q${cx - rx + 6} ${top + 6} ${cx - rx + 2} ${cy + 10}Z" fill="#2f4a2a"/>`);
    if (c.kind === "hooded" && !c.mask) parts.push(`<ellipse cx="${cx}" cy="${cy - 2}" rx="${rx - 6}" ry="${ry - 10}" fill="#0d0a09" opacity=".85"/>${c.kind === "hooded" ? `<circle cx="${cx - 12}" cy="${cy - 6}" r="2.5" fill="#dcdcdc"/><circle cx="${cx + 12}" cy="${cy - 6}" r="2.5" fill="#dcdcdc"/>` : ""}`);
    if (c.skullstaff) parts.push(`<path d="M170 200 V70" stroke="#4a3a2a" stroke-width="5"/><circle cx="170" cy="62" r="12" fill="#e5dcc5"/><circle cx="166" cy="60" r="3" fill="#111"/><circle cx="174" cy="60" r="3" fill="#111"/>`);
  }
  if (c.kind === "ghost") parts.push(`<rect width="200" height="200" fill="url(#ghost)"/>`);

  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${c.name}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient>
  <linearGradient id="ghost" x1="0" y1="0" x2="0" y2="1"><stop offset=".3" stop-color="rgba(20,14,11,0)"/><stop offset="1" stop-color="rgba(20,14,11,.9)"/></linearGradient>
</defs>${parts.join("")}</svg>`;
}
