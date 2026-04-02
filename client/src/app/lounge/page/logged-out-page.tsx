"use client";
import "../../globals.css";

import React from "react";
import AuthStatus from "../../components/authStatus";

export default function LoggedOutPage() {
  // Auth contexts

  return (
    <div className="flex min-h-screen bg-[#0D0D0E]">
      <AuthStatus />
      <div className="flex flex-1 items-center justify-center p-4">
        <p className="text-center text-lg text-white">Not Logged In</p>
      </div>
    </div>
  );
}
