import { MetadataRoute } from 'next';
import { services } from '@/lib/placeholder-data';
import { IndianStates } from '@/lib/locations';

const BASE_URL = 'https://www.ariesphysiocare.com';

// Static pages with their priorities and change frequencies
const staticPages: Array<{ url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }> = [
    { url: '/', priority: 1.0, changeFrequency: 'daily' },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/blogs', priority: 0.8, changeFrequency: 'daily' },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/therapist', priority: 0.9, changeFrequency: 'daily' },
    { url: '/clinic', priority: 0.9, changeFrequency: 'daily' },
    { url: '/book-appointment', priority: 0.95, changeFrequency: 'monthly' },
    { url: '/free-tele-consultation', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/ai-analysis', priority: 0.7, changeFrequency: 'monthly' },

    // Location SEO pages (old site ranked pages — preserved)
    { url: '/physiotherapy-in-india', priority: 0.95, changeFrequency: 'weekly' },
    { url: '/physiotherapy-in-maharashtra', priority: 0.95, changeFrequency: 'weekly' },
    { url: '/physiotherapy-in-mumbai', priority: 0.95, changeFrequency: 'weekly' },
    { url: '/physiotherapy-in-andheri', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/physiotherapy-in-andheri-east', priority: 0.9, changeFrequency: 'weekly' },

    // New city landing pages
    { url: '/physiotherapy-in-pune', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/physiotherapy-in-delhi', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/physiotherapy-in-bangalore', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/physiotherapy-in-chennai', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/physiotherapy-in-hyderabad', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/physiotherapy-in-ahmedabad', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/physiotherapy-in-surat', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/physiotherapy-in-kolkata', priority: 0.9, changeFrequency: 'weekly' },

    // Work with us pages
    { url: '/work-with-us', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/work-with-us/for-physiotherapists', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/work-with-us/for-corporates', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/work-with-us/for-investors', priority: 0.7, changeFrequency: 'monthly' },

    // Legal pages
    { url: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/terms-of-service', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/sitemap', priority: 0.4, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Static pages
    const staticEntries: MetadataRoute.Sitemap = staticPages.map(({ url, priority, changeFrequency }) => ({
        url: `${BASE_URL}${url}`,
        lastModified: now,
        changeFrequency,
        priority,
    }));

    // Service pages
    const serviceEntries: MetadataRoute.Sitemap = services.map(service => ({
        url: `${BASE_URL}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // Service + Location pages (state level)
    const serviceStateEntries: MetadataRoute.Sitemap = [];
    const serviceCityEntries: MetadataRoute.Sitemap = [];
    const serviceAreaEntries: MetadataRoute.Sitemap = [];

    for (const service of services) {
        for (const state of IndianStates) {
            if (!state.seoEnabled) continue;

            serviceStateEntries.push({
                url: `${BASE_URL}/services/${service.slug}/${state.slug}`,
                lastModified: now,
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            });

            for (const city of state.cities) {
                if (!city.seoEnabled) continue;

                serviceCityEntries.push({
                    url: `${BASE_URL}/services/${service.slug}/${state.slug}/${city.slug}`,
                    lastModified: now,
                    changeFrequency: 'daily' as const,
                    priority: 0.9,
                });

                for (const area of city.areas) {
                    if (!area.seoEnabled) continue;

                    serviceAreaEntries.push({
                        url: `${BASE_URL}/services/${service.slug}/${state.slug}/${city.slug}/${area.slug}`,
                        lastModified: now,
                        changeFrequency: 'weekly' as const,
                        priority: 0.75,
                    });

                    if (area.subAreas) {
                        for (const sub of area.subAreas) {
                            if (!sub.seoEnabled) continue;
                            serviceAreaEntries.push({
                                url: `${BASE_URL}/services/${service.slug}/${state.slug}/${city.slug}/${area.slug}/${sub.slug}`,
                                lastModified: now,
                                changeFrequency: 'weekly' as const,
                                priority: 0.7,
                            });
                        }
                    }
                }
            }
        }
    }

    return [
        ...staticEntries,
        ...serviceEntries,
        ...serviceStateEntries,
        ...serviceCityEntries,
        ...serviceAreaEntries,
    ];
}
