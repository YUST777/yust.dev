import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/hacks")({
  component: HacksPage,
});

const hacks = [

  {
    rank: "3RD PLACE",
    color: "text-white hover:text-[#cd7f32] transition-colors duration-300",
    event: "LUXSAI AI HACKTHON • MAR 3, 2026 • LUXOR UNIVERSITY",
    title: "sast.tech (Pentesting/IDE AI Agent)",
    desc: (
      <>
        Achieved a distinguished <strong className="text-zinc-200">3rd place finish</strong> among 67 teams from 17 universities and higher institutes. Officially represented the Faculty of Artificial Intelligence at Horus University, competing with <strong className="text-zinc-200">sast.tech</strong>—an autonomous Pentesting AI Agent.
      </>
    ),
    tech: "Next.js • Playwright • Electron • AI Agents",
    linkText: "Project Waitlist: sast.tech",
    linkUrl: "https://sast.tech",
    proofs: [
      { label: "Ministry of Higher Education Coverage (2:53)", url: "https://www.facebook.com/reel/1254422980142263/?rdid=00XQLwjArSKK7907&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fv%2F18bpjNiiwF%2F#" }
    ]
  },

  {
    rank: "2ND PLACE",
    color: "text-white hover:text-[#9ab8d6] transition-colors duration-300",
    event: "GDG DELTA HACKATHON • FEB 18, 2026 • GOOGLE DEVELOPER GROUPS",
    title: "sast.tech (Pentesting/IDE AI Agent)",
    desc: (
      <>
        Secured <strong className="text-zinc-200">2nd place</strong> out of 122 teams (610 competitors) following an intense 49-hour development sprint. This marked the inception of <strong className="text-zinc-200">sast.tech</strong>, where we co-developed the comprehensive Pentesting AI Agent to secure rapidly generated code using static analysis and Playwright.
      </>
    ),
    tech: "Next.js • Playwright • Electron • AI Agents",
    linkText: "Project Waitlist: sast.tech",
    linkUrl: "https://sast.tech",
    proofs: [
      { label: "GDG DELTA", url: "https://www.facebook.com/share/p/1BGCYoPpDT/" },
      { label: "AI FACULTY HORUS", url: "https://www.facebook.com/share/p/1J1uzVockT/?mibextid=wwXIfr" }
    ]
  },

  {
    rank: "3RD PLACE",
    color: "text-white hover:text-[#cd7f32] transition-colors duration-300",
    event: "SUSTAINABLE INNOVATION NATIONAL SUMMIT • AUGUST 1–28, 2025 • TANTA UNIVERSITY",
    title: "Zero Threat",
    desc: (
      <>
        Won <strong className="text-zinc-200">3RD PLACE</strong> at the Tanta National Summit in my very first year, outperforming senior-level (Level 4 & 5) university competitors from 20+ universities. Built <strong className="text-zinc-200">Zero Threat</strong>, an integrated security ecosystem providing real-time malware protection and OWASP-inspired vulnerability assessment.
      </>
    ),
    tech: "Next.js • React • GSAP • YARA Protocol • Cybersecurity",
    linkText: "",
    linkUrl: "",
    proofs: [
      { label: "Horus University Official Post", url: "https://www.facebook.com/hue.eg/posts/pfbid0y73xcQuLyVuA5DroyFuMLtT51GDCifxroNXo7JJkXPtrqhcGJ6szkB3ugaSqPqr6l?rdid=AwkKSPyjydzamHLK#" },
      { label: "Tanta University Official Post", url: "https://www.facebook.com/TantaUniversity.Official/posts/pfbid0RAC9wx52FyNeyUoS1maGC8PpuNxqhn5FaEwqJzcu7CB6onWBGcreFTrRX1wajZCsl?rdid=zgwCzVlm77LP7m3M#" },
      { label: "Award Ceremony Video (2:13)", url: "https://www.facebook.com/reel/710000655405770" }
    ]
  }
];

function HacksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
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
            <div className="text-[12px] sm:text-[13px] font-mono text-zinc-400 leading-relaxed max-w-3xl">
              {hack.desc}
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-zinc-600 mt-2">
              {hack.tech}
            </div>

            <div className="flex flex-col gap-2 mt-1">
              {hack.linkText && (
                <a href={hack.linkUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-[11px] font-mono text-zinc-300 hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4 self-start">
                  {hack.linkText}
                </a>
              )}
              {hack.proofs && hack.proofs.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-1">
                  {hack.proofs.map((proof, idx) => (
                    <a key={idx} href={proof.url} target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-[11px] font-mono text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5 group">
                      <svg className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      <span className="underline decoration-zinc-800 underline-offset-4">{proof.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
