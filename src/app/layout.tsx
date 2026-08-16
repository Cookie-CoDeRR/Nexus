import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEXUS | Command OS — Enterprise Marketing Telemetry & AI Orchestration",
  description:
    "Autonomous Campaign Telemetry and AI Orchestration Platform for Higher Education Institutions. Powered by Gemini AI.",
  icons: {
    icon: [
      { url: "/nexus-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/nexus-icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/nexus-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/nexus-icon-32.png",
  },
  openGraph: {
    title: "NEXUS Command OS",
    description: "Enterprise Marketing Telemetry & AI Orchestration Platform",
    images: [{ url: "/nexus-logo.png", width: 1024, height: 665, alt: "NEXUS Command OS" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS Command OS",
    description: "Enterprise Marketing Telemetry & AI Orchestration Platform",
    images: ["/nexus-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-[#050811] text-white antialiased min-h-screen selection:bg-blue-600 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
