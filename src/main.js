import { Game, STATS, OBJECTIVES } from "./engine.js";
import { CHARACTERS } from "./characters.js";
import { EFFECTS } from "./effects.js";
import { DEATHS } from "./deaths.js";
import { portraitSVG } from "./portrait.js";
import cards from "./cards/index.js";

const $ = (id) => document.getElementById(id);
const METER_GLYPH = { faith: "✶", people: "☺", army: "⚔", gold: "◉" };
const METER_NAME = { faith: "The Flame", people: "The People", army: "The Army", gold: "The Treasury" };

const game = new Game(cards);
window.__game = game;

// ---------- meters ----------
const metersEl = $("meters");
metersEl.innerHTML = STATS.map((k) => `
  <div class="meter" id="meter-${k}" title="${METER_NAME[k]}">
    <div class="dots"><span class="dot"></span></div>
    <div class="icon"><div class="fill"></div><div class="glyph">${METER_GLYPH[k]}</div></div>
    <div class="value"></div>
  </div>`).join("");

function renderMeters(bumps = {}) {
  const clarity = game.hasEffect("clarity");
  for (const k of STATS) {
    const el = $(`meter-${k}`);
    const v = Math.max(0, Math.min(100, game.reign.stats[k]));
    const fill = el.querySelector(".fill");
    fill.style.height = v + "%";
    fill.classList.toggle("danger", v <= 15 || v >= 85);
    el.querySelector(".value").textContent = clarity ? v : "";
    if (bumps[k]) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
  }
}

function showDots(side) {
  const prev = side ? game.preview(side) : {};
  const clarity = game.hasEffect("clarity");
  for (const k of STATS) {
    const dot = $(`meter-${k}`).querySelector(".dot");
    const p = prev[k];
    dot.className = "dot";
    if (p && p.mag) {
      dot.classList.add("show");
      if (p.mag === 2) dot.classList.add("big");
      if (p.uncertain) dot.classList.add("uncertain");
      dot.textContent = "";
    }
    $(`meter-${k}`).querySelector(".value").textContent = clarity ? (p ? `${game.reign.stats[k]} ${p.value > 0 ? "+" : ""}${p.value}` : game.reign.stats[k]) : "";
  }
}

// ---------- card ----------
const cardEl = $("card"), wrap = $("card-wrap");
function renderCard() {
  const c = game.card;
  const ch = CHARACTERS[c.char];
  $("portrait").innerHTML = portraitSVG(c.char);
  $("card-text").textContent = c.text;
  const modeName = c.isMode ? (game.reign.mode.kind === "duel" ? game.reign.mode.foeName : "The Deep") : ch.name;
  $("card-name").innerHTML = `<b>${modeName}</b>${!c.isMode && ch.title ? ` · ${ch.title}` : ""}`;
  cardEl.classList.toggle("is-new", !!game.reign.isNew && !c.isMode);
  cardEl.classList.toggle("mode", !!c.isMode);
  $("answer-left").textContent = c.left.label ?? "";
  $("answer-right").textContent = c.right.label ?? "";
  cardEl.style.transform = "";
  cardEl.classList.remove("leave");
  cardEl.classList.add("enter");
  setTimeout(() => cardEl.classList.remove("enter"), 400);
}

function renderStatus(popEffect) {
  const r = game.reign;
  $("king").textContent = `King ${r.name}`;
  $("year").textContent = `Year ${game.dyn.year} · ${r.years} ${r.years === 1 ? "year" : "years"} on the throne`;
  $("effects").innerHTML = r.effects.map((e) => `<div class="fx${e.key === popEffect ? " pop" : ""}" title="${EFFECTS[e.key].name}: ${EFFECTS[e.key].desc}">${EFFECTS[e.key].glyph}</div>`).join("");
}

function renderAll() { renderMeters(); renderCard(); renderStatus(); showDots(null); }

// ---------- drag ----------
let drag = null;
const THRESH = 80;
function onDown(e) {
  if (game.reign.dead || drag) return;
  drag = { x0: e.clientX, dx: 0, id: e.pointerId };
  cardEl.classList.add("grabbing");
  cardEl.setPointerCapture?.(e.pointerId);
}
function onMove(e) {
  if (!drag || e.pointerId !== drag.id) return;
  drag.dx = e.clientX - drag.x0;
  const dx = drag.dx;
  cardEl.style.transform = `translateX(${dx}px) rotate(${dx / 14}deg)`;
  const side = Math.abs(dx) > 18 ? (dx > 0 ? "right" : "left") : null;
  const t = Math.min(1, Math.max(0, (Math.abs(dx) - 18) / 60));
  $("answer-left").style.opacity = side === "left" ? t : 0;
  $("answer-right").style.opacity = side === "right" ? t : 0;
  showDots(side);
}
function onUp(e) {
  if (!drag || e.pointerId !== drag.id) return;
  const dx = drag.dx;
  drag = null;
  cardEl.classList.remove("grabbing");
  $("answer-left").style.opacity = 0;
  $("answer-right").style.opacity = 0;
  if (Math.abs(dx) > THRESH) commit(dx > 0 ? "right" : "left", dx);
  else { cardEl.style.transition = "transform .25s"; cardEl.style.transform = ""; setTimeout(() => (cardEl.style.transition = ""), 260); showDots(null); }
}
cardEl.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("pointercancel", onUp);
window.addEventListener("keydown", (e) => {
  if (!$("death").hidden || !$("menu").hidden) return;
  if (e.key === "ArrowLeft") commit("left", -1);
  if (e.key === "ArrowRight") commit("right", 1);
});

