import { createFileRoute } from "@tanstack/react-router";
import Projects from "../../components/projects/Projects";
import {
  buildRouteHead,
  jsonLdString,
  projectsCollectionSchema,
} from "@/lib/seo";

const TITLE = "Projects | Yousef Mohammed Salah — Verdict.run, Sast.tech, ICPC HUE";
const DESCRIPTION =
  "Technical project gallery by Yousef Mohammed Salah: Verdict.run (Codeforces mirror IDE), Sast.tech (autonomous AI security agent), ICPC HUE training platform, Gifts Charts, Zero Threat, Collectable Kit, and more.";

const projectsSchema = projectsCollectionSchema([
  {
    name: "Verdict.run",
    url: "https://verdict.run",
    description:
      "Codeforces mirror with built-in IDE, whiteboard, and submission pipeline. 120k+ LinkedIn impressions.",
  },
  {
    name: "Sast.tech",
    url: "https://sast.tech",
    description:
      "Autonomous AI security agent that fetches, scans, patches, and verifies vulnerabilities. 2x hackathon winner.",
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
      "AI-powered cybersecurity suite with web platform, browser extension, and Windows agent. 1st Place at Tanta National Summit.",
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
