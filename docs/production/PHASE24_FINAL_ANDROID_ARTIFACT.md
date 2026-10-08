# PHASE 24 — FINAL ANDROID RELEASE ARTIFACT MANIFEST

**Execution Date:** 2026-10-09T01:30:00+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Application ID:** `com.ariesphysiocare.ariesexpert`  
**Product:** AriesXpert  
**Major Release:** `2.0.0` (Build `33000`)  
**Git Provenance Commit:** `542f1ced91ee274e486d65e6b516ffd9a066c349` (`542f1ce`)  
**Candidate Artifact:** [ariesxpertv2/build/app/outputs/bundle/release/app-release.aab](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/build/app/outputs/bundle/release/app-release.aab)  
**Status:** **FINAL RECONCILED PRODUCTION CANDIDATE — CERTIFIED & READY FOR PLAY INTERNAL TESTING**

---

## 1. CANONICAL ARTIFACT IDENTIFIERS

| Attribute | Verified Value | Inspection Tool / Authority |
| :--- | :--- | :--- |
| **Product Name** | `AriesXpert` | [pubspec.yaml](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/pubspec.yaml) / Brand Identity |
| **Artifact Path** | `ariesxpertv2/build/app/outputs/bundle/release/app-release.aab` | Filesystem |
| **Exact Byte Size** | `313,450,683` bytes (~298.93 MB) | macOS `stat` / `ls -l` |
| **SHA-256 Checksum** | `df5fb20824c380c96d7e0754c6850ce5b03bf46408e4ed9196bbc5ea337e866c` | `shasum -a 256` |
| **Package Name** | `com.ariesphysiocare.ariesexpert` | `bundletool dump manifest` |
| **Version Code** | `33000` | `bundletool dump manifest` |
| **Version Name** | `2.0.0` | `bundletool dump manifest` |
| **Target SDK Version** | `36` (Android 16 API Level 36 Compliance) | `bundletool dump manifest` |
| **Compile SDK Version**| `36` (Android 16) | `bundletool dump manifest` |
| **Min SDK Version** | `26` (Android 8.0 Oreo) | `bundletool dump manifest` |
| **Build Variant** | Release (R8 Shrinking, ProGuard Enabled, Obfuscated) | Gradle `bundleRelease` |

---

## 2. ARTIFACT HASH SUPERSEDED LEDGER

To eliminate ambiguity across prior audit cycles, earlier artifact checksums are cataloged and explicitly marked **SUPERSEDED**:

| Build Stage / Event | Git Commit | Checksum (SHA-256) | Status | Rationale |
| :--- | :--- | :--- | :---: | :--- |
| **Phase 23 Candidate** | `b84088b` | `3e96c6509d8423e33e833564dcd5d91762e33e915baee2bb12719b37b807f9ce` | **SUPERSEDED** | Replaced due to version correction to 2.0.0 and auth secret remediation. |
| **Phase 24 Interim** | `2c97fd3` | `c485144dd12b4f0a037179d68e6537448dde74b38a68529e5740d3070dddf77b` | **SUPERSEDED** | Replaced following Task 1 migration route reconciliation and fallback wiring. |
| **Phase 24 Final Certified** | `542f1ce` | `df5fb20824c380c96d7e0754c6850ce5b03bf46408e4ed9196bbc5ea337e866c` | **CANONICAL CURRENT** | **Official candidate for Google Play Console Internal Testing upload.** |

---

## 3. INDEPENDENT BINARY INSPECTION VIA BUNDLETOOL

Extracted from the compiled binary using Google's official standalone `bundletool` (`/Volumes/Personal/bundletool.jar`):

```bash
$ java -jar /Volumes/Personal/bundletool.jar dump manifest \
    --bundle=ariesxpertv2/build/app/outputs/bundle/release/app-release.aab
```

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    android:compileSdkVersion="36"
    android:compileSdkVersionCodename="16"
    android:versionCode="33000"
    android:versionName="2.0.0"
    package="com.ariesphysiocare.ariesexpert"
    platformBuildVersionCode="36"
    platformBuildVersionName="16">
  <uses-sdk android:minSdkVersion="26" android:targetSdkVersion="36"/>
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
  ...
```

---

## 4. SIGNING CERTIFICATE LEDGER

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

## 5. RECONCILED GOOGLE PLAY RELEASE GATES

1. **Monotonic Version Progression:**
   Legacy published app has `versionCode: 1`. Candidate AAB has `versionCode: 33000`. Exceeds historical versions across all tracks, subject to final Play Console confirmation.
2. **Major Version Alignment:**
   Official application version name is **`2.0.0`**, representing the major architecture release.
3. **Android 16 / API 36 Target SDK:**
   Fully meets the latest Google Play target API policy with `targetSdkVersion="36"`.
4. **Dynamic Delivery Size:**
   While the universal bundle is `313,450,683` bytes (~298.93 MB), `bundletool build-apks` confirms optimized per-device download size is **121.19–153.99 MB**, safely within Google Play limits.
5. **Network Security:**
   `android:usesCleartextTraffic="false"` and strict HTTPS enforced in release variant.
6. **In-Place Upgrade Lineage:**
   Retains the existing Google Play application ID `com.ariesphysiocare.ariesexpert`, ensuring seamless in-place upgrade for all existing users without data loss or creating a secondary listing.

---

## 6. COMPANION RELEASE APK (SIDELOAD & PHYSICAL DEVICE TESTING)

In addition to the Google Play Store App Bundle (AAB), a standalone signed release APK was compiled for direct physical handset QA testing:

| Attribute | Verified Value | Inspection Tool / Authority |
| :--- | :--- | :--- |
| **Artifact Path** | [app-release.apk](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/build/app/outputs/flutter-apk/app-release.apk) | Filesystem |
| **Exact Byte Size** | `455,917,393` bytes (~434.79 MB universal fat APK) | macOS `stat` / `ls -l` |
| **SHA-256 Checksum** | `182f1764497a8d88dd304e69a250351431012c9e370590eea845f8ee7ec1c5c3` | `shasum -a 256` |
| **Package Name** | `com.ariesphysiocare.ariesexpert` | Android SDK `aapt2 dump badging` |
| **Version Code** | `33000` | Android SDK `aapt2 dump badging` |
| **Version Name** | `2.0.0` | Android SDK `aapt2 dump badging` |
| **Target SDK / Compile SDK** | `36` / `36` (Android 16 API Level 36) | Android SDK `aapt2 dump badging` |
| **Min SDK** | `26` (Android 8.0 Oreo) | Android SDK `aapt2 dump badging` |
| **Signature Scheme** | APK Signature Scheme v2 (`Verifies: true`) | Android SDK `apksigner verify` |
| **Signer Certificate SHA-256** | `06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E` | Android SDK `apksigner verify` |

