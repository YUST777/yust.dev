"use client";

import { useEffect, useRef, useState, memo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, MousePointerClick } from "lucide-react";
import BentoTilt from "./BentoTilt";
import ProjectModal from "./ProjectModal";
import ScopedSmoothScroll from "./ScopedSmoothScroll";

const VideoPlayer = memo(
  ({
    video,
    title,
    shouldAutoPlay = false,
    isHovered = false,
    isPriority = false,
  }: {
    video: string;
    title?: string;
    shouldAutoPlay?: boolean;
    isHovered?: boolean;
    isPriority?: boolean;
  }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, {
      once: true,
      margin: isPriority ? "500px" : "50px",
    });

    useEffect(() => {
      if (!videoRef.current || !isInView) return;

      if (shouldAutoPlay) {
        videoRef.current.play().catch(() => {});
        return;
      }

      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }, [isHovered, shouldAutoPlay, isInView]);

    const handleLoadedData = () => {
      if (videoRef.current && !shouldAutoPlay && videoRef.current.currentTime === 0) {
        videoRef.current.currentTime = 0.001;
      }
    };

    return (
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full bg-[#0c0c0c] group-hover:scale-105 transition-transform duration-700 ease-out"
      >
        <video
          ref={videoRef}
          src={shouldAutoPlay ? video : `${video}#t=0,5`}
          preload="auto"
          autoPlay={shouldAutoPlay}
          loop
          muted
          playsInline
          onLoadedData={handleLoadedData}
          className={`absolute inset-0 w-full h-full object-cover rounded-2xl pointer-events-none transition-opacity duration-500 ${isInView ? "opacity-100" : "opacity-0"}`}
          title={title}
        />
      </div>
    );
  },
);

