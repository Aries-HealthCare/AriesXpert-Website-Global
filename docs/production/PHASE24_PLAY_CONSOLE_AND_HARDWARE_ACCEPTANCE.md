# PHASE 24 — GOOGLE PLAY CONSOLE & HARDWARE ACCEPTANCE AUDIT

**Execution Date:** 2026-10-09T01:33:00+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Application ID:** `com.ariesphysiocare.ariesexpert`  
**Product:** AriesXpert  
**Major Release:** `2.0.0` (Build `33000`)  
**Host Hardware Status:** `adb devices -l` = **0 Attached Devices**  
**Gate Status:** **PLAY CONSOLE & PHYSICAL HARDWARE GATED (BLOCKED)**

---

## 1. HARDWARE STATUS & FACTUAL GATING

In strict accordance with release policy (*"If physical hardware or Play Console is unavailable, mark the test BLOCKED... Report observed PASS, FAIL, BLOCKED or NOT TESTED for every important claim"*):

```bash
$ adb devices -l
List of devices attached
```

Because zero physical Android handsets are connected to the build environment:
- Automated on-device smoke runs cannot be fabricated.
- In-place physical handset upgrade tests are classified as **BLOCKED ON HARDWARE**.
- Google Play Console internal test track upload is classified as **BLOCKED ON PLAY CONSOLE CREDENTIALS**.

---

## 2. GOOGLE PLAY CONSOLE UPLOAD & KEY COMPATIBILITY PROCEDURE

For the authorized Release Owner:
1. Log into [Google Play Console](https://play.google.com/console).
2. Select the published application: **AriesXpert** (`com.ariesphysiocare.ariesexpert`).
3. Confirm that `versionCode: 33000` is strictly higher than all existing releases across Internal, Closed, Open, and Production tracks.
4. Navigate to **Testing** -> **Internal testing** -> **Create new release**.
5. Upload candidate artifact: [app-release.aab](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/build/app/outputs/bundle/release/app-release.aab) (Exact SHA-256: `df5fb20824c380c96d7e0754c6850ce5b03bf46408e4ed9196bbc5ea337e866c`, Size: `313,450,683` bytes).
6. **Upload Key Handling:**
   - **Scenario A (Upload Key Accepted):** If Play Console accepts the upload certificate, save and roll out to internal testers.
   - **Scenario B (Upload Key Reset Required):** If Play Console indicates an upload certificate mismatch, navigate to **Setup** -> **App signing** -> **Request upload key reset**, and upload [upload_certificate.pem](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/android/upload_certificate.pem).
   - *Note:* Google Play App Signing preserves the end-user signing key regardless of upload key resets. Installed user data and app signature continuity will remain intact.

---

## 3. PHYSICAL HANDSET 12-POINT ACCEPTANCE PROTOCOL

Once the candidate release is live on the Google Play Internal Testing track, the Release Owner or QA lead must execute the following 12 checkpoints on a physical handset with the original app installed:

| # | Checkpoint | Execution Protocol | Expected Outcome | Status |
| :-: | :--- | :--- | :--- | :---: |
| **1** | **Original App State** | Open published app installed from Play Store | Logged into synthetic therapist account | **BLOCKED ON HARDWARE** |
| **2** | **Seed Consultation** | Schedule test appointment & note | Saved to MongoDB with current therapist ID | **BLOCKED ON HARDWARE** |
| **3** | **Play Store Update** | Open Internal Testing link & tap "Update" | Android Package Manager updates in place (no uninstall) | **BLOCKED ON PLAY CONSOLE** |
| **4** | **Launch & Migration** | Launch AriesXpert 2.0.0 | Calls `/migrate-legacy-session` (or OTP recovery), purges legacy file | **BLOCKED ON HARDWARE** |
| **5** | **Account Continuity** | Inspect logged-in therapist profile | Exact user ID and therapist profile match original account | **BLOCKED ON HARDWARE** |
| **6** | **Records Integrity** | Check "My Appointments" and "Medical Records" | Past consultations and clinical notes present | **BLOCKED ON HARDWARE** |
| **7** | **Push Delivery** | Dispatch background alert from staging backend | Notification banner appears in notification tray | **BLOCKED ON HARDWARE** |
| **8** | **App Links** | Tap `https://ariesxpert.com/consultation/test-id` | App intercepts URL and navigates directly to appointment | **BLOCKED ON HARDWARE** |
| **9** | **Payment Sandbox** | Initiate dummy consultation payment | Cashfree sandbox SDK opens and returns cleanly | **BLOCKED ON HARDWARE** |
| **10** | **Native DUIX Avatar** | Open Tanya digital assistant | 30+ FPS render; microphone, audio, and lip-sync active | **BLOCKED ON HARDWARE** |
| **11** | **Lifecycle Resilience**| Background app for 5 mins, rotate screen | Zero ANRs, memory remains under 350 MB | **BLOCKED ON HARDWARE** |
| **12** | **Security Invariant** | Inspect filesystem | Obsolete `ARIES_PHYSIOCARE_THERAPIST.json` confirmed deleted | **BLOCKED ON HARDWARE** |
