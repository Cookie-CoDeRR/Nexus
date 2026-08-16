"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubtleMotionBackground } from "@/components/dashboard/SubtleMotionBackground";
import {
  Activity,
  LayoutDashboard,
  Megaphone,
  Users,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Search,
  Sliders,
  Menu,
  X,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      name: "Telemetry Command",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: "Live",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      name: "AI Content Studio",
      href: "/studio",
      icon: Megaphone,
      badge: "1.5 Pro",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      name: "Leads CRM",
      href: "/leads",
      icon: Users,
      badge: "Slate/SF",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
  ];

  const currentRouteName =
    navItems.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
      ?.name || "Command Center";

  return (
    <div className="relative min-h-screen bg-[#0A0F1C] text-[#E5E7EB] flex overflow-x-hidden selection:bg-blue-600 selection:text-white font-sans">
      {/* 1. Subtle Motion Background (Geometric Grid + Slow Floating Orbs) */}
      <SubtleMotionBackground />

      {/* 2. Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}

      {/* 3. Collapsible Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen border-r border-white/5 bg-[#0A0F1C]/90 md:bg-white/[0.02] backdrop-blur-2xl flex flex-col justify-between p-4 transition-all duration-300 ease-in-out z-50 ${
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "md:w-20" : "md:w-64"}`}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between mb-8 px-2">
            <Link href="/" className="flex items-center gap-2.5 overflow-hidden group">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-[0_0_15px_rgba(37,99,235,0.35)] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Activity className="h-4 w-4 text-white" strokeWidth={1.5} />
              </div>
              {(!collapsed || mobileOpen) && (
                <div className="transition-opacity duration-300">
                  <span className="text-sm font-extrabold tracking-wider text-white">
                    NEXUS
                  </span>
                  <span className="block text-[9px] font-mono text-blue-400 tracking-widest uppercase">
                    Command OS
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 hidden md:block"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-blue-600/15 text-white border border-blue-500/30 shadow-lg shadow-blue-600/10 font-semibold"
                      : "text-gray-400 hover:text-[#E5E7EB] hover:bg-white/[0.04] border border-transparent"
                  }`}
                  title={item.name}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
                        isActive ? "text-blue-400" : "text-gray-400"
                      }`}
                      strokeWidth={1.5}
                    />
                    {(!collapsed || mobileOpen) && <span>{item.name}</span>}
                  </div>

                  {(!collapsed || mobileOpen) && item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          {(!collapsed || mobileOpen) && (
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Postgres Pipeline</span>
              </div>
              <p className="text-[10px] text-gray-400">Prisma 7 Telemetry Active</p>
            </div>
          )}

          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-[#E5E7EB] hover:bg-white/5 transition-all duration-300 ease-in-out ${
              collapsed && !mobileOpen ? "justify-center" : ""
            }`}
          >
            <ExternalLink className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            {(!collapsed || mobileOpen) && <span>Landing Page</span>}
          </Link>
        </div>
      </aside>

      {/* 4. Main Body with Slim Glassmorphic Top-Bar */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Slim Glassmorphic Top-Bar */}
        <header className="sticky top-0 z-20 bg-[#0A0F1C]/80 backdrop-blur-md border-b border-white/5 px-6 py-3 flex items-center justify-between transition-all duration-300">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 md:hidden transition-colors"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">NEXUS</span>
              <span className="text-gray-400 font-mono">/</span>
              <span className="font-semibold text-white">{currentRouteName}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Real-time Status Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gemini 1.5 Pro: Active</span>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-gray-400 font-mono text-[11px]">
              <span>Latency: 14ms</span>
            </div>
          </div>
        </header>

        {/* 5. Max Width Container (prevents excessive stretch on ultrawides) */}
        <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
