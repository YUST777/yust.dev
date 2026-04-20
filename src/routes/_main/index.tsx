import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
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
      <Suspense fallback={<div className="h-[600px] w-full bg-white/5 rounded-2xl animate-pulse" />}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-16"
        >
          <AboutSection />
          <GithubContributions />
          <AchievementsSection />
        </motion.div>
      </Suspense>
    </div>
  );
}
