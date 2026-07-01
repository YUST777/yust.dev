import { createFileRoute } from "@tanstack/react-router";
import Projects from "../../components/projects/Projects";
import {
  buildRouteHead,
  jsonLdString,
  projectsCollectionSchema,
} from "@/lib/seo";

const TITLE = "yust.dev — Projects · Verdict.run, Sast.tech, SWRMZ, ICPC HUE";
const DESCRIPTION =
  "Projects by Yousef Mohammed Salah on yust.dev: Verdict.run, Sast.tech, SWRMZ, 10K Runner, ICPC HUE, Zero Threat, Gifts Charts.";

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
      <Projects />
    </div>
  );
}
