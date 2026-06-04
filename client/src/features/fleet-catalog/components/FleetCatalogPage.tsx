'use client';

import { CarDetailPanel } from '@/features/fleet-catalog/components/catalog/CarDetailPanel';
import { FleetFilterPanel } from '@/features/fleet-catalog/components/filters/FleetFilterPanel';
import { FleetCatalogHeader } from '@/features/fleet-catalog/components/FleetCatalogHeader';
import { FleetCatalogShell } from '@/features/fleet-catalog/components/FleetCatalogShell';
import { FleetCatalogTabBar } from '@/features/fleet-catalog/components/FleetCatalogTabBar';
import { FleetCatalogVehicleGrid } from '@/features/fleet-catalog/components/FleetCatalogVehicleGrid';
import { useFleetCatalog } from '@/features/fleet-catalog/hooks/useFleetCatalog';

export const FleetCatalogPage = () => {
  const catalog = useFleetCatalog();

  return (
    <FleetCatalogShell>
      <FleetCatalogHeader />

      <FleetCatalogTabBar
        activeFilter={catalog.activeFilter}
        onTabClick={catalog.handleTabClick}
      />

      <FleetCatalogVehicleGrid
        vehicles={catalog.filteredVehicles}
        selectedCarId={catalog.selectedCar?.id ?? null}
        onSelectCar={catalog.handleCarSelect}
      />

      {catalog.selectedCar ? (
        <div ref={catalog.detailPanelRef} className="transition-all duration-300">
          <CarDetailPanel
            car={catalog.selectedCar}
            onClose={() => catalog.setSelectedCar(null)}
            onSelectConfiguration={(rate) =>
              catalog.startCheckout(catalog.selectedCar!, rate)
            }
          />
        </div>
      ) : null}

      <FleetFilterPanel
        isOpen={catalog.isFilterPanelOpen}
        filters={catalog.filters}
        resultCount={catalog.filteredVehicles.length}
        onClose={() => catalog.toggleFilterPanel(false)}
        onClearAll={catalog.clearAllFilters}
        onUpdate={catalog.updateFilter}
      />
    </FleetCatalogShell>
  );
};
