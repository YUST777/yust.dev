import { defineHandler } from "nitro";

const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/yousefmsm1/";
const LINKEDIN_FOLLOWERS_URL = "https://api.linkedin.com/rest/memberFollowersCount?q=me";
const DEFAULT_LINKEDIN_VERSION = "202609";
const FALLBACK_FOLLOWERS = 1994;

type LinkedInFollowersResponse = {
  elements?: Array<{ memberFollowersCount?: number }>;
};

function jsonResponse(payload: Record<string, unknown>, status: number, cacheControl: string) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "cache-control": cacheControl,
      "content-type": "application/json; charset=utf-8",
    },
  });
}

async function scrapeLinkedInProfile(cookie: string): Promise<{ followers: number; connections?: string } | null> {
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
  const cookie = process.env.LINKEDIN_LI_AT_COOKIE?.trim() || process.env.LINKEDIN_COOKIE?.trim();
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN?.trim();

  // 1. Scrape live follower count using session cookie if available
  if (cookie) {
    const scraped = await scrapeLinkedInProfile(cookie);
    if (scraped) {
      return jsonResponse(
        {
          followers: scraped.followers,
          connections: scraped.connections,
          source: "linkedin-scrape",
          fetchedAt: new Date().toISOString(),
        },
        200,
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      );
    }
  }

  // 2. Query official LinkedIn Rest API if access token is available
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
          return jsonResponse(
            { followers, source: "linkedin-api", fetchedAt: new Date().toISOString() },
            200,
            "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          );
        }
      }
    } catch {
      // Fall through to fallback
    }
  }

  // 3. Fallback when credentials are unconfigured or remote requests fail
  return jsonResponse(
    {
      followers: FALLBACK_FOLLOWERS,
      connections: "500+",
      source: cookie || accessToken ? "fallback-error" : "unconfigured",
      fetchedAt: new Date().toISOString(),
    },
    200,
    "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
  );
});
