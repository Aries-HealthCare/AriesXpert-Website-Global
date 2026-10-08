# PHASE 21 — PLAY APP SIGNING & UPLOAD CERTIFICATE COMPATIBILITY AUDIT

**Execution Timestamp:** 2026-10-08T23:31:00+05:30  
**Target Package:** `com.ariesphysiocare.ariesexpert`  
**Classification:** P0 Cryptographic Governance & Google Play Ingestion Gate  
**Status:** **AUDITED & PROCEDURALLY CHARTERED (CONSOLE VERIFICATION GATED)**

---

## 1. PROBLEM STATEMENT & GOOGLE PLAY APP SIGNING ARCHITECTURE

In modern Android releases distributed via Google Play App Signing:
1. **App Signing Key (Google-Managed):** Google retains the root private key used to sign the final APKs delivered to end-user handsets. Because Google re-signs the delivered APKs with this key, the cryptographic signature on user devices remains continuous across app updates regardless of which upload key was used.
2. **Upload Key (Developer-Managed):** The developer signs the Android App Bundle (`.aab`) with an **Upload Key**. Google Play validates the `.aab` against the registered upload certificate before ingesting the bundle.
3. **The Compatibility Challenge:**
   - The compiled Phase 21 AAB is signed by the local keystore `upload-keystore.jks` with SHA-256 fingerprint:  
     `06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E` (Serial: `85789d0e5992f299`).
   - If the registered upload key in Google Play Console for `com.ariesphysiocare.ariesexpert` matches this certificate, Google Play will immediately accept the `.aab`.
   - If a different upload key was registered during the original `ap-therapist-app` launch, Google Play Console will reject the upload with an `Upload key mismatch` error.
   - **Crucial Rule:** In Google Play App Signing, a developer **cannot** change the registered upload key merely by generating a new keystore on their local machine; they must either use the original key or follow the official Google Play Upload Key Reset process.

---

## 2. COMPARATIVE CERTIFICATE SPECIFICATION

| Certificate Field | Local Build Keystore (`upload-keystore.jks`) | Play Console Registered Upload Certificate | Play Console App Signing Certificate |
| :--- | :--- | :--- | :--- |
| **Alias** | `ariesxpert_upload` | Registered in Play Console | Managed in Google Key Management Service (KMS) |
| **Serial Number** | `85789d0e5992f299` | Gated on Console Inspection | Held Securely by Google Play |
| **SHA-256 Fingerprint** | `06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E` | Requires Console Verification | Retained on Google Edge Servers |
| **SHA-1 Fingerprint** | `18:DE:A5:EE:C7:AE:B0:B0:E6:C1:34:DE:BD:12:A6:55:86:98:0C:60` | Requires Console Verification | Retained on Google Edge Servers |
| **Key Type** | 2048-bit RSA key | 2048-bit RSA key or higher | Google-managed RSA / EC |
| **Status** | **ACTIVE IN LOCAL BUILD** | **GATED ON CONSOLE ACCESS** | **PROTECTED BY PLAY APP SIGNING** |

---

## 3. OFFICIAL GOOGLE PLAY UPLOAD KEY RESET PROCEDURE

If the human Release Owner uploads `app-release.aab` and Google Play Console indicates that the upload key fingerprint differs from the historical key, the Release Owner must execute Google's standard Upload Key Reset procedure:

### Step-by-Step Reset Protocol:
1. Log into [Google Play Console](https://play.google.com/console) as the **Account Owner**.
2. Select application `com.ariesphysiocare.ariesexpert`.
3. In the left navigation menu, go to **Release > Setup > App integrity**.
4. Select the **Play App Signing** tab.
5. Under **Upload key certificate**, click **Request upload key reset**.
6. Select the reason for reset: e.g., *"I lost my upload key"* or *"Upgraded build system / key rotation"*.
7. Generate the upload certificate PEM file from our local upload keystore:
   ```bash
   keytool -export -rfc \
       -keystore /Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/android/app/upload-keystore.jks \
       -alias ariesxpert_upload \
       -file /tmp/upload_certificate.pem
   ```
8. Upload `/tmp/upload_certificate.pem` to the Google Play Console form and submit.
9. Google Play applies the new upload key within **24 to 48 hours**. Once active, Google Play Console will accept all future AABs signed by our certified upload key.

> **CRITICAL ARCHITECTURAL GUARANTEE:**  
> Resetting the **upload key** does **NOT** break update compatibility for existing installed users! Because Google Play App Signing retains the original **app signing key**, end users receive an update signed with the exact same identity, preserving all user accounts, local databases, and permissions without uninstalling.

---

## 4. AUDIT CONCLUSION & GATED STATUS

- **Local AAB Signature:** **PASS** (Correctly signed with `85789d0e5992f299`).
- **Remote Upload Key Match:** **BLOCKED ON CONSOLE INSPECTION**.
- **Action Required by Release Owner:** Upload `app-release.aab` to Play Console. If matched: release proceeds. If mismatched: execute the 5-minute PEM export and key reset protocol detailed above.
