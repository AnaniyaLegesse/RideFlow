'use client';

import React, { useState } from 'react';
import { User, Menu, X, Wallet } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Bookings', href: '/dashboard' },
    { label: 'Blog Insights', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full h-16 bg-admin-surface border-b border-admin-border px-6 md:px-10 flex items-center justify-between selection:bg-brand-primary/10">
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

        <div className="hidden lg:flex items-center gap-1.5 h-full">
          {navLinks.map((link) => {
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

        <div className="flex items-center gap-2 text-brand-ink">
          <button className="hidden sm:flex items-center justify-center w-9 h-9 text-[#555555] hover:text-brand-ink hover:bg-admin-surface-muted bg-transparent border-none cursor-pointer transition-colors">
            <Wallet className="w-[18px] h-[18px]" strokeWidth={2} />
          </button>

          <a
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-1.5 border border-admin-border hover:border-brand-ink transition-colors no-underline text-[13px] font-medium text-brand-ink"
          >
            <User className="w-[18px] h-[18px]" strokeWidth={2} />
            <span className="hidden sm:inline">Dashboard</span>
          </a>

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

      {isMobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 top-16 z-40 w-full sm:w-80 bg-admin-surface border-l border-admin-border flex flex-col justify-between p-6 lg:hidden animate-in slide-in-from-right duration-200">
          <div className="flex flex-col gap-1 mt-2">
            {navLinks.map((link) => {
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
          </div>

          <div className="border-t border-admin-border pt-5 flex flex-col gap-4 mb-4">
            <button className="flex items-center gap-2.5 text-[#555555] hover:text-brand-ink transition-colors bg-transparent border-none cursor-pointer text-left text-[13px] font-medium p-1">
              <Wallet className="w-[18px] h-[18px]" strokeWidth={2} />
              <span>Global Framework System (EN)</span>
            </button>
            <div className="text-[11px] tracking-tight text-brand-subtle px-1 font-mono">
              Rideflow Core Platform Structure © 2026
            </div>
          </div>
        </div>
      )}
    </>
  );
}