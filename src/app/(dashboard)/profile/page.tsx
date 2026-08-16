"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  User as UserIcon,
  ShieldCheck,
  Building,
  Mail,
  Calendar,
  Lock,
  LogOut,
  Sparkles,
  Zap,
  Activity,
  Check,
  CreditCard,
  Layers,
  Laptop,
  Smartphone,
  Globe,
  ExternalLink,
  Shield,
  Clock,
} from "lucide-react";

interface SecurityLogItem {
  id: string;
  ip: string;
  device: string;
  location: string;
  status: string;
  timestamp: string;
  isCurrent?: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await signOut(auth);
      router.push("/");
    } catch {
      router.push("/");
    }
  };

  const securityLogs: SecurityLogItem[] = [
    {
      id: "sec-1",
      ip: "192.168.1.10",
      device: "macOS Sonoma • Chrome 127",
      location: "Bengaluru, India",
      status: "Session Active",
      timestamp: "Today, 19:54 IST",
      isCurrent: true,
    },
    {
      id: "sec-2",
      ip: "14.139.128.4",
      device: "iOS 17.5 • Mobile Safari",
      location: "Bengaluru, India",
      status: "2FA Verified",
      timestamp: "Today, 14:22 IST",
    },
    {
      id: "sec-3",
      ip: "104.28.19.42",
      device: "macOS Sonoma • Chrome 127",
      location: "San Francisco, US",
      status: "Token Refresh",
      timestamp: "Yesterday, 21:05 IST",
    },
    {
      id: "sec-4",
      ip: "192.168.1.10",
      device: "Windows 11 • Edge 126",
      location: "Bengaluru, India",
      status: "Password Auth",
      timestamp: "Aug 14, 2026 • 11:30 IST",
    },
  ];

  const userEmail = currentUser?.email || "admin@nexus.edu";
  const displayName = currentUser?.displayName || "Dr. Aris Thorne";
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const quotaUsed = 42850;
  const quotaTotal = 100000;
  const quotaPercent = Math.round((quotaUsed / quotaTotal) * 100);

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Institutional Account
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            User Profile & Enterprise Tier
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Account credentials, institutional licensing tier, and active security audit logs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={loggingOut}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold transition-all active:scale-95 w-fit"
        >
          <LogOut className="w-4 h-4" />
          <span>{loggingOut ? "Signing Out..." : "Sign Out of NEXUS"}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. ACCOUNT CREDENTIALS & IDENTITY                                         */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-black text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] shrink-0 border border-white/20">
            {userInitials}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-bold text-white">{displayName}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600/20 text-blue-300 border border-blue-500/30">
                Enterprise Administrator
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                {userEmail}
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                Department of Higher-Ed Marketing & Telemetry
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Consortium ID: NEXUS-EDU-984
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ORGANIZATION PLAN & QUOTA TRACKING                                     */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-semibold block mb-1">
              Active Institutional Plan
            </span>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              NEXUS Command OS — Enterprise Edition
            </h3>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30 w-fit">
            Academic License Active
          </span>
        </div>

        {/* Quota Progress Bar */}
        <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300 font-semibold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              Monthly Telemetry Pipeline Ingestion Quota
            </span>
            <span className="font-mono text-gray-300">
              <strong className="text-white font-bold">{quotaUsed.toLocaleString()}</strong> / {quotaTotal.toLocaleString()} requests ({quotaPercent}%)
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="h-3 w-full rounded-full bg-black/40 overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
              style={{ width: `${quotaPercent}%` }}
            />
          </div>

          <p className="text-[11px] text-gray-400 pt-1">
            Resets automatically on September 1, 2026. Includes unlimited Gemini AI copywriting and Slate lead webhooks.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            "Unlimited Gemini 1.5 Pro Creative Studio Iterations",
            "Continuous Heuristic Anomaly Sentinel & Throttling",
            "Direct Slate & Salesforce REST CRM Webhook Pipeline",
            "Multi-Platform Attribution (Meta, Google, LinkedIn)",
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-gray-300">
              <div className="p-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECURITY ACCESS & AUDIT LOG TABLE                                      */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Recent Security & Session Audit Log
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Audit trail of authenticated sessions and access tokens for your institutional workspace.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3">Device & Browser</th>
                <th className="px-5 py-3">IP Address</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Auth Status</th>
                <th className="px-5 py-3 text-right">Timestamp</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 font-sans">
              {securityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-5 py-3.5 font-medium text-white flex items-center gap-2">
                    {log.device.includes("iOS") ? (
                      <Smartphone className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Laptop className="w-4 h-4 text-blue-400" />
                    )}
                    <span>{log.device}</span>
                  </td>

                  <td className="px-5 py-3.5 font-mono text-gray-300">
                    {log.ip}
                  </td>

                  <td className="px-5 py-3.5 text-gray-400">
                    {log.location}
                  </td>

                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono ${
                        log.isCurrent
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-sm"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      }`}
                    >
                      {log.isCurrent && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />}
                      {log.status}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-right font-mono text-gray-400">
                    {log.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
