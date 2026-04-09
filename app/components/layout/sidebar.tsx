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
    <aside className="w-full border-b bg-white md:w-64 md:border-b-0 md:border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold">AI PDF Chat</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Document assistant
        </p>
      </div>

      <nav className="px-4 pb-4 md:pb-6">
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
                    "block rounded-xl px-4 py-3 text-sm transition",
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-700 hover:bg-zinc-100",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}