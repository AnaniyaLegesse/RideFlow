// app/checkout/CheckoutClient.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CheckoutDriverForm } from '@/features/fleet-catalog/components/checkout/CheckoutDriverForm';
import { CheckoutHeader } from '@/features/fleet-catalog/components/checkout/CheckoutHeader';
import { CheckoutPaymentSection } from '@/features/fleet-catalog/components/checkout/CheckoutPaymentSection';
import { CheckoutSummarySidebar } from '@/features/fleet-catalog/components/checkout/CheckoutSummarySidebar';
import {
  getFleetVehicleById,
  connectCheckoutWallet,
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
  const [car, setCar] = useState<FleetVehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectedRate = isRentalRate(rateId) ? rateId : 'best';

  const [email, setEmail] = useState('kidustilahunet@gmail.com');
  const [firstName, setFirstName] = useState('Kidus');
  const [lastName, setLastName] = useState('Tilahun');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(true);

  const [selectedCrypto, setSelectedCrypto] = useState<CheckoutCryptoAsset>('USDC');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

  const handleWalletConnect = useCallback(async () => {
    if (isWalletConnected) {
      setIsWalletConnected(false);
      setWalletAddress(null);
      return;
    }
    setIsConnecting(true);
    try {
      const { address } = await connectCheckoutWallet();
      setIsWalletConnected(true);
      setWalletAddress(address);
    } finally {
      setIsConnecting(false);
    }
  }, [isWalletConnected]);

  const copyInvoiceAddress = useCallback(async () => {
    await navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [depositAddress]);

  const completeReservation = useCallback(() => {
    alert(
      `Settle Request Executed using Blockchain Payload parameters: Asset Type [${selectedCrypto}], Wallet Link [${isWalletConnected ? 'YES' : 'NO'}].`
    );
  }, [isWalletConnected, selectedCrypto]);

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
              isWalletConnected={isWalletConnected}
              isConnecting={isConnecting}
              walletAddress={walletAddress}
              copied={copied}
              depositAddress={depositAddress}
              onWalletConnect={handleWalletConnect}
              onCopyAddress={copyInvoiceAddress}
            />
          </div>

          <CheckoutSummarySidebar
            car={car}
            selectedRate={selectedRate}
            onComplete={completeReservation}
          />
        </div>
      </div>
    </div>
  );
}