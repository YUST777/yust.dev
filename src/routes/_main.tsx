import { Outlet, createFileRoute, useLocation } from "@tanstack/react-router";

import LocationIcon from "@/components/icons/location";
import BoltIcon from "@/components/icons/bolt";
import CloudSunIcon from "@/components/icons/cloud-sun";

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
      <footer className="max-w-5xl mx-auto pb-28 sm:pb-8 px-4 sm:px-6 text-xs sm:text-[13px] text-zinc-500 flex flex-col font-mono mt-12 gap-2">
        <p className="mb-1">{new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} · {new Date().toLocaleTimeString('en-US')}</p>
        <p className="flex items-center gap-1.5"><LocationIcon className="w-4 h-4" /> Damietta, Egypt <span className="mx-1 text-zinc-700">·</span> <CloudSunIcon className="w-4 h-4" /> 20°C</p>
        <p className="flex items-center gap-1.5 mb-4"><BoltIcon className="w-4 h-4" /> 100%</p>
        
        <p className="text-zinc-600 mt-2">© {new Date().getFullYear()} Yousef. All rights reserved.</p>
      </footer>
    </>
  );
}
