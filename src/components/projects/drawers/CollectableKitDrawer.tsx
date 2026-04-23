import React from "react";

function CollectableKitDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          Collectable Kit – The Ultimate Gifts Ecosystem
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-code-branch mr-2"></i>Lead Product Architect & UI Designer
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status: <span className="text-purple-400 font-bold">Live Telegram Mini App</span>
        </p>
      </div>

      {/* The Problem */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-exclamation-triangle mr-2"></i>The Problem
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          The Telegram gifts community is massive but lacks essential tools. Collectors want to know
          exactly how much their profile is worth, they want fun ways to play with their assets, and
          most importantly, they want to earn while doing it.
        </p>
      </div>

      {/* How it Works */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-magic mr-2"></i>How It Works?
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed font-medium">
          It's an all-in-one Telegram Mini App (TMA). Just join and get instant access to collection
          tracking, design tools, and play-to-earn games.
        </p>
      </div>

      {/* Capabilities */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-layer-group mr-2"></i>What does it provide?
        </h4>
        <ul className="space-y-6 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white font-display block mb-1">
              🎨 Collection & Portfolio Tool
            </strong>
            Track your upgradeable and non-upgradeable gifts, custom collections, and sticker
            portfolios. Real-time prices are fetched directly from Portal, MRKT, and Quantom.
          </li>
          <li>
            <strong className="text-white font-display block mb-1">
              ✂️ Cutter Tool (Photoshop Killer)
            </strong>
            Preparing cool profile stories used to take hours in Photoshop. Now? It's one click.
            Send any photo, add your watermark, and get shareable assets or ZIP files instantly.
          </li>
          <li>
            <strong className="text-white font-display block mb-1">
              🕹 Play-to-Earn Games (Earn TON)
            </strong>
            Turn your gift knowledge into real rewards. Guess gifts from close-ups in the{" "}
            <strong className="text-white">ZOOM Game</strong> or solve the{" "}
            <strong className="text-white">Emoji Game</strong> to earn Credits and TON.
          </li>
          <li>
            <strong className="text-white font-display block mb-1">💎 Premium & Ads</strong>
            Built-in monetization with a Premium Plan (1 TON/Month) for accelerated earnings and ad
            placeholders for community projects (5 TON/week).
          </li>
        </ul>
      </div>

      {/* Lessons */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-lightbulb mr-2"></i>Lessons Learned
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          I mastered the Telegram Mini App SDK and the complexities of TON rewards distributions.
          More importantly, I learned how to build for a niche community by identifying "high
          friction" manual tasks (like Photoshop editing) and automating them.
        </p>
      </div>

      {/* The Hardest Part */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-brain mr-2"></i>The Hardest Technical Challenge
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed italic border-l-2 border-white/20 pl-4 py-1">
          "The 'Sustainability Paradox'. The hardest part wasn't the code; it was making the project
          generate enough revenue through ads and premium plans to pay for its own servers. Turning
          a technical achievement into a self-sustaining ecosystem was a massive reality check in
          product management."
        </p>
      </div>

      {/* CTA */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://t.me/CollectibleKITbot"
          className="w-full bg-[#0088cc] text-white hover:bg-[#0077b5] font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20"
        >
          <i className="fab fa-telegram-plane"></i>
          <span>Launch App on Telegram</span>
          <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform opacity-50"></i>
        </a>
      </div>
    </>
  );
}

export default CollectableKitDrawer;
