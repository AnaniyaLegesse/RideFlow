// app/admin/vehicles/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { FleetManagementTable } from '@/features/admin/components/FleetManagementTable';
import { fetchAdminFleet, deleteVehicleAsset } from '@/features/admin/services/adminService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { VehicleAsset } from '@/features/admin/types';

export default function AdminVehiclesPage() {
  const router = useRouter();
  const [fleet, setFleet] = useState<VehicleAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [vehicleEditForm, setVehicleEditForm] = useState<VehicleAsset | null>(null);

  // Fetch vehicles on mount
  useEffect(() => {
    fetchAdminFleet()
      .then(setFleet)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Inline edit handlers
  const handleEdit = useCallback((id: string) => {
    const vehicle = fleet.find((v) => v.id === id);
    if (vehicle) {
      setEditingVehicleId(id);
      setVehicleEditForm({ ...vehicle });
    }
  }, [fleet]);

  const handleSave = useCallback(() => {
    if (!vehicleEditForm) return;
    setFleet((prev) => prev.map((v) => (v.id === vehicleEditForm.id ? vehicleEditForm : v)));
    setEditingVehicleId(null);
    setVehicleEditForm(null);
  }, [vehicleEditForm]);

  const handleCancel = useCallback(() => {
    setEditingVehicleId(null);
    setVehicleEditForm(null);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Permanently delete this vehicle asset?')) return;
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
  }, [editingVehicleId]);

  const handleCreate = () => router.push('/admin/vehicles/create');
  const handleEditRoute = (id: string) => router.push(`/admin/vehicles/${id.toLowerCase()}/edit`);

  if (loading) return <div className="p-8 text-center">Loading fleet assets...</div>;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div className="space-y-6">
      <AdminSectionHeader
        title="FLEET PROVISIONING"
        action={<Button variant="primary" label="+ Add New Vehicle" onClick={handleCreate} />}
      />
      <FleetManagementTable
        fleet={fleet}
        editingVehicleId={editingVehicleId}
        vehicleEditForm={vehicleEditForm}
        onEditFormChange={setVehicleEditForm}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onNavigateEdit={handleEditRoute}
      />
    </div>
  );
}