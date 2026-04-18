import { createFileRoute } from "@tanstack/react-router";
import Projects from "../../components/legacy/Projects";
import "../../components/legacy/StaggeredMenu.css";

export const Route = createFileRoute("/_main/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Yousef Mohammed Salah" },
      {
        name: "description",
        content:
          "Explore my technical project gallery, from cybersecurity ecosystems to viral developer platforms. Highlighting Verdict.run, ICPC HUE, and GiftsChart.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="bg-transparent text-white pt-0 sm:pt-[45px]">
      <Projects />
    </div>
  );
}
