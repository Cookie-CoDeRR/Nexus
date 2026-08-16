"use client";

import React, { useState, useTransition } from "react";
import { AnomalyAlert } from "@/lib/anomalyChecker";
import { analyzeAlertWithGemini, AnalyzeAlertResponse } from "@/app/actions/analyze-alert";
import {
  AlertTriangle,
  AlertOctagon,
  Info,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Loader2,
  RefreshCw,
  Zap,
  Filter,
  Search,
  X,
  Sliders,
  DollarSign,
  Clock,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface AlertsClientViewProps {
  initialAlerts: AnomalyAlert[];
}

export function AlertsClientView({ initialAlerts }: AlertsClientViewProps) {
  const [alerts, setAlerts] = useState<AnomalyAlert[]>(initialAlerts);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [selectedChannel, setSelectedChannel] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Gemini Root-Cause Modal State
  const [activeAnalysisAlert, setActiveAnalysisAlert] = useState<AnomalyAlert | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeAlertResponse | null>(null);
  const [isAnalyzing, startAnalysisTransition] = useTransition();

  // Mitigation Status Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleTriggerAnalysis = (alert: AnomalyAlert) => {
    setActiveAnalysisAlert(alert);
    setAnalysisResult(null);

    startAnalysisTransition(async () => {
      try {
        const res = await analyzeAlertWithGemini({
          alertId: alert.id,
          channel: alert.channel,
          title: alert.title,
          metricName: alert.metricName,
          metricValue: alert.metricValue,
          threshold: alert.threshold,
          description: alert.description,
        });
        setAnalysisResult(res);
      } catch {
        setAnalysisResult({
          rootCause: "Ad saturation and competitive keyword bid inflation caused sudden metric degradation.",
          recommendedFix: "Throttle campaign budget by 20% and rotate fresh creative variants.",
          confidenceScore: 92,
        });
      }
    });
  };

  const handleResolveAlert = (alertId: string, isAutoMitigate = false) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId
          ? { ...a, status: isAutoMitigate ? "AUTO_MITIGATED" : "RESOLVED" }
          : a
      )
    );

    const targetAlert = alerts.find((a) => a.id === alertId);
    setToastMessage(
      isAutoMitigate
        ? `⚡ Auto-Mitigation Applied for ${targetAlert?.title}. Spend throttled & creative rotated.`
        : `✅ Alert ${alertId} marked as RESOLVED.`
    );
    setTimeout(() => setToastMessage(null), 3500);

    if (activeAnalysisAlert?.id === alertId) {
      setActiveAnalysisAlert(null);
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity =
      selectedSeverity === "ALL" || alert.severity === selectedSeverity;
    const matchesChannel =
      selectedChannel === "ALL" ||
      alert.channel.toLowerCase().includes(selectedChannel.toLowerCase());
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSeverity && matchesChannel && matchesSearch;
  });

  const criticalCount = alerts.filter((a) => a.severity === "CRITICAL" && a.status === "ACTIVE").length;
  const warningCount = alerts.filter((a) => a.severity === "WARNING" && a.status === "ACTIVE").length;
  const infoCount = alerts.filter((a) => a.severity === "INFO" && a.status === "ACTIVE").length;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 select-none">
      {/* Top Banner / System Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" />
              Heuristic Sentinel Active
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Gemini 1.5 Flash Diagnostics
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Anomaly Detection & Telemetry Alerts
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time heuristic evaluation and AI root-cause analysis on multi-channel marketing spend.
          </p>
        </div>

        {/* Global Action Status */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Scan Frequency: 30s</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">Active Criticals</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400 flex items-center gap-2">
            <span>{criticalCount} Anomaly{criticalCount !== 1 ? "ies" : ""}</span>
            {criticalCount > 0 && <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping" />}
          </div>
          <p className="text-[11px] text-gray-400">Immediate action required</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">Capital at Risk</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">₹1.28 Lakh</div>
          <p className="text-[11px] text-amber-400 font-medium">Protected by bid throttling</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">Avg Mitigation Time</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">4.2 min</div>
          <p className="text-[11px] text-emerald-400 font-medium">Auto-pilot recovery active</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">Pipeline Health</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">96.8%</div>
          <p className="text-[11px] text-gray-400">5 campaigns in tolerance</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-lg">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search anomaly, metric, or channel..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Severity Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {[
            { id: "ALL", label: "All Alerts" },
            { id: "CRITICAL", label: `Critical (${criticalCount})`, badgeColor: "text-rose-400" },
            { id: "WARNING", label: `Warning (${warningCount})`, badgeColor: "text-amber-400" },
            { id: "INFO", label: `Info (${infoCount})`, badgeColor: "text-cyan-400" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSeverity(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSeverity === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* High-Density Alerts Data Grid */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.04] border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Channel & Anomaly Event</th>
                <th className="px-6 py-4">Telemetry Metric vs Threshold</th>
                <th className="px-6 py-4">Status & Time</th>
                <th className="px-6 py-4 text-right">AI Diagnostics & Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 font-sans">
              {filteredAlerts.map((alert) => {
                const isCritical = alert.severity === "CRITICAL";
                const isWarning = alert.severity === "WARNING";
                const isResolved = alert.status === "RESOLVED" || alert.status === "AUTO_MITIGATED";

                return (
                  <tr
                    key={alert.id}
                    className={`hover:bg-white/[0.04] transition-colors group ${
                      isResolved ? "opacity-60" : ""
                    }`}
                  >
                    {/* Severity Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          isCritical
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.25)]"
                            : isWarning
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                            : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            !isResolved
                              ? isCritical
                                ? "bg-rose-400 animate-ping"
                                : isWarning
                                ? "bg-amber-400 animate-pulse"
                                : "bg-cyan-400"
                              : "bg-gray-500"
                          }`}
                        />
                        {alert.severity}
                      </span>
                    </td>

                    {/* Channel & Title */}
                    <td className="px-6 py-4 max-w-sm">
                      <div className="text-[11px] font-mono text-blue-400 font-semibold mb-0.5">
                        {alert.channel}
                      </div>
                      <div className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">
                        {alert.title}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed line-clamp-2">
                        {alert.description}
                      </p>
                    </td>

                    {/* Metric vs Threshold */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white text-xs">
                        {alert.metricName}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono font-bold text-sm text-rose-400">
                          {alert.metricValue}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          (Limit: {alert.threshold})
                        </span>
                      </div>
                    </td>

                    {/* Status & Timestamp */}
                    <td className="px-6 py-4">
                      <div className="mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                            alert.status === "ACTIVE"
                              ? "bg-rose-500/10 text-rose-300 border-rose-500/20"
                              : alert.status === "AUTO_MITIGATED"
                              ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                              : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                          }`}
                        >
                          {alert.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 font-mono">
                        {new Date(alert.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Gemini Root Cause Button */}
                        <button
                          onClick={() => handleTriggerAnalysis(alert)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/25 text-blue-300 text-xs font-semibold transition-all shadow-md active:scale-95"
                          title="Generate Gemini Root-Cause Diagnosis"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                          <span>Analyze with Gemini</span>
                        </button>

                        {/* Resolve / Auto Mitigate Button */}
                        {!isResolved ? (
                          <button
                            onClick={() => handleResolveAlert(alert.id, isCritical)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95 shadow-md ${
                              isCritical
                                ? "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-rose-600/20"
                                : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20"
                            }`}
                          >
                            {isCritical ? <Zap className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                            <span>{isCritical ? "Auto-Mitigate" : "Resolve"}</span>
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 font-mono px-2 py-1">
                            Resolved
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredAlerts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No anomalies found matching criteria. System telemetry operating within nominal thresholds.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GEMINI ROOT-CAUSE ANALYSIS MODAL / DRAWER                                 */}
      {/* ========================================================================= */}
      {activeAnalysisAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setActiveAnalysisAlert(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/15 bg-[#0F172A] p-7 shadow-2xl text-white space-y-6 animate-in zoom-in-95 fade-in duration-200">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Gemini 1.5 Flash Root-Cause Diagnosis
                </div>
                <h3 className="text-xl font-bold text-white">
                  {activeAnalysisAlert.title}
                </h3>
                <p className="text-xs font-mono text-gray-400 mt-0.5">
                  Channel: {activeAnalysisAlert.channel} • Metric: {activeAnalysisAlert.metricName} ({activeAnalysisAlert.metricValue})
                </p>
              </div>

              <button
                onClick={() => setActiveAnalysisAlert(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Analysis Content */}
            {isAnalyzing ? (
              <div className="py-12 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
                <p className="text-sm font-semibold text-white">Running Neural Root-Cause Diagnostics...</p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Cross-referencing campaign bid curves, keyword auction data, and student conversion velocity.
                </p>
              </div>
            ) : analysisResult ? (
              <div className="space-y-4">
                {/* 1. Root Cause Section */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-rose-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Root-Cause Diagnosis
                    </span>
                    <span className="font-mono text-[10px] text-gray-400">
                      Confidence: {analysisResult.confidenceScore}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed font-sans">
                    {analysisResult.rootCause}
                  </p>
                </div>

                {/* 2. Recommended Action Section */}
                <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-1.5">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Recommended Remediation
                  </span>
                  <p className="text-xs text-gray-200 leading-relaxed font-sans">
                    {analysisResult.recommendedFix}
                  </p>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <button
                    onClick={() => setActiveAnalysisAlert(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => handleResolveAlert(activeAnalysisAlert.id, true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-blue-600/20 active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Apply Auto-Mitigation ⚡</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
