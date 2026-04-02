"use client";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Component to render small window for auth status
const AuthStatus: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const pathname = usePathname();

  const navItems = [
    { href: "/hub", label: "Hub" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <aside className="flex min-h-screen w-56 flex-col border-r border-[#2A2D39] bg-[#171922] p-4 text-white">
      <div className="mb-6 border-b border-[#2A2D39] pb-4">
        <h2 className="text-xl font-semibold text-[#DEE7EC]">Lounge Hub</h2>
      </div>

      {isAuthenticated && (
        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/hub" && pathname === "/");

            return (
              <Link
                key={item.href}
                href={item.href}
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
      )}

      <div className="mt-auto border-t border-[#2A2D39] pt-4">
        <div className="mb-2 text-xs uppercase tracking-wide text-[#62667B]">
          {isAuthenticated ? "Logged in" : "Not logged in"}
        </div>
        {isAuthenticated ? (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="text-sm text-red-300 underline transition duration-300 ease-in-out hover:text-red-100"
          >
            Log out
          </button>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="text-sm text-green-400 underline transition duration-300 ease-in-out hover:text-green-200"
          >
            Log in
          </button>
        )}
      </div>
    </aside>
  );
};

export default AuthStatus;
