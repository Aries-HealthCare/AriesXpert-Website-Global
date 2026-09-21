# DEEP DIVE 02: BOT INVENTORY, FEATURE MATRICES & ROLE JOURNEYS

## 1. Complete Bot Inventory

A thorough audit of the code identifies **10 specialized bot personas and automated subsystems**:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 1. PATIENT CARE & TRIAGE BOT                                                                │
├────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ Primary Class      │ AriesWhatsAppOrchestrator (src/modules/whatsapp-os)                    │
│ Audience           │ Registered patients with active packages or booking history            │
│ Trigger            │ Inbound text from recognized patient phone                             │
│ Primary Functions  │ Appointment status, rescheduling, cancellation, therapist ETA, feedback│
│ Status             │ WORKING (Production Active)                                            │
└────────────────────┴────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 2. LEAD QUALIFICATION & INTAKE BOT                                                          │
├────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ Primary Class      │ AriesWhatsAppOrchestrator + LeadService (src/adminModule/crm)          │
│ Audience           │ Unregistered senders, click-to-WhatsApp ad leads, website inquirers    │
│ Trigger            │ Inbound "Hi" or unknown phone number                                   │
│ Primary Functions  │ Welcome greeting, clinical specialty triage, city/area selection, CRM  │
│ Status             │ WORKING (Production Active)                                            │
└────────────────────┴────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 3. THERAPIST DISPATCH & FIELD COORDINATOR                                                   │
├────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ Primary Class      │ ActionEngineService (src/modules/whatsapp-os)                          │
│ Audience           │ Verified clinicians in TherapistModel / ExpertModel                    │
│ Trigger            │ Job broadcast event, interactive button clicks                         │
│ Primary Functions  │ Job broadcast, btn_th_accept, btn_th_reject, session start/complete     │
│ Status             │ PARTIAL (Dispatched successfully; lacks multi-user race lock)          │
└────────────────────┴────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 4. DOCTOR & MEDICAL REFERRAL BOT                                                            │
├────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ Primary Class      │ AriesIdentityResolver + DoctorReferralService                          │
│ Audience           │ Orthopedic surgeons, physicians, clinic receptionists                  │
│ Trigger            │ Text pattern: "REFER: [Name], [Phone], [Notes]"                        │
│ Primary Functions  │ Automated lead ingestion with referral tracking, status lookup         │
│ Status             │ PARTIAL (Lead ingestion works; PDF commission statements unbuilt)      │
└────────────────────┴────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 5. VIRTUAL CLINIC RECEPTIONIST ("ARIA")                                                     │
├────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ Primary Class      │ WhatsAppReceptionistAgent (src/aiModule/services)                      │
│ Audience           │ Inbound patient scheduling inquiries                                   │
│ Trigger            │ "Book appointment", "Need physio in Indiranagar"                       │
│ Primary Functions  │ Live MongoDB calendar slot checking, natural language slot suggestion  │
│ Status             │ WORKING (Production Active)                                            │
└────────────────────┴────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 6. MULTIMODAL CLINICAL AI BUDDY (11 PERSONAS)                                               │
├────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ Primary Class      │ WhatsappAIBuddyEngine (src/aiModule/services)                          │
│ Audience           │ Patients seeking condition advice, rehabilitation information          │
│ Trigger            │ Complex medical questions, symptom inquiries                           │
│ Primary Functions  │ RAG vector search via Qdrant, red-flag safety sentinel, clinical triage│
│ Status             │ WORKING (Production Active)                                            │
└────────────────────┴────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 7. CONVERSATIONAL SALES & OPS BENCHMARK ENGINE                                              │
├────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ Primary Class      │ WhatsAppActionEngine (src/modules/whatsapp-ops)                        │
│ Audience           │ E2E automated test harness, operational simulation                     │
│ Trigger            │ Hardcoded test phone numbers (PHONE_ROLE_DIRECTORY)                    │
│ Primary Functions  │ Mock OTP ("8492"), mock wallet balance ("₹4,850"), mock UPI references │
│ Status             │ SEMI-MOCK (Testing Sandbox / Benchmark)                                │
└────────────────────┴────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 8. EXECUTIVE NOTIFICATION BOT                                                               │
├────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ Primary Class      │ ExecutiveNotificationRoutes (src/adminModule/executiveNotification)    │
│ Audience           │ Aries Founders, Operations Directors, Clinical Leads                   │
│ Trigger            │ VIP leads, large package payments, emergency clinical escalations      │
│ Primary Functions  │ Real-time operational summary alerts dispatched to executive phones    │
│ Status             │ WORKING (Production Active)                                            │
└────────────────────┴────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 9. FINANCIAL & PAYMENT REMINDER BOT                                                         │
├────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ Primary Class      │ PaymentReminderJob (src/cronModule/cron.jobs.registry.ts)              │
│ Audience           │ Patients with overdue invoices or outstanding payment balances         │
│ Trigger            │ Daily automated cron at 8:00 AM (Day 1, Day 3, Day 7 intervals)        │
│ Primary Functions  │ Invoice details summary + dynamic Razorpay payment links via WhatsApp  │
│ Status             │ WORKING (Production Active)                                            │
└────────────────────┴────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 10. VISUAL WORKFLOW CANVAS RUNNER                                                           │
├────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ Primary Class      │ WhatsappHTTPRunnerService (src/adminModule/whatsapp)                   │
│ Audience           │ Admin-configured multi-step marketing and engagement campaigns         │
│ Trigger            │ Admin campaign dispatch or custom automation rules                     │
│ Primary Functions  │ Evaluates ReactFlow visual graphs stored in WhatsappFlowModel          │
│ Status             │ PARTIAL (Executes graphs, but not hooked to real-time inbound triggers)│
└────────────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Role-Based Feature Matrix

