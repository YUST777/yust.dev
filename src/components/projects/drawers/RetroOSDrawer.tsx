import React from "react";

function RetroOSDrawer() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          RetroOS – Interactive Web Simulation
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-terminal mr-2"></i>Nostalgic Browser Experience
        </p>
      </div>

      {/* Overview */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-info-circle mr-2"></i>The Project
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          RetroOS is a creative exploration of early computing aesthetics. It simulates a fully
          functional, browser-based operating system with a focus on user interaction, terminal
          emulation, and classic UI patterns.
        </p>
      </div>

      {/* Key Features */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-list mr-2"></i>Key Features
        </h4>
        <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white">Terminal Emulation:</strong> A robust CLI interface
            supporting various commands and real-time output.
          </li>
          <li>
            <strong className="text-white">Window Management:</strong> Draggable and resizable
            windows that mimic old-school desktop environments.
          </li>
          <li>
            <strong className="text-white">Easter Eggs:</strong> Hidden commands and interactions
            that reward curious users.
          </li>
        </ul>
      </div>

      {/* Visit Button */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://retro.yousefdev.xyz/"
          className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <span>Boot RetroOS</span>
          <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </>
  );
}

export default RetroOSDrawer;
