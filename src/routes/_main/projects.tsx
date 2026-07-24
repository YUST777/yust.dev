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
      "infinite runner game that makes you EARN & fun. Developed in 3 days with Web3 earning mechanics and 3D browser environment optimizations.",
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
    <div className="bg-transparent text-white pt-8 sm:pt-32">
      <section id="projects" className="bg-dark px-4 pb-20 pt-4 md:px-6 md:pb-32 md:pt-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 px-0">
            <h1 className="font-pixel text-4xl uppercase text-white">PROJECTS</h1>
          </div>

          <Projects />
        </div>
      </section>
    </div>
  );
}
