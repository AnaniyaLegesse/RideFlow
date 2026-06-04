'use client';

import { Button } from '@/components/ui/Button';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { FleetManagementTable } from '@/features/admin/components/FleetManagementTable';
import type { VehicleAsset } from '@/features/admin/types';

interface FleetManagementTabProps {
  fleet: VehicleAsset[];
  editingVehicleId: string | null;
  vehicleEditForm: VehicleAsset | null;
  onVehicleEditFormChange: (form: VehicleAsset) => void;
  onSaveVehicle: () => void;
  onCancelVehicle: () => void;
  onDeleteVehicle: (id: string) => void;
  onCreateVehicle: () => void;
  onEditVehicleRoute: (id: string) => void;
}

export const FleetManagementTab = ({
  fleet,
  editingVehicleId,
  vehicleEditForm,
  onVehicleEditFormChange,
  onSaveVehicle,
  onCancelVehicle,
  onDeleteVehicle,
  onCreateVehicle,
  onEditVehicleRoute,
}: FleetManagementTabProps) => (
  <div className="animate-in fade-in duration-150 space-y-6">
    <AdminSectionHeader
      title="FLEET PROVISIONING"
      action={
        <Button variant="primary" label="+ Add New Vehicle" onClick={onCreateVehicle} />
      }
    />

    <FleetManagementTable
      fleet={fleet}
      editingVehicleId={editingVehicleId}
      vehicleEditForm={vehicleEditForm}
      onEditFormChange={onVehicleEditFormChange}
      onSave={onSaveVehicle}
      onCancel={onCancelVehicle}
      onDelete={onDeleteVehicle}
      onNavigateEdit={(id) => onEditVehicleRoute(id)}
    />
  </div>
);
