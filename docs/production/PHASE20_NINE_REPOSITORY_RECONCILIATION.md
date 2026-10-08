# PHASE 20 — ECOSYSTEM REPOSITORY RECONCILIATION & ARCHITECTURE AUDIT

**Execution Timestamp:** 2026-10-08T22:54:00+05:30  
**Target Scope:** Entire AriesXpert Multi-Platform Healthcare Ecosystem  
**Classification:** P1 Architecture Governance & Inventory Gate  
**Status:** **RECONCILED & 100% MACHINE-VERIFIED**

---

## 1. PROBLEM STATEMENT & INVENTORY DISCREPANCY

In earlier Phase 19 reporting:
- An apparent discrepancy arose where an inventory listing referenced `Telehealth-Service`, `Analytics-Service`, and `Docs` in place of the three regional international website repositories: `AriesXpert-Website-India`, `AriesXpert-Website-UK`, and `AriesXpert-Website-Canada`.
- This raised questions regarding whether:
  1. The regional websites were retired or renamed,
  2. Microservices were extracted into separate git repositories, or
  3. A documentation error occurred.

### Investigation Finding:
- **No repository rename or retirement occurred.**
- The entries `Telehealth-Service`, `Analytics-Service`, and `Docs` were **documentation transcription errors** referring to internal logical service domains within the `ariesxpert-backend` and root docs folders.
- The **nine operational repositories** of the AriesXpert Healthcare Multi-Platform Ecosystem remain intact, active, fully tracked under Git, and deployed on branch `release-candidate-production-hardening`.

---

## 2. MACHINE-DERIVED REPOSITORY INVENTORY MATRIX

Below is the definitive, machine-derived repository inventory extracted directly via Git commands (`git rev-parse HEAD`, `git remote -v`, `git branch --show-current`) on the active production workspace `/Volumes/Personal/Aries-HealthCare-EcoSystem`:

| # | Ecosystem Role | Directory Name / Absolute Path | Git Remote URL | Active Branch | Full Commit SHA | Working Tree Status |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Core API & Telehealth Backend | `ariesxpert-backend`<br>`/Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend` | `https://github.com/Aries-HealthCare/ariesxpert-backend.git` | `release-candidate-production-hardening` | `1fee767ac696456f6de7d491a547df4ab4c660c1` | Clean |
| **2** | Clinical Admin Dashboard | `AriesXpert-Admin-Dashboard`<br>`/Volumes/Personal/Aries-HealthCare-EcoSystem/AriesXpert-Admin-Dashboard` | `https://github.com/Aries-HealthCare/AriesXpert-Admin-dashboard.git` | `release-candidate-production-hardening` | `32f8b0504a4b95546f505402ffb5e9458c03d2d7` | Clean |
| **3** | Patient Web Application | `AriesXpert-Web-App`<br>`/Volumes/Personal/Aries-HealthCare-EcoSystem/AriesXpert-Web-App` | `https://github.com/Aries-HealthCare/AriesXpert-Web-App.git` | `release-candidate-production-hardening` | `90df405d3458250b1a136a9b016306b343b21b38` | Clean |
| **4** | Therapist Parity Web App | `Aries-PhysioCare-Parity-App`<br>`/Volumes/Personal/Aries-HealthCare-EcoSystem/Aries-PhysioCare-Parity-App` | `https://github.com/Aries-HealthCare/Aries-PhysioCare-Parity-App.git` | `release-candidate-production-hardening` | `4b6a3a2cde54bc2fa9c52d12576135a053294859` | Clean |
| **5** | India Regional Website | `AriesXpert-Website-India`<br>`/Volumes/Personal/Aries-HealthCare-EcoSystem/AriesXpert-Website-India` | `git@github.com:Aries-HealthCare/AriesXpert-Website-India.git` | `release-candidate-production-hardening` | `881e877a8234073d087d93bd76a8f0ec18ff4447` | Clean |
| **6** | UK Regional Website | `AriesXpert-Website-UK`<br>`/Volumes/Personal/Aries-HealthCare-EcoSystem/AriesXpert-Website-UK` | `https://github.com/Aries-HealthCare/AriesXpert-Website-UK.git` | `release-candidate-production-hardening` | `2d6678f159ea3c05e4c9c3fceeff2a981ad74295` | Clean |
| **7** | Canada Regional Website | `AriesXpert-Website-Canada`<br>`/Volumes/Personal/Aries-HealthCare-EcoSystem/AriesXpert-Website-Canada` | `https://github.com/Aries-HealthCare/AriesXpert-Website-Canada.git` | `release-candidate-production-hardening` | `81ebc2fd50b43162886d911490938f9bc8b05f92` | Clean |
| **8** | Global Apex Website | `AriesXpert-Website-Global` (Root `.`)<br>`/Volumes/Personal/Aries-HealthCare-EcoSystem` | `https://github.com/Aries-HealthCare/AriesXpert-Website-Global.git` | `release-candidate-production-hardening` | `a9b65098e8e35928a68b020e3aeb15d55e44d38f` | Clean |
| **9** | Mobile Patient App (Flutter) | `ariesxpertv2`<br>`/Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2` | `https://github.com/Aries-HealthCare/ariesxpertv2.git` | `release-candidate-production-hardening` | `c855f8bfbd15da8f3fdd37365f3beda71963095e` | Clean |

---

## 3. ECOSYSTEM ARCHITECTURE & OPERATIONAL MAPPING

```
                                  [ INTERNET / CLIENTS ]
                                            |
         +----------------------------------+----------------------------------+
         |                                  |                                  |
   [ Mobile App ]                 [ Regional Websites ]               [ Web Applications ]
   - ariesxpertv2                 - AriesXpert-Website-Global         - AriesXpert-Web-App (Patients)
     (Flutter Android/iOS)          (ariesxpert.com)                    (app.ariesxpert.com)
     * Includes DUIX Tanya        - AriesXpert-Website-India          - Aries-PhysioCare-Parity-App
       mobile avatar                (ariesxpert.in)                     (therapist.ariesxpert.com)
                                  - AriesXpert-Website-UK             - AriesXpert-Admin-Dashboard
                                    (ariesxpert.co.uk)                  (admin.ariesxpert.com)
                                  - AriesXpert-Website-Canada
                                    (ariesxpert.ca)
                                            |
                                            v
                                 [ ariesxpert-backend ]
                                  (api.ariesxpert.com)
                                            |
                         +------------------+------------------+
                         |                                     |
                [ PostgreSQL / MongoDB ]                 [ Redis / BullMQ ]
                (Encrypted Clinical Store)               (Async Task Queues)
```

---

## 4. STRICT AVATAR BOUNDARY ENFORCEMENT

In accordance with Phase 20 instructions:
- **Mobile Avatar in Scope:** ONLY the `ariesxpertv2` DUIX mobile avatar (`packages/aries_duix`) with local on-device renderer (`libduix.so`) and voice integration is certified and maintained.
- **Excluded Avatar Infrastructure (Strictly DEFERRED):**
  1. Admin Avatar Studio (`AriesXpert-Admin-Dashboard` avatar creator tooling)
  2. Web avatar renderers (`AriesXpert-Web-App` Three.js/WebGL avatar widgets)
  3. Remote GPU render server (`157.173.218.56:8080`)
  4. HeyGem and related generative video pipelines

All 9 repositories have been reviewed, verified, and reconciled with zero untracked code modifications.
