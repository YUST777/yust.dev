"use client";

import { useEffect, useState, lazy, Suspense, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import BentoTilt from "./BentoTilt";
import { VideoPlayer } from "./VideoPlayer";
import { projectsData, archiveProjectsData } from "./ProjectsData";
import { Project } from "./types";
import ProjectCard from "./ProjectCard";
import { sounds } from "@/lib/sounds";

const ProjectModal = lazy(() => import("./ProjectModal"));
const ScopedSmoothScroll = lazy(() => import("./ScopedSmoothScroll"));

// Hoisted regex to module scope per React best practices (avoids recreation each render)
const CAMEL_CASE_REGEX = /([A-Z])/g;

import { DRAWER_TITLES, DRAWER_COMPONENTS } from "./drawers";

const MAIN_PROJECTS = projectsData.filter((p) => !p.isLarge);
const HIGHLIGHT_PROJECTS = projectsData.filter((p) => p.isLarge);
const PROJECT_CASE_STUDIES = [...projectsData, ...archiveProjectsData].filter(
  (project) => project.slug && !project.isMinimal && !project.isLarge,
);

const CATEGORIES = ["Featured", "Security", "AI", "CP", "Web3", "Games"];

function isFeaturedProject(project: Project): boolean {
  if (project.isArchive || project.isMinimal) return true;
  const slug = (project.slug || "").toLowerCase();
  const title = (project.title || "").toLowerCase();

  if (
    slug.includes("10k") ||
    slug.includes("collectable") ||
    slug.includes("gifts") ||
    slug.includes("zero") ||
    slug.includes("icpc") ||
    slug.includes("sketchz") ||
    slug.includes("monterminal") ||
    slug.includes("hellish") ||
    title.includes("10k") ||
    title.includes("collectable") ||
    title.includes("gifts") ||
    title.includes("zero") ||
    title.includes("icpc") ||
    title.includes("sketchz") ||
    title.includes("monterminal") ||
    title.includes("hellish")
  ) {
    return false;
  }

  return true;
}

function belongsToCategory(project: Project, category: string): boolean {
  if (category === "Featured") return isFeaturedProject(project);

  const title = (project.title || "").toLowerCase();
  const slug = (project.slug || "").toLowerCase();

  if (category === "Security") {
    return (
      title.includes("sast") ||
      title.includes("swrmz") ||
      title.includes("zero threat") ||
      slug.includes("sast") ||
      slug.includes("swrmz") ||
      slug.includes("zero")
    );
  }

  if (category === "AI") {
    return (
      title.includes("spaceworth") ||
      slug.includes("spaceworth")
    );
  }

  if (category === "CP") {
    return (
      title.includes("verdict") ||
      title.includes("icpc") ||
      slug.includes("verdict") ||
      slug.includes("icpc")
    );
  }

  if (category === "Web3") {
    return (
      title.includes("monterminal") ||
      title.includes("collectable") ||
      title.includes("gifts") ||
      title.includes("sketchz") ||
      title.includes("10k runner") ||
      slug.includes("monterminal") ||
      slug.includes("collectable") ||
      slug.includes("gifts") ||
      slug.includes("sketchz") ||
      slug.includes("10k-runner")
    );
  }

  if (category === "Games") {
    return (
      title.includes("hellish") ||
      title.includes("sketchz") ||
      title.includes("10k runner") ||
      slug.includes("hellish") ||
      slug.includes("sketchz") ||
      slug.includes("10k-runner")
    );
  }

  return false;
}

function getDynamicSpan(project: Project, category: string): string {
  if (project.isMinimal || project.isArchive) {
    return "md:col-span-1 md:row-span-1";
  }
  if (category === "AI & Security" || category === "Games" || category === "CP") {
    return "md:col-span-3 md:row-span-1";
  }
  return project.span || "md:col-span-3 md:row-span-1";
}

export default function Projects() {
  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Featured");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "Featured") {
      return MAIN_PROJECTS.filter((p) => isFeaturedProject(p));
    }
    return MAIN_PROJECTS.filter((p) => {
      if (p.isArchive || p.isMinimal) return false;
      return belongsToCategory(p, selectedCategory);
    });
  }, [selectedCategory]);

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
      if (archiveProjectsData.length > 0) {
        setIsExpanded(!isExpanded);
      } else {
        window.open("https://github.com/YUST777?tab=repositories", "_blank", "noopener,noreferrer");
      }
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
    <>
      {/* Category Filter Pills & View GitHub Button Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap shrink min-w-0">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-mono rounded-full transition-all duration-300 whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    : "border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 bg-white/[0.02]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <a
          href="https://github.com/YUST777"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 px-4 sm:px-6 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-colors hover:bg-white/10 text-zinc-300 hover:text-white self-start sm:self-auto"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View GitHub
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[350px] md:auto-rows-[450px]">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isExpanded={isExpanded}
            isHovered={hoveredVideoId === project.id}
            onMouseEnter={() => setHoveredVideoId(project.id)}
            onMouseLeave={() => setHoveredVideoId(null)}
            onClick={() => handleProjectClick(project)}
            overrideSpan={getDynamicSpan(project, selectedCategory)}
          />
        ))}

        {isExpanded &&
          archiveProjectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={100}
              isExpanded={true}
              isHovered={hoveredVideoId === project.id}
              onMouseEnter={() => setHoveredVideoId(project.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
              onClick={() => handleProjectClick(project)}
              isArchiveItem
            />
          ))}

        {/* Master yousefdev card - always last */}
        {HIGHLIGHT_PROJECTS.map((project) => (
          <div
            key={project.id}
            className={project.span}
            onMouseEnter={() => setHoveredVideoId(project.id)}
            onMouseLeave={() => setHoveredVideoId(null)}
          >
            <BentoTilt className="rounded-2xl overflow-hidden relative group cursor-default h-full">
              <div className="w-full h-full bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden relative">
                <VideoPlayer
                  video={project.video || ""}
                  poster={project.poster}
                  title={project.title}
                  shouldAutoPlay={true}
                  isPriority={true}
                  isHovered={hoveredVideoId === project.id}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              </div>
            </BentoTilt>
          </div>
        ))}
      </div>

      <section className="sr-only" aria-labelledby="case-studies-heading">
        <div className="max-w-2xl">
          <h2 id="case-studies-heading" className="text-2xl font-semibold text-white">
            Project case studies
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            Crawlable project pages explain what each product does, the technologies behind it, and
            the problems it was built to solve.
          </p>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_CASE_STUDIES.map((project) => (
            <li key={project.id}>
              <Link
                to="/projects/$projectId"
                params={{ projectId: project.slug! }}
                className="group block h-full rounded-xl border border-white/10 p-4 transition-colors hover:border-white/25 hover:bg-white/[0.02]"
              >
                <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{project.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Suspense fallback={null}>
        {isModalOpen && (
          <ProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            project={selectedProject}
          />
        )}
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

              <Suspense
                fallback={
                  <div className="flex flex-1 items-center justify-center text-sm text-white/30">
                    Loading project details...
                  </div>
                }
              >
                <div className="overflow-y-auto overscroll-contain flex-1 pr-2 space-y-6 custom-scrollbar pb-24 sm:pb-8">
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
                        preload="metadata"
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
                </div>
              </Suspense>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
