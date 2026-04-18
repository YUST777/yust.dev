"use client";

import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import BentoTilt from "./BentoTilt";
import { VideoPlayer } from "./VideoPlayer";
import { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  isArchiveItem?: boolean;
}

export default function ProjectCard({
  project,
  index,
  isExpanded,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isArchiveItem = false,
}: ProjectCardProps) {
  const isArchiveTrigger = project.isArchive;

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  return (
    <motion.div
      layout
      key={project.id}
      className={project.span}
      initial={isArchiveItem ? "initial" : undefined}
      animate={isArchiveItem ? "animate" : undefined}
      exit={isArchiveItem ? "exit" : undefined}
      variants={containerVariants}
    >
      <BentoTilt
        className={`rounded-2xl overflow-hidden relative group cursor-pointer h-full ${
          project.isMinimal ? "bg-[#0c0c0c] border border-white/10 hover:border-white/30" : ""
        }`}
      >
        <motion.div
          className="w-full h-full relative"
          initial="idle"
          whileHover="hover"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <button
            onClick={onClick}
            className="absolute inset-0 z-50 w-full h-full bg-transparent cursor-pointer"
          />

          <motion.div
            variants={{ idle: { scale: 0, opacity: 0 }, hover: { scale: 1, opacity: 1 } }}
            className="absolute top-4 right-4 z-40 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {project.isMinimal ? (
              <i className="fas fa-hand-pointer text-xl"></i>
            ) : (
              <MousePointerClick className="w-6 h-6 text-black" strokeWidth={2.5} />
            )}
          </motion.div>

          <div className="w-full h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
            {project.video ? (
              <VideoPlayer
                video={project.video}
                title={project.title}
                isPriority={index < 2}
                isHovered={isHovered}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <i
                  className={`fas ${
                    isArchiveTrigger && isExpanded
                      ? "fa-minus-circle"
                      : project.icon || "fa-plus-circle"
                  } text-6xl text-white/40 mb-4 group-hover:text-white/60 transition-colors`}
                ></i>
                <h3 className="text-xl font-display font-bold text-white">
                  {isArchiveTrigger && isExpanded ? "Show Less" : project.title}
                </h3>
                <p className="text-white/60 mt-2 text-xs uppercase tracking-widest">
                  {isArchiveTrigger && isExpanded ? "Collapse Archive" : project.description}
                </p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            {project.video && (
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-500 pointer-events-none"></div>
            )}
          </div>

          {!project.isMinimal && (
            <div className="absolute inset-0 bg-transparent p-6 md:p-8 flex flex-col justify-between pointer-events-none text-left">
              {project.tag && (
                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/20 uppercase tracking-widest text-white w-fit">
                  {project.tag}
                </span>
              )}
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-1 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm font-light">
                  {project.description}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </BentoTilt>
    </motion.div>
  );
}
