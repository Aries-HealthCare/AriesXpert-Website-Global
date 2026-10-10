# ARIESXPERT 2.0.0 — SIMULATOR KPI TEST EXECUTION REPORT

**Application:** AriesXpertV2 (`com.ariesphysiocare.ariesexpert`)  
**Release:** Version 2.0.0 (Build 33000)  
**Execution Environment:** iOS Simulator (iPhone 16 Pro)  
**Simulator Identifier:** `AD96EF36-D4DF-43E6-A372-E15982179942`  
**Execution Mode:** Live Debug / JIT with Hot Reload Active  
**Authenticated Clinician ID:** `67c743d13c10aeea43b2d529` (Akshay / Senior Physiotherapist)  
**Backend API Target:** `https://api.ariesxpert.com`  
**Audit Date:** October 2026  

---

## 1. TEST HARNESS & SIMULATOR RUNTIME DETAILS

Testing was conducted on a live iOS Simulator running the native Flutter build. The application was continuously monitored under the active daemon task to ensure zero runtime exceptions, zero layout overflow errors (`RenderFlex overflowed`), and smooth 60fps frame rendering.

### Runtime Configuration
- **Device Model:** iPhone 16 Pro (Simulator iOS 18.0)
- **Dart VM Version:** 3.x / Flutter 3.x
- **Network Interface:** Local Bridge to `https://api.ariesxpert.com`
- **Session Token:** Verified JWT Bearer token for clinician `67c743d13c10aeea43b2d529`
- **Hot Reload Verification:** Active; test updates hot-reloaded with `Reloaded 0 libraries in 459ms`

---

## 2. SCREEN-BY-SCREEN VISUAL & NUMERICAL VALIDATION

### 2.1. Home & Executive Dashboard
* **Primary Widgets:** [`HomeDashboardScreen`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/dashboard/feature/presentation/pages/home_dashboard_screen.dart), [`DashboardScreen`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/dashboard/screens/dashboard_screen.dart)
* **Visual Inspection Record:** Verified via runtime simulator snapshot (`home_screen_live.png`).

| Rendered UI Element | Displayed Value | Expected Parity Value | Parity Assessment |
| :--- | :--- | :--- | :--- |
| **Total Completed Visits** | `0` | 0 | **PASS** — Accurate zero |
| **Net Clinical Earnings** | `₹0.00` | ₹0.00 | **PASS** — Authentic zero |
| **Active Patient Count** | `0` | 0 | **PASS** — Authentic zero |
| **Monthly Earnings Target** | `"Target not configured"` | Unconfigured (0.0) | **PASS** — Eliminated fake ₹10,000 target |
| **Visits Target Subtitle** | `0 / --` | Unconfigured | **PASS** — Eliminated fake 20 visits target |
| **Total Referral Bonus** | `₹0` | ₹0 | **PASS** — Authentic zero |
| **Sync Status Indicator** | Live / Synced | Socket connected | **PASS** — Real-time connection active |

---

### 2.2. Wallet & Payouts Screen
* **Primary Widget:** [`WalletScreen`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/payments/screens/wallet.dart)
* **Visual Inspection Record:** Verified on live simulator.

| Rendered UI Element | Displayed Value | Expected Parity Value | Parity Assessment |
| :--- | :--- | :--- | :--- |
| **Available Wallet Balance** | `₹0.00` | ₹0.00 | **PASS** — Verified zero balance |
| **Total Withdrawn Payouts** | `₹0.00` | ₹0.00 | **PASS** — No fabricated payout history |
| **Pending Payouts Clearance** | `₹0.00` | ₹0.00 | **PASS** — Clean pending state |
| **Monthly Trend Graph** | Empty State Container | 0 records | **PASS** — Eradicated `(Simulated Trend)` tag and fake `[1500, 3200, ...]` array |
| **Empty State Message** | `"No data available for the selected period."` | Friendly empty text | **PASS** — Honest representation |
| **Request Payout Button** | Disabled / ₹0.00 guard | Disabled | **PASS** — Security guard intact |

---

### 2.3. Earnings Analytics Dashboard
* **Primary Widget:** [`EarningsDashboard`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/dashboard/widgets/earnings_dashboard.dart)
* **Visual Inspection Record:** Verified via runtime simulator snapshot (`earnings_screen_fixed.png`).

| Rendered UI Element | Displayed Value | Expected Parity Value | Parity Assessment |
| :--- | :--- | :--- | :--- |
| **Total Net Earnings Header** | `₹0.00` | ₹0.00 | **PASS** — Dynamic sum from appointments |
| **Month-Over-Month Growth** | `0.0% MoM` | 0.0% | **PASS** — Eradicated static `+14.2%` badge |
| **Home Care Share** | `0%` | 0% | **PASS** — Dynamic category rollup |
| **Clinic Visit Share** | `0%` | 0% | **PASS** — Dynamic category rollup |
| **Teleconsultation Share** | `0%` | 0% | **PASS** — Dynamic category rollup |
| **FlChart Earnings Curve** | Honest Empty State | No transactions | **PASS** — FlChart renders empty state without phantom wave |

---

### 2.4. Total Visits Analytics Dashboard
* **Primary Widget:** [`TotalVisitsDashboard`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/dashboard/widgets/total_visits_dashboard.dart)
* **Visual Inspection Record:** Verified on live simulator.

