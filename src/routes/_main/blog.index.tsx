import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { posts, type BlogPost } from "@/data/blog";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE_URL, buildRouteHead, jsonLdString, webPageSchema } from "@/lib/seo";

const TITLE = "Software, AI Security & Hackathon Stories | yust.dev";
const DESCRIPTION =
  "Yousef Mohammed Salah writes about AI security, software engineering, hackathons, and building for Egypt's ICPC community.";

const blogIndexSchema = webPageSchema({
  url: `${SITE_URL}/blog`,
  name: TITLE,
  description: DESCRIPTION,
  type: "CollectionPage",
  breadcrumbs: [
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
  ],
});

export const Route = createFileRoute("/_main/blog/")({
  head: () => {
    const base = buildRouteHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/blog",
      image: `${SITE_URL}/static/images/og-blog.png?v=2`,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLdString(blogIndexSchema),
        },
      ],
    };
  },
  component: BlogPage,
});

const CATEGORIES = [
  "All",
  "Software Engineering",
  "Hackathons",
  "AI & Security",
  "Community & ICPC",
  "SaaS & Marketing",
];

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredPost, setHoveredPost] = useState<BlogPost | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!previewRef.current) return;
      previewRef.current.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 120}px, 0)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredPosts =
    selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-44 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Breadcrumbs
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-pixel text-white uppercase">blog</h1>
        </div>

        {/* Category Filters */}
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
      </div>

      <div key={selectedCategory} className="space-y-0 animate-in fade-in duration-150">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="border-b border-white/10 group"
            onMouseEnter={() => setHoveredPost(post)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            <Link
              to="/blog/$postId"
              params={{ postId: post.slug }}
              className="flex flex-col py-8 group cursor-pointer relative z-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4 mb-2">
                <h2 className="text-zinc-200 group-hover:text-white transition-colors font-sans text-lg md:text-xl tracking-tight font-semibold">
                  {post.title}
                </h2>
                <time
                  dateTime={post.iso}
                  className="text-zinc-400 text-[11px] md:text-xs font-mono shrink-0 sm:ml-4 uppercase tracking-widest"
                >
                  {post.date}
                </time>
              </div>
              <p className="text-zinc-400 font-sans text-sm md:text-base line-clamp-2 max-w-3xl mt-1">
                {post.summary}
              </p>
            </Link>
          </article>
        ))}
      </div>

      {hoveredPost &&
        (hoveredPost.previewVideo || (hoveredPost.images && hoveredPost.images.length > 0)) && (
          <div
            ref={previewRef}
            className="fixed left-0 top-0 pointer-events-none z-50 hidden will-change-transform animate-in fade-in zoom-in-90 duration-150 md:block"
          >
            <div className="w-72 h-44 rounded-2xl overflow-hidden border border-white/20 bg-[#0c0c0c] shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
              {hoveredPost.previewVideo ? (
                <video
                  src={hoveredPost.previewVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={hoveredPost.previewImage}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={
                    hoveredPost.previewImage || (hoveredPost.images && hoveredPost.images[0]) || ""
                  }
                  alt={hoveredPost.title}
                  className={`w-full h-full object-cover ${hoveredPost.imagePosition || "object-center"}`}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-0.5">
                  {hoveredPost.category}
                </span>
                <p className="text-xs font-sans font-bold text-white truncate">
                  {hoveredPost.title}
                </p>
              </div>
            </div>
          </div>
        )}

      <div className="pt-4">
        <p className="text-zinc-400 text-[11px] font-mono uppercase tracking-[0.2em] hover:text-zinc-300 cursor-pointer transition-colors inline-block">
          [ Archived Posts ]
        </p>
      </div>
    </div>
  );
}
