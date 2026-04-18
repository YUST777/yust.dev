import React from "react";

function SastDrawer() {
  return (
  <>
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
        Sast – AI Autonomous Security
      </h4>
      <p className="text-[12px] sm:text-sm text-gray-400">
        <i className="fas fa-robot mr-2"></i>Lead UI/UX Designer & Web Architect
      </p>
      <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
        Status: <span className="text-yellow-400 font-bold">2x Hackathon Winner 🏆</span>
      </p>
    </div>

    {/* The Problem */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-exclamation-triangle mr-2"></i>The Problem
      </h4>
      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed font-medium">
        "Code is being generated instantly by AI, but security is still stuck in a slow, manual
        process. That gap is where hackers win."
      </p>
    </div>

    {/* How it Works */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-cogs mr-2"></i>How It Works?
      </h4>
      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
        You feed it your repository or source code, and Sast spins up{" "}
        <strong className="text-white underline decoration-white/30">10 autonomous agents</strong>.
        Each one has a specific job—they scan your app fully, identify flaws, and then actually
        patch the code.
      </p>
    </div>

    {/* Capabilities */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-layer-group mr-2"></i>What does it provide?
      </h4>
      <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
        <li>
          <strong className="text-white font-display">Autonomous Security:</strong> An agent that
          fetches your app, detects vulnerabilities, and fixes them—instantly.
        </li>
        <li>
          <strong className="text-white font-display">Built-in IDE:</strong> Review and merge
          patches in a integrated development environment.
        </li>
        <li>
          <strong className="text-white font-display">AI Vulnerability Search:</strong> Deep-level
          security search combined with automated code patching.
        </li>
      </ul>
    </div>

    {/* Wins/Stat */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-trophy mr-2"></i>What I'm Proud Of
      </h4>
      <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
        <li>
          We won <strong className="text-white">2 major hackathons</strong> with this, earning{" "}
          <strong className="text-green-400 font-bold">70,000 EGP</strong> in prizes.
        </li>
        <li>
          I designed and built the entire high-end{" "}
          <a
            href="https://sast.tech"
            className="text-white underline underline-offset-4 decoration-white/30"
          >
            sast.tech
          </a>{" "}
          website solo (my friend built the core app).
        </li>
      </ul>
    </div>

    {/* Business Logic */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-hand-holding-usd mr-2"></i>Business & Sustainability
      </h4>
      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed mb-4">
        The harsh reality I learned is that college projects focus only on tech—but if a project
        can't make $5 to cover its own server, it's just a hobby. My project "Collectable Kit" had
        cool UI and tech, but it failed the money test.
      </p>
      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed italic border-l-2 border-green-500/50 pl-4 py-1">
        "When we joined the GDG Delta Hackathon, our first question wasn't 'Which tech stack?' but
        'How to sell this?'. We priced it at 200 EGP because my friend found a vulnerability in an
        IDE that gave us free API access, making the project profitable from day one."
      </p>
    </div>

    {/* Lessons */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-lightbulb mr-2"></i>What I’ve Learned
      </h4>
      <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
        <li>
          <strong className="text-white">Business Basics:</strong> How to build a product that
          customers actually pay for.
        </li>
        <li>
          <strong className="text-white">Premium Design:</strong> Mastering high-end technical
          website aesthetics.
        </li>
      </ul>
    </div>

    {/* The Hardest Part */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-brain mr-2"></i>The Hardest Technical Challenge
      </h4>
      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed italic border-l-2 border-white/20 pl-4 py-1">
        "The hardest part was making the UI look truly premium and clean while linking everything to
        Supabase. I integrated MCP (Model Context Protocol) to create a 'real' and secure login
        system that felt seamless with the rest of the application's clean design."
      </p>
    </div>

    {/* CTA */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <a
        href="https://sast.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        <span>Visit Sast.tech</span>
        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
      </a>
    </div>
    </>
  );
}

export default SastDrawer;
