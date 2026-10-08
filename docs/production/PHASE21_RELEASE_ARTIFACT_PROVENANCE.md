# PHASE 21 — RELEASE ARTIFACT PROVENANCE & IMMUTABLE MANIFEST

**Manifest Generation Timestamp:** 2026-10-08T23:38:00+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Build System:** macOS Darwin 24.2.0 (arm64 Apple Silicon)  
**Compilation Toolchains:** Flutter 3.24.5 (Dart 3.5.4), Node.js v20.18.0, Next.js 14.2.23, Gradle 8.3 / AGP 8.1.0  
**Status:** **OFFICIAL RELEASE CANDIDATE MANIFEST**

---

## 1. ECOSYSTEM COMPONENT GIT PROVENANCE (9 REPOSITORIES)

| Component | Path / Repository | Git Commit SHA | Commit Message |
| :--- | :--- | :--- | :--- |
| **API & Backend Cluster** | `ariesxpert-backend` | `b67f5e4f119558f0d6eb4deff54e91bd7fceb25d` | `feat(security): enforce cluster-safe Redis token revocation and atomic one-time deletion challenge` |
| **Mobile Application** | `ariesxpertv2` | `4970c18587107f851825c5fbc2f09e543387380a` | `feat(release): upgrade app identity to com.ariesphysiocare.ariesexpert (v3.3.0+33000), harden environment, and implement verified deletion` |
| **Admin Operations Dashboard** | `AriesXpert-Admin-Dashboard` | `32f8b0504a4b95546f505402ffb5e9458c03d2d7` | `fix(ui): align UNAVAILABLE label contract state in RoleResponsibilitiesTab` |
| **Web Patient App** | `AriesXpert-Web-App` | `90df405d3458250b1a136a9b016306b343b21b38` | `fix(auth): add /delete-account to PUBLIC_PATHS in onboarding-gate` |
| **Cross-Platform Parity App** | `Aries-PhysioCare-Parity-App` | `4b6a3a2cde54bc2fa9c52d12576135a053294859` | `fix(quality): enforce strict ESLint quality gates during production build` |
| **Website (India Region)** | `AriesXpert-Website-India` | `881e877a8234073d087d93bd76a8f0ec18ff4447` | `fix(security,quality): remove tracked .env.production, remove plaintext SMTP credentials, fix React rules of hooks in ServiceLocationClient, escape JSX entities, and enable strict Next.js quality gates` |
| **Website (UK Region)** | `AriesXpert-Website-UK` | `2d6678f159ea3c05e4c9c3fceeff2a981ad74295` | `fix(styles): remove duplicate text-white Tailwind class in service clients` |
| **Website (Canada Region)** | `AriesXpert-Website-Canada` | `81ebc2fd50b43162886d911490938f9bc8b05f92` | `fix(styles): remove duplicate text-white Tailwind class in service clients` |
| **Website (Global Umbrella Root)** | `.` (`Aries-HealthCare-EcoSystem`) | `e9ff25cbb10989e32e77f8a0b1f554fa95296a82` | `docs(phase20): add comprehensive forensic audit reports and final release handover documentation` |

---

## 2. ANDROID PRODUCTION ARTIFACT SPECIFICATION

- **Artifact Relative Path:** `ariesxpertv2/build/app/outputs/bundle/release/app-release.aab`
- **Artifact Absolute Path:** `/Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/build/app/outputs/bundle/release/app-release.aab`
- **Application ID (`defaultConfig.applicationId`):** `com.ariesphysiocare.ariesexpert`
- **Kotlin Namespace (`android.namespace`):** `com.aries.ariesxpertv2`
- **Version Code (`android:versionCode`):** `33000`
- **Version Name (`android:versionName`):** `3.3.0`
- **Minimum SDK (`minSdkVersion`):** `24` (Android 7.0 Nougat)
- **Target SDK (`targetSdkVersion`):** `34` (Android 14)
- **Compile SDK (`compileSdkVersion`):** `34`
- **Exact File Size:** `313,447,010` bytes (~298.92 MB)
- **SHA-256 Digest:**  
  `b3173e538a3a2e9f2bf5c763a23417879d4788d34650aabb592a9e89179ffa24`
- **MD5 Digest:**  
  `8d73b0f7ca623c2a121bfdf5388c30aa`

---

## 3. APP SIGNING & CERTIFICATE PROVENANCE

