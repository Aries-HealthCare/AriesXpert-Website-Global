# SEO_REGRESSION_TESTS.md
## Aries PhysioCare Automated SEO & Healthcare Regression Specification

> **Purpose**: Formalize CI/CD regression protection, automated crawl verification, schema validation, and indexation gate audits for every future deployment.

---

### 1. Automated Test Suite Overview

The primary automated test harness is located at:
[`scripts/validate-seo-system.mjs`](file:///Volumes/Personal/Aries-HealthCare-EcoSystem/AriesXpert-Website-India/scripts/validate-seo-system.mjs)

It executes automatically via:
```bash
node scripts/validate-seo-system.mjs
```

#### Test Domains & Coverage Matrix:

| Domain | Scope | Critical Assertions | Release Blocker? |
| :--- | :--- | :--- | :---: |
| **1. Mobile Accessibility** | `src/app/layout.tsx` | Viewport pinch-to-zoom allowed (`userScalable !== false`, `maximumScale !== 1`). WCAG 2.1 AA compliance. | **P0 (YES)** |
| **2. Redirect Architecture** | `next.config.ts` | Permanent 301 execution; legacy doctor (`/therapist/:slug` → `/physiotherapists/:slug`), clinic (`/clinic` → `/locations`), and condition redirects; zero wildcard area collapses. | **P0 (YES)** |
| **3. Structured Data** | `src/lib/seo-schemas.ts` | Physiotherapists modeled as `Person` with `Occupation: Physiotherapist` (NOT `Physician`); zero empty `geo` nodes; zero mock credentials. | **P0 (YES)** |
| **4. Healthcare E-E-A-T** | `src/lib/conditions-data.ts` | Dynamic clinical review timestamp (`lastReviewedDate`); verified reviewer byline with link to profile; zero fake claims. | **P0 (YES)** |
| **5. Sitemap Governance** | `src/app/sitemap.ts` | Only Tier A canonical URLs included; zero 301 redirects, zero `noindex` funnels (`/book-appointment`, `/free-tele-consultation`) in public sitemap. | **P1 (YES)** |
| **6. Attribution & Tracking**| `src/lib/analytics.ts`, `booking-form.tsx` | Context propagation (service, city, area) into booking forms, WhatsApp links, and phone calls. | **P1 (YES)** |
| **7. Architectural Sources** | `docs/seo/*.md` | Complete source-of-truth integrity across all 10 governance blueprints. | **P1 (YES)** |

---

### 2. Crawl Simulation Checks (Pre-Deployment cURL Audits)

Before cutting a production release, run these automated curl assertions against staging / localhost:

```bash
# 1. Canonical Service-Location SSR Check
curl -s -A "Googlebot" http://localhost:3000/services/physiotherapy/mumbai/andheri-east | grep -q '<link rel="canonical" href="https://www.ariesphysiocare.com/services/physiotherapy/mumbai/andheri-east"'
echo "Canonical Check: $?"

# 2. Robots Index Directive on Tier A Page
curl -s -A "Googlebot" http://localhost:3000/conditions/sciatica | grep -q 'MedicalWebPage'
echo "Condition Schema Check: $?"

# 3. Single-Hop Redirect Verification (Legacy Doctor Route)
curl -I -s http://localhost:3000/therapist/dr-kajal-vora | grep -E "HTTP/|location:"
# Expected:
# HTTP/1.1 308 Permanent Redirect (or 301)
# location: /physiotherapists/dr-kajal-vora

# 4. Single-Hop Redirect Verification (Legacy Clinic Route)
curl -I -s http://localhost:3000/clinic | grep -E "HTTP/|location:"
# Expected:
# location: /locations

# 5. Mobile Viewport Check
curl -s http://localhost:3000 | grep -q 'viewport'
```

---

### 3. CI/CD Pipeline Integration

Add the following step to GitHub Actions / Cloud Build workflow:

```yaml
name: SEO & Healthcare Quality Gate

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  seo-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Automated SEO Governance Suite
        run: node scripts/validate-seo-system.mjs

      - name: TypeScript Typecheck
        run: npm run typecheck

      - name: Next.js Production Build
        run: npm run build
```

---

### 4. Release Blocker Criteria

Any pull request that introduces the following regressions will **fail CI/CD and block deployment**:

1. **Route Shadowing / Collisions**: Any dynamic route that intercepts a static namespace or returns an unintended 404/500.
2. **Wildcard Area Collapse**: Any redirect pattern collapsing granular localities into a generic city page.
3. **Empty Schema Nodes**: Insertion of empty `{ "@type": "GeoCoordinates" }` or mock council IDs (`MH-OTPT-1249`).
4. **Physician Schema Forcing**: Re-introducing `@type: ["Person", "Physician"]` for allied healthcare professionals without medical doctor qualifications.
5. **Mobile Zoom Restriction**: Any re-introduction of `userScalable: false` or `maximumScale: 1` in metadata viewports.
6. **Sitemap Bloat**: Inclusion of Tier B/C/D/E routes (e.g. non-indexable transactional forms or 301 redirects) in `sitemap.xml`.
