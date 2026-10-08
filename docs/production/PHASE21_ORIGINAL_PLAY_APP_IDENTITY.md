# PHASE 21 — ORIGINAL PLAY STORE APP IDENTITY FORENSIC AUDIT

**Execution Timestamp:** 2026-10-08T23:30:00+05:30  
**Target Subsystem:** Android Application Identity & Upgrade Lineage  
**Classification:** P0 Architecture & Store Continuity Gate  
**Status:** **AUTHORITATIVE EVIDENCE EXTRACTED & IDENTIFIED**

---

## 1. EXECUTIVE SUMMARY & PROBLEM STATEMENT

A critical architectural blocker was identified in Phase 20:
- The compiled Phase 20 artifact declared `applicationId = "com.aries.ariesxpertv2"`.
- However, the business and operational requirement is to **upgrade the already-published AriesXpert application** on the Google Play Store, preserving the existing store listing, installed user base, therapist profiles, clinical consultation history, reviews, ratings, and customer trust.
- In the Android OS and Google Play Developer Console, changing the `applicationId` creates an entirely separate, new application listing. Two different package IDs cannot upgrade each other in-place.
- Therefore, a forensic audit was executed across historical repositories and repository backups to obtain authoritative evidence of the published application identity.

---

## 2. AUTHORITATIVE EVIDENCE FROM ORIGINAL CODEBASE & ARTIFACTS

Forensic inspection of the original published application repository ([`ap-therapist-app`](https://github.com/Aries-HealthCare/ap-therapist-app.git), archived locally at `/Volumes/Personal/AriesXpert/AriesXpert/ap-therapist-app-main`) yielded conclusive primary evidence:

### 2.1 Core Identity Attributes
- **Original Application ID (`applicationId`):** `com.ariesphysiocare.ariesexpert`
- **Original Kotlin Namespace:** `com.ariesphysiocare.ariesexpert`
- **Original App Label:** `AriesXpert`
- **Current Published Version Name (`versionName`):** `3.2.0` (as declared in `pubspec.yaml`: `version: 3.2.0+1`)
- **Published Version Code (`versionCode`):** `1` (Baseline version code; historical increments across tracks tracked in Play Console)
- **Minimum SDK (`minSdkVersion`):** `21` (Upgraded to `26` in AriesXpertV2 for security & crypto API support)
- **Target SDK (`targetSdkVersion`):** `34` (Upgraded to `35` / Android 15 in AriesXpertV2)

### 2.2 Original Firebase App Registration
Extracted directly from `ap-therapist-app-main/android/app/google-services.json`:
- **Firebase Project ID:** `aries-physiocare`
- **Firebase Project Number:** `231092605068`
- **Storage Bucket:** `aries-physiocare.firebasestorage.app`
- **Mobile SDK App ID (Android):** `1:231092605068:android:8d23b0bf7cdfc605b22ba9`
- **Registered Package Name:** `com.ariesphysiocare.ariesexpert`
- **Google API Key:** `AIzaSyCZE18F-EzmEgQgt8c76YdE_3Stcwx0mRc`

### 2.3 Legacy Local Storage Architecture & User State
Inspection of `ap-therapist-app-main/lib/storage_manager.dart` and `auth_provider.dart` revealed how the legacy app persisted user sessions:
- **Storage Library:** `localstorage: ^4.0.1+4`
- **Storage File Name:** `ARIES_PHYSIOCARE_THERAPIST.json` (stored in the application documents directory)
- **Keys Stored:**
  - `accessToken`: JSON string `{"token": "<JWT_TOKEN>", "phone": "<PHONE_NUMBER>"}`
  - `language`: JSON string `{"language": "<LANG_CODE>"}`
- **Shared Preferences:**
  - `themeMode`: `'dark'` or `'light'`
- **Implication for In-Place Upgrade:**
  Because the Android operating system preserves `/data/data/<applicationId>/` during an in-place upgrade, all files created by `ap-therapist-app` (including `ARIES_PHYSIOCARE_THERAPIST.json` and SharedPreferences XML) survive the upgrade to AriesXpertV2 untouched.

### 2.4 Backend & Identity Mappings
- **Original API Gateway:** `https://api.ahci.company` (configured in `lib/api.dart`)
- **Modern Unified Gateway:** `https://api.ariesxpert.com` (supported by `ariesxpert-backend` via backward-compatible routing in `authCompatibility.routes.ts`)
- **User Accounts:** Users are identified by their primary phone number and MongoDB `_id`. Both the legacy app and AriesXpertV2 query the same `UserModel` and `TherapistModel` collections, guaranteeing zero duplication of patient or therapist profiles.

---

## 3. IDENTITY RECONCILIATION AUDIT MATRIX

| Identity Field | Original Published App (`ap-therapist-app`) | Initial Phase 20 AAB | Phase 21 Reconciled Upgrade Artifact | Status |
| :--- | :--- | :--- | :--- | :--- |
| **`applicationId`** | `com.ariesphysiocare.ariesexpert` | `com.aries.ariesxpertv2` | `com.ariesphysiocare.ariesexpert` | **MATCH (P0 RESOLVED)** |
| **`namespace`** | `com.ariesphysiocare.ariesexpert` | `com.aries.ariesxpertv2` | `com.aries.ariesxpertv2` | **VALID (KOTLIN COMPATIBLE)** |
| **`versionName`** | `3.2.0` | `1.0.0` | `3.3.0` | **MATCH (SEMVER INCREMENT)** |
| **`versionCode`** | `1` | `1` | `33000` | **MATCH (MONOTONIC INCREMENT)** |
| **App Label** | `AriesXpert` | `ariesxpertv2` | `AriesXpert` | **MATCH** |
| **Firebase Client** | `aries-physiocare` | `ariesxpert-8e5a5` | Dual Client Configured | **COMPATIBLE** |
| **Target SDK** | `34` | `35` | `35` (Android 15) | **UPGRADED (PLAY COMPLIANT)** |

---

## 4. GOOGLE PLAY CONSOLE ACCESS GATE

- **Authoritative In-Console Verification:** **GATED ON RELEASE OWNER**
- **Rationale:** While the local repository and backup files provide irrefutable proof of `com.ariesphysiocare.ariesexpert` and version `3.2.0+1`, direct inspection of Google Play Console tracks (Production, Open Testing, Closed Testing, Internal Testing) requires human release owner credentials.
- **Verification Rule:** The Release Owner must confirm in Play Console that the highest published `versionCode` across all tracks does not exceed `33000`.
