import React from "react";

function PanoBlueDrawer() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          PanoBlue – Import/Export Corporate Platform
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          Role: Frontend Developer & UI Designer
        </p>
      </div>

      {/* Overview */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-info-circle mr-2"></i>Overview
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          PanoBlue is an established import/export company that needed to modernize its digital
          presence to compete in the international market. The client required a shift away from
          restrictive WordPress templates to a fully custom, unique web solution.
        </p>
      </div>

      {/* Key Contributions */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-tools mr-2"></i>Key Contributions
        </h4>
        <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white">Custom Architecture:</strong> Migrated the client from a
            generic template to a bespoke codebase, allowing for limitless customization and
            improved performance.
          </li>
          <li>
            <strong className="text-white">Interactive UI:</strong> Implemented advanced animations
            and interactivity to create a premium user experience that reflects the company's market
            standing.
          </li>
          <li>
            <strong className="text-white">Market-Ready:</strong> Delivered a polished,
            production-ready site that currently serves real customers and facilitates actual
            business operations.
          </li>
        </ul>
      </div>

      {/* Visit Project Button */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://panoblue.yousefdev.xyz/"
          className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <span>Visit PanoBlue</span>
          <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </>
  );
}

export default PanoBlueDrawer;
