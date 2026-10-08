# PHASE 20 — CERTIFICATE IDENTITY RECONCILIATION & ANDROID SIGNING AUDIT

**Execution Timestamp:** 2026-10-08T22:50:00+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Classification:** P0 Forensic Integrity & Security Gate  
**Status:** **RECONCILED & REBUILT (PLAY CONSOLE REGISTRATION GATED ON RELEASE OWNER)**

---

## 1. EXECUTIVE SUMMARY & FORENSIC PROBLEM STATEMENT

In Phase 18 and Phase 19 reporting, an apparent inconsistency was documented regarding the Android upload certificate identity:
- Phase 18 documentation reported certificate serial number: `85789d0e5992f299`
- Phase 19 Markdown documentation reported certificate serial number: `6e9b89e2`
- Both reports reported identical SHA-256 (`06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E`) and SHA-1 (`18:DE:A5:EE:C7:AE:B0:B0:E6:C1:34:DE:BD:12:A6:55:86:98:0C:60`) fingerprints.

Because two distinct certificates with different serial numbers cannot mathematically share identical SHA-256 and SHA-1 hashes over an X.509 certificate structure, a forensic deep-dive was mandated in Phase 20 to determine whether a key divergence occurred, an unauthorized re-generation took place, or a documentation transcription error occurred.

### Forensic Finding:
The binary upload keystore (`ariesxpertv2/android/app/upload-keystore.jks`), the backup vault keystore (`/Users/akshay/.ariesxpert-secure-vault/upload-keystore.backup.tar.enc`), and the signed Android App Bundle (`ariesxpertv2/build/app/outputs/bundle/release/app-release.aab`) have **at all times contained the exact same certificate with Serial Number `85789d0e5992f299`**. The hexadecimal string `6e9b89e2` in Phase 19 was a documentation transcription typo (specifically copying a partial memory address or commit prefix) rather than a divergent physical certificate.

---

## 2. COMPREHENSIVE CERTIFICATE COMPARISON MATRIX

A fresh, side-by-side inspection was executed using Java JDK `keytool` on the active keystore, the decrypted backup keystore, and the final compiled `.aab` file:

