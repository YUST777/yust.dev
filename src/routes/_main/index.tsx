import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import ProfileHeader from "@/components/about/ProfileHeader";

// Lazy-load heavy sections — keeps initial route bundle tiny
const AboutSection = lazy(() => import("@/components/about/AboutSection"));
const GithubContributions = lazy(() => import("@/components/about/GithubContributions"));
const AchievementsSection = lazy(() => import("@/components/about/AchievementsSection"));

export const Route = createFileRoute("/_main/")(  {
  head: () => ({
    meta: [
      { title: "About | Yousef Mohammed Salah" },
      {
        name: "description",
        content:
          "Official portfolio of Yousef Mohammed Salah (Yüst). AI & Cybersecurity student, founder of Verdict.run and ICPC HUE Lead. Discover my mission and notable achievements.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <ProfileHeader />
      <Suspense fallback={null}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<div className="h-[150px]" />}>
        <GithubContributions />
      </Suspense>
      <Suspense fallback={null}>
        <AchievementsSection />
      </Suspense>
    </div>
  );
}
