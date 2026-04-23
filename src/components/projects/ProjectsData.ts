import { Project } from "./types";

export const projectsData: Project[] = [
  {
    id: 7,
    title: "Verdict",
    description: "The Ultimate Competitive Programming Platform.",
    fullDescription:
      "Solve Codeforces problems with a built-in IDE, Whiteboard, and Custom Judge—no more tab switching. Features Mirror Mode, Smart IDE, and Algorithm Visualization.",
    tag: "Competitive Programming",
    icon: "fa-gavel",
    span: "md:col-span-3 md:row-span-1", // Full width headliner
    delay: "delay-100",
    video: "/videos/verdict.webm",
    repoLink: "https://github.com/YUST777/verdict-community",
    siteLink: "https://verdict.run",
    technologies: ["Next.js 15", "TypeScript", "Puppeteer", "Monaco Editor", "Excalidraw"],
    drawerId: "verdict",
    features: [
      {
        category: "Core",
        svgIcon: "code",
        items: ["Mirror Mode", "Smart IDE", "Whiteboard Integration"],
      },
      {
        category: "Architecture",
        svgIcon: "server",
        items: ["Browser Extension", "Scraper Service", "Dockerized"],
      },
    ],
  },
  {
    id: 8,
    title: "Sast",
    description: "Autonomous AI Security Agent.",
    fullDescription:
      "An AI autonomous agent that fetches your web app, finds vulnerabilities, patches the code, and generates a verified report. Sast automates the full security lifecycle—identifying, fixing, and verifying vulnerabilities with functional POCs. It ensures your software is secured as fast as it is coded, delivering superior precision through total process optimization.",
    tag: "AI Security",
    icon: "fa-robot",
    span: "md:col-span-2 md:row-span-1",
    delay: "delay-150",
    video: "/videos/sast.webm",
    technologies: ["AI / LLMs", "Node.js", "Cybersecurity", "Autonomous Agents", "Docker"],
    siteLink: "https://sast.tech",
    drawerId: "sast",
    features: [
      {
        category: "Automated Lifecycle",
        svgIcon: "bolt",
        items: ["Auto-Discovery", "Auto-Patching", "POC Generation"],
      },
      {
        category: "Integration",
        svgIcon: "globe",
        items: ["Web App Fetching", "Visual Reporting", "Fast Verification"],
      },
    ],
  },
  {
    id: 2,
    title: "Gifts Charts",
    description: "Real-time Telegram sticker & gift price tracking bot.",
    fullDescription:
      "A sophisticated Telegram bot for tracking live sticker prices and gift collections, featuring real-time data fetching, premium subscription systems, and automated image generation.",
    tag: "Automation",
    icon: "fa-robot",
    span: "md:col-span-1 md:row-span-1",
    delay: "delay-100",
    video: "/videos/giftscharts.webm",
    technologies: ["Python", "Telegram API", "Docker", "PostgreSQL", "Flask"],
    drawerId: "giftsCharts",
    features: [
      {
        category: "Core Features",
        svgIcon: "chart",
        items: ["Live Price Tracking", "Premium Subscriptions", "Admin Dashboard", "Auto-Updates"],
      },
      {
        category: "Architecture",
        svgIcon: "server",
        items: ["Microservices", "Docker Containerized", "Async Database", "CDN Service"],
      },
    ],
  },
  {
    id: 9,
    title: "Collectable Kit",
    description: "Next-gen collectibles management platform.",
    fullDescription:
      "A comprehensive platform designed for modern collectors. Track, value, and manage your digital and physical collections with real-time analytics and a sleek, high-performance interface.",
    tag: "Social",
    icon: "fa-box-open",
    span: "md:col-span-1 md:row-span-1",
    delay: "delay-200",
    video: "/videos/collectablekit.webm",
    technologies: ["Next.js", "PostgreSQL", "Tailwind CSS", "Lucide Icons"],
    drawerId: "collectablekit",
  },
  {
    id: 4,
    title: "ICPCHUE",
    description: "Hardened, sandboxed online judge platform.",
    fullDescription:
      "I led the development of the ICPC HUE training platform, a comprehensive training ecosystem serving the community. Built with Next.js, featuring secure registration, gamified dashboards, and skill trackers.",
    tag: "Platform",
    icon: "fa-code",
    span: "md:col-span-2 md:row-span-1",
    delay: "delay-100",
    video: "/videos/icpchue2.webm",
    drawerId: "ICPCHUE",
  },
  {
    id: 1,
    title: "Zero Threat",
    description: "National award-winning AI-driven security ecosystem.",
    fullDescription:
      "A comprehensive AI-powered cybersecurity suite comprising a web platform, browser extension, and Windows agent, designed for advanced threat intelligence and real-time protection.",
    tag: "Cybersecurity",
    icon: "fa-shield-alt",
    span: "md:col-span-2 md:row-span-1",
    delay: "delay-200",
    video: "/videos/zerothreat.webm",
    drawerId: "zerothreat",
  },
  {
    id: 5,
    title: "More Projects",
    description: "Additional projects and experiments",
    fullDescription:
      "Explore additional projects, experiments, and creative work showcasing various technologies and solutions.",
    icon: "fa-archive",
    span: "md:col-span-1 md:row-span-1",
    delay: "delay-200",
    isMinimal: true,
    isArchive: true,
    video: "/videos/moreprojects.webm",
    technologies: ["Various Technologies"],
  },
  {
    id: 6,
    title: "yousefdev",
    description: "Building practical solutions",
    fullDescription:
      "A developer focused on building practical tools and applications. Creating clean, well-architected solutions with a focus on user experience and impact.",
    tag: "",
    span: "md:col-span-3 md:row-span-1",
    delay: "delay-300",
    isLarge: true,
    video: "/videos/yousefdev.webm",
    drawerId: "yousefdev",
    technologies: ["Full-Stack Development", "Cybersecurity", "Automation"],
    features: [
      {
        category: "Services",
        svgIcon: "code",
        items: ["Web development", "Application development", "System design"],
      },
      {
        category: "Expertise",
        svgIcon: "lightbulb",
        items: ["Full-stack development", "Web applications", "Automation systems"],
      },
    ],
  },
];

export const archiveProjectsData: Project[] = [
  {
    id: 10,
    title: "PanoBlue",
    description: "Import/Export Corporate Platform",
    fullDescription:
      "A custom-built digital presence for an international import/export company, migrating from WordPress to a tailored, high-performance web solution.",
    tag: "Corporate",
    icon: "fa-globe",
    span: "md:col-span-1 md:row-span-1",
    delay: "delay-100",
    video: "/videos/panoblue.webm",
    drawerId: "panoblue",
  },
  {
    id: 11,
    title: "Fazzah",
    description: "Efficient Web Application Solution",
    fullDescription:
      "A streamlined web application designed for efficiency and performance, focusing on a clean user interface and robust backend integration.",
    tag: "Web App",
    icon: "fa-rocket",
    span: "md:col-span-1 md:row-span-1",
    delay: "delay-200",
    video: "/videos/fazzah.webm",
    drawerId: "fazzah",
  },
  {
    id: 12,
    title: "RetroOS",
    description: "Interactive Retro OS Simulation",
    fullDescription:
      "A nostalgic, browser-based operating system simulation with interactive terminal and retro UI elements.",
    tag: "Experimental",
    icon: "fa-terminal",
    span: "md:col-span-1 md:row-span-1",
    delay: "delay-300",
    video: "/videos/RetroOS_Project.webm",
    drawerId: "RetroOS",
  },
];
