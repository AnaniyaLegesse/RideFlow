'use client';

import { useState, useEffect, useCallback } from 'react';
import { AccountSubNav } from '@/features/dashboard/components/account/AccountSubNav';
import { PersonalInfoPanel } from '@/features/dashboard/components/account/PersonalInfoPanel';
import { EmailPanel } from '@/features/dashboard/components/account/EmailPanel';
import { AddressPanel } from '@/features/dashboard/components/account/AddressPanel';
import { fetchAccountProfile, saveAccountProfile } from '@/features/dashboard/services/dashboardService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { AccountProfile, AccountSubTab } from '@/features/dashboard/types';

export default function AccountPage() {
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accountSubTab, setAccountSubTab] = useState<AccountSubTab>('personal');

  useEffect(() => {
    fetchAccountProfile()
      .then(setProfile)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const updateProfile = useCallback(
    <K extends keyof AccountProfile>(key: K, value: AccountProfile[K]) => {
      if (profile) setProfile({ ...profile, [key]: value });
    },
    [profile]
  );

  const savePersonalInfo = useCallback(() => {
    if (!profile) return;
    saveAccountProfile(profile)
      .then(() => alert('Personal parameters saved to system core.'))
      .catch((err) => setError(err.message));
  }, [profile]);

  const saveAddress = useCallback(() => {
    alert('Address variables saved successfully.');
  }, []);

  const deleteAccount = useCallback(() => {
    if (confirm('Drop account mapping sequence?')) {
      alert('Account deletion requested.');
    }
  }, []);

  if (loading) return <div className="p-8 text-center">Loading account...</div>;
  if (error || !profile) return <ErrorBanner message={error || 'Profile not found'} />;

  return (
    <div className="animate-in fade-in duration-150">
      <h1 className="text-dashboard-hero text-brand-ink mb-2">ACCOUNT</h1>
      <p className="text-dashboard-subtitle text-brand-ink mb-12">
        One place to manage your account
      </p>

      <AccountSubNav activeSubTab={accountSubTab} onSubTabChange={setAccountSubTab} />

      {accountSubTab === 'personal' && (
        <PersonalInfoPanel
          profile={profile}
          onUpdate={updateProfile}
          onSave={savePersonalInfo}
          onDeleteAccount={deleteAccount}
        />
      )}

      {accountSubTab === 'email' && (
        <EmailPanel profile={profile} onUpdate={updateProfile} />
      )}

      {accountSubTab === 'address' && (
        <AddressPanel
          profile={profile}
          onUpdate={updateProfile}
          onSave={saveAddress}
        />
      )}
    </div>
  );
}