import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import ProfileHeader from "@/components/about/ProfileHeader";
import AboutSection from "@/components/about/AboutSection";
import AchievementsSection from "@/components/about/AchievementsSection";
import { SITE_URL, buildRouteHead, jsonLdString, webPageSchema } from "@/lib/seo";

const GithubContributions = lazy(() => import("@/components/about/GithubContributions"));

const TITLE = "Yousef Mohammed Salah | AI & Cybersecurity Developer";
const DESCRIPTION =
  "Yousef Mohammed Salah is an AI and cybersecurity student and full-stack developer in Egypt, creator of Verdict.run, Sast.tech, and ICPC HUE.";

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 space-y-10 sm:space-y-16">
      <ProfileHeader />
      <AboutSection />
      <Suspense
        fallback={
          <div className="h-48 w-full rounded-xl bg-zinc-900/50 border border-white/5 animate-pulse" />
        }
      >
        <GithubContributions />
      </Suspense>
      <AchievementsSection />
    </div>
  );
}
