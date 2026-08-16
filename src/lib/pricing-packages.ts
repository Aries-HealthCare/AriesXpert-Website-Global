/**
 * Aries PhysioCare - Default Tier & Package Pricing System
 * Matches the official Aries PhysioCare Packages Flyer
 */

export interface PackageTierOption {
  days: number; // 10, 15, 20, 30
  ratePerSession: number;
  totalPrice: number;
  totalSavings: number;
  discountPercent: number;
}

export interface PricingTier {
  id: 'economy' | 'standard' | 'premium' | 'luxury';
  name: string;
  badge: string;
  basePrice: number;
  currency: string;
  description: string;
  recommendedFor: string;
  themeColor: string;
  badgeColor: string;
  packages: {
    days10: PackageTierOption;
    days15: PackageTierOption;
    days20: PackageTierOption;
    days30: PackageTierOption;
  };
}

export const STANDARD_PRICING_TIERS: Record<string, PricingTier> = {
  economy: {
    id: 'economy',
    name: 'Economy Tier',
    badge: '₹1000/-',
    basePrice: 1000,
    currency: 'INR',
    description: 'Affordable expert home physiotherapy for suburban & growing localities.',
    recommendedFor: 'Kalyan, Dombivli, Diva, Dahisar, Virar, Suburban Outskirts',
    themeColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300',
    badgeColor: 'bg-amber-500 text-slate-950',
    packages: {
      days10: {
        days: 10,
        ratePerSession: 950,
        totalPrice: 9500,
        totalSavings: 500,
        discountPercent: 5,
      },
      days15: {
        days: 15,
        ratePerSession: 900,
        totalPrice: 13500,
        totalSavings: 1500,
        discountPercent: 10,
      },
      days20: {
        days: 20,
        ratePerSession: 850,
        totalPrice: 17000,
        totalSavings: 3000,
        discountPercent: 15,
      },
      days30: {
        days: 30,
        ratePerSession: 800,
        totalPrice: 24000,
        totalSavings: 6000,
        discountPercent: 20,
      },
    },
  },
  standard: {
    id: 'standard',
    name: 'Standard Tier',
    badge: '₹1200/-',
    basePrice: 1200,
    currency: 'INR',
    description: 'Most popular comprehensive clinical care for middle-class residential hubs.',
    recommendedFor: 'Andheri East, Goregaon, Borivali, Ghatkopar, Mulund, Thane, Navi Mumbai',
    themeColor: 'from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-300',
    badgeColor: 'bg-blue-600 text-white',
    packages: {
      days10: {
        days: 10,
        ratePerSession: 1100,
        totalPrice: 11000,
        totalSavings: 1000,
        discountPercent: 8.3,
      },
      days15: {
        days: 15,
        ratePerSession: 1050,
        totalPrice: 15750,
        totalSavings: 2250,
        discountPercent: 12.5,
      },
      days20: {
        days: 20,
        ratePerSession: 1000,
        totalPrice: 20000,
        totalSavings: 4000,
        discountPercent: 16.7,
      },
      days30: {
        days: 30,
        ratePerSession: 950,
        totalPrice: 28500,
        totalSavings: 8000,
        discountPercent: 20.8,
      },
    },
  },
  premium: {
    id: 'premium',
    name: 'Premium Tier',
    badge: '₹1500/-',
    basePrice: 1500,
    currency: 'INR',
    description: 'Advanced orthopedic & neuro rehabilitation with specialized modalities.',
    recommendedFor: 'Andheri West, Lokhandwala, Juhu, Dadar, Powai, Chembur, Santacruz, Khar',
    themeColor: 'from-cyan-500/20 to-teal-500/10 border-cyan-500/40 text-cyan-300',
    badgeColor: 'bg-cyan-500 text-slate-950',
    packages: {
      days10: {
        days: 10,
        ratePerSession: 1450,
        totalPrice: 14500,
        totalSavings: 500,
        discountPercent: 3.3,
      },
      days15: {
        days: 15,
        ratePerSession: 1400,
        totalPrice: 21000,
        totalSavings: 1500,
        discountPercent: 6.7,
      },
      days20: {
        days: 20,
        ratePerSession: 1350,
        totalPrice: 27000,
        totalSavings: 3000,
        discountPercent: 10,
      },
      days30: {
        days: 30,
        ratePerSession: 1300,
        totalPrice: 39000,
        totalSavings: 6000,
        discountPercent: 13.3,
      },
    },
  },
  luxury: {
    id: 'luxury',
    name: 'Luxury Tier',
    badge: '₹2000/-',
    basePrice: 2000,
    currency: 'INR',
    description: 'VIP Concierge, Senior Specialist Therapists & South Mumbai / Bandra West Elite Care.',
    recommendedFor: 'South Mumbai, Colaba, Cuffe Parade, Marine Drive, Malabar Hill, Worli, Pali Hill, Bandra West',
    themeColor: 'from-rose-500/20 to-purple-500/10 border-rose-500/40 text-rose-300',
    badgeColor: 'bg-rose-600 text-white',
    packages: {
      days10: {
        days: 10,
        ratePerSession: 1800,
        totalPrice: 18000,
        totalSavings: 2000,
        discountPercent: 10,
      },
      days15: {
        days: 15,
        ratePerSession: 1700,
        totalPrice: 25500,
        totalSavings: 5000,
        discountPercent: 15,
      },
      days20: {
        days: 20,
        ratePerSession: 1600,
        totalPrice: 32000,
        totalSavings: 8000,
        discountPercent: 20,
      },
      days30: {
        days: 30,
        ratePerSession: 1500,
        totalPrice: 45000,
        totalSavings: 15000,
        discountPercent: 25,
      },
    },
  },
};

/**
 * Determine tier based on location name string
 */
export function getTierForLocation(locationName: string): PricingTier {
  const text = (locationName || '').toLowerCase();

  const luxuryKeys = ['colaba', 'cuffe parade', 'marine lines', 'marine drive', 'nariman point', 'malabar hill', 'south mumbai', 'worli', 'lower parel', 'pali hill', 'bandra west', 'bandstand', 'carter road'];
  if (luxuryKeys.some((k) => text.includes(k))) return STANDARD_PRICING_TIERS.luxury;

  const premiumKeys = ['andheri west', 'lokhandwala', 'juhu', 'powai', 'chembur', 'santacruz', 'khar', 'dadar', 'prabhadevi', 'vile parle'];
  if (premiumKeys.some((k) => text.includes(k))) return STANDARD_PRICING_TIERS.premium;

  const economyKeys = ['kalyan', 'dombivli', 'diva', 'dahisar', 'virar', 'nalasopara', 'kurla', 'govandi', 'mankhurd', 'bhiwandi', 'ambernath', 'badlapur'];
  if (economyKeys.some((k) => text.includes(k))) return STANDARD_PRICING_TIERS.economy;

  return STANDARD_PRICING_TIERS.standard;
}
