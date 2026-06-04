import type {
  BlogPost,
  HistoricalEarnings,
  PendingTx,
  ReservationLog,
  VehicleAsset,
} from '@/features/admin/types';

const SEED_FLEET: VehicleAsset[] = [
    {
      id: 'V001',
      modelName: 'BMW iX3 M Sport',
      plateNumber: 'AA-2-A8944',
      status: 'Available',
      batteryOrFuel: '94%',
      currentLocation: 'Bole Hub',
    },
    {
      id: 'V002',
      modelName: 'BMW iX xDrive50',
      plateNumber: 'AA-2-B1102',
      status: 'On Rental',
      batteryOrFuel: '42%',
      currentLocation: 'In Transit',
    },
    {
      id: 'V003',
      modelName: 'BMW 5 Series Sedan',
      plateNumber: 'AA-2-C5591',
      status: 'Maintenance',
      batteryOrFuel: '100%',
      currentLocation: 'Sarbet Workshop',
    },
];

const SEED_BLOGS: BlogPost[] = [
    {
      id: 'B001',
      title: 'The Future of Multi-Chain Decentralized Mobility Architecture',
      category: 'INSIGHTS',
      publishedDate: '2026-05-18',
      author: 'Admin Core',
      status: 'Published',
    },
    {
      id: 'B002',
      title: 'Optimizing Fleet Allocation Parameters via Cryptographic Signatures',
      category: 'ENGINEERING',
      publishedDate: '2026-05-24',
      author: 'Kidus Tilahun',
      status: 'Draft',
    },
];

const SEED_TRANSACTIONS: PendingTx[] = [
    {
      txHash: '0x7a91...4e21',
      clientName: 'Kidus Tilahun',
      clientEmail: 'kidustilahunet@gmail.com',
      asset: 'USDC',
      amount: '450.00',
      amountUSD: '$450.00',
      chain: 'ERC-20',
      status: 'Pending Verification',
    },
];

const SEED_RESERVATIONS: ReservationLog[] = [
    {
      id: 'R9081',
      clientName: 'Kidus Tilahun',
      vehicleModel: 'BMW iX3 M Sport',
      pickupDate: '2026-06-05',
      returnDate: '2026-06-12',
      allocationStatus: 'Confirmed',
    },
];

const SEED_EARNINGS: HistoricalEarnings = {
  clearedGrossUSD: 14850.0,
  fiatWireVolumeUSD: 8400.0,
  cryptoSettledUSD: 6450.0,
};

export const adminSeedData = {
  fleet: SEED_FLEET,
  blogs: SEED_BLOGS,
  pendingTransactions: SEED_TRANSACTIONS,
  reservations: SEED_RESERVATIONS,
  historicalEarnings: SEED_EARNINGS,
} as const;

/** Simulated async data layer — replace with real API calls when backend is wired. */
export const fetchAdminFleet = async (): Promise<VehicleAsset[]> =>
  structuredClone(SEED_FLEET);

export const fetchAdminBlogs = async (): Promise<BlogPost[]> =>
  structuredClone(SEED_BLOGS);

export const fetchPendingTransactions = async (): Promise<PendingTx[]> =>
  structuredClone(SEED_TRANSACTIONS);

export const fetchReservations = async (): Promise<ReservationLog[]> =>
  structuredClone(SEED_RESERVATIONS);

export const fetchHistoricalEarnings = async (): Promise<HistoricalEarnings> =>
  structuredClone(SEED_EARNINGS);

export const deleteVehicleAsset = async (id: string): Promise<{ ok: true }> => {
  if (!id) throw new Error('Vehicle id is required');
  return { ok: true };
};

export const deleteBlogPost = async (id: string): Promise<{ ok: true }> => {
  if (!id) throw new Error('Blog id is required');
  return { ok: true };
};
