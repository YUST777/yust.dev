/**
 * Centralized SEO configuration and structured data builders.
 *
 * Goals:
 *  - One canonical source for site-wide URLs, social handles, and identity.
 *  - Reusable Schema.org JSON-LD builders for every route.
 *  - Stable @id references so Google connects the entity graph (Person ↔ WebSite ↔ WebPage ↔ BlogPosting).
 */

export const SITE_URL = "https://yust.dev";
/** The legal/real name. Used as Schema.org Person.name. */
export const PERSON_NAME = "Yousef Mohammed Salah";
/** The brand / display handle. Used as the site name and what people search for. */
export const SITE_BRAND = "yust.dev";
/** Backward-compatible alias kept so older imports don't break. */
export const SITE_NAME = SITE_BRAND;

export const SITE_TITLE_LONG =
  "yust.dev — Yousef Mohammed Salah · Full-Stack & AI Security";
export const SITE_DESCRIPTION =
  "yust.dev — Yousef Mohammed Salah. AI & Cybersecurity student at Horus University, founder of Verdict.run, ICPC HUE Lead, and 4x hackathon winner.";
export const SITE_DESCRIPTION_SHORT =
  "yust.dev — Yousef Mohammed Salah. Full-Stack Dev, AI & Cybersecurity, Verdict.run founder, ICPC HUE Lead.";

export const SOCIAL_IMAGE = `${SITE_URL}/static/images/metadata.jpg`;
export const FAVICON = `${SITE_URL}/static/images/metadata.png`;

// Canonical handles (resolved from competing references in the codebase).
export const TWITTER_HANDLE = "@YUST777";
export const GITHUB_URL = "https://github.com/YUST777";
export const LINKEDIN_URL = "https://www.linkedin.com/in/yousefmsm1/";
export const TELEGRAM_URL = "https://t.me/yousefmsm1";

// Project domains. Both icpchue.xyz and icpchue.com are legitimate; .xyz is the
// primary / live one based on the rest of the codebase, .com is the alternate.
export const ICPCHUE_PRIMARY = "https://icpchue.xyz";
export const ICPCHUE_ALT = "https://icpchue.com";

// Stable @id anchors so Schema.org graph stays connected across pages.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const KEYWORDS = [
  "yust.dev",
  "yust dev",
  "Yousef Mohammed Salah",
  "Yousef Salah",
  "Yousef Mohammed",
  "Yousef Horus",
  "Yousef ICPC",
  "Yousef Verdict",
  "Yust",
  "yust777",
  "businessduck",
  "Verdict.run",
  "ICPC HUE",
  "icpchue",
  "Sast.tech",
  "Gifts Charts",
  "Zero Threat",
  "AI security",
  "cybersecurity student",
  "full-stack developer",
  "competitive programming",
  "Horus University",
  "Damietta",
  "Egypt software engineer",
  "AI cybersecurity Egypt",
].join(", ");

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BlogPostMeta {
  id: string;
  title: string;
  date: string; // human-readable (e.g. "Apr 23, 2026")
  iso: string; // ISO 8601 publish date (e.g. "2026-04-23")
  summary: string;
  image?: string; // absolute URL preferred
}

