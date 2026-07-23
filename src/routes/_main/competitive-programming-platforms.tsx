import { createFileRoute, Link } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE_URL, buildRouteHead, jsonLdString, webPageSchema } from "@/lib/seo";

const TITLE = "Competitive Programming Tools & Platforms | yust.dev";
const DESCRIPTION =
  "Explore Verdict.run and ICPC HUE by Yousef Mohammed Salah: gamified competitive programming platforms and algorithm training tools for ICPC problem solvers.";
const PAGE_URL = `${SITE_URL}/competitive-programming-platforms`;

const cpPlatforms = [
  {
    name: "Verdict.run",
    slug: "verdict-run",
    focus: "Viral competitive programming duel platform",
    features: "Head-to-head live 1v1 duels, automated code judging, instant rating system.",
    bestFor: "Developers wanting fast, competitive, real-time problem-solving battles.",
  },
  {
    name: "ICPC HUE",
    slug: "icpc-hue",
    focus: "Gamified university algorithm training platform",
    features: "650+ algorithm problems, contest dashboards, ECPC/ICPC preparation tracks.",
    bestFor: "University teams and students preparing for regional ICPC competitions.",
  },
];

const faqs = [
  {
    question: "What is Verdict.run?",
    answer:
      "Verdict.run is a competitive programming platform designed for fast, real-time 1v1 problem-solving duels. It garnered over 120k organic impressions on LinkedIn upon launch.",
  },
  {
    question: "How does ICPC HUE help in ICPC training?",
    answer:
      "ICPC HUE is a gamified training ecosystem built for student competitive programmers in Egypt. It offers 650+ algorithm problems categorized by topic, difficulty, and past contest tags.",
  },
  {
    question: "What technologies power these competitive programming platforms?",
    answer:
      "Both platforms are built with Next.js, Supabase, and real-time WebSockets, utilizing isolated code execution containers for secure multi-language judging.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema({
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      type: "CollectionPage",
      breadcrumbs: [
        { name: "Home", url: SITE_URL },
        { name: "Competitive Programming Platforms", url: PAGE_URL },
      ],
    }),
    {
      "@type": "ItemList",
      name: "Competitive Programming Platforms by Yousef Mohammed Salah",
      itemListElement: cpPlatforms.map((platform, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/projects/${platform.slug}`,
        name: platform.name,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export const Route = createFileRoute("/_main/competitive-programming-platforms")({
  head: () => {
    const base = buildRouteHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/competitive-programming-platforms",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLdString(pageSchema),
        },
      ],
    };
  },
  component: CpPlatformsPage,
});

function CpPlatformsPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 pb-32 pt-8 sm:px-6 sm:pt-32">
      <Breadcrumbs
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Competitive Programming Platforms", url: PAGE_URL },
        ]}
      />

      <header className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
          Competitive programming portfolio
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Competitive programming platforms and tools
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-300">
          I engineered Verdict.run and ICPC HUE to empower algorithm problem solvers and ICPC teams.
          These platforms combine real-time code evaluation, gamified duels, and structured training
          tracks.
        </p>
      </header>

      <section className="mt-14" aria-labelledby="comparison-heading">
        <h2 id="comparison-heading" className="text-2xl font-semibold text-white sm:text-3xl">
          Platform overview
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[760px] w-full border-collapse text-left text-sm">
            <thead className="bg-white/[0.04] text-zinc-300">
              <tr>
                <th scope="col" className="px-5 py-4 font-medium">
                  Platform
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Primary focus
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Key features
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Best fit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-zinc-400">
              {cpPlatforms.map((platform) => (
                <tr key={platform.slug} className="align-top">
                  <th scope="row" className="px-5 py-5 font-medium text-white">
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: platform.slug }}
                      className="underline decoration-zinc-700 underline-offset-4 hover:decoration-zinc-300"
                    >
                      {platform.name}
                    </Link>
                  </th>
                  <td className="px-5 py-5 leading-relaxed">{platform.focus}</td>
                  <td className="px-5 py-5 leading-relaxed">{platform.features}</td>
                  <td className="px-5 py-5 leading-relaxed">{platform.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="lessons-heading">
        <h2 id="lessons-heading" className="text-2xl font-semibold text-white sm:text-3xl">
          Engineering competitive programming systems
        </h2>
        <div className="mt-5 space-y-5 text-base leading-8 text-zinc-400">
          <p>
            Building code judgment engines requires sub-second latency and sandboxed execution. Verdict.run
            uses real-time WebSocket state synchronization so competitors feel instantaneous feedback during
            1v1 battles.
          </p>
          <p>
            Structured curriculum design boosts user retention. ICPC HUE breaks complex algorithms into
            level-based progression tracks so university students can step up from basic data structures to
            advanced graph theory and dynamic programming.
          </p>
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold text-white sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-white/10 p-5 open:bg-white/[0.02]"
            >
              <summary className="cursor-pointer list-none font-medium text-zinc-200 marker:hidden group-open:text-white">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <nav aria-labelledby="next-heading" className="mt-14 border-t border-white/10 pt-10">
        <h2 id="next-heading" className="text-2xl font-semibold text-white">
          Explore the work
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-zinc-200 hover:border-white/30 hover:text-white"
          >
            All project case studies
          </Link>
          <Link
            to="/ai-security-projects"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-zinc-200 hover:border-white/30 hover:text-white"
          >
            AI security pillar
          </Link>
          <Link
            to="/hacks"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-zinc-200 hover:border-white/30 hover:text-white"
          >
            Hackathon results
          </Link>
        </div>
      </nav>
    </article>
  );
}
