"use client";

import React, { useEffect, useMemo, useState } from "react";
import AuthStatus from "../components/authStatus";
import { useAuth0 } from "@auth0/auth0-react";
import LoggedOutPage from "../lounge/page/logged-out-page";
import { getLeaderboard } from "../../services/activity";
import { LeaderboardEntry } from "../../interfaces/leaderboard";

const POLL_INTERVAL_MS = 30000;

export default function LeaderboardPage() {
  const { isAuthenticated } = useAuth0();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const refreshLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
        setErrorMessage("");
        setLastUpdated(new Date());
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to load leaderboard right now.");
      } finally {
        setIsLoading(false);
      }
    };

    refreshLeaderboard();

    const intervalId = setInterval(() => {
      refreshLeaderboard();
    }, POLL_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const formattedLastUpdated = useMemo(() => {
    if (!lastUpdated) {
      return "Waiting for first update...";
    }

    return lastUpdated.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, [lastUpdated]);

  if (!isAuthenticated) {
    return <LoggedOutPage />;
  }

  return (
    <div className="flex min-h-screen bg-[#0D0D0E]">
      <AuthStatus />
      <main className="flex flex-1 p-4">
        <div className="w-full rounded-md bg-[#20222C] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#DEE7EC]">Leaderboard</h1>
            <div className="text-sm text-[#A7B2BE]">
              Updated: {formattedLastUpdated}
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 rounded border border-red-300/40 bg-red-500/10 p-3 text-sm text-red-200">
              {errorMessage}
            </div>
          )}

          {isLoading ? (
            <p className="text-[#A7B2BE]">Loading leaderboard...</p>
          ) : (
            <div className="overflow-hidden rounded border border-[#2A2D39]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#171922] text-left text-sm text-[#A7B2BE]">
                    <th className="px-4 py-3">Rank</th>
                    <th className="px-4 py-3">Executive</th>
                    <th className="px-4 py-3">Sign-outs</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr
                      key={`${entry.execName}-${index}`}
                      className="border-t border-[#2A2D39] text-[#DEE7EC]"
                    >
                      <td className="px-4 py-3">#{index + 1}</td>
                      <td className="px-4 py-3">{entry.execName}</td>
                      <td className="px-4 py-3">{entry.signoutCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {leaderboard.length === 0 && (
                <div className="p-4 text-sm text-[#A7B2BE]">
                  No leaderboard records yet.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
