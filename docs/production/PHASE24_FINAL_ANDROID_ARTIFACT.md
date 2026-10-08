# PHASE 24 — FINAL ANDROID RELEASE ARTIFACT AUDIT

**Execution Date:** 2026-10-09T00:45:30+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Application ID:** `com.ariesphysiocare.ariesexpert`  
**Candidate Artifact:** [ariesxpertv2/build/app/outputs/bundle/release/app-release.aab](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/build/app/outputs/bundle/release/app-release.aab)  
**Status:** **COMPILED FRESH, INSPECTED & READY FOR PLAY CONSOLE INTERNAL TRACK**

---

## 1. CANONICAL ARTIFACT IDENTIFIERS

| Attribute | Verified Value | Inspection Tool / Authority |
| :--- | :--- | :--- |
| **Artifact Path** | `ariesxpertv2/build/app/outputs/bundle/release/app-release.aab` | Filesystem |
| **Exact Byte Size** | `313,447,999` bytes (~298.93 MB) | macOS `stat` / `ls -l` |
| **SHA-256 Checksum** | `3e96c6509d8423e33e833564dcd5d91762e33e915baee2bb12719b37b807f9ce` | `shasum -a 256` |
| **Package Name** | `com.ariesphysiocare.ariesexpert` | `bundletool dump manifest` |
| **Version Code** | `33000` | `bundletool dump manifest` |
| **Version Name** | `3.3.0` | `bundletool dump manifest` |
| **Target SDK Version** | `36` (Android 16 API Level 36 Compliance) | `bundletool dump manifest` |
| **Compile SDK Version**| `36` (Android 16) | `bundletool dump manifest` |
| **Min SDK Version** | `26` (Android 8.0 Oreo) | `bundletool dump manifest` |
| **Build Variant** | Release (R8 Shrinking, ProGuard Enabled, Obfuscated) | Gradle `bundleRelease` |

---

## 2. SIGNING CERTIFICATE LEDGER

Extracted directly from the compiled release bundle using JDK `keytool`:

```bash
$ keytool -printcert -jarfile ariesxpertv2/build/app/outputs/bundle/release/app-release.aab
```

### Signer #1 Certificate:
- **Subject / Owner:**  
  `CN=AriesXpert Release Engineer, OU=Mobile Engineering, O=Aries Healthcare Private Limited, L=Bengaluru, ST=Karnataka, C=IN`
- **Issuer:**  
  `CN=AriesXpert Release Engineer, OU=Mobile Engineering, O=Aries Healthcare Private Limited, L=Bengaluru, ST=Karnataka, C=IN`
- **Certificate Serial Number:**  
  `85789d0e5992f299`
- **Validity:**  
  Thu Oct 08 20:26:19 IST 2026 until Mon Feb 23 20:26:19 IST 2054
- **Algorithm:**  
  2048-bit RSA key with `SHA256withRSA`
- **SHA-256 Fingerprint:**  
  `06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E`
- **SHA-1 Fingerprint:**  
  `18:DE:A5:EE:C7:AE:B0:B0:E6:C1:34:DE:BD:12:A6:55:86:98:0C:60`

---

## 3. PLAY STORE COMPLIANCE & MANIFEST VERIFICATION

1. **Monotonic Version Progression:**
   Legacy published app has `versionCode: 1`. Candidate AAB has `versionCode: 33000`. Exceeds historical versions across all tracks.
2. **Android 16 / API 36 Target SDK:**
   Fully meets the latest Google Play target API policy.
3. **Dynamic Delivery Size:**
   While the universal bundle is ~298.93 MB, `bundletool build-apks` confirms optimized per-device download size is **121.19–153.99 MB**, well within acceptable thresholds.
4. **Network Security:**
   `android:usesCleartextTraffic="false"` and strict HTTPS enforced in release variant.
5. **Foreground Service Declarations:**
   Foreground service types explicitly declared (`location` for field physiotherapist dispatch).
