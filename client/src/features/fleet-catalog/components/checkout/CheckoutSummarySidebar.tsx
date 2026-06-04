'use client';

import type { FleetVehicle, RentalRate } from '@/features/fleet-catalog/types';

interface CheckoutSummarySidebarProps {
  car: FleetVehicle;
  selectedRate: RentalRate;
  onComplete: () => void;
}

export const CheckoutSummarySidebar = ({
  car,
  selectedRate,
  onComplete,
}: CheckoutSummarySidebarProps) => (
  <div className="lg:col-span-5">
    <div className="bg-[#f7f7f7] border border-admin-border p-6 space-y-6 rounded-none">
      <div className="flex items-center gap-4 pb-6 border-b border-admin-border">
        <div className="w-24 h-16 bg-admin-surface border border-admin-border p-1 flex items-center justify-center rounded-none shrink-0">
          <img src={car.image} alt={car.model} className="max-w-full max-h-full object-contain" />
        </div>
        <div>
          <h3 className="text-dashboard-field font-bold text-brand-ink uppercase leading-tight">
            {car.model}
          </h3>
          <span className="text-admin-body-sm font-light text-brand-muted block mt-0.5">
            or similar | {car.category}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-admin-tab text-brand-muted uppercase tracking-wide">
          Pickup and return
        </h4>
        <div className="relative pl-6 space-y-5 border-l border-admin-border-strong ml-2.5 py-1">
          <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-brand-ink" />
          <div className="absolute -left-[4.5px] bottom-2 w-2 h-2 bg-brand-ink" />
          <LocationBlock
            label="Pickup"
            location="Atlanta Int Airport"
            datetime="Tue, Jun 02, 2026 | 12:00 PM"
          />
          <LocationBlock
            label="Return"
            location="Atlanta Int Airport"
            datetime="Sat, Jun 06, 2026 | 12:00 PM"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-admin-border flex justify-between items-center">
        <div className="space-y-0.5">
          <span className="text-admin-tab font-bold text-brand-ink block uppercase tracking-wide">
            Booking option
          </span>
          <span className="text-admin-tab font-light text-brand-secondary block">
            {selectedRate === 'best'
              ? 'Lowest price available for your rental'
              : 'Flexible cancellation protections active'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-admin-body-sm font-bold text-brand-primary bg-admin-surface border border-brand-primary px-2 py-0.5 uppercase tracking-wide rounded-none">
            {selectedRate === 'best' ? 'BEST PRICE' : 'FLEXIBLE'}
          </span>
          <span className="text-brand-muted text-[13px] cursor-pointer hover:text-brand-ink">ⓘ</span>
        </div>
      </div>

      <div className="pt-4 border-t border-admin-border space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-admin-tab text-brand-muted uppercase tracking-wide">
            What&apos;s included
          </h4>
          <span className="text-brand-muted text-[13px] cursor-pointer hover:text-brand-ink">ⓘ</span>
        </div>
        <div className="space-y-2 text-admin-body font-light text-brand-secondary">
          <div className="flex items-center gap-2">
            <span className="text-brand-primary font-bold">✓</span> 24/7 Roadside Assistance Hotline
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-primary font-bold">✓</span> Unlimited miles
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={onComplete}
          className="w-full h-12 bg-brand-primary hover:bg-brand-primary-hover text-admin-surface font-bold text-dashboard-cta uppercase tracking-wide transition-colors rounded-none"
        >
          Complete Reservation
        </button>
      </div>
    </div>
  </div>
);

const LocationBlock = ({
  label,
  location,
  datetime,
}: {
  label: string;
  location: string;
  datetime: string;
}) => (
  <div className="space-y-0.5">
    <span className="text-admin-body-sm font-light text-brand-muted block uppercase">{label}</span>
    <div className="text-admin-body font-bold text-brand-ink">{location}</div>
    <div className="text-admin-tab font-light text-brand-secondary">{datetime}</div>
  </div>
);
