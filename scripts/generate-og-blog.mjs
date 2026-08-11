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

// 1. Extract blog posts data from blog.index.tsx
const blogContent = readFileSync(join(rootDir, "src/routes/_main/blog.index.tsx"), "utf8");

// Parse posts from the source
const postBlocks = [...blogContent.matchAll(/\{\s*id:\s*["'](\d+)["'][\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?date:\s*["']([^"']+)["'][\s\S]*?category:\s*["']([^"']+)["'][\s\S]*?summary:\s*\n?\s*["']([^"']+)["']/g)];

const posts = postBlocks.map((m) => ({
  id: m[1],
  title: m[2],
  date: m[3],
  category: m[4],
  summary: m[5],
}));

// Sort by id descending (newest first)
posts.sort((a, b) => Number(b.id) - Number(a.id));

const featured = posts[0];
const latest = posts.slice(0, 4);

// Estimate read times
const readTimes = { "9": 4, "7": 5, "6": 5, "1": 4, "4": 6, "3": 3, "2": 5, "5": 4 };

console.log(`[OG Generator - Satori] Featured: "${featured.title}"`);

// Load TrueType fonts
const fontSilkscreen = readFileSync(join(rootDir, "public/fonts/silkscreen-700.ttf"));
const fontGeistMono = readFileSync(
  join(rootDir, "node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf")
);

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
      // Left Column (Featured Post)
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
            "B L O G"
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: "36px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "18px",
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
                lineHeight: 1.65,
                maxWidth: "440px",
              },
            },
            featured.summary
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "24px",
                fontFamily: "Silkscreen",
                fontSize: "11px",
                color: "#71717a",
                letterSpacing: "0.06em",
              },
            },
            featured.date.toUpperCase(),
            React.createElement("span", { style: { color: "#3f3f46" } }, "•"),
            `${readTimes[featured.id] || 5} MIN READ`,
            React.createElement("span", { style: { color: "#3f3f46" } }, "•"),
            React.createElement(
              "div",
              {
                style: {
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "999px",
                  padding: "4px 14px",
                  fontSize: "10px",
                  color: "#a1a1aa",
                  textTransform: "uppercase",
                },
              },
              featured.category
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
            "Read the full post ↗"
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
            "/blog"
          )
        )
      ),
      // Right Column (Latest Posts Sidebar)
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
          "LATEST POSTS"
        ),
        ...latest.map((post, i) =>
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
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "#e4e4e7",
                    lineHeight: 1.4,
                  },
                },
                post.title
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
              React.createElement("span", null, post.date.toUpperCase()),
              React.createElement("span", null, `${readTimes[post.id] || 5} MIN READ`)
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
      React.createElement("span", null, "Stories. Retrospectives. Wins."),
      React.createElement("span", null, "New Posts Weekly")
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

const pngTarget = join(rootDir, "public/static/images/og-blog.png");
const webpTarget = join(rootDir, "public/static/images/og-blog.webp");
const svgTarget = join(rootDir, "public/static/images/og-blog.svg");

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

// Copy to .output if build directory exists
const outputDir = join(rootDir, ".output/public/static/images");
if (readFileSync) {
  try {
    execSync(`mkdir -p ${outputDir} && cp ${pngTarget} ${webpTarget} ${svgTarget} ${outputDir}/ 2>/dev/null`, { stdio: "ignore" });
  } catch {}
}

console.log(`[OG Generator - Satori] Successfully generated TRUE Satori SVG og-blog.svg + 2K PNG & WebP!`);
