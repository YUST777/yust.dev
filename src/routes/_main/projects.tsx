import { createFileRoute } from "@tanstack/react-router";
import Projects from "../../components/legacy/Projects";
import "../../components/legacy/StaggeredMenu.css";

export const Route = createFileRoute("/_main/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="bg-transparent min-h-screen text-white w-full max-w-full overflow-hidden pt-0 sm:pt-[45px]">
      <Projects />
    </div>
  );
}
