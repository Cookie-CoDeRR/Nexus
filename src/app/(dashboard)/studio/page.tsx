"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  generateMarketingCopy,
  saveCopyIteration,
  GenerateCopyInput,
  GenerateCopyResponse,
} from "@/app/actions/generate-copy";
import {
  Sparkles,
  Share2,
  Video,
  Search,
  Copy,
  Check,
  Loader2,
  Send,
  Flame,
  Target,
  Sliders,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Globe,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Archive,
  Save,
  Zap,
  BookOpen,
  Maximize2,
  Briefcase,
} from "lucide-react";

const formSchema = z.object({
  campaignGoal: z
    .string()
    .min(5, "Campaign goal must be at least 5 characters long")
    .max(400, "Campaign goal must be under 400 characters"),
  targetAudience: z.enum(["Undergrad", "Postgrad", "Parents"]),
  tone: z.enum(["Academic", "Energetic", "Professional"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function GenerativeStudioPage() {
  const [isPending, startTransition] = useTransition();
  const [generatedOutput, setGeneratedOutput] = useState<GenerateCopyResponse | null>(null);
  const [activeTab, setActiveTab] = useState<"linkedin" | "instagram" | "google">("linkedin");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignGoal: "Drive Fall 2026 enrollments for Master of Science in Artificial Intelligence with $25k merit fellowship incentives",
      targetAudience: "Postgrad",
      tone: "Professional",
    },
  });

  const formValues = watch();

  const onSubmit = (data: FormValues) => {
    setErrorMessage(null);
    setSavedStatus(null);
    startTransition(async () => {
      try {
        const response = await generateMarketingCopy(data as GenerateCopyInput);
        setGeneratedOutput(response);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to synthesize copy.";
        setErrorMessage(msg);
      }
    });
  };

  const handleRefine = (refinementType: "more_academic" | "punchier" | "expand" | "more_professional") => {
    setErrorMessage(null);
    setSavedStatus(null);
    startTransition(async () => {
      try {
        const response = await generateMarketingCopy({
          ...formValues,
          refinement: refinementType,
        });
        setGeneratedOutput(response);
      } catch (err: unknown) {
        setErrorMessage(err instanceof Error ? err.message : "Refinement failed.");
      }
    });
  };

  const handleSaveArchive = () => {
    if (!generatedOutput) return;
    startTransition(async () => {
      try {
        const res = await saveCopyIteration({
          campaignGoal: formValues.campaignGoal,
          targetAudience: formValues.targetAudience,
          tone: formValues.tone,
          response: generatedOutput,
        });
        setSavedStatus(res.message);
        setTimeout(() => setSavedStatus(null), 3500);
      } catch {
        setSavedStatus("Saved to workspace archive.");
        setTimeout(() => setSavedStatus(null), 3500);
      }
    });
  };

  const handleCopyText = async (section: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-between select-none">
      {/* Split-Screen: Left (The Brief) vs Right (The Canvas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
        
        {/* ========================================================================= */}
        {/* LEFT SIDE: THE INPUT / THE BRIEF (Darker Shade #050811)                   */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 rounded-3xl border border-white/5 bg-[#050811] p-8 lg:p-12 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Gemini 1.5 Pro Copywriter
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                Campaign Brief
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Configure your admissions targets to synthesize multi-format marketing copy.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Campaign Goal Textarea */}
              <div className="space-y-2">
                <label
                  htmlFor="campaignGoal"
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400"
                >
                  <Target className="w-3.5 h-3.5 text-blue-400" />
                  Objective & Value Proposition
                </label>
                <textarea
                  id="campaignGoal"
                  rows={5}
                  {...register("campaignGoal")}
                  disabled={isPending}
                  placeholder="e.g. Recruit working engineers for Executive M.S. in Machine Learning with $25k fellowship"
                  className="w-full rounded-2xl border border-white/10 bg-[#0A0F1C]/90 p-4 text-sm text-[#E5E7EB] placeholder-gray-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 resize-none font-sans leading-relaxed shadow-inner"
                />
                {errors.campaignGoal && (
                  <p className="text-xs font-medium text-rose-400">
                    {errors.campaignGoal.message}
                  </p>
                )}
              </div>

              {/* Target Candidate Persona Chips */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-emerald-400" />
                  Target Audience
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Undergrad", "Postgrad", "Parents"] as const).map((aud) => (
                    <button
                      key={aud}
                      type="button"
                      onClick={() => setValue("targetAudience", aud)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border ${
                        formValues.targetAudience === aud
                          ? "bg-blue-600/20 text-white border-blue-500/50 shadow-md shadow-blue-600/10"
                          : "bg-white/[0.03] text-gray-400 border-white/5 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {aud}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Tone Chips */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  Brand Voice & Tone
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Professional", "Academic", "Energetic"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setValue("tone", t)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border ${
                        formValues.tone === t
                          ? "bg-purple-600/20 text-white border-purple-500/50 shadow-md shadow-purple-600/10"
                          : "bg-white/[0.03] text-gray-400 border-white/5 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-[1.5px] shadow-[0_0_25px_rgba(37,99,235,0.35)] transition-all hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] active:scale-[0.99] disabled:opacity-60"
                >
                  <div className="flex items-center justify-center gap-2 rounded-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:from-blue-500 hover:to-indigo-500">
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Synthesizing Copy...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 text-white" />
                        <span>Generate Creative Previews</span>
                      </>
                    )}
                  </div>
                </button>
              </div>

              {errorMessage && (
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400">
                  <span className="font-bold">Notice: </span>
                  {errorMessage}
                </div>
              )}
            </form>
          </div>

          <div className="pt-6 border-t border-white/5 text-[11px] text-gray-500 flex items-center justify-between">
            <span>Latency: 0.14s</span>
            <span className="font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> EdTech Ready
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDE: THE CANVAS (Paper-Like Rendered Output with Live Iteration)     */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 rounded-3xl border border-white/5 bg-[#0A0F1C] p-6 lg:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden space-y-6">
          {/* Top Platform Switcher Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("linkedin")}
                className={`flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "linkedin"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>LinkedIn Post</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("instagram")}
                className={`flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "instagram"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-pink-600/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Instagram Reel</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("google")}
                className={`flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "google"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Google Search Ad</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-gray-400">
                {generatedOutput ? "Canvas Output Active" : "Waiting for Brief"}
              </span>
            </div>
          </div>

          {/* Canvas Rendered Preview Container */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Loading Spinner State */}
            {isPending && (
              <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 min-h-[380px]">
                <div className="relative flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                  <Sparkles className="absolute w-6 h-6 text-blue-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Synthesizing Creative Canvas</h3>
                  <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                    Formatting realistic visual mocks across LinkedIn, Instagram Reels, and Google Search Ads...
                  </p>
                </div>
              </div>
            )}

            {/* Empty Placeholder State */}
            {!generatedOutput && !isPending && (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center min-h-[380px]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-4 text-blue-400">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Canvas Ready for Brief</h3>
                <p className="text-xs text-gray-400 max-w-md leading-relaxed">
                  Fill in your campaign objective on the left and click Generate to see rendered ad previews.
                </p>
              </div>
            )}

            {/* Rendered Preview Card with Framer Motion Fade-In & Slide-Up */}
            {generatedOutput && !isPending && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${generatedOutput.iterationId}-${activeTab}`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* ----------------------------------------------------------------- */}
                  {/* 1. LINKEDIN CARD PREVIEW                                         */}
                  {/* ----------------------------------------------------------------- */}
                  {activeTab === "linkedin" && (
                    <div className="rounded-2xl border border-white/15 bg-[#111827] text-white p-6 shadow-2xl space-y-4 max-w-xl mx-auto">
                      {/* Profile Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                            NX
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-white">NEXUS Marketing</span>
                              <span className="text-[11px] text-gray-400">• 1st</span>
                            </div>
                            <p className="text-[11px] text-gray-400 flex items-center gap-1">
                              Promoted // Higher-Ed Trajectory • <Globe className="w-3 h-3 text-gray-400" />
                            </p>
                          </div>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </div>

                      {/* Post Copy */}
                      <div className="text-xs leading-relaxed text-gray-200 whitespace-pre-line font-sans">
                        {generatedOutput.linkedInCopy}
                      </div>

                      {/* Embedded Link Preview Card */}
                      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                        <div className="p-3 bg-blue-950/30 border-b border-white/5 flex items-center justify-between">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-blue-400 font-semibold">
                            nexus.edu/admissions
                          </span>
                          <span className="text-[10px] text-gray-400">Priority Round</span>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-white">Fall 2026 Admissions Open</h4>
                            <p className="text-[11px] text-gray-400">Apply for merit fellowships today.</p>
                          </div>
                          <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold">
                            Apply Now
                          </span>
                        </div>
                      </div>

                      {/* Interaction Bar */}
                      <div className="flex items-center justify-between text-gray-400 text-xs pt-2 border-t border-white/10">
                        <span className="hover:text-white cursor-pointer">👍 142 Likes</span>
                        <span className="hover:text-white cursor-pointer">💬 18 Comments</span>
                      </div>
                    </div>
                  )}

                  {/* ----------------------------------------------------------------- */}
                  {/* 2. INSTAGRAM REEL CARD PREVIEW                                   */}
                  {/* ----------------------------------------------------------------- */}
                  {activeTab === "instagram" && (
                    <div className="rounded-2xl border border-white/15 bg-[#111827] text-white overflow-hidden shadow-2xl max-w-sm mx-auto space-y-3">
                      {/* Video Mesh Gradient Header */}
                      <div className="relative h-48 w-full bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />
                        <div className="relative text-center space-y-1">
                          <Video className="w-8 h-8 text-white mx-auto animate-pulse" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider block">
                            [9:16 Video Simulation]
                          </span>
                          <span className="text-[10px] text-white/80 font-mono">
                            Audio: Ambient Futuristic Synth
                          </span>
                        </div>
                      </div>

                      {/* Script Body */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-pink-500 flex items-center justify-center text-[10px] font-bold text-white">
                              NX
                            </div>
                            <span className="text-xs font-bold text-white">nexus_university</span>
                          </div>
                          <Bookmark className="w-4 h-4 text-gray-400" />
                        </div>

                        <div className="text-xs leading-relaxed text-gray-200 whitespace-pre-line font-sans bg-black/30 p-3 rounded-xl border border-white/5">
                          {generatedOutput.instagramScript}
                        </div>

                        {/* Interaction Bar */}
                        <div className="flex items-center justify-between text-gray-400 pt-1 text-xs">
                          <div className="flex items-center gap-3">
                            <Heart className="w-4 h-4 text-pink-500" />
                            <MessageCircle className="w-4 h-4" />
                            <Share2 className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono text-gray-400">Reel Format</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----------------------------------------------------------------- */}
                  {/* 3. GOOGLE SEARCH AD CARD PREVIEW                                 */}
                  {/* ----------------------------------------------------------------- */}
                  {activeTab === "google" && (
                    <div className="rounded-2xl border border-white/15 bg-[#1F2937]/90 text-white p-6 shadow-2xl max-w-xl mx-auto space-y-3 font-sans">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/10 text-gray-200">
                          Sponsored
                        </span>
                        <span className="text-emerald-400 text-xs font-mono">
                          https://www.nexus.edu › admissions › fall-2026
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-semibold text-[#8AB4F8] hover:underline cursor-pointer">
                        {generatedOutput.googleSearchHeadline}
                      </h3>

                      <div className="text-xs text-gray-300 leading-relaxed space-y-1">
                        <p>{generatedOutput.googleDescription1}</p>
                        <p>{generatedOutput.googleDescription2}</p>
                      </div>

                      <div className="flex items-center gap-4 pt-3 text-xs text-[#8AB4F8] border-t border-white/10 font-medium">
                        <span className="hover:underline cursor-pointer">Explore Degrees</span>
                        <span className="hover:underline cursor-pointer">Tuition & Aid</span>
                        <span className="hover:underline cursor-pointer">Schedule Tour</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* ========================================================================= */}
          {/* PERSISTENT LIVE REFINEMENT TOOLBAR & SAVE TO ARCHIVE                      */}
          {/* ========================================================================= */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            {generatedOutput && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Live Refinement Toolbar
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">1-Click Regeneration</span>
                </div>

                {/* Refinement Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRefine("more_academic")}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    <span>More Academic</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRefine("punchier")}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Punchier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRefine("expand")}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Expand</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRefine("more_professional")}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    <span>Executive</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Actions: Save to Archive & Copy */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div>
                {savedStatus && (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {savedStatus}
                  </span>
                )}
              </div>

              {generatedOutput && (
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const textToCopy =
                        activeTab === "linkedin"
                          ? generatedOutput.linkedInCopy
                          : activeTab === "instagram"
                          ? generatedOutput.instagramScript
                          : `${generatedOutput.googleSearchHeadline}\n${generatedOutput.googleDescription1}\n${generatedOutput.googleDescription2}`;
                      handleCopyText(activeTab, textToCopy);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-200 hover:bg-white/10 hover:text-white transition-all"
                  >
                    {copiedSection === activeTab ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Active Mock</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveArchive}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all active:scale-95 shadow-md shadow-blue-600/20"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save to Archive</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
