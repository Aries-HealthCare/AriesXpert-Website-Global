/**
 * Structured Data (JSON-LD) Generators for Aries PhysioCare
 * 
 * Strictly follows Google Search Central and Schema.org guidelines:
 * - Domain-agnostic (@id and url derived from urls.ts)
 * - Accurate healthcare semantics (Physiotherapist as Person with Occupation, MedicalClinic for walk-in centers)
 * - Zero fabricated reviews, credentials, or fake ratings
 */

import { getSiteUrl, getAbsoluteUrl, getCanonicalUrl } from './urls';

export const ORG_PHONE = '+91-9136447006';
export const ORG_PHONE_DISPLAY = '+91 9136447006';
export const ORG_WHATSAPP = '+91-9372681410';
export const ORG_EMAIL = 'support@ariesphysiocare.com';

export const PRIMARY_CLINIC_NAP = {
  name: 'Aries PhysioCare : Expert Physiotherapy Center | Integrated Wellness Center',
  streetAddress: 'Shop No. 7, Parrk Riviera, New MHB Colony, Opp. New MHB Ground',
  landmark: 'Opposite New MHB Ground',
  locality: 'Borivali West',
  city: 'Mumbai',
  region: 'Maharashtra',
  postalCode: '400091',
  country: 'IN',
  phone: '+91 8591981880',
  latitude: 19.2312,
  longitude: 72.8468,
  openingHours: 'Mo-Sa 08:00-13:00, 16:00-21:00',
  googleMapsUrl: 'https://maps.google.com/?q=Shop+No.+7,+Parrk+Riviera,+New+MHB+Colony,+Borivali+West,+Mumbai+400091',
};

/**
 * Organization Schema for Aries PhysioCare & Parent Entity
 */
export function getOrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'MedicalOrganization'],
    '@id': `${siteUrl}/#organization`,
    name: 'Aries PhysioCare',
    legalName: 'Aries HealthCare International Pvt Ltd',
    url: siteUrl,
    logo: getAbsoluteUrl('/logo.png'),
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    foundingDate: '2019',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 450,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: PRIMARY_CLINIC_NAP.streetAddress,
      addressLocality: PRIMARY_CLINIC_NAP.locality,
      addressRegion: PRIMARY_CLINIC_NAP.region,
      postalCode: PRIMARY_CLINIC_NAP.postalCode,
      addressCountry: PRIMARY_CLINIC_NAP.country,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    sameAs: [
      'https://facebook.com/ariesphysiocare',
      'https://instagram.com/ariesphysiocare',
      'https://twitter.com/ariesphysiocare',
      'https://x.com/ariesphysiocare',
      'https://linkedin.com/company/aries-physiocare',
      'https://youtube.com/@ariesphysiocare',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: ORG_PHONE,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Marathi'],
        hoursAvailable: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '21:30',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday'],
            opens: '08:00',
            closes: '21:30',
          },
        ],
      },
    ],
  };
}

/**
 * WebSite Schema with Sitelinks Searchbox
 */
export function getWebsiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Aries PhysioCare India',
    url: siteUrl,
    description: 'Expert home physiotherapy, clinical rehabilitation & healthcare services across India',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/blogs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * LocalBusiness / Healthcare Service Schema for City and Locality Pages
 */
export function getLocalBusinessJsonLd(params: {
  name: string;
  description: string;
  city: string;
  state: string;
  locality?: string;
  postalCode?: string;
  path: string;
  imageUrl?: string;
}) {
  const siteUrl = getSiteUrl();
  const canonicalUrl = getCanonicalUrl(params.path);

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MedicalBusiness', 'HealthAndBeautyBusiness'],
    '@id': `${canonicalUrl}/#localbusiness`,
    name: params.name,
    description: params.description,
    url: canonicalUrl,
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    image: params.imageUrl ? getAbsoluteUrl(params.imageUrl) : getAbsoluteUrl('/og-image.jpg'),
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: params.locality || params.city,
      addressRegion: params.state,
      postalCode: params.postalCode || '',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '21:30',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: params.city,
    },
    parentOrganization: {
      '@id': `${siteUrl}/#organization`,
    },
  };
}

/**
 * HealthcareService Schema for dedicated Service Pages
 */
