# ARIESXPERT 2.0.0 — API CONTRACT & NETWORK AUDIT (RECONCILED AUDIT)

**Document Identifier:** `07_API_CONTRACT_AND_NETWORK_AUDIT.md`  
**Audit Revision:** Reconciled Production Deployment Edition  
**Execution Date:** October 9, 2026  
**API Gateway:** `https://api.ariesxpert.com`  
**Hosted API Version:** v3.1.0  
**Backend Infrastructure:** Nginx 1.26.3 / Ubuntu / Node.js & TypeScript microservices  
**Protocol:** HTTP/2 over TLS 1.3  

---

## 1. RECONCILIATION OF LEGACY SESSION MIGRATION CONTRACT

### The Flaw in Prior Testing:
The earlier report claimed that `POST /api/v1/auth/migrate-legacy-session` and `POST /api/v1/auth/legacy-migrate` were "verified active and deployed on production" because an empty `curl -X POST` request returned `HTTP/2 401 Unauthorized`.

### Exhaustive Gateway Probe Results:
We executed probes against non-existent and legacy routes to uncover the real server behavior:

1. **Probe on Non-Existent Route:**
   ```bash
   curl -s -i -X POST "https://api.ariesxpert.com/api/v1/auth/some-completely-fake-endpoint-xyz123" \
        -H "Content-Type: application/json" -d '{}'
   ```
   **Response:**
   ```http
   HTTP/2 401 Unauthorized
   {"success":false,"message":"Unauthorized: No token provided",...}
   ```
2. **Probe with Invalid Bearer Token:**
   ```bash
   curl -s -i -X POST "https://api.ariesxpert.com/api/v1/auth/some-fake-route" \
        -H "Authorization: Bearer dummy-token" -d '{}'
   ```
   **Response:**
   ```http
   HTTP/2 401 Unauthorized
   {"success":false,"message":"Unauthorized: Invalid or expired token",...}
   ```

### Findings & Reality Check:
1. **Global Auth Middleware Interception:** The hosted production gateway runs an auth middleware in front of `/api/v1/*` that rejects any request without a valid production JWT token *before* route dispatching occurs.
2. **Hosted vs. Repository State:**
   - The independently hosted backend (`https://api.ariesxpert.com`) is running version **3.1.0**.
   - Commit `9497325` (which defines `/api/v1/auth/migrate-legacy-session`, the alias `/legacy-migrate`, and the durable `legacy_migration_replays` collection) is **IMPLEMENTED IN SOURCE CONTROL BUT PENDING DEPLOYMENT ON THE HOSTED SERVER**.
   - Per the user's strict scope directive, the assistant must NOT independently deploy or alter the hosted backend.
3. **Mobile Client Real-World Behavior (`api_service.dart`):**
   - When AriesXpert 2.0.0 launches with an existing legacy token file, it calls `/api/v1/auth/migrate-legacy-session`.
   - The server rejects the call (HTTP 401).
   - In `lib/core/network/api_service.dart` (lines 155–159):
     ```dart
     debugPrint('[ApiService] Backend rejected legacy token (${response.statusCode}): ${response.body}. Enforcing OTP login.');
     try {
       await legacyFile.delete();
     } catch (_) {}
     ```
   - The mobile app cleanly catches the non-200 response, purges the plaintext legacy file, and redirects the user to standard SMS OTP login (**OTP Fallback**).
4. **Conclusion:**
   - **Transparent cryptographic JWT exchange:** **PENDING BACKEND DEPLOYMENT OF COMMIT 9497325**.
   - **OTP Fallback mechanism:** **OPERATIONAL & FUNCTIONAL (PASS)**. Existing users are not locked out; they simply complete a standard OTP re-login.

---

## 2. RECONCILED API CONTRACT & EXECUTION MATRIX

| Test ID | Mobile Route | Admin Route | Endpoint | Method | Hosted Status | Mobile Client Fallback | Operational Verdict |
|---|---|---|---|---|---|---|---|
| API-001 | `/login` | N/A | `/api/v1/auth/send-otp` | POST | **ACTIVE (3.1.0)** | Standard SMS OTP | **PASS** |
| API-002 | `/login` | N/A | `/api/v1/auth/verify-otp` | POST | **ACTIVE (3.1.0)** | Standard JWT Issuance | **PASS** |
| API-003 | App Launch | N/A | `/api/v1/auth/migrate-legacy-session` | POST | **PENDING DEPLOYMENT** | Falls back to OTP login | **PENDING BACKEND DEPLOYMENT** |
| API-004 | App Launch | N/A | `/api/v1/auth/legacy-migrate` | POST | **PENDING DEPLOYMENT** | Falls back to OTP login | **PENDING BACKEND DEPLOYMENT** |
| API-005 | `/privacy-settings` | N/A | `/api/v1/auth/delete-account` | POST | **LEGACY FORMAT ACTIVE** | Reauthentication Challenge | **CODE VERIFIED (PASS)** |
| API-006 | `/profile` | `/therapists/[id]` | `/api/v1/therapist/profile` | GET | **ACTIVE (3.1.0)** | Local cached user | **READ-ONLY PASS** |
| API-007 | `/appointments` | `/appointments` | `/api/v1/appointments` | GET | **ACTIVE (3.1.0)** | SQLite local cache | **READ-ONLY PASS** |
| API-008 | `/appointments/detail` | `/appointments` | `/api/v1/therapist/appointments/:id/accept` | POST | **ACTIVE (3.1.0)** | Optimistic UI update | **BLOCKED ON PROD ISOLATION** |
| API-009 | `/clinical/soap` | `/patients/[id]` | `/api/v1/clinical/sessions/:id/notes` | POST | **ACTIVE (3.1.0)** | Draft local save | **BLOCKED ON PROD ISOLATION** |
| API-010 | `/sos` | `/sos` | `/api/v1/sos/trigger` | POST | **ACTIVE (3.1.0)** | Offline SMS fallback | **BLOCKED ON PROD ISOLATION** |

---

## 3. PRODUCTION SECURITY HEADERS VERIFICATION

Inspected live HTTP/2 response headers from `https://api.ariesxpert.com`:
- **HSTS:** `max-age=31536000; includeSubDomains; preload` (**ACTIVE**)
- **Content-Security-Policy:** Strictly defined for API, Google APIs, and LiveKit (**ACTIVE**)
- **X-Frame-Options:** `DENY` (**ACTIVE**)
- **X-Content-Type-Options:** `nosniff` (**ACTIVE**)
- **Rate Limiting:** Active per-IP throttling at 1,000 requests per sliding window (`x-ratelimit-limit: 1000`).
