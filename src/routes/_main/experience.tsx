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
  {
    role: "2nd Place Winner (Lead Developer)",
    company: "GDG Delta Hackathon",
    date: "February 2026",
    location: "Egypt",
    responsibilities: [
      "Outperformed 122 teams (610 competitors) during an intense 49-hour development sprint.",
      "Co-developed 'sast.tech', an autonomous Pentesting AI Agent that analyzes GitHub repositories and live URLs.",
      "Spearheaded UI/UX design, Next.js frontend engineering, and deployed the entire architecture to Google Cloud.",
      "Integrated Playwright for automated dynamic browser-based vulnerability testing."
    ],
    tech: ["Next.js", "AI/LLM", "Playwright", "Google Cloud", "DevOps"]
  },
  {
    role: "3rd Place Winner (Web & UI/UX Lead)",
    company: "Sustainable Innovation Summit",
    date: "August 1, 2025 - August 28, 2025",
    location: "Tanta University",
    responsibilities: [
      "Competed as a university freshman against Level 4 & 5 Engineering seniors from 20 national universities.",
      "Developed 'Zero Threat', an AI-powered security ecosystem officially commended by the Dean of Computer Science.",
      "Built a high-performance web dashboard featuring a Universal File Scanner and an OWASP-inspired vulnerability assessor.",
      "Collaborated on a Windows YARA-protocol agent achieving a 90% malware detection rate."
    ],
    tech: ["Next.js", "React", "Cybersecurity", "YARA Protocol"]
  }
];

function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-pixel text-white mb-6">EXPERIENCE</h1>
        <p className="text-zinc-500 font-mono text-sm max-w-xl leading-relaxed">
          My professional and academic journey tracing the evolution of my skills.
        </p>
      </div>

      <div className="relative ml-2 md:ml-4 pb-8">
        {/* Animated Dashed Timeline Line */}
        <div className="absolute top-3 bottom-0 left-[-1px] w-[1px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.2)_50%,transparent_50%)] bg-[length:1px_8px]" />
        
        <div className="space-y-16">
          {experience.map((job, idx) => (
            <div key={idx} className="relative pl-10 md:pl-16 group">
              {/* Timeline Dot with Glow */}
              <div className="absolute w-4 h-4 rounded-full -left-[8.5px] top-1.5 flex items-center justify-center">
                 <div className="w-full h-full bg-zinc-900 border-2 border-zinc-600 rounded-full group-hover:border-white transition-colors duration-500 z-10" />
                 <div className="absolute w-8 h-8 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-mono tracking-tight group-hover:text-zinc-200 transition-colors leading-snug">{job.role}</h3>
                <div className="text-xs tracking-widest uppercase text-zinc-500 font-mono mt-2 md:mt-0">
                  {job.date}
                </div>
              </div>
              
              <div className="text-sm font-mono mb-6 flex items-center gap-3">
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-zinc-300">
                  {job.company}
                </div>
                <span className="text-zinc-700">•</span>
                <span className="text-zinc-500">{job.location}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="text-sm font-mono text-zinc-400 flex items-start gap-3 leading-relaxed group/item hover:text-zinc-300 transition-colors">
                    <span className="text-zinc-700 mt-1 group-hover/item:text-white transition-colors">›</span> {r}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-2.5">
                {job.tech.map(t => (
                  <span key={t} className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider text-zinc-400 bg-black/40 border border-white/5 rounded hover:bg-white/10 hover:text-white transition-colors duration-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
