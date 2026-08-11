import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Resvg } from "@resvg/resvg-js";
import React from "react";
import satori from "satori";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const h = React.createElement;
const routeSource = readFileSync(join(rootDir, "src/routes/_main/certificates.tsx"), "utf8");
const certRegex =
  /\{\s*id:\s*["']([^"']+)["'][\s\S]*?issuer:\s*["']([^"']+)["'][\s\S]*?mark:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?issued:\s*["']([^"']+)["'][\s\S]*?image:\s*["']([^"']+)["']/g;
const certs = [];
let match;

while ((match = certRegex.exec(routeSource)) !== null) {
  certs.push({
    id: match[1],
    issuer: match[2],
    mark: match[3],
    title: match[4],
    issued: match[5],
    image: match[6],
  });
}

if (certs.length === 0) throw new Error("No certificates found for the certificates OG image");

function localImageDataUrl(publicPath) {
  let filePath = join(rootDir, "public", publicPath.replace(/^\//, ""));
  const extension = extname(filePath).slice(1);
  if (extension === "webp") {
    filePath = join(dirname(filePath), "og", `${basename(filePath, ".webp")}.png`);
  }

  const resolvedExtension = extname(filePath).slice(1);
  const mime = resolvedExtension === "jpg" ? "jpeg" : resolvedExtension;
  return `data:image/${mime};base64,${readFileSync(filePath).toString("base64")}`;
}

const certificateImages = certs.map((cert) => localImageDataUrl(cert.image));

function SmallFolder({ image, active }) {
  return h(
    "div",
    {
      style: {
        position: "relative",
        display: "flex",
        width: "142px",
        height: "120px",
        flexDirection: "column",
        alignItems: "center",
      },
    },
    h("div", {
      style: {
        position: "absolute",
        top: "20px",
        left: "2px",
        width: "138px",
        height: "94px",
        border: active ? "2px solid #52525b" : "1px solid #313136",
        borderRadius: "11px",
        backgroundColor: "#161619",
      },
    }),
    h("div", {
      style: {
        position: "absolute",
        top: "10px",
        left: "2px",
        width: "58px",
        height: "24px",
        borderRadius: "9px 9px 0 0",
        backgroundColor: "#202024",
        border: "1px solid #35353a",
      },
    }),
    h(
      "div",
      {
        style: {
          position: "absolute",
          top: active ? "6px" : "28px",
          left: "14px",
          width: "114px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3px",
          overflow: "hidden",
          borderRadius: "3px",
          backgroundColor: "#f7f7f4",
          boxShadow: "0 8px 16px rgba(0,0,0,.55)",
        },
      },
      h("img", {
        src: image,
        width: 108,
        height: 74,
        style: { width: "108px", height: "74px", objectFit: "contain" },
      }),
    ),
    h("div", {
      style: {
        position: "absolute",
        top: "52px",
        left: "2px",
        width: "138px",
        height: "66px",
        borderRadius: "9px",
        background: active
          ? "linear-gradient(145deg, #26262b, #18181b)"
          : "linear-gradient(145deg, #202024, #151518)",
        border: active ? "2px solid #505058" : "1px solid #303035",
      },
    }),
  );
}

function MainFolder({ cert, image }) {
  return h(
    "div",
    {
      style: {
        position: "relative",
        display: "flex",
        width: "520px",
        height: "330px",
        flexDirection: "column",
      },
    },
    h(
      "div",
      {
        style: {
          position: "absolute",
          top: "8px",
          left: "34px",
          width: "452px",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "16px",
          border: "1px solid #333338",
          background: "linear-gradient(180deg, #242428, #151518)",
          color: "#66666e",
          fontSize: "17px",
          letterSpacing: ".18em",
        },
      },
      "CERTIFICATION",
    ),
    h("div", {
      style: {
        position: "absolute",
        top: "66px",
        left: "8px",
        width: "504px",
        height: "246px",
        borderRadius: "18px",
        border: "2px solid #303036",
        backgroundColor: "#17171a",
        boxShadow: "0 26px 45px rgba(0,0,0,.7)",
      },
    }),
    h(
      "div",
      {
        style: {
          position: "absolute",
          top: "82px",
          left: "46px",
          width: "428px",
          height: "214px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "7px",
          border: "5px solid #f4f4f0",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 18px rgba(0,0,0,.45)",
        },
      },
      h("img", {
        src: image,
        width: 418,
        height: 204,
        style: { width: "418px", height: "204px", objectFit: "contain" },
      }),
    ),
    h("div", {
      style: {
        position: "absolute",
        bottom: "18px",
        left: "8px",
        width: "504px",
        height: "82px",
        borderRadius: "16px",
        border: "1px solid #35353b",
        background: "linear-gradient(180deg, #26262a, #17171a)",
        boxShadow: "0 -8px 18px rgba(0,0,0,.35)",
      },
    }),
    h(
      "div",
      {
        style: {
          position: "absolute",
          left: "24px",
          bottom: "36px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        },
      },
      h("div", { style: { color: "#ffffff", fontSize: "12px" } }, cert.mark),
      h("div", { style: { color: "#71717a", fontSize: "9px" } }, cert.issued),
    ),
  );
}

const element = h(
  "div",
  {
    style: {
      width: "1200px",
      height: "630px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0c0c0c",
      color: "#ffffff",
      fontFamily: "GeistMono",
    },
  },
  h(
    "div",
    {
      style: {
        width: "1140px",
        height: "570px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid #26262a",
        borderRadius: "24px",
        background: "linear-gradient(145deg, #111113, #0d0d0f)",
      },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "46px 52px 20px",
        },
      },
      h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "13px" } },
        h("div", {
          style: { width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#d4d4d8" },
        }),
        h(
          "div",
          {
            style: {
              fontFamily: "Silkscreen",
              fontSize: "18px",
              letterSpacing: ".35em",
            },
          },
          "CERTIFICATES",
        ),
      ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          gap: "30px",
          padding: "0 52px 42px",
        },
      },
      h(
        "div",
        {
          style: {
            width: "466px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            columnGap: "8px",
            rowGap: "22px",
          },
        },
        certs.slice(0, 6).map((cert, index) =>
          h(SmallFolder, {
            key: cert.id,
            image: certificateImages[index],
            active: index === 0,
          }),
        ),
      ),
      h(MainFolder, { cert: certs[0], image: certificateImages[0] }),
    ),
  ),
);

const svg = await satori(element, {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "Silkscreen",
      data: readFileSync(join(rootDir, "public/fonts/silkscreen-700.ttf")),
      weight: 700,
      style: "normal",
    },
    {
      name: "GeistMono",
      data: readFileSync(
        join(rootDir, "node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf"),
      ),
      weight: 700,
      style: "normal",
    },
  ],
});

const imageDir = join(rootDir, "public/static/images");
const pngTarget = join(imageDir, "og-certificates.png");
const svgTarget = join(imageDir, "og-certificates.svg");
const png = new Resvg(svg, { fitTo: { mode: "width", value: 2400 } }).render().asPng();

writeFileSync(svgTarget, svg);
writeFileSync(pngTarget, png);

const outputDir = join(rootDir, ".output/public/static/images");
if (existsSync(join(rootDir, ".output"))) {
  mkdirSync(outputDir, { recursive: true });
  for (const target of [pngTarget, svgTarget]) {
    writeFileSync(join(outputDir, target.slice(target.lastIndexOf("/") + 1)), readFileSync(target));
  }
}

console.log(`Generated certificate page preview with ${certs.length} real certificate folders.`);
