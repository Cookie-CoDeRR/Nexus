export interface DailyTelemetry {
  date: string;
  rawDate: string;
  spend: number;
  enrollments: number;
  cpa: number;
  impressions: number;
  clicks: number;
}

export interface ChannelDistribution {
  name: string;
  value: number;
  percentage: number;
  color: string;
  enrollments: number;
  cpa: number;
}

export interface KpiSummary {
  totalSpend: number;
  totalEnrollments: number;
  averageCpa: number;
  aiStatus: "Active" | "Optimizing" | "Standby";
  spendGrowth: number;
  enrollmentsGrowth: number;
  cpaReduction: number;
}

// 30 days of realistic time-series data for Higher-Ed marketing
export const mockTimeSeriesData: DailyTelemetry[] = [
  { date: "Day 1", rawDate: "2026-07-18", spend: 42000, enrollments: 14, cpa: 3000, impressions: 84000, clicks: 3100 },
  { date: "Day 2", rawDate: "2026-07-19", spend: 45000, enrollments: 16, cpa: 2812, impressions: 91000, clicks: 3400 },
  { date: "Day 3", rawDate: "2026-07-20", spend: 51000, enrollments: 19, cpa: 2684, impressions: 102000, clicks: 3800 },
  { date: "Day 4", rawDate: "2026-07-21", spend: 48000, enrollments: 17, cpa: 2823, impressions: 96000, clicks: 3600 },
  { date: "Day 5", rawDate: "2026-07-22", spend: 56000, enrollments: 22, cpa: 2545, impressions: 112000, clicks: 4200 },
  { date: "Day 6", rawDate: "2026-07-23", spend: 62000, enrollments: 26, cpa: 2384, impressions: 125000, clicks: 4700 },
  { date: "Day 7", rawDate: "2026-07-24", spend: 59000, enrollments: 24, cpa: 2458, impressions: 118000, clicks: 4400 },
  { date: "Day 8", rawDate: "2026-07-25", spend: 53000, enrollments: 20, cpa: 2650, impressions: 106000, clicks: 3900 },
  { date: "Day 9", rawDate: "2026-07-26", spend: 51000, enrollments: 19, cpa: 2684, impressions: 101000, clicks: 3750 },
  { date: "Day 10", rawDate: "2026-07-27", spend: 64000, enrollments: 28, cpa: 2285, impressions: 128000, clicks: 4900 },
  { date: "Day 11", rawDate: "2026-07-28", spend: 68000, enrollments: 31, cpa: 2193, impressions: 135000, clicks: 5200 },
  { date: "Day 12", rawDate: "2026-07-29", spend: 72000, enrollments: 34, cpa: 2117, impressions: 142000, clicks: 5500 },
  { date: "Day 13", rawDate: "2026-07-30", spend: 69000, enrollments: 32, cpa: 2156, impressions: 138000, clicks: 5300 },
  { date: "Day 14", rawDate: "2026-07-31", spend: 75000, enrollments: 36, cpa: 2083, impressions: 149000, clicks: 5800 },
  { date: "Day 15", rawDate: "2026-08-01", spend: 78000, enrollments: 39, cpa: 2000, impressions: 154000, clicks: 6100 },
  { date: "Day 16", rawDate: "2026-08-02", spend: 74000, enrollments: 37, cpa: 2000, impressions: 147000, clicks: 5700 },
  { date: "Day 17", rawDate: "2026-08-03", spend: 71000, enrollments: 35, cpa: 2028, impressions: 141000, clicks: 5500 },
  { date: "Day 18", rawDate: "2026-08-04", spend: 82000, enrollments: 43, cpa: 1906, impressions: 162000, clicks: 6400 },
  { date: "Day 19", rawDate: "2026-08-05", spend: 86000, enrollments: 46, cpa: 1869, impressions: 170000, clicks: 6800 },
  { date: "Day 20", rawDate: "2026-08-06", spend: 89000, enrollments: 49, cpa: 1816, impressions: 177000, clicks: 7100 },
  { date: "Day 21", rawDate: "2026-08-07", spend: 84000, enrollments: 45, cpa: 1866, impressions: 168000, clicks: 6600 },
  { date: "Day 22", rawDate: "2026-08-08", spend: 79000, enrollments: 42, cpa: 1880, impressions: 158000, clicks: 6200 },
  { date: "Day 23", rawDate: "2026-08-09", spend: 83000, enrollments: 47, cpa: 1765, impressions: 165000, clicks: 6500 },
  { date: "Day 24", rawDate: "2026-08-10", spend: 92000, enrollments: 54, cpa: 1703, impressions: 182000, clicks: 7300 },
  { date: "Day 25", rawDate: "2026-08-11", spend: 96000, enrollments: 58, cpa: 1655, impressions: 190000, clicks: 7600 },
  { date: "Day 26", rawDate: "2026-08-12", spend: 94000, enrollments: 56, cpa: 1678, impressions: 187000, clicks: 7450 },
  { date: "Day 27", rawDate: "2026-08-13", spend: 98000, enrollments: 61, cpa: 1606, impressions: 195000, clicks: 7900 },
  { date: "Day 28", rawDate: "2026-08-14", spend: 104000, enrollments: 67, cpa: 1552, impressions: 206000, clicks: 8300 },
  { date: "Day 29", rawDate: "2026-08-15", spend: 108000, enrollments: 72, cpa: 1500, impressions: 214000, clicks: 8700 },
  { date: "Day 30", rawDate: "2026-08-16", spend: 112000, enrollments: 76, cpa: 1473, impressions: 222000, clicks: 9100 },
];

export const mockChannelDistribution: ChannelDistribution[] = [
  {
    name: "Google Ads (Search & Discovery)",
    value: 1048000,
    percentage: 46,
    color: "#3B82F6", // Electric Blue
    enrollments: 524,
    cpa: 2000,
  },
  {
    name: "Meta (Instagram & Reels)",
    value: 775000,
    percentage: 34,
    color: "#10B981", // Success Green
    enrollments: 410,
    cpa: 1890,
  },
  {
    name: "LinkedIn (Executive Education)",
    value: 456000,
    percentage: 20,
    color: "#8B5CF6", // Violet / Accent Purple
    enrollments: 194,
    cpa: 2350,
  },
];

export const mockKpiSummary: KpiSummary = {
  totalSpend: 2279000, // ₹22,79,000
  totalEnrollments: 1128,
  averageCpa: 2020, // ₹2,020
  aiStatus: "Active",
  spendGrowth: 14.8,
  enrollmentsGrowth: 28.4,
  cpaReduction: 18.2,
};
