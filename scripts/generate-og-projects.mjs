import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import React from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Load TrueType fonts
const fontSilkscreen = readFileSync(join(rootDir, "public/fonts/silkscreen-700.ttf"));
const fontGeistMono = readFileSync(
  join(
    rootDir,
    "node_modules/.pnpm/geist@1.7.0_next@16.2.9_@babel+core@7.29.0_babel-plugin-react-compiler@1.0.0_react-dom@_ecfbda6c36d7ae78bcfb95798de1846f/node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf"
  )
);

// Featured projects list
const featuredProjects = [
  {
    title: "Verdict.run",
    tag: "COMPETITIVE PROGRAMMING",
    desc: "The Ultimate Competitive Programming Platform with built-in IDE, Whiteboard & Custom Judge.",
    site: "verdict.run",
    tech: ["Next.js 15", "TypeScript", "Monaco IDE", "Excalidraw"],
  },
  {
    title: "Sast.tech",
    tag: "AI SECURITY",
    desc: "Autonomous AI security agent that fetches, scans, patches, and verifies vulnerabilities in real time.",
    site: "sast.tech",
    tech: ["AI / LLMs", "Playwright", "Electron", "Docker"],
  },
  {
    title: "10K Runner",
    tag: "WEB3 GAME",
    desc: "3D infinite runner Web3 game built in 3 days. 3rd place 10K Squad contest winner.",
    site: "10krunner.fun",
    tech: ["React", "Three.js", "R3F", "Web3"],
  },
  {
    title: "Gifts Charts",
    tag: "TELEGRAM AUTOMATION",
    desc: "Real-time Telegram gift & sticker price tracking bot with premium subscription analytics.",
    site: "Telegram Bot",
    tech: ["Python", "Flask", "Docker", "PostgreSQL"],
  },
  {
    title: "ICPC HUE",
    tag: "EDUCATION & CP",
    desc: "Gamified competitive programming platform with 650+ algorithm problems serving Egypt.",
    site: "icpchue.xyz",
    tech: ["Next.js", "Tailwind", "Problem Judge"],
  },
];

const featured = featuredProjects[0];
const sidebarProjects = featuredProjects.slice(0, 4);

console.log(`[OG Generator - Satori] Featured Project: "${featured.title}"`);

// 2. Build Satori Vercel OG Node Tree
const element = React.createElement(
  "div",
  {
    style: {
      width: "1200px",
      height: "630px",
      backgroundColor: "#111110",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "GeistMono",
      color: "#ffffff",
    },
  },
  React.createElement(
    "div",
    {
      style: {
        width: "1140px",
        height: "570px",
        border: "1.5px solid rgba(255,255,255,0.06)",
        borderRadius: "24px",
        backgroundColor: "#151514",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      },
    },
    // Main Body
    React.createElement(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          padding: "48px 52px 0 52px",
          gap: "48px",
        },
      },
      // Left Column (Featured Headliner Project)
      React.createElement(
        "div",
        {
          style: {
            flex: 1.15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: "32px",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "Silkscreen",
                fontSize: "15px",
                fontWeight: 700,
                color: "#d4d4d8",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: "24px",
              },
            },
            "P R O J E C T S"
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: "38px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              },
            },
            featured.title
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: "15px",
                color: "#71717a",
                lineHeight: 1.6,
                maxWidth: "450px",
                marginBottom: "22px",
              },
            },
            featured.desc
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              },
            },
            ...featured.tech.map((t) =>
              React.createElement(
                "div",
                {
                  key: t,
                  style: {
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "999px",
                    padding: "4px 12px",
                    fontFamily: "Silkscreen",
                    fontSize: "10px",
                    color: "#a1a1aa",
                    textTransform: "uppercase",
                  },
                },
                t
              )
            )
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "auto",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: "14px",
                fontWeight: 600,
                color: "#d4d4d8",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              },
            },
            "Explore Project ↗"
          ),
          React.createElement(
            "div",
            {
              style: {
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "999px",
                padding: "8px 22px",
                fontSize: "13px",
                color: "#d4d4d8",
              },
            },
            featured.site
          )
        )
      ),
      // Right Column (Sidebar - Featured Builds)
      React.createElement(
        "div",
        {
          style: {
            width: "340px",
            display: "flex",
            flexDirection: "column",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "Silkscreen",
              fontSize: "12px",
              fontWeight: 700,
              color: "#d4d4d8",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "16px",
            },
          },
          React.createElement("div", {
            style: {
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#d4d4d8",
            },
          }),
          "FEATURED BUILDS"
        ),
        ...sidebarProjects.map((p, i) =>
          React.createElement(
            "div",
            {
              key: i,
              style: {
                display: "flex",
                flexDirection: "column",
                padding: "14px 16px",
                backgroundColor: i === 0 ? "rgba(255,255,255,0.04)" : "transparent",
                borderRadius: i === 0 ? "12px" : "0",
                border: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.05)",
                marginBottom: i === 0 ? "4px" : "0",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                },
              },
              i === 0
                ? React.createElement("div", {
                    style: {
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: "#a1a1aa",
                      marginTop: "6px",
                    },
                  })
                : null,
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#e4e4e7",
                    lineHeight: 1.35,
                  },
                },
                p.title
              )
            ),
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "8px",
                  paddingLeft: i === 0 ? "15px" : "0",
                  fontFamily: "Silkscreen",
                  fontSize: "10px",
                  color: "#52525b",
                },
              },
              React.createElement("span", null, p.tag),
              React.createElement("span", null, p.site)
            )
          )
        )
      )
    ),
    // Footer
    React.createElement(
      "div",
      {
        style: {
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "18px 52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "Silkscreen",
          fontSize: "11px",
          color: "#3f3f46",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        },
      },
      React.createElement("span", null, "Software. Security. Systems."),
      React.createElement("span", null, "/projects")
    )
  )
);

// 3. Generate Satori Vector SVG
const svg = await satori(element, {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "Silkscreen",
      data: fontSilkscreen,
      weight: 700,
      style: "normal",
    },
    {
      name: "GeistMono",
      data: fontGeistMono,
      weight: 700,
      style: "normal",
    },
  ],
});

const pngTarget = join(rootDir, "public/static/images/og-projects.png");
const webpTarget = join(rootDir, "public/static/images/og-projects.webp");
const svgTarget = join(rootDir, "public/static/images/og-projects.svg");

// Write true Satori vector SVG!
writeFileSync(svgTarget, svg);

// Render crisp 2400x1260 2K Retina PNG & WebP using Resvg engine
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 2400 },
});
const pngData = resvg.render().asPng();
writeFileSync(pngTarget, pngData);

try {
  execSync(`ffmpeg -y -i ${pngTarget} -c:v libwebp -quality 98 ${webpTarget}`, { stdio: "ignore" });
} catch {
  // webp fallback
}

console.log(`[OG Generator - Satori] Successfully generated TRUE Satori SVG og-projects.svg + 2K PNG & WebP!`);
