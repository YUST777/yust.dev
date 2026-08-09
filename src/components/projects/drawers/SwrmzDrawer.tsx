import React from "react";

function SwrmzDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          SWRMZ – Swarm AI Security
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-robot mr-2"></i>Full-Stack Developer & Agent Architect
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status:{" "}
          <span className="text-amber-500 font-bold">Lablab.ai x Band.ai Hackathon Entry</span>
        </p>
      </div>

      {/* The Concept */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-exclamation-triangle mr-2"></i>The Vision
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed font-medium">
          "As code bases grow and become increasingly complex, manual security scans are no longer
          sufficient. SWRMZ introduces a constant, cooperative defensive presence to hunt
          vulnerabilities in real-time."
        </p>
      </div>

      {/* How it Works */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-cogs mr-2"></i>How It Works?
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          Built on the **Band.ai** agent framework, SWRMZ deploys a cooperative swarm of specialized
          AI security agents that continuously analyze code repositories, identify architectural
          vulnerabilities, auto-generate patches, and stand guard over runtime logs.
        </p>
      </div>

      {/* Capabilities */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-layer-group mr-2"></i>Key Features
        </h4>
        <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white font-display">Swarm Collaboration:</strong> Autonomous
            security agents working together to cross-verify threats and avoid false positives.
          </li>
          <li>
            <strong className="text-white font-display">Automated Remediation:</strong>{" "}
            Automatically writes, tests, and proposes merge-ready fixes for detected bugs.
          </li>
          <li>
            <strong className="text-white font-display">24/7 Log Sentinel:</strong> Continuously
            monitors application logs to flag live security breaches and threats.
          </li>
        </ul>
      </div>

      {/* Technologies */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-microchip mr-2"></i>Technologies Used
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Band.ai", "AI Agents", "Next.js", "TypeScript", "Tailwind CSS", "Cybersecurity"].map(
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

      {/* CTA */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://swrmz.tech"
          className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span>Visit swrmz.tech</span>
          <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </>
  );
}

export default SwrmzDrawer;
