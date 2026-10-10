# ARIESXPERT 2.0.0 — MASTER DEFECT REGISTER (RECONCILED AUDIT)

**Document Identifier:** `08_DEFECT_REGISTER.md`  
**Audit Revision:** Reconciled Runtime Evidence Edition  
**Execution Date:** October 9, 2026  
**Quality Assurance Lead:** Full-Stack & Security Integration Auditor  
**Scope:** AriesXpertV2 (`2.0.0+33000`), AriesXpert Admin Dashboard & Hosted API  

---

## 1. RECONCILED DEFECT & LIMITATION SUMMARY

| Defect ID | Severity | Description | Nature | Status |
|---|---|---|---|---|
| **DEF-001** | **P0** | Legacy JWT Token Decoding without Server-Side Cryptographic Signature | Security / Auth | **RESOLVED IN REPO (Commit 9497325)** |
| **DEF-002** | **P1** | Google Play Android 16 / API Level 36 Target SDK Compliance | Regulatory / Build | **RESOLVED IN GRADLE** |
| **DEF-003** | **P1** | Conflation of Administrative vs Self-Service Account Deletion RBAC | Privacy & Governance | **CLARIFIED & RESOLVED** |
| **DEF-004** | **P2** | iOS Simulator Native DUIX C++ Slices / Neural Hardware Constraint | Hardware Limitation | **SIMULATOR LIMITED (C++ Fallback Pass)** |
| **DEF-005** | **P3** | Chrome Automation Direct JavaScript Execution Sandbox | Tooling | **RESOLVED VIA APPLESCRIPT & SCREENCAPTURE** |
| **DEF-006** | **P1** | Hosted Production API v3.1.0 Lacks Migration Route (Pending Deployment) | Environment / Deployment | **OPEN ON HOSTED BACKEND (OTP Fallback Active)** |
| **DEF-007** | **P2** | Cross-App Transactional Mutations Blocked on Production Isolation | Test Safety Gate | **BLOCKED ON PROD ISOLATION** |

---

## 2. DETAILED DEFECT LOG & RECONCILIATION

### DEF-001 (P0) — Legacy Token Cryptographic Verification
- **Issue:** Mobile app historically decoded JWT claims locally without backend signature verification.
- **Fix:** Implemented backend cryptographic migration endpoint and client handshake in `api_service.dart`.
- **Status:** **RESOLVED IN CLIENT & BACKEND CODE (Commit 9497325)**.

---

### DEF-002 (P1) — Android 16 (API Level 36) Compliance
- **Issue:** Google Play October 2026 policy requires targeting API 36 for phone applications.
- **Fix:** Upgraded `compileSdk = 36` and `targetSdk = 36` in `ariesxpertv2/android/app/build.gradle.kts`. Configured version `2.0.0+33000`.
- **Status:** **RESOLVED & VERIFIED IN BUILD FILES**.

---

### DEF-003 (P1) — Account Deletion Scope Distinction (Administrative vs Self-Service)
- **Correction:** The prior report claimed that ordinary users could not delete their account without Founder privileges.
- **Reconciliation:**
  - **Administrative Purges:** Deleting other therapists, service areas, clinical records, or emergency contacts is strictly gated to the `FOUNDER` role in `test/delete_restrictions_test.dart` (**PASS**).
  - **User Self-Service Account Deletion:** Located in `PrivacySettingsPage` (`_deleteAccount()`). Any authenticated user can delete their own account after entering password or SMS OTP code. This complies with **Apple App Store Guideline 5.1.1(v)** and **Google Play User Data policies**. Medical records are archived per statutory healthcare regulations (**CODE VERIFIED**).
- **Status:** **CLARIFIED & COMPLIANT**.

---

### DEF-004 (P2) — iOS Simulator Native DUIX Tanya Hardware Limitation
- **Issue:** Native `GJLocalDigitalSDK` within `packages/aries_duix` contains device-only ARM64 binary slices that lack Apple Neural Engine support on virtualized simulators.
- **Resolution:** Preprocessor check `#if !TARGET_OS_SIMULATOR` provides graceful fallback so simulator runs without crash.
- **Status:** **SIMULATOR LIMITED / PENDING PHYSICAL HARDWARE BENCH TEST**.

---

### DEF-006 (P1) — Hosted Backend API Lacks Deployment of Commit 9497325
- **Discovery:** An empty curl to `/api/v1/auth/migrate-legacy-session` returned 401 because of global gateway middleware, not because the route was deployed. The hosted API is running v3.1.0 without commit `9497325`.
- **Mitigation:** Mobile client `api_service.dart` handles non-200 responses cleanly by purging the legacy token file and redirecting the user to SMS OTP login (**OTP Fallback**).
- **Status:** **OPEN ON HOSTED BACKEND**. Transparent migration requires release owner to deploy commit `9497325` to `https://api.ariesxpert.com`. In the interim, OTP Fallback functions as a safe fail-safe.

---

### DEF-007 (P2) — State-Mutating E2E Tests Blocked on Live Production
- **Discovery:** Both mobile and admin test sessions are connected to the live production database (`https://api.ariesxpert.com`). Creating synthetic appointments, modifying therapist statuses, or triggering SOS panic alerts would corrupt real patient queues and dispatch false emergency alerts.
- **Mitigation:** Verified data models, API schemas, and read-only UI grids. Transactional mutation tests must be run in an isolated staging environment.
- **Status:** **BLOCKED ON PROD ISOLATION**.
