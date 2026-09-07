import { IndianStates } from '@/lib/locations';

export interface HubSubArea {
  name: string;
  slug: string;
  landingUrl: string;
}

export interface HubArea {
  name: string;
  slug: string;
  landingUrl: string;
  subAreas: HubSubArea[];
}

export interface CityHubDetail {
  city: string;
  citySlug: string;
  canonicalCitySlug: string;
  state: string;
  hubCount: string;
  landingPageUrl: string;
  totalAreasCount: number;
  totalSubAreasCount: number;
  areas: HubArea[];
}

export interface RegionalHub {
  city: string;
  slug: string;
  hubCount: string;
  areas: string;
  image: string;
  altText: string;
}

export const REGIONAL_HUBS_DATA: RegionalHub[] = [
  {
    city: "Mumbai",
    slug: "mumbai",
    hubCount: "12 Hubs • All 48 Wards",
    areas: "Bandra, Andheri, Borivali, Dadar, Thane",
    image: "/images/clinics/city-mumbai.png",
    altText: "Mumbai Gateway of India Landmark",
  },
  {
    city: "Pune",
    slug: "pune",
    hubCount: "6 Regional Hubs",
    areas: "Kothrud, Wakad, Baner, Hadapsar",
    image: "/images/clinics/city-pune.png",
    altText: "Pune Cityscape and Hills Landmark",
  },
  {
    city: "Bangalore",
    slug: "bangalore",
    hubCount: "8 Regional Hubs",
    areas: "Koramangala, Indiranagar, Whitefield",
    image: "/images/clinics/city-bangalore.png",
    altText: "Bangalore Vidhana Soudha Landmark",
  },
  {
    city: "Delhi NCR",
    slug: "delhi",
    hubCount: "7 Regional Hubs",
    areas: "South Delhi, Gurugram, Noida",
    image: "/images/clinics/city-delhi.png",
    altText: "Delhi NCR India Gate Landmark",
  },
  {
    city: "Hyderabad",
    slug: "hyderabad",
    hubCount: "5 Regional Hubs",
    areas: "Jubilee Hills, Gachibowli, Banjara Hills",
    image: "/images/clinics/city-hyderabad.png",
    altText: "Hyderabad Charminar Landmark",
  },
  {
    city: "Chennai",
    slug: "chennai",
    hubCount: "4 Regional Hubs",
    areas: "Anna Nagar, Adyar, OMR",
    image: "/images/clinics/city-chennai.png",
    altText: "Chennai Marina Lighthouse Landmark",
  },
  {
    city: "Ahmedabad",
    slug: "ahmedabad",
    hubCount: "4 Regional Hubs",
    areas: "Satellite, SG Highway, Bodakdev",
    image: "/images/clinics/city-ahmedabad.png",
    altText: "Ahmedabad Riverfront Landmark",
  },
  {
    city: "Kolkata",
    slug: "kolkata",
    hubCount: "4 Regional Hubs",
    areas: "Salt Lake, Alipore, New Town",
    image: "/images/clinics/city-kolkata.png",
    altText: "Kolkata Howrah Bridge Landmark",
  },
];

export interface FlagshipGalleryItem {
  id: number;
  title: string;
  url: string;
  thumbUrl: string;
}

export const FLAGSHIP_GALLERY_IMAGES: FlagshipGalleryItem[] = [
  {
    id: 1,
    title: "Rehabilitation Suite & Exercise Modalities",
    url: "/images/clinics/flagship-interior.png",
    thumbUrl: "/images/clinics/flagship-thumb-1.png",
  },
  {
    id: 2,
    title: "Advanced Electrotherapy & Ultrasound Plinth",
    url: "/images/clinics/flagship-treatment-2.png",
    thumbUrl: "/images/clinics/flagship-thumb-2.png",
  },
  {
    id: 3,
    title: "Private Consultation & Assessment Chamber",
    url: "/images/clinics/flagship-consult-3.png",
    thumbUrl: "/images/clinics/flagship-thumb-3.png",
  },
  {
    id: 4,
    title: "Spinal Traction & Decompression Unit",
    url: "/images/clinics/flagship-spinal-4.png",
    thumbUrl: "/images/clinics/flagship-thumb-4.png",
  },
];

const CITY_ALIAS_MAP: Record<string, string> = {
  bangalore: 'bengaluru',
  bengaluru: 'bengaluru',
  delhi: 'delhi',
  'delhi-ncr': 'delhi',
  kolkatta: 'kolkata',
  kolkata: 'kolkata',
};

export function getCityHubDetail(slugOrName: string): CityHubDetail | null {
  const norm = slugOrName.toLowerCase().trim();
  const canonical = CITY_ALIAS_MAP[norm] || norm;

  for (const state of IndianStates) {
    const city = state.cities.find(
      (c) =>
        c.slug.toLowerCase() === canonical ||
        c.name.toLowerCase() === canonical ||
        c.slug.toLowerCase() === norm ||
        c.name.toLowerCase() === norm
    );
    if (city) {
      const hubData = REGIONAL_HUBS_DATA.find(
        (h) => h.slug.toLowerCase() === norm || h.city.toLowerCase() === city.name.toLowerCase()
      );

      const areas: HubArea[] = city.areas.map((a) => ({
        name: a.name,
        slug: a.slug,
        landingUrl: `/services/physiotherapy/${city.slug}/${a.slug}`,
        subAreas: (a.subAreas || []).map((sa) => ({
          name: sa.name,
          slug: sa.slug,
          landingUrl: `/services/physiotherapy/${city.slug}/${sa.slug}`,
        })),
      }));

      const totalSubAreas = areas.reduce((acc, a) => acc + a.subAreas.length, 0);

      return {
        city: city.name,
        citySlug: norm,
        canonicalCitySlug: city.slug,
        state: state.name,
        hubCount: hubData?.hubCount || `${areas.length} Operational Zones`,
        landingPageUrl: `/locations/${norm}`,
        totalAreasCount: areas.length,
        totalSubAreasCount: totalSubAreas,
        areas,
      };
    }
  }
  return null;
}

