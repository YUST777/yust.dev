import { defineHandler } from "nitro";
import linkedinBaseline from "../../src/data/linkedin.json";

const LINKEDIN_PROFILE_HANDLE = "yousefmsm1";
const LINKEDIN_PROFILE_URL = `https://www.linkedin.com/in/${LINKEDIN_PROFILE_HANDLE}/`;
const LINKEDIN_FOLLOWERS_URL = "https://api.linkedin.com/rest/memberFollowersCount?q=me";
const DEFAULT_LINKEDIN_VERSION = "202609";

// Cache for 3 hours (10,800 seconds) on Vercel CDN Edge
const CDN_CACHE_3_HOURS = "public, max-age=10800, s-maxage=10800, stale-while-revalidate=86400";

type LinkedInFollowersResponse = {
  elements?: Array<{ memberFollowersCount?: number }>;
};

type FollowerCount = {
  followers: number;
  connections: string;
  source: "linkedin-api" | "linkedin-apify" | "linkedin-scrape" | "cached";
  fetchedAt: string;
};

function jsonResponse(payload: Record<string, unknown>, cacheControl: string) {
  return new Response(JSON.stringify(payload), {
    headers: {
      "cache-control": cacheControl,
      "content-type": "application/json; charset=utf-8",
    },
  });
}

/**
 * 1. Apify. Usage is billed by the selected actor; keep the token server-side.
 * Uses harvestapi/linkedin-profile-scraper Actor with built-in residential proxies.
 */
async function getApifyFollowers(
  token: string,
): Promise<{ followers: number; connections: string } | null> {
  try {
    const url =
      "https://api.apify.com/v2/acts/harvestapi~linkedin-profile-scraper/run-sync-get-dataset-items";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queries: [LINKEDIN_PROFILE_URL],
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) return null;
    const items = (await response.json()) as unknown;
    if (!Array.isArray(items) || items.length !== 1) return null;

    const item = items[0] as Record<string, unknown>;
    const profileUrl = item.linkedinUrl ?? item.profileUrl ?? item.url;
    const publicIdentifier = item.publicIdentifier;
    const hasMatchingUrl =
      typeof profileUrl === "string" && isExpectedLinkedInProfileUrl(profileUrl);
    const hasMatchingIdentifier =
      typeof publicIdentifier === "string" &&
      publicIdentifier.toLowerCase() === LINKEDIN_PROFILE_HANDLE.toLowerCase();
    if (
      (typeof profileUrl === "string" && !hasMatchingUrl) ||
      (typeof publicIdentifier === "string" && !hasMatchingIdentifier) ||
      (!hasMatchingUrl && !hasMatchingIdentifier)
    ) {
      return null;
    }

    const followerCount = item.followerCount;
    const connectionsCount = item.connectionsCount;

    if (
      typeof followerCount !== "number" ||
      !Number.isSafeInteger(followerCount) ||
      followerCount < 0
    ) {
      return null;
    }

    const connections =
      typeof connectionsCount === "number" && connectionsCount > 500
        ? "500+"
        : typeof connectionsCount === "number"
          ? String(connectionsCount)
          : "500+";

    return { followers: followerCount, connections };
  } catch {
    return null;
  }
}

function isExpectedLinkedInProfileUrl(value: string) {
  try {
    const url = new URL(value);
    const profileMatch = url.pathname.match(/^\/in\/([^/]+)\/?$/i);
    return (
      (url.hostname === "linkedin.com" || url.hostname.endsWith(".linkedin.com")) &&
      profileMatch?.[1]?.toLowerCase() === LINKEDIN_PROFILE_HANDLE.toLowerCase()
    );
  } catch {
    return false;
  }
}

/**
 * 2. Direct authenticated scrape with session cookie (free, unlimited).
 */
async function scrapeLinkedInProfile(
  cookie: string,
): Promise<{ followers: number; connections: string } | null> {
  const cookieHeader = cookie.includes("=") ? cookie : `li_at=${cookie}`;
  try {
    const response = await fetch(LINKEDIN_PROFILE_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36",
        Cookie: cookieHeader,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return null;
    const html = await response.text();

    if (html.includes("auth_wall_desktop_profile") || html.includes("Sign Up | LinkedIn")) {
      return null;
    }

    const followerMatch = html.match(/([\d,.]+)\s+followers/i);
    if (!followerMatch) return null;

    const count = parseInt(followerMatch[1].replace(/,/g, "").replace(/\./g, ""), 10);
    if (!Number.isSafeInteger(count) || count < 0) return null;

    const connMatch = html.match(/([\d,+]+)\s+connections/i);
    const connections = connMatch ? connMatch[1] : "500+";

    return { followers: count, connections };
  } catch {
    return null;
  }
}

export default defineHandler(async () => {
  const apifyToken = process.env.APIFY_API_TOKEN?.trim() || process.env.APIFY_TOKEN?.trim();
  const cookie = process.env.LINKEDIN_LI_AT_COOKIE?.trim() || process.env.LINKEDIN_COOKIE?.trim();
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN?.trim();

  // Tier 1: Apify (automated profile extraction, no LinkedIn session cookie)
  if (apifyToken) {
    const apifyData = await getApifyFollowers(apifyToken);
    if (apifyData) {
      const result: FollowerCount = {
        followers: apifyData.followers,
        connections: apifyData.connections,
        source: "linkedin-apify",
        fetchedAt: new Date().toISOString(),
      };
      return jsonResponse(result, CDN_CACHE_3_HOURS);
    }
  }

  // Tier 2: Direct session cookie scraping
  if (cookie) {
    const scraped = await scrapeLinkedInProfile(cookie);
    if (scraped) {
      const result: FollowerCount = {
        followers: scraped.followers,
        connections: scraped.connections,
        source: "linkedin-scrape",
        fetchedAt: new Date().toISOString(),
      };
      return jsonResponse(result, CDN_CACHE_3_HOURS);
    }
  }

  // Tier 3: Official LinkedIn REST API
  if (accessToken) {
    try {
      const response = await fetch(LINKEDIN_FOLLOWERS_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Linkedin-Version": process.env.LINKEDIN_VERSION?.trim() || DEFAULT_LINKEDIN_VERSION,
          "X-Restli-Protocol-Version": "2.0.0",
        },
        signal: AbortSignal.timeout(10000),
      });

      if (response.ok) {
        const data = (await response.json()) as LinkedInFollowersResponse;
        const followers = data.elements?.[0]?.memberFollowersCount;

        if (typeof followers === "number" && Number.isSafeInteger(followers) && followers >= 0) {
          const result: FollowerCount = {
            followers,
            connections: "500+",
            source: "linkedin-api",
            fetchedAt: new Date().toISOString(),
          };
          return jsonResponse(result, CDN_CACHE_3_HOURS);
        }
      }
    } catch {
      // Fall through to baseline fallback
    }
  }

  // Tier 4: Resilient verified baseline fallback
  const result: FollowerCount = {
    followers: linkedinBaseline.followers,
    connections: linkedinBaseline.connections,
    source: "cached",
    fetchedAt: linkedinBaseline.updatedAt,
  };

  return jsonResponse(result, CDN_CACHE_3_HOURS);
});
