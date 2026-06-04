'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateVehiclePage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [vehicleData, setVehicleData] = useState({
    modelName: '',
    plateNumber: '',
    batteryOrFuel: '',
    currentLocation: '',
    status: 'Available',
    // Catalog Filter Parameters integrated from the Fleet Categories architecture
    category: 'SEDAN',
    powertrain: 'BEV',
    transmission: 'AUTOMATIC',
    // Capacity metrics for client filter matching
    seatsCount: '5',
    bagsCount: '3',
    imageFile: null as File | null
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVehicleData({ ...vehicleData, imageFile: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleData.modelName || !vehicleData.plateNumber) {
      return alert('Model Name and Plate Number fields are mandatory parameters.');
    }
    
    console.log('Deploying Configured Catalog Asset Payload:', vehicleData);
    alert(`Vehicle asset "${vehicleData.modelName}" successfully categorized and linked to operational fleet.`);
    router.push('/admin');
  };

  return (
    <div className="w-full min-h-screen bg-admin-surface text-brand-ink pt-8 pb-24 px-4 md:px-12">
      <div className="max-w-[768px] mx-auto">
        <button 
          onClick={() => router.push('/admin')} 
          className="text-xs font-bold tracking-wide text-brand-muted hover:text-brand-ink transition-colors uppercase bg-transparent border-none cursor-pointer mb-12"
        >
          ← Cancel and Return to Overview
        </button>

        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-150">
          <h2 className="uppercase text-brand-ink text-2xl font-bold">Register Fleet Vehicle Asset</h2>
          
          {/* IMAGE UPLOAD FIELD BOX */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-wide text-brand-muted uppercase block">Vehicle Asset Media Profile</label>
            <div className="border border-dashed border-admin-border-strong p-6 text-center relative bg-admin-surface-muted transition-colors hover:border-brand-ink rounded-none">
              {imagePreview ? (
                <div className="space-y-4">
                  <img src={imagePreview} alt="Asset Preview" className="max-h-[220px] mx-auto object-contain border border-admin-border" />
                  <button type="button" onClick={() => { setImagePreview(null); setVehicleData({ ...vehicleData, imageFile: null }); }} className="text-brand-danger text-xs uppercase font-bold tracking-wider hover:underline block mx-auto bg-transparent border-none cursor-pointer">Remove Profile Image</button>
                </div>
              ) : (
                <div className="py-6">
                  <span className="text-[13px] font-light text-brand-muted block mb-2">Drop driving blueprint image here or click to browse</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider">Select Media Token</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Model Specification Input */}
            <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
              <label className="absolute top-0 left-0 text-[11px] font-bold tracking-wide text-brand-muted uppercase">Model Specification</label>
              <input type="text" placeholder="e.g. BMW iX3 M Sport" value={vehicleData.modelName} onChange={e => setVehicleData({...vehicleData, modelName: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 text-[15px]" />
            </div>

            {/* Plate Identification Input */}
            <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
              <label className="absolute top-0 left-0 text-[11px] font-bold tracking-wide text-brand-muted uppercase">Plate Identification Number</label>
              <input type="text" placeholder="e.g. AA-2-A8944" value={vehicleData.plateNumber} onChange={e => setVehicleData({...vehicleData, plateNumber: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 font-mono uppercase text-[15px]" />
            </div>

            {/* Core Operational Matrix Grid (Energy / Hub Station) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
                <label className="absolute top-0 left-0 text-[11px] font-bold tracking-wide text-brand-muted uppercase">Energy Matrix Capacity</label>
                <input type="text" placeholder="e.g. 94%" value={vehicleData.batteryOrFuel} onChange={e => setVehicleData({...vehicleData, batteryOrFuel: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 text-[15px]" />
              </div>
              <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
                <label className="absolute top-0 left-0 text-[11px] font-bold tracking-wide text-brand-muted uppercase">Initial Station Hub</label>
                <input type="text" placeholder="e.g. Bole Hub" value={vehicleData.currentLocation} onChange={e => setVehicleData({...vehicleData, currentLocation: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 text-[15px]" />
              </div>
            </div>

            {/* CATALOG FILTER MATRIX BLOCK (Category / Powertrain / Transmission Alignment) */}
            <div className="border-t border-admin-border pt-4 mt-2">
              <span className="text-xs font-bold tracking-wide text-brand-ink uppercase block mb-4">Consumer Catalog Taxonomy Filters</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Category Classification */}
                <div className="relative pt-5 pb-1 border-b border-admin-border-strong">
                  <label className="absolute top-0 left-0 text-[10px] font-bold tracking-wide text-brand-muted uppercase">Category Variant</label>
                  <select value={vehicleData.category} onChange={e => setVehicleData({...vehicleData, category: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 appearance-none rounded-none text-[14px] font-medium cursor-pointer">
                    <option value="SEDAN">LUXURY SEDAN</option>
                    <option value="SUV">SPORTS ACTIVITY VEHICLE (SUV)</option>
                    <option value="COUPE">COUPE / PERFORMANCE</option>
                  </select>
                </div>

                {/* Powertrain Architecture */}
                <div className="relative pt-5 pb-1 border-b border-admin-border-strong">
                  <label className="absolute top-0 left-0 text-[10px] font-bold tracking-wide text-brand-muted uppercase">Engine Architecture</label>
                  <select value={vehicleData.powertrain} onChange={e => setVehicleData({...vehicleData, powertrain: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 appearance-none rounded-none text-[14px] font-medium cursor-pointer">
                    <option value="BEV">BATTERY ELECTRIC (BEV)</option>
                    <option value="PHEV">PLUG-IN HYBRID (PHEV)</option>
                    <option value="ICE">INTERNAL COMBUSTION (ICE)</option>
                  </select>
                </div>

                {/* Transmission Configuration */}
                <div className="relative pt-5 pb-1 border-b border-admin-border-strong">
                  <label className="absolute top-0 left-0 text-[10px] font-bold tracking-wide text-brand-muted uppercase">Gearbox Matrix</label>
                  <select value={vehicleData.transmission} onChange={e => setVehicleData({...vehicleData, transmission: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 appearance-none rounded-none text-[14px] font-medium cursor-pointer">
                    <option value="AUTOMATIC">AUTOMATIC TRANSMISSION</option>
                    <option value="MANUAL">MANUAL GEARSHIFT</option>
                  </select>
                </div>
              </div>
            </div>

            {/* NEW: CAPACITY ASSIGNMENT INPUTS (Seats / Luggage Bags) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
                <label className="absolute top-0 left-0 text-[11px] font-bold tracking-wide text-brand-muted uppercase">Passenger Capacity (Seats)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="9"
                  placeholder="e.g. 5" 
                  value={vehicleData.seatsCount} 
                  onChange={e => setVehicleData({...vehicleData, seatsCount: e.target.value})} 
                  className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 text-[15px]" 
                />
              </div>
              <div className="relative pt-5 pb-1 border-b border-admin-border-strong focus-within:border-brand-ink">
                <label className="absolute top-0 left-0 text-[11px] font-bold tracking-wide text-brand-muted uppercase">Luggage Capacity (Bags)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="9"
                  placeholder="e.g. 3" 
                  value={vehicleData.bagsCount} 
                  onChange={e => setVehicleData({...vehicleData, bagsCount: e.target.value})} 
                  className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 text-[15px]" 
                />
              </div>
            </div>

            {/* Operational Status Select */}
            <div className="relative pt-5 pb-1 border-b border-admin-border-strong">
              <label className="absolute top-0 left-0 text-[11px] font-bold tracking-wide text-brand-muted uppercase">Operational State Assignment</label>
              <select value={vehicleData.status} onChange={e => setVehicleData({...vehicleData, status: e.target.value})} className="w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 mt-2 appearance-none rounded-none text-[15px] cursor-pointer">
                <option value="Available">AVAILABLE FOR IMMEDIATE DISPATCH</option>
                <option value="On Rental">ACTIVE RENTAL LEASE</option>
                <option value="Maintenance">WORKSHOP SERVICE INDEX</option>
              </select>
            </div>
          </div>

          <button type="submit" className="h-12 px-10 bg-brand-ink text-white uppercase rounded-none hover:bg-brand-primary transition-colors border-none cursor-pointer text-sm font-bold tracking-wide">
            Commit Vehicle Asset
          </button>
        </form>
      </div>
    </div>
  );
}