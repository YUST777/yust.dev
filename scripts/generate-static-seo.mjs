import { readFile, writeFile } from "node:fs/promises";

import { escapeXml, getEntryBlocks, readId, readStringField } from "./source-content.mjs";

const root = new URL("../", import.meta.url);
const siteUrl = "https://www.yust.dev";

const [projectsSource, blogSource] = await Promise.all([
  readFile(new URL("src/components/projects/ProjectsData.ts", root), "utf8"),
  readFile(new URL("src/routes/_main/blog.index.tsx", root), "utf8"),
]);

const projects = getEntryBlocks(projectsSource)
  .map((block) => ({
    slug: readStringField(block, "slug"),
    title: readStringField(block, "title"),
  }))
  .filter((project) => project.slug && project.title);

const posts = getEntryBlocks(blogSource)
  .map((block) => ({
    id: readId(block),
    slug: readStringField(block, "slug"),
    title: readStringField(block, "title"),
    iso: readStringField(block, "iso"),
    summary: readStringField(block, "summary"),
  }))
  .filter((post) => post.id && post.slug && post.title && post.iso && post.summary)
  .sort((a, b) => b.iso.localeCompare(a.iso));

if (projects.length === 0 || posts.length === 0) {
  throw new Error("Static SEO generation found no project or blog content.");
}

const latestDate = posts[0].iso;
const coreRoutes = [
  ["/", "weekly", "1.0"],
  ["/projects", "weekly", "0.9"],
  ["/blog", "weekly", "0.9"],
  ["/hacks", "monthly", "0.8"],
  ["/certificates", "monthly", "0.8"],
  ["/ai-security-projects", "monthly", "0.9"],
  ["/competitive-programming-platforms", "monthly", "0.9"],
];

function sitemapEntry(path, lastmod, changefreq, priority) {
  return `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const sitemapEntries = [
  ...coreRoutes.map(([path, changefreq, priority]) =>
    sitemapEntry(path, latestDate, changefreq, priority),
  ),
  ...projects.map((project) =>
    sitemapEntry(`/projects/${project.slug}`, latestDate, "monthly", "0.8"),
  ),
  ...posts.map((post) => sitemapEntry(`/blog/${post.slug}`, post.iso, "monthly", "0.7")),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join("\n")}\n</urlset>\n`;

const rssItems = posts.map(
  (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(`${post.iso}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`,
);

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>yust.dev — Yousef Mohammed Salah · Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Software engineering, competitive programming, AI security, and hackathon stories by Yousef Mohammed Salah.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <managingEditor>yousfmsm@hotmail.com (Yousef Mohammed Salah)</managingEditor>
    <webMaster>yousfmsm@hotmail.com (Yousef Mohammed Salah)</webMaster>
${rssItems.join("\n")}
  </channel>
</rss>
`;

await Promise.all([
  writeFile(new URL("public/sitemap.xml", root), sitemap),
  writeFile(new URL("public/rss.xml", root), rss),
]);

console.log(`Generated sitemap (${sitemapEntries.length} URLs) and RSS (${posts.length} posts).`);
