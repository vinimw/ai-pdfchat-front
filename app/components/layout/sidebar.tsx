"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/documents", label: "Documents" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="app-surface relative w-full border-b px-4 py-4 md:sticky md:top-0 md:flex md:h-screen md:w-72 md:flex-col md:border-b-0 md:border-r md:px-5 md:py-5">
      <div className="app-hero rounded-[18px] p-6 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
          AI PDF Chat
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          Chat grounded in your documents
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Upload PDFs, organize files, and ask precise questions with source
          context.
        </p>
      </div>

      <nav className="mt-4 px-1 pb-2 md:mt-6 md:flex-1 md:pb-0">
        <p className="px-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Navigation
        </p>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "group mt-2 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
                      : "text-slate-700 hover:bg-white/70 hover:text-slate-900",
                  ].join(" ")}
                >
                  {item.label}
                  <span
                    className={[
                      "h-2.5 w-2.5 rounded-full",
                      isActive
                        ? "bg-amber-300"
                        : "bg-slate-300 transition group-hover:bg-cyan-600",
                    ].join(" ")}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="app-card mt-4 rounded-[16px] p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-900">Workspace ready</p>
        <p className="mt-2 leading-6">
          Use the documents area to upload files and open a chat session with
          persistent history.
        </p>
      </div>
    </aside>
  );
}
