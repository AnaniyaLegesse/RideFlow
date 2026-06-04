'use client';

import { useCallback, useMemo, useState } from 'react';
import { computeFleetAnalytics } from '@/features/admin/lib/adminAnalytics';
import {
  adminSeedData,
  deleteBlogPost,
  deleteVehicleAsset,
} from '@/features/admin/services/adminService';
import type {
  AdminTab,
  BlogPost,
  FleetFilter,
  HistoricalEarnings,
  PendingTx,
  ReservationLog,
  VehicleAsset,
} from '@/features/admin/types';

export const useAdminDashboard = (initialTab: AdminTab = 'FLEET OVERVIEW') => {
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [fleetFilter, setFleetFilter] = useState<FleetFilter>('ALL');
  const [error, setError] = useState<string | null>(null);

  const [fleet, setFleet] = useState<VehicleAsset[]>(() => [...adminSeedData.fleet]);
  const [blogs, setBlogs] = useState<BlogPost[]>(() => [...adminSeedData.blogs]);
  const [pendingTransactions] = useState<PendingTx[]>(() => [
    ...adminSeedData.pendingTransactions,
  ]);
  const [reservations] = useState<ReservationLog[]>(() => [
    ...adminSeedData.reservations,
  ]);
  const [historicalEarnings] = useState<HistoricalEarnings>(() => ({
    ...adminSeedData.historicalEarnings,
  }));

  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [vehicleEditForm, setVehicleEditForm] = useState<VehicleAsset | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogEditForm, setBlogEditForm] = useState<BlogPost | null>(null);

  const analytics = useMemo(
    () => computeFleetAnalytics(fleet, pendingTransactions, historicalEarnings),
    [fleet, pendingTransactions, historicalEarnings]
  );

  const saveVehicleEdit = useCallback(() => {
    if (!vehicleEditForm) return;
    setFleet((prev) =>
      prev.map((v) => (v.id === vehicleEditForm.id ? vehicleEditForm : v))
    );
    setEditingVehicleId(null);
    setVehicleEditForm(null);
  }, [vehicleEditForm]);

  const cancelVehicleEdit = useCallback(() => {
    setEditingVehicleId(null);
    setVehicleEditForm(null);
  }, []);

  const dispatchDeleteVehicle = useCallback(
    async (id: string) => {
      if (!confirm('Decommission this vehicle asset permanently?')) return;
      try {
        await deleteVehicleAsset(id);
        setFleet((prev) => prev.filter((v) => v.id !== id));
        if (editingVehicleId === id) {
          setEditingVehicleId(null);
          setVehicleEditForm(null);
        }
      } catch {
        setError('Failed to delete vehicle.');
      }
    },
    [editingVehicleId]
  );

  const saveBlogEdit = useCallback(() => {
    if (!blogEditForm) return;
    setBlogs((prev) =>
      prev.map((b) => (b.id === blogEditForm.id ? blogEditForm : b))
    );
    setEditingBlogId(null);
    setBlogEditForm(null);
  }, [blogEditForm]);

  const cancelBlogEdit = useCallback(() => {
    setEditingBlogId(null);
    setBlogEditForm(null);
  }, []);

  const purgeBlog = useCallback(async (id: string) => {
    try {
      await deleteBlogPost(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      if (editingBlogId === id) {
        setEditingBlogId(null);
        setBlogEditForm(null);
      }
    } catch {
      setError('Failed to remove blog post.');
    }
  }, [editingBlogId]);

  return {
    activeTab,
    setActiveTab,
    fleetFilter,
    setFleetFilter,
    error,
    fleet,
    blogs,
    pendingTransactions,
    reservations,
    historicalEarnings,
    analytics,
    editingVehicleId,
    vehicleEditForm,
    setVehicleEditForm,
    editingBlogId,
    blogEditForm,
    setBlogEditForm,
    saveVehicleEdit,
    cancelVehicleEdit,
    dispatchDeleteVehicle,
    saveBlogEdit,
    cancelBlogEdit,
    purgeBlog,
  };
};

export type AdminDashboardState = ReturnType<typeof useAdminDashboard>;
