import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

const SLUG_ALIASES: Record<string, string> = {
  "/projects/verdict": "/projects/verdict-run",
  "/projects/sast": "/projects/sast-tech",
  "/projects/10krunner": "/projects/10k-runner",
  "/projects/collectablekit": "/projects/collectable-kit",
  "/projects/zerothreat": "/projects/zero-threat",
  "/projects/retroos": "/projects/retro-os",
  "/projects/giftscharts": "/projects/gifts-charts",
};

export function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle legacy /mem redirects to /blog
    if (location.pathname.startsWith("/mem")) {
      const newPath = location.pathname.replace("/mem", "/blog");
      void navigate({ to: newPath, replace: true });
      return;
    }

    // Handle shortcut project slug redirects (e.g. /projects/verdict -> /projects/verdict-run)
    const lowerPath = location.pathname.toLowerCase().replace(/\/$/, "");
    if (SLUG_ALIASES[lowerPath]) {
      void navigate({ to: SLUG_ALIASES[lowerPath], replace: true });
      return;
    }

    // Tell crawlers not to index 404 pages.
    const existing = document.querySelector<HTMLMetaElement>("meta[name='robots']");
    const previous = existing?.getAttribute("content") ?? null;
    if (existing) {
      existing.setAttribute("content", "noindex, follow");
    } else {
      const tag = document.createElement("meta");
      tag.name = "robots";
      tag.content = "noindex, follow";
      document.head.appendChild(tag);
    }
    document.title = "Page Not Found · yust.dev";
    return () => {
      if (existing && previous !== null) existing.setAttribute("content", previous);
    };
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#0c0c0c]">
      <div className="relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-300 text-center">
        <h1 className="bg-gradient-to-b from-white to-white/20 bg-clip-text font-pixel text-[120px] font-bold leading-none text-transparent md:text-[180px]">
          404
        </h1>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
