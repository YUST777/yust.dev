import { Link } from "@tanstack/react-router";
import HouseIcon from "./icons/house";
import SparklesIcon from "./icons/sparkles";
import BriefcaseIcon from "./icons/briefcase";
import StarSparkleIcon from "./icons/star-sparkle";
import MoonIcon from "./icons/moon";

export function Navbar() {
  return (
    <nav className="fixed bottom-4 sm:bottom-auto sm:top-8 left-1/2 -translate-x-1/2 z-[999] w-auto max-w-[95vw]">
      <div className="flex items-center gap-0.5 sm:gap-1.5 p-1 sm:p-1.5 bg-[#0e0e0e]/70 backdrop-blur-2xl border border-white/[0.08] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)]">
        
        <NavLink to="/" icon={<HouseIcon width="18" height="18" />} label="About" />
        <NavLink to="/projects" icon={<SparklesIcon width="18" height="18" />} label="Projects" />
        <NavLink to="/experience" icon={<BriefcaseIcon width="18" height="18" />} label="Experience" />
        <NavLink to="/hacks" icon={<StarSparkleIcon width="18" height="18" />} label="Hacks" />
        
        <div className="w-[1px] h-6 bg-white/10 mx-1 sm:mx-2" />
        
        <button className="p-2 sm:p-2.5 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer" aria-label="Toggle Theme">
          <MoonIcon width="18" height="18" />
        </button>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-[1rem] sm:rounded-full transition-all duration-300 relative group min-w-[50px] sm:min-w-0"
      activeProps={{
        className: "bg-[#252528]/90 text-white shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] ring-1 ring-white/10",
      }}
      inactiveProps={{
        className: "text-zinc-400 hover:text-zinc-200 hover:bg-white/5",
      }}
    >
      {/* Icon Wrapper for 3D effect */}
      <span className="relative z-10 flex items-center justify-center transform group-hover:scale-105 sm:group-hover:scale-105 transition-transform duration-300">
        {icon}
      </span>
      <span className="relative z-10 text-[9px] sm:text-[13px] font-semibold tracking-wide whitespace-nowrap">{label}</span>
    </Link>
  );
}
