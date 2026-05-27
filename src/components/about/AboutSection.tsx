import { lazy, Suspense } from "react";
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
          I’m known online as <strong className="text-zinc-200">yust.dev</strong> — my real name is{" "}
          <strong className="text-zinc-200">Yousef Mohammed Salah</strong>. AI &amp; Cybersecurity
          student at <strong className="text-zinc-200">Horus University in Egypt</strong> and a
          Full-Stack Product Engineer who builds tools that stay in people&apos;s bookmarks. I
          specialize in bridging the gap between complex technical infrastructure and
          high-quality user experiences.
        </p>
        <p>
          Most recently, I engineered <strong>Verdict.run</strong>, a viral competitive programming
          platform that garnered 120k+ impressions and transformed the workflow for hundreds of
          developers. My work spans from autonomous AI security agents (<strong>Sast.tech</strong>)
          to architecting unified training ecosystems as the Lead Developer for{" "}
          <strong>ICPC HUE</strong>.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-white/5 opacity-80">
          <span className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[11px] sm:text-[12px]">
            CORE STACK :
          </span>
          <div className="flex flex-wrap items-center gap-6 text-zinc-400">
            {CORE_STACK.map(({ Icon, name, hoverClass }) => (
              <span
                key={name}
                tabIndex={0}
                aria-label={name}
                data-tooltip-id="core-stack-tooltip"
                data-tooltip-content={name}
                className={`inline-flex cursor-default outline-none focus-visible:text-white ${hoverClass} transition-colors`}
              >
                <Icon className="w-5 h-5" />
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

      <div className="mt-16">
        <p className="text-zinc-500 text-[13px] mb-6 font-mono uppercase tracking-widest">
          Connect with me
        </p>
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-2.5 px-4 py-3 sm:py-2.5 rounded-lg bg-zinc-900 border border-white/5 hover:border-white/20 hover:bg-zinc-800/50 transition-all text-[13px] sm:text-sm text-zinc-300 font-mono group"
            >
              <span className="text-zinc-500 group-hover:text-white transition-colors">
                {link.icon}
              </span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
