import React from "react";
import {
  mockTimeSeriesData,
  mockChannelDistribution,
  mockKpiSummary,
} from "@/lib/mockData";
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
} from "lucide-react";
import { seedTelemetryIfEmpty } from "@/lib/firestoreService";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Ensure Firestore telemetry & campaigns matrix is initialized
  await seedTelemetryIfEmpty();

  const timeSeriesData = mockTimeSeriesData;
  const channelData = mockChannelDistribution;
  const kpis = mockKpiSummary;

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-6 lg:p-10 space-y-8">
      {/* Top Banner / Command Center Navigation Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Telemetry Live: 30-Day Window
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3 h-3" />
              Gemini Optimization Model
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Omnichannel Telemetry Command
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Higher Education Marketing Performance & Student Acquisition Telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Jul 18 - Aug 16, 2026</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all">
            <DownloadCloud className="w-4 h-4" />
            Export Telemetry
          </button>
        </div>
      </div>

      {/* 1. Top KPI Row (4 Cards Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Ad Spend (₹) */}
        <KpiCard
          title="Total Ad Spend"
          value={`₹${(kpis.totalSpend / 100000).toFixed(2)} Lakh`}
          subtitle="across 3 channels"
          change={`+${kpis.spendGrowth}%`}
          isPositiveChange={true}
          icon={IndianRupee}
          iconColor="text-blue-400"
        />

        {/* Total Enrollments */}
        <KpiCard
          title="Total Enrollments"
          value={kpis.totalEnrollments.toLocaleString()}
          subtitle="verified students"
          change={`+${kpis.enrollmentsGrowth}%`}
          isPositiveChange={true}
          icon={Users}
          iconColor="text-emerald-400"
        />

        {/* Average Cost Per Acquisition (CPA) */}
        <KpiCard
          title="Average CPA"
          value={`₹${kpis.averageCpa.toLocaleString()}`}
          subtitle="per enrolled student"
          change={`-${kpis.cpaReduction}%`}
          isPositiveChange={true}
          icon={TrendingDown}
          iconColor="text-indigo-400"
        />

        {/* AI Optimization Status */}
        <KpiCard
          title="AI Orchestration"
          value="Active"
          subtitle="Continuous Bid Synthesis"
          isStatusCard={true}
          statusBadge={kpis.aiStatus}
          icon={Cpu}
          iconColor="text-emerald-400"
        />
      </div>

      {/* 2 & 3. Main Bento Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Center Main Bento Box: Dual-Axis CPA & Enrollment Area Chart (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl flex flex-col justify-between">
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

          <CpaAreaChart data={timeSeriesData} />
        </div>

        {/* Channel Distribution Bento Box: Donut Chart (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl flex flex-col justify-between">
          <ChannelDonutChart data={channelData} />
        </div>
      </div>

      {/* Strategic AI Insights & Channel Highlights Bento Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Performer</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-base font-bold text-white">Google Search High-Intent</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Generating 524 enrollments at an optimal ₹2,000 CPA with highest conversion velocity in STEM & MBA programs.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Growth Acceleration</span>
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-base font-bold text-white">Meta Reel Micro-Campaigns</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Lowest CPA channel at ₹1,890. AI creative studio scripts drove a 42% surge in prospective student applications.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Executive Target</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-base font-bold text-white">LinkedIn Executive Pipeline</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Captured 194 corporate sponsored candidates. 3.2x higher lifetime student value despite higher baseline CPA.
          </p>
        </div>
      </div>
    </div>
  );
}
