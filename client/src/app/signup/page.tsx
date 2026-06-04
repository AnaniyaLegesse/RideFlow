'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const data = (await response.json()) as { message?: string };
      setFormError(data.message ?? 'Unable to create account.');
      setIsSubmitting(false);
      return;
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      redirectTo: '/dashboard',
    });

    if (result?.error) {
      setFormError('Account created, but sign in failed.');
      setIsSubmitting(false);
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="selection-admin min-h-screen w-full bg-admin-surface">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative hidden lg:flex flex-col justify-between bg-brand-primary p-12 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

          <div>
            <div className="relative z-10">
              <div className="text-2xl font-bold tracking-tight text-white">RideFlow</div>
              <div className="mt-2 text-sm text-white/70">Next‑gen mobility platform</div>
            </div>
          </div>

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl font-display font-bold leading-tight text-white">
              Join the future<br />
              of mobility.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Create your account and unlock seamless bookings, crypto payments, and fleet management.
            </p>
            <div className="flex gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-white/20 overflow-hidden">
                    <div className="w-full h-full bg-white/30" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-white/70">Join 500+ drivers</span>
            </div>
          </div>

          <div className="relative z-10 text-xs text-white/40">
            © 2026 RideFlow – All rights reserved
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 md:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-admin-label uppercase text-brand-muted">
                Get started
              </p>
              <h1 className="mt-2 text-admin-heading text-brand-ink-emphasis font-display">
                Create your account
              </h1>
              <p className="mt-2 text-admin-body text-brand-muted">
                Fill in your details below to join RideFlow.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label htmlFor="name" className="text-admin-label uppercase text-brand-secondary block">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 w-full border border-admin-border bg-admin-surface px-4 text-dashboard-field text-brand-ink outline-none transition-colors focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-admin-label uppercase text-brand-secondary block">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full border border-admin-border bg-admin-surface px-4 text-dashboard-field text-brand-ink outline-none transition-colors focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="text-admin-label uppercase text-brand-secondary block">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full border border-admin-border bg-admin-surface px-4 text-dashboard-field text-brand-ink outline-none transition-colors focus:border-brand-primary"
                />
              </div>

              {formError && (
                <p className="text-admin-body-sm font-medium text-brand-danger">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="text-dashboard-cta h-12 w-full bg-brand-primary px-8 uppercase text-white transition-colors hover:bg-brand-primary-hover disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-admin-body-sm text-brand-muted">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-bold text-brand-primary underline underline-offset-4 hover:text-brand-primary-hover"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}