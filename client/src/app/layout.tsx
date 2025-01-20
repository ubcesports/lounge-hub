import React from "react";
import AuthContext from "./contexts/AuthContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lounge Hub",
  description: "UBC E-sports Association Lounge App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
