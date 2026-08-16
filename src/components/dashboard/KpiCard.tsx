import React from "react";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  isPositiveChange?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  isStatusCard?: boolean;
  statusBadge?: string;
}

export function KpiCard({
  title,
  value,
  subtitle,
  change,
  isPositiveChange = true,
  icon: Icon,
  iconColor = "text-blue-400",
  isStatusCard = false,
  statusBadge = "Active",
}: KpiCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] shadow-xl group">
      {/* Subtle top glow line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center justify-between pb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </span>
        <div className={`rounded-xl border border-white/10 bg-white/5 p-2.5 ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-2 space-y-1.5">
        <div className="flex items-baseline gap-3">
          {isStatusCard ? (
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-[0_0_12px_#10B981]" />
              </span>
              <span className="text-2xl font-bold tracking-tight text-white">
                {statusBadge}
              </span>
            </div>
          ) : (
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              {value}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-1">
          {change && (
            <span
              className={`inline-flex items-center text-xs font-semibold ${
                isPositiveChange ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {change}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-gray-400">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
