import React from "react";

function HellishGolfDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          Hellish Golf – Daily Golf Challenge directly inside Reddit Feed
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-gamepad mr-2"></i>Game Developer & Reddit Devvit Architect
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status:{" "}
          <span className="text-amber-500 font-bold">
            Reddit’s Games with a Hook Hackathon Entry
          </span>
        </p>
      </div>

      {/* The Hook */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-fire mr-2"></i>One hole. Each day. Infinite rage.
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed font-medium">
          A devilishly hard daily golf challenge, played right inside the Reddit feed. Built in 4
          days for Reddit's Games with a Hook Hackathon. Designed to drive daily retention and
          community competition without play-to-earn gimmicks.
        </p>
      </div>

      {/* What it does */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-trophy mr-2"></i>Game Features
        </h4>
        <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white font-display">One Shared Hole Per Day:</strong> Every
            player in the subreddit gets the same map, picked deterministically from the date, so
            the whole community competes on equal footing.
          </li>
          <li>
            <strong className="text-white font-display">2D Physics & Powerups:</strong> Bouncy
            walls, hazards, precise shot control, and an in-game coin shop to buy powerup buffs
            mid-round.
          </li>
          <li>
            <strong className="text-white font-display">Playable Directly in Feed:</strong> The
            Reddit post expands into the full game—no app install, no leaving Reddit.
          </li>
        </ul>
      </div>

      {/* Architecture */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-microchip mr-2"></i>How It Was Built
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            "Phaser.js",
            "Rapier2D Physics",
            "Reddit Devvit CLI",
            "Supabase",
            "TypeScript",
            "AI Pair Programming",
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono bg-zinc-900 border border-white/5 text-zinc-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links & CTA */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-3">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hellishgolf.xyz"
          className="flex-1 bg-white text-black hover:bg-gray-200 font-bold py-3.5 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span>Play Game: hellishgolf.xyz</span>
          <i className="fas fa-external-link-alt"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://devpost.com/software/hellishgolf?ref_content=my-projects-tab&ref_feature=my_projects"
          className="flex-1 bg-zinc-900 text-white border border-white/20 hover:bg-zinc-800 font-bold py-3.5 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Devpost Showcase</span>
          <i className="fas fa-award"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/YUST777/hellishgolf"
          aria-label="View Hellish Golf source code on GitHub"
          className="bg-zinc-900 text-white border border-white/20 hover:bg-zinc-800 font-bold py-3.5 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
    </>
  );
}

export default HellishGolfDrawer;
