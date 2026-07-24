import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE_URL, buildRouteHead, jsonLdString, webPageSchema } from "@/lib/seo";

const TITLE = "Hackathons & Awards | Yousef Mohammed Salah · yust.dev";
const DESCRIPTION =
  "Hackathon wins and lessons from Yousef Mohammed Salah, including Sast.tech, 10K Runner, Zero Threat, and SWRMZ.";

const hacksPageSchema = webPageSchema({
  url: `${SITE_URL}/hacks`,
  name: TITLE,
  description: DESCRIPTION,
  breadcrumbs: [
    { name: "Home", url: SITE_URL },
    { name: "Hackathons", url: `${SITE_URL}/hacks` },
  ],
});

export const Route = createFileRoute("/_main/hacks")({
  head: () => {
    const base = buildRouteHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/hacks",
      image: `${SITE_URL}/static/images/og-hacks.png`,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLdString(hacksPageSchema),
        },
      ],
    };
  },
  component: HacksPage,
});

const hacks = [
  {
    rank: "3RD PLACE",
    color: "text-white hover:text-[#cd7f32] transition-colors duration-300",
    event: "10K SQUAD INTERNATIONAL HACKATHON • MAY 30, 2026 • 10K SQUAD",
    title: "10K Runner (3D Infinite Runner Web3 Game)",
    desc: (
      <>
        Won <strong className="text-zinc-200">3rd place</strong> in the 10k Squad contest—my very
        first international and Web3 competition. Developed and vibecoded the game in just 3 days,
        implementing distributed earning mechanics and full 3D browser-based environment
        optimizations.
      </>
    ),
    tech: "React • Three.js • React Three Fiber • Web3 • Tailwind CSS",
    linkText: "Play Game: 10krunner.fun",
    linkUrl: "https://10krunner.fun",
    proofs: [
      {
        label: "Discord Announcement in Live Stream",
        url: "https://discord.com/channels/1282268775709802568/1333487119749877902/1510664741339533472",
      },
      {
        label: "10k Squad Official X Announcement",
        url: "https://x.com/the10kSquad/status/2061112653410357321?s=20",
      },
    ],
  },
  {
    rank: "3RD PLACE",
    color: "text-white hover:text-[#cd7f32] transition-colors duration-300",
    event: "LUXSAI AI HACKATHON • MAR 29, 2026 • LUXOR UNIVERSITY",
    title: "sast.tech (Pentesting/IDE AI Agent)",
    desc: (
      <>
        Achieved a distinguished <strong className="text-zinc-200">3rd place finish</strong> among
        67 teams from 17 universities and higher institutes. Officially represented the Faculty of
        Artificial Intelligence at Horus University alongside my colleague{" "}
        <strong className="text-zinc-200">Abdelrahman Mohsen</strong>, competing with{" "}
        <strong className="text-zinc-200">sast.tech</strong>—an autonomous Pentesting AI Agent.
      </>
    ),
    tech: "Next.js • Playwright • Electron • AI Agents",
    linkText: "Project Waitlist: sast.tech",
    linkUrl: "https://sast.tech",
    proofs: [
      {
        label: "Ministry of Higher Education Coverage (2:53)",
        url: "https://www.facebook.com/reel/1254422980142263",
      },
      {
        label: "Luxor University Coverage",
        url: "https://www.facebook.com/share/v/1Ht4qPyxje/",
      },
      {
        label: "International Luxor University Feature",
        url: "https://www.facebook.com/share/v/1CTtFDqLih/",
      },
    ],
  },

  {
    rank: "2ND PLACE",
    color: "text-white hover:text-[#9ab8d6] transition-colors duration-300",
    event: "GDG DELTA HACKATHON • FEB 18, 2026 • GOOGLE DEVELOPER GROUPS",
    title: "sast.tech (Pentesting/IDE AI Agent)",
    desc: (
      <>
        Secured <strong className="text-zinc-200">2nd place</strong> out of 122 teams (610
        competitors) following an intense 49-hour development sprint. This marked the inception of{" "}
        <strong className="text-zinc-200">sast.tech</strong>, where we co-developed the
        comprehensive Pentesting AI Agent to secure rapidly generated code using static analysis and
        Playwright.
      </>
    ),
    tech: "Next.js • Playwright • Electron • AI Agents",
    linkText: "Project Waitlist: sast.tech",
    linkUrl: "https://sast.tech",
    proofs: [
      { label: "GDG DELTA", url: "https://www.facebook.com/share/p/1BGCYoPpDT/" },
      {
        label: "AI FACULTY HORUS",
        url: "https://www.facebook.com/share/p/1J1uzVockT/?mibextid=wwXIfr",
      },
    ],
  },

  {
    rank: "3RD PLACE",
    color: "text-white hover:text-[#cd7f32] transition-colors duration-300",
    event: "SUSTAINABLE INNOVATION NATIONAL SUMMIT • AUGUST 1–28, 2025 • TANTA UNIVERSITY",
    title: "Zero Threat",
    desc: (
      <>
        Won <strong className="text-zinc-200">3rd place</strong> at the Tanta National Summit in my
        very first year, outperforming senior-level (Level 4 & 5) university competitors from 20+
        universities. Built <strong className="text-zinc-200">Zero Threat</strong>, an integrated
        security ecosystem providing real-time malware protection and OWASP-inspired vulnerability
        assessment.
      </>
    ),
    tech: "Next.js • React • GSAP • YARA Protocol • Cybersecurity",
    linkText: "",
    linkUrl: "",
    proofs: [
      {
        label: "Horus University Official Post",
        url: "https://www.facebook.com/hue.eg/posts/pfbid0y73xcQuLyVuA5DroyFuMLtT51GDCifxroNXo7JJkXPtrqhcGJ6szkB3ugaSqPqr6l?rdid=AwkKSPyjydzamHLK#",
      },
      {
        label: "Tanta University Official Post",
        url: "https://www.facebook.com/TantaUniversity.Official/posts/pfbid0RAC9wx52FyNeyUoS1maGC8PpuNxqhn5FaEwqJzcu7CB6onWBGcreFTrRX1wajZCsl?rdid=zgwCzVlm77LP7m3M#",
      },
      {
        label: "Award Ceremony Video (2:13)",
        url: "https://www.facebook.com/reel/710000655405770",
      },
    ],
  },
];

