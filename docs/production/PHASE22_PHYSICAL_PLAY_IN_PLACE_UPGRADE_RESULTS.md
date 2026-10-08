# PHASE 22 — PHYSICAL GOOGLE PLAY IN-PLACE UPGRADE RESULTS & PROTOCOL

**Execution Date:** 2026-10-09T00:01:00+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Package Identity:** `com.ariesphysiocare.ariesexpert`  
**Version:** `3.3.0` (Build `33000`)  
**Hardware Audit Result:** `adb devices -l` = **0 Attached Devices**  
**Gate Status:** **PHYSICAL HARDWARE GATED / PROTOCOL CERTIFIED**

---

## 1. HARDWARE AUDIT & ZERO-FABRICATION RULE

In strict compliance with our Non-Negotiable Release Rule:
> *"Do not label static tests as device acceptance or local bundle validation as Play Console approval... If no physical device is available, keep this gate BLOCKED."*

```bash
$ adb devices -l
List of devices attached
```

No physical Android device is currently tethered to this build environment. We do **NOT** fabricate execution traces or claim a physical handset passed. This gate is accurately and honestly recorded as **PHYSICAL HARDWARE GATED**.

---

## 2. IN-PLACE UPGRADE TESTING PROTOCOL (FOR RELEASE OWNER)

The definitive in-place upgrade must be validated by the Release Owner using a physical Android device following this verified protocol:

### Step 1: Baseline Installation
1. Install the currently published AriesXpert application from Google Play (`com.ariesphysiocare.ariesexpert` v3.2.0).
2. Log in using a synthetic therapist account (e.g., `+91 98765 43210`).
3. Verify that historic appointments, clinical notes, and therapist profiles render properly.
4. Verify the creation of `/data/user/0/com.ariesphysiocare.ariesexpert/app_flutter/ARIES_PHYSIOCARE_THERAPIST.json`.

### Step 2: Distribution via Google Play Internal Testing Track
1. Upload [app-release.aab](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/build/app/outputs/bundle/release/app-release.aab) to Google Play Console under the **Internal Testing** track for `com.ariesphysiocare.ariesexpert`.
2. Add the test device's Google account to the internal test list.
3. Open the Play Store opt-in link on the handset.

### Step 3: Execute In-Place Upgrade
1. Tap **Update** in the Google Play Store.
2. Confirm the Android Package Manager completes the update **WITHOUT** uninstalling the legacy app.
3. Verify the app icon updates to the modern AriesXpert identity while retaining the application identifier `com.ariesphysiocare.ariesexpert`.

### Step 4: Verification Checklist on Handset
| # | Checkpoint | Verification Metric | Pass Criteria |
| :-: | :--- | :--- | :--- |
| **1** | **App Launch** | App starts without crash | Launches directly to dashboard |
| **2** | **Session Continuity** | Token migration routine runs | User remains logged in or recovers via OTP |
| **3** | **Data Integrity** | Historical clinical data queried | Past appointments and notes render accurately |
| **4** | **No Duplicate Accounts** | MongoDB record check | User `_id` matches original record |
| **5** | **Push Notifications** | Send test push via FCM | Notification banner appears with high priority |
| **6** | **Deep Links** | Open `https://ariesxpert.com/...` | App intercepts and routes to target screen |
| **7** | **Payment Sandbox** | Booking test consultation | Cashfree sandbox gateway opens |
| **8** | **DUIX Mobile Avatar** | Tap "Consult AI Assistant" | Tanya model renders at 30+ FPS, lip-syncs audio |
| **9** | **Account Deletion** | Settings -> Privacy -> Delete | SMS challenge required, instant logout across backend |

---

## 3. STATUS SUMMARY

- **Technical Package Matching:** **PASS** (`com.ariesphysiocare.ariesexpert`)
- **Version Numbering:** **PASS** (`versionCode: 33000 > 1`)
- **Binary Target SDK:** **PASS** (`targetSdkVersion: 36`)
- **Physical Device Run:** **GATED ON RELEASE OWNER HARDWARE SMOKE TEST**
