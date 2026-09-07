# FINAL_ROUTE_MAP.md
## Aries PhysioCare Canonical Routing Specification (Post-Audit Baseline)

---

### 1. Architectural Routing Principles
1. **Separation of Concerns**: 
   * `/services/...` = Transactional / Commercial local service intent (*"Can I obtain this particular service in this locality?"*).
   * `/conditions/...` = Informational / Educational clinical condition guidance (*"What causes sciatica and what is the recovery protocol?"*).
   * `/locations/...` = Physical clinic & regional hub directory (*"Where are Aries PhysioCare's actual clinics and physical hubs?"*).
   * `/physiotherapists/...` = Individual verified clinical practitioner directory.
2. **Explicit Implementation Guardrail on `/locations`**:
   * `/locations` must **never** become another SEO landing-page generator.
   * It is reserved strictly for genuine brick-and-mortar clinics and physical regional dispatch centers with validated street addresses, operating hours, and physical facilities.
   * If there is not enough genuine independent distinction between a physical clinic hub and a service-locality page, **consolidate rather than index both**.
3. **Concise Patient URLs**: Max 3 folder levels deep for local services (`/services/[service]/[city]/[area]`). State/Province is kept in the internal database hierarchy and eliminated from public URLs.
4. **Disambiguated Next.js Dynamic Segments**:
   * Root dynamic `/[citySlug]` and `/[citySlug]/[areaSlug]` are strictly deprecated and routed via 301 redirects to explicit static namespaces (`/services`, `/locations`, `/conditions`).
   * No shared dynamic folders mixing services and geographic entities.

---

### 2. Complete Canonical Route Matrix

