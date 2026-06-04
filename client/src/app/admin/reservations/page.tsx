// app/admin/reservations/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { AdminDataTable } from '@/features/admin/components/AdminDataTable';
import { fetchReservations } from '@/features/admin/services/adminService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { ReservationLog } from '@/features/admin/types';

const HEADERS = [
  'Reservation ID',
  'Consumer Identity',
  'Allocated Fleet Unit',
  'Timeline Span',
  'Fulfillment State',
] as const;

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

  return (
    <div className="space-y-6">
      <AdminSectionHeader title="CENTRAL RESERVATION LOGS" />
      <AdminDataTable headers={[...HEADERS]} headClassName="text-admin-table-head">
        {reservations.map((res) => (
          <tr key={res.id} className="border-b border-admin-border last:border-none">
            <td className="p-4 font-mono font-bold text-brand-ink">{res.id}</td>
            <td className="p-4 font-medium text-brand-ink-emphasis">{res.clientName}</td>
            <td className="p-4 text-brand-secondary">{res.vehicleModel}</td>
            <td className="p-4 font-mono text-[13px] text-brand-muted">
              {res.pickupDate} — {res.returnDate}
            </td>
            <td className="p-4">
              <span className="text-[11px] font-bold px-2 py-0.5 bg-brand-success/10 text-brand-success uppercase tracking-wider">
                {res.allocationStatus}
              </span>
            </td>
          </tr>
        ))}
      </AdminDataTable>
    </div>
  );
}