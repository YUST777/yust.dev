import { useState, useEffect, useRef, useCallback } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useIsHydrated } from "@/lib/hooks/use-is-hydrated";
import { sounds } from "@/lib/sounds";

/*
 * ══════════════════════════════════════════════════════════
 *  DESKTOP GOOSE — Web Edition (Ultimate Chaos)
 *  Inspired by Desktop Goose, goose-linux, and similar desk pets
 *
 *  Sprite sheet: 4x3 grid from old_goose.jpg
 * ══════════════════════════════════════════════════════════
 */

const DISPLAY_SIZE = 80;
const SPRITE_COLS = 4;
const SPRITE_ROWS = 3;
const ASPECT_RATIO = 1.333; // Sprite frames are 256x341
const GOOSE_SPRITE_URL = "/static/images/goose-sprite.webp";

// ── Frame indices by animation (Restored for humor and variety) ──
const ANIM = {
  idle: [0, 1, 0, 1, 2, 3, 2, 3], // Row 0: various idles
  walk: [4, 5, 6, 7],             // Row 1: walking loop
  honk: [8, 9, 10, 9],            // Row 2: honking states
} as const;

// ── Meme notes the goose drops ──
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
    sounds.honk();
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

interface GooseNote {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
}

interface Footprint {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

/** Supporting the 4x3 grid with clean row/col slicing */
function gooseSpriteLayerStyle(
  frameIdx: number,
  frameWidthPx: number,
): CSSProperties {
  const col = frameIdx % SPRITE_COLS;
  const row = Math.floor(frameIdx / SPRITE_COLS);

  // Use percentages to avoid subpixel bleed at any resolution
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

function clampGoosePos(x: number, y: number) {
  const maxX = Math.max(0, window.innerWidth - DISPLAY_SIZE);
  const maxY = Math.max(0, window.innerHeight - DISPLAY_SIZE * ASPECT_RATIO);
  return {
    x: Math.min(maxX, Math.max(0, x)),
    y: Math.min(maxY, Math.max(0, y)),
  };
}

const NAV_GOOSE_TILE = 18;
const NAV_SPRITE_H_GUTTER_PX = 1;

function GooseNavSprite({ variant }: { variant: "release" | "catch" }) {
  const isCatch = variant === "catch";
  const vW = NAV_GOOSE_TILE - 2 * NAV_SPRITE_H_GUTTER_PX;
  return (
    <span
      aria-hidden
      className="pointer-events-none relative block h-[18px] shrink-0 overflow-hidden"
      style={{ width: NAV_GOOSE_TILE }}
    >
      <span
        className="block overflow-hidden"
        style={{
          width: vW,
          height: 18,
          marginLeft: NAV_SPRITE_H_GUTTER_PX,
        }}
      >
        <span
          className="block h-[18px]"
          style={{
            width: NAV_GOOSE_TILE,
            marginLeft: -NAV_SPRITE_H_GUTTER_PX,
            ...gooseSpriteLayerStyle(0, NAV_GOOSE_TILE),
            filter: isCatch
              ? "drop-shadow(0 0 6px rgba(251, 146, 60, 0.4))"
              : "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.55))",
          }}
        />
      </span>
    </span>
  );
}

export function DesktopGoose() {
  const isHydrated = useIsHydrated();
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [facingRight, setFacingRight] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [notes, setNotes] = useState<GooseNote[]>([]);
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const [isChasing, setIsChasing] = useState(false);
  const [isDraggingGoose, setIsDraggingGoose] = useState(false);

  const noteIdRef = useRef(0);
  const footIdRef = useRef(0);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef<{ x: number; y: number } | "cursor">({ x: 300, y: 300 });
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const facingRef = useRef(true);
  const animRef = useRef<number>(0);
  const isHonkingRef = useRef(false);

  const stateRef = useRef<GooseBrainState>("idle");
  const userDragRef = useRef<{ pointerId: number; ox: number; oy: number } | null>(null);
  const pointerDownRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const frameTickRef = useRef(0);
  const actionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deferredTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearActionTimer = () => {
    if (actionTimerRef.current !== null) {
      clearTimeout(actionTimerRef.current);
      actionTimerRef.current = null;
    }
  };

  const pushDeferred = (id: ReturnType<typeof setTimeout>) => {
    deferredTimeoutsRef.current.push(id);
  };

  const clearAllDeferred = () => {
    for (const id of deferredTimeoutsRef.current) clearTimeout(id);
    deferredTimeoutsRef.current = [];
  };

  const pickTarget = useCallback(() => {
    const margin = 100;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const rangeX = Math.max(0, w - margin * 2);
    const rangeY = Math.max(0, h - margin * 2);
    targetRef.current = {
      x: margin + Math.random() * rangeX,
      y: margin + Math.random() * rangeY,
    };
  }, []);

  const pickFleeTarget = useCallback(() => {
    const cx = cursorPosRef.current.x;
    const cy = cursorPosRef.current.y;
    const gcx = posRef.current.x + DISPLAY_SIZE / 2;
    const gcy = posRef.current.y + (DISPLAY_SIZE * ASPECT_RATIO) / 2;
    let vx = gcx - cx;
    let vy = gcy - cy;
    const len = Math.hypot(vx, vy);
    if (len < 8) {
      const a = Math.random() * Math.PI * 2;
      vx = Math.cos(a);
      vy = Math.sin(a);
    } else {
      vx /= len;
      vy /= len;
    }
    const run = 160 + Math.random() * 260;
    targetRef.current = clampGoosePos(
      gcx + vx * run - DISPLAY_SIZE / 2,
      gcy + vy * run - (DISPLAY_SIZE * ASPECT_RATIO) / 2,
    );
  }, []);

  const pickEdgePeckTarget = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const m = 28;
    const maxX = Math.max(m, w - DISPLAY_SIZE - m);
    const maxY = Math.max(m, h - DISPLAY_SIZE * ASPECT_RATIO - m);
    const rx = () => m + Math.random() * Math.max(0, maxX - m);
    const ry = () => m + Math.random() * Math.max(0, maxY - m);
    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) targetRef.current = clampGoosePos(rx(), m);
    else if (edge === 1) targetRef.current = clampGoosePos(rx(), maxY);
    else if (edge === 2) targetRef.current = clampGoosePos(m, ry());
    else targetRef.current = clampGoosePos(maxX, ry());
  }, []);

  useEffect(() => {
    if (!active) return;
    const center = () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    cursorPosRef.current = center();
    const onPointer = (e: PointerEvent) => {
      cursorPosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    const onResize = () => {
      const c = clampGoosePos(posRef.current.x, posRef.current.y);
      posRef.current = c;
      setPos({ ...c });
      if (targetRef.current !== "cursor") pickTarget();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [active, pickTarget]);

  const dropNote = useCallback((gx: number, gy: number, right: boolean) => {
    const text = GOOSE_NOTES[Math.floor(Math.random() * GOOSE_NOTES.length)];
    const id = noteIdRef.current++;
    const note: GooseNote = {
      id,
      text,
      x: Math.max(10, Math.min(window.innerWidth - 180, gx + (right ? DISPLAY_SIZE : -150))),
      y: Math.max(10, gy - 20),
      rotation: -10 + Math.random() * 20,
    };
    setNotes((prev) => [...prev.slice(-4), note]);
  }, []);

  const clearNoteTimeout = useCallback((id: number) => {
    const tid = setTimeout(() => setNotes((prev) => prev.filter((n) => n.id !== id)), 8000);
    pushDeferred(tid);
  }, []);

  const leaveFootprint = useCallback((x: number, y: number, facesRight: boolean) => {
    const id = footIdRef.current++;
    const rot = facesRight ? 90 + Math.random() * 20 : -90 - Math.random() * 20;
    const print: Footprint = {
      id,
      x: x + DISPLAY_SIZE / 2,
      y: y + DISPLAY_SIZE * ASPECT_RATIO - 10,
      rotation: rot,
    };
    setFootprints((prev) => [...prev.slice(-15), print]);
    const tid = setTimeout(() => setFootprints((prev) => prev.filter((p) => p.id !== id)), 6000);
    pushDeferred(tid);
  }, []);

  useEffect(() => {
    if (!active) return;
    stateRef.current = "idle";
    isHonkingRef.current = false;
    setIsChasing(false);
    frameTickRef.current = 0;
    let running = true;
    let frameTick = 0;

    const scheduleAction = () => {
      if (!running) return;
      const roll = Math.random();
      if (roll < 0.2) {
        stateRef.current = "chasing_cursor";
        targetRef.current = "cursor";
        isHonkingRef.current = true;
        setIsChasing(true);
        playHonkSound();
        clearActionTimer();
        actionTimerRef.current = setTimeout(() => {
          if (!running) return;
          isHonkingRef.current = false;
          stateRef.current = "idle";
          setIsChasing(false);
          actionTimerRef.current = setTimeout(scheduleAction, 500);
        }, 3000 + Math.random() * 2000);
      } else if (roll < 0.5) {
        stateRef.current = "wandering";
        setIsChasing(false);
        pickTarget();
      } else if (roll < 0.7) {
        stateRef.current = "dragging_note";
        setIsChasing(false);
        pickTarget();
      } else {
        stateRef.current = "idle";
        setIsChasing(false);
        clearActionTimer();
        actionTimerRef.current = setTimeout(scheduleAction, 1500 + Math.random() * 2000);
      }
    };

    const gameLoop = () => {
      if (!running) return;
      frameTick++;

      if (userDragRef.current) {
        if (frameTick % 8 === 0) {
          frameTickRef.current++;
          setCurrentFrame(ANIM.walk[frameTickRef.current % ANIM.walk.length]);
        }
        if (frameTick % 2 === 0) setPos({ ...posRef.current });
        animRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const st = stateRef.current;
      let speed = 1.5;
      let tx = 0, ty = 0;
      let walking = false;

      if (st === "chasing_cursor") {
        tx = cursorPosRef.current.x - DISPLAY_SIZE / 2;
        ty = cursorPosRef.current.y - (DISPLAY_SIZE * ASPECT_RATIO) / 2;
        speed = 4.5;
        walking = true;
      } else if (st === "wandering" || st === "dragging_note" || st === "fleeing_cursor" || st === "pecking") {
        if (targetRef.current !== "cursor") {
          tx = targetRef.current.x;
          ty = targetRef.current.y;
        }
        if (st === "dragging_note") speed = 1.0;
        else if (st === "fleeing_cursor") speed = 2.5;
        walking = true;
      }

      if (walking) {
        const dx = tx - posRef.current.x;
        const dy = ty - posRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 10) {
          if (st === "dragging_note") {
            dropNote(posRef.current.x, posRef.current.y, facingRef.current);
            clearNoteTimeout(noteIdRef.current - 1);
            isHonkingRef.current = true;
            playHonkSound();
            setTimeout(() => { isHonkingRef.current = false; }, 500);
          }
          if (st !== "chasing_cursor") {
            stateRef.current = "idle";
            setIsChasing(false);
            clearActionTimer();
            actionTimerRef.current = setTimeout(scheduleAction, 1000);
          }
        } else {
          const nx = posRef.current.x + (dx / dist) * speed;
          const ny = posRef.current.y + (dy / dist) * speed;
          posRef.current = clampGoosePos(nx, ny);
          if (Math.abs(dx) > 1) facingRef.current = dx > 0;
          if ((st === "chasing_cursor" && frameTick % 10 === 0) || (st === "dragging_note" && frameTick % 20 === 0)) {
            leaveFootprint(nx, ny, facingRef.current);
          }
        }
      }

      const INTERVAL = speed > 2 ? 4 : 8;
      if (frameTick % INTERVAL === 0) {
        frameTickRef.current++;
        let animList: readonly number[] = ANIM.idle;
        if (walking) animList = ANIM.walk;
        if (st === "chasing_cursor" || isHonkingRef.current) animList = ANIM.honk;
        setCurrentFrame(animList[frameTickRef.current % animList.length]);
      }
      if (frameTick % 2 === 0) {
        setPos({ ...posRef.current });
        setFacingRight(facingRef.current);
      }
      animRef.current = requestAnimationFrame(gameLoop);
    };

    posRef.current = clampGoosePos(window.innerWidth / 2 - DISPLAY_SIZE / 2, window.innerHeight / 2 - (DISPLAY_SIZE * ASPECT_RATIO) / 2);
    setPos({ ...posRef.current });
    clearActionTimer();
    actionTimerRef.current = setTimeout(scheduleAction, 500);
    animRef.current = requestAnimationFrame(gameLoop);
    return () => {
      running = false;
      clearActionTimer();
      clearAllDeferred();
      cancelAnimationFrame(animRef.current);
    };
  }, [active, pickTarget, dropNote, leaveFootprint, clearNoteTimeout]);

  const handleGooseClick = useCallback(() => {
    playHonkSound();
    isHonkingRef.current = true;
    dropNote(posRef.current.x, posRef.current.y, facingRef.current);
    clearNoteTimeout(noteIdRef.current - 1);
    setTimeout(() => { isHonkingRef.current = false; }, 800);
  }, [dropNote, clearNoteTimeout]);

  const activateGoose = () => setActive(true);
  const deactivateGoose = () => {
    setActive(false);
    setNotes([]);
    setFootprints([]);
    isHonkingRef.current = false;
    setIsChasing(false);
    clearActionTimer();
    clearAllDeferred();
    cancelAnimationFrame(animRef.current);
  };

  if (!active) {
    if (!isHydrated) return <span className="p-2"><GooseNavSprite variant="release" /></span>;
    return (
      <button onClick={activateGoose} className="group p-2 transition-transform hover:scale-110 active:scale-95" title="🪿 Release the Goose">
        <GooseNavSprite variant="release" />
      </button>
    );
  }

  const overlay = typeof document !== "undefined" ? createPortal(
    <>
      {footprints.map(fp => (
        <div key={fp.id} className="fixed pointer-events-none opacity-40 z-[99997]" style={{ left: fp.x, top: fp.y, transform: `rotate(${fp.rotation}deg)` }}>
          <span className="text-[#8B4513] text-lg font-bold">🐾</span>
        </div>
      ))}
      <div
        onPointerDown={e => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setIsDraggingGoose(true);
          userDragRef.current = { pointerId: e.pointerId, ox: e.clientX - posRef.current.x, oy: e.clientY - posRef.current.y };
          pointerDownRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
        }}
        onPointerMove={e => {
          if (!userDragRef.current) return;
          const nx = clampGoosePos(e.clientX - userDragRef.current.ox, e.clientY - userDragRef.current.oy);
          posRef.current = nx;
          setPos({ ...nx });
          if (Math.abs(e.movementX) > 0.5) facingRef.current = e.movementX > 0;
        }}
        onPointerUp={e => {
          if (!userDragRef.current) return;
          e.currentTarget.releasePointerCapture(e.pointerId);
          const down = pointerDownRef.current;
          userDragRef.current = null;
          setIsDraggingGoose(false);
          const tap = down && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 14 && Date.now() - down.t < 480;
          if (tap) handleGooseClick();
        }}
        className={`fixed select-none touch-manipulation ${isDraggingGoose ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          left: Math.round(pos.x),
          top: Math.round(pos.y),
          width: DISPLAY_SIZE,
          height: DISPLAY_SIZE * ASPECT_RATIO,
          zIndex: 99999,
          transform: `scaleX(${facingRight ? -1 : 1})`,
          imageRendering: "pixelated",
          filter: `drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black) drop-shadow(0 4px 12px rgba(0,0,0,0.6))`,
        }}
      >
        <div style={{ width: "100%", height: "100%", ...gooseSpriteLayerStyle(currentFrame, DISPLAY_SIZE) }} />
        {isChasing && <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-pixel text-orange-500 text-[12px] font-bold animate-bounce" style={{ transform: `scaleX(${facingRight ? -1 : 1}) translateX(-50%)` }}>HONK!!</div>}
      </div>
      {notes.map(note => (
        <div key={note.id} className="fixed pointer-events-none z-[99998]" style={{ left: note.x, top: note.y, transform: `rotate(${note.rotation}deg)`, animation: "noteAppear 0.35s ease-out forwards" }}>
          <div className="relative bg-[#fffef0] text-zinc-900 px-3 py-2.5 rounded-sm shadow-xl border border-zinc-300 font-mono text-[10px] sm:text-[11px] whitespace-pre-wrap max-w-[170px]">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-yellow-400/60 rounded-sm" />
            {note.text}
          </div>
        </div>
      ))}
      <style>{`
        @keyframes noteAppear {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      `}</style>
    </>, document.body) : null;

  return (
    <>
      <button onClick={deactivateGoose} className="relative z-20 p-2 text-orange-400 transition-transform hover:scale-110 active:scale-95" style={{ animation: "pulse 2s infinite" }} title="🪿 Catch the Goose">
        <GooseNavSprite variant="catch" />
      </button>
      {overlay}
    </>
  );
}
