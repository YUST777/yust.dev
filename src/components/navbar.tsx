import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HouseIcon from "./icons/house";
import SparklesIcon from "./icons/sparkles";
import BriefcaseIcon from "./icons/briefcase";
import StarSparkleIcon from "./icons/star-sparkle";
import { DesktopGoose } from "./desktop-goose";

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px is the 'sm' breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const checkDrawer = () => {
      setIsDrawerOpen(document.body.classList.contains("drawer-open"));
    };

    checkDrawer();
    const observer = new MutationObserver(checkDrawer);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{
        y: isDrawerOpen ? (isMobile ? 150 : -150) : 0, // Slide down on mobile, up on desktop
        opacity: isDrawerOpen ? 0 : 1,
        filter: isDrawerOpen ? "blur(10px)" : "blur(0px)",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
        mass: 1,
      }}
      className="pointer-events-auto fixed bottom-4 left-1/2 z-[999] w-max max-w-[calc(100vw-1rem)] -translate-x-1/2 px-2 sm:bottom-auto sm:top-8"
    >
      <div className="flex max-w-[95vw] items-center gap-0.5 overflow-visible sm:gap-1.5 rounded-full border border-white/[0.08] bg-[#0e0e0e]/70 p-1 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:p-1.5 sm:py-2">
        <NavLink to="/" icon={<HouseIcon width="18" height="18" />} label="About" />
        <NavLink to="/projects" icon={<SparklesIcon width="18" height="18" />} label="Projects" />
        <NavLink
          to="/experience"
          icon={<BriefcaseIcon width="18" height="18" />}
          label="Experience"
        />
        <NavLink to="/hacks" icon={<StarSparkleIcon width="18" height="18" />} label="Hacks" />

        <div className="w-[1px] h-6 shrink-0 bg-white/10 mx-1 sm:mx-2" />

        <div className="flex shrink-0 items-center overflow-visible py-px">
          <DesktopGoose />
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-[1rem] sm:rounded-full transition-all duration-300 relative group min-w-[50px] sm:min-w-0"
      activeProps={{
        className:
          "bg-[#252528]/90 text-white shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] ring-1 ring-white/10",
      }}
      inactiveProps={{
        className: "text-zinc-400 hover:text-zinc-200 hover:bg-white/5",
      }}
    >
      <span className="relative z-10 flex items-center justify-center transform group-hover:scale-105 sm:group-hover:scale-105 transition-transform duration-300">
        {icon}
      </span>
      <span className="relative z-10 text-[9px] sm:text-[13px] font-semibold tracking-wide whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
}
