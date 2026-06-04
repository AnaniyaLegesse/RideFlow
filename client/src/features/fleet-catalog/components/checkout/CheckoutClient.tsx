'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import { CheckoutDriverForm } from '@/features/fleet-catalog/components/checkout/CheckoutDriverForm';
import { CheckoutHeader } from '@/features/fleet-catalog/components/checkout/CheckoutHeader';
import { CheckoutPaymentSection } from '@/features/fleet-catalog/components/checkout/CheckoutPaymentSection';
import { CheckoutSummarySidebar } from '@/features/fleet-catalog/components/checkout/CheckoutSummarySidebar';
import {
  getFleetVehicleById,
  getInvoiceDepositAddress,
} from '@/features/fleet-catalog/services/fleetCatalogService';
import {
  getCheckoutBasePrice,
  getCryptoAmount,
} from '@/features/fleet-catalog/lib/fleetCatalogPricing';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { FleetVehicle, CheckoutCryptoAsset, RentalRate } from '@/features/fleet-catalog/types';

const isRentalRate = (value: string | null): value is RentalRate =>
  value === 'best' || value === 'flexible';

interface CheckoutClientProps {
  carId: string | null;
  rateId: string | null;
}

export default function CheckoutClient({ carId, rateId }: CheckoutClientProps) {
  const router = useRouter();

  // Real wallet connection
  const { address, isConnected, connectWallet, disconnectWallet, isConnecting } = useWalletConnection();

  // Car & rate state
  const [car, setCar] = useState<FleetVehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectedRate = isRentalRate(rateId) ? rateId : 'best';

  // Driver form state
  const [email, setEmail] = useState('kidustilahunet@gmail.com');
  const [firstName, setFirstName] = useState('Kidus');
  const [lastName, setLastName] = useState('Tilahun');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(true);

  // Payment state (still mock for now)
  const [selectedCrypto, setSelectedCrypto] = useState<CheckoutCryptoAsset>('USDC');
  const [copied, setCopied] = useState(false);

  // Load car data
  useEffect(() => {
    if (!carId) {
      setError('No car selected');
      setLoading(false);
      return;
    }
    getFleetVehicleById(carId)
      .then((vehicle) => {
        if (!vehicle) throw new Error('Vehicle not found');
        setCar(vehicle);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [carId]);

  const basePrice = car ? getCheckoutBasePrice(car, selectedRate) : 0;
  const totalMainStr = Math.floor(basePrice).toString();
  const cryptoAmount = getCryptoAmount(selectedCrypto, basePrice);
  const depositAddress = getInvoiceDepositAddress(selectedCrypto);

  // Real wallet connect handler (replaces mock)
  const handleWalletConnect = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  const copyInvoiceAddress = useCallback(async () => {
    await navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [depositAddress]);

  const goBack = () => router.push('/fleetcatalog');

  if (loading) return <div className="p-8 text-center">Loading checkout...</div>;
  if (error || !car) return <ErrorBanner message={error || 'Car data unavailable'} />;

  return (
    <div className="w-full bg-admin-surface min-h-screen text-brand-ink py-12 px-4 md:px-8 animate-in fade-in duration-200">
      <div className="max-w-admin-container mx-auto">
        <CheckoutHeader totalMainStr={totalMainStr} onBack={goBack} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-10">
            <CheckoutDriverForm
              email={email}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              company={company}
              setCompany={setCompany}
              isAgeConfirmed={isAgeConfirmed}
              setIsAgeConfirmed={setIsAgeConfirmed}
            />

            <CheckoutPaymentSection
              selectedCrypto={selectedCrypto}
              setSelectedCrypto={setSelectedCrypto}
              cryptoAmount={cryptoAmount}
              isWalletConnected={isConnected}
              isConnecting={isConnecting}
              walletAddress={address ?? null}
              copied={copied}
              depositAddress={depositAddress}
              onWalletConnect={handleWalletConnect}
              onCopyAddress={copyInvoiceAddress}
            />

            {/* Payment button is disabled for now – just wallet connection works */}
            <div className="pt-4">
              <button
                disabled={true}
                className="w-full h-12 bg-gray-400 text-white font-bold uppercase tracking-wide cursor-not-allowed"
              >
                Payment coming soon (backend integration)
              </button>
            </div>
          </div>

          <CheckoutSummarySidebar car={car} selectedRate={selectedRate} onComplete={() => {}} />
        </div>
      </div>
    </div>
  );
}