| Intent Category | Canonical Route Pattern | Example URL | Primary Search Intent | Next.js File Path | Rendering Mode | Indexation Tier |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Global Home** | `/` | `https://www.ariesphysiocare.com/` | Brand, Core Value Prop | `src/app/page.tsx` | ISR (86400s) | Tier A (Index) |
| **Services Index** | `/services` | `https://www.ariesphysiocare.com/services` | Commercial Services Hub | `src/app/services/page.tsx` | Static / ISR | Tier A (Index) |
| **Service National** | `/services/[serviceSlug]` | `/services/physiotherapy` | National Service Brand | `src/app/services/[serviceSlug]/page.tsx` | SSR / ISR | Tier A (Index) |
| **Service + City** | `/services/[serviceSlug]/[citySlug]` | `/services/physiotherapy/mumbai` | Commercial City Service | `src/app/services/[serviceSlug]/[citySlug]/page.tsx` | SSR / ISR | Tier A (If UVT met) |
| **Service + City + Locality** | `/services/[serviceSlug]/[citySlug]/[areaSlug]` | `/services/physiotherapy/mumbai/andheri-east` | Hyperlocal Service Intent | `src/app/services/[serviceSlug]/[citySlug]/[areaSlug]/page.tsx` | SSR / ISR | Tier A or B (UVT Gated) |
| **Conditions Index** | `/conditions` | `https://www.ariesphysiocare.com/conditions` | Clinical Condition Hub | `src/app/conditions/page.tsx` | SSR / ISR | Tier A (Index) |
| **Condition Detail** | `/conditions/[conditionSlug]` | `/conditions/sciatica` | Informational / Educational | `src/app/conditions/[conditionSlug]/page.tsx` | SSR / ISR (Static params) | Tier A (Index) |
| **Locations Index** | `/locations` | `https://www.ariesphysiocare.com/locations` | Nationwide Directory | `src/app/locations/page.tsx` | SSR / ISR | Tier A (Index) |
| **Location City Hub** | `/locations/[citySlug]` | `/locations/mumbai` | City Directory & Clinics | `src/app/locations/[citySlug]/page.tsx` | SSR / ISR | Tier A (Index) |
| **Physical Clinic** | `/locations/[citySlug]/[clinicSlug]` | `/locations/mumbai/andheri-clinic` | Walk-in Clinic Local 3-Pack | `src/app/locations/[citySlug]/[clinicSlug]/page.tsx` | SSR / ISR | Tier A (Physical Clinic) |
| **Practitioners Index** | `/physiotherapists` | `https://www.ariesphysiocare.com/physiotherapists` | Medical Team Directory | `src/app/physiotherapists/page.tsx` | SSR / ISR | Tier A (Index) |
| **Practitioner Profile**| `/physiotherapists/[slug]` | `/physiotherapists/dr-kajal-vora` | E-E-A-T & Practitioner Name | `src/app/physiotherapists/[slug]/page.tsx` | SSR / ISR | Tier A (Verified Only) |
| **Blogs Index** | `/blogs` | `https://www.ariesphysiocare.com/blogs` | Health Content | `src/app/blogs/page.tsx` | SSR / ISR | Tier A (Index) |
| **Blog Article** | `/blogs/[slug]` | `/blogs/exercises-for-lower-back-pain` | Editorial Health Guide | `src/app/blogs/[slug]/page.tsx` | SSR / ISR | Tier A (Index) |
| **About Us** | `/about` | `https://www.ariesphysiocare.com/about` | Corporate & Clinical Board | `src/app/about/page.tsx` | Static | Tier A (Index) |
| **Contact Us** | `/contact` | `https://www.ariesphysiocare.com/contact` | Contact & Inquiries | `src/app/contact/page.tsx` | Static | Tier A (Index) |
| **Appointment Booking**| `/book-appointment` | `https://www.ariesphysiocare.com/book-appointment` | Conversion Funnel | `src/app/book-appointment/page.tsx` | Client Hydrated | Tier B (noindex, follow) |
| **Tele-Consultation** | `/free-tele-consultation` | `/free-tele-consultation` | Lead Gen | `src/app/free-tele-consultation/page.tsx` | Client Hydrated | Tier B (noindex, follow) |
| **Careers / Partner** | `/work-with-us/...` | `/work-with-us/for-physiotherapists` | Recruitment / B2B | `src/app/work-with-us/...` | Static | Tier A (Index) |
| **Legal Pages** | `/privacy-policy`, `/terms-of-service` | `/privacy-policy` | Compliance | `src/app/privacy-policy/page.tsx` | Static | Tier B (noindex, follow) |

---

### 3. Deprecated Routes & Deletion Schedule

| Deprecated Route Pattern | Replacement Route Pattern | Action Required |
| :--- | :--- | :--- |
| `/[citySlug]` (Root router) | `/locations/[citySlug]` or `/services/physiotherapy/[citySlug]` | Remove file after redirect map configured in `next.config.ts`. |
| `/[citySlug]/[areaSlug]` | `/services/[serviceSlug]/[citySlug]/[areaSlug]` | Remove file; route currently causes hard 404s for city/area combinations. |
| `/services/[serviceSlug]/[...location]` | `/services/[serviceSlug]/[citySlug]/[areaSlug]` | Delete catch-all; replace with structured 2-level dynamic route. |
| `/services/[serviceSlug]/conditions/[conditionSlug]` | `/conditions/[conditionSlug]` | 301 redirect to top-level `/conditions/[conditionSlug]`. |
| `/therapist` & `/therapist/[therapistSlug]` | `/physiotherapists` & `/physiotherapists/[slug]` | Single-hop 301 redirect. |
| `/clinic` & `/clinics` | `/locations` | Merge into single directory `/locations` with physical clinics. |
| `/physiotherapy-in-india` | `/services/physiotherapy` | 301 redirect. |
| `/physiotherapy-in-[city]` | `/services/physiotherapy/[citySlug]` | 301 redirect. |
| `/physiotherapy-in-[area]` | `/services/physiotherapy/[citySlug]/[areaSlug]` | 301 redirect. |
