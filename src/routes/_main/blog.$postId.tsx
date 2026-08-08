import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { posts } from "./blog.index";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE_URL, blogPostingSchema, buildRouteHead, jsonLdString } from "@/lib/seo";

export const Route = createFileRoute("/_main/blog/$postId")({
  loader: ({ params }) => {
    const post = posts.find(
      (candidate) => candidate.slug === params.postId || candidate.id === params.postId,
    );
    if (!post) throw notFound();
    return post;
  },
  head: ({ params }) => {
    const post = posts.find(
      (candidate) => candidate.slug === params.postId || candidate.id === params.postId,
    );
    if (!post) {
      return buildRouteHead({
        title: "Post Not Found · yust.dev",
        description: "The requested blog post could not be found.",
        path: `/blog/${params.postId}`,
        noindex: true,
      });
    }
    const title = post.seoTitle;
    const image = post.images?.[0];
    const isoDateTime = `${post.iso}T12:00:00+00:00`;
    const base = buildRouteHead({
      title,
      description: post.summary,
      path: `/blog/${post.slug}`,
      type: "article",
      image: image ? `${SITE_URL}${image}` : undefined,
      publishedTime: isoDateTime,
      modifiedTime: `${post.modifiedIso ?? post.iso}T12:00:00+00:00`,
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
  const post = Route.useLoaderData();
  const relatedPosts = posts.filter((candidate) => candidate.slug !== post.slug).slice(0, 2);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 pb-32 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Breadcrumbs
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
        ]}
      />

      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-zinc-500 font-mono text-xs uppercase tracking-widest">
          <time dateTime={post.iso}>{post.date}</time>
          <span className="w-1 h-1 bg-zinc-800 rounded-full" />
          <span>Yousef Salah</span>
          {post.modifiedIso && post.modifiedDate && post.modifiedIso !== post.iso && (
            <>
              <span className="w-1 h-1 bg-zinc-800 rounded-full" />
              <span>
                Updated <time dateTime={post.modifiedIso}>{post.modifiedDate}</time>
              </span>
            </>
          )}
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

      <nav aria-labelledby="related-posts-heading" className="border-t border-white/5 pt-10">
        <h2 id="related-posts-heading" className="mb-5 text-xl font-semibold text-white">
          Related stories
        </h2>
        <ul className="space-y-3">
          {relatedPosts.map((relatedPost) => (
            <li key={relatedPost.slug}>
              <Link
                to="/blog/$postId"
                params={{ postId: relatedPost.slug }}
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/5 p-4 transition-colors hover:border-white/15 hover:bg-white/[0.02]"
              >
                <span className="text-sm text-zinc-300 group-hover:text-white">
                  {relatedPost.title}
                </span>
                <span aria-hidden="true" className="text-zinc-600 group-hover:text-zinc-300">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

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
    </article>
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
const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : direction < 0 ? -200 : 0,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : direction > 0 ? -200 : 0,
    opacity: 0,
    scale: 0.96,
  }),
};

function ImageCollage({ images, title }: { images: string[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  // Up to 3 thumbnails after the hero. Anything beyond is a "+N" overlay on the last visible thumb.
  const hero = images[0];
  const visibleThumbs = images.slice(1, 4);
  const overflow = Math.max(0, images.length - 4);
  const thumbCount = visibleThumbs.length;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setOpenIndex((i) => {
      if (i === null) return null;
      if (newDirection > 0) return (i + 1) % images.length;
      return (i - 1 + images.length) % images.length;
    });
  };

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      else if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
    }
    window.addEventListener("keydown", onKey);
    document.body.classList.add("drawer-open");
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("drawer-open");
      document.body.style.overflow = "";
    };
  }, [openIndex, images.length]);

  return (
    <>
      <div className="space-y-2 md:gap-3">
        <button
          type="button"
          onClick={() => {
            setDirection(0);
            setOpenIndex(0);
          }}
          className="block w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 h-[250px] md:h-[500px] cursor-zoom-in"
          aria-label={`Open ${title} image 1 in fullscreen`}
        >
          <img
            src={hero}
            alt={`${title} event photo 1`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
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
                  onClick={() => {
                    setDirection(0);
                    setOpenIndex(absoluteIndex);
                  }}
                  className="relative aspect-video overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 cursor-zoom-in group"
                  aria-label={
                    showOverlay
                      ? `Open gallery — ${overflow + 1} more photos`
                      : `Open ${title} image ${absoluteIndex + 1} in fullscreen`
                  }
                >
                  <img
                    src={img}
                    alt={`${title} event photo ${absoluteIndex + 1}`}
                    loading="lazy"
                    decoding="async"
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
          className="fixed inset-0 w-screen h-screen z-[9999] bg-black flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(null);
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-white text-zinc-400 hover:text-black border border-white/10 hover:border-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
            aria-label="Close gallery"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-zinc-900/80 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              className="absolute right-3 sm:left-auto sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-zinc-900/80 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Main Lightbox Content Box */}
          <div
            className="flex flex-col items-center justify-center max-w-5xl w-full h-full max-h-[85vh] gap-3 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 min-h-0 flex items-center justify-center w-full relative overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.img
                  key={openIndex}
                  src={images[openIndex]}
                  alt={`${title} event photo ${openIndex + 1}`}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 350, damping: 32 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                  }}
                  decoding="async"
                  className="max-w-full max-h-[70vh] sm:max-h-[75vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                />
              </AnimatePresence>
            </div>

            {/* Caption & Counter Bar (100% visible on screen) */}
            <div className="flex flex-col items-center gap-1 shrink-0 max-w-xl text-center px-4 pb-2">
              <span className="text-zinc-500 font-mono text-[11px] sm:text-xs tracking-widest uppercase">
                {openIndex + 1} / {images.length}
              </span>
              <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-snug line-clamp-2">
                {title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
