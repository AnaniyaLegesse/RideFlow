// app/admin/fleet/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FleetDispositionGrid } from '@/features/admin/components/grids/FleetDispositionGrid';
import { FinancialMetricsGrid } from '@/features/admin/components/grids/FinancialMetricsGrid';
import { FleetFilterBar } from '@/features/admin/components/FleetFilterBar';
import { FleetOperationTable } from '@/features/admin/components/FleetOperationTable';
import { filterFleetByStatus } from '@/features/admin/lib/adminAnalytics';
import {
  fetchAdminFleet,
  fetchHistoricalEarnings,
  fetchPendingTransactions,
} from '@/features/admin/services/adminService';
import { computeFleetAnalytics } from '@/features/admin/lib/adminAnalytics';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { FleetFilter, VehicleAsset, FleetAnalytics, HistoricalEarnings } from '@/features/admin/types';

export default function AdminFleetPage() {
  const [fleet, setFleet] = useState<VehicleAsset[]>([]);
  const [analytics, setAnalytics] = useState<FleetAnalytics | null>(null);
  const [historicalEarnings, setHistoricalEarnings] = useState<HistoricalEarnings | null>(null);
  const [fleetFilter, setFleetFilter] = useState<FleetFilter>('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fleetData, earningsData, pendingTx] = await Promise.all([
          fetchAdminFleet(),
          fetchHistoricalEarnings(),
          fetchPendingTransactions(),
        ]);
        setFleet(fleetData);
        setHistoricalEarnings(earningsData);
        const computedAnalytics = computeFleetAnalytics(fleetData, pendingTx, earningsData);
        setAnalytics(computedAnalytics);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load fleet data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredFleet = filterFleetByStatus(fleet, fleetFilter);

  if (loading) return <div className="p-8 text-center">Loading fleet overview...</div>;
  if (error || !analytics || !historicalEarnings) {
    return <ErrorBanner message={error || 'Data unavailable'} />;
  }

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
        onFilterChange={setFleetFilter}
      />

      <FleetOperationTable fleet={filteredFleet} />
    </div>
  );
}