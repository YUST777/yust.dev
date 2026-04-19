import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { AppThemeProvider } from "@/components/mode-toggle";
import { QueryProvider } from "@/lib/query/providers";

import { Toaster } from "sonner";
import { Navbar } from "../components/navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import globalsCss from "@/globals.css?url";
import geistMonoCss from "geist/font/mono?url";
import geistSansCss from "geist/font/sans?url";

const SITE_URL = "https://yust.dev";
const SITE_NAME = "Yousef Mohammed Salah (Yüst)";
const SITE_DESCRIPTION =
  "Yousef Mohammed Salah (businessduck/yust777) — AI & Cybersecurity student and Full-Stack Developer. Founder of Verdict.run and ICPC HUE Lead.";
const SITE_TITLE = "Yousef Mohammed Salah | Full-Stack Developer & Security Researcher";
const SITE_SUMMARY =
  "Full-Stack Developer, Level 2 AI & Cybersecurity student, and founder of projects like Verdict.run, ICPC HUE, and GiftsChart.";
const SOCIAL_IMAGE_PATH = "/static/images/metadata.jpg";
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Software Engineer",
      description: SITE_SUMMARY,
      alternateName: ["Yüst", "businessduck", "yust777", "Yousef Mohammed", "Yousef Horus"],
      sameAs: [
        "https://github.com/YUST777",
        "https://www.linkedin.com/in/yousefmsm1/",
        "https://t.me/yousefmsm1",
        "https://verdict.run",
        "https://icpchue.com",
      ],
      image: `${SITE_URL}/static/images/metadata.png`,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_SUMMARY,
      publisher: {
        "@id": PERSON_ID,
      },
    },
  ],
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "yousef mohammed salah, yousef dev, yust, businessduck, yust777, yousef horus, yousef icpchue, yousef verdict, verdict, verdict.run, icpchue, gifts chart, giftschart, software engineer, full stack dev, cybersecurity student, AI student, Horus University",
      },
      { name: "author", content: SITE_NAME },
      { name: "creator", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:image", content: SOCIAL_IMAGE_PATH },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: SITE_TITLE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_SUMMARY },
      { name: "twitter:creator", content: "@yousefmsm1" },
      { name: "twitter:image", content: SOCIAL_IMAGE_PATH },
      { name: "theme-color", content: "#0c0c0c" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "stylesheet", href: globalsCss },
      { rel: "stylesheet", href: geistSansCss },
      { rel: "stylesheet", href: geistMonoCss },
      // katex.min.css moved to token-usage page for on-demand loading
      {
        rel: "preload",
        href: "/fonts/silkscreen-400.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/silkscreen-700.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "icon", href: "/static/images/metadata.png" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Navbar />
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* React Scan — dev-only re-render profiler (https://react-scan.com) */}
        {process.env.NODE_ENV !== "production" && (
          <script
            src="https://unpkg.com/react-scan/dist/auto.global.js"
            async
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased bg-[#0c0c0c] text-zinc-400 font-mono min-h-screen relative">
        {/* Global Noise Grain Overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]">
          <svg className="w-full h-full opacity-20">
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="1"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
        <RootProviders>{children}</RootProviders>
        <Analytics />
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}

function RootProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster richColors />
      <QueryProvider>
        <AppThemeProvider>{children}</AppThemeProvider>
      </QueryProvider>
    </>
  );
}
