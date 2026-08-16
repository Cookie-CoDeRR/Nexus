"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChannelDistribution } from "@/lib/mockData";
import { Globe, PieChart as PieIcon } from "lucide-react";

interface ChannelDonutChartProps {
  data: ChannelDistribution[];
}

interface CustomDonutTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChannelDistribution;
    value: number;
    name: string;
  }>;
}

const CustomDonutTooltip = ({
  active,
  payload,
}: CustomDonutTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-white/10 bg-[#0A0F1C]/95 p-3.5 shadow-2xl backdrop-blur-xl space-y-1.5 min-w-[180px]">
        <div className="flex items-center gap-2 border-b border-white/10 pb-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span className="text-xs font-semibold text-white">{data.name}</span>
        </div>
        <div className="text-xs space-y-1 pt-0.5">
          <div className="flex justify-between text-gray-400">
            <span>Budget Share:</span>
            <span className="font-bold text-white">{data.percentage}%</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Spend:</span>
            <span className="font-mono text-white">₹{data.value.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Enrollments:</span>
            <span className="font-semibold text-emerald-400">{data.enrollments}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Channel CPA:</span>
            <span className="font-semibold text-blue-400">₹{data.cpa.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function ChannelDonutChart({ data }: ChannelDonutChartProps) {
  const totalSpend = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Budget Distribution</h3>
            <p className="text-[11px] text-gray-400">Active Omnichannel Split</p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-gray-300">
          ₹{(totalSpend / 100000).toFixed(1)}L Total
        </span>
      </div>

      {/* Donut Visualization */}
      <div className="relative w-full h-[220px] flex items-center justify-center my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomDonutTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={88}
              paddingAngle={4}
              dataKey="value"
              stroke="rgba(10, 15, 28, 0.8)"
              strokeWidth={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <Globe className="w-4 h-4 text-gray-400 mb-0.5" />
          <span className="text-xs font-extrabold text-white">3 Channels</span>
          <span className="text-[10px] text-gray-400">Synchronized</span>
        </div>
      </div>

      {/* Custom Channel Breakdown List */}
      <div className="space-y-2.5 pt-2 border-t border-white/5">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-xs p-2 rounded-xl bg-white/[0.03] border border-white/5 transition-colors hover:bg-white/[0.06]"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-gray-200">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-mono">₹{(item.value / 1000).toFixed(0)}k</span>
              <span
                className="px-2 py-0.5 rounded-md text-[11px] font-bold"
                style={{
                  backgroundColor: `${item.color}20`,
                  color: item.color,
                  border: `1px solid ${item.color}40`,
                }}
              >
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
