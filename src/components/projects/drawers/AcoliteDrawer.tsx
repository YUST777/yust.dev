import React from "react";

function AcoliteDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          Acolite – High-Velocity Talent Platform UI
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-palette mr-2"></i>Lead Frontend Architect & UI/UX Designer
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status: <span className="text-green-400 font-bold">Shipped Platform Concept</span>
        </p>
      </div>

      {/* The Vision */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-bullseye mr-2"></i>Purpose-Built Talent for High-Velocity Teams
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed font-medium">
          "Let your core team focus on architecture and strategic roadmap, not screening hundreds of
          unvetted resumes. Our verified network handles complex project executions, from full-stack
          systems to high-fidelity UI and LLM pipelines."
        </p>
      </div>

      {/* The Platform Experience */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-layer-group mr-2"></i>Everything Needed to Ship Faster
        </h4>
        <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white font-display">Pre-Vetted Top 1% Specialists:</strong> Curated
            engineers, AI architects, and product designers rigorously tested on real-world delivery
            standards.
          </li>
          <li>
            <strong className="text-white font-display">Instant Matching in 48 Hours:</strong> Direct
            matching flow connecting teams to specialists tailored to their tech stack without recruitment
            overhead.
          </li>
          <li>
            <strong className="text-white font-display">Protected Milestones & Escrow:</strong> Transparent
            project budgeting, milestone release tracking, and a 14-day risk-free onboarding period.
          </li>
          <li>
            <strong className="text-white font-display">Precision Component Design System:</strong> Dark-mode
            tactile UI design system with micro-interactions, responsive composition, and frictionless hiring funnels.
          </li>
        </ul>
      </div>

      {/* How it Works */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-cogs mr-2"></i>From Idea to Delivery in 3 Steps
        </h4>
        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="text-zinc-500 font-mono font-bold">01</span>
            <div>
              <strong className="text-white block font-display text-xs tracking-wider uppercase mb-1">
                Post Your Project
              </strong>
              <p className="text-[12px] sm:text-xs text-gray-400">
                Define roadmap requirements, technical stack constraints, and project budgets in minutes with zero upfront commitment.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-500 font-mono font-bold">02</span>
            <div>
              <strong className="text-white block font-display text-xs tracking-wider uppercase mb-1">
                Get Matched Fast
              </strong>
              <p className="text-[12px] sm:text-xs text-gray-400">
                Review top 1% vetted specialist profiles, portfolio case studies, and interview directly before committing.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-500 font-mono font-bold">03</span>
            <div>
              <strong className="text-white block font-display text-xs tracking-wider uppercase mb-1">
                Collaborate & Ship
              </strong>
              <p className="text-[12px] sm:text-xs text-gray-400">
                Kick off sprints immediately with seamless milestone tracking, contract protection, and scale-as-you-grow flexibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-laptop-code mr-2"></i>Technologies Used
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            "React 19",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "Design Systems",
            "Responsive UI",
            "UI/UX Architecture",
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

      {/* Live CTA */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col gap-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://acolite.xyz"
            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <span>Visit acolite.xyz</span>
            <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default AcoliteDrawer;
