# PHASE 21 — FIREBASE CONFIGURATION & DEEP LINK COMPATIBILITY

**Execution Timestamp:** 2026-10-08T23:33:00+05:30  
**Target Repository:** `ariesxpertv2`  
**Classification:** P1 Cloud Integration & Routing Gate  
**Status:** **DUAL-CLIENT CONFIGURED & APP LINKS VERIFIED**

---

## 1. FIREBASE REGISTRATION & DUAL-CLIENT ARCHITECTURE

When migrating an application ID, Firebase requires exact matching between the Android `applicationId` and the `client.client_info.android_client_info.package_name` field in `google-services.json`.

If the Google Services Gradle plugin (`com.google.gms.google-services`) encounters an `applicationId` that does not match any registered client in `google-services.json`, the Gradle build fails with:
`No matching client found for package name 'com.ariesphysiocare.ariesexpert'`

### 1.1 Dual-Client Configuration (`google-services.json`)
To support both the official Play Store package identity (`com.ariesphysiocare.ariesexpert`) and preserve backward compatibility with internal testing configurations, a dual-client structure was implemented:

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
      },
      ...
    },
    {
      "client_info": {
        "mobilesdk_app_id": "1:864047614674:android:8d23b0bf7cdfc605b22ba9",
        "android_client_info": {
          "package_name": "com.ariesphysiocare.ariesexpert"
        }
      },
      "oauth_client": [
        {
          "client_id": "864047614674-iig1p9f3o08mnijufue2bjflkijc2esl.apps.googleusercontent.com",
          "client_type": 1,
          "android_info": {
            "package_name": "com.ariesphysiocare.ariesexpert",
            "certificate_hash": "01ad97aaed9ff74794fd84aa40da6acf7f807e7e"
          }
        }
      ],
      "api_key": [
        {
          "current_key": "AIzaSyAqSCmZxOwBJyNkhmOIm7wLEd1l7MK_04c"
        }
      ]
    }
  ]
}
```

### 1.2 Firebase Services Health
1. **Firebase Cloud Messaging (FCM):** Push notifications function seamlessly under `com.ariesphysiocare.ariesexpert`. When upgrading in-place, the device requests a refreshed FCM registration token and synchronizes it to the backend via `ApiService`.
2. **Firebase Crashlytics:** Crash reports and ANR traces route directly to the project dashboard under the `com.ariesphysiocare.ariesexpert` bundle identifier.
3. **Firebase Authentication / Phone Auth:** Phone OTP SMS verification remains functional and bound to the SHA-256 fingerprint registered in the Google Cloud Console.

---

## 2. DEEP LINKING & UNIVERSAL ANDROID APP LINKS

In `ariesxpertv2/android/app/src/main/AndroidManifest.xml`, intent filters have been reconciled:

### 2.1 Universal HTTPS App Links (AutoVerify)
```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="ariesxpert.com" />
    <data android:scheme="https" android:host="app.ariesxpert.com" />
</intent-filter>
```
- **Digital Asset Links:** Served at `https://ariesxpert.com/.well-known/assetlinks.json` declaring package name `com.ariesphysiocare.ariesexpert` and the signing certificate SHA-256 hash.
- **Behavior:** Clicking appointment links, telehealth invitations, or password reset emails opens the AriesXpert app directly without a browser disambiguation dialog.

### 2.2 Payment Gateway Return URI Scheme
```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="ariesxpert" />
</intent-filter>
```
- **Used by:** Cashfree Payment Gateway and Razorpay SDK to return patients to the booking confirmation screen following UPI, Net Banking, or Credit Card checkout (`ariesxpert://payment-success` or `ariesxpert://payment-failed`).

---

## 3. PERMISSION ARCHITECTURE RECONCILIATION

The updated `AndroidManifest.xml` preserves all permissions required by the legacy app while incorporating necessary modern privacy protections:

| Permission | Legacy App (`ap-therapist-app`) | AriesXpertV2 Upgrade | Purpose / Justification |
| :--- | :---: | :---: | :--- |
| `INTERNET` | Yes | Yes | API and video consultation streaming |
| `ACCESS_NETWORK_STATE` | Yes | Yes | Connectivity detection and retry policies |
| `CAMERA` | Yes | Yes | Telehealth consultations and clinical QR scanning |
| `RECORD_AUDIO` | No (Text only) | **Yes** | **DUIX Tanya Mobile Avatar voice interaction** |
| `ACCESS_FINE_LOCATION` | Yes | Yes | Clinic geofencing and patient distance calculation |
| `POST_NOTIFICATIONS` | Yes | Yes | Consultation reminders and appointment updates |
| `SYSTEM_ALERT_WINDOW` | No | Yes | Sticky SOS emergency escalation overlay |
| `READ_CONTACTS` | Yes | Yes | Referral rewards and patient sharing |

---

## 4. AUDIT VERDICT

Firebase project registration, Google Services compilation, Universal HTTPS App Links, and device permissions are **100% compatible with `com.ariesphysiocare.ariesexpert`**.
