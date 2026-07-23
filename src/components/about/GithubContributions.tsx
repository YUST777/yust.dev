import React, { useState, useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import { useIsHydrated } from "@/lib/hooks/use-is-hydrated";
import "react-tooltip/dist/react-tooltip.css";

const GITHUB_THEME = {
  dark: ["#18181b", "#3f3f46", "#71717a", "#e4e4e7", "#ffffff"],
};

export default function GithubContributions() {
  const [stars, setStars] = useState<number | null>(null);
  const isHydrated = useIsHydrated();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Enable smooth mouse wheel horizontal scrolling
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: true });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Auto-scroll focused around March (~45% of scrollWidth) on initial load on mobile/responsive
  useEffect(() => {
    if (!isHydrated) return;
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth * 0.45;
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [isHydrated]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchStars = async () => {
      try {
        const res = await fetch("https://api.github.com/users/YUST777/repos?per_page=100", {
          signal: controller.signal,
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setStars(data.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0));
        } else if (data && typeof data === "object" && "message" in data) {
          console.error("GitHub API error:", data.message);
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        console.error("Failed to fetch GitHub stars:", e);
      }
    };
    void fetchStars();
    return () => controller.abort();
  }, []);

  // Add 1 more month (~336 days / 11 months) to stretch and align perfectly with section width
  const selectRecentMonths = <T,>(data: Array<T>): Array<T> => {
    return data.slice(-336);
  };

  return (
    <section className="font-mono mt-16 pb-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-zinc-400 text-[13px] uppercase tracking-widest">Contributions</p>
        <span className="text-[10px] text-zinc-400 sm:hidden lowercase">Scroll / swipe for more →</span>
      </div>
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto pb-2 no-scrollbar cursor-grab active:cursor-grabbing"
      >
        <div className="w-full min-h-[150px] flex items-center justify-start no-scrollbar mobile-hide-total-count">
          {isHydrated ? (
            <GitHubCalendar
              username="YUST777"
              colorScheme="dark"
              theme={GITHUB_THEME}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              transformData={selectRecentMonths}
              labels={{
                totalCount: `{{count}} contributions in the last year • Total stars: ${stars !== null ? stars : "..."}`,
              }}
              renderBlock={(block, activity) =>
                React.cloneElement(
                  block as React.ReactElement<
                    React.SVGProps<SVGRectElement> & {
                      "data-tooltip-id"?: string;
                      "data-tooltip-html"?: string;
                    }
                  >,
                  {
                    "data-tooltip-id": "github-tooltip",
                    "data-tooltip-html": `<div class="text-xs text-center"><div class="font-bold text-white mb-0.5">${activity.date}</div><div class="text-zinc-400">${activity.count} contributions</div></div>`,
                  },
                )
              }
            />
          ) : (
            <div className="text-zinc-500 text-xs animate-pulse">Loading GitHub Activity...</div>
          )}
        </div>
      </div>
      {isHydrated && (
        <Tooltip
          id="github-tooltip"
          className="!bg-zinc-900 !border !border-white/10 !rounded-md"
        />
      )}
    </section>
  );
}