/** The Person entity. The cornerstone of personal-name SEO. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME,
    alternateName: [
      "yust.dev",
      "Yust",
      "Yüst",
      "businessduck",
      "yust777",
      "YUST777",
      "Yousef Mohammed",
      "Yousef Salah",
      "Yousef Horus",
    ],
    url: SITE_URL,
    image: FAVICON,
    jobTitle: "Software Engineer",
    description:
      "Yousef Mohammed Salah (yust.dev) — AI & Cybersecurity student and Full-Stack Product Engineer. Founder of Verdict.run, ICPC HUE Lead, and creator of Sast.tech.",
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "Cybersecurity",
      "Artificial Intelligence",
      "Competitive Programming",
      "Penetration Testing",
      "AI Agents",
      "TypeScript",
      "React",
      "Next.js",
      "Python",
    ],
    nationality: { "@type": "Country", name: "Egypt" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Damietta",
      addressCountry: "EG",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Horus University in Egypt",
      url: "https://horus.edu.eg",
    },
    worksFor: {
      "@type": "Organization",
      name: "ICPC HUE",
      url: ICPCHUE_PRIMARY,
    },
    sameAs: [
      GITHUB_URL,
      LINKEDIN_URL,
      TELEGRAM_URL,
      "https://x.com/YUST777",
      "https://verdict.run",
      "https://sast.tech",
      ICPCHUE_PRIMARY,
      ICPCHUE_ALT,
    ],
  } as const;
}

/** The website itself. Allows Google to surface a sitelinks search box. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_BRAND,
    alternateName: [PERSON_NAME, "Yust", "yust777", "businessduck"],
    description: SITE_DESCRIPTION_SHORT,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
  } as const;
}

/** Combined site-wide graph. Renders once in the root document. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personSchema(), websiteSchema()],
  };
}

/** WebPage with a stable @id and breadcrumb trail. */
export function webPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  type?: "WebPage" | "AboutPage" | "CollectionPage" | "ProfilePage";
}) {
  const type = opts.type ?? "WebPage";
  // ProfilePage rich results require `mainEntity` (the Person the profile is about).
  // For other page types we expose the Person via `about` instead.
  const personRef = { "@id": PERSON_ID };
  const entityFields =
    type === "ProfilePage"
      ? { mainEntity: personRef, about: personRef }
      : { about: personRef };

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    ...entityFields,
    breadcrumb: breadcrumbSchema(opts.breadcrumbs),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Convert a YYYY-MM-DD date to a full ISO 8601 datetime with timezone.
 * Google's BlogPosting validator warns when datePublished/dateModified is just
 * a calendar date with no timezone. We anchor to noon UTC so the calendar day
 * stays correct in every timezone.
 */
function toIsoDateTime(date: string): string {
  if (!date) return date;
  if (date.includes("T")) return date;
  return `${date}T12:00:00+00:00`;
}

export function blogPostingSchema(post: BlogPostMeta) {
  const url = `${SITE_URL}/blog/${post.id}`;
  const image = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${SITE_URL}${post.image}`
    : SOCIAL_IMAGE;
  const isoDateTime = toIsoDateTime(post.iso);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.summary,
    datePublished: isoDateTime,
    dateModified: isoDateTime,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    image: [image],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    inLanguage: "en",
    url,
  };
}

export interface ProjectListItem {
  name: string;
  url: string;
  description: string;
}

export function projectsCollectionSchema(items: ProjectListItem[]) {
  const url = `${SITE_URL}/projects`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: "Projects | Yousef Mohammed Salah",
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.name,
          url: p.url,
          description: p.description,
          author: { "@id": PERSON_ID },
        },
      })),
    },
  };
}

/** Convenience: convert any object into the meta payload for a JSON-LD <script>. */
export function jsonLdString(payload: object): string {
  return JSON.stringify(payload);
}

/** Default per-route head metadata factory. Keeps OG/Twitter consistent. */
export interface RouteHeadOpts {
  title: string;
  description: string;
  path: string; // e.g. "/projects"
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

export function buildRouteHead(opts: RouteHeadOpts) {
  const url = `${SITE_URL}${opts.path}`;
  const image = opts.image ?? SOCIAL_IMAGE;
  const meta = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:type", content: opts.type ?? "website" },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: SITE_BRAND },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: image },
    { name: "twitter:creator", content: TWITTER_HANDLE },
    { name: "twitter:site", content: TWITTER_HANDLE },
  ];

  if (opts.publishedTime) {
    meta.push({ property: "article:published_time", content: opts.publishedTime });
  }
  if (opts.modifiedTime) {
    meta.push({ property: "article:modified_time", content: opts.modifiedTime });
  }
  if (opts.noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  } else {
    meta.push({
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}
