import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { archiveProjectsData, projectsData } from "@/components/projects/ProjectsData";
import type { Project } from "@/components/projects/types";
import { SITE_URL, buildRouteHead, jsonLdString, projectPageSchema } from "@/lib/seo";

const projectPages = [...projectsData, ...archiveProjectsData].filter(
  (project): project is Project & { slug: string; seoTitle: string } =>
    Boolean(project.slug && project.seoTitle) && !project.isMinimal && !project.isLarge,
);

function getProject(projectId: string) {
  return projectPages.find((project) => project.slug === projectId);
}

function getMetaDescription(project: Project) {
  const description = project.fullDescription ?? project.description;
  return description.length <= 155 ? description : `${description.slice(0, 152).trimEnd()}…`;
}

export const Route = createFileRoute("/_main/projects_/$projectId")({
  loader: ({ params }) => {
    const project = getProject(params.projectId);
    if (!project) throw notFound();
    return project;
  },
  head: ({ params }) => {
    const project = getProject(params.projectId);
    if (!project) {
      return buildRouteHead({
        title: "Project Not Found | yust.dev",
        description: "The requested project case study could not be found.",
        path: `/projects/${params.projectId}`,
        noindex: true,
      });
    }

    const url = `${SITE_URL}/projects/${project.slug}`;
    const description = getMetaDescription(project);
    const base = buildRouteHead({
      title: project.seoTitle,
      description,
      path: `/projects/${project.slug}`,
    });

    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLdString(
            projectPageSchema({
              url,
              name: project.title,
              description,
              category: project.tag || "Software application",
              technologies: project.technologies ?? [],
            }),
          ),
        },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  const relatedProjects = projectPages
    .filter((candidate) => candidate.slug !== project.slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-4xl px-4 pb-32 pt-8 sm:px-6 sm:pt-32">
      <Breadcrumbs
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Projects", url: `${SITE_URL}/projects` },
          { name: project.title, url: `${SITE_URL}/projects/${project.slug}` },
        ]}
      />

      <Link
        to="/projects"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <span aria-hidden="true">←</span> All projects
      </Link>

      <header className="mt-10 border-b border-white/10 pb-10">
        {project.tag && (
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            {project.tag}
          </p>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-300">
          {project.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {project.siteLink && (
            <a
              href={project.siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-85"
            >
              Visit project <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/40 hover:text-white"
            >
              Source code <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </header>

      <section className="mt-12" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="text-2xl font-semibold text-white">
          What it does
        </h2>
        <p className="mt-4 text-base leading-8 text-zinc-400">
          {project.fullDescription ?? project.description}
        </p>
      </section>

      {project.features && project.features.length > 0 && (
        <section className="mt-12" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-2xl font-semibold text-white">
            Key features
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.features.map((feature) => (
              <section
                key={feature.category}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <h3 className="font-medium text-white">{feature.category}</h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                  {feature.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      )}

      {project.technologies && project.technologies.length > 0 && (
        <section className="mt-12" aria-labelledby="technology-heading">
          <h2 id="technology-heading" className="text-2xl font-semibold text-white">
            Technology
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-zinc-400"
              >
                {technology}
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav
        aria-labelledby="related-projects-heading"
        className="mt-14 border-t border-white/10 pt-10"
      >
        <h2 id="related-projects-heading" className="text-2xl font-semibold text-white">
          More project case studies
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {relatedProjects.map((relatedProject) => (
            <li key={relatedProject.slug}>
              <Link
                to="/projects/$projectId"
                params={{ projectId: relatedProject.slug }}
                className="group block h-full rounded-xl border border-white/10 p-4 transition-colors hover:border-white/25 hover:bg-white/[0.02]"
              >
                <span className="text-sm text-zinc-200 group-hover:text-white">
                  {relatedProject.title}
                </span>
                <span className="mt-2 block text-xs text-zinc-500">{relatedProject.tag}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
