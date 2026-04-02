"use client";
import "./globals.css";

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// imports for active + inactive pages
import LoggedInPage from "./lounge/page/logged-in-page";
import LoggedOutPage from "./lounge/page/logged-out-page";

export default function Page() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <LoggedInPage />;
  }

  return <LoggedOutPage />;
}
