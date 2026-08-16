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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<string>("All");
  const [copiedCurl, setCopiedCurl] = useState(false);

  const sampleCurl = `curl -X POST http://localhost:3000/api/v1/crm/sync-leads \\
  -H "Content-Type: application/json" \\
  -H "x-nexus-api-key: nexus_live_crm_key_2026" \\
  -d '{
    "leads": [
      {
        "leadId": "SLATE-9099",
        "fullName": "Siddharth Menon",
        "email": "siddharth.m@mitindia.edu",
        "programOfInterest": "M.S. in Robotics & AI",
        "sourceChannel": "Google Search High-Intent",
        "engagementScore": 94
      }
    ]
  }'`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(sampleCurl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2500);
  };

  const filteredLeads = initialLeads.filter((lead) => {
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

  const highIntentCount = initialLeads.filter((l) => l.engagementScore >= 80).length;
  const avgScore = Math.round(
    initialLeads.reduce((acc, curr) => acc + curr.engagementScore, 0) / (initialLeads.length || 1)
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

        {/* Copy Webhook cURL Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyCurl}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/10"
          >
            {copiedCurl ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">cURL Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Terminal className="w-4 h-4" />
                <span>Test Webhook Payload (cURL)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">Synced Leads</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{initialLeads.length} Candidates</div>
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
            {Math.round((highIntentCount / initialLeads.length) * 100)}%
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
          {["All", "Google", "Meta", "LinkedIn"].map((channel) => (
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

      {/* CRM Leads Table */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            {/* Table Header */}
            <thead className="bg-white/[0.04] border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Lead ID</th>
                <th className="px-6 py-4">Candidate & Contact</th>
                <th className="px-6 py-4">Program of Interest</th>
                <th className="px-6 py-4">Source Channel</th>
                <th className="px-6 py-4">Engagement Score</th>
                <th className="px-6 py-4 text-right">Ingestion Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredLeads.map((lead) => {
                const isHigh = lead.engagementScore >= 80;
                const isMedium = lead.engagementScore >= 50 && lead.engagementScore < 80;

                return (
                  <tr
                    key={lead.id}
                    className="hover:bg-white/[0.04] transition-colors group"
                  >
                    {/* Lead ID */}
                    <td className="px-6 py-4 font-mono font-bold text-gray-300">
                      <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[11px]">
                        {lead.leadId}
                      </span>
                    </td>

                    {/* Candidate */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                        {lead.fullName}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono">
                        {lead.email}
                      </div>
                    </td>

                    {/* Program */}
                    <td className="px-6 py-4 text-gray-300 font-medium">
                      {lead.programOfInterest}
                    </td>

                    {/* Channel */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-gray-300 font-medium">
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                        {lead.sourceChannel}
                      </span>
                    </td>

                    {/* Score */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                            isHigh
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                              : isMedium
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isHigh
                                ? "bg-emerald-400 animate-pulse"
                                : isMedium
                                ? "bg-amber-400"
                                : "bg-rose-400"
                            }`}
                          />
                          {lead.engagementScore} / 100
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        <Check className="w-3 h-3" />
                        {lead.syncStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No leads found matching &ldquo;{searchTerm}&rdquo;. Try another filter or search keyword.
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
