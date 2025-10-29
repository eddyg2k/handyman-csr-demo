import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handyman CSR Dashboard Demo",
  description: "Prototype for external CSR management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-slate-900">{children}</body>
    </html>
  );
}
