"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Activity,
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  Copy,
  Check,
  Share2,
  Video,
  Search,
  Sliders,
  ShieldCheck,
} from "lucide-react";

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState<"linkedin" | "instagram" | "google">("linkedin");
  const [copied, setCopied] = useState(false);
  const [reallocated, setReallocated] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copySnippets = {
    linkedin: {
      title: "Executive Master of AI & Data Engineering",
      copy: "Accelerate your career in AI systems engineering. Fall 2026 admissions open with $25k merit fellowships for tech leaders. Apply now: nexus.edu/ms-ai",
      chars: "148 / 3,000 chars",
      icon: Share2,
      channelColor: "text-blue-400",
    },
    instagram: {
      title: "Reel Script // STEM Admissions",
      copy: "[HOOK]: Stop studying theory. Build real models with top faculty.\n[CTA]: Priority admissions closing this Friday. Tap link in bio.",
      chars: "135 / 2,200 chars",
      icon: Video,
      channelColor: "text-pink-400",
    },
    google: {
      title: "Search Ad Package // High Intent",
      copy: "Headline: Ranked #1 MS in Artificial Intelligence | Apply 2026\nDesc: 100% placement rate. Evening & hybrid options for engineers.",
      chars: "128 / 180 chars",
      icon: Search,
      channelColor: "text-amber-400",
    },
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-20 space-y-28 select-none">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Layers className="w-3.5 h-3.5" />
          Enterprise Telemetry Capabilities
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Engineered for Modern Higher-Ed Growth
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Replace fragmented ad dashboards with an intelligent, autonomous telemetry layer.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* ROW 1: Omnichannel Telemetry Engine (Text Left, Mockup Right)             */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12"
      >
        {/* Text Side (Left) */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span>📊 Real-Time Ingestion</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Unified Multi-Channel Telemetry in Sub-Second Real-Time.
          </h3>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Aggregates live campaign spend, impression volume, and conversion metrics across Meta Ads, Google Ads, and LinkedIn into a single normalized data stream.
          </p>

          <ul className="space-y-3.5 pt-2">
            <li className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
              <span>Automated Cost-Per-Acquisition (CPA) normalization</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
              <span>Millisecond time-series aggregation</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
              <span>Cross-platform budget attribution</span>
            </li>
          </ul>
        </div>

        {/* Mockup Side (Right) */}
        <div className="relative group">
          {/* Ambient Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-cyan-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-2xl space-y-5 overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono font-bold text-white tracking-wider">LIVE TELEMETRY STREAM</span>
              </div>
              <span className="text-[11px] font-mono text-gray-400">12ms sync</span>
            </div>

            {/* Glowing Metric Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>Google High-Intent</span>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
                <div className="text-xl font-bold text-white">₹28,450</div>
                <div className="text-[10px] text-emerald-400 font-medium">+14.2% conversions</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>Meta Reels Funnel</span>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
                <div className="text-xl font-bold text-white">₹14,200</div>
                <div className="text-[10px] text-emerald-400 font-medium">₹1,890 optimal CPA</div>
              </div>
            </div>

            {/* SVG Mini Area Curve */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs text-gray-300">
                <span className="font-semibold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  Conversion Velocity Curve
                </span>
                <span className="text-cyan-400 font-mono font-bold">+28.4% Yield</span>
              </div>

              <div className="h-28 w-full rounded-xl bg-[#050811]/80 border border-white/5 overflow-hidden flex items-end p-1">
                <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="telemetryGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,65 Q30,60 60,45 T120,35 T180,25 T240,15 T300,5 L300,80 L0,80 Z"
                    fill="url(#telemetryGrad)"
                  />
                  <path
                    d="M0,65 Q30,60 60,45 T120,35 T180,25 T240,15 T300,5"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* ROW 2: AI Campaign Orchestration & ROI Allocator (Mockup Left, Text Right) */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12"
      >
        {/* Mockup Side (Left on desktop, order-2 lg:order-1) */}
        <div className="relative group order-2 lg:order-1">
          {/* Ambient Emerald Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/30 to-teal-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-2xl space-y-5 overflow-hidden">
            {/* Header Status */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                  AI HEURISTIC AUDIT // COMPLETE
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                98.6% CONFIDENCE
              </span>
            </div>

            {/* AI Recommendation Prompt Card */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Autonomous Optimization Directive
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-sans">
                &ldquo;Shift <span className="text-emerald-400 font-bold">18% ad spend</span> from LinkedIn to Meta Ads — <span className="text-emerald-400 font-bold">42% lower CPL</span> detected on undergraduate engineering funnels.&rdquo;
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setReallocated(!reallocated)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                    reallocated
                      ? "bg-emerald-600 text-white"
                      : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/20"
                  }`}
                >
                  {reallocated ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Reallocation Applied (₹45,000 Shifted)</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Apply Reallocation ⚡</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Real-time Attribution Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-400">ESTIMATED YIELD</span>
                <p className="text-base font-bold text-white">+38 Qualified Leads</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-400">PROJECTED CPA</span>
                <p className="text-base font-bold text-emerald-400">₹1,473 (-50.9%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Side (Right on desktop, order-1 lg:order-2) */}
        <div className="space-y-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span>🧠 Gemini 1.5 Orchestration</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Autonomous Budget Reallocation & Anomaly Detection.
          </h3>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Stop manual spreadsheet calculations. NEXUS continuously scans conversion trajectories and reallocates capital to top-performing ad channels.
          </p>

          <ul className="space-y-3.5 pt-2">
            <li className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Predictive lead conversion scoring</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Anomaly alerts on sudden CPA spikes</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Zero-latency optimization triggers</span>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* ROW 3: Generative Content Studio (Text Left, Mockup Right)                */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12"
      >
        {/* Text Side (Left) */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <span>✍️ Context-Aware Copywriting</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Instant Multi-Format Ad Creatives Aligned to Brand Tone.
          </h3>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Transform single campaign objectives into high-converting copy across LinkedIn, Instagram Reels, and Google Search in seconds using custom brand vector embeddings.
          </p>

          <ul className="space-y-3.5 pt-2">
            <li className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
              <span>Tailored student persona prompting (Undergrad, Postgrad, Parents)</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
              <span>One-click clipboard export</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
              <span>Vector-grounded brand voice enforcement</span>
            </li>
          </ul>
        </div>

        {/* Mockup Side (Right) */}
        <div className="relative group">
          {/* Ambient Purple Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-pink-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-2xl space-y-4 overflow-hidden">
            {/* Tab Selector */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
              {(["linkedin", "instagram", "google"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold capitalize transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab === "linkedin" ? "LinkedIn" : tab === "instagram" ? "Instagram" : "Google Ads"}
                </button>
              ))}
            </div>

            {/* Tab Content Display */}
            <div className="rounded-xl border border-white/5 bg-[#050811]/90 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  {React.createElement(copySnippets[activeTab].icon, {
                    className: `w-4 h-4 ${copySnippets[activeTab].channelColor}`,
                  })}
                  <span className="text-xs font-bold text-white">
                    {copySnippets[activeTab].title}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">
                  {copySnippets[activeTab].chars}
                </span>
              </div>

              <div className="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-line min-h-[70px]">
                {copySnippets[activeTab].copy}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[10px] text-gray-400">Tone: Professional</span>
                <button
                  type="button"
                  onClick={() => handleCopy(copySnippets[activeTab].copy)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Brand Compliance Verified
              </span>
              <span className="font-mono text-purple-400">Gemini 1.5 Pro</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
