import React from "react";
import { checkAndFetchAnomalies, AnomalyAlert } from "@/lib/anomalyChecker";
import { AlertsClientView } from "./AlertsClientView";

export const dynamic = "force-dynamic";

export default async function AlertsPage() {
  const alerts: AnomalyAlert[] = await checkAndFetchAnomalies();

  return <AlertsClientView initialAlerts={alerts} />;
}
