# Aries HealthCare Eco-System — Port Registry & Allocation Matrix

**Audit Date:** 2026-09-28  
**Scope:** Complete Eco-System Port Mappings (Core Applications, Backend Services, AI Tier, Infrastructure, Dev Tools)  
**Status:** AUDITED — MULTIPLE LOCALHOST & SIDE-BY-SIDE CONFLICTS IDENTIFIED

---

## 1. Complete Eco-System Port Registry

| Service Name | Source Config / Component | Internal Port | Host Port | Public? | Production? | Development? | Conflict Detected? | Primary Purpose / Protocol |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Nginx Web Gateway** | `infrastructure/nginx/ariesxpert.conf` | `80` | `80` | **YES** | **YES** | Optional | No | HTTP reverse proxy & Let's Encrypt challenge |
| **Nginx TLS Gateway** | `infrastructure/nginx/ariesxpert.conf` | `443` | `443` | **YES** | **YES** | Optional | No | HTTPS TLS termination (api / ariesxpert.com) |
| **AriesXpert Backend** | `ariesxpert-backend/Dockerfile` | `5001` | `5001` | **YES** (via proxy) | **YES** | **YES** | **COLLISION** | Central Express REST API & Socket.io engine |
| **AriesXpert Backend (Env default)** | `ariesxpert-backend/.env.example` | `5000` | `5000` | No | No | Legacy | Ambiguity | Legacy default port in sample environment file |
| **Mock Backend Server** | `AriesXpert-Admin-Dashboard/ariesxpert-backend` | `8080` | `8080` | No | No | Dev Stub | **COLLISION** | Fastify mock backend for admin forms (`src/server.ts`) |
| **Admin Dashboard** | `AriesXpert-Admin-Dashboard/package.json` | `3000` | `3000` | **YES** (via proxy) | **YES** | **YES** | **COLLISION** | Next.js 15 Admin Operations Dashboard |
| **Therapist Web App** | `AriesXpert-Web-App/package.json` | `3000` | `3000` (default) | **YES** | **YES** | **YES** | **COLLISION** | Next.js 15 Therapist Field App |
| **Website India** | `AriesXpert-Website-India/package.json` | `3000` | `3000` (default) | **YES** | **YES** | **YES** | **COLLISION** | Next.js 15 Indian Regional Website (`in.ariesxpert.com`) |
| **Website Canada** | `AriesXpert-Website-Canada/package.json` | `3000` | `3000` (default) | **YES** | **YES** | **YES** | **COLLISION** | Next.js 15 Canadian Regional Website (`ca.ariesxpert.com`) |
| **Website UK** | `AriesXpert-Website-UK/package.json` | `3000` | `3000` (default) | **YES** | **YES** | **YES** | **COLLISION** | Next.js 15 UK Regional Website (`uk.ariesxpert.com`) |
| **Website Global** | `AriesXpert-Website-Global/package.json` | `3005` | `3005` | **YES** | **YES** | **YES** | No | Next.js 15 Global Corporate Site |
| **Root Global Web** | `[WORKSPACE ROOT]/package.json` | `3000` | `3000` (default) | **YES** | **YES** | **YES** | **COLLISION** | Root Global Website Next.js runtime |
| **PhysioCare Parity App** | `Aries-PhysioCare-Parity-App/package.json`| `3000` | `3000` (default) | No | Legacy | Legacy | **COLLISION** | Deprecated React/Next PWA client |
| **Shared Redis** | `infrastructure/docker/compose` | `6379` | `6379` | **UNSAFE** (0.0.0.0) | **YES** | **YES** | **COLLISION** | Core cache, BullMQ queue broker, rate limits |
| **Backend Redis** | `ariesxpert-backend/docker-compose.yml` | `6379` | Exposed | Internal | Dev/Prod | Dev/Prod | No (Internal) | Isolated backend compose Redis instance |
| **OmniRoute Redis** | `OmniRoute/docker-compose.yml` | `6379` | `6379` | **UNSAFE** | No | Dev | **COLLISION** | OmniRoute rate limiter cache instance |
| **Avatar Redis** | `ai-avatar-system/docker-compose.yml` | `6379` | `127.0.0.1:6379`| Internal | Staging | Dev | **COLLISION** | Avatar Celery queue broker instance |
| **Qdrant REST API** | `infrastructure/docker/compose` | `6333` | `6333` | **UNSAFE** (0.0.0.0) | **YES** | **YES** | **COLLISION** | Semantic memory offload & clinical embeddings |
| **Qdrant gRPC API** | `infrastructure/docker/compose` | `6334` | `6334` | **UNSAFE** (0.0.0.0) | **YES** | **YES** | **COLLISION** | High-throughput vector search gRPC endpoint |
| **OmniRoute Qdrant** | `OmniRoute/docker-compose.yml` | `6333`/`6334` | `6333`/`6334` | **UNSAFE** | No | Dev | **COLLISION** | OmniRoute dedicated memory sidecar |
| **OmniRoute Gateway** | `infrastructure/docker/compose` | `20128` | `20128` | Local/VPN | **YES** | **YES** | **COLLISION** | OmniRoute Dashboard / Web Proxy endpoint |
| **OmniRoute API** | `infrastructure/docker/compose` | `20129` | `20129` | Local/VPN | **YES** | **YES** | **COLLISION** | OmniRoute Unified AI LLM Routing API |
| **OmniRoute Live WS** | `OmniRoute/docker-compose.yml` | `20132` | `20132` | Internal | Staging | Dev | No | OmniRoute real-time streaming WebSocket |
| **Bifrost Sidecar** | `OmniRoute/docker-compose.yml` | `8080` | `8080` | Internal | Staging | Dev | **COLLISION** | High-performance Go Tier-1 LLM Router |
| **CLIProxyAPI** | `OmniRoute/docker-compose.yml` | `8317` | `8317` | Internal | Staging | Dev | No | Sidecar proxy for local CLI AI agents |
| **MinIO S3 API** | `infrastructure/docker/compose` | `9000` | `9000` | **UNSAFE** (0.0.0.0) | **YES** | **YES** | No | Local S3 Object Storage API (avatars/audio) |
| **MinIO Web Console** | `infrastructure/docker/compose` | `9001` | `9001` | **UNSAFE** (0.0.0.0) | **YES** | **YES** | No | MinIO web management UI |
| **HeyGem GPU Engine** | `aries-avatar-render-engine` | `8000` | `8000` | External GPU | **YES** | Dev | **COLLISION** | FastAPI HeyGem GPU Render Engine Endpoint |
| **HeyGem Inference** | `aries-avatar-render-engine` | `8383` | `8383` | Internal | **YES** | Dev | **COLLISION** | guiji2025 HeyGem inference model daemon |
| **Duix Video Gen** | `Duix-Avatar/deploy/docker-compose.yml`| `8383` | `8383` | Internal | Staging | Dev | **COLLISION** | Duix Avatar face-to-face video generation |
| **Duix TTS Engine** | `Duix-Avatar/deploy/docker-compose.yml`| `8080` | `18180` | Internal | Staging | Dev | No | Fish-speech text-to-speech engine |
| **Duix ASR Engine** | `Duix-Avatar/deploy/docker-compose.yml`| `10095`| `10095` | Internal | Staging | Dev | No | FunASR speech recognition engine |
| **Avatar PostgreSQL** | `ai-avatar-system/docker-compose.yml` | `5432` | `127.0.0.1:5432`| Localhost | Staging | Dev | No | Postgres relational store for avatar system |
| **LiveKit SFU** | `ariesxpert-backend/.env.example` | `7880` | `7880` | Internal/VPN | **YES** | Dev | No | WebRTC video SFU for telehealth sessions |
| **Ollama Local LLM** | `OmniRoute/.env.example` | `11434` | `11434` | Localhost | Staging | Dev | No | Self-hosted LLaMA/Mistral local inference |

