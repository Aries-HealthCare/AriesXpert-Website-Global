# PHASE 23 — GOOGLE PLAY INTERNAL TESTING TRACK ACCEPTANCE AUDIT

**Audit Date:** 2026-10-09T00:21:30+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Package Identity:** `com.ariesphysiocare.ariesexpert`  
**Candidate Artifact:** `ariesxpertv2/build/app/outputs/bundle/release/app-release.aab`  
**Status:** **100% PRE-UPLOAD SPECIFICATION COMPLIANT / READY FOR INTERNAL TRACK**

---

## 1. COMPREHENSIVE GOOGLE PLAY POLICY AUDIT

| Policy Requirement | Specification | Candidate Evidence | Result |
| :--- | :--- | :--- | :---: |
| **Package ID Continuity** | Must match existing listing | `com.ariesphysiocare.ariesexpert` confirmed in AAB manifest | **PASS** |
| **Target SDK Policy** | Target API 36 (Android 16) | `android:targetSdkVersion="36"` verified via `bundletool` | **PASS** |
| **Version Monotonicity** | `versionCode` must exceed previous | `versionCode="33000"` (exceeds legacy `versionCode: 1`) | **PASS** |
| **Modern Delivery Size** | Evaluated via dynamic delivery | Device download size: 121.19–153.99 MB | **PASS** |
| **Network Security** | No cleartext HTTP in release | `usesCleartextTraffic="false"` and strict HTTPS enforced | **PASS** |
| **Account Deletion (In-App)** | Keyed HMAC OTP or password | Verified OTP challenge or password re-auth | **PASS** |
| **Account Deletion (Web URL)** | Public web URL accessible | `https://ariesxpert.com/delete-account` returns HTTP 200 | **PASS** |
| **Foreground Services** | Explicit foreground service types | `android:foregroundServiceType="location"` declared | **PASS** |
| **Data Safety & Permissions** | Scoped storage & media permissions | Granular media permissions with `maxSdkVersion` scoping | **PASS** |

---

## 2. GOOGLE PLAY CONSOLE INTERNAL RELEASE INSTRUCTIONS

For the authorized Release Owner:
1. Log into [Google Play Console](https://play.google.com/console).
2. Select application **AriesXpert** (`com.ariesphysiocare.ariesexpert`).
3. Navigate to **Testing** -> **Internal testing** -> **Create new release**.
4. Upload [app-release.aab](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/build/app/outputs/bundle/release/app-release.aab).
5. **Upload Key Handling:**  
   - If Play Console accepts the upload certificate: Proceed to save release.
   - If Play Console requests an upload certificate reset: Go to **Setup** -> **App signing** -> **Request upload key reset**, and upload [upload_certificate.pem](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/android/upload_certificate.pem).
6. Once registered, share the internal test track URL with authorized QA testers to perform the physical in-place upgrade smoke run.
