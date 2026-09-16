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
  previewImage?: string;
  previewVideo?: string;
  imagePosition?: string;
}

export const posts: BlogPost[] = [
  {
    id: "13",
    slug: "winning-3rd-place-green-loop-respark",
    title: "Winning 3rd Place at the Green Loop Competition with ReSpark 🥉",
    seoTitle: "Green Loop Competition: 3rd Place with ReSpark | yust.dev",
    date: "Sep 10, 2026",
    iso: "2026-09-10",
    category: "Hackathons",
    summary:
      "How our project ReSpark won 3rd place in Horus University's Green Loop waste recycling competition, tackling both college hardware e-waste and AI data center energy consumption.",
    previewImage: "/static/images/mems/mem_13/1.webp",
    images: [
      "/static/images/mems/mem_13/1.webp",
      "/static/images/mems/mem_13/2.webp",
      "/static/images/mems/mem_13/3.webp",
      "/static/images/mems/mem_13/4.webp",
      "/static/images/mems/mem_13/5.webp",
    ],
    featured: [
      {
        label: "Original LinkedIn Post",
        url: "https://www.linkedin.com/posts/yousefmsm1_%D9%83%D8%B3%D8%A8%D9%86%D8%A7-%D9%85%D8%B1%D9%83%D8%B2-%D8%AA%D8%A7%D9%84%D8%AA-%D9%81%D9%8A-%D9%85%D8%B3%D8%A7%D8%A8%D9%82%D8%A9-green-loop-%D9%81%D9%8A-%D8%AC%D8%A7%D9%85%D8%B9%D8%A9-ugcPost-7503416845966888960-WPR4/",
      },
      { label: "Shortlink", url: "https://lnkd.in/p/e7Bd-trh" },
      { label: "ReSpark Platform", url: "https://respark.tech" },
      { label: "Horus University", url: "https://horus.edu.eg" },
    ],
    content: `We secured **3rd place** in the **Green Loop** competition at [Horus University](https://horus.edu.eg)! 🥉

For those unfamiliar, **Green Loop** is a specialized sustainability and waste-recycling competition. This was the internal university qualifying stage at Horus, where the top three winning teams earned the privilege of representing Horus University at the national finals across all of Egypt.

Our project is called **ReSpark** ([ReSpark.tech](https://respark.tech))—a unified web platform and application engineered to combat electronic waste through two fundamental pillars:

**1. Physical E-Waste (Hardware Recycling Marketplace)**

Think about all the embedded systems, Arduino shields, robotics kits, and hardware components students build for university coursework—only to leave them sitting in a drawer collecting dust after the semester ends. Instead of letting viable electronics end up in landfills, **ReSpark** provides a specialized student marketplace where you can disassemble previous projects, list microcontrollers, sensors, and components, and sell them affordably to other students who need them. It saves incoming students money while putting cash back into the creators' pockets.

**2. Virtual E-Waste (Green AI Infrastructure)**

State-of-the-art AI models and LLMs operate inside massive data centers that consume enormous amounts of electrical grid energy and millions of gallons of water for server cooling. Virtual e-waste and computational strain are rapidly becoming one of tech's biggest climate challenges. **ReSpark** introduces concrete architectural and software optimization strategies designed to streamline prompt payloads, cache semantic responses, and reduce unnecessary compute strain on models. By optimizing workload execution, we significantly reduce data center power draw and drop your overall AI API operating expenses.

**Team & Community**

I competed alongside my brilliant teammates [Abdelrahman Mohsen](https://www.linkedin.com/in/abdelrahmanmohsen147/) and [Mostafa Kamal](https://www.linkedin.com/in/mostafa-kamal-681961230/)—absolute professionalism and dedication throughout the sprint. A special thank you to **Eng. Fatma Magdy** for her constant guidance and support with our team.

My primary role was engineering the full landing page at [ReSpark.tech](https://respark.tech) and architecting the complete visual identity from scratch—from the project mascot to the flyers, presentation slide decks, and conference banners.

Next stop: the nationwide Egypt finals! See you there :)`,
  },
  {
    id: "12",
    slug: "level-2-retrospective-hackathons-projects-community",
    title: "Goodbye Sophomore Year: A Year of Shipping Products, Winning Hackathons, and Building Community",
    seoTitle: "Sophomore Year Retrospective: Hackathons & Shipped Code | yust.dev",
    date: "Aug 30, 2026",
    iso: "2026-08-30",
    category: "Software Engineering",
    summary:
      "Bidding farewell to Level 2 and entering Level 3: a complete retrospective of 3 national hackathon wins, founding ICPC HUE, training 300+ students, and shipping production apps.",
    previewImage: "/static/images/mems/mem_12/1.webp",
    images: [
      "/static/images/mems/mem_12/1.webp",
      "/static/images/mems/mem_12/2.webp",
      "/static/images/mems/mem_12/3.webp",
      "/static/images/mems/mem_12/4.webp",
      "/static/images/mems/mem_12/5.webp",
    ],
    featured: [
      {
        label: "Original LinkedIn Post",
        url: "https://www.linkedin.com/posts/yousefmsm1_%D8%A8%D9%85%D8%A7-%D8%A5%D9%86%D9%86%D8%A7-%D8%AE%D9%84%D8%A7%D8%B5-%D8%A8%D9%86%D9%88%D8%AF%D8%B9-%D9%84%D9%8A%D9%81%D9%84-2-%D9%88%D8%AF%D8%A7%D8%AE%D9%84%D9%8A%D9%86-%D8%B1%D8%B3%D9%85%D9%8A-ugcPost-7499489407649931264-hDfT/",
      },
      { label: "Shortlink", url: "https://lnkd.in/p/eEVCVfR9" },
      { label: "Portfolio Overview: yust.dev", url: "https://yust.dev" },
      { label: "ICPC HUE Community", url: "https://icpchue.com" },
    ],
    content: `As we officially bid farewell to Level 2 (sophomore year) and step into Level 3 in Cybersecurity & AI at [Horus University](https://horus.edu.eg)... let me take you through what a full year of locking myself in a "cave" looked like: non-stop experiments, intense hackathon pressure, shipped products, and hard-earned certifications.

**1. Activities & Community Leadership**

• **Founding ICPC HUE:** At the start of the year, I co-founded Horus University's first competitive programming community, **ICPC HUE**. We built the training curriculum from scratch, coached hundreds of students, and qualified **8 teams** for the Egyptian Collegiate Programming Contest (ECPC) qualifications.

• **Hosting DCC Contest:** We brought competitive programming to our campus by hosting the **DCC programming contest** at the Faculty of AI under the organization of [ACPC Club Damietta University](https://www.linkedin.com/company/acpc-du/), welcoming 36+ teams from 5 universities.

• **Tech Creator on LinkedIn:** A whole year of documenting engineering builds, open-source architectures, and project breakdowns—crossing **+170,000 impressions** on LinkedIn!

**2. Hackathons (3x National Wins) 🏆**

We took home 3 national podium finishes across Egypt:

• 🥉 **3rd Place** at the Sustainable Innovation National Summit in Tanta (competing as Level 1 freshmen against 20+ universities nationwide!) with **Zero Threat**.

• 🥈 **2nd Place** at the **Google Developers Group (GDG Delta)** Hackathon out of 600+ developers and 122 teams with **SAST.TECH**.

• 🥉 **3rd Place** at the **LUXSAI AI Hackathon** in Luxor (after an unforgettable 17-hour train ride 💀) with **SAST.TECH**.

• Competed in the official **ECPC 2026 Contestant** qualifications.

*(I wasn't alone in these wins—I built alongside [Abdelrahman Mohsen](https://www.linkedin.com/in/abdelrahmanmohsen147/) in all of them, and [Khaled Suleiman](https://www.linkedin.com/in/khaled-slueiman/) at GDG Delta).*

**Embracing Failure as Part of the Equation:**

Not everything was a win. We applied to the Kafr El-Sheikh and Damietta hackathons and were rejected without feedback. I also participated in international global hackathons like BuildAnything, Reddit, Band.ai, and Sui—and didn't win, largely because I tried to carry everything as a solo builder. Those setbacks taught me more about team balance and product scope than any easy win ever could.

**3. Training & Professional Certifications 🎓**

• **Information Technology Institute (ITI):** Completed Level 1 in Machine Learning & AI Engineering (mastering Pandas, mathematics, applied ML, and building [SpaceWorth.site](https://spaceworth.site)), and currently progressing through Level 2.

• **NVIDIA DLI Certificate of Competency:** *Building RAG Agents with LLMs* (vector databases, stateful memory agents, and microservice architectures).

• **Academic Honors:** Received the **Faculty of Artificial Intelligence Excellence Honor 3 times** from Horus University.

• **SaaS Strategy Training:** Completed hands-on marketing, personal branding, and SaaS product strategy at **AZ Tech Solutions** with Eng. Akram Zeyada.

**4. Shipped Products & Code 💻**

• [Verdict.run](https://verdict.run): My first comprehensive full-stack product. A Codeforces mirror that transforms classic problem pages into a modern LeetCode IDE with automated server-side submissions via Playwright and Scrapling; drove 120k+ impressions on its launch post.

• [icpchue.com](https://icpchue.com): Complete community learning platform featuring a library of recorded sessions, 650 curated problems, real-time leaderboard, and gamification badges (30k+ impressions).

• [sast.tech](https://sast.tech): Autonomous AI security agent designed for the 'Vibe Coding' era—scanning web applications and auto-fixing vulnerabilities in real time.

• [swrmz.tech](https://swrmz.tech): Want to sleep peacefully knowing your site is protected from DDoS? Automated Cloudflare Captcha orchestration that shields your endpoints while you sleep.

• [hellishgolf.xyz](https://hellishgolf.xyz): Daily Reddit browser mini-app golf game built with Vite and open-source 2D assets.

• [zerothreat.xyz](https://zerothreat.xyz): AI-powered antivirus featuring a native Windows WPF client and browser extension.

• [dcchub.xyz](https://dcchub.xyz): Comic-inspired contest platform designed outside my comfort zone.

• [spaceworth.site](https://spaceworth.site): ITI AI final project—real estate price regression model (90% accuracy) with interactive CAD drawing canvas and Gemini Vision parsing.

• Other shipped experiments: \`acolite.xyz\`, \`hexless.xyz\`, \`sketchz.xyz\`, and \`yousefdev.xyz\`.

All of these achievements are tied together in my portfolio at [yust.dev](https://yust.dev), backed by over **650+ GitHub commits** across the entire year.

A heartfelt thank you to all the professors and mentors who supported me through this journey: Dr. Hossam El-Din Moustafa, Dr. Basma Mostafa, Dr. Eman Raslan, Eng. Fatma Magdy, and Eng. Akram Zeyada.

Here's to an even bigger Level 3! 🚀`,
  },
  {
    id: "11",
    slug: "founding-icpc-hue-problem-solving-community",
    title: "No ICPC at Our College? Fine, We'll Build It Ourselves: The Story of ICPC HUE",
    seoTitle: "Founding ICPC HUE: From Zero to 8 ECPC Teams | yust.dev",
    date: "Aug 22, 2026",
    iso: "2026-08-22",
    category: "Community & ICPC",
    summary:
      "How an empty campus sparked Horus University's first competitive programming community from scratch, trained 300+ students, qualified 8 teams for ECPC, and inspired Verdict.run.",
    previewImage: "/static/images/mems/mem_11/1.webp",
    images: [
      "/static/images/mems/mem_11/1.webp",
      "/static/images/mems/mem_11/2.webp",
      "/static/images/mems/mem_11/3.webp",
      "/static/images/mems/mem_11/4.webp",
      "/static/images/mems/mem_11/5.webp",
    ],
    featured: [
      {
        label: "Original LinkedIn Post",
        url: "https://www.linkedin.com/posts/yousefmsm1_%D9%85%D9%81%D9%8A%D8%B4-icpc-%D9%81%D9%8A-%D9%83%D9%84%D9%8A%D8%AA%D9%86%D8%A7-%D8%AE%D9%84%D8%A7%D8%B5-%D9%87%D9%86%D8%B9%D9%85%D9%84%D9%87%D8%A7-%D8%A5%D8%AD%D9%86%D8%A7-%D9%85%D9%86-ugcPost-7496505059137130496-s-eU/",
      },
      { label: "Shortlink", url: "https://lnkd.in/p/e--z9__C" },
      { label: "ICPC HUE Official Platform", url: "https://icpchue.com" },
      { label: "Verdict.run IDE", url: "https://verdict.run" },
    ],
    content: `*"No ICPC in our college? Fine, we'll build it ourselves."*

Eight months ago, that single sentence marked the beginning of a journey where we built an entire university engineering community from the ground up—and sparked a software tool that reached **120,000 impressions in just 24 hours**.

**The Spark: An Empty Canvas**

The story began at the Faculty of Artificial Intelligence at [Horus University](https://horus.edu.eg), which was newly established in 2024. We were the inaugural first batch. There were zero student clubs, zero technical societies, and nobody knew where to turn. At the start of sophomore year, my colleague **Khaled** introduced me to competitive programming and the **ICPC**—explaining how algorithmic mastery is the direct gateway to software roles at top tier companies like Noon and FAANG, where technical interviews revolve around data structures and problem solving.

I asked myself a simple question: *Why don't we have this at Horus?*

Right then and there, **ICPC HUE** was born.

**Assembling the Founding Crew**

We pitched the vision to our faculty leaders—Dean **Prof. Dr. Hossam El-Din Moustafa**, **Dr. Basma Mostafa**, **Dr. Yasser Elawady**, **Eng. Fatma Magdy**, **Eng. Raafat M. Elmenayar**, and **Eng. Sara Lotfy**. Their immediate enthusiasm and institutional backing gave us the green light. Despite the early hurdles of finding instructors and curriculum resources, within a month we had assembled our core leadership team:

• **Ahmed Waleed:** Primary Instructor & Curriculum Architect.
• **Abdelrahman Mohsen:** Fundraiser & Operations Manager.
• **Yousef Mohammed Salah (Me):** Web Lead, Platform Developer, Media & Event Logistics.
• **Omar Hisham Mohamed Elshayal** & **Ebrahim Matar:** Co-Instructors.
• **Khaled Suleiman, Noha Kamal, Abdullah Shata, Mahmoud Elkholany:** Monitors and Academic Support.

**Five Months in the Trenches: Training 300+ Students**

Over 5 intense months, our single mission was spreading technical awareness and coaching students from zero. Our lead instructor, **Eng. Ahmed Waleed**, personally volunteered over **30 hours of foundational lectures** from scratch, complemented by daily problem-solving coaching in community chats.

To make problem solving intuitive and modern, I built and launched [icpchue.com](https://icpchue.com). The platform hosted **650 curated problems** ordered progressively from beginner to advanced (based on the renowned Assiut University training sheets), a complete archive of recorded lectures, live contest leaderboards, gamified achievements, and seasonal prizes.

We organized orientation days, online practice contests, offline collegiate scrimmages, and hosted the **DCC contest** on our campus in partnership with **ACPC Club Damietta University**.

Special thanks to the leaders of **ACPC DU** who supported us along the way: *Asem Gado, Belal Elbably, Omar Badr, Anas Al-Horigy, Hossam Hassan, and Abdo Sleem.*

**The Payoff: 8 Teams Qualified for ECPC**

When registration closed, we had registered **8 official teams from our Faculty of AI** for the Egyptian Collegiate Programming Contest (ECPC) qualifications—**6 of which were Level 1 freshmen** in their first year of programming!

**How ICPC Transformed My Engineering Career**

On a personal level, immersing myself in competitive programming dramatically leveled up my system design and algorithmic execution. That directly fueled our hackathon performances: **2nd Place** out of 600 participants at the **GDG Delta Hackathon**, and **3rd Place** at the **LUXSAI Hackathon** in Luxor.

Furthermore, when I noticed students hesitating to practice on Codeforces due to its dated 2000s interface, I engineered [Verdict.run](https://verdict.run)—a tool that allows you to change \`codeforces.com\` to \`codeforces.verdict.run\` in your URL bar and instantly renders the problem in a clean LeetCode IDE with headless server-side submissions via Playwright. When I posted the demo on LinkedIn, it exploded to **120,000 views within 24 hours**.

While my personal team didn't qualify for ECPC this season, what we built along the way—3 hackathon wins, production platforms, and lifelong brothers in engineering—was the real victory.`,
  },
  {
    id: "10",
    slug: "nvidia-building-rag-agents-certification",
    title: "Certified by NVIDIA: What I Learned Building Production RAG Agents with LLMs 🎓",
    seoTitle: "NVIDIA DLI: Building Production RAG Agents | yust.dev",
    date: "Aug 18, 2026",
    iso: "2026-08-18",
    category: "AI & Security",
    summary:
      "Key takeaways from earning the NVIDIA DLI Certificate of Competency in Building RAG Agents with LLMs: from vector search and stateful agents to LLM-as-a-Judge evaluation.",
    previewImage: "/static/images/mems/mem_10/1.webp",
    images: [
      "/static/images/mems/mem_10/1.webp",
      "/static/images/mems/mem_10/2.webp",
      "/static/images/mems/mem_10/3.webp",
      "/static/images/mems/mem_10/4.webp",
      "/static/images/mems/mem_10/5.webp",
    ],
    featured: [
      {
        label: "Original LinkedIn Post",
        url: "https://www.linkedin.com/posts/yousefmsm1_%D8%A7%D8%AE%D8%AF%D8%AA-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D9%85%D9%86-%D9%86%D9%8A%D9%81%D9%8A%D8%AF%D9%8A%D8%A7-building-rag-agents-ugcPost-7495168713294475264-18wt/",
      },
      { label: "Shortlink", url: "https://lnkd.in/p/eYrMWkdR" },
      {
        label: "Official NVIDIA Certificate Verification",
        url: "https://learn.nvidia.com/certificates?id=-FSgrCQAQuqN-DL-AaysPg",
      },
      { label: "All Certificates on yust.dev", url: "https://yust.dev/certificates" },
    ],
    content: `I recently earned the **NVIDIA Deep Learning Institute (DLI) Certificate of Competency** in **Building RAG Agents with LLMs**! 🎓

First, I want to express my deep gratitude to **Dr. Eman Raslan** for enabling this opportunity and mentoring us through the intensive program. Here is a breakdown of the core architectural lessons and practical takeaways I took away from the course:

**1. Enterprise Microservices over Monoliths**

Enterprise AI is not about dumping 3,000 lines of Python code into a single monolithic script. Real production systems decouple concerns into independently scalable microservices orchestrated via **Docker**: one service handles document ingestion and vectorization, another executes similarity search, a third hosts the agent loop, and another serves the user interface.

**2. Modern Serving Frameworks & Tooling**

I worked hands-on with enterprise AI platforms:
• **NVIDIA NIM / API Endpoints:** Accelerating LLM inference with optimized TensorRT-LLM runtimes.
• **AWS Infrastructure:** Cloud computing patterns for model serving.
• **Gradio:** Rapidly prototyping interactive frontend interfaces with minimal boilerplate.
• **LangServe:** Seamlessly deploying LangChain chains and agents as production-ready **REST APIs**.

**3. The Core Optimization Triangle: Cost, Latency, & Quality**

Every AI project balances three constraints: **Cost**, **Speed (Latency)**, and **Quality**. This trade-off is why **Retrieval-Augmented Generation (RAG)** has become the industry standard.

Instead of retraining or fine-tuning massive models from scratch to understand new data—which alters model weights, risks catastrophic forgetting, and costs a fortune—RAG dynamically injects relevant context from an external database at query time without ever modifying the base model itself.

**4. Vector Embeddings & Similarity Search with FAISS**

To feed unstructured data to the LLM accurately:
• Documents are split into semantic **Chunks** with defined token overlaps.
• High-dimensional **Embedding Models** convert text into mathematical vector spaces.
• **FAISS (Facebook AI Similarity Search)** indexes and retrieves nearest-neighbor vector chunks in sub-millisecond speeds.

**5. Constructing Stateful, Tool-Using Agents**

A static prompt-response chain is not an agent. We learned to build **Stateful Agents** equipped with conversational memory that:
• Retain dialog context across multiple turns.
• Intelligently extract parameters from user intent.
• Autonomously invoke external APIs and SQL databases via function calling without getting stuck in execution loops.

**6. Automated Evaluation via LLM-as-a-Judge**

The ultimate benchmark of production AI: **Evaluation**. Using the **LLM-as-a-Judge** methodology, an independent evaluator LLM grades retrieval quality, checks for groundedness, and verifies whether the synthesized answers are 100% factual according to the retrieved documents—systematically hunting down hallucinations.

It was an exceptional hands-on experience that directly shaped my approach to architecting AI agents and security tools.

- **Verify Certificate:** [NVIDIA Verification Page](https://learn.nvidia.com/certificates?id=-FSgrCQAQuqN-DL-AaysPg)
- **All Certificates:** [yust.dev/certificates](https://yust.dev/certificates)`,
  },
  {
    id: "9",
    slug: "designing-dcc-hub-comic-programming-contest-website",
    title: "Building DCC Hub: A Comic-Style Contest Journey",
    seoTitle: "Building DCC Hub: A Comic Contest Website | yust.dev",
    date: "Aug 9, 2026",
    iso: "2026-08-09",
    category: "Software Engineering",
    summary:
      "How I turned a brand kit and comic concept into a clear contest journey for 36+ teams from five Egyptian programming communities.",
    content: `Three days ago, [ICPCHue Community](https://eg.linkedin.com/in/icpchue) hosted the **DCC programming contest** at the Faculty of Artificial Intelligence, Horus University. The contest was organized by [ACPC Club Damietta University](https://www.linkedin.com/company/acpc-du/), bringing competitive programmers together for a full day of problem solving.

More than **36 teams from five communities** took part: [ICPC MNU Community](https://www.linkedin.com/company/icpc-mnu-community/), [ICPCHue Community](https://eg.linkedin.com/in/icpchue), [ICPC Delta Community](https://www.linkedin.com/company/ducpc-delta-community/), [ACPC NDETI Community](https://eg.linkedin.com/company/acpc-ndeti-community), and [ACPC Club Damietta University](https://www.linkedin.com/company/acpc-du/).

My role was to build the contest website, [DCC Hub](http://dcchub.xyz). This was the first time I deliberately stepped outside my design safe zone and tried to make something genuinely creative. At the beginning, all I had was the brand kit—the colors, typeface, logo, and one central direction: **comic books**.

The challenge was not simply to make the interface look like a comic. I wanted every panel and section to help visitors understand what to do next. A strong visual theme is useless if people cannot follow the experience, so the site had to feel expressive without turning into decoration or generic AI-generated noise.

I designed the journey as a clear sequence: contestants first submit their registration details, then move into the online qualification stage, and finally reach the offline contest. The comic language gave that sequence personality, while the information architecture kept each step readable and immediate.

That balance became the main lesson from the project: **creativity works best when it strengthens clarity**. The brand gave the site its voice, but structure made it useful. Building both together pushed me beyond the familiar portfolio-style layouts I had used before.

The event itself was a great day with the communities, organizers, and contestants. The gallery above includes all eleven photos from the original post, from the opening presentation and contest rooms to the teams and organizers who made the day happen.

You can also view the [original LinkedIn post](https://www.linkedin.com/posts/yousefmsm1_%D9%85%D9%86-3-%D8%A3%D9%8A%D8%A7%D9%85-%D9%83%D9%88%D9%85%D9%8A%D9%88%D9%86%D8%AA%D9%8A-icpchue-community-%D8%A7%D8%B3%D8%AA%D8%B6%D8%A7%D9%81-ugcPost-7492088643826778112-OWTg/) for the original Arabic story.`,
    previewImage: "/static/images/mems/mem_9/2.webp",
    images: [
      "/static/images/mems/mem_9/2.webp",
      "/static/images/mems/mem_9/1.webp",
      "/static/images/mems/mem_9/3.webp",
      "/static/images/mems/mem_9/4.webp",
      "/static/images/mems/mem_9/5.webp",
      "/static/images/mems/mem_9/6.webp",
      "/static/images/mems/mem_9/7.webp",
      "/static/images/mems/mem_9/8.webp",
      "/static/images/mems/mem_9/9.webp",
      "/static/images/mems/mem_9/10.webp",
      "/static/images/mems/mem_9/11.webp",
    ],
    featured: [
      {
        label: "Original LinkedIn Post",
        url: "https://www.linkedin.com/posts/yousefmsm1_%D9%85%D9%86-3-%D8%A3%D9%8A%D8%A7%D9%85-%D9%83%D9%88%D9%85%D9%8A%D9%88%D9%86%D8%AA%D9%8A-icpchue-community-%D8%A7%D8%B3%D8%AA%D8%B6%D8%A7%D9%81-ugcPost-7492088643826778112-OWTg/",
      },
      { label: "DCC Hub Contest Website", url: "http://dcchub.xyz" },
      { label: "ICPCHue Community", url: "https://eg.linkedin.com/in/icpchue" },
      {
        label: "ACPC Club Damietta University",
        url: "https://www.linkedin.com/company/acpc-du/",
      },
    ],
  },
  {
    id: "7",
    slug: "reddit-games-with-a-hook-hackathon-hellish-golf",
    title: "I Entered Reddit's Hackathon... and Built a Golf Game for Some Reason! ⛳",
    seoTitle: "Building Hellish Golf for Reddit Hackathon | yust.dev",
    date: "Aug 8, 2026",
    iso: "2026-08-08",
    category: "Hackathons",
    summary:
      "My takeaways from participating in Reddit's 'Games with a Hook' Devpost hackathon, building Hellish Golf as a daily browser mini-app without traditional game engines.",
    content: `I recently entered Reddit's **"Games with a Hook"** hackathon on Devpost, and... I ended up building a daily golf game!

In this post, I want to share some of the core insights and technical takeaways I gained from participating in this sprint.

### What Was the Hackathon About?

The core challenge was to build a **mini-app** formatted as an interactive game. To put it simply: remember *FarmVille* back on Facebook? That's the literal definition of a social mini-app.

Reddit's main objective for this hackathon was boosting daily active user retention. Unlike Telegram's play-to-earn monetization model, Reddit actually pays out monetization rewards directly to developers if your game succeeds. They are actively looking for addictive mini-games that give users a reason to open Reddit specifically to play every single day—not just scroll past two posts and leave. That daily retention hook was my primary focus.

### The Development Journey & Game Mechanics

When I discovered the hackathon on Devpost, I decided to build a **daily challenge game** inspired by Wordle's daily retention loop. I drew conceptual inspiration from *Kinda Hard Golf* and hit the ground running:

- **No Heavy Game Engines:** I deliberately chose not to use traditional engines like Unity or Godot since I didn't have extensive experience with them. Instead, I relied strictly on a lightweight **Vite + React** stack for both the frontend and backend logic.
- **Open-Source Assets:** For textures and visual elements, I leveraged open-source 2D asset packs from [itch.io](https://itch.io).

### The Outcome & Key Lessons

I completed the game on schedule and submitted the project on time. Unfortunately, I didn't take home a winning prize this round. However, it was an incredible learning experience in designing social mini-app loops and rapid game development. Plus, there are several more achievements dropping later this month that I'll be sharing soon! :)

### Check Out the Project & Code

- **Play the Game:** [hellishgolf.xyz](https://hellishgolf.xyz)
- **Devpost Submission:** [Devpost Software Entry](https://devpost.com/software/hellishgolf)
- **Reddit Winner Gallery:** [Devpost Project Gallery](https://redditgameswithahook.devpost.com/project-gallery)
- **Open-Source Code:** [GitHub Repository](https://github.com/YUST777/hellishgolf)`,
    previewImage: "/static/images/posters/hellishgolf.webp",
    previewVideo: "/videos/hellishgolf.webm",
    images: ["/static/images/posters/hellishgolf.webp"],
    featured: [
      {
        label: "Live Game: hellishgolf.xyz",
        url: "https://hellishgolf.xyz",
      },
      {
        label: "Devpost Submission Page",
        url: "https://devpost.com/software/hellishgolf",
      },
      {
        label: "Reddit Hackathon Winner Gallery",
        url: "https://redditgameswithahook.devpost.com/project-gallery",
      },
      {
        label: "GitHub Open-Source Code",
        url: "https://github.com/YUST777/hellishgolf",
      },
    ],
  },
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
    previewImage: "/static/images/mems/mem_2/gdg-preview.webp",
    imagePosition: "object-cover",
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
    previewImage: "/static/images/mems/mem_5/summit-preview.webp",
    imagePosition: "object-cover",
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
