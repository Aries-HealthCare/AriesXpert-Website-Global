# MASTER SEO & ORGANIC LEAD GENERATION IMPLEMENTATION PROMPT
## Aries PhysioCare Healthcare Ecosystem (India & International)

> **Status**: LOCKED & FINALIZED  
> **Target Production Codebase**: `AriesXpert-Website-India` (Next.js App Router, TypeScript, Tailwind CSS)  
> **Governing Specifications**: Consolidated from 9 Architecture Blueprints (`docs/seo/`) and Approved Decisions (DEC-01 to DEC-15).

---

## 1. System Identity & Architectural Mandate

You are acting as the **Principal Technical SEO Architect, Next.js Systems Engineer, and Healthcare Clinical Governance Lead** for **Aries PhysioCare** (Aries HealthCare International Pvt Ltd).

Your objective is to implement a high-converting, medically compliant (YMYL), and technically flawless organic search and lead generation system across India and future international deployments.

### Guiding Principles:
1. **Clinical & Operational Reality Over Algorithm Chasing**: Never publish, index, or mark up clinical or geographic entities that do not exist in reality.
2. **Concise, Predictable URL Taxonomy**: Public URLs are structured for patient clarity and high search intent. Internal geographic models remain deep in the database and decoupled from URLs.
3. **Hard Gates Over Formulas**: Indexation is governed strictly by operational verification and independent user value, never an arbitrary mathematical score.
4. **Clean SSR & Performance Boundaries**: Server Components are used to deliver complete initial content and metadata; interactive funnels remain client islands. SSR is not confused with SEO.

---

## 2. Canonical Public URL Architecture

The public URL hierarchy is strictly divided into distinct namespaces based on patient search intent:

```
https://www.ariesphysiocare.com/
│
├── services/
│   ├── physiotherapy                                 # National Service Hub
│   ├── physiotherapy/mumbai                          # City Commercial Service Hub
│   └── physiotherapy/mumbai/andheri-east             # Locality High-Intent Service
│
├── conditions/
│   ├── sciatica                                      # Clinical Condition Management Guide
│   ├── back-pain                                     # Evidence-Based Rehabilitation
│   └── neck-pain                                     # Multi-Stage Recovery Protocol
│
├── locations/
│   ├── mumbai                                        # City Clinics & Dispatch Directory
│   └── mumbai/andheri-clinic                         # Brick-and-Mortar Walk-In Physical Center
│
├── physiotherapists/
│   ├── index                                         # Verified Medical Team Directory
│   └── [verified-practitioner-slug]                  # Practitioner Bio, Qualifications & Reviews
│
├── blogs/
│   └── [editorial-article-slug]                      # Editorial Health & Wellness Articles
│
├── about                                             # Corporate & Clinical Leadership
├── contact                                           # Inquiries & Headquarter Details
├── book-appointment                                 # Full Interactive Funnel (noindex, follow)
└── free-tele-consultation                            # Triage & Consultation Funnel (noindex, follow)
```

### Critical Separation: Database Hierarchy vs. Public URLs
* **Internal Database Model**: `Country → State/Province → District/Metro → City → Postal Zone → Locality → Clinic Hub/Dispatch Zone`.
* **Public Patient URLs**: Max 3 levels deep for local services: `/services/[service]/[city]/[area]`. State/Province is never exposed in patient URLs by default.

---

## 3. The `/locations` vs. `/services` Guardrail

To prevent keyword cannibalization and thin landing-page proliferation:

* **`/locations`** is the physical directory answering:  
  **"Where are Aries PhysioCare's actual physical clinics, walk-in centers, and operational dispatch hubs?"**  
  * Emits: `MedicalClinic` schema with physical street address, geo-coordinates, telephone, and walk-in consultation hours.  
  * Requires: Real physical lease/ownership, physical signage, and dedicated on-premise staff.  
  * Guardrail: `/locations` must **never** become an automated SEO landing-page generator.

* **`/services/[service]/[city]/[area]`** answers:  
  **"Can I obtain this particular clinical service delivered at home or at my bedside in this locality?"**  
  * Emits: `HealthcareService` schema with `serviceType: "Physiotherapy"`, `areaServed: "Andheri East"`, and `availableChannel: "HomeVisitService"`.  
  * Guardrail: If a locality does not have a physical clinic and is served by mobile dispatch, it belongs exclusively under `/services/...`, not `/locations/...`. If there is not enough genuine distinction between a physical clinic hub and a locality service page, **consolidate rather than index both**.

---

## 4. Multi-Factor Indexation Governance & Canonical Rules

A page existing in the database or being dynamically constructible does **NOT** warrant indexation.

### The Index Eligibility Hard Gates
A page is classified as **Tier A (Indexable)** ONLY when it satisfies all six mandatory Hard Gates:

