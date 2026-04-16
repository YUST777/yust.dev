import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import LocationIcon from "../components/icons/location";
import BoltIcon from "../components/icons/bolt";
import CloudSunIcon from "../components/icons/cloud-sun";

export const Route = createFileRoute("/_main")({
  component: MainLayout,
});

function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <span>...</span>;

  return (
    <span>
      {time.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} · {time.toLocaleTimeString('en-US')}
    </span>
  );
}

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full pb-8">
        <Outlet />
      </main>
      <footer className="w-full max-w-5xl mx-auto pb-12 px-4 sm:px-6 text-[10px] sm:text-[11px] text-zinc-500 flex flex-col font-mono mt-auto gap-2 opacity-70">
        <div className="border-t border-white/5 pt-8 space-y-2">
          <p className="mb-1">
            <LiveClock />
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <p className="flex items-center gap-1.5"><LocationIcon className="w-3 h-3" /> Damietta, Egypt</p>
            <span className="hidden sm:inline text-zinc-800">·</span>
            <p className="flex items-center gap-1.5"><CloudSunIcon className="w-3 h-3" /> 20°C</p>
            <span className="hidden sm:inline text-zinc-800">·</span>
            <p className="flex items-center gap-1.5"><BoltIcon className="w-3 h-3" /> 100%</p>
          </div>
          <p className="text-zinc-600 pt-2 pb-4">© {new Date().getFullYear()} Yousef. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
