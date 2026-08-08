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

// 1. Extract hackathon data from hacks.tsx dynamically
const hacksContent = readFileSync(join(rootDir, "src/routes/_main/hacks.tsx"), "utf8");
const rankMatches = hacksContent.match(/rank:\s*["']/g);
const count = rankMatches ? rankMatches.length : 4;

// Parse hack entries (rank, event, title)
const hackRegex = /\{\s*rank:\s*["']([^"']+)["'][\s\S]*?event:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["']/g;
const hacks = [];
let m;
while ((m = hackRegex.exec(hacksContent)) !== null) {
  hacks.push({ rank: m[1], event: m[2], title: m[3] });
}

console.log(`[OG Generator - Satori] Detected ${count} hackathon wins`);

function cleanTitle(title) {
  return title.replace(/\s*\(.*?\)/g, "").trim();
}

function shortEvent(event) {
  if (event.includes("SUSTAINABLE")) {
    return "SUSTAINABLE SUMMIT TANTA";
  }
  return event.split("•")[0].trim();
}

function eventDate(event) {
  const parts = event.split("•");
  return parts.length >= 2 ? parts[1].trim() : "";
}

function trophyColor(rank) {
  if (rank.includes("1ST")) return { fill: "#FFD700", label: "1ST", labelColor: "#b8960a" };
  if (rank.includes("2ND")) return { fill: "#C0C0C0", label: "2ND", labelColor: "#808080" };
  return { fill: "#CD7F32", label: "3RD", labelColor: "#8B5A2B" };
}

// Load TrueType fonts
const fontSilkscreen = readFileSync(join(rootDir, "public/fonts/silkscreen-700.ttf"));
const fontGeistMono = readFileSync(
  join(rootDir, "node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf")
);

// Pixel trophy SVG element builder — clean single vector path
function PixelTrophy({ color, size = 28 }) {
  const h = Math.round((size / 7) * 8);
  return React.createElement(
    "svg",
    {
      width: size,
      height: h,
      viewBox: "0 0 7 8",
      style: { backgroundColor: "transparent" },
    },
    React.createElement("path", {
      d: "M1 0h5v1H1z M0 1h7v2H0z M1 3h5v1H1z M2 4h3v1H2z M3 5h1v1H3z M2 6h3v1H2z M1 7h5v1H1z",
      fill: color,
    })
  );
}

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
          padding: "44px 52px 0 52px",
          gap: "52px",
        },
      },
      // Left Column (Hero Number)
      React.createElement(
        "div",
        {
          style: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "20px",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              position: "relative",
              width: "280px",
              height: "230px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          // Corner Brackets
          React.createElement("div", {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "28px",
              height: "28px",
              borderTop: "3px solid #52525b",
              borderLeft: "3px solid #52525b",
            },
          }),
          React.createElement("div", {
            style: {
              position: "absolute",
              top: 0,
              right: 0,
              width: "28px",
              height: "28px",
              borderTop: "3px solid #52525b",
              borderRight: "3px solid #52525b",
            },
          }),
          React.createElement("div", {
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "28px",
              height: "28px",
              borderBottom: "3px solid #52525b",
              borderLeft: "3px solid #52525b",
            },
          }),
          React.createElement("div", {
            style: {
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "28px",
              height: "28px",
              borderBottom: "3px solid #52525b",
              borderRight: "3px solid #52525b",
            },
          }),
          React.createElement(
            "div",
            {
              style: {
                fontSize: "140px",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1,
                textAlign: "center",
              },
            },
            String(count)
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              fontFamily: "Silkscreen",
              fontSize: "28px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginTop: "28px",
              textAlign: "center",
            },
          },
          "Hackathons Won"
        ),
        React.createElement(
          "div",
          {
            style: {
              fontFamily: "Silkscreen",
              fontSize: "11px",
              fontWeight: 700,
              color: "#3f3f46",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: "12px",
              textAlign: "center",
            },
          },
          "And Counting"
        )
      ),
      // Right Column (Competitions List)
      React.createElement(
        "div",
        {
          style: {
            width: "400px",
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
              gap: "10px",
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
              backgroundColor: "#a1a1aa",
            },
          }),
          "COMPETITIONS"
        ),
        ...hacks.slice(0, 4).map((hack, i) => {
          const t = trophyColor(hack.rank);
          return React.createElement(
            "div",
            {
              key: i,
              style: {
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "16px 18px",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  paddingTop: "2px",
                },
              },
              React.createElement(PixelTrophy, { color: t.fill, size: 28 }),
              React.createElement(
                "div",
                {
                  style: {
                    fontFamily: "Silkscreen",
                    fontSize: "8px",
                    fontWeight: 700,
                    color: t.labelColor,
                    letterSpacing: "0.08em",
                  },
                },
                t.label
              )
            ),
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: "13.5px",
                    fontWeight: 700,
                    color: "#e4e4e7",
                    lineHeight: 1.35,
                  },
                },
                cleanTitle(hack.title)
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontFamily: "Silkscreen",
                    fontSize: "9px",
                    color: "#52525b",
                    letterSpacing: "0.04em",
                  },
                },
                shortEvent(hack.event)
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontFamily: "Silkscreen",
                    fontSize: "9px",
                    color: "#3f3f46",
                    letterSpacing: "0.06em",
                  },
                },
                eventDate(hack.event)
              )
            )
          );
        })
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
      React.createElement("span", null, "Competitions. Builds. Wins."),
      React.createElement("span", null, "/hacks")
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

const pngTarget = join(rootDir, "public/static/images/og-hacks.png");
const webpTarget = join(rootDir, "public/static/images/og-hacks.webp");
const svgTarget = join(rootDir, "public/static/images/og-hacks.svg");

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

console.log(`[OG Generator - Satori] Successfully generated TRUE Satori SVG og-hacks.svg + 2K PNG & WebP!`);