---

## 2. Discovered Port Collisions & Conflicts

### Collision Group 1: Port `3000` (Frontend Port Contention)
- **Contenders:**
  - `AriesXpert-Admin-Dashboard` (`next dev -p 3000`)
  - `AriesXpert-Web-App` (`next dev`)
  - `AriesXpert-Website-India` (`next dev`)
  - `AriesXpert-Website-Canada` (`next dev`)
  - `AriesXpert-Website-UK` (`next dev`)
  - Root Global Website (`next dev`)
- **Impact:** Only one frontend application can start at a time without manual port override. In non-interactive developer environments (e.g. CI scripts), subsequent applications crash with `Error: listen EADDRINUSE: address already in use :::3000`.
- **Resolution:** Assign permanent, dedicated development ports across the ecosystem:
  - Admin Dashboard: `3000`
  - Therapist Web App: `3001`
  - Website India: `3002`
  - Website Canada: `3003`
  - Website UK: `3004`
  - Website Global: `3005` (already configured in `AriesXpert-Website-Global/package.json`)

### Collision Group 2: Port `6379` (Redis Side-by-Side Contention)
- **Contenders:**
  - `infrastructure/docker/compose/docker-compose.dev.yml` (`aries-shared-redis`: `6379:6379`)
  - `OmniRoute/docker-compose.yml` (`omniroute-redis`: `6379:6379`)
  - `ai-avatar-system/docker-compose.yml` (`avatar-redis`: `127.0.0.1:6379:6379`)
- **Impact:** If a developer starts `docker compose` in `OmniRoute/` while root ecosystem compose is running, Docker throws `Bind for 0.0.0.0:6379 failed: port is already allocated`.
- **Resolution:** In root compose, use the shared Redis instance (`aries-shared-redis`) and instruct subprojects to connect to it via `aries-core-network` / `aries-ai-network` rather than spawning separate containerized Redis brokers.

### Collision Group 3: Port `6333` / `6334` (Qdrant Vector Contention)
- **Contenders:**
  - `infrastructure/docker/compose/docker-compose.dev.yml` (`aries-shared-qdrant`: `6333`, `6334`)
  - `OmniRoute/docker-compose.yml` (`omniroute-qdrant`: `6333`, `6334`)
- **Impact:** Duplicate Qdrant sidecars conflict on host ports 6333 (REST) and 6334 (gRPC).

### Collision Group 4: Port `8080` (Fastify Mock vs. Bifrost Router)
- **Contenders:**
  - `AriesXpert-Admin-Dashboard/ariesxpert-backend/src/server.ts` (Fastify mock backend binds `8080`)
  - `OmniRoute/docker-compose.yml` (Bifrost Tier-1 LLM Router binds `8080:8080`)
- **Impact:** Running admin dashboard mock backend blocks Bifrost AI router sidecar.

### Collision Group 5: Port `8383` (HeyGem vs. Duix Video Daemon)
- **Contenders:**
  - `aries-avatar-render-engine/docker-compose.yml` (`heygem-inference` exposes `8383`)
  - `Duix-Avatar/deploy/docker-compose.yml` (`duix-avatar-gen-video` binds `8383:8383`)
- **Impact:** Both avatar frameworks share underlying guiji2025 image ports. Concurrent execution causes GPU memory and port collisions.
