import { useState, useEffect, useRef, useCallback } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useIsHydrated } from "@/lib/hooks/use-is-hydrated";
import { sounds } from "@/lib/sounds";

/*
 * ══════════════════════════════════════════════════════════
 *  DESKTOP GOOSE — Canvas Edition
 *  100% canvas-rendered game loop. Zero React state updates
 *  per frame. Only the nav toggle button uses React state.
 *
 *  Sprite sheet: 4x3 grid from goose-sprite.webp
 * ══════════════════════════════════════════════════════════
 */

const DISPLAY_SIZE = 80;
const SPRITE_COLS = 4;
const SPRITE_ROWS = 3;
const ASPECT_RATIO = 1.333;
const GOOSE_SPRITE_URL = "/static/images/goose-sprite.webp";
const DPR = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

const ANIM = {
  idle: [0, 1, 0, 1, 2, 3, 2, 3],
  walk: [4, 5, 6, 7],
  honk: [8, 9, 10, 9],
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
  | "pecking";

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

function clampGoosePos(x: number, y: number) {
  const maxX = Math.max(0, window.innerWidth - DISPLAY_SIZE);
  const maxY = Math.max(0, window.innerHeight - DISPLAY_SIZE * ASPECT_RATIO);
  return {
    x: Math.min(maxX, Math.max(0, x)),
    y: Math.min(maxY, Math.max(0, y)),
  };
}

// ── Nav sprite (kept in DOM since it's part of the Navbar) ──
const NAV_GOOSE_TILE = 18;
const NAV_SPRITE_H_GUTTER_PX = 1;

function gooseSpriteLayerStyle(frameIdx: number): CSSProperties {
  const col = frameIdx % SPRITE_COLS;
  const row = Math.floor(frameIdx / SPRITE_COLS);
  const px = (col / (SPRITE_COLS - 1)) * 100;
  const py = (row / (SPRITE_ROWS - 1)) * 100;
  return {
    backgroundImage: `url('${GOOSE_SPRITE_URL}')`,
    backgroundSize: `${SPRITE_COLS * 100}% ${SPRITE_ROWS * 100}%`,
    backgroundPosition: `${px}% ${py}%`,
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
  };
}

function GooseNavSprite() {
  const vW = NAV_GOOSE_TILE - 2 * NAV_SPRITE_H_GUTTER_PX;
  return (
    <span
      aria-hidden
      className="pointer-events-none relative block h-[18px] shrink-0 overflow-hidden"
      style={{ width: NAV_GOOSE_TILE }}
    >
      <span
        className="block overflow-hidden"
        style={{ width: vW, height: 18, marginLeft: NAV_SPRITE_H_GUTTER_PX }}
      >
        <span
          className="block h-[18px]"
          style={{
            width: NAV_GOOSE_TILE,
            marginLeft: -NAV_SPRITE_H_GUTTER_PX,
            ...gooseSpriteLayerStyle(0),
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
          }}
        />
      </span>
    </span>
  );
}

// ══════════════════════════════════════════════════════════
//  Canvas-based goose overlay — runs entirely outside React
// ══════════════════════════════════════════════════════════

function startGooseCanvas(
  canvas: HTMLCanvasElement,
  spriteImg: HTMLImageElement,
  onDeactivate: () => void,
) {
  const ctx = canvas.getContext("2d", { alpha: true })!;
  let running = true;
  let frameTick = 0;
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
    // Re-clamp goose position
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
      x: Math.max(10, Math.min(window.innerWidth - 180, pos.x + (facingRight ? DISPLAY_SIZE : -150))),
      y: Math.max(10, pos.y - 20),
      rotation: -10 + Math.random() * 20,
      born: Date.now(),
    });
    if (notes.length > 5) notes.shift();
    // Auto-remove after 8s
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
    // Shadow instead of CSS drop-shadow (much cheaper on canvas)
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      spriteImg,
      sx, sy, spriteW, spriteH,
      -DISPLAY_SIZE / 2, 0, DISPLAY_SIZE, DISPLAY_SIZE * ASPECT_RATIO,
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
      // Fade-in animation (first 350ms)
      const scale = Math.min(1, age / 350);
      const opacity = Math.min(1, age / 350);

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(note.x, note.y);
      ctx.rotate((note.rotation * Math.PI) / 180);
      ctx.scale(scale, scale);

      // Sticky note background
      const lines = note.text.split("\n");
      const lineHeight = 13;
      const padding = 8;
      const noteW = 150;
      const noteH = lines.length * lineHeight + padding * 2;

      // Paper
      ctx.fillStyle = "#fffef0";
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.fillRect(0, 0, noteW, noteH);
      ctx.shadowColor = "transparent";

      // Tape
      ctx.fillStyle = "rgba(250, 204, 21, 0.5)";
      ctx.fillRect(noteW / 2 - 16, -6, 32, 10);

      // Border
      ctx.strokeStyle = "#d4d4d8";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(0, 0, noteW, noteH);

      // Text
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

  // ── Brain / AI ──
  function scheduleAction() {
    if (!running) return;
    const roll = Math.random();
    if (roll < 0.2) {
      brainState = "chasing_cursor";
      target = "cursor";
      isHonking = true;
      isChasing = true;
      playHonkSound();
      clearActionTimer();
      actionTimer = setTimeout(() => {
        if (!running) return;
        isHonking = false;
        brainState = "idle";
        isChasing = false;
        actionTimer = setTimeout(scheduleAction, 500);
      }, 3000 + Math.random() * 2000);
    } else if (roll < 0.5) {
      brainState = "wandering";
      isChasing = false;
      pickTarget();
    } else if (roll < 0.7) {
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
  function gameLoop() {
    if (!running) return;
    frameTick++;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Physics
    if (dragging) {
      if (frameTick % 8 === 0) {
        frameTickRef++;
        currentFrame = ANIM.walk[frameTickRef % ANIM.walk.length];
      }
    } else {
      const st = brainState;
      let speed = 1.5;
      let tx = 0;
      let ty = 0;
      let walking = false;

      if (st === "chasing_cursor") {
        tx = cursor.x - DISPLAY_SIZE / 2;
        ty = cursor.y - (DISPLAY_SIZE * ASPECT_RATIO) / 2;
        speed = 4.5;
        walking = true;
      } else if (st === "wandering" || st === "dragging_note" || st === "fleeing_cursor" || st === "pecking") {
        if (target !== "cursor") {
          tx = target.x;
          ty = target.y;
        }
        if (st === "dragging_note") speed = 1.0;
        else if (st === "fleeing_cursor") speed = 2.5;
        walking = true;
      }

      if (walking) {
        const dx = tx - pos.x;
        const dy = ty - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
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
        } else {
          const nx = pos.x + (dx / dist) * speed;
          const ny = pos.y + (dy / dist) * speed;
          const clamped = clampGoosePos(nx, ny);
          pos.x = clamped.x;
          pos.y = clamped.y;
          if (Math.abs(dx) > 1) facingRight = dx > 0;
          if (
            (st === "chasing_cursor" && frameTick % 10 === 0) ||
            (st === "dragging_note" && frameTick % 20 === 0)
          ) {
            leaveFootprint();
          }
        }
      }

      const INTERVAL = speed > 2 ? 4 : 8;
      if (frameTick % INTERVAL === 0) {
        frameTickRef++;
        let animList: readonly number[] = ANIM.idle;
        if (walking) animList = ANIM.walk;
        if (st === "chasing_cursor" || isHonking) animList = ANIM.honk;
        currentFrame = animList[frameTickRef % animList.length];
      }
    }

    // Render everything in one pass
    drawFootprints();
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
      canvas.setPointerCapture(e.pointerId);
      dragging = { ox: e.clientX - pos.x, oy: e.clientY - pos.y };
      pointerDown = { x: e.clientX, y: e.clientY, t: Date.now() };
    }
  }

  function onPointerUp(e: PointerEvent) {
    if (!dragging) return;
    canvas.releasePointerCapture(e.pointerId);
    const down = pointerDown;
    dragging = null;
    pointerDown = null;
    const tap =
      down &&
      Math.hypot(e.clientX - down.x, e.clientY - down.y) < 14 &&
      Date.now() - down.t < 480;
    if (tap) {
      playHonkSound();
      isHonking = true;
      dropNote();
      setTimeout(() => { isHonking = false; }, 800);
    }
  }

  // ── Start ──
  canvas.addEventListener("pointermove", onPointerMove, { passive: true });
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
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
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("resize", resize);
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
      cleanupRef.current = startGooseCanvas(canvas, img, () => setActive(false));
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
        className="group p-2 transition-transform hover:scale-110 active:scale-95"
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
            style={{ pointerEvents: "auto" }}
          />,
          document.body,
        )
      : null;

  return (
    <>
      <button
        onClick={deactivateGoose}
        className="relative z-20 p-2 text-orange-400 transition-transform hover:scale-110 active:scale-95"
        style={{ animation: "pulse 2s infinite" }}
        title="🪿 Catch the Goose"
      >
        <GooseNavSprite />
      </button>
      {overlay}
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      `}</style>
    </>
  );
}
