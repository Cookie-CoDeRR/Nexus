import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEXUS | Enterprise Marketing Telemetry & AI Orchestration",
  description: "Autonomous Campaign Telemetry and AI Orchestration Platform for Higher Education Institutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#050811] text-white antialiased min-h-screen selection:bg-blue-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
