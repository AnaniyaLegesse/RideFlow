// app/admin/fleet/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FleetOverviewTab } from '@/features/admin/components/tabs/FleetOverviewTab';
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

  if (loading) {
    return <div className="p-8 text-center">Loading fleet overview...</div>;
  }

  if (error || !analytics || !historicalEarnings) {
    return <ErrorBanner message={error || 'Data unavailable'} />;
  }

  return (
    <FleetOverviewTab
      fleet={fleet}
      fleetFilter={fleetFilter}
      onFleetFilterChange={setFleetFilter}
      analytics={analytics}
      historicalEarnings={historicalEarnings}
    />
  );
}