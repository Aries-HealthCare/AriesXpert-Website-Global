# ORGANIC_PATIENT_ACQUISITION_ENGINE.md
## Maximum Organic Lead Generation Directive & Operational Acquisition Blueprint

> **Governing Mandate**: The primary KPI of the Aries PhysioCare platform is:  
> **QUALIFIED ORGANIC LEADS → CONSULTATIONS → APPOINTMENTS → PATIENTS**  
> Rankings, traffic, impressions, and page counts are strictly intermediate metrics.

---

### 1. Primary Growth Funnel Architecture

Every organic landing page and SEO asset is engineered to drive users through this measurable, high-trust acquisition funnel:

```
Organic Search Visibility (Demand Capture)
        ↓
Relevant High-Intent Traffic (Locality & Service Relevance)
        ↓
High-Intent Landing Page (Above-The-Fold Clarity: What, Where, Who, Action)
        ↓
Trust & Clinical E-E-A-T (Verified Credentials, Real Clinicians, Clear Reviews)
        ↓
Frictionless CTA Engagement (Phone, WhatsApp, 2-Step Form)
        ↓
1. Lead Created (`lead_created`)
        ↓
2. Lead Qualified (`lead_qualified` via clinical triage)
        ↓
3. Consultation Scheduled (`consultation_scheduled`)
        ↓
4. Bedside/In-Clinic Appointment Completed (`appointment_completed`)
        ↓
5. Patient Converted (`patient_converted` / Revenue Recognized)
```

---

### 2. Search Demand Graph & Intent Ownership

We capture legitimate patient search demand across 5 distinct intent archetypes:

```
                      SEARCH DEMAND GRAPH
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
Service Intent          Location Intent         Condition Intent
"home physiotherapy"    "physiotherapy in       "sciatica physiotherapy
"sports physio"          andheri east"           exercises"
"post-op rehab"         "clinic near borivali"  "back pain recovery"
       │                       │                       │
       └───────────────────────┼───────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
Practitioner Intent                             Clinic Intent
"dr kajal vora physiotherapist"                "aries physiocare clinic"
"neuro physio near me"                         "walk-in physiotherapy centre"
```

#### Intent Routing Rules:
1. **Commercial Local Intent** (`"physiotherapy in andheri east"`) → `/services/physiotherapy/mumbai/andheri-east`
2. **Clinical Informational Intent** (`"what causes sciatica"`) → `/conditions/sciatica`
3. **Physical Center Intent** (`"physiotherapy clinic in borivali"`) → `/locations/mumbai/aries-physiocare-expert-physiotherapy-wellness-center-borivali`
4. **Practitioner Reputation Intent** (`"dr kajal vora"`) → `/physiotherapists/dr-kajal-vora`

---

### 3. Service × Condition × Location Controlled Matrix

We build a structured matrix to map search demand without creating doorway or thin-content pages:

```
[Service: Physiotherapy] 
  × [Condition: Sciatica | Stroke Rehab | Post-Knee Replacement]
  × [City: Mumbai | Pune | Bangalore]
  × [Area: Andheri East | Bandra West | Koramangala]
```

#### Mandatory Candidate URL Hard Gates:
Before any programmatic matrix URL is published or indexed, it must pass the **6 Hard Gates**:
1. **Real Service**: Genuinely performed by Aries PhysioCare clinicians.
2. **Real Location**: Genuinely serviced within 30 minutes transit dispatch or physical clinic walk-in.
3. **Operational Availability**: Active booking slots and verified therapists on record.
4. **Unique User Value**: Locality-specific transport guidance, nearby hospital coordination, tailored clinical FAQs.
5. **No Duplication**: Substantially differentiated from parent city and sibling locality pages.
6. **Verified Trust Data**: Authentic degrees, council credentials, and genuine patient feedback.

---

### 4. Above-the-Fold High-Intent Page Layout

Every commercial service and physical clinic landing page must answer 5 critical patient questions above the fold:

```
┌────────────────────────────────────────────────────────────────────────┐
│  WHAT:   Expert Home Physiotherapy & Rehabilitation                    │
│  WHERE:  Bedside Care in Andheri East, Mumbai                          │
│  WHO:    Dr. Kajal Vora, PT (MPT Neuro) & Certified Specialists        │
│  WHY:    Hospital-Grade Portable Modalities (IFT/Ultrasound), Same-Day │
│  ACTION: [ Book Bedside Visit ]   [ Call Specialist ]   [ WhatsApp ]   │
└────────────────────────────────────────────────────────────────────────┘
```

* **No Buried Actions**: Primary conversion buttons (`Call`, `WhatsApp`, `Book`) must be visible without scrolling on both desktop and mobile.
* **Sticky Mobile Floating Action Bar**: Immediate access to one-tap calling and pre-filled WhatsApp consultation.

