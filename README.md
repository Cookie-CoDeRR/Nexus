# ⚡ NEXUS — Enterprise Higher-Ed Telemetry & AI Orchestration OS

[![GitHub Repo](https://img.shields.io/badge/GitHub-Cookie--CoDeRR%2FNexus-181717?style=for-the-badge&logo=github)](https://github.com/Cookie-CoDeRR/Nexus)
[![Next.js](https://img.shields.io/badge/Next.js-15%20(App%20Router)-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.9%20ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini%201.5%20Pro-8E75B2?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20&%20Postgres-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

**NEXUS** ([github.com/Cookie-CoDeRR/Nexus](https://github.com/Cookie-CoDeRR/Nexus)) is an enterprise-grade marketing telemetry and AI orchestration command center designed specifically for higher education institutions. It unifies live multi-channel ad spend across Google Search, Meta Ads, and LinkedIn, detects conversion bottlenecks, autonomously generates targeted admissions copy using **Gemini 1.5 Pro**, and securely ingests CRM leads from platforms like Slate and Salesforce.

---

## 🌟 Key Platform Modules

### 1. 🌌 Cinematic Landing & Interactive Gateway (`/`)
- **Framer Motion Mouse Spotlight**: Real-time cursor coordinate tracking that dynamically reveals a masked spatial grid beneath a `backdrop-blur-2xl` glass layer without React re-renders.
- **Infinite Telemetry Ticker**: Continuous horizontal stream of live performance indicators (CPA, CTR, ROAS, Gemini latency) using Framer Motion linear loops.
- **3D Floating Dashboard UI**: Interactive CSS 3D tilted preview (`perspective(1000px) rotateX(15deg)`) with simulated dual-axis conversion curves and mini KPI widgets.
- **Alternating Split Feature Showcase**: 3-stage feature breakdown (Telemetry Engine, AI ROI Allocator, Generative Content Studio) with scroll-triggered fade animations.
- **Supabase Auth Portal**: Sleek modal card supporting both **Google OAuth** and **Email/Password** authentication, plus a single-click Demo Mode bypass.

### 2. 📊 Omnichannel Telemetry Command (`/dashboard`)
- **Dual-Axis Conversion Matrix (`CpaAreaChart`)**: Recharts composed chart plotting **Student Enrollments** (emerald gradient area) against **Cost Per Acquisition (CPA)** in ₹ (electric blue line).
- **Channel Budget Split (`ChannelDonutChart`)**: Donut chart visualizing spend attribution across Google Ads (46%), Meta (34%), and LinkedIn (20%) with custom glassmorphic tooltips.
- **Top KPI Suite (`KpiCard`)**: Real-time cards for Total Ad Spend (₹), Total Enrollments, Average CPA, and glowing **AI Optimization Status: Active** indicator.
- **Subtle Motion Background**: Ambient slow-floating gradient orbs and faint geometric grid optimized for high-density analysis.

### 3. ✍️ Focus Copywriting Studio — "Zen Drafting Room" (`/studio`)
- **Split-Screen Workflow**:
  - **Left Side (The "Brief")**: Spacious, dark `#050811` canvas with generous padding for Campaign Objectives, Candidate Personas (`Undergrad`, `Postgrad`, `Parents`), and Voice Tones (`Academic`, `Energetic`, `Professional`).
  - **Right Side (The "Canvas")**: Paper-like rendered platform previews with Framer Motion slide-up animations.
- **Rendered Ad Previews**:
  - **LinkedIn Post**: Institutional profile header, formatted copy, hashtags, and embedded link preview card.
  - **Instagram Reel**: Simulated 9:16 vertical video header with dynamic mesh gradient, script hooks/voiceovers, and interaction icons.
  - **Google Search Ad**: Live Google search result with `Sponsored` badge, green URL breadcrumbs, and clickable `#8AB4F8` headline.
- **Live Refinement Toolbar**: 1-click prompt adjustments (`More Academic`, `Punchier`, `Expand`, `Executive`) that re-trigger synthesis instantly.
- **Archive Database Persistence**: `[ Save to Archive ]` button that writes iterations directly to PostgreSQL via Prisma.

### 4. 👥 Prospective Student Leads CRM (`/leads`)
- **Real-Time Data Table**: Lists synced CRM candidates with Lead ID, Contact Details, Target Program, Channel Origin, and Ingestion Status.
- **Engagement Score Badges**: Dynamic glowing indicators (Green for `>80`, Amber for `50-80`, Rose for `<50`).
- **Interactive cURL Tester**: Single-click button that copies a ready-to-use cURL request directly to your clipboard.
- **Instant Search & Channel Filtering**: Fast client-side search and channel tabs (`All`, `Google`, `Meta`, `LinkedIn`).

### 5. 🔐 Secure CRM Ingestion Webhook (`/api/v1/crm/sync-leads`)
- **REST API Route Handler (`POST`)**: Ingests leads from external university CRMs (Slate, Salesforce, HubSpot).
- **Security**: Validates `x-nexus-api-key` header against environment secret. Returns `401 Unauthorized` on mismatch.
- **Normalization & Batch Persistence**: Normalizes lead objects and batch-inserts into PostgreSQL via Prisma ORM.

---

## 🛠️ Technology Stack Architecture

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Server Actions, Route Groups) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode Enabled, 0 `any` types) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) on [Supabase](https://supabase.com/) |
| **ORM** | [Prisma 7.9](https://www.prisma.io/) with `@prisma/adapter-pg` |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/) |
| **Motion** | [Framer Motion](https://www.framer.com/motion/) |
| **Data Viz** | [Recharts](https://recharts.org/) |
| **AI Engine** | [@google/genai SDK](https://ai.google.dev/) (Gemini 1.5 Pro) |
| **Auth** | [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs) & `@supabase/supabase-js` |
| **Forms** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) |

---

## 📁 Directory Structure

```text
nexus/
├── prisma/
│   └── schema.prisma              # Database schema (User, Campaign, DailyMetrics, Lead, Archive)
├── prisma.config.ts               # Prisma 7 datasource and migration configuration
├── src/
│   ├── app/
│   │   ├── (dashboard)/           # Dashboard Route Group (Clean layout with sidebar)
│   │   │   ├── layout.tsx         # Collapsible sidebar, slim glass top-bar, subtle motion bg
│   │   │   ├── dashboard/         # Telemetry command center & Recharts visualizations
│   │   │   ├── studio/            # Focus Content Studio & Live Iteration Canvas
│   │   │   └── leads/             # Prospective Student Leads CRM data table
│   │   ├── actions/
│   │   │   └── generate-copy.ts   # Server Actions calling Gemini 1.5 Pro & saving to Archive
│   │   ├── api/v1/crm/
│   │   │   └── sync-leads/        # Secure CRM Ingestion Webhook (POST)
│   │   ├── globals.css            # Tailwind theme, float keyframes, glassmorphism utilities
│   │   ├── layout.tsx             # Clean root layout (no sidebar on public pages)
│   │   └── page.tsx               # Public Cinematic Landing Page & Spotlight Gateway
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthCard.tsx       # Supabase Google OAuth & Email/Password modal
│   │   ├── dashboard/
│   │   │   ├── KpiCard.tsx        # Glassmorphic KPI cards with glowing status indicators
│   │   │   ├── CpaAreaChart.tsx   # Dual-axis Area/Line Chart (CPA vs Enrollments)
│   │   │   ├── ChannelDonutChart.tsx # Budget distribution donut chart
│   │   │   └── SubtleMotionBackground.tsx # Slow-floating background orbs & grid
│   │   ├── landing/
│   │   │   ├── MouseSpotlight.tsx # Performant Framer Motion cursor spotlight & grid mask
│   │   │   └── FeatureShowcase.tsx# 3-row alternating split feature showcase
│   │   └── ui/
│   │       ├── LiveDataTicker.tsx # Infinite scrolling telemetry ticker
│   │       └── HeroDashboardPreview.tsx # 3D perspective tilted dashboard mockup
│   └── lib/
│       ├── mockData.ts            # 30-day telemetry time-series & channel breakdown data
│       ├── prisma.ts              # PrismaClient singleton with Postgres adapter
│       └── supabaseClient.ts      # Supabase browser client
└── package.json
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+
- **npm** or **pnpm** / **yarn**

### 2. Installation
```bash
# Clone repository and enter project directory
cd nexus

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `nexus/` directory:

```env
# PostgreSQL Database (Supabase or local PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Google Gemini API Key (for /studio Generative Copy Engine)
GEMINI_API_KEY="AIzaSy..."

# CRM Ingestion Webhook Secret Key (for /api/v1/crm/sync-leads)
NEXUS_API_KEY="nexus_live_crm_key_2026"

# Supabase Auth Credentials
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

> **Note**: NEXUS includes a graceful fallback engine for both telemetry mock data and AI copy generation, allowing full visual evaluation and testing even before live API keys are provided.

### 4. Database Setup
```bash
# Generate Prisma Client
npx prisma generate
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 Webhook API Integration (`/api/v1/crm/sync-leads`)

To stream student leads into NEXUS from Slate, Salesforce, or external workflows, send a `POST` request with the `x-nexus-api-key` header.

### Sample cURL Request

```bash
curl -X POST http://localhost:3000/api/v1/crm/sync-leads \
  -H "Content-Type: application/json" \
  -H "x-nexus-api-key: nexus_live_crm_key_2026" \
  -d '{
    "leads": [
      {
        "leadId": "SLATE-9099",
        "fullName": "Siddharth Menon",
        "email": "siddharth.m@mitindia.edu",
        "programOfInterest": "M.S. in Robotics & AI",
        "sourceChannel": "Google Search High-Intent",
        "engagementScore": 94
      }
    ]
  }'
```

### Response Schema (`201 Created`)

```json
{
  "status": "success",
  "syncedCount": 1,
  "timestamp": "2026-08-16T13:13:50.969Z",
  "message": "Successfully ingested and normalized 1 CRM lead(s) into NEXUS telemetry pipeline.",
  "sampleIngested": [
    {
      "leadId": "SLATE-9099",
      "email": "siddharth.m@mitindia.edu",
      "fullName": "Siddharth Menon",
      "programOfInterest": "M.S. in Robotics & AI",
      "sourceChannel": "Google Search High-Intent",
      "engagementScore": 94,
      "syncStatus": "SYNCED"
    }
  ]
}
```

---

## 🧪 Production Build & Validation

To test the optimized production build:

```bash
npm run build
npm start
```

---

## 📄 License
This project is licensed under the MIT License. Enterprise edition for higher education institutions.
