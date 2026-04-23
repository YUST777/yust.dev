import React from "react";

function VerdictDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          Verdict – Competitive Programming Platform
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-code-branch mr-2"></i>Founder & Lead Engineer
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status: <span className="text-green-400 font-bold">Live Beta</span>
        </p>
      </div>

      {/* The Problem */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-exclamation-triangle mr-2"></i>The Problem
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          Codeforces' old UI sucks, so I made{" "}
          <a
            href="https://verdict.run"
            className="text-white underline underline-offset-4 decoration-white/30"
          >
            verdict.run
          </a>
          —a Codeforces mirror tool.
        </p>
      </div>

      {/* How it Works */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-magic mr-2"></i>How It Works?
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          You just change the <code className="bg-white/10 px-1 rounded text-white">.com</code> in{" "}
          <code className="bg-white/10 px-1 rounded text-white">codeforces.com</code> to{" "}
          <code className="bg-white/10 px-1 rounded text-white">verdict.run</code> so it becomes{" "}
          <code className="bg-white/10 px-1 rounded text-white">codeforces.verdict.run</code> on any
          problem page.
        </p>
      </div>

      {/* Capabilities */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-layer-group mr-2"></i>What does it provide?
        </h4>
        <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white">LeetCode UI:</strong> Problem statement on the left, code
            editor on the right.
          </li>
          <li>
            <strong className="text-white">Full Compiler:</strong> Using Judge0 to test your
            solution before submitting to Codeforces.
          </li>
          <li>
            <strong className="text-white">Whiteboard Integrated:</strong> Fully integrated
            whiteboard using Excalidraw for visualizing algorithms.
          </li>
          <li>
            <strong className="text-white">Extension Submissions:</strong> Submit to Codeforces
            using our custom extension supported by scraping.
          </li>
          <li>
            <strong className="text-white">AI Teaching & Video Gen:</strong> Full AI features like
            MCP to teach you the problem + video generation to explain the problem using Remotion.
          </li>
          <li>
            <strong className="text-white">Analytics & History:</strong> Full analytics, history,
            and personal notes for every solve.
          </li>
        </ul>
      </div>

      {/* Results/Stats */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-trophy mr-2"></i>What I'm Proud Of
        </h4>
        <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
          <li>
            It got <strong className="text-white">120k impressions</strong> on LinkedIn.
          </li>
          <li>
            It has <strong className="text-white">500 users</strong> with{" "}
            <strong className="text-white">100 DAU</strong>.
          </li>
          <li>
            I built the entire <strong className="text-white">Backend, Frontend, and DevOps</strong>{" "}
            solo.
          </li>
        </ul>
      </div>

      {/* Lessons */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-lightbulb mr-2"></i>What I've Learned
        </h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Advanced Scraping", "Cloudflare Bypass", "LaTeX", "UX Design"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white border border-white/20 uppercase tracking-widest"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          I mastered advanced scraping and how to bypass Cloudflare Captchas. I also realized how
          critically important UX is for developers.
        </p>
      </div>

      {/* The Hardest Part */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-brain mr-2"></i>The Hardest Technical Challenge
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed italic">
          "Making the Verdict-to-Codeforces submission pipeline was insane. I built an extension
          that captures the user's Codeforces cookie and sends it to our backend. The backend then
          spins up a Server-Side Rendered Chromium engine via Playwright, opens a tab, signs in with
          the stolen cookie, navigates to the problem, chooses the language, submits the code,
          bypasses the captchas with automation, and brings the verdict back to our UI instantly."
        </p>
      </div>

      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col gap-3">
          <a
            href="https://verdict.run"
            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Visit Verdict.run</span>
            <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
          </a>
          <a
            href="https://github.com/YUST777/verdict-community"
            className="w-full bg-white/10 text-white hover:bg-white/20 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group border border-white/10"
          >
            <span>View on GitHub</span>
            <i className="fab fa-github group-hover:scale-110 transition-transform"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default VerdictDrawer;
