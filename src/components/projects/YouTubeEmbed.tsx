"use client";

import { useState } from "react";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  poster?: string;
};

export function YouTubeEmbed({ videoId, title, poster }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      className="group absolute inset-0 h-full w-full overflow-hidden bg-[#0c0c0c]"
      aria-label={`Play ${title}`}
    >
      {poster && (
        <img
          src={poster}
          alt={`${title} preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-70 transition-transform duration-300 group-hover:scale-[1.02]"
        />
      )}
      <span className="absolute inset-0 flex items-center justify-center bg-black/30">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/75 text-white shadow-2xl transition-transform group-hover:scale-105">
          <svg aria-hidden="true" className="ml-1 h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
