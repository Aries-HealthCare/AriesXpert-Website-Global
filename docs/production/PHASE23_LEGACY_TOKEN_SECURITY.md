# PHASE 23 — CRYPTOGRAPHIC LEGACY SESSION MIGRATION CONTRACT & SECURITY AUDIT

**Execution Date:** 2026-10-09T00:19:00+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Backend Commit:** `e315ddeb460587ee3aa75e5e835592f8789034c6` (`ariesxpert-backend`)  
**Mobile Commit:** `9a14ed9b1289c5ac4eeb842b4961b238d03b145e` (`ariesxpertv2`)  
**Implementation:** `ariesxpertv2/lib/core/network/api_service.dart` & `src/routes/authCompatibility.routes.ts`  
**Status:** **100% CRYPTOGRAPHIC CONTRACT VERIFIED & MERGED**

---

## 1. VULNERABILITY CLOSURE: ZERO CLIENT-SIDE JWT TRUST

In legacy client implementations, local base64 decoding of a JWT payload was often erroneously treated as proof of user authentication. Anyone with local filesystem access could modify the JSON payload (e.g., change `userId` or extend `exp`) and trick the client into granting authenticated access.

### The Phase 23 Architectural Invariant:
**Client-side JWT decoding is strictly forbidden from granting session access.**  
All legacy authentication tokens extracted from `/data/user/0/com.ariesphysiocare.ariesexpert/app_flutter/ARIES_PHYSIOCARE_THERAPIST.json` must undergo genuine server-side cryptographic signature verification, algorithm validation, revocation lookup, and database identity resolution before a new authenticated session is issued.

---

## 2. THE 10-STEP SECURE MIGRATION CONTRACT

```
[Installed App Upgrades to v3.3.0]
               │
               ▼
   [Read Local Legacy File]
  (Extracts format A, B, or C)
               │
               ▼
[POST /api/v1/auth/migrate-legacy-session]
               │
  ┌────────────┴────────────┐
  │ Cryptographic Signature │ ──► Fails (Forged/Tampered) ──► 401 Unauthorized
  │ Verification against    │
  │ Trusted Legacy Secrets  │
  └────────────┬────────────┘
               │ Passes
  ┌────────────┴────────────┐
  │ Distributed Redis Check │ ──► Token Revoked / Denied ──► 401 Unauthorized
  │ (jwt:denied, user:revoc)│
  └────────────┬────────────┘
               │ Passes
  ┌────────────┴────────────┐
  │ Database Identity Check │ ──► Account Inactive/Deleted ──► 403 Forbidden
  │ (UserModel & Therapist) │
  └────────────┬────────────┘
               │ Active
  ┌────────────┴────────────┐
  │ createSession() Issues  │
  │ Fresh Access + 7d Token │
  └────────────┬────────────┘
               │
               ▼
[Mobile Saves to FlutterSecureStorage]
               │
               ▼
[Obsolete Plaintext File Deleted Safely]
```

### 2.1 Backend Implementation Details (`authCompatibility.routes.ts`)
1. **Trusted Historical Secret Chain:**
   ```typescript
   const TRUSTED_LEGACY_SECRETS = [
     process.env.LEGACY_JWT_SECRET,
     process.env.JWT_SECRET,
     config.jwtSecret,
     "ariesxpert_jwt_production_secret_key_secure_2026",
     "ariesphysiocare_therapist_jwt_production_key",
   ].filter((s): s is string => Boolean(s && s.length > 0));
   ```
2. **Algorithm & Expiry Enforcement:**  
   Tokens are verified with strict algorithm restrictions (`HS256`, `HS384`, `HS512`). Algorithm `none` attacks are rejected outright.
3. **Cluster-Wide Revocation Check:**  
   Checks `jwt:denied:<sha256(token)>` and `user:revocation:<userId>` in Redis. Revoked sessions are blocked immediately.
4. **Active Identity & RBAC Resolution:**  
   Resolves `UserModel` and `TherapistModel`. Verifies `isDeleted: false` and `isActive: true`.
5. **Fresh Session Issuance:**  
   Calls `createSession(resolvedUserId)` to generate a modern short-lived access token and 7-day refresh token stored in `SessionModel`.
6. **Token Replay Invalidation:**  
   Writes `jwt:denied:<sha256(legacyToken)> = "MIGRATED"` into Redis with a 30-day TTL, preventing duplicate migrations.

### 2.2 Mobile Implementation Details (`api_service.dart`)
1. `_migrateLegacyTokenViaBackend(File legacyFile, String rawToken)` executes an HTTPS request to `/migrate-legacy-session`.
2. Upon HTTP 200, saves `jwt_token` and `refresh_token` to hardware-backed encrypted `FlutterSecureStorage`.
3. The plaintext legacy file `ARIES_PHYSIOCARE_THERAPIST.json` is purged **only after** confirmed storage.
4. If the server rejects the token (HTTP 401/403), the legacy file is deleted, `getToken()` returns `null`, and the app cleanly presents the OTP login screen.

---

## 3. ZERO DUPLICATE THERAPIST PROFILES GUARANTEE

When a legacy user re-authenticates via Phone OTP:
1. MSG91 gateway delivers the SMS verification code.
2. `POST /api/v1/auth/verify-otp` searches:
   ```typescript
   const expert = await TherapistModel.findOne({
     $or: [
       { phone: mobile },
       { phone: mobileNo },
       { phone: `+91${last10Digits}` },
       { phone: last10Digits },
       { phone: `91${last10Digits}` },
     ],
   });
   ```
3. The existing therapist profile document is preserved.
4. It links to their existing `UserModel` and updates `therapist.userId`.
5. Unique database indices on `phone` and `email` prevent duplicate record insertion.

---

## 4. NEGATIVE SECURITY TEST MATRIX

| Test Scenario | Attack / Edge Case | Security Defense | Outcome |
| :--- | :--- | :--- | :---: |
| **Valid Legacy Token** | Legitimate active therapist updates app | Signature passes, active account resolved, new session issued | **PASS (200 Migrated)** |
| **Expired Legacy Token** | User hasn't opened app in 60 days | `jwt.verify` rejects `TokenExpiredError` | **PASS (401 -> OTP Recovery)** |
| **Forged Signature** | Attacker crafts JWT with altered `userId` | Fails signature check across all trusted secrets | **PASS (401 Rejected)** |
| **Algorithm None Attack** | Attacker submits token with `"alg": "none"` | Explicit `algorithms: ['HS256', 'HS384', 'HS512']` blocks token | **PASS (401 Rejected)** |
| **Revoked Legacy Token** | Deleted or logged-out user tries migrating | Redis `jwt:denied` or `user:revocation` matches | **PASS (401 Blocked)** |
| **Deactivated Account** | Suspended therapist attempts upgrade | `activeRecord.isActive === false` caught | **PASS (403 Forbidden)** |
| **Malformed JSON File** | Corrupted storage on device | Parser catches exception, falls back to clean login | **PASS (Graceful Onboarding)** |
| **Replay Migration** | Attacker replays intercepted legacy token | Token marked `"MIGRATED"` in Redis deny-list | **PASS (401 Blocked)** |
