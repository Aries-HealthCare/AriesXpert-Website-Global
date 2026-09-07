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
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=85&w=1600",
    thumbUrl: "/images/clinics/flagship-thumb-2.png",
  },
  {
    id: 3,
    title: "Private Consultation & Assessment Chamber",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=85&w=1600",
    thumbUrl: "/images/clinics/flagship-thumb-3.png",
  },
  {
    id: 4,
    title: "Spinal Traction & Decompression Unit",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=1600",
    thumbUrl: "/images/clinics/flagship-thumb-4.png",
  },
];
