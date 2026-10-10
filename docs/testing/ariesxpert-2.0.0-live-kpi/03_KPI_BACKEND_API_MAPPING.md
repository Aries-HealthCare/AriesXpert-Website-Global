# ARIESXPERT 2.0.0 — TECHNICAL KPI BACKEND API MAPPING

**Application:** AriesXpertV2  
**Repository:** `ariesxpertv2`  
**Application ID:** `com.ariesphysiocare.ariesexpert`  
**API Host:** `https://api.ariesxpert.com`  
**Authentication Scheme:** Bearer JWT in `Authorization` header  
**Target Release:** AriesXpert 2.0.0 (Build 33000)  

---

## 1. ARCHITECTURAL OVERVIEW

Every KPI card, summary statistic, and chart in the AriesXpert 2.0.0 mobile application is bound to authentic backend REST endpoints hosted at `https://api.ariesxpert.com`. When no remote data exists for the authenticated user, widgets must transition into a confirmed zero state or informative unavailable state without injecting fabricated mock figures.

```
[Flutter UI Layer]
       │
       ▼
[Riverpod State Layer] (walletProvider, dashboardProvider, appointmentProvider, gamingProfileProvider)
       │
       ▼
[ApiService / Network Layer] (Token caching, Dio HTTP interceptor, SocketService)
       │
       ▼
[AriesXpert Enterprise Backend (Node.js / Express / MongoDB)]
```

---

## 2. DETAILED ENDPOINT & METRIC SPECIFICATION

### 2.1. Wallet & Financial Transactions
- **Endpoint:** `GET /api/app/wallet/my-wallet`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Response Schema:**
  ```json
  {
    "success": true,
    "data": {
      "walletBalance": 0.0,
      "totalEarnings": 0.0,
      "withdrawnAmount": 0.0,
      "currency": "INR"
    }
  }
  ```
- **Mobile Field Binding:**
  - `walletBalance` ➔ `GlassCard` Available Balance (`₹${wallet.balance.toStringAsFixed(2)}`)
  - Status indicator: Displays `"Verified ₹0.00"` when zero, ensuring clinicians know their balance is actively verified rather than broken.

- **Endpoint:** `POST /api/app/walletTransaction/fetchWalletTransactions`
- **Method:** `POST`
- **Payload:** `{"therapistId": "<userId>", "limit": 50, "page": 1}`
- **Response Schema:**
  ```json
  {
    "success": true,
    "data": {
      "transactions": [],
      "totalRecords": 0
    }
  }
  ```
- **Transformation Formula (Monthly Trend):**
  ```dart
  // Group credits by month
  for (final t in transactions) {
    if (t.isCredit && t.timestamp != null) {
      final month = t.timestamp.month;
      monthlyTotals[month] = (monthlyTotals[month] ?? 0.0) + t.amount;
    }
  }
  ```
- **Zero Handling:** If `monthlyTotals.isEmpty`, render:
  ```dart
  EmptyState(
    icon: Icons.show_chart_rounded,
    message: "No data available for the selected period."
  )
  ```

---

### 2.2. Clinical Visits & Appointment Metrics
- **Endpoint:** `POST /api/home/fetchNoOfVisit`
- **Method:** `POST`
- **Payload:** `{"expert": "<userId>"}`
- **Response Schema:**
  ```json
  {
    "status": true,
    "data": {
      "total": 0,
      "completed": 0,
      "scheduled": 0,
      "cancelled": 0
    }
  }
  ```
- **Mobile Field Binding:**
  - `data.total` ➔ `TotalVisitsDashboard` Total Visits Counter
  - `data.completed` ➔ `DashboardScreen` Completed Visits KPI Card
  - `data.cancelled` ➔ `TotalVisitsDashboard` Cancelled Visits Counter

