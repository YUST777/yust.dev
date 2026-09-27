import { defineHandler } from "nitro";

const LINKEDIN_FOLLOWERS_URL = "https://api.linkedin.com/rest/memberFollowersCount?q=me";
const DEFAULT_LINKEDIN_VERSION = "202609";

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

export default defineHandler(async () => {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN?.trim();

  if (!accessToken) {
    return jsonResponse({ followers: null, source: "unconfigured" }, 200, "no-store");
  }

  try {
    const response = await fetch(LINKEDIN_FOLLOWERS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Linkedin-Version": process.env.LINKEDIN_VERSION?.trim() || DEFAULT_LINKEDIN_VERSION,
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });

    if (!response.ok) {
      return jsonResponse({ followers: null, source: "linkedin-error" }, 502, "no-store");
    }

    const data = (await response.json()) as LinkedInFollowersResponse;
    const followers = data.elements?.[0]?.memberFollowersCount;

    if (typeof followers !== "number" || !Number.isSafeInteger(followers) || followers < 0) {
      return jsonResponse({ followers: null, source: "invalid-response" }, 502, "no-store");
    }

    return jsonResponse(
      { followers, source: "linkedin", fetchedAt: new Date().toISOString() },
      200,
      "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
    );
  } catch {
    return jsonResponse({ followers: null, source: "linkedin-error" }, 502, "no-store");
  }
});