const failedHacks = [
  {
    status: "MISSED SUBMISSION BY 2 MINUTES",
    color: "text-zinc-400 hover:text-amber-500/80 transition-colors duration-300",
    event: "LABLAB X BAND.AI HACKATHON • JUNE 19, 2026 • BAND.AI",
    title: "SWRMZ (swrmz.tech)",
    desc: (
      <>
        SWRMZ is a swarm of AI security agents, built on Band.ai, that hunt vulnerabilities across
        your stack, remediate them automatically, generate audit-ready reports, and stand guard over
        your logs around the clock. Missed the submission window by exactly 2 minutes. The code was
        beautiful, but the clock won.
      </>
    ),
    tech: "Band.ai • AI Agents • Cybersecurity • Next.js",
    linkText: "Visit Project: swrmz.tech",
    linkUrl: "https://swrmz.tech",
    proofs: [
      {
        label: "Lablab.ai Hackathon Page",
        url: "https://lablab.ai/ai-hackathons/band-of-agents-hackathon",
      },
    ],
  },
];

function HacksPage() {
  const [showFailed, setShowFailed] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Breadcrumbs
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Hackathons", url: `${SITE_URL}/hacks` },
        ]}
      />
      <div>
        <h1 className="text-4xl font-pixel text-white mb-4 uppercase">
          HACKATHONS WON ( {hacks.length} )
        </h1>
        <p className="text-zinc-400 font-mono text-[13px] sm:text-sm">
          Competitions, bounties, and builds under pressure.
        </p>
      </div>

      <div className="space-y-16">
        {hacks.map((hack, i) => (
          <div key={i} className="flex flex-col gap-3">
            <h2 className={`text-2xl sm:text-3xl font-pixel ${hack.color}`}>{hack.rank}</h2>
            <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
              {hack.event}
            </div>
            <h3 className="text-[15px] sm:text-[17px] font-sans font-bold text-white tracking-tight mt-1">
              {hack.title}
            </h3>
            <div className="text-[12px] sm:text-[13px] font-mono text-zinc-400 leading-relaxed max-w-3xl">
              {hack.desc}
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 mt-2">
              {hack.tech}
            </div>

            <div className="flex flex-col gap-2 mt-1">
              {hack.linkText && (
                <a
                  href={hack.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] font-mono text-zinc-300 hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4 self-start"
                >
                  {hack.linkText}
                </a>
              )}
              {hack.proofs && hack.proofs.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-1">
                  {hack.proofs.map((proof, idx) => (
                    <a
                      key={idx}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={proof.url}
                      className="text-[10px] sm:text-[11px] font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <svg
                        className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span className="underline decoration-zinc-800 underline-offset-4">
                        {proof.label}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <p
          onClick={() => setShowFailed(!showFailed)}
          className="text-zinc-400 text-[11px] font-mono uppercase tracking-[0.2em] hover:text-zinc-300 cursor-pointer transition-colors inline-block"
        >
          [ {showFailed ? "Hide Failed Attempts" : "Failed Hacks"} ]
        </p>
      </div>

      {showFailed && (
        <div className="space-y-16 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {failedHacks.map((hack, i) => (
            <div key={i} className="flex flex-col gap-3">
              <h2 className={`text-2xl sm:text-3xl font-pixel ${hack.color}`}>{hack.status}</h2>
              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                {hack.event}
              </div>
              <h3 className="text-[15px] sm:text-[17px] font-sans font-bold text-white tracking-tight mt-1">
                {hack.title}
              </h3>
              <div className="text-[12px] sm:text-[13px] font-mono text-zinc-400 leading-relaxed max-w-3xl">
                {hack.desc}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 mt-2">
                {hack.tech}
              </div>

              <div className="flex flex-col gap-2 mt-1">
                {hack.linkText && (
                  <a
                    href={hack.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-[11px] font-mono text-zinc-300 hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4 self-start"
                  >
                    {hack.linkText}
                  </a>
                )}
                {hack.proofs && hack.proofs.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-1">
                    {hack.proofs.map((proof, idx) => (
                      <a
                        key={idx}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={proof.url}
                        className="text-[10px] sm:text-[11px] font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                      >
                        <svg
                          className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span className="underline decoration-zinc-800 underline-offset-4">
                          {proof.label}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
