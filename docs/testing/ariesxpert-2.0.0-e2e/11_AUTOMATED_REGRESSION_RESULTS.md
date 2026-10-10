# ARIESXPERT 2.0.0 — AUTOMATED REGRESSION TEST RESULTS (RECONCILED AUDIT)

**Document Identifier:** `11_AUTOMATED_REGRESSION_RESULTS.md`  
**Audit Revision:** Reconciled Runtime Evidence Edition  
**Execution Date:** October 9, 2026  
**Quality Assurance Lead:** QA Automation Engineer  
**Repositories:** `ariesxpertv2` & `AriesXpert-Admin-Dashboard`  

---

## 1. SUITE EXECUTION SUMMARY

| Test Suite | Framework | Total Tests | Passed | Failed | Skipped | Duration | True Nature |
|---|---|---|---|---|---|---|---|
| **AriesXpertV2 Flutter Test Suite** | `flutter_test` | 34 | 34 | 0 | 0 | 10.4s | **Unit & Widget Mocks** |
| **Admin Dashboard Static Typecheck** | TypeScript `tsc` | 180 Routes | 180 | 0 | 0 | 6.8s | **Static Type Compilation** |
| **Production API Gateway Probes** | `curl` / HTTP/2 | 4 Probes | 4 | 0 | 0 | 1.8s | **Network Gateway Probes** |

> **IMPORTANT DISTINCTION:**  
> Passing unit and widget tests proves that client classes, widgets, and fallback handlers do not throw uncaught exceptions under mock harnesses. It does **NOT** prove that live physical hardware, live Bluetooth sensors, physical microphones, or production transactional databases were exercised.

---

## 2. ARIESXPERTV2 FLUTTER TEST EXECUTION DETAILS

- **Command Executed:**
  ```bash
  flutter test --reporter=expanded
  ```
- **Working Directory:** `/Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2`

### Detailed Test Manifest & Assertions:

1. `test/delete_restrictions_test.dart` (Administrative Deletion RBAC Guards):
   - `+1: Swipe-to-delete on notifications list is disabled for non-founders` — **PASS**
   - `+2: Chat room deletion icons are hidden for non-founders` — **PASS**
   - `+3: AI chat delete option is hidden for non-founders` — **PASS**
   - `+4: Emergency contact remove button is hidden for non-founders` — **PASS**
   - `+5: Service area chip deletion is enabled for founders` — **PASS**
   - `+6: Patient prescription and investigation deletion are visible for founders` — **PASS**
   *(Note: This suite tests administrative data retention guards, NOT user self-service account deletion).*

2. `test/aries_buddy_page_test.dart` (Native DUIX Simulator Fallback):
   - `+7: AriesBuddyPage renders without throwing on initialization` — **PASS**
   - `+8: DuixSessionManager gracefully handles simulator runtime fallback` — **PASS**
   - `+9: Speech input button disables when mic permission is denied` — **PASS**
   - `+10: Clean resource teardown releases allocated animation controllers` — **PASS**
   *(Note: Validates C++ preprocessor bypass; does not certify physical microphone or neural engine).*

3. `test/environment_isolation_test.dart`:
   - `+11: Environment.production maps strictly to https://api.ariesxpert.com` — **PASS**
   - `+12: No development credentials or test tokens leaked in production bundle` — **PASS**
   - `+13: Sentry and Crashlytics configure production DSNs in release mode` — **PASS**

4. `test/network_security_test.dart`:
   - `+14: ApiService attaches Bearer token header to protected endpoints` — **PASS**
   - `+15: 401 response initiates token refresh and retries original request once` — **PASS**
   - `+16: Consecutive 401 errors trigger clean logout and storage purge` — **PASS**
   - `+17: ApiService migrateLegacyToken sends payload to /api/v1/auth/migrate-legacy-session` — **PASS**
   - `+18: ApiService migrateLegacyToken retries /legacy-migrate if 404 received` — **PASS**

5. `test/no_render_contract_test.dart`:
   - `+19: Mobile app does not invoke remote GPU avatar renderers` — **PASS**
   - `+20: Web Avatar Studio hooks are absent from Flutter client bundle` — **PASS**

6. `test/avatar_production_certification_test.dart`:
   - `+21..34: 14 certification checks confirming DUIX mobile Tanya isolation` — **PASS**

---

## 3. ADMIN DASHBOARD STATIC COMPILATION LOG

- **Command Executed:**
  ```bash
  npm run typecheck
  ```
- **Working Directory:** `/Volumes/Personal/Aries-HealthCare-EcoSystem/AriesXpert-Admin-Dashboard`
- **Result:** Exited with code `0`. All 180 Next.js route components, UI primitives, and TypeScript interfaces compile cleanly without syntax or type errors.
