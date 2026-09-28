# Aries HealthCare Eco-System — Central Infrastructure

This directory provides the centralized infrastructure orchestration, container definitions, and gateway routing configurations for the entire platform.

---

## Directory Layout
- **`docker/compose/`**: Master Docker Compose development and orchestration file (`docker-compose.dev.yml`).
- **`docker/env/`**: Safe environment variable template definitions (`core.env.example`, `ai.env.example`, `avatar.env.example`).
- **`docker/README.md`**: Detailed container port registry, networking topologies, and startup commands.
- **`nginx/`**: Production Nginx reverse proxy configurations with SSL termination and WebSocket pass-through.
