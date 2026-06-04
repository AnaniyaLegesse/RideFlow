'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface VehicleAsset {
  id: string;
  modelName: string;
  plateNumber: string;
  status: 'Available' | 'On Rental' | 'Maintenance';
  batteryOrFuel: string;
  currentLocation: string;
  imageUrl?: string;
}

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const assetId = params?.id as string;

  const [vehicleData, setVehicleData] = useState<VehicleAsset | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (assetId) {
      const mockDatabase: Record<string, VehicleAsset> = {
        'V001': { id: 'V001', modelName: 'BMW iX3 M Sport', plateNumber: 'AA-2-A8944', status: 'Available', batteryOrFuel: '94%', currentLocation: 'Bole Hub', imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80' },
        'V002': { id: 'V002', modelName: 'BMW iX xDrive50', plateNumber: 'AA-2-B1102', status: 'On Rental', batteryOrFuel: '42%', currentLocation: 'In Transit' },
        'V003': { id: 'V003', modelName: 'BMW 5 Series Sedan', plateNumber: 'AA-2-C5591', status: 'Maintenance', batteryOrFuel: '100%', currentLocation: 'Sarbet Workshop' }
      };

      const selectedAsset = mockDatabase[assetId.toUpperCase()];
      if (selectedAsset) {
        setVehicleData(selectedAsset);
        if (selectedAsset.imageUrl) setImagePreview(selectedAsset.imageUrl);
      } else {
        alert(`Asset token ${assetId} could not be located.`);
        router.push('/admin');
      }
      setIsLoading(false);
    }
  }, [assetId, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Asset configuration update executed successfully for vehicle: ${vehicleData?.id}`);
    router.push('/admin');
  };

  if (isLoading || !vehicleData) return <div className="p-12 text-center text-brand-muted">Loading Sync Framework...</div>;

  return (
    <div className="w-full min-h-screen bg-admin-surface text-brand-ink pt-8 pb-24 px-4 md:px-12">
      <div className="max-w-[768px] mx-auto">
        <button onClick={() => router.push('/admin')} className="text-admin-label text-brand-muted hover:text-brand-ink transition-colors uppercase bg-transparent border-none cursor-pointer mb-12">
          ← Abort Modifications and Return
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-baseline space-x-3 border-b border-admin-border pb-4">
            <h2 className="uppercase text-brand-ink text-2xl font-bold">Modify Fleet Asset</h2>
            <span className="font-mono text-sm text-brand-muted font-bold">[{vehicleData.id}]</span>
          </div>

          <div className="space-y-2">
            <label className="text-admin-label text-brand-muted uppercase block">Update Display Cover Profile</label>
            <div className="border border-admin-border p-6 bg-admin-surface-muted flex flex-col sm:flex-row items-center gap-6 rounded-none">
              <div className="w-40 h-24 bg-admin-surface border border-admin-border-strong flex items-center justify-center overflow-hidden shrink-0">
                {imagePreview ? <img src={imagePreview} alt="Asset" className="w-full h-full object-cover" /> : <span className="text-[11px] text-brand-muted font-mono">NO MEDIA</span>}
              </div>
              <div className="relative">
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                <button type="button" className="h-10 px-4 bg-admin-surface border border-brand-ink text-brand-ink uppercase rounded-none pointer-events-none text-xs font-bold">Swap Image Profile File</button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
              <label className="absolute top-0 left-0 text-admin-label text-brand-muted uppercase">Model Specification Matrix</label>
              <input type="text" value={vehicleData.modelName} onChange={e => setVehicleData({...vehicleData, modelName: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 text-[15px]" />
            </div>

            <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
              <label className="absolute top-0 left-0 text-admin-label text-brand-muted uppercase">Plate Registry Code</label>
              <input type="text" value={vehicleData.plateNumber} onChange={e => setVehicleData({...vehicleData, plateNumber: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 font-mono uppercase text-[15px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
                <label className="absolute top-0 left-0 text-admin-label text-brand-muted uppercase">Energy Capacity Index</label>
                <input type="text" value={vehicleData.batteryOrFuel} onChange={e => setVehicleData({...vehicleData, batteryOrFuel: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 text-[15px]" />
              </div>
              <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
                <label className="absolute top-0 left-0 text-admin-label text-brand-muted uppercase">Current Operational Station</label>
                <input type="text" value={vehicleData.currentLocation} onChange={e => setVehicleData({...vehicleData, currentLocation: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 text-[15px]" />
              </div>
            </div>

            <div className="relative pt-5 pb-1 border-b border-admin-border-strong">
              <label className="absolute top-0 left-0 text-admin-label text-brand-muted uppercase">Operational State</label>
              <select value={vehicleData.status} onChange={e => setVehicleData({...vehicleData, status: e.target.value as any})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 appearance-none rounded-none text-[15px] cursor-pointer font-bold">
                <option value="Available">AVAILABLE FOR IMMEDIATE DISPATCH</option>
                <option value="On Rental">ACTIVE RENTAL LEASE TRACKING</option>
                <option value="Maintenance">CRITICAL WORKSHOP SERVICE LOG</option>
              </select>
            </div>
          </div>

          <button type="submit" className="h-12 px-10 bg-brand-ink text-white uppercase rounded-none hover:bg-brand-primary transition-colors border-none cursor-pointer text-sm font-bold tracking-wide">
            Update Configuration Parameters
          </button>
        </form>
      </div>
    </div>
  );
}