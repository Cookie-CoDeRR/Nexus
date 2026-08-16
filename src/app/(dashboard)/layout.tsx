"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubtleMotionBackground } from "@/components/dashboard/SubtleMotionBackground";
import { UniversalCommandBar } from "@/components/dashboard/UniversalCommandBar";
import {
  Activity,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

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
      {/* 1. Subtle Motion Background (Geometric Grid + Slow Floating Orbs) */}
      <SubtleMotionBackground />

      {/* 2. Sleek Glassmorphic Top Header */}
      <header className="sticky top-0 z-30 w-full bg-[#0A0F1C]/80 backdrop-blur-md border-b border-white/5 px-6 lg:px-10 py-3.5 flex items-center justify-between transition-all duration-300">
        {/* Brand & Route Breadcrumb */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Activity className="h-4 w-4 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-sm font-extrabold tracking-wider text-white">
                NEXUS
              </span>
              <span className="block text-[9px] font-mono text-blue-400 tracking-widest uppercase">
                Enterprise OS
              </span>
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
