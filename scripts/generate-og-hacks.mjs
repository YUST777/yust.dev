import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// 1. Extract hackathon wins count from hacks.tsx dynamically
const hacksContent = readFileSync(join(rootDir, "src/routes/_main/hacks.tsx"), "utf8");
// Count items in `const hacks = [` array by looking for `rank:` entries
const rankMatches = hacksContent.match(/rank:\s*["']/g);
const count = rankMatches ? rankMatches.length : 4;

console.log(`[OG Generator] Detected ${count} hackathon wins from hacks.tsx`);

// 2. Generate HTML with dynamic count
const fontPath700 = join(rootDir, "public/fonts/silkscreen-700.woff2");
const fontPath400 = join(rootDir, "public/fonts/silkscreen-400.woff2");

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
  @font-face {
    font-family: 'Silkscreen';
    src: url('file://${fontPath400}') format('woff2');
    font-weight: 400;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    width: 1200px;
    height: 630px;
    background-color: #1a1a18;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .card-frame {
    width: 1140px;
    height: 570px;
    border: 2px solid rgba(255, 255, 255, 0.06);
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #1a1a18;
  }

  .bracket-box {
    position: relative;
    width: 320px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bracket {
    position: absolute;
    width: 32px;
    height: 32px;
    border-color: #52525b;
    border-style: solid;
  }

  .bracket-tl { top: 0; left: 0; border-width: 4px 0 0 4px; }
  .bracket-tr { top: 0; right: 0; border-width: 4px 4px 0 0; }
  .bracket-bl { bottom: 0; left: 0; border-width: 0 0 4px 4px; }
  .bracket-br { bottom: 0; right: 0; border-width: 0 4px 4px 0; }

  .number-hero {
    font-family: 'Silkscreen', monospace;
    font-size: 140px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1;
    text-align: center;
    margin-bottom: 8px;
  }

  .title-text {
    font-family: 'Silkscreen', monospace;
    font-size: 38px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-top: 42px;
    text-align: center;
  }
</style>
</head>
<body>
  <div class="card-frame">
    <div class="bracket-box">
      <div class="bracket bracket-tl"></div>
      <div class="bracket bracket-tr"></div>
      <div class="bracket bracket-bl"></div>
      <div class="bracket bracket-br"></div>
      <div class="number-hero">${count}</div>
    </div>
    <div class="title-text">HACKATHONS WON</div>
  </div>
</body>
</html>`;

const tempHtml = "/tmp/temp-og-hacks.html";
writeFileSync(tempHtml, html);

const pngTarget = join(rootDir, "public/static/images/og-hacks.png");
const webpTarget = join(rootDir, "public/static/images/og-hacks.webp");

try {
  execSync(`google-chrome --headless --disable-gpu --screenshot=${pngTarget} --window-size=1200,630 --hide-scrollbars file://${tempHtml}`, { stdio: "ignore" });
  execSync(`ffmpeg -y -i ${pngTarget} -c:v libwebp -quality 90 ${webpTarget}`, { stdio: "ignore" });
  console.log(`[OG Generator] Successfully generated og-hacks.png & og-hacks.webp for win count ${count}!`);
} catch (e) {
  console.warn("[OG Generator] Chrome/ffmpeg export skipped, static images preserved.");
}
