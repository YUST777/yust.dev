import { defineHandler } from "nitro";
import linkedinBaseline from "../../src/data/linkedin.json";

const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/yousefmsm1/";
const LINKEDIN_FOLLOWERS_URL = "https://api.linkedin.com/rest/memberFollowersCount?q=me";
const DEFAULT_LINKEDIN_VERSION = "202609";

// Cache for 3 hours (10,800 seconds) on Vercel CDN Edge
const CDN_CACHE_3_HOURS =
  "public, max-age=10800, s-maxage=10800, stale-while-revalidate=86400";

type LinkedInFollowersResponse = {
  elements?: Array<{ memberFollowersCount?: number }>;
};

type FollowerCount = {
  followers: number;
  connections: string;
  source: "linkedin-api" | "linkedin-scrape" | "cached";
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

async function getScrapingdogFollowers(
  apiKey: string,
): Promise<{ followers: number; connections: string } | null> {
  try {
    const url = new URL("https://api.scrapingdog.com/profile");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("id", "yousefmsm1");
    url.searchParams.set("type", "profile");
    url.searchParams.set("premium", "true");
    url.searchParams.set("webhook", "false");
    url.searchParams.set("fresh", "false");

    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(25000),
    });
    if (!response.ok) return null;

    const data = (await response.json()) as unknown;
    const item = Array.isArray(data) ? (data[0] as Record<string, unknown>) : (data as Record<string, unknown>);
    if (!item || typeof item !== "object") return null;

    const rawFollowers = item.followers;
    let followers: number | null = null;
    if (typeof rawFollowers === "number" && Number.isSafeInteger(rawFollowers)) {
      followers = rawFollowers;
    } else if (typeof rawFollowers === "string") {
      const match = rawFollowers.match(/^([\d.,]+)\s*([kmb])?/i);
      if (match) {
        const num = parseFloat(match[1].replace(/,/g, ""));
        const unit = match[2]?.toLowerCase();
        const mult = unit === "k" ? 1000 : unit === "m" ? 1000000 : 1;
        followers = Math.round(num * mult);
      }
    }

    if (!followers || !Number.isSafeInteger(followers) || followers < 0) return null;

    const rawConn = typeof item.connections === "string" ? item.connections : "500+";
    const connections = rawConn.replace(/\s*connections/i, "").trim() || "500+";
    return { followers, connections };
  } catch {
    return null;
  }
}

export default defineHandler(async () => {
  const cookie =
    process.env.LINKEDIN_LI_AT_COOKIE?.trim() ||
    process.env.LINKEDIN_COOKIE?.trim();
  const scrapingdogApiKey = process.env.SCRAPINGDOG_API_KEY?.trim();
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN?.trim();

  // 1. Direct cookie scraping (fast, unlimited, self-hosted on Vercel)
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

  // 2. Scrapingdog provider backup (if configured and credits available)
  if (scrapingdogApiKey) {
    const dog = await getScrapingdogFollowers(scrapingdogApiKey);
    if (dog) {
      const result: FollowerCount = {
        followers: dog.followers,
        connections: dog.connections,
        source: "linkedin-scrape",
        fetchedAt: new Date().toISOString(),
      };
      return jsonResponse(result, CDN_CACHE_3_HOURS);
    }
  }

  // 3. Official LinkedIn REST API if access token is configured
  if (accessToken) {
    try {
      const response = await fetch(LINKEDIN_FOLLOWERS_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Linkedin-Version":
            process.env.LINKEDIN_VERSION?.trim() || DEFAULT_LINKEDIN_VERSION,
          "X-Restli-Protocol-Version": "2.0.0",
        },
        signal: AbortSignal.timeout(10000),
      });

      if (response.ok) {
        const data = (await response.json()) as LinkedInFollowersResponse;
        const followers = data.elements?.[0]?.memberFollowersCount;

        if (
          typeof followers === "number" &&
          Number.isSafeInteger(followers) &&
          followers >= 0
        ) {
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

  // 4. Resilient baseline fallback (guarantees accurate count even if remote fails)
  const result: FollowerCount = {
    followers: linkedinBaseline.followers,
    connections: linkedinBaseline.connections,
    source: "cached",
    fetchedAt: linkedinBaseline.updatedAt,
  };

  return jsonResponse(result, CDN_CACHE_3_HOURS);
});
