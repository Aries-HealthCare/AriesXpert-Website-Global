# PHASE 24 — DEDICATED DELETION SECRET & REDIS CONCURRENCY SECURITY

**Execution Date:** 2026-10-09T00:44:30+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Backend Commit:** `2d11247` (`ariesxpert-backend`)  
**Implementation Modules:**  
- [src/utils/productionSecrets.ts](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/src/utils/productionSecrets.ts)
- [src/routes/authCompatibility.routes.ts](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/src/routes/authCompatibility.routes.ts)
**Status:** **PURPOSE-ISOLATED, FAIL-CLOSED & CONCURRENCY TESTED**

---

## 1. DEDICATED DELETION SECRET ENFORCEMENT

In Phase 23, the deletion HMAC secret permitted fallback to `JWT_SECRET` and a development string:
```typescript
// VULNERABLE PHASE 23 CODE (REMOVED)
const DELETION_HMAC_SECRET = process.env.DELETION_HMAC_SECRET || process.env.JWT_SECRET || "ariesxpert_deletion_hmac_secret_key_2026";
```

### Phase 24 Remediation:
1. **Zero Secret Fallback:**
   The fallback to `JWT_SECRET` and all literal strings have been **completely eliminated**.
2. **Dedicated Purpose-Specific Secret:**
   The function `getDeletionHmacSecret()` requires `process.env.DELETION_HMAC_SECRET`. If absent, it throws immediately.
3. **Entropy Validation (Minimum 32 Characters / 256 Bits):**
   In both runtime getters and `assertProductionSecrets()`, any secret with fewer than 32 characters is rejected with an explicit configuration error.
4. **Key Separation Guard:**
   `assertProductionSecrets()` verifies that `DELETION_HMAC_SECRET !== JWT_SECRET`, preventing cross-protocol key reuse.
5. **Production Startup Gate:**
   `DELETION_HMAC_SECRET` is registered in `REQUIRED_IN_PRODUCTION` and `PLACEHOLDER_GUARDED`. The server refuses to boot in production if this secret is missing or set to a placeholder value.

---

## 2. KEY ROTATION SPECIFICATION

To allow zero-downtime secret rotation without invalidating active deletion OTP challenges (valid for 300 seconds):
1. **Primary & Secondary Verifiers:**
   The system supports `DELETION_HMAC_SECRET` (current) and optional `DELETION_HMAC_SECRET_PREVIOUS` (rotation grace).
2. **Atomic Lua Evaluation with Rotation Support:**
   When verifying the challenge in Redis, the Lua script matches against both primary `ARGV[1]` and secondary `ARGV[3]`:
   ```lua
   local matched = (challenge.otpHash == ARGV[1])
   if not matched and ARGV[3] and ARGV[3] ~= '' then
     matched = (challenge.otpHash == ARGV[3])
   end
   if matched then
     redis.call('DEL', KEYS[1])
     return 1
   ...
   ```
   If a user requested an OTP right before secret rotation, their code verifies seamlessly during the 300-second window.

---

## 3. ATOMIC REDIS LUA STATE MACHINE & CONCURRENCY PROOF

### State Transition Diagram:
```
[Challenge Created: attempts=0, TTL=300s]
                   │
         Input OTP Submitted
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
    Hash Matches       Hash Mismatches
         │                   │
  [DEL Challenge]      attempts = attempts + 1
   Return 1 (OK)             │
                       ┌─────┴─────┐
                       ▼           ▼
                  attempts < 3   attempts >= 3
                       │           │
                 [SET EX=TTL]  [DEL Challenge]
                 Return 0      Return -2 (Rate Limited)
```

### Concurrency Test Invariant:
Simultaneous execution by two backend workers with the exact same valid OTP:
- **Worker A** executes `eval()` -> `matched == true` -> `DEL KEYS[1]` -> **Returns 1** (Account deletion proceeded).
- **Worker B** executes `eval()` -> `val == nil` (already deleted by Worker A) -> **Returns -1** (Challenge not found / consumed).
- **Outcome:** Zero race conditions. Only a single deletion transaction executes.

---

## 4. INDEPENDENT TEST RESULTS

From [test_phase24_security_assertions.js](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpert-backend/test_phase24_security_assertions.js):

| Security Checkpoint | Verification Metric | Status |
| :--- | :--- | :---: |
| **Entropy Validation** | Rejects secrets < 32 characters with error | **PASS** |
| **Key Separation** | Throws error if `DELETION_HMAC_SECRET == JWT_SECRET` | **PASS** |
| **Fail-Closed on Outage** | Returns HTTP 503 if Redis is disconnected | **PASS** |
| **Replay Prevention** | Consumed challenge returns -1 on re-submission | **PASS** |
| **Bounded Attempts** | 3 incorrect attempts deletes key and returns -2 | **PASS** |
| **Concurrency Race** | 2 simultaneous worker calls yields exactly 1 success and 1 rejection | **PASS** |
