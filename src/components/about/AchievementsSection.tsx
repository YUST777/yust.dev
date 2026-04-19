export default function AchievementsSection() {
  return (
    <section>
      <h2 className="text-3xl font-pixel text-white mb-8 border-b border-white/5 pb-4">
        Notable achievements
      </h2>
      <div className="space-y-6">
        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="text-zinc-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
            <strong className="text-white font-sans text-base sm:text-lg opacity-90 font-bold tracking-tight">
              <a
                href="https://verdict.run"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors"
              >
                Verdict.run
              </a>
              .{" "}
            </strong>
            Engineered and launched a competitive programming platform that went viral, generating{" "}
            <a
              href="https://www.linkedin.com/posts/yousefmsm1_icpc-softwareengineering-problemsolving-activity-7418662435072622594-OycK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              120k+ organic impressions
            </a>{" "}
            on LinkedIn from a single early post.
          </p>
        </div>

        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="text-zinc-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
            <strong className="text-white font-sans text-base sm:text-lg opacity-90 font-bold tracking-tight">
              The01studio on TON.{" "}
            </strong>
            Founded a Web3 studio. Shipped multiple Telegram mini-apps (@giftscharts, @collectablekit) driving{" "}
            <span className="text-white">2,000+ daily active users</span>.
          </p>
        </div>

        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="text-zinc-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
            <strong className="text-white font-sans text-base sm:text-lg opacity-90 font-bold tracking-tight">
              ICPC Egypt Lead.{" "}
            </strong>
            Built and scaled{" "}
            <a
              href="https://icpchue.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              icpchue.com
            </a>
            —a gamified LeetCode-style training platform housing{" "}
            <span className="text-white">650+ curated algorithms</span> to prepare students nationwide
            for the ECPC.
          </p>
        </div>

        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="text-zinc-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
            <strong className="text-white font-sans text-base sm:text-lg opacity-90 font-bold tracking-tight">
              3x Hackathon Winner.{" "}
            </strong>
            Secured <span className="text-white">70k+ EGP</span> in prize money. Built complex AI tools including{" "}
            <a
              href="https://sast.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              sast.tech
            </a>
            —an automated secure code generator.
          </p>
        </div>

        <div className="border-l border-zinc-800 pl-4 py-1">
          <p className="text-zinc-400 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
            <strong className="text-white font-sans text-base sm:text-lg opacity-90 font-bold tracking-tight">
              Tanta National Summit.{" "}
            </strong>
            Won <span className="text-white">1st place</span> in my very first year, outperforming
            senior-level (Level 4 &amp; 5) university competitors.
          </p>
        </div>
      </div>
    </section>
  );
}
