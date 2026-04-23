"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";
import gsap from "gsap";
import SvgIcon from "./SvgIcon";
import ScopedSmoothScroll from "./ScopedSmoothScroll";

// Sub-components for better performance and readability
const FeatureCard = memo(({ feature }: { feature: any }) => (
  <div className="bg-[#0c0c0c] rounded-xl p-4 sm:p-6 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all shadow-lg">
    <div className="flex items-center gap-3 mb-4">
      {feature.svgIcon ? (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
          <SvgIcon name={feature.svgIcon} />
        </div>
      ) : (
        <span className="text-3xl sm:text-4xl">{feature.icon}</span>
      )}
      <h3 className="text-lg sm:text-xl font-display font-bold text-white">{feature.category}</h3>
    </div>
    <ul className="space-y-2">
      {feature.items.map((item: string, itemIndex: number) => (
        <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-300">
          <span className="text-blue-400 mt-0.5">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
));

const TechnologyBadge = memo(({ tech }: { tech: string }) => (
  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm font-bold text-white shadow-md">
    {tech}
  </span>
));

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    description: string;
    fullDescription?: string;
    features?: {
      category: string;
      icon?: string;
      svgIcon?: string;
      items: string[];
    }[];
    screenshots?: string[];
    video?: string;
    telegramLink?: string;
    repoLink?: string;
    siteLink?: string;
    technologies?: string[];
    useCDNImages?: boolean;
  } | null;
}

const ProjectModal = memo(({ isOpen, onClose, project }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [cdnImages, setCdnImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const fetchCDNImages = useCallback(async () => {
    if (cdnImages.length > 0) return;

    setLoadingImages(true);
    try {
      const response = await fetch("/api/sticker-collections");
      const data = await response.json();
      if (data.collections) {
        const images = data.collections.map((col: { imageUrl: string }) => col.imageUrl);
        setCdnImages(images);
      }
    } catch (error) {
      console.error("Failed to fetch CDN images:", error);
    } finally {
      setLoadingImages(false);
    }
  }, [cdnImages.length]);

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Animate in
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );

      gsap.fromTo(
        contentRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 },
      );

      // Fetch CDN images if needed
      if (project?.useCDNImages) {
        void fetchCDNImages();
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, project, fetchCDNImages]);

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.1,
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 sm:p-4"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] bg-[#0c0c0c] border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Scrollable Content */}
        <ScopedSmoothScroll className="overflow-y-auto max-h-[95vh] sm:max-h-[90vh] custom-scrollbar">
          {/* Header with Video/Image */}
          <div className="relative h-48 sm:h-64 md:h-96 overflow-hidden">
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            {/* Telegram Link - At the top of header */}
            {project.telegramLink ? (
              <div className="absolute top-4 left-4 sm:top-6 sm:left-8">
                <a
                  href={`https://t.me/${project.telegramLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                  </svg>
                  {project.id === 2 ? "giftsChart" : "Open in Telegram"}
                </a>
              </div>
            ) : null}

            {/* Repo Link - Next to Telegram Link or alone */}
            {project.repoLink ? (
              <div
                className={`absolute top-4 ${project.telegramLink ? "left-auto right-4 sm:right-auto sm:left-[220px]" : "left-4"} sm:top-6 sm:left-8 z-20`}
              >
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full font-bold transition-all duration-300 hover:scale-105 text-sm sm:text-base pointer-events-auto"
                >
                  <i className="fab fa-github text-lg"></i>
                  View Repository
                </a>
              </div>
            ) : null}

            {/* Site Link */}
            {project.siteLink ? (
              <div
                className={`absolute top-4 ${
                  project.telegramLink || project.repoLink
                    ? "left-auto right-4 sm:right-auto sm:left-[430px]"
                    : "left-4"
                } sm:top-6 z-20`}
              >
                <a
                  href={project.siteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-md border border-blue-500/30 text-blue-400 rounded-full font-bold transition-all duration-300 hover:scale-105 text-sm sm:text-base pointer-events-auto"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Visit Website
                </a>
              </div>
            ) : null}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-black text-white mb-2 sm:mb-4">
                {project.title}
              </h2>
              <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-3xl">
                {project.fullDescription || project.description}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-8 md:p-12">
            {/* Features */}
            {project.features && project.features.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {project.features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} />
                ))}
              </div>
            ) : null}

            {/* Screenshots */}
            {(project.screenshots && project.screenshots.length > 0) ||
            (project.useCDNImages && cdnImages.length > 0) ? (
              <div className="mt-8 sm:mt-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-white">
                    <SvgIcon name="camera" />
                  </span>
                  {project.useCDNImages ? "Price Cards" : "Screenshots"}
                </h3>
                {loadingImages ? (
                  <div className="flex items-center justify-center py-8 sm:py-12">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                    {(project.useCDNImages ? cdnImages : project.screenshots || []).map(
                      (screenshot, index) => (
                        <div
                          key={index}
                          className="relative inline-block w-full hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                        >
                          <img
                            src={screenshot}
                            alt={`${project.useCDNImages ? "Price Card" : "Screenshot"} ${index + 1}`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto block rounded-lg sm:rounded-xl"
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "auto",
                            }}
                          />
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            ) : null}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 ? (
              <div className="mt-8 sm:mt-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-white">
                    <SvgIcon name="tools" />
                  </span>
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.technologies.map((tech, index) => (
                    <TechnologyBadge key={index} tech={tech} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </ScopedSmoothScroll>
      </div>
    </div>
  );
});

export default ProjectModal;
