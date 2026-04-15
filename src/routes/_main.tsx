import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import LocationIcon from "../components/icons/location";
import BoltIcon from "../components/icons/bolt";
import CloudSunIcon from "../components/icons/cloud-sun";

export const Route = createFileRoute("/_main")({
  component: MainLayout,
});

function MainLayout() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <main className="w-full pb-32 sm:pb-20 min-h-[calc(100vh-100px)]">
        <Outlet />
      </main>
      <footer className="max-w-5xl mx-auto pb-28 sm:pb-8 px-4 sm:px-6 text-[10px] sm:text-[11px] text-zinc-500 flex flex-col font-mono mt-12 gap-1.5 opacity-80">
        <p className="mb-1">
          {time 
            ? `${time.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} · ${time.toLocaleTimeString('en-US')}` 
            : "..."}
        </p>
        <p className="flex items-center gap-1.5"><LocationIcon className="w-3 h-3" /> Damietta, Egypt <span className="mx-1 text-zinc-700">·</span> <CloudSunIcon className="w-3 h-3" /> 20°C</p>
        <p className="flex items-center gap-1.5 mb-3"><BoltIcon className="w-3 h-3" /> 100%</p>
        
        <p className="text-zinc-600 mt-1">© {new Date().getFullYear()} Yousef. All rights reserved.</p>
      </footer>
    </>
  );
}
