import React from "react";
import prisma from "@/lib/prisma";
import { LeadsClientView, LeadRecord } from "./LeadsClientView";

export const dynamic = "force-dynamic";

const mockCrmLeads: LeadRecord[] = [
  {
    id: "lead-1",
    leadId: "SLATE-9082",
    fullName: "Priya Sharma",
    email: "priya.sharma@techcorp.in",
    programOfInterest: "M.S. in Artificial Intelligence",
    sourceChannel: "Google Search High-Intent",
    engagementScore: 94,
    syncStatus: "SYNCED",
    createdAt: "2026-08-16T12:45:00.000Z",
  },
  {
    id: "lead-2",
    leadId: "SF-4819",
    fullName: "Marcus Vance",
    email: "m.vance@stanfordalum.org",
    programOfInterest: "Executive MBA (Hybrid)",
    sourceChannel: "LinkedIn Executive Pipeline",
    engagementScore: 88,
    syncStatus: "SYNCED",
    createdAt: "2026-08-16T11:30:00.000Z",
  },
  {
    id: "lead-3",
    leadId: "SLATE-9083",
    fullName: "Ananya Deshmukh",
    email: "ananya.d@biotechlabs.com",
    programOfInterest: "Ph.D. in Computational Biology",
    sourceChannel: "Meta Reel Micro-Campaign",
    engagementScore: 76,
    syncStatus: "SYNCED",
    createdAt: "2026-08-16T10:15:00.000Z",
  },
  {
    id: "lead-4",
    leadId: "SF-4820",
    fullName: "David K. Chen",
    email: "david.chen@fintech.io",
    programOfInterest: "M.S. in Quantitative Finance",
    sourceChannel: "Google Search High-Intent",
    engagementScore: 91,
    syncStatus: "SYNCED",
    createdAt: "2026-08-16T09:05:00.000Z",
  },
  {
    id: "lead-5",
    leadId: "SLATE-9084",
    fullName: "Fatima Al-Mansoor",
    email: "fatima.m@globaled.ae",
    programOfInterest: "Master of Public Policy (MPP)",
    sourceChannel: "LinkedIn Executive Pipeline",
    engagementScore: 62,
    syncStatus: "SYNCED",
    createdAt: "2026-08-16T08:20:00.000Z",
  },
  {
    id: "lead-6",
    leadId: "SF-4821",
    fullName: "Rohan Kulkarni",
    email: "rohan.kulkarni@engg.ac.in",
    programOfInterest: "B.Tech in Robotics & Cybernetics",
    sourceChannel: "Meta Reel Micro-Campaign",
    engagementScore: 84,
    syncStatus: "SYNCED",
    createdAt: "2026-08-16T07:40:00.000Z",
  },
  {
    id: "lead-7",
    leadId: "SLATE-9085",
    fullName: "Elena Rostova",
    email: "elena.rostova@datawave.eu",
    programOfInterest: "M.S. in Data Science",
    sourceChannel: "Google Search High-Intent",
    engagementScore: 96,
    syncStatus: "SYNCED",
    createdAt: "2026-08-16T06:10:00.000Z",
  },
  {
    id: "lead-8",
    leadId: "SF-4822",
    fullName: "Arjun Patel",
    email: "arjun.patel@designstudio.org",
    programOfInterest: "Master of Interaction Design",
    sourceChannel: "Meta Reel Micro-Campaign",
    engagementScore: 48,
    syncStatus: "SYNCED",
    createdAt: "2026-08-15T22:30:00.000Z",
  },
];

export default async function LeadsPage() {
  let leads: LeadRecord[] = mockCrmLeads;

  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432/nexus_db")) {
    try {
      const dbLeads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      });

      if (dbLeads && dbLeads.length > 0) {
        leads = dbLeads.map((item) => ({
          id: item.id,
          leadId: item.leadId || `CRM-${item.id.slice(0, 6)}`,
          fullName: item.fullName || [item.firstName, item.lastName].filter(Boolean).join(" ") || "Student Candidate",
          email: item.email,
          programOfInterest: item.programOfInterest || "Undergraduate Studies",
          sourceChannel: item.sourceChannel || "Direct Inquiry",
          engagementScore: item.engagementScore || 80,
          syncStatus: item.syncStatus || "SYNCED",
          createdAt: item.createdAt.toISOString(),
        }));
      }
    } catch {
      // Gracefully maintain mock pipeline
    }
  }

  return <LeadsClientView initialLeads={leads} />;
}
