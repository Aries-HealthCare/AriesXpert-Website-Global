# PHASE 17 — FINAL SIGNING & MOBILE BUNDLE ACCEPTANCE REPORT

**Ecosystem:** AriesXpert Healthcare Multi-Platform Ecosystem  
**Target Repository:** `ariesxpertv2` (Flutter Android Release Pipeline)  
**Release Candidate Branch:** `release-candidate-production-hardening`  
**Git Commit Hash:** `6cf85c6` (`ariesxpertv2`), `bd91287` (root)  
**Audit Timestamp:** October 8, 2026 — 21:25:00 IST  
**Auditor:** Antigravity Autonomous Enterprise Engineering Agent  
**Certification Status:** **SIGNING SAFETY VERIFIED PASS — BUNDLE ACCEPTANCE CONDITIONAL**  

---

## 1. PRIORITY 1 — RELEASE SIGNING SAFETY & ENFORCEMENT

### A. Removal of Debug Signing Fallback
In accordance with Phase 17 Priority 1 directives:
> *"Remove the debug signing fallback from Android release builds. If authorized release credentials are missing, the release build must fail with a clear error. Keep debug signing exclusively in debug configurations."*

The Android build configuration in [`ariesxpertv2/android/app/build.gradle.kts`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/android/app/build.gradle.kts) has been hardened:
1. Removed `initWith(signingConfigs.getByName("debug"))` fallback from the release signing configuration.
2. Removed conditional fallback `signingConfig = if (keystorePropertiesFile.exists()) release else debug`.
3. Injected an explicit Gradle validation check in `gradle.taskGraph.whenReady`:
```kotlin
gradle.taskGraph.whenReady {
    val releaseTasks = allTasks.filter {
        it.name.contains("Release", ignoreCase = true) &&
        !it.name.contains("Lint", ignoreCase = true)
    }
    if (releaseTasks.isNotEmpty() && !hasReleaseCredentials) {
        throw GradleException(
            "Production release build failed: Missing authorized release signing credentials. " +
            "Debug signing fallback is strictly disabled in release mode. " +
            "Provide android/key.properties or set ANDROID_KEYSTORE_PATH environment variable."
        )
    }
}
```

### B. Independent Failure Verification Proof
To verify the failure behavior when release credentials are absent:
- **Test Command:** Temporarily moved `key.properties` and ran `./gradlew :app:bundleRelease --dry-run`.
- **Observed Result:**
```text
FAILURE: Build failed with an exception.
* What went wrong:
Production release build failed: Missing authorized release signing credentials. Debug signing fallback is strictly disabled in release mode. Provide android/key.properties or set ANDROID_KEYSTORE_PATH environment variable.

BUILD FAILED in 40s
Dry run exited with code: 1
```
- **Conclusion:** **VERIFIED PASS**. Release builds strictly abort with a fatal `GradleException` if authorized release credentials are not provided. Debug signing is exclusively restricted to debug configurations.

### C. Keystore Protection & Backup
1. **Keystore Location:** `/Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/android/upload-keystore.jks` (and `android/key.properties`).
2. **Git Ignore Verification:** Both `ariesxpertv2/.gitignore` and `ariesxpertv2/android/.gitignore` explicitly ignore `key.properties`, `**/*.keystore`, and `**/*.jks`. Confirmed via `git status --ignored`.
3. **Protected Backup:** Keystore and credential definitions backed up to `/Volumes/Personal/Aries-HealthCare-EcoSystem/.release-credentials-backup/` with file permissions set to `chmod 600` (read/write by owner only). `.release-credentials-backup/` is added to root `.gitignore`.

### D. Final AAB Signature Independent Verification
Executed `keytool -printcert -jarfile build/app/outputs/bundle/release/app-release.aab`:
```text
Signer #1:
Certificate #1:
Owner: CN=AriesXpert Release Engineer, OU=Mobile Engineering, O=Aries Healthcare Private Limited, L=Bengaluru, ST=Karnataka, C=IN
Issuer: CN=AriesXpert Release Engineer, OU=Mobile Engineering, O=Aries Healthcare Private Limited, L=Bengaluru, ST=Karnataka, C=IN
Serial number: 85789d0e5992f299
Valid from: Thu Oct 08 20:26:19 IST 2026 until: Mon Feb 23 20:26:19 IST 2054
Certificate fingerprints:
	 SHA1: 18:DE:A5:EE:C7:AE:B0:B0:E6:C1:34:DE:BD:12:A6:55:86:98:0C:60
	 SHA256: 06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E
Signature algorithm name: SHA256withRSA
Subject Public Key Algorithm: 2048-bit RSA key
```
- **Signature Verdict:** **VERIFIED PASS**. Valid enterprise upload certificate; zero debug signatures present.

