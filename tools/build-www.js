#!/usr/bin/env node
// Copies the static site into www/ for Capacitor. No bundling: the game is plain ES modules.
import { rmSync, mkdirSync, cpSync, copyFileSync } from "node:fs";

rmSync("www", { recursive: true, force: true });
mkdirSync("www", { recursive: true });
copyFileSync("index.html", "www/index.html");
cpSync("src", "www/src", { recursive: true });
console.log("www/ ready");
