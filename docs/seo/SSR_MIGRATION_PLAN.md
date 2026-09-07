# SSR_MIGRATION_PLAN.md
## Server-Side Rendering (SSR) & Metadata Hydration Architecture

---

### 1. Server vs Client Component Boundary Definition (DEC-06)

In Next.js App Router, marking an entire page with `'use client'` disables server metadata extraction (`generateMetadata`), prevents search engine bots from seeing initial HTML snapshots of clinical data, and degrades performance.

#### The Core Principle: Do Not Confuse SSR with SEO
* **Use Server Components where they improve initial content availability, metadata, performance, and reliability.**
* **Do not force every component to become server-rendered merely for SEO.**
* Interactive components (such as booking forms, phone input validators, OTP handlers, multi-step appointment funnels) can and should remain client-side islands.
* **The Page Component (`page.tsx`) must always be a Server Component**, serving as the orchestrator that renders indexable semantic content (Title, Meta Description, Canonical, Schema JSON-LD, H1/H2 headings, verified clinician cards, clinical protocols, citations, breadcrumbs) in the initial HTML stream, and slots interactive widgets as Client Islands.

---

### 2. Detailed Route-by-Route Migration Plan

#### Route 1: Condition Detail Pages (`/conditions/[conditionSlug]`)
* **Current State**: [`src/app/services/[serviceSlug]/conditions/[conditionSlug]/page.tsx`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/AriesXpert-Website-India/src/app/services/%5BserviceSlug%5D/conditions/%5BconditionSlug%5D/page.tsx) is a client component (`'use client'`). Metadata is missing entirely.
* **Target State**:
  * Create `src/app/conditions/[conditionSlug]/page.tsx` as an **Async Server Component**.
  * Export `generateStaticParams()` to pre-render top conditions at build time.
  * Export dynamic `generateMetadata()`:
    ```typescript
    export async function generateMetadata({ params }: { params: Promise<{ conditionSlug: string }> }): Promise<Metadata> {
      const { conditionSlug } = await params;
      const condition = await getConditionDataServer(conditionSlug);
      return {
        title: `${condition.title}: Symptoms, Causes & Physiotherapy Management | Aries PhysioCare`,
        description: condition.clinicalSummary,
        alternates: { canonical: `https://www.ariesphysiocare.com/conditions/${conditionSlug}` }
      };
    }
    ```
  * Server-render the clinical copy, author/reviewer byline, symptoms list, treatment table, and citations.
  * Isolate the booking button to `<BookAppointmentButton />` (Client Component).

#### Route 2: Service + City + Locality Pages (`/services/[serviceSlug]/[citySlug]/[areaSlug]`)
* **Current State**: [`ServiceLocationClient.tsx`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/AriesXpert-Website-India/src/app/services/%5BserviceSlug%5D/%5B...location%5D/ServiceLocationClient.tsx) fetches therapists in a client-side `useEffect` (`getTherapistsClient`), presenting empty states to crawlers.
* **Target State**:
  * Create `src/app/services/[serviceSlug]/[citySlug]/[areaSlug]/page.tsx` as a Server Component.
  * Fetch therapists on the server:
    ```typescript
    const therapists = await fetchTherapistsServer({
      city: citySlug,
      area: areaSlug,
      specialization: service.backendSpecialization
    });
    ```
  * Evaluate Index Eligibility Gate (Tier A vs Tier B) on the server.
  * Emit `<meta name="robots" content="noindex, follow" />` if Tier B.
  * Pre-render the therapist cards and verified badges in initial HTML.
  * Render `<LeadEnquiryForm />` as a child Client Component with pre-populated props (`defaultCity={city.name}` and `defaultArea={area.name}`).

#### Route 3: Practitioner Profiles (`/physiotherapists/[slug]`)
* **Current State**: Intermediate `/therapist/[therapistSlug]` routes.
* **Target State**:
  * Create `src/app/physiotherapists/[slug]/page.tsx` as an Async Server Component.
  * Pre-render full physician credentials, medical council registration number, degrees, clinical bio, and verified user reviews.
  * Emit server-rendered `Physician` Schema with `alumniOf` and `medicalSpecialty`.

---

### 3. Server-Rendered HTML Checklist
Before any page is deployed, inspect the raw `curl -A "Googlebot" <URL>` output to ensure:
- [ ] Complete `<title>` tag matching clinical entity.
- [ ] Accurate `<link rel="canonical" href="..." />`.
- [ ] Direct `<meta name="robots" content="..." />`.
- [ ] `<script type="application/ld+json">` present and fully populated.
- [ ] All practitioner names, council numbers, and degrees visible without JavaScript execution.
- [ ] All breadcrumbs rendered in semantic `<nav aria-label="Breadcrumb">` HTML.
