import React from "react";
import { getFirestoreLeads, FirestoreLead } from "@/lib/firestoreService";
import { LeadsClientView, LeadRecord } from "./LeadsClientView";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads: FirestoreLead[] = await getFirestoreLeads();

  const formattedLeads: LeadRecord[] = leads.map((lead) => ({
    id: lead.id || `lead-${Math.random().toString(36).slice(2, 8)}`,
    leadId: lead.leadId,
    fullName: lead.fullName,
    email: lead.email,
    programOfInterest: lead.programOfInterest,
    sourceChannel: lead.sourceChannel,
    engagementScore: lead.engagementScore,
    syncStatus: lead.syncStatus,
    createdAt: lead.createdAt || new Date().toISOString(),
  }));

  return <LeadsClientView initialLeads={formattedLeads} />;
}
