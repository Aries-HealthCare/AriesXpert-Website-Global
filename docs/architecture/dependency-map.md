# Aries HealthCare Eco-System — Global Dependency Map

Generated: 2026-09-26  
Architectural Role: Principal Software & Repository Architect  
Classification: Complete Eco-System Technical Audit

---

## 1. System Topology Overview

```
                                [ CLIENT APPLICATIONS ]
                                           │
         ┌───────────────────┬─────────────┴─────────────┬───────────────────┐
         │                   │                           │                   │
         ▼                   ▼                           ▼                   ▼
    AriesXpertV2     AriesXpert-Web-App     AriesXpert-Admin-Dashboard   Country Websites
   (Flutter Mobile)      (PWA Client)              (Next.js 15)           (IN, CA, UK, Global)
         │                   │                           │                   │
         │ (JWT / REST / WS) │                           │ (Cookie / JWT)    │ (Public REST)
         └───────────────────┼───────────────────────────┴───────────────────┘
                             │
                             ▼
               [ CORE BACKEND PLATFORM ]
                 ariesxpert-backend
                 (Express.js + TS / Node 20)
                             │
         ┌───────────────────┼───────────────────────────┬───────────────────┐
         │                   │                           │                   │
         ▼                   ▼                           ▼                   ▼
    [ MongoDB ]          [ Redis ]                   [ Qdrant ]         [ OmniRoute ]
(Primary Document DB)  (Queues, Locks, SocketIO)   (Vector Search)     (AI / LLM Gateway)
 153 Mongoose Models    BullMQ, Redis RateLimit      RAG Embeddings          │
                                                                             ├── OpenRouter
                                                                             ├── Google Gemini
                                                                             ├── Ollama / Local
                                                                             └── Bifrost
```

---

## 2. Comprehensive Project Inventory

### A. AriesXpertV2 (Mobile Application)
- **Path**: `ariesxpertv2/`
- **Framework**: Flutter 3.x / Dart SDK `^3.7.0`
- **Role**: Therapist / Expert Production Mobile Application
- **Runtime Dependencies**:
  - `ariesxpert-backend`: Base URL `https://api.ariesxpert.com`, Sockets at `https://api.ariesxpert.com`.
  - Authentication: JWT stored in `FlutterSecureStorage` (`jwt_token`). Endpoints: `/api/app/expert/loginFromMobile`, `/api/app/expert/sendOrResendOTPtoUser`, `/api/app/expert/verifyOTPofUser`.
  - Push Notifications: Firebase Cloud Messaging (`firebase_messaging`, `firebase_core`).
  - Geolocation & Maps: Google Maps Platform (`google_maps_flutter`, `geolocator`, `geocoding`).
  - Payment Gateways: Cashfree (`flutter_cashfree_pg_sdk` 2.3.4+51), Razorpay (`razorpay_flutter` ^1.4.0).
  - Telehealth Video: Agora RTC Engine (`agora_rtc_engine` ^6.5.4), WebRTC (`flutter_webrtc`), LiveKit (`livekit_client` ^2.4.1).
  - State Management: `flutter_riverpod` ^2.6.1.
- **Build Configuration**:
  - Android: `android/app/build.gradle` (minSdkVersion 21, targetSdkVersion 34).
  - iOS: `ios/Runner.xcodeproj` with Podfile.

