import { createFileRoute } from "@tanstack/react-router";
import { Star, Undo2 } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import React, { useState, useEffect } from "react";
import { SiReact, SiNextdotjs, SiSupabase, SiPython, SiTailwindcss } from "react-icons/si";
import { RiTelegramFill, RiGithubFill, RiLinkedinBoxFill, RiMailFill } from "react-icons/ri";

export const Route = createFileRoute("/_main/")({
  component: AboutPage,
});

function AboutPage() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/YUST777/repos?per_page=100")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const totalStars = data.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
          setStars(totalStars);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header>
        <p className="font-mono text-zinc-500 mb-2">Hi I'm 👋</p>
        <h1 className="text-4xl md:text-5xl font-pixel text-white mb-4">YOUSEF</h1>
        <p className="text-sm md:text-base text-zinc-400 max-w-2xl uppercase tracking-wider font-mono">
          Level 2 AI & Cybersecurity student and Full-Stack Developer
        </p>

        <div className="flex items-center gap-3 mt-8">
          <a href="#" className="flex items-center px-4 py-2 rounded-md bg-zinc-900 border border-white/5 hover:border-white/20 hover:bg-zinc-800 transition-all text-sm text-zinc-300 font-mono tracking-tight">
            Verdict.run
          </a>

          <div className="relative -ml-1 flex items-center mt-2">
            <svg
              className="pointer-events-none size-8 shrink-0 rotate-[190deg] text-zinc-500 opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 323.057 323.057"
              xmlSpace="preserve"
              fill="currentColor"
            >
              <path d="M281.442 256.312c-47.124 59.364-139.536 44.676-160.956-29.376-1.224-3.672-1.836-7.956-2.448-11.628 49.572-11.016 97.92-47.124 102.204-90.576 3.672-39.168-36.108-50.796-62.424-28.764-31.212 26.316-53.244 64.872-55.08 105.875-31.824 4.284-63.036-4.284-80.172-35.496-28.764-52.631 9.792-123.624 61.2-144.432 5.508-1.836 3.06-10.404-2.448-8.568C10.326 33.544-26.394 132.688 21.954 191.439c18.972 22.645 49.572 29.988 81.396 26.316 4.284 41.616 36.72 74.664 75.275 87.516 44.676 14.688 85.68-6.731 111.996-41.616 4.285-5.508-4.896-12.239-9.179-7.343M144.354 132.688c9.792-13.464 22.644-28.764 39.168-34.272 15.911-5.508 21.42 16.524 22.031 26.316.612 12.24-7.956 23.256-15.912 31.824-16.523 18.971-44.063 35.496-72.215 42.839 1.836-23.868 13.464-47.123 26.928-66.707" />
              <path d="M315.713 233.668c-17.136 0-34.884 1.224-51.408 5.508-6.731 1.836-3.672 11.016 3.061 9.792 13.464-2.448 27.54-1.836 41.004-1.224-.612 7.955-1.224 16.523-2.448 24.479-1.224 6.12-5.508 15.3-1.836 21.42 1.836 3.061 4.896 3.061 7.956 1.836 7.344-3.06 7.344-15.912 8.568-22.644 1.836-11.017 2.447-21.42 2.447-32.437 0-3.67-3.672-6.73-7.344-6.73" />
            </svg>
            <span className="ml-2 -rotate-[8deg] whitespace-nowrap text-[12px] font-mono text-zinc-500 opacity-80 sm:text-sm">
              try this cool <br /> project
            </span>
          </div>
        </div>
      </header>

      <section>
        <h2 className="text-3xl font-pixel text-white mb-8 border-b border-white/5 pb-4">About Me</h2>
        <div className="space-y-4 text-zinc-400 leading-relaxed font-mono text-sm sm:text-base md:text-lg">
          <p>
            I'm Yousef, a Level 2 AI & Cybersecurity student based in Egypt and a passionate Full-Stack Developer.
            Since June 2024, I've been building real projects to sharpen my skills — from an award-winning security suite to Telegram bots and full-stack platforms.
          </p>
          <p>
            I love learning by doing, and I'm always exploring new technologies to solve interesting problems.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-white/5 opacity-80">
            <span className="text-zinc-500 font-bold uppercase tracking-widest text-[12px] sm:text-[13px]">CORE STACK :</span>
            <div className="flex items-center gap-5 text-zinc-400">
              <SiReact className="w-[1.25em] h-[1.25em]" />
              <SiNextdotjs className="w-[1.25em] h-[1.25em]" />
              <SiSupabase className="w-[1.25em] h-[1.25em]" />
              <SiTailwindcss className="w-[1.25em] h-[1.25em]" />
              <SiPython className="w-[1.25em] h-[1.25em]" />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-zinc-500 text-sm mb-4 font-mono">My <strong className="text-white">social links</strong> if you wish to connect with me</p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <RiTelegramFill size={16} />, label: "Telegram", url: "https://t.me/yousefmsm1" },
              { icon: <RiGithubFill size={16} />, label: "Github", url: "https://github.com/YUST777" },
              { icon: <RiLinkedinBoxFill size={16} />, label: "LinkedIn", url: "https://www.linkedin.com/in/yousefmsm1/" },
              { icon: <RiMailFill size={16} />, label: "Email", url: "mailto:yousefmsm1@gmail.com" }
            ].map((link) => (
              <a key={link.label} href={link.url || "#"} className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-900 border border-white/5 hover:border-white/20 transition-all text-sm text-zinc-300 font-mono">
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="font-mono mt-16 pb-4 [&_*::-webkit-scrollbar]:hidden [&_*]:[-ms-overflow-style:none] [&_*]:[scrollbar-width:none]">
        <div className="w-full overflow-x-auto">
          <GitHubCalendar
            username="YUST777"
            colorScheme="dark"
            theme={{
              dark: ['#18181b', '#27272a', '#3f3f46', '#52525b', '#71717a']
            }}
            style={{
              color: '#71717a',
              minWidth: '750px',
              margin: '0 auto'
            }}
            blockSize={11}
            blockMargin={3}
            fontSize={12}
            labels={{
              totalCount: `{{count}} contributions in the last year • Total accumulated repository stars: ${stars !== null ? stars : '...'}`
            }}
            renderBlock={(block, activity) =>
              React.cloneElement(block as React.ReactElement, {
                'data-tooltip-id': 'github-tooltip',
                'data-tooltip-html': `<div class="text-xs text-center"><div class="font-bold text-white mb-0.5">${activity.date}</div><div class="text-zinc-400">${activity.count} contributions</div></div>`,
              })
            }
          />
        </div>
        <Tooltip id="github-tooltip" className="!bg-zinc-900 !border !border-white/10 !rounded-md" />
      </section>

      <section>
        <h2 className="text-3xl font-pixel text-white mb-8 border-b border-white/5 pb-4">Notable achievements</h2>
        <div className="space-y-6">
          <div className="border-l border-zinc-800 pl-4 py-1">
            <p className="text-zinc-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
              <strong className="text-white font-sans text-base sm:text-lg opacity-90 font-bold tracking-tight">
                <a href="https://verdict.run" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors">Verdict.run</a>.{" "}
              </strong>
              Engineered and launched a developer platform that went viral, generating <span className="text-white">120k+ organic impressions</span> on LinkedIn from a single early post.
            </p>
          </div>

          <div className="border-l border-zinc-800 pl-4 py-1">
            <p className="text-zinc-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
              <strong className="text-white font-sans text-base sm:text-lg opacity-90 font-bold tracking-tight">The01studio on TON. </strong>
              Founded a Web3 studio. Shipped multiple Telegram mini-apps (@giftscharts, @collectablekit) driving <span className="text-white">2,000+ daily active users</span>.
            </p>
          </div>

          <div className="border-l border-zinc-800 pl-4 py-1">
            <p className="text-zinc-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
              <strong className="text-white font-sans text-base sm:text-lg opacity-90 font-bold tracking-tight">ICPC Egypt Lead. </strong>
              Built and scaled <a href="https://icpchue.com" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors">icpchue.com</a>—a gamified LeetCode-style training platform housing <span className="text-white">650+ curated algorithms</span> to prepare students nationwide for the ECPC.
            </p>
          </div>

          <div className="border-l border-zinc-800 pl-4 py-1">
            <p className="text-zinc-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
              <strong className="text-white font-sans text-base sm:text-lg opacity-90 font-bold tracking-tight">3x Hackathon Winner. </strong>
              Secured <span className="text-white">70k+ EGP</span> in prize money. Built complex AI tools including <a href="https://sast.tech" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors">sast.tech</a>—an automated secure code generator.
            </p>
          </div>

          <div className="border-l border-zinc-800 pl-4 py-1">
            <p className="text-zinc-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
              <strong className="text-white font-sans text-base sm:text-lg opacity-90 font-bold tracking-tight">Tanta National Summit. </strong>
              Won <span className="text-white">1st place</span> in my very first semester, outperforming senior-level (Level 4 & 5) university competitors.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
