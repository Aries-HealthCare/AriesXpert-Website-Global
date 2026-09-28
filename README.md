# Aries HealthCare Eco-System

Welcome to the **Aries HealthCare Eco-System** repository workspace — an enterprise-grade digital healthcare platform powering in-home physical rehabilitation, telehealth consultations, field clinician operations, automated WhatsApp care workflows, and digital human avatar rendering.

---

## 1. Core Applications

| Application | Path | Tech Stack | Role & Target |
|---|---|---|---|
| **AriesXpert Mobile** | [`ariesxpertv2/`](ariesxpertv2/) | Flutter 3.x / Dart 3.7 / Riverpod | Field Therapist & Practitioner Production Mobile App (Android/iOS). |
| **Admin Dashboard** | [`AriesXpert-Admin-Dashboard/`](AriesXpert-Admin-Dashboard/) | Next.js 15 / React 19 / TypeScript | Central Operational, Clinical, HR, Finance & Founder Console (`ariesxpert.com`). |
| **Therapist Web App** | [`AriesXpert-Web-App/`](AriesXpert-Web-App/) | Next.js 15 / React 19 / TanStack Query | Field Clinician Web/PWA interface with Vision Glass UI. |
| **India Website** | [`AriesXpert-Website-India/`](AriesXpert-Website-India/) | Next.js 15 / Tailwind / ISR | Primary patient discovery, 72-city clinic locators, and lead generation in India. |
| **Canada Website** | [`AriesXpert-Website-Canada/`](AriesXpert-Website-Canada/) | Next.js 15 / Tailwind / Framer | Canadian service discovery, corporate rehab programs, and lead intake. |
| **UK Website** | [`AriesXpert-Website-UK/`](AriesXpert-Website-UK/) | Next.js 15 / Tailwind / NextThemes | UK NHS/Private hybrid therapy discovery and lead ingestion. |
| **Global Website** | [`AriesXpert-Website-Global/`](AriesXpert-Website-Global/) | Next.js 15 / Three.js / GSAP | International gateway with interactive 3D globe and localized routing. |

---

## 2. Core Services

| Service | Path | Tech Stack | Role & Capabilities |
|---|---|---|---|
| **AriesXpert Backend** | [`ariesxpert-backend/`](ariesxpert-backend/) | Express.js 4 / TypeScript 5 / Node 20 | Central Business API (`api.ariesxpert.com`), MongoDB ODM, BullMQ queues, WebSockets, and Multi-WABA WhatsApp OS. |
| **OmniRoute** | [`OmniRoute/`](OmniRoute/) | Node.js (ESM) / TypeScript / Docker | Unified AI router supporting 160+ LLMs with automatic fallback, rate limiting, and OpenAI-compatible endpoints. |

---

## 3. AI & Digital Human Services

| Service | Path | Tech Stack | Role |
|---|---|---|---|
| **HeyGem Avatar Engine** | [`aries-avatar-render-engine/`](aries-avatar-render-engine/) | Python / PyTorch / CUDA / Celery | GPU-accelerated digital human personalized clinical video synthesis. |
| **Duix Avatar** | [`Duix-Avatar/`](Duix-Avatar/) | Electron / Vite / Vue / Docker | Real-time interactive desktop/web avatar conversation engine. |
| **AI Avatar System** | [`ai-avatar-system/`](ai-avatar-system/) | Python / FastAPI / Docker | Containerized avatar pipeline and audio-visual synchronization. |
| **Goblin AI** | [`goblin-ai/`](goblin-ai/) | Python CLI / Real-ESRGAN | Local neural image generation and 4K upscaler for medical illustrations. |

---

## 4. Central Infrastructure

The platform provides a unified container orchestration layer under [`infrastructure/`](infrastructure/):
- **Redis 7**: Distributed locks (`DistributedSchedulerLock`), BullMQ queues, and Socket.io adapter.
- **Qdrant**: Vector database for AI clinical knowledge embeddings and semantic memory.
- **MinIO**: Local S3-compatible asset and document storage.
- **Nginx**: Production reverse proxy configs with SSL termination under [`infrastructure/nginx/`](infrastructure/nginx/).

### Quick Start Development Stack
```bash
# Start Core Services (Redis + Backend)
docker compose -f infrastructure/docker/compose/docker-compose.dev.yml --profile core up -d

# Start AI Routing Services (Redis + Qdrant + OmniRoute)
docker compose -f infrastructure/docker/compose/docker-compose.dev.yml --profile ai up -d

# Start Complete Non-GPU Stack
docker compose -f infrastructure/docker/compose/docker-compose.dev.yml --profile full up -d
```

---

## 5. Documentation Map

All specifications, architectural blueprints, and manuals are consolidated in [`docs/`](docs/):
- **[`docs/architecture/`](docs/architecture/)**: Global topology, [`dependency-inventory.json`](docs/architecture/dependency-inventory.json), and [`dependency-map.md`](docs/architecture/dependency-map.md).
- **[`docs/whatsapp/`](docs/whatsapp/)**: WhatsApp Operating System blueprints, bot inventories, and master template catalogs.
- **[`docs/manuals/`](docs/manuals/)**: Clinical administrator manuals, address verification guides, and mobile UI standards.
- **[`docs/api/`](docs/api/)**: Master OpenAPI manifests and route contracts.
- **[`docs/audits/`](docs/audits/)**: End-to-end data mapping analyses and migration action plans.

---

## 6. Shared Packages & Assets

- **[`packages/assets/portraits/`](packages/assets/portraits/)**: Master source catalog of 172 high-resolution practitioner uniform portraits.
- **Legacy Compatibility Symlink**: `Portrait Expert Images/ -> packages/assets/portraits/`.
