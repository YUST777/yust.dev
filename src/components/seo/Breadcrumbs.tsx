import { Link } from "@tanstack/react-router";

import type { BreadcrumbItem } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8 font-mono text-[11px] uppercase tracking-[0.16em]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-zinc-600">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-zinc-800">
                  /
                </span>
              )}
              {isCurrent ? (
                <span aria-current="page" className="text-zinc-400">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url.replace("https://www.yust.dev", "") || "/"}
                  className="hover:text-zinc-300 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
