import type { ReactNode } from "react";

type Outcome = {
  title: string;
  tag: string;
  href?: string;
  description: ReactNode;
};

const OUTCOMES: Outcome[] = [
  {
    title: "Verdict.run",
    tag: "Product Launch",
    href: "https://verdict.run",
    description: (
      <>
        Engineered a competitive programming platform; drove{" "}
        <a
          href="https://www.linkedin.com/posts/yousefmsm1_icpc-softwareengineering-problemsolving-activity-7418662435072622594-OycK"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-200 transition-colors hover:text-white hover:underline hover:decoration-zinc-500 hover:underline-offset-4"
        >
          120k+ impressions
        </a>{" "}
        on LinkedIn from a single launch post.
      </>
    ),
  },
  {
    title: "Telegram Bots & Mini-Apps",
    tag: "2,000+ DAU",
    description: (
      <>
        Shipped bots and mini-apps including{" "}
        <span className="text-zinc-300">@giftscharts</span> and{" "}
        <span className="text-zinc-300">@collectablekit</span>, scaling to{" "}
        <span className="font-medium text-white">2,000+ daily active users</span>.
      </>
    ),
  },
  {
    title: "ICPC HUE",
    tag: "Community & Platform",
    href: "https://www.facebook.com/icpchue",
    description: (
      <>
        Co-founded the community and built{" "}
        <a
          href="https://icpchue.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-200 transition-colors hover:text-white hover:underline hover:decoration-zinc-500 hover:underline-offset-4"
        >
          icpchue.com
        </a>
        —curating 650+ problems that trained 8 teams for ECPC.
      </>
    ),
  },
  {
    title: "National Hackathons",
    tag: "3 Podium Finishes",
    description: (
      <>
        Won <span className="font-medium text-white">70k+ EGP</span> in prizes across GDG Delta (2nd) and LUXSAI (3rd), building AI/security tools like{" "}
        <a
          href="https://sast.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-200 transition-colors hover:text-white hover:underline hover:decoration-zinc-500 hover:underline-offset-4"
        >
          sast.tech
        </a>
        .
      </>
    ),
  },
];

export default function AchievementsSection() {
  return (
    <section>
      <h2 className="mb-6 border-b border-white/5 pb-4 font-pixel text-[clamp(19px,5.5vw,24px)] text-white sm:mb-8 sm:text-3xl">
        Selected outcomes
      </h2>

      <div className="space-y-6">
        {OUTCOMES.map((item) => (
          <div
            key={item.title}
            className="group relative border-l border-zinc-800 py-1 pl-4 transition-colors duration-200 hover:border-zinc-500"
          >
            <div className="mb-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1 font-sans text-[15px] font-semibold text-zinc-100 transition-colors hover:text-white md:text-[16px]"
                >
                  <span>{item.title}</span>
                  <svg
                    className="h-3.5 w-3.5 text-zinc-500 transition-transform duration-150 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-zinc-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </a>
              ) : (
                <span className="font-sans text-[15px] font-semibold text-zinc-100 md:text-[16px]">
                  {item.title}
                </span>
              )}
              <span className="select-none text-xs text-zinc-600">/</span>
              <span className="rounded border border-white/5 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                {item.tag}
              </span>
            </div>

            <p className="font-mono text-[13px] leading-relaxed text-zinc-400 md:text-[14px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
