"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScopedSmoothScroll from "./ScopedSmoothScroll";

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
    technologies?: string[];
    useCDNImages?: boolean;
  } | null;
}

// SVG Icon Component
const SvgIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactElement> = {
    wallet: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
          fill="currentColor"
        />
        <path
          d="M2.5 10.65V8.14001C2.5 6.65001 3.23 5.59 4.34 5.17C4.76 5.01 5.24 4.95001 5.74 4.95001H16.26C16.74 4.95001 17.21 5.01 17.61 5.15C18.73 5.56 19.5 6.63001 19.5 8.14001V10.65H6.26C4.19 10.65 2.5 12.34 2.5 14.41V10.65Z"
          fill="currentColor"
        />
        <path
          d="M22.559 13.97V16.03C22.559 16.58 22.119 17.03 21.559 17.05H19.599C18.519 17.05 17.529 16.26 17.439 15.18C17.379 14.55 17.619 13.96 18.039 13.55C18.409 13.17 18.919 12.95 19.479 12.95H21.559C22.119 12.97 22.559 13.42 22.559 13.97Z"
          fill="currentColor"
        />
      </svg>
    ),
    palette: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
          fill="currentColor"
        />
      </svg>
    ),
    "cup-star": (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.7197 2.51001L13.4297 4.03001C13.6497 4.52002 14.2997 4.99001 14.8397 5.08001L16.1997 5.31001C17.0997 5.46001 17.3197 6.14001 16.6797 6.78001L15.6097 7.85001C15.1897 8.27001 14.9597 9.07001 15.0897 9.65001L15.4297 10.95C15.7097 12.04 15.1297 12.49 14.1697 11.92L12.8997 11.19C12.3597 10.89 11.4997 10.89 10.9497 11.19L9.67969 11.92C8.72969 12.49 8.13969 12.03 8.41969 10.95L8.75969 9.65001C8.88969 9.07001 8.65969 8.27001 8.23969 7.85001L7.16969 6.78001C6.53969 6.15001 6.74969 5.47001 7.64969 5.31001L9.00969 5.08001C9.53969 4.99001 10.1897 4.52002 10.4097 4.03001L11.1197 2.51001C11.5397 1.66001 12.2997 1.66001 12.7197 2.51001Z"
          fill="currentColor"
        />
        <path
          d="M5.93945 17.8201C5.93945 18.2301 5.59945 18.5701 5.18945 18.5701C4.77945 18.5701 4.43945 18.2301 4.43945 17.8201C4.43945 17.4101 4.77945 17.0701 5.18945 17.0701C5.59945 17.0701 5.93945 17.4101 5.93945 17.8201Z"
          fill="currentColor"
        />
        <path
          d="M18.0605 17.8201C18.0605 18.2301 18.4005 18.5701 18.8105 18.5701C19.2205 18.5701 19.5605 18.2301 19.5605 17.8201C19.5605 17.4101 19.2205 17.0701 18.8105 17.0701C18.4005 17.0701 18.0605 17.4101 18.0605 17.8201Z"
          fill="currentColor"
        />
        <path
          d="M17 22H7C6.59 22 6.25 21.66 6.25 21.25C6.25 20.84 6.59 20.5 7 20.5H17C17.41 20.5 17.75 20.84 17.75 21.25C17.75 21.66 17.41 22 17 22Z"
          fill="currentColor"
        />
        <path
          d="M19.0195 14.6201C18.9995 14.6201 18.9795 14.6201 18.9495 14.6201H5.04945C4.63945 14.6101 4.31945 14.2701 4.32945 13.8601C4.44945 10.4901 6.48945 8.18005 9.36945 7.42005C9.76945 7.31005 10.1795 7.55005 10.2895 7.95005C10.3995 8.35005 10.1595 8.76005 9.75945 8.87005C7.55945 9.45005 5.99945 11.2601 5.82945 13.6201H18.1695C17.9995 11.2601 16.4395 9.45005 14.2395 8.87005C13.8395 8.76005 13.5995 8.34005 13.7095 7.95005C13.8195 7.55005 14.2295 7.31005 14.6295 7.42005C17.5095 8.18005 19.5495 10.4901 19.6695 13.8601C19.6795 14.2801 19.3495 14.6201 18.9395 14.6201C18.9295 14.6201 18.9295 14.6201 19.0195 14.6201Z"
          fill="currentColor"
        />
      </svg>
    ),
    "users-group-rounded": (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z"
          fill="currentColor"
        />
        <path
          d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11"
          fill="currentColor"
        />
        <path
          d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z"
          fill="currentColor"
        />
        <path
          d="M18.3401 20C19.0601 19.85 19.7401 19.56 20.3001 19.13C21.8601 17.96 21.8601 16.03 20.3001 14.86C19.7501 14.44 19.0801 14.16 18.3701 14"
          fill="currentColor"
        />
      </svg>
    ),
    gift: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.97 10H4.03C2.76 10 2 10.76 2 12.03V15.96C2 17.23 2.76 17.99 4.03 17.99H19.97C21.24 17.99 22 17.23 22 15.96V12.03C22 10.76 21.24 10 19.97 10Z"
          fill="currentColor"
        />
        <path
          d="M21.5 18.5V20C21.5 21.1 20.6 22 19.5 22H4.5C3.4 22 2.5 21.1 2.5 20V18.5H21.5Z"
          fill="currentColor"
        />
        <path
          d="M11.64 2.27001L10.62 4.31001C10.47 4.61001 10.02 4.89001 9.69 4.95001L7.87 5.26001C6.7 5.47001 6.42 6.33001 7.26 7.17001L8.67 8.58001C8.93 8.84001 9.08 9.41001 8.99 9.77001L8.56 11.52C8.19 13.04 8.93 13.64 10.27 12.88L11.98 11.86C12.31 11.66 12.84 11.66 13.17 11.86L14.88 12.88C16.22 13.64 16.96 13.03 16.59 11.52L16.16 9.77001C16.07 9.41001 16.22 8.84001 16.48 8.58001L17.89 7.17001C18.73 6.33001 18.45 5.47001 17.28 5.26001L15.46 4.95001C15.14 4.89001 14.69 4.61001 14.54 4.31001L13.52 2.27001C12.93 1.17001 12.23 1.17001 11.64 2.27001Z"
          fill="currentColor"
        />
      </svg>
    ),
    star: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.7299 3.51001L15.4899 7.03001C15.7299 7.52002 16.3699 7.99001 16.9099 8.08001L20.0999 8.61001C22.1399 8.95001 22.6199 10.43 21.1499 11.89L18.6699 14.37C18.2499 14.79 18.0199 15.6 18.1499 16.18L18.8599 19.25C19.4199 21.68 18.1299 22.62 15.9799 21.35L12.9899 19.58C12.4499 19.26 11.5599 19.26 11.0099 19.58L8.01991 21.35C5.87991 22.62 4.57991 21.67 5.13991 19.25L5.84991 16.18C5.97991 15.6 5.74991 14.79 5.32991 14.37L2.84991 11.89C1.38991 10.43 1.85991 8.95001 3.89991 8.61001L7.08991 8.08001C7.61991 7.99001 8.25991 7.52002 8.49991 7.03001L10.2599 3.51001C11.2199 1.60001 12.7799 1.60001 13.7299 3.51001Z"
          fill="currentColor"
        />
      </svg>
    ),
    "sticker-smile-square": (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM8.5 10.38C9.19 10.38 9.75 9.82 9.75 9.13C9.75 8.44 9.19 7.88 8.5 7.88C7.81 7.88 7.25 8.44 7.25 9.13C7.25 9.82 7.81 10.38 8.5 10.38ZM12 17.92C9.93 17.92 8.25 16.69 8.25 15.17C8.25 14.76 8.59 14.42 9 14.42C9.41 14.42 9.75 14.76 9.75 15.17C9.75 15.86 10.69 16.42 12 16.42C13.31 16.42 14.25 15.86 14.25 15.17C14.25 14.76 14.59 14.42 15 14.42C15.41 14.42 15.75 14.76 15.75 15.17C15.75 16.69 14.07 17.92 12 17.92ZM15.5 10.38C14.81 10.38 14.25 9.82 14.25 9.13C14.25 8.44 14.81 7.88 15.5 7.88C16.19 7.88 16.75 8.44 16.75 9.13C16.75 9.82 16.19 10.38 15.5 10.38Z"
          fill="currentColor"
        />
      </svg>
    ),
    chart: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 22H17C21 22 22 21 22 17V7C22 3 21 2 17 2H7C3 2 2 3 2 7V17C2 21 3 22 7 22Z"
          fill="currentColor"
        />
        <path d="M7.5 17.5V14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 17.5V11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16.5 17.5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    code: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 9V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z"
          fill="currentColor"
        />
        <path
          d="M8.5 15.5L5 12L8.5 8.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 8.5L19 12L15.5 15.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    lightbulb: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.29999 18.0399V16.8799C6.19999 15.4899 4.10999 12.7799 4.10999 9.89993C4.10999 4.94993 8.65999 1.06993 13.8 2.18993C16.06 2.68993 18.04 4.18993 19.07 6.25993C21.16 10.4599 18.96 14.9199 15.73 16.8699V18.0299C15.73 18.3199 15.84 18.9899 14.77 18.9899H9.25999C8.15999 18.9999 8.29999 18.5699 8.29999 18.0399Z"
          fill="currentColor"
        />
        <path
          d="M8.5 22C9.79 21.35 11.21 21 12.76 21C14.31 21 15.73 21.35 17.02 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    camera: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.62012 8.49C2.63012 8.49 1.82012 9.3 1.82012 10.29V17.53C1.82012 19.39 3.28012 20.85 5.14012 20.85H18.8601C20.7201 20.85 22.1801 19.39 22.1801 17.53V10.29C22.1801 9.3 21.3701 8.49 20.3801 8.49H18.2301C17.9501 8.49 17.6701 8.37 17.4801 8.15L15.7501 6.19C15.3601 5.71 14.7801 5.43 14.1601 5.43H9.84012C9.22012 5.43 8.64012 5.71 8.25012 6.19L6.52012 8.15C6.33012 8.37 6.05012 8.49 5.77012 8.49H3.62012Z"
          fill="currentColor"
        />
        <path
          d="M12.0001 10.18C10.1601 10.18 8.68012 11.66 8.68012 13.5C8.68012 15.34 10.1601 16.82 12.0001 16.82C13.8401 16.82 15.3201 15.34 15.3201 13.5C15.3201 11.66 13.8401 10.18 12.0001 10.18ZM12.0001 15.32C10.9901 15.32 10.1801 14.51 10.1801 13.5C10.1801 12.49 10.9901 11.68 12.0001 11.68C13.0101 11.68 13.8201 12.49 13.8201 13.5C13.8201 14.51 13.0101 15.32 12.0001 15.32Z"
          fill="currentColor"
        />
      </svg>
    ),
    tools: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.3201 5.36998C20.3201 5.36998 19.2801 4.27998 18.1501 5.14998L13.4701 8.52998C13.0701 8.82998 12.5101 8.82998 12.1101 8.52998L9.51012 6.59998C9.11012 6.29998 8.55012 6.29998 8.15012 6.59998L3.85012 9.59998C3.45012 9.89998 3.45012 10.46 3.85012 10.76L6.45012 12.69C6.85012 12.99 6.85012 13.55 6.45012 13.85L2.15012 16.85C1.75012 17.15 1.75012 17.71 2.15012 18.01L3.28012 18.88C4.41012 19.75 5.45012 18.66 5.45012 18.66L20.3201 5.36998Z"
          fill="currentColor"
        />
        <path
          d="M9.99988 15.38L8.61988 16.42C8.21988 16.72 7.65988 16.72 7.25988 16.42L4.65988 14.49C4.25988 14.19 4.25988 13.63 4.65988 13.33L5.99988 12.35L9.99988 15.38Z"
          fill="currentColor"
        />
        <path
          d="M18.8501 8.64001L17.4701 9.68001C17.0701 9.98001 16.5101 9.98001 16.1101 9.68001L13.5101 7.75001C13.1101 7.45001 13.1101 6.89001 13.5101 6.59001L14.8501 5.61001L18.8501 8.64001Z"
          fill="currentColor"
        />
        <path
          d="M21.9999 18.73C21.9999 19.46 21.4599 20.01 20.6999 20.01C19.9399 20.01 19.3999 19.46 19.3999 18.73C19.3999 18 19.9399 17.45 20.6999 17.45C21.4599 17.45 21.9999 18 21.9999 18.73Z"
          fill="currentColor"
        />
      </svg>
    ),
  };

  return icons[name] || null;
};

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [cdnImages, setCdnImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

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
        fetchCDNImages();
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, project]);

  const fetchCDNImages = async () => {
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
  };

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
                  <div
                    key={index}
                    className="bg-[#0c0c0c] rounded-xl p-4 sm:p-6 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {feature.svgIcon ? (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <SvgIcon name={feature.svgIcon} />
                        </div>
                      ) : (
                        <span className="text-3xl sm:text-4xl">{feature.icon}</span>
                      )}
                      <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                        {feature.category}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {feature.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-2 text-sm text-gray-300"
                        >
                          <span className="text-blue-400 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                    <span
                      key={index}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm font-bold text-white shadow-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </ScopedSmoothScroll>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
