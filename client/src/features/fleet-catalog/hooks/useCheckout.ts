'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCheckoutBasePrice, getCryptoAmount } from '@/features/fleet-catalog/lib/fleetCatalogPricing';
import {
  connectCheckoutWallet,
  fleetCatalogSeedData,
  getInvoiceDepositAddress,
} from '@/features/fleet-catalog/services/fleetCatalogService';
import type {
  CheckoutCryptoAsset,
  RentalRate,
} from '@/features/fleet-catalog/types';

const isRentalRate = (value: string | null): value is RentalRate =>
  value === 'best' || value === 'flexible';

export const useCheckout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId');
  const rateId = searchParams.get('rateId');
  const car = useMemo(
    () => fleetCatalogSeedData.vehicles.find((vehicle) => vehicle.id === carId) ?? null,
    [carId]
  );
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

  const basePrice = car ? getCheckoutBasePrice(car, selectedRate) : 0;
  const totalMainStr = Math.floor(basePrice).toString();
  const cryptoAmount = getCryptoAmount(selectedCrypto, basePrice);

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
    await navigator.clipboard.writeText(getInvoiceDepositAddress(selectedCrypto));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [selectedCrypto]);

  const completeReservation = useCallback(() => {
    alert(
      `Settle Request Executed using Blockchain Payload parameters: Asset Type [${selectedCrypto}], Wallet Link [${isWalletConnected ? 'YES' : 'NO'}].`
    );
  }, [isWalletConnected, selectedCrypto]);

  return {
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    company,
    setCompany,
    isAgeConfirmed,
    setIsAgeConfirmed,
    selectedCrypto,
    setSelectedCrypto,
    isWalletConnected,
    isConnecting,
    walletAddress,
    copied,
    basePrice,
    totalMainStr,
    cryptoAmount,
    handleWalletConnect,
    copyInvoiceAddress,
    completeReservation,
    car,
    selectedRate,
    goBack: () => router.push('/fleetcatalog'),
    depositAddress: getInvoiceDepositAddress(selectedCrypto),
  };
};
