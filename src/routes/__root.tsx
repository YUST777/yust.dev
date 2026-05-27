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

import {
  FAVICON,
  KEYWORDS,
  SITE_BRAND,
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_SHORT,
  SITE_NAME,
  SITE_TITLE_LONG,
  SITE_URL,
  SOCIAL_IMAGE,
  TWITTER_HANDLE,
  jsonLdString,
  siteGraph,
} from "@/lib/seo";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE_LONG },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "keywords", content: KEYWORDS },
      { name: "author", content: SITE_NAME },
      { name: "creator", content: SITE_NAME },
      { name: "publisher", content: SITE_NAME },
      { name: "application-name", content: SITE_BRAND },
      { name: "apple-mobile-web-app-title", content: SITE_BRAND },
      { name: "format-detection", content: "telephone=no" },
      { name: "theme-color", content: "#0c0c0c" },
      { name: "color-scheme", content: "dark" },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "googlebot", content: "index, follow" },
      { name: "bingbot", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "profile" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: `${SITE_NAME} (${SITE_BRAND})` },
      { property: "og:title", content: SITE_TITLE_LONG },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:image", content: SOCIAL_IMAGE },
      { property: "og:image:secure_url", content: SOCIAL_IMAGE },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: SITE_TITLE_LONG },
      { property: "profile:first_name", content: "Yousef" },
      { property: "profile:last_name", content: "Mohammed Salah" },
      { property: "profile:username", content: "yust777" },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE_LONG },
      { name: "twitter:description", content: SITE_DESCRIPTION_SHORT },
      { name: "twitter:image", content: SOCIAL_IMAGE },
      { name: "twitter:image:alt", content: SITE_TITLE_LONG },
      { name: "twitter:creator", content: TWITTER_HANDLE },
      { name: "twitter:site", content: TWITTER_HANDLE },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "alternate", type: "application/rss+xml", title: `${SITE_NAME} – Blog`, href: `${SITE_URL}/rss.xml` },
      { rel: "sitemap", type: "application/xml", href: `${SITE_URL}/sitemap.xml` },
      { rel: "stylesheet", href: globalsCss },
      { rel: "stylesheet", href: geistSansCss },
      { rel: "stylesheet", href: geistMonoCss },
      // Speed up known cross-origin connections (analytics, GitHub APIs, fonts).
      { rel: "preconnect", href: "https://va.vercel-scripts.com" },
      { rel: "preconnect", href: "https://api.github.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://github-contributions-api.jogruber.de" },
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
      { rel: "icon", href: FAVICON, type: "image/png" },
      { rel: "apple-touch-icon", href: FAVICON },
      { rel: "shortcut icon", href: FAVICON },
      { rel: "manifest", href: "/site.webmanifest" },
      // Personal-name SEO: explicit social profile links.
      { rel: "me", href: "https://github.com/YUST777" },
      { rel: "me", href: "https://www.linkedin.com/in/yousefmsm1/" },
      { rel: "me", href: "https://x.com/YUST777" },
      { rel: "me", href: "https://t.me/yousefmsm1" },
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
          <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(siteGraph()) }}
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
