# Aries HealthCare Eco-System — Global Documentation Index

Welcome to the centralized documentation system for the **Aries HealthCare Eco-System**. This directory organizes all architectural blueprints, API contracts, deployment specifications, security guidelines, WhatsApp bot operations, and manual procedures across the platform.

---

## 1. Documentation Structure

```
docs/
├── architecture/     ───► Global system architecture, dependency graphs & maps
├── api/              ───► API contracts, schemas, OpenAPI specs & route manifests
├── deployment/       ───► Production VPS, Hostinger, Vercel & Docker deployment guides
├── security/         ───► RBAC policies, token flows, secrets management & audit findings
├── ai/               ───► OmniRoute LLM routing, AEOS agent kernel & avatar pipelines
├── whatsapp/         ───► Multi-WABA WhatsApp OS, bot catalogs & template flows
├── manuals/          ───► Role-specific operational guides & administrative walkthroughs
├── operations/       ───► Onboarding specifications & field service operational procedures
├── audits/           ───► Forensic code audits, data mapping & migration plans
├── historical/       ───► Milestone archives, deliverable logs & legacy trace data
└── seo/              ───► Global and country-specific SEO architectures & strategies
```

---

## 2. Directory Guides

### [Architecture](architecture/)
- **[`dependency-inventory.json`](architecture/dependency-inventory.json)**: Machine-readable dependency catalog identifying all 14 projects, database owners, and service consumers.
- **[`dependency-map.md`](architecture/dependency-map.md)**: Global dependency topology, runtime connections, and service interaction graphs.
- **[`blueprint.md`](architecture/blueprint.md)**: Architectural blueprint of the platform foundations.
- **[`phase-2-4-implementation-report.md`](architecture/phase-2-4-implementation-report.md)**: Implementation report for Phases 2 through 4.

### [API & Contracts](api/)
- **[`backend.json`](api/backend.json)**: Master backend route manifest and schema definitions.
- Detailed contracts for Mobile App (`/api/app/*`), Admin Dashboard (`/api/admin/*`), and Public Leads (`/api/v1/leads/*`).

### [WhatsApp Operating System](whatsapp/)
- **[`01_Architecture_and_Providers.md`](whatsapp/01_Architecture_and_Providers.md)**: Provider architectures, webhook handlers, and token security.
- **[`02_Bot_Inventory_and_Role_Journeys.md`](whatsapp/02_Bot_Inventory_and_Role_Journeys.md)**: Comprehensive inventory of 10 WhatsApp bots and sub-agents.
- **[`03_Conversations_Templates_and_Flows.md`](whatsapp/03_Conversations_Templates_and_Flows.md)**: Message flow scripts and conversational branching logic.
- **[`AriesXpert_WhatsApp_Templates_Production_Ready.xlsx`](whatsapp/AriesXpert_WhatsApp_Templates_Production_Ready.xlsx)**: Meta-approved template catalogs.
- **[`WhatsApp_Ecosystem_Forensic_Audit.md`](whatsapp/WhatsApp_Ecosystem_Forensic_Audit.md)**: Deep forensic audit of the WhatsApp automation engine.

### [Manuals & Operations](manuals/)
- **[`ADMIN_DASHBOARD_THERAPIST_VIEW.md`](manuals/ADMIN_DASHBOARD_THERAPIST_VIEW.md)**: Clinical administrator guide for therapist profile review and verification.
- **[`MOBILE_UI_GUIDE.md`](manuals/MOBILE_UI_GUIDE.md)**: UI/UX operational standards for the Flutter mobile application.
- **[`PATIENT_MODULE_ADDRESS_FIX_GUIDE.md`](manuals/PATIENT_MODULE_ADDRESS_FIX_GUIDE.md)**: Geo-location and address normalization SOP.
- **[`QUICK_REFERENCE.md`](manuals/QUICK_REFERENCE.md)**: Administrative cheat-sheet for daily platform operations.
- **[`ONBOARDING_FIELD_MAPPING_MASTER.md`](operations/ONBOARDING_FIELD_MAPPING_MASTER.md)**: Master practitioner onboarding field specifications.

### [Audits & Forensics](audits/)
- **[`COMPLETE_DATA_MAPPING_ANALYSIS.md`](audits/COMPLETE_DATA_MAPPING_ANALYSIS.md)**: End-to-end data dictionary and schema cross-reference.
- **[`DATA_MIGRATION_ACTION_PLAN.md`](audits/DATA_MIGRATION_ACTION_PLAN.md)**: Verified migration sequences and database cutover checklists.
- **[`PATIENT_VS_THERAPIST_COMPARISON.md`](audits/PATIENT_VS_THERAPIST_COMPARISON.md)**: Entity domain boundary analysis.

---

## 3. Maintenance Rules
- When introducing a new feature, update the relevant domain directory under `docs/`.
- Never commit production credentials, access keys, or private certificates to documentation files.
- Keep `dependency-inventory.json` synchronized when adding cross-service dependencies or external APIs.
