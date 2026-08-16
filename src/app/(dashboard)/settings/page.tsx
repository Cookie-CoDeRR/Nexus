"use client";

import React, { useState } from "react";
import {
  Key,
  Copy,
  Check,
  RefreshCw,
  Bell,
  MessageSquare,
  Mail,
  Smartphone,
  Sliders,
  DollarSign,
  Clock,
  Shield,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  X,
  Save,
  Database,
  Globe,
  Lock,
} from "lucide-react";

export default function SettingsPage() {
  // API Key State
  const [apiKey, setApiKey] = useState<string>("nexus_live_crm_key_2026_8f9a2b");
  const [showKey, setShowKey] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [showRegenModal, setShowRegenModal] = useState<boolean>(false);
  const [keyCreatedDate, setKeyCreatedDate] = useState<string>("Aug 16, 2026 • 18:30 IST");

  // Notification Preferences State
  const [emailAlerts, setEmailAlerts] = useState<boolean>(true);
  const [slackAlerts, setSlackAlerts] = useState<boolean>(true);
  const [slackWebhookUrl, setSlackWebhookUrl] = useState<string>("");
  const [pushNotifications, setPushNotifications] = useState<boolean>(false);
  const [weeklyDigest, setWeeklyDigest] = useState<boolean>(true);

  // Workspace Preferences State
  const [currency, setCurrency] = useState<string>("INR");
  const [themeMode, setThemeMode] = useState<string>("carbon");
  const [refreshInterval, setRefreshInterval] = useState<string>("30s");
  const [retentionWindow, setRetentionWindow] = useState<string>("1year");

  // Save Toast State
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateKey = () => {
    const randomHex = Math.random().toString(36).substring(2, 10);
    const newKey = `nexus_live_crm_key_2026_${randomHex}`;
    setApiKey(newKey);
    setKeyCreatedDate(`Just now (${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`);
    setShowRegenModal(false);
    setSavedToast("Security Key rotated successfully. Update your Slate/Salesforce CRM webhook headers.");
    setTimeout(() => setSavedToast(null), 4000);
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast("Settings and workspace preferences saved.");
    setTimeout(() => setSavedToast(null), 3000);
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Shield className="w-3.5 h-3.5" />
              NEXUS Security & System Hub
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Settings & Integrations
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your API authorization keys, real-time alert webhooks, and workspace parameters.
          </p>
        </div>

        <button
          onClick={handleSavePreferences}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95 w-fit"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Toast Notice */}
      {savedToast && (
        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{savedToast}</span>
          </div>
          <button onClick={() => setSavedToast(null)} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. API KEY & CRM WEBHOOK AUTHENTICATION                                   */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-blue-400" />
              CRM Webhook Authorization Key
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Secret header key required in <code className="font-mono text-blue-300">x-nexus-api-key</code> for ingesting leads from Slate or Salesforce.
            </p>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Status: Active
          </span>
        </div>

        {/* API Key Box */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full flex-1">
              <input
                type={showKey ? "text" : "password"}
                readOnly
                value={apiKey}
                className="w-full pl-4 pr-12 py-3 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono text-emerald-400 tracking-wider focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                title={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopyKey}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-all active:scale-95 shadow-md"
              >
                {copiedKey ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Key</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowRegenModal(true)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold text-rose-300 transition-all active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Rotate Key</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-gray-400 px-1">
            <span>Created: <strong className="text-gray-300 font-mono">{keyCreatedDate}</strong></span>
            <span>Endpoint: <code className="text-blue-300 font-mono">/api/v1/crm/sync-leads</code></span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. REAL-TIME NOTIFICATIONS & SLACK INTEGRATION                            */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            Anomaly & Budget Alert Channels
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Configure how your marketing team is notified when CPA surges or conversion drop thresholds are breached.
          </p>
        </div>

        <div className="space-y-5">
          {/* Email Alerts Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Email Dispatch on Critical Anomalies</span>
                <span className="text-[11px] text-gray-400">Send high-priority alerts to admin@institution.edu when CPA &gt; ₹1,500.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                emailAlerts ? "bg-blue-600" : "bg-white/10"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  emailAlerts ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Slack Webhook Toggle & Input */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Slack Channel Webhook Stream</span>
                  <span className="text-[11px] text-gray-400">Post automated anomaly breakdowns and Gemini quick-fixes to your Slack channel.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSlackAlerts(!slackAlerts)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  slackAlerts ? "bg-blue-600" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    slackAlerts ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            {slackAlerts && (
              <div className="pt-2">
                <label className="text-[11px] font-semibold text-gray-400 block mb-1">Incoming Webhook URL</label>
                <input
                  type="url"
                  value={slackWebhookUrl}
                  onChange={(e) => setSlackWebhookUrl(e.target.value)}
                  placeholder="https://hooks.slack.com/services/..."
                  className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500"
                />
              </div>
            )}
          </div>

          {/* Push Notifications Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Browser Push Notifications</span>
                <span className="text-[11px] text-gray-400">Trigger browser desktop toasts when auction bids inflate by &gt;30%.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                pushNotifications ? "bg-blue-600" : "bg-white/10"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  pushNotifications ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. WORKSPACE & TELEMETRY PARAMETERS                                       */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            Telemetry & Display Parameters
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Customize financial currency representations and data ingestion polling cadence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Default Currency */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-blue-400" />
              Default Financial Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="INR">Indian Rupee (INR ₹ - Lakh/Crore)</option>
              <option value="USD">US Dollar (USD $)</option>
              <option value="EUR">Euro (EUR €)</option>
              <option value="GBP">British Pound (GBP £)</option>
            </select>
            <p className="text-[11px] text-gray-500">Affects CPA Area Chart and Budget Distribution representations.</p>
          </div>

          {/* Telemetry Refresh Interval */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Telemetry Sync Polling Interval
            </label>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="30s">Real-Time Sync (30 Seconds)</option>
              <option value="2min">Fast Polling (2 Minutes)</option>
              <option value="5min">Standard Polling (5 Minutes)</option>
              <option value="15min">Hourly Batch (15 Minutes)</option>
            </select>
            <p className="text-[11px] text-gray-500">Frequency of Firestore background data aggregation sweeps.</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REGENERATE API KEY CONFIRMATION MODAL                                     */}
      {/* ========================================================================= */}
      {showRegenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setShowRegenModal(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          />

          <div className="relative z-10 w-full max-w-md rounded-3xl border border-rose-500/30 bg-[#0F172A] p-6 shadow-2xl text-white space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Rotate Authorization Key?</h3>
                <p className="text-xs text-gray-400">This action will invalidate the previous key immediately.</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
              Any external Slate or Salesforce webhook integrations using the old secret token will receive <code className="text-rose-400 font-mono">401 Unauthorized</code> responses until updated.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRegenModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRegenerateKey}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-xs font-bold text-white shadow-lg shadow-rose-600/20 active:scale-95"
              >
                Confirm & Rotate Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
