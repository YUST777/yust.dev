import { readFile } from "node:fs/promises";

const localOrigin = process.env.SEO_BASE_URL ?? "http://127.0.0.1:3000";
const productionOrigin = "https://www.yust.dev";
const sitemapXml = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapPaths = sitemapUrls.map((url) => new URL(url).pathname);
const errors = [];
const pages = new Map();

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function matches(html, expression) {
  return [...html.matchAll(expression)].map((match) => decodeHtml(match[1]));
}

function normalizeInternalPath(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }
  try {
    const url = new URL(href, productionOrigin);
    if (url.origin !== productionOrigin && url.origin !== "https://yust.dev") return null;
    return url.pathname || "/";
  } catch {
    return null;
  }
}

async function fetchPage(pathname) {
  const response = await fetch(new URL(pathname, localOrigin), { redirect: "follow" });
  const html = await response.text();
  return { response, html };
}

for (const url of sitemapUrls) {
  if (new URL(url).origin !== productionOrigin) {
    errors.push(`Sitemap URL uses the wrong canonical host: ${url}`);
  }
}

for (const pathname of sitemapPaths) {
  const { response, html } = await fetchPage(pathname);
  if (!response.ok) {
    errors.push(`${pathname} returned HTTP ${response.status}`);
    continue;
  }

  const titles = matches(html, /<title>([^<]*)<\/title>/g);
  const descriptions = matches(html, /<meta name="description" content="([^"]*)"\s*\/?>/g);
  const canonicals = matches(html, /<link rel="canonical" href="([^"]+)"\s*\/?>/g);
  const headings = matches(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/g).map((heading) =>
    heading
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
  const imageTags = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  const anchors = matches(html, /<a\b[^>]*href="([^"]+)"[^>]*>/g)
    .map(normalizeInternalPath)
    .filter(Boolean);
  const schemaScripts = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ];

  if (titles.length !== 1) errors.push(`${pathname} has ${titles.length} title tags`);
  if (titles[0] && (titles[0].length < 50 || titles[0].length > 60)) {
    errors.push(`${pathname} title is ${titles[0].length} characters: ${titles[0]}`);
  }
  if (descriptions.length !== 1)
    errors.push(`${pathname} has ${descriptions.length} meta descriptions`);
  if (descriptions[0] && (descriptions[0].length < 110 || descriptions[0].length > 160)) {
    errors.push(`${pathname} description is ${descriptions[0].length} characters`);
  }
  if (canonicals.length !== 1) errors.push(`${pathname} has ${canonicals.length} canonical tags`);

  const expectedCanonical = `${productionOrigin}${pathname === "/" ? "/" : pathname}`;
  if (canonicals[0] !== expectedCanonical) {
    errors.push(
      `${pathname} canonical is ${canonicals[0] ?? "missing"}; expected ${expectedCanonical}`,
    );
  }
  if (headings.length !== 1) errors.push(`${pathname} has ${headings.length} h1 elements`);

  for (const imageTag of imageTags) {
    if (!/\balt="[^"]+"/.test(imageTag))
      errors.push(`${pathname} contains an image without alt text`);
  }

  for (const script of schemaScripts) {
    try {
      JSON.parse(script[1]);
    } catch (error) {
      errors.push(`${pathname} contains invalid JSON-LD: ${error.message}`);
    }
  }

  pages.set(pathname, {
    title: titles[0],
    description: descriptions[0],
    anchors: new Set(anchors),
  });
}

const titleOwners = new Map();
const descriptionOwners = new Map();
for (const [pathname, page] of pages) {
  if (page.title) {
    const previous = titleOwners.get(page.title);
    if (previous) errors.push(`${pathname} duplicates the title used by ${previous}`);
    titleOwners.set(page.title, pathname);
  }
  if (page.description) {
    const previous = descriptionOwners.get(page.description);
    if (previous) errors.push(`${pathname} duplicates the description used by ${previous}`);
    descriptionOwners.set(page.description, pathname);
  }
}

const discovered = new Set(["/"]);
const queue = ["/"];
while (queue.length > 0) {
  const pathname = queue.shift();
  const page = pages.get(pathname);
  if (!page) continue;
  for (const target of page.anchors) {
    if (!discovered.has(target) && pages.has(target)) {
      discovered.add(target);
      queue.push(target);
    }
  }
}

for (const pathname of sitemapPaths) {
  if (!discovered.has(pathname))
    errors.push(`${pathname} is orphaned from the homepage crawl graph`);
}

const internalTargets = new Set(
  [...pages.values()]
    .flatMap((page) => [...page.anchors])
    .filter((pathname) => !pathname.includes(".")),
);
for (const pathname of internalTargets) {
  const { response } = await fetchPage(pathname);
  if (!response.ok) errors.push(`Internal link ${pathname} returned HTTP ${response.status}`);
}

if (errors.length > 0) {
  console.error(`SEO audit failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `SEO audit passed for ${pages.size} sitemap pages and ${internalTargets.size} internal routes.`,
  );
}