- **Signer Identity:** `ariesxpert_upload`
- **Certificate Serial Number:** `85789d0e5992f299`
- **Valid Period:** Fri Oct 03 16:35:10 IST 2025 through Sun Feb 19 16:35:10 IST 2053
- **Algorithm:** RSA 2048-bit with SHA256withRSA
- **SHA-256 Fingerprint:**  
  `06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E`
- **SHA-1 Fingerprint:**  
  `75:BB:CD:A7:28:4F:92:A1:AC:69:BD:A8:1F:B4:CF:85:BE:E5:A9:E9`
- **Google Play App Signing Alignment:**  
  Google Play App Signing is active. If the registered upload key in Play Console matches this fingerprint, the AAB uploads immediately. If the registered upload key differs, the Release Owner uses the built-in self-service upload key reset option in Play Console, attaching `upload_certificate.pem` (derived from this certificate). End-user app identity and update lineage are preserved.

---

## 4. ENVIRONMENT & CLUSTER SECURITY CONFIGURATION

- **Target Environment:** `production` (`--dart-define=APP_ENV=production`)
- **API Base Host:** `https://api.ariesxpert.com`
- **Universal App Links:** `https://ariesxpert.com`, `https://app.ariesxpert.com`
- **Network Security:** Strict HTTPS enforced (`cleartextTrafficPermitted="false"`)
- **Firebase Project Identity:** `aries-physiocare` (`231092605068`) / `ariesxpert-production` dual-client
- **Session Revocation Authority:** Redis Distributed Keys (`jwt:denied:<sha256>`, `user:revocation:<userId>`)
- **Account Deletion Protocol:** Verified SMS OTP challenge (`POST /api/v1/auth/send-deletion-otp`, 300s TTL, max 3 attempts) or authenticated password reauthentication. Plain text `"DELETE"` completely removed.

---

## 5. TEST & COMPILATION EVIDENCE

| Suite / Verification | Scope | Result | Details |
| :--- | :--- | :---: | :--- |
| **Flutter Mobile Test Suite** | `ariesxpertv2/test/` | **PASS** | 34 of 34 tests passing (Environment isolation, storage, DUIX lifecycle, widgets). |
| **Backend TypeScript Build** | `ariesxpert-backend` | **PASS** | `npm run build` succeeds cleanly with zero diagnostics (`tsc -p tsconfig.json`). |
| **Admin Operations Dashboard** | `AriesXpert-Admin-Dashboard` | **PASS** | Next.js production build succeeded cleanly. |
| **Web Patient App** | `AriesXpert-Web-App` | **PASS** | Next.js production build succeeded cleanly. |
| **Cross-Platform Parity App** | `Aries-PhysioCare-Parity-App` | **PASS** | Clean build with strict ESLint compliance. |
| **Regional Websites** | India, UK, Canada, Global | **PASS** | All four websites pass strict Next.js production builds. |
| **Physical Hardware Gate** | Android Hardware | **GATED** | `adb devices -l` = 0 attached devices. Real hardware test gated. |

---

## 6. PHASE 18–20 CONTRADICTION RESOLUTION LEDGER

1. **Contradiction 1: Application Package ID Mismatch (Phase 20 -> Phase 21)**  
   - *Phase 20 State:* `com.aries.ariesxpertv2`  
   - *Resolution:* Migrated to `com.ariesphysiocare.ariesexpert` while maintaining Kotlin namespace `com.aries.ariesxpertv2`. This matches the published Google Play store listing.
2. **Contradiction 2: Certificate Serial Number Documentation Typo (Phase 19 -> Phase 20)**  
   - *Phase 19 State:* Documented as `6e9b89e2` vs binary `85789d0e5992f299`.  
   - *Resolution:* Confirmed binary certificate serial `85789d0e5992f299` across all keystores, bundles, and manifests.
3. **Contradiction 3: Plain String Account Deletion (Phase 20 -> Phase 21)**  
   - *Phase 20 State:* Allowed passing `"DELETE"` or `"CONFIRM_DELETE"` without secondary proof.  
   - *Resolution:* Plain confirmation strings completely eliminated. Deletion now strictly requires verified 6-digit SMS OTP challenge or password re-authentication.
4. **Contradiction 4: In-Memory Token Revocation in PM2 Cluster (Phase 20 -> Phase 21)**  
   - *Phase 20 State:* Process-local `Set` allowed tokens to remain valid on other cluster worker processes.  
   - *Resolution:* Replaced with shared Redis distributed keys (`jwt:denied:<hash>` and `user:revocation:<userId>`) with fail-closed security.
