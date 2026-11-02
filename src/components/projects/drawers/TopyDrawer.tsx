import React from "react";

function TopyDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          Topy – Video Editor Landing Page
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-palette mr-2"></i>Designer & Frontend Developer
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status: <span className="text-green-400 font-bold">Live</span>
        </p>
      </div>

      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-bullseye mr-2"></i>The Brief
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed font-medium">
          A single-page portfolio and contact page for Topy, a video editor and motion graphics
          artist making reels and ads (17K+ followers on TikTok). The page is in Arabic (RTL) and
          lets clients pick a style, watch the work, and message Topy directly.
        </p>
      </div>

      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-layer-group mr-2"></i>What's on the Page
        </h4>
        <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white font-display">Work Reels:</strong> A grid of reels grouped
            by style: motion and branding, before/after, talking-head, product ads, and explainers.
          </li>
          <li>
            <strong className="text-white font-display">Why Topy:</strong> Three short sections
            showing a voice-only brief turning into a full ad, talking videos turned into shows, and
            product edits that look premium.
          </li>
          <li>
            <strong className="text-white font-display">Direct Contact:</strong> Instagram and
            Telegram links so clients can ask about prices and send their idea.
          </li>
        </ul>
      </div>

      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-laptop-code mr-2"></i>Highlights
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Landing Page", "Arabic / RTL", "Responsive UI", "Motion", "Video Portfolio"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono bg-zinc-900 border border-white/5 text-zinc-300 rounded-full"
              >
                {tech}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col gap-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://topy.yust.dev"
            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <span>Visit topy.yust.dev</span>
            <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default TopyDrawer;
