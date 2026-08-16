import React from "react";
import { LiveTelemetryView } from "@/components/dashboard/LiveTelemetryView";
import { seedTelemetryIfEmpty } from "@/lib/firestoreService";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Ensure Firestore telemetry & campaigns matrix is initialized
  await seedTelemetryIfEmpty();

  return <LiveTelemetryView />;
}
