import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/app/components/layout/app-shell";

export const metadata: Metadata = {
  title: "AI PDF Chat",
  description: "Document assistant with grounded answers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      style={{ scrollBehavior: "auto" }}
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
