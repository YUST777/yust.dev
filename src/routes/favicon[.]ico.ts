import { createFileRoute } from "@tanstack/react-router";

function redirectToAppIcon(request: Request) {
  const url = new URL(request.url);
  url.pathname = "/static/images/metadata.png";
  url.search = "";
  return Response.redirect(url.toString(), 302);
}

/**
 * Browsers request /favicon.ico by default. Without this route, the request
 * was handled by /_main/$ (slug "favicon.ico"), the content loader threw
 * notFound(), and the dev server surfaced it as HTTP 500.
 *
 * HEAD must be handled too: only defining GET returns 500 for HEAD probes
 * (curl -I, some crawlers, devtools).
 */
export const Route = createFileRoute("/favicon.ico")({
  server: {
    handlers: {
      GET: ({ request }) => redirectToAppIcon(request),
      HEAD: ({ request }) => redirectToAppIcon(request),
    },
  },
});