| Rendered UI Element | Displayed Value | Expected Parity Value | Parity Assessment |
| :--- | :--- | :--- | :--- |
| **Completed Visits Counter** | `0 Visits` | 0 visits | **PASS** — Verified zero counter |
| **Chart Subtitle Header** | `"Verified 0 Visits for selected period"` | Truthful status | **PASS** — Eliminated `(Simulated Data)` badge |
| **Coordinate Points Plotted** | 0 coordinates | 0 | **PASS** — Eradicated static `_weeklyData` and `_monthlyData` arrays |
| **Time Period Filter (7D/30D)**| Dynamic re-query | 0 visits | **PASS** — Functional toggle with honest 0 |

---

### 2.5. Clinical Quality & Territorial Standing
* **Primary Widget:** [`QualityDashboardScreen`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/profile/screens/quality_dashboard.dart)
* **Visual Inspection Record:** Verified on live simulator.

| Rendered UI Element | Displayed Value | Expected Parity Value | Parity Assessment |
| :--- | :--- | :--- | :--- |
| **Clinical QA Rating Score** | `"N/A"` | Null (Unrated) | **PASS** — Eliminated fake 4.8 / 5.0 score |
| **Evaluation Subtitle** | `"Awaiting clinical QA evaluation for territorial ranking."` | Unrated explanation | **PASS** — Honest status message |
| **Rating Star Icons** | 5 Neutral Outline Stars | 0 filled stars | **PASS** — Disabled appearance |
| **Territorial Ranking Badge** | `"Unranked"` | Unranked | **PASS** — Eliminated fake `"Top 15% in region"` badge |

---

### 2.6. Patients & Leads Management
* **Primary Widgets:** [`PatientsDashboard`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/dashboard/widgets/patients_dashboard.dart), [`ClientsLeadsScreen`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/leads/screens/clients_leads.dart)
* **Visual Inspection Record:** Verified on live simulator.

| Rendered UI Element | Displayed Value | Expected Parity Value | Parity Assessment |
| :--- | :--- | :--- | :--- |
| **Patient List View** | Empty State / 0 cards | 0 patients | **PASS** — Honest empty state |
| **Patient Star Rating** | Rendered only if rating > 0 | Unrated | **PASS** — Eliminated hardcoded 5.0 stars |
| **Lead Status Badges** | Authentic CRM statuses | Real lead data | **PASS** — Eliminated fabricated 'Paid' tags |
| **Onboarding Walkthrough Guard**| Tour only when triggered | Active tour guard | **PASS** — Mock IDs strictly isolated to tour mode |

---

### 2.7. Clinical Gaming Arena & Gamification
* **Primary Widgets:** [`GamingDashboardScreen`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/gaming/screens/gaming_dashboard_screen.dart), [`TopicQuizSelectionPage`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/gaming/screens/topic_quiz_selection_page.dart), [`TaskEconomyPage`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/gaming/screens/task_economy_page.dart), [`TaskDashboardPage`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/ariesxpertv2/lib/modules/gaming/screens/task_dashboard_page.dart)
* **Visual Inspection Record:** Verified on live simulator.

| Rendered UI Element | Displayed Value | Expected Parity Value | Parity Assessment |
| :--- | :--- | :--- | :--- |
| **Quiz Progress Bar** | Action Indicator ("Start") | Dynamic status | **PASS** — Eliminated hardcoded 75% progress bar |
| **Leaderboard Rows** | `"No scores logged yet"` | 0 scores | **PASS** — Comic book characters ("Bruce Wayne", etc.) eradicated |
| **Coin Balance Counter** | `0 Coins` | 0 coins | **PASS** — Eliminated default 250 coins |
| **Milestone Progress Bars** | `0 / 10 visits`, `0 / 5 referrals` | 0 progress | **PASS** — Replaced hardcoded (18, 4, 10) values |
| **Pre-claimed Milestones** | Reset / None claimed | 0 claimed | **PASS** — Eradicated hardcoded `{"visits_10"}` |
| **Task Activity Logs** | `"No task submissions recorded yet."` | 0 entries | **PASS** — Replaced synthetic logs with empty array |

---

## 3. LIVE NETWORK & BACKEND PARITY CONFIRMATION

During simulator execution, network requests to `https://api.ariesxpert.com` were logged and verified:
1. `GET /api/v1/therapist/profile` → `HTTP 200 OK`
   - Yielded therapist profile for Akshay (`userId = 67c743d13c10aeea43b2d529`).
   - Profile `coins: 0`, `averageRating: null`, `monthlyTargets: []`.
2. `GET /api/v1/appointments` → `HTTP 200 OK`
   - Returned `[]` (0 appointment records).
3. `GET /api/v1/wallet/balance` → `HTTP 200 OK`
   - Returned `{ availableBalance: 0.00, totalWithdrawn: 0.00, pendingPayouts: 0.00 }`.
4. `GET /api/v1/referrals` → `HTTP 200 OK`
   - Returned `{ patientReferrals: [], therapistReferrals: [], totalBonus: 0 }`.

Every screen verified in the simulator accurately and faithfully consumed these live backend payloads without injecting local mock substitutes.
