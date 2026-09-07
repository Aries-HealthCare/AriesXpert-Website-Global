# INDEXATION_POLICY.md
## Multi-Factor Index Eligibility Gate & Taxonomy Governance

---

### 1. The Multi-Factor Index Eligibility Gate (DEC-04 Revised)
A URL existing in the database or being dynamically constructible does **NOT** justify indexation.
IndexScore is **not** an artificial SEO formula that automatically grants indexation at 75%. Search engines do not use internal scoring formulas.

A page is **INDEXABLE (Tier A)** ONLY when it satisfies all mandatory **Hard Gates**:

```
INDEXABLE = 
    Valid Active Entity 
    AND Genuine Service Availability in Locality 
    AND Verified Practitioner or Physical Hub on Record 
    AND Sufficient Independent User Value (Substantive, Non-Boilerplate) 
    AND No Doorway / Duplicate / Thin-Content Characteristics 
    AND Page is Demonstrably Useful as a Standalone Search Result 
    AND All Factual Data is Verified from Primary Authoritative Source
```

#### Secondary Prioritization Scoring (Internal Governance Signal Only)
The internal score is used **solely as an operational prioritization signal** for crawl budgeting, internal link weight, and review frequency — **never** as an automated override for the Hard Gates:
* **Practitioner Coverage (35%)**: Dedicated verified specialist mapped directly to this locality.
* **Facility / Dispatch Radius (25%)**: Physical walk-in center or validated mobile transit hub within 30 min.
* **Localized Context (20%)**: Unique local hospital coordination info, transit guidance, local FAQs.
* **Operational Readiness (20%)**: Active booking slots open in Firestore.

---

### 2. Tier Classification & Canonical Governance Matrix

| Classification Tier | Criteria | HTTP Status | Robots Meta Directive | XML Sitemap | Canonicalization Rule |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **Tier A: High Independent Value** | Passes ALL Hard Gates. Verified clinicians, genuine local availability, unique clinical context. | `200 OK` | `index, follow` | **YES** | **Self-referential canonical** |
| **Tier B: Low Search Value (Serviceable)** | Serviceable via adjacent hub, but lacks unique standalone local search value. Distinct URL for users. | `200 OK` | `noindex, follow` | **NO** | **Self-referential canonical OR no canonical** (Do NOT automatically canonicalize to parent city unless the page is genuinely an alternate/duplicate representation) |
| **Tier C: Invalid / Unserviced Locality** | Unserviced zone, non-existent entity, or invalid geographic slug. | `404 Not Found` | N/A (Server 404) | **NO** | None |
| **Tier D: Duplicate / Legacy Pattern** | Deprecated route, trailing-slash inconsistency, or casing variation. | `301 Moved Permanently` | Follow header | **NO** | 1:1 Single-hop 301 to Canonical |
| **Tier E: Permanently Retired Clinic/Service** | Closed physical center or discontinued specialty. | `410 Gone` | `noindex, nofollow` | **NO** | None (Clean removal) |

---

### 3. XML Sitemap Architecture & Dynamic Gating

1. **Sitemap Segmentation**:
   * `sitemap-core.xml`: Static core pages (`/`, `/about`, `/contact`, `/services`, `/conditions`, `/locations`, `/physiotherapists`).
   * `sitemap-services.xml`: Tier-A Service pages (National + City + Qualified Localities passing Hard Gates).
   * `sitemap-conditions.xml`: All clinical condition knowledge pages (`/conditions/*`).
   * `sitemap-physiotherapists.xml`: All verified practitioner profiles (`/physiotherapists/*`).
   * `sitemap-locations.xml`: City hubs and physical clinic pages.
2. **Strict Sitemap Filter in `sitemap.ts`**:
   ```typescript
   // Sitemap generator: strictly filters by Hard Gates verification
   const eligibleAreas = allAreas.filter(area => {
       const meetsGates = verifyHardGates(service, area);
       return meetsGates; // Only pages passing all Hard Gates enter sitemap
   });
   ```
3. **Automated Robots Tag Generation in Page Metadata**:
   ```typescript
   export async function generateMetadata({ params }): Promise<Metadata> {
       const isTierA = await checkHardGatesEligibility(params);
       return {
           robots: isTierA ? { index: true, follow: true } : { index: false, follow: true },
           alternates: {
               canonical: canonicalUrl // Self-referential canonical for both Tier A and Tier B
           }
       };
   }
   ```

---

### 4. Thin-Content & Soft-404 Guardrails
* **No False Headlines**: Under no circumstances will a page title claim *"Best [Service] in [Locality]"* if no specialist is active in that locality.
* **Noindex Warning Threshold**: If Firestore indicates 0 therapists active in a previously Tier-A area, the page automatically drops to **Tier B (`noindex, follow`)** on next ISR revalidation cycle.
