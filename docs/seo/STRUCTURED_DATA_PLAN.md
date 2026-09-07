# STRUCTURED_DATA_PLAN.md
## Schema.org Structured Data & Knowledge Graph Specification

---

### 1. Structured Data Principles (DEC-08)
1. **Accuracy Over Aggressiveness**: Schema must strictly reflect actual physical and clinical reality.
2. **No Empty Nodes**: Zero tolerance for incomplete objects (e.g. empty `geo: { '@type': 'GeoCoordinates' }`).
3. **Physical vs Service-Area Business (SAB)**:
   * A physical walk-in center (`/locations/[city]/[clinicSlug]`) emits `MedicalClinic` with exact street address, lat/lng, and operating hours.
   * A home-visit service landing page (`/services/physiotherapy/mumbai/andheri-east`) emits `HealthcareService` with `areaServed` and `provider`, **never** an illegitimate storefront `LocalBusiness` that risks Google Maps suspension.

---

### 2. Schema Blueprint by Page Type

#### Page Type A: Corporate / Global (`/` and `/about`)
* **Primary Types**: `MedicalOrganization`, `Organization`, `WebSite`
* **JSON-LD Schema Structure**:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://www.ariesphysiocare.com/#organization",
      "name": "Aries PhysioCare",
      "legalName": "Aries HealthCare International Pvt Ltd",
      "url": "https://www.ariesphysiocare.com",
      "logo": "https://www.ariesphysiocare.com/logo.png",
      "telephone": "+91-9136447006",
      "email": "support@ariesphysiocare.com",
      "sameAs": [
        "https://www.linkedin.com/company/aries-physiocare",
        "https://www.instagram.com/ariesphysiocare",
        "https://www.youtube.com/@ariesphysiocare"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Andheri West",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400053",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.ariesphysiocare.com/#website",
      "url": "https://www.ariesphysiocare.com",
      "name": "Aries PhysioCare",
      "publisher": {
        "@id": "https://www.ariesphysiocare.com/#organization"
      }
    }
  ]
}
```

#### Page Type B: Service + Locality (`/services/[service]/[city]/[area]`)
* **Primary Types**: `HealthcareService`, `BreadcrumbList`, `FAQPage` (if unique local FAQs exist)
* **JSON-LD Schema Structure**:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HealthcareService",
      "@id": "https://www.ariesphysiocare.com/services/physiotherapy/mumbai/andheri-east/#service",
      "name": "Home Physiotherapy in Andheri East, Mumbai",
      "serviceType": "Physiotherapy",
      "provider": {
        "@type": "MedicalOrganization",
        "@id": "https://www.ariesphysiocare.com/#organization"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Andheri East",
        "containedInPlace": {
          "@type": "City",
          "name": "Mumbai"
        }
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceChannelType": "HomeVisitService",
        "serviceLocation": {
          "@type": "Place",
          "name": "Patient Residence"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.ariesphysiocare.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.ariesphysiocare.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Physiotherapy", "item": "https://www.ariesphysiocare.com/services/physiotherapy" },
        { "@type": "ListItem", "position": 4, "name": "Mumbai", "item": "https://www.ariesphysiocare.com/services/physiotherapy/mumbai" },
        { "@type": "ListItem", "position": 5, "name": "Andheri East", "item": "https://www.ariesphysiocare.com/services/physiotherapy/mumbai/andheri-east" }
      ]
    }
  ]
}
```

#### Page Type C: Clinical Condition Guide (`/conditions/[conditionSlug]`)
* **Primary Types**: `MedicalWebPage`, `MedicalCondition`, `BreadcrumbList`
* **JSON-LD Schema Structure**:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.ariesphysiocare.com/conditions/sciatica/#webpage",
      "name": "Sciatica Clinical Symptoms, Causes & Physiotherapy Protocol",
      "url": "https://www.ariesphysiocare.com/conditions/sciatica",
      "author": {
        "@type": "Person",
        "name": "Clinical Editorial Team"
      },
      "reviewedBy": {
        "@type": "Person",
        "name": "Dr. Kajal Vora, PT",
        "jobTitle": "Senior Consultant Physiotherapist",
        "url": "https://www.ariesphysiocare.com/physiotherapists/dr-kajal-vora",
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Physiotherapist"
        }
      },
      "lastReviewed": "DYNAMIC_CMS_TIMESTAMP",
      "mainEntity": {
        "@type": "MedicalCondition",
        "name": "Sciatica",
        "possibleTreatment": [
          {
            "@type": "MedicalTherapy",
            "name": "Targeted Physical Therapy & Neural Mobilization"
          }
        ]
      }
    }
  ]
}
```
*Note on `lastReviewed`: Must be a dynamically maintained field sourced directly from content revision records in CMS/Firestore. Never allow stale hard-coded review dates.*

#### Page Type D: Verified Practitioner Profile (`/physiotherapists/[slug]`)
* **Primary Types**: `Person` (with `Occupation: Physiotherapist`)
* **Crucial Schema Semantics**: A physiotherapist is **not** automatically a `Physician` in the ordinary meaning of that Schema.org type (which implies medical doctor/MBBS). Schema types must reflect actual professional roles and applicable Schema.org semantics.
* **Prohibition of Mock Data**: Never use example credential data from architecture documents (e.g. *"MH-OTPT-1249"*) as production data. Only authentic, council-verified credentials may be published.
* **JSON-LD Schema Structure**:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Kajal Vora, PT",
  "jobTitle": "Senior Consultant Physiotherapist",
  "description": "Senior consultant neuro-physiotherapist with over 12 years of clinical experience in stroke rehabilitation and neurological recovery.",
  "url": "https://www.ariesphysiocare.com/physiotherapists/dr-kajal-vora",
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Physiotherapist",
    "occupationalCategory": "Healthcare Practitioner"
  },
  "alumniOf": [
    { "@type": "EducationalOrganization", "name": "MUHS" },
    { "@type": "EducationalOrganization", "name": "KEM Hospital Mumbai" }
  ],
  "worksFor": {
    "@type": "MedicalOrganization",
    "@id": "https://www.ariesphysiocare.com/#organization"
  }
}
```
