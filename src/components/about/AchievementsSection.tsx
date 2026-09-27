export default function AchievementsSection() {
  return (
    <section>
      <h2 className="mb-6 border-b border-white/5 pb-4 font-pixel text-[clamp(19px,5.5vw,24px)] text-white sm:mb-8 sm:text-3xl">
        Selected outcomes
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
                Verdict.run — Product Launch
              </a>
              .{" "}
            </strong>
            Built and launched a competitive programming platform that generated{" "}
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
              The01Studio — Web3 Products.{" "}
            </strong>
            Founded a TON-focused studio and shipped Telegram mini-apps including @giftscharts and
            @collectablekit, reaching <span className="text-white">2,000+ daily active users</span>.
          </p>
        </div>

        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="font-mono text-[14px] leading-relaxed text-zinc-400 md:text-[15px] lg:text-[16px]">
            <strong className="text-[16px] font-sans font-bold tracking-tight text-white opacity-90 md:text-[17px] lg:text-[18px]">
              ICPC HUE — Community Builder.{" "}
            </strong>
            Co-founded the ICPC HUE community and built{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://icpchue.com"
              className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              icpchue.com
            </a>
            —a training platform with <span className="text-white">650+ curated problems</span> that
            helped prepare <span className="text-white">8 teams</span> for the ECPC.
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/photo?fbid=122151688275113129"
              className="mt-2 block w-fit text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              View ICPC HUE on Facebook
            </a>
          </p>
        </div>

        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="font-mono text-[14px] leading-relaxed text-zinc-400 md:text-[15px] lg:text-[16px]">
            <strong className="text-[16px] font-sans font-bold tracking-tight text-white opacity-90 md:text-[17px] lg:text-[18px]">
              Hackathons — 3 Podium Finishes.{" "}
            </strong>
            Earned <span className="text-white">70k+ EGP</span> in prizes, including a 2nd-place
            finish at GDG Delta and 3rd place at LUXSAI. Built AI and security products such as{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://sast.tech"
              className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              sast.tech
            </a>
            —an AI-assisted secure code generator.
          </p>
        </div>
      </div>
    </section>
  );
}
