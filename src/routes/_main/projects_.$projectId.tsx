import { Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { archiveProjectsData, projectsData } from "@/components/projects/ProjectsData";
import { DRAWER_COMPONENTS } from "@/components/projects/drawers";
import type { Project } from "@/components/projects/types";
import { SITE_URL, buildRouteHead, jsonLdString, projectPageSchema } from "@/lib/seo";

const projectPages = [...projectsData, ...archiveProjectsData].filter(
  (project): project is Project & { slug: string; seoTitle: string } =>
    Boolean(project.slug && project.seoTitle) && !project.isMinimal && !project.isLarge,
);

function getProject(projectId: string) {
  const norm = projectId.toLowerCase().replace(/[^a-z0-9]/g, "");
  return projectPages.find(
    (project) =>
      project.slug === projectId ||
      project.slug.replace(/[^a-z0-9]/g, "") === norm ||
      project.drawerId?.toLowerCase().replace(/[^a-z0-9]/g, "") === norm ||
      project.title.toLowerCase().replace(/[^a-z0-9]/g, "") === norm,
  );
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

  const DrawerComponent = project.drawerId ? DRAWER_COMPONENTS[project.drawerId] : null;

  return (
    <article className="mx-auto max-w-4xl px-4 pb-32 pt-8 sm:px-6 sm:pt-32">
      <Breadcrumbs
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Projects", url: `${SITE_URL}/projects` },
          { name: project.title, url: `${SITE_URL}/projects/${project.slug}` },
        ]}
      />

      <header className="mt-8 border-b border-white/10 pb-10">
        {project.tag && (
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            {project.tag}
          </p>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-300">
          {project.fullDescription ?? project.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {project.siteLink && (
            <a
              href={project.siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-85"
            >
              <span>Visit project</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5" />
              </svg>
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/40 hover:text-white"
            >
              <span>Source code</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5" />
              </svg>
            </a>
          )}
        </div>
      </header>

      {/* Video / Showcase Media */}
      {project.drawerId && (
        <div className="mt-10 w-full aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10 relative">
          {project.drawerId === "ICPCHUE" ? (
            <iframe
              src="https://www.youtube.com/embed/tH--wuGCMuM?autoplay=1&mute=1&loop=1&playlist=tH--wuGCMuM"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title="ICPC HUE Showcase Video"
            />
          ) : (
            <video
              src={`/videos/${project.drawerId === "giftsCharts" ? "giftscharts" : project.drawerId}.webm`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              title={`${project.title} detailed showcase video`}
            />
          )}
        </div>
      )}

      {/* Authentic Drawer Content Slider Info */}
      {DrawerComponent ? (
        <div className="mt-10 space-y-6">
          <Suspense fallback={<div className="text-zinc-500 font-mono text-xs">Loading showcase details...</div>}>
            <DrawerComponent />
          </Suspense>
        </div>
      ) : (
        <section className="mt-12">
          <p className="text-base leading-8 text-zinc-400">
            {project.fullDescription ?? project.description}
          </p>
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