let busy = false;
function commit(side, dx) {
  if (busy || game.reign.dead) return;
  busy = true;
  cardEl.classList.add("leave");
  cardEl.style.transform = `translateX(${Math.sign(dx) * 520}px) rotate(${Math.sign(dx) * 30}deg)`;
  const res = game.choose(side);
  const bumps = {};
  for (const k of Object.keys(res.deltas)) if (res.deltas[k]) bumps[k] = true;
  renderMeters(bumps);
  showDots(null);
  if (res.saved) toast(`${EFFECTS[res.saved].name} spent. It held, once.`);
  if (res.newEffect) toast(`${EFFECTS[res.newEffect].glyph} ${EFFECTS[res.newEffect].name} — ${EFFECTS[res.newEffect].desc}`);
  if (res.ended === "win" && res.mode === "duel") toast("First blood is yours.");
  if (res.ended === "win" && res.mode === "deep") toast("You reached the bottom.");
  renderStatus(res.newEffect);
  setTimeout(() => {
    busy = false;
    if (res.death) showDeath(res.death);
    else renderCard();
  }, 330);
}

// ---------- death ----------
function showDeath(key) {
  const d = DEATHS[key];
  $("flash").classList.remove("go"); void $("flash").offsetWidth; $("flash").classList.add("go");
  $("death-glyph").textContent = d.glyph;
  $("death-title").textContent = d.title;
  $("death-text").textContent = d.text;
  const r = game.reign;
  $("death-years").textContent = `King ${r.name} · ${r.startYear}–${game.dyn.year} · reigned ${r.years} ${r.years === 1 ? "year" : "years"}`;
  const tl = game.dyn.timeline;
  const total = Math.max(1, tl.reduce((s, k) => s + k.years, 0));
  $("timeline").innerHTML = tl.map((k, i) => `<div class="k${i === tl.length - 1 ? " cur" : ""}" style="width:${Math.max(4, (k.years / total) * 360)}px" title="${k.name}, ${k.years}y — ${DEATHS[k.death]?.title ?? k.death}"></div>`).join("");
  setTimeout(() => { $("death").hidden = false; }, 500);
}
$("next-king").addEventListener("click", () => {
  $("death").hidden = true;
  game.succeed();
  renderAll();
});

// ---------- toast / objectives ----------
let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg; t.hidden = false;
  t.style.animation = "none"; void t.offsetWidth; t.style.animation = "";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.hidden = true), 2600);
}
game.on((type, payload) => {
  if (type === "objective") setTimeout(() => toast(`Objective: ${OBJECTIVES[payload]?.name ?? payload}`), 900);
});

// ---------- menu ----------
let tab = "objectives";
function renderTab() {
  const m = game.meta;
  let html = "";
  if (tab === "objectives") {
    const got = new Set(m.objectives);
    html = Object.entries(OBJECTIVES).map(([k, o]) => `<div class="entry${got.has(k) ? "" : " locked"}"><div class="g">${got.has(k) ? "✓" : "·"}</div><div><div>${o.name}</div><div class="d">${o.desc}</div></div></div>`).join("");
    html = `<p style="text-align:center">${got.size} / ${Object.keys(OBJECTIVES).length} objectives · ${game.seen.size} / ${game.cards.length} cards discovered</p>` + html;
  } else if (tab === "deaths") {
    const got = new Set(m.deaths);
    html = Object.entries(DEATHS).map(([k, d]) => `<div class="entry${got.has(k) ? "" : " locked"}"><div class="g">${d.glyph}</div><div><div>${got.has(k) ? d.title : "???"}</div>${got.has(k) ? `<div class="d">${d.text}</div>` : ""}</div></div>`).join("");
    html = `<p style="text-align:center">${got.size} / ${Object.keys(DEATHS).length} deaths</p>` + html;
  } else if (tab === "kings") {
    html = `<p style="text-align:center">Longest reign: ${m.bestReign} years</p>` + [...m.kings].reverse().map((k) => `<div class="entry"><div class="g">${DEATHS[k.death]?.glyph ?? "†"}</div><div><div>King ${k.name} <small>${k.from}–${k.to}</small></div><div class="d">${k.years} years · ${DEATHS[k.death]?.title ?? k.death}</div></div></div>`).join("");
    if (!m.kings.length) html += `<p style="text-align:center">No kings have died yet. Give it time.</p>`;
  } else if (tab === "effects") {
    html = game.reign.effects.length ? game.reign.effects.map((e) => `<div class="entry"><div class="g">${EFFECTS[e.key].glyph}</div><div><div>${EFFECTS[e.key].name}${e.years != null ? ` <small>${e.years}y left</small>` : ""}</div><div class="d">${EFFECTS[e.key].desc}</div></div></div>`).join("") : `<p style="text-align:center">Nothing lingers. Yet.</p>`;
  }
  $("tab-body").innerHTML = html;
  document.querySelectorAll(".tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
}
$("menu-btn").addEventListener("click", () => { $("menu").hidden = false; renderTab(); });
$("close-menu").addEventListener("click", () => { $("menu").hidden = true; });
document.querySelectorAll(".tabs button").forEach((b) => b.addEventListener("click", () => { tab = b.dataset.tab; renderTab(); }));
$("reset").addEventListener("click", () => {
  if (!confirm("Forget every king, every death, every card? This cannot be undone.")) return;
  game.reset(); $("menu").hidden = true; $("death").hidden = true; renderAll();
});
$("effects").addEventListener("click", () => { tab = "effects"; $("menu").hidden = false; renderTab(); });

// ---------- boot ----------
renderAll();
if (game.reign.dead) showDeath(game.reign.dead);
