import React from "react";

function MonTerminalDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          MonTerminal – Monad Onchain Trading & Automation Terminal
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-code mr-2"></i>Full-Stack & Smart Contract Developer
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status:{" "}
          <span className="text-amber-500 font-bold">
            BuildAnything Hackathon Entry (Monad Mainnet)
          </span>
        </p>
      </div>

      {/* The Vision */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-bolt mr-2"></i>Memecoins trade 24/7. People don’t.
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed font-medium">
          MonTerminal is a live trading and automation terminal built for Monad Mainnet. It gives
          traders one place to discover new tokens, inspect real prices and liquidity, trade
          supported pools, bridge assets, monitor their portfolio, and protect positions without
          watching charts all day.
        </p>
      </div>

      {/* Core Order Engine */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-cogs mr-2 font-mono"></i>Non-Custodial Onchain Order Engine
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          The core of MonTerminal is a non-custodial onchain order engine for limit buys, limit
          sells, stop-losses, and take-profit ladders. Orders store the user’s instructions—not
          their funds. Tokens remain in the wallet until an order becomes executable, and execution
          is permissionless. The contracts validate price conditions using TWAP, enforce expiry and
          minimum output, and protect swaps from unacceptable slippage.
        </p>
      </div>

      {/* Key Features */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-layer-group mr-2"></i>Terminal Capabilities
        </h4>
        <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white font-display">Live Market Data & AMM Depth:</strong> Real
            candles, AMM liquidity depth, portfolio analytics, and shareable performance cards.
          </li>
          <li>
            <strong className="text-white font-display">AI-Assisted Order Planning:</strong>{" "}
            Cross-chain routing and intelligent order strategy planning built directly into the UI.
          </li>
          <li>
            <strong className="text-white font-display">Onchain Proof & Transparency:</strong> Real
            APIs and Monad RPC calls rather than mocked responses for total auditability.
          </li>
        </ul>
      </div>

      {/* Technologies */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-microchip mr-2"></i>Technologies Used
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            "Monad RPC",
            "Solidity",
            "TWAP Oracles",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Web3",
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
          href="https://www.monterminal.fun/"
          className="flex-1 bg-white text-black hover:bg-gray-200 font-bold py-3.5 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span>Live Terminal</span>
          <i className="fas fa-external-link-alt"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://buildanything.so/showcase/monterminal-a103"
          className="flex-1 bg-zinc-900 text-white border border-white/20 hover:bg-zinc-800 font-bold py-3.5 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>BuildAnything Showcase</span>
          <i className="fas fa-trophy"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/YUST777/MonTerminal"
          aria-label="View MonTerminal source code on GitHub"
          className="bg-zinc-900 text-white border border-white/20 hover:bg-zinc-800 font-bold py-3.5 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
    </>
  );
}

export default MonTerminalDrawer;
