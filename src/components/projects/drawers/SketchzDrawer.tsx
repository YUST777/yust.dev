import React from "react";

function SketchzDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          Sketchz – 3D Gallery on ETH
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-cube mr-2"></i>3D Game & Smart Contract Developer
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status: <span className="text-green-400 font-bold">On-chain Art Platform</span>
        </p>
      </div>

      {/* The Concept */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-paint-brush mr-2"></i>A 3D Museum on ETH
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed font-medium">
          "Step into a 3D museum on Ethereum. Draw your own pieces, watch others create in real-time, and buy or sell art right off the wall."
        </p>
      </div>

      {/* How it Works */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-cogs mr-2"></i>How It Works?
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 mb-4">
          Simple steps to turn your imagination into on-chain art:
        </p>
        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="text-zinc-500 font-mono font-bold">01</span>
            <div>
              <strong className="text-white block font-display text-xs tracking-wider uppercase mb-1">Mint your canvas</strong>
              <p className="text-[12px] sm:text-xs text-gray-400">Mint a blank canvas on-chain. It is yours completely.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-500 font-mono font-bold">02</span>
            <div>
              <strong className="text-white block font-display text-xs tracking-wider uppercase mb-1">Draw in 3D game</strong>
              <p className="text-[12px] sm:text-xs text-gray-400">Step into the gallery and draw in real-time within the interactive museum.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-500 font-mono font-bold">03</span>
            <div>
              <strong className="text-white block font-display text-xs tracking-wider uppercase mb-1">Own forever</strong>
              <p className="text-[12px] sm:text-xs text-gray-400">Finalize your art and seal it on-chain to trade, collect, or showcase.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rarity */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-gem mr-2"></i>Frame Rarity
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 mb-4">
          Each frame is a limited edition. Trade, collect, and display:
        </p>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-zinc-950/50 border border-white/5 rounded-xl">
            <span className="text-zinc-400 font-bold block text-xs uppercase tracking-wider">Common</span>
            <span className="text-[10px] text-zinc-600 font-mono">Common Frame</span>
          </div>
          <div className="p-3 bg-zinc-950/50 border border-white/5 rounded-xl">
            <span className="text-blue-400 font-bold block text-xs uppercase tracking-wider">Rare</span>
            <span className="text-[10px] text-zinc-600 font-mono">Rare Frame</span>
          </div>
          <div className="p-3 bg-zinc-950/50 border border-white/5 rounded-xl">
            <span className="text-purple-400 font-bold block text-xs uppercase tracking-wider">Epic</span>
            <span className="text-[10px] text-zinc-600 font-mono">Epic Frame</span>
          </div>
          <div className="p-3 bg-zinc-950/50 border border-white/5 rounded-xl">
            <span className="text-amber-500 font-bold block text-xs uppercase tracking-wider">Legendary</span>
            <span className="text-[10px] text-zinc-600 font-mono">Legendary Frame</span>
          </div>
        </div>
      </div>

      {/* WL Chance */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-3">
          <i className="fas fa-ticket-alt mr-2"></i>WL Access
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          Step into the gallery, mint a canvas, and get a chance to be added to the exclusive Sketchz Allowlist (WL).
        </p>
      </div>

      {/* Technologies */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-microchip mr-2"></i>Technologies Used
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Three.js", "WebGL", "Ethereum Smart Contracts", "Next.js", "Solidity"].map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs font-mono bg-zinc-900 border border-white/5 text-zinc-300 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default SketchzDrawer;
