# PHASE 22 — GOOGLE PLAY INTERNAL TESTING TRACK ACCEPTANCE AUDIT

**Audit Date:** 2026-10-09T00:02:00+05:30  
**Target Track:** Google Play Console — Internal Testing Track  
**Package Name:** `com.ariesphysiocare.ariesexpert`  
**Candidate Artifact:** `ariesxpertv2/build/app/outputs/bundle/release/app-release.aab`  
**Status:** **100% PRE-UPLOAD SPECIFICATION COMPLIANT / READY FOR UPLOAD**

---

## 1. COMPREHENSIVE GOOGLE PLAY POLICY AUDIT

| Policy Requirement | Specification | Candidate Evidence | Result |
| :--- | :--- | :--- | :---: |
| **Package ID Continuity** | Must match existing listing | `com.ariesphysiocare.ariesexpert` confirmed in AAB manifest | **PASS** |
| **Target SDK Policy (Oct 2026)** | Target API 36 (Android 16) | `android:targetSdkVersion="36"` verified via `bundletool` | **PASS** |
| **Version Monotonicity** | `versionCode` must exceed previous | `versionCode="33000"` (exceeds legacy `versionCode: 1`) | **PASS** |
| **Delivery Size Ceiling** | Device download size < 200 MB | Max `153.99 MB` verified via `bundletool get-size` | **PASS** |
| **Network Security** | No cleartext HTTP in release | `usesCleartextTraffic="false"` and strict HTTPS enforced | **PASS** |
| **Account Deletion (In-App)** | Genuine reauthentication required | Verified OTP challenge via SMS or password re-auth | **PASS** |
| **Account Deletion (Web URL)** | Public web URL accessible | `https://ariesxpert.com/delete-account` returns HTTP 200 | **PASS** |
| **Foreground Services** | Explicit foreground service types | `android:foregroundServiceType="location"` declared | **PASS** |
| **Privacy & Permissions** | Scoped storage & media permissions | Granular media permissions with `maxSdkVersion` scoping | **PASS** |

---

## 2. GOOGLE PLAY CONSOLE UPLOAD INSTRUCTIONS

For the authorized Release Owner:
1. Navigate to **Google Play Console** -> Select application **AriesXpert** (`com.ariesphysiocare.ariesexpert`).
2. Go to **Testing** -> **Internal testing** -> **Create new release**.
3. Drag and drop [app-release.aab](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/build/app/outputs/bundle/release/app-release.aab).
4. **If Upload Certificate Verification Passes:**  
   Proceed to release notes and save release.
5. **If Upload Key Reset Is Requested:**  
   Go to **Setup** -> **App signing** -> **Request upload key reset**, upload [upload_certificate.pem](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/android/upload_certificate.pem). Once registered (typically takes a few hours), re-upload the AAB.
6. Share the internal test link with authorized QA devices to perform the physical in-place upgrade smoke run.
