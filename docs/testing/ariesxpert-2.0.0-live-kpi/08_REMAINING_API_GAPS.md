# ARIESXPERT 2.0.0 — BACKEND API GAPS & ARCHITECTURAL RECOMMENDATIONS

**Application:** AriesXpertV2 (`com.ariesphysiocare.ariesexpert`)  
**Target Release:** 2.0.0 (Build 33000)  
**Backend API Target:** `https://api.ariesxpert.com`  
**Reference System:** AriesXpert Admin Dashboard  
**Audit Date:** October 2026  

---

## 1. CONTEXT & OBJECTIVE

Following the complete eradication of mock, simulated, and synthetic data across the AriesXpert 2.0.0 mobile client, all 38 KPI controls now bind strictly to live REST APIs or display honest zero/unavailable states.

While the mobile application is 100% resilient and truthfully represents the exact current state of the backend database, several high-value clinical and financial features currently display honest `"N/A"` or `"Target not configured"` because dedicated backend calculation endpoints or self-service configuration APIs have not yet been exposed by the server.

This document outlines the identified backend gaps, their current mobile client behavior, and specific REST API enhancements recommended for the backend engineering team.

---

## 2. IDENTIFIED BACKEND API GAPS & RECOMMENDATIONS

### 2.1. Dedicated Territorial Ranking & Percentile Service
* **Current Mobile Behavior:**
  - When `user.qaScore` is null, the app displays `"N/A"`, outline stars, and an informative badge stating: `"Awaiting clinical QA evaluation for territorial ranking."`
* **Underlying Backend Gap:**
  - The backend lacks an endpoint to calculate and retrieve a clinician's percentile standing within their operational city or territory (e.g., Bengaluru South, Mumbai Central).
  - Previously, the mobile app masked this missing endpoint by displaying a hardcoded `"Top 15% in your region"`.
* **Recommended API Enhancement:**
  - **Endpoint:** `GET /api/v1/therapist/rankings/territorial`
  - **Expected Response Payload:**
    ```json
    {
      "success": true,
      "data": {
        "territoryName": "Bengaluru Urban",
        "therapistRank": 14,
        "totalTherapistsInTerritory": 92,
        "percentile": 84.8,
        "clinicalScore": 4.62,
        "minimumSessionsRequired": 5,
        "sessionsCompleted": 0,
        "isRanked": false,
        "unrankedReason": "Insufficient verified sessions (0/5 completed)"
      }
    }
    ```

---

### 2.2. Clinician Self-Service Monthly Target Configuration
* **Current Mobile Behavior:**
  - When `user.monthlyTargets` is empty, the mobile dashboard truthfully displays `"Target not configured"` and `0 / --` visits.
* **Underlying Backend Gap:**
  - Targets are currently configured exclusively via direct administrative database updates or the Admin Dashboard. There is no mobile-accessible endpoint allowing therapists to establish or update their own monthly earnings and visit targets.
  - Previously, the mobile app masked this by falling back to a hardcoded `10000.0` target.
* **Recommended API Enhancement:**
  - **Endpoint:** `PUT /api/v1/therapist/targets/monthly`
  - **Request Payload:**
    ```json
    {
      "month": "2026-10",
      "earningsTarget": 35000.00,
      "visitsTarget": 25
    }
    ```
  - **Expected Response:** Updated target object with HTTP 200 OK.

---

### 2.3. Server-Side Financial Analytics & Pre-Calculated Rollups
* **Current Mobile Behavior:**
  - The mobile client performs dynamic in-memory rollups across `List<AppointmentModel>` to derive Home Care vs Clinic vs Teleconsultation breakdowns and month-over-month (MoM) growth rates.
* **Underlying Backend Gap:**
  - While client-side calculation is completely accurate for small-to-moderate appointment volumes, clinicians with hundreds of historical visits across multiple years will incur unnecessary mobile CPU cycles and memory overhead parsing large arrays.
* **Recommended API Enhancement:**
  - **Endpoint:** `GET /api/v1/therapist/analytics/breakdown?period=current_month`
  - **Expected Response Payload:**
    ```json
    {
      "success": true,
      "data": {
        "period": "2026-10",
        "totalGross": 0.00,
        "totalNet": 0.00,
        "momGrowthPercentage": 0.0,
        "categories": {
          "homeCare": { "amount": 0.00, "percentage": 0.0, "visits": 0 },
          "clinic": { "amount": 0.00, "percentage": 0.0, "visits": 0 },
          "teleconsult": { "amount": 0.00, "percentage": 0.0, "visits": 0 }
        },
        "dailyTrends": []
      }
    }
    ```

---

### 2.4. Real-time WebSocket Push for Wallet Balance & Payout Status
* **Current Mobile Behavior:**
  - The mobile app fetches `walletBalanceProvider` via REST polling on view navigation and manual pull-to-refresh.
* **Underlying Backend Gap:**
  - When an administrator approves or clears a payout in the Admin Dashboard, the mobile app does not update in real time unless the therapist leaves and re-enters the Wallet screen or triggers a manual refresh.
* **Recommended API Enhancement:**
  - Broadcast wallet state transitions over the existing WebSocket gateway:
    - Event: `wallet:balance_updated` → `{ newBalance: 12500.00, availableBalance: 12500.00 }`
    - Event: `payout:status_changed` → `{ payoutId: "pay_123", status: "Cleared", amount: 5000.00 }`
  - Allows Riverpod's `walletBalanceProvider` to reactively update without HTTP polling.

---

### 2.5. Automated Clinical QA Evaluation Engine
* **Current Mobile Behavior:**
  - Displays `"N/A"` awaiting manual admin evaluation.
* **Underlying Backend Gap:**
  - No automated background pipeline currently aggregates patient satisfaction survey scores, documentation on-time rates, and clinical outcome metrics into a unified `qaScore`.
* **Recommended API Enhancement:**
  - Implement a backend event listener on `appointment:completed` and `review:submitted` to recalculate the clinician's composite QA score automatically.

---

## 3. SUMMARY ROADMAP FOR BACKEND TEAM

| Priority | Enhancement | Estimated Backend Effort | Mobile Impact Upon Release |
| :---: | :--- | :---: | :--- |
| **P1** | Self-Service Monthly Target API (`PUT /targets`) | 1-2 Days | Enables therapists to customize monthly goals directly in-app |
| **P2** | Pre-Calculated Analytics Endpoint (`GET /analytics/breakdown`) | 2-3 Days | Accelerates dashboard render performance for high-volume accounts |
| **P2** | WebSocket Wallet Event Broadcasts | 1 Day | Instantaneous payout status synchronization across devices |
| **P3** | Dedicated Territorial Ranking API (`GET /rankings/territorial`) | 3-4 Days | Converts `"Unranked"` into live regional percentiles |
| **P3** | Automated QA Scorecard Engine | 4-5 Days | Eliminates reliance on manual admin database entry |
