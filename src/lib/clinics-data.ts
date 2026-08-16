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
    badge: "Flagship Integrated Center",
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
    consultationFee: "₹600 In-Clinic Consultation · Home Visits from ₹1,000",
    description: "Aries PhysioCare Flagship Integrated Center in Borivali West is Mumbai's leading state-of-the-art physiotherapy and clinical rehabilitation hub. Equipped with world-class electrotherapy modalities, private therapy suites, and senior hospital-trained specialists, we provide personalized healing for acute and chronic musculoskeletal, neurological, and post-operative conditions.",
  },
  {
    id: "clinic-kurla-west",
    slug: "aries-physiocare-kurla-west-center",
    name: "Aries PhysioCare : Integrated Physiotherapy Center - Kurla West",
    badge: "Central Mumbai Hub",
    isFlagship: false,
    tagline: "Comprehensive In-Clinic & Home Care Clinical Excellence",
    address: "Ground Floor, Wadia Estate Colony, Premier Road, Kurla West, Mumbai, Maharashtra 400070",
    subArea: "Kurla West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400070",
    phone: "+91 9136447006",
    whatsapp: "917372681410",
    googleRating: 4.9,
    reviewCount: 195,
    googleMapsUrl: "https://maps.google.com/?q=Aries+PhysioCare+Kurla+West+Mumbai",
    workingHours: "9:00 AM – 9:30 PM",
    daysOpen: "Monday – Sunday (7 Days Open)",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000",
    ],
    specialties: [
      "Orthopedic Manual Therapy",
      "Post-Operative Rehabilitation",
      "Cervical Spondylosis & Frozen Shoulder",
      "Knee Pain & Osteoarthritis Management",
      "Cardio-Pulmonary Recovery",
    ],
    amenities: [
      "Air-Conditioned Consultation Cabins",
      "Advanced Modalities Suite",
      "Wheelchair Support",
      "Online Booking & Digital Billing",
    ],
    equipment: [
      "Interferential Therapy (IFT) Units",
      "Therapeutic Ultrasound Machines",
      "TENS & Muscle Re-Education Gear",
      "Resistance & Posture Rehab Equipment",
    ],
    doctors: [
      {
        name: "Dr. Twinkle Patel, PT",
        qualification: "BPT, MIAP",
        specialization: "Clinical Consultant",
        experience: "10+ Years Experience",
        imageUrl: "https://images.unsplash.com/photo-1594824813686-45543d3b76cf?auto=format&fit=crop&q=80&w=600",
      },
    ],
    consultationFee: "₹500 In-Clinic Consultation",
    description: "Centrally located in Kurla West, this center provides rapid access to expert physiotherapy care for residents across BKC, Chembur, Ghatkopar, and Sion.",
  },
  {
    id: "clinic-andheri-west",
    slug: "aries-physiocare-andheri-west-center",
    name: "Aries PhysioCare : Center of Excellence - Andheri West",
    badge: "Western Suburbs Hub",
    isFlagship: false,
    tagline: "Sports Conditioning & Advanced Musculoskeletal Care",
    address: "2nd Floor, Lotus Grandeur, Veera Desai / New Link Road, Andheri West, Mumbai, Maharashtra 400053",
    subArea: "Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400053",
    phone: "+91 9136447006",
    whatsapp: "917372681410",
    googleRating: 4.9,
    reviewCount: 220,
    googleMapsUrl: "https://maps.google.com/?q=Aries+PhysioCare+Andheri+West+Mumbai",
    workingHours: "8:00 AM – 9:00 PM",
    daysOpen: "Monday – Sunday (7 Days Open)",
    imageUrl: "https://images.unsplash.com/photo-1584820927500-47b2d5edb151?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1584820927500-47b2d5edb151?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    ],
    specialties: [
      "Sports Injury Rehab & ACL Return-to-Play",
      "Spine Health & Postural Alignment",
      "Laser Therapy for Rapid Pain Relief",
      "Ergonomic Pain Management for Professionals",
    ],
    amenities: [
      "Modern Biomechanics Lab",
      "Private Therapy Rooms",
      "Valet Parking Facility",
      "Tea/Coffee Lounge",
    ],
    equipment: [
      "Class IV Laser Therapy",
      "IFT & Multi-Vector Muscle Stimulators",
      "Dry Needling & Myofascial Tools",
      "Spine Mobilization Tables",
    ],
    doctors: [
      {
        name: "Dr. Sam Evans, PT",
        qualification: "MPT (Sports Medicine), CSCS",
        specialization: "Sports Rehabilitation Director",
        experience: "15+ Years Experience",
        imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
      },
    ],
    consultationFee: "₹600 In-Clinic Consultation",
    description: "Located near Veera Desai Road, our Andheri West center offers specialized athletic conditioning, post-surgery recovery, and computer-vision assisted postural rehabilitation.",
  },
  {
    id: "clinic-south-delhi",
    slug: "aries-physiocare-south-delhi-center",
    name: "Aries PhysioCare : Integrated Rehabilitation Center - South Delhi",
    badge: "Delhi NCR Hub",
    isFlagship: false,
    tagline: "Premier Spine, Neuro & Sports Physical Therapy",
    address: "C-Block, Greater Kailash 1 (GK-1) / Vasant Vihar Medical Enclave, New Delhi 110048",
    subArea: "Greater Kailash",
    city: "Delhi",
    state: "Delhi",
    pincode: "110048",
    phone: "+91 9136447006",
    whatsapp: "917372681410",
    googleRating: 4.9,
    reviewCount: 165,
    googleMapsUrl: "https://maps.google.com/?q=Aries+PhysioCare+South+Delhi",
    workingHours: "8:00 AM – 8:30 PM",
    daysOpen: "Monday – Sunday",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000",
    ],
    specialties: [
      "Spinal Decompression",
      "Stroke & Neurological Rehab",
      "Geriatric Mobility Care",
      "Sports Biomechanics",
    ],
    amenities: [
      "Spacious Private Cabins",
      "Easy Metro & Road Connectivity",
      "Senior Citizen Friendly Access",
    ],
    equipment: [
      "Digital Laser & Ultrasound Modalities",
      "Electrotherapy Suites",
      "Gait & Balance Trackers",
    ],
    doctors: [
      {
        name: "Dr. Sam Evans, PT",
        qualification: "MPT (Sports), CSCS",
        specialization: "Clinical Consultant",
        experience: "15+ Years Experience",
        imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
      },
    ],
    consultationFee: "₹600 In-Clinic Consultation",
    description: "Our South Delhi Center brings hospital-grade clinical rehabilitation to patients across South Delhi, Noida, and Gurugram.",
  },
  {
    id: "clinic-bengaluru-indiranagar",
    slug: "aries-physiocare-indiranagar-bengaluru-center",
    name: "Aries PhysioCare : Tech & Spine Rehab Center - Indiranagar Bengaluru",
    badge: "Bengaluru Hub",
    isFlagship: false,
    tagline: "Ergonomic Rehab & Advanced Spine Decompression",
    address: "100 Feet Road, Near 12th Main, Indiranagar, Bengaluru, Karnataka 560038",
    subArea: "Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    phone: "+91 9136447006",
    whatsapp: "917372681410",
    googleRating: 4.9,
    reviewCount: 180,
    googleMapsUrl: "https://maps.google.com/?q=Aries+PhysioCare+Indiranagar+Bengaluru",
    workingHours: "8:00 AM – 9:00 PM",
    daysOpen: "Monday – Sunday",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    ],
    specialties: [
      "Tech-Neck & Ergonomic Strain",
      "Lumbar Disc Herniation & Sciatica",
      "Sports Injury Rehabilitation",
      "Posture & Core Correction",
    ],
    amenities: [
      "Ergonomic Assessment Suite",
      "Smart Posture Sensor Lab",
      "Complimentary Valet Parking",
    ],
    equipment: [
      "High-Frequency Ultrasound",
      "Laser & IFT Modalities",
      "Spinal Traction & Decompression Unit",
    ],
    doctors: [
      {
        name: "Dr. Chloe Davis, PT",
        qualification: "MPT (Musculoskeletal Disorders)",
        specialization: "Spine & Pain Management Lead",
        experience: "8+ Years Experience",
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
      },
    ],
    consultationFee: "₹600 In-Clinic Consultation",
    description: "Designed for Bengaluru's active and tech-driven population, offering specialized posture, spine, and muscle restoration protocols.",
  },
];
