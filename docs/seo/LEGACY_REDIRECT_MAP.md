# LEGACY_REDIRECT_MAP.md
## 1:1 Legacy URL Migration & Permanent Redirect Specification

---

### 1. Migration Strategy & Zero-Chains Policy
1. **Single-Hop Rule**: Every legacy URL must resolve to its final canonical destination in exactly **one HTTP 301 response**. No redirect chains (e.g. `A → B → C` is strictly prohibited; must be `A → C` and `B → C`).
2. **No Wildcard Collapsing**: The legacy rule `{ source: '/mumbai/:area', destination: '/physiotherapy-in-mumbai' }` in `next.config.ts` is eliminated. Every area must either map to its specific canonical area URL or receive a verified contextual mapping.
3. **Preservation of Backlink Equity**: High-authority legacy landing pages (such as `/physiotherapy-in-mumbai`) retain 100% link equity via permanent 301 redirects to the new canonical structure.

---

### 2. Comprehensive 1:1 Redirect Table

#### Core Corporate & Global Pages
| Legacy Source URL | Destination URL | HTTP Status | Rationale |
| :--- | :--- | :--- | :--- |
| `/about-us` | `/about` | 301 Permanent | Legacy WordPress migration |
| `/about-us/` | `/about` | 301 Permanent | Trailing slash normalization |
| `/service` | `/services` | 301 Permanent | Singular to plural hub |
| `/service/` | `/services` | 301 Permanent | Trailing slash normalization |
| `/blog` | `/blogs` | 301 Permanent | WordPress standard to plural |
| `/blog/` | `/blogs` | 301 Permanent | Trailing slash normalization |
| `/contact/` | `/contact` | 301 Permanent | Trailing slash normalization |
| `/terms-conditions` | `/terms-of-service` | 301 Permanent | Legal route consolidation |
| `/terms-conditions/` | `/terms-of-service` | 301 Permanent | Trailing slash normalization |

#### Practitioner & Doctor Pages (DEC-03)
| Legacy Source URL | Destination URL | HTTP Status | Rationale |
| :--- | :--- | :--- | :--- |
| `/our-expert-doctors` | `/physiotherapists` | 301 Permanent | Old WordPress index to canonical directory |
| `/our-expert-doctors/` | `/physiotherapists` | 301 Permanent | Trailing slash normalization |
| `/therapist` | `/physiotherapists` | 301 Permanent | Intermediate Next.js route migration |
| `/therapist/` | `/physiotherapists` | 301 Permanent | Trailing slash normalization |
| `/doctor/:slug` | `/physiotherapists/:slug` | 301 Permanent | Old WordPress individual doctor URL |
| `/Doctor/:slug` | `/physiotherapists/:slug` | 301 Permanent | Case sensitivity normalization |
| `/therapist/:slug` | `/physiotherapists/:slug` | 301 Permanent | Current Next.js doctor profile route |

#### Clinic & Location Hubs (DEC-11)
| Legacy Source URL | Destination URL | HTTP Status | Rationale |
| :--- | :--- | :--- | :--- |
| `/expert-center` | `/locations` | 301 Permanent | WordPress clinic directory |
| `/expert-center/` | `/locations` | 301 Permanent | Trailing slash normalization |
| `/clinic` | `/locations` | 301 Permanent | Current intermediate clinic directory |
| `/clinic/` | `/locations` | 301 Permanent | Trailing slash normalization |
| `/clinics` | `/locations` | 301 Permanent | Duplicate route removal |
| `/clinics/` | `/locations` | 301 Permanent | Trailing slash normalization |
| `/clinic/:clinicSlug` | `/locations/mumbai/:clinicSlug` | 301 Permanent | Map clinic to city/clinic hierarchy |

