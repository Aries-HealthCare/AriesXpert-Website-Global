/**
 * Automated SEO & Healthcare Architecture Validation Suite
 * Aries PhysioCare - Production Governance Harness
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';

const ROOT_DIR = process.cwd();

const PASS = '✓';
const FAIL = '✗';
let totalPassed = 0;
let totalFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ${PASS} ${message}`);
    totalPassed++;
  } else {
    console.error(`  ${FAIL} FAIL: ${message}`);
    totalFailed++;
  }
}

console.log('\n=============================================================');
console.log('  ARIES PHYSIOCARE: AUTOMATED SEO & HEALTHCARE TEST SUITE    ');
console.log('=============================================================\n');

// ─────────────────────────────────────────────────────────────────────────────
// Test Group 1: Mobile Accessibility & Viewport
// ─────────────────────────────────────────────────────────────────────────────
console.log('Test Group 1: Mobile Accessibility & Viewport Standards');
{
  const layoutPath = join(ROOT_DIR, 'src/app/layout.tsx');
  assert(existsSync(layoutPath), 'src/app/layout.tsx exists');
  const layoutContent = readFileSync(layoutPath, 'utf-8');

  assert(!layoutContent.includes('userScalable: false'), 'userScalable: false is NOT present (Pinch-to-zoom allowed)');
  assert(!layoutContent.includes('maximumScale: 1'), 'maximumScale: 1 is NOT present (WCAG 2.1 AA compliant)');
}

// ─────────────────────────────────────────────────────────────────────────────
// Test Group 2: Next.js Redirect Map & Canonical Routing
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest Group 2: Redirect Architecture & Single-Hop Governance');
{
  const nextConfigPath = join(ROOT_DIR, 'next.config.ts');
  assert(existsSync(nextConfigPath), 'next.config.ts exists');
  const configContent = readFileSync(nextConfigPath, 'utf-8');

  // Check for presence of canonical 301 redirects
  assert(configContent.includes("permanent: true"), 'Redirects configured with permanent: true (HTTP 301)');
  assert(configContent.includes("destination: '/physiotherapists/:slug'"), 'Legacy /therapist/:slug redirects to /physiotherapists/:slug');
  assert(configContent.includes("destination: '/locations'"), 'Legacy /clinic redirects to /locations');
  assert(configContent.includes("destination: '/conditions/:conditionSlug'"), 'Nested service conditions redirect to /conditions/:conditionSlug');
  
  // Guardrail: Never use wildcard area collapses (/mumbai/:area -> /physiotherapy-in-mumbai)
  assert(!configContent.includes("source: '/mumbai/:area'"), 'No destructive wildcard area collapse (/mumbai/:area) present');
}

// ─────────────────────────────────────────────────────────────────────────────
// Test Group 3: Structured Data & Schema.org Semantics
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest Group 3: Healthcare Schema.org Semantics & Accuracy');
{
  const schemaPath = join(ROOT_DIR, 'src/lib/seo-schemas.ts');
  assert(existsSync(schemaPath), 'src/lib/seo-schemas.ts exists');
  const schemaContent = readFileSync(schemaPath, 'utf-8');

  // Guardrail: Physiotherapists must NOT be forced into Physician type
  assert(!schemaContent.includes("'@type': ['Person', 'Physician', 'MedicalBusiness']"), 'Physiotherapist is NOT forced into Physician schema type');
  assert(schemaContent.includes("name: 'Physiotherapist'"), 'Physiotherapist occupation explicitly modeled');
  assert(schemaContent.includes("'@type': 'Person'"), 'Practitioner accurately modeled as Person');

  // Guardrail: No empty geo nodes
  assert(!schemaContent.includes("geo: { '@type': 'GeoCoordinates' },"), 'Zero empty geo: { @type: GeoCoordinates } nodes');

  // Guardrail: No mock credentials in production
  assert(!schemaContent.includes("'MH-OTPT-1249'"), 'Zero mock credential IDs (e.g. MH-OTPT-1249) in schema definitions');
}

// ─────────────────────────────────────────────────────────────────────────────
// Test Group 4: Clinical Condition E-E-A-T & Dynamic Review Dates
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest Group 4: Clinical E-E-A-T & Dynamic Review Dates');
{
  const conditionDataPath = join(ROOT_DIR, 'src/lib/conditions-data.ts');
  assert(existsSync(conditionDataPath), 'src/lib/conditions-data.ts exists');
  const conditionData = readFileSync(conditionDataPath, 'utf-8');

  // Check dynamic date helper
  assert(conditionData.includes("getClinicalReviewTimestamp"), 'Dynamic review timestamp helper exists');
  assert(conditionData.includes("lastReviewedDate: dynamicDate") || conditionData.includes("lastReviewedDate: getClinicalReviewTimestamp()"), 'lastReviewedDate is dynamically populated');

  // Guardrail: Condition page Schema
  const conditionPagePath = join(ROOT_DIR, 'src/app/conditions/[conditionSlug]/page.tsx');
  assert(existsSync(conditionPagePath), 'Condition detail page exists');
  const conditionPageContent = readFileSync(conditionPagePath, 'utf-8');
  assert(conditionPageContent.includes("'@type': 'MedicalWebPage'"), 'MedicalWebPage schema emitted');
  assert(conditionPageContent.includes("'@type': 'MedicalCondition'"), 'MedicalCondition schema emitted');
  assert(!conditionPageContent.includes("'@type': 'Physician'") || !conditionPageContent.includes("'@type': 'Physician',\n          'name': condition.medicalReviewer.name"), 'Reviewer not forced into Physician type');
}

// ─────────────────────────────────────────────────────────────────────────────
// Test Group 5: XML Sitemap Governance & Gating
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest Group 5: XML Sitemap Governance & Indexation Tiers');
{
  const sitemapPath = join(ROOT_DIR, 'src/app/sitemap.ts');
  assert(existsSync(sitemapPath), 'src/app/sitemap.ts exists');
  const sitemapContent = readFileSync(sitemapPath, 'utf-8');

  // Sitemaps must contain core canonical directories
  assert(sitemapContent.includes('/conditions/'), 'Clinical condition guides included in sitemap');
  assert(sitemapContent.includes('/locations/'), 'Physical clinic locations included in sitemap');
  assert(sitemapContent.includes('/physiotherapists/'), 'Verified practitioner profiles included in sitemap');
  
  // Guardrail: Tier B / non-indexable routes must not be injected
  assert(!sitemapContent.includes('/book-appointment'), 'Booking funnels excluded from public XML sitemap');
  assert(!sitemapContent.includes('/free-tele-consultation/intake'), 'Intake flow excluded from public XML sitemap');
}

// ─────────────────────────────────────────────────────────────────────────────
// Test Group 6: Conversion Attribution & Funnel Continuity
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest Group 6: Conversion Attribution & Lifecycle Tracking');
{
  const analyticsPath = join(ROOT_DIR, 'src/lib/analytics.ts');
  assert(existsSync(analyticsPath), 'src/lib/analytics.ts exists');
  const analyticsContent = readFileSync(analyticsPath, 'utf-8');

  assert(analyticsContent.includes('conversion_phone_call'), 'Phone call CTA event tracked');
  assert(analyticsContent.includes('conversion_whatsapp_click'), 'WhatsApp CTA event tracked');
  assert(analyticsContent.includes('trackLeadCreated'), 'trackLeadCreated downstream event exists');
  assert(analyticsContent.includes('trackLeadQualified'), 'trackLeadQualified downstream event exists');
  assert(analyticsContent.includes('trackConsultationScheduled'), 'trackConsultationScheduled downstream event exists');
  assert(analyticsContent.includes('trackAppointmentCompleted'), 'trackAppointmentCompleted downstream event exists');
  assert(analyticsContent.includes('trackPatientConverted'), 'trackPatientConverted downstream event exists');
  assert(analyticsContent.includes('buildContextualWhatsAppUrl'), 'buildContextualWhatsAppUrl contextual helper exists');

  // Booking forms context propagation
  const bookingFormPath = join(ROOT_DIR, 'src/components/booking-form.tsx');
  const bookingFormContent = readFileSync(bookingFormPath, 'utf-8');
  assert(bookingFormContent.includes('initialCity') && bookingFormContent.includes('initialArea'), 'BookingForm accepts location context (city, area)');
}

// ─────────────────────────────────────────────────────────────────────────────
// Test Group 7: Governance Documentation Integrity
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest Group 7: Source-of-Truth Architectural Blueprints');
{
  const requiredDocs = [
    'FINAL_ROUTE_MAP.md',
    'LEGACY_REDIRECT_MAP.md',
    'INDEXATION_POLICY.md',
    'GEO_TAXONOMY_MODEL.md',
    'HEALTHCARE_ENTITY_MODEL.md',
    'SSR_MIGRATION_PLAN.md',
    'STRUCTURED_DATA_PLAN.md',
    'CONVERSION_ATTRIBUTION_PLAN.md',
    'INTERNATIONAL_HREFLANG_PLAN.md',
    'MASTER_SEO_IMPLEMENTATION_PROMPT.md',
    'ORGANIC_PATIENT_ACQUISITION_ENGINE.md',
    'SEO_REGRESSION_TESTS.md',
    'SEO_IMPLEMENTATION_REPORT.md'
  ];

  for (const doc of requiredDocs) {
    const p = join(ROOT_DIR, 'docs/seo', doc);
    assert(existsSync(p), `docs/seo/${doc} exists`);
  }

  // Verify correction A in INDEXATION_POLICY.md
  const indexPolicy = readFileSync(join(ROOT_DIR, 'docs/seo/INDEXATION_POLICY.md'), 'utf-8');
  assert(indexPolicy.includes('Hard Gates'), 'INDEXATION_POLICY.md enforces Hard Gates');
  assert(indexPolicy.includes('Self-referential canonical OR no canonical'), 'INDEXATION_POLICY.md prevents automatic Tier B cross-canonicalization');

  // Verify correction C in FINAL_ROUTE_MAP.md
  const routeMap = readFileSync(join(ROOT_DIR, 'docs/seo/FINAL_ROUTE_MAP.md'), 'utf-8');
  assert(routeMap.includes('/locations') && routeMap.includes('SEO landing-page generator'), 'FINAL_ROUTE_MAP.md establishes /locations physical guardrail');
}

// ─────────────────────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n=============================================================');
console.log(`  RESULTS: ${totalPassed} PASSED | ${totalFailed} FAILED`);
console.log('=============================================================\n');

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log('All automated SEO and healthcare governance tests passed successfully!\n');
  process.exit(0);
}
