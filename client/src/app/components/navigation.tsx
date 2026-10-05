"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/hub", label: "Hub" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-56 flex-col border-r border-[#2A2D39] bg-[#171922] p-4 text-white">
      <div className="mb-6 border-b border-[#2A2D39] pb-4">
        <h2 className="text-xl font-semibold text-[#DEE7EC]">Lounge Hub</h2>
      </div>

      <nav aria-label="Primary navigation" className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/hub" && pathname === "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-[#3A6AAC] text-[#DEE7EC]"
                  : "text-[#A7B2BE] hover:bg-[#20222C] hover:text-[#DEE7EC]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