### B. AriesXpert-Admin-Dashboard
- **Path**: `AriesXpert-Admin-Dashboard/`
- **Framework**: Next.js 15.5.9 / React 19.2.1 / TypeScript 5 / TailwindCSS
- **Role**: Central Operations, Clinical, Finance, HR, Marketing & Founder Platform
- **Deployment**: Production on Hostinger at `https://ariesxpert.com`.
- **Runtime Dependencies**:
  - `ariesxpert-backend`: Live proxy through `src/app/api/admin/[...path]` and `src/app/api/backend/[...path]` targeting `https://api.ariesxpert.com/api/v1`.
  - Authentication: Next.js edge middleware (`src/middleware.ts`) decoding JWT session cookie (`auth_token`).
  - Maps: `@vis.gl/react-google-maps` via `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
- **Modules**:
  - Therapists, Patients, Leads, Appointments, Treatments, Forms, Finance, WhatsApp, AI Workforce, Tasks, Reports, Settings.

### C. ariesxpert-backend
- **Path**: `ariesxpert-backend/`
- **Framework**: Express.js 4.21.2 / TypeScript 5.9.3 / Node.js 20
- **Role**: Core Platform Service, Single Source of Truth for Data & Business Rules
- **Databases**:
  - **MongoDB** (Primary): Connection via `MONGODB_URI`. 153 Mongoose schemas in `src/models/`.
  - **Redis**: Distributed Scheduler Lock (`DistributedSchedulerLock`), BullMQ queues, Socket.IO adapter, Rate limiting.
  - **Qdrant**: REST Client (`@qdrant/js-client-rest`) for AI clinical knowledge vectorization.
- **Background Queues & Workers**:
  - BullMQ (`bullmq.config.ts`): WhatsApp message queues, campaign queues, omnichannel queues.
  - Cron Manager: Periodic lead sync, reminder dispatches, report generation.
- **External Providers**:
  - Cashfree PG & Payouts (`cashfree-pg` ^5.1.3).
  - Razorpay (`razorpay` ^2.9.6).
  - WhatsApp Cloud API (Multi-WABA Operating System).
  - AWS S3 (`@aws-sdk/client-s3`) & SES.
  - SendGrid & Nodemailer SMTP.
  - Firebase Admin (`firebase-admin` ^13.10.0).

### D. Country & Global Websites
1. **AriesXpert-Website-India** (`AriesXpert-Website-India/`):
   - Next.js 15.5.9, React 19.2.1, TailwindCSS.
   - Purpose: Localized patient discovery, clinic locators (72 cities), clinical conditions, therapist directory with ISR, SEO canonicals, lead intake.
   - Backend integration: `https://api.ariesxpert.com/api/v1/leads/*`, `/api/v1/website/*`, `/api/v1/therapists`.
2. **AriesXpert-Website-Canada** (`AriesXpert-Website-Canada/`):
   - Next.js 15.5.9, React 19.2.1, TailwindCSS.
   - Purpose: Canada-specific telehealth and in-home physical therapy service discovery and localized lead ingestion.
3. **AriesXpert-Website-UK** (`AriesXpert-Website-UK/`):
   - Next.js 15.5.9, React 19.2.1, TailwindCSS.
   - Purpose: UK-specific NHS/Private hybrid therapy discovery, localized bookings, and UK lead ingestion.
4. **AriesXpert-Website-Global** (`AriesXpert-Website-Global/`):
   - Next.js 15.2.1, React 19.0.0, Three.js, GSAP.
   - Purpose: Central brand gateway with interactive 3D globe / country selector, routing traffic to country-specific sites.

### E. OmniRoute (AI Routing Gateway)
- **Path**: `OmniRoute/`
- **Framework**: Node.js (ESM) / TypeScript / Docker Compose
- **Version**: 3.8.49
- **Role**: High-throughput AI gateway supporting 160+ LLM providers (OpenRouter, Gemini, Ollama, Anthropic, OpenAI) with automated circuit breaking, fallback routing, and token compression.
- **Infrastructure**:
  - Redis 7 container for rate limiting.
  - Qdrant container (port 6333) for semantic vector memory.
  - Bifrost sidecar (port 8080) for Tier-1 routing.

### F. Avatar & Digital Human Services
1. **aries-avatar-render-engine** (`aries-avatar-render-engine/`):
   - Python / FastAPI / PyTorch / Celery GPU Cluster.
   - HeyGem digital human video generation engine with NVIDIA CUDA acceleration, Redis broker, and MinIO storage.
2. **Duix-Avatar** (`Duix-Avatar/`):
   - Electron / Vue / Vite real-time interactive digital human avatar interface.
3. **ai-avatar-system** (`ai-avatar-system/`):
   - FastAPI / Docker containerized avatar pipeline.

### G. Supporting Tools, Assets & Documentation
1. **AriesXpert-Web-App** (`AriesXpert-Web-App/`):
   - Progressive Web App (PWA) therapist portal mirroring mobile functionality.
2. **goblin-ai** (`goblin-ai/`):
   - Python library/CLI for offline/free AI image generation and Real-ESRGAN super-resolution.
3. **WhatsApp Bot** (`WhatsApp Bot/`):
   - Architecture blueprints, role journey specifications, and production template catalogs (`AriesXpert_WhatsApp_Templates_Production_Ready.xlsx`).
4. **Portrait Expert Images** (`Portrait Expert Images/`):
   - 172 high-fidelity clinical uniform portraits of Aries experts.