---

### 5. Context-Aware Lead Ingestion Architecture

When a patient clicks a CTA on `/services/physiotherapy/mumbai/andheri-east`, the conversion funnel automatically ingests the full context:

```typescript
// Lead context automatically populated in form and CRM
const leadContext = {
  service: "Physiotherapy",
  city: "Mumbai",
  area: "Andheri East",
  source: "Organic Search",
  landingPage: "https://www.ariesphysiocare.com/services/physiotherapy/mumbai/andheri-east",
  attribution: getStoredAttribution() // UTM, GCLID, Referrer from first-party cookie
};
```

#### Dynamic WhatsApp Contextual Greeting:
The system dynamically compiles high-converting personalized greetings via `buildContextualWhatsAppUrl()`:
> *"Hello Aries PhysioCare, I am looking for expert Physiotherapy in Andheri East, Mumbai. Please share consultation availability."*

---

### 6. Organic Market Coverage Dashboard Matrix

This table serves as the primary operational matrix for identifying acquisition gaps and optimizing conversion:

| Service Cluster | Target City | Target Locality | Primary Search Intent | Canonical Target URL | Index Tier | Active Specialists | Conversion Actions | Primary Goal |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- |
| **Physiotherapy** | Mumbai | Andheri East | Local Home Visit | `/services/physiotherapy/mumbai/andheri-east` | Tier A | 3 Verified | Call, WA, Modal | Patient Booking |
| **Physiotherapy** | Mumbai | Borivali West | Walk-in Clinic & Home | `/locations/mumbai/borivali-clinic` | Tier A | 2 Verified | In-Clinic Visit | Clinic Consult |
| **Physiotherapy** | Mumbai | Bandra West | Bedside Orthopedic | `/services/physiotherapy/mumbai/bandra-west` | Tier A | 2 Verified | Call, WA, Modal | Patient Booking |
| **Physiotherapy** | Mumbai | Colaba | Bedside Neuro/Geriatric | `/services/physiotherapy/mumbai/colaba` | Tier A | 2 Verified | Call, WA, Modal | Patient Booking |
| **Physiotherapy** | Bangalore | Koramangala | Tech-Ergonomic & Sports | `/services/physiotherapy/bangalore/koramangala` | Tier A | 2 Verified | Call, WA, Modal | Patient Booking |
| **Physiotherapy** | Pune | Kothrud | Post-Surgical Bedside | `/services/physiotherapy/pune/kothrud` | Tier A | 1 Verified | Call, WA, Modal | Patient Booking |

---

### 7. Lead Loss & Funnel Regression Detection Heuristics

The analytics system actively monitors conversion efficiency to prevent "traffic increases with zero revenue":

| Signal / Anomaly Detected | Probable Funnel Bottleneck | Automated Engineering Remediation |
| :--- | :--- | :--- |
| **Traffic ↑ but Leads ↓** | Mismatched search intent or weak above-the-fold CTA. | Restructure hero section: move CTA above fold, clarify locality and pricing. |
| **Leads ↑ but Qualified Leads ↓** | Out-of-zone inquiries or low-intent triage drop-off. | Add pincode/area autocomplete filter on step 1 of lead form. |
| **CTA Clicks ↑ but Form Submissions ↓** | High form friction, complex steps, or broken validation. | Simplify wizard form to 2 steps: Name + Phone + Preferred Time. |
| **WhatsApp Clicks ↑ but Conversations ↓** | Generic pre-filled message without clear question. | Deploy contextual greeting specifying patient locality and condition. |
| **Phone Clicks ↑ but Appointments ↓** | Slow clinic callback or unmonitored off-hours calling. | Display dynamic clinic operating hours and offer instant WhatsApp fallback. |

---

### 8. Absolute Engineering Priority Order

When making development, UX, or SEO decisions, this priority order is strictly enforced:

```
1. Patient Safety & Medical Ethics
   ↓
2. Healthcare Accuracy & YMYL Responsibility
   ↓
3. Genuine Standalone User Value
   ↓
4. Correct Search Intent Alignment
   ↓
5. Technical Crawlability & SSR Integrity
   ↓
6. Local Relevance & Entity Verification
   ↓
7. Clinical Trust & E-E-A-T (Verified Clinicians)
   ↓
8. Organic Search Visibility
   ↓
9. Conversion Rate Optimization (CRO)
   ↓
10. Lead Quality (Qualified Patient Inquiries)
   ↓
11. Appointment Completion
   ↓
12. Revenue Realization
   ↓
13. Geographic Scale
```

*Never compromise patient safety, clinical accuracy, or user trust to artificially manufacture rankings or raw lead volume.*
