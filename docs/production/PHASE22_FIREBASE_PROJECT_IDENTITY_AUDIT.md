# PHASE 22 — FIREBASE PROJECT IDENTITY & INTEGRATION AUDIT

**Execution Date:** 2026-10-08T23:59:30+05:30  
**Target Branch:** `release-candidate-production-hardening`  
**Application ID:** `com.ariesphysiocare.ariesexpert`  
**Configuration File:** `ariesxpertv2/android/app/google-services.json`  
**Status:** **AUDITED, RECONCILED & ALIGNED**

---

## 1. DUAL FIREBASE PROJECT INVESTIGATION

Forensic audit of previous reports and active configuration identified two distinct Firebase projects:

| Parameter | Project A (Original Legacy) | Project B (Current Candidate) |
| :--- | :--- | :--- |
| **Project ID** | `aries-physiocare` | `ariesxpert-8e5a5` |
| **Project Number** | `231092605068` | `864047614674` |
| **Storage Bucket** | `aries-physiocare.appspot.com` | `ariesxpert-8e5a5.firebasestorage.app` |
| **Legacy App Association** | Associated with original `ap-therapist-app` v1.0–v3.2.0 | Configured in `ariesxpertv2` codebase |

---

## 2. GOOGLE-SERVICES.JSON & CLIENT CONFIGURATION

In `ariesxpertv2/android/app/google-services.json`, Project B (`ariesxpert-8e5a5`) contains dual client definitions:

```json
{
  "project_info": {
    "project_number": "864047614674",
    "project_id": "ariesxpert-8e5a5",
    "storage_bucket": "ariesxpert-8e5a5.firebasestorage.app"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:864047614674:android:a029255cd26698feb23b0b",
        "android_client_info": {
          "package_name": "com.aries.ariesxpertv2"
        }
      }
    },
    {
      "client_info": {
        "mobilesdk_app_id": "1:864047614674:android:8d23b0bf7cdfc605b22ba9",
        "android_client_info": {
          "package_name": "com.ariesphysiocare.ariesexpert"
        }
      }
    }
  ]
}
```

### 2.1 Resolution of Client Mapping
- The Google Services Gradle plugin automatically selects the client block whose `package_name` matches `defaultConfig.applicationId`.
- Because `applicationId = "com.ariesphysiocare.ariesexpert"`, Gradle binds to **Client 2** (`mobilesdk_app_id`: `1:864047614674:android:8d23b0bf7cdfc605b22ba9`).
- In `ariesxpertv2/lib/core/config/firebase_options.dart`, `DefaultFirebaseOptions.android` was updated to explicitly supply this exact `appId`:
  ```dart
  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyAqSCmZxOwBJyNkhmOIm7wLEd1l7MK_04c',
    appId: '1:864047614674:android:8d23b0bf7cdfc605b22ba9',
    messagingSenderId: '864047614674',
    projectId: 'ariesxpert-8e5a5',
    storageBucket: 'ariesxpert-8e5a5.firebasestorage.app',
  );
  ```

---

## 3. INTEGRATION AUDIT ACROSS FIREBASE SUBSYSTEMS

### 3.1 Push Notifications (Firebase Cloud Messaging - FCM)
- **Token Generation:** `FirebaseMessaging.instance.getToken()` queries FCM using Project B sender ID `864047614674`.
- **Background Handlers:** `firebaseMessagingBackgroundHandler` in [main.dart](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/main.dart) handles background payloads for flash alerts and emergency requests.
- **Topic Subscriptions:** `flash_alerts` topic subscribed on app launch.

### 3.2 Authentication & OTP Verification
- **Architecture Discovery:** Phone OTP authentication in AriesXpert is **not** managed by Firebase Phone Auth. It is executed directly by the AriesXpert backend using MSG91 SMS gateway integration (`POST /api/v1/auth/login-otp` and `POST /api/v1/auth/verify-otp`).
- **Impact:** Phone login is completely immune to Firebase Phone Auth quota limits, Google Play integrity tokens, or Firebase Console SHA-256 fingerprint mismatches.

### 3.3 Firebase Auth Custom Token Sync
- For real-time Firestore chat and live location tracking, the backend issues a Firebase custom token that the mobile client consumes via `FirebaseAuth.instance.signInWithCustomToken()`.
- If custom token sign-in encounters network delay, the app logs a non-fatal warning and continues operation using primary backend REST APIs.

### 3.4 Crashlytics & Analytics
- Crash reports and analytics route directly to `ariesxpert-8e5a5`.
- Release builds do not crash on missing Google Play Services, operating gracefully across Google and non-Google Android distributions.

---

## 4. ACTION ITEMS FOR RELEASE OWNER (FIREBASE CONSOLE)

To ensure full functionality for Google Sign-In and Android App Links:
1. Log into [Firebase Console](https://console.firebase.google.com/) for project `ariesxpert-8e5a5`.
2. Under **Project Settings** -> **Your apps** -> `com.ariesphysiocare.ariesexpert`:
   - Add SHA-256 fingerprint:  
     `06:CE:BF:2A:C3:D8:41:0C:06:6B:ED:CD:0C:96:EA:7A:98:71:5E:1A:A6:C1:49:6D:0F:A2:CE:08:4A:52:85:9E`
   - Add SHA-1 fingerprint:  
     `18:DE:A5:EE:C7:AE:B0:B0:E6:C1:34:DE:BD:12:A6:55:86:98:0C:60`
   - Once Google Play App Signing is confirmed, also add the Google Play App Signing certificate SHA-256 fingerprint.
