'use client';

import { FleetDispositionGrid } from '@/features/admin/components/grids/FleetDispositionGrid';
import { FinancialMetricsGrid } from '@/features/admin/components/grids/FinancialMetricsGrid';
import { FleetFilterBar } from '@/features/admin/components/FleetFilterBar';
import { FleetOperationTable } from '@/features/admin/components/FleetOperationTable';
import { filterFleetByStatus } from '@/features/admin/lib/adminAnalytics';
import type {
  FleetAnalytics,
  FleetFilter,
  HistoricalEarnings,
  VehicleAsset,
} from '@/features/admin/types';

interface FleetOverviewTabProps {
  fleet: VehicleAsset[];
  fleetFilter: FleetFilter;
  onFleetFilterChange: (filter: FleetFilter) => void;
  analytics: FleetAnalytics;
  historicalEarnings: HistoricalEarnings;
}

export const FleetOverviewTab = ({
  fleet,
  fleetFilter,
  onFleetFilterChange,
  analytics,
  historicalEarnings,
}: FleetOverviewTabProps) => {
  const filteredFleet = filterFleetByStatus(fleet, fleetFilter);

  return (
    <div className="animate-in fade-in duration-150 space-y-10">
      <div className="flex flex-col gap-6">
        <FinancialMetricsGrid
          analytics={analytics}
          historicalEarnings={historicalEarnings}
        />
        <FleetDispositionGrid analytics={analytics} />
      </div>

      <FleetFilterBar
        fleetFilter={fleetFilter}
        onFilterChange={onFleetFilterChange}
      />

      <FleetOperationTable fleet={filteredFleet} />
    </div>
  );
};
