"use client";

import React from "react";
import LoggedInPage from "../lounge/page/logged-in-page";
import LoggedOutPage from "../lounge/page/logged-out-page";
import { useAuth0 } from "@auth0/auth0-react";

export default function HubPage() {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <LoggedOutPage />;
  }

  return <LoggedInPage />;
}
