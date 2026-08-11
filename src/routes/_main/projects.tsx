import { createFileRoute } from "@tanstack/react-router";
import Projects from "../../components/projects/Projects";
import { projectsData } from "@/components/projects/ProjectsData";
import { SITE_URL, buildRouteHead, jsonLdString, projectsCollectionSchema } from "@/lib/seo";

const TITLE = "Yousef's Projects | AI, Security & Full-Stack Builds";
const DESCRIPTION =
  "Explore Yousef Mohammed Salah's full-stack, AI security, Web3, and competitive programming projects, including Verdict.run and Sast.tech.";

const projectsSchema = projectsCollectionSchema(
  projectsData
    .filter((project) => project.slug && !project.isMinimal && !project.isLarge)
    .map((project) => ({
      name: project.title,
      url: `${SITE_URL}/projects/${project.slug}`,
      description: project.fullDescription ?? project.description,
    })),
);

export const Route = createFileRoute("/_main/projects")({
  head: () => {
    const base = buildRouteHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/projects",
      image: `${SITE_URL}/static/images/og-projects.png?v=2`,
    });
    return {
      ...base,
      links: [
        ...(base.links || []),
        {
          rel: "preload",
          as: "image",
          href: projectsData[0].poster,
          fetchPriority: "high",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLdString(projectsSchema),
        },
      ],
    };
  },
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="bg-transparent text-white pt-16 sm:pt-44">
      <section id="projects" className="bg-dark px-4 pb-20 md:px-6 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 px-0">
            <h1 className="font-pixel text-4xl uppercase text-white">PROJECTS</h1>
          </div>

          <Projects />
        </div>
      </section>
    </div>
  );
}
