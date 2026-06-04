// src/components/Navbar.tsx
'use client';

import React, { useState } from 'react';
import { User, Menu, X, Wallet, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { WalletButton } from '@/components/WalletButton';
import { useWalletConnection } from '@/hooks/useWalletConnection';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role; // 'admin' or 'user'
  const isAuthenticated = status === 'authenticated';
  const { isConnected, connectWallet, disconnectWallet, address } = useWalletConnection();

  const publicLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog Insights', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ];

  // Role‑specific dashboard links (Help removed)
  const clientMenuItems = [
    { label: 'Bookings', href: '/dashboard/bookings' },
    { label: 'Account', href: '/dashboard/account' },
    { label: 'Crypto Wallet', href: '/dashboard/crypto' },
  ];

  const adminMenuItems = [
    { label: 'Fleet Overview', href: '/admin/fleet' },
    { label: 'Fleet Management', href: '/admin/vehicles' },
    { label: 'Blog Publisher', href: '/admin/blog' },
    { label: 'Crypto Clearing', href: '/admin/crypto' },
    { label: 'Reservations', href: '/admin/reservations' },

  ];

  const dashboardMenuItems = userRole === 'admin' ? adminMenuItems : clientMenuItems;

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const toggleDashboardDropdown = () => setIsDashboardDropdownOpen(!isDashboardDropdownOpen);

  // If user is not authenticated, clicking the "Dashboard" button goes to login
  const handleDashboardClick = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    } else {
      toggleDashboardDropdown();
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full h-16 bg-admin-surface border-b border-admin-border px-6 md:px-10 flex items-center justify-between selection:bg-brand-primary/10">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 no-underline group">
          <div className="relative w-25 h-20 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="RideFlow Logo"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>
          <span className="sr-only">RideFlow Home</span>
        </a>

        {/* Desktop Public Navigation */}
        <div className="hidden lg:flex items-center gap-1.5 h-full">
          {publicLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 no-underline relative rounded-none ${
                  active
                    ? 'text-brand-primary bg-brand-primary/5'
                    : 'text-[#555555] hover:text-brand-ink hover:bg-admin-surface-muted'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Side: Wallet + Dashboard Dropdown + Mobile Menu */}
        <div className="flex items-center gap-2 text-brand-ink">
          <div className="hidden sm:block">
            <WalletButton />
          </div>

          {/* Dashboard Dropdown (User Icon) */}
          <div className="relative">
            <button
              onClick={handleDashboardClick}
              className="flex items-center gap-2 px-3 py-1.5 border border-admin-border hover:border-brand-ink transition-colors no-underline text-[13px] font-medium text-brand-ink"
            >
              <User className="w-[18px] h-[18px]" strokeWidth={2} />
              <span className="hidden sm:inline">Dashboard</span>
              {isAuthenticated && <ChevronDown className="w-3 h-3" />}
            </button>

            {isAuthenticated && isDashboardDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-admin-surface border border-admin-border shadow-lg z-50">
                <div className="py-1">
                  {dashboardMenuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsDashboardDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-brand-ink hover:bg-admin-surface-muted transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                  <hr className="my-1 border-admin-border" />
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-2 text-sm text-brand-danger hover:bg-admin-surface-muted transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-brand-ink hover:bg-admin-surface-muted bg-transparent border-none cursor-pointer transition-colors"
            aria-label="Toggle Navigation Stack"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 top-16 z-40 w-full sm:w-80 bg-admin-surface border-l border-admin-border flex flex-col justify-between p-6 lg:hidden animate-in slide-in-from-right duration-200">
          <div className="flex flex-col gap-2">
            {publicLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 text-[15px] font-medium no-underline transition-all ${
                    active
                      ? 'text-brand-primary bg-brand-primary/5 font-semibold'
                      : 'text-brand-ink hover:bg-admin-surface-muted'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <hr className="my-2 border-admin-border" />

            {!isAuthenticated ? (
              <a
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-[15px] font-medium text-brand-ink hover:bg-admin-surface-muted"
              >
                Sign in
              </a>
            ) : (
              <>
                <div className="text-xs uppercase text-brand-muted px-4 pt-2 tracking-wide">Dashboard</div>
                {dashboardMenuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-2 text-[14px] text-brand-ink hover:bg-admin-surface-muted transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="mt-4 px-4 py-2 text-left text-sm text-brand-danger hover:bg-admin-surface-muted transition-colors"
                >
                  Sign out
                </button>
              </>
            )}
          </div>

          <div className="border-t border-admin-border pt-5 flex flex-col gap-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-brand-ink">Wallet</span>
              {!isConnected ? (
                <button
                  onClick={() => {
                    connectWallet();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-[13px] font-bold text-brand-primary hover:underline bg-transparent border-none cursor-pointer"
                >
                  Connect
                </button>
              ) : (
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[12px] font-mono text-brand-muted">
                    {truncateAddress(address!)}
                  </span>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-[11px] text-brand-danger hover:underline bg-transparent border-none cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
            <div className="text-[11px] tracking-tight text-brand-subtle px-1 font-mono">
              Rideflow Core Platform Structure © 2026
            </div>
          </div>
        </div>
      )}
    </>
  );
}