# PHASE 24 — INDEPENDENTLY HOSTED BACKEND ARCHITECTURE & DEPLOYMENT PLAN

**Execution Date:** 2026-10-09T01:05:00+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Backend Repository:** [ariesxpert-backend](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend) (Commit `2d11247`)  
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

## 2. CURRENT HOSTED BACKEND STATUS & CONNECTIVITY VERIFICATION

### 2.1 Production Host Status
- **Public Base URL:** `https://api.ariesxpert.com`
- **API Version Path:** `https://api.ariesxpert.com/api/v1`
- **Health / Status Route:** `https://api.ariesxpert.com/status`
- **Host Infrastructure:** Ubuntu Linux / Nginx 1.26.3 reverse proxy / Node.js PM2 cluster

### 2.2 Live Connectivity & Contract Probe Results
Probe executed live via HTTPS:

```bash
$ curl -s https://api.ariesxpert.com/status
{
  "success": true,
  "message": "AriesXpert API is running",
  "version": "3.1.0",
  "timestamp": "2026-10-08T19:31:38.554Z",
  "apiVersion": "v1"
}
```

```bash
$ curl -I https://api.ariesxpert.com
HTTP/2 302 
server: nginx/1.26.3 (Ubuntu)
strict-transport-security: max-age=31536000; includeSubDomains; preload
content-security-policy: default-src 'self'; connect-src 'self' https://api.ariesxpert.com ...
x-ratelimit-limit: 1000
location: /status
```

**Observation:**
- The production server is live and fully responsive with HTTP/2, HSTS (`max-age=31536000`), CSP, and active rate limiting.
- The currently deployed production version is **`3.1.0`**.

---

## 3. API CONTRACT GAP ANALYSIS (HOSTED v3.1.0 vs MOBILE CANDIDATE 2.0.0)

Comparing the hosted API (v3.1.0) against the AriesXpert 2.0.0 mobile application requirements:

| Endpoint / Feature | Hosted Production (`3.1.0`) | Candidate Requirements (Phase 24) | Status on Hosted API | Action Required |
| :--- | :--- | :--- | :---: | :--- |
| `POST /api/v1/auth/login` | Supported | Required for phone OTP & password login | **ACTIVE** | None (Preserve contract) |
| `POST /api/v1/auth/verify-otp` | Supported | Required for login OTP verification | **ACTIVE** | None (Preserve contract) |
| `GET /api/v1/therapist/profile`| Supported | Required for therapist profile load | **ACTIVE** | None (Preserve contract) |
| `GET /api/v1/appointments` | Supported | Required for appointment lists | **ACTIVE** | None (Preserve contract) |
| `POST /api/v1/auth/legacy-migrate` | **NOT DEPLOYED** | Transparent session migration for upgraded users | **GAP** | Deploy commit `2d11247` |
| `POST /api/v1/auth/delete-account` (HMAC Challenge) | Legacy format | Keyed HMAC challenge with `DELETION_HMAC_SECRET` | **ENHANCEMENT** | Deploy commit `2d11247` |
| Permanent Replay Store (`legacy_migration_replays`) | **NOT DEPLOYED** | Durably stores token hashes in MongoDB | **GAP** | Deploy commit `2d11247` |

### Key Discovery:
The legacy migration endpoint (`POST /api/v1/auth/legacy-migrate`) and the dedicated HMAC secret validation logic are implemented in the `release-candidate-production-hardening` branch (commit `2d11247`), but are **not yet deployed** to the live `https://api.ariesxpert.com` host.

If an existing app user upgrades to 2.0.0 before `POST /api/v1/auth/legacy-migrate` is deployed:
- The mobile app's session migration gracefully catches the HTTP 404/401 response and falls back to standard OTP re-authentication.
- However, for seamless, zero-friction in-place upgrade without requiring the user to re-enter phone OTP, the backend changes in commit `2d11247` should be deployed prior to public rollout.

---

## 4. LOCAL IMPLEMENTATION & VERIFICATION IN REPOSITORY

All required changes have been implemented cleanly in the `ariesxpert-backend` repository on branch `release-candidate-production-hardening`:

### Commit Details:
- **Commit Hash:** `2d11247`
- **Commit Subject:** `feat(security): remediate legacy authentication secrets, enforce dedicated deletion HMAC secret, and implement permanent replay protection`

### Implemented Modules:
1. **[src/services/legacyAuthKeyManager.ts](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/src/services/legacyAuthKeyManager.ts):**
   - Eliminated all hardcoded literal secrets.
   - Loads trusted keys exclusively from environment variables (`LEGACY_JWT_SECRET_KEYS` or `LEGACY_JWT_SECRET`).
   - Whitelists symmetric algorithms only (`HS256`, `HS384`, `HS512`); strictly blocks `none`, `RS256`, etc.
   - Enforces key rotation (primary + secondary) and fail-closed state when unconfigured.
2. **[src/models/legacyMigration.model.ts](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/src/models/legacyMigration.model.ts):**
   - Durable MongoDB schema storing SHA-256 token hashes with unique indexing.
   - Ensures permanent replay protection across cluster restarts.
3. **[src/utils/middleware/rateLimiter.ts](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/src/utils/middleware/rateLimiter.ts):**
   - Dedicated rate limiter for legacy migration (`5` attempts per `15` minutes per IP/device).
4. **[src/utils/productionSecrets.ts](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/src/utils/productionSecrets.ts):**
   - Enforces `DELETION_HMAC_SECRET` entropy (>= 32 chars).
   - Validates cryptographic separation: `DELETION_HMAC_SECRET !== JWT_SECRET`.
   - Fails startup if secrets collide or lack required entropy.

### Automated Verification:
- **TypeScript Compilation:** `npm run build` (`tsc -p tsconfig.json`) passed with **0 errors**.
- **Security Assertion Suite:** `node test_phase24_security_assertions.js` passed **26 out of 26 tests**.

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
   DELETION_HMAC_SECRET="<generate-high-entropy-random-secret-min-32-chars>"
   LEGACY_JWT_SECRET="<current-production-jwt-secret>"
   ```
2. **Deploy to Staging Environment:**
   ```bash
   git fetch origin release-candidate-production-hardening
   git checkout 2d11247
   npm install --production=false
   npm run build
   pm2 restart ariesxpert-backend-staging
   ```
3. **Run Staging Smoke Tests:**
   - Verify `GET /status` returns healthy.
   - Test `POST /api/v1/auth/legacy-migrate` with valid legacy token -> returns new session token.
   - Test replay of the same token -> returns `409 Conflict: Migration token already used`.
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

   # Trusted Legacy Key Ring for in-place app migration
   LEGACY_JWT_SECRET="<production-jwt-secret-used-by-original-app>"
   ```
3. **Execute Production Build & Zero-Downtime Reload:**
   ```bash
   ssh root@157.173.218.56
   cd /var/www/AriesXpert-Backend/ariesxpert-backend
   git fetch origin release-candidate-production-hardening
   git checkout 2d11247
   npm install --production=false
   npm run build
   pm2 reload ecosystem.config.js --env production
   ```
4. **Post-Deployment Verification:**
   - Execute `curl -s https://api.ariesxpert.com/status` to confirm running status.
   - Monitor error logs via `pm2 logs ariesxpert-backend --lines 100`.
   - Confirm legacy app users can still log in without disruption.