| Certificate Property | Active Upload Keystore (`upload-keystore.jks`) | Vault Backup Keystore (`.ariesxpert-secure-vault`) | Final Signed AAB (`app-release.aab`) | Play Console Registered Certificate |
| :--- | :--- | :--- | :--- | :--- |
| **Alias** | `ariesxpert_upload` | `ariesxpert_upload` | `ariesxpert_upload` (Signer #1) | Pending Console Access |
| **Serial Number** | `85789d0e5992f299` | `85789d0e5992f299` | `85789d0e5992f299` | Pending Console Access |
| **SHA-256 Fingerprint** | `06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E` | `06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E` | `06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E` | Requires Console API / Release Owner |
| **SHA-1 Fingerprint** | `18:DE:A5:EE:C7:AE:B0:B0:E6:C1:34:DE:BD:12:A6:55:86:98:0C:60` | `18:DE:A5:EE:C7:AE:B0:B0:E6:C1:34:DE:BD:12:A6:55:86:98:0C:60` | `18:DE:A5:EE:C7:AE:B0:B0:E6:C1:34:DE:BD:12:A6:55:86:98:0C:60` | Requires Console API / Release Owner |
| **Subject / Owner** | `CN=AriesXpert Release Engineer, OU=Mobile Engineering, O=Aries Healthcare Private Limited, L=Bengaluru, ST=Karnataka, C=IN` | `CN=AriesXpert Release Engineer, OU=Mobile Engineering, O=Aries Healthcare Private Limited, L=Bengaluru, ST=Karnataka, C=IN` | `CN=AriesXpert Release Engineer, OU=Mobile Engineering, O=Aries Healthcare Private Limited, L=Bengaluru, ST=Karnataka, C=IN` | Pending Console Access |
| **Issuer** | `CN=AriesXpert Release Engineer, OU=Mobile Engineering, O=Aries Healthcare Private Limited, L=Bengaluru, ST=Karnataka, C=IN` | `CN=AriesXpert Release Engineer, OU=Mobile Engineering, O=Aries Healthcare Private Limited, L=Bengaluru, ST=Karnataka, C=IN` | `CN=AriesXpert Release Engineer, OU=Mobile Engineering, O=Aries Healthcare Private Limited, L=Bengaluru, ST=Karnataka, C=IN` | Pending Console Access |
| **Key Algorithm** | 2048-bit RSA key | 2048-bit RSA key | 2048-bit RSA key | Pending Console Access |
| **Signature Algorithm** | `SHA256withRSA` | `SHA256withRSA` | `SHA256withRSA` | Pending Console Access |
| **Validity Start** | Thu Oct 08 20:26:19 IST 2026 | Thu Oct 08 20:26:19 IST 2026 | Thu Oct 08 20:26:19 IST 2026 | Pending Console Access |
| **Validity Expiry** | Mon Feb 23 20:26:19 IST 2054 (10,000 days) | Mon Feb 23 20:26:19 IST 2054 (10,000 days) | Mon Feb 23 20:26:19 IST 2054 (10,000 days) | Pending Console Access |
| **Key Identifier (SKID)** | `A0:0F:90:F6:8A:1F:AA:9A:75:70:D8:1A:7C:6A:73:65:A7:D1:84:56` | `A0:0F:90:F6:8A:1F:AA:9A:75:70:D8:1A:7C:6A:73:65:A7:D1:84:56` | `A0:0F:90:F6:8A:1F:AA:9A:75:70:D8:1A:7C:6A:73:65:A7:D1:84:56` | Pending Console Access |
| **Integrity Verdict** | **MATCH** | **MATCH** | **MATCH** | **BLOCKED (GATED ON HUMAN CONSOLE UPLOAD)** |

---

## 3. ARTIFACT REBUILD & INTEGRITY VERIFICATION

Following all mobile code modifications in Phase 20 (environment isolation engine, account deletion UX, test fixtures), a clean production AAB was compiled and verified:

```bash
flutter build appbundle --release --dart-define=APP_ENV=production
```

### 3.1 Artifact File Metrics
- **Artifact Path:** `/Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/build/app/outputs/bundle/release/app-release.aab`
- **File Size:** `313,451,601` bytes (~298.93 MB)
- **SHA-256 Checksum:** `962cd58dcceb4d39efbbe0629e17ce331b4c2ae4bf97c0a69d87b42f96bb8d93`
- **Build Timestamp:** 2026-10-08T22:48:15+05:30

### 3.2 Manifest Inspection via `bundletool`
Inspection of the compiled binary manifest from `app-release.aab`:
- **Package Name (`applicationId`):** `com.aries.ariesxpertv2`
- **Version Code (`versionCode`):** `1`
- **Version Name (`versionName`):** `1.0.0`
- **Compile SDK:** `35`
- **Min SDK:** `24`
- **Target SDK:** `35` (Meets Google Play 2024-2026 requirement)
- **Cleartext Traffic Allowed:** `android:usesCleartextTraffic="false"`
- **Network Security Config:** `android:networkSecurityConfig="@xml/network_security_config"`

### 3.3 Permissions Verified
- `android.permission.INTERNET`
- `android.permission.ACCESS_NETWORK_STATE`
- `android.permission.RECORD_AUDIO` (Required for DUIX Tanya mobile avatar voice interaction)
- `android.permission.CAMERA` (Required for video consultations and QR scanning)
- `android.permission.ACCESS_FINE_LOCATION` / `ACCESS_COARSE_LOCATION` (Required for clinic search)
- `android.permission.POST_NOTIFICATIONS` (Android 13+)
- `android.permission.VIBRATE` / `WAKE_LOCK`
- **High-Risk Permissions Check:** NO SMS, NO CALL_LOG, NO READ_EXTERNAL_STORAGE on Android 13+, NO QUERY_ALL_PACKAGES.

---

## 4. BUNDLETOOL SPLIT SIZES & PLAY DELIVERY CEILING

Google Play enforces a strict 200 MB maximum download size for compressed split APKs delivered to end-user devices.

Using `bundletool build-apks` and `bundletool get-size total`:
- **Generated APKS Archive:** `/tmp/phase20-app-release.apks` (`530` MB uncompressed multi-density container)
- **Target Device Delivery (arm64-v8a, MDPI):** `161,002,138` bytes (~**153.5 MB**)
- **Max Device Delivery Across All Densities (arm64-v8a, XXXHDPI):** `161,465,655` bytes (~**153.9 MB**)
- **Delivery Ceiling Status:** **PASS** (153.9 MB < 200.0 MB threshold).

---

## 5. PLAY CONSOLE REGISTRATION STATUS

- **Check Status:** **BLOCKED**
- **Reason:** In strict adherence to Phase 20 instructions, because Google Play Developer Console upload credentials and direct service accounts are gated on the human release owner and not programmatically available in the local runner environment, this verification cannot be falsely claimed as PASS.
- **Action Required by Release Owner:**
  1. Access Google Play Console for `com.aries.ariesxpertv2`.
  2. Under **App integrity > Play App Signing**, confirm the registered **Upload key certificate** fingerprint matches:  
     `SHA-256: 06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E`
  3. Upload the certified AAB: `ariesxpertv2/build/app/outputs/bundle/release/app-release.aab` (SHA-256: `962cd58dcceb4d39efbbe0629e17ce331b4c2ae4bf97c0a69d87b42f96bb8d93`) to the **Internal testing** track.
