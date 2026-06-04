'use client';

import { useState } from 'react';
import { getFlexDayRate, getFlexTotalPrice } from '@/features/fleet-catalog/lib/fleetCatalogPricing';
import type { FleetVehicle, RentalRate } from '@/features/fleet-catalog/types';

interface CarDetailPanelProps {
  car: FleetVehicle;
  onClose: () => void;
  onSelectConfiguration: (rate: RentalRate) => void;
}

export const CarDetailPanel = ({
  car,
  onClose,
  onSelectConfiguration,
}: CarDetailPanelProps) => {
  const [selectedRate, setSelectedRate] = useState<RentalRate>('best');
  const bestDayRate = car.pricePerDay;
  const flexDayRate = getFlexDayRate(car.pricePerDay);

  return (
    <div className="w-full bg-admin-surface border border-admin-border flex flex-col lg:flex-row relative overflow-hidden mt-12 rounded-none">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-30 text-brand-muted hover:text-brand-ink text-2xl font-light w-8 h-8 flex items-center justify-center transition-colors bg-transparent border-none"
      >
        ✕
      </button>

      <div className="w-full lg:w-[55%] bg-admin-surface-muted p-8 flex flex-col justify-between min-h-[420px] lg:min-h-[500px]">
        <div>
          <h2 className="text-brand-ink text-[24px] font-bold uppercase tracking-normal leading-[1.25]">
            {car.category}
          </h2>
          <span className="text-brand-muted text-admin-body font-light tracking-normal block mt-1 uppercase">
            {car.model} or similar ⓘ
          </span>
        </div>

        <div className="my-6 relative flex items-center justify-center h-48 w-full">
          <img
            src={car.image}
            alt={car.model}
            className="max-w-[90%] max-h-full object-contain relative z-10 select-none pointer-events-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {car.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1.5 bg-admin-surface border border-admin-border text-brand-secondary text-admin-body-sm font-normal rounded-none"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[45%] bg-admin-surface p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-admin-border">
        <div className="space-y-6">
          <h3 className="text-brand-ink text-[18px] font-bold uppercase tracking-normal">
            Choose your rate
          </h3>

          <div className="space-y-3">
            <RateOption
              title="Best Price"
              description="Book and settle instantly to secure the lowest base rate option."
              dayRate={bestDayRate}
              total={car.totalPrice}
              selected={selectedRate === 'best'}
              onSelect={() => setSelectedRate('best')}
            />
            <RateOption
              title="Best for Flexibility"
              description="Free modifications and cancellation up to 24 hours prior to handover."
              dayRate={flexDayRate}
              total={getFlexTotalPrice(car.totalPrice)}
              selected={selectedRate === 'flexible'}
              onSelect={() => setSelectedRate('flexible')}
            />
          </div>
        </div>

        <div className="pt-6 border-t border-admin-border mt-8 lg:mt-0">
          <button
            type="button"
            onClick={() => onSelectConfiguration(selectedRate)}
            className="w-full h-12 bg-brand-primary hover:bg-brand-primary-hover text-admin-surface font-bold text-dashboard-cta tracking-wide uppercase transition-colors border-none rounded-none px-8 py-3.5"
          >
            Select Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

interface RateOptionProps {
  title: string;
  description: string;
  dayRate: number;
  total: number;
  selected: boolean;
  onSelect: () => void;
}

const RateOption = ({
  title,
  description,
  dayRate,
  total,
  selected,
  onSelect,
}: RateOptionProps) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onSelect}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') onSelect();
    }}
    className={`p-4 bg-admin-surface border cursor-pointer transition-all flex items-start gap-4 rounded-none ${
      selected
        ? 'border-brand-primary ring-1 ring-brand-primary'
        : 'border-admin-border hover:border-admin-border-strong'
    }`}
  >
    <input
      type="radio"
      checked={selected}
      onChange={onSelect}
      className="mt-1 h-4 w-4 accent-brand-primary"
    />
    <div className="flex justify-between items-start w-full">
      <div className="space-y-1">
        <h4 className="text-dashboard-field font-bold text-brand-ink">{title}</h4>
        <p className="text-admin-body font-light text-brand-secondary max-w-[210px] leading-[1.55]">
          {description}
        </p>
      </div>
      <div className="text-right">
        <span className="text-dashboard-field font-bold text-brand-ink">
          ${dayRate.toFixed(2)}
        </span>
        <span className="text-admin-body-sm font-normal text-brand-muted block">/ day</span>
        <span className="text-admin-body-sm font-normal text-brand-muted block mt-1">
          ${total.toFixed(2)} total
        </span>
      </div>
    </div>
  </div>
);
