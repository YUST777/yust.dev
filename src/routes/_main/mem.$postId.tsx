import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "./mem.index";

export const Route = createFileRoute("/_main/mem/$postId")({
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
          to="/mem"
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
        to="/mem"
        className="text-zinc-500 font-mono text-[11px] uppercase tracking-[0.2em] hover:text-zinc-300 transition-colors inline-flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to memorise
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

      {/* Flexible Image Collage */}
      {post.images && post.images.length > 0 && (
        <div className="space-y-2 md:gap-3">
          {/* Main Hero Image */}
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 w-full h-[250px] md:h-[500px]">
            <img
              src={post.images[0]}
              alt="Post hero"
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

          {/* Grid for remaining images */}
          {post.images.length > 1 && (
            <div
              className={`grid gap-2 md:gap-3 ${
                post.images.length === 2
                  ? "grid-cols-1"
                  : post.images.length === 3
                    ? "grid-cols-2"
                    : "grid-cols-3"
              }`}
            >
              {post.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="aspect-video overflow-hidden rounded-2xl border border-white/5 bg-zinc-900"
                >
                  <img
                    src={img}
                    alt={`Post image ${i + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
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
