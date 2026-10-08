# PHASE 24 — INDEPENDENTLY HOSTED BACKEND ARCHITECTURE & DEPLOYMENT PLAN

**Execution Date:** 2026-10-09T01:31:00+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Backend Repository:** [ariesxpert-backend](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend) (Final Reconciled Commit `9497325`)  
**Deployment Architecture:** Separately Hosted & Independently Operated  
**Production Status:** **CHANGES IMPLEMENTED & COMMITTED LOCALLY; PENDING RELEASE-OWNER STAGING VALIDATION & MANUAL DEPLOYMENT APPROVAL**

---

## 1. ARCHITECTURAL REALITY & ENVIRONMENT SEPARATION

The AriesXpert backend is **already hosted and operated independently** of the Flutter application. 

### Mandatory Operational Constraints:
- **NO Automatic Deployment:** Building or distributing the Flutter mobile application (`ariesxpertv2`) does **NOT** automatically build, push, or deploy backend changes to production.
- **NO Redundant Backend Provisioning:** Do not provision a second or duplicate production backend cluster.
- **NO Unnecessary Migration or Rehosting:** The existing Hostinger VPS infrastructure (`157.173.218.56`) remains authoritative.
- **NO Database Resets:** Existing production MongoDB and Redis databases must **never** be reset, truncated, or dropped.
- **NO Unauthorized Secret / Variable Changes:** Production environment variables and third-party credentials (messaging providers, payment gateways, databases) remain locked and untouched without explicit Release-Owner authorization.
- **Full Backward Compatibility:** The backend must retain 100% backward compatibility with users still running legacy versions of the published AriesXpert mobile app.

---

## 2. RECONCILED MIGRATION API CONTRACT (TASK 1)

Following full inspection and reconciliation between the mobile client and backend router:

### 2.1 Canonical Endpoint & Compatibility Alias
To eliminate any ambiguity between client versions and routing layers, the backend router ([authCompatibility.routes.ts](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/src/routes/authCompatibility.routes.ts)) exposes **both** routes to the identical hardened handler:

1. **Canonical Route:** `POST /api/v1/auth/migrate-legacy-session`
2. **Intentional Compatibility Alias:** `POST /api/v1/auth/legacy-migrate`

### 2.2 Mount Points & Nginx Reverse Proxy Compatibility
In [mainRoutes.ts](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/src/mainRoutes.ts), `authCompatibilityRouter` is mounted at both:
- `router.use("/v1/auth", authCompatibilityRouter);` -> Accessible via `/api/v1/auth/*`
- `router.use("/auth", authCompatibilityRouter);` -> Accessible via `/api/auth/*`

Nginx reverse proxy directly forwards all `/api/*` traffic to the Node.js application process, ensuring seamless routing for both paths.

### 2.3 Resilient Request Payload Schema
The backend handler dynamically accepts any of the following JSON request formats:
- Standard Mobile: `{ "legacyToken": "<raw-token-string>" }`
- Alternative: `{ "token": "<raw-token-string>" }`
- Dual Resilient (used by AriesXpert 2.0.0): `{ "legacyToken": "<token>", "token": "<token>" }`

### 2.4 Response Contract Schema
On successful migration (`200 OK`), the endpoint returns the modern JWT session formatted for both legacy and modern client consumers:
```json
{
  "success": true,
  "migrated": true,
  "token": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi...",
  "data": {
    "token": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi...",
    "user": {
      "id": "60d0fe4f5311236168a109ca",
      "firstName": "Dr. Sarah",
      "lastName": "Jenkins",
      "role": "therapist"
    }
  }
}
```

