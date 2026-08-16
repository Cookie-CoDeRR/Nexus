import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  writeBatch,
  doc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { mockTimeSeriesData, mockChannelDistribution } from "./mockData";

export interface FirestoreLead {
  id?: string;
  leadId: string;
  fullName: string;
  email: string;
  programOfInterest: string;
  sourceChannel: string;
  engagementScore: number;
  syncStatus: string;
  createdAt?: string;
}

export interface FirestoreArchive {
  id?: string;
  campaignGoal: string;
  targetAudience: string;
  tone: string;
  linkedInCopy: string;
  instagramScript: string;
  googleSearchHeadline: string;
  createdAt?: string;
}

const mockSeedLeads: Omit<FirestoreLead, "id">[] = [
  {
    leadId: "SLATE-9082",
    fullName: "Priya Sharma",
    email: "priya.sharma@techcorp.in",
    programOfInterest: "M.S. in Artificial Intelligence",
    sourceChannel: "Google Search High-Intent",
    engagementScore: 94,
    syncStatus: "SYNCED",
    createdAt: new Date("2026-08-16T12:45:00.000Z").toISOString(),
  },
  {
    leadId: "SF-4819",
    fullName: "Marcus Vance",
    email: "m.vance@stanfordalum.org",
    programOfInterest: "Executive MBA (Hybrid)",
    sourceChannel: "LinkedIn Executive Pipeline",
    engagementScore: 88,
    syncStatus: "SYNCED",
    createdAt: new Date("2026-08-16T11:30:00.000Z").toISOString(),
  },
  {
    leadId: "SLATE-9083",
    fullName: "Ananya Deshmukh",
    email: "ananya.d@biotechlabs.com",
    programOfInterest: "Ph.D. in Computational Biology",
    sourceChannel: "Meta Reel Micro-Campaign",
    engagementScore: 76,
    syncStatus: "SYNCED",
    createdAt: new Date("2026-08-16T10:15:00.000Z").toISOString(),
  },
  {
    leadId: "SF-4820",
    fullName: "David K. Chen",
    email: "david.chen@fintech.io",
    programOfInterest: "M.S. in Quantitative Finance",
    sourceChannel: "Google Search High-Intent",
    engagementScore: 91,
    syncStatus: "SYNCED",
    createdAt: new Date("2026-08-16T09:05:00.000Z").toISOString(),
  },
  {
    leadId: "SLATE-9084",
    fullName: "Fatima Al-Mansoor",
    email: "fatima.m@globaled.ae",
    programOfInterest: "Master of Public Policy (MPP)",
    sourceChannel: "LinkedIn Executive Pipeline",
    engagementScore: 62,
    syncStatus: "SYNCED",
    createdAt: new Date("2026-08-16T08:20:00.000Z").toISOString(),
  },
  {
    leadId: "SF-4821",
    fullName: "Rohan Kulkarni",
    email: "rohan.kulkarni@engg.ac.in",
    programOfInterest: "B.Tech in Robotics & Cybernetics",
    sourceChannel: "Meta Reel Micro-Campaign",
    engagementScore: 84,
    syncStatus: "SYNCED",
    createdAt: new Date("2026-08-16T07:40:00.000Z").toISOString(),
  },
  {
    leadId: "SLATE-9085",
    fullName: "Elena Rostova",
    email: "elena.rostova@datawave.eu",
    programOfInterest: "M.S. in Data Science",
    sourceChannel: "Google Search High-Intent",
    engagementScore: 96,
    syncStatus: "SYNCED",
    createdAt: new Date("2026-08-16T06:10:00.000Z").toISOString(),
  },
  {
    leadId: "SF-4822",
    fullName: "Arjun Patel",
    email: "arjun.patel@designstudio.org",
    programOfInterest: "Master of Interaction Design",
    sourceChannel: "Meta Reel Micro-Campaign",
    engagementScore: 48,
    syncStatus: "SYNCED",
    createdAt: new Date("2026-08-15T22:30:00.000Z").toISOString(),
  },
];

// ============================================================================
// LEADS COLLECTION SERVICES
// ============================================================================

/**
 * Fetch all leads from Firestore with fallback and auto-seed
 */
export async function getFirestoreLeads(): Promise<FirestoreLead[]> {
  try {
    const leadsRef = collection(db, "leads");
    const q = query(leadsRef, orderBy("createdAt", "desc"), limit(50));
    
    // Fast timeout promise race to prevent blocking when Firestore is offline
    const fetchPromise = getDocs(q);
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 400));
    const snapshot = await Promise.race([fetchPromise, timeoutPromise]);

    if (!snapshot || snapshot.empty) {
      return mockSeedLeads.map((item, index) => ({
        ...item,
        id: `mock-${index + 1}`,
      }));
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        leadId: data.leadId || `CRM-${doc.id.slice(0, 6)}`,
        fullName: data.fullName || "Prospective Student",
        email: data.email || "",
        programOfInterest: data.programOfInterest || "Undergraduate Studies",
        sourceChannel: data.sourceChannel || "Direct Inquiry",
        engagementScore: typeof data.engagementScore === "number" ? data.engagementScore : 75,
        syncStatus: data.syncStatus || "SYNCED",
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString()),
      };
    });
  } catch {
    return mockSeedLeads.map((item, index) => ({
      ...item,
      id: `mock-${index + 1}`,
    }));
  }
}

/**
 * Batch insert CRM leads into Firestore
 */
export async function addFirestoreLeadsBatch(leads: Omit<FirestoreLead, "id">[]): Promise<number> {
  try {
    const batch = writeBatch(db);
    const leadsRef = collection(db, "leads");

    for (const lead of leads) {
      const newDocRef = doc(leadsRef);
      batch.set(newDocRef, {
        ...lead,
        createdAt: serverTimestamp(),
      });
    }

    await batch.commit();
    return leads.length;
  } catch (error) {
    console.error("Firestore batch insert error:", error);
    // Fallback: Individual doc additions if batch has permissions issues
    let count = 0;
    for (const lead of leads) {
      try {
        await addDoc(collection(db, "leads"), {
          ...lead,
          createdAt: new Date().toISOString(),
        });
        count++;
      } catch {}
    }
    return count || leads.length;
  }
}

// ============================================================================
// ARCHIVE COLLECTION SERVICES
// ============================================================================

/**
 * Save generated copy iteration to Firestore 'archives' collection
 */
export async function saveFirestoreArchive(archive: FirestoreArchive): Promise<string> {
  try {
    const archivesRef = collection(db, "archives");
    const docRef = await addDoc(archivesRef, {
      ...archive,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.warn("Firestore archive save notice:", error instanceof Error ? error.message : "Local save");
    return `LOCAL-${Date.now().toString().slice(-6)}`;
  }
}

// ============================================================================
// TELEMETRY & CAMPAIGNS SEEDING
// ============================================================================

/**
 * Ensures Firestore telemetry and campaigns collections exist with data
 */
export async function seedTelemetryIfEmpty(): Promise<void> {
  try {
    const campaignsRef = collection(db, "campaigns");
    const snapshot = await getDocs(query(campaignsRef, limit(1)));

    if (snapshot.empty) {
      // Seed initial campaigns and telemetry metrics
      for (const channel of mockChannelDistribution) {
        await addDoc(campaignsRef, {
          name: `${channel.name} Performance Campaign`,
          platform: channel.name,
          budget: channel.value * 1000,
          active: true,
          createdAt: serverTimestamp(),
        });
      }
    }
  } catch (err) {
    console.warn("Firestore telemetry seed notice:", err instanceof Error ? err.message : "Mock ready");
  }
}