```
INDEXABLE (Tier A) = 
    Valid Active Entity in Database
    AND Genuine Service Availability in Locality
    AND Verified Practitioner or Physical Center on Record
    AND Sufficient Independent User Value (Substantive, Non-Boilerplate Content)
    AND No Doorway / Duplicate / Thin-Content Characteristics
    AND Page is Demonstrably Useful as a Standalone Search Result
    AND All Factual Clinical Data Verified from Primary Authoritative Sources
```

### Secondary Prioritization Scoring
The internal score (Practitioner Coverage 35%, Facility 25%, Local Context 20%, Operational Capacity 20%) is an **internal prioritization and monitoring signal only** (for crawl priority, internal linking weight, and content enhancement queues). It is **never** presented as a Google scoring formula, and a score of 75% never automatically overrides the Hard Gates.

### Tier Classification & Canonical Governance Matrix

| Tier | Definition | HTTP Status | Robots Directive | XML Sitemap | Canonicalization Rule |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **Tier A** | High Independent Value. Passes ALL Hard Gates. | `200 OK` | `index, follow` | **YES** | **Self-referential canonical** |
| **Tier B** | Low Standalone Search Value. Serviceable via adjacent hub, but lacks unique standalone search value. Distinct URL for users. | `200 OK` | `noindex, follow` | **NO** | **Self-referential canonical OR no canonical** (Do NOT automatically canonicalize to parent city unless the page is genuinely an alternate/duplicate representation) |
| **Tier C** | Invalid / Unserviced Locality or non-existent entity. | `404 Not Found` | N/A | **NO** | None |
| **Tier D** | Legacy URL, casing variation, trailing-slash inconsistency. | `301 Moved Permanently` | Follow header | **NO** | 1:1 Single-hop redirect to Canonical |
| **Tier E** | Permanently Retired Clinic or discontinued service. | `410 Gone` | `noindex, nofollow` | **NO** | None (Clean drop from Google index) |

---

## 5. Healthcare E-E-A-T & Structured Data Semantics

### Practitioner Schema: Accurate Role Semantics
* **Do Not Force Physiotherapists into `Physician`**: A physiotherapist is not a medical doctor / Physician in Schema.org semantics.
* In Schema.org, physiotherapists must be modeled as:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Kajal Vora, PT",
    "jobTitle": "Consultant Physiotherapist - Neurology",
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Physiotherapist",
      "occupationalCategory": "Healthcare Practitioner"
    },
    "worksFor": {
      "@type": "MedicalOrganization",
      "@id": "https://www.ariesphysiocare.com/#organization"
    }
  }
  ```
* **Strict Prohibition of Mock Credentials**:
  > [!CAUTION]
  > Never use example credential data from architecture documentation (such as `"MH-OTPT-1249"`) as placeholder or production data. Only authentic credentials verified against statutory state council registers may be published in markup or on page.

### Clinical Content & Medical Reviewer Model
* Every condition guide (`/conditions/[conditionSlug]`) requires an explicit editorial byline:
  * **Author**: Editorial Staff / Clinical Writer (`@type: "Organization"` or `"Person"`).
  * **Medical Reviewer (`reviewedBy`)**: Verified specialist (`@type: "Person"`) with a direct link to their `/physiotherapists/[slug]` profile.
  * **Dynamic Review Date (`lastReviewed`)**: Must be dynamically maintained from actual CMS/Firestore content revision records. **Never allow stale, hardcoded review dates.**
  * **Clinical Evidence (`citation`)**: Cite authoritative medical journals and peer-reviewed studies (e.g., *PubMed*, *Cochrane*, *Lancet*, *Bone & Joint Journal*).

### Schema Integrity Guardrails
* **Zero Empty Nodes**: Never emit empty objects like `geo: { "@type": "GeoCoordinates" }`. If coordinates or postal codes are unavailable, omit the property entirely.
* **No Illegitimate Storefronts**: Never emit `LocalBusiness` for mobile/home visit services without a verified walk-in clinic address.

---

## 6. Server-Side Rendering (SSR) & Component Boundaries

### Principle: Do Not Confuse SSR with SEO
* **Use Server Components where they improve initial content availability, metadata, performance, and reliability.**
* **Do not force every component to become server-rendered merely for SEO.**
* Interactive components (booking modals, phone number validators, OTP inputs, multi-step booking flows) can and should remain client-side islands (`'use client'`).

### Component Architecture:
* **`page.tsx` is always an Async Server Component**:
  * Emits `generateMetadata()` with dynamic canonicals, openGraph, and robots directives.
  * Injects server-rendered JSON-LD `<script type="application/ld+json">`.
  * Renders semantic HTML: `<article>`, `<section>`, `<nav aria-label="Breadcrumb">`, headings `<h1>-<h6>`, lists `<ul>`/`<ol>`, and verified clinician cards.
* **Interactive UI Islands**:
  * `<BookAppointmentButton />`: Client component opening the booking modal.
  * `<LeadEnquiryModal />`: Client component receiving pre-populated location/service context.
  * `<PhoneInput />` / `<OtpVerification />`: Client components managing form state.

---

## 7. Conversion Attribution & Full Downstream Patient Lifecycle

Do not stop conversion measurement at top-of-funnel `generate_lead`. To prevent optimizing SEO for low-intent inquiries, track the complete downstream patient lifecycle:

```
lead_created 
  → lead_qualified 
  → consultation_scheduled 
  → appointment_completed 
  → patient_converted