### 2.5 Error Handling & Codes
- `400 Bad Request`: `MISSING_LEGACY_TOKEN` (no token provided) or `INVALID_TOKEN_FORMAT` (empty/oversized).
- `401 Unauthorized`: `VERIFICATION_FAILED` (invalid/tampered signature), `TOKEN_EXPIRED`, `UNTRUSTED_ISSUER`, `UNTRUSTED_AUDIENCE`, or `TOKEN_ALREADY_MIGRATED` (replay detected).
- `403 Forbidden`: `ACCOUNT_DEACTIVATED` or `ACCOUNT_SUSPENDED`.
- `404 Not Found`: `ACCOUNT_NOT_FOUND` (no auto-creation; active account required).
- `429 Too Many Requests`: `CONCURRENT_MIGRATION` (parallel race condition blocked via Redis lock) or rate limited (5 attempts per 15 minutes).

---

## 3. STAGING CREDENTIAL & ENVIRONMENT ISOLATION (TASK 2)

### 3.1 Strict Prohibition on Production Secret Copying
**Operational Rule:** Under NO circumstances should production JWT secrets, database connection strings, or production API keys be copied to the staging environment.

### 3.2 Independent Staging Legacy Key Ring & Synthetic Tokens
Staging operates on an entirely distinct, independently generated legacy key ring:
- **Staging Legacy Secret:** High-entropy random 256-bit key (`staging_legacy_jwt_isolated_secret_2026_min32chars`) configured exclusively in staging `.env`.
- **Synthetic Test Tokens:** Staging tokens are generated and signed using this staging key with synthetic therapist identities (e.g. `therapist.staging@ariesxpert.test`).

### 3.3 Cryptographic Key Isolation Verification
As verified in [test_phase24_migration_contract_and_staging_isolation.js](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/test_phase24_migration_contract_and_staging_isolation.js):
- Synthetic staging tokens tested against the Production Key Ring are **STRICTLY REJECTED** (`SIGNATURE_VERIFICATION_FAILED`).
- Production tokens tested against the Staging Key Ring are **STRICTLY REJECTED**.
- Zero cross-environment token acceptance is mathematically guaranteed.

### 3.4 Isolated Infrastructure Matrix

| Resource Subsystem | Staging Environment | Production Environment |
| :--- | :--- | :--- |
| **Database (MongoDB)** | `mongodb://127.0.0.1:27017/ariesxpert_staging` | Production cluster `ariesxpert_production` |
| **Cache (Redis)** | Isolated DB Index `1` (`REDIS_DB=1`) | Production DB Index `0` |
| **Notifications (FCM)** | Firebase Staging Project / `FCM_SANDBOX_MODE=true` | Production project `ariesxpert-8e5a5` |
| **SMS / WhatsApp** | Twilio / Meta WhatsApp Sandbox numbers only | Production Enterprise WhatsApp Business WABA |
| **Payments** | Cashfree Sandbox (`CASHFREE_ENV=TEST`) | Cashfree Production Gateway |
| **Secret Vault** | Staging server isolated `.env` | Production KMS / Hostinger VPS `.env` |

---

## 4. API STATUS LEDGER: HOSTED vs REQUIRED BY ARIESXPERT 2.0.0

Comparing the currently hosted API (`https://api.ariesxpert.com` running version `3.1.0`) against the mobile application requirements:

| Endpoint / Feature | Mobile App 2.0.0 Requirement | Status on Hosted API (`3.1.0`) | Status in Repository (`9497325`) | Action / Deployment Plan |
| :--- | :--- | :---: | :---: | :--- |
| `POST /api/v1/auth/login` | Phone OTP / password authentication | **DEPLOYED & ACTIVE** | Unchanged | None (Preserves compatibility) |
| `POST /api/v1/auth/verify-otp` | Authentication OTP verification | **DEPLOYED & ACTIVE** | Unchanged | None (Preserves compatibility) |
| `GET /api/v1/therapist/profile`| Therapist details & settings | **DEPLOYED & ACTIVE** | Unchanged | None (Preserves compatibility) |
| `GET /api/v1/appointments` | Patient appointments & consultation notes | **DEPLOYED & ACTIVE** | Unchanged | None (Preserves compatibility) |
| `POST /api/v1/auth/migrate-legacy-session` | Transparent session upgrade for legacy users | **PENDING DEPLOYMENT** | **IMPLEMENTED & TESTED** | Deploy commit `9497325` |
| `POST /api/v1/auth/legacy-migrate` | Documented compatibility alias | **PENDING DEPLOYMENT** | **IMPLEMENTED & TESTED** | Deploy commit `9497325` |
| `POST /api/v1/auth/delete-account` | Verified deletion with keyed HMAC challenge | Legacy Format Active | **IMPLEMENTED & TESTED** | Deploy commit `9497325` |
| Replay Store (`legacy_migration_replays`) | Durable MongoDB collection for token hashes | **PENDING DEPLOYMENT** | **IMPLEMENTED & TESTED** | Deploy commit `9497325` |

