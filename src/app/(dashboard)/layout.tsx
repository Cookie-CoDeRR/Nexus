"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GlobalNotebookBg } from "@/components/ui/GlobalNotebookBg";
import { UniversalCommandBar } from "@/components/dashboard/UniversalCommandBar";
import { ExternalLink, ShieldCheck } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getRouteTitle = () => {
    if (pathname.includes("/dashboard")) return "Telemetry Command";
    if (pathname.includes("/studio")) return "AI Content Studio";
    if (pathname.includes("/alerts")) return "Anomaly Sentinel";
    if (pathname.includes("/leads")) return "Leads CRM";
    if (pathname.includes("/settings")) return "Settings & Integrations";
    if (pathname.includes("/profile")) return "Profile & Enterprise Tier";
    return "Command Center";
  };

  return (
    <div className="relative min-h-screen bg-[#0A0F1C] text-[#E5E7EB] selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden flex flex-col">
      {/* 1. Global Notebook Background — Framer Motion idle-breathing orbs + floating card silhouettes */}
      <GlobalNotebookBg />

      {/* 2. Sleek Glassmorphic Top Header */}
      <header className="sticky top-0 z-30 w-full bg-[#0A0F1C]/80 backdrop-blur-md border-b border-white/5 px-6 lg:px-10 py-3.5 flex items-center justify-between transition-all duration-300">
        {/* Brand & Route Breadcrumb */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            {/* NEXUS Logo — icon mark only (square crop) */}
            <div className="relative h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">
              <Image
                src="/nexus-icon-512.png"
                alt="NEXUS icon"
                fill
                sizes="36px"
                className="object-contain rounded-lg"
                priority
              />
            </div>
            {/* Full wordmark logo */}
            <div className="relative hidden sm:block h-7 w-[130px]">
              <Image
                src="/nexus-logo.png"
                alt="NEXUS Command OS"
                fill
                sizes="130px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <span className="text-gray-600 font-mono hidden sm:inline">/</span>

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="font-semibold text-white">{getRouteTitle()}</span>
          </div>
        </div>

        {/* Status Indicators & Landing Gateway */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Gemini 1.5 Pro: Active</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-gray-400 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Telemetry Pipeline: 14ms</span>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            title="Return to Public Landing Page"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Landing Page</span>
          </Link>
        </div>
      </header>

      {/* 3. Full-Width Expanded Canvas with Bottom Offset */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 pt-6 pb-28">
        {children}
      </main>

      {/* 4. Universal AI Command & Navigation Bar (Floating Dock) */}
      <UniversalCommandBar />
    </div>
  );
}
