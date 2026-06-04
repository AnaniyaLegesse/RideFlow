import type { FleetVehicle } from '@/features/fleet-catalog/types';

const SEED_VEHICLES: FleetVehicle[] = [
  {
    id: 'cadillac-escalade',
    category: 'PREMIUM LARGE SUV',
    model: 'CADILLAC ESCALADE V',
    image: '/images/catalog/cadillac escalade v.avif',
    seats: 7,
    bags: 4,
    transmission: 'Automatic',
    isTopPick: true,
    isHotOffer: true,
    isPremium: true,
    pricePerDay: 189.5,
    totalPrice: 758.0,
    features: [
      '4 Doors',
      '7 Seats',
      'Holds 4 Large Bags',
      'Bluetooth SYNC',
      'Back-up Camera',
      'A/C Air Conditioning',
      'AWD Protocol',
    ],
  },
  {
    id: 'bmw-m5',
    category: 'PERFORMANCE SEDAN',
    model: 'BMW M5 COMPETITION',
    image: '/images/catalog/BMW-M5.png',
    seats: 5,
    bags: 3,
    transmission: 'Automatic',
    isTopPick: false,
    isHotOffer: false,
    isPremium: true,
    pricePerDay: 145.0,
    totalPrice: 580.0,
    features: [
      '4 Doors',
      '5 Seats',
      'Holds 3 Bags',
      'M-Sport Exhaust',
      'Head-Up Display',
      'Dual-Zone A/C',
      'Launch Control',
    ],
  },
  {
    id: 'mercedes-e',
    category: 'EXECUTIVE SEDAN',
    model: 'MERCEDES-BENZ E-CLASS',
    image: '/images/catalog/mercedes-benz.avif',
    seats: 5,
    bags: 4,
    transmission: 'Automatic',
    isTopPick: false,
    isHotOffer: false,
    isPremium: false,
    pricePerDay: 112.25,
    totalPrice: 449.0,
    features: [
      '4 Doors',
      '5 Seats',
      'Holds 4 Bags',
      'Burmester Sound',
      'Ambient Lighting',
      'Thermatic A/C',
      'Leather Interior',
    ],
  },
  {
    id: 'mercedes-c300',
    category: 'LUXURY SEDAN',
    model: 'MERCEDES-BENZ C300',
    image: '/images/catalog/BMW-M5.png',
    seats: 5,
    bags: 3,
    transmission: 'Automatic',
    isTopPick: true,
    isHotOffer: false,
    isPremium: true,
    pricePerDay: 120.0,
    totalPrice: 480.0,
    features: [
      '4 Doors',
      '5 Seats',
      'Holds 3 Bags',
      'Leather Interior',
      'Panoramic Sunroof',
      'Dual-Zone Climate Control',
      'Wireless Charging',
    ],
  },

  {
    id: 'audi-q7',
    category: 'LUXURY SUV',
    model: 'AUDI Q7 QUATTRO',
    image: '/images/catalog/BMW-M5.png',
    seats: 7,
    bags: 5,
    transmission: 'Automatic',
    isTopPick: false,
    isHotOffer: true,
    isPremium: true,
    pricePerDay: 165.0,
    totalPrice: 660.0,
    features: [
      '5 Doors',
      '7 Seats',
      'Holds 5 Bags',
      'Quattro AWD',
      'Virtual Cockpit',
      'Adaptive Cruise Control',
      'Premium Sound System',
    ],
  },

  {
    id: 'range-rover-sport',
    category: 'PREMIUM SUV',
    model: 'RANGE ROVER SPORT',
    image: '/images/catalog/BMW-M5.png',
    seats: 5,
    bags: 4,
    transmission: 'Automatic',
    isTopPick: true,
    isHotOffer: false,
    isPremium: true,
    pricePerDay: 210.0,
    totalPrice: 840.0,
    features: [
      '5 Doors',
      '5 Seats',
      'Holds 4 Bags',
      'Terrain Response System',
      'Meridian Audio',
      'Panoramic Roof',
      '360° Camera',
    ],
  },

  {
    id: 'porsche-911',
    category: 'SPORTS CAR',
    model: 'PORSCHE 911 CARRERA',
    image: '/images/catalog/BMW-M5.png',
    seats: 2,
    bags: 2,
    transmission: 'Automatic',
    isTopPick: false,
    isHotOffer: false,
    isPremium: true,
    pricePerDay: 295.0,
    totalPrice: 1180.0,
    features: [
      '2 Doors',
      '2 Seats',
      'Holds 2 Bags',
      'Sport Chrono Package',
      'Launch Control',
      'Sport Exhaust',
      'Bose Surround Sound',
    ],
  },

  {
    id: 'toyota-land-cruiser',
    category: 'FULL-SIZE SUV',
    model: 'TOYOTA LAND CRUISER',
    image: '/images/catalog/BMW-M5.png',
    seats: 7,
    bags: 6,
    transmission: 'Automatic',
    isTopPick: false,
    isHotOffer: true,
    isPremium: false,
    pricePerDay: 140.0,
    totalPrice: 560.0,
    features: [
      '5 Doors',
      '7 Seats',
      'Holds 6 Bags',
      '4x4 Drivetrain',
      'Adaptive Suspension',
      'Rear A/C Vents',
      'Off-Road Assist Modes',
    ],
  },
];

export const fleetCatalogSeedData = {
  vehicles: SEED_VEHICLES,
} as const;

export const fetchFleetVehicles = async (): Promise<FleetVehicle[]> =>
  structuredClone(SEED_VEHICLES);

export const getFleetVehicleById = async (
  id: string
): Promise<FleetVehicle | null> =>
  structuredClone(SEED_VEHICLES.find((vehicle) => vehicle.id === id) ?? null);

export const getInvoiceDepositAddress = (asset: string): string =>
  asset === 'SOL'
    ? 'BwZ8vK74mX92pkSLe94wQrtZ1A6v7xYp'
    : '0x9E2a4C8Fd40F7831B6839351C9Bf3900A45e75D4';

export const connectCheckoutWallet = async (): Promise<{ address: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { address: '0x71C...B29a' };
};
