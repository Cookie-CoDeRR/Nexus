// NEXUS OS - Enterprise Release v1.0.0 (Production)
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LiveDataTicker } from "@/components/ui/LiveDataTicker";
import { HeroDashboardPreview } from "@/components/ui/HeroDashboardPreview";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { MouseSpotlight } from "@/components/landing/MouseSpotlight";
import { AuthCard } from "@/components/auth/AuthCard";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Lock,
  ChevronRight,
  Cpu,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <MouseSpotlight className="min-h-screen bg-[#050811] text-white flex flex-col justify-between overflow-x-hidden font-sans selection:bg-blue-600 selection:text-white">
      {/* ========================================================================= */}
      {/* TASK 1: AMBIENT BACKGROUND GLOWS (IMMERSION)                             */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Deep Purple Orb (Top Left) */}
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-purple-700/20 blur-[130px]" />

        {/* Electric Blue Orb (Center Right) */}
        <div className="absolute top-[25%] -right-32 w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[140px]" />

        {/* Soft Cyan / Indigo Orb (Bottom Center-Left) */}
        <div className="absolute bottom-10 left-[15%] w-[600px] h-[600px] rounded-full bg-cyan-600/15 blur-[130px]" />

        {/* Subtle Background Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* ========================================================================= */}
      {/* TOP NAVIGATION BAR                                                        */}
      {/* ========================================================================= */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 drop-shadow-[0_0_12px_rgba(99,102,241,0.55)]">
            <Image
              src="/nexus-icon-512.png"
              alt="NEXUS icon"
              fill
              sizes="36px"
              className="object-contain rounded-lg"
              priority
            />
          </div>
          <div className="relative h-7 w-[130px] hidden sm:block">
            <Image
              src="/nexus-logo.png"
              alt="NEXUS Command OS"
              fill
              sizes="130px"
              className="object-contain object-left"
              priority
            />
          </div>
          {/* Mobile fallback wordmark */}
          <span className="sm:hidden text-xl font-black tracking-widest bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            NEXUS
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <span>Live Terminal</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setShowAuthModal(true)}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 active:scale-95 shadow-lg shadow-black/40"
          >
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>Sign In</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* TASK 2: LIVE DATA TICKER (CONTINUOUS MOTION STREAM)                       */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full">
        <LiveDataTicker />
      </div>

      {/* ========================================================================= */}
      {/* HERO SECTION (CENTER STAGE)                                              */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-16 pb-6 max-w-5xl mx-auto">
        {/* Release Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-gray-300">Continuous Acquisition Telemetry</span>
          <span className="text-blue-400 font-mono text-[11px] bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
            Gemini 1.5 Pro Active
          </span>
        </motion.div>

        {/* Massive Tight-Tracked Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.06] max-w-4xl"
        >
          Autonomous Campaign{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.4)]">
            Telemetry.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl font-normal leading-relaxed"
        >
          Stop budget bleed. Let AI orchestrate your multi-channel acquisition across Google, Meta, and LinkedIn in real-time.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          {/* Primary CTA: Initialize Command Center */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-[1.5px] shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:shadow-[0_0_50px_rgba(37,99,235,0.7)] active:scale-[0.98] w-full sm:w-auto"
          >
            <div className="flex items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-bold text-white transition-all group-hover:from-blue-500 group-hover:to-indigo-500">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
              <span>Initialize Command Center</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Secondary CTA: Direct Live Dashboard */}
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-bold text-gray-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:border-white/20 active:scale-[0.98] w-full sm:w-auto shadow-lg shadow-black/40"
          >
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>Launch Live Dashboard</span>
          </Link>
        </motion.div>

        {/* Feature Pill Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400"
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
            <Cpu className="w-3.5 h-3.5 text-blue-400" /> Google & Meta Synchronized
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" /> Dual-Axis Telemetry
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" /> -50.9% Average CPA
          </span>
        </motion.div>

        {/* ========================================================================= */}
        {/* TASK 3: 3D FLOATING DASHBOARD UI (FILL THE EMPTY SPACE)                   */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full"
        >
          <HeroDashboardPreview />
        </motion.div>

        {/* ========================================================================= */}
        {/* SPLIT-PANEL FEATURE SHOWCASE SECTION                                      */}
        {/* ========================================================================= */}
        <div className="w-full">
          <FeatureShowcase />
        </div>
      </main>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 border-t border-white/5">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span>NEXUS Higher-Ed Marketing Telemetry OS. Enterprise Edition.</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span>PRISMA 7</span>
          <span>•</span>
          <span>GEMINI 1.5 PRO</span>
          <span>•</span>
          <span>SUPABASE AUTH</span>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* AUTHENTICATION MODAL DIALOG                                              */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-md"
            >
              <AuthCard onClose={() => setShowAuthModal(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MouseSpotlight>
  );
}
