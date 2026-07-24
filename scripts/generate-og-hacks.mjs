import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

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

console.log(`[OG Generator] Detected ${count} hackathon wins`);
console.log(`[OG Generator] Hacks: ${hacks.map(h => h.title).join(", ")}`);

// Trophy color mapping
function trophyColor(rank) {
  if (rank.includes("1ST")) return { fill: "#FFD700", label: "1ST", labelColor: "#b8960a" };
  if (rank.includes("2ND")) return { fill: "#C0C0C0", label: "2ND", labelColor: "#808080" };
  return { fill: "#CD7F32", label: "3RD", labelColor: "#8B5A2B" };
}

// Clean title by removing parenthetical notes (e.g. "(3D Infinite Runner...)")
function cleanTitle(title) {
  return title.replace(/\s*\(.*?\)/g, "").trim();
}

// Extract short event name (first part before •)
function shortEvent(event) {
  if (event.includes("SUSTAINABLE")) {
    return "SUSTAINABLE SUMMIT TANTA";
  }
  return event.split("•")[0].trim();
}

// Extract date from event string (second part after first •)
function eventDate(event) {
  const parts = event.split("•");
  return parts.length >= 2 ? parts[1].trim() : "";
}

// 2. Build pixel trophy SVG — 8-bit style
function pixelTrophy(color, size = 28) {
  // 7x8 pixel grid trophy
  const grid = [
    [0,1,1,1,1,1,0],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,0,0,1,0,0,0],
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
  ];
  const px = size / 7;
  let rects = "";
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col]) {
        rects += `<rect x="${col * px}" y="${row * px}" width="${px + 0.5}" height="${px + 0.5}" fill="${color}"/>`;
      }
    }
  }
  const h = (size / 7) * 8;
  return `<svg width="${size}" height="${h}" viewBox="0 0 ${size} ${h}" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
}

const fontPath700 = join(rootDir, "public/fonts/silkscreen-700.woff2");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @font-face {
    font-family: 'Silkscreen';
    src: url('file://${fontPath700}') format('woff2');
    font-weight: 700;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    width: 1200px;
    height: 630px;
    background-color: #111110;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
  }

  .card {
    width: 1140px;
    height: 570px;
    border: 1.5px solid rgba(255,255,255,0.06);
    border-radius: 24px;
    background: #151514;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .main {
    flex: 1;
    display: flex;
    padding: 44px 52px 0 52px;
    gap: 52px;
  }

  /* LEFT — Big number hero */
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
  }

  .bracket-box {
    position: relative;
    width: 280px;
    height: 230px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bracket {
    position: absolute;
    width: 28px;
    height: 28px;
    border-color: #52525b;
    border-style: solid;
  }

  .bracket-tl { top: 0; left: 0; border-width: 3px 0 0 3px; }
  .bracket-tr { top: 0; right: 0; border-width: 3px 3px 0 0; }
  .bracket-bl { bottom: 0; left: 0; border-width: 0 0 3px 3px; }
  .bracket-br { bottom: 0; right: 0; border-width: 0 3px 3px 0; }

  .number-hero {
    font-family: 'DejaVu Sans', 'Helvetica Neue', Arial, sans-serif;
    font-size: 140px;
    font-weight: 900;
    color: #ffffff;
    line-height: 1;
    text-align: center;
  }

  .title-text {
    font-family: 'Silkscreen', monospace;
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-top: 28px;
    text-align: center;
  }

  .subtitle-text {
    font-family: 'Silkscreen', monospace;
    font-size: 11px;
    font-weight: 700;
    color: #3f3f46;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-top: 12px;
    text-align: center;
  }

  /* RIGHT — Hackathon list */
  .right {
    width: 400px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .list-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Silkscreen', monospace;
    font-size: 12px;
    font-weight: 700;
    color: #d4d4d8;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .header-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #a1a1aa;
  }

  .hack-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .hack-item:last-child {
    border-bottom: none;
  }

  .trophy-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    padding-top: 2px;
  }

  .trophy-rank {
    font-family: 'Silkscreen', monospace;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hack-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .hack-title {
    font-size: 13.5px;
    font-weight: 700;
    color: #e4e4e7;
    line-height: 1.35;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hack-event {
    font-family: 'Silkscreen', monospace;
    font-size: 9px;
    color: #52525b;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    line-height: 1.4;
  }

  .hack-date {
    font-family: 'Silkscreen', monospace;
    font-size: 9px;
    color: #3f3f46;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* FOOTER */
  .footer {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 18px 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Silkscreen', monospace;
    font-size: 11px;
    color: #3f3f46;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="main">
      <!-- LEFT: Hero Number -->
      <div class="left">
        <div class="bracket-box">
          <div class="bracket bracket-tl"></div>
          <div class="bracket bracket-tr"></div>
          <div class="bracket bracket-bl"></div>
          <div class="bracket bracket-br"></div>
          <div class="number-hero">${count}</div>
        </div>
        <div class="title-text">Hackathons Won</div>
        <div class="subtitle-text">And Counting</div>
      </div>

      <!-- RIGHT: Hackathon List with Trophies -->
      <div class="right">
        <div class="list-header">
          <div class="header-dot"></div>
          COMPETITIONS
        </div>
        ${hacks.slice(0, 4).map((hack) => {
          const t = trophyColor(hack.rank);
          return `
        <div class="hack-item">
          <div class="trophy-col">
            ${pixelTrophy(t.fill, 28)}
            <div class="trophy-rank" style="color:${t.labelColor}">${t.label}</div>
          </div>
          <div class="hack-info">
            <div class="hack-title">${cleanTitle(hack.title)}</div>
            <div class="hack-event">${shortEvent(hack.event)}</div>
            <div class="hack-date">${eventDate(hack.event)}</div>
          </div>
        </div>`;
        }).join("")}
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <span>Competitions. Builds. Wins.</span>
      <span>/hacks</span>
    </div>
  </div>
</body>
</html>`;

const tempHtml = "/tmp/temp-og-hacks.html";
writeFileSync(tempHtml, html);

const pngTarget = join(rootDir, "public/static/images/og-hacks.png");
const webpTarget = join(rootDir, "public/static/images/og-hacks.webp");

try {
  execSync(`google-chrome --headless=new --disable-gpu --force-device-scale-factor=2 --screenshot=${pngTarget} --window-size=1200,630 --hide-scrollbars file://${tempHtml}`, { stdio: "ignore" });
  execSync(`ffmpeg -y -i ${pngTarget} -c:v libwebp -quality 98 ${webpTarget}`, { stdio: "ignore" });
  console.log(`[OG Generator] Successfully generated 2K retina og-hacks.png & og-hacks.webp!`);
} catch (e) {
  console.warn("[OG Generator] Chrome/ffmpeg export skipped.");
}
