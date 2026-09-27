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

function GithubIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="2 2 20 20">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

const AVATAR_URL = "https://github.com/YUST777.png?size=128";
const LINKEDIN_AVATAR_URL = "/static/images/yousef-profile.webp";
const GITHUB_API = "https://github-contributions-api.jogruber.de/v4";
const GITHUB_LEVEL_CLASSES = [
  "bg-zinc-800",
  "bg-green-400/20",
  "bg-green-400/40",
  "bg-green-400/65",
  "bg-green-400/90",
] as const;

let githubContributionsCache: GithubContributions | undefined;
let githubContributionsRequest: Promise<GithubContributions> | undefined;

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

  useEffect(() => {
    let mounted = true;
    void getGithubContributions()
      .then((data) => {
        if (mounted) setContributions(data);
      })
      .catch(() => {
        if (mounted) setContributions({ total: 0, start: "", levels: "", counts: [] });
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
          <p className="text-[14px] leading-[20px] text-zinc-400">
            {contributions?.total
              ? `${contributions.total.toLocaleString()} contributions in the last year`
              : "Loading contributions…"}
          </p>
        </div>
      </div>
      <GithubGraph contributions={contributions} />
    </div>
  );
}

function SocialPreviewContent({ type }: { type: SocialPreview }) {
  if (type === "cv") {
    return (
      <div className="flex w-[320px] max-w-[calc(100vw-2rem)] items-center justify-between gap-[16px] p-[16px] text-left">
        <div className="min-w-0">
          <p className="mb-[4px] text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
            Curriculum vitae
          </p>
          <p className="truncate text-[15px] leading-[22px] text-zinc-100">
            Yousef Mohammed Salah
          </p>
        </div>
        <a
          className="shrink-0 rounded-full bg-zinc-100 px-[12px] py-[6px] text-[12px] font-medium text-zinc-950 transition-colors hover:bg-white"
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open
        </a>
      </div>
    );
  }

  if (type === "linkedin") {
    return (
      <div className="w-[320px] max-w-[calc(100vw-2rem)] text-left">
        <div
          className="relative h-[64px] w-full bg-gradient-to-br from-[#0a66c2] to-[#0a66c280]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 120% 200%, #0000000a 0%, #0000000a 50%, #c5c5c50a 50%, #c5c5c50a 100%), radial-gradient(circle at 130% -10%, #4040400a 0%, #4040400a 50%, #ffffff0a 50%, #ffffff0a 100%), linear-gradient(to right, #0a66c2, #0a66c280)",
          }}
        >
        </div>
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
            <div className="text-[16px] leading-[24px] text-zinc-100">
              Yousef Mohammed Salah
            </div>
            <div className="mt-[4px] flex items-end justify-between gap-[12px]">
              <div className="min-w-0 text-[14px] leading-[20px]">
                <p className="text-zinc-300">AI &amp; Cybersecurity Developer</p>
                <p className="text-[12px] text-zinc-500">Damietta, Egypt</p>
                <p className="mt-[2px] whitespace-nowrap text-[12px] font-medium text-[#71b7fb]">
                  1,993 followers · 500+ connections
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

  return <GithubPreview />;
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
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const setElement = useCallback((element: HTMLDivElement | null) => {
    elementRef.current = element;
    onElement(element);
  }, [onElement]);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const computedStyle = window.getComputedStyle(element);
    const currentX = computedStyle.transform === "none"
      ? 0
      : new DOMMatrixReadOnly(computedStyle.transform).m41;
    const currentOpacity = Number.parseFloat(computedStyle.opacity);
    const blurMatch = computedStyle.filter.match(/blur\(([\d.]+)px\)/);
    const currentBlur = blurMatch ? Number.parseFloat(blurMatch[1]) : 0;

    animationRef.current?.cancel();

    const from = layer.isActive
      ? {
          transform: `translateX(${layer.enterOffset}px)`,
          opacity: 0,
          filter: "blur(2px)",
        }
      : {
          transform: `translateX(${currentX}px)`,
          opacity: currentOpacity,
          filter: `blur(${currentBlur}px)`,
        };
    const to = layer.isActive
      ? { transform: "translateX(0px)", opacity: 1, filter: "blur(0px)" }
      : {
          transform: `translateX(${currentX + layer.exitOffset}px)`,
          opacity: 0,
          filter: "blur(2px)",
        };

    element.style.transform = from.transform;
    element.style.opacity = String(from.opacity);
    element.style.filter = from.filter;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animation = element.animate([from, to], {
      duration: reduceMotion ? 0.01 : 300,
      easing: "cubic-bezier(0.33, 1, 0.68, 1)",
      fill: "forwards",
    });
    animationRef.current = animation;

    if (!layer.isActive) {
      animation.onfinish = () => onExit(layer.key);
    }
  }, [layer.enterOffset, layer.exitOffset, layer.isActive, layer.key, onExit]);

  useEffect(() => () => animationRef.current?.cancel(), []);

  return (
    <div
      ref={setElement}
      className="social-preview-layer"
      aria-hidden={!layer.isActive}
      style={{ pointerEvents: layer.isActive ? "auto" : "none" }}
    >
      <SocialPreviewContent type={layer.type} />
    </div>
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
  const lastDirectionRef = useRef<-1 | 0 | 1>(0);
  const renderIdRef = useRef(0);
  const isPanelOpenRef = useRef(false);
  const closeTimeoutRef = useRef<number | undefined>(undefined);
  const previewLayersRef = useRef<PreviewLayer[]>([]);
  const resizeFrameRef = useRef<number | undefined>(undefined);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("yousefmsm@hotmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
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
    const closingLayers = previewLayersRef.current.map((layer) =>
      layer.isActive
        ? { ...layer, isActive: false, exitOffset: -200 * lastDirectionRef.current }
        : layer,
    );
    previewLayersRef.current = closingLayers;
    setPreviewLayers(closingLayers);
    if (closeTimeoutRef.current !== undefined) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsPanelMounted(false);
      setActivePreview(null);
      previewLayersRef.current = [];
      setPreviewLayers([]);
      closeTimeoutRef.current = undefined;
    }, 300);
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
    setPreviewLeft(node.offsetLeft + node.offsetWidth / 2);

    const previousPreview = activePreviewRef.current;
    const nextRenderId = renderIdRef.current + 1;
    const direction = previousPreview !== preview
      ? Math.sign(previewIndex(preview) - previewIndex(previousPreview)) as -1 | 1
      : 0;
    lastDirectionRef.current = direction;
    const existingLayers = firstOpen
      ? []
      : previewLayersRef.current.map((layer) =>
          layer.isActive
            ? { ...layer, isActive: false, exitOffset: -200 * direction }
            : layer,
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
    const observer = new ResizeObserver(measure);
    observer.observe(content);

    if (isInstantResize) {
      resizeFrameRef.current = window.requestAnimationFrame(() => {
        setIsInstantResize(false);
        resizeFrameRef.current = undefined;
      });
    }

    return () => {
      observer.disconnect();
      if (resizeFrameRef.current !== undefined) {
        window.cancelAnimationFrame(resizeFrameRef.current);
        resizeFrameRef.current = undefined;
      }
    };
  }, [activePreview, isInstantResize, isPanelMounted, renderId]);

  useEffect(() => () => {
    if (closeTimeoutRef.current !== undefined) window.clearTimeout(closeTimeoutRef.current);
    if (resizeFrameRef.current !== undefined) window.cancelAnimationFrame(resizeFrameRef.current);
  }, []);

  const handlePointerEnter = (
    event: PointerEvent<HTMLAnchorElement>,
    preview: SocialPreview,
  ) => {
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
    <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4" aria-label="Connect with me">
      <button
        type="button"
        onClick={handleCopyEmail}
        className="relative z-10 inline-flex min-h-14 cursor-pointer items-center justify-center rounded-[1.25rem] bg-zinc-100 px-6 text-base font-medium text-zinc-950 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:px-8 sm:text-lg"
      >
        {copied ? "Copied!" : "Copy my email"}
      </button>
      <div
        ref={contactRef}
        className="relative flex flex-wrap items-center gap-3 sm:gap-4"
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
            onFocus={(event) => {
              if (link.preview) handleFocus(event, link.preview);
            }}
            className="group relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span className="text-zinc-400 transition-colors group-hover:text-white [&>svg]:h-8 [&>svg]:w-8">
              {link.icon}
            </span>
          </a>
        ))}
        {isPanelMounted && activePreview && (
          <div
            className={`social-preview-panel absolute bottom-[calc(100%+8px)] left-0 z-30 flex translate-x-[-50%] items-end overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl ring-1 ring-white/10 ${isInstantResize ? "social-preview-panel-instant" : ""} ${isPanelOpen ? "social-preview-panel-open" : ""}`}
            style={{
              left: `${previewLeft}px`,
              width: `${panelSize.width}px`,
              height: `${panelSize.height}px`,
              opacity: isPanelOpen ? 1 : 0,
              pointerEvents: isPanelOpen ? "auto" : "none",
            }}
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
          </div>
        )}
        <div className="absolute inset-0 -top-[8px] z-0" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section>
      <div className="space-y-4 text-zinc-400 leading-relaxed font-mono text-sm sm:text-base md:text-lg">
        <p>
          I am <strong className="text-zinc-200">Yousef Mohammed Salah</strong>. AI &amp;
          Cybersecurity student at{" "}
          <a
            href="https://horus.edu.eg"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            Horus University in Egypt
          </a>{" "}
          and a Full-Stack dev who builds tools that stay in people&apos;s bookmarks.
        </p>
        <p>
          Most recently, I engineered{" "}
          <a
            href="https://verdict.run"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            Verdict.run
          </a>
          , a viral competitive programming platform that garnered{" "}
          <a
            href="https://www.linkedin.com/posts/yousefmsm1_icpc-softwareengineering-problemsolving-ugcPost-7418661841783943168-kJiu/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF4UUF8BkaOftBX4nvK7AWZaXUY_x4FtmsU"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            120k+ impressions
          </a>{" "}
          and transformed the workflow for hundreds of developers.
        </p>
        <p>
          Alongside building these, I have won{" "}
          <Link
            to="/hacks"
            className="font-bold text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors"
          >
            3 national hackathons in Egypt
          </Link>{" "}
          so far.
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