| Functional Capability | Patient | Lead | Therapist | Doctor | Receptionist | Admin |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Welcome / Triage Greeting** | ✅ WORKING | ✅ WORKING | ⚪ N/A | ⚪ N/A | ⚪ N/A | ⚪ N/A |
| **Clinical Symptom Inquiries (AI RAG)**| ✅ WORKING | ✅ WORKING | ⚪ N/A | ⚪ N/A | ⚪ N/A | ⚪ N/A |
| **Appointment Booking (Clinic/Home)** | ✅ WORKING | ✅ WORKING | ⚪ N/A | ⚪ N/A | ⚪ N/A | ⚪ N/A |
| **Appointment Rescheduling / Cancel** | ✅ WORKING | ⚪ N/A | ⚪ N/A | ⚪ N/A | ⚪ N/A | ✅ WORKING |
| **Therapist Job Broadcast Notification**| ⚪ N/A | ⚪ N/A | ✅ WORKING | ⚪ N/A | ⚪ N/A | ⚪ N/A |
| **Interactive Job Accept/Decline** | ⚪ N/A | ⚪ N/A | 🟡 PARTIAL | ⚪ N/A | ⚪ N/A | ⚪ N/A |
| **Check-in / Complete Session Buttons**| ⚪ N/A | ⚪ N/A | ✅ WORKING | ⚪ N/A | ⚪ N/A | ⚪ N/A |
| **Structured Patient Referral Ingestion**| ⚪ N/A | ⚪ N/A | ⚪ N/A | ✅ WORKING | ✅ WORKING | ⚪ N/A |
| **Referral Patient Status Lookup** | ⚪ N/A | ⚪ N/A | ⚪ N/A | ✅ WORKING | ✅ WORKING | ⚪ N/A |
| **Doctor Commission Ledger via PDF** | ⚪ N/A | ⚪ N/A | ⚪ N/A | ⚪ NOT BUILT| ⚪ NOT BUILT| ⚪ N/A |
| **Dynamic Payment Link Delivery** | ✅ WORKING | ✅ WORKING | ⚪ N/A | ⚪ N/A | ⚪ N/A | ✅ WORKING |
| **Automated Reminders (24h/2h/30m)** | ✅ WORKING | ⚪ N/A | ✅ WORKING | ⚪ N/A | ⚪ N/A | ⚪ N/A |
| **Automated Overdue Invoices (Day 1/3/7)**| ✅ WORKING | ⚪ N/A | ⚪ N/A | ⚪ N/A | ⚪ N/A | ⚪ N/A |
| **Human Takeover / Agent Escalation** | ✅ WORKING | ✅ WORKING | ⚪ N/A | ⚪ N/A | ⚪ N/A | ✅ WORKING |
| **Executive Real-time Alerts** | ⚪ N/A | ⚪ N/A | ⚪ N/A | ⚪ N/A | ⚪ N/A | ✅ WORKING |

---

## 3. End-to-End User Journeys

### A. The Patient Journey
1. **Initiation:** Patient taps a WhatsApp link from Google Search, Instagram ad, or sends "Hi" directly.
2. **Identification:** `AriesIdentityResolver` queries `PatientModel`. If found, greets by first name and displays active treatment status. If new, creates a `LeadModel` record and initiates medical intake.
3. **Clinical Triage:** The patient describes their condition (e.g., *"Recovering from ACL surgery in Koramangala"*). The bot checks safety red flags, confirms availability, and offers Home Visit or Clinic Consultation.
4. **Scheduling:** Aria Receptionist Agent presents available morning and evening slots. Upon selection, an appointment is provisioned in `AppointmentModel`.
5. **Reminders & Delivery:** Automated BullMQ cron jobs dispatch WhatsApp alerts at T-24h, T-2h, and T-30m with therapist name, live ETA, and home address confirmation.
6. **Billing & Feedback:** Post-session, an automated Razorpay payment link and patient satisfaction rating prompt are delivered.

### B. The Therapist Journey
1. **Onboarding:** Therapist registered in `TherapistModel` with geographic operating zones and clinical specialties.
2. **Dispatch Alert:** When a matching home visit is scheduled, an outbound WhatsApp notification is broadcast to the therapist containing appointment time, patient locality, and condition.
3. **Interactive Actions:**
   - `[Accept Lead]` (`btn_th_accept`): Assigns appointment to clinician.
   - `[Decline]` (`btn_th_reject`): Re-broadcasts to alternate clinicians.
4. **Session Execution:**
   - `[Start Travel]` (`btn_th_start`): Triggers an automated WhatsApp ETA alert to the patient.
   - `[Arrived / Check-in]`: Updates session timestamp in database.
   - `[Session Completed]` (`btn_th_complete`): Prompts clinician for clinical visit notes and triggers automated patient review collection.

### C. The Doctor & Receptionist Referral Journey
1. **Identification:** Senders whose phone number matches `DoctorModel` bypass general lead triage.
2. **Referral Submission:** Doctor sends: `REFER: Rajesh Kumar, 9876543210, Post-Op Total Knee Replacement`.
3. **Automated Processing:**
   - Extracts patient name, phone number, and clinical notes via regex.
   - Creates a linked `LeadModel` record tagged with `referredByDoctorId`.
   - Dispatches a personalized WhatsApp notification to the patient mentioning their doctor's referral.
   - Replies to the doctor with a confirmation and unique Referral Tracking ID.
4. **Status Checking:** Doctor texts `"Status"`; bot returns active session count and recovery stage of all referred patients.
