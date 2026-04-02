"use client";

import React from "react";
import AuthStatus from "../components/authStatus";
import { useAuth0 } from "@auth0/auth0-react";
import LoggedOutPage from "../lounge/page/logged-out-page";

export default function LeaderboardPage() {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <LoggedOutPage />;
  }

  return (
    <div className="flex min-h-screen bg-[#0D0D0E]">
      <AuthStatus />
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="rounded-md bg-[#20222C] p-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-[#DEE7EC]">
            Leaderboard
          </h1>
          <p className="text-[#A7B2BE]">Leaderboard page coming soon.</p>
        </div>
      </main>
    </div>
  );
}
