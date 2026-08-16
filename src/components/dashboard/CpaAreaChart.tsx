"use client";

import React from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DailyTelemetry } from "@/lib/mockData";
import { TrendingDown, Users, Layers } from "lucide-react";

interface CpaAreaChartProps {
  data: DailyTelemetry[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DailyTelemetry;
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const rawData = payload[0].payload;
    return (
      <div className="rounded-xl border border-white/10 bg-[#0A0F1C]/95 p-4 shadow-2xl backdrop-blur-xl space-y-2 min-w-[200px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-xs font-semibold text-gray-400">{label}</span>
          <span className="text-[10px] text-gray-400 font-mono">{rawData.rawDate}</span>
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Enrollments
            </span>
            <span className="font-bold text-white">{rawData.enrollments} students</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              CPA
            </span>
            <span className="font-bold text-white">₹{rawData.cpa.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5 text-gray-400">
            <span>Daily Spend:</span>
            <span className="font-mono text-gray-300">₹{rawData.spend.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function CpaAreaChart({ data }: CpaAreaChartProps) {
  return (
    <div className="relative w-full h-full min-h-[380px] flex flex-col justify-between">
      {/* Header telemetry metrics */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-2 border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider">30-Day Enrollments</p>
              <p className="text-sm font-bold text-white">1,128 Students (+28.4%)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <TrendingDown className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider">Acquisition Efficiency</p>
              <p className="text-sm font-bold text-white">₹1,473 Current CPA (-50.9%)</p>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/10">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          Dual-Axis Telemetry
        </div>
      </div>

      {/* Responsive Recharts Container */}
      <div className="w-full h-[320px] lg:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              {/* Emerald Gradient for Enrollments Area */}
              <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.45} />
                <stop offset="60%" stopColor="#10B981" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            {/* Extremely faint grid lines */}
            <CartesianGrid stroke="#ffffff" opacity={0.05} strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="date"
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#ffffff", opacity: 0.1 }}
              dy={8}
            />

            {/* Left Y Axis: Enrollments */}
            <YAxis
              yAxisId="enrollmentsAxis"
              stroke="#10B981"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}`}
            />

            {/* Right Y Axis: CPA (₹) */}
            <YAxis
              yAxisId="cpaAxis"
              orientation="right"
              stroke="#3B82F6"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `₹${value}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: "12px", fontSize: "12px" }}
              formatter={(value: string) => {
                return (
                  <span className="text-xs text-gray-300 font-medium ml-1">
                    {value === "enrollments" ? "Enrollments (Area)" : "Cost Per Acquisition (Line)"}
                  </span>
                );
              }}
            />

            {/* Dual-Axis: Enrollments Area */}
            <Area
              yAxisId="enrollmentsAxis"
              type="monotone"
              dataKey="enrollments"
              name="enrollments"
              stroke="#10B981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#enrollmentGradient)"
            />

            {/* Dual-Axis: CPA Line with Electric Blue */}
            <Line
              yAxisId="cpaAxis"
              type="monotone"
              dataKey="cpa"
              name="cpa"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 3, fill: "#3B82F6", stroke: "#0A0F1C", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#60A5FA", stroke: "#fff", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
