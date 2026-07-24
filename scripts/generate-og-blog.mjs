import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// 1. Extract blog posts data from blog.index.tsx
const blogContent = readFileSync(join(rootDir, "src/routes/_main/blog.index.tsx"), "utf8");

// Parse posts from the source
const postBlocks = [...blogContent.matchAll(/\{\s*id:\s*["'](\d+)["'][\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?date:\s*["']([^"']+)["'][\s\S]*?category:\s*["']([^"']+)["'][\s\S]*?summary:\s*\n?\s*["']([^"']+)["']/g)];

const posts = postBlocks.map(m => ({
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
const readTimes = { "6": 5, "1": 4, "4": 6, "3": 3, "2": 5, "5": 4 };

console.log(`[OG Generator] Featured: "${featured.title}"`);
console.log(`[OG Generator] Latest posts: ${latest.map(p => p.title).join(", ")}`);

// 2. Generate the rich two-column HTML matching the user's reference screenshot
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
    padding: 48px 52px 0 52px;
    gap: 48px;
  }

  /* LEFT COLUMN — Featured post */
  .left {
    flex: 1.15;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 32px;
  }

  .blog-label {
    font-family: 'Silkscreen', monospace;
    font-size: 15px;
    font-weight: 700;
    color: #d4d4d8;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  .featured-title {
    font-size: 36px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
  }

  .featured-summary {
    font-size: 15px;
    color: #71717a;
    line-height: 1.65;
    max-width: 440px;
  }

  .featured-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 28px;
    font-family: 'Silkscreen', monospace;
    font-size: 11px;
    color: #71717a;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .meta-icon {
    width: 14px;
    height: 14px;
    opacity: 0.5;
  }

  .meta-dot {
    color: #3f3f46;
  }

  .category-tag {
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 999px;
    padding: 4px 14px;
    font-family: 'Silkscreen', monospace;
    font-size: 10px;
    color: #a1a1aa;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .bottom-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
  }

  .read-link {
    font-size: 14px;
    font-weight: 600;
    color: #d4d4d8;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .read-arrow {
    font-size: 16px;
  }

  .blog-badge {
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 999px;
    padding: 8px 22px;
    font-family: monospace;
    font-size: 13px;
    color: #d4d4d8;
    letter-spacing: 0.02em;
  }

  /* RIGHT COLUMN — Latest posts sidebar */
  .right {
    width: 340px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .latest-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Silkscreen', monospace;
    font-size: 12px;
    font-weight: 700;
    color: #d4d4d8;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .green-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d4d4d8;
  }

  .post-item {
    padding: 16px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .post-item.active {
    background: rgba(255,255,255,0.04);
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.08);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 2px;
  }

  .post-title-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .blue-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #a1a1aa;
    margin-top: 6px;
    flex-shrink: 0;
  }

  .post-title {
    font-size: 13.5px;
    font-weight: 600;
    color: #e4e4e7;
    line-height: 1.4;
  }

  .post-meta {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    padding-left: 17px;
    font-family: 'Silkscreen', monospace;
    font-size: 10px;
    color: #52525b;
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
      <!-- LEFT: Featured Post -->
      <div class="left">
        <div>
          <div class="blog-label">B L O G</div>
          <div class="featured-title">${featured.title}</div>
          <div class="featured-summary">${featured.summary}</div>
          <div class="featured-meta">
            <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke-width="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke-width="1.5"/></svg>
            ${featured.date.toUpperCase()}
            <span class="meta-dot">•</span>
            <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke-width="1.5" stroke-linecap="round"/></svg>
            ${readTimes[featured.id] || 5} MIN READ
            <span class="meta-dot">•</span>
            <span class="category-tag">${featured.category}</span>
          </div>
        </div>
        <div class="bottom-row">
          <div class="read-link">Read the full post <span class="read-arrow">↗</span></div>
          <div class="blog-badge">/blog</div>
        </div>
      </div>

      <!-- RIGHT: Latest Posts Sidebar -->
      <div class="right">
        <div class="latest-header">
          <div class="green-dot"></div>
          LATEST POSTS
        </div>
        ${latest.map((post, i) => `
        <div class="post-item${i === 0 ? ' active' : ''}">
          <div class="post-title-row">
            ${i === 0 ? '<div class="blue-dot"></div>' : ''}
            <div class="post-title">${post.title}</div>
          </div>
          <div class="post-meta"${i !== 0 ? ' style="padding-left:0"' : ''}>
            <span>${post.date.toUpperCase()}</span>
            <span>${readTimes[post.id] || 5} MIN READ</span>
          </div>
        </div>`).join("")}
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <span>Stories. Retrospectives. Wins.</span>
      <span>New Posts Weekly</span>
    </div>
  </div>
</body>
</html>`;

const tempHtml = "/tmp/temp-og-blog.html";
writeFileSync(tempHtml, html);

const pngTarget = join(rootDir, "public/static/images/og-blog.png");
const webpTarget = join(rootDir, "public/static/images/og-blog.webp");

try {
  execSync(`google-chrome --headless --disable-gpu --screenshot=${pngTarget} --window-size=1200,630 --hide-scrollbars file://${tempHtml}`, { stdio: "ignore" });
  execSync(`ffmpeg -y -i ${pngTarget} -c:v libwebp -quality 95 ${webpTarget}`, { stdio: "ignore" });
  console.log(`[OG Generator] Successfully generated og-blog.png & og-blog.webp!`);
} catch (e) {
  console.warn("[OG Generator] Chrome/ffmpeg export skipped.");
}