- **Endpoint:** `POST /api/app/appointment/fetchAppointments`
- **Method:** `POST`
- **Payload:** `{"therapistId": "<userId>"}`
- **Response Schema:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "67a89...",
        "patientName": "Sunita Sharma",
        "dateTime": "2026-10-09T14:30:00.000Z",
        "type": "home_visit",
        "status": "completed",
        "baseFee": 850.0,
        "therapistSessionAmount": 700.0,
        "paymentStatus": "Paid"
      }
    ]
  }
  ```
- **Transformation Formula (Earnings Breakdown & Rollup):**
  ```dart
  double amount = a.therapistSessionAmount > 0 
      ? a.therapistSessionAmount 
      : a.baseFee;
  
  if (a.type.contains('home')) {
    breakdown['Home Visits'] += amount;
  } else if (a.type.contains('tele')) {
    breakdown['Telehealth'] += amount;
  } else if (a.type.contains('clinic')) {
    breakdown['Clinic Visits'] += amount;
  }
  ```

- **Transformation Formula (Month-over-Month Growth %):**
  ```dart
  double growthRate = 0.0;
  if (lastMonthEarnings > 0) {
    growthRate = ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100;
  } else if (thisMonthEarnings > 0) {
    growthRate = 100.0;
  }
  // Format with sign and precision: +12.5% or -4.2% or 0.0%
  ```

---

### 2.3. Patient Population & Attended Patients
- **Endpoint:** `POST /api/home/fetchNoOfPatientAttend`
- **Method:** `POST`
- **Payload:** `{"expert": "<userId>"}`
- **Response Schema:**
  ```json
  {
    "status": true,
    "data": {
      "uniquePatients": 0,
      "result": []
    }
  }
  ```
- **Mobile Field Binding:**
  - `uniquePatients` ➔ `DashboardScreen` Active Patients KPI card
  - `result` ➔ `PatientsDashboard` Patient directory

---

### 2.4. Referral Economy & Bonuses
- **Endpoint:** `POST /api/expert/fetchReferTherapist`
- **Method:** `POST`
- **Payload:** `{"expert": "<userId>"}`
- **Response Schema:**
  ```json
  {
    "status": true,
    "data": {
      "referrals": [],
      "totalEarnings": 0.0
    }
  }
  ```
- **Mobile Field Binding:**
  - `totalEarnings` ➔ `DashboardScreen` Bonuses KPI Card (`₹${state.totalReferralEarnings.toInt()}`)
  - `referrals.length` ➔ `DashboardScreen` Trend badge (`${state.appReferrals.length}`)

- **Endpoint:** `POST /api/patient/fetchReferPatients`
- **Method:** `POST`
- **Payload:** `{"expert": "<userId>"}`
- **Response Schema:**
  ```json
  {
    "status": true,
    "data": {
      "referrals": [],
      "totalEarnings": 0.0
    }
  }
  ```
- **Mobile Field Binding:**
  - `totalEarnings` ➔ `DashboardScreen` Referral Earnings KPI Card

---

### 2.5. Clinical Quality Index & Rankings
- **Endpoint:** `/api/app/profile/me` (Hydrated via `authProvider`)
- **Key Fields:**
  - `user.qaScoreAverage`: `double?` (Nullable average of clinical audit evaluations)
  - `user.cityRankPercentile`: `double?` (Nullable percentile within the registered city territory)
- **Zero & Null State Handling:**
  - If `user.qaScoreAverage == null`: Renders **`N/A`** with subtitle:
    > *"Awaiting clinical QA evaluation for territorial ranking."*
  - If `user.qaScoreAverage != null`: Renders formatted score (`${rating.toStringAsFixed(1)} / 5.0`).

---

### 2.6. Aries Arena Gamification & Quests
- **Endpoint:** `POST /api/app/gaming/profile`
- **Payload:** `{"userId": "<userId>"}`
- **Response Schema:**
  ```json
  {
    "success": true,
    "profile": {
      "coins": 0,
      "xp": 0,
      "level": 1,
      "streakDays": 0
    }
  }
  ```
- **Mobile Field Binding:**
  - `profile.coins` ➔ `TaskEconomyPage` Header Gold Coin Balance (truthfully defaults to `0`, not `250`).

- **Endpoint:** `GET /api/app/gaming/leaderboard/topic/:topicId`
- **Response Schema:**
  ```json
  {
    "success": true,
    "data": []
  }
  ```
- **Zero State Handling:**
  - If `data.isEmpty`: Renders trophy icon with message:
    > *"No records found. Be the first to claim the top spot!"*

---

## 3. ERROR HANDLING & RESILIENCE PROTOCOLS

1. **Authentication Expiration (401 Unauthorized):**
   - Intercepted by `ApiService`. Triggers silent refresh via `/api/auth/refresh-token`.
   - If refresh fails, cleans token cache and navigates to `LoginScreen`.
2. **Network Timeout / Unreachable Host:**
   - 10-second connect timeout, 15-second receive timeout.
   - Triggers `showGlassSnackBar(..., type: GlassSnackBarType.error)`.
   - Never populates fallback mock arrays on network error.
3. **Empty Data Collections:**
   - All lists check `.isEmpty` prior to rendering.
   - Guaranteed informative empty state widgets with consistent branding.