export default function Projects() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  type Project = {
    id: number;
    title: string;
    description: string;
    fullDescription?: string;
    tag?: string;
    icon?: string;
    span?: string;
    delay?: string;
    video?: string;
    technologies?: string[];
    features?: {
      category: string;
      icon?: string;
      svgIcon?: string;
      items: string[];
    }[];
    screenshots?: string[];

    telegramLink?: string;
    repoLink?: string;
    useCDNImages?: boolean;
    isMinimal?: boolean;
    isArchive?: boolean;
    isLarge?: boolean;
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null);
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  // No static cardVariants needed now

  // Typewriter animation effect
  useEffect(() => {
    if (openDrawer !== "yousefdev") return;

    const fullText = "yousefdev |";
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseTime = 2000;

    const typewriterInterval = setInterval(
      () => {
        if (!isDeleting) {
          if (typewriterText.length < fullText.length) {
            setTypewriterText(fullText.slice(0, typewriterText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          if (typewriterText.length > 0) {
            setTypewriterText(fullText.slice(0, typewriterText.length - 1));
          } else {
            setIsDeleting(false);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearInterval(typewriterInterval);
  }, [openDrawer, typewriterText, isDeleting]);

  useEffect(() => {
    if (openDrawer) {
      document.body.classList.add("drawer-open");
    } else {
      // Delay removal slightly for a smoother transition if needed
      document.body.classList.remove("drawer-open");
    }

    if (openDrawer === "yousefdev") {
      setTypewriterText("");
      setIsDeleting(false);
    }
  }, [openDrawer]);

  // Cleaned up GSAP scroll reveal animations as requested

  const projectsData = [
    {
      id: 7,
      title: "Verdict",
      description: "The Ultimate Competitive Programming Platform.",
      fullDescription:
        "Solve Codeforces problems with a built-in IDE, Whiteboard, and Custom Judge—no more tab switching. Features Mirror Mode, Smart IDE, and Algorithm Visualization.",
      tag: "Competitive Programming",
      icon: "fa-gavel",
      span: "md:col-span-3 md:row-span-1", // Full width headliner
      delay: "delay-100",
      video: "/videos/verdict.webm", // User must provide this
      repoLink: "https://github.com/YUST777/verdict-community",
      technologies: ["Next.js 16", "TypeScript", "Puppeteer", "Monaco Editor", "Excalidraw"],
      features: [
        {
          category: "Core",
          svgIcon: "code",
          items: ["Mirror Mode", "Smart IDE", "Whiteboard Integration"],
        },
        {
          category: "Architecture",
          svgIcon: "server",
          items: ["Browser Extension", "Scraper Service", "Dockerized"],
        },
      ],
    },
    {
      id: 8,
      title: "Sast",
      description: "Autonomous AI Security Agent.",
      fullDescription:
        "An AI autonomous agent that fetches your web app, finds vulnerabilities, patches the code, and generates a verified report. Sast automates the full security lifecycle—identifying, fixing, and verifying vulnerabilities with functional POCs. It ensures your software is secured as fast as it is coded, delivering superior precision through total process optimization.",
      tag: "AI Security",
      icon: "fa-robot",
      span: "md:col-span-2 md:row-span-1",
      delay: "delay-150",
      video: "/videos/sast.webm",
      technologies: ["AI / LLMs", "Node.js", "Cybersecurity", "Autonomous Agents", "Docker"],
      features: [
        {
          category: "Automated Lifecycle",
          svgIcon: "bolt",
          items: ["Auto-Discovery", "Auto-Patching", "POC Generation"],
        },
        {
          category: "Integration",
          svgIcon: "globe",
          items: ["Web App Fetching", "Visual Reporting", "Fast Verification"],
        },
      ],
    },
    {
      id: 2,
      title: "Gifts Charts",
      description: "Real-time Telegram sticker & gift price tracking bot.",
      fullDescription:
        "A sophisticated Telegram bot for tracking live sticker prices and gift collections, featuring real-time data fetching, premium subscription systems, and automated image generation.",
      tag: "Automation",
      icon: "fa-robot",
      span: "md:col-span-1 md:row-span-1",
      delay: "delay-100",
      video: "/videos/giftscharts.webm",
      technologies: ["Python", "Telegram API", "Docker", "PostgreSQL", "Flask"],
      features: [
        {
          category: "Core Features",
          svgIcon: "chart",
          items: [
            "Live Price Tracking",
            "Premium Subscriptions",
            "Admin Dashboard",
            "Auto-Updates",
          ],
        },
        {
          category: "Architecture",
          svgIcon: "server",
          items: ["Microservices", "Docker Containerized", "Async Database", "CDN Service"],
        },
      ],
    },
    {
      id: 9,
      title: "Collectable Kit",
      description: "Next-gen collectibles management platform.",
      fullDescription:
        "A comprehensive platform designed for modern collectors. Track, value, and manage your digital and physical collections with real-time analytics and a sleek, high-performance interface.",
      tag: "Social",
      icon: "fa-box-open",
      span: "md:col-span-1 md:row-span-1",
      delay: "delay-200",
      video: "/videos/collectablekit.webm",
      technologies: ["Next.js", "PostgreSQL", "Tailwind CSS", "Lucide Icons"],
    },
    {
      id: 4,
      title: "ICPCHUE",
      description: "Hardened, sandboxed online judge platform.",
      fullDescription:
        "I led the development of ICPCHUE.XYZ, a comprehensive platform serving the community. Built with Next.js, featuring secure registration, gamified dashboards, and Skill trackers.",
      tag: "Platform",
      icon: "fa-code",
      span: "md:col-span-2 md:row-span-1",
      delay: "delay-100",
      video: "/videos/icpchue2.webm",
    },
    {
      id: 1,
      title: "Zero Threat",
      description: "National award-winning AI-driven security ecosystem.",
      fullDescription:
        "A comprehensive AI-powered cybersecurity suite comprising a web platform, browser extension, and Windows agent, designed for advanced threat intelligence and real-time protection.",
      tag: "Cybersecurity",
      icon: "fa-shield-alt",
      span: "md:col-span-2 md:row-span-1",
      delay: "delay-200",
      video: "/videos/zerothreat.webm",
    },
    {
      id: 5,
      title: "More Projects",
      description: "Additional projects and experiments",
      fullDescription:
        "Explore additional projects, experiments, and creative work showcasing various technologies and solutions.",
      icon: "fa-archive",
      span: "md:col-span-1 md:row-span-1",
      delay: "delay-200",
      isMinimal: true,
      isArchive: true,
      video: "/videos/moreprojects.webm",
      technologies: ["Various Technologies"],
    },
    {
      id: 6,
      title: "yousefdev",
      description: "Building practical solutions",
      fullDescription:
        "A developer focused on building practical tools and applications. Creating clean, well-architected solutions with a focus on user experience and impact.",
      tag: "",
      span: "md:col-span-3 md:row-span-1",
      delay: "delay-300",
      isLarge: true,
      video: "/videos/yousefdev.webm",
      technologies: ["Full-Stack Development", "Cybersecurity", "Automation"],
      features: [
        {
          category: "Services",
          svgIcon: "code",
          items: ["Web development", "Application development", "System design"],
        },
        {
          category: "Expertise",
          svgIcon: "lightbulb",
          items: ["Full-stack development", "Web applications", "Automation systems"],
        },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="pt-10 pb-20 md:pt-12 md:pb-32 bg-dark px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className="flex justify-end mb-8 md:mb-12 px-0 md:px-4"
        >
          <a
            href="https://github.com/YUST777"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 border border-white/20 px-8 py-3 rounded-full text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
          >
            <i className="fab fa-github text-lg"></i>
            View GitHub
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[350px] md:auto-rows-[450px]">
          {projectsData.map((project, index) => {
            // --- Large Card (e.g. YousefDev) ---
            if (project.isLarge) {
              return (
                <motion.div key={project.id} className={project.span}>
                  <BentoTilt
                    className={`rounded-2xl overflow-hidden relative group ${project.video === "/videos/yousefdev.webm" ? "cursor-default" : "cursor-pointer"} h-full`}
                  >
                    <motion.div
                      className="w-full h-full relative"
                      initial="idle"
                      whileHover="hover"
                      onMouseEnter={() => setHoveredVideoId(project.id)}
                      onMouseLeave={() => setHoveredVideoId(null)}
                    >
                      {project.video !== "/videos/yousefdev.webm" ? (
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setIsModalOpen(true);
                          }}
                          className="absolute inset-0 z-50 w-full h-full bg-transparent cursor-pointer"
                          aria-label={`View ${project.title || "project"} details`}
                        />
                      ) : null}
                      {project.video !== "/videos/yousefdev.webm" ? (
                        <motion.div
                          variants={{
                            idle: { scale: 0, opacity: 0 },
                            hover: { scale: 1, opacity: 1 },
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="absolute top-4 right-4 z-40 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                          <MousePointerClick className="w-6 h-6 text-black" strokeWidth={2.5} />
                        </motion.div>
                      ) : null}
                      <div className="w-full h-full bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                        {project.video ? (
                          <VideoPlayer
                            video={project.video}
                            title={project.title}
                            shouldAutoPlay={
                              project.video === "/videos/yousefdev.webm" ||
                              project.video === "/videos/moreprojects.webm"
                            }
                            isPriority={index < 2}
                            isHovered={hoveredVideoId === project.id}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black pointer-events-none" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                        {project.video && project.video !== "/videos/yousefdev.webm" ? (
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-500 pointer-events-none"></div>
                        ) : null}
                      </div>
                    </motion.div>
                  </BentoTilt>
                </motion.div>
              );
            }

            // --- Minimal Card (e.g. Archive) ---
            if (project.isMinimal) {
              return (
                <motion.div key={project.id} className={project.span}>
                  <BentoTilt
                    className={`rounded-2xl overflow-hidden relative group cursor-pointer bg-[#0c0c0c] border border-white/10 hover:border-white/30 shadow-2xl transition-all duration-300 h-full`}
                  >
                    <motion.div
                      className="w-full h-full relative"
                      initial="idle"
                      whileHover="hover"
                      onMouseEnter={() => setHoveredVideoId(project.id)}
                      onMouseLeave={() => setHoveredVideoId(null)}
                    >
                      <button
                        onClick={() => {
                          if (project.isArchive) {
                            void navigate({ to: "/projects" });
                            return;
                          }
                          setSelectedProject(project);
                          setIsModalOpen(true);
                        }}
                        className="absolute inset-0 z-50 w-full h-full bg-transparent cursor-pointer"
                        aria-label={`View ${project.title || "project"} details`}
                      />

                      {/* "Click Me" Hint Circle */}
                      <motion.div
                        variants={{
                          idle: { scale: 0, opacity: 0 },
                          hover: { scale: 1, opacity: 1 },
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute top-4 right-4 z-40 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      >
                        <i className="fas fa-hand-pointer text-xl"></i>
                      </motion.div>

                      <div className="relative w-full h-full">
                        {project.video ? (
                          <>
                            <VideoPlayer
                              video={project.video}
                              title={project.title}
                              shouldAutoPlay={
                                project.video === "/videos/yousefdev.webm" ||
                                project.video === "/videos/moreprojects.webm"
                              }
                              isPriority={index < 2}
                              isHovered={hoveredVideoId === project.id}
                            />
                            {project.video !== "/videos/moreprojects.webm" ? (
                              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-500 pointer-events-none"></div>
                            ) : null}
                          </>
                        ) : (
                          <div className="bg-[#0c0c0c] flex flex-col items-center justify-center h-full text-center p-4 border border-white/10 w-full h-full pointer-events-none">
                            <i
                              className={`fas ${project.icon} w-10 h-10 text-white/40 mb-4 group-hover:text-white/60 transition-colors`}
                            ></i>
                            <h3 className="text-lg md:text-base sm:text-lg md:text-xl font-display font-bold text-white">
                              {project.title}
                            </h3>
                            <p className="text-white/60 mt-2 text-[10px] md:text-xs uppercase tracking-widest">
                              {project.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </BentoTilt>
                </motion.div>
              );
            }

            // --- Standard Card (e.g. RetroOS, ICPCHUE) ---
            return (
              <motion.div key={project.id} className={project.span}>
                <BentoTilt
                  className={`rounded-2xl overflow-hidden relative group cursor-pointer h-full`}
                >
                  <motion.div
                    className="w-full h-full relative"
                    initial="idle"
                    whileHover="hover"
                    onMouseEnter={() => setHoveredVideoId(project.id)}
                    onMouseLeave={() => setHoveredVideoId(null)}
                  >
                    <button
                      onClick={() => {
                        if (project.video === "/videos/zerothreat.webm") {
                          setOpenDrawer("zerothreat");
                          return;
                        }
                        if (project.video === "/videos/giftscharts.webm") {
                          setOpenDrawer("giftsCharts");
                          return;
                        }
                        if (
                          project.video === "/videos/icpchue2.webm" ||
                          project.video === "/videos/ICPCHUE.webm"
                        ) {
                          setOpenDrawer("ICPCHUE");
                          return;
                        }
                        if (project.video === "/videos/yousefdev.webm") {
                          setOpenDrawer("yousefdev");
                          return;
                        }
                        if (project.video === "/videos/fazzah.webm") {
                          setOpenDrawer("fazzah");
                          return;
                        }
                        if (project.video === "/videos/panoblue.webm") {
                          setOpenDrawer("panoblue");
                          return;
                        }
                        if (project.video === "/videos/sast.webm") {
                          setOpenDrawer("sast");
                          return;
                        }
                        if (project.video === "/videos/collectablekit.webm") {
                          setOpenDrawer("collectablekit");
                          return;
                        }
                        if (project.video === "/videos/verdict.webm") {
                          setOpenDrawer("verdict");
                          return;
                        }
                        setSelectedProject(project);
                        setIsModalOpen(true);
                      }}
                      className="absolute inset-0 z-50 w-full h-full bg-transparent cursor-pointer"
                      aria-label={`View ${project.title || "project"} details`}
                    />
                    <motion.div
                      variants={{
                        idle: { scale: 0, opacity: 0 },
                        hover: { scale: 1, opacity: 1 },
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute top-4 right-4 z-40 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                      <MousePointerClick className="w-6 h-6 text-black" strokeWidth={2.5} />
                    </motion.div>
                    <div className="w-full h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                      {project.video ? (
                        <VideoPlayer
                          video={project.video}
                          title={project.title}
                          shouldAutoPlay={
                            project.video === "/videos/yousefdev.webm" ||
                            project.video === "/videos/moreprojects.webm"
                          }
                          isPriority={index < 2}
                          isHovered={hoveredVideoId === project.id}
                        />
                      ) : (
                        <i
                          className={`fas ${project.icon} text-8xl md:text-9xl text-white/20 group-hover:text-white/30 transition-colors duration-500`}
                        ></i>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                      {project.video ? (
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-500 pointer-events-none"></div>
                      ) : null}
                    </div>
                    <div className="absolute inset-0 bg-transparent group-hover:bg-transparent transition-all duration-500 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
                      {project.tag ? (
                        <div className="flex justify-between items-start">
                          <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/20 uppercase tracking-widest text-white shadow-lg">
                            {project.tag}
                          </span>
                        </div>
                      ) : null}
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl md:text-3xl font-display font-bold mb-1 text-white">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-xs md:text-sm font-light">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </BentoTilt>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="https://github.com/YUST777"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 px-8 py-3 rounded-full text-sm tracking-widest uppercase w-full inline-block hover:bg-white/10 transition-colors"
          >
            View GitHub
          </a>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
      />

      {/* Project Drawer */}
      <AnimatePresence>
        {openDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-[55] backdrop-blur-sm"
              onClick={() => setOpenDrawer(null)}
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
                  setOpenDrawer(null);
                }
              }}
              className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-3xl z-[60] bg-[#0c0c0c] border-t border-white/20 rounded-t-[2.5rem] px-4 sm:px-6 md:px-10 pb-[env(safe-area-inset-bottom,2rem)] mb-0 sm:pb-12 pt-2 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] max-h-[94vh] overflow-hidden flex flex-col pointer-events-auto shadow-2xl"
            >
              {/* Drag Handle - Click to close or Drag down */}
              <div
                className="w-12 h-1.5 bg-white/20 rounded-full mx-auto my-3 cursor-pointer hover:bg-white/30 transition-colors shrink-0"
                onClick={() => setOpenDrawer(null)}
              />
              <div className="flex items-start justify-between mb-4 sm:mb-6 flex-shrink-0 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400 truncate">
                    {openDrawer === "zerothreat" ? (
                      "Zero Threat"
                    ) : openDrawer === "giftsCharts" ? (
                      "Gifts Charts"
                    ) : openDrawer === "ICPCHUE" ? (
                      "ICPCHUE"
                    ) : openDrawer === "yousefdev" ? (
                      <span className="font-mono">
                        {typewriterText}
                        <span className="animate-pulse">|</span>
                      </span>
                    ) : openDrawer === "panoblue" ? (
                      "PanoBlue"
                    ) : openDrawer === "fazzah" ? (
                      "Fazzah"
                    ) : openDrawer === "verdict" ? (
                      "Verdict"
                    ) : openDrawer === "sast" ? (
                      "Sast"
                    ) : openDrawer === "collectablekit" ? (
                      "Collectable Kit"
                    ) : (
                      ""
                    )}
                  </p>
                  <h3 className="text-lg sm:text-xl md:text-3xl font-display font-black text-white leading-tight mt-1 break-words">
                    {openDrawer === "zerothreat"
                      ? "Zero Threat - Cybersecurity Website Project"
                      : openDrawer === "giftsCharts"
                        ? "Gifts Charts - Telegram Analytics Bot"
                        : openDrawer === "ICPCHUE"
                          ? "ICPCHUE - Creative Web Project"
                          : openDrawer === "yousefdev"
                            ? "yousefdev - Building Practical Solutions"
                            : openDrawer === "panoblue"
                              ? "PanoBlue - Panorama Viewer"
                              : openDrawer === "fazzah"
                                ? "Fazzah - Web Application"
                                : openDrawer === "verdict"
                                  ? "Verdict – Competitive Programming Platform"
                                  : openDrawer === "sast"
                                    ? "Sast – Autonomous AI Security Agent"
                                    : openDrawer === "collectablekit"
                                      ? "Collectable Kit – Management Platform"
                                      : ""}
                  </h3>
                </div>
                <button
                  onClick={() => setOpenDrawer(null)}
                  className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center shrink-0"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ScopedSmoothScroll className="overflow-y-auto flex-1 pr-2 space-y-6 custom-scrollbar touch-pan-y pb-24 sm:pb-4">
                {/* Video Hero */}
                {openDrawer ? (
                  <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/5 mb-6 flex-shrink-0 relative">
                    {openDrawer === "ICPCHUE" ? (
                      <iframe
                        src="https://www.youtube.com/embed/tH--wuGCMuM?autoplay=1&mute=1&loop=1&playlist=tH--wuGCMuM"
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={
                          openDrawer === "zerothreat"
                            ? "/videos/zerothreat.webm"
                            : openDrawer === "giftsCharts"
                              ? "/videos/giftscharts.webm"
                              : openDrawer === "yousefdev"
                                ? "/videos/yousefdev.webm"
                                : openDrawer === "panoblue"
                                  ? "/videos/panoblue.webm"
                                  : openDrawer === "fazzah"
                                    ? "/videos/fazzah.webm"
                                    : openDrawer === "verdict"
                                      ? "/videos/verdict.webm"
                                      : openDrawer === "sast"
                                        ? "/videos/sast.webm"
                                        : openDrawer === "collectablekit"
                                          ? "/videos/collectablekit.webm"
                                          : ""
                        }
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        title={`${openDrawer} detailed showcase video`}
                      />
                    )}
                  </div>
                ) : null}

                {/* Dynamic Content Based on Project */}
                {openDrawer === "zerothreat" ? (
                  <>
                    {/* Header */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
                        Zero Threat – AI-Driven Cybersecurity Suite
                      </h4>
                      <p className="text-[12px] sm:text-sm text-gray-400">
                        <i className="fas fa-calendar-alt mr-2"></i>August 1 – August 28, 2025
                      </p>
                      <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
                        <i className="fas fa-trophy mr-2"></i>3rd Place at the National Student
                        Forum (Al-Multaqy Al-Qammy), Tanta University
                      </p>
                      <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
                        Role: Lead Web Developer & UI/UX Designer
                      </p>
                    </div>

                    {/* The Achievement */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-trophy mr-2"></i>The Achievement
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        This project secured 3rd place in a national competition featuring{" "}
                        <strong className="text-white">20 universities from across Egypt</strong>.
                        As freshmen from a private university, my team competed against and
                        outperformed 4th and 5th-year Engineering and Computer Science seniors. Our
                        project was evaluated and commended by the Dean of Computer Science and a
                        Professor of Cybersecurity at Tanta University.
                      </p>
                    </div>

                    {/* The Solution */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-lightbulb mr-2"></i>The Solution
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        Zero Threat is a comprehensive security ecosystem combining a web platform,
                        a browser extension, and a Windows application.
                      </p>
                    </div>

                    {/* My Contribution */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-globe mr-2"></i>My Contribution (The Web Platform)
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed mb-4">
                        I led the development of the web interface using Next.js and React, focusing
                        on a high-performance UI with smooth animations. Key features I implemented
                        include:
                      </p>
                      <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
                        <li>
                          <strong className="text-white">Universal File Scanner:</strong> An
                          integrated tool to scan various file types (ZIP, PNG, MP4) for hidden
                          malware.
                        </li>
                        <li>
                          <strong className="text-white">Web Security Tools:</strong> Built-in
                          developer tools for open port scanning and vulnerability assessment
                          (similar to OWASP ZAP).
                        </li>
                        <li>
                          <strong className="text-white">Browser Extension:</strong> A companion
                          extension to ensure safe downloads in real-time.
                        </li>
                      </ul>
                    </div>

                    {/* The Windows Agent */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-desktop mr-2"></i>The Windows Agent
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        Developed by my teammate Abdelrahman Mohsen, the desktop client utilizes the
                        YARA protocol and AI integration. In our benchmarks, it achieved a{" "}
                        <strong className="text-white">90% detection rate</strong> across 90 test
                        subjects, outperforming many traditional signature-based antivirus
                        solutions.
                      </p>
                    </div>

                    {/* Official Documentation */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-file-alt mr-2"></i>Official Documentation
                      </h4>
                      <p className="text-[12px] sm:text-sm text-gray-400 mb-4">
                        Official posts from Tanta University and Horus University:
                      </p>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <a
                            href="https://www.facebook.com/share/p/1DAW9yMMH1/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                          >
                            <i className="fab fa-facebook"></i> Horus University Official Post
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.facebook.com/share/p/1XakrE3nLE/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                          >
                            <i className="fab fa-facebook"></i> Tanta University Official Post
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.facebook.com/share/v/1HBLEF92ep/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                          >
                            <i className="fab fa-facebook"></i> Award Ceremony Video (2:13)
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Visit Project Button */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <a
                        href="https://zerothreat.yousefdev.xyz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        <span>Visit Zero Threat</span>
                        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                  </>
                ) : null}

                {openDrawer === "giftsCharts" ? (
                  <>
                    {/* Header */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
                        Gifts Charts – Telegram Analytics Bot
                      </h4>
                      <p className="text-[12px] sm:text-sm text-gray-400">
                        <i className="fas fa-robot mr-2"></i>Live Sticker & Gift Price Tracker
                      </p>
                      <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
                        Status: <span className="text-green-400 font-bold">Live & Active</span>
                      </p>
                    </div>

                    {/* Overview */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-bullseye mr-2"></i>The Purpose
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        Telegrams digital asset market is moving fast.{" "}
                        <strong className="text-white">Gifts Charts</strong> bridges the gap between
                        chaos and clarity by providing real-time price tracking for Stickers and
                        unique Gifts. It empowers traders and collectors with instant data, helping
                        them make informed decisions on the fly.
                      </p>
                    </div>

                    {/* The Cool Stuff */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-fire mr-2"></i>What Makes It Cool?
                      </h4>
                      <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
                        <li className="flex gap-3">
                          <i className="fas fa-bolt text-yellow-400 mt-1"></i>
                          <div>
                            <strong className="text-white block">Real-Time Market Pulse</strong>
                            Connected directly to public APIs, it monitors price fluctuations 24/7.
                            No more guessing—users get the exact floor price in both USD and TON
                            instantly.
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <i className="fas fa-image text-purple-400 mt-1"></i>
                          <div>
                            <strong className="text-white block">Auto-Generated Visuals</strong>
                            Instead of boring text lists, the bot generates{" "}
                            <strong className="text-white">
                              beautiful, shareable price cards
                            </strong>{" "}
                            on demand using a custom image processing engine. Perfect for sharing in
                            trading groups.
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <i className="fas fa-gem text-blue-400 mt-1"></i>
                          <div>
                            <strong className="text-white block">Built-in Economy</strong>
                            Includes a fully functional <strong>Premium Subscription</strong>{" "}
                            system. Users can pay via Telegram Stars to unlock exclusive signals,
                            "Goodies" tracking, and ad-free experiences.
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Technical Highlights */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-code-branch mr-2"></i>Under The Hood
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed mb-3">
                        Built for speed and reliability using a microservice architecture:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Python 3.11",
                          "Async Orchestration",
                          "Docker",
                          "PostgreSQL",
                          "Image Processing",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-white/10 rounded-md text-[10px] text-white border border-white/10 uppercase tracking-tighter"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <div className="flex flex-col gap-3">
                        <a
                          href="https://t.me/giftsChartBot"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#24A1DE] hover:bg-[#208bbd] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/20"
                        >
                          <span>Start Bot</span>
                          <i className="fab fa-telegram-plane group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"></i>
                        </a>
                        <a
                          href="https://github.com/YUST777/Giftschart"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-white/10 text-white hover:bg-white/20 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group border border-white/10"
                        >
                          <i className="fab fa-github text-xl"></i>
                          <span>View Source on GitHub</span>
                          <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform opacity-50 text-xs"></i>
                        </a>
                      </div>
                    </div>
                  </>
                ) : null}

                {openDrawer === "verdict" ? (
                  <>
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
                        Verdict – Competitive Programming Platform
                      </h4>
                      <p className="text-[12px] sm:text-sm text-gray-400">
                        <i className="fas fa-code-branch mr-2"></i>Founder & Lead Engineer
                      </p>
                      <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
                        Status: <span className="text-green-400 font-bold">Live Beta</span>
                      </p>
                    </div>

                    {/* The Problem */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-exclamation-triangle mr-2"></i>The Problem
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        Codeforces' old UI sucks, so I made <a href="https://verdict.run" className="text-white underline underline-offset-4 decoration-white/30">verdict.run</a>—a Codeforces mirror tool.
                      </p>
                    </div>

                    {/* How it Works */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-magic mr-2"></i>How It Works?
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        You just change the <code className="bg-white/10 px-1 rounded text-white">.com</code> in <code className="bg-white/10 px-1 rounded text-white">codeforces.com</code> to <code className="bg-white/10 px-1 rounded text-white">verdict.run</code> so it becomes <code className="bg-white/10 px-1 rounded text-white">codeforces.verdict.run</code> on any problem page.
                      </p>
                    </div>

                    {/* Capabilities */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-layer-group mr-2"></i>What does it provide?
                      </h4>
                      <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
                        <li>
                          <strong className="text-white">LeetCode UI:</strong> Problem statement on the left, code editor on the right.
                        </li>
                        <li>
                          <strong className="text-white">Full Compiler:</strong> Using Judge0 to test your solution before submitting to Codeforces.
                        </li>
                        <li>
                          <strong className="text-white">Whiteboard Integrated:</strong> Fully integrated whiteboard using Excalidraw for visualizing algorithms.
                        </li>
                        <li>
                          <strong className="text-white">Extension Submissions:</strong> Submit to Codeforces using our custom extension supported by scraping.
                        </li>
                        <li>
                          <strong className="text-white">AI Teaching & Video Gen:</strong> Full AI features like MCP to teach you the problem + video generation to explain the problem using Remotion.
                        </li>
                        <li>
                          <strong className="text-white">Analytics & History:</strong> Full analytics, history, and personal notes for every solve.
                        </li>
                      </ul>
                    </div>

                    {/* Results/Stats */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-trophy mr-2"></i>What I'm Proud Of
                      </h4>
                      <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
                        <li>
                          It got <strong className="text-white">120k impressions</strong> on LinkedIn.
                        </li>
                        <li>
                          It has <strong className="text-white">500 users</strong> with <strong className="text-white">100 DAU</strong>.
                        </li>
                        <li>
                          I built the entire <strong className="text-white">Backend, Frontend, and DevOps</strong> solo.
                        </li>
                      </ul>
                    </div>

                    {/* Lessons */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-lightbulb mr-2"></i>What I've Learned
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {["Advanced Scraping", "Cloudflare Bypass", "LaTeX", "UX Design"].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white border border-white/20 uppercase tracking-widest">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        I mastered advanced scraping and how to bypass Cloudflare Captchas. I also realized how critically important UX is for developers.
                      </p>
                    </div>

                    {/* The Hardest Part */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-brain mr-2"></i>The Hardest Technical Challenge
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed italic">
                        "Making the Verdict-to-Codeforces submission pipeline was insane. I built an extension that captures the user's Codeforces cookie and sends it to our backend. The backend then spins up a Server-Side Rendered Chromium engine via Playwright, opens a tab, signs in with the stolen cookie, navigates to the problem, chooses the language, submits the code, bypasses the captchas with automation, and brings the verdict back to our UI instantly."
                      </p>
                    </div>

                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <div className="flex flex-col gap-3">
                        <a
                          href="https://verdict.run"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                          <span>Visit Verdict.run</span>
                          <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                        </a>
                        <a
                          href="https://github.com/YUST777/verdict-community"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-white/10 text-white hover:bg-white/20 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group border border-white/10"
                        >
                          <span>View on GitHub</span>
                          <i className="fab fa-github group-hover:scale-110 transition-transform"></i>
                        </a>
                      </div>
                    </div>
                  </>
                ) : null}

                {openDrawer === "ICPCHUE" ? (
                  <>
                    {/* Header */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
                        <i className="fas fa-rocket mr-2"></i>Project: ICPC HUE Ecosystem
                      </h4>
                      <p className="text-[12px] sm:text-sm text-gray-400 font-bold">
                        Role: Lead Software & Security Engineer
                      </p>
                      <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
                        Status: <span className="text-green-400 font-bold">Deployed & Scaling</span>
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Next.js 16", "React 19", "PostgreSQL", "Docker", "Secure Arch"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-white/10 rounded-md text-[10px] text-white border border-white/10 uppercase tracking-tighter"
                            >
                              {tech}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    {/* The Vision */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-bullseye mr-2"></i>The Vision
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        We didn't just want another landing page. We built{" "}
                        <strong className="text-white">ICPC HUE</strong> to be the beating heart of
                        competitive programming at Horus University. It's a fully integrated
                        ecosystem that handles everything from recruitment and training to secure,
                        real-time code execution.
                      </p>
                    </div>

                    {/* Why It's Next Level */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-fire mr-2"></i>Why It's Next Level
                      </h4>
                      <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
                        <li className="flex gap-3">
                          <i className="fas fa-shield-alt text-green-400 mt-1"></i>
                          <div>
                            <strong className="text-white block">Fortress-Grade Security</strong>
                            Achieved an{" "}
                            <strong className="text-white">A+ Rating on SSL Labs</strong> through a
                            Defense-in-Depth strategy. We utilize Zero-Trust Auth, Cloudflare WAF,
                            and strict Content Security Policies to keep student data safe.
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <i className="fas fa-gavel text-orange-400 mt-1"></i>
                          <div>
                            <strong className="text-white block">The "Judge" Engine</strong>
                            A custom-built, sandboxed execution engine. Every line of student code
                            runs in an isolated, network-gapped Docker container with strict
                            resource limits—preventing Cheating and DoS attacks while delivering
                            sub-second grading.
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <i className="fas fa-bolt text-yellow-400 mt-1"></i>
                          <div>
                            <strong className="text-white block">Performance First</strong>
                            Despite the heavy logic, the platform loads in{" "}
                            <strong className="text-white">under 1.4 seconds</strong>. We optimized
                            everything from database queries to WebM background assets to ensure a
                            snappy experience.
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Impact Stats */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-chart-line mr-2"></i>Real World Impact
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                            Performance
                          </p>
                          <p className="text-lg font-display font-bold text-white">1,395ms</p>
                          <p className="text-[10px] text-gray-400">Avg Load Time</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                            Adoption
                          </p>
                          <p className="text-lg font-display font-bold text-white">300+</p>
                          <p className="text-[10px] text-gray-400">Reg in 48h</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                            Reach
                          </p>
                          <p className="text-lg font-display font-bold text-white">3,840+</p>
                          <p className="text-[10px] text-gray-400">Monthly Views</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                            Scale
                          </p>
                          <p className="text-lg font-display font-bold text-white">26+</p>
                          <p className="text-[10px] text-gray-400">Problems Hosted</p>
                        </div>
                      </div>
                    </div>

                    {/* Visit Project Button */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <a
                        href="https://icpchue.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-white/10"
                      >
                        <span>Visit ICPCHUE</span>
                        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                  </>
                ) : null}

                {openDrawer === "yousefdev" ? (
                  <>
                    {/* Description */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        About Project
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        A developer focused on building practical tools and applications. Creating
                        clean, well-architected solutions with a focus on user experience and
                        impact.
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-tools mr-2"></i>Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Full-Stack Development", "Cybersecurity", "Automation"].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-star mr-2"></i>Services
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-bold text-white/80 mb-2">
                            <i className="fas fa-code mr-2"></i>Services
                          </h5>
                          <ul className="space-y-1 text-[13px] sm:text-sm text-gray-300">
                            <li>• Web development</li>
                            <li>• Application development</li>
                            <li>• System design</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white/80 mb-2">
                            <i className="fas fa-bullseye mr-2"></i>Expertise
                          </h5>
                          <ul className="space-y-1 text-[13px] sm:text-sm text-gray-300">
                            <li>• Full-stack development</li>
                            <li>• Web applications</li>
                            <li>• Automation systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {openDrawer === "panoblue" ? (
                  <>
                    {/* Header */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
                        PanoBlue – Import/Export Corporate Platform
                      </h4>
                      <p className="text-[12px] sm:text-sm text-gray-400">
                        Role: Frontend Developer & UI Designer
                      </p>
                    </div>

                    {/* Overview */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-info-circle mr-2"></i>Overview
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        PanoBlue is an established import/export company that needed to modernize
                        its digital presence to compete in the international market. The client
                        required a shift away from restrictive WordPress templates to a fully
                        custom, unique web solution.
                      </p>
                    </div>

                    {/* Key Contributions */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-tools mr-2"></i>Key Contributions
                      </h4>
                      <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
                        <li>
                          <strong className="text-white">Custom Architecture:</strong> Migrated the
                          client from a generic template to a bespoke codebase, allowing for
                          limitless customization and improved performance.
                        </li>
                        <li>
                          <strong className="text-white">Interactive UI:</strong> Implemented
                          advanced animations and interactivity to create a premium user experience
                          that reflects the company's market standing.
                        </li>
                        <li>
                          <strong className="text-white">Market-Ready:</strong> Delivered a
                          polished, production-ready site that currently serves real customers and
                          facilitates actual business operations.
                        </li>
                      </ul>
                    </div>

                    {/* Visit Project Button */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <a
                        href="https://panoblue.yousefdev.xyz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        <span>Visit PanoBlue</span>
                        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                  </>
                ) : null}


                {openDrawer === "sast" ? (
                  <>
                    {/* Header */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
                        Sast – Autonomous AI Security Agent
                      </h4>
                      <p className="text-[12px] sm:text-sm text-gray-400">
                        <i className="fas fa-code-branch mr-2"></i>Lead Web Architect
                      </p>
                      <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
                        Status: <span className="text-yellow-400 font-bold">2x Hackathon Winner 🏆</span>
                      </p>
                    </div>

                    {/* The Problem */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-exclamation-triangle mr-2"></i>The Problem
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed font-medium">
                        "Code is being generated instantly by AI, but security is still stuck in a slow, manual process. That gap is where hackers win."
                      </p>
                    </div>

                    {/* How it Works */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-cogs mr-2"></i>How It Works?
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        You feed it your repository or source code, and Sast spins up <strong className="text-white underline decoration-white/30">10 autonomous agents</strong>. Each one has a specific job—they scan your app fully, identify flaws, and then actually patch the code.
                      </p>
                    </div>

                    {/* Capabilities */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-layer-group mr-2"></i>What does it provide?
                      </h4>
                      <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
                        <li>
                          <strong className="text-white font-display">Autonomous Security:</strong> An agent that fetches your app, detects vulnerabilities, and fixes them—instantly.
                        </li>
                        <li>
                          <strong className="text-white font-display">Built-in IDE:</strong> Review and merge patches in a integrated development environment.
                        </li>
                        <li>
                          <strong className="text-white font-display">AI Vulnerability Search:</strong> Deep-level security search combined with automated code patching.
                        </li>
                      </ul>
                    </div>

                    {/* Wins/Stat */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-trophy mr-2"></i>What I'm Proud Of
                      </h4>
                      <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
                        <li>
                          We won <strong className="text-white">2 major hackathons</strong> with this, earning <strong className="text-green-400 font-bold">70,000 EGP</strong> in prizes.
                        </li>
                        <li>
                          I designed and built the entire high-end <a href="https://sast.tech" className="text-white underline underline-offset-4 decoration-white/30">sast.tech</a> website solo (my friend built the core app).
                        </li>
                      </ul>
                    </div>

                    {/* Business Logic */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-hand-holding-usd mr-2"></i>Business & Sustainability
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed mb-4">
                        The harsh reality I learned is that college projects focus only on tech—but if a project can't make $5 to cover its own server, it's just a hobby. My project "Collectable Kit" had cool UI and tech, but it failed the money test.
                      </p>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed italic border-l-2 border-green-500/50 pl-4 py-1">
                        "When we joined the GDG Delta Hackathon, our first question wasn't 'Which tech stack?' but 'How to sell this?'. We priced it at 200 EGP because my friend found a vulnerability in an IDE that gave us free API access, making the project profitable from day one."
                      </p>
                    </div>

                    {/* Lessons */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-lightbulb mr-2"></i>What I’ve Learned
                      </h4>
                      <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
                        <li>
                          <strong className="text-white">Business Basics:</strong> How to build a product that customers actually pay for.
                        </li>
                        <li>
                          <strong className="text-white">Premium Design:</strong> Mastering high-end technical website aesthetics.
                        </li>
                      </ul>
                    </div>

                    {/* The Hardest Part */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-brain mr-2"></i>The Hardest Technical Challenge
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed italic border-l-2 border-white/20 pl-4 py-1">
                        "The hardest part was making the UI look truly premium and clean while linking everything to Supabase. I integrated MCP (Model Context Protocol) to create a 'real' and secure login system that felt seamless with the rest of the application's clean design."
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <a
                        href="https://sast.tech"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                      >
                        <span>Visit Sast.tech</span>
                        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                  </>
                ) : null}


                {openDrawer === "collectablekit" ? (
                  <>
                    {/* Header */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
                        Collectable Kit – Next-Gen Management
                      </h4>
                      <p className="text-[12px] sm:text-sm text-gray-400">
                        Role: Lead Product Designer & Frontend Developer
                      </p>
                    </div>

                    {/* Overview */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-box-open mr-2"></i>The Platform
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        Collectable Kit is a comprehensive platform designed for modern collectors. It allows users to track, value, and manage their digital and physical collections with real-time analytics and a sleek, high-performance interface.
                      </p>
                    </div>

                    {/* Features */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-star mr-2"></i>Key Features
                      </h4>
                      <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
                        <li>
                          <strong className="text-white">Real-time Analytics:</strong> Stay updated on the value and rarity of your collection at all times.
                        </li>
                        <li>
                          <strong className="text-white">Unified Dashboard:</strong> Manage both digital assets (NFTs) and physical items in one place.
                        </li>
                        <li>
                          <strong className="text-white">Social Sharing:</strong> Showcase your rare finds and entire collections to the community with one click.
                        </li>
                      </ul>
                    </div>
                  </>
                ) : null}

                {openDrawer === "fazzah" ? (
                  <>
                    {/* Header */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
                        Fazzah – Streetwear E-Commerce Store
                      </h4>
                      <p className="text-[12px] sm:text-sm text-gray-400">
                        Role: Full-Stack Shopify Developer
                      </p>
                    </div>

                    {/* Overview */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-info-circle mr-2"></i>Overview
                      </h4>
                      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
                        Fazzah is a modern streetwear brand launched to capitalize on the rising
                        demand for high-quality hoodies and apparel. The client needed a
                        rapid-deployment e-commerce solution to enter the market quickly without
                        sacrificing quality.
                      </p>
                    </div>

                    {/* Key Contributions */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
                        <i className="fas fa-tools mr-2"></i>Key Contributions
                      </h4>
                      <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
                        <li>
                          <strong className="text-white">End-to-End Development:</strong> Built a
                          comprehensive landing page and storefront using the Shopify ecosystem.
                        </li>
                        <li>
                          <strong className="text-white">Logistics & Payments:</strong> Integrated a
                          secure payment gateway and set up a backend warehouse management system to
                          track inventory and orders.
                        </li>
                        <li>
                          <strong className="text-white">Brand Identity:</strong> Designed a clean,
                          minimalist GUI that highlights the products and aligns with current
                          streetwear aesthetics.
                        </li>
                      </ul>
                    </div>

                    {/* Visit Project Button */}
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
                      <a
                        href="https://fazzah.yousefdev.xyz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        <span>Visit Fazzah</span>
                        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                  </>
                ) : null}
              </ScopedSmoothScroll>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
