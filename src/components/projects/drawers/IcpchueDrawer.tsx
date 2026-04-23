import React from "react";

function IcpchueDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          ICPCHUE – The Ultimate Training Ecosystem
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-code-branch mr-2"></i>Lead Architect & Community Founder
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status: <span className="text-blue-400 font-bold">Nationwide Expansion 🇪🇬</span>
        </p>
      </div>

      {/* The Problem */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-exclamation-triangle mr-2"></i>The Problem
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          ICPC training is scattered. If you start, you need YouTube, CodeBlocks/VS Code, various
          extensions, Notepad, messy Excel sheets, and Codeforces. Why maintain all that baggage? I
          built ICPCHUE to gamify the journey and keep you engaged until the end.
        </p>
      </div>

      {/* How it Works */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-magic mr-2"></i>How It Works?
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          You just join the Hub and immediately get the power of{" "}
          <strong className="text-white">Verdict.run</strong> integrated with a central 3D
          curriculum.
        </p>
      </div>

      {/* Capabilities */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-layer-group mr-2"></i>What does it provide?
        </h4>
        <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white">650+ Problems:</strong> Curated from Assiut sheets, split
            into <strong className="text-white">Level 0 (205)</strong>,{" "}
            <strong className="text-white">Level 1 (226)</strong>, and{" "}
            <strong className="text-white">Level 2 (170)</strong>.
          </li>
          <li>
            <strong className="text-white">Full Roadmap:</strong> From STL basics to high-end graph
            algorithms.
          </li>
          <li>
            <strong className="text-white">16hr Curriculum:</strong> Video materials from Eng. Ahmed
            Walid integrated into the platform.
          </li>
          <li>
            <strong className="text-white">Gamification:</strong> Leaderboards, 3D achievements, and
            real-time tracking to keep motivation high.
          </li>
        </ul>
      </div>

      {/* Impact Stats */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-trophy mr-2"></i>What I'm Proud Of
        </h4>
        <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
          <li>
            It's the <strong className="text-white">backbone of the ICPCHUE community</strong> in
            Horus University.
          </li>
          <li>
            Reached <strong className="text-white">120k impressions</strong> on LinkedIn.
          </li>
          <li>
            Presented at the Luxsai conference where{" "}
            <strong className="text-white">21 colleges</strong> liked the idea—it's now being
            adopted all over Egypt.
          </li>
        </ul>
      </div>

      {/* Lessons */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-lightbulb mr-2"></i>What I've Learned
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed mb-4">
          This was my first time building a real login system; I graduated from SQLite (Gifts Chart
          era) to <strong className="text-white">Supabase</strong>. I also leaned heavily into
          high-end UX and elite domain health scores (see{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://icpchue.com/devlog"
            className="text-white underline text-white/80 hover:text-white transition-colors decoration-white/30"
          >
            icpchue.com/devlog
          </a>
          ).
        </p>
      </div>

      {/* The Hardest Part */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-brain mr-2"></i>The Hardest Technical Challenge
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed italic border-l-2 border-white/20 pl-4 py-1">
          "The hardest part was building for the future: making an ecosystem that is actually
          scalable, sustainable, and secure enough to handle nationwide adoption without breaking
          under pressure."
        </p>
      </div>

      {/* Visit Project Buttons */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col gap-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://icpchue.xyz"
            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-white/10"
          >
            <span>Visit ICPCHUE</span>
            <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/YUST777/icpchue"
            className="w-full bg-white/10 text-white hover:bg-white/20 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group border border-white/10"
          >
            <i className="fab fa-github text-xl"></i>
            <span>View Source on GitHub</span>
            <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform opacity-50 text-xs"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default IcpchueDrawer;
