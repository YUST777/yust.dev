import { createFileRoute } from "@tanstack/react-router";
import ProfileHeader from "@/components/about/ProfileHeader";
import AboutSection from "@/components/about/AboutSection";
import GithubContributions from "@/components/about/GithubContributions";
import AchievementsSection from "@/components/about/AchievementsSection";
import {
  SITE_URL,
  buildRouteHead,
  jsonLdString,
  webPageSchema,
} from "@/lib/seo";

const TITLE = "yust.dev — Yousef Mohammed Salah · About";
const DESCRIPTION =
  "Portfolio of Yousef Mohammed Salah (yust.dev). AI & Cybersecurity student, founder of Verdict.run, ICPC HUE Lead, 4x hackathon winner.";

const aboutPageSchema = webPageSchema({
  url: SITE_URL,
  name: TITLE,
  description: DESCRIPTION,
  type: "ProfilePage",
  breadcrumbs: [{ name: "Home", url: SITE_URL }],
});

export const Route = createFileRoute("/_main/")({
  head: () => {
    const base = buildRouteHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/",
      type: "profile",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLdString(aboutPageSchema),
        },
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <ProfileHeader />
      <AboutSection />
      <GithubContributions />
      <AchievementsSection />
    </div>
  );
}
