/// <reference types="vite-plus/test/globals" />

import { readFileSync } from "node:fs";

const projectsSource = readFileSync("src/components/projects/ProjectsData.ts", "utf8");
const blogSource = readFileSync("src/routes/_main/blog.index.tsx", "utf8");
const sitemap = readFileSync("public/sitemap.xml", "utf8");
const rss = readFileSync("public/rss.xml", "utf8");

function quotedFields(source: string, field: string) {
  const expression = new RegExp(`^\\s+${field}:\\s*["']([^"']+)["']`, "gm");
  return [...source.matchAll(expression)].map((match) => match[1]);
}

describe("published content indexes", () => {
  test("every project slug is unique and included in the sitemap", () => {
    const slugs = quotedFields(projectsSource, "slug");

    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(sitemap).toContain(`<loc>https://www.yust.dev/projects/${slug}</loc>`);
    }
  });

  test("every blog slug is unique and included in the sitemap and RSS feed", () => {
    const slugs = quotedFields(blogSource, "slug");

    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      const url = `https://www.yust.dev/blog/${slug}`;
      expect(sitemap).toContain(`<loc>${url}</loc>`);
      expect(rss).toContain(`<link>${url}</link>`);
    }
  });
});
