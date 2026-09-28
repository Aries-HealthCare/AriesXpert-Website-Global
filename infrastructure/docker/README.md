# Aries HealthCare Eco-System — Docker Architecture & Orchestration

This directory houses the root-level container orchestration layer for the Aries HealthCare Eco-System. It provides a clean, unified development and staging stack that operates alongside existing project-specific Docker configurations without disrupting them.

---

## 1. Port Registry

| Service | Container Name | Internal Port | Host Port | Network | Profiles | Purpose |
|---|---|---|---|---|---|---|
| **Redis** | `aries-shared-redis` | `6379` | `6379` | `aries-core`, `aries-ai`, `aries-data` | `core`, `ai`, `avatar`, `full` | BullMQ queues, rate limiting, and distributed scheduler locks. |
| **Qdrant** | `aries-shared-qdrant` | `6333`, `6334` | `6333`, `6334` | `aries-ai`, `aries-data` | `ai`, `full` | Vector database for RAG clinical knowledge & semantic memory. |
| **OmniRoute** | `aries-omniroute-gateway` | `20128`, `20129` | `20128`, `20129` | `aries-core`, `aries-ai` | `ai`, `full` | High-throughput AI router for 160+ LLMs with auto-fallback. |
| **Backend** | `aries-core-backend` | `5001` | `5001` | `aries-core`, `aries-data` | `core`, `full` | Central Express.js API platform for mobile, web, and admin clients. |
| **MinIO** | `aries-shared-minio` | `9000`, `9001` | `9000`, `9001` | `aries-data` | `avatar`, `full` | S3-compatible local object storage for avatars and document uploads. |

---

## 2. Docker Networks

The development orchestration stack uses three isolated bridge networks:
1. **`aries-core-network`**: Links the central backend, Redis broker, and OmniRoute AI gateway for internal service-to-service communication.
2. **`aries-ai-network`**: Connects OmniRoute with Qdrant vector database and Redis cache.
3. **`aries-data-network`**: Connects database and storage persistence layers (Redis, Qdrant, MinIO).

---

## 3. Profiles & Quick Start

### A. Run Core Services Only (Redis + Backend)
```bash
docker compose -f infrastructure/docker/compose/docker-compose.dev.yml --profile core up -d
```

### B. Run AI Tier (Redis + Qdrant + OmniRoute)
```bash
docker compose -f infrastructure/docker/compose/docker-compose.dev.yml --profile ai up -d
```

### C. Run Full Local Stack (Core + AI + Storage)
```bash
docker compose -f infrastructure/docker/compose/docker-compose.dev.yml --profile full up -d
```

### D. Check Service Health & Logs
```bash
docker compose -f infrastructure/docker/compose/docker-compose.dev.yml ps
docker compose -f infrastructure/docker/compose/docker-compose.dev.yml logs -f [service_name]
```

---

## 4. Relationship with Project-Specific Docker Configurations
This orchestration layer coordinates common services. Independent services continue to maintain their dedicated container files for specialized production scenarios:
- `ariesxpert-backend/docker-compose.yml`: Dedicated production single-app deploy.
- `OmniRoute/docker-compose.yml`: Upstream multi-profile production deploy with Bifrost and CLIProxyAPI.
- `aries-avatar-render-engine/docker-compose.yml`: NVIDIA CUDA GPU rendering cluster with Celery workers.
