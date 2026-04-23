"use client";

import { useEffect, useRef, useState, lazy, Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import BentoTilt from "./BentoTilt";
import ScopedSmoothScroll from "./ScopedSmoothScroll";
import { VideoPlayer } from "./VideoPlayer";
import { projectsData, archiveProjectsData } from "./ProjectsData";
import { Project } from "./types";
import ProjectCard from "./ProjectCard";
import { sounds } from "@/lib/sounds";

const ProjectModal = lazy(() => import("./ProjectModal"));

// Hoisted regex to module scope per React best practices (avoids recreation each render)
const CAMEL_CASE_REGEX = /([A-Z])/g;

// Lazy load drawers for better performance and code splitting
const Drawers = {
  VerdictDrawer: lazy(() => import("./drawers/VerdictDrawer")),
  SastDrawer: lazy(() => import("./drawers/SastDrawer")),
  IcpchueDrawer: lazy(() => import("./drawers/IcpchueDrawer")),
  CollectableKitDrawer: lazy(() => import("./drawers/CollectableKitDrawer")),
  ZeroThreatDrawer: lazy(() => import("./drawers/ZeroThreatDrawer")),
  GiftsChartsDrawer: lazy(() => import("./drawers/GiftsChartsDrawer")),
  FazzahDrawer: lazy(() => import("./drawers/FazzahDrawer")),
  YousefDevDrawer: lazy(() => import("./drawers/YousefDevDrawer")),
  PanoBlueDrawer: lazy(() => import("./drawers/PanoBlueDrawer")),
  RetroOSDrawer: lazy(() => import("./drawers/RetroOSDrawer")),
};

const DRAWER_TITLES: Record<string, string> = {
  zerothreat: "Zero Threat - Cybersecurity Website Project",
  giftsCharts: "Gifts Charts - Telegram Analytics Bot",
  ICPCHUE: "ICPCHUE - Creative Web Project",
  yousefdev: "yousefdev - Building Practical Solutions",
  panoblue: "PanoBlue - Panorama Viewer",
  fazzah: "Fazzah - Web Application",
  verdict: "Verdict – Competitive Programming Platform",
  sast: "Sast – Autonomous AI Security Agent",
  collectablekit: "Collectable Kit – Management Platform",
  RetroOS: "RetroOS – Interactive Web Simulation",
};

const DRAWER_COMPONENTS: Record<string, React.LazyExoticComponent<any>> = {
  verdict: Drawers.VerdictDrawer,
  sast: Drawers.SastDrawer,
  ICPCHUE: Drawers.IcpchueDrawer,
  collectablekit: Drawers.CollectableKitDrawer,
  zerothreat: Drawers.ZeroThreatDrawer,
  giftsCharts: Drawers.GiftsChartsDrawer,
  fazzah: Drawers.FazzahDrawer,
  yousefdev: Drawers.YousefDevDrawer,
  panoblue: Drawers.PanoBlueDrawer,
  RetroOS: Drawers.RetroOSDrawer,
};

const MAIN_PROJECTS = projectsData.filter((p) => !p.isLarge);
const HIGHLIGHT_PROJECTS = projectsData.filter((p) => p.isLarge);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Typing animation state
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "yousefdev |";

  useEffect(() => {
    document.body.classList.toggle("drawer-open", !!openDrawer);
    return () => document.body.classList.remove("drawer-open");
  }, [openDrawer]);

  useEffect(() => {
    if (openDrawer === "yousefdev") {
      let timeout: ReturnType<typeof setTimeout>;
      const typeSpeed = isDeleting ? 100 : 150;
      const pauseTime = 2000;

      if (!isDeleting && currentText === fullText) {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(
            fullText.substring(0, isDeleting ? currentText.length - 1 : currentText.length + 1),
          );
        }, typeSpeed);
      }
      return () => clearTimeout(timeout);
    } else {
      setCurrentText("");
      setIsDeleting(false);
    }
  }, [currentText, isDeleting, openDrawer]);

  const handleProjectClick = (project: Project) => {
    try {
      sounds.popIn();
    } catch {
      // Audio context might be restricted
    }

    if (project.isArchive) {
      setIsExpanded(!isExpanded);
      return;
    }

    if (project.drawerId) {
      setOpenDrawer(project.drawerId);
    } else {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const drawerTitle = useMemo(() => DRAWER_TITLES[openDrawer || ""] || "", [openDrawer]);

  const DrawerContent = useMemo(() => {
    if (!openDrawer) return null;
    const Component = DRAWER_COMPONENTS[openDrawer];

    return Component ? (
      <Suspense
        fallback={
          <div className="h-40 flex items-center justify-center text-white/20">
            Loading details...
          </div>
        }
      >
        <Component />
      </Suspense>
    ) : null;
  }, [openDrawer]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="pt-10 pb-20 md:pt-12 md:pb-32 bg-dark px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="flex justify-end mb-8 md:mb-12 px-0 md:px-4">
          <a
            href="https://github.com/YUST777"
            className="hidden md:flex items-center gap-2 border border-white/20 px-8 py-3 rounded-full text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
          >
            <i className="fab fa-github text-lg"></i>
            View GitHub
          </a>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[350px] md:auto-rows-[450px]">
          {MAIN_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isExpanded={isExpanded}
              isHovered={hoveredVideoId === project.id}
              onMouseEnter={() => setHoveredVideoId(project.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
              onClick={() => handleProjectClick(project)}
            />
          ))}

          <AnimatePresence>
            {isExpanded &&
              archiveProjectsData.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={100} // High index for animation delay logic
                  isExpanded={true}
                  isHovered={hoveredVideoId === project.id}
                  onMouseEnter={() => setHoveredVideoId(project.id)}
                  onMouseLeave={() => setHoveredVideoId(null)}
                  onClick={() => handleProjectClick(project)}
                  isArchiveItem
                />
              ))}
          </AnimatePresence>

          {/* Master yousefdev card - always last */}
          {HIGHLIGHT_PROJECTS.map((project) => (
            <motion.div key={project.id} className={project.span}>
              <BentoTilt className="rounded-2xl overflow-hidden relative group cursor-default h-full">
                <div className="w-full h-full bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden relative">
                  <VideoPlayer
                    video={project.video || ""}
                    title={project.title}
                    shouldAutoPlay={true}
                    isHovered={hoveredVideoId === project.id}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                </div>
              </BentoTilt>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Suspense fallback={null}>
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      </Suspense>

      <AnimatePresence>
        {openDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                sounds.popOut();
                setOpenDrawer(null);
              }}
              className="fixed inset-0 bg-black/80 z-[55] backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.y > 150 || info.velocity.y > 500) {
                  sounds.popOut();
                  setOpenDrawer(null);
                }
              }}
              className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-3xl z-[60] bg-[#0c0c0c] border-t border-white/20 rounded-t-[2.5rem] px-4 sm:px-6 md:px-10 pb-[env(safe-area-inset-bottom,2rem)] mb-0 sm:pb-12 pt-2 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] max-h-[94vh] overflow-hidden flex flex-col pointer-events-auto"
            >
              <div
                className="w-12 h-1.5 bg-white/20 rounded-full mx-auto my-3 cursor-pointer hover:bg-white/30 transition-colors shrink-0"
                onClick={() => {
                  sounds.popOut();
                  setOpenDrawer(null);
                }}
              />
              <div className="flex items-start justify-between mb-4 sm:mb-6 flex-shrink-0 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400 truncate">
                    {openDrawer === "yousefdev" ? (
                      <span className="font-mono">
                        {currentText}
                        <span className="animate-pulse">|</span>
                      </span>
                    ) : (
                      openDrawer.charAt(0).toUpperCase() +
                      openDrawer.slice(1).replace(CAMEL_CASE_REGEX, " $1")
                    )}
                  </p>
                  <h3 className="text-lg sm:text-xl md:text-3xl font-display font-black text-white leading-tight mt-1 break-words">
                    {drawerTitle}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    sounds.popOut();
                    setOpenDrawer(null);
                  }}
                  className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ScopedSmoothScroll className="overflow-y-auto flex-1 pr-2 space-y-6 custom-scrollbar touch-pan-y pb-24 sm:pb-4">
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/5 mb-6 flex-shrink-0 relative">
                  {openDrawer === "ICPCHUE" ? (
                    <iframe
                      src="https://www.youtube.com/embed/tH--wuGCMuM?autoplay=1&mute=1&loop=1&playlist=tH--wuGCMuM"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      title="ICPC HUE Showcase Video"
                    />
                  ) : (
                    <video
                      src={`/videos/${openDrawer === "giftsCharts" ? "giftscharts" : openDrawer}.webm`}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      title={`${openDrawer} detailed showcase video`}
                    />
                  )}
                </div>
                {DrawerContent}
              </ScopedSmoothScroll>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
