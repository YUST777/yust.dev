import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";

export function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle legacy redirects from /mem to /blog
    if (location.pathname.startsWith("/mem")) {
      const newPath = location.pathname.replace("/mem", "/blog");
      void navigate({ to: newPath, replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

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
          className="text-[120px] md:text-[180px] font-pixel font-bold leading-none bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent mb-4"
        >
          404
        </motion.h1>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 uppercase tracking-widest">
          Lost in the digital void
        </h2>

        <p className="text-zinc-500 font-mono text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed">
          The page you&apos;re looking for has been moved, renamed, or simply doesn&apos;t exist.
          Don&apos;t worry, even the best explorers get lost sometimes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            RETURN HOME
          </Link>
          <Link
            to="/blog"
            className="px-8 py-4 bg-white/5 text-white border border-white/10 font-bold rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            EXPLORE BLOG
          </Link>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