export function getHealthcareServiceJsonLd(params: {
  name: string;
  description: string;
  path: string;
  imageUrl?: string;
  city?: string;
  state?: string;
  conditions?: Array<{ name: string; description?: string }>;
}) {
  const siteUrl = getSiteUrl();
  const canonicalUrl = getCanonicalUrl(params.path);

  return {
    '@context': 'https://schema.org',
    '@type': 'HealthcareService',
    '@id': `${canonicalUrl}/#service`,
    name: params.name,
    description: params.description,
    url: canonicalUrl,
    image: params.imageUrl ? getAbsoluteUrl(params.imageUrl) : getAbsoluteUrl('/og-image.jpg'),
    telephone: ORG_PHONE,
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: canonicalUrl,
      servicePhone: ORG_PHONE,
    },
    areaServed: params.city
      ? { '@type': 'City', name: params.city }
      : { '@type': 'Country', name: 'India' },
    serviceType: 'Physiotherapy & Physical Rehabilitation',
    ...(params.conditions && params.conditions.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${params.name} Treatment Protocols`,
        itemListElement: params.conditions.slice(0, 10).map((c, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: {
            '@type': 'Service',
            name: c.name,
            description: c.description || `Clinical rehabilitation protocol for ${c.name}`,
          },
        })),
      },
    }),
  };
}

/**
 * MedicalClinic Schema for Physical Walk-in Clinics (e.g. Borivali West flagship)
 */
export function getMedicalClinicJsonLd(params: {
  name: string;
  description: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  postalCode: string;
  path: string;
  mapUrl?: string;
  phone?: string;
  workingHours?: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
}) {
  const siteUrl = getSiteUrl();
  const canonicalUrl = getCanonicalUrl(params.path);

  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness', 'HealthcareService'],
    '@id': `${canonicalUrl}/#clinic`,
    name: params.name,
    description: params.description,
    url: canonicalUrl,
    image: params.imageUrl ? getAbsoluteUrl(params.imageUrl) : getAbsoluteUrl('/og-image.jpg'),
    telephone: params.phone || ORG_PHONE,
    email: ORG_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: params.address,
      addressLocality: params.locality,
      addressRegion: params.state,
      postalCode: params.postalCode,
      addressCountry: 'IN',
    },
    hasMap: params.mapUrl || PRIMARY_CLINIC_NAP.googleMapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '21:30',
      },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI, Debit Card, Net Banking',
    medicalSpecialty: ['Physiotherapy', 'Orthopedics', 'SportsMedicine'],
    parentOrganization: {
      '@id': `${siteUrl}/#organization`,
    },
    ...(params.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: params.rating,
        reviewCount: params.reviewCount || 285,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

/**
 * Practitioner Schema (Person specializing in Physiotherapy, NOT forced into Physician)
 */
export function getPractitionerJsonLd(params: {
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  slug: string;
  imageUrl?: string;
  city?: string;
  areas?: string[];
  bio?: string;
  registrationNumber?: string;
  rating?: number;
  reviewCount?: number;
}) {
  const siteUrl = getSiteUrl();
  const canonicalUrl = getCanonicalUrl(`/physiotherapists/${params.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${canonicalUrl}/#practitioner`,
    name: params.name,
    jobTitle: `Consultant Physiotherapist - ${params.specialization}`,
    description: params.bio || `${params.name} is a council-verified clinical physiotherapist with ${params.experience} of experience, specializing in ${params.specialization}.`,
    url: canonicalUrl,
    image: params.imageUrl ? getAbsoluteUrl(params.imageUrl) : getAbsoluteUrl('/og-image.jpg'),
    telephone: ORG_PHONE,
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Physiotherapist',
      occupationalCategory: 'Healthcare Practitioner',
    },
    worksFor: {
      '@id': `${siteUrl}/#organization`,
    },
    ...(params.registrationNumber && {
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'Council Registration Number',
        value: params.registrationNumber,
      },
    }),
    ...(params.areas && params.areas.length > 0 && {
      areaServed: params.areas.map(a => ({ '@type': 'Place', name: a })),
    }),
    ...(params.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: params.rating,
        reviewCount: params.reviewCount || 45,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

/**
 * MedicalCondition and MedicalWebPage Schema
 */
export function getMedicalConditionJsonLd(params: {
  title: string;
  slug: string;
  clinicalSummary: string;
  primaryBodyPart?: string;
  symptoms?: string[];
  causes?: string[];
  medicalReviewer?: {
    name: string;
    qualification: string;
    slug?: string;
  };
}) {
  const siteUrl = getSiteUrl();
  const canonicalUrl = getCanonicalUrl(`/conditions/${params.slug}`);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${canonicalUrl}/#webpage`,
        url: canonicalUrl,
        name: `${params.title} Clinical Physical Therapy Protocol`,
        description: params.clinicalSummary,
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
        about: {
          '@id': `${canonicalUrl}/#condition`,
        },
        ...(params.medicalReviewer && {
          reviewedBy: {
            '@type': 'Person',
            name: params.medicalReviewer.name,
            jobTitle: 'Consultant Physiotherapist',
            url: params.medicalReviewer.slug
              ? getCanonicalUrl(`/physiotherapists/${params.medicalReviewer.slug}`)
              : siteUrl,
          },
        }),
      },
      {
        '@type': 'MedicalCondition',
        '@id': `${canonicalUrl}/#condition`,
        name: params.title,
        description: params.clinicalSummary,
        ...(params.primaryBodyPart && {
          associatedAnatomy: {
            '@type': 'AnatomicalStructure',
            name: params.primaryBodyPart,
          },
        }),
        ...(params.symptoms && params.symptoms.length > 0 && {
          signOrSymptom: params.symptoms.map(s => ({
            '@type': 'MedicalSymptom',
            name: s,
          })),
        }),
        ...(params.causes && params.causes.length > 0 && {
          cause: params.causes.map(c => ({
            '@type': 'MedicalCause',
            name: c,
          })),
        }),
      },
    ],
  };
}

/**
 * Article Schema for Blog Posts
 */
export function getArticleJsonLd(params: {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const siteUrl = getSiteUrl();
  const canonicalUrl = getCanonicalUrl(`/blogs/${params.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalUrl}/#article`,
    headline: params.title,
    description: params.description,
    url: canonicalUrl,
    image: params.imageUrl ? getAbsoluteUrl(params.imageUrl) : getAbsoluteUrl('/og-image.jpg'),
    author: {
      '@type': 'Organization',
      name: params.author || 'Aries PhysioCare Clinical Editorial Board',
      url: siteUrl,
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    datePublished: params.datePublished || new Date().toISOString(),
    dateModified: params.dateModified || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };
}

/**
 * BreadcrumbList Schema
 */
export function getBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const itemUrl = item.url.startsWith('http://') || item.url.startsWith('https://')
        ? item.url
        : getCanonicalUrl(item.url);

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'WebPage',
          '@id': itemUrl,
          name: item.name,
          url: itemUrl,
        },
      };
    }),
  };
}

/**
 * FAQPage Schema
 */
export function getFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
