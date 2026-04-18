import { memo, useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export const VideoPlayer = memo(
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

VideoPlayer.displayName = "VideoPlayer";
