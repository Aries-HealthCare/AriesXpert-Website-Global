# ARIESXPERT 2.0.0 — MOBILE END-TO-END TEST RESULTS (RECONCILED AUDIT)

**Document Identifier:** `04_MOBILE_END_TO_END_TEST_RESULTS.md`  
**Audit Revision:** Reconciled Runtime Evidence Edition  
**Execution Date:** October 9, 2026  
**Application:** AriesXpertV2 (Version `2.0.0+33000`)  
**Package:** `com.ariesphysiocare.ariesexpert` (iOS Bundle: `com.aries.ariesxpertv2`)  
**Target Environment:** Production Gateway (`https://api.ariesxpert.com`)  
**Simulator Hardware:** Apple iPhone 16 Pro (iOS 18.3, Simulator UDID: `AD96EF36-D4DF-43E6-A372-E15982179942`)  
**Runtime PID:** 50559  

---

## 1. RECONCILED COVERAGE ACCOUNTING

To correct earlier claims of 100% functional execution, this report strictly separates cataloged discovery from actual runtime interactions:

| Metric Category | Count | Accounting Coverage | Observed Execution Coverage | Notes |
|---|---|---|---|---|
| **Discovered Widgets & Screens** | 149 | 100% (149/149) | **10.7% (16/149)** | 149 includes inner sheet/card classes; 16 were directly rendered in simulator or widget test harnesses. |
| **Primary Navigable Routes** | 38 | 100% (38/38) | **36.8% (14/38)** | Routes switched via `main.dart` and bottom nav bar. |
| **Interactive Controls** | 724 | 100% (724/724) | **5.2% (38/724)** | Buttons and tabs actually tapped in runtime simulator session. |
| **State-Mutating Controls** | 112 | 100% (112/112) | **0% (BLOCKED)** | Mutating live appointments, clinical notes, or doctor statuses was blocked to protect production data. |
| **Automated Widget/Unit Tests** | 34 | 100% (34/34) | **100% (34/34 PASS)** | Executed via `flutter test --reporter=expanded` in 10.4s. |

---

## 2. DETAILED RUNTIME EXECUTION BY DOMAIN

### C1. Application Startup & Lifecycle
- **Cold Launch:** Verified. App boots in ~2.1s, renders Aries branding on splash screen, and reaches MainDashboardWrapper without native aborts.
- **Environment Isolation:** Confirmed `Environment.apiBaseUrl` points to `https://api.ariesxpert.com`.
- **Firebase Initialization:** Confirmed `Firebase.initializeApp` executes cleanly under iOS simulator runtime.
- **Process Verification:** Attached to active PID `50559` (`com.aries.ariesxpertv2`).

### C2. Authentication, Migration & Account Deletion
- **Legacy Session Migration Route:**
  - Probed live production backend: Global auth middleware returns `HTTP/2 401 Unauthorized` for requests lacking production tokens.
  - As documented in architecture plan, commit `9497325` (implementing `/migrate-legacy-session`) is **PENDING DEPLOYMENT** on the hosted API (running v3.1.0).
  - Mobile client behavior (`api_service.dart`): Rejection of legacy token triggers the **OTP Fallback** branch (lines 155-159), purging the legacy token file and prompting the user to complete a standard SMS OTP login.
  - **Verdict:** Transparent JWT migration is **PENDING BACKEND DEPLOYMENT**; OTP fallback is **PASS (FUNCTIONAL FAIL-SAFE)**.
- **Account Deletion & Regulatory Compliance:**
  - **Administrative Purges:** `test/delete_restrictions_test.dart` confirms that non-founder roles cannot delete other therapists, service areas, clinical prescriptions, or chat rooms (**PASS**).
  - **User Self-Service Account Deletion:** Inspected `_deleteAccount()` in `privacy_settings_page.dart`. The user is required to enter their password or request a 6-digit SMS OTP code. It calls `ApiService().deleteAccount()` and purges local storage. This complies with **Google Play User Data policies** and **Apple App Store Review Guideline 5.1.1(v)**. It does NOT require Founder approval for self-service deletion (**CODE VERIFIED / LIVE DELETION BLOCKED TO PRESERVE TEST ACCOUNT**).
  - **Healthcare Legal Retention:** India's Clinical Establishments Act and NMC regulations require retaining medical records for 3 years; the backend archives clinical history even upon user deactivation.

### C3. Dashboard & Primary Navigation
- **Active Simulator Interactions:**
  - Tapped bottom navigation tabs: Home, Appointments, Leads, SOS, More.
  - Navigation stack transitions cleanly (`_onNavigate()`); PageStorageBucket retains scroll offsets.
- **Read-Only Verification:**
  - KPI tiles display data models cleanly.
  - Appointment list renders assigned items without layout overflow.

### C7. Native DUIX Mobile Tanya Avatar (`packages/aries_duix`)
- **Simulator Runtime Behavior:**
  - The C++ native library `GJLocalDigitalSDK` contains device-only ARM64 binary slices that lack Apple Neural Engine support in iOS simulator virtualized x86_64/arm64 environments.
  - Preprocessor check `#if !TARGET_OS_SIMULATOR` in the plugin wrapper executes safely, bypassing native C++ pointers and falling back to the standard UI placeholder.
  - Unit tests `test/aries_buddy_page_test.dart` and `test/avatar_production_certification_test.dart` pass 100%.
- **Classification:** **SIMULATOR LIMITED / PENDING PHYSICAL HARDWARE BENCH TEST**.
  - Physical microphone capture, live acoustic ASR, and real-time GPU lip-sync rendering cannot be certified on simulator and require an enrolled physical device.

---

## 3. EVIDENCE ARTIFACTS
- Simulator Launch Screenshot: [evidence/ios_simulator_launch.png](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/docs/testing/ariesxpert-2.0.0-e2e/evidence/ios_simulator_launch.png)
- Automated Test Suite Log: [11_AUTOMATED_REGRESSION_RESULTS.md](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/docs/testing/ariesxpert-2.0.0-e2e/11_AUTOMATED_REGRESSION_RESULTS.md)
