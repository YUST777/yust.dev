import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

function GithubIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="2 2 20 20">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="3 3 18 18">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.74a1.6 1.6 0 0 0-1.6 1.6c0 .88.71 1.6 1.6 1.6.89 0 1.6-.72 1.6-1.6 0-.89-.71-1.6-1.6-1.6z" />
    </svg>
  );
}

function MailIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function CvIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 43.916 43.916" aria-hidden="true">
      <path d="M34.395,0H9.522c-2.762,0-5,2.239-5,5v33.916c0,2.761,2.238,5,5,5h24.871c2.762,0,5-2.239,5-5V5 C39.395,2.239,37.154,0,34.395,0z M9.208,16.855c0-1.172,0.951-2.121,2.121-2.121h0.742c-0.791-0.874-1.277-2.03-1.277-3.304 c0-2.723,2.209-4.931,4.932-4.931c2.725,0,4.932,2.207,4.932,4.932c0,1.272-0.486,2.429-1.279,3.303h0.709 c1.172,0,2.121,0.949,2.121,2.121v3.578c0,1.122-0.875,2.03-1.975,2.106h-9.051c-1.1-0.076-1.975-0.984-1.975-2.106V16.855 L9.208,16.855z M32.708,37.416h-21.5c-1.104,0-2-0.896-2-2s0.896-2,2-2h21.5c1.104,0,2,0.896,2,2S33.812,37.416,32.708,37.416z M32.708,29.916h-21.5c-1.104,0-2-0.896-2-2s0.896-2,2-2h21.5c1.104,0,2,0.896,2,2S33.812,29.916,32.708,29.916z M32.708,22.416 h-6.5c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2h6.5c1.104,0,2,0.896,2,2C34.708,21.52,33.812,22.416,32.708,22.416z" />
    </svg>
  );
}

type SocialPreview = "github" | "linkedin" | "cv";

type GithubContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type GithubContributions = {
  total: number;
  start: string;
  levels: string;
  counts: number[];
};

type GithubRepository = {
  fork: boolean;
  stargazers_count: number;
};

const AVATAR_URL = "https://avatars.githubusercontent.com/u/207382177?s=128&v=4";
const LINKEDIN_AVATAR_URL = "/static/images/yousef-profile.webp";
const GITHUB_API = "https://github-contributions-api.jogruber.de/v4";
const GITHUB_REPOSITORIES_API = "https://api.github.com/users/YUST777/repos?per_page=100";
const LINKEDIN_FOLLOWERS_FALLBACK = 1994;
const GITHUB_LEVEL_CLASSES = [
  "bg-zinc-800",
  "bg-green-400/20",
  "bg-green-400/40",
  "bg-green-400/65",
  "bg-green-400/90",
] as const;

type LinkedinStats = {
  followers: number;
  connections: string;
  source: string;
};

let githubContributionsCache: GithubContributions | undefined;
let githubContributionsRequest: Promise<GithubContributions> | undefined;
let githubStarsCache: number | undefined;
let githubStarsRequest: Promise<number> | undefined;
let linkedinStatsCache: LinkedinStats | undefined;
let linkedinStatsRequest: Promise<LinkedinStats | null> | undefined;

function getLinkedinFollowers() {
  linkedinStatsRequest ??= fetch("/api/linkedin-followers", {
    headers: { Accept: "application/json" },
  })
    .then(async (response) => {
      if (!response.ok) return null;
      const data = (await response.json()) as { followers?: unknown; connections?: unknown; source?: unknown };
      if (!Number.isSafeInteger(data.followers) || Number(data.followers) < 0) return null;
      linkedinStatsCache = {
        followers: Number(data.followers),
        connections: typeof data.connections === "string" ? data.connections : "500+",
        source: typeof data.source === "string" ? data.source : "unconfigured",
      };
      return linkedinStatsCache;
    })
    .catch(() => null);

  return linkedinStatsRequest;
}

function getGithubContributions() {
  githubContributionsRequest ??= fetch(`${GITHUB_API}/YUST777?y=last`)
    .then(async (response) => {
      if (!response.ok) throw new Error(`GitHub contributions responded with ${response.status}`);
      const data = (await response.json()) as {
        total: Record<string, number>;
        contributions: GithubContributionDay[];
      };
      const days = data.contributions;
      const contributions = {
        total: data.total.lastYear ?? 0,
        start: days[0]?.date ?? "",
        levels: days.map((day) => day.level).join(""),
        counts: days.map((day) => day.count),
      };
      githubContributionsCache = contributions;
      return contributions;
    })
    .catch((error: unknown) => {
      githubContributionsRequest = undefined;
      throw error;
    });

  return githubContributionsRequest;
}