#### National & City Service Pages (DEC-01)
| Legacy Source URL | Destination URL | HTTP Status | Rationale |
| :--- | :--- | :--- | :--- |
| `/physiotherapy-in-india` | `/services/physiotherapy` | 301 Permanent | Old SEO rank page to canonical service |
| `/physiotherapy-in-india/` | `/services/physiotherapy` | 301 Permanent | Trailing slash normalization |
| `/home-visit-physiotherapy` | `/services/physiotherapy` | 301 Permanent | Legacy WordPress service slug |
| `/telehealth-physiotherapy` | `/services/physiotherapy` | 301 Permanent | Legacy WordPress service slug |
| `/in-hospital-treatment` | `/services/physiotherapy` | 301 Permanent | Legacy WordPress service slug |
| `/physiotherapy-in-mumbai` | `/services/physiotherapy/mumbai` | 301 Permanent | High-traffic legacy URL to canonical |
| `/mumbai` | `/services/physiotherapy/mumbai` | 301 Permanent | Direct city slug to canonical service |
| `/mumbai/` | `/services/physiotherapy/mumbai` | 301 Permanent | Trailing slash normalization |
| `/physiotherapy-in-pune` | `/services/physiotherapy/pune` | 301 Permanent | High-traffic legacy URL to canonical |
| `/pune` | `/services/physiotherapy/pune` | 301 Permanent | Direct city slug to canonical service |
| `/physiotherapy-in-delhi` | `/services/physiotherapy/delhi` | 301 Permanent | Legacy city URL to canonical |
| `/delhi` | `/services/physiotherapy/delhi` | 301 Permanent | Direct city slug to canonical service |
| `/physiotherapy-in-bangalore` | `/services/physiotherapy/bangalore` | 301 Permanent | Legacy city URL to canonical |
| `/bangalore` | `/services/physiotherapy/bangalore` | 301 Permanent | Direct city slug to canonical service |
| `/physiotherapy-in-chennai` | `/services/physiotherapy/chennai` | 301 Permanent | Legacy city URL to canonical |
| `/chennai` | `/services/physiotherapy/chennai` | 301 Permanent | Direct city slug to canonical service |
| `/physiotherapy-in-hyderabad` | `/services/physiotherapy/hyderabad` | 301 Permanent | Legacy city URL to canonical |
| `/hyderabad` | `/services/physiotherapy/hyderabad` | 301 Permanent | Direct city slug to canonical service |
| `/physiotherapy-in-ahmedabad` | `/services/physiotherapy/ahmedabad` | 301 Permanent | Legacy city URL to canonical |
| `/ahmedabad` | `/services/physiotherapy/ahmedabad` | 301 Permanent | Direct city slug to canonical service |
| `/physiotherapy-in-surat` | `/services/physiotherapy/surat` | 301 Permanent | Legacy city URL to canonical |
| `/surat` | `/services/physiotherapy/surat` | 301 Permanent | Direct city slug to canonical service |
| `/physiotherapy-in-kolkata` | `/services/physiotherapy/kolkata` | 301 Permanent | Legacy city URL to canonical |
| `/kolkata` | `/services/physiotherapy/kolkata` | 301 Permanent | Direct city slug to canonical service |
| `/kolkatta` | `/services/physiotherapy/kolkata` | 301 Permanent | Misspelling migration |

#### High-Value Locality Legacy Pages (Mumbai & Tier-1 Localities)
| Legacy Source URL | Destination URL | HTTP Status | Rationale |
| :--- | :--- | :--- | :--- |
| `/physiotherapy-in-andheri` | `/services/physiotherapy/mumbai/andheri` | 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-andheri-west` | `/services/physiotherapy/mumbai/andheri-west` | 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-andheri-east` | `/services/physiotherapy/mumbai/andheri-east` | 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-bandra` | `/services/physiotherapy/mumbai/bandra` | 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-bandra-west` | `/services/physiotherapy/mumbai/bandra-west` | 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-colaba` | `/services/physiotherapy/mumbai/colaba` | 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-borivali` | `/services/physiotherapy/mumbai/borivali` | 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-dadar` | `/services/physiotherapy/mumbai/dadar` | 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-thane` | `/services/physiotherapy/mumbai/thane` | 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-koramangala` | `/services/physiotherapy/bangalore/koramangala`| 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-indiranagar` | `/services/physiotherapy/bangalore/indiranagar`| 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-whitefield` | `/services/physiotherapy/bangalore/whitefield` | 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-kothrud` | `/services/physiotherapy/pune/kothrud` | 301 Permanent | Legacy flat SEO URL to canonical |
| `/physiotherapy-in-wakad` | `/services/physiotherapy/pune/wakad` | 301 Permanent | Legacy flat SEO URL to canonical |

#### Deep Catch-All State Pages Elimination
| Legacy Deep Source URL Pattern | Destination URL | HTTP Status |
| :--- | :--- | :--- |
| `/services/:service/maharashtra/:city/:area` | `/services/:service/:city/:area` | 301 Permanent |
| `/services/:service/karnataka/:city/:area` | `/services/:service/:city/:area` | 301 Permanent |
| `/services/:service/delhi/:city/:area` | `/services/:service/:city/:area` | 301 Permanent |
| `/services/:service/tamil-nadu/:city/:area` | `/services/:service/:city/:area` | 301 Permanent |
| `/services/:service/telangana/:city/:area` | `/services/:service/:city/:area` | 301 Permanent |
| `/services/:service/gujarat/:city/:area` | `/services/:service/:city/:area` | 301 Permanent |
| `/services/:service/west-bengal/:city/:area` | `/services/:service/:city/:area` | 301 Permanent |

#### Nested Condition URL Migration (DEC-02)
| Legacy Source URL | Destination URL | HTTP Status |
| :--- | :--- | :--- |
| `/services/physiotherapy/conditions/:conditionSlug` | `/conditions/:conditionSlug` | 301 Permanent |
| `/services/:serviceSlug/conditions/:conditionSlug` | `/conditions/:conditionSlug` | 301 Permanent |

---

### 3. Verification & Testing Requirements
1. **Automated Status Code Assertion**: Every rule must be verified with an automated integration test asserting response status `301` and header `Location: <destination>`.
2. **Loop Prevention Test**: Validate that no destination URL in this map matches a source rule.
