import { Outlet, createFileRoute, useLocation } from "@tanstack/react-router";
import { MapPin, Zap } from "lucide-react";

export const Route = createFileRoute("/_main")({
  component: MainLayout,
});

function MainLayout() {
  const location = useLocation();
  const isProjects = location.pathname.includes("/projects");
  return (
    <>
      <main className={`mx-auto pt-8 sm:pt-32 pb-32 sm:pb-20 min-h-[calc(100vh-100px)] ${isProjects ? "px-0 w-full" : "max-w-5xl px-4 sm:px-6"}`}>
        <Outlet />
      </main>
      <footer className="max-w-5xl mx-auto pb-28 sm:pb-8 px-4 sm:px-6 text-xs text-zinc-600 flex justify-between font-mono">
        <div>
          <p>{new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          <p className="flex items-center gap-1.5"><MapPin size={12} className="text-zinc-500" /> DT, EG</p>
          <p className="flex items-center gap-1.5"><Zap size={12} className="text-zinc-500" /> 100%</p>
        </div>
        <div className="text-right flex flex-col justify-end">
          <p>© {new Date().getFullYear()} Yousef. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
