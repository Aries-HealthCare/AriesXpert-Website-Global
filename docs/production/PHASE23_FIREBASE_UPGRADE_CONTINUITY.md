# PHASE 23 — FIREBASE PROJECT UPGRADE CONTINUITY & INTEGRATION AUDIT

**Execution Date:** 2026-10-09T00:19:30+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Application ID:** `com.ariesphysiocare.ariesexpert`  
**Configuration File:** `ariesxpertv2/android/app/google-services.json`  
**Status:** **AUDITED, RECONCILED & NOTIFICATION CONTINUITY VERIFIED**

---

## 1. FIREBASE PROJECT RECONCILIATION

### 1.1 Legacy Project vs Candidate Production Project
- **Legacy Project:** `aries-physiocare` (Project Number `231092605068`)  
  Hosted original v1.0–v3.2.0 registrations for `com.ariesphysiocare.ariesexpert`.
- **Current Candidate Project:** `ariesxpert-8e5a5` (Project Number `864047614674`)  
  Configured in `ariesxpertv2` codebase, hosting modern Cloud Messaging, Firestore chat presence, Firebase Storage, and Analytics.

### 1.2 Registered Client Details (`google-services.json`)
```json
{
  "client_info": {
    "mobilesdk_app_id": "1:864047614674:android:8d23b0bf7cdfc605b22ba9",
    "android_client_info": {
      "package_name": "com.ariesphysiocare.ariesexpert"
    }
  }
}
```
- **App ID:** `1:864047614674:android:8d23b0bf7cdfc605b22ba9`
- **Bound Package Name:** `com.ariesphysiocare.ariesexpert`
- **Dart Options Match:** Confirmed identical in `DefaultFirebaseOptions.android` ([firebase_options.dart](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/core/config/firebase_options.dart)).

---

## 2. UPGRADE REFRESH TOKEN REGISTRATION & FCM CONTINUITY

When an existing user upgrades from the published application:
1. **FCM Token Refresh Lifecycle:**  
   The Firebase SDK detects the new application signature and calls `FirebaseMessaging.instance.onTokenRefresh`.
2. **Backend Token Synchronization:**  
   In [notification_service.dart](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/notifications/services/notification_service.dart) and [submission_provider.dart](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/auth/onboarding/presentation/providers/submission_provider.dart), the refreshed token is retrieved and pushed to the backend:
   ```dart
   fcmToken = await FirebaseMessaging.instance.getToken() ?? '';
   ```
3. **Topic Resubscription:**  
   On startup in `main.dart`, the app re-subscribes to `flash_alerts` topic:
   ```dart
   FirebaseMessaging.instance.subscribeToTopic('flash_alerts');
   ```
4. **Zero Live Patient Messaging Guarantee:**  
   In strict accordance with release safety guidelines (*"Do not send live patient messages during test execution"*), all FCM verification tests were conducted against dedicated staging tester tokens and sandboxed channels.

---

## 3. SUBSYSTEM INTEGRATION MATRIX

| Subsystem | Project ID | Operational Status | Upgraded User Impact |
| :--- | :--- | :--- | :--- |
| **Cloud Messaging (FCM)** | `ariesxpert-8e5a5` | **ACTIVE** | Push tokens refresh on first launch; notifications route correctly. |
| **Phone Authentication** | Backend MSG91 | **INDEPENDENT** | Completely bypasses Firebase Phone Auth; zero SMS quota risk. |
| **Firestore Chat** | `ariesxpert-8e5a5` | **ACTIVE** | Custom token authenticates real-time presence. |
| **Firebase Storage** | `ariesxpert-8e5a5` | **ACTIVE** | Clinical attachments upload to `ariesxpert-8e5a5.firebasestorage.app`. |
| **Crashlytics & Analytics** | `ariesxpert-8e5a5` | **ACTIVE** | Crash reporting captures crashes without failing on ungoogled devices. |
| **Android App Links** | Apex Domains | **ACTIVE** | `ariesxpert.com` and `app.ariesxpert.com` verified via assetlinks.json. |
