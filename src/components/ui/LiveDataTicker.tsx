"use client";

import React from "react";
import { motion } from "framer-motion";

interface TickerItem {
  platform: string;
  metric: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const tickerItems: TickerItem[] = [
  { platform: "Meta Ads", metric: "CPA", value: "$12.40", change: "-2.4%", isPositive: true },
  { platform: "Google Search", metric: "CTR", value: "4.8%", change: "+1.2%", isPositive: true },
  { platform: "LinkedIn Ed", metric: "Conv Rate", value: "8.4%", change: "+5.1%", isPositive: true },
  { platform: "Instagram Reels", metric: "CPM", value: "$4.15", change: "-8.3%", isPositive: true },
  { platform: "YouTube TrueView", metric: "CPV", value: "$0.02", change: "-14.0%", isPositive: true },
  { platform: "Meta Retargeting", metric: "ROAS", value: "4.8x", change: "+18.2%", isPositive: true },
  { platform: "Google High-Intent", metric: "CPA", value: "₹1,473", change: "-50.9%", isPositive: true },
  { platform: "Lead CRM Ingestion", metric: "Latency", value: "12ms", change: "100% Sync", isPositive: true },
  { platform: "Gemini 1.5 Pro", metric: "Bid Synthesis", value: "0.14s", change: "Active", isPositive: true },
  { platform: "Campus Admissions", metric: "Yield Rate", value: "34.2%", change: "+6.8%", isPositive: true },
];

export function LiveDataTicker() {
  // Duplicate array to ensure seamless infinite looping without jump
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="w-full overflow-hidden py-3 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm select-none">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-xs whitespace-nowrap transition-colors hover:border-white/20 hover:bg-white/[0.08]"
          >
            <span className="font-bold text-gray-300">{item.platform}</span>
            <span className="text-gray-400 font-mono">{item.metric}:</span>
            <span className="font-extrabold text-white font-mono">{item.value}</span>
            <span
              className={`inline-flex items-center gap-1 font-semibold text-[11px] px-1.5 py-0.5 rounded-md ${
                item.isPositive
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }`}
            >
              {item.isPositive ? "🟢" : "🔴"} {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
