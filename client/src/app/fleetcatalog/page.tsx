'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FleetCatalogHeader } from '@/features/fleet-catalog/components/FleetCatalogHeader';
import { FleetCatalogTabBar } from '@/features/fleet-catalog/components/FleetCatalogTabBar';
import { FleetCatalogVehicleGrid } from '@/features/fleet-catalog/components/FleetCatalogVehicleGrid';
import { CarDetailPanel } from '@/features/fleet-catalog/components/catalog/CarDetailPanel';
import { FleetFilterPanel } from '@/features/fleet-catalog/components/filters/FleetFilterPanel';
import { FleetCatalogShell } from '@/features/fleet-catalog/components/FleetCatalogShell';
import { fetchFleetVehicles } from '@/features/fleet-catalog/services/fleetCatalogService';
import {
  DEFAULT_FLEET_FILTERS,
  filterFleetVehicles,
} from '@/features/fleet-catalog/lib/fleetCatalogFilters';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { FleetVehicle, FleetCatalogFilters, RentalRate } from '@/features/fleet-catalog/types';

export default function FleetCatalogPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('Recommended');
  const [selectedCar, setSelectedCar] = useState<FleetVehicle | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState<FleetCatalogFilters>({ ...DEFAULT_FLEET_FILTERS });
  const detailPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchFleetVehicles()
      .then(setVehicles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredVehicles = filterFleetVehicles(vehicles, activeFilter, filters);

  const handleTabClick = useCallback((tabName: string, triggerPanel?: boolean) => {
    if (triggerPanel) {
      setIsFilterPanelOpen(true);
      return;
    }
    setActiveFilter(tabName);
  }, []);

  const handleCarSelect = useCallback((car: FleetVehicle) => {
    setSelectedCar(car);
    setTimeout(() => {
      detailPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FLEET_FILTERS });
  }, []);

  const updateFilter = useCallback(
    <K extends keyof FleetCatalogFilters>(key: K, value: FleetCatalogFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const startCheckout = useCallback(
    (car: FleetVehicle, rate: RentalRate) => {
      router.push(`/checkout?carId=${encodeURIComponent(car.id)}&rateId=${rate}`);
    },
    [router]
  );

  if (loading) return <div className="p-8 text-center">Loading fleet catalog...</div>;
  if (error) return <ErrorBanner message={error} />;

  return (
    <FleetCatalogShell>
      <FleetCatalogHeader />

      <FleetCatalogTabBar activeFilter={activeFilter} onTabClick={handleTabClick} />

      <FleetCatalogVehicleGrid
        vehicles={filteredVehicles}
        selectedCarId={selectedCar?.id ?? null}
        onSelectCar={handleCarSelect}
      />

      {selectedCar && (
        <div ref={detailPanelRef} className="transition-all duration-300">
          <CarDetailPanel
            car={selectedCar}
            onClose={() => setSelectedCar(null)}
            onSelectConfiguration={(rate) => startCheckout(selectedCar, rate)}
          />
        </div>
      )}

      <FleetFilterPanel
        isOpen={isFilterPanelOpen}
        filters={filters}
        resultCount={filteredVehicles.length}
        onClose={() => setIsFilterPanelOpen(false)}
        onClearAll={clearAllFilters}
        onUpdate={updateFilter}
      />
    </FleetCatalogShell>
  );
}