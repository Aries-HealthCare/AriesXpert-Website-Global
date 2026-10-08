# PHASE 24 — LEGACY TOKEN TRUST HARDENING & COMPATIBILITY CONTRACT

**Execution Date:** 2026-10-09T00:43:30+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Backend Commit:** `2d11247` (`ariesxpert-backend`)  
**Implementation Modules:**  
- [src/services/legacyAuthKeyManager.ts](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/src/services/legacyAuthKeyManager.ts)
- [src/routes/authCompatibility.routes.ts](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/src/routes/authCompatibility.routes.ts)
**Status:** **ENTERPRISE SECURED & ZERO-TRUST COMPLIANT**

---

## 1. THE 11-POINT STRICT VALIDATION PIPELINE

When a client submits a legacy token to `POST /api/v1/auth/migrate-legacy-session`, it must satisfy all 11 security gates before any new session token is minted:

```
[Legacy Token Received]
           │
           ▼
Gate 1: Key Ring Active Check (Fail closed if empty)
           │ Passes
           ▼
Gate 2: Format & Length Sanitization (< 4096 chars)
           │ Passes
           ▼
Gate 3: Algorithmic Whitelist (Strict HMAC HS256/384/512; rejects 'none' / asymmetric)
           │ Passes
           ▼
Gate 4: Key ID / Ring Matching (Isolated historical secrets from environment)
           │ Passes
           ▼
Gate 5: Cryptographic Signature Integrity (`jwt.verify`)
           │ Passes
           ▼
Gate 6: Expiration Check (`exp` strictly enforced, no infinite sessions)
           │ Passes
           ▼
Gate 7: Operational Epoch Validation (`iat > 2020-01-01` and `iat <= now + 300s`)
           │ Passes
           ▼
Gate 8: Issuer & Audience Validation (`iss` and `aud` match approved identity list)
           │ Passes
           ▼
Gate 9: Identity Presence & Role Compatibility (`sub`/`id` present; authorized role)
           │ Passes
           ▼
Gate 10: Cluster Deny-List & Revocation (`jwt:denied:<hash>` and `user:revocation:<id>`)
           │ Passes
           ▼
Gate 11: MongoDB Active Record Resolution (User/Therapist must already exist and be active)
           │ Passes
           ▼
[Issue Modern Access + 7d Refresh Tokens via createSession()]
```

---

## 2. DETAILED DEFENSE SPECIFICATIONS

### 2.1 Algorithmic Confusion Immunity
- **Vulnerability:** Attackers frequently swap HMAC tokens to RSA (`RS256` public key confusion) or algorithm `"none"`.
- **Enforcement:** In [legacyAuthKeyManager.ts](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/src/services/legacyAuthKeyManager.ts), `STRICT_HMAC_ALGORITHMS` restricts verification to `["HS256", "HS384", "HS512"]`. Tokens indicating any other algorithm fail immediately at header inspection with error `DISALLOWED_ALGORITHM`.

### 2.2 Strict Token Issuer & Audience Boundaries
- **Authorized Issuers:**
  - `https://api.ariesphysiocare.com`
  - `https://api.ariesxpert.com`
  - `aries-physiocare`
  - `ariesxpert-legacy`
  - `ap-therapist-app`
- **Authorized Audiences:**
  - `aries-therapist-mobile`
  - `ariesxpert-therapist`
  - `com.ariesphysiocare.ariesexpert`
  - `therapist-app`
- Any token specifying an external issuer (e.g., `https://attacker.com`) or unauthorized audience is rejected with `UNTRUSTED_ISSUER` or `UNTRUSTED_AUDIENCE`.

### 2.3 Strict Database Existence (Zero Token-Driven Account Creation)
- **Vulnerability:** Unchecked claims might create phantom therapist profiles.
- **Enforcement:** The endpoint resolves `UserModel.findById(targetUserId)` and `TherapistModel.findOne(...)`. If no corresponding account exists in MongoDB, the request returns `404 Not Found` with `ACCOUNT_NOT_FOUND`. Untrusted token claims **never** trigger account creation.
- **Account State Verification:** Even if the account exists, if `isDeleted === true`, `isActive === false`, or `expert.status === Status.Suspended || Status.Rejected`, the migration is rejected with `403 Forbidden` (`ACCOUNT_DEACTIVATED` / `ACCOUNT_SUSPENDED`).

### 2.4 Controlled Fallback to Phone OTP
If a legacy token cannot be verified cryptographically (due to expiration, corruption, key rotation, or missing server keys):
1. The server returns HTTP 401 with a descriptive code.
2. The client [api_service.dart](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/core/network/api_service.dart) purges the local legacy file and prompts the user to log in via MSG91 Phone OTP.
3. Upon OTP verification, `POST /api/v1/auth/verify-otp` links the session directly to the existing therapist record matching the phone number.
4. **Result:** Seamless continuity with zero duplicate profiles.

---

## 3. AUDIT MATRIX

| Claim | Status | Evidentiary Basis |
| :--- | :---: | :--- |
| **Algorithmic Whitelist** | **Implemented & Independently Tested** | `test_phase24_security_assertions.js` verifies rejection of `none` and `RS256`. |
| **Issuer & Audience Check** | **Implemented & Independently Tested** | Validated against untrusted issuers and unauthorized audiences. |
| **Expiration Enforcement** | **Implemented & Independently Tested** | Expired tokens rejected with `TOKEN_EXPIRED`. |
| **Issuance Epoch Check** | **Implemented & Independently Tested** | Tokens issued prior to 2020 or in future rejected with `INVALID_IAT`. |
| **Zero Account Creation** | **Implemented & Independently Tested** | Missing accounts return 404; no DB mutations performed. |
| **Zero Duplication via OTP** | **Implemented & Independently Tested** | Phone matching resolves existing `TherapistModel` and `UserModel`. |
