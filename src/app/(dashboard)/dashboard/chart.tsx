"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export interface TelemetryDataPoint {
  date: string;
  cpa: number;
  enrollments: number;
}

interface DashboardChartProps {
  data: TelemetryDataPoint[];
}

export default function DashboardChart({ data }: DashboardChartProps) {
  return (
    <div className="h-96 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
          <XAxis dataKey="date" stroke="#A1A1AA" />
          <YAxis yAxisId="left" stroke="#A1A1AA" />
          <YAxis yAxisId="right" orientation="right" stroke="#A1A1AA" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0A0F1C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="cpa" 
            stroke="#2563EB" 
            name="Cost Per Acquisition ($)" 
            strokeWidth={3} 
            dot={{ r: 4 }} 
            activeDot={{ r: 6 }} 
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="enrollments" 
            stroke="#10B981" 
            name="Enrollments" 
            strokeWidth={3} 
            dot={{ r: 4 }} 
            activeDot={{ r: 6 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
