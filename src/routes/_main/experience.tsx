import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/experience")({
  component: ExperiencePage,
});

const experience = [
  {
    role: "Founder & Lead Developer",
    company: "verdict.run",
    date: "January 2026 - Present",
    location: "Egypt",
    responsibilities: [
      "Founded a competitive programming platform scaling to 44,000+ developers, generating 88k+ impressions on launch.",
      "Engineered an isolated Code Execution Engine integrating Judge0 within an air-gapped Docker sandbox.",
      "Developed an official Chrome extension ('Verdict Helper') to naturally sync Codeforces data with the unified IDE.",
      "Self-hosted the entire Linux infrastructure, heavily managing Docker networking, Nginx reverse proxies, and CI/CD."
    ],
    tech: ["Next.js", "React", "Docker", "Judge0", "Chrome API", "Linux"]
  },
  {
    role: "Founder & Lead Developer",
    company: "ICPC HUE",
    date: "November 2025 - Present",
    location: "Horus University (Hybrid)",
    responsibilities: [
      "Architected a gamified Competitive Programming training platform scaling to 300+ students and 15,000+ page views.",
      "Engineered a proprietary Online Judge providing real-time code grading inside secure Alpine Linux Docker containers.",
      "Achieved a 1,395ms average computational load time with AES-256 encryption and ML-KEM post-quantum readiness.",
      "Led community training sessions for Horus University students to significantly enhance their competitive edge."
    ],
    tech: ["Next.js 16", "Node.js", "PostgreSQL 16", "Docker", "TypeScript"]
  },
];

function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-32">
      <div>
        <h1 className="text-4xl md:text-5xl font-pixel text-white mb-4 uppercase">EXPERIENCE</h1>
        <p className="text-zinc-500 font-mono text-[13px] sm:text-sm max-w-xl">
          Building systems, leading teams, and competing.
        </p>
      </div>

      <div className="flex flex-col gap-16 md:gap-20 mt-16">
        {experience.map((job, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 group">
            {/* Left Column: Date */}
            <div className="md:col-span-1 pt-1">
              <span className="text-[11px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest">
                {job.date}
              </span>
            </div>
            
            {/* Right Column: Details */}
            <div className="md:col-span-3 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-4">
                <h3 className="text-base sm:text-lg font-sans font-bold text-zinc-100 tracking-tight">
                  {job.role}
                </h3>
                <span className="hidden sm:inline text-zinc-600 font-mono text-sm">/</span>
                <span className="text-[13px] sm:text-sm font-mono text-zinc-400">
                  {job.company}
                </span>
              </div>
              
              <ul className="flex flex-col gap-3 mb-6">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="text-[13px] sm:text-sm font-mono text-zinc-400 leading-relaxed grid grid-cols-[16px_1fr] gap-1">
                    <span className="text-zinc-600 select-none">-</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2.5">
                {job.tech.map(t => (
                  <span key={t} className="text-[10px] sm:text-[11px] font-mono text-zinc-500 tracking-wide uppercase px-2 py-1 rounded bg-zinc-900 border border-zinc-800 transition-colors group-hover:border-zinc-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