function getGithubProjectStars() {
  githubStarsRequest ??= (async () => {
    let nextPage: string | undefined = GITHUB_REPOSITORIES_API;
    let totalStars = 0;

    while (nextPage) {
      const response: Response = await fetch(nextPage);
      if (!response.ok) throw new Error(`GitHub repositories responded with ${response.status}`);
      const repositories = (await response.json()) as GithubRepository[];
      totalStars += repositories.reduce(
        (sum, repository) => sum + (repository.fork ? 0 : repository.stargazers_count),
        0,
      );
      nextPage = response.headers.get("Link")?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
    }

    githubStarsCache = totalStars;
    return totalStars;
  })().catch((error: unknown) => {
    githubStarsRequest = undefined;
    throw error;
  });

  return githubStarsRequest;
}

function prefetchGithubData() {
  void getGithubContributions().catch(() => undefined);
  void getGithubProjectStars().catch(() => undefined);
}

function toGithubWeeks({ start, levels, counts }: GithubContributions) {
  const startDate = new Date(`${start}T00:00:00Z`);
  const weeks: (GithubContributionDay | undefined)[][] = [];
  let week: (GithubContributionDay | undefined)[] = Array.from({
    length: startDate.getUTCDay(),
  });

  for (const [index, count] of counts.entries()) {
    const date = new Date(startDate);
    date.setUTCDate(date.getUTCDate() + index);
    week.push({
      date: date.toISOString().slice(0, 10),
      count,
      level: Number(levels[index] ?? 0) as GithubContributionDay["level"],
    });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    weeks.push([...week, ...Array.from<undefined>({ length: 7 - week.length })]);
  }

  return weeks;
}

function GithubGraph({ contributions }: { contributions: GithubContributions | null }) {
  const weeks = contributions?.counts.length ? toGithubWeeks(contributions) : [];
  const fallbackCells = Array.from({ length: 53 * 7 });

  return (
    <div className="relative flex w-[min(352px,calc(100vw-6rem))] flex-col gap-[8px]">
      <div
        className="grid grid-flow-col grid-rows-7 gap-[1.5px]"
        style={{ gridTemplateColumns: `repeat(${weeks.length || 53}, minmax(0, 1fr))` }}
      >
        {weeks.length
          ? weeks.flatMap((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <span
                  key={`${weekIndex}-${dayIndex}`}
                  className={`aspect-square w-full rounded-[1.5px] ${GITHUB_LEVEL_CLASSES[day?.level ?? 0]}`}
                />
              )),
            )
          : fallbackCells.map((_, index) => (
              <span key={index} className="aspect-square w-full rounded-[1.5px] bg-zinc-800" />
            ))}
      </div>
    </div>
  );
}

