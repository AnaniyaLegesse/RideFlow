import type { ReactNode } from 'react';
import { SignOutButton } from '@/components/auth/SignOutButton';

interface AdminDashboardShellProps {
  children: ReactNode;
}

export const AdminDashboardShell = ({ children }: AdminDashboardShellProps) => (
  <div className="selection-admin w-full min-h-screen bg-admin-surface text-brand-ink pt-admin-page-top pb-admin-page-bottom px-admin-page-x md:px-admin-page-x-md">
    <div className="mx-auto max-w-admin-container">
      <div className="mb-6 flex justify-end">
        <SignOutButton />
      </div>
      {children}
    </div>
  </div>
);
