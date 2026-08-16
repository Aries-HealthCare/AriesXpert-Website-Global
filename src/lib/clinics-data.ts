export interface ClinicBranch {
  id: string;
  slug: string;
  name: string;
  badge?: string;
  isFlagship?: boolean;
  tagline: string;
  address: string;
  subArea: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  alternatePhone?: string;
  whatsapp: string;
  googleRating: number;
  reviewCount: number;
  googleMapsUrl: string;
  googleMapsEmbedUrl?: string;
  workingHours: string;
  daysOpen: string;
  imageUrl: string;
  galleryImages: string[];
  specialties: string[];
  amenities: string[];
  equipment: string[];
  doctors: Array<{
    name: string;
    qualification: string;
    specialization: string;
    experience: string;
    imageUrl: string;
  }>;
  consultationFee: string;
  description: string;
}

export const ARIES_CLINICS_DIRECTORY: ClinicBranch[] = [
  {
    id: "clinic-borivali-flagship",
    slug: "aries-physiocare-expert-physiotherapy-wellness-center-borivali",
    name: "Aries PhysioCare : Expert Physiotherapy Center | Integrated Wellness Center",
    badge: "Official Clinic Center",
    isFlagship: true,
    tagline: "The Healing Touch · Hospital-Grade Integrated Physiotherapy & Advanced Clinical Wellness",
    address: "Shop No. 7, Parrk Riviera, New MHB Colony, Opp. Gorai Bridge / Don Bosco Road, Borivali West, Mumbai, Maharashtra 400091",
    subArea: "Borivali West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400091",
    phone: "+91 9136447006",
    alternatePhone: "+91 9972267762",
    whatsapp: "917372681410",
    googleRating: 4.9,
    reviewCount: 285,
    googleMapsUrl: "https://share.google/rOlEnKQabSdOV2fpf",
    workingHours: "8:00 AM – 9:30 PM",
    daysOpen: "Monday – Sunday (365 Days Open)",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1000",
    ],
    specialties: [
      "Orthopedic & Joint Mobilization",
      "Neurological Stroke Rehabilitation",
      "Spine Decompression & Sciatica Care",
      "Sports Injury Conditioning",
      "Geriatric Balance & Fall Prevention",
      "Post-Surgical TKR/THR Rehab",
      "Women's Health & Pelvic Floor",
      "Pediatric Neuro-Development",
    ],
    amenities: [
      "Air-Conditioned Private Treatment Cabins",
      "Wheelchair Accessible Ground Floor",
      "Free High-Speed Wi-Fi & Lounge",
      "Dedicated Parking Available",
      "Digital Gait Analysis Lab",
      "Emergency Medical Oxygen & Vitals Kit",
      "Digital Invoicing & Insurance Support",
      "In-House High-End Modalities",
    ],
    equipment: [
      "High-Intensity Class IV Laser Therapy Unit",
      "Multi-Channel Interferential Therapy (IFT)",
      "High-Frequency Therapeutic Ultrasound (1 & 3 MHz)",
      "Continuous Passive Motion (CPM) Knee Unit",
      "Lumbar & Cervical Electronic Traction Bed",
      "Pneumatic Deep Tissue Massager & Recovery Boots",
      "Digital Muscle Stimulator (TENS / Russian)",
      "Dynamic Balance & Stability Platform",
    ],
    doctors: [
      {
        name: "Dr. Kajal Vora, PT",
        qualification: "MPT (Neurology), BPT, MIAP",
        specialization: "Senior Neuro Consultant & Clinical Lead",
        experience: "12+ Years Experience",
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
      },
      {
        name: "Dr. Twinkle Patel, PT",
        qualification: "BPT, MIAP, Certified Manual Therapist",
        specialization: "Orthopedic & Spine Rehabilitation Specialist",
        experience: "10+ Years Experience",
        imageUrl: "https://images.unsplash.com/photo-1594824813686-45543d3b76cf?auto=format&fit=crop&q=80&w=600",
      },
    ],
    consultationFee: "₹600 In-Clinic Assessment · Home Care Sessions Available",
    description: "Aries PhysioCare Center in New MHB Colony, Borivali West is our premier physical clinic and clinical wellness hub. Equipped with world-class electrotherapy modalities, private therapy suites, and senior hospital-trained specialists, we provide personalized healing for acute and chronic musculoskeletal, neurological, and post-operative conditions.",
  },
];
