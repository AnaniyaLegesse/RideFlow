import type {
  AccountProfile,
  Booking,
  DashboardCryptoAsset,
} from '@/features/dashboard/types';

const SEED_PROFILE: AccountProfile = {
  name: 'Kidus Tilahun',
  countryCode: '+1',
  phoneNumber: '',
  email: 'kidustilahunet@gmail.com',
  country: 'United States',
  organization: '',
  department: '',
  recipient: 'Kidus Tilahun',
  street: '',
  number: '',
  additionalAddress: '',
  zipCode: '',
  city: '',
};

const SEED_BOOKINGS: Booking[] = [];

const WALLET_ADDRESSES: Record<
  DashboardCryptoAsset,
  { full: string; truncated: string }
> = {
  USDC: {
    full: '0x9E2a4C8Fd40F7831B6839351C9Bf3900A45e75D4',
    truncated: '0x9E2a4C8F...75D4',
  },
  BTC: {
    full: '0x9E2a4C8Fd40F7831B6839351C9Bf3900A45e75D4',
    truncated: '0x9E2a4C8F...75D4',
  },
  ETH: {
    full: '0x9E2a4C8Fd40F7831B6839351C9Bf3900A45e75D4',
    truncated: '0x9E2a4C8F...75D4',
  },
  SOL: {
    full: 'BwZ8vK74mX92pkSLe94wQrtZ1A6v7xYp',
    truncated: 'BwZ8vK74m...7xYp',
  },
};

export const dashboardSeedData = {
  profile: SEED_PROFILE,
  bookings: SEED_BOOKINGS,
} as const;

export const fetchAccountProfile = async (): Promise<AccountProfile> =>
  structuredClone(SEED_PROFILE);

export const fetchBookings = async (): Promise<Booking[]> =>
  structuredClone(SEED_BOOKINGS);

export const getDepositAddress = (asset: DashboardCryptoAsset): string =>
  WALLET_ADDRESSES[asset].full;

export const getLinkedWalletAddress = (asset: DashboardCryptoAsset): string =>
  WALLET_ADDRESSES[asset].truncated;

/** Simulated Web3 connection — replace with wagmi/rainbowkit when enabled. */
export const connectWallet = async (
  asset: DashboardCryptoAsset
): Promise<{ address: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { address: getLinkedWalletAddress(asset) };
};

export const disconnectWallet = async (): Promise<{ ok: true }> => {
  return { ok: true };
};

export const saveAccountProfile = async (
  profile: AccountProfile
): Promise<AccountProfile> => {
  if (!profile.name.trim()) throw new Error('Name is required');
  return structuredClone(profile);
};
