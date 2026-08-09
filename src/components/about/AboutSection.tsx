import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { SiReact, SiNextdotjs, SiSupabase, SiPython, SiTailwindcss } from "react-icons/si";

function TelegramIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
    </svg>
  );
}

function GithubIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.74a1.6 1.6 0 0 0-1.6 1.6c0 .88.71 1.6 1.6 1.6.89 0 1.6-.72 1.6-1.6 0-.89-.71-1.6-1.6-1.6z" />
    </svg>
  );
}

function MailIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

const Tooltip = lazy(() => import("react-tooltip").then((m) => ({ default: m.Tooltip })));

const SOCIAL_LINKS = [
  { icon: <TelegramIcon />, label: "Telegram", url: "https://t.me/yousefmsm1" },
  { icon: <GithubIcon />, label: "Github", url: "https://github.com/YUST777" },
  {
    icon: <LinkedinIcon />,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/yousefmsm1/",
  },
  { icon: <MailIcon />, label: "Email", url: "mailto:yousfmsm@hotmail.com" },
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
            3 national hackathons in Egypt
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
