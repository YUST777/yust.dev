import { createFileRoute, Link } from "@tanstack/react-router";

import { SITE_URL, buildRouteHead, jsonLdString, webPageSchema } from "@/lib/seo";

const TITLE = "AI Security Projects & Autonomous Agents | yust.dev";
const DESCRIPTION =
  "Compare Sast.tech, SWRMZ, and Zero Threat: AI security projects by Yousef Mohammed Salah covering automated testing, patching, monitoring, and malware defense.";
const PAGE_URL = `${SITE_URL}/ai-security-projects`;

const securityProjects = [
  {
    name: "Sast.tech",
    slug: "sast-tech",
    focus: "Automated web security testing and code remediation",
    approach:
      "One autonomous agent finds vulnerabilities, verifies them, patches code, and reports the result.",
    bestFor: "Developers who want security checks inside a fast software delivery workflow.",
  },
  {
    name: "SWRMZ",
    slug: "swrmz",
    focus: "Cooperative AI agents for application security",
    approach:
      "A swarm of specialized agents hunts vulnerabilities, remediates issues, and guards runtime logs.",
    bestFor:
      "Teams exploring multi-agent coordination across testing, remediation, and monitoring.",
  },
  {
    name: "Zero Threat",
    slug: "zero-threat",
    focus: "A broader AI-powered cybersecurity ecosystem",
    approach:
      "A web platform, browser extension, and Windows agent combine download checks and malware analysis.",
    bestFor: "Users who need security coverage across browsing, files, and endpoint workflows.",
  },
];

const faqs = [
  {
    question: "What is an autonomous AI security agent?",
    answer:
      "It is a software agent that can perform a security workflow with limited manual intervention, such as discovering an application, testing for weaknesses, validating findings, and proposing or applying fixes.",
  },
  {
    question: "How is Sast.tech different from a static code scanner?",
    answer:
      "Sast.tech is designed around an end-to-end workflow: it inspects a live application and repository, tests findings, patches vulnerable code, and verifies the result instead of stopping at a list of warnings.",
  },
  {
    question: "Why use multiple AI agents for cybersecurity?",
    answer:
      "A multi-agent design can separate responsibilities such as reconnaissance, vulnerability analysis, remediation, and log monitoring while allowing the agents to share context and coordinate decisions.",
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
        { name: "AI Security Projects", url: PAGE_URL },
      ],
    }),
    {
      "@type": "ItemList",
      name: "AI security projects by Yousef Mohammed Salah",
      itemListElement: securityProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/projects/${project.slug}`,
        name: project.name,
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

export const Route = createFileRoute("/_main/ai-security-projects")({
  head: () => {
    const base = buildRouteHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/ai-security-projects",
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
  component: AiSecurityProjectsPage,
});

function AiSecurityProjectsPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 pb-32 pt-8 sm:px-6 sm:pt-32">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">
          AI security portfolio
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          AI security projects and autonomous agents
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-300">
          I built these projects to explore three different security problems: automatically finding
          and fixing vulnerable code, coordinating specialized security agents, and protecting users
          across browser and desktop workflows.
        </p>
      </header>

      <section className="mt-14" aria-labelledby="comparison-heading">
        <h2 id="comparison-heading" className="text-2xl font-semibold text-white sm:text-3xl">
          Project comparison
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[760px] w-full border-collapse text-left text-sm">
            <thead className="bg-white/[0.04] text-zinc-300">
              <tr>
                <th scope="col" className="px-5 py-4 font-medium">
                  Project
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Primary focus
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Approach
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Best fit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-zinc-400">
              {securityProjects.map((project) => (
                <tr key={project.slug} className="align-top">
                  <th scope="row" className="px-5 py-5 font-medium text-white">
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: project.slug }}
                      className="underline decoration-zinc-700 underline-offset-4 hover:decoration-zinc-300"
                    >
                      {project.name}
                    </Link>
                  </th>
                  <td className="px-5 py-5 leading-relaxed">{project.focus}</td>
                  <td className="px-5 py-5 leading-relaxed">{project.approach}</td>
                  <td className="px-5 py-5 leading-relaxed">{project.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="lessons-heading">
        <h2 id="lessons-heading" className="text-2xl font-semibold text-white sm:text-3xl">
          What these projects taught me
        </h2>
        <div className="mt-5 space-y-5 text-base leading-8 text-zinc-400">
          <p>
            Security automation is only useful when findings are reproducible. That is why the
            Sast.tech workflow emphasizes proof-of-concept testing and verification after a patch,
            rather than treating every scanner alert as equally reliable.
          </p>
          <p>
            Agent specialization can make a complex workflow easier to reason about. SWRMZ separates
            discovery, remediation, and runtime monitoring so each agent can focus on a narrower
            task while still contributing to one security objective.
          </p>
          <p>
            Security also extends beyond source code. Zero Threat combines web, browser, and Windows
            components because risky downloads and endpoint behavior require a different layer of
            protection than application testing.
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
            to="/hacks"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-zinc-200 hover:border-white/30 hover:text-white"
          >
            Hackathon results
          </Link>
          <Link
            to="/blog"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-zinc-200 hover:border-white/30 hover:text-white"
          >
            Build stories
          </Link>
        </div>
      </nav>
    </article>
  );
}
