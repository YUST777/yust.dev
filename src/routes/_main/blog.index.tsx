import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/blog/")({
  head: () => ({
    meta: [
      { title: "blog | Yousef Mohammed Salah" },
      {
        name: "description",
        content: "Thoughts on software engineering, competitive programming, and social impact.",
      },
    ],
  }),
  component: BlogPage,
});

export const posts = [
  {
    id: "1",
    title: "A day at Horus Technology Forum",
    date: "Apr 23, 2026",
    summary: "Returning to where it all started, but with something much bigger.",
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
      "/static/images/mems/mem_1/1.webp",
      "/static/images/mems/mem_1/2.webp",
      "/static/images/mems/mem_1/3.webp",
    ],
  },
  {
    id: "4",
    title: "Marketing Strategy at AZ Tech Solutions",
    date: "Apr 20, 2026",
    summary: "Learning the art of the 'Filter' and how to scale SaaS products.",
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
    title: "Winning 3rd Place in LuxsAI",
    date: "Mar 29, 2026",
    summary: "A 17-hour journey and 850km across Egypt to compete in Luxor.",
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
    title: "Winning 2nd Place in GDG Delta",
    date: "Feb 18, 2026",
    summary: "49 hours of sleep-deprived building to secure a win at Google Developer Groups.",
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
      "/static/images/mems/mem_2/1.webp",
      "/static/images/mems/mem_2/2.webp",
      "/static/images/mems/mem_2/3.webp",
      "/static/images/mems/mem_2/4.webp",
    ],
  },
];

function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-32 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div>
        <h1 className="text-4xl font-pixel text-white mb-4 uppercase">blog</h1>
      </div>

      <div className="space-y-0 border-t border-white/5">
        {posts.map((post) => (
          <div key={post.id} className="border-b border-white/5">
            <Link
              to="/blog/$postId"
              params={{ postId: post.id }}
              className="flex flex-col py-8 group cursor-pointer"
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-zinc-200 group-hover:text-white transition-colors font-sans text-lg md:text-xl tracking-tight font-semibold">
                  {post.title}
                </span>
                <span className="text-zinc-500 text-[11px] md:text-xs font-mono shrink-0 ml-4 uppercase tracking-widest">
                  {post.date}
                </span>
              </div>
              <p className="text-zinc-500 font-sans text-sm md:text-base line-clamp-2 max-w-3xl">
                {post.summary}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <p className="text-zinc-500 text-[11px] font-mono uppercase tracking-[0.2em] hover:text-zinc-300 cursor-pointer transition-colors inline-block">
          [ Archived Posts ]
        </p>
      </div>
    </div>
  );
}
