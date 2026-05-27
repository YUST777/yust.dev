import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { posts } from "./blog.index";
import { SITE_URL, blogPostingSchema, buildRouteHead, jsonLdString } from "@/lib/seo";

export const Route = createFileRoute("/_main/blog/$postId")({
  head: ({ params }) => {
    const post = posts.find((p) => p.id === params.postId);
    if (!post) {
      return buildRouteHead({
        title: "Post Not Found | yust.dev — Yousef Mohammed Salah",
        description: "The requested blog post could not be found.",
        path: `/blog/${params.postId}`,
        noindex: true,
      });
    }
    const title = `${post.title} | yust.dev — Yousef Mohammed Salah`;
    const image = post.images?.[0];
    const isoDateTime = `${post.iso}T12:00:00+00:00`;
    const base = buildRouteHead({
      title,
      description: post.summary,
      path: `/blog/${post.id}`,
      type: "article",
      image: image ? `${SITE_URL}${image}` : undefined,
      publishedTime: isoDateTime,
      modifiedTime: isoDateTime,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLdString(blogPostingSchema(post)),
        },
      ],
    };
  },
  component: PostPage,
});

/**
 * A simple helper to parse basic markdown [links](url) and **bold** text.
 */
function parseContent(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const boldRegex = /\*\*([^*]+)\*\*/g;

  let lastIndex = 0;
  const elements = [];
  let match;

  const allMatches = [];
  while ((match = linkRegex.exec(text)) !== null) {
    allMatches.push({
      type: "link",
      start: match.index,
      end: match.index + match[0].length,
      text: match[1],
      url: match[2],
    });
  }
  while ((match = boldRegex.exec(text)) !== null) {
    allMatches.push({
      type: "bold",
      start: match.index,
      end: match.index + match[0].length,
      text: match[1],
    });
  }
  allMatches.sort((a, b) => a.start - b.start);

  allMatches.forEach((m, idx) => {
    if (m.start < lastIndex) return;

    if (m.start > lastIndex) {
      elements.push(text.substring(lastIndex, m.start));
    }

    if (m.type === "link") {
      elements.push(
        <a
          key={`link-${idx}`}
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline decoration-zinc-700 underline-offset-4 hover:text-zinc-300 transition-colors"
        >
          {m.text}
        </a>,
      );
    } else {
      elements.push(
        <strong key={`bold-${idx}`} className="text-white font-bold">
          {m.text}
        </strong>,
      );
    }
    lastIndex = m.end;
  });

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements;
}

function PostPage() {
  const { postId } = Route.useParams();
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 text-center">
        <h1 className="text-2xl font-pixel text-white mb-4">POST NOT FOUND</h1>
        <Link
          to="/blog"
          className="text-zinc-500 font-mono text-sm hover:text-white transition-colors"
        >
          [ GO BACK ]
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 pb-32 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <Link
        to="/blog"
        className="text-zinc-500 font-mono text-[11px] uppercase tracking-[0.2em] hover:text-zinc-300 transition-colors inline-flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to blog
      </Link>

      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-zinc-500 font-mono text-xs uppercase tracking-widest">
          <span>{post.date}</span>
          <span className="w-1 h-1 bg-zinc-800 rounded-full" />
          <span>Yousef Salah</span>
        </div>
      </div>

      <div className="h-[1px] w-full bg-zinc-900" />

      {/* LinkedIn-style image collage with overflow indicator */}
      {post.images && post.images.length > 0 && (
        <ImageCollage images={post.images} title={post.title} />
      )}

      <div className="prose prose-invert prose-zinc max-w-none space-y-6">
        {post.content.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-zinc-300 text-lg leading-relaxed font-sans">
            {parseContent(paragraph)}
          </p>
        ))}
      </div>

      {post.featured && post.featured.length > 0 && (
        <div className="pt-12 space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] whitespace-nowrap">
              Featured In
            </h2>
            <div className="h-[1px] w-full bg-zinc-900" />
          </div>
          <div className="grid gap-3">
            {post.featured.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-white/10 transition-all group"
              >
                <span className="text-zinc-300 font-sans text-sm group-hover:text-white transition-colors">
                  {item.label}
                </span>
                <svg
                  className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


/**
 * LinkedIn-style image collage:
 *  - 1 image: full-width hero
 *  - 2 images: hero + 1 thumb under it
 *  - 3 images: hero + 2 thumbs (50/50)
 *  - 4+ images: hero + 3 thumbs (33/33/33), last shows "+N" overlay
 *
 * Clicking any thumb opens a simple lightbox with prev/next/escape.
 */
function ImageCollage({ images, title }: { images: string[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Up to 3 thumbnails after the hero. Anything beyond is a "+N" overlay on the last visible thumb.
  const hero = images[0];
  const visibleThumbs = images.slice(1, 4);
  const overflow = Math.max(0, images.length - 4);
  const thumbCount = visibleThumbs.length;

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      else if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
      else if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, images.length]);

  return (
    <>
      <div className="space-y-2 md:gap-3">
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="block w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 h-[250px] md:h-[500px] cursor-zoom-in"
          aria-label={`Open ${title} image 1 in fullscreen`}
        >
          <img
            src={hero}
            alt={`${title} — hero`}
            loading="eager"
            className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
          />
        </button>

        {thumbCount > 0 && (
          <div
            className={`grid gap-2 md:gap-3 ${
              thumbCount === 1 ? "grid-cols-1" : thumbCount === 2 ? "grid-cols-2" : "grid-cols-3"
            }`}
          >
            {visibleThumbs.map((img, i) => {
              const absoluteIndex = i + 1;
              const isLastVisible = i === thumbCount - 1;
              const showOverlay = isLastVisible && overflow > 0;
              return (
                <button
                  key={img}
                  type="button"
                  onClick={() => setOpenIndex(absoluteIndex)}
                  className="relative aspect-video overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 cursor-zoom-in group"
                  aria-label={
                    showOverlay
                      ? `Open gallery — ${overflow + 1} more photos`
                      : `Open ${title} image ${absoluteIndex + 1} in fullscreen`
                  }
                >
                  <img
                    src={img}
                    alt={`${title} — image ${absoluteIndex + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {showOverlay && (
                    <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="text-white font-sans font-bold text-3xl md:text-5xl tracking-tight">
                        +{overflow + 1}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(null);
            }}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            aria-label="Close gallery"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) =>
                    i === null ? null : (i - 1 + images.length) % images.length,
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}

          <img
            src={images[openIndex]}
            alt={`${title} — image ${openIndex + 1}`}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-400 font-mono text-xs tracking-widest uppercase">
            {openIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
