export default function AchievementsSection() {
  return (
    <section>
      <h2 className="mb-6 border-b border-white/5 pb-4 font-pixel text-[clamp(19px,5.5vw,24px)] text-white sm:mb-8 sm:text-3xl">
        Notable achievements
      </h2>
      <div className="space-y-6">
        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="font-mono text-[14px] leading-relaxed text-zinc-400 md:text-[15px] lg:text-[16px]">
            <strong className="text-[16px] font-sans font-bold tracking-tight text-white opacity-90 md:text-[17px] lg:text-[18px]">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://verdict.run"
                className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors"
              >
                Verdict.run
              </a>
              .{" "}
            </strong>
            Engineered and launched a competitive programming platform that went viral, generating{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/posts/yousefmsm1_icpc-softwareengineering-problemsolving-activity-7418662435072622594-OycK"
              className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              120k+ organic impressions
            </a>{" "}
            on LinkedIn from a single early post.
          </p>
        </div>

        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="font-mono text-[14px] leading-relaxed text-zinc-400 md:text-[15px] lg:text-[16px]">
            <strong className="text-[16px] font-sans font-bold tracking-tight text-white opacity-90 md:text-[17px] lg:text-[18px]">
              The01studio on TON.{" "}
            </strong>
            Founded a Web3 studio. Shipped multiple Telegram mini-apps (@giftscharts,
            @collectablekit) driving <span className="text-white">2,000+ daily active users</span>.
          </p>
        </div>

        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="font-mono text-[14px] leading-relaxed text-zinc-400 md:text-[15px] lg:text-[16px]">
            <strong className="text-[16px] font-sans font-bold tracking-tight text-white opacity-90 md:text-[17px] lg:text-[18px]">
              ICPC Egypt Lead.{" "}
            </strong>
            Built and scaled{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://icpchue.com"
              className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              icpchue.com
            </a>
            —a gamified LeetCode-style training platform housing{" "}
            <span className="text-white">650+ curated algorithms</span> to prepare students
            nationwide for the ECPC.
          </p>
        </div>

        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="font-mono text-[14px] leading-relaxed text-zinc-400 md:text-[15px] lg:text-[16px]">
            <strong className="text-[16px] font-sans font-bold tracking-tight text-white opacity-90 md:text-[17px] lg:text-[18px]">
              3x Hackathon Winner.{" "}
            </strong>
            Secured <span className="text-white">70k+ EGP</span> in prize money. Built complex AI
            tools including{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://sast.tech"
              className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              sast.tech
            </a>
            —an automated secure code generator.
          </p>
        </div>

        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="font-mono text-[14px] leading-relaxed text-zinc-400 md:text-[15px] lg:text-[16px]">
            <strong className="text-[16px] font-sans font-bold tracking-tight text-white opacity-90 md:text-[17px] lg:text-[18px]">
              Tanta National Summit.{" "}
            </strong>
            Won <span className="text-white">3rd place</span> in my very first year, outperforming
            senior-level (Level 4 &amp; 5) university competitors.
          </p>
        </div>
      </div>
    </section>
  );
}
