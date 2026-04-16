import { useState, useEffect, useRef, useCallback } from "react";

/*
 * ══════════════════════════════════════════════════════════
 *  DESKTOP GOOSE — Web Edition (Ultimate Chaos)
 *  Inspired by samperson's Desktop Goose & goose-linux
 *
 *  Sprite sheet: 4 frames in 1 row (Idle, Walk1, Walk2, Honk)
 * ══════════════════════════════════════════════════════════
 */

const DISPLAY_SIZE = 72; // rendered goose size in px

// ── Frame indices by animation ──
const ANIM = {
  idle: [0, 0, 0, 0],           
  walk: [0, 1, 2, 1],           
  honk: [3, 3, 3, 3],          
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
  "🪿 > 🌙",
];

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

// ── Helper: get CSS background-position ──
function getFramePos(frameIdx: number) {
  const col = frameIdx % 4;
  const px = (col / 3) * 100;
  return `${px}% 50%`; // Centered vertically
}

export function DesktopGoose() {
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [facingRight, setFacingRight] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [notes, setNotes] = useState<GooseNote[]>([]);
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const [isHonking, setIsHonking] = useState(false);

  const noteIdRef = useRef(0);
  const footIdRef = useRef(0);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef<{x: number, y: number} | "cursor">({ x: 300, y: 300 });
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const facingRef = useRef(true);
  const animRef = useRef<number>(0);
  
  // States: idle | wandering | chasing_cursor | dragging_note
  const stateRef = useRef<"idle" | "wandering" | "chasing_cursor" | "dragging_note">("idle");
  const frameTickRef = useRef(0);
  const actionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Track Cursor ──
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorPosRef.current = { x: e.clientX, y: e.clientY };
    };
    if (active) window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [active]);

  // ── Pick a new random target ──
  const pickTarget = useCallback(() => {
    const margin = 100;
    targetRef.current = {
      x: margin + Math.random() * (window.innerWidth - margin * 2),
      y: margin + Math.random() * (window.innerHeight - margin * 2),
    };
  }, []);

  // ── Drop a meme note ──
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
      setTimeout(() => setNotes(prev => prev.filter(n => n.id !== id)), 8000);
  }, []);

  // ── Leave footprint ──
  const leaveFootprint = useCallback((x: number, y: number, facingRight: boolean) => {
      const id = footIdRef.current++;
      const rot = facingRight ? 90 + Math.random()*20 : -90 - Math.random()*20;
      const print: Footprint = { id, x: x + DISPLAY_SIZE/2, y: y + DISPLAY_SIZE - 10, rotation: rot };
      setFootprints(prev => [...prev.slice(-15), print]);
      setTimeout(() => setFootprints(prev => prev.filter(p => p.id !== id)), 6000);
  }, []);

  // ── Main game loop ──
  useEffect(() => {
    if (!active) return;

    let running = true;
    let frameTick = 0;
    let speed = 1.5;

    const scheduleAction = () => {
      if (!running) return;
      const roll = Math.random();

      if (roll < 0.2) {
        // Chase Cursor!
        stateRef.current = "chasing_cursor";
        targetRef.current = "cursor";
        setIsHonking(true);
        actionTimerRef.current = setTimeout(() => {
           if (!running) return;
           setIsHonking(false);
           stateRef.current = "idle";
           actionTimerRef.current = setTimeout(scheduleAction, 500);
        }, 3000 + Math.random() * 2000); // Chase for a few seconds
      } else if (roll < 0.5) {
        // Wander
        stateRef.current = "wandering";
        pickTarget();
      } else if (roll < 0.7) {
        // Drop note
        stateRef.current = "dragging_note";
        pickTarget(); // walk somewhere and drop it
      } else {
        // Idle
        stateRef.current = "idle";
        actionTimerRef.current = setTimeout(scheduleAction, 1500 + Math.random() * 2000);
      }
    };

    const gameLoop = () => {
      if (!running) return;
      frameTick++;
      const st = stateRef.current;

      let tx = 0, ty = 0;
      let walking = false;

      if (st === "chasing_cursor") {
          tx = cursorPosRef.current.x - DISPLAY_SIZE/2;
          ty = cursorPosRef.current.y - DISPLAY_SIZE/2;
          speed = 4.5; // AGGRESSIVE GOOSE
          walking = true;
      } else if (st === "wandering" || st === "dragging_note") {
          if (targetRef.current !== "cursor") {
             tx = targetRef.current.x;
             ty = targetRef.current.y;   
          }
          speed = st === "dragging_note" ? 1.0 : 1.5; // Dragging is slower
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
              setIsHonking(true);
              setTimeout(()=> setIsHonking(false), 500);
          }
          if (st !== "chasing_cursor") {
             stateRef.current = "idle";
             actionTimerRef.current = setTimeout(scheduleAction, 1000);
          }
        } else {
          const nx = posRef.current.x + (dx / dist) * speed;
          const ny = posRef.current.y + (dy / dist) * speed;
          posRef.current = { x: nx, y: ny };
          if (Math.abs(dx) > 1) facingRef.current = dx > 0;

          // Muddy footprints while walking fast or dragging
          if ((st === "chasing_cursor" && frameTick % 10 === 0) || (st === "dragging_note" && frameTick % 20 === 0)) {
              leaveFootprint(nx, ny, facingRef.current);
          }
        }
      }

      // Update animation frame
      const FRAME_INTERVAL = speed > 2 ? 4 : 8;
      if (frameTick % FRAME_INTERVAL === 0) {
        frameTickRef.current++;
        let animList = ANIM.idle;
        if (walking) animList = ANIM.walk;
        if (st === "chasing_cursor" || isHonking) animList = ANIM.honk;
        
        setCurrentFrame(animList[frameTickRef.current % animList.length]);
      }

      // Render update
      if (frameTick % 2 === 0) {
        setPos({ ...posRef.current });
        setFacingRight(facingRef.current);
      }

      animRef.current = requestAnimationFrame(gameLoop);
    };

    posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setPos({ ...posRef.current });
    actionTimerRef.current = setTimeout(scheduleAction, 500);
    animRef.current = requestAnimationFrame(gameLoop);

    return () => {
      running = false;
      if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
      cancelAnimationFrame(animRef.current);
    };
  }, [active, pickTarget, dropNote, leaveFootprint, isHonking, clearNoteTimeout]);

  // ── Click on goose → honk ──
  const handleGooseClick = useCallback(() => {
    setIsHonking(true);
    dropNote(posRef.current.x, posRef.current.y, facingRef.current);
    clearNoteTimeout(noteIdRef.current - 1);
    setTimeout(() => setIsHonking(false), 800);
  }, [dropNote, clearNoteTimeout]);

  if (!active) {
    return (
      <button
        onClick={() => setActive(true)}
        className="p-2 sm:p-2.5 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer group hover:scale-110 active:scale-95 origin-center"
        aria-label="Release the Goose"
        title="🪿 Release the Goose"
      >
        <GooseIcon size={18} />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setActive(false);
          setNotes([]);
          setFootprints([]);
          setIsHonking(false);
          if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
          cancelAnimationFrame(animRef.current);
        }}
        className="p-2 sm:p-2.5 rounded-full text-orange-400 hover:text-orange-300 transition-colors cursor-pointer hover:scale-110 active:scale-95 origin-center"
        aria-label="Catch the Goose"
        title="🪿 Catch the Goose"
        style={{ animation: "pulse 2s infinite" }}
      >
        <GooseIcon size={18} />
      </button>

      {/* ── Footprints ── */}
      {footprints.map(fp => (
          <div key={fp.id} className="fixed pointer-events-none opacity-40 z-[9997]" style={{ left: fp.x, top: fp.y, transform: `rotate(${fp.rotation}deg)`}}>
              <span className="text-[#8B4513] text-lg font-bold">🐾</span>
          </div>
      ))}

      {/* ── The Goose ── */}
      <div
        onClick={handleGooseClick}
        className="fixed cursor-pointer select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
        style={{
          left: pos.x,
          top: pos.y,
          width: DISPLAY_SIZE,
          height: DISPLAY_SIZE,
          zIndex: 9999,
          transform: `scaleX(${facingRight ? -1 : 1})`,
          imageRendering: "pixelated",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: "url('/static/images/goose-sprite.png')",
            backgroundSize: `400% auto`,
            backgroundPosition: getFramePos(currentFrame),
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
          }}
        />
        {/* State label for fun */}
        {stateRef.current === "chasing_cursor" && (
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-pixel text-orange-500 text-[12px] font-bold animate-bounce" style={{transform: `scaleX(${facingRight ? -1 : 1}) translateX(-50%)`}}>
               HONK!!
           </div>
        )}
      </div>

      {/* ── Meme Notes ── */}
      {notes.map((note) => (
        <div
          key={note.id}
          className="fixed pointer-events-none select-none z-[9998]"
          style={{
            left: note.x,
            top: note.y,
            transform: `rotate(${note.rotation}deg)`,
            animation: "noteAppear 0.3s ease-out forwards",
          }}
        >
          <div className="relative bg-[#fffef0] text-zinc-900 px-3 py-2.5 rounded-sm shadow-[2px_4px_16px_rgba(0,0,0,0.5)] border border-zinc-300/60 font-mono text-[10px] sm:text-[11px] leading-relaxed whitespace-pre-wrap max-w-[170px]">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-yellow-400/60 shadow-sm rounded-sm transform -rotate-2" />
            {note.text}
          </div>
        </div>
      ))}

      <style>{`
        @keyframes noteAppear {
          0% { opacity: 0; transform: rotate(${0}deg) scale(0.5) translateY(20px); }
          100% { opacity: 1; transform: rotate(var(--r, 0deg)) scale(1) translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </>
  );
}

function GooseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="5" r="3.5" />
      <path d="M3.5 5 L1 4 L3.5 6.5" fill="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="4.2" r="0.8" fill="currentColor" />
      <path d="M9 7.5 Q13 12 11 16" strokeWidth="3" stroke="currentColor" fill="none" />
      <ellipse cx="15" cy="18" rx="7" ry="4.5" fill="none" />
      <path d="M22 17 L24 14" />
      <path d="M11.5 22 L10 24 M9 24 L11 24" strokeWidth="1.5" />
      <path d="M17.5 22 L19 24 M18 24 L20 24" strokeWidth="1.5" />
    </svg>
  );
}
