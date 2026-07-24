import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  date: string;
  iso: string;
  modifiedIso?: string;
  modifiedDate?: string;
  summary: string;
  category: string;
  content: string;
  featured?: { label: string; url: string }[];
  images?: string[];
  imagePosition?: string;
}

export const posts: BlogPost[] = [
  {
    id: "6",
    slug: "winning-3-hackathons-first-two-years",
    title: "How I Won 3 Hackathons in My First Two Years of College",
    seoTitle: "How I Won 3 Hackathons in Two Years | yust.dev",
    date: "Jul 23, 2026",
    iso: "2026-07-23",
    modifiedIso: "2026-07-23",
    modifiedDate: "Jul 23, 2026",
    category: "Hackathons",
    imagePosition: "object-top",
    summary:
      "Lessons, late nights, and project building: how we won 3 national hackathons in our first two years of university.",
    content: `How did I win 3 national hackathons in my first two years of college?

First, blessings and grace. Second: locking yourself in a cave for 3 months to build non-stop.

In reality, it's the result of compounding knowledge built project after project. For example, when building [Verdict.run](https://verdict.run), I was literally just learning how to handle authentication cookies. Competitive problem solving with the [ICPC HUE Community](https://icpchue.xyz) was another major foundation.

The journey started when my teammate [Abdelrahman Mohsen](https://www.linkedin.com/in/abdelrahmanmohsen147/) and I competed in the summer of our freshman year, securing 3rd place nationwide at the Sustainable Innovation National Summit in Tanta.

We kept pushing and won 2 more national hackathons in our sophomore year:
- **2nd Place** at the Google Developers Group (GDG Delta) Hackathon (February 18, 2026).
- **3rd Place** at the LUXSAI AI Hackathon (March 29, 2026).`,
    featured: [
      {
        label: "Original LinkedIn Post",
        url: "https://www.linkedin.com/posts/yousefmsm1_%D8%A5%D8%B2%D8%A7%D9%8A-%D9%83%D8%B3%D8%A8%D8%AA-3-%D9%87%D8%A7%D9%83%D8%A7%D8%AB%D9%88%D9%86-%D9%81%D9%8A-%D8%A3%D9%88%D9%84-%D8%B3%D9%86%D8%AA%D9%8A%D9%86-%D9%84%D9%8A%D8%A7-%D9%81%D9%8A-%D8%A7%D9%84%D9%83%D9%84%D9%8A%D8%A9-ugcPost-7480286652070932481-C5X2/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF4UUF8BkaOftBX4nvK7AWZaXUY_x4FtmsU",
      },
    ],
    images: [
      "/static/images/mems/mem_6/1.webp",
      "/static/images/mems/mem_6/2.webp",
      "/static/images/mems/mem_6/3.webp",
    ],
  },
  {
    id: "1",
    slug: "horus-technology-forum-sast-tech",
    title: "A day at Horus Technology Forum",
    seoTitle: "Horus Technology Forum: Building Sast.tech | yust.dev",
    date: "Apr 23, 2026",
    iso: "2026-04-23",
    modifiedIso: "2026-07-23",
    modifiedDate: "Jul 23, 2026",
    category: "AI & Security",
    summary:
      "How I returned to the Horus Technology Forum to demonstrate Sast.tech, an AI security agent that tests and patches web vulnerabilities.",
    content: `Today I was at the Technology Forum event at [Horus University](https://horus.edu.eg). This forum holds a very special place in my heart because it reminds me of my beginnings—it was the first place I ever showcased a project during my first semester.

Returning a year later feels like a major milestone. This time, we came back to present our latest project, [Sast.tech](https://sast.tech), which recently secured 2nd place at **GDG Delta** and 3rd place at **LuxsAI**, alongside my colleague [Abdelrahman Mohsen](https://www.linkedin.com/in/abdelrahmanmohsen147/).

For those who missed the updates, [Sast.tech](https://sast.tech) is an automated security ecosystem built for the 'Vibe Coding' era. While AI has made writing code incredibly fast, security remains a slow, manual bottleneck. We built an IDE-integrated Pentesting AI Agent that bridges this gap. You provide your [GitHub](https://github.com) repository and site link, and the agent uses [Playwright](https://playwright.dev) to navigate your app, identify vulnerabilities, and test them in real-time.

It doesn't just hand you a report; it uses AI to automatically patch the vulnerabilities and provides detailed tips so developers can learn from the process.`,
    featured: [
      {
        label: "Damietta Governorate Official Coverage",
        url: "https://www.facebook.com/photo/?fbid=1389210596566173",
      },
      {
        label: "Horus University Official Feature",
        url: "https://www.facebook.com/photo/?fbid=1348813887351864",
      },
      {
        label: "Horus Engineering Faculty Feature",
        url: "https://www.facebook.com/photo/?fbid=1348813887351864",
      },
    ],
    images: [
      "/static/images/mems/mem_1/3.webp",
      "/static/images/mems/mem_1/1.webp",
      "/static/images/mems/mem_1/2.webp",
    ],
  },
  {
    id: "4",
    slug: "saas-marketing-strategy-az-tech-solutions",
    title: "Marketing Strategy at AZ Tech Solutions",
    seoTitle: "SaaS Marketing Lessons from AZ Tech Solutions | yust.dev",
    date: "Apr 20, 2026",
    iso: "2026-04-20",
    modifiedIso: "2026-07-23",
    modifiedDate: "Jul 23, 2026",
    category: "SaaS & Marketing",
    summary:
      "Practical SaaS marketing lessons from AZ Tech Solutions on awareness, trust, audience filtering, and converting interest into a win-win offer.",
    content: `Today I was at **AZ Tech Solutions** in Mansoura with my colleagues [Abdelrahman Mohsen](https://www.linkedin.com/in/abdelrahmanmohsen147/) and [Khaled Suleiman](https://www.linkedin.com/in/khaled-slueiman/). We were there for marketing training—learning how to sell your SaaS and generate profit—as a result of our 2nd place win at the **GDG Delta** hackathon.

I learned many powerful concepts, but the one that stuck with me most was what I call **"The Filter"** (Al-Musaffa). The idea is simple: to sell your product, you start with an audience representing 100% of the market. Most of them don't know who you are. Your job is to build awareness and your **Personal Brand** so they trust you. After this phase, that 100% is 'filtered' down to roughly 60% who are actually interested and ready for your offer, leading to a true **Win-Win Situation**.

Special thanks to [Eng. Akram Zeyada](https://www.linkedin.com/in/akram-zeyada-2468a0a8/) for his amazing hospitality and detailed explanation 🤍.`,
    featured: [
      { label: "AZ Tech Solutions Feature", url: "https://www.facebook.com/share/p/1CpVHq5DsR/" },
    ],
    images: ["/static/images/mems/mem_4/1.webp", "/static/images/mems/mem_4/2.webp"],
  },
  {
    id: "3",
    slug: "luxsai-hackathon-third-place-sast-tech",
    title: "Winning 3rd Place in LuxsAI",
    seoTitle: "LuxsAI Hackathon: Third Place with Sast.tech | yust.dev",
    date: "Mar 29, 2026",
    iso: "2026-03-29",
    modifiedIso: "2026-07-23",
    modifiedDate: "Jul 23, 2026",
    category: "Hackathons",
    summary:
      "The 850 km journey from Damietta to Luxor, how Sast.tech evolved into a desktop security IDE, and what earned third place at LuxsAI.",
    content: `I traveled 17 hours from Damietta to Luxor and came back with 3rd place :).

Yeah, me and [Abdelrahman Mohsen](https://www.linkedin.com/in/abdelrahmanmohsen147/) went to **LUXSAI** in Luxor—about 850 km away 💀—and thankfully, we secured 3rd place in the AI Hackathon category.

The project was [SAST.TECH](https://sast.tech). After we developed the standalone \`.EXE\` version, it became clear: code is being written faster than ever, but security is still lagging behind. That's why we built **SAST.TECH**.

Note: You can code normally in \`SAST_AI\` and monitor security in \`SAST_SEC\` within the same application; it's a fully functional IDE. The application is now available on the website for free; you can try the beta version for 24 hours only.`,
    featured: [
      {
        label: "Ministry of Higher Education Coverage (2:53)",
        url: "https://www.facebook.com/reel/1254422980142263",
      },
      { label: "Luxor University Coverage", url: "https://www.facebook.com/share/v/1Ht4qPyxje/" },
      {
        label: "International Luxor University Feature",
        url: "https://www.facebook.com/share/v/1CTtFDqLih/",
      },
    ],
    images: [
      "/static/images/mems/mem_3/1.webp",
      "/static/images/mems/mem_3/2.webp",
      "/static/images/mems/mem_3/3.webp",
      "/static/images/mems/mem_3/4.webp",
    ],
  },
  {
    id: "2",
    slug: "gdg-delta-hackathon-second-place-sast-tech",
    title: "Winning 2nd Place in GDG Delta",
    seoTitle: "GDG Delta Hackathon: Sast.tech Wins Second | yust.dev",
    date: "Feb 18, 2026",
    iso: "2026-02-18",
    modifiedIso: "2026-07-23",
    modifiedDate: "Jul 23, 2026",
    category: "Hackathons",
    imagePosition: "object-contain p-2 bg-[#0c0c0c]",
    summary:
      "Inside the 49-hour build that took Sast.tech to second place at the GDG Delta hackathon, from the security problem to the final demo.",
    content: `Don't sleep until you hold the win in your hand. This was me at 1 AM, after staying awake for 49 hours straight in the service area 😂.

We were at the **Google Developers Group - GDG Delta** hackathon. Alongside my colleagues [Khaled Suleiman](https://www.linkedin.com/in/khaled-slueiman/) and [Abdelrahman Mohsen](https://www.linkedin.com/in/abdelrahmanmohsen147/), we set out to build something that solves a real problem for the modern developer.

We built an application for the 'Vibe Coding' era. In a world where AI allows code to be written at lightning speed, security often falls behind, remaining slow and manual. Our solution was a **Pentesting AI Agent**. 

The process is simple: you provide your [GitHub](https://github.com) code and the website link. The agent reads the code, identifies vulnerabilities, and then uses [Playwright](https://playwright.dev) to control the browser and actively test for security gaps. It doesn't just hand you a report; it uses the AI Agent to solve the problems and gives you actionable tips so you can learn exactly what it did and why.`,
    featured: [
      {
        label: "GDG Delta Official Post",
        url: "https://www.facebook.com/GDG.Deltaa/posts/pfbid02cSKX9NGK19BzK6pumnBZ5wyFXptmtFriEANJggNuLpLchy89vo5e6T9RvEbT8Bxgl?rdid=plWF1Fsul8qIZwuk#",
      },
      {
        label: "Horus AI Faculty Official Feature",
        url: "https://www.facebook.com/permalink.php?story_fbid=pfbid02MHnGTZJKbKM87kJq164L5PvXWKjGjKtDXgzfUonSYVbZjDu2sR96HjcWxvKDUFml&id=61564405377149&mibextid=wwXIfr&rdid=Jksjhsc4GVV9Gsde#",
      },
    ],
    images: [
      "/static/images/mems/mem_2/2.webp",
      "/static/images/mems/mem_2/1.webp",
      "/static/images/mems/mem_2/3.webp",
      "/static/images/mems/mem_2/4.webp",
    ],
  },
  {
    id: "5",
    slug: "zero-threat-egypt-innovation-summit",
    title: "Winning 3rd Place at the Sustainable Innovation National Summit",
    seoTitle: "Zero Threat Wins Third at Egypt Innovation Summit | yust.dev",
    date: "Aug 28, 2025",
    iso: "2025-08-28",
    modifiedIso: "2026-07-23",
    modifiedDate: "Jul 23, 2026",
    category: "Hackathons",
    summary:
      "From Level 1 to the Top 3 — Zero Threat, our cybersecurity ecosystem, beat senior teams at Tanta National Summit.",
    content: `🎉 From Level 1 to the Top 3! 🎉

Proud to share that our project [Zero Threat](https://zerothreat.yousefdev.xyz/)—a cybersecurity website & AI-powered desktop app—won **3rd place** at the First **Sustainable Innovation National Summit** in **Tanta**, among 20 universities nationwide. 🚀

What makes this win special? Our team are all **Level 1 students**… competing (and winning!) against Level 4 & Level 5 engineers. 💪 Passion and teamwork beat seniority every time.

This was the project that started everything for me. Built end-to-end with my colleague [Abdelrahman Mohsen](https://www.linkedin.com/in/abdelrahmanmohsen147/), [Zero Threat](https://zerothreat.yousefdev.xyz/) combines an AI-powered web platform, a browser extension for safe-download checks, and a Windows agent using the **YARA protocol** to deliver a 90% malware detection rate across our test suite—outperforming several traditional signature-based antivirus solutions.

Standing on that stage, surrounded by senior engineers from 20+ universities, taught me the lesson that has guided every project since: **the bar isn't your year, it's the work.**`,
    featured: [
      {
        label: "Horus University Official Post",
        url: "https://www.facebook.com/hue.eg/posts/pfbid0y73xcQuLyVuA5DroyFuMLtT51GDCifxroNXo7JJkXPtrqhcGJ6szkB3ugaSqPqr6l",
      },
      {
        label: "Tanta University Official Post",
        url: "https://www.facebook.com/TantaUniversity.Official/posts/pfbid0RAC9wx52FyNeyUoS1maGC8PpuNxqhn5FaEwqJzcu7CB6onWBGcreFTrRX1wajZCsl",
      },
      {
        label: "Tanta University Award Ceremony Reel",
        url: "https://www.facebook.com/reel/710000655405770",
      },
      {
        label: "Faculty of AI – Horus University Feature",
        url: "https://www.facebook.com/share/p/1Cv4vQp4KZ/",
      },
    ],
    images: [
      "/static/images/mems/mem_5/2.jpeg",
      "/static/images/mems/mem_5/1.jpeg",
      "/static/images/mems/mem_5/3.jpeg",
      "/static/images/mems/mem_5/4.jpeg",
      "/static/images/mems/mem_5/5.jpeg",
      "/static/images/mems/mem_5/6.jpeg",
      "/static/images/mems/mem_5/7.jpeg",
      "/static/images/mems/mem_5/8.jpeg",
      "/static/images/mems/mem_5/9.jpeg",
    ],
  },
];

const CATEGORIES = ["All", "Hackathons", "AI & Security", "SaaS & Marketing"];

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
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

      <div
        key={selectedCategory}
        className="space-y-0 animate-in fade-in duration-150"
      >
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

      {hoveredPost && hoveredPost.images && hoveredPost.images.length > 0 && (
        <div
          ref={previewRef}
          className="fixed left-0 top-0 pointer-events-none z-50 hidden will-change-transform animate-in fade-in zoom-in-90 duration-150 md:block"
        >
          <div className="w-72 h-44 rounded-2xl overflow-hidden border border-white/20 bg-[#0c0c0c] shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
            <img
              src={hoveredPost.images[0]}
              alt={hoveredPost.title}
              className={`w-full h-full object-cover ${hoveredPost.imagePosition || "object-center"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-0.5">
                {hoveredPost.category}
              </span>
              <p className="text-xs font-sans font-bold text-white truncate">{hoveredPost.title}</p>
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
