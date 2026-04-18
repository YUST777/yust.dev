import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/experience")({
  head: () => ({
    meta: [{ title: "Experience | Yousef Mohammed Salah" }],
  }),
  component: ExperiencePage,
});

const experience = [
  {
    role: "Founder & Lead Developer",
    company: "verdict.run",
    date: "January 2026 - Present",
    location: "Egypt",
    responsibilities: [
      "Founded a viral Competitive Programming 'Mirror Tool' that transforms the Codeforces UI into a sleek LeetCode-style IDE simply by changing the TLD to '.run'.",
      <>
        Generated{" "}
        <a
          href="https://www.linkedin.com/posts/yousefmsm1_icpc-softwareengineering-problemsolving-activity-7418662435072622594-OycK?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF4UUF8BkaOftBX4nvK7AWZaXUY_x4FtmsU"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-200 underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-400"
        >
          120k+ impressions
        </a>{" "}
        on LinkedIn with the launch video, scaling to 500+ registered users and 100+ Daily Active
        Users (DAU) in early release.
      </>,
      "Engineered an integration suite featuring AI-powered problem solving (MCP), automated video explanations, and a Chrome extension for seamless server-side account rendering.",
      "Self-hosted the entire high-availability infrastructure on OVH using an air-gapped Docker-integrated Code Execution Engine (Judge0).",
      "Drafting and executing plans to scale the platform to serve the entire competitive programming community across Egypt.",
    ],
    tech: ["Next.js", "React", "Docker", "Judge0", "Chrome API", "Linux"],
  },
  {
    role: "Founder & Lead Developer",
    company: "ICPC HUE",
    date: "November 2025 - Present",
    location: "Horus University (Hybrid)",
    responsibilities: [
      "Architected a unified training ecosystem solving the fragmented CP experience by integrating an IDE, 650+ curated problems, and live session-streaming into a single platform.",
      "Implemented a high-engagement gamification layer featuring persistent achievements and real-world rewards (stickers, custom Rank-1 T-shirts) via a global leaderboard.",
      "Engineered a proprietary Online Judge providing millisecond-accurate code grading inside secure Alpine Linux Docker containers.",
      "Successfully scaled to 300+ active Horus University students, generating 15,000+ page views during intensive regional training sessions.",
      "Directly led technical workshops to bridge the gap between academic theory and competitive proficiency.",
    ],
    tech: ["Next.js 16", "Node.js", "PostgreSQL 16", "Docker", "TypeScript"],
  },
];

function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div>
        <h1 className="text-4xl md:text-5xl font-pixel text-white mb-4 uppercase">EXPERIENCE</h1>
        <p className="text-zinc-500 font-mono text-[13px] sm:text-sm max-w-xl">
          Building systems, leading teams, and competing.
        </p>
      </div>

      <div className="flex flex-col gap-16 md:gap-20 mt-8">
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
                  <li
                    key={i}
                    className="text-[13px] sm:text-sm font-mono text-zinc-400 leading-relaxed grid grid-cols-[16px_1fr] gap-1"
                  >
                    <span className="text-zinc-600 select-none">-</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
