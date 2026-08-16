"use client";

import React from "react";
import {
  Activity,
  LayoutDashboard,
  Megaphone,
  Users,
  IndianRupee,
  TrendingDown,
  Cpu,
  ArrowUpRight,
  Sparkles,
  Layers,
} from "lucide-react";

export function HeroDashboardPreview() {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12 mb-20 px-4 perspective-[1000px] select-none">
      {/* Soft Glowing Ambient Shadow Underneath */}
      <div className="absolute inset-x-12 bottom-0 h-48 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* 3D Tilted Glass Container */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-2xl p-4 lg:p-7 shadow-[0_0_100px_rgba(59,130,246,0.25)] transition-all duration-700 hover:rotate-x-0 hover:scale-[0.98] group"
        style={{
          transform: "perspective(1000px) rotateX(15deg) translateY(20px) scale(0.95)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top Gradient Sheen Border */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80" />

        {/* Dashboard Shell Mockup */}
        <div className="flex gap-5 min-h-[460px]">
          {/* Mini Sidebar */}
          <div className="hidden md:flex flex-col justify-between w-48 border-r border-white/10 pr-4">
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-2">
                <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <span className="font-extrabold tracking-wider text-sm text-white">NEXUS OS</span>
              </div>

              <div className="space-y-1 text-xs font-medium">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Telemetry
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white transition-colors">
                  <Megaphone className="w-3.5 h-3.5" />
                  AI Studio
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  Leads CRM
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] text-gray-400 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Orchestrator Active
              </div>
              <p>Latency: 14ms</p>
            </div>
          </div>

          {/* Main Dashboard Canvas */}
          <div className="flex-1 space-y-5">
            {/* Mock Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">Admissions Telemetry Hub</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live Stream
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">Aggregated Meta, Google & LinkedIn Performance</p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-[11px]">
                  30-Day Window
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Auto-Bid
                </span>
              </div>
            </div>

            {/* 4 Mini KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-gray-400">
                  <span>TOTAL SPEND</span>
                  <IndianRupee className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="text-lg font-bold text-white">₹22.79 L</div>
                <div className="text-[10px] text-emerald-400 font-medium">+14.8% vs target</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-gray-400">
                  <span>ENROLLMENTS</span>
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-lg font-bold text-white">1,128</div>
                <div className="text-[10px] text-emerald-400 font-medium">+28.4% yield</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-gray-400">
                  <span>AVERAGE CPA</span>
                  <TrendingDown className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="text-lg font-bold text-white">₹1,473</div>
                <div className="text-[10px] text-emerald-400 font-medium">-50.9% efficiency</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-gray-400">
                  <span>AI BID ENGINE</span>
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="text-lg font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </div>
                <div className="text-[10px] text-gray-400 font-medium">Gemini 1.5 Pro</div>
              </div>
            </div>

            {/* Main Simulated Chart & Channel Split Bento */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-1">
              {/* Simulated Dual-Axis Area Chart (8 cols) */}
              <div className="lg:col-span-8 rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    CPA vs Enrollment Conversion Curve
                  </span>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="text-emerald-400">● Enrollments</span>
                    <span className="text-blue-400">● CPA (₹)</span>
                  </div>
                </div>

                {/* Simulated Chart SVG Wave */}
                <div className="h-32 w-full relative overflow-hidden rounded-lg bg-[#050811]/60 flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area under curve */}
                    <path
                      d="M0,90 Q40,85 80,70 T160,50 T240,40 T320,25 T400,15 L400,120 L0,120 Z"
                      fill="url(#heroGradient)"
                    />
                    {/* Green Enrollments Line */}
                    <path
                      d="M0,90 Q40,85 80,70 T160,50 T240,40 T320,25 T400,15"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                    />
                    {/* Blue CPA Line (Trending downward) */}
                    <path
                      d="M0,25 Q40,30 80,45 T160,65 T240,80 T320,95 T400,105"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Channel Breakdown Widget (4 cols) */}
              <div className="lg:col-span-4 rounded-xl border border-white/10 bg-white/5 p-4 space-y-2.5 flex flex-col justify-between">
                <div className="text-xs font-semibold text-white flex items-center justify-between">
                  <span>Channel Split</span>
                  <span className="text-[10px] text-gray-400">Omnichannel</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-blue-500" /> Google Search
                    </span>
                    <span className="font-mono text-white font-bold">46%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full w-[46%]" />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Meta (IG / FB)
                    </span>
                    <span className="font-mono text-white font-bold">34%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[34%]" />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-purple-500" /> LinkedIn Ed
                    </span>
                    <span className="font-mono text-white font-bold">20%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full w-[20%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
