import { MetadataRoute } from 'next';
import { services } from '@/lib/placeholder-data';
import { IndianStates } from '@/lib/locations';
import { getAllConditions } from '@/lib/conditions-data';
import { VERIFIED_THERAPISTS_CATALOG } from '@/lib/verified-therapists';
import { ARIES_CLINICS_DIRECTORY } from '@/lib/clinics-data';

const BASE_URL = 'https://www.ariesphysiocare.com';

// ── Canonical Core Pages (DEC-01, DEC-02, DEC-03, DEC-11: Tier A Indexable Only) ───
const corePages: Array<{ url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }> = [
    { url: '/', priority: 1.0, changeFrequency: 'daily' },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/services', priority: 0.95, changeFrequency: 'weekly' },
    { url: '/conditions', priority: 0.95, changeFrequency: 'weekly' },
    { url: '/locations', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/physiotherapists', priority: 0.9, changeFrequency: 'daily' },
    { url: '/blogs', priority: 0.8, changeFrequency: 'daily' },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' },

    // Corporate & Partnerships (Tier A)
    { url: '/work-with-us', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/work-with-us/for-physiotherapists', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/work-with-us/for-corporates', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/work-with-us/for-investors', priority: 0.7, changeFrequency: 'monthly' },
];

// DEC-04: Tier-A High-Value Locality Filter (Index Eligibility Gate)
// Localities with dedicated verified specialists on file
const TIER_A_LOCALITY_SLUGS = new Set([
    'andheri-west',
    'andheri-east',
    'andheri',
    'bandra-west',
    'bandra',
    'borivali',
    'borivali-west',
    'colaba',
    'cuffe-parade',
    'marine-drive',
    'worli',
    'lower-parel',
    'juhu',
    'powai',
    'goregaon',
    'koramangala',
    'indiranagar',
    'whitefield',
    'kothrud',
    'wakad',
    'baner',
    'hadapsar',
    'satellite',
    'prahlad-nagar',
    'vastrapur',
    'salt-lake',
    'alipore',
    'new-town',
    'anna-nagar',
    'adyar',
    'omr',
    'jubilee-hills',
    'banjara-hills',
    'gachibowli',
    'hitec-city',
    'south-delhi',
    'gurugram',
    'noida'
]);

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // 1. Core Pages
    const staticEntries: MetadataRoute.Sitemap = corePages.map(({ url, priority, changeFrequency }) => ({
        url: `${BASE_URL}${url}`,
        lastModified: now,
        changeFrequency,
        priority,
    }));

    // 2. Clinical Condition Knowledge Hub (DEC-02)
    const conditions = getAllConditions();
    const conditionEntries: MetadataRoute.Sitemap = conditions.map(c => ({
        url: `${BASE_URL}/conditions/${c.slug}`,
        lastModified: new Date(c.lastReviewedDate),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // 3. Verified Physiotherapists Directory (DEC-03, DEC-07)
    const therapistEntries: MetadataRoute.Sitemap = VERIFIED_THERAPISTS_CATALOG.map(t => ({
        url: `${BASE_URL}/physiotherapists/${t.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // 4. Physical Clinics & Care Centers (DEC-11, DEC-08)
    const clinicEntries: MetadataRoute.Sitemap = ARIES_CLINICS_DIRECTORY.map(c => ({
        url: `${BASE_URL}/locations/${c.city.toLowerCase()}/${c.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 5. National Services
    const serviceEntries: MetadataRoute.Sitemap = services.map(service => ({
        url: `${BASE_URL}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 6. Canonical Service + Location Pages (DEC-01, DEC-04 Gate)
    const serviceCityEntries: MetadataRoute.Sitemap = [];
    const serviceLocalityEntries: MetadataRoute.Sitemap = [];

    // City hubs for locations directory
    const cityLocationEntries: MetadataRoute.Sitemap = [];

    for (const state of IndianStates) {
        if (!state.seoEnabled) continue;

        for (const city of state.cities) {
            if (!city.seoEnabled) continue;

            // City hub in location directory
            cityLocationEntries.push({
                url: `${BASE_URL}/locations/${city.slug}`,
                lastModified: now,
                changeFrequency: 'weekly' as const,
                priority: 0.85,
            });

            // Services in this city
            for (const service of services) {
                serviceCityEntries.push({
                    url: `${BASE_URL}/services/${service.slug}/${city.slug}`,
                    lastModified: now,
                    changeFrequency: 'daily' as const,
                    priority: 0.9,
                });

                // DEC-04 Index Eligibility Gate: Only Tier-A localities with verified active specialists
                for (const area of city.areas) {
                    if (!area.seoEnabled) continue;
                    if (!TIER_A_LOCALITY_SLUGS.has(area.slug)) continue;

                    serviceLocalityEntries.push({
                        url: `${BASE_URL}/services/${service.slug}/${city.slug}/${area.slug}`,
                        lastModified: now,
                        changeFrequency: 'weekly' as const,
                        priority: 0.8,
                    });
                }
            }
        }
    }

    return [
        ...staticEntries,
        ...conditionEntries,
        ...therapistEntries,
        ...clinicEntries,
        ...cityLocationEntries,
        ...serviceEntries,
        ...serviceCityEntries,
        ...serviceLocalityEntries,
    ];
}
