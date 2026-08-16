"use client";

import React, { useState, useEffect } from "react";
import {
  generateFluctuatingTelemetry,
  LiveTelemetrySnapshot,
} from "@/lib/live-data";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { CpaAreaChart } from "@/components/dashboard/CpaAreaChart";
import { ChannelDonutChart } from "@/components/dashboard/ChannelDonutChart";
import {
  IndianRupee,
  Users,
  TrendingDown,
  Cpu,
  ShieldCheck,
  Calendar,
  DownloadCloud,
  Sparkles,
  ArrowUpRight,
  Target,
  Zap,
  Activity,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

export function LiveTelemetryView() {
  const [telemetry, setTelemetry] = useState<LiveTelemetrySnapshot>(() =>
    generateFluctuatingTelemetry()
  );
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [pulseCount, setPulseCount] = useState<number>(0);

  // Dynamic Live Simulation Hook: Polls every 6 seconds
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => generateFluctuatingTelemetry(prev));
      setPulseCount((c) => c + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  const handleSimulateSpike = () => {
    setTelemetry((prev) => {
      const next = generateFluctuatingTelemetry(prev);
      return {
        ...next,
        totalEnrollments: next.totalEnrollments + 18,
        totalSpend: next.totalSpend + 15400,
        blendedCPA: Math.round((next.totalSpend + 15400) / (next.totalEnrollments + 18)),
      };
    });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Top Banner / Command Center Live Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                isLiveActive
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                  : "bg-gray-500/10 text-gray-400 border-gray-500/20"
              }`}
              title="Toggle live telemetry simulation stream"
            >
              <span className="relative flex h-2 w-2">
                {isLiveActive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isLiveActive ? "bg-emerald-500" : "bg-gray-500"
                  }`}
                />
              </span>
              <span>{isLiveActive ? "Live Stream Active (6s Pulse)" : "Stream Paused"}</span>
            </button>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3 h-3" />
              Gemini 1.5 Pro Optimizing
            </span>

            <span className="text-[11px] font-mono text-gray-500">
              Updated: {telemetry.lastUpdated}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Omnichannel Telemetry Command
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time higher-ed marketing telemetry, dynamic candidate velocity, and CPA efficiency curves.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSimulateSpike}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all active:scale-95 shadow-md"
            title="Inject simulated lead ingestion batch"
          >
            <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Simulate Lead Spike</span>
          </button>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Aug 16, 2026</span>
          </div>
        </div>
      </div>

      {/* 1. Dynamic Top KPI Row (4 Cards Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Ad Spend */}
        <KpiCard
          title="Total Ad Spend"
          value={`₹${(telemetry.totalSpend / 100000).toFixed(2)} Lakh`}
          subtitle="live multi-channel budget"
          change="+18.4%"
          isPositiveChange={true}
          icon={IndianRupee}
          iconColor="text-blue-400"
        />

        {/* Total Verified Enrollments */}
        <KpiCard
          title="Total Enrollments"
          value={telemetry.totalEnrollments.toLocaleString()}
          subtitle="verified candidate inquiries"
          change="+24.8%"
          isPositiveChange={true}
          icon={Users}
          iconColor="text-emerald-400"
        />

        {/* Blended Cost Per Acquisition (CPA) */}
        <KpiCard
          title="Blended CPA"
          value={`₹${telemetry.blendedCPA.toLocaleString()}`}
          subtitle="cost per acquired student"
          change="-42.1%"
          isPositiveChange={true}
          icon={TrendingDown}
          iconColor="text-indigo-400"
        />

        {/* AI Orchestration & ROAS */}
        <KpiCard
          title="Pipeline ROAS"
          value={`${telemetry.roas}x`}
          subtitle={`Pipeline: ₹${(telemetry.activePipelineValue / 10000000).toFixed(2)} Cr`}
          isStatusCard={true}
          statusBadge="Active Autonomous"
          icon={Cpu}
          iconColor="text-emerald-400"
        />
      </div>

      {/* 2 & 3. Main Bento Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Center Main Bento Box: Dual-Axis CPA & Enrollment Area Chart (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Student Acquisition vs Cost Efficiency
              </h2>
              <p className="text-xs text-gray-400">
                Daily correlation between Student Enrollments and Cost Per Acquisition (CPA).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                CPA -50.9% Trend
              </span>
            </div>
          </div>

          <CpaAreaChart data={telemetry.timeSeries} />
        </div>

        {/* Channel Distribution Bento Box: Donut Chart (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <ChannelDonutChart data={telemetry.channels} />
        </div>
      </div>

      {/* Strategic AI Insights & Channel Highlights Bento Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Performer</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-base font-bold text-white">Google Search High-Intent</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Generating 114+ enrollments at an optimal ₹863 CPA with highest conversion velocity in STEM & MBA programs.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Growth Acceleration</span>
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-base font-bold text-white">Meta Reel Micro-Campaigns</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Lowest CPA channel at ₹782. AI creative studio scripts drove a 42% surge in undergraduate student inquiries.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Executive Target</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-base font-bold text-white">LinkedIn Executive Pipeline</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Captured 57+ corporate sponsored candidates. 3.2x higher lifetime student value despite senior executive targeting.
          </p>
        </div>
      </div>
    </div>
  );
}