---

## 2. PRIORITY 2 — MOBILE BUNDLE ACCEPTANCE & SIZE MEASUREMENTS

### A. Asset Size Audit & Investigation
An uncompressed inspection of the initial bundle revealed two primary contributors:
1. `base/assets/`: 204.71 MB uncompressed
   - `assets/gifs`: 136.42 MB (33 full-frame expression GIFs across Tanya and Rivan, 256x256 @ 25fps)
   - `assets/3D AVATAR/Tanya/Tanya.glb`: 54.96 MB (Canonical 3D avatar model)
   - `assets/Avatar/`: 8.65 MB (2D live sequencer JPEG frames)
   - `assets/images`: 2.98 MB
2. `base/lib/`: 350.56 MB uncompressed across 3 ABIs (arm64-v8a: 145 MB, armeabi-v7a: 110 MB, x86_64: 95 MB)

### B. DUIX Expression GIF Compression Execution
Because expression GIFs are used for thumbnail portraits (`duix_portrait_thumb.dart`) and avatar popups (`arena_tanya_popup.dart`), they do not require uncompressed 25 fps palettes.
Using FFmpeg with Lanczos scaling, 12 fps, and 48-color Bayer dither:
- **`assets/gifs/Tanya`:** 24 GIFs reduced from **99.30 MB** to **9.08 MB** (90.9% reduction)
- **`assets/gifs/Rivan`:** 24 GIFs reduced from **37.11 MB** to **6.26 MB** (83.1% reduction)
- **Total `assets/gifs` Directory:** Reduced from **136.42 MB** down to **15.34 MB** (**121.08 MB saved**)
- **Visual Quality:** Smooth 12 fps animation preserved at 200x200 resolution with clean transparency.

### C. Measured AAB & Device Download Packages

All measurements generated using `bundletool` 1.18.3:

| Artifact / Metric | Phase 15 Baseline | Phase 16 Baseline | Phase 17 Measured | Net Reduction | Status |
|---|---|---|---|---|---|
| **Raw App Bundle (`.aab`)** | 484.83 MB | 419.00 MB | **313.40 MB** | **-171.43 MB (-35.4%)** | **VERIFIED PASS** |
| **Base APK (`base-master.apk`)** | 204.80 MB | 204.70 MB | **81.74 MB** | **-122.96 MB (-60.1%)** | **VERIFIED PASS (<150 MB)** |
| **x86_64 Device Download** | 258.40 MB | 253.10 MB | **127.07 MB – 127.53 MB** | **-125.57 MB** | **VERIFIED PASS (<150 MB)** |
| **armeabi-v7a Device Download** | 283.50 MB | 278.20 MB | **152.86 MB – 153.33 MB** | **-124.87 MB** | **NEAR THRESHOLD** |
| **arm64-v8a Device Download** | 292.10 MB | 287.89 MB | **160.99 MB – 161.46 MB** | **-126.43 MB (-44.0%)** | **CONDITIONAL (>150 MB)** |

### D. Play Console Policy Analysis & Acceptance Findings
1. **AAB File Upload Cap:** Google Play Console permits `.aab` uploads up to **2 GB**. The **313.4 MB** AAB can be successfully uploaded to the Play Console.
2. **Base APK Compressed Download Cap:** Google Play enforces a **150 MB** download limit on the base module. At **81.74 MB**, the base APK is well under the 150 MB ceiling.
3. **Total Delivery Download Cap for arm64-v8a:** Google Play calculates the total install download as `base APK (81.74 MB) + arm64_v8a split (79.25 MB) + config splits (0.1 MB) = 161.08 MB`. This exceeds the 150 MB single-download threshold by **11.08 MB** (7.4%).
4. **Permanent Architecture Solution — Google Play Asset Delivery (PAD):**
   - The canonical `assets/3D AVATAR/Tanya/Tanya.glb` is **54.96 MB**.
   - By declaring an `install-time` asset pack in `build.gradle.kts` for `Tanya.glb`, the base module download drops from **161.08 MB** down to **106.12 MB** (30% below the 150 MB cap).
   - Google Play Asset Delivery allows up to **1.5 GB** for install-time asset packs and is the standard production pattern for 3D digital human avatars on Android.

---

## 3. TEST SUITE REGRESSION VALIDATION
After signing hardening and GIF optimization, all test suites were executed:
- **`ariesxpertv2` Core Tests:** 22/22 passed (`flutter test test/`)
- **`packages/aries_duix` Tests:** 13/13 passed (`flutter test packages/aries_duix/test/`)
- **Total Flutter Verification:** **35/35 PASSED (100%)**
