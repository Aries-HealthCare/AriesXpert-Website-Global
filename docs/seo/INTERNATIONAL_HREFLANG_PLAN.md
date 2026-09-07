# INTERNATIONAL_HREFLANG_PLAN.md
## International SEO & Bidirectional Hreflang Architecture

---

### 1. Domain Topology & Verified Pre-Conditions (DEC-05)

* **India Deployment**: Primary authoritative domain: `https://www.ariesphysiocare.com` (Target Market: India / Indian Diaspora).
* **UK Deployment**: Target domain: `https://www.ariesphysiocare.co.uk` (or `uk.ariesphysiocare.com` pending verified registrar confirmation).
* **Strict Verification Pre-Condition**:
  > **MANDATORY GATE**: Under DEC-05, no `hreflang` tags pointing to the UK domain shall be emitted on the live India production website until the UK domain has an active SSL certificate, resolves HTTP 200 responses on matching canonical URLs, and reciprocal `en-IN` annotations are verified in the UK deployment.

---

### 2. Elimination of Forced Geo-IP Redirects

* **Search Engine Crawler Safety**: Googlebot crawls primarily from US-based IP blocks. Any forced IP redirect will send Googlebot to a fallback/error page or prevent it from ever crawling India-specific content.
* **Architecture Rule**:
  1. **Zero Automatic Redirects**: Never execute server-side `302` or client-side `window.location` redirects based on client IP.
  2. **Non-Blocking Crawlable Country Switcher**: Provide a passive, accessible country navigation element in the global header and footer with standard HTML links:
     ```html
     <div class="country-selector">
       <a href="https://www.ariesphysiocare.com" lang="en-IN" hreflang="en-IN">India (₹)</a>
       <a href="https://www.ariesphysiocare.co.uk" lang="en-GB" hreflang="en-GB">United Kingdom (£)</a>
     </div>
     ```

---

### 3. Bidirectional Hreflang Matrix

When both India and UK sites are active, equivalent entity pages (Home, Corporate About, and Condition Knowledge Base) must emit reciprocal tags:

#### Matrix Configuration:
| Entity / Content | India URL (`en-IN`) | UK URL (`en-GB`) | Global Fallback (`x-default`) |
| :--- | :--- | :--- | :--- |
| **Homepage** | `https://www.ariesphysiocare.com/` | `https://www.ariesphysiocare.co.uk/` | `https://www.ariesphysiocare.com/` |
| **About Us** | `https://www.ariesphysiocare.com/about` | `https://www.ariesphysiocare.co.uk/about` | `https://www.ariesphysiocare.com/about` |
| **Sciatica Guide** | `https://www.ariesphysiocare.com/conditions/sciatica` | `https://www.ariesphysiocare.co.uk/conditions/sciatica` | `https://www.ariesphysiocare.com/conditions/sciatica` |
| **Back Pain Guide**| `https://www.ariesphysiocare.com/conditions/back-pain`| `https://www.ariesphysiocare.co.uk/conditions/back-pain`| `https://www.ariesphysiocare.com/conditions/back-pain`|

#### Local Service Pages Isolation:
* Localized service pages (e.g. `/services/physiotherapy/mumbai/andheri-east` in India and `/services/physiotherapy/london/camden` in UK) are geographically exclusive. They **do not emit cross-country hreflang alternates** because they have no direct overseas equivalent. They emit self-referential canonicals only.

---

### 4. Implementation Method: XML Sitemap Hreflang Injection
To avoid HTML header bloat on high-traffic pages, cross-domain hreflang can be injected cleanly via XML Sitemaps:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.ariesphysiocare.com/conditions/sciatica</loc>
    <xhtml:link rel="alternate" hreflang="en-IN" href="https://www.ariesphysiocare.com/conditions/sciatica"/>
    <xhtml:link rel="alternate" hreflang="en-GB" href="https://www.ariesphysiocare.co.uk/conditions/sciatica"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.ariesphysiocare.com/conditions/sciatica"/>
  </url>
</urlset>
```
