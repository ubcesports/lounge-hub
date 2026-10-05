import React from "react";
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
      <body>{children}</body>
    </html>
  );
}
