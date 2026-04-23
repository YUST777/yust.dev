import React from "react";

function GiftsChartsDrawer() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          Gifts Charts – Telegram Analytics Bot
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-robot mr-2"></i>Live Sticker & Gift Price Tracker
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status: <span className="text-green-400 font-bold">Live & Active</span>
        </p>
      </div>

      {/* Overview */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-bullseye mr-2"></i>The Purpose
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          Telegrams digital asset market is moving fast.{" "}
          <strong className="text-white">Gifts Charts</strong> bridges the gap between chaos and
          clarity by providing real-time price tracking for Stickers and unique Gifts. It empowers
          traders and collectors with instant data, helping them make informed decisions on the fly.
        </p>
      </div>

      {/* The Cool Stuff */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-fire mr-2"></i>What Makes It Cool?
        </h4>
        <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
          <li className="flex gap-3">
            <i className="fas fa-bolt text-yellow-400 mt-1"></i>
            <div>
              <strong className="text-white block">Real-Time Market Pulse</strong>
              Connected directly to public APIs, it monitors price fluctuations 24/7. No more
              guessing—users get the exact floor price in both USD and TON instantly.
            </div>
          </li>
          <li className="flex gap-3">
            <i className="fas fa-image text-purple-400 mt-1"></i>
            <div>
              <strong className="text-white block">Auto-Generated Visuals</strong>
              Instead of boring text lists, the bot generates{" "}
              <strong className="text-white">beautiful, shareable price cards</strong> on demand
              using a custom image processing engine. Perfect for sharing in trading groups.
            </div>
          </li>
          <li className="flex gap-3">
            <i className="fas fa-gem text-blue-400 mt-1"></i>
            <div>
              <strong className="text-white block">Built-in Economy</strong>
              Includes a fully functional <strong>Premium Subscription</strong> system. Users can
              pay via Telegram Stars to unlock exclusive signals, "Goodies" tracking, and ad-free
              experiences.
            </div>
          </li>
        </ul>
      </div>

      {/* Technical Highlights */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-code-branch mr-2"></i>Under The Hood
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed mb-3">
          Built for speed and reliability using a microservice architecture:
        </p>
        <div className="flex flex-wrap gap-2">
          {["Python 3.11", "Async Orchestration", "Docker", "PostgreSQL", "Image Processing"].map(
            (tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/10 rounded-md text-[10px] text-white border border-white/10 uppercase tracking-tighter"
              >
                {tech}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col gap-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/giftsChartBot"
            className="w-full bg-[#24A1DE] hover:bg-[#208bbd] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/20"
          >
            <span>Start Bot</span>
            <i className="fab fa-telegram-plane group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/YUST777/Giftschart"
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

export default GiftsChartsDrawer;
