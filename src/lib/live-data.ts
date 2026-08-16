import {
  DailyTelemetry,
  ChannelDistribution,
  mockTimeSeriesData,
  mockChannelDistribution,
} from "./mockData";

export interface LiveTelemetrySnapshot {
  totalSpend: number;
  totalEnrollments: number;
  blendedCPA: number;
  activePipelineValue: number;
  roas: number;
  timeSeries: DailyTelemetry[];
  channels: ChannelDistribution[];
  lastUpdated: string;
}

/**
 * Generates realistic stochastic telemetry fluctuations for live presentation simulation
 */
export function generateFluctuatingTelemetry(
  prevSnapshot?: LiveTelemetrySnapshot
): LiveTelemetrySnapshot {
  const jitter = (base: number, percent = 0.035) => {
    const delta = (Math.random() * 2 - 1) * percent;
    return Math.round(base * (1 + delta));
  };

  const baseTimeSeries = prevSnapshot ? prevSnapshot.timeSeries : mockTimeSeriesData;

  // Apply minor realistic fluctuations to time-series
  const updatedTimeSeries: DailyTelemetry[] = baseTimeSeries.map((point) => {
    const newSpend = jitter(point.spend, 0.025);
    const newEnrollments = Math.max(1, jitter(point.enrollments, 0.03));
    const newCpa = Math.round(newSpend / newEnrollments);
    const newClicks = jitter(point.clicks, 0.02);
    const newImpressions = jitter(point.impressions, 0.02);

    return {
      date: point.date,
      rawDate: point.rawDate,
      spend: newSpend,
      enrollments: newEnrollments,
      cpa: newCpa,
      clicks: newClicks,
      impressions: newImpressions,
    };
  });

  // Calculate aggregated totals
  const totalSpend = updatedTimeSeries.reduce((acc, curr) => acc + curr.spend, 0);
  const totalEnrollments = updatedTimeSeries.reduce((acc, curr) => acc + curr.enrollments, 0);
  const blendedCPA = Math.round(totalSpend / Math.max(1, totalEnrollments));

  // Channels fluctuation
  const baseChannels = prevSnapshot ? prevSnapshot.channels : mockChannelDistribution;
  const updatedChannels: ChannelDistribution[] = baseChannels.map((ch) => {
    const newSpend = jitter(ch.value, 0.02);
    const newEnrollments = Math.max(1, jitter(ch.enrollments, 0.025));
    return {
      name: ch.name,
      value: newSpend,
      percentage: ch.percentage,
      color: ch.color,
      enrollments: newEnrollments,
      cpa: Math.round(newSpend / newEnrollments),
    };
  });

  return {
    totalSpend,
    totalEnrollments,
    blendedCPA,
    activePipelineValue: Math.round(totalEnrollments * 185000), // Estimated tuition pipeline value
    roas: parseFloat((3.8 + (Math.random() * 0.4 - 0.2)).toFixed(2)),
    timeSeries: updatedTimeSeries,
    channels: updatedChannels,
    lastUpdated: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
}
