import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/hacks")({
  component: HacksPage,
});

const hacks = [
  {
    rank: "2ND PLACE",
    color: "text-white hover:text-[#9ab8d6] transition-colors duration-300",
    event: "GDG DELTA HACKATHON • FEBRUARY 2026 • GOOGLE DEVELOPER GROUPS",
    title: "sast.tech (Pentesting AI Agent)",
    desc: "Secured 2nd place out of 122 teams (610 competitors) following an intense 49-hour development sprint. Co-developed a comprehensive Pentesting AI Agent designed to secure rapidly generated code by performing static analysis and utilizing Playwright for dynamic browser testing. The agent autonomously patches vulnerabilities and provides actionable reports. Acted as Lead UI/UX, Web Dev, and DevOps Engineer.",
    tech: "Next.js • Playwright • Google Cloud • AI Agents",
    linkText: "Project Waitlist: sast.tech",
    linkUrl: "https://sast.tech"
  },
  {
    rank: "3RD PLACE",
    color: "text-white hover:text-[#cd7f32] transition-colors duration-300",
    event: "LUXSAI AI HACKTHON • LUXOR UNIVERSITY",
    title: "Horus University AI Delegation",
    desc: "Achieved a distinguished 3rd place finish among 67 teams from 17 universities and higher institutes. Officially represented the Faculty of Artificial Intelligence at Horus University, architecting and shipping a competitive AI-centric solution under strict hackathon constraints.",
    tech: "Artificial Intelligence • Software Engineering • Data Science",
    linkText: "",
    linkUrl: ""
  },
  {
    rank: "3RD PLACE",
    color: "text-white hover:text-[#cd7f32] transition-colors duration-300",
    event: "SUSTAINABLE INNOVATION NATIONAL SUMMIT • AUGUST 1–28, 2025 • TANTA UNIVERSITY",
    title: "Zero Threat",
    desc: "Secured 3rd Place nationwide, competing as a Freshman against Level 4 & 5 Engineering seniors from 20 universities. Built Zero Threat, an integrated security ecosystem providing real-time protection and vulnerability assessment. Engineered universal file scanners for hidden malware signatures and an OWASP-inspired vulnerability scanner. Officially commended by the Dean of Computer Science.",
    tech: "Next.js • React • GSAP • YARA Protocol • Cybersecurity",
    linkText: "",
    linkUrl: ""
  }
];

function HacksPage() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-4xl pt-8 pb-32">
      <div>
        <h1 className="text-4xl font-pixel text-white mb-4 uppercase">HACKATHONS</h1>
        <p className="text-zinc-500 font-mono text-[13px] sm:text-sm">
          Competitions, bounties, and builds under pressure.
        </p>
      </div>

      <div className="space-y-16">
        {hacks.map((hack, i) => (
          <div key={i} className="flex flex-col gap-3">
            <h2 className={`text-2xl sm:text-3xl font-pixel ${hack.color}`}>
              {hack.rank}
            </h2>
            <div className="text-[10px] sm:text-[11px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
              {hack.event}
            </div>
            <h3 className="text-[15px] sm:text-[17px] font-sans font-bold text-white tracking-tight mt-1">
              {hack.title}
            </h3>
            <p className="text-[12px] sm:text-[13px] font-mono text-zinc-400 leading-relaxed max-w-3xl">
              {hack.desc}
            </p>
            <div className="text-[10px] sm:text-[11px] font-mono text-zinc-600 mt-2">
              {hack.tech}
            </div>
            {hack.linkText && (
              <a href={hack.linkUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-[11px] font-mono text-zinc-500 hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4 mt-1 self-start">
                {hack.linkText}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
