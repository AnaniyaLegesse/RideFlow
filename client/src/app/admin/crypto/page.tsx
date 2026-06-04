'use client';

import { useState, useEffect } from 'react';
import { CryptoClearingTab } from '@/features/admin/components/tabs/CryptoClearingTab';
import { fetchPendingTransactions } from '@/features/admin/services/adminService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { PendingTx } from '@/features/admin/types';

export default function AdminCryptoPage() {
  const [transactions, setTransactions] = useState<PendingTx[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingTransactions()
      .then(setTransactions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading crypto clearing data...</div>;
  if (error) return <ErrorBanner message={error} />;

  return <CryptoClearingTab pendingTransactions={transactions} />;
}