import { AdminDataTable } from '@/features/admin/components/AdminDataTable';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import type { ReservationLog } from '@/features/admin/types';

const HEADERS = [
  'Reservation ID',
  'Consumer Identity',
  'Allocated Fleet Unit',
  'Timeline Span',
  'Fulfillment State',
] as const;

interface ReservationTabProps {
  reservations: ReservationLog[];
}

export const ReservationTab = ({ reservations }: ReservationTabProps) => (
  <div className="animate-in fade-in duration-150 space-y-6">
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
