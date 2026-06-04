'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { fetchBookings } from '@/features/dashboard/services/dashboardService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { Booking } from '@/features/dashboard/types';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings()
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const onAddBooking = useCallback(() => {
    alert('Redirecting to vehicle fleet catalog...');
  }, []);

  const onBookNow = useCallback(() => {
    alert('Redirecting to fleet selection...');
  }, []);

  if (loading) return <div className="p-8 text-center">Loading bookings...</div>;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div className="animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 mb-8">
        <h1 className="text-dashboard-hero text-brand-ink tracking-tight">
          YOUR BOOKINGS
        </h1>
        <Button variant="accent" label="Add booking" onClick={onAddBooking} />
      </div>

      {bookings.length === 0 ? (
        <div className="w-full bg-admin-surface-muted p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-none border border-admin-border/60">
          <div className="flex items-start gap-4">
            <span className="text-[20px] mt-0.5 select-none opacity-80">📋</span>
            <div>
              <h4 className="text-dashboard-empty-title text-brand-ink">
                No dynamic booking records discovered.
              </h4>
              <p className="text-dashboard-field text-brand-secondary mt-1">
                Your upcoming rentals and fleet operations will appear here. Make a new
                arrangement today.
              </p>
            </div>
          </div>
          <TextLink label="Book now ›" onClick={onBookNow} />
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border border-admin-border p-6 flex flex-col md:flex-row justify-between gap-4 rounded-none"
            >
              <div>
                <div className="font-bold">{b.vehicleModel}</div>
                <div className="text-sm text-brand-muted">{b.pickupDate} – {b.returnDate}</div>
              </div>
              <div className="font-mono">{b.pricePaid}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}