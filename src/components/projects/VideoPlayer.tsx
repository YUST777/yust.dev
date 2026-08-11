import { memo, useRef, useEffect, useState, useCallback } from "react";

export const VideoPlayer = memo(
  ({
    video,
    poster,
    title,
    shouldAutoPlay = false,
    isHovered = false,
    isPriority = false,
  }: {
    video: string;
    poster?: string;
    title?: string;
    shouldAutoPlay?: boolean;
    isHovered?: boolean;
    isPriority?: boolean;
  }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(shouldAutoPlay);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setIsInView(true);
          observer.disconnect();
        },
        { rootMargin: isPriority ? "500px" : "100px" },
      );

      observer.observe(container);
      return () => observer.disconnect();
    }, [isPriority]);

    // Only load the actual video src when the user hovers or it's autoplay
    useEffect(() => {
      if (shouldAutoPlay && isInView) {
        setShouldLoadVideo(true);
      }
    }, [shouldAutoPlay, isInView]);

    // On hover, trigger video load if not already loaded
    useEffect(() => {
      if (isHovered && isInView) {
        setShouldLoadVideo(true);
      }
    }, [isHovered, isInView]);

    // Play/pause logic
    useEffect(() => {
      if (!videoRef.current || !shouldLoadVideo || !videoLoaded) return;

      if (shouldAutoPlay) {
        videoRef.current.play().catch(() => {});
        return;
      }

      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }, [isHovered, shouldAutoPlay, shouldLoadVideo, videoLoaded]);

    const handleCanPlay = useCallback(() => {
      setVideoLoaded(true);
      if (videoRef.current && !shouldAutoPlay && videoRef.current.currentTime === 0) {
        videoRef.current.currentTime = 0.001;
      }
    }, [shouldAutoPlay]);

    return (
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full bg-[#0c0c0c] group-hover:scale-105 transition-transform duration-700 ease-out"
      >
        {/* Static poster image — instant paint, no video download needed */}
        {poster && (
          <img
            src={poster}
            alt={title || "Project preview"}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "auto"}
            decoding={isPriority ? "sync" : "async"}
            className={`absolute inset-0 w-full h-full object-cover rounded-2xl pointer-events-none transition-opacity duration-300 ${
              videoLoaded ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {/* Actual video element — only loads src when needed */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            src={video}
            preload="auto"
            autoPlay={shouldAutoPlay}
            loop
            muted
            playsInline
            onCanPlay={handleCanPlay}
            className={`absolute inset-0 w-full h-full object-cover rounded-2xl pointer-events-none transition-opacity duration-500 will-change-opacity ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            title={title}
          />
        )}
      </div>
    );
  },
);

VideoPlayer.displayName = "VideoPlayer";
