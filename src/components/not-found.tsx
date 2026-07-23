import { useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0, 0.71, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 12,
              stiffness: 100,
              restDelta: 0.001,
            },
          }}
          className="text-[120px] md:text-[180px] font-pixel font-bold leading-none bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent"
        >
          404
        </motion.h1>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
