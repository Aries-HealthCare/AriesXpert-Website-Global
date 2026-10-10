import React from 'react';
import type { Metadata } from 'next';
import BorivaliClinicClient from './BorivaliClinicClient';
import { getSiteUrl } from '@/lib/seo/urls';

export const revalidate = 86400; // Daily ISR

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/physiotherapy-clinic-borivali-west`;

  return {
    title: 'Physiotherapy Clinic in Borivali West, Mumbai | Aries PhysioCare',
    description:
      'Premier physiotherapy clinic in Borivali West at New MHB Colony, Opp. New MHB Ground. Specialized in knee pain, back pain, sciatica, post-surgical rehab, stroke care & sports injuries. Call +91 8591981880.',
    keywords: [
      'physiotherapy clinic in borivali west',
      'physiotherapist in borivali west',
      'physiotherapy near new mhb colony',
      'physiotherapy near new mhb ground',
      'physiotherapist near me',
      'home physiotherapy in borivali west',
      'knee pain physiotherapy in borivali west',
      'back pain physiotherapy in borivali west',
      'post-surgery physiotherapy in borivali west',
      'neurological physiotherapy in borivali west',
      'sports injury physiotherapy in borivali west',
      'elderly physiotherapy in borivali west',
      'aries physiocare borivali',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Physiotherapy Clinic in Borivali West, Mumbai | Aries PhysioCare',
      description:
        'Personalized physiotherapy & rehabilitation at Aries PhysioCare Borivali West. 1-on-1 care, modern electrotherapy, Class-IV laser, and experienced specialists.',
      url: canonicalUrl,
      siteName: 'Aries PhysioCare India',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: '/images/clinics/flagship-clinic-main.png',
          width: 1200,
          height: 630,
          alt: 'Aries PhysioCare Borivali West Clinic Entrance & Reception',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Physiotherapy Clinic in Borivali West, Mumbai | Aries PhysioCare',
      description:
        'Expert physiotherapy & rehabilitation at Shop No. 7, Parrk Riviera, New MHB Colony, Borivali West. Call +91 8591981880.',
      images: ['/images/clinics/flagship-clinic-main.png'],
    },
  };
}

export default function BorivaliClinicPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/physiotherapy-clinic-borivali-west`;

  const clinicSchema = {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': `${pageUrl}/#clinic`,
    name: 'Aries PhysioCare : Expert Physiotherapy Center | Integrated Wellness Center',
    alternateName: 'Aries PhysioCare Borivali West',
    legalName: 'Aries HealthCare International Pvt Ltd',
    url: pageUrl,
    logo: `${siteUrl}/logo.png`,
    image: [
      `${siteUrl}/images/clinics/flagship-clinic-main.png`,
      `${siteUrl}/images/clinics/aries-flagship-reception.jpg`,
      `${siteUrl}/images/clinics/flagship-treatment-2.png`,
      `${siteUrl}/images/clinics/flagship-consult-3.png`,
      `${siteUrl}/images/clinics/flagship-spinal-4.png`,
    ],
    telephone: '+91 8591981880',
    priceRange: '₹800 - ₹19500',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shop No. 7, Parrk Riviera, New MHB Colony, Opp. New MHB Ground',
      addressLocality: 'Borivali West',
      addressRegion: 'Maharashtra',
      postalCode: '400091',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.2312,
      longitude: 72.8468,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '16:00',
        closes: '21:00',
      },
    ],
    hasMap: 'https://maps.google.com/?q=Shop+No.+7,+Parrk+Riviera,+New+MHB+Colony,+Borivali+West,+Mumbai+400091',
    medicalSpecialty: [
      'Physiotherapy',
      'PhysicalTherapy',
      'OrthopedicRehabilitation',
      'NeurologicalRehabilitation',
      'SportsMedicine',
    ],
    availableService: [
      {
        '@type': 'MedicalTherapy',
        name: 'Musculoskeletal & Joint Mobilization Physiotherapy',
        description: 'Evidence-based manual therapy, laser therapy, and ultrasound for knee pain, osteoarthritis, and frozen shoulder.',
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Spine Care & Lumbar Sciatica Decompression',
        description: 'Mechanical lumbar and cervical traction, core stability, and disc herniation relief.',
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Post-Surgical TKR & THR Rehabilitation',
        description: 'Orthopedic joint replacement rehabilitation for rapid safe ambulation.',
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Neurological Stroke Rehabilitation',
        description: 'Neuroplasticity motor re-learning, gait training, and hemiparesis functional recovery.',
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${siteUrl}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Mumbai',
        item: `${siteUrl}/locations/mumbai`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Borivali West Clinic',
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where exactly is Aries PhysioCare located in Borivali West?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We are located at Shop No. 7, Parrk Riviera, New MHB Colony, Borivali West, Mumbai – 400091, opposite the New MHB Ground, with ground floor wheelchair accessibility.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the clinic operating hours?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our clinic operates Monday through Saturday: Morning Session 8:00 AM to 1:00 PM, and Evening Session 4:00 PM to 9:00 PM. Closed on Sundays.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I book an appointment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book online with instant mobile OTP verification on this page, or call our clinic front desk directly at +91 8591981880.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does physiotherapy cost at the Borivali clinic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Initial consultation is ₹800/-, single in-clinic sessions are ₹800/-, with 10-session packages at ₹7,500 (₹750/session), 15-session packages at ₹10,500 (₹700/session), and 30-session packages at ₹19,500 (₹650/session).',
        },
      },
      {
        '@type': 'Question',
        name: 'Are home physiotherapy visits available in Borivali?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our certified physiotherapists provide doorstep home visits across Borivali West, Borivali East, Kandivali, Dahisar, and Gorai for patients unable to travel.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BorivaliClinicClient />
    </>
  );
}
