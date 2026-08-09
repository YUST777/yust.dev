import React from "react";

function Runner10kDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          10K Runner – Infinite 3D Runner Web3 Game
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-trophy text-amber-500 mr-2"></i>3rd Place Winner • 10k Squad
          International Contest
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status: <span className="text-green-400 font-bold">Live</span>
        </p>
      </div>

      {/* About */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-gamepad mr-2"></i>About the Game
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed mb-4">
          I vibecoded this game in <strong>3 days</strong> :) built specifically for the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/the10kSquad"
            className="text-white underline underline-offset-4 decoration-white/30 hover:text-zinc-300"
          >
            @the10kSquad
          </a>{" "}
          contest.
        </p>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed italic border-l-2 border-orange-500 pl-3">
          "https://10krunner.fun is live now! It's an infinite runner game that makes you EARN &
          fun. Play &gt; Collect coins &gt; Earn."
        </p>
      </div>

      {/* Highlights */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-medal mr-2"></i>Why this is a Milestone
        </h4>
        <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white">First International Competition:</strong> My very first
            time competing on a global stage, going head-to-head with international developers.
          </li>
          <li>
            <strong className="text-white">First Web3 Game:</strong> Stepped out of my comfort zone
            to integrate Web3 mechanisms (Play-to-Earn logic, coin collection and distributed
            earning dynamics).
          </li>
          <li>
            <strong className="text-white">Built in 3 Days Solo:</strong> Handled the entire
            development process including frontend layout, game physics, logic, 3D world creation,
            and UI.
          </li>
        </ul>
      </div>

      {/* Lessons Learned */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-lightbulb mr-2"></i>What I've Learned
        </h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {["3D Modeling", "Three.js", "React Three Fiber", "Web3 Mechanics", "Game Physics"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white border border-white/20 uppercase tracking-widest"
              >
                {tech}
              </span>
            ),
          )}
        </div>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          Through this intense sprint, I mastered custom <strong>3D modeling</strong> pipelines for
          browsers and how to optimize complex three-dimensional scenes using{" "}
          <strong>Three.js / React Three Fiber</strong> to maintain 60 FPS on both mobile and
          desktop devices.
        </p>
      </div>

      {/* Proof & Live Links */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-check-circle mr-2"></i>Verification & Official Announcements
        </h4>
        <div className="space-y-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://discord.com/channels/1282268775709802568/1333487119749877902/1510664741339533472"
            className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-white/10 transition-all group"
          >
            <span className="text-zinc-300 font-sans text-sm group-hover:text-white transition-colors flex items-center gap-2">
              <i className="fab fa-discord text-indigo-400 text-lg"></i>
              Discord Announcement in Live Stream
            </span>
            <i className="fas fa-external-link-alt text-zinc-500 group-hover:text-zinc-300 transition-colors"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/the10kSquad/status/2061112653410357321?s=20"
            className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-white/10 transition-all group"
          >
            <span className="text-zinc-300 font-sans text-sm group-hover:text-white transition-colors flex items-center gap-2">
              <i className="fab fa-x-twitter text-white text-lg"></i>
              10k Squad Official X Announcement
            </span>
            <i className="fas fa-external-link-alt text-zinc-500 group-hover:text-zinc-300 transition-colors"></i>
          </a>
        </div>
      </div>

      {/* Game Link */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col gap-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://10krunner.fun"
            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Play 10K Runner Live</span>
            <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default Runner10kDrawer;
