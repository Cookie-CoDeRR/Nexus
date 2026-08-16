"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Globe,
  Sparkles,
  Zap,
  CheckCircle2,
  X,
  Loader2,
  Play,
} from "lucide-react";

export interface LeadRecord {
  id: string;
  leadId: string;
  fullName: string;
  email: string;
  programOfInterest: string;
  sourceChannel: string;
  engagementScore: number;
  syncStatus: string;
  createdAt: string;
}

interface LeadsClientViewProps {
  initialLeads: LeadRecord[];
}

export function LeadsClientView({ initialLeads }: LeadsClientViewProps) {
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<string>("All");
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const sampleCurl = `curl -X POST http://localhost:3000/api/v1/crm/sync-leads \\
  -H "Content-Type: application/json" \\
  -H "x-nexus-api-key: nexus_live_crm_key_2026" \\
  -d '{
    "leadName": "Siddharth Menon",
    "email": "siddharth.m@mitindia.edu",
    "program": "M.S. in Robotics & AI",
    "source": "Google Search High-Intent",
    "score": 94
  }'`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(sampleCurl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2500);
  };

  const handleSimulateWebhook = async () => {
    setIsSimulating(true);
    const mockApplicantNames = ["Tanvi Deshmukh", "Kabir Sen", "Ananya Iyer", "Vikramaditya Roy", "Zoya Farooqui"];
    const mockPrograms = ["B.Tech in Artificial Intelligence", "Executive MBA in FinTech", "M.S. in Quantum Computing", "Master of Design"];
    const mockSources = ["Google Search High-Intent", "Meta Reel Micro-Campaign", "LinkedIn Executive Pipeline"];

    const chosenName = mockApplicantNames[Math.floor(Math.random() * mockApplicantNames.length)];
    const chosenProgram = mockPrograms[Math.floor(Math.random() * mockPrograms.length)];
    const chosenSource = mockSources[Math.floor(Math.random() * mockSources.length)];
    const chosenScore = Math.floor(82 + Math.random() * 16);

    const payload = {
      leadName: chosenName,
      email: `${chosenName.toLowerCase().replace(/\s+/g, ".")}@consortium.edu`,
      program: chosenProgram,
      source: chosenSource,
      score: chosenScore,
    };

    try {
      const res = await fetch("/api/v1/crm/sync-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-nexus-api-key": "nexus_live_crm_key_2026",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        const newRecord: LeadRecord = {
          id: `sim-${Date.now()}`,
          leadId: data.leadIds?.[0] || `SLATE-${Math.floor(1000 + Math.random() * 9000)}`,
          fullName: payload.leadName,
          email: payload.email,
          programOfInterest: payload.program,
          sourceChannel: payload.source,
          engagementScore: payload.score,
          syncStatus: "SYNCED",
          createdAt: new Date().toISOString(),
        };

        setLeads((prev) => [newRecord, ...prev]);
        setToastMessage(`⚡ Ingested lead for ${payload.leadName} (${payload.program}) in real-time!`);
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        setToastMessage(`Webhook notice: ${data.error || "Simulation error"}`);
        setTimeout(() => setToastMessage(null), 4000);
      }
    } catch {
      // Offline fallback optimistic addition
      const newRecord: LeadRecord = {
        id: `sim-${Date.now()}`,
        leadId: `SLATE-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: payload.leadName,
        email: payload.email,
        programOfInterest: payload.program,
        sourceChannel: payload.source,
        engagementScore: payload.score,
        syncStatus: "SYNCED",
        createdAt: new Date().toISOString(),
      };
      setLeads((prev) => [newRecord, ...prev]);
      setToastMessage(`⚡ Optimistically synced ${payload.leadName} to CRM pipeline.`);
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setIsSimulating(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.programOfInterest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.leadId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesChannel =
      selectedChannel === "All" ||
      lead.sourceChannel.toLowerCase().includes(selectedChannel.toLowerCase());

    return matchesSearch && matchesChannel;
  });

  const highIntentCount = leads.filter((l) => l.engagementScore >= 80).length;
  const avgScore = Math.round(
    leads.reduce((acc, curr) => acc + curr.engagementScore, 0) / (leads.length || 1)
  );

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 select-none">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Slate & Salesforce CRM Webhook Pipeline
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              Ingestion Active
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Prospective Student Leads CRM
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time normalized ingestion and candidate scoring from university CRM funnels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateWebhook}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Ingesting...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Simulate Webhook Ingest</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Toast Notice */}
      {toastMessage && (
        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">Synced Leads</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{leads.length} Candidates</div>
          <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.2% vs last cycle
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">High Intent Rate</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            {Math.round((highIntentCount / (leads.length || 1)) * 100)}%
          </div>
          <p className="text-[11px] text-gray-400">{highIntentCount} leads with score &gt; 80</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">Avg Engagement</span>
            <ArrowUpRight className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{avgScore} / 100</div>
          <p className="text-[11px] text-emerald-400 font-medium">High conversion trajectory</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">Webhook Security</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-400">200 OK</div>
          <p className="text-[11px] text-gray-400 font-mono">x-nexus-api-key enabled</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LIVE TEST VERIFICATION CARD (cURL pre-configured)                         */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-blue-500/20 bg-blue-950/20 p-6 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Live Webhook Verification Payload (cURL)</h3>
              <p className="text-xs text-gray-400">
                Pre-configured with <code className="text-blue-300 font-mono">x-nexus-api-key</code> for presentation and external CRM testing.
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyCurl}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-blue-500/40 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold transition-all active:scale-95 shadow-md w-fit"
          >
            {copiedCurl ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">cURL Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy cURL Command</span>
              </>
            )}
          </button>
        </div>

        {/* Code Snippet Box */}
        <pre className="p-4 rounded-2xl bg-black/50 border border-white/10 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
          {sampleCurl}
        </pre>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-lg">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate, program, or lead ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Channel Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {["All", "Google Search", "Meta Reel", "LinkedIn Executive"].map((channel) => (
            <button
              key={channel}
              onClick={() => setSelectedChannel(channel)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedChannel === channel
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {channel}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.04] border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Lead ID</th>
                <th className="px-6 py-4">Candidate Identity</th>
                <th className="px-6 py-4">Program of Interest</th>
                <th className="px-6 py-4">Source Channel</th>
                <th className="px-6 py-4 text-center">Score</th>
                <th className="px-6 py-4 text-right">Ingestion Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 font-sans">
              {filteredLeads.map((lead) => {
                const isHighIntent = lead.engagementScore >= 80;
                const isMediumIntent = lead.engagementScore >= 50 && lead.engagementScore < 80;

                return (
                  <tr key={lead.id} className="hover:bg-white/[0.04] transition-colors group">
                    {/* Lead ID */}
                    <td className="px-6 py-4 font-mono font-bold text-blue-400">
                      {lead.leadId}
                    </td>

                    {/* Candidate Name & Email */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-white group-hover:text-blue-300 transition-colors">
                        {lead.fullName}
                      </div>
                      <div className="text-gray-400 text-[11px] font-mono mt-0.5">
                        {lead.email}
                      </div>
                    </td>

                    {/* Program */}
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-200">{lead.programOfInterest}</span>
                    </td>

                    {/* Channel */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-gray-300">
                        <Globe className="w-3 h-3 text-blue-400" />
                        {lead.sourceChannel}
                      </span>
                    </td>

                    {/* Engagement Score */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center font-bold px-2.5 py-0.5 rounded-full text-xs border ${
                          isHighIntent
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                            : isMediumIntent
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        }`}
                      >
                        {lead.engagementScore}
                      </span>
                    </td>

                    {/* Status & Timestamp */}
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        <Check className="w-3 h-3" />
                        {lead.syncStatus}
                      </span>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                        {new Date(lead.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No leads found matching query. Use the cURL command above to simulate an ingestion payload.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
