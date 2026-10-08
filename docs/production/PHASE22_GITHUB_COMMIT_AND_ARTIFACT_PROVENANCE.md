# PHASE 22 — GITHUB COMMIT & IMMUTABLE ARTIFACT PROVENANCE

**Manifest Generation Date:** 2026-10-09T00:01:30+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Build Host:** macOS Darwin 24.2.0 (arm64 Apple Silicon)  
**Status:** **OFFICIAL RELEASE PROVENANCE LEDGER**

---

## 1. GITHUB COMMIT RECONCILIATION & RESOLUTION OF COMMITS 4970c18 & b67f5e4

### 1.1 Forensic Root Cause
An audit of why commits `4970c18` and `b67f5e4` could not be fetched from GitHub remotes established:
1. **Branch Isolation:** Both commits were committed to the local working branch `release-candidate-production-hardening`.
2. **Release Governance:** Per strict release governance policy (*"Publish or push only to the approved development or release-candidate branch using the organization's normal approval procedure. Do not deploy to production"*), local commits are held on the build machine until executive release owner authorization is granted.
3. **Current Active Heads:** In Phase 22, additional security and compliance commits were added to both repositories, establishing the definitive release candidate commit SHAs below.

---

## 2. RECONCILED ECOSYSTEM REPOSITORY COMMITS (9 REPOSITORIES)

| Component | Repository Path | Git Commit SHA | Commit Summary |
| :--- | :--- | :--- | :--- |
| **Backend API Cluster** | `ariesxpert-backend` | `93b6dae78df9ce729bad19d601da355f85be06d8` | `feat(security): implement hashed Redis OTP storage and atomic Lua evaluation for account deletion challenge` |
| **Mobile Flutter App** | `ariesxpertv2` | `b84088bc700acb02b98d485d81512cbe898a5939` | `feat(compliance): update targetSdk to 36 (Android 16), align Firebase appId, and validate legacy JWT expiration` |
| **Admin Operations Dashboard** | `AriesXpert-Admin-Dashboard` | `32f8b0504a4b95546f505402ffb5e9458c03d2d7` | `fix(ui): align UNAVAILABLE label contract state in RoleResponsibilitiesTab` |
| **Web Patient App** | `AriesXpert-Web-App` | `90df405d3458250b1a136a9b016306b343b21b38` | `fix(auth): add /delete-account to PUBLIC_PATHS in onboarding-gate` |
| **Cross-Platform Parity App** | `Aries-PhysioCare-Parity-App` | `4b6a3a2cde54bc2fa9c52d12576135a053294859` | `fix(quality): enforce strict ESLint quality gates during production build` |
| **Website (India Region)** | `AriesXpert-Website-India` | `881e877a8234073d087d93bd76a8f0ec18ff4447` | `fix(security,quality): remove tracked .env.production, remove plaintext SMTP credentials, fix React rules of hooks in ServiceLocationClient, escape JSX entities, and enable strict Next.js quality gates` |
| **Website (UK Region)** | `AriesXpert-Website-UK` | `2d6678f159ea3c05e4c9c3fceeff2a981ad74295` | `fix(styles): remove duplicate text-white Tailwind class in service clients` |
| **Website (Canada Region)** | `AriesXpert-Website-Canada` | `81ebc2fd50b43162886d911490938f9bc8b05f92` | `fix(styles): remove duplicate text-white Tailwind class in service clients` |
| **Website (Global Umbrella Root)** | `.` (`Aries-HealthCare-EcoSystem`) | `0de6a503741737c6820a46e3ce412a19939bacf9` | `docs(phase21): add comprehensive Google Play app upgrade reconciliation and security blocker reports` |

---

## 3. IMMUTABLE BINARY ARTIFACT SPECIFICATION

- **Artifact Path:** `ariesxpertv2/build/app/outputs/bundle/release/app-release.aab`
- **Application ID:** `com.ariesphysiocare.ariesexpert`
- **Kotlin Namespace:** `com.aries.ariesxpertv2`
- **Version Code:** `33000`
- **Version Name:** `3.3.0`
- **Compile SDK Level:** `36` (Android 16)
- **Target SDK Level:** `36` (Android 16 API 36 Compliance)
- **Min SDK Level:** `26` (Android 8.0 Oreo)
- **Exact File Size:** `313,447,805` bytes (~298.93 MB)
- **SHA-256 Digest:**  
  `2b565478914e81b704f93a72b960b91d29abe9840ed20b1f62c95dced711d9ac`
- **Delivery Package Size (via `bundletool`):**  
  Min `127,078,871` bytes (~121.19 MB) / Max `161,466,293` bytes (~153.99 MB) (Under 200 MB limit)

---

## 4. SIGNING CERTIFICATE SPECIFICATION

- **Signer Identity:** `CN=AriesXpert Release Engineer, OU=Mobile Engineering, O=Aries Healthcare Private Limited, L=Bengaluru, ST=Karnataka, C=IN`
- **Certificate Serial Number:** `85789d0e5992f299`
- **Validity Period:** Thu Oct 08 20:26:19 IST 2026 until Mon Feb 23 20:26:19 IST 2054
- **Algorithm:** RSA 2048-bit with SHA256withRSA
- **SHA-256 Fingerprint:**  
  `06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E`
- **SHA-1 Fingerprint:**  
  `18:DE:A5:EE:C7:AE:B0:B0:E6:C1:34:DE:BD:12:A6:55:86:98:0C:60`
