import React, { useState, useEffect, lazy, Suspense } from "react";

const GitHubCalendar = lazy(() =>
  import("react-github-calendar").then((module) => ({ default: module.GitHubCalendar })),
);
const Tooltip = lazy(() => import("react-tooltip").then((module) => ({ default: module.Tooltip })));
import "react-tooltip/dist/react-tooltip.css";

const GITHUB_THEME = {
  dark: ["#18181b", "#27272a", "#3f3f46", "#52525b", "#71717a"],
};

export default function GithubContributions() {
  const [stars, setStars] = useState<number | null>(null);

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

  return (
    <section className="font-mono mt-16 pb-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-zinc-500 text-[13px] uppercase tracking-widest">Contributions</p>
        <span className="text-[9px] text-zinc-600 sm:hidden lowercase">Swipe to see more →</span>
      </div>
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar lg:overflow-visible">
        <div className="min-w-[800px] lg:min-w-0 overflow-hidden min-h-[150px] flex items-center justify-center">
          <Suspense
            fallback={
              <div className="text-zinc-500 text-xs animate-pulse">Loading GitHub Activity...</div>
            }
          >
            <GitHubCalendar
              username="YUST777"
              colorScheme="dark"
              theme={GITHUB_THEME}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
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
          </Suspense>
        </div>
      </div>
      <Suspense fallback={null}>
        <Tooltip
          id="github-tooltip"
          className="!bg-zinc-900 !border !border-white/10 !rounded-md"
        />
      </Suspense>
    </section>
  );
}
