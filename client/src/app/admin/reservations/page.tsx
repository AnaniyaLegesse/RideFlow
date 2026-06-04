'use client';

import { useState, useEffect } from 'react';
import { ReservationTab } from '@/features/admin/components/tabs/ReservationTab';
import { fetchReservations } from '@/features/admin/services/adminService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { ReservationLog } from '@/features/admin/types';

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<ReservationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations()
      .then(setReservations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading reservation logs...</div>;
  if (error) return <ErrorBanner message={error} />;

  return <ReservationTab reservations={reservations} />;
}