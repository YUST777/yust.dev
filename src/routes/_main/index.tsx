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
              {/* React */}
              <svg viewBox="-10.5 -9.45 21 18.9" fill="none" className="w-[1.2em] h-[1.2em]">
                <circle cx="0" cy="0" r="2" fill="currentColor"/>
                <g stroke="currentColor" strokeWidth="1" fill="none">
                  <ellipse rx="10" ry="4.5"/>
                  <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
                  <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
                </g>
              </svg>
              {/* Next.js */}
              <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-[1.2em] h-[1.2em]">
                <path d="M11.983 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zM15.485 5.922h2.247v11.956h-2.247V5.922zM7.228 5.922h2.368l8.354 13.064c-.958.828-2.193 1.393-3.535 1.62l-7.187-11.23v8.502H5.006V5.922h2.222z"/>
              </svg>
              {/* PostgreSQL */}
              <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-[1.2em] h-[1.2em]">
                <path d="M21.579 17.653c-1.34-1.328-3.037-1.894-4.888-2.091 1.704-.799 2.858-2.185 3.018-3.791.03-.306-.062-.647-.282-.934-.239-.311-.537-.478-.813-.455-1.928.163-4.135 1.572-5.918 3.04l-.271.222c-1.127.915-2.073 1.674-3.064 2.164-1.282.634-2.736.878-4.321.722-.505-.049-1.026.062-1.429.3-.967.57-1.155 1.954-.42 3.056.401.602 1.096.96 1.83 1.055 2.106.273 4.417-.611 6.545-2.007l1.09-.714 6.883-4.567zm-.17-10.426C20.082 5.8 17.581 4.545 13.921 4.5c-3.166-.039-5.495 1.053-6.505 2.222-1.01 1.166-1.196 2.062-.973 3.693l1.833-2.046c1.173-1.066 3.109-1.687 4.966-1.745 2.502-.078 4.75 1.048 5.757 2.4l2.41-1.797zm-4.484 2.115c-.259-.286-.549-.556-.867-.808-1.442-1.144-3.528-1.642-5.59-1.192-1.067.234-2.04.664-2.775 1.16-.763.513-1.353 1.165-1.794 1.94-.482.846-.864 1.889-1.2 3.018-.328 1.104-.6 2.213-.805 3.167-.189.882-.294 1.575-.386 2.022.955.088 1.966-.196 2.923-.746a5.714 5.714 0 0 0 1.258-1c.216-.251.488-.636.757-1.02l.608-.864c.23-.326.47-.665.688-.937a3.027 3.027 0 0 1 .494-.528l.128-.1c1.554-1.134 3.738-1.503 5.485-.758.31.132.61.27.897.432-.1-.85-.16-1.555-.175-2.062-.03-.996-.282-1.443-.646-1.724z"/>
              </svg>
              {/* Python */}
              <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-[1.2em] h-[1.2em]">
                <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.08.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.14-.18.22-.15.27-.09.32-.03.35.04.38.12.38.2.36.27.32.34.25.39.18.43.1.45.03.45-.04.43-.11.39-.19.34-.26.27-.33.19-.38.11-.42.02-.45-.06-.46-.15-.45-.24-.42-.34-.37-.43-.29-.5-.2-.56-.1-.61-.02-.63.07-.63.18-.61.3zM9.75 23.82l-.9-.2-.73-.26-.59-.3-.45-.32-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2.01-.13V15.5l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02h5.26l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21v-3.06h3.17l.21.03.28.07.32.12.35.18.36.26.36.36.35.46.32.59.28.73.21.88.14 1.05.05 1.23-.06 1.22-.16 1.04-.24.87-.32.71-.36.57-.4.44-.42.33-.42.24-.4.16-.36.1-.32.05-.24.01h-.16l-.06-.01H8.08v.83h7.74l.01 2.75.02.37-.05.34-.11.31-.17.28-.25.26-.31.23-.38.2-.44.18-.51.15-.58.12-.64.1-.71.08-.77.04-.84.02-1.27-.05zm6.3-1.98l.23-.14.18-.22.15-.27.09-.32.03-.35-.04-.38-.12-.38-.2-.36-.27-.32-.34-.25-.39-.18-.43-.1-.45-.03-.45.04-.43.11-.39.19-.34.26-.27.33-.19.38-.11.42-.02.45.06.46.15.45.24.42.34.37.43.29.5.2.56.1.61.02.63-.07.63-.18.61-.3z"/>
              </svg>
              {/* Tailwind CSS */}
              <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-[1.2em] h-[1.2em]">
                <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
              </svg>
            </div>
          </div>
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