function GithubPreview() {
  const [contributions, setContributions] = useState<GithubContributions | null>(
    () => githubContributionsCache ?? null,
  );
  const [projectStars, setProjectStars] = useState<number | null>(() => githubStarsCache ?? null);
  const [starsUnavailable, setStarsUnavailable] = useState(false);

  useEffect(() => {
    let mounted = true;
    void getGithubContributions()
      .then((data) => {
        if (mounted) setContributions(data);
      })
      .catch(() => {
        if (mounted) setContributions({ total: 0, start: "", levels: "", counts: [] });
      });
    void getGithubProjectStars()
      .then((stars) => {
        if (mounted) setProjectStars(stars);
      })
      .catch(() => {
        if (mounted) setStarsUnavailable(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex w-[376px] max-w-[calc(100vw-2rem)] flex-col gap-[12px] p-[12px] text-left">
      <div className="flex items-center gap-[12px]">
        <div className="relative shrink-0">
          <img
            src={AVATAR_URL}
            alt=""
            className="h-[40px] w-[40px] rounded-full"
            width="40"
            height="40"
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="text-[16px] leading-[24px] text-zinc-100">YUST777</span>
          <div className="flex flex-wrap items-center gap-x-[6px] text-[12px] leading-[18px] text-zinc-400">
            <span>
              {contributions?.total
                ? `${contributions.total.toLocaleString()} contributions in the last year`
                : "GitHub activity"}
            </span>
            {projectStars !== null && !starsUnavailable && (
              <>
                <span aria-hidden="true" className="text-zinc-600">
                  ·
                </span>
                <span className="inline-flex items-center gap-[3px] text-zinc-500">
                  <svg
                    aria-hidden="true"
                    className="h-[10px] w-[10px]"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0.25a.75.75 0 0 1 .673.418l1.722 3.489 3.85.559a.75.75 0 0 1 .416 1.279l-2.786 2.716.658 3.835a.75.75 0 0 1-1.088.791L8 11.527l-3.445 1.81a.75.75 0 0 1-1.088-.791l.658-3.835L1.339 5.995a.75.75 0 0 1 .416-1.279l3.85-.559L7.327.668A.75.75 0 0 1 8 .25Z" />
                  </svg>
                  {projectStars.toLocaleString()} stars
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <GithubGraph contributions={contributions} />
    </div>
  );
}

function SocialPreviewContent({ type }: { type: SocialPreview }) {
  if (type === "cv") {
    return (
      <a
        className="group block w-[320px] max-w-[calc(100vw-2rem)] overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Yousef Mohammed Salah's CV"
      >
        <div className="relative h-[72px] overflow-hidden bg-zinc-100">
          <img
            src="/static/images/cv-preview.webp"
            alt=""
            className="absolute inset-x-0 top-0 h-auto w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            width="640"
            height="905"
          />
        </div>
        <div className="flex items-center justify-between gap-3 bg-zinc-900 px-3 py-3">
          <div className="min-w-0">
            <p className="truncate text-[14px] leading-5 text-zinc-100">Yousef Mohammed Salah</p>
            <p className="mt-0.5 text-[11px] leading-4 text-zinc-400">Curriculum vitae · PDF</p>
          </div>
          <span className="flex shrink-0 items-center rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-900 transition-colors group-hover:bg-zinc-200">
            Open
          </span>
        </div>
      </a>
    );
  }

  if (type === "linkedin") {
    return <LinkedinPreview />;
  }

  return <GithubPreview />;
}

function LinkedinPreview() {
  const [stats, setStats] = useState<LinkedinStats | null>(() => linkedinStatsCache ?? null);

  useEffect(() => {
    let mounted = true;
    void getLinkedinFollowers().then((res) => {
      if (mounted && res !== null) setStats(res);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const isLive = stats?.source === "linkedin-scrape" || stats?.source === "linkedin-api";
  const displayedFollowers = stats?.followers ?? LINKEDIN_FOLLOWERS_FALLBACK;
  const displayedConnections = stats?.connections ?? "500+";

  return (
    <div className="w-[320px] max-w-[calc(100vw-2rem)] text-left">
      <div
        className="relative h-[64px] w-full bg-gradient-to-br from-[#0a66c2] to-[#0a66c280]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 120% 200%, #0000000a 0%, #0000000a 50%, #c5c5c50a 50%, #c5c5c50a 100%), radial-gradient(circle at 130% -10%, #4040400a 0%, #4040400a 50%, #ffffff0a 50%, #ffffff0a 100%), linear-gradient(to right, #0a66c2, #0a66c280)",
        }}
      ></div>
      <div className="relative px-[12px] pb-[12px]">
        <div className="absolute left-[12px] top-0 -translate-y-1/2 rounded-full bg-zinc-900 p-[2px]">
          <img
            src={LINKEDIN_AVATAR_URL}
            alt="Yousef Mohammed Salah"
            className="h-[56px] w-[56px] rounded-full object-cover"
            width="56"
            height="56"
          />
        </div>
        <div className="flex flex-col gap-[4px] pt-[32px]">
          <div className="text-[16px] leading-[24px] text-zinc-100">Yousef Mohammed Salah</div>
          <div className="mt-[4px] flex items-end justify-between gap-[12px]">
            <div className="min-w-0 text-[14px] leading-[20px]">
              <p className="text-zinc-300">AI &amp; Cybersecurity Developer</p>
              <p className="text-[12px] text-zinc-500">Damietta, Egypt</p>
              <p
                className="mt-[2px] whitespace-nowrap text-[12px] font-medium text-[#71b7fb]"
                title={
                  isLive
                    ? `Live count from LinkedIn (${stats?.source === "linkedin-scrape" ? "Scraped" : "API"})`
                    : "Fallback count — configure LINKEDIN_LI_AT_COOKIE for live count"
                }
              >
                {displayedFollowers.toLocaleString()} followers · {displayedConnections} connections
              </p>
            </div>
            <a
              className="h-fit shrink-0 rounded-full bg-[#0a66c2] px-[12px] py-[4px] text-[14px] leading-[20px] text-white transition-[filter] hover:brightness-125"
              href="https://www.linkedin.com/in/yousefmsm1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const Tooltip = lazy(() => import("react-tooltip").then((m) => ({ default: m.Tooltip })));

const SOCIAL_LINKS = [
  {
    icon: <GithubIcon />,
    label: "Github",
    url: "https://github.com/YUST777",
    preview: "github" as const,
  },
  {
    icon: <LinkedinIcon />,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/yousefmsm1/",
    preview: "linkedin" as const,
  },
  { icon: <MailIcon />, label: "Email", url: "mailto:yousefmsm@hotmail.com" },
  { icon: <CvIcon />, label: "CV", url: "/cv.pdf", preview: "cv" as const },
];

type PreviewLayer = {
  type: SocialPreview;
  key: number;
  isActive: boolean;
  enterOffset: number;
  exitOffset: number;
};

const cubicOut = (progress: number) => 1 - (1 - progress) ** 3;

function previewIndex(preview: SocialPreview) {
  return { github: 0, linkedin: 1, cv: 2 }[preview];
}

function AnimatedPreviewLayer({
  layer,
  onElement,
  onExit,
}: {
  layer: PreviewLayer;
  onElement: (element: HTMLDivElement | null) => void;
  onExit: (key: number) => void;
}) {
  return (
    <motion.div
      ref={onElement}
      className="social-preview-layer"
      aria-hidden={!layer.isActive}
      style={{ pointerEvents: layer.isActive ? "auto" : "none" }}
      initial={{ x: layer.enterOffset, opacity: 0, filter: "blur(2px)" }}
      animate={
        layer.isActive
          ? { x: 0, opacity: 1, filter: "blur(0px)" }
          : { x: layer.exitOffset, opacity: 0, filter: "blur(2px)" }
      }
      transition={{
        duration: 0.3,
        ease: cubicOut,
      }}
      onAnimationComplete={() => {
        if (!layer.isActive) onExit(layer.key);
      }}
    >
      <SocialPreviewContent type={layer.type} />
    </motion.div>
  );
}

const ignorePreviewElement = () => {};

function SocialContacts() {
  const [copied, setCopied] = useState(false);
  const [activePreview, setActivePreview] = useState<SocialPreview | null>(null);
  const [previewLayers, setPreviewLayers] = useState<PreviewLayer[]>([]);
  const [renderId, setRenderId] = useState(0);
  const [isPanelMounted, setIsPanelMounted] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isInstantResize, setIsInstantResize] = useState(false);
  const [previewLeft, setPreviewLeft] = useState(0);
  const [panelSize, setPanelSize] = useState({ width: 0, height: 0 });
  const contactRef = useRef<HTMLDivElement>(null);
  const incomingContentRef = useRef<HTMLDivElement>(null);
  const activePreviewRef = useRef<SocialPreview>("github");
  const renderIdRef = useRef(0);
  const isPanelOpenRef = useRef(false);
  const closeTimeoutRef = useRef<number | undefined>(undefined);
  const previewLayersRef = useRef<PreviewLayer[]>([]);
  const resizeFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    prefetchGithubData();
    void getLinkedinFollowers();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("yousefmsm@hotmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      window.location.href = "mailto:yousefmsm@hotmail.com";
    }
  };

  const setIncomingContentElement = useCallback((element: HTMLDivElement | null) => {
    incomingContentRef.current = element;
  }, []);

  const removeExitedPreview = useCallback((key: number) => {
    const nextLayers = previewLayersRef.current.filter((layer) => layer.key !== key);
    previewLayersRef.current = nextLayers;
    setPreviewLayers(nextLayers);
  }, []);

  const closePreview = () => {
    if (!isPanelOpenRef.current) return;
    isPanelOpenRef.current = false;
    setIsPanelOpen(false);
    if (closeTimeoutRef.current !== undefined) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsPanelMounted(false);
      setActivePreview(null);
      previewLayersRef.current = [];
      setPreviewLayers([]);
      closeTimeoutRef.current = undefined;
    }, 150);
  };

  const openPreview = (node: HTMLAnchorElement, preview: SocialPreview) => {
    const firstOpen = !isPanelOpenRef.current;
    if (closeTimeoutRef.current !== undefined) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = undefined;
    }
    isPanelOpenRef.current = true;
    setIsPanelMounted(true);
    setIsPanelOpen(true);
    setIsInstantResize(firstOpen);
    const parentBounds = contactRef.current?.getBoundingClientRect();
    const panelWidth = Math.min(preview === "github" ? 376 : 320, window.innerWidth - 32);
    const anchorCenter = node.getBoundingClientRect().left + node.offsetWidth / 2;
    const clampedCenter = Math.min(
      Math.max(anchorCenter, 16 + panelWidth / 2),
      window.innerWidth - 16 - panelWidth / 2,
    );
    setPreviewLeft(clampedCenter - (parentBounds?.left ?? 0));

    const previousPreview = activePreviewRef.current;
    const nextRenderId = renderIdRef.current + 1;
    const direction =
      previousPreview !== preview
        ? (Math.sign(previewIndex(preview) - previewIndex(previousPreview)) as -1 | 1)
        : 0;
    const existingLayers = previewLayersRef.current.map((layer) =>
      layer.isActive ? { ...layer, isActive: false, exitOffset: -200 * direction } : layer,
    );
    const nextLayer: PreviewLayer = {
      type: preview,
      key: nextRenderId,
      isActive: true,
      enterOffset: 200 * direction,
      exitOffset: 0,
    };
    const nextLayers = [...existingLayers, nextLayer];
    previewLayersRef.current = nextLayers;
    setPreviewLayers(nextLayers);
    activePreviewRef.current = preview;
    renderIdRef.current = nextRenderId;
    setActivePreview(preview);
    setRenderId(nextRenderId);
  };

  useLayoutEffect(() => {
    if (!isPanelMounted || !activePreview) return;
    const content = incomingContentRef.current;
    if (!content) return;

    const measure = () => {
      const nextSize = { width: content.offsetWidth, height: content.offsetHeight };
      setPanelSize((current) =>
        current.width === nextSize.width && current.height === nextSize.height ? current : nextSize,
      );
    };

    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(content);

    if (isInstantResize) {
      resizeFrameRef.current = window.requestAnimationFrame(() => {
        setIsInstantResize(false);
        resizeFrameRef.current = undefined;
      });
    }

    return () => {
      observer?.disconnect();
      if (resizeFrameRef.current !== undefined) {
        window.cancelAnimationFrame(resizeFrameRef.current);
        resizeFrameRef.current = undefined;
      }
    };
  }, [activePreview, isInstantResize, isPanelMounted, renderId]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current !== undefined) window.clearTimeout(closeTimeoutRef.current);
      if (resizeFrameRef.current !== undefined) window.cancelAnimationFrame(resizeFrameRef.current);
    },
    [],
  );

  const handlePointerEnter = (event: PointerEvent<HTMLAnchorElement>, preview: SocialPreview) => {
    if (event.pointerType !== "mouse") return;
    openPreview(event.currentTarget, preview);
  };

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>, preview: SocialPreview) => {
    if (event.currentTarget.matches(":focus-visible")) {
      openPreview(event.currentTarget, preview);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closePreview();
  };

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Connect with me">
      <button
        type="button"
        onClick={handleCopyEmail}
        className="group relative z-10 inline-flex min-h-10 min-w-[132px] cursor-pointer items-center justify-center rounded-xl bg-zinc-100 px-4 text-sm font-medium text-zinc-950 transition-all duration-200 hover:bg-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:px-5 sm:text-base"
        aria-live="polite"
      >
        <span
          className={`transition-all duration-500 ${copied ? "blur-[3px] opacity-0" : "blur-0 opacity-100"}`}
        >
          Copy my email
        </span>
        <span
          className={`absolute transition-all duration-500 ${copied ? "blur-0 opacity-100" : "blur-[3px] opacity-0"}`}
          aria-hidden={!copied}
        >
          Copied!
        </span>
      </button>
      <div
        ref={contactRef}
        className="relative flex flex-wrap items-center gap-2 sm:gap-2.5"
        aria-label="Social links"
        onMouseLeave={closePreview}
        onBlur={handleBlur}
      >
        {SOCIAL_LINKS.filter((link) => link.label !== "Email").map((link) => (
          <a
            key={link.label}
            href={link.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            onPointerEnter={(event) => {
              if (link.preview) handlePointerEnter(event, link.preview);
            }}
            onMouseEnter={(event) => {
              if (typeof window.PointerEvent === "undefined" && link.preview) {
                openPreview(event.currentTarget, link.preview);
              }
            }}
            onFocus={(event) => {
              if (link.preview) handleFocus(event, link.preview);
            }}
            className="group relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span className="text-zinc-400 transition-colors group-hover:text-white [&>svg]:h-6 [&>svg]:w-6">
              {link.icon}
            </span>
          </a>
        ))}
        {isPanelMounted && activePreview && (
          <motion.div
            className="social-preview-panel absolute bottom-[calc(100%+8px)] left-0 z-30 flex translate-x-[-50%] items-end overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl ring-1 ring-white/10"
            initial={{
              left: previewLeft,
              width: panelSize.width,
              height: panelSize.height,
              opacity: 0,
            }}
            animate={{
              left: previewLeft,
              width: panelSize.width,
              height: panelSize.height,
              opacity: isPanelOpen ? 1 : 0,
            }}
            transition={{
              left: { duration: isInstantResize ? 0 : 0.3, ease: cubicOut },
              width: { duration: isInstantResize ? 0 : 0.3, ease: cubicOut },
              height: { duration: isInstantResize ? 0 : 0.3, ease: cubicOut },
              opacity: { duration: 0.15, ease: "linear" },
            }}
            style={{ pointerEvents: isPanelOpen ? "auto" : "none" }}
            aria-hidden={!isPanelOpen}
          >
            {previewLayers.map((layer) => (
              <AnimatedPreviewLayer
                key={layer.key}
                layer={layer}
                onElement={layer.isActive ? setIncomingContentElement : ignorePreviewElement}
                onExit={removeExitedPreview}
              />
            ))}
          </motion.div>
        )}
        <div className="absolute inset-0 -top-[8px] z-0" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section>
      <div className="space-y-4 font-mono text-[14px] leading-relaxed text-zinc-400 md:text-[15px] lg:text-[16px]">
        <p>
          I&apos;m <strong className="text-zinc-200">Yousef Mohammed Salah</strong>, an AI &amp;
          Cybersecurity student at{" "}
          <a
            href="https://horus.edu.eg"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            Horus University in Egypt
          </a>{" "}
          and a full-stack developer building practical tools people keep using.
        </p>
        <p>
          I recently engineered{" "}
          <a
            href="https://verdict.run"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            Verdict.run
          </a>
          , a competitive-programming platform that reached{" "}
          <a
            href="https://www.linkedin.com/posts/yousefmsm1_icpc-softwareengineering-problemsolving-ugcPost-7418661841783943168-kJiu/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF4UUF8BkaOftBX4nvK7AWZaXUY_x4FtmsU"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            120k+ LinkedIn impressions
          </a>{" "}
          .
        </p>
        <p>
          I&apos;ve also earned three national hackathon podium finishes in Egypt —{" "}
          <a
            href="https://www.facebook.com/share/p/1BGCYoPpDT/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            GDG Delta
          </a>
          ,{" "}
          <a
            href="https://www.facebook.com/photo/?fbid=1348813887351864"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            LUXSAI
          </a>
          , and{" "}
          <a
            href="https://www.facebook.com/hue.eg/posts/pfbid0y73xcQuLyVuA5DroyFuMLtT51GDCifxroNXo7JJkXPtrqhcGJ6szkB3ugaSqPqr6l"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            Sustainable Innovation Summit
          </a>
          .
        </p>

        <div className="sr-only">
          <Link to="/ai-security-projects">AI security projects</Link>
          <Link to="/competitive-programming-platforms">competitive programming platforms</Link>
        </div>
      </div>

      <Suspense fallback={null}>
        <Tooltip
          id="core-stack-tooltip"
          place="bottom"
          className="!bg-zinc-900 !border !border-white/10 !rounded-md !text-xs !font-mono"
        />
      </Suspense>

      <SocialContacts />
    </section>
  );
}