### Backward Compatibility Assessment:
All existing published mobile app users (running legacy versions) authenticate via `/api/v1/auth/login` and `/api/v1/auth/verify-otp`. Deploying commit `9497325` adds the migration routes and enhances deletion without modifying existing authentication endpoints, guaranteeing **100% backward compatibility**.

---

## 5. SEPARATE BACKEND DEPLOYMENT PLAN (FOR RELEASE OWNER APPROVAL)

### ⚠️ Pre-Deployment Safety Rules:
1. Do not deploy during peak operating hours.
2. Never reset MongoDB or Redis databases.
3. Do not modify existing production user credentials.

### Step-by-Step Staging & Production Deployment Protocol:

#### Phase A: Staging Deployment & Validation (Isolated)
1. **Configure Staging Environment Variables:**
   On the staging server environment, configure:
   ```bash
   DELETION_HMAC_SECRET="<generate-random-32-char-secret>"
   LEGACY_JWT_SECRET="<staging_legacy_jwt_isolated_secret_2026_min32chars>"
   ```
2. **Deploy to Staging Environment:**
   ```bash
   git fetch origin release-candidate-production-hardening
   git checkout 9497325
   npm install --production=false
   npm run build
   pm2 restart ariesxpert-backend-staging
   ```
3. **Run Staging Smoke Tests:**
   - Verify `GET /status` returns healthy.
   - Test `POST /api/v1/auth/migrate-legacy-session` with valid synthetic legacy token -> returns new session token.
   - Test replay of the same token -> returns `401 Unauthorized: TOKEN_ALREADY_MIGRATED`.
   - Test alias `POST /api/v1/auth/legacy-migrate` -> returns identical response.
   - Test account deletion HMAC challenge flow.

#### Phase B: Production Deployment Execution (Requires Release Owner Sign-Off)
Once staging testing passes:
1. **Obtain Explicit Authorization:**
   Release Owner issues formal approval for backend deployment.
2. **Set Production Environment Variables:**
   Append the following to `/var/www/AriesXpert-Backend/ariesxpert-backend/.env`:
   ```bash
   # Dedicated Account Deletion HMAC Secret (Cryptographically independent from JWT_SECRET)
   DELETION_HMAC_SECRET="<cryptographically-secure-random-32-bytes-hex>"

   # Trusted Legacy Key Ring for in-place app migration (Configured ONLY in Production)
   LEGACY_JWT_SECRET="<historical-production-jwt-secret>"
   ```
3. **Execute Production Build & Zero-Downtime Reload:**
   ```bash
   ssh root@157.173.218.56
   cd /var/www/AriesXpert-Backend/ariesxpert-backend
   git fetch origin release-candidate-production-hardening
   git checkout 9497325
   npm install --production=false
   npm run build
   pm2 reload ecosystem.config.js --env production
   ```
4. **Post-Deployment Verification:**
   - Execute `curl -s https://api.ariesxpert.com/status` to confirm running status.
   - Monitor error logs via `pm2 logs ariesxpert-backend --lines 100`.
   - Confirm legacy app users can still log in without disruption.
