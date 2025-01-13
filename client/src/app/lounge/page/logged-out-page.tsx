"use client";
import "../../globals.css";

import React from "react";

export default function LoggedOutPage() {

  // Auth contexts

  return (
    <div className="min-h-screen bg-[#0D0D0E] p-1">
        <div className="flex h-screen items-center justify-center">
          <p className="text-center text-lg text-white">
            Not Logged In
          </p>
        </div>
    </div>
  );
}
