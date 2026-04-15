import { createFileRoute } from "@tanstack/react-router";
import { Github, Send, Linkedin, Mail, Star, Undo2 } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import React, { useState, useEffect } from "react";

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
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header>
        <p className="font-mono text-zinc-500 mb-2">Hola I'm</p>
        <h1 className="text-4xl md:text-5xl font-pixel text-white mb-4">YOUSEF</h1>
        <p className="text-sm md:text-base text-zinc-400 max-w-2xl uppercase tracking-wider font-mono">
          Level 2 AI & Cybersecurity student and Full-Stack Developer
        </p>
        
        <div className="flex items-center gap-3 mt-8">
          <a href="#" className="flex items-center px-4 py-2 rounded-md bg-zinc-900 border border-white/5 hover:border-white/20 hover:bg-zinc-800 transition-all text-sm text-zinc-300 font-mono tracking-tight">
            Verdict.run
          </a>
          
          <div className="flex items-center gap-2 text-zinc-500 pointer-events-none select-none ml-2">
            <Undo2 size={36} strokeWidth={1} className="opacity-60 text-zinc-500 transform rotate-12 relative top-2" />
            <div className="font-mono text-[11px] sm:text-xs tracking-tight opacity-70 transform -rotate-3 mt-4 leading-tight">
              try this cool<br/>project
            </div>
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
        </div>

        <div className="mt-12">
          <p className="text-zinc-500 text-sm mb-4 font-mono">My <strong className="text-white">social links</strong> if you wish to connect with me</p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <Send size={14} />, label: "Telegram", url: "https://t.me/yousefmsm1" },
              { icon: <Github size={14} />, label: "Github", url: "https://github.com/YUST777" },
              { icon: <Linkedin size={14} />, label: "LinkedIn", url: "https://www.linkedin.com/in/yousefmsm1/" },
              { icon: <Mail size={14} />, label: "Email", url: "mailto:yousefmsm1@gmail.com" }
            ].map((link) => (
              <a key={link.label} href={link.url || "#"} className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-900 border border-white/5 hover:border-white/20 transition-all text-sm text-zinc-300 font-mono">
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="font-mono mt-16 pb-4 [&_*::-webkit-scrollbar]:hidden [&_*]:[-ms-overflow-style:none] [&_*]:[scrollbar-width:none]">
        {/* Mobile: compact version */}
        <div className="sm:hidden text-center py-6">
          <a href="https://github.com/YUST777" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-900 border border-white/5 hover:border-white/20 transition-all text-sm text-zinc-300 font-mono">
            <Github size={14} /> {stars !== null ? `${stars} ★` : '...'} • View GitHub Contributions
          </a>
        </div>
        {/* Desktop: full calendar */}
        <div className="hidden sm:block w-full overflow-x-auto overflow-y-visible">
          <div className="w-fit mx-auto px-4 pt-4">
            <GitHubCalendar 
              username="YUST777" 
              colorScheme="dark"
              theme={{
                dark: ['#222222', '#333333', '#555555', '#777777', '#aaaaaa']
              }}
              style={{
                color: '#71717a',
                margin: '0 auto'
              }}
              blockSize={10}
              blockMargin={2}
              fontSize={12}
              labels={{
                totalCount: `{{count}} contributions in the last year • Total accumulated repository stars: ${stars !== null ? stars : '...'}`
              }}
              transformData={(contributions) => {
                const padData = [...contributions];
                if (padData.length === 0) return padData;
                const lastDateStr = padData[padData.length - 1].date;
                const lastDate = new Date(lastDateStr);
                // Pad 3 months ahead so current month label is never clipped
                const endDate = new Date(lastDate.getFullYear(), lastDate.getMonth() + 3, 0);
                
                let curr = new Date(lastDate);
                curr.setDate(curr.getDate() + 1);
                
                while (curr <= endDate) {
                  padData.push({
                    date: curr.toISOString().split('T')[0],
                    count: 0,
                    level: 0
                  });
                  curr.setDate(curr.getDate() + 1);
                }
                return padData;
              }}
              renderBlock={(block, activity) =>
                React.cloneElement(block as React.ReactElement, {
                  'data-tooltip-id': 'github-tooltip',
                  'data-tooltip-html': `<div class="text-xs text-center"><div class="font-bold text-white mb-0.5">${activity.date}</div><div class="text-zinc-400">${activity.count} contributions</div></div>`,
                })
              }
            />
          </div>
        </div>
        <Tooltip id="github-tooltip" className="!bg-zinc-900 !border !border-white/10 !rounded-md" />
      </section>

      <section>
        <h2 className="text-3xl font-pixel text-white mb-8 border-b border-white/5 pb-4">Notable achievements</h2>
        <div className="space-y-6">
          <div className="border-l border-zinc-800 pl-4 py-1">
            <p className="text-zinc-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
              <strong className="text-white font-sans text-base sm:text-lg opacity-90 font-bold tracking-tight">Verdict.run. </strong>
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
              Secured <span className="text-white">70k+ EGP</span> in prize money. Built complex AI tools including <span className="text-white">sast.tech</span>—an automated secure code generator.
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
