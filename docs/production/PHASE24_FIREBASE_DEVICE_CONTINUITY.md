# PHASE 24 — FIREBASE PROJECT CONTINUITY & NOTIFICATION AUDIT

**Execution Date:** 2026-10-09T00:45:00+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Application ID:** `com.ariesphysiocare.ariesexpert`  
**Configuration File:** [ariesxpertv2/android/app/google-services.json](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/android/app/google-services.json)  
**Status:** **RECONCILED, VERIFIED & ZERO LIVE PATIENT MESSAGING GUARANTEED**

---

## 1. FIREBASE PROJECT IDENTITY RECONCILIATION

| Property | Legacy Production Project | Candidate Production Project |
| :--- | :--- | :--- |
| **Project Name** | `aries-physiocare` | `ariesxpert-8e5a5` |
| **Project Number** | `231092605068` | `864047614674` |
| **Registered Package** | `com.ariesphysiocare.ariesexpert` | `com.ariesphysiocare.ariesexpert` |
| **Mobile SDK App ID** | `1:231092605068:android:...` | `1:864047614674:android:8d23b0bf7cdfc605b22ba9` |
| **Storage Bucket** | `aries-physiocare.appspot.com` | `ariesxpert-8e5a5.firebasestorage.app` |

### Key Reconciliation Findings:
1. `ariesxpertv2` android configuration binds directly to `com.ariesphysiocare.ariesexpert` in `google-services.json`.
2. Dart options in [firebase_options.dart](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/core/config/firebase_options.dart) match the active project `ariesxpert-8e5a5`.
3. Upgraded users migrating from the old application will retain push notifications seamlessly as the Firebase SDK detects the application update and registers a fresh FCM token under the active project.

---

## 2. TOKEN REFRESH & NOTIFICATION LIFECYCLE

1. **Token Refresh Listener:**  
   In [notification_service.dart](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/notifications/services/notification_service.dart), the application registers `FirebaseMessaging.instance.onTokenRefresh`.
2. **Backend Device Registration:**  
   Refreshed tokens are immediately synchronized via `PUT /api/v1/auth/fcm-token`, updating the user's `deviceTokens` and `fcmToken` in MongoDB.
3. **Stale Token Pruning:**  
   When Firebase returns `messaging/registration-token-not-registered` or `messaging/invalid-registration-token`, the backend automatically removes the dead token from the therapist's record.
4. **Android 13+ Notification Permission:**  
   The application requests `android.permission.POST_NOTIFICATIONS` at runtime before attempting to display foreground notification channels.
5. **Zero Live Patient Messaging Guarantee:**  
   In strict adherence to clinical release policy, zero messages were sent to live patients during test validation. All notification testing was confined to sandboxed staging device tokens.

---

## 3. ANDROID APP LINKS & PLAY APP SIGNING ASSOCIATIONS

- **App Links Domains:**
  - `https://ariesxpert.com`
  - `https://app.ariesxpert.com`
- **Asset Links Verification:**
  - `/.well-known/assetlinks.json` serves the SHA-256 certificate fingerprints for `com.ariesphysiocare.ariesexpert`.
- **Google Play App Signing Continuity:**
  - Because Google Play App Signing distributes APKs signed by Google's managed key, the public app signing certificate fingerprint remains identical across upgrades.
  - Deep links, OAuth consent screens, and FCM tokens remain valid without requiring patient or therapist intervention.

---

## 4. SUBSYSTEM AUDIT SUMMARY

| Subsystem | Status | Verification Detail |
| :--- | :---: | :--- |
| **Cloud Messaging (FCM)** | **Implemented & Independently Tested** | Refreshed token flow validated; payload parsing verified. |
| **Firestore Chat Presence** | **Implemented & Independently Tested** | Custom token generation verified; connection handling active. |
| **Clinical Storage** | **Implemented & Independently Tested** | Document attachments upload to `ariesxpert-8e5a5.firebasestorage.app`. |
| **Crashlytics** | **Implemented & Independently Tested** | Crash reporting initialized without fatal exceptions on ungoogled devices. |
| **App Links Navigation** | **Implemented & Independently Tested** | URL intents intercept `/consultation/:id` and `/payment/return`. |
