import { useState, useEffect, useRef, useCallback } from "react";

import { createPortal } from "react-dom";
import { useIsHydrated } from "@/lib/hooks/use-is-hydrated";
import { sounds } from "@/lib/sounds";
import DuckIcon from "./icons/duck";

/*
 * ══════════════════════════════════════════════════════════
 *  DESKTOP GOOSE — Canvas Edition
 *  100% canvas-rendered game loop. Zero React state updates
 *  per frame. Only the nav toggle button uses React state.
 *
 *  Sprite sheet: 4x3 grid from goose-sprite.webp
 * ══════════════════════════════════════════════════════════
 */

const DISPLAY_SIZE = 84;
const SPRITE_COLS = 10;
const SPRITE_ROWS = 8;
const ASPECT_RATIO = 1;
const GOOSE_SPRITE_URL = "/static/images/goose-sprite-final.webp";
const DPR = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

const ANIM = {
  idle:  [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
  walk:  [10, 11, 12, 13, 14, 15, 16, 17, 16, 15, 14, 13, 12, 11],
  run:   [20, 21, 22, 23, 24, 25, 26, 27, 26, 25, 24, 23, 22, 21],
  honk:  [30, 31, 32, 33, 34, 35, 36, 37],
  carry: [40, 41, 42, 43, 44, 45, 46, 47, 46, 45, 44, 43, 42, 41],
  drag:  [50, 51, 52, 53, 54, 55, 56, 55, 54, 53, 52, 51],
} as const;

const GOOSE_NOTES = [
  "HONK HONK!",
  "I wrote this code.",
  "hire yousef pls",
  "null === undefined\n...right?",
  "rm -rf /node_modules\nit's a feature",
  "PEACE WAS NEVER\nAN OPTION",
  "segfault (core dumped)\njust kidding :)",
  "git push --force\nno regrets",
  "UNTITLED\nGOOSE PORTFOLIO",
  "sudo make me\na sandwich",
  "404: goose\nnot found",
  "this.goose = chaotic",
  "while(true) { honk(); }",
  "desktop goose\nenergy",
  "honk if you\nlove chaos",
  "./goose\n--verbose",
];

// Meme images the goose can bring from offscreen
const GOOSE_MEMES = [
  "/static/images/mems/mem_1/1.webp",
  "/static/images/mems/mem_1/2.webp",
  "/static/images/mems/mem_1/3.webp",
  "/static/images/mems/mem_2/1.webp",
  "/static/images/mems/mem_2/2.webp",
  "/static/images/mems/mem_2/3.webp",
  "/static/images/mems/mem_2/4.webp",
  "/static/images/mems/mem_3/1.webp",
  "/static/images/mems/mem_3/2.webp",
  "/static/images/mems/mem_3/3.webp",
  "/static/images/mems/mem_3/4.webp",
  "/static/images/mems/mem_4/1.webp",
  "/static/images/mems/mem_4/2.webp",
];

function playHonkSound() {
  if (typeof window === "undefined") return;
  try {
    void sounds.honk();
  } catch {
    /* autoplay / AudioContext not allowed yet */
  }
}

type GooseBrainState =
  | "idle"
  | "wandering"
  | "chasing_cursor"
  | "dragging_note"
  | "fleeing_cursor"
  | "pecking"
  | "stealing_name"
  | "bringing_meme";

interface Note {
  text: string;
  x: number;
  y: number;
  rotation: number;
  born: number; // timestamp
}

interface Footprint {
  x: number;
  y: number;
  rotation: number;
  born: number;
}

// ── Name-steal task phases ──
type NameStealPhase =
  | "walk_to_name"      // walk toward the h1
  | "grab_name"         // pause, honk, hide DOM text
  | "drag_offscreen"    // carry text offscreen
  | "wait_offscreen"    // pause offscreen
  | "return_with_hire"  // come back carrying "hire yousef pls"
  | "place_hire"        // drop the replacement text
  | "done";

// ── Meme-bring task phases ──
type MemeBringPhase =
  | "walk_offscreen"    // walk to edge
  | "wait_offscreen"    // pause to "find" a meme
  | "return_with_meme"  // come back dragging the meme
  | "drop_meme"         // place it on screen
  | "done";

interface NameStealState {
  phase: NameStealPhase;
  nameEl: HTMLElement | null;
  nameRect: DOMRect | null;
  originalText: string;
  carriedText: string;
  carriedX: number;
  carriedY: number;
  exitX: number;
  returnTarget: { x: number; y: number };
}

interface MemeBringState {
  phase: MemeBringPhase;
  memeImg: HTMLImageElement | null;
  memeLoaded: boolean;
  memeX: number;
  memeY: number;
  memeW: number;
  memeH: number;
  exitX: number;
  dropTarget: { x: number; y: number };
  born: number;
}

function clampGoosePos(x: number, y: number) {
  const maxX = Math.max(0, window.innerWidth - DISPLAY_SIZE);
  const maxY = Math.max(0, window.innerHeight - DISPLAY_SIZE * ASPECT_RATIO);
  return {
    x: Math.min(maxX, Math.max(0, x)),
    y: Math.min(maxY, Math.max(0, y)),
  };
}

// ── Nav sprite (kept in DOM since it's part of the Navbar) ──

function GooseNavSprite() {
  return <DuckIcon className="w-[22px] h-[22px]" />;
}

// ── Dev-only command interface for triggering goose actions ──
interface GooseCommands {
  stealName: () => void;
  bringMeme: () => void;
  chaseCursor: () => void;
  dropNote: () => void;
  wander: () => void;
}

// ══════════════════════════════════════════════════════════
//  Canvas-based goose overlay — runs entirely outside React
// ══════════════════════════════════════════════════════════

function startGooseCanvas(canvas: HTMLCanvasElement, spriteImg: HTMLImageElement, commands?: GooseCommands) {
  const ctx = canvas.getContext("2d", { alpha: true })!;
  let running = true;
  let frameTickRef = 0;

  // ── State (all mutable, no React) ──
  let brainState: GooseBrainState = "idle";
  const pos = clampGoosePos(
    window.innerWidth / 2 - DISPLAY_SIZE / 2,
    window.innerHeight / 2 - (DISPLAY_SIZE * ASPECT_RATIO) / 2,
  );
  let facingRight = true;
  let isHonking = false;
  let isChasing = false;
  let currentFrame = 0;

  const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let target: { x: number; y: number } | "cursor" = { x: 300, y: 300 };

  const notes: Note[] = [];
  const footprints: Footprint[] = [];

  // Drag state
  let dragging: { ox: number; oy: number } | null = null;
  let pointerDown: { x: number; y: number; t: number } | null = null;

  let actionTimer: ReturnType<typeof setTimeout> | null = null;
  const deferredTimers: ReturnType<typeof setTimeout>[] = [];

  // ── Name-steal state ──
  let nameSteal: NameStealState | null = null;
  let hasStoleName = false; // only steal once per session

  // ── Meme-bring state ──
  let memeBring: MemeBringState | null = null;
  // Preload meme images
  const preloadedMemes: HTMLImageElement[] = [];
  for (const src of GOOSE_MEMES) {
    const img = new Image();
    img.src = src;
    preloadedMemes.push(img);
  }

  // ── Dropped memes on screen (persistent until auto-removed) ──
  const droppedMemes: Array<{
    img: HTMLImageElement;
    x: number;
    y: number;
    w: number;
    h: number;
    rotation: number;
    born: number;
  }> = [];

  // ── Sprite dimensions from image ──
  const spriteW = spriteImg.naturalWidth / SPRITE_COLS;
  const spriteH = spriteImg.naturalHeight / SPRITE_ROWS;

  // ── Resize canvas to viewport ──
  function resize() {
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const clamped = clampGoosePos(pos.x, pos.y);
    pos.x = clamped.x;
    pos.y = clamped.y;
  }
  resize();

  // ── Helpers ──
  function clearActionTimer() {
    if (actionTimer !== null) {
      clearTimeout(actionTimer);
      actionTimer = null;
    }
  }

  function pickTarget() {
    const margin = 100;
    const w = window.innerWidth;
    const h = window.innerHeight;
    target = {
      x: margin + Math.random() * Math.max(0, w - margin * 2),
      y: margin + Math.random() * Math.max(0, h - margin * 2),
    };
  }

  function dropNote() {
    const text = GOOSE_NOTES[Math.floor(Math.random() * GOOSE_NOTES.length)];
    notes.push({
      text,
      x: Math.max(
        10,
        Math.min(window.innerWidth - 180, pos.x + (facingRight ? DISPLAY_SIZE : -150)),
      ),
      y: Math.max(10, pos.y - 20),
      rotation: -10 + Math.random() * 20,
      born: Date.now(),
    });
    if (notes.length > 5) notes.shift();
    const len = notes.length;
    const tid = setTimeout(() => {
      const idx = notes.findIndex((n) => n === notes[len - 1]);
      if (idx >= 0) notes.splice(idx, 1);
    }, 8000);
    deferredTimers.push(tid);
  }

  function leaveFootprint() {
    footprints.push({
      x: pos.x + DISPLAY_SIZE / 2,
      y: pos.y + DISPLAY_SIZE * ASPECT_RATIO - 10,
      rotation: facingRight ? 90 + Math.random() * 20 : -90 - Math.random() * 20,
      born: Date.now(),
    });
    if (footprints.length > 16) footprints.shift();
    const len = footprints.length;
    const tid = setTimeout(() => {
      const idx = footprints.findIndex((f) => f === footprints[len - 1]);
      if (idx >= 0) footprints.splice(idx, 1);
    }, 6000);
    deferredTimers.push(tid);
  }

  // ── Draw functions ──
  function drawSprite(frameIdx: number) {
    const col = frameIdx % SPRITE_COLS;
    const row = Math.floor(frameIdx / SPRITE_COLS);
    const sx = col * spriteW;
    const sy = row * spriteH;

    ctx.save();
    const gx = Math.round(pos.x) + DISPLAY_SIZE / 2;
    const gy = Math.round(pos.y);

    ctx.translate(gx, gy);
    ctx.scale(facingRight ? -1 : 1, 1);
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      spriteImg,
      sx,
      sy,
      spriteW,
      spriteH,
      -DISPLAY_SIZE / 2,
      0,
      DISPLAY_SIZE,
      DISPLAY_SIZE * ASPECT_RATIO,
    );
    ctx.restore();

    // HONK label
    if (isChasing) {
      ctx.save();
      ctx.font = "bold 12px monospace";
      ctx.fillStyle = "#f97316";
      ctx.textAlign = "center";
      const honkY = Math.round(pos.y) - 8 + Math.sin(Date.now() / 200) * 3;
      ctx.fillText("HONK!!", Math.round(pos.x) + DISPLAY_SIZE / 2, honkY);
      ctx.restore();
    }
  }

  function drawFootprints() {
    const now = Date.now();
    ctx.save();
    ctx.font = "16px serif";
    ctx.textAlign = "center";
    for (const fp of footprints) {
      const age = now - fp.born;
      const opacity = Math.max(0, 1 - age / 6000) * 0.4;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(fp.x, fp.y);
      ctx.rotate((fp.rotation * Math.PI) / 180);
      ctx.fillText("🐾", 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  function drawNotes() {
    const now = Date.now();
    ctx.save();
    for (const note of notes) {
      const age = now - note.born;
      const scale = Math.min(1, age / 350);
      const opacity = Math.min(1, age / 350);

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(note.x, note.y);
      ctx.rotate((note.rotation * Math.PI) / 180);
      ctx.scale(scale, scale);

      const lines = note.text.split("\n");
      const lineHeight = 13;
      const padding = 8;
      const noteW = 150;
      const noteH = lines.length * lineHeight + padding * 2;

      ctx.fillStyle = "#fffef0";
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.fillRect(0, 0, noteW, noteH);
      ctx.shadowColor = "transparent";

      ctx.fillStyle = "rgba(250, 204, 21, 0.5)";
      ctx.fillRect(noteW / 2 - 16, -6, 32, 10);

      ctx.strokeStyle = "#d4d4d8";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(0, 0, noteW, noteH);

      ctx.fillStyle = "#18181b";
      ctx.font = "11px monospace";
      ctx.textAlign = "left";
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], padding, padding + 10 + i * lineHeight);
      }

      ctx.restore();
    }
    ctx.restore();
  }

  // ── Draw carried text (for name-steal) ──
  function drawCarriedText(text: string, cx: number, cy: number) {
    ctx.save();
    ctx.font = 'bold 36px "Silkscreen", monospace';
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    // Slight wobble while being carried
    const wobble = Math.sin(Date.now() / 150) * 3;
    ctx.fillText(text, cx, cy + wobble);
    ctx.restore();
  }

  // ── Draw dropped memes ──
  function drawDroppedMemes() {
    const now = Date.now();
    for (let i = droppedMemes.length - 1; i >= 0; i--) {
      const m = droppedMemes[i];
      const age = now - m.born;
      // Fade out after 12s, fully gone at 14s
      if (age > 14000) {
        droppedMemes.splice(i, 1);
        continue;
      }
      const fadeAlpha = age > 12000 ? 1 - (age - 12000) / 2000 : 1;
      const scaleIn = Math.min(1, age / 300);

      ctx.save();
      ctx.globalAlpha = fadeAlpha;
      ctx.translate(m.x + m.w / 2, m.y + m.h / 2);
      ctx.rotate((m.rotation * Math.PI) / 180);
      ctx.scale(scaleIn, scaleIn);

      // White border / polaroid style
      const border = 6;
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0,0,0,0.25)";
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;
      ctx.fillRect(-m.w / 2 - border, -m.h / 2 - border, m.w + border * 2, m.h + border * 2 + 16);
      ctx.shadowColor = "transparent";

      if (m.img.complete && m.img.naturalWidth > 0) {
        ctx.drawImage(m.img, -m.w / 2, -m.h / 2, m.w, m.h);
      }

      // "HONK" caption at bottom
      ctx.fillStyle = "#18181b";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("🪿 goose delivery", 0, m.h / 2 + 12);

      ctx.restore();
    }
  }

  // ── Draw meme being carried by goose ──
  function drawCarriedMeme() {
    if (!memeBring || !memeBring.memeImg) return;
    const phase = memeBring.phase;
    if (phase !== "return_with_meme") return;
    if (!memeBring.memeImg.complete || memeBring.memeImg.naturalWidth === 0) return;

    ctx.save();
    const mx = memeBring.memeX;
    const my = memeBring.memeY;
    const mw = memeBring.memeW;
    const mh = memeBring.memeH;

    // White border
    const border = 4;
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;
    const wobble = Math.sin(Date.now() / 200) * 2;
    ctx.translate(mx + mw / 2, my + mh / 2 + wobble);
    ctx.rotate(((facingRight ? 5 : -5) * Math.PI) / 180);
    ctx.fillRect(-mw / 2 - border, -mh / 2 - border, mw + border * 2, mh + border * 2);
    ctx.shadowColor = "transparent";
    ctx.drawImage(memeBring.memeImg, -mw / 2, -mh / 2, mw, mh);
    ctx.restore();
  }

  // ══════════════════════════════════════════════════════════
  //  NAME-STEAL LOGIC
  // ══════════════════════════════════════════════════════════

  function startNameSteal() {
    const el = document.querySelector<HTMLElement>("[data-goose-name]");
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    // Only steal if the element is visible on screen
    if (rect.top > window.innerHeight || rect.bottom < 0) return false;

    const gooseIsLeft = pos.x < window.innerWidth / 2;
    nameSteal = {
      phase: "walk_to_name",
      nameEl: el,
      nameRect: rect,
      originalText: el.textContent || "YOUSEF",
      carriedText: el.textContent || "YOUSEF",
      carriedX: 0,
      carriedY: 0,
      exitX: gooseIsLeft ? -200 : window.innerWidth + 200,
      returnTarget: { x: rect.left + rect.width / 2 - DISPLAY_SIZE / 2, y: rect.top - 20 },
    };
    brainState = "stealing_name";
    isChasing = false;
    clearActionTimer();
    // Walk toward the name
    target = {
      x: rect.left + rect.width / 2 - DISPLAY_SIZE / 2,
      y: rect.top - DISPLAY_SIZE * ASPECT_RATIO + 20,
    };
    return true;
  }

  function tickNameStealDt(dt: number) {
    if (!nameSteal) return;
    const ns = nameSteal;
    const spd = SPEED.steal;

    switch (ns.phase) {
      case "walk_to_name": {
        const tx = ns.nameRect!.left + ns.nameRect!.width / 2 - DISPLAY_SIZE / 2;
        const ty = ns.nameRect!.top - DISPLAY_SIZE * ASPECT_RATIO + 20;
        const dist = moveToward(tx, ty, spd, dt);
        footprintAccum += spd * dt;
        if (footprintAccum > 50) { footprintAccum -= 50; leaveFootprint(); }
        if (dist < 15) {
          ns.phase = "grab_name";
          isHonking = true;
          playHonkSound();
          setTimeout(() => { isHonking = false; }, 600);
          setTimeout(() => {
            if (ns.nameEl) ns.nameEl.style.visibility = "hidden";
            ns.phase = "drag_offscreen";
            facingRight = ns.exitX > pos.x;
          }, 400);
        }
        break;
      }
      case "grab_name": {
        ns.carriedX = pos.x + DISPLAY_SIZE / 2;
        ns.carriedY = pos.y - 10;
        break;
      }
      case "drag_offscreen": {
        ns.carriedX = pos.x + DISPLAY_SIZE / 2;
        ns.carriedY = pos.y - 10;
        const dx = ns.exitX - pos.x;
        if (Math.abs(dx) < 20 || pos.x < -150 || pos.x > window.innerWidth + 150) {
          ns.phase = "wait_offscreen";
          ns.carriedText = "hire yousef pls";
          const tid = setTimeout(() => {
            if (!running || !nameSteal) return;
            ns.phase = "return_with_hire";
            facingRight = ns.returnTarget.x > pos.x;
          }, 1200);
          deferredTimers.push(tid);
        } else {
          pos.x += Math.sign(dx) * spd * dt;
          footprintAccum += spd * dt;
          if (footprintAccum > 50) { footprintAccum -= 50; leaveFootprint(); }
        }
        break;
      }
      case "wait_offscreen": {
        ns.carriedX = pos.x + DISPLAY_SIZE / 2;
        ns.carriedY = pos.y - 10;
        break;
      }
      case "return_with_hire": {
        const tx = ns.returnTarget.x;
        const ty = ns.returnTarget.y;
        ns.carriedX = pos.x + DISPLAY_SIZE / 2;
        ns.carriedY = pos.y - 10;
        const dist = moveToward(tx, ty, spd, dt);
        const clamped = clampGoosePos(pos.x, pos.y);
        pos.x = clamped.x;
        pos.y = clamped.y;
        footprintAccum += spd * dt;
        if (footprintAccum > 50) { footprintAccum -= 50; leaveFootprint(); }
        if (dist < 15) {
          ns.phase = "place_hire";
          isHonking = true;
          playHonkSound();
          if (ns.nameEl) {
            ns.nameEl.textContent = "hire yousef pls";
            ns.nameEl.style.visibility = "visible";
            ns.nameEl.style.color = "#f97316";
            ns.nameEl.style.transition = "color 3s ease";
          }
          setTimeout(() => {
            isHonking = false;
            ns.phase = "done";
            nameSteal = null;
            hasStoleName = true;
            brainState = "idle";
            const tid2 = setTimeout(() => {
              if (ns.nameEl) {
                ns.nameEl.textContent = ns.originalText;
                ns.nameEl.style.color = "";
                ns.nameEl.style.transition = "";
              }
            }, 8000);
            deferredTimers.push(tid2);
            actionTimer = setTimeout(scheduleAction, 1500);
          }, 800);
        }
        break;
      }
      case "place_hire":
      case "done":
        break;
    }
  }

  // ══════════════════════════════════════════════════════════
  //  MEME-BRING LOGIC
  // ══════════════════════════════════════════════════════════

  function startMemeBring() {
    const memeImg = preloadedMemes[Math.floor(Math.random() * preloadedMemes.length)];
    const gooseIsLeft = pos.x < window.innerWidth / 2;
    const exitX = gooseIsLeft ? -200 : window.innerWidth + 200;
    const memeW = 140;
    const memeH = 100;

    memeBring = {
      phase: "walk_offscreen",
      memeImg,
      memeLoaded: memeImg.complete,
      memeX: 0,
      memeY: 0,
      memeW,
      memeH,
      exitX,
      dropTarget: {
        x: 100 + Math.random() * (window.innerWidth - 300),
        y: 100 + Math.random() * (window.innerHeight - 300),
      },
      born: Date.now(),
    };
    brainState = "bringing_meme";
    isChasing = false;
    clearActionTimer();
    facingRight = exitX > pos.x;
    return true;
  }

  function tickMemeBringDt(dt: number) {
    if (!memeBring) return;
    const mb = memeBring;
    const spd = SPEED.meme;

    switch (mb.phase) {
      case "walk_offscreen": {
        const dx = mb.exitX - pos.x;
        pos.x += Math.sign(dx) * spd * dt;
        if (Math.abs(dx) > 1) facingRight = dx > 0;
        footprintAccum += spd * dt;
        if (footprintAccum > 50) { footprintAccum -= 50; leaveFootprint(); }
        if (Math.abs(pos.x - mb.exitX) < 30 || pos.x < -150 || pos.x > window.innerWidth + 150) {
          mb.phase = "wait_offscreen";
          const tid = setTimeout(() => {
            if (!running || !memeBring) return;
            mb.phase = "return_with_meme";
            facingRight = mb.dropTarget.x > pos.x;
          }, 1000 + Math.random() * 800);
          deferredTimers.push(tid);
        }
        break;
      }
      case "wait_offscreen":
        break;
      case "return_with_meme": {
        const tx = mb.dropTarget.x;
        const ty = mb.dropTarget.y;
        mb.memeX = pos.x + (facingRight ? DISPLAY_SIZE + 5 : -mb.memeW - 5);
        mb.memeY = pos.y + 10;
        const dist = moveToward(tx, ty, spd * 0.7, dt);
        const clamped = clampGoosePos(pos.x, pos.y);
        pos.x = clamped.x;
        pos.y = clamped.y;
        footprintAccum += spd * 0.7 * dt;
        if (footprintAccum > 50) { footprintAccum -= 50; leaveFootprint(); }
        if (dist < 20) {
          mb.phase = "drop_meme";
          isHonking = true;
          playHonkSound();
          droppedMemes.push({
            img: mb.memeImg!,
            x: mb.dropTarget.x - mb.memeW / 2,
            y: mb.dropTarget.y - mb.memeH / 2,
            w: mb.memeW,
            h: mb.memeH,
            rotation: -8 + Math.random() * 16,
            born: Date.now(),
          });
          if (droppedMemes.length > 4) droppedMemes.shift();
          setTimeout(() => {
            isHonking = false;
            mb.phase = "done";
            memeBring = null;
            brainState = "idle";
            actionTimer = setTimeout(scheduleAction, 1500);
          }, 600);
        }
        break;
      }
      case "drop_meme":
      case "done":
        break;
    }
  }

  // ── Brain / AI ──
  function scheduleAction() {
    if (!running) return;
    const roll = Math.random();
    if (roll < 0.12 && !hasStoleName) {
      // ~12% chance: steal the name (only once per session)
      if (!startNameSteal()) {
        // Name element not visible, fall through to wander
        brainState = "wandering";
        isChasing = false;
        pickTarget();
      }
    } else if (roll < 0.28) {
      // ~16% chance: bring a meme
      startMemeBring();
    } else if (roll < 0.42) {
      brainState = "chasing_cursor";
      target = "cursor";
      isHonking = true;
      isChasing = true;
      playHonkSound();
      clearActionTimer();
      actionTimer = setTimeout(
        () => {
          if (!running) return;
          isHonking = false;
          brainState = "idle";
          isChasing = false;
          actionTimer = setTimeout(scheduleAction, 500);
        },
        3000 + Math.random() * 2000,
      );
    } else if (roll < 0.62) {
      brainState = "wandering";
      isChasing = false;
      pickTarget();
    } else if (roll < 0.78) {
      brainState = "dragging_note";
      isChasing = false;
      pickTarget();
    } else {
      brainState = "idle";
      isChasing = false;
      clearActionTimer();
      actionTimer = setTimeout(scheduleAction, 1500 + Math.random() * 2000);
    }
  }

  // ── Game loop (pure canvas, zero React) ──
  // Delta-time animation for frame-rate independent movement
  let lastTime = performance.now();
  let animAccum = 0; // accumulator for sprite frame timing

  // Animation FPS per state — pixel art sweet spot
  const ANIM_FPS: Record<string, number> = {
    idle: 4,        // very slow breathing — calm
    walk: 8,        // natural walk pace
    run: 12,        // fast run
    honk: 8,        // dramatic honk
    carry: 7,       // slightly slower when carrying
    drag: 6,        // heavy dragging
  };

  // Movement speeds (pixels per second) — frame-rate independent
  const SPEED = {
    walk: 90,
    run: 180,
    chase: 270,
    drag_note: 60,
    flee: 150,
    steal: 240,
    meme: 240,
  };

  function getAnimFps(): number {
    if (isHonking) return ANIM_FPS.honk;
    if (brainState === "stealing_name") {
      if (nameSteal?.phase === "drag_offscreen" || nameSteal?.phase === "return_with_hire") return ANIM_FPS.carry;
      return ANIM_FPS.run;
    }
    if (brainState === "bringing_meme") {
      if (memeBring?.phase === "return_with_meme") return ANIM_FPS.drag;
      return ANIM_FPS.run;
    }
    if (brainState === "chasing_cursor") return ANIM_FPS.run;
    if (brainState === "wandering") return ANIM_FPS.walk;
    if (brainState === "dragging_note") return ANIM_FPS.walk;
    return ANIM_FPS.idle;
  }

  function getAnimList(): readonly number[] {
    if (isHonking) return ANIM.honk;
    if (brainState === "stealing_name") {
      if (nameSteal?.phase === "drag_offscreen" || nameSteal?.phase === "return_with_hire") return ANIM.carry;
      return ANIM.run;
    }
    if (brainState === "bringing_meme") {
      if (memeBring?.phase === "return_with_meme") return ANIM.drag;
      return ANIM.run;
    }
    if (brainState === "chasing_cursor") return ANIM.run;
    if (brainState === "wandering" || brainState === "dragging_note") return ANIM.walk;
    if (brainState === "fleeing_cursor") return ANIM.run;
    return ANIM.idle;
  }

  // Smooth movement helper — moves pos toward target at given speed, returns distance
  function moveToward(tx: number, ty: number, speed: number, dt: number): number {
    const dx = tx - pos.x;
    const dy = ty - pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 2) return dist;
    const step = speed * dt;
    if (step >= dist) {
      pos.x = tx;
      pos.y = ty;
    } else {
      pos.x += (dx / dist) * step;
      pos.y += (dy / dist) * step;
    }
    if (Math.abs(dx) > 1) facingRight = dx > 0;
    return dist;
  }

  // Footprint accumulator (distance-based, not frame-based)
  let footprintAccum = 0;

  function gameLoop(now: number) {
    if (!running) return;

    const dt = Math.min((now - lastTime) / 1000, 0.05); // cap at 50ms to avoid spiral
    lastTime = now;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // ── Update animation frame (time-based) ──
    animAccum += dt;
    const animInterval = 1 / getAnimFps();
    if (animAccum >= animInterval) {
      animAccum -= animInterval;
      frameTickRef++;
      const animList = getAnimList();
      currentFrame = animList[frameTickRef % animList.length];
    }

    // ── Physics ──
    if (dragging) {
      // Dragged by user — no physics, just animate walk
    } else if (brainState === "stealing_name") {
      tickNameStealDt(dt);
    } else if (brainState === "bringing_meme") {
      tickMemeBringDt(dt);
    } else {
      const st = brainState;
      let speed = SPEED.walk;
      let tx = 0;
      let ty = 0;
      let walking = false;

      if (st === "chasing_cursor") {
        tx = cursor.x - DISPLAY_SIZE / 2;
        ty = cursor.y - (DISPLAY_SIZE * ASPECT_RATIO) / 2;
        speed = SPEED.chase;
        walking = true;
      } else if (st === "wandering" || st === "dragging_note" || st === "fleeing_cursor" || st === "pecking") {
        if (target !== "cursor") {
          tx = target.x;
          ty = target.y;
        }
        if (st === "dragging_note") speed = SPEED.drag_note;
        else if (st === "fleeing_cursor") speed = SPEED.flee;
        walking = true;
      }

      if (walking) {
        const dist = moveToward(tx, ty, speed, dt);
        // Clamp to viewport for normal states
        const clamped = clampGoosePos(pos.x, pos.y);
        pos.x = clamped.x;
        pos.y = clamped.y;

        if (dist < 10) {
          if (st === "dragging_note") {
            dropNote();
            isHonking = true;
            playHonkSound();
            setTimeout(() => { isHonking = false; }, 500);
          }
          if (st !== "chasing_cursor") {
            brainState = "idle";
            isChasing = false;
            clearActionTimer();
            actionTimer = setTimeout(scheduleAction, 1000);
          }
        }

        // Distance-based footprints
        footprintAccum += speed * dt;
        const fpInterval = st === "chasing_cursor" ? 40 : 80;
        if (footprintAccum > fpInterval) {
          footprintAccum -= fpInterval;
          leaveFootprint();
        }
      }
    }

    // ── Render ──
    drawFootprints();
    drawDroppedMemes();
    drawCarriedMeme();
    if (nameSteal && (nameSteal.phase === "drag_offscreen" || nameSteal.phase === "grab_name" || nameSteal.phase === "return_with_hire")) {
      drawCarriedText(nameSteal.carriedText, nameSteal.carriedX, nameSteal.carriedY);
    }
    drawSprite(currentFrame);
    drawNotes();

    requestAnimationFrame(gameLoop);
  }

  // ── Event handlers (raw DOM, no React) ──
  function onPointerMove(e: PointerEvent) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    if (dragging) {
      const clamped = clampGoosePos(e.clientX - dragging.ox, e.clientY - dragging.oy);
      pos.x = clamped.x;
      pos.y = clamped.y;
      if (Math.abs(e.movementX) > 0.5) facingRight = e.movementX > 0;
    }
  }

  function isInsideGoose(x: number, y: number) {
    return (
      x >= pos.x &&
      x <= pos.x + DISPLAY_SIZE &&
      y >= pos.y &&
      y <= pos.y + DISPLAY_SIZE * ASPECT_RATIO
    );
  }

  function onPointerDown(e: PointerEvent) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    if (isInsideGoose(e.clientX, e.clientY)) {
      dragging = { ox: e.clientX - pos.x, oy: e.clientY - pos.y };
      pointerDown = { x: e.clientX, y: e.clientY, t: Date.now() };
    }
  }

  function onPointerUp(e: PointerEvent) {
    if (!dragging) return;
    const down = pointerDown;
    dragging = null;
    pointerDown = null;
    const tap =
      down && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 14 && Date.now() - down.t < 480;
    if (tap) {
      playHonkSound();
      isHonking = true;
      dropNote();
      setTimeout(() => {
        isHonking = false;
      }, 800);
    }
  }

  // ── Populate dev commands ──
  if (commands) {
    commands.stealName = () => {
      hasStoleName = false; // allow re-triggering
      clearActionTimer();
      if (!startNameSteal()) {
        // eslint-disable-next-line no-console
        console.warn("[goose] Name element not found or not visible");
      }
    };
    commands.bringMeme = () => {
      clearActionTimer();
      startMemeBring();
    };
    commands.chaseCursor = () => {
      clearActionTimer();
      brainState = "chasing_cursor";
      target = "cursor";
      isHonking = true;
      isChasing = true;
      playHonkSound();
      actionTimer = setTimeout(() => {
        if (!running) return;
        isHonking = false;
        brainState = "idle";
        isChasing = false;
        actionTimer = setTimeout(scheduleAction, 500);
      }, 3000 + Math.random() * 2000);
    };
    commands.dropNote = () => {
      clearActionTimer();
      brainState = "dragging_note";
      isChasing = false;
      pickTarget();
    };
    commands.wander = () => {
      clearActionTimer();
      brainState = "wandering";
      isChasing = false;
      pickTarget();
    };
  }

  // ── Start ──
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("resize", resize);

  clearActionTimer();
  actionTimer = setTimeout(scheduleAction, 500);
  requestAnimationFrame(gameLoop);

  // ── Cleanup function ──
  return () => {
    running = false;
    clearActionTimer();
    for (const t of deferredTimers) clearTimeout(t);
    canvas.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("resize", resize);
    // Restore name if stolen
    if (nameSteal?.nameEl) {
      nameSteal.nameEl.textContent = nameSteal.originalText;
      nameSteal.nameEl.style.visibility = "visible";
      nameSteal.nameEl.style.color = "";
      nameSteal.nameEl.style.transition = "";
    }
  };
}

