import { Suspense } from 'react';
import FleetCatalogClient from './FleetCatalogClient';

export default function FleetCatalogPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading fleet catalog...</div>}>
      <FleetCatalogClient />
    </Suspense>
  );
}