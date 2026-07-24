import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { SiReact, SiNextdotjs, SiSupabase, SiPython, SiTailwindcss } from "react-icons/si";
import { RiTelegramFill, RiGithubFill, RiLinkedinBoxFill, RiMailFill } from "react-icons/ri";

const Tooltip = lazy(() => import("react-tooltip").then((m) => ({ default: m.Tooltip })));

const SOCIAL_LINKS = [
  { icon: <RiTelegramFill size={18} />, label: "Telegram", url: "https://t.me/yousefmsm1" },
  { icon: <RiGithubFill size={18} />, label: "Github", url: "https://github.com/YUST777" },
  {
    icon: <RiLinkedinBoxFill size={18} />,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/yousefmsm1/",
  },
  { icon: <RiMailFill size={18} />, label: "Email", url: "mailto:yousfmsm@hotmail.com" },
];

const CORE_STACK = [
  { Icon: SiReact, name: "React", hoverClass: "hover:text-[#61DAFB]" },
  { Icon: SiNextdotjs, name: "Next.js", hoverClass: "hover:text-white" },
  { Icon: SiSupabase, name: "Supabase", hoverClass: "hover:text-[#3ECF8E]" },
  { Icon: SiTailwindcss, name: "Tailwind CSS", hoverClass: "hover:text-[#06B6D4]" },
  { Icon: SiPython, name: "Python", hoverClass: "hover:text-[#3776AB]" },
] as const;

export default function AboutSection() {
  return (
    <section>
      <h2 className="text-3xl font-pixel text-white mb-8 border-b border-white/5 pb-4">About Me</h2>
      <div className="space-y-4 text-zinc-400 leading-relaxed font-mono text-sm sm:text-base md:text-lg">
        <p>
          I am <strong className="text-zinc-200">Yousef Mohammed Salah</strong>. AI &amp;
          Cybersecurity student at{" "}
          <a
            href="https://horus.edu.eg"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            Horus University in Egypt
          </a>{" "}
          and a Full-Stack dev who builds tools that stay in people&apos;s bookmarks.
        </p>
        <p>
          Most recently, I engineered{" "}
          <a
            href="https://verdict.run"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            Verdict.run
          </a>
          , a viral competitive programming platform that garnered{" "}
          <a
            href="https://www.linkedin.com/posts/yousefmsm1_icpc-softwareengineering-problemsolving-ugcPost-7418661841783943168-kJiu/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF4UUF8BkaOftBX4nvK7AWZaXUY_x4FtmsU"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            120k+ impressions
          </a>{" "}
          and transformed the workflow for hundreds of developers.
        </p>
        <p>
          Alongside building these, I have won{" "}
          <Link
            to="/hacks"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            4 national hackathons in Egypt
          </Link>{" "}
          so far.
        </p>

        <div className="sr-only">
          <Link to="/ai-security-projects">AI security projects</Link>
          <Link to="/competitive-programming-platforms">competitive programming platforms</Link>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-white/5">
          <span className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-[11px] sm:text-[12px]">
            CORE STACK :
          </span>
          <div className="flex flex-wrap items-center gap-6 text-zinc-400">
            {CORE_STACK.map(({ Icon, name, hoverClass }) => (
              <span
                key={name}
                data-tooltip-id="core-stack-tooltip"
                data-tooltip-content={name}
                className={`inline-flex cursor-default ${hoverClass} transition-colors`}
              >
                <Icon aria-hidden="true" focusable="false" className="w-5 h-5" />
                <span className="sr-only">{name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <Tooltip
          id="core-stack-tooltip"
          place="bottom"
          className="!bg-zinc-900 !border !border-white/10 !rounded-md !text-xs !font-mono"
        />
      </Suspense>

      <div className="mt-6 sm:mt-12">
        <p className="text-zinc-400 text-[11px] sm:text-[13px] mb-3 sm:mb-6 font-mono uppercase tracking-widest">
          Connect with me
        </p>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-md sm:rounded-lg bg-zinc-900/70 border border-white/5 hover:border-white/20 hover:bg-zinc-800/50 transition-all text-[11px] sm:text-sm text-zinc-300 font-mono group"
            >
              <span className="text-zinc-400 group-hover:text-white transition-colors">
                {link.icon}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
