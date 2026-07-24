import { createFileRoute } from "@tanstack/react-router";
import Projects from "../../components/projects/Projects";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE_URL, buildRouteHead, jsonLdString, projectsCollectionSchema } from "@/lib/seo";

const TITLE = "Yousef's Projects | AI, Security & Full-Stack Builds";
const DESCRIPTION =
  "Explore Yousef Mohammed Salah's full-stack, AI security, Web3, and competitive programming projects, including Verdict.run and Sast.tech.";

const projectsSchema = projectsCollectionSchema([
  {
    name: "Verdict.run",
    url: "https://verdict.run",
    description:
      "Codeforces mirror with built-in IDE, whiteboard, and submission pipeline. 120k+ LinkedIn impressions.",
  },
  {
    name: "10K Runner",
    url: "https://10krunner.fun",
    description:
      "infinite runner game that makes you EARN & fun. Developed in 3 days, won 3rd place at the 10k Squad international contest.",
  },
  {
    name: "Sast.tech",
    url: "https://sast.tech",
    description:
      "Autonomous AI security agent that fetches, scans, patches, and verifies vulnerabilities. 2x hackathon winner.",
  },
  {
    name: "SWRMZ",
    url: "https://swrmz.tech",
    description:
      "A swarm of cooperative AI security agents built on Band.ai for the Lablab.ai hackathon, automating security patching and log guarding.",
  },
  {
    name: "ICPC HUE",
    url: "https://icpchue.xyz",
    description:
      "Gamified competitive programming training platform with 650+ curated algorithm problems serving the Egyptian ICPC community.",
  },
  {
    name: "Gifts Charts",
    url: "https://t.me/giftsChartBot",
    description:
      "Real-time Telegram sticker and gift price tracking bot with premium subscriptions.",
  },
  {
    name: "Zero Threat",
    url: "https://zerothreat.yousefdev.xyz/",
    description:
      "AI-powered cybersecurity suite with web platform, browser extension, and Windows agent. 3rd Place at Tanta National Summit.",
  },
  {
    name: "Sketchz",
    url: "https://sketchz.yousefdev.xyz/",
    description:
      "A 3D game on Ethereum where players walk into a museum, mint blank canvases, paint on them in real-time, and sell them directly off the gallery walls.",
  },
  {
    name: "Collectable Kit",
    url: "https://t.me/CollectibleKITbot",
    description:
      "Telegram Mini App for collectors: portfolio tracking, design tools, and play-to-earn games on TON.",
  },
]);

export const Route = createFileRoute("/_main/projects")({
  head: () => {
    const base = buildRouteHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/projects",
      image: `${SITE_URL}/static/images/og-projects.png?v=2`,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLdString(projectsSchema),
        },
      ],
    };
  },
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="bg-transparent text-white pt-0 sm:pt-[45px]">
      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-6 sm:pt-12">
        <Breadcrumbs
          items={[
            { name: "Home", url: SITE_URL },
            { name: "Projects", url: `${SITE_URL}/projects` },
          ]}
        />
      </div>
      <section id="projects" className="bg-dark px-4 pb-20 pt-10 md:px-6 md:pb-32 md:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-6 px-0 md:mb-12 md:flex-row md:items-end md:justify-between md:px-4">
            <div className="max-w-2xl">
              <h1 className="mb-3 font-pixel text-4xl uppercase text-white">PROJECTS</h1>
              <p className="font-mono text-[13px] text-zinc-400 sm:text-sm">
                Tools, platforms, and experiments by Yousef Mohammed Salah — from Verdict.run and
                Sast.tech to ICPC HUE and Telegram mini-apps on TON.
              </p>
            </div>
            <a
              href="https://github.com/YUST777"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-2 self-end rounded-full border border-white/20 px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-white/10 md:flex"
            >
              <i className="fab fa-github text-lg" aria-hidden="true" />
              View GitHub
            </a>
          </div>

          <Projects />
        </div>
      </section>
    </div>
  );
}
