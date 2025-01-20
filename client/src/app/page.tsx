"use client";
import "./globals.css";

import React from "react";
import AuthStatus from "./components/authStatus";
import { useAuth0 } from "@auth0/auth0-react";

// imports for active + inactive pages
import LoggedInPage from "./lounge/page/logged-in-page";
import LoggedOutPage from "./lounge/page/logged-out-page";

export default function Page() {
  // Auth contexts
  const { isAuthenticated } = useAuth0();

  return (
    <div className="min-h-screen bg-[#0D0D0E] p-1">
      <AuthStatus />
      {/* If authenticated, display LoggedInPage (regular lounge app). If not, display LoggedOutPage component */}
      {isAuthenticated ? <LoggedInPage /> : <LoggedOutPage />}
    </div>
  );
}
