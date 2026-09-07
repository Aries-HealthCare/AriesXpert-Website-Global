# GEO_TAXONOMY_MODEL.md
## Normalized Geographic Data Architecture & Database Governance

---

### 1. Database vs Public URL Decoupling (DEC-01 & DEC-12)

The database maintains rigorous administrative boundaries for dispatch, billing, and clinical logistics. However, **the administrative database hierarchy must never be directly exposed as the public URL hierarchy.**

```
[Internal Administrative Hierarchy]
Country (India)
  └── State / Province (Maharashtra)
        └── District / Metro Region (Mumbai Suburban)
              └── City (Mumbai)
                    └── Postal Zone / PIN Code (400053)
                          └── Locality (Andheri East)
                                └── Service Zone / Clinic Hub (Aries Andheri Clinic)

[Public URL Hierarchy]
/services/[serviceSlug]/[citySlug]/[areaSlug]
  -> Example: /services/physiotherapy/mumbai/andheri-east
```

---

### 2. Elimination of Recursive / Duplicate Sub-Areas
* **The Root Bug**: In the legacy `locations.ts`, parent areas frequently contained a sub-area with the identical name and slug:
  * `Area: { name: "Colaba", slug: "colaba", subAreas: [{ name: "Colaba", slug: "colaba" }] }`
  * `Area: { name: "Fort", slug: "fort", subAreas: [{ name: "Fort", slug: "fort" }] }`
* **The Fix**:
  1. Any sub-area whose slug matches its parent area slug is immediately purged during normalization.
  2. Micro-neighborhoods (e.g. `Cuffe Parade`, `Navy Nagar`, `Sassoon Dock`) become sibling **Localities** belonging to the parent **City** or assigned a `parentAreaSlug` attribute for internal clustering, rather than generating infinite nested URL trees.

---

### 3. Normalized TypeScript Data Schema

```typescript
// src/types/geo-taxonomy.ts

export type GeoLevel = 'country' | 'state' | 'city' | 'locality' | 'clinic';

export interface BaseGeoEntity {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface LocalityEntity extends BaseGeoEntity {
  level: 'locality';
  citySlug: string;           // Foreign Key to City
  stateSlug: string;          // Foreign Key to State
  parentAreaSlug?: string;    // Optional parent grouping (e.g., 'andheri' for 'andheri-east')
  postalCodes: string[];      // e.g. ['400053', '400069']
  centerCoordinates: {
    lat: number;
    lng: number;
  };
  serviceRadiusKm: number;
  // Clinical Operations & Gate Metadata
  activeTherapistCount: number;
  hasPhysicalClinic: boolean;
  transitHubDispatchName: string;
  seoEligibilityTier: 'TIER_A' | 'TIER_B' | 'TIER_C';
}

export interface CityEntity extends BaseGeoEntity {
  level: 'city';
  stateSlug: string;
  stateName: string;
  countryCode: 'IN' | 'GB';
  defaultCenterCoordinates: {
    lat: number;
    lng: number;
  };
  localities: LocalityEntity[];
  clinicHubCount: number;
  totalTherapistsInCity: number;
}

export interface StateEntity extends BaseGeoEntity {
  level: 'state';
  countryCode: 'IN' | 'GB';
  cities: CityEntity[];
}

export interface CountryEntity extends BaseGeoEntity {
  level: 'country';
  countryCode: 'IN' | 'GB';
  currency: 'INR' | 'GBP';
  states: StateEntity[];
}
```

---

### 4. City & Locality URL Resolution Logic

```typescript
// Helper to resolve public URL without database state nesting
export function resolveServiceLocationUrl(
  serviceSlug: string, 
  citySlug: string, 
  areaSlug?: string
): string {
  if (!areaSlug) {
    return `/services/${serviceSlug}/${citySlug}`;
  }
  return `/services/${serviceSlug}/${citySlug}/${areaSlug}`;
}

export function resolvePhysicalClinicUrl(
  citySlug: string,
  clinicSlug: string
): string {
  return `/locations/${citySlug}/${clinicSlug}`;
}
```