// ══════════════════════════════════════════════════════════
//  React component (minimal — only handles toggle state)
// ══════════════════════════════════════════════════════════

export function DesktopGoose() {
  const isHydrated = useIsHydrated();
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const commandsRef = useRef<GooseCommands>({
    stealName: () => {},
    bringMeme: () => {},
    chaseCursor: () => {},
    dropNote: () => {},
    wander: () => {},
  });

  const isDev = process.env.NODE_ENV !== "production";

  // Load sprite image once
  const spriteImgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = GOOSE_SPRITE_URL;
    spriteImgRef.current = img;
  }, []);

  // Start/stop canvas game loop
  useEffect(() => {
    if (!active || !canvasRef.current || !spriteImgRef.current) return;

    const canvas = canvasRef.current;
    const img = spriteImgRef.current;

    // Wait for sprite to load if not ready
    const start = () => {
      cleanupRef.current = startGooseCanvas(canvas, img, commandsRef.current);
    };

    if (img.complete) {
      start();
    } else {
      img.onload = start;
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [active]);

  const activateGoose = useCallback(() => setActive(true), []);
  const deactivateGoose = useCallback(() => {
    setActive(false);
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, []);

  if (!active) {
    if (!isHydrated) {
      return (
        <span className="p-2">
          <GooseNavSprite />
        </span>
      );
    }
    return (
      <button
        onClick={activateGoose}
        className="group flex items-center justify-center p-2 rounded-full transition-all duration-300 text-zinc-400 hover:text-zinc-200 hover:bg-white/5 active:bg-[#252528]/90 active:shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] active:ring-1 active:ring-white/10"
        title="🪿 Release the Goose"
      >
        <GooseNavSprite />
      </button>
    );
  }

  // When active: canvas overlay via portal + catch button in navbar
  const overlay =
    typeof document !== "undefined"
      ? createPortal(
          <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[99999] cursor-grab"
            style={{ pointerEvents: "none" }}
          />,
          document.body,
        )
      : null;

  // Dev-only debug panel portaled to body
  const devPanel =
    isDev && typeof document !== "undefined"
      ? createPortal(
          <div
            style={{
              position: "fixed",
              bottom: 12,
              right: 12,
              zIndex: 100000,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              background: "rgba(0,0,0,0.85)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              padding: 8,
              fontFamily: "monospace",
              fontSize: 11,
            }}
          >
            <span style={{ color: "#f97316", fontWeight: "bold", textAlign: "center", paddingBottom: 2 }}>
              🪿 goose dev
            </span>
            {(
              [
                ["Steal Name", () => commandsRef.current.stealName()],
                ["Bring Meme", () => commandsRef.current.bringMeme()],
                ["Chase Cursor", () => commandsRef.current.chaseCursor()],
                ["Drop Note", () => commandsRef.current.dropNote()],
                ["Wander", () => commandsRef.current.wander()],
              ] as const
            ).map(([label, fn]) => (
              <button
                key={label}
                onClick={fn as () => void}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "#e4e4e7",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 4,
                  padding: "4px 10px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {label}
              </button>
            ))}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        onClick={deactivateGoose}
        className="relative z-[100000] flex items-center justify-center p-2 rounded-full transition-all duration-300 bg-[#252528]/90 text-orange-400 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] ring-1 ring-white/10 hover:bg-white/10 active:scale-95"
        title="🪿 Catch the Goose"
      >
        <GooseNavSprite />
      </button>
      {overlay}
      {devPanel}
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      `}</style>
    </>
  );
}
