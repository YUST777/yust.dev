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

// 1. Extract certificate data from certificates.tsx dynamically
const certsContent = readFileSync(join(rootDir, "src/routes/_main/certificates.tsx"), "utf8");

// Parse certificate entries (id, issuer, title, issued)
const certRegex = /\{\s*id:\s*["']([^"']+)["'][\s\S]*?issuer:\s*["']([^"']+)["'][\s\S]*?mark:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?issued:\s*["']([^"']+)["']/g;
const certs = [];
let m;
while ((m = certRegex.exec(certsContent)) !== null) {
  certs.push({ id: m[1], issuer: m[2], mark: m[3], title: m[4], issued: m[5] });
}

console.log(`[OG Generator - Certificates] Detected ${certs.length} official certificates`);

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
          padding: "44px 52px 0 52px",
          gap: "52px",
        },
      },
      // Left Column (Hero Header & Cabinet Badge)
      React.createElement(
        "div",
        {
          style: {
            width: "360px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: "36px",
          },
        },
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: "16px" } },
          // Category tag
          React.createElement(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "10px" } },
            React.createElement("div", {
              style: {
                width: "8px",
                height: "8px",
                backgroundColor: "#22c55e",
                borderRadius: "50%",
              },
            }),
            React.createElement(
              "span",
              {
                style: {
                  fontSize: "13px",
                  color: "#a1a1aa",
                  letterSpacing: "0.15em",
                },
              },
              "VERIFIED CREDENTIALS"
            )
          ),
          // Giant Title
          React.createElement(
            "div",
            {
              style: {
                fontSize: "44px",
                fontFamily: "Silkscreen",
                color: "#ffffff",
                lineHeight: "1.1",
                letterSpacing: "0.04em",
              },
            },
            "CERTIFICATES"
          ),
          // Subtitle
          React.createElement(
            "div",
            {
              style: {
                fontSize: "13px",
                color: "#71717a",
                lineHeight: "1.6",
              },
            },
            "Official credentials, national hackathon wins, and academic honors in AI & Cybersecurity."
          )
        ),
        // Stylized 3D Folder Illustration Card
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#1c1c1e",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "20px 24px",
              gap: "10px",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: "28px",
                fontFamily: "Silkscreen",
                color: "#22c55e",
              },
            },
            `${certs.length} CREDENTIALS`
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: "12px",
                color: "#a1a1aa",
              },
            },
            "Interactive 3D File Cabinet Preview"
          )
        )
      ),

      // Right Column (Certificate Grid Cards)
      React.createElement(
        "div",
        {
          style: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          },
        },
        certs.slice(0, 4).map((cert, index) =>
          React.createElement(
            "div",
            {
              key: cert.id || index,
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                backgroundColor: index === 0 ? "#1e1e22" : "#171719",
                border: index === 0 ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.05)",
                borderRadius: "14px",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  maxWidth: "520px",
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: "15px",
                    color: "#ffffff",
                    fontWeight: "bold",
                  },
                },
                cert.title
              ),
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: "12px",
                    color: "#888888",
                  },
                },
                cert.issuer
              )
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: "12px",
                  color: index === 0 ? "#22c55e" : "#666666",
                  fontWeight: "bold",
                  padding: "4px 10px",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.05)",
                },
              },
              cert.issued
            )
          )
        )
      )
    ),

    // Footer Bar
    React.createElement(
      "div",
      {
        style: {
          height: "64px",
          backgroundColor: "#18181b",
          borderTop: "1.5px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 52px",
          fontSize: "13px",
          color: "#71717a",
        },
      },
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "12px" } },
        React.createElement(
          "span",
          { style: { color: "#ffffff", fontWeight: "bold" } },
          "Yousef Mohammed Salah"
        ),
        React.createElement("span", {}, "•"),
        React.createElement("span", {}, "yust.dev/certificates")
      ),
      React.createElement(
        "div",
        { style: { color: "#a1a1aa" } },
        "AI • Cybersecurity • Full-Stack"
      )
    )
  )
);

// Render Satori SVG
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

const pngTarget = join(rootDir, "public/static/images/og-certificates.png");
const webpTarget = join(rootDir, "public/static/images/og-certificates.webp");
const svgTarget = join(rootDir, "public/static/images/og-certificates.svg");

// Write Satori SVG
writeFileSync(svgTarget, svg);

// Render 2K PNG & WebP using Resvg
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
try {
  execSync(`mkdir -p ${outputDir} && cp ${pngTarget} ${webpTarget} ${svgTarget} ${outputDir}/ 2>/dev/null`, { stdio: "ignore" });
} catch {}

console.log(`[OG Generator - Certificates] Successfully generated og-certificates.png + og-certificates.webp + og-certificates.svg!`);