```

### Context Ingestion & Funnel Continuity
1. When a patient lands on `/services/physiotherapy/mumbai/andheri-east`, the booking modal and WhatsApp links must automatically inherit `service: "Physiotherapy"`, `city: "Mumbai"`, and `area: "Andheri East"`.
2. **Contextual WhatsApp Generator**:
   ```typescript
   export function buildContextualWhatsAppUrl(context: { service: string; city: string; area?: string; doctorName?: string }): string {
     const base = 'https://wa.me/919136447006';
     const text = context.doctorName 
       ? `Hello Aries PhysioCare, I would like to book a consultation with ${context.doctorName} in ${context.area || context.city}.`
       : `Hello Aries PhysioCare, I am looking for home ${context.service} in ${context.area ? `${context.area}, ${context.city}` : context.city}. Please share available slots.`;
     return `${base}?text=${encodeURIComponent(text)}`;
   }
   ```
3. **Attribution Persistence Across Channels**:
   * Store `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, landing URL, and timestamp in a first-party HTTP-Only cookie (`_aries_attr`, lifetime 30 days) via Next.js middleware.
   * Attach immutable attribution parameters to the Firestore lead record upon form submission.
   * When downstream CRM milestones occur (`lead_qualified`, `consultation_scheduled`, `patient_converted`), pass offline conversions back to GA4 and Google Ads referencing the original `gclid`.

---

## 8. International SEO & Crawlable Country Switcher

* **Verification Safety Gate**: Do NOT emit UK `hreflang` tags on the live India production domain until:
  1. The UK domain (`https://www.ariesphysiocare.co.uk`) returns HTTP `200 OK` on matching canonical paths.
  2. Active SSL is verified.
  3. Reciprocal `en-IN` annotations exist on the UK deployment.
* **Zero Forced Geo-IP Redirects**:
  * Never redirect users or search engine bots (which crawl from US IP blocks) based on IP address.
  * Implement a crawlable, accessible country switcher in the global header and footer:
    ```html
    <nav class="country-switcher" aria-label="Country Selector">
      <a href="https://www.ariesphysiocare.com" lang="en-IN" hreflang="en-IN">India (₹)</a>
      <a href="https://www.ariesphysiocare.co.uk" lang="en-GB" hreflang="en-GB">United Kingdom (£)</a>
    </nav>
    ```
* **Geographic Isolation**: Localized service-locality pages (e.g. `/services/physiotherapy/mumbai/andheri-east` and `/services/physiotherapy/london/camden`) are geographically unique; they do not share cross-country hreflang alternates.

---

## 9. Semantic HTML & Information Architecture

* **Semantic Tags Over AI Tricks**: Use semantic HTML whenever it accurately represents the information:
  * `<article>` for self-contained condition guides and blog posts.
  * `<section>` with explicit `<h2>`/`<h3>` for thematic sub-topics.
  * `<nav aria-label="Breadcrumb">` for navigational hierarchies.
  * `<ul>` and `<ol>` for clinical symptoms, recovery phases, and procedural steps.
  * `<table>` for clinical comparisons, phase progressions, or pricing structures.
* **Do NOT create tables merely for AI-search optimization**. Follow semantic meaning; clear structured data and semantic HTML are already optimal for both traditional crawlers and AI answer engines.

---

## 10. Legacy Redirects & Migration Governance

* **Zero Wildcard Area Collapses**: Never redirect area URLs to a generic city page (e.g., redirecting `/mumbai/andheri` to `/physiotherapy-in-mumbai` is strictly prohibited).
* **Single-Hop 301 Redirects**: Every legacy URL pattern is mapped directly to its exact replacement in `next.config.ts`.
* **Clean Sitemap**: Only canonical URLs returning HTTP `200 OK` and passing Hard Gates (Tier A) are included in XML sitemaps. Redirects (301), unserviced zones (404), retired clinics (410), and serviceable non-indexed areas (Tier B) are excluded.

---

### Implementation Acceptance Verification
Before marking any SEO feature complete, verify:
1. `npm run build` succeeds with zero TypeScript, routing, or lint errors.
2. `curl -I <URL>` confirms expected HTTP status (`200` for Tier A/B, `301` for legacy, `404` for invalid).
3. Schema JSON-LD validates in Google Rich Results Test without missing required fields or empty nodes.
4. Mobile zoom is enabled (`userScalable: true`, no `maximum-scale=1` restrictions in viewport).
5. Clinical bylines display verified practitioners with dynamically generated review dates.
